import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Administrator BSI: Manajemen Akun Satpam - Portal Administrator BSI
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]\"><div class=\"flex flex-col\"><div class=\"px-space-md py-space-md flex items-center gap-3 bg-surface-container-low\"><div class=\"w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-secondary-fixed text-[24px]\">verified_user</span></div><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none\">BSI \u2022 UII</span><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1\">Portal Administrator BSI</span></div></div><div class=\"px-space-md pt-space-md pb-space-xs\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest\">Menu Navigasi Audit</span></div><nav class=\"flex flex-col px-space-sm gap-1\" data-active-classes=\"bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)]\">\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">grid_view</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"penanda-anomali\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">warning</span>\n    <span>Penanda Anomali</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"insiden\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">security_update_warning</span>\n    <span>Insiden</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"audit-log\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">history_edu</span>\n    <span>Audit Log</span>\n  </a>\n  <a aria-current=\"page\" class=\"flex items-center gap-3 px-space-md py-space-xs transition-all bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)] font-semibold cursor-pointer\" data-path=\"akun-satpam\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Akun Satpam</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"barang-ditahan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">lock_clock</span>\n    <span>Barang Ditahan</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"parameter\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">tune</span>\n    <span>Parameter</span>\n  </a>\n</nav></div><div class=\"p-space-md m-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\"><div class=\"flex items-center justify-between\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Keamanan Sesi</span><span class=\"flex h-2 w-2 rounded-full bg-secondary\"></span></div><div class=\"font-label-md text-label-md text-on-surface font-semibold\">Sesi Aktif: 07:42:15 tersisa</div><div class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">vpn_lock</span>10.12.0.4 - VPN Terpadu</div><div class=\"flex items-center justify-between pt-1\"><div class=\"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">speed</span>Latensi: 14ms</div><a class=\"font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1\" data-path=\"kontak-siaga\" href=\"#\"><span class=\"material-symbols-outlined text-[14px]\">emergency</span>Kontak Siaga</a></div></div><!-- Portal Shortcut Buttons -->\n<div class=\"px-space-md pt-1 pb-2 flex flex-col gap-1.5\">\n  <button data-path=\"portal-satpam\" class=\"w-full py-2 px-3 rounded-xl border border-outline-variant/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">local_police</span>\n    <span>Buka Portal Satpam</span>\n  </button>\n  <button data-path=\"portal-publik\" class=\"w-full py-1.5 px-3 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">public</span>\n    <span>Kembali ke Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72 flex flex-col min-h-screen\"><header class=\"fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-space-lg flex items-center justify-between\"><div class=\"flex items-center gap-space-md\"><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface leading-tight\">BSI Admin Portal - Lost &amp; Found Kampus UII</span><div class=\"flex items-center gap-2 mt-1\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface\"><span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>Sistem Operasional Normal - Gateway BSI Terhubung</span><span class=\"px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant\">Production v2.4-sec</span><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[13px]\">key</span>MFA Aktif - Hardware Token</span></div></div></div><div class=\"flex items-center gap-space-md\"><div class=\"relative w-72\"><span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">search</span><input class=\"w-full h-10 pl-9 pr-3 rounded-full bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors\" placeholder=\"Cari log / item / ID insiden...\" type=\"text\"/></div><div class=\"relative flex items-center justify-center\"><button class=\"w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors\"><span class=\"material-symbols-outlined text-[20px]\">notifications</span></button><span class=\"absolute top-1 right-1 h-2 w-2 rounded-full bg-error\"></span></div><div class=\"flex items-center gap-3 pl-2\"><div class=\"flex flex-col text-right\"><span class=\"font-label-md text-label-md text-on-surface\">Ir. Ahmad Fauzi, M.T.</span><span class=\"font-label-sm text-label-sm text-on-surface-variant\">Super Admin / Audit Officer</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"ml-2 w-9 h-9 rounded-full hover:bg-error-container hover:text-on-error-container text-on-surface-variant flex items-center justify-center transition-colors\" data-path=\"login\" href=\"#\" title=\"Keluar dari Portal\"><span class=\"material-symbols-outlined text-[18px]\">logout</span></a></div></div></header><main class=\"w-full pt-20 px-space-lg flex-1 bg-surface max-w-[1440px] mx-auto pb-space-lg\"><div class=\"flex flex-col w-full\">\n<!-- Top Breadcrumb & Metadata Strip -->\n<div class=\"flex flex-col md:flex-row md:items-center justify-between gap-3 mb-space-sm\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">admin_panel_settings</span>\n        BSI Admin Portal\n      </span>\n<span class=\"text-outline-variant font-label-sm\">/</span>\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold\">Akun Satpam</span>\n<span class=\"ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span> Live Directory\n      </span>\n</div>\n<div class=\"flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm\">\n<span class=\"material-symbols-outlined text-[16px] text-outline\">verified</span>\n<span>Sinkronisasi Terpadu: LDAP Satpam UII \u2022 Realtime via Gateway BSI</span>\n</div>\n</div>\n<!-- Main Section Header & Actions -->\n<div class=\"flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-md\">\n<div class=\"flex flex-col max-w-3xl\">\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight\">\n        Manajemen Akun Petugas Satpam\n      </h1>\n<p class=\"font-body-md text-body-md text-on-surface-variant mt-1\">\n        Pengelolaan kredensial personal, hak akses posko jaga, dan audit kepatuhan petugas satpam Lost &amp; Found Kampus Terpadu UII.\n      </p>\n</div>\n<div class=\"flex items-center gap-2.5 shrink-0\">\n<button class=\"inline-flex items-center gap-2 px-space-sm py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors shadow-sm\" onclick=\"downloadCSVLog()\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">download</span>\n<span>Unduh Log Autentikasi (CSV)</span>\n</button>\n<button class=\"inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:opacity-95 transition-all shadow-[0_4px_14px_rgba(19,27,46,0.18)]\" onclick=\"openModal('modalTambahAkun')\">\n<span class=\"material-symbols-outlined text-[18px]\">person_add</span>\n<span>Tambah Akun Petugas</span>\n</button>\n</div>\n</div>\n<!-- KPI Quick Stats Grid -->\n<div class=\"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-sm mb-space-md\">\n<!-- Stat 1 -->\n<div class=\"p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Total Akun Satpam</span>\n<div class=\"w-9 h-9 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant\">\n<span class=\"material-symbols-outlined text-[20px]\">badge</span>\n</div>\n</div>\n<div class=\"mt-3 flex items-baseline gap-2\">\n<span class=\"font-display text-[32px] leading-none text-on-surface font-bold\">32</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Petugas Terdaftar</span>\n</div>\n<div class=\"mt-2 pt-2 flex items-center justify-between text-outline\">\n<span class=\"font-body-sm text-body-sm flex items-center gap-1 text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[14px] text-secondary\">domain</span> 6 Posko Operasional\n        </span>\n<span class=\"font-label-sm text-label-sm font-semibold text-secondary\">100% Terverifikasi</span>\n</div>\n</div>\n<!-- Stat 2 -->\n<div class=\"p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Status Aktif Normal</span>\n<div class=\"w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-secondary\">\n<span class=\"material-symbols-outlined text-[20px]\">check_circle</span>\n</div>\n</div>\n<div class=\"mt-3 flex items-baseline gap-2\">\n<span class=\"font-display text-[32px] leading-none text-on-surface font-bold\">28</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Petugas (87.5%)</span>\n</div>\n<div class=\"mt-2 pt-2 flex items-center justify-between\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1\">\n<span class=\"h-2 w-2 rounded-full bg-secondary\"></span> Terminal Pos Terhubung\n        </span>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Siaga 24 Jam</span>\n</div>\n</div>\n<!-- Stat 3 -->\n<div class=\"p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Ditangguhkan / Cuti</span>\n<div class=\"w-9 h-9 rounded-xl bg-error-container flex items-center justify-center text-on-error-container\">\n<span class=\"material-symbols-outlined text-[20px]\">gavel</span>\n</div>\n</div>\n<div class=\"mt-3 flex items-baseline gap-2\">\n<span class=\"font-display text-[32px] leading-none text-error font-bold\">4</span>\n<span class=\"font-label-sm text-label-sm text-on-error-container font-semibold\">Petugas Dibatasi</span>\n</div>\n<div class=\"mt-2 pt-2 flex items-center justify-between\">\n<span class=\"font-body-sm text-body-sm text-error flex items-center gap-1 font-semibold\">\n<span class=\"material-symbols-outlined text-[15px]\">report_problem</span> 2 Kasus Insiden Aktif\n        </span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">2 Cuti Kedinasan</span>\n</div>\n</div>\n<!-- Stat 4 -->\n<div class=\"p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Rerata Aksi Petugas</span>\n<div class=\"w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface\">\n<span class=\"material-symbols-outlined text-[20px]\">query_stats</span>\n</div>\n</div>\n<div class=\"mt-3 flex items-baseline gap-2\">\n<span class=\"font-display text-[32px] leading-none text-on-surface font-bold\">48</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Aksi / 30 Hari</span>\n</div>\n<div class=\"mt-2 pt-2 flex items-center justify-between\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Kepatuhan Berita Acara:</span>\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold\">99.4% SLA</span>\n</div>\n</div>\n</div>\n<!-- Search, Filter & Controls Panel -->\n<div class=\"p-space-md rounded-xl bg-surface-container-lowest shadow-sm mb-space-md flex flex-col gap-3\">\n<div class=\"grid grid-cols-1 md:grid-cols-12 gap-3 items-center\">\n<!-- Search Input -->\n<div class=\"md:col-span-5 relative\">\n<span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">search</span>\n<input class=\"w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors\" id=\"searchInput\" oninput=\"filterTable()\" placeholder=\"Cari nama petugas, NRP/ID Satpam, email resmi, atau pos jaga...\" type=\"text\"/>\n</div>\n<!-- Filter Dropdowns -->\n<div class=\"md:col-span-2\">\n<div class=\"relative\">\n<select class=\"w-full h-10 px-3 pr-8 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none appearance-none cursor-pointer\" id=\"statusFilter\" onchange=\"filterTable()\">\n<option value=\"all\">Semua Status (Aktif &amp; Nonaktif)</option>\n<option value=\"aktif\">Aktif Saja</option>\n<option value=\"ditangguhkan\">Ditangguhkan / Insiden</option>\n<option value=\"nonaktif\">Nonaktif (Cuti / Rotasi)</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-[18px] pointer-events-none\">expand_more</span>\n</div>\n</div>\n<div class=\"md:col-span-3\">\n<div class=\"relative\">\n<select class=\"w-full h-10 px-3 pr-8 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none appearance-none cursor-pointer\" id=\"posFilter\" onchange=\"filterTable()\">\n<option value=\"all\">Semua Pos Jaga (Induk, Gerbang, Lab, dll)</option>\n<option value=\"Pos Induk GKU\">Pos Induk GKU</option>\n<option value=\"Pos Gerbang Utama\">Pos Gerbang Utama</option>\n<option value=\"Pos Perpustakaan Pusat\">Pos Perpustakaan Pusat</option>\n<option value=\"Pos Masjid Ulil Albab\">Pos Masjid Ulil Albab</option>\n<option value=\"Pos Fakultas Teknik Sipil\">Pos Fakultas Teknik Sipil</option>\n<option value=\"Pos Olahraga &amp; Parkir Barat\">Pos Parkir Barat</option>\n<option value=\"Pos Gedung Rektorat\">Pos Gedung Rektorat</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-[18px] pointer-events-none\">expand_more</span>\n</div>\n</div>\n<div class=\"md:col-span-2 flex items-center justify-end gap-2\">\n<button class=\"h-10 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5 transition-colors\" onclick=\"resetFilters()\">\n<span class=\"material-symbols-outlined text-[16px]\">restart_alt</span>\n<span>Reset Filter</span>\n</button>\n</div>\n</div>\n<!-- Active counter & pills -->\n<div class=\"flex flex-wrap items-center justify-between gap-2 pt-2\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Menampilkan:</span>\n<span class=\"inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold\" id=\"counterBadge\">\n          7 Petugas Terdaftar\n        </span>\n<span class=\"font-body-sm text-body-sm text-outline\">dari total 32 personel satpam kampus</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Sortir Berdasarkan:</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1 cursor-pointer\">\n          Aktivitas Terakhir <span class=\"material-symbols-outlined text-[16px]\">swap_vert</span>\n</span>\n</div>\n</div>\n</div>\n<!-- Guard Accounts Dense Structured Table -->\n<div class=\"rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden mb-space-md\">\n<div class=\"overflow-x-auto\">\n<table class=\"w-full text-left\" id=\"guardTable\">\n<thead>\n<tr class=\"bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider\">\n<th class=\"py-3 px-space-md\">Petugas / NRP</th>\n<th class=\"py-3 px-space-sm\">Email Resmi &amp; Kontak</th>\n<th class=\"py-3 px-space-sm\">Status Akun</th>\n<th class=\"py-3 px-space-sm\">Terakhir Login / Terminal Pos</th>\n<th class=\"py-3 px-space-sm\">Aktivitas 30 Hari</th>\n<th class=\"py-3 px-space-md text-right\">Aksi &amp; Kontrol</th>\n</tr>\n</thead>\n<tbody class=\"divide-y-0 text-on-surface font-body-sm text-body-sm\">\n<!-- Row 1: Hendra Kurniawan -->\n<tr class=\"hover:bg-surface-container/50 transition-colors guard-row\" data-name=\"Bripka Hendra Kurniawan\" data-nrp=\"SEC-042\" data-pos=\"Pos Induk GKU\" data-status=\"aktif\">\n<td class=\"py-3.5 px-space-md\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center font-label-md text-label-md text-on-surface font-bold shrink-0\">\n                  HK\n                </div>\n<div class=\"flex flex-col min-w-0\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Bripka Hendra Kurniawan</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container font-label-sm text-[10px] text-on-surface-variant font-medium\">Danru</span>\n</div>\n<div class=\"flex items-center gap-2 text-on-surface-variant mt-0.5\">\n<span class=\"font-mono text-label-sm text-secondary font-semibold\">NRP: SEC-042</span>\n<span class=\"text-outline\">\u2022</span>\n<span class=\"flex items-center gap-1 font-body-sm text-body-sm text-outline truncate\">\n<span class=\"material-symbols-outlined text-[14px]\">location_on</span> Pos Induk GKU\n                    </span>\n</div>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium truncate\">hendra.kurniawan@staff.uii.ac.id</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5\">+62 812-\u2022\u2022\u2022-9842 (Dinas)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>\n                Aktif\n              </span>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-medium\">Hari ini, 07:15 WIB</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant font-mono mt-0.5 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px] text-outline\">terminal</span>\n                  10.12.8.44 (Pos Induk GKU)\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between font-label-sm text-label-sm\">\n<span class=\"font-semibold text-on-surface\">142 Aksi</span>\n<span class=\"text-on-surface-variant\">Tinggi</span>\n</div>\n<div class=\"w-full h-1.5 rounded-full bg-surface-container overflow-hidden flex\">\n<div class=\"bg-secondary h-full\" style=\"width: 65%;\"></div>\n<div class=\"bg-primary-container h-full\" style=\"width: 25%;\"></div>\n<div class=\"bg-outline h-full\" style=\"width: 10%;\"></div>\n</div>\n<span class=\"text-[10px] text-on-surface-variant font-medium\">48 Terima \u2022 82 Verif \u2022 12 BAST</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-md text-right\">\n<div class=\"inline-flex items-center gap-1.5\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"openModal('modalNonaktifkan')\" title=\"Nonaktifkan Hak Akses Akun\">\n                  Nonaktifkan\n                </button>\n<button class=\"px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"openResetPasswordModal('Bripka Hendra Kurniawan', 'SEC-042')\" title=\"Reset Kata Sandi Kredensial\">\n<span class=\"material-symbols-outlined text-[16px]\">lock_reset</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 2: Agus Susanto -->\n<tr class=\"hover:bg-surface-container/50 transition-colors guard-row\" data-name=\"Aipda Agus Susanto\" data-nrp=\"SEC-019\" data-pos=\"Pos Gerbang Utama\" data-status=\"aktif\">\n<td class=\"py-3.5 px-space-md\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center font-label-md text-label-md text-on-surface font-bold shrink-0\">\n                  AS\n                </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Aipda Agus Susanto</span>\n<div class=\"flex items-center gap-2 text-on-surface-variant mt-0.5\">\n<span class=\"font-mono text-label-sm text-secondary font-semibold\">NRP: SEC-019</span>\n<span class=\"text-outline\">\u2022</span>\n<span class=\"flex items-center gap-1 font-body-sm text-body-sm text-outline truncate\">\n<span class=\"material-symbols-outlined text-[14px]\">location_on</span> Pos Gerbang Utama\n                    </span>\n</div>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium truncate\">agus.susanto@staff.uii.ac.id</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5\">+62 856-\u2022\u2022\u2022-3310 (Dinas)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>\n                Aktif\n              </span>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-medium\">Kemarin, 21:40 WIB</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant font-mono mt-0.5 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px] text-outline\">terminal</span>\n                  10.12.8.12 (Pos Gerbang Utama)\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between font-label-sm text-label-sm\">\n<span class=\"font-semibold text-on-surface\">98 Aksi</span>\n<span class=\"text-on-surface-variant\">Normal</span>\n</div>\n<div class=\"w-full h-1.5 rounded-full bg-surface-container overflow-hidden flex\">\n<div class=\"bg-secondary h-full\" style=\"width: 50%;\"></div>\n<div class=\"bg-primary-container h-full\" style=\"width: 40%;\"></div>\n<div class=\"bg-outline h-full\" style=\"width: 10%;\"></div>\n</div>\n<span class=\"text-[10px] text-on-surface-variant font-medium\">32 Terima \u2022 60 Verif \u2022 6 BAST</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-md text-right\">\n<div class=\"inline-flex items-center gap-1.5\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"openModal('modalNonaktifkan')\">\n                  Nonaktifkan\n                </button>\n<button class=\"px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"openResetPasswordModal('Aipda Agus Susanto', 'SEC-019')\">\n<span class=\"material-symbols-outlined text-[16px]\">lock_reset</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 3: Joko Wahyono (DITANGGUHKAN - INSIDEN) -->\n<tr class=\"bg-error-container/20 hover:bg-error-container/30 transition-colors guard-row\" data-name=\"Bripka Joko Wahyono\" data-nrp=\"SEC-035\" data-pos=\"Pos Perpustakaan Pusat\" data-status=\"ditangguhkan\">\n<td class=\"py-3.5 px-space-md\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-error-container flex items-center justify-center font-label-md text-label-md text-on-error-container font-bold shrink-0\">\n                  JW\n                </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Bripka Joko Wahyono</span>\n<div class=\"flex items-center gap-2 text-on-surface-variant mt-0.5\">\n<span class=\"font-mono text-label-sm text-error font-semibold\">NRP: SEC-035</span>\n<span class=\"text-outline\">\u2022</span>\n<span class=\"flex items-center gap-1 font-body-sm text-body-sm text-outline truncate\">\n<span class=\"material-symbols-outlined text-[14px]\">location_on</span> Pos Perpustakaan Pusat\n                    </span>\n</div>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium truncate\">joko.wahyono@staff.uii.ac.id</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5\">+62 813-\u2022\u2022\u2022-0192 (Dibekukan)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col gap-1 items-start\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold\">\n<span class=\"material-symbols-outlined text-[14px]\">warning</span>\n                  Ditangguhkan: Kasus Insiden\n                </span>\n<span class=\"inline-flex items-center gap-1 text-[11px] text-error font-semibold bg-surface-container-lowest px-2 py-0.5 rounded shadow-sm\">\n                  Kasus INS-2024-0091: Indikasi Bypass Data Rahasia\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-error font-medium\">21 Okt 2024, 14:10 WIB</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant font-mono mt-0.5 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px] text-error\">lock_person</span>\n                  Dibekukan oleh Admin BSI (Audit)\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between font-label-sm text-label-sm\">\n<span class=\"font-semibold text-error\">34 Aksi (Stagnan)</span>\n<span class=\"text-error font-bold\">0 Active</span>\n</div>\n<div class=\"w-full h-1.5 rounded-full bg-surface-container overflow-hidden flex\">\n<div class=\"bg-error h-full\" style=\"width: 100%;\"></div>\n</div>\n<span class=\"text-[10px] text-on-surface-variant font-medium\">Hak tulis dibatalkan BSI</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-md text-right\">\n<div class=\"inline-flex items-center gap-1.5\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors\" onclick=\"alert('Membuka Berkas Investigasi Insiden INS-2024-0091...')\">\n<span class=\"material-symbols-outlined text-[14px]\">search_check</span>\n                  Lihat Berkas Insiden\n                </button>\n<button class=\"px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm transition-colors\" onclick=\"promptReactivate('SEC-035', 'Bripka Joko Wahyono')\">\n                  Aktifkan Kembali\n                </button>\n</div>\n</td>\n</tr>\n<!-- Row 4: Bambang Supriyadi -->\n<tr class=\"hover:bg-surface-container/50 transition-colors guard-row\" data-name=\"Sertu Bambang Supriyadi\" data-nrp=\"SEC-008\" data-pos=\"Pos Masjid Ulil Albab\" data-status=\"aktif\">\n<td class=\"py-3.5 px-space-md\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center font-label-md text-label-md text-on-surface font-bold shrink-0\">\n                  BS\n                </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Sertu Bambang Supriyadi</span>\n<div class=\"flex items-center gap-2 text-on-surface-variant mt-0.5\">\n<span class=\"font-mono text-label-sm text-secondary font-semibold\">NRP: SEC-008</span>\n<span class=\"text-outline\">\u2022</span>\n<span class=\"flex items-center gap-1 font-body-sm text-body-sm text-outline truncate\">\n<span class=\"material-symbols-outlined text-[14px]\">location_on</span> Pos Masjid Ulil Albab\n                    </span>\n</div>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium truncate\">bambang.supriyadi@staff.uii.ac.id</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5\">+62 821-\u2022\u2022\u2022-4419 (Dinas)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>\n                Aktif\n              </span>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-medium\">23 Okt 2024, 18:20 WIB</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant font-mono mt-0.5 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px] text-outline\">terminal</span>\n                  10.12.8.61 (Pos Masjid Ulil)\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between font-label-sm text-label-sm\">\n<span class=\"font-semibold text-on-surface\">115 Aksi</span>\n<span class=\"text-on-surface-variant\">Tinggi</span>\n</div>\n<div class=\"w-full h-1.5 rounded-full bg-surface-container overflow-hidden flex\">\n<div class=\"bg-secondary h-full\" style=\"width: 60%;\"></div>\n<div class=\"bg-primary-container h-full\" style=\"width: 30%;\"></div>\n<div class=\"bg-outline h-full\" style=\"width: 10%;\"></div>\n</div>\n<span class=\"text-[10px] text-on-surface-variant font-medium\">55 Terima \u2022 50 Verif \u2022 10 BAST</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-md text-right\">\n<div class=\"inline-flex items-center gap-1.5\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"openModal('modalNonaktifkan')\">\n                  Nonaktifkan\n                </button>\n<button class=\"px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"openResetPasswordModal('Sertu Bambang Supriyadi', 'SEC-008')\">\n<span class=\"material-symbols-outlined text-[16px]\">lock_reset</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 5: Dedi Prasetyo (Nonaktif SOP Cuti/Rotasi) -->\n<tr class=\"hover:bg-surface-container/50 transition-colors guard-row\" data-name=\"Bripka Dedi Prasetyo\" data-nrp=\"SEC-051\" data-pos=\"Pos Fakultas Teknik Sipil\" data-status=\"nonaktif\">\n<td class=\"py-3.5 px-space-md\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-label-md text-label-md text-on-surface-variant font-bold shrink-0\">\n                  DP\n                </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-md text-label-md text-on-surface-variant font-semibold truncate\">Bripka Dedi Prasetyo</span>\n<div class=\"flex items-center gap-2 text-outline mt-0.5\">\n<span class=\"font-mono text-label-sm\">NRP: SEC-051</span>\n<span>\u2022</span>\n<span class=\"flex items-center gap-1 font-body-sm text-body-sm truncate\">\n<span class=\"material-symbols-outlined text-[14px]\">location_on</span> Pos Fak. Teknik Sipil\n                    </span>\n</div>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant font-medium truncate\">dedi.prasetyo@staff.uii.ac.id</span>\n<span class=\"font-label-sm text-label-sm text-outline font-mono mt-0.5\">+62 878-\u2022\u2022\u2022-5021</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-outline\"></span>\n                Nonaktif (Rotasi Tugas)\n              </span>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface-variant\">15 Okt 2024, 08:00 WIB</span>\n<span class=\"font-body-sm text-body-sm text-outline font-mono mt-0.5 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px]\">history</span>\n                  Rotasi Shift Kampus\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between font-label-sm text-label-sm\">\n<span class=\"font-semibold text-on-surface-variant\">12 Aksi</span>\n<span class=\"text-outline\">Cuti</span>\n</div>\n<div class=\"w-full h-1.5 rounded-full bg-surface-container overflow-hidden\">\n<div class=\"bg-outline-variant h-full\" style=\"width: 15%;\"></div>\n</div>\n<span class=\"text-[10px] text-outline\">Tidak aktif sejak 15 Okt</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-md text-right\">\n<div class=\"inline-flex items-center gap-1.5\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"alert('Mengaktifkan kembali sesi dinas Bripka Dedi Prasetyo...')\">\n                  Aktifkan\n                </button>\n<button class=\"px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"openResetPasswordModal('Bripka Dedi Prasetyo', 'SEC-051')\">\n<span class=\"material-symbols-outlined text-[16px]\">lock_reset</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 6: Eko Rahardjo (DITANGGUHKAN - INSIDEN) -->\n<tr class=\"bg-error-container/20 hover:bg-error-container/30 transition-colors guard-row\" data-name=\"Peltu Eko Rahardjo\" data-nrp=\"SEC-012\" data-pos=\"Pos Olahraga &amp; Parkir Barat\" data-status=\"ditangguhkan\">\n<td class=\"py-3.5 px-space-md\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-error-container flex items-center justify-center font-label-md text-label-md text-on-error-container font-bold shrink-0\">\n                  ER\n                </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Peltu Eko Rahardjo</span>\n<div class=\"flex items-center gap-2 text-on-surface-variant mt-0.5\">\n<span class=\"font-mono text-label-sm text-error font-semibold\">NRP: SEC-012</span>\n<span class=\"text-outline\">\u2022</span>\n<span class=\"flex items-center gap-1 font-body-sm text-body-sm text-outline truncate\">\n<span class=\"material-symbols-outlined text-[14px]\">location_on</span> Pos Olahraga &amp; Parkir\n                    </span>\n</div>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium truncate\">eko.rahardjo@staff.uii.ac.id</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5\">+62 811-\u2022\u2022\u2022-7729 (Dibekukan)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col gap-1 items-start\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold\">\n<span class=\"material-symbols-outlined text-[14px]\">warning</span>\n                  Ditangguhkan: Kasus Insiden\n                </span>\n<span class=\"inline-flex items-center gap-1 text-[11px] text-error font-semibold bg-surface-container-lowest px-2 py-0.5 rounded shadow-sm\">\n                  Kasus INS-2024-0084: Kegagalan BAST 3x berturut\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-error font-medium\">18 Okt 2024, 11:05 WIB</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant font-mono mt-0.5 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px] text-error\">lock_person</span>\n                  Suspensi Otomatis Rule-Sec #04\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between font-label-sm text-label-sm\">\n<span class=\"font-semibold text-error\">56 Aksi</span>\n<span class=\"text-error font-bold\">Audit</span>\n</div>\n<div class=\"w-full h-1.5 rounded-full bg-surface-container overflow-hidden flex\">\n<div class=\"bg-error h-full\" style=\"width: 100%;\"></div>\n</div>\n<span class=\"text-[10px] text-on-surface-variant font-medium\">Dalam Verifikasi Tim Audit</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-md text-right\">\n<div class=\"inline-flex items-center gap-1.5\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors\" onclick=\"alert('Membuka Berkas Investigasi Insiden INS-2024-0084...')\">\n<span class=\"material-symbols-outlined text-[14px]\">search_check</span>\n                  Lihat Berkas Insiden\n                </button>\n<button class=\"px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm transition-colors\" onclick=\"promptReactivate('SEC-012', 'Peltu Eko Rahardjo')\">\n                  Aktifkan Kembali\n                </button>\n</div>\n</td>\n</tr>\n<!-- Row 7: Fajar Nugroho -->\n<tr class=\"hover:bg-surface-container/50 transition-colors guard-row\" data-name=\"Bripda Fajar Nugroho\" data-nrp=\"SEC-064\" data-pos=\"Pos Gedung Rektorat\" data-status=\"aktif\">\n<td class=\"py-3.5 px-space-md\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center font-label-md text-label-md text-on-surface font-bold shrink-0\">\n                  FN\n                </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold truncate\">Bripda Fajar Nugroho</span>\n<div class=\"flex items-center gap-2 text-on-surface-variant mt-0.5\">\n<span class=\"font-mono text-label-sm text-secondary font-semibold\">NRP: SEC-064</span>\n<span class=\"text-outline\">\u2022</span>\n<span class=\"flex items-center gap-1 font-body-sm text-body-sm text-outline truncate\">\n<span class=\"material-symbols-outlined text-[14px]\">location_on</span> Pos Rektorat (GBPH)\n                    </span>\n</div>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium truncate\">fajar.nugroho@staff.uii.ac.id</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5\">+62 895-\u2022\u2022\u2022-1102 (Dinas)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>\n                Aktif\n              </span>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-medium\">Hari ini, 06:30 WIB</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant font-mono mt-0.5 flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px] text-outline\">terminal</span>\n                  10.12.8.05 (Pos Rektorat)\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-sm\">\n<div class=\"flex flex-col gap-1 w-36\">\n<div class=\"flex items-center justify-between font-label-sm text-label-sm\">\n<span class=\"font-semibold text-on-surface\">76 Aksi</span>\n<span class=\"text-on-surface-variant\">Stabil</span>\n</div>\n<div class=\"w-full h-1.5 rounded-full bg-surface-container overflow-hidden flex\">\n<div class=\"bg-secondary h-full\" style=\"width: 45%;\"></div>\n<div class=\"bg-primary-container h-full\" style=\"width: 45%;\"></div>\n<div class=\"bg-outline h-full\" style=\"width: 10%;\"></div>\n</div>\n<span class=\"text-[10px] text-on-surface-variant font-medium\">28 Terima \u2022 42 Verif \u2022 6 BAST</span>\n</div>\n</td>\n<td class=\"py-3.5 px-space-md text-right\">\n<div class=\"inline-flex items-center gap-1.5\">\n<button class=\"px-2.5 py-1 rounded-lg bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"openModal('modalNonaktifkan')\">\n                  Nonaktifkan\n                </button>\n<button class=\"px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"openResetPasswordModal('Bripda Fajar Nugroho', 'SEC-064')\">\n<span class=\"material-symbols-outlined text-[16px]\">lock_reset</span>\n</button>\n</div>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Table Pagination & Audit Signature Footer -->\n<div class=\"px-space-md py-3 bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-on-surface-variant font-body-sm text-body-sm\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-sm text-label-sm text-outline\">Baris per halaman:</span>\n<select class=\"h-8 px-2 rounded-lg bg-surface-container-lowest font-label-sm text-label-sm text-on-surface border-0 focus:outline-none\">\n<option>10 Baris</option>\n<option>25 Baris</option>\n<option>50 Baris</option>\n</select>\n<span class=\"font-label-sm text-label-sm text-on-surface ml-2\">1 - 7 dari 32 Petugas</span>\n</div>\n<div class=\"flex items-center gap-1\">\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-lowest text-outline flex items-center justify-center opacity-50 cursor-not-allowed\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_left</span>\n</button>\n<button class=\"w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold\">1</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-center\">2</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-center\">3</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-center\">4</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_right</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Security Callout & Audit Integrity Note -->\n<div class=\"p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-primary-container text-secondary-fixed flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[22px]\">policy</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-headline-sm text-on-surface leading-tight\">Protokol Keamanan &amp; Integritas Akses BSI</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5\">\n          Setiap perubahan status akun (aktivasi, penonaktifan, reset kata sandi) dilindungi protokol MFA dan ditandatangani secara digital dalam log rantai pasok keamanan sistem informasi UII.\n        </p>\n</div>\n</div>\n<div class=\"flex items-center gap-2 shrink-0\">\n<span class=\"px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[15px]\">encrypted</span> SHA-256 Signature Valid\n      </span>\n<button class=\"px-3 py-1 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"alert('Log Audit Kredensial telah diverifikasi. Hash Ledger: 0x8f2a4b119c4d93e2')\">\n        Verifikasi Ledger\n      </button>\n</div>\n</div>\n<!-- MODAL 1: Konfirmasi Penonaktifan Akun Petugas (Interactive) -->\n<div class=\"fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm hidden items-center justify-center p-4\" id=\"modalNonaktifkan\">\n<div class=\"bg-surface-container-lowest rounded-xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col\">\n<!-- Modal Header -->\n<div class=\"p-space-md bg-surface-container-low flex items-start justify-between\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[22px]\">block</span>\n</div>\n<div class=\"flex flex-col\">\n<h3 class=\"font-headline-sm text-headline-sm text-on-surface\">Konfirmasi Penonaktifan Akun Petugas</h3>\n<span class=\"font-label-sm text-label-sm text-error font-semibold mt-0.5\">Petugas: Bripka Hendra Kurniawan (NRP: SEC-042)</span>\n</div>\n</div>\n<button class=\"w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant\" onclick=\"closeModal('modalNonaktifkan')\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n<!-- Warning Alert -->\n<div class=\"p-space-md pb-0\">\n<div class=\"p-3 rounded-xl bg-error-container/30 flex items-start gap-3 text-on-error-container\">\n<span class=\"material-symbols-outlined text-[20px] text-error shrink-0 mt-0.5\">report_problem</span>\n<div class=\"flex flex-col font-body-sm text-body-sm\">\n<span class=\"font-semibold text-error\">Tindakan Keamanan Sensitif!</span>\n<span>Tindakan ini akan mencabut akses petugas ke terminal pos jaga seketika, mengakhiri sesi aktif, dan tercatat permanen dalam Audit Log BSI.</span>\n</div>\n</div>\n</div>\n<!-- Form Body -->\n<form class=\"p-space-md flex flex-col gap-3.5\" onsubmit=\"handleNonaktifSubmit(event)\">\n<div>\n<label class=\"block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">\n            Kategori Alasan Penonaktifan <span class=\"text-error\">*</span>\n</label>\n<div class=\"relative\">\n<select class=\"w-full h-10 px-3 pr-8 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none appearance-none\" required=\"\">\n<option value=\"\">-- Pilih Alasan Resmi --</option>\n<option value=\"rotasi\">Rotasi Pos Jaga / Pindah Tugas Terjadwal</option>\n<option value=\"investigasi\">Pelanggaran SOP / Investigasi Keamanan Insiden</option>\n<option value=\"cuti\">Cuti / Izin Kedinasan Resmi</option>\n<option value=\"pensiun\">Pensiun / Terminasi Masa Tugas</option>\n<option value=\"lainnya\">Lainnya (Perlu Persetujuan Kepala BSI)</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-[18px] pointer-events-none\">expand_more</span>\n</div>\n</div>\n<div>\n<label class=\"block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">\n            Uraian Justifikasi Wajib (Min. 30 Karakter) <span class=\"text-error\">*</span>\n</label>\n<textarea class=\"w-full p-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none\" minlength=\"30\" placeholder=\"Wajib mencantumkan rujukan surat dinas keamanan atau nomor tiket penanda anomali (misal: Rujukan Surat No. 114/Dinas-Kamtib/UII/X/2024)...\" required=\"\" rows=\"3\"></textarea>\n</div>\n<div>\n<label class=\"block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">\n            Tautkan dengan Nomor Insiden Aktif (Opsional)\n          </label>\n<div class=\"relative\">\n<span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">flag</span>\n<input class=\"w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none\" placeholder=\"Contoh: INS-2024-0092\" type=\"text\"/>\n</div>\n</div>\n<div class=\"p-3 rounded-xl bg-surface-container-low flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">token</span>\n              Verifikasi Otoritas Super Admin (Token MFA Hardware)\n            </label>\n<span class=\"font-mono font-label-sm text-label-sm text-secondary\">6-Digit OTP</span>\n</div>\n<input class=\"w-full h-10 px-3 text-center tracking-[0.5em] font-mono text-headline-sm rounded-xl bg-surface-container-lowest font-bold text-on-surface focus:outline-none\" maxlength=\"6\" pattern=\"[0-9]{6}\" placeholder=\"\u2022\u2022\u2022\u2022\u2022\u2022\" required=\"\" type=\"text\"/>\n<span class=\"font-body-sm text-[11px] text-on-surface-variant text-center\">Masukkan kode dari token YubiKey / Google Authenticator Anda</span>\n</div>\n<!-- Modal Footer Actions -->\n<div class=\"flex items-center justify-end gap-2.5 pt-2\">\n<button class=\"px-space-md py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors\" onclick=\"closeModal('modalNonaktifkan')\" type=\"button\">\n            Batal\n          </button>\n<button class=\"px-space-md py-2.5 rounded-xl bg-error hover:bg-error/90 text-on-error font-label-md text-label-md flex items-center gap-2 shadow-sm transition-colors\" type=\"submit\">\n<span class=\"material-symbols-outlined text-[18px]\">lock</span>\n<span>Nonaktifkan Akun &amp; Catat Audit Log</span>\n</button>\n</div>\n</form>\n</div>\n</div>\n<!-- MODAL 2: Tambah Akun Petugas Satpam (Interactive) -->\n<div class=\"fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm hidden items-center justify-center p-4\" id=\"modalTambahAkun\">\n<div class=\"bg-surface-container-lowest rounded-xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col\">\n<!-- Modal Header -->\n<div class=\"p-space-md bg-surface-container-low flex items-start justify-between\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[22px]\">person_add</span>\n</div>\n<div class=\"flex flex-col\">\n<h3 class=\"font-headline-sm text-headline-sm text-on-surface\">Registrasi Akun Petugas Satpam Baru</h3>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant mt-0.5\">Sistem Integrasi Single Sign-On (SSO) Satpam UII</span>\n</div>\n</div>\n<button class=\"w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant\" onclick=\"closeModal('modalTambahAkun')\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n<!-- Form Body -->\n<form class=\"p-space-md flex flex-col gap-3.5\" onsubmit=\"handleTambahSubmit(event)\">\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-3\">\n<div>\n<label class=\"block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">\n              Nama Lengkap &amp; Pangkat <span class=\"text-error\">*</span>\n</label>\n<input class=\"w-full h-10 px-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none\" placeholder=\"Contoh: Bripda Teguh Santoso\" required=\"\" type=\"text\"/>\n</div>\n<div>\n<label class=\"block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">\n              NRP / ID Satpam Resmi UII <span class=\"text-error\">*</span>\n</label>\n<input class=\"w-full h-10 px-3 rounded-xl bg-surface-container-low font-mono text-body-sm text-on-surface placeholder:text-outline focus:outline-none\" pattern=\"SEC-[0-9]{3}\" placeholder=\"SEC-089\" required=\"\" type=\"text\"/>\n</div>\n</div>\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-3\">\n<div>\n<label class=\"block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">\n              Email Dinas UII (@staff.uii.ac.id) <span class=\"text-error\">*</span>\n</label>\n<input class=\"w-full h-10 px-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none\" placeholder=\"teguh.santoso@staff.uii.ac.id\" required=\"\" type=\"email\"/>\n</div>\n<div>\n<label class=\"block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">\n              Nomor Ponsel Dinas WhatsApp <span class=\"text-error\">*</span>\n</label>\n<input class=\"w-full h-10 px-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none\" placeholder=\"0812xxxxxxxx\" required=\"\" type=\"tel\"/>\n</div>\n</div>\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-3\">\n<div>\n<label class=\"block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">\n              Pos Jaga Penempatan Default <span class=\"text-error\">*</span>\n</label>\n<div class=\"relative\">\n<select class=\"w-full h-10 px-3 pr-8 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none appearance-none cursor-pointer\" required=\"\">\n<option value=\"\">Pilih Pos Jaga</option>\n<option value=\"Pos Induk GKU\">Pos Induk GKU</option>\n<option value=\"Pos Gerbang Utama\">Pos Gerbang Utama</option>\n<option value=\"Pos Perpustakaan Pusat\">Pos Perpustakaan Pusat</option>\n<option value=\"Pos Masjid Ulil Albab\">Pos Masjid Ulil Albab</option>\n<option value=\"Pos Fakultas Teknik Sipil\">Pos Fakultas Teknik Sipil</option>\n<option value=\"Pos Olahraga &amp; Parkir\">Pos Olahraga &amp; Parkir</option>\n<option value=\"Pos Gedung Rektorat\">Pos Gedung Rektorat (GBPH)</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-[18px] pointer-events-none\">expand_more</span>\n</div>\n</div>\n<div>\n<label class=\"block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">\n              Hak Akses / Peran Pos <span class=\"text-error\">*</span>\n</label>\n<div class=\"relative\">\n<select class=\"w-full h-10 px-3 pr-8 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none appearance-none cursor-pointer\" required=\"\">\n<option value=\"petugas\">Petugas Loket Jaga (Standard)</option>\n<option value=\"danru\">Komandan Regu (Danru - Approval BAST)</option>\n<option value=\"investigator\">Petugas Khusus Penyelidikan Internal</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-[18px] pointer-events-none\">expand_more</span>\n</div>\n</div>\n</div>\n<!-- Automated Password Delivery Notice -->\n<div class=\"p-3 rounded-xl bg-secondary-fixed/50 flex items-start gap-2.5 text-on-secondary-fixed-variant\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5\">mark_email_read</span>\n<span class=\"font-body-sm text-body-sm\">\n            Sistem BSI akan otomatis meng-generate <strong>Kata Sandi Sementara Terenkripsi</strong> dan mengirimkan instruksi aktivasi MFA ke email dinas dan WhatsApp resmi petugas.\n          </span>\n</div>\n<!-- Modal Footer Actions -->\n<div class=\"flex items-center justify-end gap-2.5 pt-2\">\n<button class=\"px-space-md py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors\" onclick=\"closeModal('modalTambahAkun')\" type=\"button\">\n            Batalkan\n          </button>\n<button class=\"px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-2 hover:opacity-95 shadow-sm transition-all\" type=\"submit\">\n<span class=\"material-symbols-outlined text-[18px]\">save</span>\n<span>Simpan &amp; Terbitkan Kredensial</span>\n</button>\n</div>\n</form>\n</div>\n</div>\n<!-- Inline Micro-interactions Script -->\n<script>\n    function openModal(id) {\n      const modal = document.getElementById(id);\n      if (modal) {\n        modal.classList.remove('hidden');\n        modal.classList.add('flex');\n      }\n    }\n\n    function closeModal(id) {\n      const modal = document.getElementById(id);\n      if (modal) {\n        modal.classList.add('hidden');\n        modal.classList.remove('flex');\n      }\n    }\n\n    function filterTable() {\n      const search = document.getElementById('searchInput').value.toLowerCase();\n      const status = document.getElementById('statusFilter').value;\n      const pos = document.getElementById('posFilter').value;\n      const rows = document.querySelectorAll('.guard-row');\n\n      let visibleCount = 0;\n      rows.forEach(row => {\n        const textContent = row.innerText.toLowerCase();\n        const rowStatus = row.getAttribute('data-status');\n        const rowPos = row.getAttribute('data-pos');\n\n        const matchesSearch = textContent.includes(search);\n        const matchesStatus = (status === 'all') || (rowStatus === status);\n        const matchesPos = (pos === 'all') || (rowPos === pos);\n\n        if (matchesSearch && matchesStatus && matchesPos) {\n          row.style.display = '';\n          visibleCount++;\n        } else {\n          row.style.display = 'none';\n        }\n      });\n\n      const badge = document.getElementById('counterBadge');\n      if (badge) {\n        badge.innerText = `${visibleCount} Petugas Ditampilkan`;\n      }\n    }\n\n    function resetFilters() {\n      document.getElementById('searchInput').value = '';\n      document.getElementById('statusFilter').value = 'all';\n      document.getElementById('posFilter').value = 'all';\n      filterTable();\n    }\n\n    function handleNonaktifSubmit(event) {\n      event.preventDefault();\n      alert('SUKSES: Akun petugas berhasil dinonaktifkan dari terminal pos jaga. Rantai audit hash telah dicatat ke Ledger BSI.');\n      closeModal('modalNonaktifkan');\n    }\n\n    function handleTambahSubmit(event) {\n      event.preventDefault();\n      alert('SUKSES: Akun petugas baru berhasil didaftarkan. Kredensial sementara telah dikirimkan via jalur resmi.');\n      closeModal('modalTambahAkun');\n    }\n\n    function openResetPasswordModal(name, nrp) {\n      if (confirm(`Apakah Anda yakin ingin me-reset kata sandi untuk ${name} (${nrp})? Tautan aktivasi baru akan di-generate dengan masa kedaluwarsa 15 menit.`)) {\n        alert(`Tautan reset sandi darurat berhasil dikirim ke email dinas ${name}. Catatan audit tercatat.`);\n      }\n    }\n\n    function promptReactivate(nrp, name) {\n      if (confirm(`Konfirmasi pencabutan penangguhan untuk ${name} (${nrp})? Memerlukan verifikasi status penutupan tiket investigasi.`)) {\n        alert(`Status akun ${name} telah dipulihkan menjadi Aktif. Log pembukaan blokir tercatat.`);\n      }\n    }\n\n    function downloadCSVLog() {\n      alert('Membuat ekspor CSV Log Autentikasi Satpam UII (30 Hari Terakhir). File otomatis terenkripsi PGP BSI.');\n    }\n  </script>\n</div></main><footer class=\"w-full bg-surface-container-lowest py-space-sm shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-auto\"><div class=\"max-w-[1440px] mx-auto px-space-lg flex items-center justify-between text-on-surface-variant\"><div class=\"flex items-center gap-2 font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[16px] text-secondary\">shield</span><span>Badan Sistem Informasi (BSI) Universitas Islam Indonesia \u2022 Kepatuhan ISO/IEC 27001 &amp; Audit Trail Terdistribusi</span></div><div class=\"font-label-sm text-label-sm text-outline\">Setiap tindakan dipertanggungjawabkan dalam rantai audit.</div></div></footer></div>";

export default function ManajemenSatpam({ onNavigate }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // Attach global helper functions on window for inline handlers
    window.openModal = (id) => {
      const modal = el.querySelector('#' + id);
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    };
    window.closeModal = (id) => {
      const modal = el.querySelector('#' + id);
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };
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
      window.closeModal('modalNonaktifkan');
    };
    window.handleTambahSubmit = (e) => {
      if (e) e.preventDefault();
      alert('SUKSES: Akun petugas baru berhasil didaftarkan. Kredensial sementara telah dikirimkan via jalur resmi.');
      window.closeModal('modalTambahAkun');
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
        const modal = el.querySelector('#modal-konfirmasi');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
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

    const handleClick = (e) => {
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
        const modal = el.querySelector('#modal-tahan-barang');
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        } else {
          if (onNavigate) onNavigate('admin_barang_ditahan');
        }
        return;
      }

      if (lowerText.includes('buka suspensi') || lowerText.includes('suspend lain')) {
        e.preventDefault();
        const modal = el.querySelector('#modal-tangguhkan-akun');
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        } else {
          alert('Status Suspensi Diperbarui!\n\nAkses akun satpam telah ditangguhkan sementara.');
        }
        return;
      }

      // Close modal in Detail Insiden
      if (
        (lowerText === 'batal' || lowerText === 'close') &&
        (target.closest('#modal-tahan-barang') || target.closest('#modal-tangguhkan-akun'))
      ) {
        e.preventDefault();
        const m1 = el.querySelector('#modal-tahan-barang');
        const m2 = el.querySelector('#modal-tangguhkan-akun');
        if (m1) { m1.classList.add('hidden'); m1.classList.remove('flex'); }
        if (m2) { m2.classList.add('hidden'); m2.classList.remove('flex'); }
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
        window.openModal('modalTambahAkun');
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
        window.closeModal('modalTambahAkun');
        window.closeModal('modalNonaktifkan');
        return;
      }

      // =========================================================================
      // 7. SPECIFIC FIX: Barang Ditahan (BarangDitahan.jsx)
      // =========================================================================
      if (lowerText.includes('tahan barang baru') || target.id === 'btn-open-tahan-modal') {
        e.preventDefault();
        const modal = el.querySelector('#modal-tahan-baru');
        if (modal) modal.classList.remove('hidden');
        return;
      }

      if (action === 'close-modal-tahan-baru') {
        e.preventDefault();
        const modal = el.querySelector('#modal-tahan-baru');
        if (modal) modal.classList.add('hidden');
        return;
      }

      if (action === 'submit-tahan-baru') {
        e.preventDefault();
        const modal = el.querySelector('#modal-tahan-baru');
        if (modal) modal.classList.add('hidden');
        alert('Perintah Penahanan Barang Diterbitkan!\n\nNomor Segel: SG-092\nBarang dipindahkan ke Brankas Pengamanan Khusus BSI.');
        return;
      }

      if (lowerText.includes('limpahkan') || target.closest('[onclick*="modal-pelimpahan"]')) {
        e.preventDefault();
        const modal = el.querySelector('#modal-pelimpahan');
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        } else {
          alert('Proses Pelimpahan Barang ke Komisi Disiplin Kampus Dijalankan.');
        }
        return;
      }

      if (lowerText.includes('konfirmasi pelimpahan')) {
        e.preventDefault();
        const modal = el.querySelector('#modal-pelimpahan');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
        alert('Barang Berhasil Dilimpahkan!\n\nBerita Acara Pelimpahan Barang ke Komisi Disiplin Kampus telah diterbitkan.');
        return;
      }

      // =========================================================================
      // 8. SPECIFIC FIX: Konfigurasi Parameter Sentinel (KonfigurasiSentinel.jsx)
      // =========================================================================
      if (lowerText.includes('simpan perubahan parameter')) {
        e.preventDefault();
        const modal = el.querySelector('#modal-konfirmasi');
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
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
        const modal = el.querySelector('#modal-konfirmasi');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
        return;
      }
    };

    el.addEventListener('click', handleClick);
    return () => {
      el.removeEventListener('click', handleClick);
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
