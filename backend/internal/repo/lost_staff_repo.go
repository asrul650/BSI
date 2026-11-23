package repo

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

var (
	ErrLostReportNotFound    = errors.New("laporan kehilangan tidak ditemukan")
	ErrLostReportNotClosable = errors.New("status laporan tidak dapat ditutup")
)

type StaffLostReport struct {
	ReportID               string         `json:"report_id"`
	Status                 string         `json:"status"`
	Category               CategoryOption `json:"category"`
	Color                  string         `json:"color"`
	ReporterWhatsAppMasked string         `json:"reporter_whatsapp_masked,omitempty"`
	ClosedReason           *string        `json:"closed_reason"`
	CreatedAt              time.Time      `json:"created_at"`
	HasSecret              bool           `json:"has_secret"`
}

type LostReportSummary struct {
	Active    int `json:"aktif"`
	Candidate int `json:"memiliki_kandidat"`
	Completed int `json:"selesai"`
	Closed    int `json:"ditutup"`
}

const staffLostReportSelect = `
	SELECT
		lr.lost_report_id,
		LOWER(REPLACE(BTRIM(lr.status), ' ', '_')),
		category.category_id,
		category.name,
		lr.color,
		lr.reporter_whatsapp,
		lr.closed_reason,
		lr.created_at,
		(lr.description <> '' OR lr.reporter_name <> '' OR lr.reporter_whatsapp <> '')
	FROM lost_report lr
	JOIN category ON category.category_id = lr.category_id
`

func (s *Store) ListStaffLostReports(
	ctx context.Context,
	status, reportID string,
	page, pageSize int,
) ([]StaffLostReport, int, error) {
	var total int
	err := s.db.QueryRow(ctx, `
		SELECT COUNT(*)
		FROM lost_report lr
		WHERE ($1 = '' OR LOWER(REPLACE(BTRIM(lr.status), ' ', '_')) = $1)
		  AND ($2 = '' OR lr.lost_report_id = $2)
	`, status, reportID).Scan(&total)
	if err != nil {
		return nil, 0, fmt.Errorf("menghitung laporan kehilangan: %w", err)
	}

	rows, err := s.db.Query(ctx, staffLostReportSelect+`
		WHERE ($1 = '' OR LOWER(REPLACE(BTRIM(lr.status), ' ', '_')) = $1)
		  AND ($2 = '' OR lr.lost_report_id = $2)
		ORDER BY lr.created_at DESC, lr.lost_report_id
		LIMIT $3 OFFSET $4
	`, status, reportID, pageSize, (page-1)*pageSize)
	if err != nil {
		return nil, 0, fmt.Errorf("mengambil daftar laporan kehilangan: %w", err)
	}
	defer rows.Close()

	reports := make([]StaffLostReport, 0)
	for rows.Next() {
		report, err := scanStaffLostReport(rows)
		if err != nil {
			return nil, 0, fmt.Errorf("membaca laporan kehilangan: %w", err)
		}
		reports = append(reports, report)
	}
	if err := rows.Err(); err != nil {
		return nil, 0, fmt.Errorf("membaca daftar laporan kehilangan: %w", err)
	}

	return reports, total, nil
}

func (s *Store) LostReportStatusSummary(ctx context.Context) (LostReportSummary, error) {
	summary := LostReportSummary{}
	rows, err := s.db.Query(ctx, `
		SELECT LOWER(REPLACE(BTRIM(status), ' ', '_')), COUNT(*)
		FROM lost_report
		GROUP BY 1
	`)
	if err != nil {
		return summary, fmt.Errorf("menghitung status laporan kehilangan: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var status string
		var count int
		if err := rows.Scan(&status, &count); err != nil {
			return summary, fmt.Errorf("membaca ringkasan laporan kehilangan: %w", err)
		}
		switch status {
		case "aktif":
			summary.Active = count
		case "memiliki_kandidat":
			summary.Candidate = count
		case "selesai":
			summary.Completed = count
		case "ditutup":
			summary.Closed = count
		}
	}
	if err := rows.Err(); err != nil {
		return summary, fmt.Errorf("membaca ringkasan laporan kehilangan: %w", err)
	}
	return summary, nil
}

func (s *Store) CloseLostReport(ctx context.Context, reportID, reason string) (StaffLostReport, error) {
	tx, err := s.db.Begin(ctx)
	if err != nil {
		return StaffLostReport{}, fmt.Errorf("memulai penutupan laporan kehilangan: %w", err)
	}
	defer tx.Rollback(ctx)

	var status string
	err = tx.QueryRow(ctx, `
		SELECT LOWER(REPLACE(BTRIM(status), ' ', '_'))
		FROM lost_report
		WHERE lost_report_id = $1
		FOR UPDATE
	`, reportID).Scan(&status)
	if errors.Is(err, pgx.ErrNoRows) {
		return StaffLostReport{}, ErrLostReportNotFound
	}
	if err != nil {
		return StaffLostReport{}, fmt.Errorf("memeriksa status laporan kehilangan: %w", err)
	}
	if status != "aktif" && status != "memiliki_kandidat" {
		return StaffLostReport{}, ErrLostReportNotClosable
	}

	_, err = tx.Exec(ctx, `
		UPDATE lost_report
		SET status = 'ditutup',
		    closed_reason = $2,
		    updated_at = NOW()
		WHERE lost_report_id = $1
	`, reportID, reason)
	if err != nil {
		return StaffLostReport{}, fmt.Errorf("menyimpan penutupan laporan kehilangan: %w", err)
	}
	if err := tx.Commit(ctx); err != nil {
		return StaffLostReport{}, fmt.Errorf("menyelesaikan penutupan laporan kehilangan: %w", err)
	}

	return s.GetStaffLostReport(ctx, reportID)
}

func (s *Store) GetStaffLostReport(ctx context.Context, reportID string) (StaffLostReport, error) {
	report, err := scanStaffLostReport(s.db.QueryRow(ctx, staffLostReportSelect+`
		WHERE lr.lost_report_id = $1
	`, reportID))
	if errors.Is(err, pgx.ErrNoRows) {
		return StaffLostReport{}, ErrLostReportNotFound
	}
	if err != nil {
		return StaffLostReport{}, fmt.Errorf("mengambil laporan kehilangan: %w", err)
	}
	return report, nil
}

func scanStaffLostReport(row pgx.Row) (StaffLostReport, error) {
	var report StaffLostReport
	var categoryID int64
	var phone string
	var closedReason pgtype.Text

	err := row.Scan(
		&report.ReportID,
		&report.Status,
		&categoryID,
		&report.Category.Name,
		&report.Color,
		&phone,
		&closedReason,
		&report.CreatedAt,
		&report.HasSecret,
	)
	if err != nil {
		return StaffLostReport{}, err
	}

	report.Category.CategoryID = int(categoryID)
	report.ReporterWhatsAppMasked = maskPhone(phone)
	if closedReason.Valid {
		report.ClosedReason = &closedReason.String
	}
	return report, nil
}

func maskPhone(phone string) string {
	var digits strings.Builder
	for _, char := range phone {
		if char >= '0' && char <= '9' {
			digits.WriteRune(char)
		}
	}
	value := digits.String()
	if len(value) <= 7 {
		return strings.Repeat("•", len(value))
	}
	return value[:4] + strings.Repeat("•", len(value)-7) + value[len(value)-3:]
}
