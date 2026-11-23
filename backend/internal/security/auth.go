package security

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base32"
	"encoding/base64"
	"encoding/binary"
	"encoding/hex"
	"errors"
	"fmt"
	"strings"
	"time"

	"golang.org/x/crypto/argon2"
)

// Parameter Argon2id. Mengikuti rekomendasi minimum OWASP untuk login
// interaktif (m=64MB, t=3, p=2).
const (
	argon2Memory      = 64 * 1024
	argon2Iterations  = 3
	argon2Parallelism = 2
	argon2SaltLen     = 16
	argon2KeyLen      = 32
)

var ErrPasswordHashInvalid = errors.New("format hash password tidak valid")

// HashPassword membuat hash Argon2id dalam format PHC string, dengan salt
// acak baru setiap pemanggilan.
func HashPassword(password string) (string, error) {
	salt := make([]byte, argon2SaltLen)
	if _, err := rand.Read(salt); err != nil {
		return "", fmt.Errorf("generate salt: %w", err)
	}

	hash := argon2.IDKey([]byte(password), salt, argon2Iterations, argon2Memory, argon2Parallelism, argon2KeyLen)

	encoded := fmt.Sprintf(
		"$argon2id$v=%d$m=%d,t=%d,p=%d$%s$%s",
		argon2.Version,
		argon2Memory,
		argon2Iterations,
		argon2Parallelism,
		base64.RawStdEncoding.EncodeToString(salt),
		base64.RawStdEncoding.EncodeToString(hash),
	)
	return encoded, nil
}

// VerifyPassword membandingkan password dengan hash Argon2id dalam format
// PHC string, secara constant-time.
func VerifyPassword(password, encodedHash string) (bool, error) {
	parts := strings.Split(encodedHash, "$")
	if len(parts) != 6 || parts[1] != "argon2id" {
		return false, ErrPasswordHashInvalid
	}

	var version int
	if _, err := fmt.Sscanf(parts[2], "v=%d", &version); err != nil {
		return false, ErrPasswordHashInvalid
	}

	var memory, iterations uint32
	var parallelism uint8
	if _, err := fmt.Sscanf(parts[3], "m=%d,t=%d,p=%d", &memory, &iterations, &parallelism); err != nil {
		return false, ErrPasswordHashInvalid
	}

	salt, err := base64.RawStdEncoding.DecodeString(parts[4])
	if err != nil {
		return false, ErrPasswordHashInvalid
	}
	storedHash, err := base64.RawStdEncoding.DecodeString(parts[5])
	if err != nil {
		return false, ErrPasswordHashInvalid
	}

	computedHash := argon2.IDKey([]byte(password), salt, iterations, memory, parallelism, uint32(len(storedHash)))

	return subtle.ConstantTimeCompare(storedHash, computedHash) == 1, nil
}

// dummyPasswordHash dipakai saat username tidak ditemukan, supaya waktu
// respons login tidak membocorkan apakah akun itu ada (anti-enumerasi).
var dummyPasswordHash string

func init() {
	h, err := HashPassword("dummy-password-untuk-constant-time-check")
	if err != nil {
		panic("security: gagal membuat dummy hash: " + err.Error())
	}
	dummyPasswordHash = h
}

// VerifyPasswordConstantTime selalu menjalankan Argon2id walaupun hash yang
// diberikan kosong (akun tidak ditemukan), dengan memakai dummyPasswordHash
// sebagai pengganti. Hasilnya selalu false kalau hash asli kosong.
func VerifyPasswordConstantTime(password, encodedHash string) bool {
	hashToCheck := encodedHash
	accountExists := encodedHash != ""
	if !accountExists {
		hashToCheck = dummyPasswordHash
	}

	ok, err := VerifyPassword(password, hashToCheck)
	if err != nil || !accountExists {
		return false
	}
	return ok
}

// ---------------------------------------------------------------- TOTP (RFC 6238)

const totpStepSeconds = 30
const totpDigits = 6

// GenerateTOTPSecret membuat secret TOTP acak 20 byte, dikodekan base32
// tanpa padding (format umum untuk aplikasi authenticator).
func GenerateTOTPSecret() (string, error) {
	raw := make([]byte, 20)
	if _, err := rand.Read(raw); err != nil {
		return "", fmt.Errorf("generate TOTP secret: %w", err)
	}
	return base32.StdEncoding.WithPadding(base32.NoPadding).EncodeToString(raw), nil
}

func totpCode(secret []byte, step int64) string {
	buf := make([]byte, 8)
	binary.BigEndian.PutUint64(buf, uint64(step))

	mac := hmac.New(sha1.New, secret)
	mac.Write(buf)
	sum := mac.Sum(nil)

	offset := sum[len(sum)-1] & 0x0f
	code := (uint32(sum[offset])&0x7f)<<24 |
		(uint32(sum[offset+1])&0xff)<<16 |
		(uint32(sum[offset+2])&0xff)<<8 |
		uint32(sum[offset+3])&0xff

	mod := uint32(1)
	for i := 0; i < totpDigits; i++ {
		mod *= 10
	}
	return fmt.Sprintf("%0*d", totpDigits, code%mod)
}

// VerifyTOTP memeriksa kode 6 digit terhadap langkah saat ini ± 1 langkah
// (toleransi jam 30 detik). lastUsedStep mencegah kode pada langkah yang
// sama atau lebih lama dipakai ulang (anti-replay). Mengembalikan langkah
// yang cocok supaya caller menyimpannya sebagai lastUsedStep berikutnya.
func VerifyTOTP(secretBase32, code string, lastUsedStep int64, now time.Time) (usedStep int64, ok bool) {
	secret, err := base32.StdEncoding.WithPadding(base32.NoPadding).DecodeString(strings.ToUpper(strings.TrimSpace(secretBase32)))
	if err != nil || len(code) != totpDigits {
		return 0, false
	}

	currentStep := now.Unix() / totpStepSeconds

	for _, delta := range []int64{0, -1, 1} {
		step := currentStep + delta
		if step <= lastUsedStep {
			continue
		}
		expected := totpCode(secret, step)
		if subtle.ConstantTimeCompare([]byte(expected), []byte(code)) == 1 {
			return step, true
		}
	}
	return 0, false
}

// ---------------------------------------------------------------- Session token

// GenerateSessionToken menghasilkan token sesi acak 32 byte (hex).
func GenerateSessionToken() (string, error) {
	token := make([]byte, 32)
	if _, err := rand.Read(token); err != nil {
		return "", fmt.Errorf("generate session token: %w", err)
	}
	return hex.EncodeToString(token), nil
}

// HashSessionToken menghasilkan SHA-256 dari token sesi untuk disimpan di
// DB. Token mentah (entropi 256 bit) hanya ada di cookie klien.
func HashSessionToken(token string) string {
	sum := sha256.Sum256([]byte(token))
	return hex.EncodeToString(sum[:])
}

// GenerateCSRFToken menghasilkan token CSRF acak 32 byte (hex).
func GenerateCSRFToken() (string, error) {
	token := make([]byte, 32)
	if _, err := rand.Read(token); err != nil {
		return "", fmt.Errorf("generate CSRF token: %w", err)
	}
	return hex.EncodeToString(token), nil
}
