import React, { useEffect, useLayoutEffect, useRef } from 'react';

// Layar Stitch Portal Satpam: Hasil Matching Algoritma (Read-only) - Portal Satpam UII
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto\"><div class=\"flex flex-col\"><div class=\"p-gutter pb-space-sm flex items-center gap-space-sm\"><div class=\"w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm\"><span class=\"material-symbols-outlined text-secondary-fixed\">verified_user</span></div><div class=\"flex flex-col min-w-0\"><span class=\"font-headline-sm text-headline-sm text-on-surface truncate tracking-tight\">Lost &amp; Found UII</span><span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">PORTAL SATPAM KAMPUS</span></div></div><div class=\"px-gutter py-space-xs\"><div class=\"h-px bg-surface-container-high w-full\"></div></div><div class=\"px-space-sm py-space-xs\"><span class=\"px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block\">Navigasi Utama</span></div><nav class=\"flex flex-col gap-1 px-space-sm\" data-active-classes=\"bg-primary text-on-primary font-label-lg shadow-sm\">\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">dashboard</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"penerimaan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">move_to_inbox</span>\n    <span>Penerimaan</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"barang\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">inventory_2</span>\n    <span>Barang</span>\n  </a>\n  <a class=\"flex items-center justify-between px-space-sm py-space-xs rounded-lg transition-colors bg-primary text-on-primary font-label-lg shadow-sm font-semibold cursor-pointer\" data-path=\"hasil-matching\" href=\"#\">\n    <div class=\"flex items-center gap-space-sm\">\n      <span class=\"material-symbols-outlined text-[20px]\">auto_awesome</span>\n      <span>Hasil Matching</span>\n    </div>\n    <span class=\"px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-bold font-label-sm text-label-sm\">AI</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"verifikasi\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Verifikasi</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"laporan-kehilangan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">receipt_long</span>\n    <span>Laporan Kehilangan</span>\n  </a>\n</nav></div><div class=\"p-space-sm flex flex-col gap-space-sm\"><div class=\"bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1\"><div class=\"flex items-center gap-2\"><span class=\"w-2.5 h-2.5 rounded-full bg-secondary animate-pulse\"></span><span class=\"font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider\">Pos Jaga Aktif</span></div><p class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Posko Induk GKU</p><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Shift Siang (07:00 - 15:30 WIB)</span></div><div class=\"px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\"><span class=\"flex items-center gap-1\"><span class=\"material-symbols-outlined text-[16px]\">contact_support</span> BSI Helpdesk: x102</span><span>v2.4.0</span></div></div><!-- Portal Publik Shortcut Button -->\n<div class=\"px-space-sm pt-2\">\n  <button data-path=\"portal-publik\" class=\"w-full py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">logout</span>\n    <span>Kembali ke Portal Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72\"><header class=\"fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter\"><div class=\"flex items-center gap-gutter flex-1 max-w-xl\"><div class=\"relative w-full\"><span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">search</span><input class=\"w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm transition-all\" placeholder=\"Cari nomor tiket TM- / HL- / nama barang...\" type=\"text\"/></div></div><div class=\"flex items-center gap-space-md shrink-0\"><div class=\"hidden xl:flex flex-col text-right\"><span class=\"font-label-lg text-label-lg text-on-surface\">Kamis, 24 Oktober 2024</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pukul 11:42 WIB</span></div><div class=\"hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\"><span class=\"material-symbols-outlined text-[16px]\">shield</span><span>Status Siaga 1</span></div><div class=\"h-8 w-px bg-surface-container-high hidden sm:block\"></div><div class=\"flex items-center gap-space-sm\"><div class=\"flex flex-col text-right hidden md:block\"><span class=\"font-label-lg text-label-lg text-on-surface truncate font-semibold\">Bripka Hendra Kurniawan</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Petugas Pos Jaga Induk GKU (SEC-042)</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors ml-1\" data-path=\"login\" href=\"#\" title=\"Keluar Portal\"><span class=\"material-symbols-outlined text-[20px]\">logout</span></a></div></div></header><main class=\"w-full pt-16 bg-surface min-h-screen px-gutter py-space-lg\"><div class=\"flex flex-col w-full gap-space-lg pb-space-xl\">\n<!-- Top Informational & Authority Notice (Strict System Autonomy) -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative overflow-hidden\">\n<div class=\"absolute left-0 top-0 bottom-0 w-1.5 bg-secondary\"></div>\n<div class=\"flex items-start gap-space-sm pl-2\">\n<div class=\"w-10 h-10 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[24px]\">smart_toy</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-headline-sm text-headline-sm text-on-surface\">Notifikasi WhatsApp Dikirim Otomatis oleh Sistem</span>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-wide\">Read-Only Satpam</span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface-variant max-w-4xl mt-0.5\">\n          Sistem AI Matching bekerja secara periodik setiap 15 menit mengkalkulasi kemiripan multi-parameter antara laporan kehilangan (HL-) dan barang fisik di brankas (BRG-). Pelapor yang mencapai batas skor kelayakan (\u226580%) akan menerima notifikasi resmi WhatsApp Gateway kampus secara otomatis tanpa intervensi petugas.\n        </p>\n</div>\n</div>\n<div class=\"flex items-center gap-space-sm shrink-0 self-end md:self-center pl-2 md:pl-0\">\n<div class=\"flex flex-col text-right\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Siklus Komputasi</span>\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1 justify-end\">\n<span class=\"w-2 h-2 rounded-full bg-secondary animate-ping\"></span>\n          Aktif Tiap 15 Menit\n        </span>\n</div>\n<div class=\"h-8 w-px bg-surface-container-high hidden sm:block\"></div>\n<div class=\"px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-secondary text-[18px]\">update</span>\n<span>Batch #149: 11:30 WIB</span>\n</div>\n</div>\n</div>\n<!-- KPI Metric Summary Strip -->\n<div class=\"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter\">\n<!-- Card 1: Total Pasangan -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between relative overflow-hidden group\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold\">Total Pasangan Teranalisis</span>\n<span class=\"w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface\">\n<span class=\"material-symbols-outlined text-[18px]\">hub</span>\n</span>\n</div>\n<div class=\"mt-space-md flex items-baseline justify-between\">\n<div>\n<span class=\"font-display text-display text-on-surface leading-none\">142</span>\n<span class=\"font-label-md text-label-md text-on-surface-variant ml-1\">Pasangan</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold bg-secondary-fixed/50 px-2 py-0.5 rounded-full\">+18 laporan baru</span>\n</div>\n<div class=\"mt-3 flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">memory</span>\n<span>Kalkulasi matriks 28 item vs 44 laporan aktif</span>\n</div>\n</div>\n<!-- Card 2: Lolos Ambang Batas -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between relative overflow-hidden group\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold\">Lolos Ambang Batas \u226580%</span>\n<span class=\"w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">task_alt</span>\n</span>\n</div>\n<div class=\"mt-space-md flex items-baseline justify-between\">\n<div>\n<span class=\"font-display text-display text-on-surface leading-none\">12</span>\n<span class=\"font-label-md text-label-md text-on-surface-variant ml-1\">Kandidat Kuat</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-primary bg-primary px-2 py-0.5 rounded-full font-semibold\">Prioritas Pos</span>\n</div>\n<div class=\"mt-3 flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[16px] text-primary\">verified</span>\n<span>Akurasi kemiripan tinggi (High-confidence)</span>\n</div>\n</div>\n<!-- Card 3: WhatsApp Otomatis Terkirim -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between relative overflow-hidden group\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold\">WA Otomatis Terkirim</span>\n<span class=\"w-8 h-8 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">mark_chat_read</span>\n</span>\n</div>\n<div class=\"mt-space-md flex items-baseline justify-between\">\n<div>\n<span class=\"font-display text-display text-on-surface leading-none\">9</span>\n<span class=\"font-label-md text-label-md text-on-surface-variant ml-1\">Terkirim Sukses</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-secondary-fixed font-semibold bg-secondary-fixed px-2 py-0.5 rounded-full\">3 Queue Rate-limit</span>\n</div>\n<div class=\"mt-3 flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">send_and_archive</span>\n<span>Gateway UII WhatsApp API Operasional</span>\n</div>\n</div>\n<!-- Card 4: Perlu Verifikasi Fisik -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between relative overflow-hidden group\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold\">Perlu Verifikasi Fisik</span>\n<span class=\"w-8 h-8 rounded-lg bg-surface-container-low text-on-surface flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">how_to_reg</span>\n</span>\n</div>\n<div class=\"mt-space-md flex items-baseline justify-between\">\n<div>\n<span class=\"font-display text-display text-on-surface leading-none\">3</span>\n<span class=\"font-label-md text-label-md text-on-surface-variant ml-1\">Pelapor Merespons</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface bg-surface-container-high px-2 py-0.5 rounded-full font-semibold\">Menuju Pos Induk</span>\n</div>\n<div class=\"mt-3 flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[16px] text-on-surface\">location_on</span>\n<span>Brankas Utama Posko GKU Lantai 1</span>\n</div>\n</div>\n</div>\n<!-- Filter, Search & Tabs Bar -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm\">\n<div class=\"flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm\">\n<!-- Primary Search Capsule -->\n<div class=\"relative flex-1 max-w-2xl\">\n<span class=\"material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">manage_search</span>\n<input class=\"w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all\" placeholder=\"Cari nomor HL- (contoh: HL-88219), Item ID (BRG-...), atau nama barang...\" type=\"text\" value=\"HL-88219\"/>\n<button class=\"absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1 rounded-md\">\n<span class=\"material-symbols-outlined text-[18px]\">clear</span>\n</button>\n</div>\n<!-- Filters Dropdowns -->\n<div class=\"flex flex-wrap items-center gap-space-xs\">\n<!-- Filter Skor -->\n<div class=\"relative\">\n<select class=\"h-11 pl-3 pr-8 rounded-xl bg-surface-container-low font-label-md text-label-md text-on-surface appearance-none focus:outline-none cursor-pointer\">\n<option>Semua Skor</option>\n<option selected=\"\">\u226580% Ambang Batas (Tinggi)</option>\n<option>60-79% Potensial</option>\n<option>&lt;60% Kurang Sesuai</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]\">expand_more</span>\n</div>\n<!-- Filter Status WhatsApp -->\n<div class=\"relative\">\n<select class=\"h-11 pl-3 pr-8 rounded-xl bg-surface-container-low font-label-md text-label-md text-on-surface appearance-none focus:outline-none cursor-pointer\">\n<option>Semua Status WA</option>\n<option>Terkirim (Delivered)</option>\n<option>Gagal (Failed)</option>\n<option>Dikirim Ulang (Retrying)</option>\n<option>Dibatasi 3 per hari</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]\">expand_more</span>\n</div>\n<!-- Filter Rentang Waktu -->\n<div class=\"relative\">\n<select class=\"h-11 pl-3 pr-8 rounded-xl bg-surface-container-low font-label-md text-label-md text-on-surface appearance-none focus:outline-none cursor-pointer\">\n<option>Hari Ini (24 Okt)</option>\n<option>3 Hari Terakhir</option>\n<option>Minggu Ini</option>\n<option>Semua Periode</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]\">calendar_month</span>\n</div>\n<!-- Refresh / Reset -->\n<button class=\"w-11 h-11 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors\" title=\"Muat Ulang Matriks AI\">\n<span class=\"material-symbols-outlined text-[20px]\">sync</span>\n</button>\n</div>\n</div>\n<!-- Quick Pill Tabs & Status Summary -->\n<div class=\"flex items-center justify-between pt-1 overflow-x-auto\">\n<div class=\"flex items-center gap-2\">\n<button class=\"px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors\">\n          Semua Hasil (12)\n        </button>\n<button class=\"px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-primary text-on-primary shadow-sm flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-[16px]\">verified</span>\n<span>Ambang Batas \u226580% (8)</span>\n</button>\n<button class=\"px-3.5 py-1.5 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors\">\n          Di Bawah Ambang Batas (4)\n        </button>\n</div>\n<div class=\"hidden md:flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm\">\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n<span>Ambang Batas AI Ditetapkan: <strong>Skor 80.0%</strong></span>\n</div>\n</div>\n</div>\n<!-- Main Content Mosaic: Table (Left/Center) + Detail Drawer (Right) -->\n<div class=\"grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start\">\n<!-- Left Table Panel: Dense, Read-Only, Highly Structured (7 Cols) -->\n<div class=\"xl:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col\">\n<div class=\"p-space-md flex items-center justify-between bg-surface-container-low/40\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-headline-sm text-headline-sm text-on-surface\">Daftar Pasangan Hasil Komputasi</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface\">8 Lolos Ambang Batas</span>\n</div>\n<div class=\"flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[16px]\">sort</span>\n<span>Diurutkan: Skor Tertinggi</span>\n</div>\n</div>\n<div class=\"overflow-x-auto\">\n<table class=\"w-full text-left border-collapse\">\n<thead>\n<tr class=\"bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider\">\n<th class=\"py-3 px-4 font-semibold\">Laporan Kehilangan</th>\n<th class=\"py-3 px-3 font-semibold\">Fisik Brankas</th>\n<th class=\"py-3 px-3 font-semibold w-36\">Total Skor</th>\n<th class=\"py-3 px-3 font-semibold w-40\">Parameter AI</th>\n<th class=\"py-3 px-3 font-semibold\">Status WA</th>\n<th class=\"py-3 px-3 font-semibold\">Waktu</th>\n<th class=\"py-3 px-4 text-right font-semibold\">Aksi</th>\n</tr>\n</thead>\n<tbody class=\"divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface\">\n<!-- Row 1: Selected / Active in Detail Drawer -->\n<tr class=\"bg-secondary-fixed/20 hover:bg-secondary-fixed/30 transition-colors\">\n<td class=\"py-3 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-primary flex items-center gap-1 font-label-md text-label-md\">\n                    HL-88219\n                    <span class=\"w-1.5 h-1.5 rounded-full bg-secondary\"></span>\n</span>\n<span class=\"font-label-md text-label-md text-on-surface truncate font-semibold\">Flashdisk Sandisk 64GB</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">Pelapor: M. Alif (FTI)</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-on-surface font-label-md text-label-md\">BRG-2024-0142</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm truncate\">Posko GKU - Rak B.04</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between font-label-md text-label-md font-semibold\">\n<span class=\"text-secondary\">94%</span>\n<span class=\"px-1.5 py-0.2 rounded bg-primary text-on-primary font-label-sm text-[10px]\">Tinggi</span>\n</div>\n<!-- Custom Progress with 80% Marker -->\n<div class=\"w-full h-2 bg-surface-container-high rounded-full relative overflow-hidden\">\n<div class=\"h-full bg-secondary rounded-full\" style=\"width: 94%;\"></div>\n<div class=\"absolute top-0 bottom-0 left-[80%] w-0.5 bg-on-surface\" title=\"Ambang Batas 80%\"></div>\n</div>\n<span class=\"font-label-sm text-[10px] text-on-surface-variant\">Ambang batas 80%</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Warna</span>\n<span class=\"font-semibold\">96%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 96%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Lokasi</span>\n<span class=\"font-semibold\">92%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 92%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Waktu</span>\n<span class=\"font-semibold\">95%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 95%\"></div>\n</div>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">done_all</span>\n<span>Terkirim</span>\n</span>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Hari ini</span>\n<span class=\"text-[11px] text-on-surface-variant\">11:21 WIB</span>\n</div>\n</td>\n<td class=\"py-3 px-4 text-right\">\n<button class=\"px-2.5 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center gap-1 ml-auto\">\n<span>Tinjau</span>\n<span class=\"material-symbols-outlined text-[14px]\">visibility</span>\n</button>\n</td>\n</tr>\n<!-- Row 2: Dompet Kulit -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-primary font-label-md text-label-md\">HL-88204</span>\n<span class=\"font-label-md text-label-md text-on-surface truncate font-semibold\">Dompet Kulit Braun Buffel</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">Pelapor: Dedi S. (FEB)</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-on-surface font-label-md text-label-md\">BRG-2024-0139</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm truncate\">Posko GKU - Brankas Utama</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between font-label-md text-label-md font-semibold\">\n<span class=\"text-secondary\">89%</span>\n<span class=\"px-1.5 py-0.2 rounded bg-primary text-on-primary font-label-sm text-[10px]\">Tinggi</span>\n</div>\n<div class=\"w-full h-2 bg-surface-container-high rounded-full relative overflow-hidden\">\n<div class=\"h-full bg-secondary rounded-full\" style=\"width: 89%;\"></div>\n<div class=\"absolute top-0 bottom-0 left-[80%] w-0.5 bg-on-surface\"></div>\n</div>\n<span class=\"font-label-sm text-[10px] text-on-surface-variant\">Ambang batas 80%</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Warna</span>\n<span class=\"font-semibold\">91%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 91%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Lokasi</span>\n<span class=\"font-semibold\">88%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 88%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Waktu</span>\n<span class=\"font-semibold\">90%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 90%\"></div>\n</div>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">done_all</span>\n<span>Terkirim</span>\n</span>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Hari ini</span>\n<span class=\"text-[11px] text-on-surface-variant\">10:45 WIB</span>\n</div>\n</td>\n<td class=\"py-3 px-4 text-right\">\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 ml-auto\">\n<span>Tinjau</span>\n<span class=\"material-symbols-outlined text-[14px]\">visibility</span>\n</button>\n</td>\n</tr>\n<!-- Row 3: Tumbler Hydroflask -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-primary font-label-md text-label-md\">HL-88195</span>\n<span class=\"font-label-md text-label-md text-on-surface truncate font-semibold\">Tumbler Hydro Flask Biru</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">Pelapor: Nabila A. (FPSB)</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-on-surface font-label-md text-label-md\">BRG-2024-0131</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm truncate\">Posko GKU - Rak B.02</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between font-label-md text-label-md font-semibold\">\n<span class=\"text-secondary\">85%</span>\n<span class=\"px-1.5 py-0.2 rounded bg-primary text-on-primary font-label-sm text-[10px]\">Tinggi</span>\n</div>\n<div class=\"w-full h-2 bg-surface-container-high rounded-full relative overflow-hidden\">\n<div class=\"h-full bg-secondary rounded-full\" style=\"width: 85%;\"></div>\n<div class=\"absolute top-0 bottom-0 left-[80%] w-0.5 bg-on-surface\"></div>\n</div>\n<span class=\"font-label-sm text-[10px] text-on-surface-variant\">Ambang batas 80%</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Warna</span>\n<span class=\"font-semibold\">95%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 95%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Lokasi</span>\n<span class=\"font-semibold\">82%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 82%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Waktu</span>\n<span class=\"font-semibold\">78%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 78%\"></div>\n</div>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">shield</span>\n<span>Dibatasi 3 per hari</span>\n</span>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Hari ini</span>\n<span class=\"text-[11px] text-on-surface-variant\">09:12 WIB</span>\n</div>\n</td>\n<td class=\"py-3 px-4 text-right\">\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 ml-auto\">\n<span>Tinjau</span>\n<span class=\"material-symbols-outlined text-[14px]\">visibility</span>\n</button>\n</td>\n</tr>\n<!-- Row 4: Kacamata Minus -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-primary font-label-md text-label-md\">HL-88172</span>\n<span class=\"font-label-md text-label-md text-on-surface truncate font-semibold\">Kacamata Frame Titanium</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">Pelapor: Sarah W. (FK)</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-on-surface font-label-md text-label-md\">BRG-2024-0128</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm truncate\">Posko GKU - Laci Khusus</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between font-label-md text-label-md font-semibold\">\n<span class=\"text-secondary\">82%</span>\n<span class=\"px-1.5 py-0.2 rounded bg-primary text-on-primary font-label-sm text-[10px]\">Tinggi</span>\n</div>\n<div class=\"w-full h-2 bg-surface-container-high rounded-full relative overflow-hidden\">\n<div class=\"h-full bg-secondary rounded-full\" style=\"width: 82%;\"></div>\n<div class=\"absolute top-0 bottom-0 left-[80%] w-0.5 bg-on-surface\"></div>\n</div>\n<span class=\"font-label-sm text-[10px] text-on-surface-variant\">Ambang batas 80%</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Warna</span>\n<span class=\"font-semibold\">88%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 88%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Lokasi</span>\n<span class=\"font-semibold\">80%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 80%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Waktu</span>\n<span class=\"font-semibold\">78%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 78%\"></div>\n</div>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">sync</span>\n<span>Dikirim ulang</span>\n</span>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Hari ini</span>\n<span class=\"text-[11px] text-on-surface-variant\">08:30 WIB</span>\n</div>\n</td>\n<td class=\"py-3 px-4 text-right\">\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 ml-auto\">\n<span>Tinjau</span>\n<span class=\"material-symbols-outlined text-[14px]\">visibility</span>\n</button>\n</td>\n</tr>\n<!-- Row 5: Powerbank Anker (Score < 80%) -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors opacity-80\">\n<td class=\"py-3 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-on-surface font-label-md text-label-md\">HL-88150</span>\n<span class=\"font-label-md text-label-md text-on-surface truncate font-semibold\">Powerbank Anker 10000mAh</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">Pelapor: Rizki M. (FTI)</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-on-surface font-label-md text-label-md\">BRG-2024-0115</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm truncate\">Posko GKU - Rak B.01</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between font-label-md text-label-md font-semibold\">\n<span class=\"text-on-surface-variant\">72%</span>\n<span class=\"px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-[10px]\">Di Bawah</span>\n</div>\n<div class=\"w-full h-2 bg-surface-container-high rounded-full relative overflow-hidden\">\n<div class=\"h-full bg-outline rounded-full\" style=\"width: 72%;\"></div>\n<div class=\"absolute top-0 bottom-0 left-[80%] w-0.5 bg-on-surface\"></div>\n</div>\n<span class=\"font-label-sm text-[10px] text-on-surface-variant\">Tidak auto-WA</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Warna</span>\n<span class=\"font-semibold\">75%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-outline\" style=\"width: 75%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Lokasi</span>\n<span class=\"font-semibold\">70%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-outline\" style=\"width: 70%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Waktu</span>\n<span class=\"font-semibold\">71%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-outline\" style=\"width: 71%\"></div>\n</div>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[14px]\">block</span>\n<span>Tertahan Skor</span>\n</span>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Kemarin</span>\n<span class=\"text-[11px] text-on-surface-variant\">16:40 WIB</span>\n</div>\n</td>\n<td class=\"py-3 px-4 text-right\">\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 ml-auto\">\n<span>Tinjau</span>\n<span class=\"material-symbols-outlined text-[14px]\">visibility</span>\n</button>\n</td>\n</tr>\n<!-- Row 6: Jaket Hoodie (Failed Delivery) -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-primary font-label-md text-label-md\">HL-88142</span>\n<span class=\"font-label-md text-label-md text-on-surface truncate font-semibold\">Jaket Parasut Erigo Hitam</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">Pelapor: Dimas P. (FTSP)</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-on-surface font-label-md text-label-md\">BRG-2024-0109</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm truncate\">Posko GKU - Gantungan A</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between font-label-md text-label-md font-semibold\">\n<span class=\"text-secondary\">86%</span>\n<span class=\"px-1.5 py-0.2 rounded bg-primary text-on-primary font-label-sm text-[10px]\">Tinggi</span>\n</div>\n<div class=\"w-full h-2 bg-surface-container-high rounded-full relative overflow-hidden\">\n<div class=\"h-full bg-secondary rounded-full\" style=\"width: 86%;\"></div>\n<div class=\"absolute top-0 bottom-0 left-[80%] w-0.5 bg-on-surface\"></div>\n</div>\n<span class=\"font-label-sm text-[10px] text-on-surface-variant\">Ambang batas 80%</span>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Warna</span>\n<span class=\"font-semibold\">94%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 94%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Lokasi</span>\n<span class=\"font-semibold\">80%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 80%\"></div>\n</div>\n<div class=\"flex items-center justify-between text-[10px] font-label-sm\">\n<span class=\"text-on-surface-variant\">Waktu</span>\n<span class=\"font-semibold\">84%</span>\n</div>\n<div class=\"w-full h-1 bg-surface-container-high rounded-full overflow-hidden\">\n<div class=\"h-full bg-secondary\" style=\"width: 84%\"></div>\n</div>\n</div>\n</td>\n<td class=\"py-3 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">error_outline</span>\n<span>Gagal</span>\n</span>\n</td>\n<td class=\"py-3 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Kemarin</span>\n<span class=\"text-[11px] text-on-surface-variant\">14:15 WIB</span>\n</div>\n</td>\n<td class=\"py-3 px-4 text-right\">\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 ml-auto\">\n<span>Tinjau</span>\n<span class=\"material-symbols-outlined text-[14px]\">visibility</span>\n</button>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Pagination and Density Info -->\n<div class=\"p-space-sm bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-xs font-label-sm text-label-sm text-on-surface-variant\">\n<span>Menampilkan 1-6 dari 12 pasangan komputasi batch aktif</span>\n<div class=\"flex items-center gap-1\">\n<button class=\"px-2 py-1 rounded bg-surface-container-highest text-on-surface disabled:opacity-40\" disabled=\"\">Sebelumnya</button>\n<span class=\"px-2 font-semibold text-on-surface\">1</span>\n<button class=\"px-2 py-1 rounded hover:bg-surface-container-highest text-on-surface\">2</button>\n<button class=\"px-2 py-1 rounded bg-surface-container-highest text-on-surface\">Selanjutnya</button>\n</div>\n</div>\n</div>\n<!-- Right Panel: Rich Read-Only Inspection Detail Drawer (5 Cols) -->\n<div class=\"xl:col-span-5 bg-surface-container-lowest rounded-xl shadow-md p-space-md flex flex-col gap-space-md relative overflow-hidden\">\n<!-- Top Drawer Header with Inspection Status -->\n<div class=\"flex items-start justify-between\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"px-2 py-0.5 rounded-md bg-secondary text-on-secondary font-label-sm text-label-sm uppercase font-semibold\">Inspeksi Pasangan</span>\n<span class=\"font-mono text-label-sm text-label-sm text-on-surface-variant\">HL-88219 \u2194 BRG-2024-0142</span>\n</div>\n<span class=\"font-headline-md text-headline-md text-on-surface mt-1 font-semibold\">Flashdisk Sandisk 64GB Merah-Hitam</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Tercatat di Brankas Posko Induk GKU (Rak B.04)</span>\n</div>\n<div class=\"w-8 h-8 rounded-lg bg-surface-container-low text-on-surface-variant flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[20px]\">fullscreen</span>\n</div>\n</div>\n<!-- Score Breakdown Header Hero -->\n<div class=\"p-space-md rounded-xl bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex items-center gap-space-sm\">\n<div class=\"relative w-14 h-14 flex items-center justify-center shrink-0\">\n<svg class=\"w-full h-full transform -rotate-90\" viewbox=\"0 0 36 36\">\n<path class=\"text-surface-container-high\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.5\"></path>\n<path class=\"text-secondary\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\" fill=\"none\" stroke=\"currentColor\" stroke-dasharray=\"94, 100\" stroke-linecap=\"round\" stroke-width=\"3.5\"></path>\n</svg>\n<span class=\"absolute font-headline-sm text-headline-sm font-bold text-on-surface\">94%</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1.5\">\n<span>Sangat Tinggi (Lolos \u226580%)</span>\n<span class=\"material-symbols-outlined text-secondary text-[18px]\">verified</span>\n</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Kecocokan multi-parameter mencapai ambang notifikasi</span>\n</div>\n</div>\n<span class=\"px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold shrink-0\">\n          Match Kuat\n        </span>\n</div>\n<!-- Photo Comparison Visuals -->\n<div class=\"grid grid-cols-2 gap-space-sm\">\n<div class=\"flex flex-col gap-1.5\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Bukti Pelapor (HL-)</span>\n<span class=\"font-mono text-label-sm text-[11px] text-on-surface-variant\">Foto Unggahan</span>\n</div>\n<div class=\"relative rounded-lg overflow-hidden h-32 bg-surface-container-high\">\n<img class=\"w-full h-full object-cover\" data-alt=\"Close-up photo of a black and red plastic Sandisk Cruzer Blade USB flash drive lying on a university lecture desk, soft natural morning classroom lighting, authentic student lost property item.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuBziaxT1mlReG-oJH04jO_m40_qQPMb58Yl4CIB3i-Svw8QcBMoqlxNxohuUKrIE_AGiRXPMOeUNGNoYb3AddWirH58T8Gs-oHi1jcNIN45hSSeC4FZ-Z9hQEEHU-WmO7XO42qn-R2YjQeQb6Ky8X8WjK7KKBIcsiv18fOx8p1Rg-FuEZWGcT21ei7WkSrjeTVOFNkBB8vYwWhVhGeovaa80EIEGl-iRUgMnz0vZVc\"/>\n<span class=\"absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-on-surface/80 text-surface text-[10px] font-mono\">Lampiran Pelapor</span>\n</div>\n</div>\n<div class=\"flex flex-col gap-1.5\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Fisik Brankas (BRG-)</span>\n<span class=\"font-mono text-label-sm text-[11px] text-on-surface-variant\">Foto Petugas Pos</span>\n</div>\n<div class=\"relative rounded-lg overflow-hidden h-32 bg-surface-container-high\">\n<img class=\"w-full h-full object-cover\" data-alt=\"High clarity inventory photograph of a 64GB red and black USB flash drive on a security guard log desk with campus custody tag BRG-2024-0142 visible in the corner.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuAonEYHSk2hayO58S5XdhwmLpF8tI6b2yFvsAsOsFmRuBi0Y8RxriETez822rj_ZGyx-TupWMzQJSfEQczmHYzzodzvjZhtcrPrjn9DI_avz6SY7L-ZC4c-RZXgDh6uVJcrMfkh0f8rKq-WSwxFLWycPC8FLoka-8_CVKll7XFABK48UnteRKp2cAklPv6b6c6bw9jJS5JAgQg-dDCIeHePZGnFj3ATS9WPjELH5BE\"/>\n<span class=\"absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-primary/90 text-on-primary text-[10px] font-mono\">Fisik Pos Induk</span>\n</div>\n</div>\n</div>\n<!-- Side-by-Side Parameter Matching Analysis -->\n<div class=\"flex flex-col gap-2\">\n<span class=\"font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold\">Komparasi Parameter Matriks</span>\n<div class=\"bg-surface-container-low rounded-xl p-space-sm flex flex-col divide-y divide-surface-container-high/60 font-body-sm text-body-sm\">\n<!-- Param 1: Kategori -->\n<div class=\"py-2 flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-medium\">Kategori Barang</span>\n<span class=\"text-on-surface font-semibold\">Elektronik &amp; Komputer</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<span class=\"text-on-surface-variant\">\u2194</span>\n<span class=\"text-on-surface font-semibold\">Elektronik &amp; Komputer</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-highest font-mono text-[11px] text-secondary font-semibold\">100%</span>\n</div>\n</div>\n<!-- Param 2: Warna -->\n<div class=\"py-2 flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-medium\">Kombinasi Warna</span>\n<span class=\"text-on-surface\">Merah-Hitam Doff</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<span class=\"text-on-surface-variant\">\u2194</span>\n<span class=\"text-on-surface\">Merah-Hitam Doff</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-highest font-mono text-[11px] text-secondary font-semibold\">96%</span>\n</div>\n</div>\n<!-- Param 3: Lokasi -->\n<div class=\"py-2 flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-medium\">Estimasi / Titik Ditemukan</span>\n<span class=\"text-on-surface\">GKU Lt.2 R.2.14</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<span class=\"text-on-surface-variant\">\u2194</span>\n<span class=\"text-on-surface\">GKU Lt.2 Selasar</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-highest font-mono text-[11px] text-secondary font-semibold\">92%</span>\n</div>\n</div>\n<!-- Param 4: Waktu -->\n<div class=\"py-2 flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-medium\">Rentang Waktu</span>\n<span class=\"text-on-surface\">24 Okt, 10:15 WIB</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<span class=\"text-on-surface-variant\">\u2194</span>\n<span class=\"text-on-surface\">24 Okt, 10:30 WIB</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-highest font-mono text-[11px] text-secondary font-semibold\">95%</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Secret Characteristic Verification -->\n<div class=\"p-space-sm rounded-xl bg-secondary-fixed/30 flex flex-col gap-1.5\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-secondary-fixed font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[16px]\">fingerprint</span>\n            Ciri Khusus / Deskripsi Rahasia Pelapor\n          </span>\n<span class=\"px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-[10px] font-semibold\">Validasi AI Cocok</span>\n</div>\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2 text-on-secondary-fixed font-body-sm text-body-sm mt-1\">\n<div class=\"bg-surface-container-lowest p-2 rounded-lg\">\n<span class=\"font-label-sm text-[11px] text-on-surface-variant block font-semibold\">Pernyataan Pelapor (HL):</span>\n<span class=\"text-on-surface\">\"Terdapat goresan inisial R di bodi belakang dekat konektor logam.\"</span>\n</div>\n<div class=\"bg-surface-container-lowest p-2 rounded-lg\">\n<span class=\"font-label-sm text-[11px] text-on-surface-variant block font-semibold\">Catatan Fisik Posko (BRG):</span>\n<span class=\"text-on-surface\">\"Goresan manual inisial huruf R terukir halus di bodi plastik.\"</span>\n</div>\n</div>\n</div>\n<!-- WhatsApp Gateway Automatic Dispatch Log (Strictly Read-Only) -->\n<div class=\"flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold\">Log WhatsApp Gateway Kampus (Automated)</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">done_all</span>\n            Status: DELIVERED\n          </span>\n</div>\n<div class=\"bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-2\">\n<div class=\"grid grid-cols-2 gap-2 font-label-sm text-label-sm pb-1\">\n<div>\n<span class=\"text-on-surface-variant block\">Waktu Dispatch Sistem:</span>\n<span class=\"text-on-surface font-semibold\">24 Okt 2024, 11:21:04 WIB</span>\n</div>\n<div>\n<span class=\"text-on-surface-variant block\">Nomor WhatsApp Pelapor:</span>\n<span class=\"text-on-surface font-semibold font-mono\">+62 812-9844-XXXX (M. Alif)</span>\n</div>\n</div>\n<!-- Message Bubble Preview -->\n<div class=\"bg-surface-container-lowest p- space-sm p-3 rounded-lg flex flex-col gap-1 relative\">\n<span class=\"font-label-sm text-[11px] text-secondary font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">chat</span>\n              Isi Notifikasi Resmi WhatsApp (UII Lost &amp; Found):\n            </span>\n<p class=\"font-body-sm text-body-sm text-on-surface italic bg-surface-container-low/50 p-2.5 rounded\">\n              \"Assalamu\u2019alaikum Sdr. M. Alif Fadhlurrahman. Sistem AI Lost &amp; Found Kampus UII mendeteksi barang temuan di Pos Jaga Induk GKU dengan tingkat kemiripan sangat tinggi (94%) terhadap laporan kehilangan Anda (HL-88219). Silakan mengunjungi Pos Jaga Induk GKU dengan membawa Kartu Tanda Mahasiswa (KTM) asli untuk proses verifikasi langsung.\"\n            </p>\n<div class=\"flex items-center justify-between pt-1 font-label-sm text-[11px] text-on-surface-variant\">\n<span>Gateway ID: MSG-UII-20241024-88219</span>\n<span class=\"flex items-center gap-1 text-on-surface font-semibold\">\n<span class=\"material-symbols-outlined text-secondary text-[14px]\">shield</span>\n                Kuota Rate-limit: 1 dari 3 terpakai\n              </span>\n</div>\n</div>\n</div>\n</div>\n<!-- Operational Guidance Banner (No Action Buttons - Strictly Read-Only) -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-high/80 flex items-center gap-space-sm text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[24px] text-on-surface shrink-0\">info</span>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Mode Read-Only Satpam Aktif</span>\n<span class=\"font-body-sm text-body-sm\">\n            Petugas tidak memiliki hak mengirim pesan manual. Apabila pelapor datang ke posko membawa KTM fisik, silakan beralih ke tab <strong>Verifikasi</strong> untuk serah terima barang.\n          </span>\n</div>\n</div>\n</div>\n</div>\n<!-- Bottom Technical & Audit Footnote -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">terminal</span>\n<span>\n        Sistem Algoritma Multi-Parameter v2.4 (Cosine Similarity + Geospatial Proximity + Temporal Decay). Semua log komputasi dan dispatch pesan tercatat di audit log server UII-SEC.\n      </span>\n</div>\n<div class=\"flex items-center gap-space-md shrink-0\">\n<span class=\"font-mono text-label-sm text-label-sm\">Host: node-ml-ai01.uii.ac.id</span>\n<span class=\"inline-flex items-center gap-1 text-on-surface font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n        API Gateway Aktif\n      </span>\n</div>\n</div>\n</div></main></div>";

export default function HasilMatchingAlgoritma({ onNavigate }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const main = el.querySelector('main');
    const table = main?.querySelector('table');
    const tbody = table?.querySelector('tbody');
    const templateRow = tbody?.querySelector('tr');
    const columnCount = table?.querySelectorAll('thead th').length || 7;
    const detailPanel = [...(main?.querySelectorAll('div') || [])].find(
      node => node.classList.contains('xl:col-span-5') && node.textContent.toLowerCase().includes('inspeksi pasangan')
    );
    if (!main || !table || !tbody || !detailPanel) return;

    let matches = [];
    let requestNumber = 0;

    const makeElement = (tag, className = '', text = '') => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text !== '') element.textContent = String(text);
      return element;
    };

    const formatDate = value => {
      const date = new Date(value);
      return Number.isNaN(date.getTime())
        ? '-'
        : new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
    };

    const scoreValue = value => {
      const number = Number(value);
      return Number.isFinite(number) ? Math.max(0, Math.min(100, number)) : 0;
    };

    const setSummaryCard = (oldLabel, newLabel, value, unit, helper) => {
      const label = [...main.querySelectorAll('span')].find(
        node => node.textContent.trim().toLowerCase() === oldLabel.toLowerCase()
          || node.textContent.trim().toLowerCase() === newLabel.toLowerCase()
      );
      if (!label) return;

      let card = label;
      while (card && !card.classList.contains('bg-surface-container-lowest')) {
        card = card.parentElement;
      }
      if (!card) return;

      label.textContent = newLabel;
      const valueNode = card.querySelector('.text-display');
      if (valueNode) {
        valueNode.textContent = String(value);
        const unitNode = valueNode.parentElement?.querySelectorAll('span')[1];
        if (unitNode) unitNode.textContent = unit;
      }

      const helperContainer = [...card.querySelectorAll('div')].find(
        node => node.classList.contains('mt-3') && node.querySelector('span')
      );
      if (helperContainer) {
        helperContainer.replaceChildren(
          makeElement('span', 'font-body-sm text-body-sm text-on-surface-variant', helper)
        );
      }
    };

    const setCopy = (oldText, newText) => {
      const node = [...main.querySelectorAll('*')].find(
        element => element.textContent.trim() === oldText
      );
      if (node) node.textContent = newText;
    };

    const updateSummary = payload => {
      const summary = payload.summary || {};
      const high = Number(summary.high) || 0;
      const medium = Number(summary.medium) || 0;
      const notified = Number(summary.notified) || 0;
      const evaluated = Number(payload.evaluated_pairs) || 0;

      setSummaryCard(
        'Total Pasangan Teranalisis',
        'Pasangan Dievaluasi',
        evaluated,
        'Pasangan',
        'Perbandingan item temuan dan laporan kehilangan aktif'
      );
      setSummaryCard(
        'Lolos Ambang Batas ≥80%',
        'Kandidat Skor ≥80%',
        high,
        'Kandidat',
        'Skor tinggi berdasarkan warna, lokasi, dan waktu'
      );
      setSummaryCard(
        'WA Otomatis Terkirim',
        'Notifikasi Terkirim',
        notified,
        'Notifikasi',
        'Status pengiriman yang tercatat pada hasil matching'
      );
      setSummaryCard(
        'Perlu Verifikasi Fisik',
        'Perlu Verifikasi Fisik',
        high + medium,
        'Kandidat',
        `${medium} kandidat berskor sedang; semua kandidat tetap perlu dicek fisik`
      );

      const resultCount = [...main.querySelectorAll('span')].find(
        node => node.dataset.matchTotalBadge === 'true' || /Lolos Ambang Batas/.test(node.textContent)
      );
      if (resultCount) {
        resultCount.dataset.matchTotalBadge = 'true';
        resultCount.textContent = `${payload.total || 0} kandidat`;
      }

      const allResultsButton = [...main.querySelectorAll('button')].find(
        button => button.textContent.includes('Semua Hasil (')
      );
      if (allResultsButton) allResultsButton.textContent = `Semua Hasil (${payload.total || 0})`;

      const highResultsButton = [...main.querySelectorAll('button')].find(
        button => button.textContent.includes('Ambang Batas ≥80%')
      );
      if (highResultsButton) {
        const label = [...highResultsButton.querySelectorAll('span')].find(
          node => node.textContent.includes('Ambang Batas')
        );
        if (label) label.textContent = `Ambang Batas ≥80% (${high})`;
      }

      const mediumResultsButton = [...main.querySelectorAll('button')].find(
        button => button.textContent.includes('Di Bawah Ambang Batas')
          || button.textContent.includes('Kandidat Sedang (')
      );
      if (mediumResultsButton) mediumResultsButton.textContent = `Kandidat Sedang (${medium})`;

      const searchInput = [...main.querySelectorAll('input')].find(
        input => input.value.includes('HL-88219') || input.placeholder.includes('HL-88219')
      );
      if (searchInput) {
        searchInput.value = '';
        searchInput.placeholder = 'Cari nomor laporan, ID barang, atau nama barang...';
      }

      setCopy(
        'Notifikasi WhatsApp Dikirim Otomatis oleh Sistem',
        'Kandidat matching dari database'
      );
      setCopy('Batch #149: 11:30 WIB', 'Dihitung saat halaman dibuka');
      setCopy('Aktif Tiap 15 Menit', 'Dihitung saat diminta');
      setCopy('+18 laporan baru', 'Data kandidat live');
      setCopy('Prioritas Pos', 'Kandidat skor tinggi');
      setCopy('3 Queue Rate-limit', 'Pengiriman belum tercatat');
      setCopy('Menuju Pos Induk', 'Perlu verifikasi fisik');
      setCopy('Semua Status WA', 'Semua Status Notifikasi');
      setCopy('60-79% Potensial', '50-79% Sedang');
      setCopy('<60% Kurang Sesuai', 'Rendah <50% (tidak ditampilkan)');
      setCopy('Host: node-ml-ai01.uii.ac.id', 'Sumber: database PostgreSQL');
      setCopy('API Gateway Aktif', 'Hasil matching aktual');
      setCopy(
        'Sistem Algoritma Multi-Parameter v2.4 (Cosine Similarity + Geospatial Proximity + Temporal Decay). Semua log komputasi dan dispatch pesan tercatat di audit log server UII-SEC.',
        'Algoritma memakai kategori, warna, lokasi, dan waktu. Kemiripan deskripsi hanya untuk prioritas urutan, bukan bagian skor.'
      );

      const explanation = [...main.querySelectorAll('p')].find(
        node => node.textContent.includes('Sistem AI Matching bekerja secara periodik setiap 15 menit')
      );
      if (explanation) {
        explanation.textContent = 'Sistem membandingkan barang berstatus Barang Ditemukan di tabel item dengan laporan aktif di lost_report. Kategori dan waktu menjadi filter; skor dihitung dari warna, lokasi, dan waktu. Prioritas deskripsi hanya mengurutkan kandidat. Semua hasil tetap perlu verifikasi fisik Satpam.';
      }

      const algorithmNote = [...main.querySelectorAll('p')].find(
        node => node.textContent.includes('Cosine Similarity + Geospatial Proximity')
      );
      if (algorithmNote) {
        algorithmNote.textContent = 'Algoritma multi-parameter: kategori, warna, lokasi, dan waktu. Kemiripan deskripsi hanya digunakan sebagai prioritas urutan, bukan bagian dari skor.';
      }

      const shownCount = [...main.querySelectorAll('*')].find(
        node => node.textContent.trim().startsWith('Menampilkan ')
          && (node.textContent.includes('pasangan komputasi batch aktif') || node.textContent.includes('kandidat'))
      );
      if (shownCount) {
        shownCount.textContent = `Menampilkan ${matches.length} dari ${payload.total || 0} kandidat`;
      }
    };

    const renderDetail = (match, emptyMessage = 'Pasangan akan tampil setelah barang di tabel item dapat dibandingkan dengan laporan kehilangan aktif.') => {
      detailPanel.replaceChildren();
      detailPanel.setAttribute('aria-live', 'polite');

      if (!match) {
        detailPanel.append(
          makeElement('span', 'px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant font-label-sm uppercase font-semibold', 'Inspeksi Pasangan'),
          makeElement('h2', 'font-headline-md text-headline-md text-on-surface font-semibold', 'Belum ada kandidat matching'),
          makeElement('p', 'font-body-sm text-body-sm text-on-surface-variant', emptyMessage)
        );
        return;
      }

      const score = scoreValue(match.final_score);
      const bandLabel = match.band === 'tinggi' ? 'Tinggi' : 'Sedang';
      const header = makeElement('div', 'flex flex-col gap-1');
      header.append(
        makeElement('span', 'px-2 py-0.5 rounded-md bg-secondary text-on-secondary font-label-sm uppercase font-semibold w-fit', 'Inspeksi Pasangan'),
        makeElement('span', 'font-mono text-label-sm text-on-surface-variant', `${match.lost_report_id} ↔ ${match.item_id}`),
        makeElement('h2', 'font-headline-md text-headline-md text-on-surface font-semibold', match.item_name || match.lost_item_name || 'Nama barang tidak tersedia')
      );

      const scoreCard = makeElement('div', 'p-space-md rounded-xl bg-surface-container-low flex items-center justify-between gap-4');
      const scoreInfo = makeElement('div', 'flex flex-col gap-1');
      scoreInfo.append(
        makeElement('span', 'font-label-sm text-label-sm text-on-surface-variant uppercase', 'Skor kecocokan'),
        makeElement('span', 'font-display text-display text-on-surface leading-none', `${score.toFixed(2)}%`)
      );
      scoreCard.append(
        scoreInfo,
        makeElement(
          'span',
          `px-2 py-1 rounded-md font-label-sm font-semibold ${match.band === 'tinggi' ? 'bg-primary text-on-primary' : 'bg-secondary-fixed text-on-secondary-fixed'}`,
          bandLabel
        )
      );

      const comparison = makeElement('div', 'grid grid-cols-1 gap-3');
      const addComparison = (title, id, name, color, location, date, rack = '') => {
        const card = makeElement('section', 'rounded-xl border border-outline-variant/30 p-3 flex flex-col gap-2');
        card.append(
          makeElement('span', 'font-label-sm text-label-sm uppercase text-on-surface-variant', title),
          makeElement('span', 'font-mono font-label-md text-label-md font-semibold text-primary', id),
          makeElement('span', 'font-label-md text-label-md font-semibold text-on-surface', name || 'Nama barang tidak tersedia')
        );

        const fields = [
          ['Kategori', match.category || '-'],
          ['Warna', color || '-'],
          ['Lokasi', location || '-'],
          ['Waktu', formatDate(date)]
        ];
        if (rack) fields.push(['Rak penyimpanan', rack]);

        fields.forEach(([label, value]) => {
          const field = makeElement('div', 'flex justify-between gap-3 text-label-sm');
          field.append(
            makeElement('span', 'text-on-surface-variant', label),
            makeElement('span', 'text-on-surface text-right', value)
          );
          card.append(field);
        });
        comparison.append(card);
      };

      addComparison(
        'Laporan kehilangan',
        match.lost_report_id,
        match.lost_item_name,
        match.lost_color,
        match.lost_location,
        match.lost_at
      );
      addComparison(
        'Barang temuan di inventaris',
        match.item_id,
        match.item_name,
        match.item_color,
        match.item_location,
        match.found_at,
        match.storage_rack
      );

      const scoreBreakdown = makeElement('div', 'flex flex-col gap-3');
      scoreBreakdown.append(
        makeElement('h3', 'font-label-md text-label-md font-semibold text-on-surface', 'Rincian skor')
      );
      [
        ['Warna', match.color_score],
        ['Lokasi', match.location_score],
        ['Waktu', match.time_score]
      ].forEach(([label, rawScore]) => {
        const value = scoreValue(rawScore);
        const row = makeElement('div', 'flex flex-col gap-1');
        const heading = makeElement('div', 'flex items-center justify-between font-label-sm text-label-sm');
        heading.append(
          makeElement('span', 'text-on-surface-variant', label),
          makeElement('span', 'font-semibold text-on-surface', `${value.toFixed(0)}%`)
        );
        const track = makeElement('div', 'w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden');
        const fill = makeElement('div', 'h-full bg-secondary rounded-full');
        fill.style.width = `${value}%`;
        track.append(fill);
        row.append(heading, track);
        scoreBreakdown.append(row);
      });

      const priority = Number(match.description_priority) || 0;
      const noticeStatus = match.notified ? 'Notifikasi sudah tercatat terkirim' : 'Notifikasi belum tercatat terkirim';
      const notes = makeElement('div', 'rounded-lg bg-surface-container-low p-3 flex flex-col gap-1');
      notes.append(
        makeElement('span', 'font-label-sm text-label-sm font-semibold text-on-surface', noticeStatus),
        makeElement('span', 'font-body-sm text-body-sm text-on-surface-variant', `Prioritas kemiripan deskripsi: ${(priority * 100).toFixed(0)}% (hanya untuk pengurutan).`)
      );

      detailPanel.replaceChildren(header, scoreCard, comparison, scoreBreakdown, notes);
    };

    const renderEmptyRow = message => {
      const row = makeElement('tr', '');
      const cell = makeElement('td', 'py-8 px-4 text-center text-on-surface-variant');
      cell.colSpan = columnCount;
      cell.textContent = message;
      row.append(cell);
      tbody.replaceChildren(row);
    };

    const renderScoreCell = (cell, match) => {
      const score = scoreValue(match.final_score);
      const wrapper = makeElement('div', 'flex flex-col gap-1');
      const heading = makeElement('div', 'flex items-center justify-between font-label-md text-label-md font-semibold');
      heading.append(
        makeElement('span', 'text-secondary', `${score.toFixed(1)}%`),
        makeElement(
          'span',
          `px-1.5 py-0.5 rounded font-label-sm text-[10px] ${match.band === 'tinggi' ? 'bg-primary text-on-primary' : 'bg-secondary-fixed text-on-secondary-fixed'}`,
          match.band === 'tinggi' ? 'Tinggi' : 'Sedang'
        )
      );
      const track = makeElement('div', 'w-full h-2 bg-surface-container-high rounded-full relative overflow-hidden');
      const fill = makeElement('div', 'h-full bg-secondary rounded-full');
      fill.style.width = `${score}%`;
      track.append(fill);
      wrapper.append(heading, track, makeElement('span', 'text-[10px] text-on-surface-variant', 'Kandidat ditampilkan mulai skor 50%'));
      cell.replaceChildren(wrapper);
    };

    const renderParameterCell = (cell, match) => {
      const wrapper = makeElement('div', 'flex flex-col gap-1 w-36');
      [
        ['Warna', match.color_score],
        ['Lokasi', match.location_score],
        ['Waktu', match.time_score]
      ].forEach(([label, rawScore]) => {
        const score = scoreValue(rawScore);
        const heading = makeElement('div', 'flex items-center justify-between text-[10px] font-label-sm');
        heading.append(
          makeElement('span', 'text-on-surface-variant', label),
          makeElement('span', 'font-semibold text-on-surface', `${score.toFixed(0)}%`)
        );
        const track = makeElement('div', 'w-full h-1 bg-surface-container-high rounded-full overflow-hidden');
        const fill = makeElement('div', 'h-full bg-secondary');
        fill.style.width = `${score}%`;
        track.append(fill);
        wrapper.append(heading, track);
      });
      cell.replaceChildren(wrapper);
    };

    const renderMatches = payload => {
      matches = Array.isArray(payload.data) ? payload.data : [];
      updateSummary(payload);

      if (matches.length === 0) {
        renderEmptyRow('Belum ada pasangan kandidat dari data item dan lost_report.');
        renderDetail(null);
        return;
      }

      const defaultCellClasses = [
        'py-3 px-4',
        'py-3 px-3',
        'py-3 px-3',
        'py-3 px-3',
        'py-3 px-3',
        'py-3 px-3',
        'py-3 px-4 text-right'
      ];
      const rows = matches.map((match, index) => {
        const row = makeElement('tr', '');
        for (let cellIndex = 0; cellIndex < columnCount; cellIndex++) {
          const cell = makeElement('td', templateRow?.cells[cellIndex]?.className || defaultCellClasses[cellIndex] || 'py-3 px-3');
          row.append(cell);
        }
        const cells = row.cells;
        const report = makeElement('div', 'flex flex-col');
        report.append(
          makeElement('span', 'font-mono font-semibold text-primary font-label-md text-label-md', match.lost_report_id),
          makeElement('span', 'font-label-md text-label-md text-on-surface truncate font-semibold', match.lost_item_name),
          makeElement('span', 'text-on-surface-variant font-label-sm text-label-sm', `Kategori: ${match.category}`)
        );
        cells[0].replaceChildren(report);

        const foundItem = makeElement('div', 'flex flex-col');
        foundItem.append(
          makeElement('span', 'font-mono font-semibold text-on-surface font-label-md text-label-md', match.item_id),
          makeElement('span', 'text-on-surface-variant font-label-sm text-label-sm truncate', match.item_name),
          makeElement('span', 'text-on-surface-variant font-label-sm text-label-sm truncate', `${match.item_location || '-'}${match.storage_rack ? ` · ${match.storage_rack}` : ''}`)
        );
        cells[1].replaceChildren(foundItem);
        renderScoreCell(cells[2], match);
        renderParameterCell(cells[3], match);

        const notification = makeElement(
          'span',
          `inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${match.notified ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container-high text-on-surface-variant'}`
        );
        notification.append(
          makeElement('span', 'material-symbols-outlined text-[14px]', match.notified ? 'done_all' : 'schedule'),
          makeElement('span', '', match.notified ? 'Terkirim' : 'Belum dikirim')
        );
        cells[4].replaceChildren(notification);

        const processedAt = makeElement('div', 'flex flex-col');
        processedAt.append(
          makeElement('span', 'font-label-sm text-label-sm text-on-surface font-semibold', 'Dihitung'),
          makeElement('span', 'text-[11px] text-on-surface-variant', formatDate(match.processed_at))
        );
        cells[5].replaceChildren(processedAt);

        const reviewButton = makeElement(
          'button',
          'px-2.5 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center gap-1 ml-auto',
          ''
        );
        reviewButton.type = 'button';
        reviewButton.dataset.matchIndex = String(index);
        reviewButton.append(
          makeElement('span', '', 'Tinjau'),
          makeElement('span', 'material-symbols-outlined text-[14px]', 'visibility')
        );
        cells[6].replaceChildren(reviewButton);

        row.dataset.matchIndex = String(index);
        row.className = index === 0
          ? 'bg-secondary-fixed/20 hover:bg-secondary-fixed/30 transition-colors'
          : 'hover:bg-surface-container-low transition-colors';
        return row;
      });

      tbody.replaceChildren(...rows);
      renderDetail(matches[0]);
    };

    const loadMatches = async () => {
      const currentRequest = ++requestNumber;
      matches = [];
      updateSummary({ total: 0, evaluated_pairs: 0, summary: {} });
      renderEmptyRow('Memuat hasil matching dari database...');
      renderDetail(null, 'Sedang mengambil data item dan laporan kehilangan aktif.');

      try {
        const response = await fetch('http://localhost:8080/v1/staff/matches?page=1&page_size=100');
        if (!response.ok) {
          throw new Error(`Permintaan hasil matching gagal (${response.status})`);
        }
        const payload = await response.json();
        const total = Number(payload.total) || 0;
        const allData = Array.isArray(payload.data) ? [...payload.data] : [];
        for (let page = 2; allData.length < total; page++) {
          const nextResponse = await fetch(`http://localhost:8080/v1/staff/matches?page=${page}&page_size=100`);
          if (!nextResponse.ok) {
            throw new Error(`Permintaan hasil matching halaman ${page} gagal (${nextResponse.status})`);
          }
          const nextPayload = await nextResponse.json();
          const nextData = Array.isArray(nextPayload.data) ? nextPayload.data : [];
          if (nextData.length === 0) {
            throw new Error(`Halaman ${page} tidak mengembalikan kandidat matching yang diharapkan`);
          }
          allData.push(...nextData);
        }
        payload.data = allData;
        if (currentRequest === requestNumber) renderMatches(payload);
      } catch (error) {
        if (currentRequest !== requestNumber) return;
        console.error('Gagal memuat hasil matching:', error);
        renderEmptyRow('Hasil matching gagal dimuat. Coba sinkronkan kembali.');
        renderDetail(null, 'Pastikan backend dan koneksi database aktif, lalu coba sinkronkan kembali.');
      }
    };

    const handleRefresh = () => loadMatches();
    const handleSelect = event => {
      const button = event.target.closest('button[data-match-index]');
      if (!button) return;
      event.preventDefault();
      const selectedMatch = matches[Number(button.dataset.matchIndex)];
      if (!selectedMatch) return;

      tbody.querySelectorAll('tr[data-match-index]').forEach(row => {
        const selected = row.dataset.matchIndex === button.dataset.matchIndex;
        row.className = selected
          ? 'bg-secondary-fixed/20 hover:bg-secondary-fixed/30 transition-colors'
          : 'hover:bg-surface-container-low transition-colors';
      });
      renderDetail(selectedMatch);
    };

    const notificationHeader = [...table.querySelectorAll('thead th')].find(
      node => node.textContent.trim().toLowerCase() === 'status wa'
    );
    if (notificationHeader) notificationHeader.textContent = 'NOTIFIKASI';

    const notificationFilter = [...main.querySelectorAll('select')].find(
      select => [...select.options].some(option => option.textContent.includes('Gagal (Failed)'))
    );
    if (notificationFilter) {
      const options = [
        ['Semua Status Notifikasi', 'all'],
        ['Terkirim', 'true'],
        ['Belum dikirim', 'false']
      ].map(([label, value]) => {
        const option = makeElement('option', '', label);
        option.value = value;
        return option;
      });
      notificationFilter.replaceChildren(...options);
      notificationFilter.value = 'all';
    }

    const dateFilter = [...main.querySelectorAll('select')].find(
      select => [...select.options].some(option => option.textContent.includes('Hari Ini (24 Okt)'))
    );
    if (dateFilter) {
      const option = makeElement('option', '', 'Semua Periode');
      option.value = 'all';
      dateFilter.replaceChildren(option);
      dateFilter.value = 'all';
    }

    const previousPageButton = [...main.querySelectorAll('button')].find(
      button => button.textContent.trim() === 'Sebelumnya'
    );
    if (previousPageButton?.parentElement) previousPageButton.parentElement.classList.add('hidden');

    tbody.addEventListener('click', handleSelect);
    el.addEventListener('staff-matches-refresh', handleRefresh);
    void loadMatches();

    return () => {
      requestNumber++;
      tbody.removeEventListener('click', handleSelect);
      el.removeEventListener('staff-matches-refresh', handleRefresh);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const handleClick = (e) => {
      const target = e.target.closest('a, button, [data-path], [data-action], tr, [role="button"], label');
      if (!target) return;

      const path = (target.getAttribute('data-path') || target.getAttribute('href') || '').trim();
      const action = (target.getAttribute('data-action') || '').trim();
      const title = (target.getAttribute('title') || '').toLowerCase();
      const buttonTitle = (target.closest('button')?.getAttribute('title') || title).toLowerCase();
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
      if (action === 'sync-data' || buttonTitle.includes('muat ulang matriks ai') || lowerText.includes('sinkronisasi data') || (lowerText.includes('sinkronisasi') && target.closest('button'))) {
        e.preventDefault();
        el.dispatchEvent(new CustomEvent('staff-matches-refresh'));
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
