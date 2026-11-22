package handler

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net"
	"net/http"
	"strings"

	"LostandFound/internal/repo"
)

type OTPService interface {
	SendOTP(
		rctx context.Context,
		phone string,
		purpose string,
		ip string,
	) error

	VerifyOTP(
		ctx context.Context,
		phone string,
		purpose string,
		code string,
	) (string, error)
}

type OTPHandler struct {
	service OTPService
}

func NewOTPHandler(service OTPService) *OTPHandler {
	return &OTPHandler{service: service}
}

type sendOTPRequest struct {
	Phone   string `json:"phone"`
	Purpose string `json:"purpose"`
}

type verifyOTPRequest struct {
	Phone   string `json:"phone"`
	Purpose string `json:"purpose"`
	Code    string `json:"code"`
}

func (h *OTPHandler) SendOTP(w http.ResponseWriter, r *http.Request) {
	var req sendOTPRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "JSON tidak valid",
		})
		return
	}

	req.Phone = strings.TrimSpace(req.Phone)
	req.Purpose = strings.TrimSpace(req.Purpose)

	if req.Phone == "" || req.Purpose == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Nomor WhatsApp dan tujuan OTP wajib diisi",
		})
		return
	}

	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		ip = r.RemoteAddr
	}

	err = h.service.SendOTP(r.Context(), req.Phone, req.Purpose, ip)
	if err != nil {
		if errors.Is(err, repo.ErrOTPCooldown) {
			writeJSON(w, http.StatusTooManyRequests, map[string]string{
				"error": err.Error(),
			})
			return
		}

		log.Printf("Gagal mengirim OTP: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal mengirim kode OTP. Silakan coba kembali.",
		})
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"message": "Kode OTP berhasil dikirim",
	})
}

func (h *OTPHandler) VerifyOTP(w http.ResponseWriter, r *http.Request) {
	var req verifyOTPRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "JSON tidak valid",
		})
		return
	}

	req.Phone = strings.TrimSpace(req.Phone)
	req.Purpose = strings.TrimSpace(req.Purpose)
	req.Code = strings.TrimSpace(req.Code)

	if req.Phone == "" || req.Purpose == "" || req.Code == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Nomor WhatsApp, tujuan, dan kode OTP wajib diisi",
		})
		return
	}

	token, err := h.service.VerifyOTP(
		r.Context(),
		req.Phone,
		req.Purpose,
		req.Code,
	)
	if err != nil {
		switch {
		case errors.Is(err, repo.ErrOTPNotFound),
			errors.Is(err, repo.ErrOTPExpired),
			errors.Is(err, repo.ErrOTPInvalid):
			writeJSON(w, http.StatusBadRequest, map[string]string{
				"error": err.Error(),
			})

		case errors.Is(err, repo.ErrOTPAttempts):
			writeJSON(w, http.StatusTooManyRequests, map[string]string{
				"error": err.Error(),
			})

		default:
			log.Printf("Gagal memverifikasi OTP: %v", err)
			writeJSON(w, http.StatusInternalServerError, map[string]string{
				"error": "Gagal memverifikasi kode OTP",
			})
		}
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"message":            "Nomor WhatsApp berhasil diverifikasi",
		"verification_token": token,
	})
}
