package main

import (
	"context"
	"log"
	"net/http"

	"LostandFound/internal/core"
	"LostandFound/internal/handler"
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

	ho := handler.NewHandoverHandler(store)
	audit := handler.NewAuditHandler(store)
	auth := handler.NewAuthHandler(store)

	otpService, err := service.NewOTPService(store)
	if err != nil {
		log.Fatalf("Gagal membuat OTP service: %v", err)
	}

	found := handler.NewFoundHandler(store, otpService)
	pub := handler.NewPublicHandler(store, otpService)
	inventory := handler.NewInventoryHandler(store)
	matching := handler.NewMatchingHandler(store)
	otpHandler := handler.NewOTPHandler(otpService)

	mux := http.NewServeMux()

	mux.HandleFunc("POST /v1/auth/login", auth.LoginSatpam)
	mux.HandleFunc("GET /v1/public/meta/form-options", pub.GetOptions)
	mux.HandleFunc("GET /v1/public/items", pub.GetPublicItems)
	mux.HandleFunc("POST /v1/public/lost-reports", pub.CreateLostReport)
	mux.HandleFunc("POST /v1/public/found-reports", found.CreateFoundReport)

	// Antrean dan penerimaan barang temuan
	mux.HandleFunc("GET /v1/staff/found-reports/pending", found.GetPendingFoundReports)
	mux.HandleFunc("POST /v1/staff/found-reports/{report_id}/receive", found.ReceiveFoundReport)
	mux.HandleFunc("POST /v1/staff/found-reports/{report_id}/receipt/send", found.SendFoundReceipt)
	mux.HandleFunc("GET /v1/staff/items", inventory.ListItems)
	mux.HandleFunc("GET /v1/staff/matches", matching.ListMatches)

	mux.HandleFunc("POST /v1/staff/items/{item_id}/start-verify", ho.StartVerification)
	mux.HandleFunc("POST /v1/staff/items/{item_id}/reject-claim", ho.RejectClaim)
	mux.HandleFunc("POST /v1/staff/items/{item_id}/handover", ho.CompleteHandover)

	mux.HandleFunc("GET /v1/staff/audit-logs", audit.GetAuditLogs)

	mux.HandleFunc("POST /v1/public/otp/send", otpHandler.SendOTP)
	mux.HandleFunc("POST /v1/public/otp/verify", otpHandler.VerifyOTP)

	log.Println("Server jalan di http://localhost:8080")

	if err := http.ListenAndServe(":8080", corsMiddleware(mux)); err != nil {
		log.Fatal(err)
	}
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
