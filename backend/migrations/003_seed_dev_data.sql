
-- =========================================
-- 003 - SEED DATA DEVELOPMENT
-- Data sementara untuk pengujian database
-- =========================================
-- 1. Data kategori sementara
INSERT INTO category (category_name, description)
VALUES
    ('Kategori Uji Elektronik', 'Kategori sementara untuk pengujian'),
    ('Kategori Uji Dokumen', 'Kategori sementara untuk pengujian')
ON CONFLICT (category_name) DO NOTHING;

-- 2. Data lokasi sementara
INSERT INTO location (location_name, location_type)
SELECT 'Lokasi Uji 1', 'Area Uji'
WHERE NOT EXISTS (
    SELECT 1 FROM location
    WHERE location_name = 'Lokasi Uji 1'
);

INSERT INTO location (location_name, location_type)
SELECT 'Lokasi Uji 2', 'Area Uji'
WHERE NOT EXISTS (
    SELECT 1 FROM location
    WHERE location_name = 'Lokasi Uji 2'
);

-- =========================================
-- 3. Data laporan kehilangan
-- =========================================
INSERT INTO lost_report (
    category_id,
    item_name,
    description,
    color,
    lost_location_id,
    lost_date,
    lost_time,
    reporter_whatsapp
)
SELECT
    1,
    'Laptop Uji',
    'Laptop dengan stiker berwarna biru',
    'Hitam',
    1,
    '2026-11-20',
    '10:00',
    '000000000000'
WHERE NOT EXISTS (
    SELECT 1
    FROM lost_report
    WHERE item_name = 'Laptop Uji'
      AND lost_date = '2026-11-20'
);

-- =========================================
-- 4. Data laporan penemuan
-- =========================================
INSERT INTO found_report (
    finder_name,
    finder_whatsapp,
    item_name,
    category_id,
    description,
    color,
    found_location_id,
    found_date,
    found_time
)
SELECT
    'Penemu Uji',
    NULL,
    'Laptop Ditemukan Uji',
    1,
    'Laptop dengan stiker biru pada bagian belakang',
    'Hitam',
    2,
    '2026-11-20',
    '11:00'
WHERE NOT EXISTS (
    SELECT 1
    FROM found_report
    WHERE item_name = 'Laptop Ditemukan Uji'
      AND found_date = '2026-11-20'
);
