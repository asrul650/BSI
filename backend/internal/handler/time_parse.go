package handler

import (
	"errors"
	"strings"
	"time"
)

func parseLostAt(raw string, now time.Time) (time.Time, error) {
	trimmed := strings.TrimSpace(raw)
	if trimmed == "" {
		return now, nil
	}

	parsed, err := time.Parse(time.RFC3339, trimmed)
	if err != nil {
		return time.Time{}, errors.New("format lost_at harus RFC3339 (contoh: 2026-11-19T10:00:00+07:00)")
	}

	if parsed.After(now.Add(5 * time.Minute)) {
		return time.Time{}, errors.New("lost_at tidak boleh di masa depan")
	}

	if now.Sub(parsed) > 60*24*time.Hour {
		return time.Time{}, errors.New("lost_at maksimal 60 hari yang lalu")
	}

	return parsed, nil
}