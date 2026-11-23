package service

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestSendWhatsAppMessageNormalizesPhoneAndSendsMessage(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			t.Errorf("expected POST, got %s", r.Method)
		}
		if got := r.Header.Get("Authorization"); got != "test-token" {
			t.Errorf("unexpected authorization header %q", got)
		}
		if err := r.ParseForm(); err != nil {
			t.Errorf("parse request form: %v", err)
		}
		if got := r.Form.Get("target"); got != "6281234567890" {
			t.Errorf("expected normalized recipient, got %q", got)
		}
		if got := r.Form.Get("message"); got != "Bukti penerimaan barang." {
			t.Errorf("unexpected message %q", got)
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(fonnteResponse{Status: true})
	}))
	defer server.Close()

	service := &OTPService{
		fonnteToken: "test-token",
		fonnteURL:   server.URL,
		httpClient:  server.Client(),
	}
	if err := service.SendWhatsAppMessage(
		context.Background(),
		"0812-3456-7890",
		"Bukti penerimaan barang.",
	); err != nil {
		t.Fatalf("send WhatsApp message: %v", err)
	}
}

func TestSendWhatsAppMessageReturnsProviderFailure(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"status":false,"reason":"recipient unavailable"}`))
	}))
	defer server.Close()

	service := &OTPService{
		fonnteToken: "test-token",
		fonnteURL:   server.URL,
		httpClient:  server.Client(),
	}
	err := service.SendWhatsAppMessage(
		context.Background(),
		"6281234567890",
		"Bukti penerimaan barang.",
	)
	if err == nil || !strings.Contains(err.Error(), "recipient unavailable") {
		t.Fatalf("expected provider failure, got %v", err)
	}
}

func TestSendWhatsAppMessageRejectsInvalidPhoneBeforeRequest(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(http.ResponseWriter, *http.Request) {
		t.Error("provider should not be called for invalid phone")
	}))
	defer server.Close()

	service := &OTPService{
		fonnteToken: "test-token",
		fonnteURL:   server.URL,
		httpClient:  server.Client(),
	}
	if err := service.SendWhatsAppMessage(
		context.Background(),
		"not-a-phone",
		"Bukti penerimaan barang.",
	); err == nil {
		t.Fatal("expected invalid phone error")
	}
}
