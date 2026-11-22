import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Administrator BSI: Daftar Penanda Anomali Sistem (Rule A1–A8) - Portal Administrator BSI
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]\"><div class=\"flex flex-col\"><div class=\"px-space-md py-space-md flex items-center gap-3 bg-surface-container-low\"><div class=\"w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-secondary-fixed text-[24px]\">verified_user</span></div><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none\">BSI \u2022 UII</span><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1\">Portal Administrator BSI</span></div></div><div class=\"px-space-md pt-space-md pb-space-xs\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest\">Menu Navigasi Audit</span></div><nav class=\"flex flex-col px-space-sm gap-1\" data-active-classes=\"bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)]\">\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">grid_view</span>\n    <span>Beranda</span>\n  </a>\n  <a aria-current=\"page\" class=\"flex items-center gap-3 px-space-md py-space-xs transition-all bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)] font-semibold cursor-pointer\" data-path=\"penanda-anomali\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">warning</span>\n    <span>Penanda Anomali</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"insiden\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">security_update_warning</span>\n    <span>Insiden</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"audit-log\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">history_edu</span>\n    <span>Audit Log</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"akun-satpam\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Akun Satpam</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"barang-ditahan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">lock_clock</span>\n    <span>Barang Ditahan</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"parameter\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">tune</span>\n    <span>Parameter</span>\n  </a>\n</nav></div><div class=\"p-space-md m-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\"><div class=\"flex items-center justify-between\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Keamanan Sesi</span><span class=\"flex h-2 w-2 rounded-full bg-secondary\"></span></div><div class=\"font-label-md text-label-md text-on-surface font-semibold\">Sesi Aktif: 07:42:15 tersisa</div><div class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">vpn_lock</span>10.12.0.4 - VPN Terpadu</div><div class=\"flex items-center justify-between pt-1\"><div class=\"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">speed</span>Latensi: 14ms</div><a class=\"font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1\" data-path=\"kontak-siaga\" href=\"#\"><span class=\"material-symbols-outlined text-[14px]\">emergency</span>Kontak Siaga</a></div></div><!-- Portal Shortcut Buttons -->\n<div class=\"px-space-md pt-1 pb-2 flex flex-col gap-1.5\">\n  <button data-path=\"portal-satpam\" class=\"w-full py-2 px-3 rounded-xl border border-outline-variant/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">local_police</span>\n    <span>Buka Portal Satpam</span>\n  </button>\n  <button data-path=\"portal-publik\" class=\"w-full py-1.5 px-3 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">public</span>\n    <span>Kembali ke Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72 flex flex-col min-h-screen\"><header class=\"fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-space-lg flex items-center justify-between\"><div class=\"flex items-center gap-space-md\"><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface leading-tight\">BSI Admin Portal - Lost &amp; Found Kampus UII</span><div class=\"flex items-center gap-2 mt-1\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface\"><span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>Sistem Operasional Normal - Gateway BSI Terhubung</span><span class=\"px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant\">Production v2.4-sec</span><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[13px]\">key</span>MFA Aktif - Hardware Token</span></div></div></div><div class=\"flex items-center gap-space-md\"><div class=\"relative w-72\"><span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">search</span><input class=\"w-full h-10 pl-9 pr-3 rounded-full bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors\" placeholder=\"Cari log / item / ID insiden...\" type=\"text\"/></div><div class=\"relative flex items-center justify-center\"><button class=\"w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors\"><span class=\"material-symbols-outlined text-[20px]\">notifications</span></button><span class=\"absolute top-1 right-1 h-2 w-2 rounded-full bg-error\"></span></div><div class=\"flex items-center gap-3 pl-2\"><div class=\"flex flex-col text-right\"><span class=\"font-label-md text-label-md text-on-surface\">Ir. Ahmad Fauzi, M.T.</span><span class=\"font-label-sm text-label-sm text-on-surface-variant\">Super Admin / Audit Officer</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"ml-2 w-9 h-9 rounded-full hover:bg-error-container hover:text-on-error-container text-on-surface-variant flex items-center justify-center transition-colors\" data-path=\"login\" href=\"#\" title=\"Keluar dari Portal\"><span class=\"material-symbols-outlined text-[18px]\">logout</span></a></div></div></header><main class=\"w-full pt-20 px-space-lg flex-1 bg-surface max-w-[1440px] mx-auto pb-space-lg\"><div class=\"flex flex-col w-full\">\n<!-- Top Breadcrumb & Executive Header Bar -->\n<div class=\"flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-md\">\n<div class=\"flex flex-col\">\n<nav class=\"flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mb-1\">\n<span class=\"hover:text-on-surface cursor-pointer\">Beranda Admin</span>\n<span class=\"material-symbols-outlined text-[13px] text-outline\">chevron_right</span>\n<span class=\"hover:text-on-surface cursor-pointer\">Pengawasan Sentinel</span>\n<span class=\"material-symbols-outlined text-[13px] text-outline\">chevron_right</span>\n<span class=\"text-secondary font-semibold\">Penanda Anomali</span>\n</nav>\n<div class=\"flex items-center gap-3\">\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight\">Penanda Anomali Sistem</h1>\n<span class=\"px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-1 font-bold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-error animate-ping\"></span>\n          5 Kritis Aktif\n        </span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface-variant max-w-3xl mt-0.5\">\n        Deteksi otomatis deviasi SOP, indikasi kebocoran ciri rahasia, klaim ganda, dan manipulasi inventaris fisik oleh Sentinel-AI terdistribusi.\n      </p>\n</div>\n<!-- Quick Action Controls -->\n<div class=\"flex items-center gap-2.5 shrink-0 self-start md:self-auto\">\n<button class=\"px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center gap-2 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:bg-surface-container-high transition-all\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">download</span>\n<span>Unduh Laporan (CSV)</span>\n</button>\n<button class=\"px-4 py-2 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-[0_4px_14px_rgba(19,27,46,0.18)] hover:bg-black transition-all\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary-fixed\">tune</span>\n<span>Konfigurasi Rule Engine (A1\u2013A8)</span>\n</button>\n</div>\n</div>\n<!-- Metric Summary Bento Grid -->\n<div class=\"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-md\">\n<!-- Card 1: Total Anomali -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col justify-between relative overflow-hidden\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold\">Total Penanda Aktif</span>\n<div class=\"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[18px]\">rule_folder</span>\n</div>\n</div>\n<div class=\"flex items-baseline gap-2 my-2\">\n<span class=\"font-display text-display text-on-surface font-extrabold tracking-tight\">23</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">kasus terdeteksi</span>\n</div>\n<div class=\"flex items-center gap-1.5 pt-2 font-label-sm text-label-sm text-on-surface-variant\">\n<span class=\"px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-semibold\">7 Baru</span>\n<span class=\"px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant\">12 Ditinjau</span>\n<span class=\"px-2 py-0.5 rounded-md bg-error-container text-on-error-container font-semibold\">4 Insiden</span>\n</div>\n</div>\n<!-- Card 2: Tingkat Kritis -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col justify-between relative overflow-hidden\">\n<div class=\"absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-error/5 pointer-events-none\"></div>\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-error font-bold flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-[16px] text-error\">gpp_maybe</span>\n          Tingkat Kritis (Tinggi)\n        </span>\n<div class=\"w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">priority_high</span>\n</div>\n</div>\n<div class=\"flex items-baseline gap-2 my-2\">\n<span class=\"font-display text-display text-error font-extrabold tracking-tight\">05</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">butuh otorisasi segera</span>\n</div>\n<div class=\"flex items-center gap-2 pt-2 font-body-sm text-body-sm text-on-surface-variant\">\n<span class=\"h-2 w-2 rounded-full bg-error\"></span>\n<span class=\"truncate\">Prioritas eskalasi Rule A1, A2 &amp; A3</span>\n</div>\n</div>\n<!-- Card 3: Tingkat Sedang -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col justify-between\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">visibility</span>\n          Tingkat Sedang (Peringatan)\n        </span>\n<div class=\"w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">warning</span>\n</div>\n</div>\n<div class=\"flex items-baseline gap-2 my-2\">\n<span class=\"font-display text-display text-on-surface font-extrabold tracking-tight\">11</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">dalam observasi posko</span>\n</div>\n<div class=\"flex items-center gap-2 pt-2 font-body-sm text-body-sm text-on-surface-variant\">\n<span class=\"h-2 w-2 rounded-full bg-secondary\"></span>\n<span class=\"truncate\">Penolakan BAST &gt;3x &amp; jam operasional</span>\n</div>\n</div>\n<!-- Card 4: Tingkat Rendah -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col justify-between\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-[16px] text-outline\">history</span>\n          Tingkat Rendah (Pencatatan)\n        </span>\n<div class=\"w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">fact_check</span>\n</div>\n</div>\n<div class=\"flex items-baseline gap-2 my-2\">\n<span class=\"font-display text-display text-on-surface font-extrabold tracking-tight\">07</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">anomali deviasi minor</span>\n</div>\n<div class=\"flex items-center gap-2 pt-2 font-body-sm text-body-sm text-on-surface-variant\">\n<span class=\"h-2 w-2 rounded-full bg-outline-variant\"></span>\n<span class=\"truncate\">Koreksi ketik &amp; delay penyerahan &lt;2 jam</span>\n</div>\n</div>\n</div>\n<!-- Integrated Filters & Search Ribbon -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] mb-space-md flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm\">\n<div class=\"flex flex-wrap items-center gap-2.5 flex-1\">\n<!-- Search Input -->\n<div class=\"relative w-full sm:w-64\">\n<span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">search</span>\n<input class=\"w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-highest transition-colors font-mono\" placeholder=\"Cari FLAG-, BRG-, HL-, SEC-...\" type=\"text\" value=\"FLAG-2024-0988\"/>\n</div>\n<!-- Rule Select -->\n<div class=\"relative\">\n<select class=\"h-10 pl-3 pr-8 rounded-xl bg-surface-container-low font-label-md text-label-md text-on-surface appearance-none focus:outline-none focus:bg-surface-container-highest cursor-pointer font-sans\">\n<option value=\"ALL\">Semua Aturan (A1\u2013A8)</option>\n<option selected=\"\" value=\"A1\">A1: Klaim Ganda Identitas Berbeda</option>\n<option value=\"A2\">A2: Kebocoran Ciri Rahasia</option>\n<option value=\"A3\">A3: Ketidakcocokan Serial High-Value</option>\n<option value=\"A4\">A4: Laporan Kilat Pasca Terima</option>\n<option value=\"A5\">A5: Koreksi Berulang Petugas</option>\n<option value=\"A6\">A6: Bypass Waktu Verifikasi</option>\n<option value=\"A7\">A7: Penolakan BAST &gt;3x</option>\n<option value=\"A8\">A8: Klaim Luar Jam Operasional</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[18px]\">expand_more</span>\n</div>\n<!-- Level Filter Pill Group -->\n<div class=\"flex items-center bg-surface-container-low p-1 rounded-xl\">\n<button class=\"px-3 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-sm\">Semua Tingkat</button>\n<button class=\"px-3 py-1 rounded-lg text-error hover:text-on-surface font-label-sm text-label-sm font-medium\">Tinggi</button>\n<button class=\"px-3 py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-medium\">Sedang</button>\n<button class=\"px-3 py-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-medium\">Rendah</button>\n</div>\n<!-- Status Filter Dropdown -->\n<div class=\"relative\">\n<select class=\"h-10 pl-3 pr-8 rounded-xl bg-surface-container-low font-label-md text-label-md text-on-surface appearance-none focus:outline-none focus:bg-surface-container-highest cursor-pointer\">\n<option value=\"ALL\">Semua Status (Aktif)</option>\n<option selected=\"\" value=\"NEW\">Status: Baru (7)</option>\n<option value=\"REVIEWED\">Status: Ditinjau (12)</option>\n<option value=\"INCIDENT\">Status: Insiden (4)</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[18px]\">expand_more</span>\n</div>\n</div>\n<!-- Reset Filter & Meta counter -->\n<div class=\"flex items-center gap-3 shrink-0 self-end lg:self-auto\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Menampilkan <strong class=\"text-on-surface\">1</strong> dari <strong class=\"text-on-surface\">23</strong> flag</span>\n<button class=\"px-3 py-1.5 rounded-xl text-secondary hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-1 transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">restart_alt</span>\n<span>Reset Filter</span>\n</button>\n</div>\n</div>\n<!-- Main Split Layout: Dense Data Table (Left) + Right-Side Inspection Drawer (Right) -->\n<div class=\"grid grid-cols-12 gap-space-md items-start\">\n<!-- Dense Anomaly Flag Table (7 Columns on large desktop) -->\n<div class=\"col-span-12 xl:col-span-7 bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] overflow-hidden flex flex-col\">\n<div class=\"p-space-md flex items-center justify-between bg-surface-container-low/60\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">dataset</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface font-bold\">Daftar Antrean Penanda Anomali</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm\">Real-time Stream</span>\n</div>\n<div class=\"flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"h-2 w-2 rounded-full bg-secondary animate-pulse\"></span>\n          Node UII-BSI-A1: Sinkron\n        </div>\n</div>\n<div class=\"overflow-x-auto\">\n<table class=\"w-full text-left border-collapse\">\n<thead>\n<tr class=\"bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">\n<th class=\"py-3 px-3 pl-4\">ID &amp; Aturan</th>\n<th class=\"py-3 px-3\">Subjek (Item / Pos)</th>\n<th class=\"py-3 px-3\">Deskripsi Indikasi</th>\n<th class=\"py-3 px-2\">Tingkat</th>\n<th class=\"py-3 px-3\">Waktu Terdeteksi</th>\n<th class=\"py-3 px-3 text-center\">Status</th>\n<th class=\"py-3 px-3 pr-4 text-right\">Aksi</th>\n</tr>\n</thead>\n<tbody class=\"divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface\">\n<!-- Row 1: Selected / Highlighted active item (Connected to Drawer) -->\n<tr class=\"bg-secondary-fixed/30 hover:bg-secondary-fixed/40 transition-colors cursor-pointer relative\" id=\"row-FLAG-0988\">\n<td class=\"py-3.5 px-3 pl-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-1.5 h-8 rounded-full bg-error shrink-0\"></div>\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-bold text-on-surface text-[13px] tracking-tight\">FLAG-2024-0988</span>\n<span class=\"font-label-sm text-label-sm text-error font-semibold flex items-center gap-0.5\">\n<span class=\"material-symbols-outlined text-[13px]\">warning</span>\n                      Rule A1: MULTI_CLAIM\n                    </span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-secondary text-[12px]\">BRG-2024-0142</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Pos Induk GKU</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 max-w-[190px]\">\n<p class=\"truncate text-on-surface font-medium\" title=\"3 mahasiswa klaim barang sama dlm kurun 24 jam dengan ciri variatif.\">\n                  3 percobaan klaim berbeda NIM pada item flashdisk sama\n                </p>\n<span class=\"font-label-sm text-label-sm text-outline\">Pemicu: Identitas silang</span>\n</td>\n<td class=\"py-3.5 px-2\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold shadow-sm\">\n                  Tinggi\n                </span>\n</td>\n<td class=\"py-3.5 px-3 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-[11px] text-on-surface\">10:48 WIB</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">57 mnt lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 text-center\">\n<span class=\"inline-flex px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n                  Baru\n                </span>\n</td>\n<td class=\"py-3.5 px-3 pr-4 text-right\">\n<button class=\"w-7 h-7 rounded-lg bg-surface-container-highest text-secondary hover:bg-primary-container hover:text-on-primary flex items-center justify-center transition-all ml-auto\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span>\n</button>\n</td>\n</tr>\n<!-- Row 2: Rule A2 High Severity -->\n<tr class=\"hover:bg-surface-container-low/70 transition-colors cursor-pointer\">\n<td class=\"py-3.5 px-3 pl-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-1.5 h-8 rounded-full bg-error shrink-0\"></div>\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-bold text-on-surface text-[13px]\">FLAG-2024-0982</span>\n<span class=\"font-label-sm text-label-sm text-error font-semibold\">Rule A2: ATTR_LEAK</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-secondary text-[12px]\">BRG-2024-0139</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Pos Gerbang Utama</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 max-w-[190px]\">\n<p class=\"truncate text-on-surface\" title=\"Ciri internal wallpaper laptop terungkap sebelum verifikasi fisik.\">\n                  Ciri rahasia kartu SIM &amp; wallpaper terkonfirmasi di chat umum\n                </p>\n<span class=\"font-label-sm text-label-sm text-outline\">Petugas: SEC-029</span>\n</td>\n<td class=\"py-3.5 px-2\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold\">\n                  Tinggi\n                </span>\n</td>\n<td class=\"py-3.5 px-3 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-[11px] text-on-surface\">09:15 WIB</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">2 jam lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 text-center\">\n<span class=\"inline-flex px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-medium\">\n                  Ditinjau\n                </span>\n</td>\n<td class=\"py-3.5 px-3 pr-4 text-right\">\n<button class=\"w-7 h-7 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-all ml-auto\">\n<span class=\"material-symbols-outlined text-[16px]\">chevron_right</span>\n</button>\n</td>\n</tr>\n<!-- Row 3: Rule A3 High Value Serial -->\n<tr class=\"hover:bg-surface-container-low/70 transition-colors cursor-pointer\">\n<td class=\"py-3.5 px-3 pl-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-1.5 h-8 rounded-full bg-error shrink-0\"></div>\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-bold text-on-surface text-[13px]\">FLAG-2024-0975</span>\n<span class=\"font-label-sm text-label-sm text-error font-semibold\">Rule A3: SERIAL_DIFF</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-secondary text-[12px]\">BRG-2024-0128</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Perpustakaan Lt. 2</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 max-w-[190px]\">\n<p class=\"truncate text-on-surface\" title=\"Serial number iPad Air M1 berbeda 2 digit akhir antara formulir masuk dan serah.\">\n                  Nomor seri fisik iPad tidak sesuai formulir awal pendaftaran\n                </p>\n<span class=\"font-label-sm text-label-sm text-outline\">High-Value Asset</span>\n</td>\n<td class=\"py-3.5 px-2\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold shadow-sm\">\n                  Tinggi\n                </span>\n</td>\n<td class=\"py-3.5 px-3 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-[11px] text-on-surface\">Kemarin 16:20</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">19 jam lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 text-center\">\n<span class=\"inline-flex px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold\">\n                  Insiden\n                </span>\n</td>\n<td class=\"py-3.5 px-3 pr-4 text-right\">\n<button class=\"w-7 h-7 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-all ml-auto\">\n<span class=\"material-symbols-outlined text-[16px]\">chevron_right</span>\n</button>\n</td>\n</tr>\n<!-- Row 4: Rule A4 Suspicious Rapid Report -->\n<tr class=\"hover:bg-surface-container-low/70 transition-colors cursor-pointer\">\n<td class=\"py-3.5 px-3 pl-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-1.5 h-8 rounded-full bg-secondary shrink-0\"></div>\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-bold text-on-surface text-[13px]\">FLAG-2024-0969</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Rule A4: RAPID_REP</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-secondary text-[12px]\">BRG-2024-0118</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Pos FTI Lab Komputer</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 max-w-[190px]\">\n<p class=\"truncate text-on-surface\" title=\"Klaim masuk &lt;90 detik setelah barang dipublikasikan ke portal publik.\">\n                  Pengajuan klaim hanya berselang 72 detik pasca terbit publik\n                </p>\n<span class=\"font-label-sm text-label-sm text-outline\">Indikasi scraping / bot</span>\n</td>\n<td class=\"py-3.5 px-2\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n                  Sedang\n                </span>\n</td>\n<td class=\"py-3.5 px-3 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-[11px] text-on-surface\">Kemarin 14:11</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">21 jam lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 text-center\">\n<span class=\"inline-flex px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n                  Baru\n                </span>\n</td>\n<td class=\"py-3.5 px-3 pr-4 text-right\">\n<button class=\"w-7 h-7 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-all ml-auto\">\n<span class=\"material-symbols-outlined text-[16px]\">chevron_right</span>\n</button>\n</td>\n</tr>\n<!-- Row 5: Rule A5 Repeated Correction -->\n<tr class=\"hover:bg-surface-container-low/70 transition-colors cursor-pointer\">\n<td class=\"py-3.5 px-3 pl-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-1.5 h-8 rounded-full bg-secondary shrink-0\"></div>\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-bold text-on-surface text-[13px]\">FLAG-2024-0961</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Rule A5: REPEAT_MOD</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-secondary text-[12px]\">SEC-035</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Pos FMIPA</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 max-w-[190px]\">\n<p class=\"truncate text-on-surface\" title=\"Petugas mengubah keterangan warna dan merek tas 4 kali dalam 1 jam.\">\n                  Penyuntingan data ciri fisik inventaris 4x berurutan\n                </p>\n<span class=\"font-label-sm text-label-sm text-outline\">Subjek: Petugas Satpam</span>\n</td>\n<td class=\"py-3.5 px-2\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n                  Sedang\n                </span>\n</td>\n<td class=\"py-3.5 px-3 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-[11px] text-on-surface\">23 Okt 11:30</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">1 hari lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 text-center\">\n<span class=\"inline-flex px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-medium\">\n                  Ditinjau\n                </span>\n</td>\n<td class=\"py-3.5 px-3 pr-4 text-right\">\n<button class=\"w-7 h-7 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-all ml-auto\">\n<span class=\"material-symbols-outlined text-[16px]\">chevron_right</span>\n</button>\n</td>\n</tr>\n<!-- Row 6: Rule A6 Verify Time Bypass -->\n<tr class=\"hover:bg-surface-container-low/70 transition-colors cursor-pointer\">\n<td class=\"py-3.5 px-3 pl-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-1.5 h-8 rounded-full bg-outline-variant shrink-0\"></div>\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-bold text-on-surface text-[13px]\">FLAG-2024-0954</span>\n<span class=\"font-label-sm text-label-sm text-outline font-semibold\">Rule A6: TIME_BYPASS</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-secondary text-[12px]\">BRG-2024-0099</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Pos Masjid Ulil Albab</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 max-w-[190px]\">\n<p class=\"truncate text-on-surface\" title=\"Waktu tunggu verifikasi 15 menit dilewati tanpa catatan pengecualian.\">\n                  Persetujuan serah-terima instan tanpa masa tunggu minimum\n                </p>\n<span class=\"font-label-sm text-label-sm text-outline\">Bypass SOP standar</span>\n</td>\n<td class=\"py-3.5 px-2\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm\">\n                  Rendah\n                </span>\n</td>\n<td class=\"py-3.5 px-3 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-[11px] text-on-surface\">22 Okt 15:40</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">2 hari lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 text-center\">\n<span class=\"inline-flex px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-medium\">\n                  Ditinjau\n                </span>\n</td>\n<td class=\"py-3.5 px-3 pr-4 text-right\">\n<button class=\"w-7 h-7 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-all ml-auto\">\n<span class=\"material-symbols-outlined text-[16px]\">chevron_right</span>\n</button>\n</td>\n</tr>\n<!-- Row 7: Rule A7 BAST Rejection Excess -->\n<tr class=\"hover:bg-surface-container-low/70 transition-colors cursor-pointer\">\n<td class=\"py-3.5 px-3 pl-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-1.5 h-8 rounded-full bg-secondary shrink-0\"></div>\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-bold text-on-surface text-[13px]\">FLAG-2024-0948</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Rule A7: BAST_REJECT</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono font-semibold text-secondary text-[12px]\">BRG-2024-0087</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Pos GKU Timur</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 max-w-[190px]\">\n<p class=\"truncate text-on-surface\" title=\"Penolakan tanda tangan BAST digital berturut-turut lebih dari 3 kali.\">\n                  Pihak pengambil menolak tanda tangan formulir serah terima &gt;3x\n                </p>\n<span class=\"font-label-sm text-label-sm text-outline\">Sengketa kondisi fisik</span>\n</td>\n<td class=\"py-3.5 px-2\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n                  Sedang\n                </span>\n</td>\n<td class=\"py-3.5 px-3 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-[11px] text-on-surface\">22 Okt 09:10</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">2 hari lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3 text-center\">\n<span class=\"inline-flex px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold\">\n                  Insiden\n                </span>\n</td>\n<td class=\"py-3.5 px-3 pr-4 text-right\">\n<button class=\"w-7 h-7 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-all ml-auto\">\n<span class=\"material-symbols-outlined text-[16px]\">chevron_right</span>\n</button>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Pagination Table Footer -->\n<div class=\"p-space-md bg-surface-container-low/40 flex items-center justify-between mt-auto\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">\n          Menampilkan baris 1-7 dari total 23 penanda aktif\n        </span>\n<div class=\"flex items-center gap-1\">\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container flex items-center justify-center disabled:opacity-40\" disabled=\"\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_left</span>\n</button>\n<button class=\"w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center\">1</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center\">2</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center\">3</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_right</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Right-Side Inspection Drawer (Deep Detail for Selected Row: FLAG-2024-0988) -->\n<div class=\"col-span-12 xl:col-span-5 bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] overflow-hidden flex flex-col\">\n<!-- Drawer Header Bar -->\n<div class=\"p-space-md bg-primary-container text-on-primary flex items-center justify-between\">\n<div class=\"flex items-center gap-2.5\">\n<div class=\"w-9 h-9 rounded-lg bg-error text-on-error flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[20px]\">security</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-mono text-headline-sm font-bold tracking-tight text-white\">FLAG-2024-0988</span>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold\">Baru</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-primary-container\">Sentinel Detection Engine v2.4</span>\n</div>\n</div>\n<div class=\"flex items-center gap-1\">\n<span class=\"px-2 py-0.5 rounded-md bg-error text-white font-label-sm text-label-sm font-bold\">Kritis</span>\n<button class=\"w-8 h-8 rounded-lg hover:bg-white/10 text-on-primary-container hover:text-white flex items-center justify-center transition-colors\" title=\"Tutup Detail\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n</div>\n<!-- Drawer Scrollable Content -->\n<div class=\"p-space-md flex flex-col gap-space-md max-h-[820px] overflow-y-auto\">\n<!-- Rule Spec Card -->\n<div class=\"p-space-sm bg-surface-container-low rounded-xl flex flex-col gap-1.5\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase font-bold text-error tracking-wider\">Aturan Terpicu</span>\n<span class=\"font-mono font-semibold text-[11px] text-on-surface-variant\">RULE-ID: SENT-A1-MC</span>\n</div>\n<div class=\"font-headline-sm text-headline-sm text-on-surface leading-tight font-bold\">\n            Rule A1 \u2014 MULTIPLE_FAILED_CLAIMS_DIFFERENT_IDENTITY\n          </div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n            Sentinel mendeteksi 3 mahasiswa dengan NIM berlainan mencoba mengklaim barang fisik yang sama dalam rentang 24 jam dengan jawaban verifikasi saling bertolak belakang.\n          </p>\n</div>\n<!-- Subject Item & Ticket Entity Info -->\n<div class=\"flex flex-col gap-2\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold\">Entitas Subjek Terkait</span>\n<div class=\"grid grid-cols-2 gap-2\">\n<div class=\"p-2.5 rounded-lg bg-surface-container flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-outline\">Nomor Inventaris Fisik</span>\n<span class=\"font-mono font-bold text-secondary text-body-md\">BRG-2024-0142</span>\n<span class=\"font-body-sm text-body-sm text-on-surface truncate\">Flashdisk Sandisk Cruzer Blade 64GB</span>\n</div>\n<div class=\"p-2.5 rounded-lg bg-surface-container flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-outline\">Lokasi Simpan &amp; Posko</span>\n<span class=\"font-body-md text-body-md font-bold text-on-surface\">Pos Induk GKU</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Locker A-04 (Segel Aktif)</span>\n</div>\n</div>\n<div class=\"flex items-center gap-2 p-2 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[18px]\">confirmation_number</span>\n<span>Tiket Sengketa: <strong class=\"font-mono text-on-surface font-semibold\">HL-88219</strong> &amp; <strong class=\"font-mono text-on-surface font-semibold\">HL-88195</strong></span>\n</div>\n</div>\n<!-- Handover Physical Photo Thumbnail Evidence -->\n<div class=\"flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold\">Bukti Fisik Barang di Posko</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-medium\">Cap Waktu Digital: 24 Okt 08:32 WIB</span>\n</div>\n<div class=\"relative rounded-xl overflow-hidden bg-surface-container-highest group\">\n<img class=\"w-full h-36 object-cover object-center group-hover:scale-105 transition-transform duration-300\" data-alt=\"Close up archival security photo of a red and black Sandisk Cruzer 64GB USB flash drive placed inside a numbered campus lost-and-found locker box labeled GKU-04 with digital timestamp watermark on slate surface\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuBUPa1Be3gKH6jqCTZh9CaQmovsLB-ZPLYpO826Tt-oxR5RdLPZE4iXGY6E49riUvmLG4h1Sw90oCPn3_4rss9GLhhxZmi6FOVnV1_tZzOuY-6QTJrU8js_DuoaXngu9D4tvrY-UZqI6SyLieMIWA6MLdTap-d9DMyzXoJ96TiS8qDGNl37JxAa9pEjuIqaWr9mIqRqnmL4SUU17TFYWAmfkIixV3UBqXsdzRHMlJU\"/>\n<div class=\"absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-2.5\">\n<div class=\"flex items-center justify-between w-full text-on-primary\">\n<span class=\"font-label-sm text-label-sm font-mono flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">lock</span>\n                  Locker GKU-04 \u2022 SHA256: 7e9b...a12c\n                </span>\n<span class=\"font-label-sm text-label-sm underline cursor-pointer hover:text-secondary-fixed\">Perbesar</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Immutable Audit Trail Timeline -->\n<div class=\"flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold\">Jejak Audit Terkait (Immutable Blockchain Hash)</span>\n<span class=\"material-symbols-outlined text-outline text-[16px]\">verified</span>\n</div>\n<div class=\"flex flex-col gap-2\">\n<!-- Block 1 -->\n<div class=\"p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2.5\">\n<span class=\"w-2 h-2 rounded-full bg-error shrink-0 mt-1.5\"></span>\n<div class=\"flex flex-col flex-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-mono font-bold text-[12px] text-on-surface\">Blok #00142885</span>\n<span class=\"font-mono text-[11px] text-outline\">10:48:12 WIB</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium\">Percobaan klaim 3 gagal verifikasi</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">NIM: 22523140 \u2022 Gagal sebut isi nama file PDF skripsi internal</span>\n</div>\n</div>\n<!-- Block 2 -->\n<div class=\"p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2.5\">\n<span class=\"w-2 h-2 rounded-full bg-error shrink-0 mt-1.5\"></span>\n<div class=\"flex flex-col flex-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-mono font-bold text-[12px] text-on-surface\">Blok #00142878</span>\n<span class=\"font-mono text-[11px] text-outline\">09:55:04 WIB</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium\">Percobaan klaim 2 gagal verifikasi</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">NIM: 21523098 \u2022 Menjawab kapasitas 32GB (sebenarnya 64GB)</span>\n</div>\n</div>\n<!-- Block 3 -->\n<div class=\"p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2.5\">\n<span class=\"w-2 h-2 rounded-full bg-secondary shrink-0 mt-1.5\"></span>\n<div class=\"flex flex-col flex-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-mono font-bold text-[12px] text-on-surface\">Blok #00142862</span>\n<span class=\"font-mono text-[11px] text-outline\">08:35:20 WIB</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium\">Registrasi fisik oleh Petugas Posko</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Bripka Hendra Kurniawan (SEC-042) \u2022 Status terkunci di locker</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Security SOP Warning Callout -->\n<div class=\"p-space-sm rounded-xl bg-error-container/50 flex items-start gap-2.5\">\n<span class=\"material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5\">videocam_alert</span>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-bold text-error\">Prosedur Khusus BSI Security:</span>\n<p class=\"font-body-sm text-body-sm text-on-error-container leading-relaxed\">\n              Wajib periksa rekaman CCTV Pos Jaga Induk GKU kamera <strong class=\"font-semibold\">CAM-02 &amp; CAM-04</strong> rentang waktu 24 Okt 09:00 - 11:00 WIB untuk memvalidasi interaksi fisik pemohon klaim sebelum menyetujui pelepasan barang.\n            </p>\n</div>\n</div>\n<!-- Investigation Action Form -->\n<div class=\"flex flex-col gap-space-sm pt-2\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold flex items-center gap-1\" for=\"admin-notes\">\n<span>Catatan Peninjauan Investigasi</span>\n<span class=\"text-error font-bold\">*</span>\n</label>\n<span class=\"font-label-sm text-label-sm text-outline\">Wajib untuk Audit Trail</span>\n</div>\n<textarea class=\"w-full p-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-highest transition-colors resize-none\" id=\"admin-notes\" placeholder=\"Masukkan ringkasan pemeriksaan rekaman kamera, kontak satpam terkait, atau dasar eskalasi insiden...\" rows=\"3\"></textarea>\n<!-- Action Buttons -->\n<div class=\"grid grid-cols-2 gap-2.5 pt-1\">\n<button class=\"w-full py-2.5 px-3 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:bg-surface-container-high transition-all\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">check_circle</span>\n<span>Tandai Ditinjau</span>\n</button>\n<button class=\"w-full py-2.5 px-3 rounded-xl bg-error text-on-error font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(186,26,26,0.25)] hover:bg-on-error-container transition-all\">\n<span class=\"material-symbols-outlined text-[18px]\">security_update_warning</span>\n<span>Buka Insiden (Eskalasi)</span>\n</button>\n</div>\n<!-- Compliance Legal Footnote -->\n<div class=\"flex items-center justify-center gap-1.5 font-label-sm text-label-sm text-outline text-center pt-1\">\n<span class=\"material-symbols-outlined text-[13px] text-secondary\">verified_user</span>\n<span>Aksi ditandatangani Hardware Token MFA Ir. Ahmad Fauzi, M.T.</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div></main><footer class=\"w-full bg-surface-container-lowest py-space-sm shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-auto\"><div class=\"max-w-[1440px] mx-auto px-space-lg flex items-center justify-between text-on-surface-variant\"><div class=\"flex items-center gap-2 font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[16px] text-secondary\">shield</span><span>Badan Sistem Informasi (BSI) Universitas Islam Indonesia \u2022 Kepatuhan ISO/IEC 27001 &amp; Audit Trail Terdistribusi</span></div><div class=\"font-label-sm text-label-sm text-outline\">Setiap tindakan dipertanggungjawabkan dalam rantai audit.</div></div></footer></div>";

export default function PenandaAnomali({ onNavigate }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // Helper functions for showing / hiding modals cleanly
    const showModal = (modalId) => {
      const m = el.querySelector('#' + modalId);
      if (m) {
        m.classList.remove('hidden');
        m.classList.add('flex');
      }
    };

    const hideModal = (modalId) => {
      const m = el.querySelector('#' + modalId);
      if (m) {
        m.classList.add('hidden');
        m.classList.remove('flex');
      }
    };

    // Expose helpers on window for any inline scripts or onclick attributes
    window.openModal = (id) => showModal(id);
    window.closeModal = (id) => hideModal(id);

    window.filterTable = () => {
      const search = (el.querySelector('#searchInput')?.value || '').toLowerCase();
      const status = el.querySelector('#statusFilter')?.value || 'all';
      const pos = el.querySelector('#posFilter')?.value || 'all';
      const rows = el.querySelectorAll('.guard-row');
      let visibleCount = 0;
      rows.forEach(row => {
        const textContent = row.innerText.toLowerCase();
        const rowStatus = row.getAttribute('data-status');
        const rowPos = row.getAttribute('data-pos');
        const matchesSearch = textContent.includes(search);
        const matchesStatus = (status === 'all') || (rowStatus === status);
        const matchesPos = (pos === 'all') || (rowPos === pos);
        if (matchesSearch && matchesStatus && matchesPos) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });
      const badge = el.querySelector('#counterBadge');
      if (badge) badge.innerText = `${visibleCount} Petugas Ditampilkan`;
    };

    window.resetFilters = () => {
      const sInp = el.querySelector('#searchInput');
      const stF = el.querySelector('#statusFilter');
      const posF = el.querySelector('#posFilter');
      if (sInp) sInp.value = '';
      if (stF) stF.value = 'all';
      if (posF) posF.value = 'all';
      window.filterTable();
    };

    window.openResetPasswordModal = (name, nrp) => {
      if (confirm(`Apakah Anda yakin ingin me-reset kata sandi untuk ${name} (${nrp})? Tautan aktivasi baru akan di-generate dengan masa kedaluwarsa 15 menit.`)) {
        alert(`Tautan reset sandi darurat berhasil dikirim ke email dinas ${name}. Catatan audit tercatat.`);
      }
    };

    window.promptReactivate = (nrp, name) => {
      if (confirm(`Konfirmasi pencabutan penangguhan untuk ${name} (${nrp})? Memerlukan verifikasi status penutupan tiket investigasi.`)) {
        alert(`Status akun ${name} telah dipulihkan menjadi Aktif. Log pembukaan blokir tercatat.`);
      }
    };

    window.downloadCSVLog = () => {
      alert('Membuat ekspor CSV Log Autentikasi Satpam UII (30 Hari Terakhir). File otomatis terenkripsi PGP BSI.');
    };

    window.handleNonaktifSubmit = (e) => {
      if (e) e.preventDefault();
      alert('SUKSES: Akun petugas berhasil dinonaktifkan dari terminal pos jaga. Rantai audit hash telah dicatat ke Ledger BSI.');
      hideModal('modalNonaktifkan');
    };

    window.handleTambahSubmit = (e) => {
      if (e) e.preventDefault();
      alert('SUKSES: Akun petugas baru berhasil didaftarkan. Kredensial sementara telah dikirimkan via jalur resmi.');
      hideModal('modalTambahAkun');
    };

    window.updateSliders = (source, val) => {
      let numVal = parseInt(val) || 0;
      if (numVal < 0) numVal = 0;
      if (numVal > 100) numVal = 100;
      const slider = el.querySelector('#slider-' + source);
      const numInput = el.querySelector('#num-' + source);
      if (slider) slider.value = numVal;
      if (numInput) numInput.value = numVal;

      const kat = parseInt(el.querySelector('#num-kategori')?.value) || 0;
      const ciri = parseInt(el.querySelector('#num-ciri')?.value) || 0;
      const lok = parseInt(el.querySelector('#num-lokasi')?.value) || 0;
      const wkt = parseInt(el.querySelector('#num-waktu')?.value) || 0;
      const total = kat + ciri + lok + wkt;

      const badge = el.querySelector('#badge-total-bobot');
      const label = el.querySelector('#label-total-bobot');
      if (badge && label) {
        if (total === 100) {
          badge.className = "px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold flex items-center gap-1.5";
          label.textContent = "Total Bobot: 100% (Valid & Seimbang)";
        } else {
          badge.className = "px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-1.5";
          label.textContent = "Total Bobot: " + total + "% (Harus Tepat 100%)";
        }
      }
    };

    window.handleJustificationInput = (inputEl) => {
      const len = inputEl.value.trim().length;
      const counter = el.querySelector('#char-counter');
      if (counter) {
        counter.textContent = len + " / 30 karakter min";
        if (len >= 30) {
          counter.className = "font-label-sm text-label-sm text-secondary font-mono font-semibold";
        } else {
          counter.className = "font-label-sm text-label-sm text-on-surface-variant font-mono";
        }
      }
    };

    window.submitConfiguration = () => {
      const justifikasi = (el.querySelector('#input-justifikasi')?.value || '').trim();
      if (justifikasi.length < 30) {
        alert("Alasan & Justifikasi Administratif wajib diisi minimal 30 karakter sebelum FIDO2 commitment.");
        return;
      }
      const btn = el.querySelector('#btn-submit-mfa');
      if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span><span>Menandatangani ke Ledger...</span>';
      setTimeout(() => {
        alert("Tanda tangan FIDO2 berhasil divalidasi! Blok konfigurasi #00142897 telah ditambahkan ke Append-Only Ledger BSI.");
        hideModal('modal-konfirmasi');
        if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">fingerprint</span><span>Terapkan & Tanda Tangani Perubahan (MFA)</span>';
      }, 1000);
    };

    window.checkClosureReadiness = () => {
      const chk3 = el.querySelector('#chk-eval-3');
      const chk4 = el.querySelector('#chk-eval-4');
      const btnClose = el.querySelector('#btn-close-incident');
      if (btnClose) {
        if (chk3?.checked && chk4?.checked) {
          btnClose.disabled = false;
          btnClose.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
          btnClose.disabled = true;
          btnClose.classList.add('opacity-50', 'cursor-not-allowed');
        }
      }
    };

    // Setup AuditLog specific buttons if present
    const verifyBtn = el.querySelector('#btn-run-verify');
    const tamperToggleBtn = el.querySelector('#btn-toggle-demo-tamper');
    const statusBadge = el.querySelector('#chain-status-badge');
    let isTampered = false;

    if (verifyBtn && statusBadge) {
      verifyBtn.onclick = (ev) => {
        ev.preventDefault();
        const originalText = verifyBtn.innerHTML;
        verifyBtn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span><span>Memverifikasi 142,891 Hash...</span>';
        verifyBtn.classList.add('opacity-80', 'pointer-events-none');
        setTimeout(() => {
          verifyBtn.innerHTML = originalText;
          verifyBtn.classList.remove('opacity-80', 'pointer-events-none');
          if (!isTampered) {
            statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold';
            statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>Rantai Log Utuh (100% Valid)';
          } else {
            statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold';
            statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-error animate-ping"></span>Ditemukan Ketidaksesuaian Hash';
          }
        }, 600);
      };
    }

    if (tamperToggleBtn && statusBadge) {
      tamperToggleBtn.onclick = (ev) => {
        ev.preventDefault();
        isTampered = !isTampered;
        if (isTampered) {
          statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold';
          statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-error"></span>Simulasi: Hash Discrepancy Detected';
          tamperToggleBtn.innerHTML = '<span class="material-symbols-outlined text-[16px]">restart_alt</span><span>Pulihkan Status Utuh</span>';
        } else {
          statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold';
          statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>Rantai Log Utuh (100% Valid)';
          tamperToggleBtn.innerHTML = '<span class="material-symbols-outlined text-[16px]">sync_alt</span><span>Simulasi Status</span>';
        }
      };
    }

    const resetFilterBtn = el.querySelector('#btn-reset-filter');
    if (resetFilterBtn) {
      resetFilterBtn.onclick = (ev) => {
        ev.preventDefault();
        const inputs = el.querySelectorAll('select, input[type="text"]');
        inputs.forEach(item => {
          if (item.tagName === 'SELECT') item.selectedIndex = 0;
          if (item.tagName === 'INPUT') item.value = '';
        });
      };
    }

    // =========================================================================
    // EVENT LISTENER: CLICK
    // =========================================================================
    const handleClick = (e) => {
      // 1. Backdrop click to close modals
      if (e.target.id === 'modal-pelimpahan') {
        hideModal('modal-pelimpahan');
        return;
      }
      if (e.target.id === 'modal-tahan-baru') {
        hideModal('modal-tahan-baru');
        return;
      }
      if (e.target.id === 'modal-tahan-barang') {
        hideModal('modal-tahan-barang');
        return;
      }
      if (e.target.id === 'modal-tangguhkan-akun') {
        hideModal('modal-tangguhkan-akun');
        return;
      }
      if (e.target.id === 'modal-konfirmasi') {
        hideModal('modal-konfirmasi');
        return;
      }
      if (e.target.id === 'modalNonaktifkan') {
        hideModal('modalNonaktifkan');
        return;
      }
      if (e.target.id === 'modalTambahAkun') {
        hideModal('modalTambahAkun');
        return;
      }

      // 2. Radio card selection inside modal-pelimpahan (EFEK HITAM PINDAH)
      const transferActionLabel = e.target.closest('#modal-pelimpahan label');
      if (transferActionLabel && transferActionLabel.querySelector('input[name="transfer_action"]')) {
        e.preventDefault();
        const modalP = el.querySelector('#modal-pelimpahan');
        if (modalP) {
          const allActionLabels = modalP.querySelectorAll('label');
          allActionLabels.forEach(lbl => {
            const inp = lbl.querySelector('input[name="transfer_action"]');
            if (!inp) return;
            const tSpan = lbl.querySelector('.font-label-md');
            const sSpan = lbl.querySelector('.text-\[11px\]');
            if (lbl === transferActionLabel) {
              inp.checked = true;
              lbl.className = 'flex items-center gap-2 p-3 rounded-xl bg-primary-container text-on-primary cursor-pointer shadow-sm';
              if (tSpan) tSpan.className = 'font-label-md text-label-md font-semibold text-on-primary';
              if (sSpan) sSpan.className = 'text-[11px] text-primary-fixed-dim';
            } else {
              inp.checked = false;
              lbl.className = 'flex items-center gap-2 p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest cursor-pointer transition-colors text-on-surface';
              if (tSpan) tSpan.className = 'font-label-md text-label-md font-semibold text-on-surface';
              if (sSpan) sSpan.className = 'text-[11px] text-on-surface-variant';
            }
          });

          // Sync dropdown
          const destSelect = modalP.querySelector('select');
          if (destSelect) {
            const textChosen = (transferActionLabel.textContent || '').toLowerCase();
            if (textChosen.includes('lepas')) {
              destSelect.innerHTML = `
                <option selected>Pemilik Sah (Penyerahan Langsung via BAST Resmi di Posko)</option>
                <option>Brankas Pusat BSI (Gedung GBPH Prabuningrat Lt. 3)</option>
                <option>Polsek Ngaglik Sleman (Pelaporan Kepolisian)</option>
              `;
            } else if (textChosen.includes('pihak luar') || textChosen.includes('rektorat')) {
              destSelect.innerHTML = `
                <option selected>Biro Kemahasiswaan & Alumni (BKA UII)</option>
                <option>Polsek Ngaglik Sleman (Pelaporan Kepolisian)</option>
                <option>Divisi Hukum & Organisasi (DHO UII)</option>
                <option>Brankas Pusat BSI (Gedung GBPH Prabuningrat Lt. 3)</option>
              `;
            } else {
              destSelect.innerHTML = `
                <option selected>Brankas Pusat BSI (Gedung GBPH Prabuningrat Lt. 3)</option>
                <option>Polsek Ngaglik Sleman (Pelaporan Kepolisian)</option>
                <option>Biro Kemahasiswaan & Alumni (BKA UII)</option>
                <option>Divisi Hukum & Organisasi (DHO UII)</option>
              `;
            }
          }
        }
        return;
      }

      // 3. Radio card selection in DetailInsiden (keputusan_satpam & keputusan_barang)
      const satpamRadioLabel = e.target.closest('#modal-tangguhkan-akun label, .satpam-decision-card');
      if (satpamRadioLabel && satpamRadioLabel.querySelector('input[name="keputusan_satpam"]')) {
        const allLabels = el.querySelectorAll('label:has(input[name="keputusan_satpam"])');
        allLabels.forEach(lbl => {
          const inp = lbl.querySelector('input[name="keputusan_satpam"]');
          if (lbl === satpamRadioLabel) {
            if (inp) inp.checked = true;
            lbl.className = 'flex items-start gap-3 p-3 rounded-xl bg-error-container/30 ring-1 ring-error cursor-pointer';
          } else {
            if (inp) inp.checked = false;
            lbl.className = 'flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors';
          }
        });
      }

      const barangRadioLabel = e.target.closest('#modal-tahan-barang label, .barang-decision-card');
      if (barangRadioLabel && barangRadioLabel.querySelector('input[name="keputusan_barang"]')) {
        const allLabels = el.querySelectorAll('label:has(input[name="keputusan_barang"])');
        allLabels.forEach(lbl => {
          const inp = lbl.querySelector('input[name="keputusan_barang"]');
          if (lbl === barangRadioLabel) {
            if (inp) inp.checked = true;
            lbl.className = 'flex items-start gap-3 p-3 rounded-xl bg-surface-container-high cursor-pointer ring-1 ring-primary';
          } else {
            if (inp) inp.checked = false;
            lbl.className = 'flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors';
          }
        });
      }

      // Find closest interactive element
      const target = e.target.closest('a, button, [data-path], [data-action], tr, [role="button"]');
      if (!target) return;

      const path = (target.getAttribute('data-path') || target.getAttribute('href') || '').trim();
      const action = (target.getAttribute('data-action') || '').trim();
      const title = (target.getAttribute('title') || '').toLowerCase();
      const text = (target.textContent || '').trim();
      const lowerText = text.toLowerCase();

      // =========================================================================
      // 0. Beralih ke Portal Lain (Publik / Satpam)
      // =========================================================================
      if (
        path === 'portal-publik' ||
        lowerText.includes('kembali ke publik') ||
        path === 'logout' ||
        path === 'login' ||
        title.includes('keluar dari portal')
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('landing');
        return;
      }

      if (
        path === 'portal-satpam' ||
        lowerText.includes('buka portal satpam')
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_dashboard');
        return;
      }

      // =========================================================================
      // 1. Sidebar Nav: Admin Portal
      // =========================================================================
      // Beranda
      if (
        (path === 'beranda' && target.closest('aside')) ||
        (lowerText === 'beranda' && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_dashboard');
        return;
      }

      // Penanda Anomali
      if (
        (path === 'penanda-anomali' && target.closest('aside')) ||
        (lowerText.includes('penanda anomali') && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_anomali');
        return;
      }

      // Insiden (Detail Insiden)
      if (
        (path === 'insiden' && target.closest('aside')) ||
        (lowerText === 'insiden' && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_detail_insiden');
        return;
      }

      // Audit Log
      if (
        (path === 'audit-log' && target.closest('aside')) ||
        (lowerText.includes('audit log') && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_audit');
        return;
      }

      // Akun Satpam
      if (
        (path === 'akun-satpam' && target.closest('aside')) ||
        (lowerText.includes('akun satpam') && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_satpam');
        return;
      }

      // Barang Ditahan
      if (
        (path === 'barang-ditahan' && target.closest('aside')) ||
        (lowerText.includes('barang ditahan') && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_barang_ditahan');
        return;
      }

      // Parameter (Konfigurasi Sentinel)
      if (
        (path === 'parameter' && target.closest('aside')) ||
        (lowerText.includes('parameter') && target.closest('aside'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_parameter');
        return;
      }

      // =========================================================================
      // 2. SPECIFIC FIX: Beranda Admin (BerandaAdmin.jsx)
      // =========================================================================
      if (lowerText.includes('muat ulang metrik') || lowerText === 'sync' || target.id === 'btn-refresh') {
        e.preventDefault();
        const icon = target.querySelector('.material-symbols-outlined') || target;
        icon.classList.add('animate-spin');
        setTimeout(() => icon.classList.remove('animate-spin'), 700);
        alert('Metrik Sistem Dimuat Ulang!\n\nSeluruh 8 Pos Jaga & 3 Node Ledger Kriptografis telah disinkronkan secara real-time.');
        return;
      }

      if (lowerText.includes('laporan ringkasan pdf')) {
        e.preventDefault();
        alert('Mengunduh Laporan Ringkasan Keamanan & Inventaris BSI UII (.PDF)...');
        return;
      }

      if (lowerText.includes('tinjau') && (lowerText.includes('anomali') || lowerText.includes('ins-') || target.closest('tr'))) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_detail_insiden');
        return;
      }

      // =========================================================================
      // 3. SPECIFIC FIX: Penanda Anomali (PenandaAnomali.jsx)
      // =========================================================================
      if (lowerText.includes('konfigurasi rule engine')) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_parameter');
        return;
      }

      if (lowerText.includes('unduh laporan (csv)')) {
        e.preventDefault();
        alert('Mengunduh Laporan Penanda Anomali Sistem (.CSV)...');
        return;
      }

      // Filter pills (Semua Tingkat, Tinggi, Sedang, Rendah)
      if (
        lowerText === 'semua tingkat' ||
        lowerText === 'tinggi' ||
        lowerText === 'sedang' ||
        lowerText === 'rendah'
      ) {
        e.preventDefault();
        const filterBtns = el.querySelectorAll('button');
        filterBtns.forEach(b => {
          const t = b.textContent.trim().toLowerCase();
          if (t === 'semua tingkat' || t === 'tinggi' || t === 'sedang' || t === 'rendah') {
            if (t === lowerText) {
              b.className = 'px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-xs transition-all';
            } else {
              b.className = 'px-3.5 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all';
            }
          }
        });
        return;
      }

      // Anomaly card / row click -> Detail Insiden
      if (
        lowerText.includes('ins-2024-') ||
        lowerText.includes('rule a1') ||
        lowerText.includes('rule a2') ||
        lowerText.includes('rule a4') ||
        (target.closest('tr') && window.location.hash.includes('anomali')) ||
        (target.closest('.group') && lowerText.includes('anomali'))
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_detail_insiden');
        return;
      }

      // =========================================================================
      // 4. SPECIFIC FIX: Detail Insiden (DetailInsiden.jsx)
      // =========================================================================
      if (lowerText.includes('ekspor b.a. (pdf/a)')) {
        e.preventDefault();
        alert('Mengunduh Berita Acara Insiden INS-2024-0042 (Format PDF/A Resmi dengan Digital Signature Root CA UII)...');
        return;
      }

      if (lowerText.includes('audit trail lengkap')) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_audit');
        return;
      }

      if (lowerText.includes('tahan barang terkait')) {
        e.preventDefault();
        showModal('modal-tahan-barang');
        return;
      }

      if (lowerText.includes('buka suspensi') || lowerText.includes('suspend lain')) {
        e.preventDefault();
        showModal('modal-tangguhkan-akun');
        return;
      }

      // Close modal in Detail Insiden
      if (
        (lowerText === 'batal' || lowerText === 'close') &&
        (target.closest('#modal-tahan-barang') || target.closest('#modal-tangguhkan-akun'))
      ) {
        e.preventDefault();
        hideModal('modal-tahan-barang');
        hideModal('modal-tangguhkan-akun');
        return;
      }

      if (lowerText.includes('simpan draf investigasi')) {
        e.preventDefault();
        alert('Draf Investigasi Berhasil Disimpan!\n\nCatatan investigasi telah dicatat ke Ledger Audit Kriptografis.');
        return;
      }

      if (lowerText.includes('tutup insiden & terbitkan b.a.')) {
        e.preventDefault();
        alert('Insiden INS-2024-0042 Resmi Ditutup!\n\nBerita Acara Investigasi telah diterbitkan dan ditandatangani dengan kunci Root CA UII.');
        if (onNavigate) onNavigate('admin_dashboard');
        return;
      }

      // =========================================================================
      // 5. SPECIFIC FIX: Audit Log (AuditLog.jsx)
      // =========================================================================
      if (lowerText.includes('cek integritas rantai log') || target.id === 'btn-run-verify') {
        e.preventDefault();
        alert('Pengecekan Integritas Kriptografis Berhasil!\n\nStatus: 142,891 Blok Valid (100% Utuh)\nMerkle Tree Root Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\nTidak ada manipulasi ledger append-only.');
        return;
      }

      if (lowerText.includes('unduh dump log (jsonl)')) {
        e.preventDefault();
        alert('Mengunduh Dump Ledger Audit Append-Only Format JSONL Terenkripsi SHA-256...');
        return;
      }

      // =========================================================================
      // 6. SPECIFIC FIX: Manajemen Akun Satpam (ManajemenSatpam.jsx)
      // =========================================================================
      if (lowerText.includes('tambah akun satpam') || target.closest('[onclick*="modalTambahAkun"]')) {
        e.preventDefault();
        showModal('modalTambahAkun');
        return;
      }

      if (lowerText.includes('nonaktifkan akses') || target.closest('[onclick*="modalNonaktifkan"]')) {
        e.preventDefault();
        showModal('modalNonaktifkan');
        return;
      }

      if (lowerText.includes('ekspor csv log autentikasi') || lowerText.includes('ekspor log')) {
        e.preventDefault();
        window.downloadCSVLog();
        return;
      }

      // Close modals in Satpam
      if (
        (lowerText === 'batal' || lowerText === 'close') &&
        (target.closest('#modalTambahAkun') || target.closest('#modalNonaktifkan'))
      ) {
        e.preventDefault();
        hideModal('modalTambahAkun');
        hideModal('modalNonaktifkan');
        return;
      }

      // =========================================================================
      // 7. SPECIFIC FIX: Barang Ditahan (BarangDitahan.jsx)
      // =========================================================================
      // Open modal-pelimpahan
      if (lowerText.includes('limpahkan') || target.closest('[onclick*="modal-pelimpahan"]')) {
        e.preventDefault();
        showModal('modal-pelimpahan');
        return;
      }

      // Close modal-pelimpahan on 'X' or 'Batal'
      if (
        (lowerText === 'batal' || lowerText === 'close') &&
        target.closest('#modal-pelimpahan')
      ) {
        e.preventDefault();
        hideModal('modal-pelimpahan');
        return;
      }

      // Confirm modal-pelimpahan
      if (
        lowerText.includes('konfirmasi pelimpahan') ||
        target.closest('[onclick*="BAST"]') ||
        target.closest('[onclick*="modal-pelimpahan"]')
      ) {
        if (target.closest('#modal-pelimpahan') && (lowerText.includes('konfirmasi pelimpahan') || lowerText.includes('cetak bast'))) {
          e.preventDefault();
          hideModal('modal-pelimpahan');
          alert('Otorisasi MFA Hardware Berhasil!\n\nBerita Acara Serah Terima (BAST) #BAST-2024-0089 telah diterbitkan ke printer dan dicatat pada Append-Only Audit Log Blok #00142895.');
          
          // Visual feedback on row badge
          const badge = el.querySelector('#modal-pelimpahan')?.closest('body')?.querySelector('.bg-error-container') || el.querySelector('.bg-error-container');
          if (badge) {
            badge.className = 'px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-label-sm text-label-sm font-semibold flex items-center gap-1';
            badge.innerHTML = '<span class="material-symbols-outlined text-[14px]">check_circle</span> Dilimpahkan ke Brankas BSI';
          }
          return;
        }
      }

      // Open modal-tahan-baru
      if (lowerText.includes('tahan barang baru') || target.id === 'btn-open-tahan-modal') {
        e.preventDefault();
        showModal('modal-tahan-baru');
        return;
      }

      // Close modal-tahan-baru
      if (
        (lowerText === 'batal' || lowerText === 'close' || action === 'close-modal-tahan-baru') &&
        target.closest('#modal-tahan-baru')
      ) {
        e.preventDefault();
        hideModal('modal-tahan-baru');
        return;
      }

      // Confirm modal-tahan-baru
      if (action === 'submit-tahan-baru' || lowerText.includes('kunci & terbitkan perintah')) {
        e.preventDefault();
        hideModal('modal-tahan-baru');
        alert('Perintah Penahanan Barang Diterbitkan!\n\nNomor Segel: SG-092\nBarang dipindahkan ke Brankas Pengamanan Khusus BSI.');
        return;
      }

      // Filter tabs in Barang Ditahan
      if (
        lowerText.includes('semua ditahan') ||
        lowerText.includes('sengketa identitas') ||
        lowerText.includes('pelanggaran etik') ||
        lowerText.includes('barang bukti polisi')
      ) {
        e.preventDefault();
        const tabBtns = el.querySelectorAll('button');
        tabBtns.forEach(btn => {
          const t = btn.textContent.trim().toLowerCase();
          if (t.includes('semua ditahan') || t.includes('sengketa identitas') || t.includes('pelanggaran etik') || t.includes('barang bukti polisi')) {
            if (btn === target || btn.contains(target)) {
              btn.className = 'px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-xs transition-all';
            } else {
              btn.className = 'px-3.5 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all';
            }
          }
        });
        return;
      }

      // =========================================================================
      // 8. SPECIFIC FIX: Konfigurasi Parameter Sentinel (KonfigurasiSentinel.jsx)
      // =========================================================================
      if (lowerText.includes('simpan perubahan parameter')) {
        e.preventDefault();
        showModal('modal-konfirmasi');
        return;
      }

      if (lowerText.includes('terapkan & tanda tangani')) {
        e.preventDefault();
        window.submitConfiguration();
        return;
      }

      if (lowerText.includes('pulihkan pengaturan default')) {
        e.preventDefault();
        alert('Parameter Sistem Berhasil Dipulihkan ke Pengaturan Bawaan Pabrik (Default UII)!');
        return;
      }

      if (lowerText.includes('ekspor konfigurasi (.json)')) {
        e.preventDefault();
        alert('Mengunduh File Konfigurasi Mesin Sentinel: config_sentinel_v2.4.json...');
        return;
      }

      if (
        (lowerText === 'batal' || lowerText === 'close') &&
        target.closest('#modal-konfirmasi')
      ) {
        e.preventDefault();
        hideModal('modal-konfirmasi');
        return;
      }
    };

    // =========================================================================
    // EVENT LISTENER: INPUT (Sliders, Search, Counters)
    // =========================================================================
    const handleInput = (e) => {
      const target = e.target;
      if (!target) return;

      // Sliders in Konfigurasi Sentinel
      if (target.type === 'range' && target.id && target.id.startsWith('slider-')) {
        const source = target.id.replace('slider-', '');
        window.updateSliders(source, target.value);
        return;
      }

      // Number inputs for sliders in Konfigurasi Sentinel
      if (target.type === 'number' && target.id && target.id.startsWith('num-')) {
        const source = target.id.replace('num-', '');
        window.updateSliders(source, target.value);
        return;
      }

      // Justifikasi input in Konfigurasi Sentinel
      if (target.id === 'input-justifikasi') {
        window.handleJustificationInput(target);
        return;
      }

      // Search input in Manajemen Satpam
      if (target.id === 'searchInput') {
        window.filterTable();
        return;
      }
    };

    // =========================================================================
    // EVENT LISTENER: CHANGE (Select Filters, Checkboxes)
    // =========================================================================
    const handleChange = (e) => {
      const target = e.target;
      if (!target) return;

      // Status/Pos filter in Manajemen Satpam
      if (target.id === 'statusFilter' || target.id === 'posFilter') {
        window.filterTable();
        return;
      }

      // Checkboxes in Detail Insiden
      if (target.id === 'chk-eval-3' || target.id === 'chk-eval-4') {
        window.checkClosureReadiness();
        return;
      }
    };

    el.addEventListener('click', handleClick);
    el.addEventListener('input', handleInput);
    el.addEventListener('change', handleChange);

    return () => {
      el.removeEventListener('click', handleClick);
      el.removeEventListener('input', handleInput);
      el.removeEventListener('change', handleChange);
      delete window.openModal;
      delete window.closeModal;
      delete window.filterTable;
      delete window.resetFilters;
      delete window.openResetPasswordModal;
      delete window.promptReactivate;
      delete window.downloadCSVLog;
      delete window.handleNonaktifSubmit;
      delete window.handleTambahSubmit;
      delete window.updateSliders;
      delete window.handleJustificationInput;
      delete window.submitConfiguration;
      delete window.checkClosureReadiness;
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
