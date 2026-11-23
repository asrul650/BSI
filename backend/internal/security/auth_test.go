package security

import (
	"encoding/base32"
	"errors"
	"strings"
	"testing"
	"time"
)

func TestHashPasswordAndVerifyPasswordRoundTrip(t *testing.T) {
	hash, err := HashPassword("correct horse battery staple")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !strings.HasPrefix(hash, "$argon2id$") {
		t.Fatalf("expected PHC argon2id prefix, got %q", hash)
	}

	ok, err := VerifyPassword("correct horse battery staple", hash)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !ok {
		t.Fatal("expected correct password to verify")
	}

	ok, err = VerifyPassword("wrong password", hash)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if ok {
		t.Fatal("expected wrong password to fail verification")
	}
}

func TestVerifyPasswordConstantTimeAlwaysRunsArgon2id(t *testing.T) {
	// Akun ada, password benar -> true.
	hash, err := HashPassword("rahasia-staf")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !VerifyPasswordConstantTime("rahasia-staf", hash) {
		t.Fatal("expected correct password against real hash to succeed")
	}

	// Akun ada, password salah -> false.
	if VerifyPasswordConstantTime("salah", hash) {
		t.Fatal("expected wrong password against real hash to fail")
	}

	// Akun tidak ada (hash kosong) -> selalu false, tidak error/panic,
	// dan tetap menjalankan Argon2id atas dummy hash.
	if VerifyPasswordConstantTime("apapun", "") {
		t.Fatal("expected empty hash (account not found) to always fail")
	}
}

func TestVerifyTOTPAcceptsCurrentAndAdjacentStepOnly(t *testing.T) {
	secret, err := GenerateTOTPSecret()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	now := time.Unix(1_700_000_000, 0)
	currentStep := now.Unix() / totpStepSeconds

	codeNow := totpCode(mustDecodeSecret(t, secret), currentStep)
	codeNext := totpCode(mustDecodeSecret(t, secret), currentStep+1)
	codeFarFuture := totpCode(mustDecodeSecret(t, secret), currentStep+2)

	if _, ok := VerifyTOTP(secret, codeNow, 0, now); !ok {
		t.Fatal("expected current-step code to be valid")
	}
	if _, ok := VerifyTOTP(secret, codeFarFuture, 0, now); ok {
		t.Fatal("expected code 2 steps away to be rejected")
	}
	if _, ok := VerifyTOTP(secret, codeNext, 0, now); !ok {
		t.Fatal("expected next-step code (+30s tolerance) to be valid")
	}
}

func TestVerifyTOTPRejectsReplayAtOrBeforeLastUsedStep(t *testing.T) {
	secret, err := GenerateTOTPSecret()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	now := time.Unix(1_700_000_000, 0)
	currentStep := now.Unix() / totpStepSeconds
	code := totpCode(mustDecodeSecret(t, secret), currentStep)

	step, ok := VerifyTOTP(secret, code, 0, now)
	if !ok {
		t.Fatal("expected first use to succeed")
	}
	if step != currentStep {
		t.Fatalf("expected used step %d, got %d", currentStep, step)
	}

	// Pakai ulang kode yang sama persis, dengan lastUsedStep sudah di-set
	// ke step yang baru dipakai -> harus ditolak.
	if _, ok := VerifyTOTP(secret, code, step, now); ok {
		t.Fatal("expected replay of the same step to be rejected")
	}
}

func mustDecodeSecret(t *testing.T, secretBase32 string) []byte {
	t.Helper()
	secret, err := base32.StdEncoding.WithPadding(base32.NoPadding).DecodeString(strings.ToUpper(secretBase32))
	if err != nil {
		t.Fatalf("failed to decode secret: %v", err)
	}
	return secret
}

func TestValidatePasswordPolicyRejectsUnderMinimumLength(t *testing.T) {
	if err := ValidatePasswordPolicy("pendek7"); !errors.Is(err, ErrPasswordTooShort) {
		t.Fatalf("expected ErrPasswordTooShort for 7-char password, got %v", err)
	}
}

func TestValidatePasswordPolicyAcceptsMinimumLength(t *testing.T) {
	if err := ValidatePasswordPolicy("panjang8"); err != nil {
		t.Fatalf("expected 8-char non-common password to be accepted, got %v", err)
	}
}

func TestValidatePasswordPolicyAcceptsUpToMaximumLength(t *testing.T) {
	password := strings.Repeat("a", 127) + "9" // 128 karakter, bukan password umum
	if err := ValidatePasswordPolicy(password); err != nil {
		t.Fatalf("expected 128-char password to be accepted, got %v", err)
	}
}

func TestValidatePasswordPolicyRejectsOverMaximumLength(t *testing.T) {
	password := strings.Repeat("a", 129)
	if err := ValidatePasswordPolicy(password); !errors.Is(err, ErrPasswordTooLong) {
		t.Fatalf("expected ErrPasswordTooLong for 129-char password, got %v", err)
	}
}

func TestValidatePasswordPolicyRejectsCommonPasswordsCaseInsensitive(t *testing.T) {
	cases := []string{"password123", "PASSWORD123", "Password123", "lostandfound1", "Admin12345"}
	for _, p := range cases {
		if err := ValidatePasswordPolicy(p); !errors.Is(err, ErrPasswordTooCommon) {
			t.Fatalf("expected ErrPasswordTooCommon for %q, got %v", p, err)
		}
	}
}

func TestValidatePasswordPolicyAllowsAnyCharacterSet(t *testing.T) {
	// Tidak ada aturan jenis karakter (huruf besar/simbol/dsb wajib) --
	// hanya panjang dan daftar password umum yang dicek.
	cases := []string{
		"semua huruf kecil tanpa simbol",
		"émoji-dan-aksén-🔐🙂",
		"!!!!!!!!",
		"12 345 678",
	}
	for _, p := range cases {
		if err := ValidatePasswordPolicy(p); err != nil {
			t.Fatalf("expected %q to be accepted (no character-set restriction), got %v", p, err)
		}
	}
}
