package repo

import (
	"errors"
	"fmt"
	"math/rand"
	"strings"
)

func (s *Store) AddFoundReport(r FoundReport) FoundReport {
	s.mu.Lock()
	defer s.mu.Unlock()

	r.ReportID = fmt.Sprintf("TM-%04d", rand.Intn(9000)+1000)
	r.Status = "menunggu_penyerahan"
	s.foundReports = append(s.foundReports, r)
	return r
}

func (s *Store) ReceiveFoundReport(reportID, storageRack, postName string) (ItemData, []MatchResult, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	idx := -1
	for i := range s.foundReports {
		if s.foundReports[i].ReportID == reportID {
			idx = i
			break
		}
	}
	if idx == -1 {
		return ItemData{}, nil, errors.New("laporan temuan tidak ditemukan")
	}
	if s.foundReports[idx].Status != "menunggu_penyerahan" {
		return ItemData{}, nil, errors.New("status laporan tidak bisa diterima")
	}

	fr := s.foundReports[idx]
	fr.Status = "diterima"
	s.foundReports[idx] = fr

	cat := s.findCategory(int(fr.CategoryID))
	col := s.findColor(fr.Color)
	if postName == "" {
		postName = "Pos Satpam Rektorat"
	}

	newItem := ItemData{
		ItemID:      fmt.Sprintf("B-%04d", rand.Intn(9000)+1000),
		Status:      "barang_ditemukan",
		Category:    cat,
		Color:       col,
		LocationID: int(fr.LocationID),
		FoundAt:     fr.FoundAt,
		PostName:    postName,
		StorageRack: storageRack,
		SecretNote:  fr.Description,
	}
	s.items = append(s.items, newItem)
	return newItem, s.matchItemToLostReports(newItem), nil
}

func (s *Store) findCategory(id int) CategoryOption {
	for _, c := range s.categories {
		if c.CategoryID == id {
			return c
		}
	}
	return CategoryOption{CategoryID: id, Name: "Lainnya"}
}

func (s *Store) findColor(code string) ColorOption {
	for _, cl := range s.colors {
		if strings.EqualFold(cl.Code, code) {
			return cl
		}
	}
	return ColorOption{Code: code, Label: code}
}

func (s *Store) matchItemToLostReports(it ItemData) []MatchResult {
	var matches []MatchResult
	for _, lr := range s.lostReports {
		res, ok := s.computeMatch(lr, it)
		if !ok {
			continue
		}
		matches = append(matches, res)
	}
	return matches
}