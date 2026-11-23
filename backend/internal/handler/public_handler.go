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

type PublicHandler struct {
	store      *repo.Store
	otpService *service.OTPService
}

func NewPublicHandler(
	store *repo.Store,
	otpService *service.OTPService,
) *PublicHandler {
	return &PublicHandler{
		store:      store,
		otpService: otpService,
	}
}

type lostReportRequest struct {
	CategoryID        int    `json:"category_id"`
	Color             string `json:"color"`
	LocationID        int    `json:"location_id"`
	LostAt            string `json:"lost_at,omitempty"`
	Description       string `json:"description"`
	ReporterName      string `json:"reporter_name"`
	ReporterWhatsApp  string `json:"reporter_whatsapp"`
	VerificationToken string `json:"verification_token"`
	Consent           bool   `json:"consent"`
	ItemName          string `json:"item_name"`
}

func (h *PublicHandler) GetOptions(w http.ResponseWriter, r *http.Request) {
	cats, cols, locs, err := h.store.Options(r.Context())
	if err != nil {
		log.Printf("Gagal mengambil opsi formulir: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal mengambil opsi formulir",
		})
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"categories": cats,
		"colors":     cols,
		"locations":  locs,
	})
}

func (h *PublicHandler) GetPublicItems(w http.ResponseWriter, r *http.Request) {
	items, err := h.store.PublicItems(r.Context())
	if err != nil {
		log.Printf("Gagal mengambil daftar barang: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal mengambil daftar barang",
		})
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"data": items,
	})
}

func (h *PublicHandler) CreateLostReport(w http.ResponseWriter, r *http.Request) {
	var req lostReportRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "JSON tidak valid",
		})
		return
	}

	// Membersihkan input
	req.ItemName = strings.TrimSpace(req.ItemName)
	req.Color = strings.TrimSpace(req.Color)
	req.Description = strings.TrimSpace(req.Description)
	req.ReporterName = strings.TrimSpace(req.ReporterName)
	req.ReporterWhatsApp = strings.TrimSpace(req.ReporterWhatsApp)
	req.VerificationToken = strings.TrimSpace(req.VerificationToken)

	// Validasi data wajib
	if req.CategoryID <= 0 ||
		req.LocationID <= 0 ||
		req.ItemName == "" ||
		req.Color == "" ||
		req.ReporterName == "" ||
		req.ReporterWhatsApp == "" ||
		req.VerificationToken == "" {

		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Data wajib belum lengkap",
		})
		return
	}

	if !req.Consent {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Persetujuan penggunaan data wajib diberikan",
		})
		return
	}

	if len(req.Description) < 10 || len(req.Description) > 300 {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Deskripsi harus terdiri dari 10 sampai 300 karakter",
		})
		return
	}

	if len(req.ReporterName) < 3 || len(req.ReporterName) > 60 {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Nama harus terdiri dari 3 sampai 60 karakter",
		})
		return
	}

	// Validasi nama barang
	if len(req.ItemName) < 1 || len(req.ItemName) > 100 {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Nama barang harus terdiri dari 1 sampai 100 karakter",
		})
		return
	}

	// Validasi waktu kehilangan
	now := time.Now()

	lostAt, err := parseLostAt(req.LostAt, now)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": err.Error(),
		})
		return
	}

	// Membuat ID laporan
	reportID, err := core.GenerateTicketID("HL")
	if err != nil {
		log.Printf("Gagal membuat ID laporan: %v", err)

		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal membuat ID laporan",
		})
		return
	}

	// Menyimpan laporan ke PostgreSQL melalui OTP service
	err = h.otpService.CreateLostReport(
		r.Context(),
		req.ReporterWhatsApp,
		req.VerificationToken,
		repo.CreateLostReportParams{
			ReportID:         reportID,
			CategoryID:       int64(req.CategoryID),
			Color:            req.Color,
			LocationID:       int64(req.LocationID),
			LostAt:           lostAt,
			Description:      req.Description,
			ReporterName:     req.ReporterName,
			ItemName:         req.ItemName,
			ReporterWhatsApp: req.ReporterWhatsApp,
			ConsentAt:        now,
		},
	)

	if err != nil {
		log.Printf("Gagal menyimpan laporan kehilangan: %v", err)

		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Verifikasi WhatsApp gagal atau token tidak valid",
		})
		return
	}

	// Data laporan untuk proses pencocokan
	saved := repo.LostReport{
		ReportID:         reportID,
		CategoryID:       int64(req.CategoryID),
		Color:            req.Color,
		LocationID:       int64(req.LocationID),
		LostAt:           lostAt,
		Description:      req.Description,
		ReporterName:     req.ReporterName,
		ReporterWhatsApp: req.ReporterWhatsApp,
		ItemName:         req.ItemName,
		Status:           "Aktif",
	}

	writeJSON(w, http.StatusCreated, map[string]any{
		"message": "Laporan kehilangan berhasil dibuat",
		"report":  saved,
	})
}

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}
