package repo

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
)

var (
	ErrVerificationItemNotFound    = errors.New("barang tidak ditemukan")
	ErrVerificationItemUnavailable = errors.New("barang tidak berstatus Barang Ditemukan")
	ErrVerificationStaffNotFound   = errors.New("akun Satpam tidak ditemukan atau tidak aktif")
	ErrVerificationMatchNotFound   = errors.New("laporan kehilangan bukan kandidat barang ini")
)

func (s *Store) StartVerification(ctx context.Context, params StartVerificationParams) (ItemData, error) {
	itemID := strings.TrimSpace(params.ItemID)
	if itemID == "" {
		return ItemData{}, ErrVerificationItemNotFound
	}

	tx, err := s.db.Begin(ctx)
	if err != nil {
		return ItemData{}, fmt.Errorf("memulai transaksi verifikasi: %w", err)
	}
	defer tx.Rollback(ctx)

	var previousStatus string
	err = tx.QueryRow(ctx, `
		SELECT status
		FROM item
		WHERE item_id = $1
		FOR UPDATE
	`, itemID).Scan(&previousStatus)
	if errors.Is(err, pgx.ErrNoRows) {
		return ItemData{}, ErrVerificationItemNotFound
	}
	if err != nil {
		return ItemData{}, fmt.Errorf("mengambil status barang untuk verifikasi: %w", err)
	}
	if previousStatus != "Barang Ditemukan" {
		return ItemData{}, ErrVerificationItemUnavailable
	}

	var staffID int64
	err = tx.QueryRow(ctx, `
		SELECT staff_id
		FROM staff
		WHERE staff_id = $1
			AND role = 'satpam'
			AND is_active = TRUE
	`, params.StaffID).Scan(&staffID)
	if errors.Is(err, pgx.ErrNoRows) {
		return ItemData{}, ErrVerificationStaffNotFound
	}
	if err != nil {
		return ItemData{}, fmt.Errorf("memvalidasi akun Satpam untuk verifikasi: %w", err)
	}

	lostReportID := strings.TrimSpace(params.LostReportID)
	if lostReportID != "" {
		var isMatch bool
		err = tx.QueryRow(ctx, `
			SELECT EXISTS (
				SELECT 1
				FROM matching_result
				WHERE item_id = $1 AND lost_report_id = $2
			)
		`, itemID, lostReportID).Scan(&isMatch)
		if err != nil {
			return ItemData{}, fmt.Errorf("memvalidasi pasangan laporan kehilangan: %w", err)
		}
		if !isMatch {
			return ItemData{}, ErrVerificationMatchNotFound
		}
	}

	var rejectCount int
	err = tx.QueryRow(ctx, `
		SELECT COUNT(*)
		FROM claim
		WHERE item_id = $1 AND result = 'Tidak Cocok'
	`, itemID).Scan(&rejectCount)
	if err != nil {
		return ItemData{}, fmt.Errorf("menghitung klaim yang pernah ditolak: %w", err)
	}

	claimantName := strings.TrimSpace(params.ClaimantName)
	claimantIDType := strings.TrimSpace(params.ClaimantIDType)
	claimantIdentityLast4 := strings.TrimSpace(params.ClaimantIdentityLast4)
	claimantWA := strings.TrimSpace(params.ClaimantWA)

	_, err = tx.Exec(ctx, `
		INSERT INTO claim (
			item_id,
			lost_report_id,
			claimant_name,
			id_type,
			id_last4,
			claimant_whatsapp,
			processed_by_staff_id
		)
		VALUES ($1, NULLIF($2, ''), $3, $4, $5, $6, $7)
	`, itemID, lostReportID, claimantName, claimantIDType, claimantIdentityLast4, claimantWA, staffID)
	if err != nil {
		return ItemData{}, fmt.Errorf("menyimpan data pemohon verifikasi: %w", err)
	}

	_, err = tx.Exec(ctx, `
		UPDATE item
		SET status = 'Proses Verifikasi', updated_at = NOW()
		WHERE item_id = $1
	`, itemID)
	if err != nil {
		return ItemData{}, fmt.Errorf("memperbarui status barang untuk verifikasi: %w", err)
	}

	_, err = tx.Exec(ctx, `
		INSERT INTO item_history (item_id, previous_status, new_status, staff_id, reason)
		VALUES ($1, $2, 'Proses Verifikasi', $3, 'Memulai verifikasi klaim')
	`, itemID, previousStatus, staffID)
	if err != nil {
		return ItemData{}, fmt.Errorf("mencatat riwayat status verifikasi: %w", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return ItemData{}, fmt.Errorf("menyimpan transaksi verifikasi: %w", err)
	}

	return ItemData{
		ItemID: itemID,
		Status: "proses_verifikasi",
		Claim: &ClaimInfo{
			ClaimantName:          claimantName,
			ClaimantIDType:        claimantIDType,
			ClaimantIdentityLast4: claimantIdentityLast4,
			ClaimantWA:            claimantWA,
			LostReportID:          lostReportID,
			RejectCount:           rejectCount,
		},
	}, nil
}

func (s *Store) RejectClaim(itemID, reason string) (ItemData, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	idx := s.findItemIndex(itemID)
	if idx == -1 {
		return ItemData{}, errors.New("barang tidak ditemukan")
	}
	if s.items[idx].Status != "proses_verifikasi" {
		return ItemData{}, errors.New("barang tidak dalam status proses_verifikasi")
	}

	if s.items[idx].Claim == nil {
		s.items[idx].Claim = &ClaimInfo{}
	}
	s.items[idx].Claim.RejectReason = strings.TrimSpace(reason)
	s.items[idx].Claim.RejectCount++
	s.failedClaims = append(s.failedClaims, FailedClaimRecord{
		ClaimantName: strings.TrimSpace(s.items[idx].Claim.ClaimantName),
		ClaimantWA:   strings.TrimSpace(s.items[idx].Claim.ClaimantWA),
		ItemID:       s.items[idx].ItemID,
		Reason:       strings.TrimSpace(reason),
		RejectedAt:   time.Now(),
	})
	s.items[idx].Status = "barang_ditemukan"
	return s.items[idx], nil
}

func (s *Store) CompleteHandover(itemID, receiverName, receiverWA, lostReportID string) (ItemData, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	idx := s.findItemIndex(itemID)
	if idx == -1 {
		return ItemData{}, errors.New("barang tidak ditemukan")
	}
	if s.items[idx].Status != "proses_verifikasi" {
		return ItemData{}, errors.New("barang harus dalam status proses_verifikasi sebelum diserahkan")
	}

	s.items[idx].Status = "telah_diambil"
	s.items[idx].Handover = &HandoverInfo{
		ReceiverName: strings.TrimSpace(receiverName),
		ReceiverWA:   strings.TrimSpace(receiverWA),
		LostReportID: strings.TrimSpace(lostReportID),
	}

	if lostReportID != "" {
		for i := range s.lostReports {
			if s.lostReports[i].ReportID == lostReportID {
				s.lostReports[i].Status = "selesai"
			}
		}
	}

	return s.items[idx], nil
}

func (s *Store) findItemIndex(itemID string) int {
	for i := range s.items {
		if s.items[i].ItemID == itemID {
			return i
		}
	}
	return -1
}

func (s *Store) HasPriorFailedClaim30Days(claimantName, claimantWA string) bool {
	s.mu.RLock()
	defer s.mu.RUnlock()

	cutoff := time.Now().AddDate(0, 0, -30)
	normWA := normalizeWA(claimantWA)
	normName := strings.ToLower(strings.TrimSpace(claimantName))
	last4 := extractLast4Digits(claimantName)

	count := 0
	for _, fc := range s.failedClaims {
		if fc.RejectedAt.Before(cutoff) {
			continue
		}

		sameWA := normWA != "" && normalizeWA(fc.ClaimantWA) == normWA

		recName := strings.ToLower(strings.TrimSpace(fc.ClaimantName))
		recLast4 := extractLast4Digits(fc.ClaimantName)
		sameIdentity := normName != "" && last4 != "" &&
			recName == normName && recLast4 != "" && recLast4 == last4

		if sameWA || sameIdentity {
			count++
		}
	}

	// Memicu A1 jika sudah pernah gagal klaim minimal 2 kali dalam 30 hari terakhir
	return count >= 2
}

func normalizeWA(raw string) string {
	var b strings.Builder
	for _, r := range raw {
		if r >= '0' && r <= '9' {
			b.WriteRune(r)
		}
	}
	s := b.String()
	if strings.HasPrefix(s, "62") {
		return "0" + strings.TrimPrefix(s, "62")
	}
	return s
}

func extractLast4Digits(raw string) string {
	var digits []rune
	for _, r := range raw {
		if r >= '0' && r <= '9' {
			digits = append(digits, r)
		}
	}
	if len(digits) < 4 {
		return ""
	}
	return string(digits[len(digits)-4:])
}
