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
	LocationID int    `json:"location_id"`
	Name       string `json:"name"`
	ParentLocationID *int   `json:"parent_location_id,omitempty"`
}

type PublicItem struct {
	ItemID   string         `json:"item_id"`
	Category CategoryOption `json:"category"`
	Color    ColorOption    `json:"color"`
	PostName string         `json:"post_name"`
}

type ItemData struct {
	ItemID      string
	Status      string
	Category    CategoryOption
	Color       ColorOption
	LocationID  int
	FoundAt     time.Time
	PostName    string
	StorageRack string
	SecretNote  string
	Claim    *ClaimInfo    `json:"claim,omitempty"`
	Handover *HandoverInfo `json:"handover,omitempty"`
}

type FoundReport struct {
	ReportID         string    `json:"report_id"`
	Status           string    `json:"status"`
	CategoryID       int       `json:"category_id"`
	Color            string    `json:"color"`
	LocationID       int       `json:"location_id"`
	FoundAt          time.Time `json:"found_at"`
	Description      string    `json:"description"`
	FinderName       string    `json:"finder_name"`
	FinderWhatsApp 	 string    `json:"finder_whatsapp"`
}

type LostReport struct {
	ReportID         string    `json:"report_id"`
	Status           string    `json:"status"`
	CategoryID       int       `json:"category_id"`
	Color            string    `json:"color"`
	LocationID       int       `json:"location_id"`
	LostAt           time.Time `json:"lost_at"`
	Description      string    `json:"description"`
	ReporterName     string    `json:"reporter_name"`
	ReporterWhatsApp string    `json:"reporter_whatsapp"`
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
//staff stuff
type AuditLog struct {
	ID        string    `json:"id"`
	Action    string    `json:"action"` // receive_found | start_verify | reject_claim | handover
	TargetID  string    `json:"target_id"`
	Actor     string    `json:"actor"`
	Detail    string    `json:"detail"`
	CreatedAt time.Time `json:"created_at"`
	Anomalies []string  `json:"anomalies,omitempty"`
}