package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"LostandFound/internal/repo"
)

type PublicHandler struct {
	store *repo.Store
}

func NewPublicHandler(store *repo.Store) *PublicHandler {
	return &PublicHandler{store: store}
}

type lostReportRequest struct {
	CategoryID       int    `json:"category_id"`
	Color            string `json:"color"`
	LocationID       int    `json:"location_id"`
	LostAt           string `json:"lost_at,omitempty"`
	Description      string `json:"description"`
	ReporterName     string `json:"reporter_name"`
	ReporterWhatsApp string `json:"reporter_whatsapp"`
}

func (h *PublicHandler) GetOptions(w http.ResponseWriter, r *http.Request) {
	cats, cols, locs := h.store.Options()
	writeJSON(w, http.StatusOK, map[string]any{
		"categories": cats,
		"colors":     cols,
		"locations":  locs,
	})
}

func (h *PublicHandler) GetPublicItems(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"data": h.store.PublicItems(),
	})
}

func (h *PublicHandler) CreateLostReport(w http.ResponseWriter, r *http.Request) {
	var req lostReportRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON tidak valid"})
		return
	}

	req.Description = strings.TrimSpace(req.Description)
	req.ReporterName = strings.TrimSpace(req.ReporterName)
	req.ReporterWhatsApp = strings.TrimSpace(req.ReporterWhatsApp)

	if req.CategoryID == 0 || req.LocationID == 0 || req.ReporterName == "" || req.ReporterWhatsApp == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Data wajib belum lengkap"})
		return
	}
	if len(req.Description) < 10 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Deskripsi minimal 10 karakter"})
		return
	}

	now := time.Now()
	lostAt, err := parseLostAt(req.LostAt, now)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	saved := h.store.AddLostReport(repo.LostReport{
		CategoryID:       req.CategoryID,
		Color:            req.Color,
		LocationID:       req.LocationID,
		LostAt:           lostAt,
		Description:      req.Description,
		ReporterName:     req.ReporterName,
		ReporterWhatsApp: req.ReporterWhatsApp,
	})

	matches := h.store.FindMatches(saved)
	for _, m := range matches {
		log.Printf("[MATCH] Laporan %s -> barang %s | skor: %.2f | band: %s",
			saved.ReportID, m.ItemID, m.Score, m.Band)
	}

	writeJSON(w, http.StatusCreated, map[string]any{
		"report":  saved,
		"matches": matches,
	})
}

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}