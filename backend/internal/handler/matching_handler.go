package handler

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"LostandFound/internal/repo"
)

type MatchingHandler struct {
	store *repo.Store
}

func NewMatchingHandler(store *repo.Store) *MatchingHandler {
	return &MatchingHandler{store: store}
}

func (h *MatchingHandler) ListMatches(w http.ResponseWriter, r *http.Request) {
	band := strings.ToLower(strings.TrimSpace(r.URL.Query().Get("band")))
	if band != "" && band != "tinggi" && band != "sedang" {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Filter band harus tinggi atau sedang",
		})
		return
	}

	needsReview := false
	if rawNeedsReview := strings.TrimSpace(r.URL.Query().Get("needs_review")); rawNeedsReview != "" {
		parsedNeedsReview, parseErr := strconv.ParseBool(rawNeedsReview)
		if parseErr != nil {
			writeJSON(w, http.StatusBadRequest, map[string]string{
				"error": "Filter needs_review harus bernilai true atau false",
			})
			return
		}
		needsReview = parsedNeedsReview
	}

	page, err := parsePageValue(r, "page", 1, 1000000)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	pageSize, err := parsePageValue(r, "page_size", 20, 100)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	allMatches, evaluatedPairs, err := h.store.RefreshStaffMatches(r.Context())
	if err != nil {
		log.Printf("Gagal menghitung hasil matching: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{
			"error": "Gagal menghitung hasil matching",
		})
		return
	}

	visibleMatches := make([]repo.StaffMatch, 0)
	highCount, mediumCount, notifiedCount, reviewCount := 0, 0, 0, 0
	for _, match := range allMatches {
		if match.Band != "tinggi" && match.Band != "sedang" {
			continue
		}

		if match.Band == "tinggi" {
			highCount++
		} else {
			mediumCount++
			reviewCount++
		}
		if match.Notified {
			notifiedCount++
		}

		if band != "" && match.Band != band {
			continue
		}
		if needsReview && match.Band != "sedang" && !match.QueuedForReview {
			continue
		}
		visibleMatches = append(visibleMatches, match)
	}

	total := len(visibleMatches)
	start := (page - 1) * pageSize
	if start > total {
		start = total
	}
	end := start + pageSize
	if end > total {
		end = total
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"data":            visibleMatches[start:end],
		"page":            page,
		"page_size":       pageSize,
		"total":           total,
		"evaluated_pairs": evaluatedPairs,
		"summary": map[string]int{
			"high":         highCount,
			"medium":       mediumCount,
			"notified":     notifiedCount,
			"needs_review": reviewCount,
		},
	})
}

func parsePageValue(r *http.Request, key string, defaultValue, maximum int) (int, error) {
	raw := strings.TrimSpace(r.URL.Query().Get(key))
	if raw == "" {
		return defaultValue, nil
	}

	value, err := strconv.Atoi(raw)
	if err != nil || value < 1 || value > maximum {
		return 0, fmt.Errorf("%s harus bernilai antara 1 dan %d", key, maximum)
	}
	return value, nil
}
