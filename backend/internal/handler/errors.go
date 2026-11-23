package handler

import (
	"log"
	"net/http"

	"LostandFound/internal/middleware"
)

// writeInternalError mencatat detail error asli (termasuk pesan mentah dari
// Postgres) hanya ke log server, dan mengirim pesan generik + request_id ke
// klien. Dipakai untuk error yang berasal dari lapisan database/infrastruktur
// yang berpotensi membocorkan nama tabel, kolom, atau constraint.
func writeInternalError(w http.ResponseWriter, r *http.Request, context string, err error) {
	requestID := middleware.GetRequestID(r.Context())
	log.Printf("[%s] request_id=%s error=%v", context, requestID, err)

	writeJSON(w, http.StatusInternalServerError, map[string]string{
		"error":      "Terjadi kesalahan pada server. Coba lagi nanti.",
		"request_id": requestID,
	})
}
