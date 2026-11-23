package middleware

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"net/http"
)

type requestIDKey struct{}

const RequestIDHeader = "X-Request-Id"

// RequestID memastikan setiap request punya ID acak yang bisa dicocokkan
// dengan log server, tanpa membocorkan detail internal ke klien.
func RequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id, err := generateRequestID()
		if err != nil {
			id = "unknown"
		}

		w.Header().Set(RequestIDHeader, id)
		ctx := context.WithValue(r.Context(), requestIDKey{}, id)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func generateRequestID() (string, error) {
	b := make([]byte, 8)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

// GetRequestID mengambil request ID dari context. Mengembalikan "unknown"
// kalau middleware RequestID belum dipasang.
func GetRequestID(ctx context.Context) string {
	id, ok := ctx.Value(requestIDKey{}).(string)
	if !ok || id == "" {
		return "unknown"
	}
	return id
}
