package repo

import (
	"context"
	"crypto/subtle"
	"errors"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
)

var (
	ErrOTPNotFound = errors.New("OTP tidak ditemukan")
	ErrOTPExpired  = errors.New("OTP sudah kedaluwarsa")
	ErrOTPInvalid  = errors.New("kode OTP salah")
	ErrOTPAttempts = errors.New("batas percobaan OTP tercapai")
)

const DefaultOTPMaxAttempts = 5

// CreateOTP menyimpan OTP baru dan menonaktifkan OTP sebelumnya.
func (s *Store) CreateOTP(ctx context.Context, p CreateOTPParams) error {
	tx, err := s.db.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return fmt.Errorf("begin create OTP: %w", err)
	}
	defer tx.Rollback(ctx)

	// Mencegah dua permintaan OTP bersamaan untuk nomor dan tujuan sama.
	lockKey := p.PhoneHash + ":" + p.Purpose

	_, err = tx.Exec(ctx, `
		SELECT pg_advisory_xact_lock(
			hashtextextended($1, 0)
		)
	`, lockKey)
	if err != nil {
		return fmt.Errorf("lock OTP request: %w", err)
	}

	_, err = tx.Exec(ctx, `
		UPDATE otp_verification
		SET used_at = NOW()
		WHERE phone_hash = $1
		  AND purpose = $2
		  AND used_at IS NULL
	`, p.PhoneHash, p.Purpose)
	if err != nil {
		return fmt.Errorf("invalidate previous OTP: %w", err)
	}

	_, err = tx.Exec(ctx, `
		INSERT INTO otp_verification (
			phone_hash,
			purpose,
			code_hash,
			expires_at,
			attempt_count,
			ip_hash
		)
		VALUES ($1, $2, $3, $4, 0, $5)
	`, p.PhoneHash, p.Purpose, p.CodeHash, p.ExpiresAt, p.IPHash)
	if err != nil {
		return fmt.Errorf("insert OTP: %w", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("commit OTP: %w", err)
	}

	return nil
}

// VerifyOTPAndIssueToken memverifikasi OTP dan menerbitkan token
// dalam satu transaksi database.
func (s *Store) VerifyOTPAndIssueToken(
	ctx context.Context,
	phoneHash string,
	purpose string,
	submittedCodeHash string,
	tokenHash string,
	tokenExpiresAt time.Time,
	maxAttempts int,
) error {
	if maxAttempts <= 0 {
		maxAttempts = DefaultOTPMaxAttempts
	}

	tx, err := s.db.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return fmt.Errorf("begin OTP verification: %w", err)
	}
	defer tx.Rollback(ctx)

	var otpID int64
	var storedCodeHash string
	var expiresAt time.Time
	var attemptCount int

	err = tx.QueryRow(ctx, `
		SELECT
			otp_id,
			code_hash,
			expires_at,
			attempt_count
		FROM otp_verification
		WHERE phone_hash = $1
		  AND purpose = $2
		  AND used_at IS NULL
		ORDER BY created_at DESC, otp_id DESC
		LIMIT 1
		FOR UPDATE
	`, phoneHash, purpose).Scan(
		&otpID,
		&storedCodeHash,
		&expiresAt,
		&attemptCount,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return ErrOTPNotFound
		}
		return fmt.Errorf("get OTP: %w", err)
	}

	if !expiresAt.After(time.Now()) {
		return ErrOTPExpired
	}

	if attemptCount >= maxAttempts {
		return ErrOTPAttempts
	}

	// Bandingkan hash secara constant-time.
	match := subtle.ConstantTimeCompare(
		[]byte(storedCodeHash),
		[]byte(submittedCodeHash),
	) == 1

	if !match {
		_, err = tx.Exec(ctx, `
			UPDATE otp_verification
			SET attempt_count = attempt_count + 1,
			    used_at = CASE
			        WHEN attempt_count + 1 >= $2
			        THEN NOW()
			        ELSE used_at
			    END
			WHERE otp_id = $1
		`, otpID, maxAttempts)

		if err != nil {
			return fmt.Errorf("update OTP attempts: %w", err)
		}

		if err := tx.Commit(ctx); err != nil {
			return fmt.Errorf("commit failed OTP attempt: %w", err)
		}

		if attemptCount+1 >= maxAttempts {
			return ErrOTPAttempts
		}

		return ErrOTPInvalid
	}

	// OTP benar: langsung tandai digunakan dan simpan hash token.
	_, err = tx.Exec(ctx, `
		UPDATE otp_verification
		SET used_at = NOW(),
		    verification_token_hash = $1,
		    token_expires_at = $2
		WHERE otp_id = $3
	`, tokenHash, tokenExpiresAt, otpID)

	if err != nil {
		return fmt.Errorf("issue verification token: %w", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("commit OTP verification: %w", err)
	}

	return nil
}

var ErrOTPCooldown = errors.New("harap tunggu sebelum meminta OTP kembali")

// CreateOTPWithCooldown menyimpan OTP dengan pemeriksaan cooldown
// yang dilakukan secara atomik di PostgreSQL.
func (s *Store) CreateOTPWithCooldown(
	ctx context.Context,
	p CreateOTPParams,
	cooldown time.Duration,
) (int64, error) {
	tx, err := s.db.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return 0, fmt.Errorf("begin create OTP: %w", err)
	}
	defer tx.Rollback(ctx)

	lockKey := p.PhoneHash + ":" + p.Purpose

	_, err = tx.Exec(ctx, `
		SELECT pg_advisory_xact_lock(hashtextextended($1, 0))
	`, lockKey)
	if err != nil {
		return 0, fmt.Errorf("lock OTP request: %w", err)
	}

	var recentlySent bool
	err = tx.QueryRow(ctx, `
		SELECT EXISTS (
			SELECT 1
			FROM otp_verification
			WHERE phone_hash = $1
			  AND purpose = $2
			  AND created_at > NOW() - ($3 * INTERVAL '1 second')
		)
	`, p.PhoneHash, p.Purpose, cooldown.Seconds()).Scan(&recentlySent)

	if err != nil {
		return 0, fmt.Errorf("check OTP cooldown: %w", err)
	}

	if recentlySent {
		return 0, ErrOTPCooldown
	}

	_, err = tx.Exec(ctx, `
		UPDATE otp_verification
		SET used_at = NOW()
		WHERE phone_hash = $1
		  AND purpose = $2
		  AND used_at IS NULL
	`, p.PhoneHash, p.Purpose)
	if err != nil {
		return 0, fmt.Errorf("invalidate previous OTP: %w", err)
	}

	var otpID int64
	err = tx.QueryRow(ctx, `
		INSERT INTO otp_verification (
			phone_hash,
			purpose,
			code_hash,
			expires_at,
			attempt_count,
			ip_hash
		)
		VALUES ($1, $2, $3, $4, 0, $5)
		RETURNING otp_id
	`, p.PhoneHash, p.Purpose, p.CodeHash, p.ExpiresAt, p.IPHash).Scan(&otpID)

	if err != nil {
		return 0, fmt.Errorf("insert OTP: %w", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return 0, fmt.Errorf("commit OTP: %w", err)
	}

	return otpID, nil
}

// InvalidateOTP menonaktifkan OTP jika pengiriman WhatsApp gagal.
func (s *Store) InvalidateOTP(ctx context.Context, otpID int64) error {
	_, err := s.db.Exec(ctx, `
		UPDATE otp_verification
		SET used_at = NOW()
		WHERE otp_id = $1
		  AND used_at IS NULL
	`, otpID)

	if err != nil {
		return fmt.Errorf("invalidate OTP: %w", err)
	}

	return nil
}

var (
	ErrVerificationTokenInvalid = errors.New("token verifikasi tidak valid")
	ErrVerificationTokenExpired = errors.New("token verifikasi sudah kedaluwarsa")
	ErrVerificationTokenUsed    = errors.New("token verifikasi sudah digunakan")

	// ErrReportSaveFailed menandai kegagalan infrastruktur (DB/transaksi) saat
	// menyimpan laporan. Pesan err asli hanya boleh dibaca lewat log server
	// (errors.Unwrap), tidak pernah dikirim langsung ke klien.
	ErrReportSaveFailed = errors.New("gagal menyimpan laporan")
)

func (s *Store) ConsumeVerificationToken(
	ctx context.Context,
	phoneHash string,
	purpose string,
	tokenHash string,
) error {
	tx, err := s.db.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	var storedHash string
	var expiresAt time.Time
	var usedAt *time.Time

	err = tx.QueryRow(ctx, `
        SELECT verification_token_hash,
               token_expires_at,
               token_used_at
        FROM otp_verification
        WHERE phone_hash = $1
          AND purpose = $2
          AND verification_token_hash = $3
        ORDER BY created_at DESC, otp_id DESC
        LIMIT 1
        FOR UPDATE
    `, phoneHash, purpose, tokenHash).Scan(
		&storedHash,
		&expiresAt,
		&usedAt,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return ErrVerificationTokenInvalid
	}
	if err != nil {
		return err
	}

	if usedAt != nil {
		return ErrVerificationTokenUsed
	}

	if !time.Now().Before(expiresAt) {
		return ErrVerificationTokenExpired
	}

	_, err = tx.Exec(ctx, `
        UPDATE otp_verification
        SET token_used_at = NOW()
        WHERE phone_hash = $1
          AND purpose = $2
          AND verification_token_hash = $3
          AND token_used_at IS NULL
    `, phoneHash, purpose, storedHash)

	if err != nil {
		return err
	}

	return tx.Commit(ctx)
}

func (s *Store) CreateLostReportWithToken(
	ctx context.Context,
	p CreateLostReportParams,
) error {
	tx, err := s.db.Begin(ctx)
	if err != nil {
		return fmt.Errorf("%w: begin create lost report: %v", ErrReportSaveFailed, err)
	}
	defer tx.Rollback(ctx)

	// Ambil dan kunci token agar tidak dapat digunakan bersamaan.
	var expiresAt time.Time
	var usedAt *time.Time

	err = tx.QueryRow(ctx, `
		SELECT token_expires_at, token_used_at
		FROM otp_verification
		WHERE phone_hash = $1
		  AND purpose = $2
		  AND verification_token_hash = $3
		ORDER BY created_at DESC, otp_id DESC
		LIMIT 1
		FOR UPDATE
	`, p.PhoneHash, OTPPurposeLostReport, p.TokenHash).Scan(
		&expiresAt,
		&usedAt,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return ErrVerificationTokenInvalid
	}
	if err != nil {
		return fmt.Errorf("%w: get verification token: %v", ErrReportSaveFailed, err)
	}

	if usedAt != nil {
		return ErrVerificationTokenUsed
	}

	if !time.Now().Before(expiresAt) {
		return ErrVerificationTokenExpired
	}


	// Simpan laporan kehilangan.
	_, err = tx.Exec(ctx, `
		INSERT INTO lost_report (
			lost_report_id,
			category_id,
			item_name,
			color,
			location_id,
			lost_at,
			description,
			reporter_name,
			reporter_whatsapp,
			consent_at,
			status
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'Aktif')
	`,
		p.ReportID,
		p.CategoryID,
		p.ItemName,
		p.Color,
		p.LocationID,
		p.LostAt,
		p.Description,
		p.ReporterName,
		p.ReporterWhatsApp,
		p.ConsentAt,
	)

	if err != nil {
		return fmt.Errorf("%w: insert lost report: %v", ErrReportSaveFailed, err)
	}

	// Tandai token telah digunakan.
	_, err = tx.Exec(ctx, `
		UPDATE otp_verification
		SET token_used_at = NOW()
		WHERE phone_hash = $1
		  AND purpose = $2
		  AND verification_token_hash = $3
		  AND token_used_at IS NULL
	`, p.PhoneHash, OTPPurposeLostReport, p.TokenHash)

	if err != nil {
		return fmt.Errorf("%w: consume verification token: %v", ErrReportSaveFailed, err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("%w: commit lost report: %v", ErrReportSaveFailed, err)
	}

	return nil
}

func (s *Store) CreateFoundReportWithToken(
	ctx context.Context,
	p CreateFoundReportParams,
) error {
	tx, err := s.db.Begin(ctx)
	if err != nil {
		return fmt.Errorf("%w: begin create found report: %v", ErrReportSaveFailed, err)
	}
	defer tx.Rollback(ctx)

	// Kunci dan validasi verification token.
	var expiresAt time.Time
	var usedAt *time.Time

	err = tx.QueryRow(ctx, `
		SELECT token_expires_at, token_used_at
		FROM otp_verification
		WHERE phone_hash = $1
		  AND purpose = $2
		  AND verification_token_hash = $3
		ORDER BY created_at DESC, otp_id DESC
		LIMIT 1
		FOR UPDATE
	`, p.PhoneHash, OTPPurposeFoundReport, p.TokenHash).Scan(
		&expiresAt,
		&usedAt,
	)

	if errors.Is(err, pgx.ErrNoRows) {
		return ErrVerificationTokenInvalid
	}
	if err != nil {
		return fmt.Errorf("%w: get verification token: %v", ErrReportSaveFailed, err)
	}

	if usedAt != nil {
		return ErrVerificationTokenUsed
	}

	if !time.Now().Before(expiresAt) {
		return ErrVerificationTokenExpired
	}

	// Simpan laporan barang ditemukan.
	_, err = tx.Exec(ctx, `
		INSERT INTO found_report (
			found_report_id,
			category_id,
			item_name,
			color,
			location_id,
			found_at,
			description,
			finder_name,
			finder_whatsapp,
			consent_at,
			source,
			created_by_staff_id,
			status
		)
		VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
			'aplikasi', NULL, 'Menunggu Penyerahan'
		)
	`,
		p.ReportID,
		p.CategoryID,
		p.ItemName,
		p.Color,
		p.LocationID,
		p.FoundAt,
		p.Description,
		p.FinderName,
		p.FinderWhatsApp,
		p.ConsentAt,
	)

	if err != nil {
		return fmt.Errorf("%w: insert found report: %v", ErrReportSaveFailed, err)
	}

	// Tandai token sudah digunakan.
	_, err = tx.Exec(ctx, `
		UPDATE otp_verification
		SET token_used_at = NOW()
		WHERE phone_hash = $1
		  AND purpose = $2
		  AND verification_token_hash = $3
		  AND token_used_at IS NULL
	`, p.PhoneHash, OTPPurposeFoundReport, p.TokenHash)

	if err != nil {
		return fmt.Errorf("%w: consume verification token: %v", ErrReportSaveFailed, err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("%w: commit found report: %v", ErrReportSaveFailed, err)
	}

	return nil
}
