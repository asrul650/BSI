package repo

import (
	"context"
	"fmt"
	"sort"
	"strings"

	"LostandFound/internal/core"

	"github.com/jackc/pgx/v5/pgtype"
)

// RefreshStaffMatches calculates active report/item pairs using the canonical
// matcher and keeps the latest scores in matching_result for staff review.
func (s *Store) RefreshStaffMatches(ctx context.Context) ([]StaffMatch, int, error) {
	rows, err := s.db.Query(ctx, `
		SELECT
			lr.lost_report_id,
			COALESCE(NULLIF(BTRIM(lr.item_name), ''), category.name),
			lr.category_id,
			category.name,
			lr.color,
			lr.location_id,
			lost_location.name,
			lost_location.parent_location_id,
			lr.lost_at,
			lr.description,
			i.item_id,
			COALESCE(NULLIF(BTRIM(fr.item_name), ''), category.name),
			i.category_id,
			i.color,
			fr.location_id,
			found_location.name,
			found_location.parent_location_id,
			fr.found_at,
			fr.description,
			i.storage_rack
		FROM lost_report lr
		JOIN item i
			ON i.category_id = lr.category_id
			AND i.status = $1
		JOIN found_report fr
			ON fr.found_report_id = i.found_report_id
		JOIN category
			ON category.category_id = i.category_id
		JOIN location lost_location
			ON lost_location.location_id = lr.location_id
		JOIN location found_location
			ON found_location.location_id = fr.location_id
		WHERE LOWER(lr.status) IN ('aktif', 'memiliki_kandidat')
			AND fr.found_at >= lr.lost_at - INTERVAL '2 hours'
		ORDER BY lr.created_at DESC, i.received_at DESC
	`, "Barang Ditemukan")
	if err != nil {
		return nil, 0, fmt.Errorf("mengambil pasangan laporan dan barang aktif: %w", err)
	}

	matches := make([]StaffMatch, 0)
	evaluatedPairs := 0
	for rows.Next() {
		var match StaffMatch
		var lostCategoryID, foundCategoryID int64
		var lostLocationID, foundLocationID int64
		var lostParentID, foundParentID pgtype.Int8
		var lostDescription, foundDescription string

		if err := rows.Scan(
			&match.LostReportID,
			&match.LostItemName,
			&lostCategoryID,
			&match.Category,
			&match.LostColor,
			&lostLocationID,
			&match.LostLocation,
			&lostParentID,
			&match.LostAt,
			&lostDescription,
			&match.ItemID,
			&match.ItemName,
			&foundCategoryID,
			&match.ItemColor,
			&foundLocationID,
			&match.ItemLocation,
			&foundParentID,
			&match.FoundAt,
			&foundDescription,
			&match.StorageRack,
		); err != nil {
			rows.Close()
			return nil, 0, fmt.Errorf("membaca pasangan laporan dan barang: %w", err)
		}

		evaluatedPairs++
		result := core.EvaluateMatch(core.MatchInput{
			LostCategoryID:   lostCategoryID,
			FoundCategoryID:  foundCategoryID,
			LostColor:        match.LostColor,
			FoundColor:       match.ItemColor,
			LostLocationID:   lostLocationID,
			FoundLocationID:  foundLocationID,
			LostParentLocID:  optionalInt64(lostParentID),
			FoundParentLocID: optionalInt64(foundParentID),
			LostAt:           match.LostAt,
			FoundAt:          match.FoundAt,
			LostDescription:  lostDescription,
			FoundDescription: foundDescription,
		})
		if !result.Eligible {
			continue
		}

		match.ColorScore = result.ColorScore
		match.LocationScore = result.LocationScore
		match.TimeScore = result.TimeScore
		match.FinalScore = result.FinalScore
		match.DescriptionPriority = result.DescriptionPriority
		match.Band = matchBand(result.Category)
		match.ShouldNotify = result.AutoNotify
		matches = append(matches, match)
	}

	if err := rows.Err(); err != nil {
		rows.Close()
		return nil, 0, fmt.Errorf("membaca hasil pasangan laporan dan barang: %w", err)
	}
	rows.Close()

	if len(matches) == 0 {
		return matches, evaluatedPairs, nil
	}

	tx, err := s.db.Begin(ctx)
	if err != nil {
		return nil, 0, fmt.Errorf("memulai pembaruan hasil matching: %w", err)
	}
	defer tx.Rollback(ctx)

	for i := range matches {
		err := tx.QueryRow(ctx, `
			INSERT INTO matching_result (
				lost_report_id,
				item_id,
				color_score,
				location_score,
				time_score,
				final_score,
				description_priority,
				category
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			ON CONFLICT (lost_report_id, item_id)
			DO UPDATE SET
				color_score = EXCLUDED.color_score,
				location_score = EXCLUDED.location_score,
				time_score = EXCLUDED.time_score,
				final_score = EXCLUDED.final_score,
				description_priority = EXCLUDED.description_priority,
				category = EXCLUDED.category,
				processed_at = NOW()
			RETURNING matching_id, notified, processed_at
		`,
			matches[i].LostReportID,
			matches[i].ItemID,
			matches[i].ColorScore,
			matches[i].LocationScore,
			matches[i].TimeScore,
			matches[i].FinalScore,
			matches[i].DescriptionPriority > 0,
			matches[i].Band,
		).Scan(
			&matches[i].MatchingID,
			&matches[i].Notified,
			&matches[i].ProcessedAt,
		)
		if err != nil {
			return nil, 0, fmt.Errorf("menyimpan hasil matching %s dan %s: %w", matches[i].LostReportID, matches[i].ItemID, err)
		}
	}

	if err := tx.Commit(ctx); err != nil {
		return nil, 0, fmt.Errorf("menyelesaikan pembaruan hasil matching: %w", err)
	}

	sort.Slice(matches, func(i, j int) bool {
		if matches[i].FinalScore != matches[j].FinalScore {
			return matches[i].FinalScore > matches[j].FinalScore
		}
		if matches[i].DescriptionPriority != matches[j].DescriptionPriority {
			return matches[i].DescriptionPriority > matches[j].DescriptionPriority
		}
		return matches[i].MatchingID < matches[j].MatchingID
	})

	return matches, evaluatedPairs, nil
}

func matchBand(category string) string {
	switch strings.ToLower(category) {
	case "tinggi":
		return "tinggi"
	case "sedang":
		return "sedang"
	case "rendah":
		return "rendah"
	default:
		return "data_tidak_memadai"
	}
}

func optionalInt64(value pgtype.Int8) *int64 {
	if !value.Valid {
		return nil
	}
	return &value.Int64
}
