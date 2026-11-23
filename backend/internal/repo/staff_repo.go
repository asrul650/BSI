package repo

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
)

var (
	ErrStaffNotFound   = errors.New("staf tidak ditemukan")
	ErrSessionNotFound = errors.New("sesi tidak ditemukan")
)

// GetStaffByUsername mengambil satu baris staff berdasarkan username.
func (s *Store) GetStaffByUsername(ctx context.Context, username string) (Staff, error) {
	var st Staff
	var mfaSecret *string
	var lockedUntil *time.Time

	err := s.db.QueryRow(ctx, `
		SELECT
			staff_id, name, username, password_hash, role,
			mfa_secret, mfa_last_step, is_active, failed_attempts, locked_until
		FROM staff
		WHERE username = $1
	`, username).Scan(
		&st.StaffID, &st.Name, &st.Username, &st.PasswordHash, &st.Role,
		&mfaSecret, &st.MFALastStep, &st.IsActive, &st.FailedAttempts, &lockedUntil,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return Staff{}, ErrStaffNotFound
		}
		return Staff{}, fmt.Errorf("mengambil data staf: %w", err)
	}

	st.MFASecret = mfaSecret
	st.LockedUntil = lockedUntil
	return st, nil
}

// RecordFailedLogin menambah hitungan gagal login, dan mengunci akun kalau
// sudah mencapai ambang batas. Dilakukan dalam satu UPDATE atomik.
func (s *Store) RecordFailedLogin(ctx context.Context, staffID int64, lockThreshold int, lockDuration time.Duration) error {
	_, err := s.db.Exec(ctx, `
		UPDATE staff
		SET failed_attempts = failed_attempts + 1,
		    locked_until = CASE
		        WHEN failed_attempts + 1 >= $2 THEN NOW() + ($3 * INTERVAL '1 second')
		        ELSE locked_until
		    END
		WHERE staff_id = $1
	`, staffID, lockThreshold, lockDuration.Seconds())
	if err != nil {
		return fmt.Errorf("mencatat login gagal: %w", err)
	}
	return nil
}

// ResetFailedLogin dipanggil setelah login berhasil.
func (s *Store) ResetFailedLogin(ctx context.Context, staffID int64) error {
	_, err := s.db.Exec(ctx, `
		UPDATE staff
		SET failed_attempts = 0, locked_until = NULL
		WHERE staff_id = $1
	`, staffID)
	if err != nil {
		return fmt.Errorf("reset percobaan login: %w", err)
	}
	return nil
}

// UpdateMFALastStep menyimpan langkah TOTP terakhir yang berhasil dipakai,
// untuk mencegah kode yang sama dipakai ulang (replay).
func (s *Store) UpdateMFALastStep(ctx context.Context, staffID int64, step int64) error {
	_, err := s.db.Exec(ctx, `
		UPDATE staff SET mfa_last_step = $2 WHERE staff_id = $1
	`, staffID, step)
	if err != nil {
		return fmt.Errorf("menyimpan status MFA: %w", err)
	}
	return nil
}

// CreateSession menyimpan sesi baru. Token mentah tidak pernah disimpan,
// hanya hash-nya (TokenHash).
func (s *Store) CreateSession(ctx context.Context, p CreateSessionParams) (int64, error) {
	var sessionID int64
	err := s.db.QueryRow(ctx, `
		INSERT INTO staff_session (session_token_hash, staff_id, csrf_token, mfa_verified, expires_at)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING session_id
	`, p.TokenHash, p.StaffID, p.CSRFToken, p.MFAVerified, p.ExpiresAt).Scan(&sessionID)
	if err != nil {
		return 0, fmt.Errorf("membuat sesi: %w", err)
	}
	return sessionID, nil
}

// GetSessionByTokenHash mengambil sesi beserta data staf terkait (role,
// nama, status aktif) dalam satu query.
func (s *Store) GetSessionByTokenHash(ctx context.Context, tokenHash string) (Session, error) {
	var sess Session
	err := s.db.QueryRow(ctx, `
		SELECT
			ss.session_id, ss.staff_id, ss.csrf_token, ss.mfa_verified,
			ss.created_at, ss.last_seen_at, ss.expires_at,
			st.name, st.username, st.role, st.is_active
		FROM staff_session ss
		JOIN staff st ON st.staff_id = ss.staff_id
		WHERE ss.session_token_hash = $1
	`, tokenHash).Scan(
		&sess.SessionID, &sess.StaffID, &sess.CSRFToken, &sess.MFAVerified,
		&sess.CreatedAt, &sess.LastSeenAt, &sess.ExpiresAt,
		&sess.StaffName, &sess.StaffUsername, &sess.StaffRole, &sess.StaffIsActive,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return Session{}, ErrSessionNotFound
		}
		return Session{}, fmt.Errorf("mengambil sesi: %w", err)
	}
	return sess, nil
}

// TouchSession memperbarui last_seen_at (dipakai untuk idle timeout).
func (s *Store) TouchSession(ctx context.Context, sessionID int64, lastSeen time.Time) error {
	_, err := s.db.Exec(ctx, `
		UPDATE staff_session SET last_seen_at = $2 WHERE session_id = $1
	`, sessionID, lastSeen)
	if err != nil {
		return fmt.Errorf("memperbarui sesi: %w", err)
	}
	return nil
}

// DeleteSessionByTokenHash menghapus sesi (logout).
func (s *Store) DeleteSessionByTokenHash(ctx context.Context, tokenHash string) error {
	_, err := s.db.Exec(ctx, `
		DELETE FROM staff_session WHERE session_token_hash = $1
	`, tokenHash)
	if err != nil {
		return fmt.Errorf("menghapus sesi: %w", err)
	}
	return nil
}
