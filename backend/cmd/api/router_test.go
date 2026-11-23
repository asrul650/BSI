package main

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"LostandFound/internal/middleware"
	"LostandFound/internal/repo"
	"LostandFound/internal/security"
	"LostandFound/internal/service"
)

// fakeStaffAuthRepo adalah implementasi service.StaffAuthRepository di
// memori. Router dites dengan store Postgres bernilai nil (tidak boleh
// disentuh oleh handler di balik middleware yang memblokir request tanpa
// sesi), tapi AuthService tetap butuh repo asli untuk ValidateSession.
type fakeStaffAuthRepo struct {
	sessions map[string]repo.Session
}

func newFakeStaffAuthRepo() *fakeStaffAuthRepo {
	return &fakeStaffAuthRepo{sessions: map[string]repo.Session{}}
}

func (f *fakeStaffAuthRepo) GetStaffByUsername(context.Context, string) (repo.Staff, error) {
	return repo.Staff{}, repo.ErrStaffNotFound
}

func (f *fakeStaffAuthRepo) RecordFailedLogin(context.Context, int64, int, time.Duration) error {
	return nil
}

func (f *fakeStaffAuthRepo) ResetFailedLogin(context.Context, int64) error { return nil }

func (f *fakeStaffAuthRepo) UpdateMFALastStep(context.Context, int64, int64) error { return nil }

func (f *fakeStaffAuthRepo) CreateSession(context.Context, repo.CreateSessionParams) (int64, error) {
	return 0, nil
}

func (f *fakeStaffAuthRepo) GetSessionByTokenHash(_ context.Context, tokenHash string) (repo.Session, error) {
	sess, ok := f.sessions[tokenHash]
	if !ok {
		return repo.Session{}, repo.ErrSessionNotFound
	}
	return sess, nil
}

func (f *fakeStaffAuthRepo) TouchSession(_ context.Context, sessionID int64, lastSeen time.Time) error {
	for hash, sess := range f.sessions {
		if sess.SessionID == sessionID {
			sess.LastSeenAt = lastSeen
			f.sessions[hash] = sess
		}
	}
	return nil
}

func (f *fakeStaffAuthRepo) DeleteSessionByTokenHash(_ context.Context, tokenHash string) error {
	delete(f.sessions, tokenHash)
	return nil
}

// newTestSessionCookie membuat sesi langsung di repo palsu (tanpa lewat
// Login), lalu mengembalikan cookie siap pakai + CSRF token-nya.
func newTestSessionCookie(t *testing.T, fake *fakeStaffAuthRepo, staffID int64, name, username, role string, mfaVerified bool) (*http.Cookie, string) {
	t.Helper()

	token, err := security.GenerateSessionToken()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	csrfToken, err := security.GenerateCSRFToken()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	fake.sessions[security.HashSessionToken(token)] = repo.Session{
		SessionID:     staffID,
		StaffID:       staffID,
		CSRFToken:     csrfToken,
		MFAVerified:   mfaVerified,
		LastSeenAt:    time.Now(),
		ExpiresAt:     time.Now().Add(1 * time.Hour),
		StaffName:     name,
		StaffUsername: username,
		StaffRole:     role,
		StaffIsActive: true,
	}

	return &http.Cookie{Name: middleware.SessionCookieName, Value: token}, csrfToken
}

func testMux(t *testing.T) (http.Handler, *fakeStaffAuthRepo) {
	t.Helper()

	// store dengan pool nil: aman selama middleware memblokir semua request
	// yang dites di sini sebelum mencapai handler yang menyentuh DB.
	store := repo.NewStore(nil)
	fakeRepo := newFakeStaffAuthRepo()
	authService := service.NewAuthService(fakeRepo)

	otpService := &service.OTPService{} // tidak dipanggil di rute yang dites

	mux := buildMux(store, otpService, authService, true, "http://localhost:5173")
	return mux, fakeRepo
}

// staffRoutes adalah daftar SEMUA rute di bawah /v1/staff/ dan /auth/
// (selain /auth/login yang memang publik) yang terdaftar di buildMux.
// Kalau ada rute staf baru ditambahkan ke buildMux tapi lupa dimasukkan ke
// sini, test ini tidak otomatis tahu -- tapi TestUnknownStaffPathIsBlocked
// membuktikan prefix "/v1/staff/" sendiri sudah menutup rute yang TIDAK
// terdaftar di sini sekalipun, jadi lupa menambah satu baris di bawah tidak
// membuka lubang baru.
var staffRoutes = []struct {
	method string
	path   string
}{
	{http.MethodGet, "/v1/staff/found-reports/pending"},
	{http.MethodPost, "/v1/staff/found-reports/TM-00000001/receive"},
	{http.MethodPost, "/v1/staff/found-reports/TM-00000001/receipt/send"},
	{http.MethodGet, "/v1/staff/items"},
	{http.MethodPost, "/v1/staff/items/B-0462/start-verify"},
	{http.MethodPost, "/v1/staff/items/B-0462/reject-claim"},
	{http.MethodPost, "/v1/staff/items/B-0462/handover"},
	{http.MethodGet, "/v1/staff/audit-logs"},
	{http.MethodGet, "/auth/me"},
	{http.MethodPost, "/auth/logout"},
}

func TestAllStaffAndAuthRoutesReject401WithoutSession(t *testing.T) {
	mux, _ := testMux(t)

	for _, route := range staffRoutes {
		t.Run(route.method+" "+route.path, func(t *testing.T) {
			req := httptest.NewRequest(route.method, route.path, nil)
			rec := httptest.NewRecorder()
			mux.ServeHTTP(rec, req)

			if rec.Code != http.StatusUnauthorized {
				t.Fatalf("expected 401 without session, got %d: %s", rec.Code, rec.Body.String())
			}
		})
	}
}

func TestUnknownStaffPathIsBlockedByDefault(t *testing.T) {
	mux, _ := testMux(t)

	req := httptest.NewRequest(http.MethodGet, "/v1/staff/some-route-nobody-registered-yet", nil)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401 for unregistered staff path without session, got %d", rec.Code)
	}
}

func TestAuditLogRejectsSatpamRole(t *testing.T) {
	mux, fakeRepo := testMux(t)
	cookie, _ := newTestSessionCookie(t, fakeRepo, 1, "Satpam Pos 1", "satpam_pos1", "satpam", false)

	req := httptest.NewRequest(http.MethodGet, "/v1/staff/audit-logs", nil)
	req.AddCookie(cookie)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusForbidden {
		t.Fatalf("expected 403 for satpam on admin-only route, got %d: %s", rec.Code, rec.Body.String())
	}
}

func TestAuditLogRejectsAdminWithoutMFA(t *testing.T) {
	mux, fakeRepo := testMux(t)
	cookie, _ := newTestSessionCookie(t, fakeRepo, 2, "Admin LF", "admin_lf", "admin", false)

	req := httptest.NewRequest(http.MethodGet, "/v1/staff/audit-logs", nil)
	req.AddCookie(cookie)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusForbidden {
		t.Fatalf("expected 403 for admin session without MFA, got %d: %s", rec.Code, rec.Body.String())
	}
}

func TestAuditLogSucceedsForAdminWithMFA(t *testing.T) {
	mux, fakeRepo := testMux(t)
	cookie, _ := newTestSessionCookie(t, fakeRepo, 2, "Admin LF", "admin_lf", "admin", true)

	req := httptest.NewRequest(http.MethodGet, "/v1/staff/audit-logs", nil)
	req.AddCookie(cookie)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200 for admin session with MFA verified, got %d: %s", rec.Code, rec.Body.String())
	}
}

func TestAuthMeReturnsSessionForValidCookie(t *testing.T) {
	mux, fakeRepo := testMux(t)
	cookie, _ := newTestSessionCookie(t, fakeRepo, 1, "Satpam Pos 1", "satpam_pos1", "satpam", false)

	req := httptest.NewRequest(http.MethodGet, "/auth/me", nil)
	req.AddCookie(cookie)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d: %s", rec.Code, rec.Body.String())
	}
	if !strings.Contains(rec.Body.String(), `"role":"satpam"`) {
		t.Fatalf("expected response to contain satpam role, got %s", rec.Body.String())
	}
}

func TestStaffMutationRejectsMissingCSRFToken(t *testing.T) {
	mux, fakeRepo := testMux(t)
	cookie, _ := newTestSessionCookie(t, fakeRepo, 1, "Satpam Pos 1", "satpam_pos1", "satpam", false)

	req := httptest.NewRequest(http.MethodPost, "/v1/staff/items/B-0463/reject-claim", strings.NewReader(`{"reason":"test"}`))
	req.AddCookie(cookie)
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusForbidden {
		t.Fatalf("expected 403 without CSRF token, got %d: %s", rec.Code, rec.Body.String())
	}
}

func TestStaffMutationSucceedsWithValidCSRFToken(t *testing.T) {
	mux, fakeRepo := testMux(t)
	cookie, csrfToken := newTestSessionCookie(t, fakeRepo, 1, "Satpam Pos 1", "satpam_pos1", "satpam", false)

	// B-0463 di-seed dengan status "proses_verifikasi" di repo.NewStore.
	req := httptest.NewRequest(http.MethodPost, "/v1/staff/items/B-0463/reject-claim", strings.NewReader(`{"reason":"test"}`))
	req.AddCookie(cookie)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set(middleware.CSRFHeaderName, csrfToken)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200 with valid CSRF token, got %d: %s", rec.Code, rec.Body.String())
	}
}
