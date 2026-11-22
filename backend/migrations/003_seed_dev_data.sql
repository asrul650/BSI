INSERT INTO category (name, is_high_value, is_active)
VALUES
    ('Dompet', TRUE, TRUE),
    ('Ponsel', TRUE, TRUE),
    ('Tas', TRUE, TRUE),
    ('Kunci', TRUE, TRUE),
    ('Kartu/KTM', TRUE, TRUE),
    ('Elektronik', TRUE, TRUE),
    ('Botol Minum', FALSE, TRUE),
    ('Lainnya', FALSE, TRUE)
ON CONFLICT (name) DO NOTHING;

INSERT INTO location (name, parent_location_id, is_active)
VALUES
    ('Apotek UII Farma', NULL, TRUE),
    ('Simpul Tumbuh', NULL, TRUE),
    ('UII Career Center', NULL, TRUE),
    ('Masjid Ulil Albab', NULL, TRUE),
    ('Auditorium Prof. KH. Abdul Kahar Mudzakkir', NULL, TRUE),
    ('Rusunawa Putri', NULL, TRUE),
    ('Gedung Fakultas Psikologi dan Fakultas Kedokteran', NULL, TRUE),
    ('Gedung Fakultas Ilmu Agama Islam', NULL, TRUE),
    ('Gedung Fakultas Ilmu Sosial Budaya', NULL, TRUE),
    ('Gedung Rektorat (GBPH Prabuningrat)', NULL, TRUE),
    ('Laboratorium FTSP', NULL, TRUE),
    ('Gedung Fakultas Teknik Sipil dan Perencanaan (FTSP)', NULL, TRUE),
    ('Gedung Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)', NULL, TRUE),
    ('Gedung Fakultas Teknologi Industri (FTI)', NULL, TRUE),
    ('Gedung Olahraga Ki Bagus Hadikusumo', NULL, TRUE),
    ('Laboratorium FTI', NULL, TRUE),
    ('Laboratorium Terpadu FMIPA', NULL, TRUE),
    ('Laboratorium Tanaman Obat', NULL, TRUE),
    ('Gedung OSCE dan PHEDU', NULL, TRUE),
    ('Pusat Studi Minyak Atsiri (CEOS)', NULL, TRUE),
    ('Laboratorium Riset', NULL, TRUE),
    ('Laboratorium Terpadu FK', NULL, TRUE),
    ('Gedung Fakultas Hukum', NULL, TRUE),
    ('PAIK YBW UII', NULL, TRUE),
    ('Rusunawa Putra', NULL, TRUE),
    ('Gedung Kuliah Umum Prof. Dr. Sardjito', NULL, TRUE),
    ('Gedung D-4 Fakultas Bisnis dan Ekonomika', NULL, TRUE),
    ('Lapangan Bola (UII Training Ground)', NULL, TRUE),
    ('Perpustakaan Pusat UII', NULL, TRUE),
    ('Lapangan Tenis', NULL, TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO staff (name, username, password_hash, role, is_active)
VALUES
    ('Satpam Pos Utama', 'satpam_pos1', 'dev_hash_satpam_1', 'satpam', TRUE),
    ('Admin Lost & Found', 'admin_lf', 'dev_hash_admin_1', 'admin', TRUE)
ON CONFLICT (username) DO NOTHING;
