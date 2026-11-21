package handler

import (
	"net/http"

	"LostandFound/internal/repo"
)

type AuditHandler struct {
	store *repo.Store
}

func NewAuditHandler(store *repo.Store) *AuditHandler {
	return &AuditHandler{store: store}
}

func (h *AuditHandler) GetAuditLogs(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"data": h.store.ListAuditLogs(),
	})
}