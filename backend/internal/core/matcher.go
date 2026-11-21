package core

import (
	"math"
	"strings"
	"time"
	"unicode"
)

type MatchInput struct {
	LostCategoryID   int64
	FoundCategoryID  int64
	LostColor        string
	FoundColor       string
	LostLocationID   int64
	FoundLocationID  int64
	LostParentLocID  *int64
	FoundParentLocID *int64
	LostAt           time.Time
	FoundAt          time.Time
	LostDescription  string
	FoundDescription string
}

type MatchOutput struct {
	Eligible            bool    `json:"eligible"`
	ReasonIfIneligible  string  `json:"reason_if_ineligible,omitempty"`
	ColorScore          float64 `json:"color_score"`
	LocationScore       float64 `json:"location_score"`
	TimeScore           float64 `json:"time_score"`
	FinalScore          float64 `json:"final_score"`
	DescriptionPriority float64 `json:"description_priority"`
	Category            string  `json:"category"` // "Tinggi", "Sedang", "Rendah", "Data Tidak Memadai"
	AutoNotify          bool    `json:"auto_notify"`
}

func EvaluateMatch(in MatchInput) MatchOutput {
	// 1. Filter wajib: kategori harus sama
	if in.LostCategoryID == 0 || in.LostCategoryID != in.FoundCategoryID {
		return MatchOutput{
			Eligible:           false,
			ReasonIfIneligible: "kategori berbeda",
			Category:           "Tidak Cocok",
		}
	}

	// 2. Gugur bila barang ditemukan lebih dari 2 jam sebelum perkiraan waktu hilang
	if in.FoundAt.Before(in.LostAt.Add(-2 * time.Hour)) {
		return MatchOutput{
			Eligible:           false,
			ReasonIfIneligible: "barang ditemukan lebih dari 2 jam sebelum waktu hilang",
			Category:           "Tidak Cocok",
		}
	}

	var weightedSum, totalActiveWeight float64
	var availableComponents int

	// Komponen C: Warna (bobot 0.35; "lainnya" / kosong tidak dihitung)
	cNorm := strings.ToLower(strings.TrimSpace(in.LostColor))
	fColorNorm := strings.ToLower(strings.TrimSpace(in.FoundColor))
	var colorScore float64
	if cNorm != "" && fColorNorm != "" && cNorm != "lainnya" && fColorNorm != "lainnya" {
		if cNorm == fColorNorm {
			colorScore = 1.0
		}
		weightedSum += 0.35 * colorScore
		totalActiveWeight += 0.35
		availableComponents++
	}

	// Komponen L: Lokasi (bobot 0.35; sama = 1.0, satu zona/gedung induk = 0.5, lain = 0)
	var locScore float64
	if in.LostLocationID > 0 && in.FoundLocationID > 0 {
		if in.LostLocationID == in.FoundLocationID {
			locScore = 1.0
		} else if in.LostParentLocID != nil && in.FoundParentLocID != nil && *in.LostParentLocID == *in.FoundParentLocID {
			locScore = 0.5
		}
		weightedSum += 0.35 * locScore
		totalActiveWeight += 0.35
		availableComponents++
	}

	// Komponen T: Selisih waktu (bobot 0.30; <24 jam = 1.0, <=3 hari = 0.6, <=7 hari = 0.3, >7 hari = 0)
	var timeScore float64
	if !in.LostAt.IsZero() && !in.FoundAt.IsZero() {
		diff := in.FoundAt.Sub(in.LostAt)
		if diff < 0 {
			diff = -diff
		}
		switch {
		case diff < 24*time.Hour:
			timeScore = 1.0
		case diff <= 3*24*time.Hour:
			timeScore = 0.6
		case diff <= 7*24*time.Hour:
			timeScore = 0.3
		default:
			timeScore = 0.0
		}
		weightedSum += 0.30 * timeScore
		totalActiveWeight += 0.30
		availableComponents++
	}

	// Prioritas deskripsi (Jaccard) hanya untuk urutan di dashboard, tidak masuk skor notifikasi
	descPriority := jaccardSimilarity(tokenize(in.LostDescription), tokenize(in.FoundDescription))

	// Jika hanya 1 komponen tersedia -> "Data tidak memadai", tanpa notifikasi otomatis
	if availableComponents <= 1 || totalActiveWeight == 0 {
		return MatchOutput{
			Eligible:            true,
			ColorScore:          round2(colorScore * 100),
			LocationScore:       round2(locScore * 100),
			TimeScore:           round2(timeScore * 100),
			FinalScore:          0,
			DescriptionPriority: round4(descPriority),
			Category:            "Data Tidak Memadai",
			AutoNotify:          false,
		}
	}

	finalScore := round2(100.0 * (weightedSum / totalActiveWeight))
	category := "Rendah"
	autoNotify := false

	switch {
	case finalScore >= 80:
		category = "Tinggi"
		autoNotify = true
	case finalScore >= 50:
		category = "Sedang"
	}

	return MatchOutput{
		Eligible:            true,
		ColorScore:          round2(colorScore * 100),
		LocationScore:       round2(locScore * 100),
		TimeScore:           round2(timeScore * 100),
		FinalScore:          finalScore,
		DescriptionPriority: round4(descPriority),
		Category:            category,
		AutoNotify:          autoNotify,
	}
}

func tokenize(text string) map[string]struct{} {
	lower := strings.ToLower(text)
	cleaned := strings.Map(func(r rune) rune {
		if unicode.IsLetter(r) || unicode.IsNumber(r) || unicode.IsSpace(r) {
			return r
		}
		return ' '
	}, lower)

	tokens := make(map[string]struct{})
	for _, w := range strings.Fields(cleaned) {
		if len([]rune(w)) >= 2 {
			tokens[w] = struct{}{}
		}
	}
	return tokens
}

func jaccardSimilarity(a, b map[string]struct{}) float64 {
	if len(a) == 0 && len(b) == 0 {
		return 0
	}
	var inter int
	for k := range a {
		if _, ok := b[k]; ok {
			inter++
		}
	}
	union := len(a) + len(b) - inter
	if union == 0 {
		return 0
	}
	return float64(inter) / float64(union)
}

func round2(v float64) float64 {
	return math.Round(v*100) / 100
}

func round4(v float64) float64 {
	return math.Round(v*10000) / 10000
}