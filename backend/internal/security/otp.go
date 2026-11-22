package security

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/big"
)

const otpDigits = 6

// GenerateOTP menghasilkan kode OTP 6 digit.
func GenerateOTP() (string, error) {
	max := big.NewInt(1000000)

	n, err := rand.Int(rand.Reader, max)
	if err != nil {
		return "", fmt.Errorf("generate OTP: %w", err)
	}

	return fmt.Sprintf("%06d", n.Int64()), nil
}

// HashOTP menghasilkan HMAC-SHA256 dari OTP.
func HashOTP(code string, secret string) string {
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(code))

	return hex.EncodeToString(mac.Sum(nil))
}

// GenerateVerificationToken menghasilkan token acak.
func GenerateVerificationToken() (string, error) {
	token := make([]byte, 32)

	if _, err := rand.Read(token); err != nil {
		return "", fmt.Errorf("generate verification token: %w", err)
	}

	return hex.EncodeToString(token), nil
}

// HashVerificationToken menghasilkan HMAC-SHA256 dari token.
func HashVerificationToken(token string, secret string) string {
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(token))

	return hex.EncodeToString(mac.Sum(nil))
}
