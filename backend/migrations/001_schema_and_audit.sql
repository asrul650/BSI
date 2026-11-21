-- 1. Tabel Staff
CREATE TABLE staff (
    staff_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- staff: tambah kolom untuk MFA, keamanan login, dan pencatatan pembuat akun
ALTER TABLE staff
    ADD COLUMN IF NOT EXISTS mfa_secret TEXT,
    ADD COLUMN IF NOT EXISTS failed_attempts INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS created_by BIGINT;
-- Tambahkan foreign key created_by
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'fk_staff_created_by'
    ) THEN
        ALTER TABLE staff
            ADD CONSTRAINT fk_staff_created_by
            FOREIGN KEY (created_by)
            REFERENCES staff(staff_id)
            ON DELETE SET NULL;
    END IF;
END $$;
-- Pastikan failed_attempts tidak negatif
ALTER TABLE staff
    ADD CONSTRAINT chk_staff_failed_attempts
    CHECK (failed_attempts >= 0);

-- 2. Tabel Category
CREATE TABLE category (
    category_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);
-- category: tambah is_high_value
ALTER TABLE category
    ADD COLUMN IF NOT EXISTS is_high_value BOOLEAN NOT NULL DEFAULT FALSE;

-- 3. Tabel Location
CREATE TABLE location (
    location_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    location_name VARCHAR(150) NOT NULL,
    parent_location_id BIGINT,

    CONSTRAINT fk_location_parent
        FOREIGN KEY (parent_location_id)
        REFERENCES location(location_id)
        ON DELETE RESTRICT
);
-- location: tambah is_active
ALTER TABLE location
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;

-- 4. Tabel Lost Report
CREATE TABLE lost_report (
    lost_report_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id BIGINT NOT NULL,
    item_name VARCHAR(150) NOT NULL,
    description TEXT,
    color VARCHAR(50),
    lost_location_id BIGINT NOT NULL,
    lost_date DATE NOT NULL,
    lost_time TIME,
    reporter_whatsapp VARCHAR(20) NOT NULL,
    report_status VARCHAR(30) NOT NULL DEFAULT 'Aktif',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_lost_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id),

    CONSTRAINT fk_lost_location
        FOREIGN KEY (lost_location_id)
        REFERENCES location(location_id)
);
-- lost_report: penyesuaian berdasarkan FSD v0.3
ALTER TABLE lost_report
    ADD COLUMN IF NOT EXISTS public_code VARCHAR(20),
    ADD COLUMN IF NOT EXISTS reporter_name VARCHAR(60),
    ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS closed_reason TEXT,
    ADD COLUMN IF NOT EXISTS lost_at TIMESTAMPTZ;

-- Tambahkan unique constraint untuk kode publik
CREATE UNIQUE INDEX IF NOT EXISTS uq_lost_report_public_code
ON lost_report(public_code)
WHERE public_code IS NOT NULL;
-- Migrasikan data waktu kehilangan dari kolom lama
UPDATE lost_report
SET lost_at = (
    lost_date::timestamp
    + COALESCE(lost_time, '00:00:00'::time)
) AT TIME ZONE 'Asia/Jakarta'
WHERE lost_at IS NULL;

-- 5. Tabel Found Report
CREATE TABLE found_report (
    found_report_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    finder_name VARCHAR(100) NOT NULL,
    finder_whatsapp VARCHAR(20),
    item_name VARCHAR(150) NOT NULL,
    category_id BIGINT NOT NULL,
    description TEXT,
    color VARCHAR(50),
    found_location_id BIGINT NOT NULL,
    found_date DATE NOT NULL,
    found_time TIME,
    photo_url TEXT,
    submission_status VARCHAR(30) NOT NULL DEFAULT 'Menunggu Penyerahan',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_found_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id),

    CONSTRAINT fk_found_location
        FOREIGN KEY (found_location_id)
        REFERENCES location(location_id)
);
ALTER TABLE found_report
    ADD COLUMN IF NOT EXISTS found_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS photo_key TEXT,
    ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS source VARCHAR(20) NOT NULL DEFAULT 'app',
    ADD COLUMN IF NOT EXISTS created_by_staff_id BIGINT,
    ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

ALTER TABLE found_report
    ADD CONSTRAINT fk_found_created_by_staff
    FOREIGN KEY (created_by_staff_id)
    REFERENCES staff(staff_id)
    ON DELETE SET NULL;

ALTER TABLE found_report
    ADD CONSTRAINT chk_found_source
    CHECK (source IN ('app', 'pos'));

ALTER TABLE found_report
    ALTER COLUMN found_report_id DROP IDENTITY IF EXISTS;

-- Ubah ID laporan menjadi kode TM
ALTER TABLE found_report
    ALTER COLUMN found_report_id TYPE VARCHAR(20)
    USING found_report_id::VARCHAR;
--- 6. Tabel Item
CREATE TABLE item (
    item_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    found_report_id BIGINT NOT NULL UNIQUE,
    received_by_staff_id BIGINT NOT NULL,
    storage_location_id BIGINT NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    item_status VARCHAR(30) NOT NULL DEFAULT 'Barang Ditemukan',
    physical_label_code VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_item_found_report
        FOREIGN KEY (found_report_id)
        REFERENCES found_report(found_report_id),

    CONSTRAINT fk_item_staff
        FOREIGN KEY (received_by_staff_id)
        REFERENCES staff(staff_id),

    CONSTRAINT fk_item_location
        FOREIGN KEY (storage_location_id)
        REFERENCES location(location_id)
);
-- Sesuaikan foreign key pada tabel item
ALTER TABLE item
    ALTER COLUMN found_report_id TYPE VARCHAR(20)
    USING found_report_id::VARCHAR;

--- 7. Tabel Matching Result
CREATE TABLE matching_result (
    matching_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lost_report_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    description_score NUMERIC(5,2),
    location_score NUMERIC(5,2),
    date_score NUMERIC(5,2),
    time_score NUMERIC(5,2),
    final_score NUMERIC(5,2),
    matching_category VARCHAR(20),
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_matching_lost
        FOREIGN KEY (lost_report_id)
        REFERENCES lost_report(lost_report_id),

    CONSTRAINT fk_matching_item
        FOREIGN KEY (item_id)
        REFERENCES item(item_id),

    CONSTRAINT chk_description_score
        CHECK (description_score IS NULL OR description_score BETWEEN 0 AND 100),

    CONSTRAINT chk_location_score
        CHECK (location_score IS NULL OR location_score BETWEEN 0 AND 100),

    CONSTRAINT chk_date_score
        CHECK (date_score IS NULL OR date_score BETWEEN 0 AND 100),

    CONSTRAINT chk_time_score
        CHECK (time_score IS NULL OR time_score BETWEEN 0 AND 100),

    CONSTRAINT chk_final_score
        CHECK (final_score IS NULL OR final_score BETWEEN 0 AND 100)
);

--- 8. Tabel Notification
CREATE TABLE notification (
    notification_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    matching_id BIGINT NOT NULL,
    recipient_whatsapp VARCHAR(20) NOT NULL,
    message_content TEXT NOT NULL,
    delivery_status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    attempt_count INTEGER NOT NULL DEFAULT 0,
    provider_response TEXT,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_notification_matching
        FOREIGN KEY (matching_id)
        REFERENCES matching_result(matching_id),

    CONSTRAINT chk_notification_attempt
        CHECK (attempt_count >= 0),

    CONSTRAINT chk_notification_status
        CHECK (delivery_status IN ('Pending', 'Sent', 'Failed', 'Retry'))
);

--- 9. Tabel Claim
CREATE TABLE claim (
    claim_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_id BIGINT NOT NULL,
    claimant_name VARCHAR(100) NOT NULL,
    claimant_contact VARCHAR(30) NOT NULL,
    verification_result VARCHAR(30),
    verification_notes TEXT,
    processed_by_staff_id BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,

    CONSTRAINT fk_claim_item
        FOREIGN KEY (item_id)
        REFERENCES item(item_id),

    CONSTRAINT fk_claim_staff
        FOREIGN KEY (processed_by_staff_id)
        REFERENCES staff(staff_id)
);

--- 10. Tabel Item History
CREATE TABLE item_history (
    history_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_id BIGINT NOT NULL,
    previous_status VARCHAR(30),
    new_status VARCHAR(30) NOT NULL,
    changed_by_staff_id BIGINT NOT NULL,
    change_reason TEXT,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_history_item
        FOREIGN KEY (item_id)
        REFERENCES item(item_id),

    CONSTRAINT fk_history_staff
        FOREIGN KEY (changed_by_staff_id)
        REFERENCES staff(staff_id)
);

--- 11. Tabel Audit Log
CREATE TABLE audit_log (
    audit_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    staff_id BIGINT NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    old_value JSONB,
    new_value JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_audit_staff
        FOREIGN KEY (staff_id)
        REFERENCES staff(staff_id)
);

--- 12. Tabel OTP Verification
CREATE TABLE IF NOT EXISTS otp_verification (
    otp_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    phone_hash VARCHAR(128) NOT NULL,
    purpose VARCHAR(30) NOT NULL, -- 'lapor_hilang' | 'lapor_temuan'
    code_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    used_at TIMESTAMPTZ,
    ip_hash VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_otp_purpose
        CHECK (purpose IN ('lapor_hilang', 'lapor_temuan')),
    CONSTRAINT chk_otp_attempt_count
        CHECK (attempt_count >= 0)
);

--- 13. Tabel Anomaly Flag
CREATE TABLE IF NOT EXISTS anomaly_flag (
    flag_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    -- Kode aturan A1 sampai A8 dari backend
    rule_id VARCHAR(10) NOT NULL,

    -- Jenis dan referensi objek yang mengalami anomali
    subject_type VARCHAR(30) NOT NULL,
    subject_ref VARCHAR(100) NOT NULL,

    -- Detail hasil deteksi dalam format JSON
    detail JSONB,

    -- Status peninjauan anomali
    status VARCHAR(20) NOT NULL DEFAULT 'Open',

    -- Petugas yang meninjau
    reviewed_by BIGINT,
    review_note TEXT,

    -- Waktu pembuatan dan peninjauan
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,

    -- Relasi dengan tabel staff
    CONSTRAINT fk_anomaly_reviewed_by
        FOREIGN KEY (reviewed_by)
        REFERENCES staff(staff_id)
        ON DELETE SET NULL,

    -- Validasi kode aturan
    CONSTRAINT chk_anomaly_rule
        CHECK (
            rule_id IN (
                'A1', 'A2', 'A3', 'A4',
                'A5', 'A6', 'A7', 'A8'
            )
        ),

    -- Validasi status
    CONSTRAINT chk_anomaly_status
        CHECK (
            status IN ('Open', 'Ditinjau')
        ),

    -- Validasi informasi peninjauan
    CONSTRAINT chk_anomaly_review
        CHECK (
            (
                status = 'Open'
                AND reviewed_by IS NULL
                AND reviewed_at IS NULL
            )
            OR
            (
                status = 'Ditinjau'
                AND reviewed_by IS NOT NULL
                AND reviewed_at IS NOT NULL
            )
        )
);

--- 14. Tabel Setting
CREATE TABLE IF NOT EXISTS setting (
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