package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"LostandFound/internal/core"
	"LostandFound/internal/handler"
	"LostandFound/internal/middleware"
	"LostandFound/internal/repo"
	"LostandFound/internal/service"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("File .env tidak ditemukan, menggunakan environment variable sistem")
	}

	ctx := context.Background()

	pool, err := core.NewPool(ctx)
	if err != nil {
		log.Fatal("Gagal menghubungkan PostgreSQL: ", err)
	}
	defer pool.Close()

	store := repo.NewStore(pool)

	otpService, err := service.NewOTPService(store)
	if err != nil {
		log.Fatalf("Gagal membuat OTP service: %v", err)
	}
	authService := service.NewAuthService(store)

	mux := buildMux(store, otpService, authService, cookieSecureFromEnv(), allowedOriginFromEnv())

	log.Println("Server jalan di http://localhost:8080")

	if err := http.ListenAndServe(":8080", middleware.RequestID(mux)); err != nil {
		log.Fatal(err)
	}
}

func cookieSecureFromEnv() bool {
	// Default aman (Secure=true). Hanya nonaktif kalau eksplisit "false" di
	// .env, misalnya untuk dev lokal lewat http://localhost.
	return os.Getenv("COOKIE_SECURE") != "false"
}

func allowedOriginFromEnv() string {
	origin := os.Getenv("ALLOWED_ORIGIN")
	if origin == "" {
		origin = "http://localhost:5173"
	}
	return origin
}

// buildMux merakit seluruh routing + middleware. Dipisah dari main() supaya
// bisa dipakai ulang di test tanpa server HTTP sungguhan.
func buildMux(
	store *repo.Store,
	otpService *service.OTPService,
	authService *service.AuthService,
	cookieSecure bool,
	allowedOrigin string,
) http.Handler {
	ho := handler.NewHandoverHandler(store)
	audit := handler.NewAuditHandler(store)
	found := handler.NewFoundHandler(store, otpService)
	pub := handler.NewPublicHandler(store, otpService)
	inventory := handler.NewInventoryHandler(store)
	otpHandler := handler.NewOTPHandler(otpService)
	authHandler := handler.NewAuthHandler(authService, cookieSecure)

	// Semua route staf didaftarkan di sini, lalu seluruh sub-mux ini dibungkus
	// RequireRole+CSRF sekaligus lewat prefix "/v1/staff/" di bawah. Default
	// tertutup: route baru yang ditambah di staffMux otomatis ikut terlindungi
	// tanpa perlu dibungkus satu-satu.
	staffMux := http.NewServeMux()
	staffMux.HandleFunc("GET /v1/staff/found-reports/pending", found.GetPendingFoundReports)
	staffMux.HandleFunc("POST /v1/staff/found-reports/{report_id}/receive", found.ReceiveFoundReport)
	staffMux.HandleFunc("POST /v1/staff/found-reports/{report_id}/receipt/send", found.SendFoundReceipt)
	staffMux.HandleFunc("GET /v1/staff/items", inventory.ListItems)
	staffMux.HandleFunc("POST /v1/staff/items/{item_id}/start-verify", ho.StartVerification)
	staffMux.HandleFunc("POST /v1/staff/items/{item_id}/reject-claim", ho.RejectClaim)
	staffMux.HandleFunc("POST /v1/staff/items/{item_id}/handover", ho.CompleteHandover)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /v1/public/meta/form-options", pub.GetOptions)
	mux.HandleFunc("GET /v1/public/items", pub.GetPublicItems)
	mux.HandleFunc("POST /v1/public/lost-reports", pub.CreateLostReport)
	mux.HandleFunc("POST /v1/public/found-reports", found.CreateFoundReport)
	mux.HandleFunc("POST /v1/public/otp/send", otpHandler.SendOTP)
	mux.HandleFunc("POST /v1/public/otp/verify", otpHandler.VerifyOTP)

	mux.HandleFunc("POST /auth/login", authHandler.Login)
	mux.Handle("POST /auth/logout",
		middleware.RequireRole(authService, "satpam", "admin")(
			middleware.CSRF(http.HandlerFunc(authHandler.Logout))))
	mux.Handle("GET /auth/me",
		middleware.RequireRole(authService, "satpam", "admin")(
			http.HandlerFunc(authHandler.Me)))

	// Pattern spesifik "GET /v1/staff/audit-logs" dicocokkan lebih dulu oleh
	// net/http.ServeMux daripada prefix "/v1/staff/" di bawahnya, jadi audit
	// log tetap admin-only walau route lain satpam+admin.
	mux.Handle("GET /v1/staff/audit-logs",
		middleware.RequireRole(authService, "admin")(
			http.HandlerFunc(audit.GetAuditLogs)))

	mux.Handle("/v1/staff/",
		middleware.RequireRole(authService, "satpam", "admin")(
			middleware.CSRF(staffMux)))

	return corsMiddleware(allowedOrigin)(mux)
}

func corsMiddleware(allowedOrigin string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-CSRF-Token")
			w.Header().Set("Access-Control-Allow-Credentials", "true")

			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
