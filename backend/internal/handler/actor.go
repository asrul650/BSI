package handler

import (
	"fmt"
	"net/http"

	"LostandFound/internal/middleware"
)

// actorFromRequest membangun string aktor audit log dari sesi staf yang
// sudah divalidasi middleware.RequireRole, menggantikan string tetap
// seperti "satpam" yang sebelumnya tidak mencerminkan siapa yang benar-benar
// melakukan aksi (F-01, F-03).
func actorFromRequest(r *http.Request) string {
	sess, ok := middleware.SessionFromContext(r.Context())
	if !ok {
		return "unknown"
	}
	return fmt.Sprintf("%s (%s)", sess.StaffName, sess.StaffUsername)
}
