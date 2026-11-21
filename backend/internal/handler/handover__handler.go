package handler

import (
	"encoding/json"
	"net/http"
	"strings"

	"LostandFound/internal/repo"
)

type HandoverHandler struct {
	store *repo.Store
}

func NewHandoverHandler(store *repo.Store) *HandoverHandler {
	return &HandoverHandler{store: store}
}

type startVerifyRequest struct {
	ClaimantName   string `json:"claimant_name"`
	ClaimantIDType string `json:"claimant_id_type"`
	ClaimantWA     string `json:"claimant_wa"`
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
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON tidak valid"})
		return
	}
	if strings.TrimSpace(req.ClaimantName) == "" || strings.TrimSpace(req.ClaimantIDType) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Nama dan jenis identitas pemohon wajib diisi"})
		return
	}

	item, err := h.store.StartVerification(itemID, repo.ClaimInfo{
		ClaimantName:   req.ClaimantName,
		ClaimantIDType: req.ClaimantIDType,
		ClaimantWA:     req.ClaimantWA,
	})
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
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