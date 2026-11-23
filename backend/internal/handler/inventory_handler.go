package handler

import (
	"log"
	"net/http"

	"LostandFound/internal/repo"
)

type InventoryHandler struct {
	store *repo.Store
}

func NewInventoryHandler(store *repo.Store) *InventoryHandler {
	return &InventoryHandler{store: store}
}

func (h *InventoryHandler) ListItems(w http.ResponseWriter, r *http.Request) {
	items, err := h.store.ListInventoryItems(r.Context())
	if err != nil {
		log.Printf("Gagal mengambil daftar inventaris: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal mengambil daftar inventaris",
		})
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"data":  items,
		"total": len(items),
	})
}
