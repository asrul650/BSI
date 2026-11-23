import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Administrator BSI: Manajemen Barang Ditahan (Held Items) - Portal Administrator BSI
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]\"><div class=\"flex flex-col\"><div class=\"px-space-md py-space-md flex items-center gap-3 bg-surface-container-low\"><div class=\"w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-secondary-fixed text-[24px]\">verified_user</span></div><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none\">BSI \u2022 UII</span><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1\">Portal Administrator BSI</span></div></div><div class=\"px-space-md pt-space-md pb-space-xs\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest\">Menu Navigasi Audit</span></div><nav class=\"flex flex-col px-space-sm gap-1\" data-active-classes=\"bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)]\">\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">grid_view</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"penanda-anomali\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">warning</span>\n    <span>Penanda Anomali</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"insiden\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">security_update_warning</span>\n    <span>Insiden</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"audit-log\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">history_edu</span>\n    <span>Audit Log</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"akun-satpam\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Akun Satpam</span>\n  </a>\n  <a aria-current=\"page\" class=\"flex items-center gap-3 px-space-md py-space-xs transition-all bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)] font-semibold cursor-pointer\" data-path=\"barang-ditahan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">lock_clock</span>\n    <span>Barang Ditahan</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"parameter\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">tune</span>\n    <span>Parameter</span>\n  </a>\n</nav></div><div class=\"p-space-md m-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\"><div class=\"flex items-center justify-between\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Keamanan Sesi</span><span class=\"flex h-2 w-2 rounded-full bg-secondary\"></span></div><div class=\"font-label-md text-label-md text-on-surface font-semibold\">Sesi Aktif: 07:42:15 tersisa</div><div class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">vpn_lock</span>10.12.0.4 - VPN Terpadu</div><div class=\"flex items-center justify-between pt-1\"><div class=\"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">speed</span>Latensi: 14ms</div><a class=\"font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1\" data-path=\"kontak-siaga\" href=\"#\"><span class=\"material-symbols-outlined text-[14px]\">emergency</span>Kontak Siaga</a></div></div><!-- Portal Shortcut Buttons -->\n<div class=\"px-space-md pt-1 pb-2 flex flex-col gap-1.5\">\n  <button data-path=\"portal-satpam\" class=\"w-full py-2 px-3 rounded-xl border border-outline-variant/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">local_police</span>\n    <span>Buka Portal Satpam</span>\n  </button>\n  <button data-path=\"portal-publik\" class=\"w-full py-1.5 px-3 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">public</span>\n    <span>Kembali ke Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72 flex flex-col min-h-screen\"><header class=\"fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-space-lg flex items-center justify-between\"><div class=\"flex items-center gap-space-md\"><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface leading-tight\">BSI Admin Portal - Lost &amp; Found Kampus UII</span><div class=\"flex items-center gap-2 mt-1\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface\"><span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>Sistem Operasional Normal - Gateway BSI Terhubung</span><span class=\"px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant\">Production v2.4-sec</span><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[13px]\">key</span>MFA Aktif - Hardware Token</span></div></div></div><div class=\"flex items-center gap-space-md\"><div class=\"relative w-72\"><span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">search</span><input class=\"w-full h-10 pl-9 pr-3 rounded-full bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors\" placeholder=\"Cari log / item / ID insiden...\" type=\"text\"/></div><div class=\"relative flex items-center justify-center\"><button class=\"w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors\"><span class=\"material-symbols-outlined text-[20px]\">notifications</span></button><span class=\"absolute top-1 right-1 h-2 w-2 rounded-full bg-error\"></span></div><div class=\"flex items-center gap-3 pl-2\"><div class=\"flex flex-col text-right\"><span class=\"font-label-md text-label-md text-on-surface\">Ir. Ahmad Fauzi, M.T.</span><span class=\"font-label-sm text-label-sm text-on-surface-variant\">Super Admin / Audit Officer</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"ml-2 w-9 h-9 rounded-full hover:bg-error-container hover:text-on-error-container text-on-surface-variant flex items-center justify-center transition-colors\" data-path=\"login\" href=\"#\" title=\"Keluar dari Portal\"><span class=\"material-symbols-outlined text-[18px]\">logout</span></a></div></div></header><main class=\"w-full pt-20 px-space-lg flex-1 bg-surface max-w-[1440px] mx-auto pb-space-lg\"><div class=\"flex flex-col w-full\">\n<!-- Script to enforce active state on \"Barang Ditahan\" in the App Shell's sidebar -->\n<script>\n    (function highlightActiveNav() {\n      const activeLink = document.querySelector('aside nav a[data-path=\"barang-ditahan\"]');\n      if (activeLink) {\n        document.querySelectorAll('aside nav a').forEach(el => {\n          el.className = 'flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md';\n        });\n        activeLink.className = 'flex items-center gap-3 px-space-md py-space-xs rounded-xl bg-primary-container text-on-primary font-label-lg shadow-[0_4px_12px_rgba(19,27,46,0.15)]';\n      }\n    })();\n  </script>\n<!-- Top Breadcrumb & Overview Bar -->\n<div class=\"flex flex-col gap-1 pb-space-md\">\n<div class=\"flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant\">\n<span>Beranda Admin</span>\n<span class=\"material-symbols-outlined text-[14px]\">chevron_right</span>\n<span>Pengawasan Sentinel</span>\n<span class=\"material-symbols-outlined text-[14px]\">chevron_right</span>\n<span class=\"text-secondary font-semibold\">Barang Ditahan &amp; Brankas Isolasi</span>\n</div>\n<div class=\"flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2\">\n<div class=\"flex flex-col max-w-3xl\">\n<div class=\"flex items-center gap-3\">\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight\">Manajemen Barang Ditahan (Held Items &amp; Vault Isolation)</h1>\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm\">\n<span class=\"h-2 w-2 rounded-full bg-error animate-pulse\"></span>\n            19 Aktif Terkunci\n          </span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface-variant mt-1\">\n          Pengawasan inventaris barang temuan yang dibekukan dari peredaran publik akibat sengketa klaim, anomali penanda, atau eskalasi investigasi insiden aktif.\n        </p>\n</div>\n<!-- Action Group -->\n<div class=\"flex items-center gap-3 shrink-0\">\n<button class=\"px-space-md py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg flex items-center gap-2 transition-all\" id=\"btn-open-filter-log\">\n<span class=\"material-symbols-outlined text-[18px]\">verified</span>\n<span>Status Segel Fisik</span>\n</button>\n<button class=\"px-space-md py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-2 shadow-[0_4px_16px_rgba(19,27,46,0.2)] transition-all\" id=\"btn-open-tahan-modal\">\n<span class=\"material-symbols-outlined text-[18px]\">add_circle</span>\n<span>+ Tahan Barang Baru</span>\n</button>\n</div>\n</div>\n</div>\n<!-- KPI Stat Cards (4 Cards) -->\n<div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md my-space-md\">\n<!-- Card 1: Total Ditahan -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col justify-between relative overflow-hidden\">\n<div class=\"flex items-start justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Total Barang Ditahan</span>\n<span class=\"font-display text-display text-on-surface leading-none mt-2 font-bold\">19</span>\n</div>\n<div class=\"w-11 h-11 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[24px]\">lock_clock</span>\n</div>\n</div>\n<div class=\"mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm\">\n<span class=\"flex items-center gap-1 text-on-surface font-medium\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">payments</span>\n          Est. Nilai: Rp 38.500.000\n        </span>\n<span class=\"text-error font-medium flex items-center gap-0.5\">\n<span class=\"material-symbols-outlined text-[14px]\">flip_camera_ios</span>\n          3 Sengketa\n        </span>\n</div>\n<div class=\"absolute bottom-0 left-0 right-0 h-1 bg-error\"></div>\n</div>\n<!-- Card 2: Isolasi Posko Jaga -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col justify-between relative overflow-hidden\">\n<div class=\"flex items-start justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Isolasi Posko Jaga</span>\n<span class=\"font-display text-display text-on-surface leading-none mt-2 font-bold\">12</span>\n</div>\n<div class=\"w-11 h-11 rounded-xl bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[24px]\">warehouse</span>\n</div>\n</div>\n<div class=\"mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm\">\n<span class=\"flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">pin_drop</span>\n          Loker Segel Posko\n        </span>\n<span class=\"bg-surface-container-high px-2 py-0.5 rounded-full font-label-sm text-label-sm text-on-surface\">\n          4 Lokasi Pos\n        </span>\n</div>\n<div class=\"absolute bottom-0 left-0 right-0 h-1 bg-secondary\"></div>\n</div>\n<!-- Card 3: Brankas Sentral BSI -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col justify-between relative overflow-hidden\">\n<div class=\"flex items-start justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Brankas Sentral BSI</span>\n<span class=\"font-display text-display text-on-surface leading-none mt-2 font-bold\">7</span>\n</div>\n<div class=\"w-11 h-11 rounded-xl bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[24px]\">key_vertical</span>\n</div>\n</div>\n<div class=\"mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm\">\n<span class=\"flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[16px] text-primary\">security</span>\n          Khasanah Khusus Lt. 3\n        </span>\n<span class=\"text-secondary font-medium font-label-sm text-label-sm\">\n          Dual Auth OK\n        </span>\n</div>\n<div class=\"absolute bottom-0 left-0 right-0 h-1 bg-primary\"></div>\n</div>\n<!-- Card 4: Selesai / Dilepas -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col justify-between relative overflow-hidden\">\n<div class=\"flex items-start justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Selesai / Dilepas (Bulan Ini)</span>\n<span class=\"font-display text-display text-on-surface leading-none mt-2 font-bold\">14</span>\n</div>\n<div class=\"w-11 h-11 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[24px]\">task_alt</span>\n</div>\n</div>\n<div class=\"mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm\">\n<span class=\"flex items-center gap-1 text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[16px]\">history_edu</span>\n          Verifikasi Selesai\n        </span>\n<span class=\"text-secondary font-medium font-label-sm text-label-sm\">\n          100% BAST Sah\n        </span>\n</div>\n<div class=\"absolute bottom-0 left-0 right-0 h-1 bg-secondary-container\"></div>\n</div>\n</div>\n<!-- Main Tabs Navigation -->\n<div class=\"flex items-center gap-2 mt-4 pb-2\">\n<button class=\"px-space-md py-2.5 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center gap-2 shadow-[0_4px_12px_rgba(19,27,46,0.12)]\">\n<span class=\"material-symbols-outlined text-[18px]\">lock</span>\n<span>Ditahan</span>\n<span class=\"px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold ml-1\">19</span>\n</button>\n<button class=\"px-space-md py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-label-lg text-label-lg flex items-center gap-2 transition-all\">\n<span class=\"material-symbols-outlined text-[18px]\">history</span>\n<span>Riwayat Pelepasan &amp; Pelimpahan</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant ml-1\">142</span>\n</button>\n</div>\n<!-- Table Container Card with Integrated Filters -->\n<div class=\"bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(15,23,42,0.06)] p-space-md my-space-sm flex flex-col\">\n<!-- Filter Toolbar -->\n<div class=\"flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pb-space-md\">\n<!-- Search Input -->\n<div class=\"relative flex-1 max-w-lg\">\n<span class=\"material-symbols-outlined absolute left-3.5 top-3 text-outline text-[20px]\">search</span>\n<input class=\"w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all\" placeholder=\"Cari Item ID, Nama Barang, Nomor Segel, atau NIM...\" type=\"text\"/>\n</div>\n<!-- Filters & Export -->\n<div class=\"flex flex-wrap items-center gap-2\">\n<!-- Lokasi Filter -->\n<div class=\"relative\">\n<select class=\"h-11 pl-3 pr-8 rounded-xl bg-surface-container-low font-label-md text-label-md text-on-surface appearance-none focus:outline-none cursor-pointer\">\n<option>Semua Lokasi Simpan</option>\n<option>Brankas Pusat BSI (Khasanah Lt. 3)</option>\n<option>Locker Pos Induk GKU</option>\n<option>Locker Pos Gerbang Utama</option>\n<option>Locker Pos Perpustakaan Sentral</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-3 text-outline text-[18px] pointer-events-none\">expand_more</span>\n</div>\n<!-- Alasan Filter -->\n<div class=\"relative\">\n<select class=\"h-11 pl-3 pr-8 rounded-xl bg-surface-container-low font-label-md text-label-md text-on-surface appearance-none focus:outline-none cursor-pointer\">\n<option>Semua Kategori Alasan</option>\n<option>Klaim Ganda / Identitas</option>\n<option>Sengketa Multi-Klaim Mahasiswa</option>\n<option>Deviasi Ciri Rahasia</option>\n<option>Indikasi Pidana / Aset Dosen</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-3 text-outline text-[18px] pointer-events-none\">expand_more</span>\n</div>\n<!-- Download CSV Button -->\n<button class=\"h-11 px-space-md rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-2 transition-colors\">\n<span class=\"material-symbols-outlined text-[18px]\">download</span>\n<span>Unduh Rekap Inventaris (CSV)</span>\n</button>\n</div>\n</div>\n<!-- Active Filter Chips -->\n<div class=\"flex items-center gap-2 pb-space-sm overflow-x-auto text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"text-outline uppercase tracking-wider text-[10px] font-semibold\">Filter Cepat:</span>\n<span class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary\">\n<span>Status: Semua Ditahan (19)</span>\n<button class=\"hover:text-error transition-colors\"><span class=\"material-symbols-outlined text-[14px]\">close</span></button>\n</span>\n<span class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface\">\n<span>Segel: Terverifikasi Valid (19/19)</span>\n</span>\n<span class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface\">\n<span>Insiden Terhubung: 16 Barang</span>\n</span>\n<button class=\"text-secondary font-label-sm text-label-sm hover:underline ml-auto shrink-0\">Reset Semua Filter</button>\n</div>\n<!-- Dense Data Table -->\n<div class=\"overflow-x-auto\">\n<table class=\"w-full text-left border-collapse\">\n<thead>\n<tr class=\"bg-surface-container-low text-on-surface-variant font-label-md text-label-md\">\n<th class=\"py-3 px-4 rounded-l-lg\">Item ID &amp; Barang</th>\n<th class=\"py-3 px-4\">Alasan Penahanan &amp; Anomali</th>\n<th class=\"py-3 px-4\">Waktu Ditahan</th>\n<th class=\"py-3 px-4\">Insiden Terkait</th>\n<th class=\"py-3 px-4\">Lokasi Fisik &amp; No. Segel</th>\n<th class=\"py-3 px-4\">Status Simpan</th>\n<th class=\"py-3 px-4 text-right rounded-r-lg\">Aksi Cepat</th>\n</tr>\n</thead>\n<tbody class=\"font-body-sm text-body-sm divide-y-0 text-on-surface\">\n<!-- Row 1 (Target of Modal Context: BRG-2024-0142) -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors bg-secondary-fixed/10\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-secondary text-[22px]\">usb</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface\">BRG-2024-0142</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-[10px]\">Data Kritis</span>\n</div>\n<span class=\"font-body-md text-body-md font-medium text-on-surface\">Flashdisk Sandisk Cruzer Blade 64GB</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Isi: Dokumen Akreditasi &amp; Data Pribadi</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 max-w-xs\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"inline-flex items-center gap-1 font-label-sm text-label-sm text-error font-semibold\">\n<span class=\"material-symbols-outlined text-[15px]\">rule</span>\n                  Rule A1: Sengketa 3 Mahasiswa NIM Berbeda\n                </span>\n<span class=\"text-on-surface-variant text-[11px] leading-tight\">Masing-masing mengklaim file skripsi bab 4 yang identik di dalam drive.</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-on-surface\">24 Okt 2024, 11:40</span>\n<span class=\"inline-flex items-center gap-1 text-[11px] text-secondary font-medium\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>\n                  Hari ini (3 jam lalu)\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<a class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold hover:opacity-90\" href=\"#\">\n<span class=\"material-symbols-outlined text-[14px]\">warning</span>\n                INS-2024-0042 (Kritis)\n              </a>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-medium text-on-surface\">Locker A-04 (Pos Induk GKU)</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Segel: #BSI-SEC-0981</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">lock</span>\n                ISOLASI POSKO\n              </span>\n</td>\n<td class=\"py-3.5 px-4 text-right whitespace-nowrap\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3 py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-sm text-label-sm font-medium flex items-center gap-1 transition-colors shadow-sm cursor-pointer\" data-action=\"open-modal-pelimpahan\" title=\"Limpahkan Barang ke Vault atau Lembaga Luar\">\n<span class=\"material-symbols-outlined text-[16px]\">move_up</span>\n<span>Limpahkan</span>\n</button>\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium transition-colors\" title=\"Buka Detail Investigasi\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 2 -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-on-surface-variant text-[22px]\">smartphone</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface\">BRG-2024-0139</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-[10px]\">Aset Tinggi</span>\n</div>\n<span class=\"font-body-md text-body-md font-medium text-on-surface\">iPhone 13 Pro Graphite 128GB</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">IMEI Cocok, Kunci Layar FaceID</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 max-w-xs\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"inline-flex items-center gap-1 font-label-sm text-label-sm text-on-secondary-fixed-variant font-semibold\">\n<span class=\"material-symbols-outlined text-[15px]\">security</span>\n                  Rule A2: Indikasi Kebocoran Ciri Rahasia\n                </span>\n<span class=\"text-on-surface-variant text-[11px] leading-tight\">2 Pengklaim menyebutkan stiker case belakang secara seragam.</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-on-surface\">23 Okt 2024, 16:15</span>\n<span class=\"text-[11px] text-on-surface-variant\">Kemarin (21 jam lalu)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<a class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold hover:opacity-90\" href=\"#\">\n<span class=\"material-symbols-outlined text-[14px]\">search_check</span>\n                INS-2024-0039 (Investigasi)\n              </a>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-medium text-on-surface\">Brankas Pusat BSI (Khasanah Lt. 3)</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Segel: #BSI-VAULT-042</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">shield</span>\n                BRANKAS PUSAT BSI\n              </span>\n</td>\n<td class=\"py-3.5 px-4 text-right whitespace-nowrap\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium flex items-center gap-1 transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">lock_open</span>\n<span>Lepas</span>\n</button>\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 3 -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-on-surface-variant text-[22px]\">laptop_mac</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface\">BRG-2024-0128</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-[10px]\">Aset Yayasan</span>\n</div>\n<span class=\"font-body-md text-body-md font-medium text-on-surface\">MacBook Air M2 Silver</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Stiker Inventaris FTI Terkikis</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 max-w-xs\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"inline-flex items-center gap-1 font-label-sm text-label-sm text-error font-semibold\">\n<span class=\"material-symbols-outlined text-[15px]\">fact_check</span>\n                  Rule A3: Serial Mismatch Aset Dosen\n                </span>\n<span class=\"text-on-surface-variant text-[11px] leading-tight\">Nomor seri perangkat terdaftar pada BMN SIM-Aset Prodi Informatika.</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-on-surface\">22 Okt 2024, 09:12</span>\n<span class=\"text-[11px] text-on-surface-variant\">2 hari lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<a class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold hover:opacity-90\" href=\"#\">\n<span class=\"material-symbols-outlined text-[14px]\">gavel</span>\n                INS-2024-0035 (Audit BAST)\n              </a>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-medium text-on-surface\">Brankas Pusat BSI (Khasanah Lt. 3)</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Segel: #BSI-VAULT-038</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">shield</span>\n                BRANKAS PUSAT BSI\n              </span>\n</td>\n<td class=\"py-3.5 px-4 text-right whitespace-nowrap\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium flex items-center gap-1 transition-colors cursor-pointer\" data-action=\"open-modal-pelimpahan\" title=\"Limpahkan Barang\">\n<span class=\"material-symbols-outlined text-[16px]\">assignment_return</span>\n<span>Limpahkan</span>\n</button>\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 4 -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-on-surface-variant text-[22px]\">wallet</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface\">BRG-2024-0125</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-[10px]\">Valuasi &gt;5jt</span>\n</div>\n<span class=\"font-body-md text-body-md font-medium text-on-surface\">Dompet Montblanc &amp; Uang Tunai</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Uang tunai Rp 4.250.000 + 4 Kartu Debit</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 max-w-xs\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"inline-flex items-center gap-1 font-label-sm text-label-sm text-error font-semibold\">\n<span class=\"material-symbols-outlined text-[15px]\">badge</span>\n                  Klaim Ganda Identitas Fisik\n                </span>\n<span class=\"text-on-surface-variant text-[11px] leading-tight\">Nama KTP berbeda dengan kartu mahasiswa yang disertakan.</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-on-surface\">21 Okt 2024, 14:05</span>\n<span class=\"text-[11px] text-on-surface-variant\">3 hari lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm\">\n                Tanpa Insiden (Mandiri)\n              </span>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-medium text-on-surface\">Locker B-02 (Pos Perpustakaan)</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Segel: #BSI-SEC-0972</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">balance</span>\n                DALAM SENGKETA\n              </span>\n</td>\n<td class=\"py-3.5 px-4 text-right whitespace-nowrap\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium flex items-center gap-1 transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">lock_open</span>\n<span>Lepas</span>\n</button>\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 5 -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-on-surface-variant text-[22px]\">photo_camera</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface\">BRG-2024-0118</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-[10px]\">Aset Media</span>\n</div>\n<span class=\"font-body-md text-body-md font-medium text-on-surface\">Kamera Sony A6400 + Lensa 18-105mm</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Memori SD 128GB SanDisk Extreme</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 max-w-xs\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"inline-flex items-center gap-1 font-label-sm text-label-sm text-error font-semibold\">\n<span class=\"material-symbols-outlined text-[15px]\">report_problem</span>\n                  Indikasi Kehilangan di Area Terbatas\n                </span>\n<span class=\"text-on-surface-variant text-[11px] leading-tight\">Ditemukan di Ruang Sidang Utama Rektorat tanpa izin akses.</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-on-surface\">19 Okt 2024, 08:30</span>\n<span class=\"text-[11px] text-on-surface-variant\">5 hari lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<a class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold hover:opacity-90\" href=\"#\">\n<span class=\"material-symbols-outlined text-[14px]\">search_check</span>\n                INS-2024-0028 (Audit)\n              </a>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-medium text-on-surface\">Brankas Pusat BSI (Khasanah Lt. 3)</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Segel: #BSI-VAULT-031</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">shield</span>\n                BRANKAS PUSAT BSI\n              </span>\n</td>\n<td class=\"py-3.5 px-4 text-right whitespace-nowrap\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium flex items-center gap-1 transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">lock_open</span>\n<span>Lepas</span>\n</button>\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 6 -->\n<tr class=\"hover:bg-surface-container-low/60 transition-colors\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-on-surface-variant text-[22px]\">directions_car</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface\">BRG-2024-0105</span>\n<span class=\"px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-[10px]\">Kunci Kendaraan</span>\n</div>\n<span class=\"font-body-md text-body-md font-medium text-on-surface\">Kunci Mobil Honda HR-V + STNK Asli</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Plat AB 1421 XX An. Hendra Wijaya</span>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4 max-w-xs\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-semibold\">\n<span class=\"material-symbols-outlined text-[15px]\">verified</span>\n                  Verifikasi Kepemilikan STNK Tertunda\n                </span>\n<span class=\"text-on-surface-variant text-[11px] leading-tight\">Pengklaim adalah mahasiswa keluarga pemilik, menunggu surat kuasa sah.</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-on-surface\">17 Okt 2024, 18:20</span>\n<span class=\"text-[11px] text-on-surface-variant\">7 hari lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm\">\n                Tanpa Insiden (Verifikasi Kuasa)\n              </span>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-medium text-on-surface\">Locker Pos Gerbang Utama</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Segel: #BSI-SEC-0965</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 whitespace-nowrap\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">lock</span>\n                ISOLASI POSKO\n              </span>\n</td>\n<td class=\"py-3.5 px-4 text-right whitespace-nowrap\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium flex items-center gap-1 transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">lock_open</span>\n<span>Lepas</span>\n</button>\n<button class=\"px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium transition-colors\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Pagination & Audit Summary Footer inside Card -->\n<div class=\"flex flex-col sm:flex-row items-center justify-between gap-3 pt-space-md mt-space-sm border-t border-transparent text-on-surface-variant font-label-sm text-label-sm\">\n<div class=\"flex items-center gap-2\">\n<span>Menampilkan <strong>1 - 6</strong> dari <strong>19</strong> barang ditahan dalam inventaris isolasi</span>\n</div>\n<div class=\"flex items-center gap-1\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface disabled:opacity-50 transition-colors font-medium\" disabled=\"\">Sebelumnya</button>\n<button class=\"w-8 h-8 rounded-lg bg-primary text-on-primary font-bold\">1</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface\">2</button>\n<button class=\"w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface\">3</button>\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-colors font-medium\">Berikutnya</button>\n</div>\n</div>\n</div>\n<!-- Interactive Modal / Slide-Over Preview: Konfirmasi Pelimpahan Barang Bukti (BRG-2024-0142) -->\n<div class=\"fixed inset-0 z-[60] hidden items-center justify-center p-4 bg-primary-container/60 backdrop-blur-sm\" id=\"modal-pelimpahan\">\n<div class=\"bg-surface-container-lowest rounded-2xl max-w-2xl w-full shadow-[0_24px_48px_rgba(15,23,42,0.25)] flex flex-col overflow-hidden max-h-[85vh] sm:max-h-[88vh] my-auto\">\n<!-- Modal Header -->\n<div class=\"px-space-md py-space-md bg-surface-container-low flex items-start justify-between shrink-0 border-b border-surface-container-high/60\">\n<div class=\"flex items-start gap-3\">\n<div class=\"w-11 h-11 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm\">\n<span class=\"material-symbols-outlined text-[24px]\">move_up</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-headline-sm text-headline-sm text-on-surface font-bold\">Konfirmasi Pelimpahan Fisik Barang</span>\n<span class=\"px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">Protokol Keamanan Tingkat 3</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5\">Pemindahan rantai kendali (Chain of Custody) fisik inventaris barang sitaan.</span>\n</div>\n</div>\n<button type=\"button\" class=\"w-9 h-9 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer\" data-action=\"close-modal-pelimpahan\" title=\"Tutup Modal\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n<!-- Modal Body (Scrollable) -->\n<div class=\"p-space-md overflow-y-auto flex flex-col gap-space-md\">\n<!-- Target Item Highlight Pod -->\n<div class=\"p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary shrink-0\">\n<span class=\"material-symbols-outlined text-[28px]\">usb</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-lg text-label-lg font-bold text-on-surface\">BRG-2024-0142</span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">\u2022 Sandisk Cruzer Blade 64GB</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Lokasi Saat Ini: <strong>Locker A-04 (Pos Induk GKU)</strong></span>\n<span class=\"font-label-sm text-label-sm text-secondary font-mono\">Segel Aktif: #BSI-SEC-0981</span>\n</div>\n</div>\n<div class=\"shrink-0 flex sm:flex-col items-end gap-1\">\n<span class=\"px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">Sengketa 3 Mahasiswa</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Kasus: INS-2024-0042</span>\n</div>\n</div>\n<!-- Action Selector Radio Pills -->\n<div class=\"flex flex-col gap-2\">\n<label class=\"font-label-md text-label-md text-on-surface font-semibold\">Pilih Tipe Aksi Operasional:</label>\n<div class=\"grid grid-cols-1 sm:grid-cols-3 gap-2\" id=\"transfer-action-group\">\n<label class=\"flex items-center gap-2 p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest cursor-pointer transition-colors text-on-surface radio-action-pill\">\n<input class=\"accent-secondary cursor-pointer\" name=\"transfer_action\" type=\"radio\" value=\"pemilik\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-on-surface\">Lepas ke Pemilik</span>\n<span class=\"text-[11px] text-on-surface-variant\">B.A. Pengembalian</span>\n</div>\n</label>\n<label class=\"flex items-center gap-2 p-3 rounded-xl bg-primary-container text-on-primary cursor-pointer shadow-sm radio-action-pill\">\n<input checked=\"\" class=\"accent-secondary cursor-pointer\" name=\"transfer_action\" type=\"radio\" value=\"brankas\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-on-primary\">Brankas Pusat BSI</span>\n<span class=\"text-[11px] text-primary-fixed-dim\">Vault Lt. 3 GBPH Prabuningrat</span>\n</div>\n</label>\n<label class=\"flex items-center gap-2 p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest cursor-pointer transition-colors text-on-surface radio-action-pill\">\n<input class=\"accent-secondary cursor-pointer\" name=\"transfer_action\" type=\"radio\" value=\"pihak_luar\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-on-surface\">Pihak Luar / Rektorat</span>\n<span class=\"text-[11px] text-on-surface-variant\">Polsek / BKA UII</span>\n</div>\n</label>\n</div>\n</div>\n<!-- Form Fields -->\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-space-md\">\n<!-- Tujuan Pelimpahan -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-md text-label-md text-on-surface font-semibold\">Lokasi / Instansi Tujuan Pelimpahan *</label>\n<div class=\"relative\">\n<select class=\"w-full h-11 pl-3 pr-8 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface appearance-none focus:outline-none focus:ring-1 focus:ring-secondary\">\n<option selected=\"\">Brankas Pusat BSI (Gedung GBPH Prabuningrat Lt. 3)</option>\n<option>Polsek Ngaglik Sleman (Pelaporan Kepolisian)</option>\n<option>Biro Kemahasiswaan &amp; Alumni (BKA UII)</option>\n<option>Divisi Hukum &amp; Organisasi (DHO UII)</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-2.5 top-3 text-outline text-[18px] pointer-events-none\">expand_more</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Khasanah khusus dengan kontrol akses biometrik &amp; CCTV 24 jam.</span>\n</div>\n<!-- Petugas Pengawal / Kurir -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-md text-label-md text-on-surface font-semibold\">Petugas Kurir / Pengawal Fisik *</label>\n<div class=\"relative\">\n<span class=\"material-symbols-outlined absolute left-3 top-3 text-outline text-[18px]\">badge</span>\n<input class=\"w-full h-11 pl-9 pr-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none\" type=\"text\" value=\"NRP-882109 - Danru Sutrisno (PKD GKU)\"/>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Wajib petugas bersertifikat Gada Pratama aktif.</span>\n</div>\n</div>\n<!-- Nomor Segel Baru Auto-Generated -->\n<div class=\"p-space-sm rounded-xl bg-surface-container flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">encrypted</span>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Nomor Segel Transpor Tamper-Evident Baru</span>\n<span class=\"font-label-md text-label-md font-mono font-bold text-on-surface\">BSI-TRANS-2024-089</span>\n</div>\n</div>\n<span class=\"px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n            Status: Tersedia &amp; Siap Pasang\n          </span>\n</div>\n<!-- Alasan & Justifikasi Mandatori (Textarea) -->\n<div class=\"flex flex-col gap-1.5\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-md text-label-md text-on-surface font-semibold\">Alasan &amp; Justifikasi Administratif Pelimpahan *</label>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\" id=\"char-counter\">94 karakter (Min. 50)</span>\n</div>\n<textarea id=\"input-justifikasi-pelimpahan\" class=\"w-full p-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest\" placeholder=\"Tuliskan justifikasi formal minimal 50 karakter...\" rows=\"3\">Barang dipindahkan dari Pos Induk GKU ke Brankas Pusat BSI untuk pengamanan forensik lanjutan sesuai B.A. Kasus INS-2024-0042.</textarea>\n</div>\n<!-- Security Warning & MFA Hardware Callout -->\n<div class=\"p-space-sm rounded-xl bg-error-container/40 flex items-start gap-3\">\n<span class=\"material-symbols-outlined text-error text-[22px] shrink-0 mt-0.5\">warning</span>\n<div class=\"flex flex-col font-body-sm text-body-sm text-on-surface\">\n<span class=\"font-label-md text-label-md font-bold text-on-error-container\">Peringatan Audit Trail &amp; Otorisasi Hardware MFA</span>\n<span class=\"text-on-surface-variant text-[12px] leading-relaxed mt-0.5\">\n              Aksi ini bersifat permanen dan dicatat pada <strong>Append-Only Audit Log Blok #00142895</strong>. Saat menekan konfirmasi, sentuh hardware security key (FIDO2 YubiKey) Anda untuk membubuhkan tanda tangan kriptografis.\n            </span>\n</div>\n</div>\n</div>\n<!-- Modal Footer -->\n<div class=\"px-space-md py-space-sm bg-surface-container-low flex items-center justify-between gap-3 shrink-0 border-t border-surface-container-high/60\">\n<div class=\"flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant\">\n<span class=\"h-2 w-2 rounded-full bg-secondary\"></span>\n<span>Operator: Ir. Ahmad Fauzi, M.T. (Super Admin)</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<button type=\"button\" class=\"px-space-md py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer\" data-action=\"close-modal-pelimpahan\">\n            Batal\n          </button>\n<button type=\"button\" class=\"px-space-md py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-2 shadow-[0_4px_16px_rgba(19,27,46,0.25)] transition-all cursor-pointer\" data-action=\"submit-pelimpahan\">\n<span class=\"material-symbols-outlined text-[18px]\">print</span>\n<span>Konfirmasi Pelimpahan &amp; Cetak BAST</span>\n</button>\n</div>\n</div>\n</div>\n</div>\n<!-- Bottom Regulatory & Compliance Notice -->\n<div class=\"mt-space-md mb-2 p-space-md rounded-xl bg-surface-container-lowest shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0\">\n<span class=\"material-symbols-outlined text-[20px]\">policy</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Sistem Pengawasan Barang Sitaan &amp; Brankas Isolasi Terpadu BSI</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">\n          Kepatuhan ISO/IEC 27001 &amp; UU ITE. Seluruh pembukaan loker segel dan brankas fisik wajib diotorisasi minimal 2 staf admin &amp; terekam CCTV tersinkronisasi NTP.\n        </span>\n</div>\n</div>\n<div class=\"flex items-center gap-3 shrink-0 font-label-sm text-label-sm text-on-surface-variant\">\n<span class=\"inline-flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">verified_user</span>\n        Integrity Hash: 0x8F3...BA4E\n      </span>\n<a class=\"text-secondary hover:underline font-semibold flex items-center gap-0.5\" href=\"#\">\n<span>SOP Isolasi</span>\n<span class=\"material-symbols-outlined text-[14px]\">arrow_forward</span>\n</a>\n</div>\n</div>\n<!-- Client-side Interactive Behavior -->\n<script>\n    // Simple interactions for modal opening & tab simulation\n    document.getElementById('btn-open-tahan-modal')?.addEventListener('click', function() {\n      const modal = document.getElementById('modal-pelimpahan');\n      if (modal) modal.classList.remove('hidden');\n    });\n  </script>\n</div></main><footer class=\"w-full bg-surface-container-lowest py-space-sm shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-auto\"><div class=\"max-w-[1440px] mx-auto px-space-lg flex items-center justify-between text-on-surface-variant\"><div class=\"flex items-center gap-2 font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[16px] text-secondary\">shield</span><span>Badan Sistem Informasi (BSI) Universitas Islam Indonesia \u2022 Kepatuhan ISO/IEC 27001 &amp; Audit Trail Terdistribusi</span></div><div class=\"font-label-sm text-label-sm text-outline\">Setiap tindakan dipertanggungjawabkan dalam rantai audit.</div></div></footer></div>\n<!-- MODAL: Tahan Barang Baru (Held Item Input) -->\n<div id=\"modal-tahan-baru\" class=\"fixed inset-0 z-50 hidden bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4\">\n  <div class=\"bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200\">\n    <div class=\"px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high\">\n      <div class=\"flex items-center gap-2.5\">\n        <span class=\"material-symbols-outlined text-error text-[22px]\">lock_clock</span>\n        <div class=\"flex flex-col\">\n          <span class=\"font-headline-sm text-headline-sm text-on-surface font-bold\">Penahanan Barang Khusus</span>\n          <span class=\"font-label-sm text-label-sm text-on-surface-variant\">BSI Investigasi Khusus</span>\n        </div>\n      </div>\n      <button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\" data-action=\"close-modal-tahan-baru\">\n        <span class=\"material-symbols-outlined text-[20px]\">close</span>\n      </button>\n    </div>\n    <div class=\"p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto\">\n      <div>\n        <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Nomor Registrasi Barang (BRG-)*</label>\n        <input id=\"input-tahan-brg\" class=\"w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary\" placeholder=\"Contoh: BRG-2024-0142\" type=\"text\" value=\"BRG-2024-0142\"/>\n      </div>\n      <div>\n        <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Kategori Aturan Pelanggaran *</label>\n        <select class=\"w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none\">\n          <option value=\"A1\">Rule A1: Klaim Berulang dengan Ciri Fiktif</option>\n          <option value=\"A2\">Rule A2: Indikasi Anomali Sengketa Kepemilikan Ganda</option>\n          <option value=\"A4\">Rule A4: Ketidakcocokan Ciri Kunci Rahasia</option>\n          <option value=\"DISIPLIN\">Pelimpahan Komisi Disiplin / Etik Kampus</option>\n        </select>\n      </div>\n      <div>\n        <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Alasan Penahanan & Instruksi *</label>\n        <textarea rows=\"3\" class=\"w-full p-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary\" placeholder=\"Jelaskan alasan resmi barang ditahan dan disimpan di brankas khusus...\">Barang ditahan sementara karena terdapat 2 laporan kehilangan dengan deskripsi identik mengklaim item ini secara bersamaan.</textarea>\n      </div>\n      <div>\n        <label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Lokasi Brankas Pengamanan *</label>\n        <input class=\"w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 font-body-md text-on-surface focus:outline-none\" value=\"Brankas Vault BSI Lt. 2 (Segel Elektronik #SG-081)\"/>\n      </div>\n    </div>\n    <div class=\"px-6 py-4 bg-surface-container-low flex items-center justify-end gap-3 border-t border-surface-container-high\">\n      <button class=\"px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-all\" data-action=\"close-modal-tahan-baru\">\n        Batal\n      </button>\n      <button class=\"px-5 py-2 rounded-full bg-error text-on-error font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md\" data-action=\"submit-tahan-baru\">\n        <span class=\"material-symbols-outlined text-[18px]\">lock</span>\n        <span>Kunci & Terbitkan Perintah Tahan</span>\n      </button>\n    </div>\n  </div>\n</div>\n";

export default function BarangDitahan({ onNavigate }) {
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
        lowerText.includes('kembali ke publik')
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('landing');
        return;
      }

      if (
        path === 'logout' ||
        path === 'login' ||
        title.includes('keluar dari portal')
      ) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_login');
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
      // Top actions
      if (lowerText.includes('status segel fisik') || target.id === 'btn-open-filter-log') {
        e.preventDefault();
        alert('Status Segel Fisik:\n\nSeluruh 19 segel tamper-evident terverifikasi VALID dan tersinkronisasi dengan Ledger Khasanah BSI.');
        return;
      }

      if (lowerText.includes('unduh rekap inventaris') || lowerText.includes('unduh rekap')) {
        e.preventDefault();
        alert('Mengunduh Rekap Inventaris Barang Ditahan (.CSV)...\n\nFile otomatis terenkripsi SHA-256.');
        return;
      }

      // Tahan barang baru modal
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

      // Close modal pelimpahan
      if (
        action === 'close-modal-pelimpahan' ||
        target.closest('[data-action="close-modal-pelimpahan"]') ||
        (target.closest('#modal-pelimpahan') && (lowerText === 'batal' || lowerText === 'close' || text === 'close')) ||
        (target.id === 'modal-pelimpahan')
      ) {
        e.preventDefault();
        const modal = el.querySelector('#modal-pelimpahan');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
        return;
      }

      // Submit pelimpahan
      if (
        action === 'submit-pelimpahan' ||
        target.closest('[data-action="submit-pelimpahan"]') ||
        (lowerText.includes('konfirmasi pelimpahan') && target.closest('#modal-pelimpahan'))
      ) {
        e.preventDefault();
        const modal = el.querySelector('#modal-pelimpahan');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
        alert('Otorisasi Hardware MFA Berhasil!\n\nBerita Acara Serah Terima (BAST) #BAST-2024-0089 telah diterbitkan ke antrean printer dinas dan tercatat pada Append-Only Audit Log.');
        return;
      }

      // Open modal pelimpahan
      if (
        action === 'open-modal-pelimpahan' ||
        target.closest('[data-action="open-modal-pelimpahan"]') ||
        (lowerText.includes('limpahkan') && !target.closest('#modal-pelimpahan'))
      ) {
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

      // Lepas barang button in table
      if (lowerText === 'lepas' && !target.closest('#modal-pelimpahan')) {
        e.preventDefault();
        alert('Pelepasan Barang Ditahan:\n\nSilakan lengkapi Berita Acara Serah Terima (BAST) dan verifikasi identitas pemilik sebelum pembukaan gembok loker.');
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

    const handleChange = (e) => {
      const target = e.target;
      if (target.name === 'transfer_action') {
        const radios = el.querySelectorAll('input[name="transfer_action"]');
        radios.forEach(radio => {
          const parentLabel = radio.closest('label');
          if (!parentLabel) return;
          const spans = parentLabel.querySelectorAll('span');
          if (radio.checked) {
            parentLabel.className = 'flex items-center gap-2 p-3 rounded-xl bg-primary-container text-on-primary cursor-pointer shadow-sm radio-action-pill';
            if (spans[0]) spans[0].className = 'font-label-md text-label-md font-semibold text-on-primary';
            if (spans[1]) spans[1].className = 'text-[11px] text-primary-fixed-dim';
          } else {
            parentLabel.className = 'flex items-center gap-2 p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest cursor-pointer transition-colors text-on-surface radio-action-pill';
            if (spans[0]) spans[0].className = 'font-label-md text-label-md font-semibold text-on-surface';
            if (spans[1]) spans[1].className = 'text-[11px] text-on-surface-variant';
          }
        });
      }
    };

    const handleInput = (e) => {
      if (e.target.id === 'input-justifikasi-pelimpahan') {
        const counter = el.querySelector('#char-counter');
        if (counter) {
          const len = e.target.value.length;
          counter.textContent = `${len} karakter (Min. 50)`;
          if (len >= 50) {
            counter.className = 'font-label-sm text-label-sm text-secondary font-semibold';
          } else {
            counter.className = 'font-label-sm text-label-sm text-error font-semibold';
          }
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        const modalPelimpahan = el.querySelector('#modal-pelimpahan');
        if (modalPelimpahan && !modalPelimpahan.classList.contains('hidden')) {
          modalPelimpahan.classList.add('hidden');
          modalPelimpahan.classList.remove('flex');
        }
        const modalTahan = el.querySelector('#modal-tahan-baru');
        if (modalTahan && !modalTahan.classList.contains('hidden')) {
          modalTahan.classList.add('hidden');
        }
      }
    };

    el.addEventListener('click', handleClick);
    el.addEventListener('change', handleChange);
    el.addEventListener('input', handleInput);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      el.removeEventListener('click', handleClick);
      el.removeEventListener('change', handleChange);
      el.removeEventListener('input', handleInput);
      window.removeEventListener('keydown', handleKeyDown);
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
