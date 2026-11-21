package repo

import (
	"errors"
	"strings"
	"time"
)

func (s *Store) StartVerification(itemID string, claim ClaimInfo) (ItemData, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	idx := s.findItemIndex(itemID)
	if idx == -1 {
		return ItemData{}, errors.New("barang tidak ditemukan")
	}
	if s.items[idx].Status != "barang_ditemukan" {
		return ItemData{}, errors.New("barang tidak dalam status barang_ditemukan")
	}
	prevRejects := 0
	if s.items[idx].Claim != nil {
		prevRejects = s.items[idx].Claim.RejectCount
	}

	s.items[idx].Status = "proses_verifikasi"
	s.items[idx].Claim = &ClaimInfo{
		ClaimantName:   strings.TrimSpace(claim.ClaimantName),
		ClaimantIDType: strings.TrimSpace(claim.ClaimantIDType),
		ClaimantWA:     strings.TrimSpace(claim.ClaimantWA),
		RejectCount:    prevRejects,
	}
	return s.items[idx], nil
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