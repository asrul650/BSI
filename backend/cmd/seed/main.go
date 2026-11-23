// Skrip seed akun staf untuk pengembangan lokal.
//
// Sengaja dipisah dari migrasi SQL: tidak ada hash password atau TOTP
// secret yang di-commit ke repo. Password dibuat acak dan dicetak sekali ke
// terminal saat skrip dijalankan; kalau hilang, jalankan lagi untuk
// membuat password baru.
//
// Jalankan: APP_ENV=dev go run ./cmd/seed
package main

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"os"

	"LostandFound/internal/core"
	"LostandFound/internal/security"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("File .env tidak ditemukan, menggunakan environment variable sistem")
	}

	if os.Getenv("APP_ENV") != "dev" {
		log.Fatal("Skrip ini hanya boleh dijalankan dengan APP_ENV=dev. Jangan jalankan di produksi.")
	}

	ctx := context.Background()
	pool, err := core.NewPool(ctx)
	if err != nil {
		log.Fatalf("Gagal menghubungkan PostgreSQL: %v", err)
	}
	defer pool.Close()

	satpamPassword, err := seedStaffAccount(ctx, pool, "satpam_pos1", "")
	if err != nil {
		log.Fatalf("Gagal seed akun satpam_pos1: %v", err)
	}

	totpSecret, err := security.GenerateTOTPSecret()
	if err != nil {
		log.Fatalf("Gagal membuat TOTP secret: %v", err)
	}
	adminPassword, err := seedStaffAccount(ctx, pool, "admin_lf", totpSecret)
	if err != nil {
		log.Fatalf("Gagal seed akun admin_lf: %v", err)
	}

	fmt.Println()
	fmt.Println("================================================================")
	fmt.Println(" KREDENSIAL DEV -- hanya tampil sekali di sini, tidak disimpan")
	fmt.Println(" di file/log/.env mana pun. Catat sekarang kalau perlu.")
	fmt.Println("================================================================")
	fmt.Printf(" satpam_pos1  password: %s\n", satpamPassword)
	fmt.Println("----------------------------------------------------------------")
	fmt.Printf(" admin_lf     password: %s\n", adminPassword)
	fmt.Printf("              TOTP secret (base32): %s\n", totpSecret)
	fmt.Println("              Masukkan secret ini ke aplikasi authenticator")
	fmt.Println("              (mis. dengan `otpauth://totp/...?secret=...`).")
	fmt.Println("================================================================")
}

// seedStaffAccount mengganti password (dan, kalau mfaSecret diisi, TOTP
// secret) akun yang SUDAH ADA dari migrasi dev seed (003_seed_dev_data.sql).
// Tidak membuat akun baru -- skrip ini sengaja tidak tahu nama/role staf,
// supaya tidak ada daftar akun yang harus dirawat dua tempat (migrasi & sini).
func seedStaffAccount(ctx context.Context, pool *pgxpool.Pool, username, mfaSecret string) (string, error) {
	password, err := generateRandomPassword()
	if err != nil {
		return "", fmt.Errorf("generate password: %w", err)
	}

	hash, err := security.HashPassword(password)
	if err != nil {
		return "", fmt.Errorf("hash password: %w", err)
	}

	var mfaSecretValue any
	if mfaSecret != "" {
		mfaSecretValue = mfaSecret
	}

	tag, err := pool.Exec(ctx, `
		UPDATE staff
		SET password_hash = $2,
		    mfa_secret = $3,
		    mfa_last_step = 0,
		    failed_attempts = 0,
		    locked_until = NULL
		WHERE username = $1
	`, username, hash, mfaSecretValue)
	if err != nil {
		return "", fmt.Errorf("update staff %s: %w", username, err)
	}
	if tag.RowsAffected() == 0 {
		return "", fmt.Errorf("akun %s tidak ditemukan -- jalankan migrasi dev seed (003_seed_dev_data.sql) dulu", username)
	}

	return password, nil
}

func generateRandomPassword() (string, error) {
	raw := make([]byte, 18)
	if _, err := rand.Read(raw); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(raw), nil
}
