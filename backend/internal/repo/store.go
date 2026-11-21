package repo

import (
	"sync"
	"time"
)

type Store struct {
	mu           sync.RWMutex
	categories   []CategoryOption
	colors       []ColorOption
	locations    []LocationOption
	items        []ItemData
	foundReports []FoundReport
	lostReports  []LostReport
	auditLogs	 []AuditLog
	failedClaims []FailedClaimRecord
}

func NewStore() *Store {
	p1 := 10
	p2 := 20
	now := time.Now()
	return &Store{
		categories: []CategoryOption{
			{CategoryID: 1, Name: "Dompet"},
			{CategoryID: 2, Name: "Handphone"},
			{CategoryID: 3, Name: "Kunci"},
		},
		colors: []ColorOption{
			{Code: "hitam", Label: "Hitam"},
			{Code: "coklat", Label: "Coklat"},
			{Code: "biru", Label: "Biru"},
		},
		locations: []LocationOption{
			{LocationID: 1, Name: "Perpustakaan Pusat", ParentLocationID: &p1},
			{LocationID: 2, Name: "Gedung FTI", ParentLocationID: &p2},
			{LocationID: 3, Name: "Masjid Ulil Albab", ParentLocationID: &p1},
		},
		items: []ItemData{
			{
				ItemID:      "B-0462",
				Status:      "barang_ditemukan",
				Category:    CategoryOption{CategoryID: 1, Name: "Dompet"},
				Color:       ColorOption{Code: "hitam", Label: "Hitam"},
				LocationID:  1,
				FoundAt:     now.Add(-1 * time.Hour),
				PostName:    "Pos Satpam Rektorat",
				StorageRack: "Rak B-2",
				SecretNote:  "Ada KTM di dalam",
			},
			{
				ItemID:      "B-0463",
				Status:      "proses_verifikasi",
				Category:    CategoryOption{CategoryID: 2, Name: "Handphone"},
				Color:       ColorOption{Code: "biru", Label: "Biru"},
				LocationID:  2,
				FoundAt:     now.Add(-2 * time.Hour),
				PostName:    "Pos Satpam FTI",
				StorageRack: "Rak A-1",
				SecretNote:  "Casing bening",
			},
		},
	}
}