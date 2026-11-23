package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"LostandFound/internal/middleware"
	"LostandFound/internal/service"
)

type AuthHandler struct {
	authService  *service.AuthService
	cookieSecure bool
}

func NewAuthHandler(authService *service.AuthService, cookieSecure bool) *AuthHandler {
	return &AuthHandler{authService: authService, cookieSecure: cookieSecure}
}

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	MFACode  string `json:"mfa_code"`
}

type staffView struct {
	StaffID int64  `json:"staff_id"`
	Name    string `json:"name"`
	Role    string `json:"role"`
}

type sessionResponse struct {
	Staff              staffView `json:"staff"`
	CSRFToken          string    `json:"csrf_token"`
	IdleTimeoutSeconds int       `json:"idle_timeout_seconds"`
	SessionExpiresAt   time.Time `json:"session_expires_at"`
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "JSON tidak valid"})
		return
	}

	result, err := h.authService.Login(r.Context(), req.Username, req.Password, req.MFACode)
	if err != nil {
		if errors.Is(err, service.ErrInvalidCredentials) {
			writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Username atau password salah"})
			return
		}
		writeInternalError(w, r, "Login", err)
		return
	}

	h.setSessionCookie(w, result.Token, result.SessionExpiresAt)

	writeJSON(w, http.StatusOK, sessionResponse{
		Staff:              staffView{StaffID: result.Staff.StaffID, Name: result.Staff.Name, Role: result.Staff.Role},
		CSRFToken:          result.CSRFToken,
		IdleTimeoutSeconds: result.IdleTimeoutSeconds,
		SessionExpiresAt:   result.SessionExpiresAt,
	})
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie(middleware.SessionCookieName)
	if err == nil {
		_ = h.authService.Logout(r.Context(), cookie.Value)
	}

	h.clearSessionCookie(w)
	w.WriteHeader(http.StatusNoContent)
}

func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	sess, ok := middleware.SessionFromContext(r.Context())
	if !ok {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Silakan login"})
		return
	}

	writeJSON(w, http.StatusOK, sessionResponse{
		Staff:              staffView{StaffID: sess.StaffID, Name: sess.StaffName, Role: sess.StaffRole},
		CSRFToken:          sess.CSRFToken,
		IdleTimeoutSeconds: sess.IdleTimeoutSeconds,
		SessionExpiresAt:   sess.SessionExpiresAt,
	})
}

func (h *AuthHandler) setSessionCookie(w http.ResponseWriter, token string, expiresAt time.Time) {
	http.SetCookie(w, &http.Cookie{
		Name:     middleware.SessionCookieName,
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   h.cookieSecure,
		SameSite: http.SameSiteStrictMode,
		Expires:  expiresAt,
	})
}

func (h *AuthHandler) clearSessionCookie(w http.ResponseWriter) {
	http.SetCookie(w, &http.Cookie{
		Name:     middleware.SessionCookieName,
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   h.cookieSecure,
		SameSite: http.SameSiteStrictMode,
		Expires:  time.Unix(0, 0),
		MaxAge:   -1,
	})
}
