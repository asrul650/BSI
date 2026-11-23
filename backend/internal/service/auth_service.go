package service

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"LostandFound/internal/repo"
	"LostandFound/internal/security"
)

// ErrInvalidCredentials dipakai untuk SEMUA alasan login gagal (username
// salah, password salah, akun terkunci, nonaktif, MFA salah/kosong) supaya
// respons ke klien seragam dan tidak membocorkan alasan sebenarnya.
var ErrInvalidCredentials = errors.New("username atau password salah")

// ErrSessionInvalid dipakai untuk sesi yang tidak ada, sudah kedaluwarsa
// (idle atau absolut), atau milik staf yang sudah dinonaktifkan.
var ErrSessionInvalid = errors.New("sesi tidak valid")

const (
	SessionIdleTimeout     = 15 * time.Minute
	SessionAbsoluteTimeout = 8 * time.Hour
	LoginLockThreshold     = 5
	LoginLockDuration      = 15 * time.Minute
)

type StaffAuthRepository interface {
	GetStaffByUsername(ctx context.Context, username string) (repo.Staff, error)
	RecordFailedLogin(ctx context.Context, staffID int64, lockThreshold int, lockDuration time.Duration) error
	ResetFailedLogin(ctx context.Context, staffID int64) error
	UpdateMFALastStep(ctx context.Context, staffID int64, step int64) error
	CreateSession(ctx context.Context, p repo.CreateSessionParams) (int64, error)
	GetSessionByTokenHash(ctx context.Context, tokenHash string) (repo.Session, error)
	TouchSession(ctx context.Context, sessionID int64, lastSeen time.Time) error
	DeleteSessionByTokenHash(ctx context.Context, tokenHash string) error
}

type AuthService struct {
	repo StaffAuthRepository
}

func NewAuthService(r StaffAuthRepository) *AuthService {
	return &AuthService{repo: r}
}

type StaffView struct {
	StaffID int64
	Name    string
	Role    string
}

type LoginResult struct {
	Token              string
	Staff              StaffView
	CSRFToken          string
	IdleTimeoutSeconds int
	SessionExpiresAt   time.Time
}

// Login memverifikasi username+password (dan mfa_code untuk admin), lalu
// membuat sesi baru kalau berhasil. Semua jalur gagal mengembalikan
// ErrInvalidCredentials yang sama persis.
func (a *AuthService) Login(ctx context.Context, username, password, mfaCode string) (LoginResult, error) {
	username = strings.TrimSpace(username)

	staff, err := a.repo.GetStaffByUsername(ctx, username)
	if err != nil {
		if !errors.Is(err, repo.ErrStaffNotFound) {
			return LoginResult{}, fmt.Errorf("login: %w", err)
		}
		// Akun tidak ada: tetap jalankan Argon2id atas hash dummy supaya
		// waktu respons sama dengan kasus akun yang benar-benar ada
		// (anti-enumerasi akun lewat timing).
		security.VerifyPasswordConstantTime(password, "")
		return LoginResult{}, ErrInvalidCredentials
	}

	// Password selalu diverifikasi (walau akun terkunci/nonaktif) supaya
	// waktu respons konsisten di semua kondisi.
	passwordOK := security.VerifyPasswordConstantTime(password, staff.PasswordHash)
	locked := staff.LockedUntil != nil && staff.LockedUntil.After(time.Now())

	if locked || !staff.IsActive || !passwordOK {
		if !locked {
			if recordErr := a.repo.RecordFailedLogin(ctx, staff.StaffID, LoginLockThreshold, LoginLockDuration); recordErr != nil {
				return LoginResult{}, fmt.Errorf("login: %w", recordErr)
			}
		}
		return LoginResult{}, ErrInvalidCredentials
	}

	mfaVerified := false
	if staff.Role == "admin" {
		mfaCode = strings.TrimSpace(mfaCode)
		valid := false
		var step int64

		if mfaCode != "" && staff.MFASecret != nil {
			step, valid = security.VerifyTOTP(*staff.MFASecret, mfaCode, staff.MFALastStep, time.Now())
		}

		if !valid {
			if recordErr := a.repo.RecordFailedLogin(ctx, staff.StaffID, LoginLockThreshold, LoginLockDuration); recordErr != nil {
				return LoginResult{}, fmt.Errorf("login: %w", recordErr)
			}
			return LoginResult{}, ErrInvalidCredentials
		}

		if err := a.repo.UpdateMFALastStep(ctx, staff.StaffID, step); err != nil {
			return LoginResult{}, fmt.Errorf("login: %w", err)
		}
		mfaVerified = true
	}

	if err := a.repo.ResetFailedLogin(ctx, staff.StaffID); err != nil {
		return LoginResult{}, fmt.Errorf("login: %w", err)
	}

	token, err := security.GenerateSessionToken()
	if err != nil {
		return LoginResult{}, fmt.Errorf("login: %w", err)
	}
	csrfToken, err := security.GenerateCSRFToken()
	if err != nil {
		return LoginResult{}, fmt.Errorf("login: %w", err)
	}

	expiresAt := time.Now().Add(SessionAbsoluteTimeout)
	if _, err := a.repo.CreateSession(ctx, repo.CreateSessionParams{
		StaffID:     staff.StaffID,
		TokenHash:   security.HashSessionToken(token),
		CSRFToken:   csrfToken,
		MFAVerified: mfaVerified,
		ExpiresAt:   expiresAt,
	}); err != nil {
		return LoginResult{}, fmt.Errorf("login: %w", err)
	}

	return LoginResult{
		Token:              token,
		Staff:              StaffView{StaffID: staff.StaffID, Name: staff.Name, Role: staff.Role},
		CSRFToken:          csrfToken,
		IdleTimeoutSeconds: int(SessionIdleTimeout.Seconds()),
		SessionExpiresAt:   expiresAt,
	}, nil
}

// Logout menghapus sesi di server. Token yang sudah tidak ada dianggap
// sukses (idempotent).
func (a *AuthService) Logout(ctx context.Context, token string) error {
	if strings.TrimSpace(token) == "" {
		return nil
	}
	return a.repo.DeleteSessionByTokenHash(ctx, security.HashSessionToken(token))
}

type SessionView struct {
	SessionID          int64
	StaffID            int64
	StaffName          string
	StaffUsername      string
	StaffRole          string
	CSRFToken          string
	MFAVerified        bool
	IdleTimeoutSeconds int
	SessionExpiresAt   time.Time
}

// ValidateSession mengecek idle timeout (15 menit) dan absolute timeout
// (8 jam), menolak sesi milik staf yang sudah dinonaktifkan, lalu
// memperbarui last_seen_at kalau sesi masih valid.
func (a *AuthService) ValidateSession(ctx context.Context, token string) (SessionView, error) {
	if strings.TrimSpace(token) == "" {
		return SessionView{}, ErrSessionInvalid
	}

	sess, err := a.repo.GetSessionByTokenHash(ctx, security.HashSessionToken(token))
	if err != nil {
		if errors.Is(err, repo.ErrSessionNotFound) {
			return SessionView{}, ErrSessionInvalid
		}
		return SessionView{}, fmt.Errorf("validasi sesi: %w", err)
	}

	now := time.Now()
	if !sess.StaffIsActive {
		return SessionView{}, ErrSessionInvalid
	}
	if now.After(sess.ExpiresAt) {
		return SessionView{}, ErrSessionInvalid
	}
	if now.Sub(sess.LastSeenAt) > SessionIdleTimeout {
		return SessionView{}, ErrSessionInvalid
	}

	if err := a.repo.TouchSession(ctx, sess.SessionID, now); err != nil {
		return SessionView{}, fmt.Errorf("validasi sesi: %w", err)
	}

	return SessionView{
		SessionID:          sess.SessionID,
		StaffID:            sess.StaffID,
		StaffName:          sess.StaffName,
		StaffUsername:      sess.StaffUsername,
		StaffRole:          sess.StaffRole,
		CSRFToken:          sess.CSRFToken,
		MFAVerified:        sess.MFAVerified,
		IdleTimeoutSeconds: int(SessionIdleTimeout.Seconds()),
		SessionExpiresAt:   sess.ExpiresAt,
	}, nil
}
