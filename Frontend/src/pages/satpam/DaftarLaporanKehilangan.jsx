import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Satpam: Daftar & Detail Laporan Kehilangan - Portal Satpam UII
const rawHTML = "<aside class=\"fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none\"><div class=\"flex flex-col\"><div class=\"h-16 px-6 flex items-center gap-3 bg-surface-container-low\"><div class=\"w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm\"><span class=\"material-symbols-outlined text-[20px]\">local_police</span></div><div><span class=\"font-headline-sm text-headline-sm text-on-surface block leading-tight tracking-tight\">SATPAM UII</span><span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">Pos Induk GKU</span></div></div><div class=\"px-4 py-4\"><p class=\"px-3 pb-2 font-label-sm text-label-sm uppercase tracking-wider text-outline\">Menu Operasional</p><nav class=\"flex flex-col gap-1 px-space-sm\" data-active-classes=\"bg-primary text-on-primary font-label-lg shadow-sm\">\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">dashboard</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"penerimaan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">move_to_inbox</span>\n    <span>Penerimaan</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"barang\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">inventory_2</span>\n    <span>Barang</span>\n  </a>\n  <a class=\"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"hasil-matching\" href=\"#\">\n    <div class=\"flex items-center gap-space-sm\">\n      <span class=\"material-symbols-outlined text-[20px]\">auto_awesome</span>\n      <span>Hasil Matching</span>\n    </div>\n    <span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm\">AI</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"verifikasi\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Verifikasi</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors bg-primary text-on-primary font-label-lg shadow-sm font-semibold cursor-pointer\" data-path=\"laporan-kehilangan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">receipt_long</span>\n    <span>Laporan Kehilangan</span>\n  </a>\n</nav></div></div><div class=\"p-4 flex flex-col gap-3\"><div class=\"p-3.5 rounded-xl bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.03)]\"><div class=\"flex items-center gap-2 mb-1.5\"><span class=\"w-2 h-2 rounded-full bg-secondary animate-pulse\"></span><span class=\"font-label-sm text-label-sm text-on-surface uppercase font-bold tracking-wide\">Pos Jaga Aktif</span></div><p class=\"font-label-sm text-label-sm text-on-surface-variant font-medium leading-relaxed\">Posko Induk GKU<br/><span class=\"text-outline\">Shift Siang 07:00 - 15:30 WIB</span></p><div class=\"mt-2 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\"><span>BSI Helpdesk</span><span class=\"font-semibold text-secondary\">Ext 102</span></div></div><div class=\"flex items-center justify-between px-1 text-outline font-label-sm text-label-sm\"><span>Kampus Terpadu UII</span><span>v2.4.0</span></div></div><!-- Portal Publik Shortcut Button -->\n<div class=\"px-space-sm pt-2\">\n  <button data-path=\"portal-publik\" class=\"w-full py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">logout</span>\n    <span>Kembali ke Portal Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72\"><header class=\"fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-6\"><div class=\"h-16 w-full flex items-center justify-between gap-4\"> <div class=\"flex items-center gap-4 flex-1 max-w-xl\"><div class=\"flex items-center gap-2.5\"><span class=\"px-2.5 py-1 rounded-md bg-primary-container text-on-primary-fixed font-label-sm text-label-sm tracking-wider uppercase font-bold\">L&amp;F UII</span><span class=\"font-headline-sm text-headline-sm text-on-surface hidden xl:inline\">Portal Satpam Kampus</span></div><div class=\"relative flex-1\"><span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]\">search</span><input class=\"w-full pl-9 pr-4 py-1.5 rounded-full bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all\" placeholder=\"Cari nomor tiket, barang temuan, pelapor...\" type=\"text\"/></div></div><div class=\"flex items-center gap-4 shrink-0\"><div class=\"hidden 2xl:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[16px] text-secondary\">schedule</span><span>Kamis, 24 Oktober 2024 - Pukul 11:42 WIB</span></div><div class=\"flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\"><span class=\"w-2 h-2 rounded-full bg-secondary\"></span><span>Status Siaga 1</span></div><div class=\"flex items-center gap-3 pl-2\"><div class=\"text-right hidden lg:block\"><p class=\"font-label-md text-label-md text-on-surface font-semibold leading-tight\">Bripka Hendra Kurniawan</p><p class=\"font-label-sm text-label-sm text-outline\">Petugas Pos Jaga Induk GKU (SEC-042)</p></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><button class=\"w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-error hover:bg-error-container transition-all\" title=\"Logout Petugas\"><span class=\"material-symbols-outlined text-[20px]\">logout</span></button></div></div></div></header><main class=\"w-full pt-16 bg-background min-h-screen\"><div class=\"flex flex-col w-full\">\n<!-- Interactive Script for Filtering, Row Selection, and Modal States -->\n<script>\n    function toggleCloseTicketModal(show) {\n      const modal = document.getElementById('modal-tutup-laporan');\n      if (modal) {\n        if (show) {\n          modal.classList.remove('hidden');\n          modal.classList.add('flex');\n        } else {\n          modal.classList.add('hidden');\n          modal.classList.remove('flex');\n        }\n      }\n    }\n\n    function selectReportRow(rowElement, ticketId) {\n      document.querySelectorAll('.report-table-row').forEach(el => {\n        el.classList.remove('bg-surface-container-high', 'shadow-sm');\n        el.classList.add('hover:bg-surface-container-low');\n      });\n      rowElement.classList.add('bg-surface-container-high', 'shadow-sm');\n      rowElement.classList.remove('hover:bg-surface-container-low');\n    }\n  </script>\n<!-- Page Header & Action Bar -->\n<div class=\"px-8 pt-6 pb-4 flex flex-col gap-1\">\n<div class=\"flex items-center justify-between flex-wrap gap-4\">\n<div>\n<div class=\"flex items-center gap-2 mb-1\">\n<span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider\">Modul Pengaduan</span>\n<span class=\"w-1.5 h-1.5 rounded-full bg-outline-variant\"></span>\n<span class=\"font-label-sm text-label-sm text-outline font-medium\">Satpam Posko GKU</span>\n</div>\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight\">Laporan Kehilangan Civitas (Lost Reports)</h1>\n<p class=\"font-body-md text-body-md text-on-surface-variant mt-0.5\">Daftar tiket laporan kehilangan barang yang diajukan oleh mahasiswa, dosen, dan staf kampus terintegrasi dengan kalkulasi AI matching brankas.</p>\n</div>\n<div class=\"flex items-center gap-2.5\">\n<button class=\"flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-sm transition-all font-label-md text-label-md\" data-action=\"sync-data\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">sync</span>\n<span>Sinkronisasi Data</span>\n</button>\n<button class=\"flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary shadow-sm hover:opacity-90 transition-all font-label-md text-label-md\">\n<span class=\"material-symbols-outlined text-[18px]\">add_box</span>\n<span>Input Tiket Manual</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Metric Summary Bento Cards -->\n<div class=\"px-8 pb-5\">\n<div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4\">\n<!-- Stat 1: Total Aktif -->\n<div class=\"p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-start justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold\">Total Laporan Aktif</span>\n<span class=\"font-display text-display text-on-surface mt-1 leading-none\">44</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-medium mt-2 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">notifications_active</span> Memerlukan atensi sistem\n          </span>\n</div>\n<div class=\"w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface\">\n<span class=\"material-symbols-outlined text-[22px]\">pending_actions</span>\n</div>\n</div>\n<!-- Stat 2: Kandidat Kuat -->\n<div class=\"p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-start justify-between relative overflow-hidden\">\n<div class=\"absolute right-0 top-0 bottom-0 w-1 bg-secondary\"></div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold\">Kandidat Kuat (\u226580%)</span>\n<span class=\"font-display text-display text-on-surface mt-1 leading-none\">12</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant mt-2 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px] text-secondary\">mark_chat_read</span> Notifikasi WA terkirim otomatis\n          </span>\n</div>\n<div class=\"w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[22px]\">auto_awesome</span>\n</div>\n</div>\n<!-- Stat 3: Selesai / Terklaim -->\n<div class=\"p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-start justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold\">Selesai / Terklaim</span>\n<span class=\"font-display text-display text-on-surface mt-1 leading-none\">186</span>\n<span class=\"font-label-sm text-label-sm text-outline font-medium mt-2 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">task_alt</span> Berita Acara (BAST) terbit\n          </span>\n</div>\n<div class=\"w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface\">\n<span class=\"material-symbols-outlined text-[22px]\">verified</span>\n</div>\n</div>\n<!-- Stat 4: Ditutup / Kadaluwarsa -->\n<div class=\"p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-start justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold\">Ditutup / Kedaluwarsa</span>\n<span class=\"font-display text-display text-on-surface mt-1 leading-none\">31</span>\n<span class=\"font-label-sm text-label-sm text-outline font-medium mt-2 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">history_toggle_off</span> &gt;90 hari tanpa klaim / dibatalkan\n          </span>\n</div>\n<div class=\"w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-outline\">\n<span class=\"material-symbols-outlined text-[22px]\">archive</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Filters Toolbar -->\n<div class=\"px-8 pb-4\">\n<div class=\"p-3 bg-surface-container-lowest rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-3\">\n<!-- Search Input -->\n<div class=\"relative flex-1 min-w-[280px]\">\n<span class=\"material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]\">search</span>\n<input class=\"w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all\" placeholder=\"Cari nomor tiket HL-, nama pelapor, atau kata kunci barang...\" type=\"text\"/>\n</div>\n<!-- Quick Select Dropdowns -->\n<div class=\"flex items-center gap-2 flex-wrap\">\n<div class=\"flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-surface-container transition-colors\">\n<span class=\"text-outline\">Status:</span>\n<span class=\"font-semibold text-on-surface\">Semua Status (44)</span>\n<span class=\"material-symbols-outlined text-[16px] text-outline\">expand_more</span>\n</div>\n<div class=\"flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-surface-container transition-colors\">\n<span class=\"text-outline\">Kategori:</span>\n<span class=\"font-semibold text-on-surface\">Semua Kategori</span>\n<span class=\"material-symbols-outlined text-[16px] text-outline\">expand_more</span>\n</div>\n<div class=\"flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-surface-container transition-colors\">\n<span class=\"material-symbols-outlined text-[16px] text-outline\">calendar_today</span>\n<span class=\"font-semibold text-on-surface\">7 Hari Terakhir</span>\n<span class=\"material-symbols-outlined text-[16px] text-outline\">expand_more</span>\n</div>\n<button class=\"p-2 rounded-lg bg-surface-container-low text-outline hover:text-on-surface hover:bg-surface-container transition-colors\" title=\"Reset filter\">\n<span class=\"material-symbols-outlined text-[18px]\">filter_alt_off</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Main Content: Dense 2-Column Split Workspace -->\n<div class=\"px-8 pb-8 flex-1\">\n<div class=\"grid grid-cols-12 gap-6 items-start\">\n<!-- LEFT SECTION: Daftar Tabel Laporan Kehilangan (60% width on Desktop, Col 1-7) -->\n<div class=\"col-span-12 xl:col-span-7 flex flex-col gap-3\">\n<div class=\"bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col\">\n<!-- Table Header Meta -->\n<div class=\"px-5 py-3.5 bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-headline-sm text-headline-sm text-on-surface\">Antrean Tiket Terlapor</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold\">44 Item</span>\n</div>\n<div class=\"flex items-center gap-3 font-label-sm text-label-sm text-outline\">\n<span class=\"flex items-center gap-1\"><span class=\"w-2 h-2 rounded-full bg-secondary\"></span> Prioritas AI</span>\n<span>\u2022</span>\n<span>Diperbarui otomatis</span>\n</div>\n</div>\n<!-- Table Content -->\n<div class=\"overflow-x-auto\">\n<table class=\"w-full text-left border-collapse\">\n<thead>\n<tr class=\"bg-surface-container-low/50 text-outline font-label-sm text-label-sm uppercase tracking-wider\">\n<th class=\"py-3 px-4 font-semibold\">Tiket &amp; Pelapor</th>\n<th class=\"py-3 px-3 font-semibold\">Barang Terlapor</th>\n<th class=\"py-3 px-3 font-semibold\">Lokasi Hilang</th>\n<th class=\"py-3 px-3 font-semibold\">Waktu</th>\n<th class=\"py-3 px-3 font-semibold\">Status Tiket</th>\n<th class=\"py-3 px-4 text-right font-semibold\">Aksi</th>\n</tr>\n</thead>\n<tbody class=\"divide-y-0 text-on-surface\">\n<!-- ROW 1: CURRENTLY SELECTED (HL-88219) -->\n<tr class=\"report-table-row bg-surface-container-high cursor-pointer transition-all\" onclick=\"selectReportRow(this, 'HL-88219')\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"px-1.5 py-0.5 rounded bg-primary text-on-primary font-mono font-bold text-label-sm\">HL-88219</span>\n<span class=\"material-symbols-outlined text-secondary text-[16px]\" title=\"Kandidat brankas tersedia\">stars</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold mt-1\">M. Alif Fadhlorrahman</span>\n<span class=\"font-label-sm text-label-sm text-outline\">FTI \u2022 ****1842</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium line-clamp-1\">Flashdisk Sandisk 64GB</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-medium\">Elektronik</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant line-clamp-1\">Lab Komputer 3.2 GKU</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Lt. 2</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-medium whitespace-nowrap\">24 Okt, 10:15</span>\n<span class=\"font-label-sm text-label-sm text-secondary\">1 jam lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold whitespace-nowrap shadow-sm\">\n<span class=\"material-symbols-outlined text-[13px]\">auto_awesome</span>\n<span>Kandidat (94%)</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<button class=\"px-2.5 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:opacity-90 transition-all whitespace-nowrap\">\n                      Detail\n                    </button>\n</td>\n</tr>\n<!-- ROW 2: HL-88204 -->\n<tr class=\"report-table-row hover:bg-surface-container-low cursor-pointer transition-all\" onclick=\"selectReportRow(this, 'HL-88204')\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold text-label-sm text-on-surface\">HL-88204</span>\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">stars</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold mt-1\">Siti Nurhaliza</span>\n<span class=\"font-label-sm text-label-sm text-outline\">FEB \u2022 ****9921</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium line-clamp-1\">Dompet Lipat Charles &amp; Keith</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Dompet &amp; Tas</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant line-clamp-1\">Kantin Boulevard Selatan</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Meja 14</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-medium whitespace-nowrap\">24 Okt, 08:30</span>\n<span class=\"font-label-sm text-label-sm text-outline\">3 jam lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold whitespace-nowrap\">\n<span class=\"material-symbols-outlined text-[13px]\">auto_awesome</span>\n<span>Kandidat (89%)</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-all whitespace-nowrap\">\n                      Detail\n                    </button>\n</td>\n</tr>\n<!-- ROW 3: HL-88195 -->\n<tr class=\"report-table-row hover:bg-surface-container-low cursor-pointer transition-all\" onclick=\"selectReportRow(this, 'HL-88195')\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold text-label-sm text-on-surface w-max\">HL-88195</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold mt-1\">Dimas Bagus Prasetyo</span>\n<span class=\"font-label-sm text-label-sm text-outline\">FPSB \u2022 ****3314</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium line-clamp-1\">Kunci Motor Honda Beat + Gantungan UII</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Kunci &amp; Aksesoris</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant line-clamp-1\">Parkiran Barat GKU</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Sektor B-02</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-medium whitespace-nowrap\">23 Okt, 16:40</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Kemarin</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold whitespace-nowrap\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-outline\"></span>\n<span>Aktif - Mencari</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-all whitespace-nowrap\">\n                      Detail\n                    </button>\n</td>\n</tr>\n<!-- ROW 4: HL-88172 -->\n<tr class=\"report-table-row hover:bg-surface-container-low cursor-pointer transition-all\" onclick=\"selectReportRow(this, 'HL-88172')\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container font-mono font-bold text-label-sm text-on-surface w-max\">HL-88172</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold mt-1\">Farah Anindita</span>\n<span class=\"font-label-sm text-label-sm text-outline\">FK \u2022 ****6701</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium line-clamp-1\">Tumbler Corkcicle 16oz Sage Green</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Perlengkapan Pribadi</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant line-clamp-1\">Masjid Ulil Albab</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Area Wudhu Akhwat</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-medium whitespace-nowrap\">23 Okt, 13:10</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Kemarin</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold whitespace-nowrap\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-outline\"></span>\n<span>Aktif - Mencari</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-all whitespace-nowrap\">\n                      Detail\n                    </button>\n</td>\n</tr>\n<!-- ROW 5: HL-88150 (Selesai) -->\n<tr class=\"report-table-row hover:bg-surface-container-low cursor-pointer transition-all opacity-80\" onclick=\"selectReportRow(this, 'HL-88150')\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-low font-mono font-semibold text-label-sm text-outline w-max\">HL-88150</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold mt-1\">Rizky Maulana</span>\n<span class=\"font-label-sm text-label-sm text-outline\">FIAI \u2022 ****1129</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface line-clamp-1\">Kacamata Frame Titanium RayBan</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Aksesoris</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant line-clamp-1\">Perpustakaan Pusat UII</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Lt. 3 Meja Baca</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap\">22 Okt, 14:00</span>\n<span class=\"font-label-sm text-label-sm text-outline\">2 hari lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm font-semibold whitespace-nowrap\">\n<span class=\"material-symbols-outlined text-[13px] text-secondary\">check_circle</span>\n<span>Selesai (BAST)</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-all whitespace-nowrap\">\n                      Detail\n                    </button>\n</td>\n</tr>\n<!-- ROW 6: HL-88092 (Ditutup) -->\n<tr class=\"report-table-row hover:bg-surface-container-low cursor-pointer transition-all opacity-70\" onclick=\"selectReportRow(this, 'HL-88092')\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-low font-mono font-medium text-label-sm text-outline w-max\">HL-88092</span>\n<span class=\"font-label-md text-label-md text-outline font-semibold mt-1\">Annisa Larasati</span>\n<span class=\"font-label-sm text-label-sm text-outline\">FH \u2022 ****4410</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-outline line-clamp-1\">Jaket Hoodie Uniqlo Abu-Abu L</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Pakaian</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-outline line-clamp-1\">Auditorium Kahar Muzakkir</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Kursi Row H</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-outline whitespace-nowrap\">20 Okt, 11:00</span>\n<span class=\"font-label-sm text-label-sm text-outline\">4 hari lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-outline font-label-sm text-label-sm font-semibold whitespace-nowrap\">\n<span class=\"material-symbols-outlined text-[13px]\">block</span>\n<span>Ditutup Satpam</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container text-outline font-label-sm text-label-sm hover:bg-surface-container-high transition-all whitespace-nowrap\">\n                      Detail\n                    </button>\n</td>\n</tr>\n<!-- ROW 7: HL-87980 (Kedaluwarsa) -->\n<tr class=\"report-table-row hover:bg-surface-container-low cursor-pointer transition-all opacity-60\" onclick=\"selectReportRow(this, 'HL-87980')\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-low font-mono font-medium text-label-sm text-outline w-max\">HL-87980</span>\n<span class=\"font-label-md text-label-md text-outline font-semibold mt-1\">Budi Setiawan</span>\n<span class=\"font-label-sm text-label-sm text-outline\">FTSP \u2022 ****8709</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-outline line-clamp-1\">Payung Lipat Polkadot Biru</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Lainnya</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-outline line-clamp-1\">Lobi Gedung FTSP Lt. 1</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Rak Payung</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-outline whitespace-nowrap\">25 Jul 2024</span>\n<span class=\"font-label-sm text-label-sm text-outline\">&gt;90 hari</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold whitespace-nowrap\">\n<span class=\"material-symbols-outlined text-[13px]\">alarm_off</span>\n<span>Kedaluwarsa</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container text-outline font-label-sm text-label-sm hover:bg-surface-container-high transition-all whitespace-nowrap\">\n                      Detail\n                    </button>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Table Pagination Footer -->\n<div class=\"px-5 py-3 bg-surface-container-low flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\">\n<span>Menampilkan <strong>1-7</strong> dari <strong>44</strong> laporan aktif</span>\n<div class=\"flex items-center gap-1\">\n<button class=\"p-1 rounded bg-surface-container-highest text-outline cursor-not-allowed\" disabled=\"\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_left</span>\n</button>\n<button class=\"w-7 h-7 rounded bg-primary text-on-primary font-bold\">1</button>\n<button class=\"w-7 h-7 rounded hover:bg-surface-container text-on-surface font-medium\">2</button>\n<button class=\"w-7 h-7 rounded hover:bg-surface-container text-on-surface font-medium\">3</button>\n<button class=\"w-7 h-7 rounded hover:bg-surface-container text-on-surface font-medium\">...</button>\n<button class=\"w-7 h-7 rounded hover:bg-surface-container text-on-surface font-medium\">7</button>\n<button class=\"p-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_right</span>\n</button>\n</div>\n</div>\n</div>\n</div>\n<!-- RIGHT SECTION: Detail Panel Laporan Kehilangan (Selected: HL-88219) (Col 8-12) -->\n<div class=\"col-span-12 xl:col-span-5 flex flex-col gap-4\">\n<!-- Main Detail Card -->\n<div class=\"bg-surface-container-lowest rounded-xl shadow-sm p-5 flex flex-col gap-5 relative\">\n<!-- Detail Header & Action Buttons -->\n<div class=\"flex items-start justify-between gap-3 pb-4 border-b border-surface-container-high\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-headline-md text-headline-md font-mono font-bold text-on-surface tracking-tight\">HL-88219</span>\n<span class=\"px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">auto_awesome</span>\n<span>Kandidat Kuat (94%)</span>\n</span>\n</div>\n<p class=\"font-label-sm text-label-sm text-outline mt-1\">Diajukan: 24 Oktober 2024, 10:15 WIB via Portal Civitas</p>\n</div>\n<div class=\"flex items-center gap-2\">\n<button class=\"p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all flex items-center justify-center\" title=\"Cetak Berita Acara &amp; Tiket Lapor\">\n<span class=\"material-symbols-outlined text-[18px]\">print</span>\n</button>\n<button class=\"px-3 py-2 rounded-xl bg-surface-container-highest hover:bg-error-container hover:text-on-error-container text-on-surface font-label-sm text-label-sm font-bold transition-all flex items-center gap-1.5\" data-action=\"open-modal-close-ticket\">\n<span class=\"material-symbols-outlined text-[16px]\">close</span>\n<span>Tutup Laporan</span>\n</button>\n</div>\n</div>\n<!-- Section 1: Data Pelapor & Kontak (Civitas UII) -->\n<div class=\"flex flex-col gap-3\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-outline font-bold uppercase tracking-wider flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">badge</span>\n<span>Data Pelapor Civitas</span>\n</span>\n<span class=\"px-2 py-0.5 rounded bg-surface-container-low text-secondary font-label-sm text-label-sm font-semibold\">Akun SSO Terverifikasi</span>\n</div>\n<div class=\"p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2.5\">\n<div class=\"flex items-center justify-between\">\n<div>\n<p class=\"font-label-md text-label-md font-bold text-on-surface\">M. Alif Fadhlorrahman</p>\n<p class=\"font-label-sm text-label-sm text-on-surface-variant\">Mahasiswa Aktif \u2022 FTI (Informatika)</p>\n</div>\n<div class=\"text-right\">\n<span class=\"font-label-sm text-label-sm text-outline block\">Identitas KTM</span>\n<span class=\"font-mono text-label-md font-semibold text-on-surface\">****1842</span>\n</div>\n</div>\n<div class=\"pt-2 border-t border-surface-container-high/60 grid grid-cols-2 gap-2 font-label-sm text-label-sm\">\n<div>\n<span class=\"text-outline block text-[11px]\">WhatsApp:</span>\n<span class=\"font-medium text-on-surface flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px] text-secondary\">chat</span>\n                    +62 812-9844-XXXX\n                  </span>\n</div>\n<div>\n<span class=\"text-outline block text-[11px]\">Email Resmi UII:</span>\n<span class=\"font-medium text-on-surface truncate block\" title=\"alif.fadhlorrahman@students.uii.ac.id\">\n                    alif.fadhlorrahman@students.uii...\n                  </span>\n</div>\n</div>\n</div>\n</div>\n<!-- Section 2: Deskripsi Fisik Barang Terlapor -->\n<div class=\"flex flex-col gap-3\">\n<span class=\"font-label-sm text-label-sm text-outline font-bold uppercase tracking-wider flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">devices</span>\n<span>Deskripsi Fisik Barang</span>\n</span>\n<div class=\"grid grid-cols-12 gap-3 items-start\">\n<!-- Item Image Reference -->\n<div class=\"col-span-4 rounded-xl overflow-hidden bg-surface-container aspect-square relative shadow-inner\">\n<img class=\"w-full h-full object-cover\" data-alt=\"Close up product photograph of a red and black Sandisk Cruzer Blade USB flash drive placed neatly on a modern university study desk with natural morning light and clean minimal slate tones.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuBjIp1mi7ILdN0dk-p3XASSzot0sIRydunLsrsJUsKFRN4-tw7-jbNf1EDcQm9cEmPKGHwwfLg4zaFBJX4ASapqiS06G_tlssIHp6iShkJX5nYevO9ZduJhsRNGHmi3mtr6Zj7JpdH9DrfcrnPU3G_2r_fBJqoET7bY7VP3v4f1Q06udqtIUx0AIYFYYLQk_Gs90KHW2tpMAgV9gklee4lX6ZtgJpDSXyYyj2RsVak\"/>\n<span class=\"absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-primary/70 text-on-primary text-[10px] font-medium backdrop-blur-sm\">Foto Acuan</span>\n</div>\n<!-- Item Specifications -->\n<div class=\"col-span-8 flex flex-col gap-1.5\">\n<div>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Elektronik &amp; Aksesoris Komputer</span>\n<p class=\"font-headline-sm text-headline-sm text-on-surface leading-tight mt-0.5\">Flashdisk Sandisk Cruzer Blade 64GB</p>\n</div>\n<div class=\"flex flex-wrap gap-1.5 mt-1\">\n<span class=\"px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium\">Warna: Merah - Hitam Doff</span>\n<span class=\"px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium\">Kapasitas: 64 GB</span>\n</div>\n<div class=\"mt-2 text-on-surface-variant font-body-sm text-body-sm space-y-1\">\n<p class=\"flex items-start gap-1\">\n<span class=\"material-symbols-outlined text-[15px] text-outline shrink-0 mt-0.5\">location_on</span>\n<span><strong>Lokasi:</strong> Lab Komputer 3.2 GKU Lt. 2 (PC Meja 08)</span>\n</p>\n<p class=\"flex items-start gap-1\">\n<span class=\"material-symbols-outlined text-[15px] text-outline shrink-0 mt-0.5\">schedule</span>\n<span><strong>Waktu Hilang:</strong> 24 Okt 2024, ~09:30 - 10:00 WIB</span>\n</p>\n</div>\n</div>\n</div>\n</div>\n<!-- Section 3: Ciri Khusus & Data Rahasia (Masked Panel Security Alert) -->\n<div class=\"p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2 relative overflow-hidden\">\n<div class=\"flex items-center justify-between\">\n<div class=\"flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-bold\">\n<span class=\"material-symbols-outlined text-[16px]\">lock</span>\n<span>Ciri Khusus Rahasia (Enkripsi End-to-End)</span>\n</div>\n<span class=\"text-outline text-[11px] font-mono\">SEC-AES256</span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant leading-relaxed\">\n              Data rahasia ini hanya dibuka pada saat wawancara verifikasi klaim tatap muka langsung di pos jaga untuk menguji keabsahan kepemilikan pelapor.\n            </p>\n<div class=\"p-2.5 rounded-lg bg-surface-container-high flex items-center justify-between gap-2 mt-1\">\n<div class=\"font-mono text-outline font-bold tracking-widest text-[13px] select-none\">\n                \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\n              </div>\n<a class=\"px-2.5 py-1 rounded-md bg-primary text-on-primary font-label-sm text-label-sm font-medium hover:opacity-90 transition-all flex items-center gap-1 shrink-0\" data-path=\"verifikasi\" href=\"#\">\n<span class=\"material-symbols-outlined text-[14px]\">key</span>\n<span>Buka di Ruang Verifikasi</span>\n</a>\n</div>\n</div>\n<!-- Section 4: Kandidat Barang Brankas Terkait (AI Matching Result) -->\n<div class=\"flex flex-col gap-2.5 pt-2 border-t border-surface-container-high\">\n<div class=\"flex items-center justify-between\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-secondary text-[18px]\">hub</span>\n<span class=\"font-label-sm text-label-sm text-on-surface font-bold uppercase tracking-wider\">Hasil Matching Brankas AI</span>\n</div>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold\">Skor Kecocokan 94%</span>\n</div>\n<!-- Match Item Pod -->\n<div class=\"p-3 rounded-xl bg-surface-container-low flex flex-col gap-2.5\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0\">\n<img class=\"w-full h-full object-cover\" data-alt=\"Macro detailed photograph of a confiscated black and red plastic USB storage device with official catalog tag lying inside a university security evidence locker under clinical fluorescent illumination.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuAv2DVxXadm2XrUkPK1MBNsSqEBzxmNEd3kC9wpfmQriuMPk-aNYArXUh82aOyTkdE2No5Ni5dRHK6Ozt_LBUaT7iE5KmatE_QOZFylCekvUsDD9ZIT7ZPG3soRBsDDa-McHQZS7JsCuOvlUunvshgn39C09v4baNJiytI2tXcMmw3vddVxzsOmGZ7_h1XDUA43cNNzyUfsfHE09ra0vYUXabxugfZiNH-Xl2MTovg\"/>\n</div>\n<div class=\"flex-1 min-w-0\">\n<div class=\"flex items-center justify-between gap-1\">\n<span class=\"font-mono text-label-sm font-bold text-secondary\">BRG-2024-0142</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Locker GKU-A04</span>\n</div>\n<p class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Flashdisk Sandisk Cruzer 64GB Merah</p>\n<span class=\"font-label-sm text-label-sm text-outline block\">Ditemukan Petugas Kebersihan di Lab GKU</span>\n</div>\n</div>\n<div class=\"p-2 rounded-lg bg-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"flex items-center gap-1 text-secondary\">\n<span class=\"material-symbols-outlined text-[15px]\">send_time_extension</span>\n<span>WA Notifikasi Otomatis: 11:21 WIB</span>\n</span>\n<span class=\"font-medium text-outline\">Menunggu Kedatangan</span>\n</div>\n<div class=\"flex items-center justify-end gap-2 pt-1\">\n<button class=\"w-full py-2 px-3 rounded-lg bg-secondary text-on-secondary hover:opacity-95 font-label-sm text-label-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm\">\n<span class=\"material-symbols-outlined text-[16px]\">verified_user</span>\n<span>Lanjutkan ke Verifikasi Klaim &amp; Terbitkan BAST</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Section 5: State Read-Only Notification Notice -->\n<div class=\"p-2.5 rounded-lg bg-surface-container text-outline flex items-center gap-2 font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[18px]\">info</span>\n<span>Laporan yang berstatus Ditutup atau Selesai akan terkunci permanen dalam mode Read-Only.</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n<!-- Bottom System Audit Footnote -->\n<div class=\"px-8 py-3 bg-surface-container-low text-outline flex items-center justify-between font-label-sm text-label-sm\">\n<div class=\"flex items-center gap-2\">\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n<span>Integrity Guard: Semua perubahan status tiket laporan kehilangan tercatat permanen pada Audit Log Pengamanan Kampus Terpadu UII.</span>\n</div>\n<div class=\"flex items-center gap-4\">\n<span>Protokol Keamanan: ISO/IEC 27001 Terintegrasi</span>\n<span class=\"font-mono\">SEC-ID: ID-88219-GKU-2024</span>\n</div>\n</div>\n<!-- MODAL OVERLAY: Tutup Laporan Kehilangan (Previewable Interactive Modal) -->\n<div class=\"fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 hidden items-center justify-center p-4\" id=\"modal-tutup-laporan\">\n<div class=\"bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200\">\n<!-- Modal Header -->\n<div class=\"px-6 py-4 bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface\">\n<span class=\"material-symbols-outlined text-[18px]\">archive</span>\n</div>\n<div>\n<h3 class=\"font-headline-sm text-headline-sm text-on-surface leading-tight\">Tutup Tiket Laporan (HL-88219)</h3>\n<span class=\"font-label-sm text-label-sm text-outline\">Pelapor: M. Alif Fadhlorrahman (FTI)</span>\n</div>\n</div>\n<button class=\"p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-all\" data-action=\"close-modal-close-ticket\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n<!-- Modal Body -->\n<div class=\"p-6 flex flex-col gap-4\">\n<!-- Security Notice -->\n<div class=\"p-3 rounded-xl bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm flex items-start gap-2.5\">\n<span class=\"material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5\">warning</span>\n<span>Penutupan laporan akan menonaktifkan kalkulasi matching AI serta menghentikan notifikasi broadcast WhatsApp kepada pelapor.</span>\n</div>\n<!-- Alasan Penutupan Form Control -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Alasan Penutupan Tiket <span class=\"text-error\">*</span></label>\n<div class=\"relative\">\n<select class=\"w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface appearance-none focus:outline-none focus:bg-surface-container cursor-pointer\">\n<option selected=\"\">Barang sudah ditemukan sendiri oleh pelapor</option>\n<option>Laporan ganda / duplikat dengan tiket lain</option>\n<option>Klaim palsu / data tidak valid setelah verifikasi pos</option>\n<option>Batas waktu penyimpanan kedaluwarsa (&gt;90 hari)</option>\n<option>Lainnya (Perlu justifikasi berita acara)</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[18px]\">expand_more</span>\n</div>\n</div>\n<!-- Catatan Berita Acara (Textarea) -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Catatan Berita Acara Petugas <span class=\"text-error\">*</span></label>\n<textarea class=\"w-full p-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all resize-none\" placeholder=\"Tuliskan keterangan detail konfirmasi penutupan...\" rows=\"3\">Pelapor mengonfirmasi via telepon dan konfirmasi pos jaga bahwa barang tertinggal di tas teman praktikum dan sudah diterima kembali dalam kondisi baik.</textarea>\n</div>\n<!-- Checklist Otorisasi -->\n<label class=\"flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low/70 cursor-pointer select-none\">\n<input checked=\"\" class=\"mt-1 w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer\" type=\"checkbox\"/>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant leading-snug\">\n            Saya mengonfirmasi bahwa penutupan laporan ini telah diverifikasi dan dicatat atas otorisasi <strong>Bripka Hendra Kurniawan (SEC-042)</strong>.\n          </span>\n</label>\n</div>\n<!-- Modal Footer -->\n<div class=\"px-6 py-4 bg-surface-container-low flex items-center justify-end gap-2.5\">\n<button class=\"px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-all font-label-md text-label-md\" data-action=\"close-modal-close-ticket\">\n          Batal\n        </button>\n<button class=\"px-4 py-2 rounded-xl bg-primary text-on-primary hover:opacity-90 shadow-sm transition-all font-label-md text-label-md flex items-center gap-1.5\" data-action=\"close-modal-close-ticket\">\n<span class=\"material-symbols-outlined text-[18px]\">check_circle</span>\n<span>Konfirmasi Tutup Laporan</span>\n</button>\n</div>\n</div>\n</div>\n</div></main></div>\n<!-- MODAL: Input Laporan Kehilangan Manual (Walk-in Posko Satpam) -->\n<div id=\"modal-input-manual\" class=\"fixed inset-0 z-50 hidden bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4\">\n  <div class=\"bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200\">\n    <div class=\"px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high\">\n      <div class=\"flex items-center gap-2.5\">\n        <span class=\"material-symbols-outlined text-secondary text-[22px]\">add_box</span>\n        <div class=\"flex flex-col\">\n          <span class=\"font-headline-sm text-headline-sm text-on-surface font-bold\">Input Laporan Kehilangan Manual</span>\n          <span class=\"font-label-sm text-label-sm text-secondary font-mono\">Walk-in Posko GKU</span>\n        </div>\n      </div>\n      <button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\" data-action=\"close-modal-input-manual\">\n        <span class=\"material-symbols-outlined text-[20px]\">close</span>\n      </button>\n    </div>\n    <div class=\"p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto\">\n      <div class=\"grid grid-cols-2 gap-3\">\n        <div>\n          <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Nama Pelapor *</label>\n          <input id=\"manual-pelapor-nama\" class=\"w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary\" placeholder=\"Contoh: Farhan Pratama\" type=\"text\" value=\"Farhan Pratama\"/>\n        </div>\n        <div>\n          <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">NIM / NIP / KTP *</label>\n          <input id=\"manual-pelapor-nim\" class=\"w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary\" placeholder=\"Contoh: 21523099\" type=\"text\" value=\"21523099\"/>\n        </div>\n      </div>\n      <div class=\"grid grid-cols-2 gap-3\">\n        <div>\n          <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Nomor WhatsApp Pelapor *</label>\n          <input id=\"manual-pelapor-wa\" class=\"w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary\" placeholder=\"Contoh: 0812-3456-7890\" type=\"text\" value=\"0812-3456-7890\"/>\n        </div>\n        <div>\n          <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Kategori Barang *</label>\n          <select id=\"manual-barang-kategori\" class=\"w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none\">\n            <option value=\"Elektronik\">Elektronik & Aksesoris</option>\n            <option value=\"Dompet\">Dompet & Identitas</option>\n            <option value=\"Kunci\">Kunci & Kendaraan</option>\n            <option value=\"Perlengkapan\">Perlengkapan Personal</option>\n          </select>\n        </div>\n      </div>\n      <div>\n        <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Nama & Karakteristik Barang *</label>\n        <input id=\"manual-barang-nama\" class=\"w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary\" placeholder=\"Contoh: Flashdisk Sandisk 64GB Merah\" type=\"text\" value=\"Flashdisk Sandisk 64GB Merah\"/>\n      </div>\n      <div class=\"grid grid-cols-2 gap-3\">\n        <div>\n          <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Lokasi Perkiraan Hilang *</label>\n          <input id=\"manual-barang-lokasi\" class=\"w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary\" placeholder=\"Contoh: GKU Lantai 2 R. 2.14\" type=\"text\" value=\"GKU Lantai 2 (Lab Komputer 3.2)\"/>\n        </div>\n        <div>\n          <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Perkiraan Waktu Hilang *</label>\n          <input id=\"manual-barang-waktu\" class=\"w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary\" placeholder=\"Hari ini, ~10:00 WIB\" type=\"text\" value=\"Hari ini, ~10:15 WIB\"/>\n        </div>\n      </div>\n      <div>\n        <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Ciri Khusus / Rahasia (Kunci Verifikasi)</label>\n        <textarea id=\"manual-barang-ciri\" rows=\"2\" class=\"w-full p-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary\" placeholder=\"Contoh: Ada goresan inisial R di bagian belakang casing\">Terdapat goresan inisial huruf 'R' kecil di bagian bodi belakang konektor USB, tutup masih terpasang, ada tali gantungan abu-abu.</textarea>\n      </div>\n    </div>\n    <div class=\"px-6 py-4 bg-surface-container-low flex items-center justify-end gap-3 border-t border-surface-container-high\">\n      <button class=\"px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-all\" data-action=\"close-modal-input-manual\">\n        Batal\n      </button>\n      <button id=\"btn-save-manual-ticket\" class=\"px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-md\" data-action=\"save-manual-ticket\">\n        <span class=\"material-symbols-outlined text-[18px] text-secondary-fixed\">check_circle</span>\n        <span>Simpan Laporan & Terbitkan Tiket</span>\n      </button>\n    </div>\n  </div>\n</div>\n";

export default function DaftarLaporanKehilangan({ onNavigate }) {
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
