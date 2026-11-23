package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCorsMiddlewareAllowsLocalViteOrigins(t *testing.T) {
	tests := []struct {
		origin string
		allow  bool
	}{
		{origin: "http://localhost:5173", allow: true},
		{origin: "http://localhost:5178", allow: true},
		{origin: "http://127.0.0.1:5199", allow: true},
		{origin: "https://localhost:5178", allow: false},
		{origin: "http://example.com:5178", allow: false},
		{origin: "http://localhost:5200", allow: false},
	}

	for _, test := range tests {
		t.Run(test.origin, func(t *testing.T) {
			handler := corsMiddleware(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
				w.WriteHeader(http.StatusOK)
			}))
			request := httptest.NewRequest(http.MethodGet, "/", nil)
			request.Header.Set("Origin", test.origin)
			response := httptest.NewRecorder()

			handler.ServeHTTP(response, request)

			got := response.Header().Get("Access-Control-Allow-Origin")
			if test.allow && got != test.origin {
				t.Fatalf("allowed origin header = %q, want %q", got, test.origin)
			}
			if !test.allow && got != "" {
				t.Fatalf("disallowed origin header = %q, want empty", got)
			}
		})
	}
}
