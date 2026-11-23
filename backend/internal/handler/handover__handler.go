package handler

import (
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"
	"strings"
	"unicode/utf8"

	"LostandFound/internal/repo"
)

type HandoverHandler struct {
	store *repo.Store
}

func NewHandoverHandler(store *repo.Store) *HandoverHandler {
	return &HandoverHandler{store: store}
}

type startVerifyRequest struct {
	StaffID               int64  `json:"staff_id"`
	ClaimantName          string `json:"claimant_name"`
	ClaimantIDType        string `json:"claimant_id_type"`
	ClaimantIdentityLast4 string `json:"id_last4"`
	ClaimantWA            string `json:"claimant_wa"`
	LostReportID          string `json:"lost_report_id"`
}

type rejectClaimRequest struct {
	Reason string `json:"reason"`
}

type handoverRequest struct {
	ReceiverName string `json:"receiver_name"`
	ReceiverWA   string `json:"receiver_wa"`
	LostReportID string `json:"lost_report_id"`
}

func (h *HandoverHandler) StartVerification(w http.ResponseWriter, r *http.Request) {
	itemID := strings.TrimSpace(r.PathValue("item_id"))

	var req startVerifyRequest
	decoder := json.NewDecoder(http.MaxBytesReader(w, r.Body, 4<<10))
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON tidak valid"})
		return
	}
	if err := decoder.Decode(&struct{}{}); !errors.Is(err, io.EOF) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON tidak valid"})
		return
	}

	req.ClaimantName = strings.TrimSpace(req.ClaimantName)
	req.ClaimantIDType = strings.ToLower(strings.TrimSpace(req.ClaimantIDType))
	req.ClaimantIdentityLast4 = strings.TrimSpace(req.ClaimantIdentityLast4)
	req.ClaimantWA = strings.TrimSpace(req.ClaimantWA)
	req.LostReportID = strings.TrimSpace(req.LostReportID)
	if !validStartVerificationRequest(req) {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Lengkapi nama, jenis identitas, 4 digit terakhir identitas, WhatsApp, dan sesi Satpam yang valid.",
		})
		return
	}

	item, err := h.store.StartVerification(r.Context(), repo.StartVerificationParams{
		ItemID:                itemID,
		LostReportID:          req.LostReportID,
		ClaimantName:          req.ClaimantName,
		ClaimantIDType:        req.ClaimantIDType,
		ClaimantIdentityLast4: req.ClaimantIdentityLast4,
		ClaimantWA:            req.ClaimantWA,
		StaffID:               req.StaffID,
	})
	if err != nil {
		switch {
		case errors.Is(err, repo.ErrVerificationItemNotFound):
			writeJSON(w, http.StatusNotFound, map[string]string{"error": err.Error()})
		case errors.Is(err, repo.ErrVerificationStaffNotFound):
			writeJSON(w, http.StatusForbidden, map[string]string{"error": err.Error()})
		case errors.Is(err, repo.ErrVerificationItemUnavailable),
			errors.Is(err, repo.ErrVerificationMatchNotFound):
			writeJSON(w, http.StatusConflict, map[string]string{"error": err.Error()})
		default:
			log.Printf("Gagal memulai verifikasi barang %q: %v", itemID, err)
			writeJSON(w, http.StatusInternalServerError, map[string]string{
				"error": "Verifikasi tidak dapat disimpan. Silakan coba kembali.",
			})
		}
		return
	}

	var anomalies []string
	if h.store.HasPriorFailedClaim30Days(item.Claim.ClaimantName, item.Claim.ClaimantWA) {
		anomalies = append(anomalies, "A1")
	}
	if item.Claim != nil && item.Claim.RejectCount >= 2 {
		anomalies = append(anomalies, "A2")
	}
	h.store.AddAuditLog("start_verify", item.ItemID, "satpam",
		"Pemohon: "+item.Claim.ClaimantName+" ("+item.Claim.ClaimantIDType+")", anomalies...)

	writeJSON(w, http.StatusOK, map[string]any{
		"item_id": item.ItemID,
		"status":  item.Status,
		"claim":   item.Claim,
	})
}

func validStartVerificationRequest(req startVerifyRequest) bool {
	if req.StaffID <= 0 ||
		utf8.RuneCountInString(req.ClaimantName) < 3 ||
		utf8.RuneCountInString(req.ClaimantName) > 60 ||
		len(req.ClaimantIdentityLast4) != 4 ||
		len(req.LostReportID) > 20 {
		return false
	}

	switch req.ClaimantIDType {
	case "ktm", "ktp", "sim", "paspor", "lainnya":
	default:
		return false
	}

	for _, digit := range req.ClaimantIdentityLast4 {
		if digit < '0' || digit > '9' {
			return false
		}
	}

	digitCount := 0
	for _, digit := range req.ClaimantWA {
		if digit >= '0' && digit <= '9' {
			digitCount++
		}
	}
	return digitCount >= 8 && len(req.ClaimantWA) <= 20
}

func (h *HandoverHandler) RejectClaim(w http.ResponseWriter, r *http.Request) {
	itemID := strings.TrimSpace(r.PathValue("item_id"))

	var req rejectClaimRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON tidak valid"})
		return
	}
	if strings.TrimSpace(req.Reason) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Alasan penolakan wajib diisi"})
		return
	}

	item, err := h.store.RejectClaim(itemID, req.Reason)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	h.store.AddAuditLog("reject_claim", item.ItemID, "satpam",
		"Alasan: "+req.Reason, "A3")

	writeJSON(w, http.StatusOK, map[string]any{
		"item_id": item.ItemID,
		"status":  item.Status,
		"claim":   item.Claim,
	})
}

func (h *HandoverHandler) CompleteHandover(w http.ResponseWriter, r *http.Request) {
	itemID := strings.TrimSpace(r.PathValue("item_id"))

	var req handoverRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON tidak valid"})
		return
	}
	if strings.TrimSpace(req.ReceiverName) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Nama penerima wajib diisi"})
		return
	}

	item, err := h.store.CompleteHandover(itemID, req.ReceiverName, req.ReceiverWA, req.LostReportID)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	var anomalies []string
	if item.Claim != nil && item.Claim.ClaimantName != "" &&
		!strings.EqualFold(strings.TrimSpace(item.Claim.ClaimantName), strings.TrimSpace(req.ReceiverName)) {
		anomalies = append(anomalies, "A7")
	}
	h.store.AddAuditLog("handover", item.ItemID, "satpam",
		"Penerima: "+req.ReceiverName, anomalies...)

	writeJSON(w, http.StatusOK, map[string]any{
		"item_id":  item.ItemID,
		"status":   item.Status,
		"handover": item.Handover,
	})
}
