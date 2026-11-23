import React, { useLayoutEffect, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Layar Stitch Portal Satpam: Daftar Inventaris Barang - Portal Satpam UII
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto\"><div class=\"flex flex-col\"><div class=\"p-gutter pb-space-sm flex items-center gap-space-sm\"><div class=\"w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm\"><span class=\"material-symbols-outlined text-secondary-fixed\">verified_user</span></div><div class=\"flex flex-col min-w-0\"><span class=\"font-headline-sm text-headline-sm text-on-surface truncate tracking-tight\">Lost &amp; Found UII</span><span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">Portal Satpam Kampus</span></div></div><div class=\"px-gutter py-space-xs\"><div class=\"h-px bg-surface-container-high w-full\"></div></div><div class=\"px-space-sm py-space-xs\"><span class=\"px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block\">Navigasi Utama</span></div><nav class=\"flex flex-col gap-1 px-space-sm\" data-active-classes=\"bg-primary text-on-primary font-label-lg shadow-sm\">\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">dashboard</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"penerimaan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">move_to_inbox</span>\n    <span>Penerimaan</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors bg-primary text-on-primary font-label-lg shadow-sm font-semibold cursor-pointer\" data-path=\"barang\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">inventory_2</span>\n    <span>Barang</span>\n  </a>\n  <a class=\"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"hasil-matching\" href=\"#\">\n    <div class=\"flex items-center gap-space-sm\">\n      <span class=\"material-symbols-outlined text-[20px]\">auto_awesome</span>\n      <span>Hasil Matching</span>\n    </div>\n    <span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm\">AI</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"verifikasi\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Verifikasi</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"laporan-kehilangan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">receipt_long</span>\n    <span>Laporan Kehilangan</span>\n  </a>\n</nav></div><div class=\"p-space-sm flex flex-col gap-space-sm\"><div class=\"bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1\"><div class=\"flex items-center gap-2\"><span class=\"w-2.5 h-2.5 rounded-full bg-secondary animate-pulse\"></span><span class=\"font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider\">Pos Jaga Aktif</span></div><p class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Posko Induk GKU</p><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Shift Siang (07:00 - 15:30 WIB)</span></div><div class=\"px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\"><span class=\"flex items-center gap-1\"><span class=\"material-symbols-outlined text-[16px]\">contact_support</span> BSI Helpdesk: x102</span><span>v2.4.0</span></div></div><!-- Portal Publik Shortcut Button -->\n<div class=\"px-space-sm pt-2\">\n  <button data-path=\"portal-publik\" class=\"w-full py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">logout</span>\n    <span>Kembali ke Portal Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72\"><header class=\"fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter\"><div class=\"flex items-center gap-gutter flex-1 max-w-xl\"><div class=\"relative w-full\"><span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">search</span><input class=\"w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm transition-all\" placeholder=\"Cari nomor tiket TM- / HL- / nama barang...\" type=\"text\"/></div></div><div class=\"flex items-center gap-space-md shrink-0\"><div class=\"hidden xl:flex flex-col text-right\"><span class=\"font-label-lg text-label-lg text-on-surface\">Kamis, 24 Oktober 2024</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pukul 11:42 WIB</span></div><div class=\"hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\"><span class=\"material-symbols-outlined text-[16px]\">shield</span><span>Status Siaga 1</span></div><div class=\"h-8 w-px bg-surface-container-high hidden sm:block\"></div><div class=\"flex items-center gap-space-sm\"><div class=\"flex flex-col text-right hidden md:block\"><span class=\"font-label-lg text-label-lg text-on-surface truncate font-semibold\">Bripka Hendra Kurniawan</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Petugas Pos Jaga Induk GKU (SEC-042)</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors ml-1\" data-path=\"login\" href=\"#\" title=\"Keluar Portal\"><span class=\"material-symbols-outlined text-[20px]\">logout</span></a></div></div></header><main class=\"w-full pt-16 bg-surface min-h-screen px-gutter py-space-lg\"><div class=\"flex flex-col w-full\">\n<!-- Breadcrumb & Top Title Area -->\n<div class=\"flex flex-col gap-2 mb-6\">\n<div class=\"flex items-center gap-2 text-on-surface-variant font-label-md text-label-md\">\n<a class=\"hover:text-primary transition-colors flex items-center gap-1\" href=\"#\">\n<span class=\"material-symbols-outlined text-[16px]\">home</span>\n<span>Beranda</span>\n</a>\n<span class=\"material-symbols-outlined text-[14px]\">chevron_right</span>\n<span class=\"text-on-surface font-semibold\">Inventaris Barang</span>\n</div>\n<div class=\"flex flex-col lg:flex-row lg:items-center justify-between gap-4\">\n<div class=\"flex flex-col\">\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight\">Inventaris Barang Temuan</h1>\n<p class=\"font-body-md text-body-md text-on-surface-variant mt-0.5\">\n          Kelola seluruh fisik barang inventaris Lost &amp; Found yang tersimpan di brankas dan locker pos jaga kampus UII.\n        </p>\n</div>\n<div class=\"flex items-center gap-3 shrink-0\">\n<button class=\"inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:bg-surface-container-high transition-colors\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">print</span>\n<span>Cetak Rekap Inventaris</span>\n</button>\n<a class=\"inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:opacity-95 transition-all\" href=\"#\">\n<span class=\"material-symbols-outlined text-[18px]\">add_circle</span>\n<span>+ Penerimaan Baru</span>\n</a>\n</div>\n</div>\n</div>\n<!-- KPI Quick Stats Grid -->\n<div class=\"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6\">\n<!-- Stat 1: Total Inventaris -->\n<div class=\"bg-surface-container-lowest rounded-xl p-5 shadow-sm flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Total Inventaris</span>\n<div class=\"flex items-baseline gap-2 mt-1\">\n<span class=\"font-headline-lg text-headline-lg text-on-surface\">43</span>\n<span class=\"font-label-md text-label-md text-secondary font-semibold\">Barang Aktif</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1\">Tercatat di sistem posko</span>\n</div>\n<div class=\"w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-on-surface text-[24px]\">inventory_2</span>\n</div>\n</div>\n<!-- Stat 2: Dalam Brankas Posko Induk -->\n<div class=\"bg-surface-container-lowest rounded-xl p-5 shadow-sm flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Brankas Posko GKU</span>\n<div class=\"flex items-baseline gap-2 mt-1\">\n<span class=\"font-headline-lg text-headline-lg text-on-surface\">38</span>\n<span class=\"font-label-md text-label-md text-secondary font-semibold\">Fisik Aman</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1\">Kapasitas rak 76% terisi</span>\n</div>\n<div class=\"w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-on-secondary-fixed text-[24px]\">lock</span>\n</div>\n</div>\n<!-- Stat 3: Dalam Verifikasi Klaim -->\n<div class=\"bg-surface-container-lowest rounded-xl p-5 shadow-sm flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Proses Verifikasi</span>\n<div class=\"flex items-baseline gap-2 mt-1\">\n<span class=\"font-headline-lg text-headline-lg text-on-surface\">5</span>\n<span class=\"font-label-md text-label-md text-on-surface-variant font-semibold\">Klaim Berjalan</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1\">2 terjadwal hari ini</span>\n</div>\n<div class=\"w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-on-surface text-[24px]\">schedule</span>\n</div>\n</div>\n<!-- Stat 4: Kedaluwarsa / Siap Dilimpahkan -->\n<div class=\"bg-surface-container-lowest rounded-xl p-5 shadow-sm flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Kedaluwarsa (&gt;90 Hari)</span>\n<div class=\"flex items-baseline gap-2 mt-1\">\n<span class=\"font-headline-lg text-headline-lg text-error\">2</span>\n<span class=\"font-label-md text-label-md text-error font-semibold\">Siap Dilimpahkan</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1\">Rekomendasi BSI &amp; DKM</span>\n</div>\n<div class=\"w-12 h-12 rounded-xl bg-error-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-on-error-container text-[24px]\">notification_important</span>\n</div>\n</div>\n</div>\n<!-- Search & Filter Controls Bar -->\n<div class=\"bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-4 flex flex-col gap-3\">\n<div class=\"flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3\">\n<!-- Search Input -->\n<div class=\"relative flex-1\">\n<span class=\"material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">search</span>\n<input class=\"w-full h-11 pl-11 pr-24 rounded-lg bg-surface font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-low transition-all\" id=\"inventorySearchInput\" placeholder=\"Cari berdasarkan Item ID (contoh: BRG-2024-0142), nama barang, atau ciri fisik...\" type=\"text\"/>\n<span class=\"absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-mono pointer-events-none\">\n          Ctrl + F\n        </span>\n</div>\n<!-- State Toggle Simulation Button (Requested in prompt) -->\n<div class=\"flex items-center gap-2 shrink-0\">\n<div class=\"bg-surface-container p-1 rounded-lg flex items-center text-label-sm font-label-sm\">\n<button class=\"px-3 py-1.5 rounded-md font-semibold bg-surface-container-lowest text-on-surface shadow-sm transition-all flex items-center gap-1.5\" id=\"btnStatePopulated\" onclick=\"switchState('populated')\">\n<span class=\"material-symbols-outlined text-[16px]\">view_list</span>\n<span>Data Terisi (43)</span>\n</button>\n<button class=\"px-3 py-1.5 rounded-md font-semibold text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1.5\" id=\"btnStateEmpty\" onclick=\"switchState('empty')\">\n<span class=\"material-symbols-outlined text-[16px]\">search_off</span>\n<span>Simulasi Kosong</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Dropdowns Filter Strip -->\n<div class=\"grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2.5 pt-1\">\n<!-- Status Filter -->\n<div class=\"relative\">\n<select class=\"w-full h-10 px-3 pr-8 rounded-lg bg-surface font-body-sm text-body-sm text-on-surface focus:outline-none appearance-none cursor-pointer\">\n<option value=\"\">Status: Semua Status</option>\n<option value=\"ditemukan\">Barang Ditemukan (Brankas)</option>\n<option value=\"verifikasi\">Proses Verifikasi</option>\n<option value=\"diambil\">Telah Diambil</option>\n<option value=\"ditahan\">Ditahan (Penyelidikan)</option>\n<option value=\"dilepas\">Dilepas / Dilimpahkan</option>\n<option value=\"kedaluwarsa\">Kedaluwarsa (&gt;90 hari)</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]\">expand_more</span>\n</div>\n<!-- Kategori Filter -->\n<div class=\"relative\">\n<select class=\"w-full h-10 px-3 pr-8 rounded-lg bg-surface font-body-sm text-body-sm text-on-surface focus:outline-none appearance-none cursor-pointer\">\n<option value=\"\">Kategori: Semua Kategori</option>\n<option value=\"elektronik\">Elektronik &amp; Gadget</option>\n<option value=\"dompet\">Dompet &amp; Dokumen</option>\n<option value=\"kunci\">Kunci &amp; Kendaraan</option>\n<option value=\"tas\">Tas, Ransel &amp; Koper</option>\n<option value=\"aksesoris\">Aksesoris &amp; Jam Tangan</option>\n<option value=\"lainnya\">Lain-lain</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]\">expand_more</span>\n</div>\n<!-- Rak/Locker Filter -->\n<div class=\"relative\">\n<select class=\"w-full h-10 px-3 pr-8 rounded-lg bg-surface font-body-sm text-body-sm text-on-surface focus:outline-none appearance-none cursor-pointer\">\n<option value=\"\">Locker: Semua Lokasi Rak</option>\n<option value=\"gku-a\">Locker GKU-A01 s/d A08</option>\n<option value=\"gku-b\">Rak Brankas GKU-B01 s/d B04</option>\n<option value=\"posko-utama\">Posko Gerbang Utama</option>\n<option value=\"posko-fakultas\">Pos Jaga FTI/FPSI</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]\">expand_more</span>\n</div>\n<!-- Tanggal Diterima -->\n<div class=\"relative\">\n<select class=\"w-full h-10 px-3 pr-8 rounded-lg bg-surface font-body-sm text-body-sm text-on-surface focus:outline-none appearance-none cursor-pointer\">\n<option value=\"\">Waktu: Semua Rentang</option>\n<option value=\"today\">Hari Ini</option>\n<option value=\"7days\">7 Hari Terakhir</option>\n<option value=\"30days\">30 Hari Terakhir</option>\n<option value=\"custom\">Pilih Tanggal Kustom...</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]\">calendar_today</span>\n</div>\n<!-- Filter Buttons Actions -->\n<div class=\"col-span-2 md:col-span-4 xl:col-span-1 flex items-center gap-2\">\n<button class=\"flex-1 h-10 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-1 transition-colors\" type=\"button\">\n<span class=\"material-symbols-outlined text-[16px]\">filter_alt</span>\n<span>Terapkan</span>\n</button>\n<button class=\"h-10 w-10 rounded-lg bg-surface text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors\" title=\"Reset Filter\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">restart_alt</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Main Populated Table Container -->\n<div class=\"bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col\" id=\"populatedStateContainer\">\n<!-- Active Table Header Bar -->\n<div class=\"px-5 py-3.5 bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-lg text-label-lg text-on-surface font-bold\">Daftar Fisik Inventaris</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-mono\">7 Baris Ditampilkan</span>\n</div>\n<div class=\"flex items-center gap-3 text-body-sm text-body-sm text-on-surface-variant\">\n<span class=\"flex items-center gap-1\">\n<span class=\"w-2 h-2 rounded-full bg-secondary-fixed-dim\"></span>\n<span>Pembaruan Realtime: Sinkron dengan CCTV &amp; RFID Scanner</span>\n</span>\n</div>\n</div>\n<!-- Dense Data Table -->\n<div class=\"overflow-x-auto\">\n<table class=\"w-full text-left border-collapse\">\n<thead>\n<tr class=\"bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider\">\n<th class=\"py-3 px-4 font-semibold\">Item ID</th>\n<th class=\"py-3 px-4 font-semibold\">Foto &amp; Nama Barang</th>\n<th class=\"py-3 px-4 font-semibold\">Warna / Spek</th>\n<th class=\"py-3 px-4 font-semibold\">Lokasi Rak</th>\n<th class=\"py-3 px-4 font-semibold\">Penerimaan</th>\n<th class=\"py-3 px-4 font-semibold\">Status Inventaris</th>\n<th class=\"py-3 px-4 font-semibold\">Kandidat Matching AI</th>\n<th class=\"py-3 px-4 font-semibold text-right\">Aksi</th>\n</tr>\n</thead>\n<tbody class=\"divide-y divide-surface-container-high font-body-md text-body-md text-on-surface\">\n<!-- Row 1: BRG-2024-0142 (Barang Ditemukan, 2 Kandidat Matching) -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-3.5 px-4 font-mono font-semibold text-secondary text-body-sm whitespace-nowrap\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-on-surface-variant cursor-pointer hover:text-primary\" title=\"Cetak Kode QR\">qr_code_2</span>\n<span class=\"hover:underline cursor-pointer\">BRG-2024-0142</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-surface-container-high relative\">\n<img class=\"w-full h-full object-cover\" data-alt=\"SanDisk Cruzer Blade red and black USB flash drive 64GB resting on an institutional slate desktop under soft diffuse daylight photography lost property inventory\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuAhlvgF4Nc9TtipywQIuYUVOaQoKi5oJU1itPfWFq_x949k1gstDFjcRuzLhXaSLnr0foEFdrHHZlELTXhU4QGCGGCOkEOr1YpGXXyh1E0R19_FXvHCDcgyoF2lWcgl_-p2Ych0lS_BYVZAGo8jnp0C99HkNiNTAV9xaN4wEC_XsNJbECHqisxmaOJhzaQBIdqg1arE2x8PQgI72ImJ2Z6hbdmaWKnFnELri9qt9Kc\"/>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-headline-sm text-body-md font-semibold text-on-surface truncate\">Flashdisk Sandisk Ultra 64GB</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Elektronik &amp; Aksesoris Komputer</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-full bg-error shrink-0\"></span>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Merah - Hitam</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant block\">Gantungan Tali Abu</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium inline-flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px] text-secondary\">lock</span>\n<span>Locker GKU-A04 (Brankas)</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium block\">24 Okt 2024 \u2022 09:15</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Bripka Hendra (SEC-042)</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n<span>Barang Ditemukan</span>\n</span>\n<span class=\"block text-[11px] text-on-surface-variant mt-0.5 font-medium\">Tersimpan di Brankas</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<a class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim font-label-sm text-label-sm font-semibold transition-all shadow-sm\" href=\"#\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">auto_awesome</span>\n<span>2 Kandidat (94%)</span>\n</a>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap text-right\">\n<div class=\"inline-flex items-center gap-1\">\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Lihat Detail Barang\" data-action=\"detail-inventaris\" class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:scale-90\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">visibility</span>\n</button>\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Cetak Label QR &amp; Barcode\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">print</span>\n</button>\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Opsi Lainnya\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 2: BRG-2024-0139 (Proses Verifikasi, 1 Kandidat) -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-3.5 px-4 font-mono font-semibold text-secondary text-body-sm whitespace-nowrap\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-on-surface-variant cursor-pointer hover:text-primary\">qr_code_2</span>\n<span class=\"hover:underline cursor-pointer\">BRG-2024-0139</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-surface-container-high relative\">\n<img class=\"w-full h-full object-cover\" data-alt=\"Matte black tumblr thermos water bottle with stainless steel lid sitting on university lost and found wooden inspection desk soft indoor lighting\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuATXIi_ht3Mjx5mDAuY18g6JSyC0yHD-Gl6-kfQh1utnXtKqcSaRmI9Awy_eUgYjh40cQPlzV7DP8oBm9YxRzM-FEWeerzZr78ZJkSggHlZQbevxWWGC7a40Ds4hNKuvkP-V2SlyT_RI-xiqWQGN_aXAVKTvryj10Lmatjn6wE7WxxB-omOmi--OU8pNbHozz3b1KjZLD93n0awspnjNRZBZBgsXeDtu3yA2dF7atQ\"/>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-headline-sm text-body-md font-semibold text-on-surface truncate\">Tumbler Corkcicle Sport Canteen</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Perlengkapan Pribadi</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-full bg-primary shrink-0\"></span>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Hitam Doff</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant block\">Stiker Typography BEM UII</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium inline-flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">inventory</span>\n<span>Locker GKU-B02</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium block\">23 Okt 2024 \u2022 14:20</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Aiptu Slamet (SEC-019)</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n<span>Proses Verifikasi</span>\n</span>\n<span class=\"block text-[11px] text-on-surface-variant mt-0.5 font-medium\">Jadwal Klaim: 14:00 WIB</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<a class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface hover:bg-secondary-fixed font-label-sm text-label-sm font-semibold transition-all\" href=\"#\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">auto_awesome</span>\n<span>1 Kandidat (88%)</span>\n</a>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap text-right\">\n<div class=\"inline-flex items-center gap-1\">\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Lihat Detail Barang\" data-action=\"detail-inventaris\" class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:scale-90\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">visibility</span>\n</button>\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Cetak Label QR\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">print</span>\n</button>\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Opsi Lainnya\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 3: BRG-2024-0131 (Barang Ditemukan) -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-3.5 px-4 font-mono font-semibold text-secondary text-body-sm whitespace-nowrap\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-on-surface-variant cursor-pointer hover:text-primary\">qr_code_2</span>\n<span class=\"hover:underline cursor-pointer\">BRG-2024-0131</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-surface-container-high relative\">\n<img class=\"w-full h-full object-cover\" data-alt=\"Brown textured genuine leather bifold wallet with visible plastic card slot and metallic embossed edge on a clean institutional security table\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuC3xlHzOkavBayVBSpNVJfJrQFPEvLNJIVcYQ_qpiW6iHJtiF57T8tJz7JV3Jt96Yyz8-0THtkuBUK3xvixruI-iIP3Eyu4V6or6VqR4GLfAxDUF2Eru7jP8srUac8RqKzvosTSdYNqhxa6N54AMZpyigkERJzTR0gHj4lGYIkqxjyC1kLPDhTzpSqLYyvWLdWRi_p9X-pLPiu4diiQFlelES2uQuLC-iB_0gXtwlE\"/>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-headline-sm text-body-md font-semibold text-on-surface truncate\">Dompet Lipat Kulit Fossil</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Dompet &amp; Identitas</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-full bg-on-surface-variant shrink-0\"></span>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Cokelat Tua</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant block\">Ada KTP an. Farhan M.</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium inline-flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px] text-secondary\">lock</span>\n<span>Locker GKU-A01 (Brankas)</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium block\">22 Okt 2024 \u2022 11:05</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Bripka Hendra (SEC-042)</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n<span>Barang Ditemukan</span>\n</span>\n<span class=\"block text-[11px] text-on-surface-variant mt-0.5 font-medium\">Dokumen Tersimpan Rapi</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant px-2.5\">-</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap text-right\">\n<div class=\"inline-flex items-center gap-1\">\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Lihat Detail Barang\" data-action=\"detail-inventaris\" class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer active:scale-90\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">visibility</span>\n</button>\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Cetak Label QR\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">print</span>\n</button>\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Opsi Lainnya\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 4: BRG-2024-0128 (Telah Diambil) -->\n<tr class=\"hover:bg-surface-container-low transition-colors group opacity-85\">\n<td class=\"py-3.5 px-4 font-mono font-semibold text-on-surface-variant text-body-sm whitespace-nowrap\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-on-surface-variant cursor-pointer hover:text-primary\">qr_code_2</span>\n<span class=\"hover:underline cursor-pointer\">BRG-2024-0128</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-surface-container-high relative\">\n<div class=\"w-full h-full flex items-center justify-center bg-surface-container text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[20px]\">key</span>\n</div>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-headline-sm text-body-md font-semibold text-on-surface truncate\">Kunci Motor Honda Vario 160</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Kunci &amp; Kendaraan</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-full bg-outline-variant shrink-0\"></span>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Silver Metal</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant block\">Remote Smartkey + Akrilik UII</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium\">\n                Selesai / Kosong\n              </span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium block\">20 Okt 2024 \u2022 08:30</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Brigadir Wahyu (SEC-055)</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-outline\"></span>\n<span>Telah Diambil</span>\n</span>\n<span class=\"block text-[11px] text-on-surface-variant mt-0.5 font-medium\">BAST Terbit #089</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant px-2.5\">-</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap text-right\">\n<div class=\"inline-flex items-center gap-1\">\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Lihat BAST &amp; Bukti Penyerahan\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">verified</span>\n</button>\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Opsi Lainnya\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 5: BRG-2024-0115 (Ditahan) -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-3.5 px-4 font-mono font-semibold text-secondary text-body-sm whitespace-nowrap\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-on-surface-variant cursor-pointer hover:text-primary\">qr_code_2</span>\n<span class=\"hover:underline cursor-pointer\">BRG-2024-0115</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-surface-container-high relative\">\n<img class=\"w-full h-full object-cover\" data-alt=\"Modern silver Apple iPad with cracked corner screen on forensic inspection table university lost property security investigation\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuB6K8YRN4iKE596egWIaLavWBnWDa4rKXa1lqgy4MpotXmczWAQv3b08LApYGd0rWbZgA8FXz72Je_Pw8TxOkHbzjNxhxqUM181fjhm1s6PlevnlJCFJcPvk6B3AjcEFg-q2qAEqPhMIR0vku1tRy_3iWL41PB8XcObed6vVv3mHU-6vsxtMT7l7xQDk9DrXvOUdTUQgU79NfPnsanMMKwWenxZq5qG0nblcHMc4YU\"/>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-headline-sm text-body-md font-semibold text-on-surface truncate\">iPad Air Generasi 5 (Locked)</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Elektronik &amp; Tablet</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-full bg-outline-variant shrink-0\"></span>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Space Grey</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant block\">Case Transparan Retak Sudut</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium inline-flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px] text-error\">gavel</span>\n<span>Locker Khusus BSI</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium block\">16 Okt 2024 \u2022 17:45</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Bripka Hendra (SEC-042)</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-outline\"></span>\n<span>Ditahan</span>\n</span>\n<span class=\"block text-[11px] text-on-surface-variant mt-0.5 font-medium\">Penyelidikan Internal BSI</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant px-2.5\">-</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap text-right\">\n<div class=\"inline-flex items-center gap-1\">\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Lihat Dokumen Penahanan BSI\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">policy</span>\n</button>\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Opsi Lainnya\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 6: BRG-2024-0098 (Dilepas / Dilimpahkan) -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-3.5 px-4 font-mono font-semibold text-secondary text-body-sm whitespace-nowrap\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-on-surface-variant cursor-pointer hover:text-primary\">qr_code_2</span>\n<span class=\"hover:underline cursor-pointer\">BRG-2024-0098</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-surface-container-high relative\">\n<div class=\"w-full h-full flex items-center justify-center bg-surface-container text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[20px]\">umbrella</span>\n</div>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-headline-sm text-body-md font-semibold text-on-surface truncate\">Payung Lipat Motif Kotak</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Aksesoris &amp; Pakaian</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-full bg-secondary shrink-0\"></span>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Biru Navy</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant block\">Gagang Kayu Alami</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium inline-flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">mosque</span>\n<span>Infaq Masjid Kampus</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium block\">04 Okt 2024 \u2022 10:12</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Bripka Hendra (SEC-042)</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-primary\"></span>\n<span>Dilepas / Dilimpahkan</span>\n</span>\n<span class=\"block text-[11px] text-on-surface-variant mt-0.5 font-medium\">BA Pelimpahan DKM UII</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant px-2.5\">-</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap text-right\">\n<div class=\"inline-flex items-center gap-1\">\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Lihat BA Pelimpahan\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">receipt</span>\n</button>\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Opsi Lainnya\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 7: BRG-2024-0084 (Kedaluwarsa >90 Hari) -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-3.5 px-4 font-mono font-semibold text-secondary text-body-sm whitespace-nowrap\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-on-surface-variant cursor-pointer hover:text-primary\">qr_code_2</span>\n<span class=\"hover:underline cursor-pointer\">BRG-2024-0084</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-surface-container-high relative\">\n<div class=\"w-full h-full flex items-center justify-center bg-surface-container text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[20px]\">headphones</span>\n</div>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-headline-sm text-body-md font-semibold text-on-surface truncate\">Headphone Wireless Sony WH-CH520</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Elektronik &amp; Audio</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-full bg-outline-variant shrink-0\"></span>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Krem / Beige</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant block\">Earcup Busa Bersih</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"px-2.5 py-1 rounded-md bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold inline-flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">warning</span>\n<span>Rak Kedaluwarsa #01</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium block\">22 Juli 2024 \u2022 16:00</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Aiptu Slamet (SEC-019)</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-error\"></span>\n<span>Kedaluwarsa</span>\n</span>\n<span class=\"block text-[11px] text-error font-medium mt-0.5\">&gt;94 Hari Tak Diambil</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant px-2.5\">-</span>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap text-right\">\n<div class=\"inline-flex items-center gap-1\">\n<button class=\"px-2.5 py-1 rounded-md bg-surface-container-high hover:bg-error-container hover:text-on-error-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1\" type=\"button\">\n<span>Proses Limbah</span>\n<span class=\"material-symbols-outlined text-[14px]\">arrow_forward</span>\n</button>\n<button class=\"p-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors\" title=\"Opsi Lainnya\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Pagination Controls -->\n<div class=\"px-5 py-3.5 bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-4\">\n<div class=\"flex items-center gap-3\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">\n          Menampilkan <span class=\"font-semibold text-on-surface\">1 - 7</span> dari <span class=\"font-semibold text-on-surface\">43</span> barang inventaris\n        </span>\n<div class=\"h-4 w-px bg-surface-container-high hidden sm:block\"></div>\n<div class=\"flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant\">\n<span>Tampilkan:</span>\n<select class=\"h-7 px-2 rounded bg-surface font-body-sm text-body-sm text-on-surface focus:outline-none cursor-pointer\">\n<option>10 per halaman</option>\n<option>25 per halaman</option>\n<option>50 per halaman</option>\n<option>Semua (43)</option>\n</select>\n</div>\n</div>\n<!-- Page Nav Buttons -->\n<div class=\"flex items-center gap-1\">\n<button class=\"w-8 h-8 rounded-lg bg-surface text-outline-variant flex items-center justify-center cursor-not-allowed\" disabled=\"\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_left</span>\n</button>\n<button class=\"w-8 h-8 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center shadow-sm\" type=\"button\">\n          1\n        </button>\n<button class=\"w-8 h-8 rounded-lg bg-surface hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-medium flex items-center justify-center transition-colors\" type=\"button\">\n          2\n        </button>\n<button class=\"w-8 h-8 rounded-lg bg-surface hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-medium flex items-center justify-center transition-colors\" type=\"button\">\n          3\n        </button>\n<button class=\"w-8 h-8 rounded-lg bg-surface hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-medium flex items-center justify-center transition-colors\" type=\"button\">\n          4\n        </button>\n<button class=\"w-8 h-8 rounded-lg bg-surface hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_right</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Dedicated Empty State Container (Toggleable Simulation) -->\n<div class=\"hidden bg-surface-container-lowest rounded-xl shadow-sm p-12 flex-col items-center justify-center text-center\" id=\"emptyStateContainer\">\n<div class=\"w-20 h-20 rounded-2xl bg-surface-container flex items-center justify-center mb-4\">\n<span class=\"material-symbols-outlined text-[44px] text-on-surface-variant\">inventory_2</span>\n</div>\n<h3 class=\"font-headline-md text-headline-md text-on-surface mb-2\">\n      Tidak ada barang inventaris yang sesuai kriteria pencarian\n    </h3>\n<p class=\"font-body-md text-body-md text-on-surface-variant max-w-lg mb-6\">\n      Periksa kembali kata kunci Item ID, ejaan nama barang, filter status aktif, atau rentang tanggal yang Anda masukkan dalam formulir pencarian.\n    </p>\n<div class=\"flex items-center gap-3\">\n<button class=\"inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:opacity-95 transition-all\" onclick=\"resetAndShowPopulated()\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">restart_alt</span>\n<span>Reset Semua Filter</span>\n</button>\n<button class=\"inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors\" onclick=\"switchState('populated')\" type=\"button\">\n<span>Kembali ke Data Inventaris</span>\n</button>\n</div>\n</div>\n<!-- Audit Log & Security Status Footer Bar -->\n<div class=\"mt-6 p-4 rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-3 text-body-sm text-body-sm text-on-surface-variant\">\n<div class=\"flex items-center gap-2 text-center md:text-left\">\n<span class=\"material-symbols-outlined text-secondary text-[18px]\">verified_user</span>\n<span>\n<strong class=\"font-semibold text-on-surface\">Sistem Inventarisasi Barang Terpadu UII-SEC</strong> \u2022 Enkripsi Data AES-256 \u2022 Lokasi Aktif: Posko Induk Keamanan GKU\n      </span>\n</div>\n<div class=\"flex items-center gap-3\">\n<span class=\"inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-secondary\"></span>\n<span>Semua aksi tercatat di audit log.</span>\n</span>\n<a class=\"font-label-sm text-label-sm text-secondary font-semibold hover:underline\" href=\"#\">Lihat Log Aktivitas</a>\n</div>\n</div>\n</div>\n<!-- Inline JavaScript for View State Simulation Toggle -->\n<script>\n  function switchState(state) {\n    const popContainer = document.getElementById('populatedStateContainer');\n    const emptyContainer = document.getElementById('emptyStateContainer');\n    const btnPop = document.getElementById('btnStatePopulated');\n    const btnEmp = document.getElementById('btnStateEmpty');\n\n    if (state === 'empty') {\n      popContainer.classList.add('hidden');\n      emptyContainer.classList.remove('hidden');\n      emptyContainer.classList.add('flex');\n\n      btnEmp.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');\n      btnEmp.classList.remove('text-on-surface-variant');\n\n      btnPop.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');\n      btnPop.classList.add('text-on-surface-variant');\n    } else {\n      emptyContainer.classList.add('hidden');\n      emptyContainer.classList.remove('flex');\n      popContainer.classList.remove('hidden');\n\n      btnPop.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');\n      btnPop.classList.remove('text-on-surface-variant');\n\n      btnEmp.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');\n      btnEmp.classList.add('text-on-surface-variant');\n    }\n  }\n\n  function resetAndShowPopulated() {\n    const input = document.getElementById('inventorySearchInput');\n    if (input) input.value = '';\n    switchState('populated');\n  }\n\n  // Keyboard shortcut Ctrl + F trigger to focus search\n  document.addEventListener('keydown', function(e) {\n    if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) {\n      e.preventDefault();\n      const input = document.getElementById('inventorySearchInput');\n      if (input) {\n        input.focus();\n        input.select();\n      }\n    }\n  });\n</script></main></div>";

export default function DaftarInventaris({ onNavigate, staffSession, onSessionExpired }) {
  const containerRef = useRef(null);
  const templateRowRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const tbody = el.querySelector('tbody.divide-y');
    if (!templateRowRef.current) templateRowRef.current = tbody?.querySelector('tr') || null;
    const templateRow = templateRowRef.current;
    let active = true;

    const getStatCard = (key, label) => {
      const existing = el.querySelector(`[data-inventory-stat="${key}"]`);
      if (existing) return existing;

      const labelNode = Array.from(el.querySelectorAll('span')).find(
        (node) => node.textContent.trim().toLowerCase() === label.toLowerCase(),
      );
      const card = labelNode?.parentElement?.parentElement;
      if (card) card.dataset.inventoryStat = key;
      return card;
    };
    const updateStatCard = (card, { title, value, secondary, detail }) => {
      if (!card) return;
      if (title) {
        const titleNode = card.querySelector('.font-label-sm');
        if (titleNode) titleNode.textContent = title;
      }
      if (value !== undefined) {
        const valueNode = card.querySelector('.font-headline-lg');
        if (valueNode) valueNode.textContent = value;
      }
      if (secondary !== undefined) {
        const secondaryNode = card.querySelector('.font-label-md');
        if (secondaryNode) secondaryNode.textContent = secondary;
      }
      if (detail !== undefined) {
        const detailNode = card.querySelector('.font-body-sm');
        if (detailNode) detailNode.textContent = detail;
      }
    };
    const statCards = {
      total: getStatCard('total', 'Total Inventaris'),
      found: getStatCard('found', 'Brankas Posko GKU'),
      verifying: getStatCard('verifying', 'Proses Verifikasi'),
      detained: getStatCard('detained', 'Kedaluwarsa (>90 Hari)'),
    };
    updateStatCard(statCards.total, { value: '-', secondary: 'Item tersimpan' });
    updateStatCard(statCards.found, {
      title: 'Barang Ditemukan',
      value: '-',
      secondary: 'Status aktif',
      detail: 'Jumlah dari tabel item',
    });
    updateStatCard(statCards.verifying, {
      value: '-',
      detail: 'Klaim berjalan di tabel item',
    });
    updateStatCard(statCards.detained, {
      title: 'Ditahan',
      value: '-',
      secondary: 'Status ditahan',
      detail: 'Jumlah dari tabel item',
    });

    const updateRowCount = (count, loadingLabel = 'Memuat data...') => {
      let countBadge = el.querySelector('[data-inventory-row-count]');
      if (!countBadge) {
        countBadge = Array.from(el.querySelectorAll('span')).find((node) =>
          /^\d+ Baris Ditampilkan$/.test(node.textContent.trim()),
        );
        if (countBadge) countBadge.dataset.inventoryRowCount = 'true';
      }
      if (countBadge) {
        countBadge.textContent = count === null ? loadingLabel : `${count} Baris Ditampilkan`;
      }

      const populatedButtonLabel = el.querySelector('#btnStatePopulated span:last-child');
      if (populatedButtonLabel) {
        populatedButtonLabel.textContent = `Data Terisi (${count === null ? '-' : count})`;
      }

      let paginationSummary = el.querySelector('[data-inventory-pagination-summary]');
      if (!paginationSummary) {
        paginationSummary = Array.from(el.querySelectorAll('span')).find((node) =>
          /^Menampilkan \d+ - \d+ dari \d+ barang inventaris$/.test(node.textContent.trim()),
        );
        if (paginationSummary) paginationSummary.dataset.inventoryPaginationSummary = 'true';
      }
      if (paginationSummary) {
        const total = count === null ? null : count.toLocaleString('id-ID');
        paginationSummary.textContent =
          total === null
            ? loadingLabel
            : `Menampilkan ${count ? 1 : 0} - ${total} dari ${total} barang inventaris`;
      }

      const pageSizeSelect = Array.from(el.querySelectorAll('select')).find((select) =>
        Array.from(select.options).some((option) => option.textContent.trim().startsWith('Semua (')),
      );
      const allItemsOption = pageSizeSelect
        ? Array.from(pageSizeSelect.options).find((option) =>
            option.textContent.trim().startsWith('Semua ('),
          )
        : null;
      if (allItemsOption && pageSizeSelect) {
        allItemsOption.value = 'all';
        allItemsOption.textContent = `Semua (${count === null ? '-' : count})`;
        pageSizeSelect.value = 'all';
      }

      const paginationFooter = el.querySelector('#populatedStateContainer > div:last-child');
      if (paginationFooter) {
        const pageButtons = Array.from(paginationFooter.querySelectorAll('button'));
        const numberButtons = pageButtons.filter((button) => /^\d+$/.test(button.textContent.trim()));
        numberButtons.slice(1).forEach((button) => button.remove());
        if (numberButtons[0]) {
          numberButtons[0].textContent = '1';
          numberButtons[0].disabled = true;
          numberButtons[0].setAttribute('aria-current', 'page');
        }
        const previousButton = pageButtons.find((button) => button.textContent.trim() === 'chevron_left');
        const nextButton = pageButtons.find((button) => button.textContent.trim() === 'chevron_right');
        if (previousButton) previousButton.disabled = true;
        if (nextButton) {
          nextButton.disabled = true;
          if (previousButton) nextButton.className = previousButton.className;
        }
      }
    };
    updateRowCount(null);

    const updateSourceLabel = () => {
      let sourceLabel = el.querySelector('[data-inventory-source]');
      if (!sourceLabel) {
        const sourceContainer = Array.from(el.querySelectorAll('span.flex.items-center.gap-1')).find(
          (node) => node.textContent.trim().startsWith('Pembaruan Realtime:'),
        );
        sourceLabel = sourceContainer?.querySelector('span:last-child');
        if (sourceLabel) sourceLabel.dataset.inventorySource = 'true';
      }
      if (sourceLabel) sourceLabel.textContent = 'Data bersumber dari tabel item';
    };
    updateSourceLabel();

    const createMessageRow = (message) => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 8;
      cell.className = 'px-4 py-8 text-center text-on-surface-variant';
      cell.textContent = message;
      row.appendChild(cell);
      return row;
    };

    const loadInventory = async () => {
      if (!tbody || !templateRow) return;

      tbody.replaceChildren(createMessageRow('Memuat inventaris dari database...'));

      try {
        const response = await fetch(`${API_BASE_URL}/v1/staff/items`, { credentials: 'include' });
        if (response.status === 401 && onSessionExpired) {
          onSessionExpired();
          return;
        }
        if (!response.ok) throw new Error(`Server mengembalikan status ${response.status}.`);
        const result = await response.json();
        if (!active) return;
        if (!Array.isArray(result.data)) throw new Error('Format data inventaris dari server tidak valid.');

        const items = result.data;
        const formatDate = new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          timeZone: 'Asia/Jakarta',
        });
        const formatTime = new Intl.DateTimeFormat('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Jakarta',
        });
        const statusDescriptions = {
          'Barang Ditemukan': (item) => `Tersimpan di ${item.storage_rack || 'pos jaga'}`,
          'Proses Verifikasi': () => 'Klaim sedang diverifikasi',
          'Telah Diambil': () => 'Barang telah diserahkan',
          Ditahan: () => 'Barang ditahan untuk pemeriksaan',
        };
        const rows = items.map((item) => {
          const row = templateRow.cloneNode(true);
          const cells = row.querySelectorAll('td');
          if (cells.length !== 8) throw new Error('Format baris inventaris tidak sesuai.');
          row.dataset.itemId = item.item_id;

          const itemId = cells[0].querySelector('div span:last-child');
          if (itemId) itemId.textContent = item.item_id || '-';

          const image = cells[1].querySelector('img');
          const imageContainer = image?.parentElement;
          if (imageContainer) {
            imageContainer.replaceChildren();
            imageContainer.classList.add('flex', 'items-center', 'justify-center');
            const imageIcon = document.createElement('span');
            imageIcon.className = 'material-symbols-outlined text-on-surface-variant text-[20px]';
            imageIcon.textContent = item.has_photo ? 'photo_camera' : 'image_not_supported';
            imageIcon.title = item.has_photo ? 'Foto penerimaan tersimpan' : 'Tidak ada foto penerimaan';
            imageContainer.appendChild(imageIcon);
          }

          const name = cells[1].querySelector('.font-headline-sm');
          if (name) name.textContent = item.item_name || '-';
          const category = cells[1].querySelector('.font-label-sm');
          if (category) category.textContent = item.category_name || '-';

          const color = cells[2].querySelector('div span:last-child');
          if (color) color.textContent = item.color || '-';
          const condition = cells[2].querySelector('span.block');
          if (condition) condition.textContent = item.condition || '-';

          const storageRack = cells[3].querySelector('span:last-child');
          if (storageRack) storageRack.textContent = item.storage_rack || '-';

          const receivedAt = new Date(item.received_at);
          const receivedDate = cells[4].querySelector('.font-body-sm');
          if (receivedDate) {
            receivedDate.textContent = Number.isNaN(receivedAt.getTime())
              ? '-'
              : `${formatDate.format(receivedAt)} • ${formatTime.format(receivedAt)}`;
          }
          const receivedBy = cells[4].querySelector('.font-label-sm');
          if (receivedBy) {
            receivedBy.textContent = item.received_by_name
              ? `${item.received_by_name}${item.received_by_username ? ` (${item.received_by_username})` : ''}`
              : item.received_by_username || '-';
          }

          const statusBadge = cells[5].querySelector('span.inline-flex');
          const statusName = statusBadge?.querySelector('span:last-child');
          if (statusName) statusName.textContent = item.status || '-';
          const statusDot = statusBadge?.querySelector('span.w-2');
          const statusDotColors = {
            'Barang Ditemukan': 'bg-secondary',
            'Proses Verifikasi': 'bg-primary',
            'Telah Diambil': 'bg-outline',
            Ditahan: 'bg-error',
          };
          if (statusDot) {
            statusDot.className = `w-2 h-2 rounded-full ${statusDotColors[item.status] || 'bg-outline'}`;
          }
          const statusDetail = cells[5].querySelector('span.block');
          if (statusDetail) {
            statusDetail.textContent =
              statusDescriptions[item.status]?.(item) || 'Status dari tabel item';
          }

          const matching = cells[6];
          matching.replaceChildren();
          const noMatchingData = document.createElement('span');
          noMatchingData.className = 'text-on-surface-variant';
          noMatchingData.textContent = '-';
          matching.appendChild(noMatchingData);

          return row;
        });

        tbody.replaceChildren(...(rows.length ? rows : [createMessageRow('Belum ada item tersimpan di database.')]));
        updateRowCount(items.length);
        updateStatCard(statCards.total, { value: items.length.toLocaleString('id-ID') });
        updateStatCard(statCards.found, {
          value: items.filter((item) => item.status === 'Barang Ditemukan').length.toLocaleString('id-ID'),
        });
        updateStatCard(statCards.verifying, {
          value: items.filter((item) => item.status === 'Proses Verifikasi').length.toLocaleString('id-ID'),
        });
        updateStatCard(statCards.detained, {
          value: items.filter((item) => item.status === 'Ditahan').length.toLocaleString('id-ID'),
        });
      } catch (error) {
        console.error('Gagal memuat daftar inventaris:', error);
        if (!active) return;
        tbody.replaceChildren(createMessageRow('Gagal memuat inventaris dari database. Coba muat ulang halaman.'));
        updateRowCount(null, 'Gagal memuat data');
      }
    };
    loadInventory();

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
      // KESESUAIAN FISIK TOGGLE: Sesuai (Cocok) vs Tidak Sesuai / Tolak
      if (
        target.id === 'match-card-true' ||
        target.closest('#match-card-true') ||
        (target.name === 'kesesuaian' && target.value === 'sesuai') ||
        lowerText.includes('kembali ke opsi sesuai')
      ) {
        e.preventDefault();
        const cardTrue = el.querySelector('#match-card-true');
        const cardFalse = el.querySelector('#match-card-false');
        const secSesuai = el.querySelector('#section-sesuai');
        const secTidak = el.querySelector('#section-tidak-sesuai');

        if (cardTrue) {
          cardTrue.className = 'cursor-pointer p-space-sm rounded-xl transition-all flex items-start gap-3 bg-primary text-on-primary shadow-sm';
          const inp = cardTrue.querySelector('input');
          if (inp) inp.checked = true;
        }
        if (cardFalse) {
          cardFalse.className = 'cursor-pointer p-space-sm rounded-xl transition-all flex items-start gap-3 bg-surface-container-low text-on-surface hover:bg-surface-container-high';
          const inp = cardFalse.querySelector('input');
          if (inp) inp.checked = false;
        }
        if (secSesuai) secSesuai.classList.remove('hidden');
        if (secTidak) {
          secTidak.classList.add('hidden');
          secTidak.classList.remove('flex');
        }
        return;
      }

      if (
        target.id === 'match-card-false' ||
        target.closest('#match-card-false') ||
        (target.name === 'kesesuaian' && target.value === 'tidak_sesuai') ||
        lowerText.includes('tidak sesuai / tolak')
      ) {
        e.preventDefault();
        const cardTrue = el.querySelector('#match-card-true');
        const cardFalse = el.querySelector('#match-card-false');
        const secSesuai = el.querySelector('#section-sesuai');
        const secTidak = el.querySelector('#section-tidak-sesuai');

        if (cardFalse) {
          cardFalse.className = 'cursor-pointer p-space-sm rounded-xl transition-all flex items-start gap-3 bg-primary text-on-primary shadow-sm';
          const inp = cardFalse.querySelector('input');
          if (inp) inp.checked = true;
        }
        if (cardTrue) {
          cardTrue.className = 'cursor-pointer p-space-sm rounded-xl transition-all flex items-start gap-3 bg-surface-container-low text-on-surface hover:bg-surface-container-high';
          const inp = cardTrue.querySelector('input');
          if (inp) inp.checked = false;
        }
        if (secSesuai) secSesuai.classList.add('hidden');
        if (secTidak) {
          secTidak.classList.remove('hidden');
          secTidak.classList.add('flex');
        }
        return;
      }

      // Rejection Reason Preset Chips
      if (
        lowerText.includes('barang tidak cocok') ||
        lowerText.includes('barang rusak parah') ||
        lowerText.includes('pelapor batal secara sukarela')
      ) {
        e.preventDefault();
        const textarea = el.querySelector('#rejection-textarea');
        if (textarea) {
          if (lowerText.includes('barang tidak cocok')) {
            textarea.value = 'Fisik barang yang dibawa penemu berbeda dengan model Sandisk 64GB di laporan TM-7F3P9X.';
          } else if (lowerText.includes('barang rusak parah')) {
            textarea.value = 'Barang rusak parah / hancur total sehingga nomor seri dan identitas fisik tidak dapat diidentifikasi sama sekali.';
          } else {
            textarea.value = 'Pelapor membatalkan serah terima secara sukarela karena barang ternyata telah diambil langsung.';
          }
        }
        return;
      }

      // Tolak Laporan & Batalkan Tiket
      if (lowerText.includes('tolak laporan & batalkan tiket') || lowerText.includes('tolak laporan')) {
        e.preventDefault();
        alert('Penyerahan Barang Ditolak!\n\nAlasan: Ketidaksesuaian fisik barang temuan.\nTiket drop-off TM-7F3P9X dibatalkan dan status antrean telah diperbarui.');
        if (onNavigate) onNavigate('satpam_antrean');
        return;
      }

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
      // Hubungi Pelapor
      if (lowerText.includes('hubungi pelapor')) {
        e.preventDefault();
        alert('Membuka Kontak WhatsApp Pelapor:\n\nNama: M. Alif Fadhlurrahman (FTI - Informatika)\nNomor WhatsApp: +62 812-9844-8910\nNomor Tiket: HL-88219');
        return;
      }

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
        (lowerText.startsWith('brg-') && !lowerText.includes('status matching')) ||
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
    return () => {
      active = false;
      el.removeEventListener('click', handleClick);
    };
  }, [onNavigate]);

  return (
    <div
      ref={containerRef}
      className="bg-surface font-body-md text-on-surface antialiased min-h-screen"
      dangerouslySetInnerHTML={{ __html: rawHTML }}
    />
  );
}
