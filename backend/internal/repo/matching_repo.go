package repo

import (
	"math"
	"strings"
	"time"
)

func (s *Store) computeMatch(lr LostReport, it ItemData) (MatchResult, bool) {
	if it.Status != "barang_ditemukan" || it.Category.CategoryID != lr.CategoryID {
		return MatchResult{}, false
	}
	if it.FoundAt.Before(lr.LostAt.Add(-2 * time.Hour)) {
		return MatchResult{}, false
	}

	var sumWeighted, activeWeight float64
	var components int
	var colorVal, locVal, timeVal float64

	// 1. Warna (35%)
	if !strings.EqualFold(lr.Color, "lainnya") && !strings.EqualFold(it.Color.Code, "lainnya") {
		if strings.EqualFold(lr.Color, it.Color.Code) {
			colorVal = 1.0
		}
		sumWeighted += 0.35 * colorVal
		activeWeight += 0.35
		components++
	}

	// 2. Lokasi (35%)
	if lr.LocationID != 99 && it.LocationID != 99 {
		if lr.LocationID == it.LocationID {
			locVal = 1.0
		} else if s.sameParentLocation(lr.LocationID, it.LocationID) {
			locVal = 0.5
		}
		sumWeighted += 0.35 * locVal
		activeWeight += 0.35
		components++
	}

	// 3. Selisih waktu (30%)
	diff := it.FoundAt.Sub(lr.LostAt)
	if diff < 0 {
		diff = -diff
	}
	timeVal = timeScoreFromDiff(diff)
	sumWeighted += 0.30 * timeVal
	activeWeight += 0.30
	components++

	if components < 2 || activeWeight == 0 {
		return MatchResult{
			ReportID:      lr.ReportID,
			ItemID:        it.ItemID,
			PostName:      it.PostName,
			ColorScore:    colorVal,
			LocationScore: locVal,
			TimeScore:     timeVal,
			Score:         0,
			Band:          "data_tidak_memadai",
			ShouldNotify:  false,
		}, true
	}

	rawScore := 100.0 * (sumWeighted / activeWeight)
	score := math.Round(rawScore*100) / 100

	band := "rendah"
	notify := false
	if score >= 80 {
		band = "tinggi"
		notify = true
	} else if score >= 50 {
		band = "sedang"
	}

	return MatchResult{
		ReportID:      lr.ReportID,
		ItemID:        it.ItemID,
		PostName:      it.PostName,
		ColorScore:    colorVal,
		LocationScore: locVal,
		TimeScore:     timeVal,
		Score:         score,
		Band:          band,
		ShouldNotify:  notify,
	}, true
}

func (s *Store) sameParentLocation(locA, locB int) bool {
	var parentA, parentB *int
	for _, l := range s.locations {
		if l.LocationID == locA {
			parentA = l.ParentLocationID
		}
		if l.LocationID == locB {
			parentB = l.ParentLocationID
		}
	}
	return parentA != nil && parentB != nil && *parentA == *parentB
}

func timeScoreFromDiff(diff time.Duration) float64 {
	switch {
	case diff < 24*time.Hour:
		return 1.0
	case diff <= 3*24*time.Hour:
		return 0.6
	case diff <= 7*24*time.Hour:
		return 0.3
	default:
		return 0
	}
}