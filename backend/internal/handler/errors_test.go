package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"LostandFound/internal/middleware"
)

func TestWriteInternalErrorHidesRawDetailAndIncludesRequestID(t *testing.T) {
	rawErr := errors.New(`ERROR: duplicate key value violates unique constraint "item_pkey" (column "secret_table")`)

	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/v1/staff/found-reports/TM-1/receive", nil)

	middleware.RequestID(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		writeInternalError(w, r, "TestContext", rawErr)
	})).ServeHTTP(rec, req)

	if rec.Code != http.StatusInternalServerError {
		t.Fatalf("expected 500, got %d", rec.Code)
	}

	body := rec.Body.String()
	if strings.Contains(body, "constraint") || strings.Contains(body, "secret_table") {
		t.Fatalf("response body leaked raw DB error detail: %s", body)
	}

	var parsed map[string]string
	if err := json.Unmarshal(rec.Body.Bytes(), &parsed); err != nil {
		t.Fatalf("response is not valid JSON: %v", err)
	}
	if parsed["request_id"] == "" || parsed["request_id"] == "unknown" {
		t.Fatalf("expected a real request_id in response, got %q", parsed["request_id"])
	}
	if headerID := rec.Header().Get(middleware.RequestIDHeader); headerID != parsed["request_id"] {
		t.Fatalf("response body request_id (%q) does not match header (%q)", parsed["request_id"], headerID)
	}
	if parsed["error"] == "" || strings.Contains(parsed["error"], "duplicate key") {
		t.Fatalf("expected generic error message, got %q", parsed["error"])
	}
}
