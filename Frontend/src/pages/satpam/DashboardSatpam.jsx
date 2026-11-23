import React, { useLayoutEffect, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Layar Stitch Portal Satpam: Dashboard Petugas Satpam - Lost & Found Kampus UII
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto\"><div class=\"flex flex-col\"><div class=\"p-gutter pb-space-sm flex items-center gap-space-sm\"><div class=\"w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm\"><span class=\"material-symbols-outlined text-secondary-fixed\">verified_user</span></div><div class=\"flex flex-col min-w-0\"><span class=\"font-headline-sm text-headline-sm text-on-surface truncate tracking-tight\">Lost &amp; Found UII</span><span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">Portal Satpam Kampus</span></div></div><div class=\"px-gutter py-space-xs\"><div class=\"h-px bg-surface-container-high w-full\"></div></div><div class=\"px-space-sm py-space-xs\"><span class=\"px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block\">Navigasi Utama</span></div><nav class=\"flex flex-col gap-1 px-space-sm\" data-active-classes=\"bg-primary text-on-primary font-label-lg shadow-sm\">\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors bg-primary text-on-primary font-label-lg shadow-sm font-semibold cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">dashboard</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"penerimaan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">move_to_inbox</span>\n    <span>Penerimaan</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"barang\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">inventory_2</span>\n    <span>Barang</span>\n  </a>\n  <a class=\"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"hasil-matching\" href=\"#\">\n    <div class=\"flex items-center gap-space-sm\">\n      <span class=\"material-symbols-outlined text-[20px]\">auto_awesome</span>\n      <span>Hasil Matching</span>\n    </div>\n    <span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm\">AI</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"verifikasi\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Verifikasi</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"laporan-kehilangan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">receipt_long</span>\n    <span>Laporan Kehilangan</span>\n  </a>\n</nav></div><div class=\"p-space-sm flex flex-col gap-space-sm\"><div class=\"bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1\"><div class=\"flex items-center gap-2\"><span class=\"w-2.5 h-2.5 rounded-full bg-secondary animate-pulse\"></span><span class=\"font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider\">Pos Jaga Aktif</span></div><p class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Posko Induk GKU</p><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Shift Siang (07:00 - 15:30 WIB)</span></div><div class=\"px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\"><span class=\"flex items-center gap-1\"><span class=\"material-symbols-outlined text-[16px]\">contact_support</span> BSI Helpdesk: x102</span><span>v2.4.0</span></div></div><!-- Portal Publik Shortcut Button -->\n<div class=\"px-space-sm pt-2\">\n  <button data-path=\"portal-publik\" class=\"w-full py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">logout</span>\n    <span>Kembali ke Portal Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72\"><header class=\"fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter\"><div class=\"flex items-center gap-gutter flex-1 max-w-xl\"><div class=\"relative w-full\"><span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">search</span><input class=\"w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm transition-all\" placeholder=\"Cari nomor tiket TM- / HL- / nama barang...\" type=\"text\"/></div></div><div class=\"flex items-center gap-space-md shrink-0\"><div class=\"hidden xl:flex flex-col text-right\"><span class=\"font-label-lg text-label-lg text-on-surface\">Kamis, 24 Oktober 2024</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pukul 11:42 WIB</span></div><div class=\"hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\"><span class=\"material-symbols-outlined text-[16px]\">shield</span><span>Status Siaga 1</span></div><div class=\"h-8 w-px bg-surface-container-high hidden sm:block\"></div><div class=\"flex items-center gap-space-sm\"><div class=\"flex flex-col text-right hidden md:block\"><span class=\"font-label-lg text-label-lg text-on-surface truncate font-semibold\">Bripka Hendra Kurniawan</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Petugas Pos Jaga Induk GKU (SEC-042)</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors ml-1\" data-path=\"login\" href=\"#\" title=\"Keluar Portal\"><span class=\"material-symbols-outlined text-[20px]\">logout</span></a></div></div></header><main class=\"w-full pt-16 bg-surface min-h-screen px-gutter py-space-lg\"><div class=\"flex flex-col w-full gap-space-lg\">\n<!-- Operational Welcome & Primary Action Header -->\n<section class=\"bg-surface-container-lowest rounded-xl p-gutter shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-space-md\">\n<div class=\"flex flex-col gap-space-xs max-w-3xl\">\n<div class=\"flex flex-wrap items-center gap-space-xs\">\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight\">Selamat bertugas, Bripka Hendra</h1>\n<div class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n<span>Shift Siang (07.00 - 15.00 WIB) \u2022 Posko Induk GKU</span>\n</div>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface-variant\">\n        Ringkasan operasional dan prioritas penanganan barang inventaris Lost &amp; Found Kampus Terpadu UII hari ini.\n      </p>\n</div>\n<!-- Quick Action Control Cluster -->\n<div class=\"flex flex-wrap items-center gap-space-sm shrink-0\">\n<button class=\"inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:opacity-90 active:scale-95 transition-all\" type=\"button\">\n<span class=\"material-symbols-outlined text-[20px]\" style=\"font-variation-settings: 'FILL' 1;\">package_2</span>\n<span>+ Terima Barang Temuan</span>\n</button>\n<button class=\"inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high active:scale-95 transition-all\" type=\"button\">\n<span class=\"material-symbols-outlined text-[20px] text-secondary\">fact_check</span>\n<span>\u2713 Verifikasi Pengambilan</span>\n</button>\n<button class=\"w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-variant active:scale-95 transition-all\" title=\"Pindai QR Tiket Fisik\" type=\"button\">\n<span class=\"material-symbols-outlined text-[22px]\">qr_code_scanner</span>\n</button>\n</div>\n</section>\n<!-- Dense KPI Metrics Grid (4-Column Bento Overview) -->\n<section class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md\">\n<!-- KPI 1: Menunggu Penyerahan Fisik -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md text-on-surface-variant uppercase tracking-wider\">Menunggu Penyerahan</span>\n<div class=\"w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">schedule</span>\n</div>\n</div>\n<div>\n<div class=\"flex items-baseline gap-2\">\n<span class=\"font-display text-display text-on-surface tracking-tight font-bold\">7</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface-variant font-medium\">Laporan</span>\n</div>\n<div class=\"mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-error-container/60 text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">warning</span>\n<span>Batas terdekat: 01j 14m (TM-7F3P9X)</span>\n</div>\n</div>\n<div class=\"pt-2\">\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">Lapor daring \u2192 Wajib serah fisik 24 jam</p>\n</div>\n</div>\n<!-- KPI 2: Barang di Brankas Aman -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md text-on-surface-variant uppercase tracking-wider\">Barang di Brankas</span>\n<div class=\"w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\" style=\"font-variation-settings: 'FILL' 1;\">lock</span>\n</div>\n</div>\n<div>\n<div class=\"flex items-baseline gap-2\">\n<span class=\"font-display text-display text-on-surface tracking-tight font-bold\">43</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface-variant font-medium\">Barang</span>\n</div>\n<div class=\"mt-2 flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[15px] text-secondary\">inventory</span>\n<span>38 di Pos Induk, 5 di Pos Gerbang</span>\n</div>\n</div>\n<div class=\"pt-2\">\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">Kondisi brankas inventaris: Terkunci &amp; Tersegel</p>\n</div>\n</div>\n<!-- KPI 3: Proses Verifikasi -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md text-on-surface-variant uppercase tracking-wider\">Proses Verifikasi</span>\n<div class=\"w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">verified</span>\n</div>\n</div>\n<div>\n<div class=\"flex items-baseline gap-2\">\n<span class=\"font-display text-display text-on-surface tracking-tight font-bold\">5</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface-variant font-medium\">Klaim Aktif</span>\n</div>\n<div class=\"mt-2 flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm font-medium\">\n<span class=\"material-symbols-outlined text-[15px] text-secondary\">co_present</span>\n<span>2 jadwal tatap muka posko hari ini</span>\n</div>\n</div>\n<div class=\"pt-2\">\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">Mengharuskan cek fisik &amp; validasi KTM/KTP</p>\n</div>\n</div>\n<!-- KPI 4: Laporan Memiliki Kandidat AI -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md text-on-surface-variant uppercase tracking-wider\">Kandidat Matching AI</span>\n<div class=\"w-8 h-8 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">auto_awesome</span>\n</div>\n</div>\n<div>\n<div class=\"flex items-baseline gap-2\">\n<span class=\"font-display text-display text-on-surface tracking-tight font-bold\">12</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface-variant font-medium\">Kecocokan</span>\n</div>\n<div class=\"mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">psychology</span>\n<span>3 kecocokan akurasi tinggi (\u226585%)</span>\n</div>\n</div>\n<div class=\"pt-2\">\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">Sistem algoritma multi-parameter aktif</p>\n</div>\n</div>\n</section>\n<!-- Core Operations: Urgent Drop-off Intake vs. AI Match Candidates -->\n<section class=\"grid grid-cols-1 lg:grid-cols-12 gap-space-md\">\n<!-- Left Column: Segera Diterima (7 Cols) -->\n<div class=\"lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-md\">\n<div class=\"flex flex-col gap-space-xs\">\n<div class=\"flex flex-wrap items-center justify-between gap-2\">\n<div class=\"flex items-center gap-2\">\n<h2 class=\"font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight\">Segera Diterima di Pos</h2>\n<span class=\"px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n              Prioritas 24 Jam\n            </span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Batas Penyerahan Fisik</span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n          Tiket pelaporan temuan daring yang belum diserahkan fisiknya ke posko satpam.\n        </p>\n</div>\n<!-- Table Section -->\n<div class=\"overflow-x-auto\">\n<table class=\"w-full text-left\">\n<thead>\n<tr class=\"bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider\">\n<th class=\"py-2.5 px-3 rounded-l-lg\">Tiket &amp; Barang</th>\n<th class=\"py-2.5 px-3\">Penemu &amp; Lokasi</th>\n<th class=\"py-2.5 px-3\">Sisa Waktu</th>\n<th class=\"py-2.5 px-3 text-right rounded-r-lg\">Tindakan</th>\n</tr>\n</thead>\n<tbody class=\"divide-y divide-surface-container-low font-body-sm text-body-sm\">\n<!-- Row 1 (Critical Expiry) -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-secondary font-mono\">TM-7F3P9X</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Flashdisk Sandisk 64GB Merah</span>\n<span class=\"text-on-surface-variant font-body-sm text-body-sm\">Kategori: Elektronik / Aksesoris</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"text-on-surface font-medium\">Civitas Peduli (Anonim)</span>\n<span class=\"text-on-surface-variant flex items-center gap-1 font-body-sm text-body-sm\">\n<span class=\"material-symbols-outlined text-[14px]\">pin_drop</span> GKU Lt. 2 (R. 2.14)\n                  </span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-mono font-semibold text-label-sm\">\n<span class=\"material-symbols-outlined text-[13px] animate-pulse\">timer</span>\n<span data-countdown=\"4462\">01:14:22</span>\n</span>\n</td>\n<td class=\"py-3 px-3 text-right\">\n<button class=\"px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:opacity-90 active:scale-95 transition-all whitespace-nowrap\" type=\"button\">\n                  Input Penerimaan\n                </button>\n</td>\n</tr>\n<!-- Row 2 -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-secondary font-mono\">TM-9K2L1A</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Kunci Honda Vario (Gantungan Biru)</span>\n<span class=\"text-on-surface-variant font-body-sm text-body-sm\">Kategori: Kendaraan / Kunci</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"text-on-surface font-medium\">Rizky Pratama (Mhs FTI)</span>\n<span class=\"text-on-surface-variant flex items-center gap-1 font-body-sm text-body-sm\">\n<span class=\"material-symbols-outlined text-[14px]\">pin_drop</span> Parkir Timur Masjid\n                  </span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-mono font-semibold text-label-sm\">\n<span class=\"material-symbols-outlined text-[13px]\">timer</span>\n<span data-countdown=\"13510\">03:45:10</span>\n</span>\n</td>\n<td class=\"py-3 px-3 text-right\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant active:scale-95 transition-all whitespace-nowrap\" type=\"button\">\n                  Input Penerimaan\n                </button>\n</td>\n</tr>\n<!-- Row 3 -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-secondary font-mono\">TM-4B8W7C</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Dompet Lipat Hitam Eiger</span>\n<span class=\"text-on-surface-variant font-body-sm text-body-sm\">Kategori: Dompet / Identitas</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"text-on-surface font-medium\">Siti Aminah (Tendik FTSP)</span>\n<span class=\"text-on-surface-variant flex items-center gap-1 font-body-sm text-body-sm\">\n<span class=\"material-symbols-outlined text-[14px]\">pin_drop</span> Selasar FTSP\n                  </span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-mono font-semibold text-label-sm\">\n<span class=\"material-symbols-outlined text-[13px]\">timer</span>\n<span data-countdown=\"22800\">06:20:00</span>\n</span>\n</td>\n<td class=\"py-3 px-3 text-right\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant active:scale-95 transition-all whitespace-nowrap\" type=\"button\">\n                  Input Penerimaan\n                </button>\n</td>\n</tr>\n<!-- Row 4 -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-secondary font-mono\">TM-2M5P0E</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Botol Minum Corkcicle Hijau Sage</span>\n<span class=\"text-on-surface-variant font-body-sm text-body-sm\">Kategori: Botol Minum / Pribadi</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"text-on-surface font-medium\">Civitas Peduli (Anonim)</span>\n<span class=\"text-on-surface-variant flex items-center gap-1 font-body-sm text-body-sm\">\n<span class=\"material-symbols-outlined text-[14px]\">pin_drop</span> Perpustakaan Pusat Lt. 1\n                  </span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-mono font-semibold text-label-sm\">\n<span class=\"material-symbols-outlined text-[13px]\">timer</span>\n<span data-countdown=\"39940\">11:05:40</span>\n</span>\n</td>\n<td class=\"py-3 px-3 text-right\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant active:scale-95 transition-all whitespace-nowrap\" type=\"button\">\n                  Input Penerimaan\n                </button>\n</td>\n</tr>\n<!-- Row 5 -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-secondary font-mono\">TM-8X1Q4Z</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Kartu Mahasiswa (KTM) &amp; Flazz BCA</span>\n<span class=\"text-on-surface-variant font-body-sm text-body-sm\">Kategori: Kartu Identitas</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"text-on-surface font-medium\">Ahmad Fauzan (Mhs FEB)</span>\n<span class=\"text-on-surface-variant flex items-center gap-1 font-body-sm text-body-sm\">\n<span class=\"material-symbols-outlined text-[14px]\">pin_drop</span> Kantin Boulevard\n                  </span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-mono font-semibold text-label-sm\">\n<span class=\"material-symbols-outlined text-[13px]\">timer</span>\n<span data-countdown=\"52215\">14:30:15</span>\n</span>\n</td>\n<td class=\"py-3 px-3 text-right\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant active:scale-95 transition-all whitespace-nowrap\" type=\"button\">\n                  Input Penerimaan\n                </button>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Table Footer Action -->\n<div class=\"pt-2 flex flex-col sm:flex-row items-center justify-between gap-2\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">\n          Menampilkan 5 dari 7 laporan aktif kedaluwarsa 24 jam\n        </span>\n<a class=\"inline-flex items-center gap-1 text-secondary font-label-md text-label-md font-semibold hover:underline\" data-path=\"penerimaan\" href=\"#\">\n<span>Tinjau Seluruh Antrean Penerimaan</span>\n<span class=\"material-symbols-outlined text-[16px]\">arrow_forward</span>\n</a>\n</div>\n</div>\n<!-- Right Column: Matching Algorithm Results (5 Cols) -->\n<div class=\"lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-md\">\n<div class=\"flex flex-col gap-space-xs\">\n<div class=\"flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<h2 class=\"font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight\">Kecocokan Baru</h2>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px]\">smart_toy</span>\n<span>AI Match</span>\n</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-medium\">3 Teratas</span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n          Pasangan Laporan Kehilangan (HL-) &amp; Fisik Barang Temuan (TM-)\n        </p>\n</div>\n<!-- Match Cards Stream -->\n<div class=\"flex flex-col gap-space-sm\">\n<!-- Match 1: 94% -->\n<div class=\"bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-2 hover:bg-surface-container transition-colors\">\n<div class=\"flex items-center justify-between\">\n<span class=\"px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px] text-secondary-fixed\">auto_awesome</span>\n<span>94% Sangat Cocok</span>\n</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">Kecocokan 11:20 WIB</span>\n</div>\n<div class=\"grid grid-cols-2 gap-2 text-left bg-surface-container-lowest p-2.5 rounded-lg\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Laporan Hilang</span>\n<span class=\"font-label-md text-label-md text-secondary font-mono\">HL-88219</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Dompet Kulit Eiger</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant truncate\">M. Alif Fadhlurrahman</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Fisik di Brankas</span>\n<span class=\"font-label-md text-label-md text-on-surface font-mono\">BRG-0142</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Dompet Hitam + SIM C</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant truncate\">Pos Induk GKU (Rak 2A)</span>\n</div>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[15px] text-secondary\">check_circle</span>\n<span>Nama SIM C selaras pelapor, lokasi hilang di GKU</span>\n</p>\n<div class=\"flex items-center justify-end gap-2 pt-1\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors\" type=\"button\">\n              Tinjau Detail\n            </button>\n<button class=\"px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1 hover:opacity-90 transition-opacity\" type=\"button\">\n<span class=\"material-symbols-outlined text-[14px]\">chat</span>\n<span>Panggil WhatsApp</span>\n</button>\n</div>\n</div>\n<!-- Match 2: 88% -->\n<div class=\"bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-2 hover:bg-surface-container transition-colors\">\n<div class=\"flex items-center justify-between\">\n<span class=\"px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">auto_awesome</span>\n<span>88% Cocok</span>\n</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">Kecocokan 09:45 WIB</span>\n</div>\n<div class=\"grid grid-cols-2 gap-2 text-left bg-surface-container-lowest p-2.5 rounded-lg\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Laporan Hilang</span>\n<span class=\"font-label-md text-label-md text-secondary font-mono\">HL-88204</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Kunci Motor Honda Beat</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant truncate\">Gantungan pita biru</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Fisik di Brankas</span>\n<span class=\"font-label-md text-label-md text-on-surface font-mono\">BRG-0139</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Kunci Honda Remote</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant truncate\">Pos Parkir Timur</span>\n</div>\n</div>\n<div class=\"flex items-center justify-end gap-2 pt-1\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors\" type=\"button\">\n              Tinjau Detail\n            </button>\n<button class=\"px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1 hover:opacity-90 transition-opacity\" type=\"button\">\n<span class=\"material-symbols-outlined text-[14px]\">chat</span>\n<span>Panggil WhatsApp</span>\n</button>\n</div>\n</div>\n<!-- Match 3: 78% -->\n<div class=\"bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-2 hover:bg-surface-container transition-colors\">\n<div class=\"flex items-center justify-between\">\n<span class=\"px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">sync_alt</span>\n<span>78% Potensial</span>\n</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">Kecocokan 08:12 WIB</span>\n</div>\n<div class=\"grid grid-cols-2 gap-2 text-left bg-surface-container-lowest p-2.5 rounded-lg\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Laporan Hilang</span>\n<span class=\"font-label-md text-label-md text-secondary font-mono\">HL-88195</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Laptop Asus Vivobook</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant truncate\">Warna Silver 14\"</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Fisik di Brankas</span>\n<span class=\"font-label-md text-label-md text-on-surface font-mono\">BRG-0131</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Laptop Asus Abu-abu</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant truncate\">Pos Induk GKU (Rak 1B)</span>\n</div>\n</div>\n<div class=\"flex items-center justify-end gap-2 pt-1\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors\" type=\"button\">\n              Tinjau Detail\n            </button>\n</div>\n</div>\n</div>\n<!-- Right Panel Footer -->\n<div class=\"pt-2 flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">12 total kecocokan terdeteksi</span>\n<a class=\"inline-flex items-center gap-1 text-secondary font-label-md text-label-md font-semibold hover:underline\" data-path=\"hasil-matching\" href=\"#\">\n<span>Lihat Semua 12 Hasil Matching</span>\n<span class=\"material-symbols-outlined text-[16px]\">arrow_forward</span>\n</a>\n</div>\n</div>\n</section>\n<!-- Realtime Activity Log & Security Audit Strip -->\n<section class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm\">\n<div class=\"flex flex-wrap items-center justify-between gap-2\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-2.5 h-2.5 rounded-full bg-secondary\"></div>\n<h3 class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Log Aktivitas Operasional Pos Jaga</h3>\n</div>\n<div class=\"inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[15px]\">security</span>\n<span>Semua aksi tercatat di audit log terenkripsi</span>\n</div>\n</div>\n<!-- Timeline list -->\n<div class=\"grid grid-cols-1 md:grid-cols-3 gap-space-sm\">\n<div class=\"bg-surface-container-low rounded-lg p-space-sm flex items-start gap-space-xs\">\n<span class=\"font-label-sm text-label-sm font-mono text-secondary px-2 py-0.5 rounded bg-surface-container shrink-0\">14:15 WIB</span>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Penerimaan Fisik Terverifikasi</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Bripka Hendra menerima Flashdisk Sandisk dari pelapor TM-6N8B2X (BAST #089 terbit).</span>\n</div>\n</div>\n<div class=\"bg-surface-container-low rounded-lg p-space-sm flex items-start gap-space-xs\">\n<span class=\"font-label-sm text-label-sm font-mono text-secondary px-2 py-0.5 rounded bg-surface-container shrink-0\">13:40 WIB</span>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Penyerahan ke Pemilik Sah</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Barang BRG-0128 diserahkan ke NIM 21523xxx, diverifikasi oleh Aipda Sugeng.</span>\n</div>\n</div>\n<div class=\"bg-surface-container-low rounded-lg p-space-sm flex items-start gap-space-xs\">\n<span class=\"font-label-sm text-label-sm font-mono text-secondary px-2 py-0.5 rounded bg-surface-container shrink-0\">11:20 WIB</span>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Matching Otomatis Sistem</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Algoritma mengidentifikasi kecocokan 94% antara HL-88219 dengan BRG-0142.</span>\n</div>\n</div>\n</div>\n</section>\n</div>\n<script>\n  (function () {\n    const countdownElements = document.querySelectorAll('[data-countdown]');\n\n    function formatTime(seconds) {\n      const h = Math.floor(seconds / 3600).toString().padStart(2, '0');\n      const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');\n      const s = Math.floor(seconds % 60).toString().padStart(2, '0');\n      return `${h}:${m}:${s}`;\n    }\n\n    setInterval(() => {\n      countdownElements.forEach((el) => {\n        let currentSeconds = parseInt(el.getAttribute('data-countdown'), 10);\n        if (currentSeconds > 0) {\n          currentSeconds -= 1;\n          el.setAttribute('data-countdown', currentSeconds);\n          el.textContent = formatTime(currentSeconds);\n        }\n      });\n    }, 1000);\n  })();\n</script></main></div>";

export default function DashboardSatpam({ onNavigate, onSatpamLogout }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const controller = new AbortController();
    let active = true;
    let countdownInterval;

    const createElement = (tag, className = '', text = '') => {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (text) node.textContent = text;
      return node;
    };

    const findPanel = (heading) => {
      const title = Array.from(el.querySelectorAll('main h2, main h3'))
        .find((node) => node.textContent.trim() === heading);
      let panel = title;
      while (panel && !panel.classList.contains('bg-surface-container-lowest')) {
        panel = panel.parentElement;
      }
      return panel;
    };

    const summarySection = Array.from(el.querySelectorAll('main section.grid'))
      .find((section) => section.children.length === 4
        && section.textContent.toLowerCase().includes('menunggu penyerahan'));
    const metricCards = summarySection ? Array.from(summarySection.children) : [];
    const pendingPanel = findPanel('Segera Diterima di Pos');
    const matchingPanel = findPanel('Kecocokan Baru');
    const activityPanel = findPanel('Log Aktivitas Operasional Pos Jaga');
    const pendingBody = pendingPanel?.querySelector('tbody');
    const pendingFooterText = pendingPanel?.children[2]?.children[0];
    const matchingList = matchingPanel?.children[1];
    const matchingFooter = matchingPanel?.children[2];
    const activityList = activityPanel?.children[1];

    const updateMetric = (index, { value, label, detail, note }) => {
      const card = metricCards[index];
      if (!card) return;
      const valueNode = card.querySelector('.font-display');
      const labelNode = card.querySelector('.font-headline-sm');
      const detailRow = card.querySelector('div.mt-2');
      const detailNode = detailRow?.querySelector('span:last-child');
      const noteNode = card.querySelector('p.font-body-sm');
      if (valueNode) valueNode.textContent = value;
      if (labelNode) labelNode.textContent = label;
      if (detailNode) detailNode.textContent = detail;
      if (noteNode) noteNode.textContent = note;
    };

    const showTableMessage = (message) => {
      if (!pendingBody) return;
      const row = createElement('tr');
      const cell = createElement('td', 'px-4 py-8 text-center text-on-surface-variant', message);
      cell.colSpan = 4;
      row.appendChild(cell);
      pendingBody.replaceChildren(row);
    };

    const showListMessage = (container, message) => {
      if (!container) return;
      container.replaceChildren(createElement(
        'p',
        'py-6 text-center text-body-sm text-on-surface-variant',
        message,
      ));
    };

    const formatCountdown = (expiresAt) => {
      const remaining = Date.parse(expiresAt) - Date.now();
      if (!Number.isFinite(remaining)) return 'Waktu tidak tersedia';
      if (remaining <= 0) return 'Kedaluwarsa';
      const seconds = Math.floor(remaining / 1000);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secondPart = seconds % 60;
      if (hours >= 24) {
        return `${Math.floor(hours / 24)}h ${hours % 24}j ${minutes}m`;
      }
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondPart).padStart(2, '0')}`;
    };

    const formatDateTime = (value) => {
      const date = new Date(value);
      return Number.isNaN(date.getTime())
        ? 'Waktu tidak tersedia'
        : new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
    };

    const updateCountdowns = () => {
      el.querySelectorAll('[data-dashboard-expires-at]').forEach((node) => {
        node.textContent = formatCountdown(node.dataset.dashboardExpiresAt);
      });
    };

    const renderMetricsLoading = () => {
      metricCards.forEach((_, index) => updateMetric(index, {
        value: '—',
        label: ['Laporan', 'Barang', 'Item', 'Kecocokan'][index],
        detail: 'Memuat data database...',
        note: '',
      }));
    };

    const leafNodes = Array.from(el.querySelectorAll('*'))
      .filter((node) => node.children.length === 0);
    leafNodes.forEach((node) => {
      const text = node.textContent.trim();
      if (text.includes('Bripka Hendra')) node.textContent = 'Petugas Satpam';
      else if (text.includes('SEC-042')) node.textContent = 'Akun Petugas';
      else if (text.includes('Shift Siang')) node.textContent = 'Informasi shift tidak tersedia';
      else if (text.includes('Posko Induk GKU')) node.textContent = 'Lokasi pos belum tersedia';
      else if (text === 'Status Siaga 1') node.textContent = 'Portal Satpam';
      else if (text === 'Pos Jaga Aktif') node.textContent = 'Lokasi Pos';
      else if (text.includes('Ringkasan operasional dan prioritas penanganan')) {
        node.textContent = 'Ringkasan laporan, inventaris, dan hasil matching yang tersedia di database.';
      } else if (text.includes('Semua aksi tercatat di audit log terenkripsi')) {
        node.textContent = 'Aktivitas terbaru dari layanan audit';
      }
    });
    const dateNode = leafNodes.find((node) => /^\D+, \d{1,2} \D+ \d{4}$/.test(node.textContent.trim()));
    const timeNode = leafNodes.find((node) => node.textContent.trim().startsWith('Pukul '));
    if (dateNode) {
      dateNode.textContent = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta',
      }).format(new Date());
    }
    if (timeNode) {
      timeNode.textContent = `Pukul ${new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
      }).format(new Date())} WIB`;
    }
    const greeting = el.querySelector('main h1');
    if (greeting) greeting.textContent = 'Dashboard Petugas Satpam';

    renderMetricsLoading();
    showTableMessage('Memuat antrean dari database...');
    showListMessage(matchingList, 'Memuat hasil matching dari database...');
    showListMessage(activityList, 'Memuat aktivitas dari layanan audit...');

    const fetchJSON = async (path) => {
      const response = await fetch(`${API_BASE_URL}${path}`, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    };

    const readListResult = (result, label) => {
      if (result.status === 'rejected') {
        console.error(`Gagal memuat ${label}:`, result.reason);
        return null;
      }
      if (!Array.isArray(result.value?.data)) {
        console.error(`Respons ${label} tidak memiliki daftar data yang valid.`);
        return null;
      }
      return result.value;
    };

    const renderQueue = (reports, optionsPayload) => {
      if (!pendingBody) return;
      pendingBody.replaceChildren();
      if (reports.length === 0) {
        showTableMessage('Tidak ada laporan temuan yang menunggu penyerahan.');
      } else {
        const categories = new Map((optionsPayload?.categories || [])
          .map((category) => [String(category.category_id), category.name]));
        const locations = new Map((optionsPayload?.locations || [])
          .map((location) => [String(location.location_id), location.name]));

        reports.slice(0, 5).forEach((report) => {
          const row = createElement('tr', 'border-b border-outline-variant/20');
          const ticketCell = createElement('td', 'py-3 px-3');
          const ticketInfo = createElement('div', 'flex flex-col');
          ticketInfo.append(
            createElement('span', 'font-label-md text-label-md text-secondary font-mono', report.report_id || 'ID tidak tersedia'),
            createElement('span', 'font-label-md text-label-md text-on-surface font-semibold', report.item_name || 'Nama barang tidak tersedia'),
            createElement(
              'span',
              'text-on-surface-variant font-body-sm text-body-sm',
              `Kategori: ${categories.get(String(report.category_id)) || `Kategori ID ${report.category_id ?? '-'}`}`,
            ),
          );
          ticketCell.appendChild(ticketInfo);

          const finderCell = createElement('td', 'py-3 px-3');
          const finderInfo = createElement('div', 'flex flex-col');
          finderInfo.appendChild(createElement(
            'span',
            'text-on-surface font-medium',
            report.finder_name || 'Pelapor tidak diketahui',
          ));
          const location = createElement('span', 'text-on-surface-variant flex items-center gap-1 font-body-sm text-body-sm');
          location.appendChild(createElement('span', 'material-symbols-outlined text-[14px]', 'pin_drop'));
          location.appendChild(document.createTextNode(
            ` ${locations.get(String(report.location_id)) || `Lokasi ID ${report.location_id ?? '-'}`}`,
          ));
          finderInfo.appendChild(location);
          finderCell.appendChild(finderInfo);

          const timeCell = createElement('td', 'py-3 px-3');
          const expiry = createElement(
            'span',
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-mono font-semibold text-label-sm',
          );
          expiry.appendChild(createElement('span', 'material-symbols-outlined text-[13px] animate-pulse', 'timer'));
          const countdown = createElement('span', '', formatCountdown(report.expires_at));
          countdown.dataset.dashboardExpiresAt = report.expires_at || '';
          expiry.appendChild(countdown);
          timeCell.appendChild(expiry);

          const actionCell = createElement('td', 'py-3 px-3 text-right');
          const action = createElement(
            'button',
            'px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:opacity-90 active:scale-95 transition-all whitespace-nowrap',
            'Lihat antrean',
          );
          action.type = 'button';
          action.dataset.dashboardPath = 'satpam_antrean';
          actionCell.appendChild(action);
          row.append(ticketCell, finderCell, timeCell, actionCell);
          pendingBody.appendChild(row);
        });
      }

      if (pendingFooterText) {
        const shown = Math.min(5, reports.length);
        pendingFooterText.textContent = `${optionsPayload ? '' : 'Nama kategori/lokasi belum tersedia. '}Menampilkan ${shown} dari ${reports.length} laporan menunggu penyerahan.`;
      }
      updateCountdowns();
    };

    const renderMatches = (payload) => {
      const matches = payload.data;
      const total = Number(payload.total ?? matches.length);
      const evaluated = Number(payload.evaluated_pairs ?? total);
      const summary = payload.summary || {};
      const high = Number(summary.high) || 0;
      updateMetric(3, {
        value: Number.isFinite(total) ? total.toLocaleString('id-ID') : '—',
        label: 'Kecocokan',
        detail: `${high.toLocaleString('id-ID')} skor tinggi`,
        note: `${evaluated.toLocaleString('id-ID')} pasangan laporan dan barang telah dievaluasi.`,
      });

      const badge = matchingPanel?.querySelector('h2')?.nextElementSibling;
      if (badge) badge.textContent = `${Math.min(3, matches.length)} kandidat`;
      const topCount = badge?.parentElement?.nextElementSibling;
      if (topCount) topCount.textContent = `Top ${Math.min(3, matches.length)}`;
      if (matchingList) {
        matchingList.replaceChildren();
        if (matches.length === 0) {
          showListMessage(matchingList, 'Belum ada kandidat matching dari data yang tersedia.');
        } else {
          matches.slice(0, 3).forEach((match) => {
            const card = createElement('article', 'p-3 rounded-lg border border-outline-variant/30 bg-surface-container-low');
            const topLine = createElement('div', 'flex items-center justify-between gap-2');
            topLine.append(
              createElement('span', 'font-label-sm text-label-sm font-mono text-on-surface-variant', `${match.lost_report_id || 'Laporan'} ↔ ${match.item_id || 'Barang'}`),
              createElement('span', 'font-label-md text-label-md font-bold text-primary', `${Math.round(Number(match.final_score) || 0)}% · ${match.band || 'Belum dinilai'}`),
            );
            const names = createElement(
              'p',
              'mt-2 font-body-md text-body-md font-semibold text-on-surface',
              `${match.lost_item_name || 'Barang hilang'} ↔ ${match.item_name || 'Barang temuan'}`,
            );
            const details = createElement(
              'p',
              'mt-1 font-body-sm text-body-sm text-on-surface-variant',
              `${match.item_location || match.lost_location || 'Lokasi tidak tersedia'} · ${match.storage_rack || 'Lokasi penyimpanan tidak tersedia'}`,
            );
            const status = createElement(
              'p',
              'mt-2 font-label-sm text-label-sm text-on-surface-variant',
              match.notified ? 'Notifikasi sudah dikirim' : 'Belum ada notifikasi terkirim',
            );
            card.append(topLine, names, details, status);
            matchingList.appendChild(card);
          });
        }
      }

      const footerText = matchingFooter?.children[0];
      if (footerText) {
        footerText.textContent = `${total.toLocaleString('id-ID')} kandidat dari ${evaluated.toLocaleString('id-ID')} pasangan dievaluasi`;
      }
      const footerAction = matchingFooter?.querySelector('a, button');
      if (footerAction) {
        footerAction.dataset.dashboardPath = 'satpam_matching';
        footerAction.textContent = 'Lihat semua hasil matching';
      }
    };

    const renderActivity = (logs) => {
      if (!activityList) return;
      activityList.replaceChildren();
      if (logs.length === 0) {
        showListMessage(activityList, 'Belum ada aktivitas yang tercatat pada layanan audit.');
        return;
      }

      const actionLabels = {
        receive_found: 'Barang temuan diterima',
        start_verify: 'Verifikasi dimulai',
        reject_claim: 'Klaim ditolak',
        handover: 'Serah terima barang',
      };
      logs.slice(0, 3).forEach((log) => {
        const card = createElement('article', 'p-3 rounded-lg bg-surface-container-low');
        card.append(
          createElement('p', 'font-label-md text-label-md font-semibold text-on-surface', actionLabels[log.action] || String(log.action || 'Aktivitas').replaceAll('_', ' ')),
          createElement('p', 'mt-1 font-body-sm text-body-sm text-on-surface-variant', `${log.target_id || 'Target tidak tersedia'} · ${log.actor || 'Petugas tidak diketahui'}`),
          createElement('p', 'mt-2 font-label-sm text-label-sm text-on-surface-variant', formatDateTime(log.created_at)),
        );
        activityList.appendChild(card);
      });
    };

    const loadDashboardData = async () => {
      const results = await Promise.allSettled([
        fetchJSON('/v1/staff/found-reports/pending'),
        fetchJSON('/v1/staff/items'),
        fetchJSON('/v1/staff/matches?page=1&page_size=100'),
        fetchJSON('/v1/staff/audit-logs'),
        fetchJSON('/v1/public/meta/form-options'),
      ]);
      if (!active) return;

      const pendingPayload = readListResult(results[0], 'antrean penerimaan');
      const inventoryPayload = readListResult(results[1], 'inventaris');
      const matchingPayload = readListResult(results[2], 'hasil matching');
      const auditPayload = readListResult(results[3], 'aktivitas audit');
      let optionsPayload = null;
      if (results[4].status === 'rejected') {
        console.error('Gagal memuat opsi lokasi dan kategori:', results[4].reason);
      } else if (Array.isArray(results[4].value?.categories) && Array.isArray(results[4].value?.locations)) {
        optionsPayload = results[4].value;
      } else {
        console.error('Respons opsi lokasi dan kategori tidak valid.');
      }

      if (pendingPayload) {
        const reports = pendingPayload.data;
        const stats = pendingPayload.stats || {};
        const pendingTotal = Number(stats.pending_total ?? pendingPayload.total ?? reports.length);
        const expiringSoon = stats.expiring_soon == null
          ? reports.filter((report) => {
            const expiresAt = Date.parse(report.expires_at);
            return Number.isFinite(expiresAt) && expiresAt > Date.now() && expiresAt <= Date.now() + 3 * 60 * 60 * 1000;
          }).length
          : Number(stats.expiring_soon);
        const nearest = reports
          .filter((report) => Number.isFinite(Date.parse(report.expires_at)))
          .sort((a, b) => Date.parse(a.expires_at) - Date.parse(b.expires_at))[0];
        updateMetric(0, {
          value: Number.isFinite(pendingTotal) ? pendingTotal.toLocaleString('id-ID') : '—',
          label: 'Laporan',
          detail: `${expiringSoon.toLocaleString('id-ID')} segera kedaluwarsa`,
          note: nearest
            ? `Batas terdekat: ${formatCountdown(nearest.expires_at)} (${nearest.report_id})`
            : 'Tidak ada laporan yang menunggu penyerahan.',
        });
        renderQueue(reports, optionsPayload);
      } else {
        updateMetric(0, { value: '—', label: 'Laporan', detail: 'Gagal memuat antrean', note: 'Periksa koneksi backend lalu muat ulang halaman.' });
        showTableMessage('Antrean gagal dimuat dari server.');
        if (pendingFooterText) pendingFooterText.textContent = 'Data antrean tidak tersedia.';
      }

      if (inventoryPayload) {
        const items = inventoryPayload.data;
        const activeItems = items.filter((item) => (
          ['barang ditemukan', 'proses verifikasi'].includes(item.status?.toLowerCase())
        )).length;
        const verificationItems = items.filter((item) => item.status?.toLowerCase() === 'proses verifikasi').length;
        updateMetric(1, {
          value: activeItems.toLocaleString('id-ID'),
          label: 'Barang',
          detail: `${items.length.toLocaleString('id-ID')} total inventaris`,
          note: 'Jumlah item aktif berstatus Barang Ditemukan atau Proses Verifikasi.',
        });
        updateMetric(2, {
          value: verificationItems.toLocaleString('id-ID'),
          label: 'Item',
          detail: 'Proses Verifikasi',
          note: 'Jumlah barang yang sedang melalui proses verifikasi.',
        });
      } else {
        updateMetric(1, { value: '—', label: 'Barang', detail: 'Gagal memuat inventaris', note: 'Data barang tidak tersedia.' });
        updateMetric(2, { value: '—', label: 'Item', detail: 'Gagal memuat inventaris', note: 'Status verifikasi tidak tersedia.' });
      }

      if (matchingPayload) renderMatches(matchingPayload);
      else {
        updateMetric(3, { value: '—', label: 'Kecocokan', detail: 'Gagal memuat matching', note: 'Data matching tidak tersedia.' });
        showListMessage(matchingList, 'Hasil matching gagal dimuat dari server.');
        const footerText = matchingFooter?.children[0];
        if (footerText) footerText.textContent = 'Hasil matching tidak tersedia.';
      }

      if (auditPayload) renderActivity(auditPayload.data);
      else showListMessage(activityList, 'Aktivitas audit gagal dimuat dari server.');
    };

    void loadDashboardData();
    countdownInterval = window.setInterval(updateCountdowns, 1000);

    const handleClick = (e) => {
      const target = e.target.closest('a, button, [data-path], [data-action], tr, [role="button"], label');
      if (!target) return;

      const dashboardPath = target.getAttribute('data-dashboard-path');
      if (dashboardPath) {
        e.preventDefault();
        if (onNavigate) onNavigate(dashboardPath);
        return;
      }

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
        if (path === 'logout' || title.includes('keluar portal') || title.includes('logout petugas')) {
          if (onSatpamLogout) onSatpamLogout();
          else if (onNavigate) onNavigate('satpam_login');
        } else if (onNavigate) {
          onNavigate('landing');
        }
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
    return () => {
      active = false;
      controller.abort();
      if (countdownInterval) window.clearInterval(countdownInterval);
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
