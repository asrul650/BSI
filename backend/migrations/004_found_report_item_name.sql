ALTER TABLE found_report
    ADD COLUMN IF NOT EXISTS item_name VARCHAR(100) NOT NULL DEFAULT '';

UPDATE found_report
SET item_name = LEFT(description, 100)
WHERE BTRIM(item_name) = '';
