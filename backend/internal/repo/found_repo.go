package repo

import (
	"context"
	"errors"
	"fmt"
	"time"

	"LostandFound/internal/core"

	"github.com/jackc/pgx/v5"
)

var ErrFoundReceiptNotAvailable = errors.New("bukti penerimaan belum tersedia")

// ErrReceiveFoundReportFailed menandai kegagalan infrastruktur (DB/transaksi)
// saat memproses penerimaan barang. Detail asli hanya untuk log server.
var ErrReceiveFoundReportFailed = errors.New("gagal memproses penerimaan barang")

func (s *Store) ReceiveFoundReport(
	ctx context.Context,
	reportID, storageRack, condition string,
	intakePhoto []byte,
	intakePhotoMimeType string,
) (ItemData, error) {
	tx, err := s.db.Begin(ctx)
	if err != nil {
		return ItemData{}, fmt.Errorf("%w: memulai penerimaan barang: %v", ErrReceiveFoundReportFailed, err)
	}
	defer tx.Rollback(ctx)

	var report FoundReport
	var expiresAt time.Time
	err = tx.QueryRow(ctx, `
		SELECT
			found_report_id,
			status,
			category_id,
			color,
			location_id,
			found_at,
			description,
			photo_key,
			COALESCE(NULLIF(BTRIM(item_name), ''), description),
			expires_at
		FROM found_report
		WHERE found_report_id = $1
		FOR UPDATE
	`, reportID).Scan(
		&report.ReportID,
		&report.Status,
		&report.CategoryID,
		&report.Color,
		&report.LocationID,
		&report.FoundAt,
		&report.Description,
		&report.PhotoKey,
		&report.ItemName,
		&expiresAt,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return ItemData{}, fmt.Errorf("laporan temuan tidak ditemukan")
		}
		return ItemData{}, fmt.Errorf("%w: mengambil laporan temuan: %v", ErrReceiveFoundReportFailed, err)
	}
	if report.Status != "Menunggu Penyerahan" {
		return ItemData{}, fmt.Errorf("status laporan tidak bisa diterima")
	}
	if !time.Now().Before(expiresAt) {
		return ItemData{}, fmt.Errorf("masa berlaku laporan temuan telah habis")
	}

	var staffID int64
	var staffName string
	err = tx.QueryRow(ctx, `
		SELECT staff_id, name
		FROM staff
		WHERE role = 'satpam' AND is_active = TRUE
		ORDER BY staff_id
		LIMIT 1
	`).Scan(&staffID, &staffName)
	if err != nil {
		return ItemData{}, fmt.Errorf("%w: mengambil petugas satpam aktif: %v", ErrReceiveFoundReportFailed, err)
	}

	itemID, err := core.GenerateTicketID("BRG")
	if err != nil {
		return ItemData{}, fmt.Errorf("%w: membuat ID barang: %v", ErrReceiveFoundReportFailed, err)
	}

	var savedItem ItemData
	savedItem.ItemID = itemID
	savedItem.Status = "Barang Ditemukan"
	savedItem.ReceivedByName = staffName
	savedItem.Category = CategoryOption{
		CategoryID: int(report.CategoryID),
	}
	savedItem.Color = ColorOption{Code: report.Color, Label: report.Color}
	savedItem.LocationID = int(report.LocationID)
	savedItem.FoundAt = report.FoundAt
	savedItem.StorageRack = storageRack
	savedItem.SecretNote = report.Description
	var intakePhotoValue any
	var intakePhotoMimeTypeValue any
	if len(intakePhoto) > 0 {
		intakePhotoValue = intakePhoto
		intakePhotoMimeTypeValue = intakePhotoMimeType
	}

	_, err = tx.Exec(ctx, `
		INSERT INTO item (
			item_id,
			found_report_id,
			category_id,
			color,
			condition,
			storage_rack,
			intake_photo_key,
			intake_photo_data,
			intake_photo_mime_type,
			received_by_staff_id,
			status
		)
		VALUES ($1, $2, $3, $4, $5, $6, '', $7, $8, $9, 'Barang Ditemukan')
	`, itemID, reportID, report.CategoryID, report.Color, condition, storageRack, intakePhotoValue, intakePhotoMimeTypeValue, staffID)
	if err != nil {
		return ItemData{}, fmt.Errorf("%w: menyimpan barang inventaris: %v", ErrReceiveFoundReportFailed, err)
	}

	_, err = tx.Exec(ctx, `
		UPDATE found_report
		SET status = 'Diterima'
		WHERE found_report_id = $1
	`, reportID)
	if err != nil {
		return ItemData{}, fmt.Errorf("%w: memperbarui status laporan temuan: %v", ErrReceiveFoundReportFailed, err)
	}

	if err := tx.Commit(ctx); err != nil {
		return ItemData{}, fmt.Errorf("%w: menyelesaikan penerimaan barang: %v", ErrReceiveFoundReportFailed, err)
	}

	return savedItem, nil
}

func (s *Store) GetPendingFoundReports(ctx context.Context) ([]FoundReport, error) {
	reports := make([]FoundReport, 0)

	rows, err := s.db.Query(ctx, `
		SELECT
			found_report_id,
			status,
			category_id,
			color,
			location_id,
			found_at,
			COALESCE(NULLIF(BTRIM(item_name), ''), description),
			description,
			finder_name,
			finder_whatsapp,
			photo_key,
			source,
			created_at,
			expires_at
		FROM found_report
		WHERE status = $1
		  AND expires_at > NOW()
		ORDER BY created_at ASC
	`, "Menunggu Penyerahan")
	if err != nil {
		return nil, fmt.Errorf("mengambil antrean laporan temuan: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var report FoundReport

		err := rows.Scan(
			&report.ReportID,
			&report.Status,
			&report.CategoryID,
			&report.Color,
			&report.LocationID,
			&report.FoundAt,
			&report.ItemName,
			&report.Description,
			&report.FinderName,
			&report.FinderWhatsApp,
			&report.PhotoKey,
			&report.Source,
			&report.CreatedAt,
			&report.ExpiresAt,
		)
		if err != nil {
			return nil, fmt.Errorf("membaca antrean laporan temuan: %w", err)
		}

		reports = append(reports, report)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("membaca hasil antrean: %w", err)
	}

	return reports, nil
}

func (s *Store) GetFoundReceipt(ctx context.Context, reportID string) (FoundReceipt, error) {
	var receipt FoundReceipt
	err := s.db.QueryRow(ctx, `
		SELECT
			fr.found_report_id,
			i.item_id,
			COALESCE(fr.finder_name, ''),
			fr.finder_whatsapp,
			staff.name,
			i.received_at
		FROM found_report fr
		JOIN item i
			ON i.found_report_id = fr.found_report_id
		JOIN staff
			ON staff.staff_id = i.received_by_staff_id
		WHERE fr.found_report_id = $1
		  AND fr.status = 'Diterima'
	`, reportID).Scan(
		&receipt.ReportID,
		&receipt.ItemID,
		&receipt.FinderName,
		&receipt.FinderWhatsApp,
		&receipt.ReceivedByName,
		&receipt.ReceivedAt,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return FoundReceipt{}, ErrFoundReceiptNotAvailable
		}
		return FoundReceipt{}, fmt.Errorf("mengambil bukti penerimaan: %w", err)
	}

	return receipt, nil
}

func (s *Store) GetFoundIntakeStats(ctx context.Context) (FoundIntakeStats, error) {
	var stats FoundIntakeStats
	err := s.db.QueryRow(ctx, `
		WITH jakarta_day AS (
			SELECT
				date_trunc('day', NOW() AT TIME ZONE 'Asia/Jakarta')
					AT TIME ZONE 'Asia/Jakarta' AS start_at
		)
		SELECT
			(
				SELECT COUNT(*)
				FROM found_report
				WHERE status = $1
				  AND expires_at > NOW()
				  AND expires_at <= NOW() + INTERVAL '3 hours'
			),
			(
				SELECT COUNT(*)
				FROM found_report
				WHERE status = $1
				  AND expires_at > NOW()
			),
			(
				SELECT COUNT(*)
				FROM item
				CROSS JOIN jakarta_day
				WHERE received_at >= jakarta_day.start_at
				  AND received_at < jakarta_day.start_at + INTERVAL '1 day'
			),
			(
				SELECT COUNT(*)
				FROM item
				WHERE status = $2
			)
	`, "Menunggu Penyerahan", "Barang Ditemukan").Scan(
		&stats.ExpiringSoon,
		&stats.PendingTotal,
		&stats.ReceivedToday,
		&stats.ActiveItems,
	)
	if err != nil {
		return FoundIntakeStats{}, fmt.Errorf("mengambil statistik antrean penerimaan: %w", err)
	}

	return stats, nil
}
