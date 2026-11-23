package handler

import (
	"encoding/base64"
	"strings"
	"testing"
)

func TestDecodeIntakePhotoAllowsNoPhoto(t *testing.T) {
	data, mimeType, err := decodeIntakePhoto("")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if data != nil || mimeType != "" {
		t.Fatalf("expected no photo, got %d bytes and %q", len(data), mimeType)
	}
}

func TestDecodeIntakePhotoAcceptsPNG(t *testing.T) {
	png := []byte{0x89, 'P', 'N', 'G', 0x0d, 0x0a, 0x1a, 0x0a}
	dataURL := "data:image/png;base64," + base64.StdEncoding.EncodeToString(png)

	data, mimeType, err := decodeIntakePhoto(dataURL)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if mimeType != "image/png" || string(data) != string(png) {
		t.Fatalf("unexpected decoded photo: %q, %d bytes", mimeType, len(data))
	}
}

func TestDecodeIntakePhotoRejectsInvalidAndOversizedData(t *testing.T) {
	if _, _, err := decodeIntakePhoto("data:image/png;base64,dGVzdA=="); err == nil {
		t.Fatal("expected invalid image data to be rejected")
	}

	largePNG := make([]byte, maxIntakePhotoSize+1)
	copy(largePNG, []byte{0x89, 'P', 'N', 'G', 0x0d, 0x0a, 0x1a, 0x0a})
	dataURL := "data:image/png;base64," + base64.StdEncoding.EncodeToString(largePNG)
	if _, _, err := decodeIntakePhoto(dataURL); err == nil || !strings.Contains(err.Error(), "4 MB") {
		t.Fatalf("expected size-limit error, got %v", err)
	}
}
