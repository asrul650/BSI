import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Satpam: Verifikasi Kepemilikan (Langkah 3: Bandingkan Ciri Khusus & Data Rahasia) - Portal Satpam UII
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto\"><div class=\"flex flex-col\"><div class=\"p-gutter pb-space-sm flex items-center gap-space-sm\"><div class=\"w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm\"><span class=\"material-symbols-outlined text-secondary-fixed\">verified_user</span></div><div class=\"flex flex-col min-w-0\"><span class=\"font-headline-sm text-headline-sm text-on-surface truncate tracking-tight\">Lost &amp; Found UII</span><span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">PORTAL SATPAM KAMPUS</span></div></div><div class=\"px-gutter py-space-xs\"><div class=\"h-px bg-surface-container-high w-full\"></div></div><div class=\"px-space-sm py-space-xs\"><span class=\"px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block\">Navigasi Utama</span></div><nav class=\"flex flex-col gap-1 px-space-sm\" data-active-classes=\"bg-primary text-on-primary font-label-lg shadow-sm\">\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">dashboard</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"penerimaan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">move_to_inbox</span>\n    <span>Penerimaan</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"barang\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">inventory_2</span>\n    <span>Barang</span>\n  </a>\n  <a class=\"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"hasil-matching\" href=\"#\">\n    <div class=\"flex items-center gap-space-sm\">\n      <span class=\"material-symbols-outlined text-[20px]\">auto_awesome</span>\n      <span>Hasil Matching</span>\n    </div>\n    <span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm\">AI</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors bg-primary text-on-primary font-label-lg shadow-sm font-semibold cursor-pointer\" data-path=\"verifikasi\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Verifikasi</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"laporan-kehilangan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">receipt_long</span>\n    <span>Laporan Kehilangan</span>\n  </a>\n</nav></div><div class=\"p-space-sm flex flex-col gap-space-sm\"><div class=\"bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1\"><div class=\"flex items-center gap-2\"><span class=\"w-2.5 h-2.5 rounded-full bg-secondary animate-pulse\"></span><span class=\"font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider\">Pos Jaga Aktif</span></div><p class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Posko Induk GKU</p><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Shift Siang (07:00 - 15:30 WIB)</span></div><div class=\"px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\"><span class=\"flex items-center gap-1\"><span class=\"material-symbols-outlined text-[16px]\">contact_support</span> BSI Helpdesk: x102</span><span>v2.4.0</span></div></div><!-- Portal Publik Shortcut Button -->\n<div class=\"px-space-sm pt-2\">\n  <button data-path=\"portal-publik\" class=\"w-full py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">logout</span>\n    <span>Kembali ke Portal Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72\"><header class=\"fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter\"><div class=\"flex items-center gap-gutter flex-1 max-w-xl\"><div class=\"relative w-full\"><span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">search</span><input class=\"w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm transition-all\" placeholder=\"Cari nomor tiket TM- / HL- / nama barang...\" type=\"text\"/></div></div><div class=\"flex items-center gap-space-md shrink-0\"><div class=\"hidden xl:flex flex-col text-right\"><span class=\"font-label-lg text-label-lg text-on-surface\">Kamis, 24 Oktober 2024</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pukul 11:42 WIB</span></div><div class=\"hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\"><span class=\"material-symbols-outlined text-[16px]\">shield</span><span>Status Siaga 1</span></div><div class=\"h-8 w-px bg-surface-container-high hidden sm:block\"></div><div class=\"flex items-center gap-space-sm\"><div class=\"flex flex-col text-right hidden md:block\"><span class=\"font-label-lg text-label-lg text-on-surface truncate font-semibold\">Bripka Hendra Kurniawan</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Petugas Pos Jaga Induk GKU (SEC-042)</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors ml-1\" data-path=\"login\" href=\"#\" title=\"Keluar Portal\"><span class=\"material-symbols-outlined text-[20px]\">logout</span></a></div></div></header><main class=\"w-full pt-16 bg-surface min-h-screen px-gutter py-space-lg\"><div class=\"flex flex-col w-full max-w-7xl mx-auto space-y-space-md\">\n<!-- Breadcrumbs & Meta Bar -->\n<div class=\"flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest p-space-sm rounded-xl shadow-sm\">\n<div class=\"flex flex-wrap items-center gap-2\">\n<span class=\"px-2.5 py-1 rounded bg-surface-container-high font-label-sm text-label-sm font-semibold text-on-surface-variant\">SOP No. 04/SK-BSI/2024</span>\n<span class=\"text-on-surface-variant text-label-sm\">\u2022</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Tiket:</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold bg-surface-container-low px-2 py-0.5 rounded\">SEC-VRF-4019</span>\n<span class=\"text-on-surface-variant text-label-sm\">/</span>\n<span class=\"font-label-md text-label-md text-secondary font-semibold bg-secondary-fixed/50 px-2 py-0.5 rounded\">BRG-2024-0142 (HL-88219)</span>\n</div>\n<div class=\"flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">verified</span>\n<span>Protokol Verifikasi Meja Posko GKU</span>\n</div>\n</div>\n<!-- Header & Interactive Stepper -->\n<div class=\"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm space-y-space-md\">\n<div class=\"flex flex-col xl:flex-row xl:items-start justify-between gap-space-md\">\n<div class=\"space-y-1 max-w-3xl\">\n<div class=\"flex flex-wrap items-center gap-2\">\n<span class=\"px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold tracking-wide uppercase\">Tahap Verifikasi Fisik</span>\n<span class=\"px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold\">BRG-2024-0142 (Flashdisk Sandisk 64GB Merah-Hitam)</span>\n<span class=\"px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">Pemohon: M. Alif Fadhlorrahman (NIM: ****1842)</span>\n</div>\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight\">Verifikasi Kepemilikan Barang - Bandingkan Ciri Khusus</h1>\n<p class=\"font-body-md text-body-md text-on-surface-variant\">\n          Pencocokan pernyataan lisan pemohon langsung di meja pos jaga terhadap catatan rahasia barang inventaris sebelum serah terima resmi BAST.\n        </p>\n</div>\n<!-- Prototype Interactive Switcher -->\n<div class=\"bg-surface-container-low p-1.5 rounded-xl flex items-center gap-1 self-start shrink-0 shadow-inner\">\n<button class=\"px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all bg-primary text-on-primary shadow-sm flex items-center gap-1\" id=\"btn-view-masked\" onclick=\"setViewMode('masked')\">\n<span class=\"material-symbols-outlined text-[15px]\">lock</span>\n<span>Tampilan Terkunci</span>\n</button>\n<button class=\"px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all text-on-surface-variant hover:text-on-surface flex items-center gap-1\" id=\"btn-view-revealed\" onclick=\"setViewMode('revealed')\">\n<span class=\"material-symbols-outlined text-[15px]\">compare</span>\n<span>Tampilan Terbuka</span>\n</button>\n<button class=\"px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all text-error hover:bg-error-container/40 flex items-center gap-1\" id=\"btn-view-failure\" onclick=\"openModal('modal-failure')\">\n<span class=\"material-symbols-outlined text-[15px]\">cancel</span>\n<span>Dialog Gagal</span>\n</button>\n</div>\n</div>\n<!-- 4-Step Stepper -->\n<div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-xs pt-space-xs\">\n<!-- Step 1 (Completed) -->\n<div class=\"flex items-center gap-3 p-3 rounded-xl bg-surface-container-low\">\n<div class=\"w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[18px]\">check</span>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">Langkah 1 (Selesai)</span>\n<span class=\"font-label-md text-label-md text-on-surface truncate font-semibold\">Cari Barang &amp; Identitas</span>\n</div>\n</div>\n<!-- Step 2 (Completed) -->\n<div class=\"flex items-center gap-3 p-3 rounded-xl bg-surface-container-low\">\n<div class=\"w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[18px]\">check</span>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">Langkah 2 (Selesai)</span>\n<span class=\"font-label-md text-label-md text-on-surface truncate font-semibold\">Validasi Identitas &amp; Pemohon</span>\n</div>\n</div>\n<!-- Step 3 (Active) -->\n<div class=\"flex items-center gap-3 p-3 rounded-xl bg-primary text-on-primary shadow-sm ring-2 ring-primary\">\n<div class=\"w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-md text-label-md font-bold shrink-0\">\n          3\n        </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm text-secondary-fixed-dim font-semibold uppercase tracking-wider\">Langkah 3 (Aktif)</span>\n<span class=\"font-label-md text-label-md text-on-primary truncate font-bold\">Bandingkan Ciri Khusus</span>\n</div>\n</div>\n<!-- Step 4 (Upcoming) -->\n<div class=\"flex items-center gap-3 p-3 rounded-xl bg-surface-container-low opacity-75\">\n<div class=\"w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-md text-label-md font-bold shrink-0\">\n          4\n        </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider\">Langkah Terakhir</span>\n<span class=\"font-label-md text-label-md text-on-surface truncate font-semibold\">Serah Terima &amp; BAST</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Main Comparison Split Grid -->\n<div class=\"grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start\">\n<!-- LEFT COLUMN: Pernyataan Lisan Pemohon (5 cols) -->\n<div class=\"lg:col-span-5 flex flex-col space-y-space-md\">\n<div class=\"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm space-y-space-md\">\n<!-- Header -->\n<div class=\"space-y-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"px-2.5 py-1 rounded bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm font-semibold uppercase tracking-wider\">Input Wawancara Tatap Muka</span>\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">record_voice_over</span>\n</div>\n<h2 class=\"font-headline-sm text-headline-sm text-on-surface font-bold\">Pernyataan Lisan Pemohon</h2>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n            Dicatat langsung oleh Bripka Hendra Kurniawan saat wawancara di Meja Pos Jaga Induk GKU.\n          </p>\n</div>\n<!-- Field 1 -->\n<div class=\"space-y-1.5\">\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold flex items-center justify-between\">\n<span>Ciri Khusus yang Disebutkan Lisan</span>\n<span class=\"text-secondary font-body-sm text-body-sm\">Ciri Primer</span>\n</label>\n<div class=\"p-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface\">\n            \"Pemohon menyatakan ada goresan inisial huruf <span class=\"font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-2\">'R'</span> manual di bodi plastik bagian belakang dekat konektor USB, serta gantungan tali warna abu-abu.\"\n          </div>\n</div>\n<!-- Field 2 -->\n<div class=\"space-y-1.5\">\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Perkiraan Lokasi Kehilangan</label>\n<div class=\"p-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface flex items-start gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5\">location_on</span>\n<span>Meja dosen lab komputer 3.2 Gedung Kuliah Umum (GKU) lantai 2 setelah praktikum Pemrograman Web.</span>\n</div>\n</div>\n<!-- Field 3 -->\n<div class=\"space-y-1.5\">\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Perkiraan Waktu Hilang</label>\n<div class=\"p-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary shrink-0\">schedule</span>\n<span>Rabu, 20 November 2024, sekitar pukul 13:30 - 14:00 WIB</span>\n</div>\n</div>\n<!-- Field 4 -->\n<div class=\"space-y-1.5\">\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Bukti Kepemilikan Tambahan yang Ditunjukkan</label>\n<div class=\"p-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface space-y-2\">\n<p>Dapat menyebutkan 3 nama folder tugas utama di dalam flashdisk:</p>\n<div class=\"flex flex-wrap gap-1.5\">\n<span class=\"px-2.5 py-1 rounded-md bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold tracking-mono\">\"SKRIPSI_FINAL\"</span>\n<span class=\"px-2.5 py-1 rounded-md bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold tracking-mono\">\"PROYEK_IOT\"</span>\n<span class=\"px-2.5 py-1 rounded-md bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold tracking-mono\">\"FOTO_KKN\"</span>\n</div>\n</div>\n</div>\n<!-- Observasi Fisik Petugas -->\n<div class=\"pt-space-xs space-y-2\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider block\">Observasi Sikap Pemohon di Meja</span>\n<div class=\"space-y-2\">\n<label class=\"flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container\">\n<input checked=\"\" class=\"w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-secondary\" type=\"checkbox\"/>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Pemohon menjawab spontan tanpa jeda ragu-ragu</span>\n</label>\n<label class=\"flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container\">\n<input checked=\"\" class=\"w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-secondary\" type=\"checkbox\"/>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Tidak melihat catatan ponsel saat menyebutkan ciri rahasia</span>\n</label>\n<label class=\"flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container\">\n<input checked=\"\" class=\"w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-secondary\" type=\"checkbox\"/>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Identitas KTP/KTM sesuai dengan fisik pemohon langsung</span>\n</label>\n</div>\n</div>\n</div>\n</div>\n<!-- RIGHT COLUMN: Data Rahasia Inventaris Master Data (7 cols) -->\n<div class=\"lg:col-span-7 flex flex-col space-y-space-md\">\n<!-- Container -->\n<div class=\"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm relative overflow-hidden min-h-[580px] flex flex-col justify-between\">\n<!-- STATE A: MASKED VIEW -->\n<div class=\"flex flex-col h-full space-y-space-md\" id=\"view-masked\">\n<div class=\"flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"w-3 h-3 rounded-full bg-error animate-pulse\"></span>\n<span class=\"font-label-sm text-label-sm font-semibold uppercase tracking-wider text-error\">Terkunci &amp; Terenkripsi</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Enkripsi BSI-AES256</span>\n</div>\n<!-- Lock Hero Pod -->\n<div class=\"my-auto py- space-y-space-md text-center max-w-lg mx-auto flex flex-col items-center\">\n<div class=\"w-20 h-20 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center shadow-inner\">\n<span class=\"material-symbols-outlined text-[44px]\">shield_lock</span>\n</div>\n<div class=\"space-y-2\">\n<h3 class=\"font-headline-md text-headline-md text-on-surface font-bold\">Data Rahasia Inventaris Pos Jaga</h3>\n<p class=\"font-body-md text-body-md text-on-surface-variant\">\n                Catatan rahasia khusus dan foto makro bukti fisik disembunyikan untuk menjaga objektivitas pemeriksaan dan mencegah kebocoran informasi sebelum pemohon memberi keterangan lengkap.\n              </p>\n</div>\n<div class=\"p-space-sm rounded-xl bg-surface-container-low text-left space-y-1 w-full\">\n<div class=\"flex items-center gap-2 text-on-surface font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">info</span>\n<span>Audit Trail Keamanan Satpam</span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n                Tindakan pembukaan data akan dicatat secara permanen ke log sistem UII-SEC dengan ID Petugas: <strong>SEC-042 (Bripka Hendra Kurniawan)</strong> dan IP Posko GKU.\n              </p>\n</div>\n<button class=\"w-full sm:w-auto px-space-lg py-3 rounded-full bg-primary hover:bg-surface-tint text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer\" onclick=\"openModal('modal-reveal-confirm')\">\n<span class=\"material-symbols-outlined text-[20px] text-secondary-fixed\">lock_open</span>\n<span>Buka Data Rahasia Sekarang</span>\n</button>\n</div>\n<!-- Dummy Blurred Content Background for realistic depth -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low opacity-40 blur-sm pointer-events-none select-none space-y-2\">\n<div class=\"h-4 bg-surface-container-highest rounded w-3/4\"></div>\n<div class=\"h-3 bg-surface-container-highest rounded w-full\"></div>\n<div class=\"h-3 bg-surface-container-highest rounded w-5/6\"></div>\n</div>\n</div>\n<!-- STATE B: REVEALED VIEW (Hidden by default, shown via toggle/confirm) -->\n<div class=\"hidden flex flex-col space-y-space-md\" id=\"view-revealed\">\n<!-- Top Audit Badge -->\n<div class=\"p- space-sm bg-secondary-fixed/30 rounded-xl flex items-center justify-between gap-space-sm\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">verified_user</span>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm font-semibold text-on-secondary-fixed\">Data Dibuka pada 24 Okt 2024 \u2022 11:46 WIB oleh SEC-042</span>\n<span class=\"font-body-sm text-body-sm text-on-secondary-fixed-variant\">Log Keamanan Resmi: #AUD-88219-VRF-POSKO-GKU</span>\n</div>\n</div>\n<span class=\"px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold\">Status: Terbuka</span>\n</div>\n<!-- Comparison Rows -->\n<div class=\"space-y-space-sm\">\n<!-- Row 1: Ciri Khusus -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low space-y-2\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold\">1. Ciri Khusus Master Data Fisik</span>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">check_circle</span>\n<span>Cocok Sempurna (100%)</span>\n</span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface\">\n<strong>Catatan Petugas Pemeriksa Awal:</strong> \"Terdapat goresan inisial huruf <span class=\"font-bold underline text-secondary decoration-2\">'R'</span> kecil di bagian bodi belakang konektor USB, tutup masih terpasang, ada tali gantungan abu-abu.\"\n              </p>\n<div class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 pt-1\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">compare_arrows</span>\n<span>Sesuai persis dengan pernyataan pemohon di Meja Pos Jaga.</span>\n</div>\n</div>\n<!-- Row 2: Lokasi Penemuan -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low space-y-2\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold\">2. Lokasi Fisik Ditemukan</span>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">check_circle</span>\n<span>Sesuai (Area Lab GKU Lt. 2)</span>\n</span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface\">\n                Ditemukan oleh Cleaning Service (Pak Rohmat) di <strong>Meja Dosen Lab Multimedia 2.14 Gedung Kuliah Umum (GKU) Lantai 2</strong>.\n              </p>\n<div class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 pt-1\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">compare_arrows</span>\n<span>Pemohon menyebutkan Lab Komputer 3.2 GKU Lantai 2 (Korelasi lokasi tepat di blok lab yang sama).</span>\n</div>\n</div>\n<!-- Row 3: Waktu Ditemukan -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low space-y-2\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold\">3. Waktu Penemuan Inventaris</span>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">schedule</span>\n<span>Sesuai (&lt; 15 menit deviasi)</span>\n</span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface\">\n                Dicatat masuk brankas pos jaga pada: <strong>Rabu, 20 November 2024 pukul 13:45 WIB</strong>.\n              </p>\n<div class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 pt-1\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">compare_arrows</span>\n<span>Perkiraan pemohon 13:30 - 14:00 WIB (Sangat akurat).</span>\n</div>\n</div>\n<!-- Row 4: Uji Isi File (Storage) -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low space-y-2\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold\">4. Hasil Pengecekan Isi Direktori File (Posko)</span>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">folder_special</span>\n<span>Valid Terkonfirmasi</span>\n</span>\n</div>\n<div class=\"flex items-center gap-2 flex-wrap\">\n<span class=\"font-label-sm text-label-sm bg-surface-container-lowest px-2 py-1 rounded text-on-surface font-semibold\">FAT32 (58.4 GB)</span>\n<span class=\"font-label-sm text-label-sm bg-secondary-fixed/50 text-on-secondary-fixed px-2 py-1 rounded font-semibold\">\u2713 SKRIPSI_FINAL</span>\n<span class=\"font-label-sm text-label-sm bg-secondary-fixed/50 text-on-secondary-fixed px-2 py-1 rounded font-semibold\">\u2713 PROYEK_IOT</span>\n<span class=\"font-label-sm text-label-sm bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded\">FOTO_KKN (di sub-folder Arsip)</span>\n</div>\n</div>\n<!-- High-Res Crop Photo -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center gap-space-sm\">\n<div class=\"w-full sm:w-44 h-28 rounded-lg overflow-hidden shrink-0 shadow-sm relative\">\n<img class=\"w-full h-full object-cover\" data-alt=\"High resolution macro security camera close-up of a black and red USB flash drive body, showing a hand-carved letter R scratch near the metal connector, sharp studio lighting on white institutional evidence background\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuD0Q-mKk5UldH_vnM5kDHuaieSuGzOkLjsYR5gRPcP3_200t1tPNIfgOXaHtUj9ZMr68hVSv4V2EP7ds1_pgZfoDXSypL5wNaBVDUfWIXqxavWWkAC3Bc4JVlsyYA4oKUaclMIdvNDT0rTB5fR0LXGgmSkA2MgJFF2hs4BAK6ZnJqHRdtbZrCft5cIBuw2bvEf9A21zOo9ba_kR5Ot87__9NU9BHIo7tl3x_owU1sM\"/>\n<div class=\"absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-primary/80 text-on-primary font-label-sm text-label-sm font-mono text-[10px]\">MACRO ZOOM</div>\n</div>\n<div class=\"space-y-1\">\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">Foto Bukti Makro Kamera Posko</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n                  Tampak goresan ukiran tangan inisial 'R' pada bagian case belakang konektor logam flashdisk. Bukti fisik identik 100% dengan keterangan lisan pemohon.\n                </p>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Diunggah Petugas Penerima: Bripka Hendra Kurniawan (20 Nov 14:02 WIB)</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<!-- Bottom Operational Bar -->\n<div class=\"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm\">\n<div class=\"flex items-center gap-2 w-full sm:w-auto\">\n<button class=\"w-full sm:w-auto px-space-md py-2.5 rounded-full bg-error-container text-on-error-container hover:bg-error hover:text-on-error font-label-lg text-label-lg font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer\" onclick=\"openModal('modal-failure')\">\n<span class=\"material-symbols-outlined text-[18px]\">cancel</span>\n<span>\u2715 Tidak Cocok (Klaim Gagal)</span>\n</button>\n<a class=\"w-full sm:w-auto px-space-md py-2.5 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-lg text-label-lg font-semibold transition-colors flex items-center justify-center gap-1.5\" href=\"#\">\n<span class=\"material-symbols-outlined text-[18px]\">arrow_back</span>\n<span>Kembali ke Langkah 2</span>\n</a>\n</div>\n<div class=\"flex items-center gap-2 w-full sm:w-auto justify-end\">\n<div class=\"hidden md:flex flex-col text-right pr-2\">\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Tervalidasi 4/4 Ciri Utama</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Siap Cetak Berita Acara</span>\n</div>\n<button class=\"w-full sm:w-auto px-space-lg py-3 rounded-full bg-primary hover:bg-surface-tint text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer\">\n<span>\u2713 Cocok, Lanjut Serah Terima &amp; BAST (Langkah 4)</span>\n<span class=\"material-symbols-outlined text-[20px]\">arrow_forward</span>\n</button>\n</div>\n</div>\n<!-- MODAL 1: Confirm Dialog Pembukaan Data Rahasia -->\n<div class=\"fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm hidden items-center justify-center p-4\" id=\"modal-reveal-confirm\">\n<div class=\"bg-surface-container-lowest max-w-lg w-full rounded-2xl shadow-2xl p-space-lg space-y-space-md animate-in fade-in zoom-in-95 duration-150\">\n<div class=\"w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[28px]\">lock_open</span>\n</div>\n<div class=\"space-y-2\">\n<h3 class=\"font-headline-md text-headline-md text-on-surface font-bold\">Konfirmasi Pembukaan Data Rahasia</h3>\n<p class=\"font-body-md text-body-md text-on-surface-variant\">\n          Perhatian: Pembukaan data rahasia akan dicatat secara permanen di audit log sistem pengamanan kampus dengan tanda tangan digital Anda:\n        </p>\n</div>\n<div class=\"p-space-sm rounded-xl bg-surface-container-low space-y-1 font-body-sm text-body-sm\">\n<div class=\"flex justify-between text-on-surface\">\n<span class=\"text-on-surface-variant\">Petugas Pelaksana:</span>\n<span class=\"font-semibold\">Bripka Hendra Kurniawan (SEC-042)</span>\n</div>\n<div class=\"flex justify-between text-on-surface\">\n<span class=\"text-on-surface-variant\">Waktu &amp; Pos Jaga:</span>\n<span>Kamis, 24 Okt 2024 \u2022 Posko GKU</span>\n</div>\n<div class=\"flex justify-between text-on-surface\">\n<span class=\"text-on-surface-variant\">Nomor Tiket:</span>\n<span class=\"font-mono font-semibold text-secondary\">SEC-VRF-4019</span>\n</div>\n</div>\n<p class=\"font-body-sm text-body-sm text-secondary font-medium\">\n        Pastikan pemohon telah selesai menyampaikan seluruh keterangan ciri lisan sebelum Anda membuka tampilan ini.\n      </p>\n<div class=\"flex items-center justify-end gap-space-sm pt-space-xs\">\n<button class=\"px-space-md py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high transition-colors\" onclick=\"closeModal('modal-reveal-confirm')\">\n          Batal\n        </button>\n<button class=\"px-space-lg py-2.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:bg-surface-tint shadow-md transition-all flex items-center gap-1.5\" onclick=\"confirmReveal()\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary-fixed\">vpn_key</span>\n<span>Ya, Buka Data Sekarang</span>\n</button>\n</div>\n</div>\n</div>\n<!-- MODAL 2: Failure Dialog (\"Klaim Tidak Cocok / Ditolak\") -->\n<div class=\"fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm hidden items-center justify-center p-4\" id=\"modal-failure\">\n<div class=\"bg-surface-container-lowest max-w-lg w-full rounded-2xl shadow-2xl p-space-lg space-y-space-md animate-in fade-in zoom-in-95 duration-150\">\n<div class=\"flex items-center justify-between\">\n<div class=\"w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[28px]\">gpp_bad</span>\n</div>\n<button class=\"p-1 rounded-lg text-on-surface-variant hover:bg-surface-container\" onclick=\"closeModal('modal-failure')\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n<div class=\"space-y-1\">\n<h3 class=\"font-headline-md text-headline-md text-on-surface font-bold\">Tandai Klaim Tidak Cocok / Gagal</h3>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n          Klaim barang ini akan dihentikan. Status barang inventaris akan tetap disimpan aman di brankas posko.\n        </p>\n</div>\n<div class=\"p-3 rounded-xl bg-error-container/40 flex items-start gap-2.5\">\n<span class=\"material-symbols-outlined text-[20px] text-error shrink-0\">warning</span>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Klaim ditandai gagal. Status barang kembali ke <strong>'Barang Ditemukan'</strong> di brankas Posko Induk GKU.</span>\n</div>\n<div class=\"space-y-space-sm\">\n<div class=\"space-y-1\">\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Alasan Penolakan / Ketidakcocokan *</label>\n<select class=\"w-full p-2.5 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40\">\n<option value=\"ciri_salah\">Ciri khusus yang disebutkan salah total / tidak sesuai fisik</option>\n<option value=\"lokasi_waktu\">Lokasi dan perkiraan waktu kehilangan tidak relevan</option>\n<option value=\"indikasi_palsu\">Indikasi klaim palsu / tidak dapat membuktikan kepemilikan</option>\n<option value=\"batal_mandiri\">Pemohon membatalkan klaim secara mandiri</option>\n</select>\n</div>\n<div class=\"space-y-1\">\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Catatan Berita Acara Penolakan *</label>\n<textarea class=\"w-full p-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/40\" placeholder=\"Jelaskan alasan detail mengapa pemohon tidak dapat membuktikan kepemilikan...\" rows=\"3\"></textarea>\n</div>\n<div class=\"p-2 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[16px]\">history</span>\n<span>Pemohon ini akan dicatat ke riwayat klaim gagal untuk barang ini.</span>\n</div>\n</div>\n<div class=\"flex items-center justify-end gap-space-sm pt-space-xs\">\n<button class=\"px-space-md py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high transition-colors\" onclick=\"closeModal('modal-failure')\">\n          Batal\n        </button>\n<button class=\"px-space-lg py-2.5 rounded-full bg-error text-on-error font-label-lg text-label-lg font-bold hover:bg-error/90 shadow-md transition-all flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-[18px]\">block</span>\n<span>Konfirmasi Penolakan Klaim</span>\n</button>\n</div>\n</div>\n</div>\n</div>\n<script>\n  function setViewMode(mode) {\n    const maskedEl = document.getElementById('view-masked');\n    const revealedEl = document.getElementById('view-revealed');\n    const btnMasked = document.getElementById('btn-view-masked');\n    const btnRevealed = document.getElementById('btn-view-revealed');\n\n    if (mode === 'masked') {\n      maskedEl.classList.remove('hidden');\n      revealedEl.classList.add('hidden');\n      btnMasked.className = \"px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all bg-primary text-on-primary shadow-sm flex items-center gap-1\";\n      btnRevealed.className = \"px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all text-on-surface-variant hover:text-on-surface flex items-center gap-1\";\n    } else {\n      maskedEl.classList.add('hidden');\n      revealedEl.classList.remove('hidden');\n      btnRevealed.className = \"px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all bg-primary text-on-primary shadow-sm flex items-center gap-1\";\n      btnMasked.className = \"px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all text-on-surface-variant hover:text-on-surface flex items-center gap-1\";\n    }\n  }\n\n  function openModal(id) {\n    const modal = document.getElementById(id);\n    if (modal) {\n      modal.classList.remove('hidden');\n      modal.classList.add('flex');\n    }\n  }\n\n  function closeModal(id) {\n    const modal = document.getElementById(id);\n    if (modal) {\n      modal.classList.add('hidden');\n      modal.classList.remove('flex');\n    }\n  }\n\n  function confirmReveal() {\n    closeModal('modal-reveal-confirm');\n    setViewMode('revealed');\n  }\n</script></main></div>";

export default function VerifikasiLangkah3({ onNavigate }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const handleClick = (e) => {
      const target = e.target.closest('a, button, [data-path], [data-action], tr, [role="button"], label');
      if (!target) return;

      const path = (target.getAttribute('data-path') || target.getAttribute('href') || '').trim();
      const action = (target.getAttribute('data-action') || '').trim();
      const title = (target.getAttribute('title') || '').toLowerCase();
      const text = (target.textContent || '').trim();
      const lowerText = text.toLowerCase();

      // =========================================================================
      // 0. Kembali ke Portal Publik
      // =========================================================================
      if (
        path === 'portal-publik' ||
        lowerText.includes('portal publik') ||
        path === 'logout' ||
        title.includes('keluar portal') ||
        title.includes('logout petugas')
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('landing');
        return;
      }

      // =========================================================================
      // 1. Sidebar Nav: Beranda / Dashboard
      // =========================================================================
      if (
        (path === 'beranda' && target.closest('nav')) ||
        (lowerText === 'beranda' && target.closest('aside')) ||
        (lowerText === 'beranda' && target.tagName === 'A' && target.closest('nav'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_dashboard');
        return;
      }

      // =========================================================================
      // 2. Sidebar Nav: Penerimaan
      // =========================================================================
      if (
        (path === 'penerimaan' && target.closest('aside')) ||
        (lowerText === 'penerimaan' && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_antrean');
        return;
      }

      // =========================================================================
      // 3. Sidebar Nav: Barang / Inventaris
      // =========================================================================
      if (
        (path === 'barang' && target.closest('aside')) ||
        (lowerText === 'barang' && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_inventaris');
        return;
      }

      // =========================================================================
      // 4. Sidebar Nav: Hasil Matching (AI)
      // =========================================================================
      if (
        (path === 'hasil-matching' && target.closest('aside')) ||
        (lowerText.includes('hasil matching') && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_matching');
        return;
      }

      // =========================================================================
      // 5. Sidebar Nav: Verifikasi
      // =========================================================================
      if (
        (path === 'verifikasi' && target.closest('aside')) ||
        (lowerText === 'verifikasi' && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_verifikasi_1');
        return;
      }

      // =========================================================================
      // 6. Sidebar Nav: Laporan Kehilangan
      // =========================================================================
      if (
        (path === 'laporan-kehilangan' && target.closest('aside')) ||
        (lowerText.includes('laporan kehilangan') && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_kehilangan');
        return;
      }

      // =========================================================================
      // 7. SPECIFIC FIX: Penerimaan Barang Temuan (PenerimaanBarang.jsx)
      // =========================================================================
      // Simpan & Buat Item ID Inventaris -> kembali ke dashboard awal penerimaan (satpam_antrean)
      if (
        lowerText.includes('simpan & buat item id inventaris') ||
        lowerText.includes('simpan & buat item') ||
        lowerText.includes('buat item id inventaris')
      ) {
        e.preventDefault();
        alert('Barang Temuan Berhasil Diterima & Disimpan!\n\nNomor Registrasi: BRG-2024-0143\nStatus: Tersimpan di Loker Posko GKU.\nKembali ke Dashboard Antrean Penerimaan.');
        if (onNavigate) onNavigate('satpam_antrean');
        return;
      }

      // Batal / Tunda di Penerimaan Barang -> kembali ke Antrean
      if (
        lowerText.includes('batal / tunda penyerahan') ||
        lowerText.includes('kembali ke mode tiket') ||
        (lowerText === 'batal' && (window.location.hash.includes('penerimaan') || document.querySelector('#section-inspeksi')))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_antrean');
        return;
      }

      // Action: Terima Fisik di Antrean Penerimaan / Dashboard
      if (
        action === 'terima-fisik' ||
        target.closest('[data-action="terima-fisik"]') ||
        lowerText === 'terima' ||
        lowerText.includes('terima barang temuan') ||
        lowerText.includes('input penerimaan') ||
        lowerText.includes('catat tanpa nomor laporan') ||
        lowerText.includes('tambah barang masuk') ||
        lowerText.includes('pemeriksaan fisik walk-in')
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_penerimaan');
        return;
      }

      // =========================================================================
      // 8. SPECIFIC FIX: Detail Fisik Barang Inventaris (DetailFisikInventaris.jsx)
      // =========================================================================
      // Tab 1: Riwayat Status
      if (target.id === 'tabBtn1' || target.closest('#tabBtn1') || lowerText.includes('riwayat status')) {
        e.preventDefault();
        const b1 = el.querySelector('#tabBtn1');
        const b2 = el.querySelector('#tabBtn2');
        const b3 = el.querySelector('#tabBtn3');
        const c1 = el.querySelector('#tabContent1');
        const c2 = el.querySelector('#tabContent2');
        const c3 = el.querySelector('#tabContent3');
        if (c1) c1.classList.remove('hidden');
        if (c2) c2.classList.add('hidden');
        if (c3) c3.classList.add('hidden');
        if (b1) {
          b1.className = 'tab-button px-space-md py-3 rounded-t-lg font-label-lg text-label-lg flex items-center gap-2 bg-surface-container-lowest text-on-surface font-semibold shadow-xs transition-all';
        }
        if (b2) {
          b2.className = 'tab-button px-space-md py-3 rounded-t-lg font-label-lg text-label-lg flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-all';
        }
        if (b3) {
          b3.className = 'tab-button px-space-md py-3 rounded-t-lg font-label-lg text-label-lg flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-all';
        }
        return;
      }

      // Tab 2: Riwayat Klaim
      if (target.id === 'tabBtn2' || target.closest('#tabBtn2') || lowerText.includes('riwayat klaim')) {
        e.preventDefault();
        const b1 = el.querySelector('#tabBtn1');
        const b2 = el.querySelector('#tabBtn2');
        const b3 = el.querySelector('#tabBtn3');
        const c1 = el.querySelector('#tabContent1');
        const c2 = el.querySelector('#tabContent2');
        const c3 = el.querySelector('#tabContent3');
        if (c1) c1.classList.add('hidden');
        if (c2) c2.classList.remove('hidden');
        if (c3) c3.classList.add('hidden');
        if (b2) {
          b2.className = 'tab-button px-space-md py-3 rounded-t-lg font-label-lg text-label-lg flex items-center gap-2 bg-surface-container-lowest text-on-surface font-semibold shadow-xs transition-all';
        }
        if (b1) {
          b1.className = 'tab-button px-space-md py-3 rounded-t-lg font-label-lg text-label-lg flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-all';
        }
        if (b3) {
          b3.className = 'tab-button px-space-md py-3 rounded-t-lg font-label-lg text-label-lg flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-all';
        }
        return;
      }

      // Tab 3: Kandidat Laporan (AI)
      if (target.id === 'tabBtn3' || target.closest('#tabBtn3') || lowerText.includes('kandidat laporan (ai)')) {
        e.preventDefault();
        const b1 = el.querySelector('#tabBtn1');
        const b2 = el.querySelector('#tabBtn2');
        const b3 = el.querySelector('#tabBtn3');
        const c1 = el.querySelector('#tabContent1');
        const c2 = el.querySelector('#tabContent2');
        const c3 = el.querySelector('#tabContent3');
        if (c1) c1.classList.add('hidden');
        if (c2) c2.classList.add('hidden');
        if (c3) c3.classList.remove('hidden');
        if (b3) {
          b3.className = 'tab-button px-space-md py-3 rounded-t-lg font-label-lg text-label-lg flex items-center gap-2 bg-surface-container-lowest text-on-surface font-semibold shadow-xs transition-all';
        }
        if (b1) {
          b1.className = 'tab-button px-space-md py-3 rounded-t-lg font-label-lg text-label-lg flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-all';
        }
        if (b2) {
          b2.className = 'tab-button px-space-md py-3 rounded-t-lg font-label-lg text-label-lg flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-all';
        }
        return;
      }

      // Lightbox Zoom Foto
      if (
        lowerText.includes('perbesar grid') ||
        lowerText.includes('perbesar foto') ||
        target.closest('[data-action="open-zoom"]') ||
        (target.tagName === 'IMG' && target.closest('.rounded-xl'))
      ) {
        e.preventDefault();
        const zoomModal = el.querySelector('#modal-zoom-image');
        if (zoomModal) zoomModal.classList.remove('hidden');
        return;
      }

      // Close Lightbox Zoom
      if (
        action === 'close-modal-zoom' ||
        target.closest('[data-action="close-modal-zoom"]') ||
        (target.id === 'modal-zoom-image')
      ) {
        e.preventDefault();
        const zoomModal = el.querySelector('#modal-zoom-image');
        if (zoomModal) zoomModal.classList.add('hidden');
        return;
      }

      // =========================================================================
      // 9. SPECIFIC FIX: Verifikasi Langkah 1 (VerifikasiLangkah1.jsx)
      // =========================================================================
      // Jenis Identitas Fisik Selection (KTM UII, KTP / SIM, Pegawai)
      if (target.name === 'idType' || target.closest('label')?.querySelector('input[name="idType"]')) {
        const parentGrid = target.closest('.grid-cols-3');
        if (parentGrid) {
          const allLabels = parentGrid.querySelectorAll('label');
          allLabels.forEach(lbl => {
            lbl.className = 'flex items-center justify-center gap-1.5 p-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm font-medium hover:bg-surface-container cursor-pointer transition-all';
            const inp = lbl.querySelector('input');
            if (inp) inp.checked = false;
          });
          const activeLabel = target.tagName === 'LABEL' ? target : target.closest('label');
          if (activeLabel) {
            activeLabel.className = 'flex items-center justify-center gap-1.5 p-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold cursor-pointer shadow-xs transition-all';
            const activeInp = activeLabel.querySelector('input');
            if (activeInp) activeInp.checked = true;
          }
        }
        return;
      }

      // Hubungan Pemohon Terhadap Barang (Pemilik Asli vs Kuasa / Perwakilan)
      if (target.name === 'claimRel' || target.closest('label')?.querySelector('input[name="claimRel"]')) {
        const parentGrid = target.closest('.grid-cols-2');
        if (parentGrid) {
          const allLabels = parentGrid.querySelectorAll('label');
          allLabels.forEach(lbl => {
            lbl.className = 'flex items-center gap-2 p-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm font-medium hover:bg-surface-container cursor-pointer transition-all';
            const inp = lbl.querySelector('input');
            if (inp) inp.checked = false;
          });
          const activeLabel = target.tagName === 'LABEL' ? target : target.closest('label');
          if (activeLabel) {
            activeLabel.className = 'flex items-center gap-2 p-2 rounded-lg bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm font-semibold cursor-pointer shadow-xs';
            const activeInp = activeLabel.querySelector('input');
            if (activeInp) activeInp.checked = true;
          }
        }
        return;
      }

      // =========================================================================
      // 10. SPECIFIC FIX: Verifikasi Langkah 3 (VerifikasiLangkah3.jsx)
      // =========================================================================
      // Tombol Tampilan Terbuka & Tampilan Terkunci
      if (lowerText.includes('tampilan terbuka') || target.closest('[onclick*="revealed"]')) {
        e.preventDefault();
        const vMasked = el.querySelector('#view-masked');
        const vRevealed = el.querySelector('#view-revealed');
        if (vMasked) vMasked.classList.add('hidden');
        if (vRevealed) vRevealed.classList.remove('hidden');

        // Update button styles
        const allToggleBtns = el.querySelectorAll('button');
        allToggleBtns.forEach(b => {
          if (b.textContent.includes('Tampilan Terbuka')) {
            b.className = 'px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-sm font-semibold transition-all';
          }
          if (b.textContent.includes('Tampilan Terkunci')) {
            b.className = 'px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all';
          }
        });
        return;
      }

      if (lowerText.includes('tampilan terkunci') || target.closest('[onclick*="masked"]')) {
        e.preventDefault();
        const vMasked = el.querySelector('#view-masked');
        const vRevealed = el.querySelector('#view-revealed');
        if (vMasked) vMasked.classList.remove('hidden');
        if (vRevealed) vRevealed.classList.add('hidden');

        // Update button styles
        const allToggleBtns = el.querySelectorAll('button');
        allToggleBtns.forEach(b => {
          if (b.textContent.includes('Tampilan Terkunci')) {
            b.className = 'px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-sm font-semibold transition-all';
          }
          if (b.textContent.includes('Tampilan Terbuka')) {
            b.className = 'px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all';
          }
        });
        return;
      }

      // Buka Data Rahasia Sekarang -> buka dialog konfirmasi
      if (lowerText.includes('buka data rahasia sekarang')) {
        e.preventDefault();
        const modal = el.querySelector('#modal-reveal-confirm');
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
        return;
      }

      // Modal Reveal Confirm: Ya Buka Data Sekarang
      if (lowerText.includes('ya, buka data sekarang') || lowerText.includes('buka data sekarang')) {
        e.preventDefault();
        const modal = el.querySelector('#modal-reveal-confirm');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
        const vMasked = el.querySelector('#view-masked');
        const vRevealed = el.querySelector('#view-revealed');
        if (vMasked) vMasked.classList.add('hidden');
        if (vRevealed) vRevealed.classList.remove('hidden');

        // Update toggle buttons
        const allToggleBtns = el.querySelectorAll('button');
        allToggleBtns.forEach(b => {
          if (b.textContent.includes('Tampilan Terbuka')) {
            b.className = 'px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-sm font-semibold transition-all';
          }
          if (b.textContent.includes('Tampilan Terkunci')) {
            b.className = 'px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all';
          }
        });
        alert('Data rahasia berhasil diverifikasi dan dicatat pada audit log pos jaga.');
        return;
      }

      // Tombol Tidak Cocok (Klaim Gagal)
      if (lowerText.includes('tidak cocok (klaim gagal)') || lowerText.includes('klaim gagal')) {
        e.preventDefault();
        const modalFail = el.querySelector('#modal-failure');
        if (modalFail) {
          modalFail.classList.remove('hidden');
          modalFail.classList.add('flex');
        } else {
          if (confirm('Konfirmasi penolakan klaim karena ketidaksesuaian ciri khusus rahasia?')) {
            alert('Penolakan Klaim Tercatat!\n\nBarang tetap aman disimpan di brankas inventaris pos jaga.');
            if (onNavigate) onNavigate('satpam_inventaris');
          }
        }
        return;
      }

      // Modal Failure: Konfirmasi Penolakan Klaim
      if (lowerText.includes('konfirmasi penolakan klaim')) {
        e.preventDefault();
        const modalFail = el.querySelector('#modal-failure');
        if (modalFail) {
          modalFail.classList.add('hidden');
          modalFail.classList.remove('flex');
        }
        alert('Penolakan Klaim Berhasil Dicatat!\n\nStatus klaim diperbarui menjadi GAGAL (Karakteristik rahasia tidak sesuai).\nBarang tetap aman berada di loker inventaris posko.');
        if (onNavigate) onNavigate('satpam_inventaris');
        return;
      }

      // Close modal confirm or failure
      if (
        (lowerText === 'batal' || lowerText === 'close') &&
        (target.closest('#modal-reveal-confirm') || target.closest('#modal-failure'))
      ) {
        e.preventDefault();
        const m1 = el.querySelector('#modal-reveal-confirm');
        const m2 = el.querySelector('#modal-failure');
        if (m1) { m1.classList.add('hidden'); m1.classList.remove('flex'); }
        if (m2) { m2.classList.add('hidden'); m2.classList.remove('flex'); }
        return;
      }

      // Tombol Kembali ke Langkah 2 (Kembali ke Langkah 1 Verifikasi)
      if (lowerText.includes('kembali ke langkah 2') || lowerText.includes('kembali ke langkah 1')) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_verifikasi_1');
        return;
      }

      // =========================================================================
      // 11. SPECIFIC FIX: Laporan Kehilangan (DaftarLaporanKehilangan.jsx)
      // =========================================================================
      // Tombol Sinkronisasi Data -> tampilkan toast sukses (JANGAN location.reload)
      if (action === 'sync-data' || lowerText.includes('sinkronisasi data') || (lowerText.includes('sinkronisasi') && target.closest('button'))) {
        e.preventDefault();
        alert('Sinkronisasi Berhasil!\n\n44 Laporan kehilangan civitas telah dimutakhirkan secara real-time dari database kampus UII.');
        return;
      }

      // Buka Modal Input Tiket Manual
      if (
        lowerText.includes('input tiket manual') ||
        lowerText.includes('input manual') ||
        action === 'open-modal-input-manual'
      ) {
        e.preventDefault();
        const modal = el.querySelector('#modal-input-manual');
        if (modal) modal.classList.remove('hidden');
        return;
      }

      // Tutup Modal Input Tiket Manual
      if (action === 'close-modal-input-manual') {
        e.preventDefault();
        const modal = el.querySelector('#modal-input-manual');
        if (modal) modal.classList.add('hidden');
        return;
      }

      // Simpan Tiket Manual
      if (action === 'save-manual-ticket' || target.id === 'btn-save-manual-ticket' || lowerText.includes('simpan laporan & terbitkan')) {
        e.preventDefault();
        const modal = el.querySelector('#modal-input-manual');
        if (modal) modal.classList.add('hidden');
        alert('Laporan Kehilangan Baru Berhasil Dicatat!\n\nNomor Tiket: HL-2024-0895 (Walk-in Posko GKU)\nStatus: Aktif & Diantrikan ke Algoritma AI Matching.');
        return;
      }

      // Modal Tutup Tiket Laporan (HL-88219)
      if (action === 'open-modal-close-ticket') {
        e.preventDefault();
        const modal = el.querySelector('#modal-tutup-laporan');
        if (modal) modal.classList.remove('hidden');
        return;
      }

      if (action === 'close-modal-close-ticket') {
        e.preventDefault();
        const modal = el.querySelector('#modal-tutup-laporan');
        if (modal) modal.classList.add('hidden');
        if (lowerText.includes('konfirmasi tutup laporan')) {
          alert('Tiket HL-88219 Berhasil Ditutup!\n\nStatus laporan telah diarsipkan.');
        }
        return;
      }

      // Klik Baris Tabel / Tombol Detail di Laporan Kehilangan
      if (
        target.classList.contains('report-table-row') ||
        target.closest('.report-table-row') ||
        lowerText === 'detail'
      ) {
        e.preventDefault();
        // If clicking inside table, select row and DO NOT navigate to matching
        const row = target.classList.contains('report-table-row') ? target : target.closest('.report-table-row');
        if (row) {
          const allRows = el.querySelectorAll('.report-table-row');
          allRows.forEach(r => {
            r.classList.remove('bg-surface-container-high', 'shadow-sm');
            r.classList.add('hover:bg-surface-container-low');
          });
          row.classList.add('bg-surface-container-high', 'shadow-sm');
          row.classList.remove('hover:bg-surface-container-low');
        }
        return;
      }

      // =========================================================================
      // 12. GENERAL WORKFLOW NAVIGATION
      // =========================================================================
      // Action: Detail Fisik Inventaris
      if (
        action === 'detail-inventaris' ||
        target.closest('[data-action="detail-inventaris"]') ||
        title.includes('lihat detail') ||
        title.includes('detail barang') ||
        lowerText === 'visibility' ||
        lowerText.includes('tinjau detail') ||
        lowerText.includes('detail fisik') ||
        lowerText.includes('detail item') ||
        (lowerText.startsWith('brg-2024-') && !lowerText.includes('status matching')) ||
        path === 'detail-inventaris'
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_detail_inventaris');
        return;
      }

      // Breadcrumb / Nav: Daftar Inventaris
      if (
        lowerText.includes('daftar inventaris') ||
        lowerText.includes('kembali ke daftar inventaris') ||
        lowerText === 'inventaris barang'
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_inventaris');
        return;
      }

      // Action: Koreksi Data Inventaris
      if (
        lowerText.includes('koreksi data') ||
        lowerText.includes('edit data') ||
        lowerText.includes('ubah data') ||
        path === 'koreksi-inventaris'
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_koreksi');
        return;
      }

      // Simpan / Batal di Koreksi Data -> kembali ke Detail Fisik
      if (
        lowerText.includes('simpan koreksi') ||
        lowerText.includes('simpan perubahan') ||
        lowerText === 'batal'
      ) {
        e.preventDefault();
        alert('Koreksi Data Inventaris Berhasil Disimpan!');
        if (onNavigate) onNavigate('satpam_detail_inventaris');
        return;
      }

      // Action: Hasil Matching AI
      if (
        lowerText.includes('hasil matching') ||
        lowerText.includes('pencocokan ai') ||
        lowerText.includes('lihat semua 12 hasil matching') ||
        lowerText.includes('kandidat (94%)') ||
        lowerText.includes('kandidat (88%)') ||
        lowerText.includes('status matching') ||
        lowerText.includes('lanjutkan ke verifikasi ai')
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_matching');
        return;
      }

      // Action: Mulai Verifikasi Klaim
      if (
        lowerText.includes('verifikasi pengambilan') ||
        lowerText.includes('mulai verifikasi klaim') ||
        lowerText.includes('verifikasi kepemilikan')
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_verifikasi_1');
        return;
      }

      // Action: Lanjut ke Verifikasi Langkah 3
      if (
        lowerText.includes('lihat perbandingan klaim') ||
        lowerText.includes('bandingkan ciri khusus') ||
        lowerText.includes('mulai verifikasi (lanjut') ||
        lowerText.includes('langkah 3')
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_verifikasi_3');
        return;
      }

      // Submit BAST in Verifikasi 3
      if (
        lowerText.includes('terbitkan bast') ||
        lowerText.includes('serahkan barang') ||
        lowerText.includes('cocok, lanjut serah terima')
      ) {
        e.preventDefault();
        alert('Berita Acara Serah Terima (BAST) Berhasil Diterbitkan!\n\nNomor BAST: BAST-2024-1024-0089\nBarang resmi diserahkan kepada pemohon yang sah dan status inventaris telah diperbarui.');
        if (onNavigate) onNavigate('satpam_inventaris');
        return;
      }
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [onNavigate]);

  return (
    <div
      ref={containerRef}
      className="bg-surface font-body-md text-on-surface antialiased min-h-screen"
      dangerouslySetInnerHTML={{ __html: rawHTML }}
    />
  );
}
