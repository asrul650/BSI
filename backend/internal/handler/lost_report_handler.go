package handler

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strings"
	"unicode/utf8"

	"LostandFound/internal/repo"
)

type LostReportHandler struct {
	store *repo.Store
}

func NewLostReportHandler(store *repo.Store) *LostReportHandler {
	return &LostReportHandler{store: store}
}

func (h *LostReportHandler) ListLostReports(w http.ResponseWriter, r *http.Request) {
	status := strings.ToLower(strings.TrimSpace(r.URL.Query().Get("status")))
	switch status {
	case "", "aktif", "memiliki_kandidat", "selesai", "ditutup":
	default:
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Filter status tidak valid",
		})
		return
	}

	reportID := strings.TrimSpace(r.URL.Query().Get("report_id"))
	if len(reportID) > 20 || (reportID != "" && !strings.HasPrefix(strings.ToUpper(reportID), "HL-")) {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "report_id harus diawali HL- dan maksimal 20 karakter",
		})
		return
	}
	if reportID != "" {
		reportID = "HL-" + reportID[3:]
	}

	page, err := parsePageValue(r, "page", 1, 1000000)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	pageSize, err := parsePageValue(r, "page_size", 20, 50)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	reports, total, err := h.store.ListStaffLostReports(r.Context(), status, reportID, page, pageSize)
	if err != nil {
		log.Printf("Gagal mengambil daftar laporan kehilangan: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal mengambil daftar laporan kehilangan",
		})
		return
	}
	summary, err := h.store.LostReportStatusSummary(r.Context())
	if err != nil {
		log.Printf("Gagal mengambil ringkasan laporan kehilangan: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal mengambil ringkasan laporan kehilangan",
		})
		return
	}

	w.Header().Set("Cache-Control", "no-store")
	writeJSON(w, http.StatusOK, map[string]any{
		"data":      reports,
		"page":      page,
		"page_size": pageSize,
		"total":     total,
		"summary":   summary,
	})
}

func (h *LostReportHandler) CloseLostReport(w http.ResponseWriter, r *http.Request) {
	reportID := strings.TrimSpace(r.PathValue("report_id"))
	if reportID == "" || len(reportID) > 20 {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "report_id tidak valid",
		})
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, 4096)
	var request struct {
		Reason string `json:"reason"`
	}
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&request); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "JSON alasan penutupan tidak valid",
		})
		return
	}
	request.Reason = strings.TrimSpace(request.Reason)
	reasonLength := utf8.RuneCountInString(request.Reason)
	if reasonLength == 0 || reasonLength > 500 {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Alasan penutupan wajib diisi maksimal 500 karakter",
		})
		return
	}

	report, err := h.store.CloseLostReport(r.Context(), reportID, request.Reason)
	if errors.Is(err, repo.ErrLostReportNotFound) {
		writeJSON(w, http.StatusNotFound, map[string]string{
			"error": "Laporan kehilangan tidak ditemukan",
		})
		return
	}
	if errors.Is(err, repo.ErrLostReportNotClosable) {
		writeJSON(w, http.StatusConflict, map[string]string{
			"error": "Status laporan tidak dapat ditutup",
		})
		return
	}
	if err != nil {
		log.Printf("Gagal menutup laporan kehilangan %s: %v", reportID, err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal menutup laporan kehilangan",
		})
		return
	}

	w.Header().Set("Cache-Control", "no-store")
	writeJSON(w, http.StatusOK, report)
}
