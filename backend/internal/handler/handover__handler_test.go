package handler

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestStartVerificationRejectsIncompleteRequest(t *testing.T) {
	tests := []struct {
		name string
		body string
	}{
		{
			name: "missing staff id",
			body: `{"claimant_name":"Ayu Putri","claimant_id_type":"ktm","id_last4":"1234","claimant_wa":"08123456789"}`,
		},
		{
			name: "invalid identity last four",
			body: `{"staff_id":1,"claimant_name":"Ayu Putri","claimant_id_type":"ktm","id_last4":"12A4","claimant_wa":"08123456789"}`,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			handler := NewHandoverHandler(nil)
			request := httptest.NewRequest(http.MethodPost, "/v1/staff/items/BRG-1/start-verify", strings.NewReader(test.body))
			request.SetPathValue("item_id", "BRG-1")
			response := httptest.NewRecorder()

			handler.StartVerification(response, request)

			if response.Code != http.StatusBadRequest {
				t.Fatalf("expected HTTP %d, got %d: %s", http.StatusBadRequest, response.Code, response.Body.String())
			}
		})
	}
}
