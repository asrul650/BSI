package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"LostandFound/internal/core"
	"LostandFound/internal/repo"
	"LostandFound/internal/service"
)

type FoundHandler struct {
	store      *repo.Store
	otpService *service.OTPService
}

func NewFoundHandler(
	store *repo.Store,
	otpService *service.OTPService,
) *FoundHandler {
	return &FoundHandler{
		store:      store,
		otpService: otpService,
	}
}

type foundReportRequest struct {
	CategoryID       int    `json:"category_id"`
	Color            string `json:"color"`
	LocationID       int    `json:"location_id"`
	ItemName         string `json:"item_name"`
	Description      string `json:"description"`
	FinderName       string `json:"finder_name"`
	FinderWhatsApp   string `json:"finder_whatsapp"`
	VerificationToken string `json:"verification_token"`
	Consent          bool   `json:"consent"`
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
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "JSON tidak valid",
		})
		return
	}

	// Bersihkan input.
	req.Color = strings.TrimSpace(req.Color)
	req.ItemName = strings.TrimSpace(req.ItemName)
	req.Description = strings.TrimSpace(req.Description)
	req.FinderName = strings.TrimSpace(req.FinderName)
	req.FinderWhatsApp = strings.TrimSpace(req.FinderWhatsApp)
	req.VerificationToken = strings.TrimSpace(req.VerificationToken)

	// Validasi data wajib.
	if req.CategoryID <= 0 ||
		req.LocationID <= 0 ||
		req.Color == "" ||
		req.ItemName == "" ||
		req.FinderName == "" ||
		req.FinderWhatsApp == "" ||
		req.VerificationToken == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Data wajib belum lengkap",
		})
		return
	}

	if !req.Consent {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Persetujuan penyimpanan data wajib diberikan",
		})
		return
	}

	if len(req.FinderName) < 3 || len(req.FinderName) > 60 {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Nama harus 3 sampai 60 karakter",
		})
		return
	}

	if len(req.ItemName) < 1 || len(req.ItemName) > 100 {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Nama barang harus terdiri dari 1 sampai 100 karakter",
		})
		return
	}

	if len(req.Description) < 10 || len(req.Description) > 300 {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Deskripsi harus 10 sampai 300 karakter",
		})
		return
	}

	// Buat ID laporan.
	reportID, err := core.GenerateTicketID("TM")
	if err != nil {
		log.Printf("Gagal membuat ID laporan ditemukan: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal membuat ID laporan",
		})
		return
	}

	now := time.Now()

	// Simpan laporan menggunakan OTPService dan PostgreSQL.
	err = h.otpService.CreateFoundReport(
		r.Context(),
		req.FinderWhatsApp,
		req.VerificationToken,
		repo.CreateFoundReportParams{
			ReportID:       reportID,
			CategoryID:     int64(req.CategoryID),
			Color:          req.Color,
			ItemName:       req.ItemName,
			LocationID:     int64(req.LocationID),
			FoundAt:        now,
			Description:    req.Description,
			FinderName:     req.FinderName,
			FinderWhatsApp: req.FinderWhatsApp,
			ConsentAt:      now,
		},
	)

	if err != nil {
		log.Printf("Gagal menyimpan laporan ditemukan: %v", err)

		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": err.Error(),
		})
		return
	}

	// Respons setelah laporan berhasil disimpan.
	saved := repo.FoundReport{
		ReportID:       reportID,
		Status:         "Menunggu Penyerahan",
		CategoryID:     int64(req.CategoryID),
		Color:          req.Color,
		LocationID:     int64(req.LocationID),
		FoundAt:        now,
		ItemName:       req.ItemName,
		Description:    req.Description,
		FinderName:     req.FinderName,
		FinderWhatsApp: req.FinderWhatsApp,
	}

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