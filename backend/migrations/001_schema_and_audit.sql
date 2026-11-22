CREATE TABLE category (
    category_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    is_high_value BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE location (
    location_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    parent_location_id BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_location_parent
        FOREIGN KEY (parent_location_id)
        REFERENCES location(location_id)
        ON DELETE RESTRICT
);

CREATE TABLE staff (
    staff_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(60) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL,
    mfa_secret TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    failed_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,
    created_by BIGINT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_staff_role
        CHECK (role IN ('satpam', 'admin')),

    CONSTRAINT chk_staff_failed_attempts
        CHECK (failed_attempts >= 0),

    CONSTRAINT fk_staff_created_by
        FOREIGN KEY (created_by)
        REFERENCES staff(staff_id)
        ON DELETE SET NULL
);

CREATE TABLE lost_report (
    lost_report_id VARCHAR(20) PRIMARY KEY,
    category_id BIGINT NOT NULL,
    color VARCHAR(50) NOT NULL,
    location_id BIGINT NOT NULL,
    lost_at TIMESTAMPTZ NOT NULL,
    description VARCHAR(300) NOT NULL,
    reporter_name VARCHAR(60) NOT NULL,
    reporter_whatsapp VARCHAR(20) NOT NULL,
    consent_at TIMESTAMPTZ NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Aktif',
    closed_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_lost_report_id
        CHECK (lost_report_id ~ '^HL-[A-Za-z0-9]{8}$'),

    CONSTRAINT chk_lost_description
        CHECK (char_length(description) BETWEEN 10 AND 300),

    CONSTRAINT chk_lost_reporter_name
        CHECK (char_length(reporter_name) BETWEEN 3 AND 60),

    CONSTRAINT fk_lost_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_lost_location
        FOREIGN KEY (location_id)
        REFERENCES location(location_id)
        ON DELETE RESTRICT
);

CREATE TABLE found_report (
    found_report_id VARCHAR(20) PRIMARY KEY,
    category_id BIGINT NOT NULL,
    color VARCHAR(50) NOT NULL,
    location_id BIGINT NOT NULL,
    found_at TIMESTAMPTZ NOT NULL,
    description VARCHAR(300) NOT NULL,
    photo_key TEXT,
    finder_name VARCHAR(60),
    finder_whatsapp VARCHAR(20) NOT NULL,
    consent_at TIMESTAMPTZ NOT NULL,
    source VARCHAR(20) NOT NULL DEFAULT 'aplikasi',
    created_by_staff_id BIGINT,
    status VARCHAR(30) NOT NULL DEFAULT 'Menunggu Penyerahan',
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_found_report_id
        CHECK (found_report_id ~ '^TM-[A-Za-z0-9]{8}$'),

    CONSTRAINT chk_found_description
        CHECK (char_length(description) BETWEEN 10 AND 300),

    CONSTRAINT chk_found_source
        CHECK (source IN ('aplikasi', 'pos')),

    CONSTRAINT chk_found_source_staff
        CHECK (
            (source = 'aplikasi' AND created_by_staff_id IS NULL)
            OR
            (source = 'pos' AND created_by_staff_id IS NOT NULL)
        ),

    CONSTRAINT fk_found_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_found_location
        FOREIGN KEY (location_id)
        REFERENCES location(location_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_found_created_by_staff
        FOREIGN KEY (created_by_staff_id)
        REFERENCES staff(staff_id)
        ON DELETE RESTRICT
);

CREATE TABLE item (
    item_id VARCHAR(30) PRIMARY KEY,
    found_report_id VARCHAR(20) NOT NULL UNIQUE,
    category_id BIGINT NOT NULL,
    color VARCHAR(50) NOT NULL,
    condition TEXT NOT NULL,
    storage_rack VARCHAR(100) NOT NULL,
    intake_photo_key TEXT NOT NULL,
    received_by_staff_id BIGINT NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(30) NOT NULL DEFAULT 'Barang Ditemukan',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_item_found_report
        FOREIGN KEY (found_report_id)
        REFERENCES found_report(found_report_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_item_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_item_received_staff
        FOREIGN KEY (received_by_staff_id)
        REFERENCES staff(staff_id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_item_status
        CHECK (
            status IN (
                'Barang Ditemukan',
                'Proses Verifikasi',
                'Telah Diambil',
                'Ditahan'
            )
        )
);

CREATE TABLE item_history (
    history_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_id VARCHAR(30) NOT NULL,
    previous_status VARCHAR(30),
    new_status VARCHAR(30) NOT NULL,
    staff_id BIGINT,
    reason TEXT,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_history_item
        FOREIGN KEY (item_id)
        REFERENCES item(item_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_history_staff
        FOREIGN KEY (staff_id)
        REFERENCES staff(staff_id)
        ON DELETE RESTRICT
);

CREATE TABLE matching_result (
    matching_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lost_report_id VARCHAR(20) NOT NULL,
    item_id VARCHAR(30) NOT NULL,
    color_score NUMERIC(5,2),
    location_score NUMERIC(5,2),
    time_score NUMERIC(5,2),
    final_score NUMERIC(5,2),
    description_priority BOOLEAN NOT NULL DEFAULT FALSE,
    category VARCHAR(30),
    notified BOOLEAN NOT NULL DEFAULT FALSE,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_matching_lost_item
        UNIQUE (lost_report_id, item_id),

    CONSTRAINT chk_matching_scores
        CHECK (
            (color_score IS NULL OR color_score BETWEEN 0 AND 100)
            AND (location_score IS NULL OR location_score BETWEEN 0 AND 100)
            AND (time_score IS NULL OR time_score BETWEEN 0 AND 100)
            AND (final_score IS NULL OR final_score BETWEEN 0 AND 100)
        ),

    CONSTRAINT fk_matching_lost
        FOREIGN KEY (lost_report_id)
        REFERENCES lost_report(lost_report_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_matching_item
        FOREIGN KEY (item_id)
        REFERENCES item(item_id)
        ON DELETE RESTRICT
);

CREATE TABLE notification (
    notification_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    matching_id BIGINT,
    event_type VARCHAR(50),
    recipient_hash VARCHAR(128) NOT NULL,
    template_id VARCHAR(100) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    attempt_count INTEGER NOT NULL DEFAULT 0,
    provider_response TEXT,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_notification_reference
        CHECK (matching_id IS NOT NULL OR event_type IS NOT NULL),

    CONSTRAINT chk_notification_attempt
        CHECK (attempt_count >= 0),

    CONSTRAINT fk_notification_matching
        FOREIGN KEY (matching_id)
        REFERENCES matching_result(matching_id)
        ON DELETE RESTRICT
);

CREATE TABLE claim (
    claim_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_id VARCHAR(30) NOT NULL,
    lost_report_id VARCHAR(20),
    claimant_name VARCHAR(60),
    id_type VARCHAR(30),
    id_last4 CHAR(4),
    claimant_whatsapp VARCHAR(20),
    result VARCHAR(20),
    reason TEXT,
    handover_photo_key TEXT,
    processed_by_staff_id BIGINT NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,

    CONSTRAINT chk_claim_result
        CHECK (
            result IS NULL
            OR result IN ('Cocok', 'Tidak Cocok')
        ),

    CONSTRAINT chk_claim_id_last4
        CHECK (
            id_last4 IS NULL
            OR id_last4 ~ '^[0-9]{4}$'
        ),

    CONSTRAINT chk_claim_handover_photo
        CHECK (
            result IS DISTINCT FROM 'Cocok'
            OR handover_photo_key IS NOT NULL
        ),

    CONSTRAINT fk_claim_item
        FOREIGN KEY (item_id)
        REFERENCES item(item_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_claim_lost_report
        FOREIGN KEY (lost_report_id)
        REFERENCES lost_report(lost_report_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_claim_staff
        FOREIGN KEY (processed_by_staff_id)
        REFERENCES staff(staff_id)
        ON DELETE RESTRICT
);

CREATE TABLE otp_verification (
    otp_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    phone_hash VARCHAR(128) NOT NULL,
    purpose VARCHAR(30) NOT NULL,
    code_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    used_at TIMESTAMPTZ,
    ip_hash VARCHAR(128),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Kolom teknis untuk token verifikasi sekali pakai
    verification_token_hash TEXT,
    token_expires_at TIMESTAMPTZ,
    token_used_at TIMESTAMPTZ,

    CONSTRAINT chk_otp_attempt
        CHECK (attempt_count >= 0)
);

CREATE TABLE audit_log (
    audit_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    actor_type VARCHAR(20) NOT NULL,
    staff_id BIGINT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100),
    old_value JSONB,
    new_value JSONB,
    reason TEXT,
    ip_hash VARCHAR(128),
    user_agent TEXT,
    prev_hash VARCHAR(128),
    entry_hash VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_audit_actor
        CHECK (actor_type IN ('staff', 'public')),

    CONSTRAINT chk_audit_actor_staff
        CHECK (
            (actor_type = 'staff' AND staff_id IS NOT NULL)
            OR
            (actor_type = 'public' AND staff_id IS NULL)
        ),

    CONSTRAINT fk_audit_staff
        FOREIGN KEY (staff_id)
        REFERENCES staff(staff_id)
        ON DELETE RESTRICT
);

CREATE TABLE anomaly_flag (
    flag_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rule_id VARCHAR(10) NOT NULL,
    subject_type VARCHAR(30) NOT NULL,
    subject_ref VARCHAR(100) NOT NULL,
    detail JSONB,
    status VARCHAR(20) NOT NULL DEFAULT 'Open',
    reviewed_by BIGINT,
    review_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,

    CONSTRAINT chk_anomaly_rule
        CHECK (rule_id IN ('A1','A2','A3','A4','A5','A6','A7','A8')),

    CONSTRAINT chk_anomaly_status
        CHECK (status IN ('Open', 'Ditinjau')),

    CONSTRAINT chk_anomaly_review
        CHECK (
            (status = 'Open'
                AND reviewed_by IS NULL
                AND reviewed_at IS NULL)
            OR
            (status = 'Ditinjau'
                AND reviewed_by IS NOT NULL
                AND reviewed_at IS NOT NULL)
        ),

    CONSTRAINT fk_anomaly_reviewed_by
        FOREIGN KEY (reviewed_by)
        REFERENCES staff(staff_id)
        ON DELETE RESTRICT
);

CREATE TABLE setting (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_setting_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES staff(staff_id)
        ON DELETE SET NULL,

    CONSTRAINT chk_setting_key
        CHECK (LENGTH(TRIM(key)) > 0)
);


ALTER TABLE lost_report
ADD COLUMN item_name VARCHAR(100) NOT NULL DEFAULT '';

ALTER TABLE lost_report
ADD CONSTRAINT chk_lost_item_name
CHECK (char_length(item_name) BETWEEN 1 AND 100);
