CREATE INDEX idx_lost_report_category
ON lost_report(category_id);

CREATE INDEX idx_lost_report_location
ON lost_report(lost_location_id);

CREATE INDEX idx_found_report_category
ON found_report(category_id);

CREATE INDEX idx_found_report_location
ON found_report(found_location_id);

CREATE INDEX idx_item_found_report
ON item(found_report_id);

CREATE INDEX idx_item_received_staff
ON item(received_by_staff_id);

CREATE INDEX idx_item_storage_location
ON item(storage_location_id);

CREATE INDEX idx_matching_lost_report
ON matching_result(lost_report_id);

CREATE INDEX idx_matching_item
ON matching_result(item_id);

CREATE INDEX idx_notification_matching
ON notification(matching_id);

CREATE INDEX IF NOT EXISTS idx_otp_phone_purpose_created
    ON otp_verification(phone_hash, purpose, created_at DESC);

-- Index untuk pencarian berdasarkan aturan
CREATE INDEX idx_anomaly_flag_rule
ON anomaly_flag(rule_id);

-- Index untuk pencarian berdasarkan status
CREATE INDEX idx_anomaly_flag_status
ON anomaly_flag(status);

-- Index untuk pencarian berdasarkan objek
CREATE INDEX idx_anomaly_flag_subject
ON anomaly_flag(subject_type, subject_ref);

-- Index untuk pengurutan berdasarkan waktu
CREATE INDEX idx_anomaly_flag_created_at
ON anomaly_flag(created_at);