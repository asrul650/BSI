package middleware

import (
	"context"
	"crypto/subtle"
	"encoding/json"
	"net/http"
	"strings"

	"LostandFound/internal/service"
)

// SessionCookieName adalah nama cookie sesi staf (lihat openapi.yaml).
const SessionCookieName = "lf_session"

// CSRFHeaderName adalah header yang wajib dikirim untuk setiap request
// POST/PUT/PATCH/DELETE ke /v1/staff/* dan /auth/logout.
const CSRFHeaderName = "X-CSRF-Token"

type contextKey string

const sessionContextKey contextKey = "staff_session"

// SessionValidator adalah subset dari *service.AuthService yang dibutuhkan
// middleware. Interface ini membuat middleware bisa diuji dengan
// AuthService asli yang repo-nya diganti fake, tanpa Postgres hidup.
type SessionValidator interface {
	ValidateSession(ctx context.Context, token string) (service.SessionView, error)
}

// RequireRole menolak request tanpa sesi valid (401) atau dengan role yang
// tidak diizinkan (403). Default tertutup: role yang tidak ada di daftar
// `roles` selalu ditolak, termasuk kalau daftar itu kosong. Admin yang
// sesinya belum lolos MFA ikut ditolak (403) walau role-nya cocok.
func RequireRole(validator SessionValidator, roles ...string) func(http.Handler) http.Handler {
	allowed := make(map[string]bool, len(roles))
	for _, r := range roles {
		allowed[r] = true
	}

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			cookie, err := r.Cookie(SessionCookieName)
			if err != nil || strings.TrimSpace(cookie.Value) == "" {
				writeAuthError(w, r, http.StatusUnauthorized, "Silakan login")
				return
			}

			sess, err := validator.ValidateSession(r.Context(), cookie.Value)
			if err != nil {
				writeAuthError(w, r, http.StatusUnauthorized, "Sesi tidak valid")
				return
			}

			if !allowed[sess.StaffRole] {
				writeAuthError(w, r, http.StatusForbidden, "Akses ditolak")
				return
			}

			if sess.StaffRole == "admin" && !sess.MFAVerified {
				writeAuthError(w, r, http.StatusForbidden, "MFA wajib")
				return
			}

			ctx := context.WithValue(r.Context(), sessionContextKey, sess)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// CSRF menolak request pengubah data (POST/PUT/PATCH/DELETE) yang header
// X-CSRF-Token-nya tidak cocok dengan token di sesi. Harus dipasang di
// dalam RequireRole supaya sesi sudah ada di context.
func CSRF(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet, http.MethodHead, http.MethodOptions:
			next.ServeHTTP(w, r)
			return
		}

		sess, ok := SessionFromContext(r.Context())
		if !ok {
			writeAuthError(w, r, http.StatusUnauthorized, "Silakan login")
			return
		}

		headerToken := r.Header.Get(CSRFHeaderName)
		if headerToken == "" || subtle.ConstantTimeCompare([]byte(headerToken), []byte(sess.CSRFToken)) != 1 {
			writeAuthError(w, r, http.StatusForbidden, "CSRF token tidak valid")
			return
		}

		next.ServeHTTP(w, r)
	})
}

// SessionFromContext mengambil sesi staf yang sudah divalidasi RequireRole.
func SessionFromContext(ctx context.Context) (service.SessionView, bool) {
	sess, ok := ctx.Value(sessionContextKey).(service.SessionView)
	return sess, ok
}

func writeAuthError(w http.ResponseWriter, r *http.Request, status int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(map[string]string{
		"error":      message,
		"request_id": GetRequestID(r.Context()),
	})
}
