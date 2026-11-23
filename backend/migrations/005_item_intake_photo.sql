ALTER TABLE item
    ADD COLUMN IF NOT EXISTS intake_photo_data BYTEA,
    ADD COLUMN IF NOT EXISTS intake_photo_mime_type VARCHAR(50);
 