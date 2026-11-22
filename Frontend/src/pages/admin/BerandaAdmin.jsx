import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Administrator BSI: Beranda Admin BSI - Lost & Found Kampus UII
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]\"><div class=\"flex flex-col\"><div class=\"px-space-md py-space-md flex items-center gap-3 bg-surface-container-low\"><div class=\"w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-secondary-fixed text-[24px]\">verified_user</span></div><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none\">BSI \u2022 UII</span><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1\">Portal Administrator BSI</span></div></div><div class=\"px-space-md pt-space-md pb-space-xs\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest\">Menu Navigasi Audit</span></div><nav class=\"flex flex-col px-space-sm gap-1\" data-active-classes=\"bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)]\">\n  <a aria-current=\"page\" class=\"flex items-center gap-3 px-space-md py-space-xs transition-all bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)] font-semibold cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">grid_view</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"penanda-anomali\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">warning</span>\n    <span>Penanda Anomali</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"insiden\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">security_update_warning</span>\n    <span>Insiden</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"audit-log\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">history_edu</span>\n    <span>Audit Log</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"akun-satpam\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Akun Satpam</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"barang-ditahan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">lock_clock</span>\n    <span>Barang Ditahan</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"parameter\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">tune</span>\n    <span>Parameter</span>\n  </a>\n</nav></div><div class=\"p-space-md m-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\"><div class=\"flex items-center justify-between\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Keamanan Sesi</span><span class=\"flex h-2 w-2 rounded-full bg-secondary\"></span></div><div class=\"font-label-md text-label-md text-on-surface font-semibold\">Sesi Aktif: 07:42:15 tersisa</div><div class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">vpn_lock</span>10.12.0.4 - VPN Terpadu</div><div class=\"flex items-center justify-between pt-1\"><div class=\"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">speed</span>Latensi: 14ms</div><a class=\"font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1\" data-path=\"kontak-siaga\" href=\"#\"><span class=\"material-symbols-outlined text-[14px]\">emergency</span>Kontak Siaga</a></div></div><!-- Portal Shortcut Buttons -->\n<div class=\"px-space-md pt-1 pb-2 flex flex-col gap-1.5\">\n  <button data-path=\"portal-satpam\" class=\"w-full py-2 px-3 rounded-xl border border-outline-variant/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">local_police</span>\n    <span>Buka Portal Satpam</span>\n  </button>\n  <button data-path=\"portal-publik\" class=\"w-full py-1.5 px-3 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">public</span>\n    <span>Kembali ke Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72 flex flex-col min-h-screen\"><header class=\"fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-space-lg flex items-center justify-between\"><div class=\"flex items-center gap-space-md\"><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface leading-tight\">BSI Admin Portal - Lost &amp; Found Kampus UII</span><div class=\"flex items-center gap-2 mt-1\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface\"><span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>Sistem Operasional Normal - Gateway BSI Terhubung</span><span class=\"px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant\">Production v2.4-sec</span><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[13px]\">key</span>MFA Aktif - Hardware Token</span></div></div></div><div class=\"flex items-center gap-space-md\"><div class=\"relative w-72\"><span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">search</span><input class=\"w-full h-10 pl-9 pr-3 rounded-full bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors\" placeholder=\"Cari log / item / ID insiden...\" type=\"text\"/></div><div class=\"relative flex items-center justify-center\"><button class=\"w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors\"><span class=\"material-symbols-outlined text-[20px]\">notifications</span></button><span class=\"absolute top-1 right-1 h-2 w-2 rounded-full bg-error\"></span></div><div class=\"flex items-center gap-3 pl-2\"><div class=\"flex flex-col text-right\"><span class=\"font-label-md text-label-md text-on-surface\">Ir. Ahmad Fauzi, M.T.</span><span class=\"font-label-sm text-label-sm text-on-surface-variant\">Super Admin / Audit Officer</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"ml-2 w-9 h-9 rounded-full hover:bg-error-container hover:text-on-error-container text-on-surface-variant flex items-center justify-center transition-colors\" data-path=\"login\" href=\"#\" title=\"Keluar dari Portal\"><span class=\"material-symbols-outlined text-[18px]\">logout</span></a></div></div></header><main class=\"w-full pt-20 px-space-lg flex-1 bg-surface max-w-[1440px] mx-auto pb-space-lg\"><div class=\"flex flex-col w-full gap-space-lg\">\n<!-- Section 1: Executive Control Header & Operational Status Strip -->\n<div class=\"flex flex-col gap-space-md\">\n<div class=\"flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm\">\n<div class=\"flex flex-col max-w-3xl\">\n<div class=\"flex items-center gap-2 mb-1.5\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold\">\n<span class=\"material-symbols-outlined text-[14px]\">shield_person</span>\n            Pusat Pengawasan BSI\n          </span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-medium\">Zona Kendali Administratif Terenkripsi</span>\n</div>\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight\">Beranda Pusat Operasional &amp; Keamanan BSI</h1>\n<p class=\"font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed\">\n          Pemantauan anomali sistem integritas brankas, orkestrasi bot notifikasi, eksekusi job retensi, dan eskalasi investigasi lintas pos satpam kampus.\n        </p>\n</div>\n<div class=\"flex items-center gap-3 shrink-0\">\n<button class=\"inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all active:scale-95 shadow-sm\" id=\"btn-refresh\">\n<span class=\"material-symbols-outlined text-[18px]\">sync</span>\n<span>Muat Ulang Metrik</span>\n</button>\n<button class=\"inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md hover:bg-on-surface transition-all active:scale-95 shadow-md\">\n<span class=\"material-symbols-outlined text-[18px]\">picture_as_pdf</span>\n<span>Laporan Ringkasan PDF</span>\n</button>\n</div>\n</div>\n<!-- Live Telemetry Banner -->\n<div class=\"flex flex-wrap items-center justify-between gap-3 px-space-md py-2.5 bg-surface-container-low rounded-xl shadow-inner text-on-surface-variant font-label-sm text-label-sm\">\n<div class=\"flex flex-wrap items-center gap-4\">\n<div class=\"flex items-center gap-1.5 text-on-surface font-medium\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">sensors</span>\n<span>Sinkronisasi Realtime Terakhir:</span>\n<span class=\"font-semibold text-on-surface\">24 Okt 2024, 11:45:02 WIB</span>\n</div>\n<div class=\"h-3.5 w-[1px] bg-outline-variant hidden sm:block\"></div>\n<div class=\"flex items-center gap-1.5\">\n<span class=\"h-2 w-2 rounded-full bg-secondary\"></span>\n<span>Audit Engine:</span>\n<span class=\"font-semibold text-secondary\">Active</span>\n</div>\n<div class=\"h-3.5 w-[1px] bg-outline-variant hidden sm:block\"></div>\n<div class=\"flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">token</span>\n<span>MFA Level:</span>\n<span class=\"font-semibold text-on-surface\">Hardware FIDO2</span>\n</div>\n<div class=\"h-3.5 w-[1px] bg-outline-variant hidden sm:block\"></div>\n<div class=\"flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">settings_ethernet</span>\n<span>Worker Cron:</span>\n<span class=\"font-semibold text-secondary\">8/8 Online</span>\n</div>\n</div>\n<div class=\"flex items-center gap-1.5 text-outline\">\n<span class=\"material-symbols-outlined text-[14px]\">lock_clock</span>\n<span>Audit Trail Hash: #BSI-SHA256-491A</span>\n</div>\n</div>\n</div>\n<!-- Section 2: Dense 5-Column Operational KPI Cards -->\n<div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md\">\n<!-- KPI 1: Penanda Tinggi Baru -->\n<div class=\"flex flex-col justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-start justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold\">Penanda Tinggi Baru</span>\n<div class=\"w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">security_update_warning</span>\n</div>\n</div>\n<div class=\"flex items-baseline gap-2 mt-3\">\n<span class=\"font-display text-display text-error leading-none tracking-tight\">7</span>\n<span class=\"font-label-sm text-label-sm text-error font-semibold\">+3 dlm 24 jam</span>\n</div>\n<div class=\"mt-2.5\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-on-error\"></span>\n            Tingkat Kritis / Urgent\n          </span>\n</div>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-3 pt-3 bg-surface-container-low/50 -mx-space-md -mb-space-md p-space-sm rounded-b-xl leading-snug\">\n        Membutuhkan verifikasi otorisasi admin untuk pembukaan brankas/rilis barang.\n      </p>\n</div>\n<!-- KPI 2: Insiden Terbuka -->\n<div class=\"flex flex-col justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-start justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold\">Insiden Terbuka</span>\n<div class=\"w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">campaign</span>\n</div>\n</div>\n<div class=\"flex items-baseline gap-2 mt-3\">\n<span class=\"font-display text-display text-on-surface leading-none tracking-tight\">4</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">eskalasi aktif</span>\n</div>\n<div class=\"mt-2.5\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-amber-700\"></span>\n            Dalam Investigasi\n          </span>\n</div>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-3 pt-3 bg-surface-container-low/50 -mx-space-md -mb-space-md p-space-sm rounded-b-xl leading-snug\">\n        2 eskalasi Pos GKU, 2 penyelidikan identitas. Rata-rata resolusi: 4.2 jam.\n      </p>\n</div>\n<!-- KPI 3: Barang Ditahan -->\n<div class=\"flex flex-col justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-start justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold\">Barang Ditahan</span>\n<div class=\"w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">lock</span>\n</div>\n</div>\n<div class=\"flex items-baseline gap-2 mt-3\">\n<span class=\"font-display text-display text-on-surface leading-none tracking-tight\">19</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Rp 38.5 Jt</span>\n</div>\n<div class=\"mt-2.5\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>\n            Brankas Khusus BSI\n          </span>\n</div>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-3 pt-3 bg-surface-container-low/50 -mx-space-md -mb-space-md p-space-sm rounded-b-xl leading-snug\">\n        12 sengketa klaim bertumpuk, 7 identitas pengklaim palsu diselidiki.\n      </p>\n</div>\n<!-- KPI 4: Notifikasi WA Gagal -->\n<div class=\"flex flex-col justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-start justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold\">Notifikasi WA Gagal</span>\n<div class=\"w-8 h-8 rounded-lg bg-orange-100 text-orange-900 flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">mark_chat_unread</span>\n</div>\n</div>\n<div class=\"flex items-baseline gap-2 mt-3\">\n<span class=\"font-display text-display text-on-surface leading-none tracking-tight\">14</span>\n<span class=\"font-label-sm text-label-sm text-orange-800 font-semibold\">3x retry max</span>\n</div>\n<div class=\"mt-2.5\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-orange-600\"></span>\n            Perlu Dispatch Ulang\n          </span>\n</div>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-3 pt-3 bg-surface-container-low/50 -mx-space-md -mb-space-md p-space-sm rounded-b-xl leading-snug\">\n        Nomor civitas tidak terdaftar WA atau API gateway timeout antrean gateway.\n      </p>\n</div>\n<!-- KPI 5: Job Kedaluwarsa Terakhir -->\n<div class=\"flex flex-col justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-start justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold\">Job Kedaluwarsa</span>\n<div class=\"w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[18px]\">task_alt</span>\n</div>\n</div>\n<div class=\"flex flex-col mt-2\">\n<span class=\"font-headline-sm text-headline-sm text-on-surface font-bold leading-tight\">Hari ini, 03:00</span>\n<span class=\"font-label-sm text-label-sm text-emerald-800 font-semibold mt-0.5\">28 Tiket Kedaluwarsa</span>\n</div>\n<div class=\"mt-2.5\">\n<span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-emerald-600\"></span>\n            Sukses (0 Error)\n          </span>\n</div>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-3 pt-3 bg-surface-container-low/50 -mx-space-md -mb-space-md p-space-sm rounded-b-xl leading-snug\">\n        Dialokasikan ke arsip non-aktif pemusnahan/lelang sosial SOP Kampus.\n      </p>\n</div>\n</div>\n<!-- Section 3: 30-Day Anomaly Trend & Heuristic Metrics Panel -->\n<div class=\"flex flex-col lg:flex-row gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm\">\n<!-- Left: Trend Graph Container -->\n<div class=\"flex-1 flex flex-col justify-between\">\n<div>\n<!-- Controls Header -->\n<div class=\"flex flex-col md:flex-row md:items-center justify-between gap-3 pb-space-sm\">\n<div>\n<h2 class=\"font-headline-md text-headline-md text-on-surface tracking-tight\">Tren Penanda Anomali 30 Hari Terakhir</h2>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5\">\n              Distribusi frekuensi penanda sistem keamanan dan anomali klaim berdasarkan tingkat keparahan (Tinggi, Sedang, Rendah).\n            </p>\n</div>\n<div class=\"flex flex-wrap items-center gap-2\">\n<!-- Dropdown Date Range -->\n<div class=\"relative inline-block\">\n<select class=\"appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm py-2 pl-3 pr-8 rounded-lg focus:outline-none cursor-pointer\">\n<option>30 Hari Terakhir (25 Sep - 24 Okt 2024)</option>\n<option>14 Hari Terakhir</option>\n<option>Bulan Ini (Oktober 2024)</option>\n</select>\n<span class=\"material-symbols-outlined text-[16px] text-outline absolute right-2.5 top-2.5 pointer-events-none\">arrow_drop_down</span>\n</div>\n<!-- Posko Selector -->\n<div class=\"relative inline-block\">\n<select class=\"appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm py-2 pl-3 pr-8 rounded-lg focus:outline-none cursor-pointer\">\n<option>Semua Posko Kampus Terpadu</option>\n<option>Pos Induk GKU</option>\n<option>Pos Gerbang Utama</option>\n<option>Pos Perpustakaan Pusat</option>\n<option>Pos Masjid Ulil Albab</option>\n</select>\n<span class=\"material-symbols-outlined text-[16px] text-outline absolute right-2.5 top-2.5 pointer-events-none\">location_city</span>\n</div>\n<!-- Toggle Resolved -->\n<label class=\"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low cursor-pointer select-none\">\n<input checked=\"\" class=\"h-3.5 w-3.5 rounded text-secondary focus:ring-0\" type=\"checkbox\"/>\n<span class=\"font-label-sm text-label-sm text-on-surface\">Terselesaikan</span>\n</label>\n</div>\n</div>\n<!-- Legend -->\n<div class=\"flex flex-wrap items-center gap-4 py-2 mt-2 bg-surface-container-low/60 px-space-md rounded-lg font-label-sm text-label-sm\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-sm bg-error\"></span>\n<span class=\"text-on-surface font-medium\">Tinggi (Klaim ganda, kebocoran ciri rahasia, OTP brute-force)</span>\n</div>\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-sm bg-amber-500\"></span>\n<span class=\"text-on-surface font-medium\">Sedang (Perubahan spesifikasi &gt;2x, anomali posko)</span>\n</div>\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-sm bg-secondary\"></span>\n<span class=\"text-on-surface font-medium\">Rendah (Ketidakhadiran &gt;14 hari, nomor civitas)</span>\n</div>\n</div>\n</div>\n<!-- High-Density 30-Day Histogram / Visual Bar Chart Component -->\n<div class=\"mt-space-md flex flex-col gap-2\">\n<div class=\"h-44 w-full flex items-end justify-between gap-1 pt-6 px-2 bg-surface-container-low/40 rounded-xl relative\">\n<!-- Background Guides -->\n<div class=\"absolute inset-x-2 top-8 border-b border-outline-variant/30 pointer-events-none flex justify-between\">\n<span class=\"font-label-sm text-[10px] text-outline -mt-3.5\">14 Anomali</span>\n</div>\n<div class=\"absolute inset-x-2 top-20 border-b border-outline-variant/30 pointer-events-none flex justify-between\">\n<span class=\"font-label-sm text-[10px] text-outline -mt-3.5\">8 Anomali</span>\n</div>\n<div class=\"absolute inset-x-2 top-32 border-b border-outline-variant/30 pointer-events-none flex justify-between\">\n<span class=\"font-label-sm text-[10px] text-outline -mt-3.5\">3 Anomali</span>\n</div>\n<!-- 30 Stacked Day Bars (Normalized to ~160px height max) -->\n<!-- D1: 25 Sep -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-3 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-8 bg-secondary\"></div>\n</div>\n<div class=\"hidden group-hover:flex absolute -top-12 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] p-1.5 rounded shadow-lg flex-col whitespace-nowrap z-20 pointer-events-none\">\n<span class=\"font-bold\">25 Sep: 6 Anomali</span>\n<span>T:1 | S:2 | R:3</span>\n</div>\n</div>\n<!-- D2: 26 Sep -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-2 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-6 bg-secondary\"></div>\n</div>\n</div>\n<!-- D3: 27 Sep -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-4 bg-error\"></div>\n<div class=\"w-full h-5 bg-amber-500\"></div>\n<div class=\"w-full h-7 bg-secondary\"></div>\n</div>\n</div>\n<!-- D4: 28 Sep -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-1 bg-error\"></div>\n<div class=\"w-full h-3 bg-amber-500\"></div>\n<div class=\"w-full h-5 bg-secondary\"></div>\n</div>\n</div>\n<!-- D5: 29 Sep -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-3 bg-error\"></div>\n<div class=\"w-full h-2 bg-amber-500\"></div>\n<div class=\"w-full h-4 bg-secondary\"></div>\n</div>\n</div>\n<!-- D6: 30 Sep -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-5 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-8 bg-secondary\"></div>\n</div>\n</div>\n<!-- D7: 01 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-4 bg-error\"></div>\n<div class=\"w-full h-6 bg-amber-500\"></div>\n<div class=\"w-full h-9 bg-secondary\"></div>\n</div>\n</div>\n<!-- D8: 02 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-2 bg-error\"></div>\n<div class=\"w-full h-5 bg-amber-500\"></div>\n<div class=\"w-full h-7 bg-secondary\"></div>\n</div>\n</div>\n<!-- D9: 03 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-3 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-8 bg-secondary\"></div>\n</div>\n</div>\n<!-- D10: 04 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-2 bg-error\"></div>\n<div class=\"w-full h-3 bg-amber-500\"></div>\n<div class=\"w-full h-6 bg-secondary\"></div>\n</div>\n</div>\n<!-- D11: 05 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-4 bg-error\"></div>\n<div class=\"w-full h-5 bg-amber-500\"></div>\n<div class=\"w-full h-6 bg-secondary\"></div>\n</div>\n</div>\n<!-- D12: 06 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-3 bg-error\"></div>\n<div class=\"w-full h-2 bg-amber-500\"></div>\n<div class=\"w-full h-4 bg-secondary\"></div>\n</div>\n</div>\n<!-- D13: 07 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-5 bg-error\"></div>\n<div class=\"w-full h-5 bg-amber-500\"></div>\n<div class=\"w-full h-7 bg-secondary\"></div>\n</div>\n</div>\n<!-- D14: 08 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-3 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-8 bg-secondary\"></div>\n</div>\n</div>\n<!-- D15: 09 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-2 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-5 bg-secondary\"></div>\n</div>\n</div>\n<!-- D16: 10 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-4 bg-error\"></div>\n<div class=\"w-full h-6 bg-amber-500\"></div>\n<div class=\"w-full h-6 bg-secondary\"></div>\n</div>\n</div>\n<!-- D17: 11 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-6 bg-error\"></div>\n<div class=\"w-full h-5 bg-amber-500\"></div>\n<div class=\"w-full h-8 bg-secondary\"></div>\n</div>\n</div>\n<!-- D18: 12 Okt (SPIKE: Milad UII Fair) -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all ring-1 ring-error group-hover:opacity-80\">\n<div class=\"w-full h-12 bg-error\"></div>\n<div class=\"w-full h-10 bg-amber-500\"></div>\n<div class=\"w-full h-12 bg-secondary\"></div>\n</div>\n<div class=\"hidden group-hover:flex absolute -top-14 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] p-2 rounded shadow-lg flex-col whitespace-nowrap z-20 pointer-events-none\">\n<span class=\"font-bold text-error-container\">12 Okt (Lonjakan Event): 14 Anomali</span>\n<span>Tinggi: 5 | Sedang: 4 | Rendah: 5</span>\n</div>\n</div>\n<!-- D19: 13 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-4 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-5 bg-secondary\"></div>\n</div>\n</div>\n<!-- D20: 14 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-3 bg-error\"></div>\n<div class=\"w-full h-5 bg-amber-500\"></div>\n<div class=\"w-full h-6 bg-secondary\"></div>\n</div>\n</div>\n<!-- D21: 15 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-2 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-5 bg-secondary\"></div>\n</div>\n</div>\n<!-- D22: 16 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-4 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-7 bg-secondary\"></div>\n</div>\n</div>\n<!-- D23: 17 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-3 bg-error\"></div>\n<div class=\"w-full h-6 bg-amber-500\"></div>\n<div class=\"w-full h-6 bg-secondary\"></div>\n</div>\n</div>\n<!-- D24: 18 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-5 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-8 bg-secondary\"></div>\n</div>\n</div>\n<!-- D25: 19 Okt (SPIKE: Wisuda Periode I) -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all ring-1 ring-error group-hover:opacity-80\">\n<div class=\"w-full h-11 bg-error\"></div>\n<div class=\"w-full h-9 bg-amber-500\"></div>\n<div class=\"w-full h-11 bg-secondary\"></div>\n</div>\n<div class=\"hidden group-hover:flex absolute -top-14 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] p-2 rounded shadow-lg flex-col whitespace-nowrap z-20 pointer-events-none\">\n<span class=\"font-bold text-error-container\">19 Okt (Wisuda Periode I): 13 Anomali</span>\n<span>Tinggi: 4 | Sedang: 4 | Rendah: 5</span>\n</div>\n</div>\n<!-- D26: 20 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-2 bg-error\"></div>\n<div class=\"w-full h-3 bg-amber-500\"></div>\n<div class=\"w-full h-5 bg-secondary\"></div>\n</div>\n</div>\n<!-- D27: 21 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-3 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-6 bg-secondary\"></div>\n</div>\n</div>\n<!-- D28: 22 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-4 bg-error\"></div>\n<div class=\"w-full h-5 bg-amber-500\"></div>\n<div class=\"w-full h-7 bg-secondary\"></div>\n</div>\n</div>\n<!-- D29: 23 Okt -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all group-hover:opacity-80\">\n<div class=\"w-full h-5 bg-error\"></div>\n<div class=\"w-full h-4 bg-amber-500\"></div>\n<div class=\"w-full h-8 bg-secondary\"></div>\n</div>\n</div>\n<!-- D30: 24 Okt (Hari Ini) -->\n<div class=\"group relative flex-1 flex flex-col justify-end h-full\">\n<div class=\"w-full flex flex-col rounded-t-sm overflow-hidden transition-all ring-2 ring-primary-container group-hover:opacity-80\">\n<div class=\"w-full h-6 bg-error\"></div>\n<div class=\"w-full h-5 bg-amber-500\"></div>\n<div class=\"w-full h-6 bg-secondary\"></div>\n</div>\n<div class=\"hidden group-hover:flex absolute -top-14 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] p-2 rounded shadow-lg flex-col whitespace-nowrap z-20 pointer-events-none\">\n<span class=\"font-bold text-secondary-fixed\">Hari Ini (24 Okt): 7 Anomali</span>\n<span>Tinggi: 3 | Sedang: 2 | Rendah: 2</span>\n</div>\n</div>\n</div>\n<!-- Axis Labels -->\n<div class=\"flex items-center justify-between text-[11px] font-label-sm text-outline px-2\">\n<span>25 Sep (Awal Siklus)</span>\n<span class=\"font-semibold text-error\">12 Okt (Milad UII)</span>\n<span class=\"font-semibold text-error\">19 Okt (Wisuda)</span>\n<span class=\"font-bold text-on-surface\">24 Okt (Hari ini)</span>\n</div>\n</div>\n</div>\n<!-- Right: Heuristic Analytics Metrics Column -->\n<div class=\"w-full lg:w-72 bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shrink-0\">\n<div class=\"flex flex-col gap-4\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Komputasi Sentinels</span>\n<span class=\"material-symbols-outlined text-secondary text-[18px]\">neurology</span>\n</div>\n<div class=\"flex flex-col gap-3\">\n<div class=\"bg-surface-container-lowest p-3 rounded-lg shadow-sm\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Total Anomali Terdeteksi</span>\n<div class=\"flex items-baseline gap-2 mt-1\">\n<span class=\"font-headline-md text-headline-md font-bold text-on-surface\">184</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">kejadian / 30h</span>\n</div>\n<div class=\"w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden\">\n<div class=\"bg-secondary h-full rounded-full\" style=\"width: 72%;\"></div>\n</div>\n</div>\n<div class=\"bg-surface-container-lowest p-3 rounded-lg shadow-sm\">\n<div class=\"flex justify-between items-center\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">False Positive Ratio</span>\n<span class=\"font-label-sm text-label-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded\">Optimal</span>\n</div>\n<div class=\"flex items-baseline gap-2 mt-1\">\n<span class=\"font-headline-md text-headline-md font-bold text-on-surface\">4.8%</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">&lt; 5.0% SLA</span>\n</div>\n</div>\n<div class=\"bg-surface-container-lowest p-3 rounded-lg shadow-sm\">\n<div class=\"flex justify-between items-center\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Efektivitas Matching</span>\n<span class=\"font-label-sm text-label-sm font-bold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded\">Akurat</span>\n</div>\n<div class=\"flex items-baseline gap-2 mt-1\">\n<span class=\"font-headline-md text-headline-md font-bold text-on-surface\">96.2%</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Validasi Brankas</span>\n</div>\n</div>\n</div>\n</div>\n<div class=\"pt-4 mt-4 border-t border-outline-variant/30\">\n<div class=\"flex items-start gap-2\">\n<span class=\"material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5\">smart_toy</span>\n<p class=\"font-label-sm text-label-sm text-on-surface-variant leading-relaxed\">\n            Pola anomali dianalisis secara heuristik oleh modul <strong class=\"text-on-surface\">BSI Sentinel-AI</strong> dengan model korelasi silang antarpos.\n          </p>\n</div>\n</div>\n</div>\n</div>\n<!-- Section 4: Primary Dense Queue: High-Severity Flags Requiring Review -->\n<div class=\"flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden\">\n<!-- Table Header & Filter Bar -->\n<div class=\"p-space-lg flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md border-b border-surface-container-low\">\n<div>\n<div class=\"flex items-center gap-2\">\n<h2 class=\"font-headline-md text-headline-md text-on-surface tracking-tight\">Penanda Tinggi Butuh Tinjauan Segera</h2>\n<span class=\"inline-flex items-center px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold\">5 Antrean Aktif</span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-1\">\n          Daftar flag anomali berisiko tinggi yang memblokir proses serah terima atau memerlukan persetujuan manual Admin BSI. Setiap tindakan mewajibkan justifikasi formal untuk audit log.\n        </p>\n</div>\n<div class=\"flex items-center gap-3\">\n<div class=\"relative w-64 sm:w-80\">\n<span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">search</span>\n<input class=\"w-full h-10 pl-9 pr-3 rounded-full bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors shadow-inner\" placeholder=\"Cari Flag ID, Tiket, atau Barang...\" type=\"text\"/>\n</div>\n<button class=\"inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors\" title=\"Penyaringan Tambahan\">\n<span class=\"material-symbols-outlined text-[20px]\">filter_list</span>\n</button>\n</div>\n</div>\n<!-- Dense Data Table -->\n<div class=\"overflow-x-auto\">\n<table class=\"w-full text-left border-collapse\">\n<thead>\n<tr class=\"bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider\">\n<th class=\"py-3 px-4 font-semibold\">ID &amp; Tingkat</th>\n<th class=\"py-3 px-4 font-semibold\">Aturan / Rule Pelanggaran</th>\n<th class=\"py-3 px-4 font-semibold\">Subjek Terkait (Item &amp; Tiket)</th>\n<th class=\"py-3 px-4 font-semibold\">Waktu Terdeteksi</th>\n<th class=\"py-3 px-4 text-right font-semibold\">Status &amp; Tindakan Admin</th>\n</tr>\n</thead>\n<tbody class=\"divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface\">\n<!-- Row 1 -->\n<tr class=\"hover:bg-surface-container-low/40 transition-colors\">\n<td class=\"py-3.5 px-4 align-top\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface font-mono\">FLAG-2024-0988</span>\n<span class=\"inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-error\"></span>\n                  Tinggi / Kritis\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top max-w-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-error tracking-tight font-mono\">MULTIPLE_FAILED_CLAIMS_DIFFERENT_IDENTITY</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug\">\n                  3 pemohon berbeda mencoba klaim barang yang sama dalam 24 jam dengan kombinasi identitas palsu.\n                </p>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-1.5 font-semibold text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">usb</span>\n<span>BRG-2024-0142</span>\n<span class=\"text-on-surface-variant font-normal\">(Flashdisk Sandisk 64GB)</span>\n</div>\n<div class=\"text-on-surface-variant font-label-sm text-label-sm mt-0.5\">\n                  Tiket: <span class=\"font-mono text-secondary\">HL-88219</span> &amp; <span class=\"font-mono text-secondary\">HL-88195</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-outline flex items-center gap-1 mt-0.5\">\n<span class=\"material-symbols-outlined text-[13px]\">room</span> Pos Jaga Induk GKU\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-medium text-on-surface\">24 Okt, 10:48 WIB</span>\n<span class=\"font-label-sm text-label-sm text-error font-semibold\">57 menit lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top text-right\">\n<div class=\"flex items-center justify-end gap-2\">\n<button class=\"inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm hover:bg-on-surface transition-all shadow-sm\">\n<span class=\"material-symbols-outlined text-[15px]\">visibility</span>\n<span>Tinjau</span>\n</button>\n<div class=\"relative inline-block text-left\">\n<button class=\"inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors\" title=\"Aksi Cepat\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</div>\n</td>\n</tr>\n<!-- Row 2 -->\n<tr class=\"hover:bg-surface-container-low/40 transition-colors\">\n<td class=\"py-3.5 px-4 align-top\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface font-mono\">FLAG-2024-0982</span>\n<span class=\"inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-error\"></span>\n                  Tinggi / Kritis\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top max-w-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-error tracking-tight font-mono\">SECRET_ATTRIBUTE_LEAK_SUSPICION</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug\">\n                  Ciri khusus rahasia tertebak oleh pemohon tanpa adanya kecocokan data awal dari laporan kehilangan.\n                </p>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-1.5 font-semibold text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">smartphone</span>\n<span>BRG-2024-0139</span>\n<span class=\"text-on-surface-variant font-normal\">(iPhone 13 Pro Graphite)</span>\n</div>\n<div class=\"text-on-surface-variant font-label-sm text-label-sm mt-0.5\">\n                  Tiket: <span class=\"font-mono text-secondary\">HL-88140</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-outline flex items-center gap-1 mt-0.5\">\n<span class=\"material-symbols-outlined text-[13px]\">room</span> Pos Gerbang Utama\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-medium text-on-surface\">24 Okt, 09:12 WIB</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">2.5 jam lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top text-right\">\n<div class=\"flex items-center justify-end gap-2\">\n<button class=\"inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm hover:bg-on-surface transition-all shadow-sm\">\n<span class=\"material-symbols-outlined text-[15px]\">visibility</span>\n<span>Tinjau</span>\n</button>\n<button class=\"inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors\" title=\"Aksi Cepat\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 3 -->\n<tr class=\"hover:bg-surface-container-low/40 transition-colors\">\n<td class=\"py-3.5 px-4 align-top\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface font-mono\">FLAG-2024-0975</span>\n<span class=\"inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-error\"></span>\n                  Tinggi / Kritis\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top max-w-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-error tracking-tight font-mono\">HIGH_VALUE_ITEM_SERIAL_MISMATCH</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug\">\n                  Nomor seri laptop MacBook terdeteksi terdaftar atas inventaris dosen lain pada sistem SIM-Aset Kampus.\n                </p>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-1.5 font-semibold text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">laptop_mac</span>\n<span>BRG-2024-0128</span>\n<span class=\"text-on-surface-variant font-normal\">(MacBook Air M2 Silver)</span>\n</div>\n<div class=\"text-on-surface-variant font-label-sm text-label-sm mt-0.5\">\n                  Tiket: <span class=\"font-mono text-secondary\">HL-88099</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-outline flex items-center gap-1 mt-0.5\">\n<span class=\"material-symbols-outlined text-[13px]\">room</span> Pos Perpustakaan Pusat\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-medium text-on-surface\">23 Okt, 16:30 WIB</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Kemarin</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top text-right\">\n<div class=\"flex items-center justify-end gap-2\">\n<button class=\"inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm hover:bg-on-surface transition-all shadow-sm\">\n<span class=\"material-symbols-outlined text-[15px]\">visibility</span>\n<span>Tinjau</span>\n</button>\n<button class=\"inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors\" title=\"Aksi Cepat\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 4 -->\n<tr class=\"hover:bg-surface-container-low/40 transition-colors\">\n<td class=\"py-3.5 px-4 align-top\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface font-mono\">FLAG-2024-0969</span>\n<span class=\"inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-error\"></span>\n                  Tinggi / Kritis\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top max-w-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-error tracking-tight font-mono\">SUSPICIOUS_RAPID_REPORT_AFTER_RECEIVING</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug\">\n                  Laporan kehilangan dibuat 2 menit setelah barang fisik didaftarkan di brankas satpam oleh saksi temuan.\n                </p>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-1.5 font-semibold text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">account_balance_wallet</span>\n<span>BRG-2024-0125</span>\n<span class=\"text-on-surface-variant font-normal\">(Dompet Montblanc &amp; Uang Tunai)</span>\n</div>\n<div class=\"text-on-surface-variant font-label-sm text-label-sm mt-0.5\">\n                  Tiket: <span class=\"font-mono text-secondary\">HL-88072</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-outline flex items-center gap-1 mt-0.5\">\n<span class=\"material-symbols-outlined text-[13px]\">room</span> Pos Masjid Ulil Albab\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-medium text-on-surface\">23 Okt, 14:15 WIB</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Kemarin</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top text-right\">\n<div class=\"flex items-center justify-end gap-2\">\n<button class=\"inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm hover:bg-on-surface transition-all shadow-sm\">\n<span class=\"material-symbols-outlined text-[15px]\">visibility</span>\n<span>Tinjau</span>\n</button>\n<button class=\"inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors\" title=\"Aksi Cepat\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n<!-- Row 5 -->\n<tr class=\"hover:bg-surface-container-low/40 transition-colors\">\n<td class=\"py-3.5 px-4 align-top\">\n<div class=\"flex flex-col gap-1\">\n<span class=\"font-label-md text-label-md font-bold text-on-surface font-mono\">FLAG-2024-0961</span>\n<span class=\"inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-error\"></span>\n                  Tinggi / Kritis\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top max-w-sm\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-semibold text-error tracking-tight font-mono\">REPEATED_CORRECTION_BY_OFFICER</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug\">\n                  Petugas satpam melakukan koreksi field kritis &gt;3 kali pada data fisik barang yang sama setelah segel dibuat.\n                </p>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-1.5 font-semibold text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">photo_camera</span>\n<span>BRG-2024-0118</span>\n<span class=\"text-on-surface-variant font-normal\">(Kamera Sony A6400)</span>\n</div>\n<div class=\"text-on-surface-variant font-label-sm text-label-sm mt-0.5\">\n                  Tiket: <span class=\"font-mono text-secondary\">HL-88014</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-outline flex items-center gap-1 mt-0.5\">\n<span class=\"material-symbols-outlined text-[13px]\">room</span> Pos Fakultas Teknik Sipil\n                </span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top whitespace-nowrap\">\n<div class=\"flex flex-col\">\n<span class=\"font-medium text-on-surface\">22 Okt, 11:20 WIB</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">2 hari lalu</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4 align-top text-right\">\n<div class=\"flex items-center justify-end gap-2\">\n<button class=\"inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm hover:bg-on-surface transition-all shadow-sm\">\n<span class=\"material-symbols-outlined text-[15px]\">visibility</span>\n<span>Tinjau</span>\n</button>\n<button class=\"inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors\" title=\"Aksi Cepat\">\n<span class=\"material-symbols-outlined text-[16px]\">more_vert</span>\n</button>\n</div>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Security Governance Notice Bar at Footer of Table -->\n<div class=\"p-space-md bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-on-surface-variant font-label-sm text-label-sm\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-amber-600 text-[18px]\">verified</span>\n<span>\n<strong class=\"text-on-surface\">Sesuai Ketentuan Keamanan BSI UII:</strong> Pembatalan penanda atau pelepasan penahanan barang wajib mencantumkan alasan tertulis minimal 50 karakter yang ditandatangani secara digital dengan token MFA.\n        </span>\n</div>\n<a class=\"inline-flex items-center gap-1 text-secondary font-semibold hover:underline shrink-0\" href=\"#\">\n<span>SOP Penanganan Anomali v2.1</span>\n<span class=\"material-symbols-outlined text-[14px]\">open_in_new</span>\n</a>\n</div>\n</div>\n</div>\n<script>\n  // Simple micro-interaction for Refresh Metrics button\n  document.getElementById('btn-refresh')?.addEventListener('click', function() {\n    const icon = this.querySelector('.material-symbols-outlined');\n    if (icon) {\n      icon.classList.add('animate-spin');\n      setTimeout(() => {\n        icon.classList.remove('animate-spin');\n      }, 700);\n    }\n  });\n</script></main><footer class=\"w-full bg-surface-container-lowest py-space-sm shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-auto\"><div class=\"max-w-[1440px] mx-auto px-space-lg flex items-center justify-between text-on-surface-variant\"><div class=\"flex items-center gap-2 font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[16px] text-secondary\">shield</span><span>Badan Sistem Informasi (BSI) Universitas Islam Indonesia \u2022 Kepatuhan ISO/IEC 27001 &amp; Audit Trail Terdistribusi</span></div><div class=\"font-label-sm text-label-sm text-outline\">Setiap tindakan dipertanggungjawabkan dalam rantai audit.</div></div></footer></div>";

export default function BerandaAdmin({ onNavigate }) {
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
