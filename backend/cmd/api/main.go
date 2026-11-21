package main

import (
	"log"
	"net/http"

	"LostandFound/internal/handler"
	"LostandFound/internal/repo"
)

func main() {
	store := repo.NewStore()
	pub := handler.NewPublicHandler(store)
	found := handler.NewFoundHandler(store)
	ho := handler.NewHandoverHandler(store)
	audit := handler.NewAuditHandler(store)

	mux := http.NewServeMux()
	mux.HandleFunc("GET /v1/public/meta/form-options", pub.GetOptions)
	mux.HandleFunc("GET /v1/public/items", pub.GetPublicItems)
	mux.HandleFunc("POST /v1/public/lost-reports", pub.CreateLostReport)
	mux.HandleFunc("POST /v1/public/found-reports", found.CreateFoundReport)
	mux.HandleFunc("POST /v1/staff/found-reports/{report_id}/receive", found.ReceiveFoundReport)
	mux.HandleFunc("POST /v1/staff/items/{item_id}/start-verify", ho.StartVerification)
	mux.HandleFunc("POST /v1/staff/items/{item_id}/reject-claim", ho.RejectClaim)
	mux.HandleFunc("POST /v1/staff/items/{item_id}/handover", ho.CompleteHandover)
	mux.HandleFunc("GET /v1/staff/audit-logs", audit.GetAuditLogs)

	log.Println("Server jalan di http://localhost:8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}