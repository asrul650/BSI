package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"strings"
	"time"

	"LostandFound/internal/repo"
	"LostandFound/internal/security"
)

type OTPRepository interface {
	CreateOTPWithCooldown(
		ctx context.Context,
		p repo.CreateOTPParams,
		cooldown time.Duration,
	) (int64, error)

	InvalidateOTP(ctx context.Context, otpID int64) error

	VerifyOTPAndIssueToken(
		ctx context.Context,
		phoneHash string,
		purpose string,
		submittedCodeHash string,
		tokenHash string,
		tokenExpiresAt time.Time,
		maxAttempts int,
	) error

	ConsumeVerificationToken(
		ctx context.Context,
		phoneHash string,
		purpose string,
		tokenHash string,
	) error

	CreateLostReportWithToken(
		ctx context.Context,
		p repo.CreateLostReportParams,
	) error

	CreateFoundReportWithToken(
		ctx context.Context,
		p repo.CreateFoundReportParams,
	) error
}

type OTPService struct {
	repo       OTPRepository
	httpClient *http.Client

	fonnteToken string
	fonnteURL   string
	hashSecret  string

	expiry             time.Duration
	cooldown           time.Duration
	verificationSecret string
	tokenExpiry        time.Duration
}

type fonnteResponse struct {
	Status bool   `json:"status"`
	Reason string `json:"reason"`
	Detail string `json:"detail"`
}

func NewOTPService(r OTPRepository) (*OTPService, error) {
	token := os.Getenv("FONNTE_TOKEN")
	secret := os.Getenv("OTP_HASH_SECRET")
	endpoint := os.Getenv("FONNTE_BASE_URL")
	verificationSecret := os.Getenv("OTP_VERIFICATION_SECRET")

	if verificationSecret == "" {
		return nil, errors.New("OTP_VERIFICATION_SECRET belum dikonfigurasi")
	}

	if token == "" {
		return nil, errors.New("FONNTE_TOKEN belum diatur")
	}

	if secret == "" {
		return nil, errors.New("OTP_HASH_SECRET belum diatur")
	}

	if endpoint == "" {
		endpoint = "https://api.fonnte.com/send"
	}

	return &OTPService{
		repo:               r,
		fonnteToken:        token,
		fonnteURL:          endpoint,
		verificationSecret: verificationSecret,
		tokenExpiry:        10 * time.Minute,
		hashSecret:         secret,
		httpClient: &http.Client{
			Timeout: 15 * time.Second,
		},
		expiry:   3 * time.Minute,
		cooldown: 60 * time.Second,
	}, nil
}

var phonePattern = regexp.MustCompile(`^628[0-9]{7,12}$`)

// NormalizePhone mengubah nomor Indonesia menjadi format 628xxx.
func NormalizePhone(phone string) (string, error) {
	phone = strings.TrimSpace(phone)
	phone = strings.ReplaceAll(phone, " ", "")
	phone = strings.ReplaceAll(phone, "-", "")

	if strings.HasPrefix(phone, "+62") {
		phone = strings.TrimPrefix(phone, "+")
	} else if strings.HasPrefix(phone, "08") {
		phone = "62" + phone[1:]
	}

	if !phonePattern.MatchString(phone) {
		return "", errors.New("format nomor WhatsApp tidak valid")
	}

	return phone, nil
}

// SendOTP membuat OTP, menyimpannya, lalu mengirimkannya melalui Fonnte.
func (s *OTPService) SendOTP(

	ctx context.Context,
	phone string,
	purpose string,
	ip string,
) error {
	if s.fonnteToken == "" ||
		strings.Contains(strings.ToUpper(s.fonnteToken), "ISI_TOKEN") {
		return errors.New("FONNTE_TOKEN belum dikonfigurasi dengan token asli")
	}

	phone, err := NormalizePhone(phone)
	if err != nil {
		return err
	}

	if purpose != repo.OTPPurposeLostReport &&
		purpose != repo.OTPPurposeFoundReport {
		return errors.New("tujuan OTP tidak valid")
	}

	code, err := security.GenerateOTP()
	if err != nil {
		return fmt.Errorf("generate OTP: %w", err)
	}

	phoneHash := security.HashOTP(phone, s.hashSecret)
	codeHash := security.HashOTP(code, s.hashSecret)

	var ipHash *string
	if ip != "" {
		hash := security.HashOTP(ip, s.hashSecret)
		ipHash = &hash
	}

	otpID, err := s.repo.CreateOTPWithCooldown(
		ctx,
		repo.CreateOTPParams{
			PhoneHash: phoneHash,
			Purpose:   purpose,
			CodeHash:  codeHash,
			ExpiresAt: time.Now().Add(s.expiry),
			IPHash:    ipHash,
		},
		s.cooldown,
	)

	if err != nil {
		if errors.Is(err, repo.ErrOTPCooldown) {
			return err
		}
		return fmt.Errorf("save OTP: %w", err)
	}

	message := fmt.Sprintf(
		"Kode verifikasi Lost & Found UII Anda adalah %s. Berlaku selama 3 menit. Jangan berikan kode ini kepada siapa pun.",
		code,
	)

	if err := s.sendWhatsApp(ctx, phone, message); err != nil {
		invalidateErr := s.repo.InvalidateOTP(ctx, otpID)
		if invalidateErr != nil {
			return fmt.Errorf(
				"pengiriman OTP gagal dan penonaktifan OTP juga gagal: %w",
				invalidateErr,
			)
		}

		return fmt.Errorf("pengiriman OTP gagal: %w", err)
	}

	return nil
}

func (s *OTPService) sendWhatsApp(
	ctx context.Context,
	phone string,
	message string,
) error {
	form := url.Values{}
	form.Set("target", phone)
	form.Set("message", message)
	form.Set("countryCode", "0")

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		s.fonnteURL,
		strings.NewReader(form.Encode()),
	)
	if err != nil {
		return fmt.Errorf("create Fonnte request: %w", err)
	}

	req.Header.Set("Authorization", s.fonnteToken)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("connect to Fonnte: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("Fonnte returned HTTP %d", resp.StatusCode)
	}

	var result fonnteResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return fmt.Errorf("decode Fonnte response: %w", err)
	}

	if !result.Status {
		reason := result.Reason
		if reason == "" {
			reason = result.Detail
		}
		if reason == "" {
			reason = "Fonnte menolak pengiriman pesan"
		}
		return errors.New(reason)
	}

	return nil
}

var otpCodePattern = regexp.MustCompile(`^[0-9]{6}$`)

func (s *OTPService) VerifyOTP(
	ctx context.Context,
	phone string,
	purpose string,
	code string,
) (string, error) {

	// Validasi tujuan OTP
	if purpose != repo.OTPPurposeLostReport &&
		purpose != repo.OTPPurposeFoundReport {
		return "", errors.New("tujuan verifikasi tidak valid")
	}

	// Validasi format kode
	if !otpCodePattern.MatchString(code) {
		return "", errors.New("kode OTP harus terdiri dari 6 digit")
	}

	// Normalisasi nomor WhatsApp
	normalizedPhone, err := NormalizePhone(phone)
	if err != nil {
		return "", err
	}

	// Hash nomor dan kode OTP
	phoneHash := security.HashOTP(normalizedPhone, s.hashSecret)
	codeHash := security.HashOTP(code, s.hashSecret)

	// Buat token verifikasi acak
	token, err := security.GenerateVerificationToken()
	if err != nil {
		return "", fmt.Errorf("gagal membuat token verifikasi: %w", err)
	}

	// Database hanya menyimpan hash token
	tokenHash := security.HashVerificationToken(
		token,
		s.verificationSecret,
	)

	tokenExpiresAt := time.Now().Add(s.tokenExpiry)

	// Verifikasi OTP dan simpan token secara atomik
	err = s.repo.VerifyOTPAndIssueToken(
		ctx,
		phoneHash,
		purpose,
		codeHash,
		tokenHash,
		tokenExpiresAt,
		5,
	)
	if err != nil {
		return "", err
	}

	// Token mentah hanya dikembalikan setelah OTP valid
	return token, nil
}


func (s *OTPService) CreateLostReport(
	ctx context.Context,
	phone string,
	token string,
	p repo.CreateLostReportParams,
) error {
	if strings.TrimSpace(token) == "" {
		return errors.New("verification token wajib diisi")
	}

	normalizedPhone, err := NormalizePhone(phone)
	if err != nil {
		return err
	}

	reportPhone, err := NormalizePhone(p.ReporterWhatsApp)
	if err != nil {
		return err
	}

	// Pastikan nomor pada laporan sama dengan nomor yang diverifikasi.
	if normalizedPhone != reportPhone {
		return errors.New("nomor WhatsApp tidak sesuai dengan hasil verifikasi")
	}

	p.ReporterWhatsApp = normalizedPhone
	p.PhoneHash = security.HashOTP(normalizedPhone, s.hashSecret)
	p.TokenHash = security.HashVerificationToken(
		token,
		s.verificationSecret,
	)

	return s.repo.CreateLostReportWithToken(ctx, p)
}

func (s *OTPService) CreateFoundReport(
	ctx context.Context,
	phone string,
	token string,
	p repo.CreateFoundReportParams,
) error {
	if strings.TrimSpace(token) == "" {
		return errors.New("verification token wajib diisi")
	}

	normalizedPhone, err := NormalizePhone(phone)
	if err != nil {
		return err
	}

	reportPhone, err := NormalizePhone(p.FinderWhatsApp)
	if err != nil {
		return err
	}

	if normalizedPhone != reportPhone {
		return errors.New("nomor WhatsApp tidak sesuai dengan hasil verifikasi")
	}

	p.FinderWhatsApp = normalizedPhone
	p.PhoneHash = security.HashOTP(normalizedPhone, s.hashSecret)
	p.TokenHash = security.HashVerificationToken(token, s.verificationSecret)

	return s.repo.CreateFoundReportWithToken(ctx, p)
}