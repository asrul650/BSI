package handler

import (
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"
	"strings"

	"LostandFound/internal/repo"
)

type AuthHandler struct {
	store *repo.Store
}

func NewAuthHandler(store *repo.Store) *AuthHandler {
	return &AuthHandler{store: store}
}

type satpamLoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *AuthHandler) LoginSatpam(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(http.MaxBytesReader(w, r.Body, 2<<10))
	decoder.DisallowUnknownFields()

	var request satpamLoginRequest
	if err := decoder.Decode(&request); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Data login tidak valid.",
		})
		return
	}
	if err := decoder.Decode(&struct{}{}); !errors.Is(err, io.EOF) {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Data login tidak valid.",
		})
		return
	}

	request.Username = strings.TrimSpace(request.Username)
	if request.Username == "" || len(request.Username) > 64 || request.Password == "" || len(request.Password) > 72 {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Username atau password salah.",
		})
		return
	}

	staff, err := h.store.AuthenticateSatpam(r.Context(), request.Username, request.Password)
	if errors.Is(err, repo.ErrInvalidSatpamCredentials) {
		writeJSON(w, http.StatusUnauthorized, map[string]string{
			"error": "Username atau password salah.",
		})
		return
	}
	if err != nil {
		log.Printf("Gagal memproses login Satpam: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Layanan login sedang bermasalah.",
		})
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"staff": staff,
	})
}
