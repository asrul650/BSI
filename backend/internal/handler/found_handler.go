package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"LostandFound/internal/repo"
)

type FoundHandler struct {
	store *repo.Store
}

func NewFoundHandler(store *repo.Store) *FoundHandler {
	return &FoundHandler{store: store}
}

type foundReportRequest struct {
	CategoryID       int    `json:"category_id"`
	Color            string `json:"color"`
	LocationID       int    `json:"location_id"`
	Description      string `json:"description"`
	FinderName       string `json:"finder_name"`
	FinderWhatsApp   string `json:"finder_whatsapp"`
}

type createFoundRequest struct {
	CategoryID      int    `json:"category_id"`
	Color           string `json:"color"`
	LocationID      int    `json:"location_id"`
	Description     string `json:"description"`
	FinderName      string `json:"finder_name"`
	FinderWhatsApp  string `json:"finder_whatsapp"`
}

type receiveFoundRequest struct {
	StorageRack string `json:"storage_rack"`
	PostName    string `json:"post_name"`
}

func (h *FoundHandler) CreateFoundReport(w http.ResponseWriter, r *http.Request) {
	var req foundReportRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON tidak valid"})
		return
	}

	req.Description = strings.TrimSpace(req.Description)
	req.FinderWhatsApp = strings.TrimSpace(req.FinderWhatsApp)

	if req.CategoryID == 0 || req.LocationID == 0 || req.FinderWhatsApp == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Data wajib belum lengkap"})
		return
	}
	if len(req.Description) < 10 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Deskripsi minimal 10 karakter"})
		return
	}

	saved := h.store.AddFoundReport(repo.FoundReport{
		CategoryID:       req.CategoryID,
		Color:            req.Color,
		LocationID:       req.LocationID,
		FoundAt:          time.Now(),
		Description:      req.Description,
		FinderName:       strings.TrimSpace(req.FinderName),
		FinderWhatsApp:   req.FinderWhatsApp,
	})
	writeJSON(w, http.StatusCreated, saved)
}

func (h *FoundHandler) ReceiveFoundReport(w http.ResponseWriter, r *http.Request) {
	reportID := strings.TrimSpace(r.PathValue("report_id"))

	var req receiveFoundRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON tidak valid"})
		return
	}
	if strings.TrimSpace(req.StorageRack) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Lokasi rak penyimpanan wajib diisi"})
		return
	}

	item, matches, err := h.store.ReceiveFoundReport(reportID, strings.TrimSpace(req.StorageRack), strings.TrimSpace(req.PostName))
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	} 
	h.store.AddAuditLog("receive_found", item.ItemID, "satpam",
    "Dari laporan "+reportID+", rak: "+item.StorageRack)

	for _, m := range matches {
		if m.Score >= 80 {
			log.Printf("[MATCH] Barang %s cocok dengan laporan %s (skor %.2f, band %s)",
				item.ItemID, m.ReportID, m.Score, m.Band)
		}
	}

	writeJSON(w, http.StatusCreated, map[string]any{
		"item_id":      item.ItemID,
		"status":       item.Status,
		"storage_rack": item.StorageRack,
		"post_name":    item.PostName,
		"matches":      matches,
	})
}