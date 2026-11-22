export const categories = [
  'Semua',
  'Dompet',
  'Ponsel',
  'Tas',
  'Kunci',
  'Kartu / KTM',
  'Elektronik',
  'Botol Minum',
  'Lainnya'
];

export const posSatpamList = [
  {
    id: 'pos-gku',
    name: 'Pos Satpam Utama (Gedung Kuliah Umum)',
    location: 'GKU Lt. 1 & Gerbang Utama',
    phone: '(0274) 898444 ext. 101',
    whatsapp: '+62 812-3456-7890',
    operatingHours: '24 Jam Non-Stop'
  },
  {
    id: 'pos-ftsp',
    name: 'Pos Satpam FTSP & Perpustakaan',
    location: 'Dekat Gedung Moh. Natsir & Parkir Selatan',
    phone: '(0274) 898444 ext. 102',
    whatsapp: '+62 812-3456-7891',
    operatingHours: '24 Jam Non-Stop'
  },
  {
    id: 'pos-fti',
    name: 'Pos Satpam FTI & FMIPA',
    location: 'Dekat Gedung K.H. Mas Mansur',
    phone: '(0274) 898444 ext. 103',
    whatsapp: '+62 812-3456-7892',
    operatingHours: '24 Jam Non-Stop'
  },
  {
    id: 'pos-masjid',
    name: 'Pos Keamanan Masjid Ulil Albab',
    location: 'Kompleks Sayap Timur Masjid Ulil Albab',
    phone: '(0274) 898444 ext. 104',
    whatsapp: '+62 812-3456-7893',
    operatingHours: '24 Jam Non-Stop'
  }
];

export const initialFoundItems = [
  {
    id: 'ITM-0231',
    name: 'Dompet Kulit Hitam',
    category: 'Dompet',
    color: 'Hitam',
    description: 'Dompet lipat kulit pria warna hitam, jahitan rapi, ditemukan di kursi meja baca.',
    foundLocation: 'Perpustakaan Pusat UII Lt. 2',
    foundDate: '2026-11-20',
    foundTime: '10:15 WIB',
    storageLocation: 'Pos Satpam Utama (Gedung Kuliah Umum)',
    storageRack: 'Lemari A - Rak 2',
    status: 'Barang Ditemukan',
    photoUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    secretNotes: 'Terdapat kartu ATM BSI dan kartu member minimarket di slot kedua.',
    finderName: 'Rizky Kurniawan',
    finderPhone: '081298765432'
  },
  {
    id: 'ITM-0230',
    name: 'Kunci Motor Honda',
    category: 'Kunci',
    color: 'Hitam / Biru',
    description: 'Kunci motor Honda dengan gantungan tali warna biru dongker bertuliskan One Heart.',
    foundLocation: 'Area Parkir FTSP Selatan',
    foundDate: '2026-11-20',
    foundTime: '14:30 WIB',
    storageLocation: 'Pos Satpam FTSP & Perpustakaan',
    storageRack: 'Kotak Kunci No. 14',
    status: 'Barang Ditemukan',
    photoUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80',
    secretNotes: 'Ada remote alarm kecil warna hitam agak tergores.',
    finderName: 'Satpam FTSP (Patroli)',
    finderPhone: '-'
  },
  {
    id: 'ITM-0228',
    name: 'Tas Ransel Abu-abu',
    category: 'Tas',
    color: 'Abu-abu',
    description: 'Tas ransel laptop merek Bodypack warna abu-abu gelap, resleting masih bagus.',
    foundLocation: 'Gedung Kuliah Umum (GKU) Ruang 2.14',
    foundDate: '2026-11-19',
    foundTime: '16:45 WIB',
    storageLocation: 'Pos Satpam Utama (Gedung Kuliah Umum)',
    storageRack: 'Lemari B - Rak 1',
    status: 'Barang Ditemukan',
    photoUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    secretNotes: 'Di saku depan ada buku catatan bersampul biru dan kabel charger Type-C.',
    finderName: 'Cleaning Service GKU',
    finderPhone: '-'
  },
  {
    id: 'ITM-0225',
    name: 'Botol Minum Stainless (Tumbler)',
    category: 'Botol Minum',
    color: 'Silver / Perak',
    description: 'Tumbler stainless warna silver mengkilap kapasitas 600ml, tutup ulir hitam.',
    foundLocation: 'Serambi Masjid Ulil Albab',
    foundDate: '2026-11-19',
    foundTime: '12:50 WIB',
    storageLocation: 'Pos Keamanan Masjid Ulil Albab',
    storageRack: 'Rak Barang Masjid',
    status: 'Barang Ditemukan',
    photoUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    secretNotes: 'Terdapat stiker inisial "AF" kecil di bagian bawah botol.',
    finderName: 'Jamaah Masjid',
    finderPhone: '-'
  },
  {
    id: 'ITM-0220',
    name: 'Kartu Tanda Mahasiswa (KTM) UII',
    category: 'Kartu / KTM',
    color: 'Biru Putih',
    description: 'KTM mahasiswa Fakultas Teknologi Industri program studi Informatika.',
    foundLocation: 'Kantin Basement FTI',
    foundDate: '2026-11-18',
    foundTime: '13:00 WIB',
    storageLocation: 'Pos Satpam FTI & FMIPA',
    storageRack: 'Kotak Kartu Identitas',
    status: 'Barang Ditemukan',
    photoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    secretNotes: 'NIM berakhiran 4 digit: 2189, nama depan M*****',
    finderName: 'Penjaga Kantin FTI',
    finderPhone: '-'
  },
  {
    id: 'ITM-0218',
    name: 'Earbuds Bluetooth (TWS) Case Putih',
    category: 'Elektronik',
    color: 'Putih',
    description: 'Case wireless earbuds warna putih rounded, kondisi baterai menyala saat dibuka.',
    foundLocation: 'Laboratorium Komputer FTI Lt. 3',
    foundDate: '2026-11-18',
    foundTime: '15:20 WIB',
    storageLocation: 'Pos Satpam FTI & FMIPA',
    storageRack: 'Lemari Khusus Elektronik',
    status: 'Barang Ditemukan',
    photoUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    secretNotes: 'Case ada casing silikon bening bergambar kucing.',
    finderName: 'Asisten Lab FTI',
    finderPhone: '-'
  }
];

export const initialLostReports = [
  {
    id: 'HL-94812',
    name: 'Dompet Kartu Braun Buffel',
    category: 'Dompet',
    color: 'Hitam',
    lostLocation: 'Perpustakaan Pusat UII',
    lostDate: '2026-11-20',
    lostTime: '09:30 WIB',
    description: 'Dompet tipis isi KTM UII dan SIM C, warna hitam polos.',
    reporterName: 'Ahmad Fadhil Pratama',
    reporterPhone: '081234567890',
    status: 'Memiliki Kandidat',
    matchingScore: 88,
    candidateItemId: 'ITM-0231'
  },
  {
    id: 'HL-83921',
    name: 'Kunci Motor Vario 160',
    category: 'Kunci',
    color: 'Hitam',
    lostLocation: 'Parkiran FTSP',
    lostDate: '2026-11-20',
    lostTime: '13:00 WIB',
    description: 'Kunci remote keyless dengan gantungan tali biru.',
    reporterName: 'Siti Rahmawati',
    reporterPhone: '085712345678',
    status: 'Memiliki Kandidat',
    matchingScore: 92,
    candidateItemId: 'ITM-0230'
  }
];

