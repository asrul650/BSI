package repo

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgtype"
)

// Options mengambil kategori dan lokasi dari PostgreSQL.
// Daftar warna untuk sementara tetap berasal dari konfigurasi Store.
func (s *Store) Options(ctx context.Context) (
	[]CategoryOption,
	[]ColorOption,
	[]LocationOption,
	error,
) {
	categories := make([]CategoryOption, 0)
	locations := make([]LocationOption, 0)

	// Ambil kategori aktif.
	categoryRows, err := s.db.Query(ctx, `
		SELECT category_id, name
		FROM category
		WHERE is_active = TRUE
		ORDER BY name
	`)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("mengambil kategori: %w", err)
	}

	for categoryRows.Next() {
		var category CategoryOption
		if err := categoryRows.Scan(
			&category.CategoryID,
			&category.Name,
		); err != nil {
			categoryRows.Close()
			return nil, nil, nil, fmt.Errorf("membaca kategori: %w", err)
		}
		categories = append(categories, category)
	}

	if err := categoryRows.Err(); err != nil {
		categoryRows.Close()
		return nil, nil, nil, fmt.Errorf("membaca hasil kategori: %w", err)
	}
	categoryRows.Close()

	// Ambil lokasi aktif.
	locationRows, err := s.db.Query(ctx, `
		SELECT location_id, name, parent_location_id
		FROM location
		WHERE is_active = TRUE
		ORDER BY name
	`)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("mengambil lokasi: %w", err)
	}
	defer locationRows.Close()

	for locationRows.Next() {
		var location LocationOption
		var parentID pgtype.Int8

		if err := locationRows.Scan(
			&location.LocationID,
			&location.Name,
			&parentID,
		); err != nil {
			return nil, nil, nil, fmt.Errorf("membaca lokasi: %w", err)
		}

		if parentID.Valid {
			id := int(parentID.Int64)
			location.ParentLocationID = &id
		}

		locations = append(locations, location)
	}

	if err := locationRows.Err(); err != nil {
		return nil, nil, nil, fmt.Errorf("membaca hasil lokasi: %w", err)
	}

	// Warna masih menggunakan konfigurasi lokal.
	s.mu.RLock()
	colors := append([]ColorOption(nil), s.colors...)
	s.mu.RUnlock()

	return categories, colors, locations, nil
}

// PublicItems mengambil barang yang sudah diterima satpam
// dan masih berstatus Barang Ditemukan.
func (s *Store) PublicItems(ctx context.Context) ([]PublicItem, error) {
	items := make([]PublicItem, 0)

	rows, err := s.db.Query(ctx, `
		SELECT
			i.item_id,
			c.category_id,
			c.name,
			i.color,
			COALESCE(NULLIF(BTRIM(fr.item_name), ''), fr.description),
			l.name,
			fr.found_at,
			i.status
		FROM item i
		JOIN found_report fr
			ON fr.found_report_id = i.found_report_id
		JOIN category c
			ON c.category_id = i.category_id
		JOIN location l
			ON l.location_id = fr.location_id
		WHERE i.status = $1
		ORDER BY i.received_at DESC
	`, "Barang Ditemukan")
	if err != nil {
		return nil, fmt.Errorf("mengambil daftar barang publik: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var item PublicItem

		if err := rows.Scan(
			&item.ItemID,
			&item.Category.CategoryID,
			&item.Category.Name,
			&item.Color.Code,
			&item.ItemName,
			&item.LocationName,
			&item.FoundAt,
			&item.Status,
		); err != nil {
			return nil, fmt.Errorf("membaca daftar barang publik: %w", err)
		}

		// Label warna menggunakan kode warna yang sudah tersedia.
		s.mu.RLock()
		for _, color := range s.colors {
			if color.Code == item.Color.Code {
				item.Color.Label = color.Label
				break
			}
		}
		s.mu.RUnlock()

		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("membaca hasil daftar barang publik: %w", err)
	}

	return items, nil
}
