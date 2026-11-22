CREATE INDEX idx_location_parent
    ON location(parent_location_id);

CREATE INDEX idx_lost_category
    ON lost_report(category_id);

CREATE INDEX idx_lost_location
    ON lost_report(location_id);

CREATE INDEX idx_lost_status
    ON lost_report(status);

CREATE INDEX idx_found_category
    ON found_report(category_id);

CREATE INDEX idx_found_location
    ON found_report(location_id);

CREATE INDEX idx_found_status
    ON found_report(status);

CREATE INDEX idx_found_expires
    ON found_report(expires_at);

CREATE INDEX idx_item_category
    ON item(category_id);

CREATE INDEX idx_item_status
    ON item(status);

CREATE INDEX idx_item_received_staff
    ON item(received_by_staff_id);

CREATE INDEX idx_history_item
    ON item_history(item_id);

CREATE INDEX idx_matching_lost
    ON matching_result(lost_report_id);

CREATE INDEX idx_matching_item
    ON matching_result(item_id);

CREATE INDEX idx_notification_matching
    ON notification(matching_id);

CREATE INDEX idx_notification_status
    ON notification(status);

CREATE INDEX idx_claim_item
    ON claim(item_id);

CREATE INDEX idx_claim_lost
    ON claim(lost_report_id);

CREATE INDEX idx_claim_staff
    ON claim(processed_by_staff_id);

CREATE INDEX idx_otp_phone
    ON otp_verification(phone_hash);

CREATE INDEX idx_otp_expiry
    ON otp_verification(expires_at);

CREATE INDEX idx_audit_staff
    ON audit_log(staff_id);

CREATE INDEX idx_audit_created
    ON audit_log(created_at);

CREATE INDEX idx_anomaly_rule
    ON anomaly_flag(rule_id);

CREATE INDEX idx_anomaly_status
    ON anomaly_flag(status);

CREATE INDEX idx_anomaly_subject
    ON anomaly_flag(subject_type, subject_ref);

CREATE INDEX idx_anomaly_created
    ON anomaly_flag(created_at);