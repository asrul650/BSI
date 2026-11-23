-- Sesi login staf (F-01) dan state anti-replay TOTP.

ALTER TABLE staff
    ADD COLUMN IF NOT EXISTS mfa_last_step BIGINT NOT NULL DEFAULT 0;

CREATE TABLE staff_session (
    session_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_token_hash TEXT NOT NULL UNIQUE,
    staff_id BIGINT NOT NULL,
    csrf_token TEXT NOT NULL,
    mfa_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,

    CONSTRAINT fk_staff_session_staff
        FOREIGN KEY (staff_id)
        REFERENCES staff(staff_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_staff_session_staff_id ON staff_session(staff_id);
CREATE INDEX idx_staff_session_expires_at ON staff_session(expires_at);
