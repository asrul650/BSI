package repo

import (
	"testing"

	"golang.org/x/crypto/bcrypt"
)

func TestCompareSatpamPassword(t *testing.T) {
	password := "local-test-password"
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		t.Fatalf("GenerateFromPassword returned error: %v", err)
	}
	matches, err := compareSatpamPassword(string(hash), password)
	if err != nil || !matches {
		t.Fatalf("expected the correct password to match, got matches=%t, err=%v", matches, err)
	}

	matches, err = compareSatpamPassword(string(hash), "incorrect-password")
	if err != nil || matches {
		t.Fatalf("expected the wrong password not to match, got matches=%t, err=%v", matches, err)
	}
}
