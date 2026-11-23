package handler

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestLoginSatpamRejectsInvalidRequest(t *testing.T) {
	tests := []struct {
		name string
		body string
	}{
		{name: "invalid JSON", body: `{"username":`},
		{name: "empty username", body: `{"username":"","password":"a-long-enough-password"}`},
		{name: "empty password", body: `{"username":"satpam_pos1","password":""}`},
		{name: "unknown field", body: `{"username":"satpam_pos1","password":"a-long-enough-password","role":"admin"}`},
	}

	handler := NewAuthHandler(nil)
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			request := httptest.NewRequest(http.MethodPost, "/v1/auth/login", strings.NewReader(test.body))
			response := httptest.NewRecorder()

			handler.LoginSatpam(response, request)

			if response.Code != http.StatusBadRequest {
				t.Fatalf("expected status %d, got %d", http.StatusBadRequest, response.Code)
			}
		})
	}
}
