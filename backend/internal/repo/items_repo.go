package repo

func (s *Store) Options() ([]CategoryOption, []ColorOption, []LocationOption) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.categories, s.colors, s.locations
}

func (s *Store) PublicItems() []PublicItem {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var out []PublicItem
	for _, it := range s.items {
		if it.Status == "barang_ditemukan" {
			out = append(out, PublicItem{
				ItemID:   it.ItemID,
				Category: it.Category,
				Color:    it.Color,
				PostName: it.PostName,
			})
		}
	}
	return out
}