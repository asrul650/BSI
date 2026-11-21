package repo

import (
	"fmt"
	"math/rand"
	"time"
)

func (s *Store) AddAuditLog(action, targetID, actor, detail string, anomalies ...string) AuditLog {
	s.mu.Lock()
	defer s.mu.Unlock()

	var cleanAnom []string
	for _, a := range anomalies {
		if a != "" {
			cleanAnom = append(cleanAnom, a)
		}
	}

	entry := AuditLog{
		ID:        fmt.Sprintf("AUD-%04d", rand.Intn(9000)+1000),
		Action:    action,
		TargetID:  targetID,
		Actor:     actor,
		Detail:    detail,
		Anomalies: cleanAnom,
		CreatedAt: time.Now(),
	}
	s.auditLogs = append(s.auditLogs, entry)
	return entry
}

func (s *Store) ListAuditLogs() []AuditLog {
	s.mu.RLock()
	defer s.mu.RUnlock()

	out := make([]AuditLog, len(s.auditLogs))
	copy(out, s.auditLogs)
	return out
}