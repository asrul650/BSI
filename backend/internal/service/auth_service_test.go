package service

import (
	"context"
	"errors"
	"testing"
	"time"

	"LostandFound/internal/repo"
	"LostandFound/internal/security"
)

// fakeAuthRepo adalah implementasi StaffAuthRepository di memori untuk tes,
// supaya tidak perlu Postgres yang hidup.
type fakeAuthRepo struct {
	staffByUsername map[string]repo.Staff
	sessionsByHash  map[string]repo.Session
	nextSessionID   int64

	failedLoginCalls map[int64]int
}

func newFakeAuthRepo() *fakeAuthRepo {
	return &fakeAuthRepo{
		staffByUsername:  map[string]repo.Staff{},
		sessionsByHash:   map[string]repo.Session{},
		failedLoginCalls: map[int64]int{},
	}
}

func (f *fakeAuthRepo) GetStaffByUsername(_ context.Context, username string) (repo.Staff, error) {
	st, ok := f.staffByUsername[username]
	if !ok {
		return repo.Staff{}, repo.ErrStaffNotFound
	}
	return st, nil
}

func (f *fakeAuthRepo) RecordFailedLogin(_ context.Context, staffID int64, threshold int, duration time.Duration) error {
	f.failedLoginCalls[staffID]++

	for username, st := range f.staffByUsername {
		if st.StaffID != staffID {
			continue
		}
		st.FailedAttempts++
		if st.FailedAttempts >= threshold {
			lockedUntil := time.Now().Add(duration)
			st.LockedUntil = &lockedUntil
		}
		f.staffByUsername[username] = st
	}
	return nil
}

func (f *fakeAuthRepo) ResetFailedLogin(_ context.Context, staffID int64) error {
	for username, st := range f.staffByUsername {
		if st.StaffID != staffID {
			continue
		}
		st.FailedAttempts = 0
		st.LockedUntil = nil
		f.staffByUsername[username] = st
	}
	return nil
}

func (f *fakeAuthRepo) UpdateMFALastStep(_ context.Context, staffID int64, step int64) error {
	for username, st := range f.staffByUsername {
		if st.StaffID != staffID {
			continue
		}
		st.MFALastStep = step
		f.staffByUsername[username] = st
	}
	return nil
}

func (f *fakeAuthRepo) CreateSession(_ context.Context, p repo.CreateSessionParams) (int64, error) {
	f.nextSessionID++
	id := f.nextSessionID

	var staffName, staffUsername, staffRole string
	var staffActive bool
	for username, st := range f.staffByUsername {
		if st.StaffID != p.StaffID {
			continue
		}
		staffName, staffUsername, staffRole, staffActive = st.Name, username, st.Role, st.IsActive
	}

	now := time.Now()
	f.sessionsByHash[p.TokenHash] = repo.Session{
		SessionID:     id,
		StaffID:       p.StaffID,
		CSRFToken:     p.CSRFToken,
		MFAVerified:   p.MFAVerified,
		CreatedAt:     now,
		LastSeenAt:    now,
		ExpiresAt:     p.ExpiresAt,
		StaffName:     staffName,
		StaffUsername: staffUsername,
		StaffRole:     staffRole,
		StaffIsActive: staffActive,
	}
	return id, nil
}

func (f *fakeAuthRepo) GetSessionByTokenHash(_ context.Context, tokenHash string) (repo.Session, error) {
	sess, ok := f.sessionsByHash[tokenHash]
	if !ok {
		return repo.Session{}, repo.ErrSessionNotFound
	}
	return sess, nil
}

func (f *fakeAuthRepo) TouchSession(_ context.Context, sessionID int64, lastSeen time.Time) error {
	for hash, sess := range f.sessionsByHash {
		if sess.SessionID != sessionID {
			continue
		}
		sess.LastSeenAt = lastSeen
		f.sessionsByHash[hash] = sess
	}
	return nil
}

func (f *fakeAuthRepo) DeleteSessionByTokenHash(_ context.Context, tokenHash string) error {
	delete(f.sessionsByHash, tokenHash)
	return nil
}

func mustHash(t *testing.T, password string) string {
	t.Helper()
	hash, err := security.HashPassword(password)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	return hash
}

func TestLoginSucceedsForSatpamWithoutMFA(t *testing.T) {
	repoFake := newFakeAuthRepo()
	repoFake.staffByUsername["satpam_pos1"] = repo.Staff{
		StaffID:      1,
		Name:         "Satpam Pos 1",
		Username:     "satpam_pos1",
		PasswordHash: mustHash(t, "password-satpam"),
		Role:         "satpam",
		IsActive:     true,
	}

	svc := NewAuthService(repoFake)
	result, err := svc.Login(context.Background(), "satpam_pos1", "password-satpam", "")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if result.Token == "" || result.CSRFToken == "" {
		t.Fatal("expected a session token and CSRF token to be issued")
	}
	if result.Staff.Role != "satpam" {
		t.Fatalf("expected role satpam, got %q", result.Staff.Role)
	}
}

func TestLoginRejectsUnknownUsernameWithGenericError(t *testing.T) {
	svc := NewAuthService(newFakeAuthRepo())

	_, err := svc.Login(context.Background(), "tidak_ada", "apapun-saja", "")
	if !errors.Is(err, ErrInvalidCredentials) {
		t.Fatalf("expected ErrInvalidCredentials, got %v", err)
	}
}

func TestLoginRejectsWrongPasswordWithSameGenericError(t *testing.T) {
	repoFake := newFakeAuthRepo()
	repoFake.staffByUsername["satpam_pos1"] = repo.Staff{
		StaffID:      1,
		Username:     "satpam_pos1",
		PasswordHash: mustHash(t, "password-benar"),
		Role:         "satpam",
		IsActive:     true,
	}

	svc := NewAuthService(repoFake)
	_, err := svc.Login(context.Background(), "satpam_pos1", "password-salah", "")
	if !errors.Is(err, ErrInvalidCredentials) {
		t.Fatalf("expected ErrInvalidCredentials, got %v", err)
	}
}

func TestLoginLocksAccountAfterThresholdFailures(t *testing.T) {
	repoFake := newFakeAuthRepo()
	repoFake.staffByUsername["satpam_pos1"] = repo.Staff{
		StaffID:      1,
		Username:     "satpam_pos1",
		PasswordHash: mustHash(t, "password-benar"),
		Role:         "satpam",
		IsActive:     true,
	}

	svc := NewAuthService(repoFake)
	for i := 0; i < LoginLockThreshold; i++ {
		if _, err := svc.Login(context.Background(), "satpam_pos1", "password-salah", ""); !errors.Is(err, ErrInvalidCredentials) {
			t.Fatalf("attempt %d: expected ErrInvalidCredentials, got %v", i, err)
		}
	}

	// Password benar, tapi akun sudah terkunci -> tetap gagal generik.
	_, err := svc.Login(context.Background(), "satpam_pos1", "password-benar", "")
	if !errors.Is(err, ErrInvalidCredentials) {
		t.Fatalf("expected account to be locked out, got %v", err)
	}
}

func TestLoginRequiresValidMFAForAdmin(t *testing.T) {
	secret, err := security.GenerateTOTPSecret()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	repoFake := newFakeAuthRepo()
	repoFake.staffByUsername["admin_lf"] = repo.Staff{
		StaffID:      2,
		Username:     "admin_lf",
		PasswordHash: mustHash(t, "password-admin"),
		Role:         "admin",
		MFASecret:    &secret,
		IsActive:     true,
	}

	svc := NewAuthService(repoFake)

	// Tanpa mfa_code -> gagal generik.
	if _, err := svc.Login(context.Background(), "admin_lf", "password-admin", ""); !errors.Is(err, ErrInvalidCredentials) {
		t.Fatalf("expected ErrInvalidCredentials without MFA code, got %v", err)
	}

	// Dengan mfa_code salah -> tetap gagal generik.
	if _, err := svc.Login(context.Background(), "admin_lf", "password-admin", "000000"); !errors.Is(err, ErrInvalidCredentials) {
		t.Fatalf("expected ErrInvalidCredentials with wrong MFA code, got %v", err)
	}
}

func TestLoginRejectsPasswordUnderMinimumLength(t *testing.T) {
	repoFake := newFakeAuthRepo()
	repoFake.staffByUsername["satpam_pos1"] = repo.Staff{
		StaffID:      1,
		Username:     "satpam_pos1",
		PasswordHash: mustHash(t, "password-benar"),
		Role:         "satpam",
		IsActive:     true,
	}

	svc := NewAuthService(repoFake)

	// 7 karakter -> ditolak sebelum sempat dibandingkan ke hash asli.
	if _, err := svc.Login(context.Background(), "satpam_pos1", "pendek7", ""); !errors.Is(err, ErrInvalidCredentials) {
		t.Fatalf("expected ErrInvalidCredentials for 7-char password, got %v", err)
	}
}

func TestLoginRejectsCommonPassword(t *testing.T) {
	repoFake := newFakeAuthRepo()
	repoFake.staffByUsername["satpam_pos1"] = repo.Staff{
		StaffID:      1,
		Username:     "satpam_pos1",
		PasswordHash: mustHash(t, "password-benar"),
		Role:         "satpam",
		IsActive:     true,
	}

	svc := NewAuthService(repoFake)

	if _, err := svc.Login(context.Background(), "satpam_pos1", "password123", ""); !errors.Is(err, ErrInvalidCredentials) {
		t.Fatalf("expected ErrInvalidCredentials for common password, got %v", err)
	}
}

func TestValidateSessionRejectsUnknownToken(t *testing.T) {
	svc := NewAuthService(newFakeAuthRepo())
	_, err := svc.ValidateSession(context.Background(), "token-tidak-ada")
	if !errors.Is(err, ErrSessionInvalid) {
		t.Fatalf("expected ErrSessionInvalid, got %v", err)
	}
}

func TestValidateSessionRejectsExpiredSession(t *testing.T) {
	repoFake := newFakeAuthRepo()
	repoFake.staffByUsername["satpam_pos1"] = repo.Staff{
		StaffID: 1, Username: "satpam_pos1", Role: "satpam", IsActive: true,
	}

	token, err := security.GenerateSessionToken()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	tokenHash := security.HashSessionToken(token)
	repoFake.sessionsByHash[tokenHash] = repo.Session{
		SessionID:     1,
		StaffID:       1,
		LastSeenAt:    time.Now(),
		ExpiresAt:     time.Now().Add(-1 * time.Minute), // sudah lewat absolute timeout
		StaffIsActive: true,
	}

	svc := NewAuthService(repoFake)
	_, err = svc.ValidateSession(context.Background(), token)
	if !errors.Is(err, ErrSessionInvalid) {
		t.Fatalf("expected ErrSessionInvalid for expired session, got %v", err)
	}
}

func TestValidateSessionRejectsIdleTimeout(t *testing.T) {
	repoFake := newFakeAuthRepo()

	token, err := security.GenerateSessionToken()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	tokenHash := security.HashSessionToken(token)
	repoFake.sessionsByHash[tokenHash] = repo.Session{
		SessionID:     1,
		StaffID:       1,
		LastSeenAt:    time.Now().Add(-(SessionIdleTimeout + time.Minute)),
		ExpiresAt:     time.Now().Add(1 * time.Hour),
		StaffIsActive: true,
	}

	svc := NewAuthService(repoFake)
	_, err = svc.ValidateSession(context.Background(), token)
	if !errors.Is(err, ErrSessionInvalid) {
		t.Fatalf("expected ErrSessionInvalid for idle session, got %v", err)
	}
}

func TestValidateSessionRejectsDisabledStaff(t *testing.T) {
	repoFake := newFakeAuthRepo()

	token, err := security.GenerateSessionToken()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	tokenHash := security.HashSessionToken(token)
	repoFake.sessionsByHash[tokenHash] = repo.Session{
		SessionID:     1,
		StaffID:       1,
		LastSeenAt:    time.Now(),
		ExpiresAt:     time.Now().Add(1 * time.Hour),
		StaffIsActive: false, // dinonaktifkan admin setelah sesi dibuat
	}

	svc := NewAuthService(repoFake)
	_, err = svc.ValidateSession(context.Background(), token)
	if !errors.Is(err, ErrSessionInvalid) {
		t.Fatalf("expected ErrSessionInvalid for disabled staff, got %v", err)
	}
}
