package repo

import "time"

type CategoryOption struct {
	CategoryID int    `json:"category_id"`
	Name       string `json:"name"`
}

type ColorOption struct {
	Code  string `json:"code"`
	Label string `json:"label"`
}

type LocationOption struct {
	LocationID       int    `json:"location_id"`
	Name             string `json:"name"`
	ParentLocationID *int   `json:"parent_location_id,omitempty"`
}

type PublicItem struct {
	ItemID       string         `json:"item_id"`
	ItemName     string         `json:"item_name"`
	Category     CategoryOption `json:"category"`
	Color        ColorOption    `json:"color"`
	LocationName string         `json:"location_name"`
	FoundAt      time.Time      `json:"found_at"`
	Status       string         `json:"status"`
}

type ItemData struct {
	ItemID         string
	Status         string
	ReceivedByName string
	Category       CategoryOption
	Color          ColorOption
	LocationID     int
	FoundAt        time.Time
	PostName       string
	StorageRack    string
	SecretNote     string
	Claim          *ClaimInfo    `json:"claim,omitempty"`
	Handover       *HandoverInfo `json:"handover,omitempty"`
}

type ReceivedItemParams struct {
	ReportID    string
	ItemID      string
	StorageRack string
	StaffID     int64
}

type FoundReport struct {
	ReportID       string    `json:"report_id"`
	Status         string    `json:"status"`
	CategoryID     int64     `json:"category_id"`
	Color          string    `json:"color"`
	LocationID     int64     `json:"location_id"`
	ItemName       string    `json:"item_name"`
	FoundAt        time.Time `json:"found_at"`
	Description    string    `json:"description"`
	FinderName     string    `json:"finder_name"`
	FinderWhatsApp string    `json:"finder_whatsapp"`
	PhotoKey       *string   `json:"photo_key,omitempty"`
	Source         string    `json:"source"`
	CreatedAt      time.Time `json:"created_at"`
	ExpiresAt      time.Time `json:"expires_at"`
}

type FoundReceipt struct {
	ReportID       string
	ItemID         string
	FinderName     string
	FinderWhatsApp string
	ReceivedByName string
	ReceivedAt     time.Time
}

type FoundIntakeStats struct {
	ExpiringSoon  int64 `json:"expiring_soon"`
	PendingTotal  int64 `json:"pending_total"`
	ReceivedToday int64 `json:"received_today"`
	ActiveItems   int64 `json:"active_items"`
}

type LostReport struct {
	ReportID         string    `json:"report_id"`
	Status           string    `json:"status"`
	CategoryID       int64     `json:"category_id"`
	Color            string    `json:"color"`
	LocationID       int64     `json:"location_id"`
	LostAt           time.Time `json:"lost_at"`
	Description      string    `json:"description"`
	ReporterName     string    `json:"reporter_name"`
	ReporterWhatsApp string    `json:"reporter_whatsapp"`
	ItemName         string    `json:"item_name"`
}

type CreateLostReportParams struct {
	ReportID         string
	CategoryID       int64
	ItemName         string
	Color            string
	LocationID       int64
	LostAt           time.Time
	Description      string
	ReporterName     string
	ReporterWhatsApp string
	ConsentAt        time.Time

	PhoneHash string
	TokenHash string
}

type CreateFoundReportParams struct {
	ReportID       string
	CategoryID     int64
	Color          string
	LocationID     int64
	FoundAt        time.Time
	Description    string
	FinderName     string
	FinderWhatsApp string
	ItemName       string
	ConsentAt      time.Time

	PhoneHash string
	TokenHash string
}

type MatchCandidate struct {
	ReportID string `json:"report_id,omitempty"`
	ItemID   string `json:"item_id,omitempty"`
	PostName string `json:"post_name,omitempty"`
	Score    int    `json:"score"`
}

type ClaimInfo struct {
	ClaimantName   string `json:"claimant_name"`
	ClaimantIDType string `json:"claimant_id_type"`
	ClaimantWA     string `json:"claimant_wa"`
	RejectReason   string `json:"reject_reason,omitempty"`
	RejectCount    int    `json:"reject_count,omitempty"`
}

type HandoverInfo struct {
	ReceiverName string `json:"receiver_name"`
	ReceiverWA   string `json:"receiver_wa"`
	LostReportID string `json:"lost_report_id,omitempty"`
}

type MatchResult struct {
	ReportID      string  `json:"report_id,omitempty"`
	ItemID        string  `json:"item_id,omitempty"`
	PostName      string  `json:"post_name,omitempty"`
	ColorScore    float64 `json:"color_score"`
	LocationScore float64 `json:"location_score"`
	TimeScore     float64 `json:"time_score"`
	Score         float64 `json:"score"`
	Band          string  `json:"band"` // tinggi | sedang | rendah | data_tidak_memadai
	ShouldNotify  bool    `json:"should_notify"`
}

type FailedClaimRecord struct {
	ClaimantName string    `json:"claimant_name"`
	ClaimantWA   string    `json:"claimant_wa"`
	ItemID       string    `json:"item_id"`
	Reason       string    `json:"reason"`
	RejectedAt   time.Time `json:"rejected_at"`
}

// staff stuff
type AuditLog struct {
	ID        string    `json:"id"`
	Action    string    `json:"action"` // receive_found | start_verify | reject_claim | handover
	TargetID  string    `json:"target_id"`
	Actor     string    `json:"actor"`
	Detail    string    `json:"detail"`
	CreatedAt time.Time `json:"created_at"`
	Anomalies []string  `json:"anomalies,omitempty"`
}

// OTP models
const (
	OTPPurposeLostReport  = "lost_report"
	OTPPurposeFoundReport = "found_report"
)

type OTPRecord struct {
	OTPId                 int64
	PhoneHash             string
	Purpose               string
	CodeHash              string
	ExpiresAt             time.Time
	AttemptCount          int
	UsedAt                *time.Time
	IPHash                *string
	VerificationTokenHash *string
	TokenExpiresAt        *time.Time
	TokenUsedAt           *time.Time
}

type CreateOTPParams struct {
	PhoneHash string
	Purpose   string
	CodeHash  string
	ExpiresAt time.Time
	IPHash    *string
}
