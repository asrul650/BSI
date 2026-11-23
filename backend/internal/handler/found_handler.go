package handler

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
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
	CategoryID        int    `json:"category_id"`
	Color             string `json:"color"`
	LocationID        int    `json:"location_id"`
	ItemName          string `json:"item_name"`
	Description       string `json:"description"`
	FinderName        string `json:"finder_name"`
	FinderWhatsApp    string `json:"finder_whatsapp"`
	VerificationToken string `json:"verification_token"`
	Consent           bool   `json:"consent"`
}

type createFoundRequest struct {
	CategoryID     int    `json:"category_id"`
	Color          string `json:"color"`
	LocationID     int    `json:"location_id"`
	Description    string `json:"description"`
	FinderName     string `json:"finder_name"`
	FinderWhatsApp string `json:"finder_whatsapp"`
}

type receiveFoundRequest struct {
	StorageRack string `json:"storage_rack"`
	Condition   string `json:"condition"`
	PostName    string `json:"post_name"`
	IntakePhoto string `json:"intake_photo"`
}

const maxIntakePhotoSize = 4 << 20

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
	r.Body = http.MaxBytesReader(w, r.Body, 6<<20)
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		var maxBytesErr *http.MaxBytesError
		if errors.As(err, &maxBytesErr) {
			writeJSON(w, http.StatusRequestEntityTooLarge, map[string]string{"error": "Ukuran data penerimaan terlalu besar"})
			return
		}
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON tidak valid"})
		return
	}
	if strings.TrimSpace(req.StorageRack) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Lokasi rak penyimpanan wajib diisi"})
		return
	}
	if strings.TrimSpace(req.Condition) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Kondisi fisik barang wajib dipilih"})
		return
	}

	photoData, photoMimeType, err := decodeIntakePhoto(req.IntakePhoto)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	item, err := h.store.ReceiveFoundReport(
		r.Context(),
		reportID,
		strings.TrimSpace(req.StorageRack),
		strings.TrimSpace(req.Condition),
		photoData,
		photoMimeType,
	)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	h.store.AddAuditLog("receive_found", item.ItemID, "satpam",
		"Dari laporan "+reportID+", rak: "+item.StorageRack)

	writeJSON(w, http.StatusCreated, map[string]any{
		"item_id":          item.ItemID,
		"status":           item.Status,
		"storage_rack":     item.StorageRack,
		"received_by_name": item.ReceivedByName,
		"post_name":        strings.TrimSpace(req.PostName),
		"photo_saved":      len(photoData) > 0,
		"matches":          []repo.MatchResult{},
	})
}

func decodeIntakePhoto(dataURL string) ([]byte, string, error) {
	dataURL = strings.TrimSpace(dataURL)
	if dataURL == "" {
		return nil, "", nil
	}

	header, encoded, ok := strings.Cut(dataURL, ",")
	if !ok || !strings.HasPrefix(header, "data:") || !strings.HasSuffix(header, ";base64") {
		return nil, "", errors.New("Format foto harus berupa data URL gambar base64")
	}

	declaredMimeType := strings.TrimSuffix(strings.TrimPrefix(header, "data:"), ";base64")
	photoData, err := base64.StdEncoding.DecodeString(encoded)
	if err != nil {
		return nil, "", errors.New("Data foto tidak valid")
	}
	if len(photoData) == 0 {
		return nil, "", errors.New("Foto tidak boleh kosong")
	}
	if len(photoData) > maxIntakePhotoSize {
		return nil, "", errors.New("Ukuran foto maksimal 4 MB")
	}

	detectedMimeType := http.DetectContentType(photoData)
	switch detectedMimeType {
	case "image/jpeg", "image/png", "image/webp":
	default:
		return nil, "", errors.New("Format foto yang didukung adalah JPG, PNG, atau WEBP")
	}
	if declaredMimeType != detectedMimeType {
		return nil, "", errors.New("Tipe data foto tidak sesuai dengan isi file")
	}

	return photoData, detectedMimeType, nil
}

func (h *FoundHandler) GetPendingFoundReports(w http.ResponseWriter, r *http.Request) {
	reports, err := h.store.GetPendingFoundReports(r.Context())
	if err != nil {
		log.Printf("Gagal mengambil antrean laporan temuan: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal mengambil antrean laporan temuan",
		})
		return
	}

	stats, err := h.store.GetFoundIntakeStats(r.Context())
	if err != nil {
		log.Printf("Gagal mengambil statistik antrean penerimaan: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal mengambil statistik antrean penerimaan",
		})
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"data":  reports,
		"total": len(reports),
		"stats": stats,
	})
}

func (h *FoundHandler) SendFoundReceipt(w http.ResponseWriter, r *http.Request) {
	reportID := strings.TrimSpace(r.PathValue("report_id"))
	receipt, err := h.store.GetFoundReceipt(r.Context(), reportID)
	if err != nil {
		if errors.Is(err, repo.ErrFoundReceiptNotAvailable) {
			writeJSON(w, http.StatusConflict, map[string]string{
				"error": "Bukti hanya dapat dikirim setelah penerimaan barang berhasil.",
			})
			return
		}
		log.Printf("Gagal mengambil bukti penerimaan %s: %v", reportID, err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal mengambil bukti penerimaan barang.",
		})
		return
	}

	greeting := "Halo"
	if name := strings.TrimSpace(receipt.FinderName); name != "" {
		greeting += " " + name
	}
	receivedAt := receipt.ReceivedAt.In(time.FixedZone("WIB", 7*60*60))
	message := fmt.Sprintf(
		"%s, barang temuan Anda telah diterima oleh petugas Satpam Lost & Found UII.\n\nNomor laporan: %s\nID inventaris: %s\nWaktu diterima: %s WIB\nPetugas penerima: %s\n\nSimpan pesan ini sebagai bukti penerimaan barang.",
		greeting,
		receipt.ReportID,
		receipt.ItemID,
		receivedAt.Format("02-01-2006 15:04"),
		receipt.ReceivedByName,
	)
	if err := h.otpService.SendWhatsAppMessage(
		r.Context(),
		receipt.FinderWhatsApp,
		message,
	); err != nil {
		log.Printf("Gagal mengirim bukti penerimaan %s: %v", reportID, err)
		writeJSON(w, http.StatusBadGateway, map[string]string{
			"error": "Gagal mengirim bukti WhatsApp: " + err.Error(),
		})
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"status":    "sent",
		"report_id": receipt.ReportID,
		"item_id":   receipt.ItemID,
	})
}
