package repo

import (
	"fmt"
	"math/rand"
)

func (s *Store) AddLostReport(r LostReport) LostReport {
	s.mu.Lock()
	defer s.mu.Unlock()

	r.ReportID = fmt.Sprintf("HL-%04d", rand.Intn(9000)+1000)
	r.Status = "aktif"
	s.lostReports = append(s.lostReports, r)
	return r
}

func (s *Store) FindMatches(r LostReport) []MatchResult {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var matches []MatchResult
	for _, it := range s.items {
		res, ok := s.computeMatch(r, it)
		if !ok {
			continue
		}
		matches = append(matches, res)
	}
	return matches
}