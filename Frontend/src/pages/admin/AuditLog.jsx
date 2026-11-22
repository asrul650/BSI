import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Administrator BSI: Audit Log Append-Only - Portal Administrator BSI
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]\"><div class=\"flex flex-col\"><div class=\"px-space-md py-space-md flex items-center gap-3 bg-surface-container-low\"><div class=\"w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-secondary-fixed text-[24px]\">verified_user</span></div><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none\">BSI \u2022 UII</span><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1\">Portal Administrator BSI</span></div></div><div class=\"px-space-md pt-space-md pb-space-xs\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest\">Menu Navigasi Audit</span></div><nav class=\"flex flex-col px-space-sm gap-1\" data-active-classes=\"bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)]\">\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">grid_view</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"penanda-anomali\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">warning</span>\n    <span>Penanda Anomali</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"insiden\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">security_update_warning</span>\n    <span>Insiden</span>\n  </a>\n  <a aria-current=\"page\" class=\"flex items-center gap-3 px-space-md py-space-xs transition-all bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)] font-semibold cursor-pointer\" data-path=\"audit-log\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">history_edu</span>\n    <span>Audit Log</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"akun-satpam\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Akun Satpam</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"barang-ditahan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">lock_clock</span>\n    <span>Barang Ditahan</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"parameter\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">tune</span>\n    <span>Parameter</span>\n  </a>\n</nav></div><div class=\"p-space-md m-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\"><div class=\"flex items-center justify-between\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Keamanan Sesi</span><span class=\"flex h-2 w-2 rounded-full bg-secondary\"></span></div><div class=\"font-label-md text-label-md text-on-surface font-semibold\">Sesi Aktif: 07:42:15 tersisa</div><div class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">vpn_lock</span>10.12.0.4 - VPN Terpadu</div><div class=\"flex items-center justify-between pt-1\"><div class=\"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">speed</span>Latensi: 14ms</div><a class=\"font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1\" data-path=\"kontak-siaga\" href=\"#\"><span class=\"material-symbols-outlined text-[14px]\">emergency</span>Kontak Siaga</a></div></div><!-- Portal Shortcut Buttons -->\n<div class=\"px-space-md pt-1 pb-2 flex flex-col gap-1.5\">\n  <button data-path=\"portal-satpam\" class=\"w-full py-2 px-3 rounded-xl border border-outline-variant/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">local_police</span>\n    <span>Buka Portal Satpam</span>\n  </button>\n  <button data-path=\"portal-publik\" class=\"w-full py-1.5 px-3 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">public</span>\n    <span>Kembali ke Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72 flex flex-col min-h-screen\"><header class=\"fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-space-lg flex items-center justify-between\"><div class=\"flex items-center gap-space-md\"><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface leading-tight\">BSI Admin Portal - Lost &amp; Found Kampus UII</span><div class=\"flex items-center gap-2 mt-1\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface\"><span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>Sistem Operasional Normal - Gateway BSI Terhubung</span><span class=\"px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant\">Production v2.4-sec</span><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[13px]\">key</span>MFA Aktif - Hardware Token</span></div></div></div><div class=\"flex items-center gap-space-md\"><div class=\"relative w-72\"><span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">search</span><input class=\"w-full h-10 pl-9 pr-3 rounded-full bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors\" placeholder=\"Cari log / item / ID insiden...\" type=\"text\"/></div><div class=\"relative flex items-center justify-center\"><button class=\"w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors\"><span class=\"material-symbols-outlined text-[20px]\">notifications</span></button><span class=\"absolute top-1 right-1 h-2 w-2 rounded-full bg-error\"></span></div><div class=\"flex items-center gap-3 pl-2\"><div class=\"flex flex-col text-right\"><span class=\"font-label-md text-label-md text-on-surface\">Ir. Ahmad Fauzi, M.T.</span><span class=\"font-label-sm text-label-sm text-on-surface-variant\">Super Admin / Audit Officer</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"ml-2 w-9 h-9 rounded-full hover:bg-error-container hover:text-on-error-container text-on-surface-variant flex items-center justify-center transition-colors\" data-path=\"login\" href=\"#\" title=\"Keluar dari Portal\"><span class=\"material-symbols-outlined text-[18px]\">logout</span></a></div></div></header><main class=\"w-full pt-20 px-space-lg flex-1 bg-surface max-w-[1440px] mx-auto pb-space-lg\"><div class=\"flex flex-col w-full\">\n<!-- Top Section: Header, Cryptographic Badge, Verification Card -->\n<div class=\"flex flex-col gap-space-md mb-space-lg\">\n<!-- Breadcrumb & Immutable Status Row -->\n<div class=\"flex items-center justify-between\">\n<div class=\"flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant\">\n<span>Beranda Admin</span>\n<span class=\"material-symbols-outlined text-[16px] text-outline\">chevron_right</span>\n<span>Keamanan &amp; Kepatuhan</span>\n<span class=\"material-symbols-outlined text-[16px] text-outline\">chevron_right</span>\n<span class=\"font-semibold text-on-surface\">Log Audit Kriptografis</span>\n</div>\n<!-- Immutable & Security Compliance Badges -->\n<div class=\"flex items-center gap-space-sm\">\n<div class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary shadow-sm font-label-sm text-label-sm tracking-wide uppercase\">\n<span class=\"material-symbols-outlined text-[14px] text-secondary-fixed\">lock</span>\n<span>Append-Only Ledger</span>\n</div>\n<div class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[14px] text-secondary\">verified</span>\n<span>SHA-256 Chained Hash</span>\n</div>\n<div class=\"inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant\">\n<span>ISO/IEC 27001 Terverifikasi</span>\n</div>\n</div>\n</div>\n<!-- Integrity Dashboard Panel (Cryptographic Proof) -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col lg:flex-row items-stretch justify-between gap-space-md\">\n<!-- Left: State & Merkle Tree Stats -->\n<div class=\"flex items-start gap-space-md flex-1\">\n<div class=\"w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shrink-0 shadow-sm\">\n<span class=\"material-symbols-outlined text-secondary-fixed text-[28px]\">hub</span>\n</div>\n<div class=\"flex flex-col gap-1 min-w-0\">\n<div class=\"flex items-center gap-space-sm\">\n<span class=\"font-headline-sm text-headline-sm text-on-surface\">Status Rantai Kriptografis:</span>\n<span class=\"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold\" id=\"chain-status-badge\">\n<span class=\"w-2 h-2 rounded-full bg-secondary animate-pulse\"></span>\n              Rantai Log Utuh (100% Valid)\n            </span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface-variant line-clamp-1\">\n            Total <strong class=\"text-on-surface\">142,891 blok</strong> terverifikasi tanpa anomali Merkle Tree. Rentang: <code class=\"px-1.5 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface\">#00000000</code> hingga <code class=\"px-1.5 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface\">#00142891</code>.\n          </p>\n<div class=\"flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm mt-0.5\">\n<span class=\"flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">schedule</span>\n              Diverifikasi: 24 Okt 2024, 11:58:12 WIB\n            </span>\n<span class=\"flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">device_hub</span>\n              Replikasi: 3 Simpul Dingin (BSI-DC1, BSI-DC2, UII-Vault)\n            </span>\n<span class=\"flex items-center gap-1 text-secondary\">\n<span class=\"material-symbols-outlined text-[14px]\">format_image_left</span>\n              Root CA UII Tersemat\n            </span>\n</div>\n</div>\n</div>\n<!-- Right: Action Buttons (Verification & Immutable Export) -->\n<div class=\"flex items-center gap-space-sm shrink-0 self-center lg:self-auto\">\n<button class=\"px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm transition-all flex items-center gap-1.5\" id=\"btn-toggle-demo-tamper\" title=\"Simulasi validasi ulang integritas Merkle Tree\">\n<span class=\"material-symbols-outlined text-[16px]\">sync_alt</span>\n<span>Simulasi Status</span>\n</button>\n<button class=\"px-space-md py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md shadow-sm transition-all flex items-center gap-2\" id=\"btn-run-verify\">\n<span class=\"material-symbols-outlined text-[18px]\">fact_check</span>\n<span>Cek Integritas Rantai Log</span>\n</button>\n<div class=\"relative group\">\n<button class=\"px-space-md py-2.5 rounded-full bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md text-label-md shadow-sm transition-all flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px]\">download_for_offline</span>\n<span>Ekspor Log (.CSV / JSON-LD)</span>\n<span class=\"material-symbols-outlined text-[16px] text-outline\">expand_more</span>\n</button>\n<div class=\"hidden group-hover:flex flex-col absolute right-0 top-full mt-1.5 w-56 bg-surface-container-lowest rounded-xl shadow-xl p-1.5 z-20\">\n<button class=\"w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container font-label-sm text-label-sm text-on-surface flex items-center justify-between\">\n<span>Unduh CSV Lengkap</span>\n<span class=\"material-symbols-outlined text-[14px] text-outline\">table_view</span>\n</button>\n<button class=\"w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container font-label-sm text-label-sm text-on-surface flex items-center justify-between\">\n<span>JSON-LD Kriptografis</span>\n<span class=\"material-symbols-outlined text-[14px] text-outline\">data_object</span>\n</button>\n<button class=\"w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container font-label-sm text-label-sm text-on-surface flex items-center justify-between\">\n<span>Bukti Merkle (Proof File)</span>\n<span class=\"material-symbols-outlined text-[14px] text-outline\">fingerprint</span>\n</button>\n</div>\n</div>\n</div>\n</div>\n</div>\n<!-- Multi-Parameter Dense Filter Bar -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-md flex flex-col gap-space-sm\">\n<div class=\"flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">tune</span>\n<span class=\"font-label-lg text-label-lg text-on-surface\">Parameter Penelusuran Audit</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant\">Read-only Stream</span>\n</div>\n<div class=\"flex items-center gap-space-sm\">\n<span class=\"font-body-sm text-body-sm text-outline\">Menampilkan rekaman log tersaring</span>\n<button class=\"px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors\" id=\"btn-reset-filter\">\n<span class=\"material-symbols-outlined text-[14px]\">refresh</span>\n<span>Reset Filter</span>\n</button>\n</div>\n</div>\n<!-- Filter Inputs Grid -->\n<div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-sm items-center\">\n<!-- Aktor -->\n<div class=\"flex flex-col gap-1\">\n<label class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Aktor / Pegawai</label>\n<div class=\"relative\">\n<select class=\"w-full h-9 pl-3 pr-8 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface appearance-none focus:outline-none focus:bg-surface-container-high\">\n<option selected=\"\">Semua Aktor</option>\n<option>Ir. Ahmad Fauzi, M.T. [BSI-001]</option>\n<option>Bripka Hendra Kurniawan [SEC-042]</option>\n<option>Aiptu Bambang Sutrisno [SEC-019]</option>\n<option>Sentinel-AI [BOT-CRON-UII]</option>\n<option>Gateway SSO UII [AUTH-GW]</option>\n</select>\n<span class=\"material-symbols-outlined pointer-events-none absolute right-2 top-2 text-outline text-[16px]\">expand_more</span>\n</div>\n</div>\n<!-- Peran -->\n<div class=\"flex flex-col gap-1\">\n<label class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Peran Pengguna</label>\n<div class=\"relative\">\n<select class=\"w-full h-9 pl-3 pr-8 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface appearance-none focus:outline-none focus:bg-surface-container-high\">\n<option selected=\"\">Semua Peran</option>\n<option>Super Admin BSI</option>\n<option>Petugas Satpam Posko</option>\n<option>Sistem Otomatis (Cron)</option>\n<option>Civitas SSO Mahasiswa</option>\n</select>\n<span class=\"material-symbols-outlined pointer-events-none absolute right-2 top-2 text-outline text-[16px]\">expand_more</span>\n</div>\n</div>\n<!-- Aksi Semantik -->\n<div class=\"flex flex-col gap-1\">\n<label class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Aksi Kriptografis</label>\n<div class=\"relative\">\n<select class=\"w-full h-9 pl-3 pr-8 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface appearance-none focus:outline-none focus:bg-surface-container-high\">\n<option selected=\"\">Semua Aksi</option>\n<option>AUTH_MFA_SUCCESS</option>\n<option>ITEM_ATTR_CORRECTION</option>\n<option>CLAIM_VERIFY_APPROVED</option>\n<option>CLAIM_VERIFY_REJECTED</option>\n<option>GUARD_SUSPENDED</option>\n<option>ANOMALY_RESOLVED</option>\n<option>EXPORT_DISPATCH</option>\n</select>\n<span class=\"material-symbols-outlined pointer-events-none absolute right-2 top-2 text-outline text-[16px]\">expand_more</span>\n</div>\n</div>\n<!-- Subjek / ID Target -->\n<div class=\"flex flex-col gap-1\">\n<label class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Subjek / ID Target</label>\n<div class=\"relative\">\n<input class=\"w-full h-9 pl-3 pr-7 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-high\" placeholder=\"BRG-, SEC-, HL-, FLAG-, IP...\" type=\"text\"/>\n<span class=\"material-symbols-outlined absolute right-2 top-2 text-outline text-[16px]\">search</span>\n</div>\n</div>\n<!-- Rentang Tanggal -->\n<div class=\"flex flex-col gap-1\">\n<label class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Rentang Waktu</label>\n<div class=\"relative\">\n<select class=\"w-full h-9 pl-3 pr-8 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface appearance-none focus:outline-none focus:bg-surface-container-high\">\n<option selected=\"\">24 Jam Terakhir</option>\n<option>7 Hari Terakhir</option>\n<option>30 Hari Terakhir</option>\n<option>Kuartal Berjalan</option>\n<option>Kustom Rentang Tanggal...</option>\n</select>\n<span class=\"material-symbols-outlined pointer-events-none absolute right-2 top-2 text-outline text-[16px]\">calendar_today</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Primary Immutable Audit Log Table -->\n<div class=\"bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col mb-space-md\">\n<!-- Table Header Info Bar -->\n<div class=\"px-space-md py-space-sm bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex items-center gap-space-sm\">\n<span class=\"font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider\">Buku Besar Audit (Ledger Immutable)</span>\n<span class=\"px-2 py-0.5 rounded bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant\">Mode: Read-Only Ketat</span>\n</div>\n<div class=\"flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant\">\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n<span>Streaming Sinkron: 14ms Latensi Node</span>\n</div>\n</div>\n<!-- Dense Data Table Container -->\n<div class=\"overflow-x-auto\">\n<table class=\"w-full text-left\">\n<thead>\n<tr class=\"bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider\">\n<th class=\"py-space-sm px-space-md whitespace-nowrap\">Waktu &amp; Blok</th>\n<th class=\"py-space-sm px-space-md whitespace-nowrap\">Aktor &amp; ID</th>\n<th class=\"py-space-sm px-space-md whitespace-nowrap\">Peran</th>\n<th class=\"py-space-sm px-space-md whitespace-nowrap\">Aksi Kripto</th>\n<th class=\"py-space-sm px-space-md whitespace-nowrap\">Subjek</th>\n<th class=\"py-space-sm px-space-md min-w-[280px]\">Ringkasan Peristiwa</th>\n<th class=\"py-space-sm px-space-md whitespace-nowrap\">IP &amp; Terminal</th>\n<th class=\"py-space-sm px-space-md text-right whitespace-nowrap\">Detail Payload</th>\n</tr>\n</thead>\n<tbody class=\"font-body-sm text-body-sm divide-y-0 text-on-surface\">\n<!-- Row 1 (Expanded State Demonstration for BRG-2024-0142) -->\n<tr class=\"bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group\">\n<td class=\"py-space-sm px-space-md whitespace-nowrap align-top\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">24 Okt 2024 11:52:14</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1\">\n<span>Blok #00142891</span>\n<span class=\"text-secondary font-mono\">\u25cf</span>\n</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap align-top\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">Ir. Ahmad Fauzi, M.T.</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">ID: BSI-001 (Audit Officer)</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap align-top\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm\">\n                Super Admin BSI\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap align-top\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface font-semibold\">\n                ITEM_ATTR_CORRECTION\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap align-top\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-mono font-semibold text-label-sm\">\n                BRG-2024-0142\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md align-top\">\n<p class=\"text-on-surface font-medium leading-relaxed\">\n                Koreksi data fisik versi 1.1 pada warna &amp; nomor rak flashdisk USB SanDisk 64GB\n              </p>\n<span class=\"font-label-sm text-label-sm text-outline\">Alasan: Kesalahan input serial awal oleh petugas jaga GKU</span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap align-top\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-on-surface\">10.12.0.4</span>\n<span class=\"font-label-sm text-label-sm text-secondary flex items-center gap-0.5\">\n<span class=\"material-symbols-outlined text-[12px]\">vpn_key</span> VPN Terpadu BSI\n                </span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md text-right whitespace-nowrap align-top\">\n<button class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-primary-container hover:text-on-primary transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span>\n<span>Payload</span>\n<span class=\"material-symbols-outlined text-[16px]\">expand_less</span>\n</button>\n</td>\n</tr>\n<!-- Expandable Payload Detail Section for Row 1 -->\n<tr class=\"bg-surface-container-lowest\">\n<td class=\"p-space-md bg-surface-container-lowest\" colspan=\"8\">\n<div class=\"rounded-xl bg-surface-container-low p-space-md shadow-inner flex flex-col gap-space-md\">\n<!-- Chained Hash Verification Strip -->\n<div class=\"flex flex-col lg:flex-row items-center justify-between p-space-sm rounded-lg bg-surface-container-lowest gap-space-sm\">\n<div class=\"flex items-center gap-2 text-on-surface font-label-md text-label-md\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">link</span>\n<span>Tautan Kriptografis Blok #00142891</span>\n</div>\n<div class=\"flex flex-wrap items-center gap-2 font-mono font-label-sm text-label-sm\">\n<span class=\"px-2 py-1 rounded bg-surface-container text-on-surface-variant flex items-center gap-1\">\n<span class=\"text-outline\">Prev Hash:</span>\n<strong class=\"text-on-surface\">8f4b52c0...43a1c90</strong>\n</span>\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">arrow_forward</span>\n<span class=\"px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed-variant flex items-center gap-1\">\n<span>Current Hash:</span>\n<strong>e3b0c442...9f28d71</strong>\n</span>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-label-sm\">Valid</span>\n</div>\n</div>\n<!-- Structured JSON Diff Payload -->\n<div class=\"grid grid-cols-1 lg:grid-cols-2 gap-space-md\">\n<!-- Payload JSON -->\n<div class=\"flex flex-col gap-1.5\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold\">Struktur Data Perubahan (Delta JSON)</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Skema: uii-audit-v2.1</span>\n</div>\n<pre class=\"bg-primary-container text-secondary-fixed p-space-md rounded-xl font-mono text-label-sm overflow-x-auto leading-relaxed shadow-sm\">\n{\n  <span class=\"text-on-primary-container\">\"block_id\"</span>: <span class=\"text-secondary-container\">\"00142891\"</span>,\n  <span class=\"text-on-primary-container\">\"entity_id\"</span>: <span class=\"text-secondary-container\">\"BRG-2024-0142\"</span>,\n  <span class=\"text-on-primary-container\">\"event_type\"</span>: <span class=\"text-secondary-container\">\"ITEM_ATTR_CORRECTION\"</span>,\n  <span class=\"text-on-primary-container\">\"author\"</span>: {\n    <span class=\"text-on-primary-container\">\"id\"</span>: <span class=\"text-secondary-container\">\"BSI-001\"</span>,\n    <span class=\"text-on-primary-container\">\"name\"</span>: <span class=\"text-secondary-container\">\"Ir. Ahmad Fauzi, M.T.\"</span>,\n    <span class=\"text-on-primary-container\">\"mfa_method\"</span>: <span class=\"text-secondary-container\">\"FIDO2_HARDWARE_KEY_YUBIKEY\"</span>\n  },\n  <span class=\"text-on-primary-container\">\"diff_payload\"</span>: {\n    <span class=\"text-on-primary-container\">\"rak_penyimpanan\"</span>: { <span class=\"text-error-container text-error\">\"old\"</span>: <span class=\"text-on-primary\">\"RAK-B-02\"</span>, <span class=\"text-secondary\">\"new\"</span>: <span class=\"text-secondary-fixed\">\"RAK-A-14\"</span> },\n    <span class=\"text-on-primary-container\">\"warna_casing\"</span>: { <span class=\"text-error-container text-error\">\"old\"</span>: <span class=\"text-on-primary\">\"Hitam Polos\"</span>, <span class=\"text-secondary\">\"new\"</span>: <span class=\"text-secondary-fixed\">\"Merah-Hitam SanDisk\"</span> },\n    <span class=\"text-on-primary-container\">\"verifikasi_fisik_ulang\"</span>: <span class=\"text-secondary-container\">true</span>\n  },\n  <span class=\"text-on-primary-container\">\"audit_timestamp_utc\"</span>: <span class=\"text-secondary-container\">\"2024-10-24T04:52:14.208Z\"</span>\n}</pre>\n</div>\n<!-- Cryptographic Signature & Attestation -->\n<div class=\"flex flex-col gap-1.5\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold\">Tanda Tangan Digital &amp; Telemetri</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Tervalidasi Root CA UII</span>\n</div>\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-sm h-full justify-between\">\n<div class=\"flex flex-col gap-2\">\n<div class=\"flex items-center justify-between text-on-surface font-label-sm text-label-sm\">\n<span class=\"text-on-surface-variant\">Algoritma Asimetris:</span>\n<span class=\"font-mono font-semibold\">RSA-4096 / SHA-256 PKCS#1 v1.5</span>\n</div>\n<div class=\"flex items-center justify-between text-on-surface font-label-sm text-label-sm\">\n<span class=\"text-on-surface-variant\">Sertifikat Penandatangan:</span>\n<span class=\"font-mono\">CN=UII-BSI-CA-PRODUCTION-2024</span>\n</div>\n<div class=\"flex items-center justify-between text-on-surface font-label-sm text-label-sm\">\n<span class=\"text-on-surface-variant\">Signature Hash:</span>\n<span class=\"font-mono text-outline text-[11px] truncate max-w-[260px]\">9b4f69c8a2b5e3f1...e04ca9813d4</span>\n</div>\n<div class=\"flex items-center justify-between text-on-surface font-label-sm text-label-sm\">\n<span class=\"text-on-surface-variant\">Terminal User-Agent:</span>\n<span class=\"text-on-surface truncate max-w-[260px]\">Mozilla/5.0 (Admin Workstation 10.12.0.4)</span>\n</div>\n<div class=\"flex items-center justify-between text-on-surface font-label-sm text-label-sm\">\n<span class=\"text-on-surface-variant\">Nonce Kriptografis:</span>\n<span class=\"font-mono text-on-surface\">0x7F4A8810E24D9</span>\n</div>\n</div>\n<div class=\"p-2.5 rounded-lg bg-surface-container flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Integritas Entri Log</span>\n<div class=\"flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[16px]\">verified_user</span>\n<span>Tidak Dapat Dimanipulasi / Append-Only</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</td>\n</tr>\n<!-- Row 2: Emergency Guard Suspension -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">24 Okt 2024 10:41:09</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Blok #00142890</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">Sentinel-AI [BOT-CRON]</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">ID: BOT-AUTOSECURITY</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm\">\n                Sistem Otomatis\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-error-container text-on-error-container font-mono text-label-sm font-semibold\">\n                GUARD_SUSPENDED\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-surface-container-high font-mono font-semibold text-label-sm text-on-surface\">\n                SEC-035\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md\">\n<p class=\"text-on-surface font-medium leading-relaxed\">\n                Pembekuan darurat akses portal satpam karena terdeteksi percobaan bypass verifikasi biometrik\n              </p>\n<span class=\"font-label-sm text-label-sm text-error\">Anomali Terpicu: ANOMALY-7719 (High Risk Violation)</span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-on-surface\">127.0.0.1</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Internal Gateway Trigger</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md text-right whitespace-nowrap\">\n<button class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span>\n<span>Payload</span>\n<span class=\"material-symbols-outlined text-[16px]\">expand_more</span>\n</button>\n</td>\n</tr>\n<!-- Row 3: Claim Verification Approved -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">24 Okt 2024 09:15:33</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Blok #00142889</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">Bripka Hendra Kurniawan</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">ID: SEC-042 (Pos Induk)</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm\">\n                Petugas Satpam\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-mono text-label-sm font-semibold\">\n                CLAIM_VERIFY_APPROVED\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-mono font-semibold text-label-sm\">\n                HL-88219\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md\">\n<p class=\"text-on-surface font-medium leading-relaxed\">\n                Penyerahan klaim laptop ASUS Zenbook kepada mahasiswa (NIM 21523... ) dengan verifikasi KTM NFC\n              </p>\n<span class=\"font-label-sm text-label-sm text-outline\">Nomor Berkas Serah Terima: BST-2024-X-994</span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-on-surface\">10.12.8.44</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Terminal Pos Induk GKU</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md text-right whitespace-nowrap\">\n<button class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span>\n<span>Payload</span>\n<span class=\"material-symbols-outlined text-[16px]\">expand_more</span>\n</button>\n</td>\n</tr>\n<!-- Row 4: MFA Success Login -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">24 Okt 2024 08:00:02</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Blok #00142888</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">Ir. Ahmad Fauzi, M.T.</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">ID: BSI-001 (Audit Officer)</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm\">\n                Super Admin BSI\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface font-semibold\">\n                AUTH_MFA_SUCCESS\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-surface-container-high font-mono font-semibold text-label-sm text-on-surface\">\n                SESI-MFA-940\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md\">\n<p class=\"text-on-surface font-medium leading-relaxed\">\n                Autentikasi dua faktor berhasil menggunakan Kunci Perangkat Keras FIDO2 (YubiKey 5C NFC)\n              </p>\n<span class=\"font-label-sm text-label-sm text-secondary\">Token RSA: Valid (Kedaluwarsa dlm 8 jam)</span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-on-surface\">10.12.0.4</span>\n<span class=\"font-label-sm text-label-sm text-secondary\">VPN Terpadu BSI</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md text-right whitespace-nowrap\">\n<button class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span>\n<span>Payload</span>\n<span class=\"material-symbols-outlined text-[16px]\">expand_more</span>\n</button>\n</td>\n</tr>\n<!-- Row 5: Anomaly Resolved -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">23 Okt 2024 16:45:10</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Blok #00142887</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">Ir. Ahmad Fauzi, M.T.</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">ID: BSI-001 (Audit Officer)</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm\">\n                Super Admin BSI\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface font-semibold\">\n                ANOMALY_RESOLVED\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-surface-container-high font-mono font-semibold text-label-sm text-on-surface\">\n                FLAG-2024-0988\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md\">\n<p class=\"text-on-surface font-medium leading-relaxed\">\n                Penyelesaian anomali: Koreksi entri ganda pada dompet kulit cokelat Posko Perpustakaan Pusat\n              </p>\n<span class=\"font-label-sm text-label-sm text-outline\">Terkait insiden duplicate entry tiket HL-88204</span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-on-surface\">10.12.0.4</span>\n<span class=\"font-label-sm text-label-sm text-secondary\">VPN Terpadu BSI</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md text-right whitespace-nowrap\">\n<button class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span>\n<span>Payload</span>\n<span class=\"material-symbols-outlined text-[16px]\">expand_more</span>\n</button>\n</td>\n</tr>\n<!-- Row 6: Export Data Audit Event -->\n<tr class=\"hover:bg-surface-container-low transition-colors group\">\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">23 Okt 2024 14:12:00</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Blok #00142886</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-semibold text-on-surface\">Ir. Ahmad Fauzi, M.T.</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">ID: BSI-001 (Audit Officer)</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm\">\n                Super Admin BSI\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface font-semibold\">\n                EXPORT_DISPATCH\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<span class=\"inline-flex items-center px-2 py-0.5 rounded bg-surface-container-high font-mono font-semibold text-label-sm text-on-surface\">\n                EXP-Q3-2024\n              </span>\n</td>\n<td class=\"py-space-sm px-space-md\">\n<p class=\"text-on-surface font-medium leading-relaxed\">\n                Ekspor berkas terenkripsi GPG laporan kepatuhan ISO kuartal 3 untuk Komite Etik &amp; Audit UII\n              </p>\n<span class=\"font-label-sm text-label-sm text-outline\">Hash Berkas Hasil: d5f14e...881a</span>\n</td>\n<td class=\"py-space-sm px-space-md whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-mono text-on-surface\">10.12.0.4</span>\n<span class=\"font-label-sm text-label-sm text-secondary\">VPN Terpadu BSI</span>\n</div>\n</td>\n<td class=\"py-space-sm px-space-md text-right whitespace-nowrap\">\n<button class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span>\n<span>Payload</span>\n<span class=\"material-symbols-outlined text-[16px]\">expand_more</span>\n</button>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Table Pagination & Metadata -->\n<div class=\"px-space-md py-space-sm bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-sm\">\n<div class=\"flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm\">\n<span>Menampilkan <strong>1 - 6</strong> dari <strong>142,891</strong> peristiwa tercatat</span>\n<div class=\"flex items-center gap-1\">\n<span>Baris per halaman:</span>\n<select class=\"h-7 px-2 rounded bg-surface-container text-on-surface font-label-sm text-label-sm focus:outline-none\">\n<option>10</option>\n<option selected=\"\">25</option>\n<option>50</option>\n<option>100</option>\n</select>\n</div>\n</div>\n<!-- Pagination Buttons -->\n<div class=\"flex items-center gap-1\">\n<button class=\"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-outline cursor-not-allowed\">\n<span class=\"material-symbols-outlined text-[18px]\">first_page</span>\n</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-outline cursor-not-allowed\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_left</span>\n</button>\n<button class=\"w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-bold\">1</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm\">2</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm\">3</button>\n<span class=\"px-1 text-outline font-label-sm text-label-sm\">...</span>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm\">5716</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_right</span>\n</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">last_page</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Formal Statutory & Security Guarantee Footer Box -->\n<div class=\"rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex items-start gap-space-md\">\n<div class=\"w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-secondary text-[22px]\">gavel</span>\n</div>\n<div class=\"flex flex-col gap-1 text-on-surface-variant font-body-sm text-body-sm\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Ketentuan Kepatuhan Hukum &amp; Kriptografi BSI UII</span>\n<span class=\"px-2 py-0.2 rounded bg-surface-container font-label-sm text-label-sm\">Immutable by Architecture</span>\n</div>\n<p class=\"leading-relaxed\">\n        Setiap entri log bersifat <strong class=\"text-on-surface\">append-only</strong>, ditandatangani secara kriptografis menggunakan sertifikat Root CA Kampus UII, dan direplikasi secara waktu-nyata ke 3 node penyimpanan dingin terdistribusi. <strong class=\"text-on-surface\">Tidak ada fasilitas atau antarmuka pembaruan (edit) atau penghapusan (delete) log</strong> pada tingkatan aplikasi, API, maupun basis data untuk menjamin keabsahan barang bukti forensik digital sesuai standar ISO/IEC 27001 dan UU ITE.\n      </p>\n</div>\n</div>\n</div>\n<script>\n  // Interactive Verification Simulator\n  const verifyBtn = document.getElementById('btn-run-verify');\n  const tamperToggleBtn = document.getElementById('btn-toggle-demo-tamper');\n  const statusBadge = document.getElementById('chain-status-badge');\n  let isTampered = false;\n\n  if (verifyBtn && statusBadge) {\n    verifyBtn.addEventListener('click', () => {\n      const originalText = verifyBtn.innerHTML;\n      verifyBtn.innerHTML = '<span class=\"material-symbols-outlined text-[18px] animate-spin\">refresh</span><span>Memverifikasi 142,891 Hash...</span>';\n      verifyBtn.classList.add('opacity-80', 'pointer-events-none');\n\n      setTimeout(() => {\n        verifyBtn.innerHTML = originalText;\n        verifyBtn.classList.remove('opacity-80', 'pointer-events-none');\n        if (!isTampered) {\n          statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold';\n          statusBadge.innerHTML = '<span class=\"w-2 h-2 rounded-full bg-secondary animate-pulse\"></span>Rantai Log Utuh (100% Valid)';\n        } else {\n          statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold';\n          statusBadge.innerHTML = '<span class=\"w-2 h-2 rounded-full bg-error animate-ping\"></span>Ditemukan Ketidaksesuaian Hash';\n        }\n      }, 700);\n    });\n  }\n\n  if (tamperToggleBtn && statusBadge) {\n    tamperToggleBtn.addEventListener('click', () => {\n      isTampered = !isTampered;\n      if (isTampered) {\n        statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold';\n        statusBadge.innerHTML = '<span class=\"w-2 h-2 rounded-full bg-error\"></span>Simulasi: Hash Discrepancy Detected';\n        tamperToggleBtn.innerHTML = '<span class=\"material-symbols-outlined text-[16px]\">restart_alt</span><span>Pulihkan Status Utuh</span>';\n      } else {\n        statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold';\n        statusBadge.innerHTML = '<span class=\"w-2 h-2 rounded-full bg-secondary animate-pulse\"></span>Rantai Log Utuh (100% Valid)';\n        tamperToggleBtn.innerHTML = '<span class=\"material-symbols-outlined text-[16px]\">sync_alt</span><span>Simulasi Status</span>';\n      }\n    });\n  }\n\n  // Reset Filters feedback\n  const resetBtn = document.getElementById('btn-reset-filter');\n  if (resetBtn) {\n    resetBtn.addEventListener('click', () => {\n      const inputs = document.querySelectorAll('select, input[type=\"text\"]');\n      inputs.forEach(el => {\n        if (el.tagName === 'SELECT') el.selectedIndex = 0;\n        if (el.tagName === 'INPUT') el.value = '';\n      });\n    });\n  }\n</script></main><footer class=\"w-full bg-surface-container-lowest py-space-sm shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-auto\"><div class=\"max-w-[1440px] mx-auto px-space-lg flex items-center justify-between text-on-surface-variant\"><div class=\"flex items-center gap-2 font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[16px] text-secondary\">shield</span><span>Badan Sistem Informasi (BSI) Universitas Islam Indonesia \u2022 Kepatuhan ISO/IEC 27001 &amp; Audit Trail Terdistribusi</span></div><div class=\"font-label-sm text-label-sm text-outline\">Setiap tindakan dipertanggungjawabkan dalam rantai audit.</div></div></footer></div>";

export default function AuditLog({ onNavigate }) {
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
