package repo

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"golang.org/x/crypto/bcrypt"
)

var ErrInvalidSatpamCredentials = errors.New("username atau password salah")

const satpamLockThreshold = 5

type SatpamIdentity struct {
	StaffID  int64  `json:"staff_id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Role     string `json:"role"`
}

var (
	dummyHashOnce sync.Once
	dummyHash     []byte
	dummyHashErr  error
)

func compareDummyPassword(password string) error {
	dummyHashOnce.Do(func() {
		dummyHash, dummyHashErr = bcrypt.GenerateFromPassword([]byte("not-a-real-satpam-password"), bcrypt.DefaultCost)
	})
	if dummyHashErr != nil {
		return fmt.Errorf("membuat hash pembanding: %w", dummyHashErr)
	}
	_ = bcrypt.CompareHashAndPassword(dummyHash, []byte(password))
	return nil
}

func compareSatpamPassword(passwordHash, password string) (bool, error) {
	if _, err := bcrypt.Cost([]byte(passwordHash)); err != nil {
		if dummyErr := compareDummyPassword(password); dummyErr != nil {
			return false, dummyErr
		}
		return false, nil
	}

	err := bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(password))
	if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
		return false, nil
	}
	if err != nil {
		return false, fmt.Errorf("memverifikasi hash password: %w", err)
	}
	return true, nil
}

func (s *Store) AuthenticateSatpam(ctx context.Context, username, password string) (SatpamIdentity, error) {
	tx, err := s.db.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return SatpamIdentity{}, fmt.Errorf("memulai autentikasi Satpam: %w", err)
	}
	defer tx.Rollback(ctx)

	var identity SatpamIdentity
	var passwordHash string
	var isActive bool
	var failedAttempts int
	var lockedUntil pgtype.Timestamptz
	err = tx.QueryRow(ctx, `
		SELECT staff_id, name, username, role, password_hash, is_active, failed_attempts, locked_until
		FROM staff
		WHERE lower(username) = lower($1)
		ORDER BY staff_id
		LIMIT 1
		FOR UPDATE
	`, strings.TrimSpace(username)).Scan(
		&identity.StaffID,
		&identity.Name,
		&identity.Username,
		&identity.Role,
		&passwordHash,
		&isActive,
		&failedAttempts,
		&lockedUntil,
	)
	if errors.Is(err, pgx.ErrNoRows) {
		if dummyErr := compareDummyPassword(password); dummyErr != nil {
			return SatpamIdentity{}, dummyErr
		}
		return SatpamIdentity{}, ErrInvalidSatpamCredentials
	}
	if err != nil {
		return SatpamIdentity{}, fmt.Errorf("mengambil akun Satpam: %w", err)
	}

	if !isActive || identity.Role != "satpam" {
		if dummyErr := compareDummyPassword(password); dummyErr != nil {
			return SatpamIdentity{}, dummyErr
		}
		return SatpamIdentity{}, ErrInvalidSatpamCredentials
	}
	if lockedUntil.Valid && lockedUntil.Time.After(time.Now()) {
		if dummyErr := compareDummyPassword(password); dummyErr != nil {
			return SatpamIdentity{}, dummyErr
		}
		return SatpamIdentity{}, ErrInvalidSatpamCredentials
	}

	passwordMatches, err := compareSatpamPassword(passwordHash, password)
	if err != nil {
		return SatpamIdentity{}, err
	}
	if !passwordMatches {
		failedAttempts++
		_, err = tx.Exec(ctx, `
			UPDATE staff
			SET failed_attempts = $2,
			    locked_until = CASE
			        WHEN $2 >= $3 THEN NOW() + INTERVAL '15 minutes'
			        ELSE NULL
			    END
			WHERE staff_id = $1
		`, identity.StaffID, failedAttempts, satpamLockThreshold)
		if err != nil {
			return SatpamIdentity{}, fmt.Errorf("mencatat kegagalan login Satpam: %w", err)
		}
		if err := tx.Commit(ctx); err != nil {
			return SatpamIdentity{}, fmt.Errorf("menyimpan percobaan login Satpam: %w", err)
		}
		return SatpamIdentity{}, ErrInvalidSatpamCredentials
	}

	_, err = tx.Exec(ctx, `
		UPDATE staff
		SET failed_attempts = 0, locked_until = NULL
		WHERE staff_id = $1
	`, identity.StaffID)
	if err != nil {
		return SatpamIdentity{}, fmt.Errorf("mengatur ulang percobaan login Satpam: %w", err)
	}
	if err := tx.Commit(ctx); err != nil {
		return SatpamIdentity{}, fmt.Errorf("menyelesaikan login Satpam: %w", err)
	}

	return identity, nil
}
