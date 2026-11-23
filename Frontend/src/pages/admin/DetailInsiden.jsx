import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Administrator BSI: Detail Insiden (INS-2024-0042) - Portal Administrator BSI
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]\"><div class=\"flex flex-col\"><div class=\"px-space-md py-space-md flex items-center gap-3 bg-surface-container-low\"><div class=\"w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-secondary-fixed text-[24px]\">verified_user</span></div><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none\">BSI \u2022 UII</span><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1\">Portal Administrator BSI</span></div></div><div class=\"px-space-md pt-space-md pb-space-xs\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest\">Menu Navigasi Audit</span></div><nav class=\"flex flex-col px-space-sm gap-1\" data-active-classes=\"bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)]\">\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">grid_view</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"penanda-anomali\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">warning</span>\n    <span>Penanda Anomali</span>\n  </a>\n  <a aria-current=\"page\" class=\"flex items-center gap-3 px-space-md py-space-xs transition-all bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)] font-semibold cursor-pointer\" data-path=\"insiden\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">security_update_warning</span>\n    <span>Insiden</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"audit-log\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">history_edu</span>\n    <span>Audit Log</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"akun-satpam\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Akun Satpam</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"barang-ditahan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">lock_clock</span>\n    <span>Barang Ditahan</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"parameter\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">tune</span>\n    <span>Parameter</span>\n  </a>\n</nav></div><div class=\"p-space-md m-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\"><div class=\"flex items-center justify-between\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Keamanan Sesi</span><span class=\"flex h-2 w-2 rounded-full bg-secondary\"></span></div><div class=\"font-label-md text-label-md text-on-surface font-semibold\">Sesi Aktif: 07:42:15 tersisa</div><div class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">vpn_lock</span>10.12.0.4 - VPN Terpadu</div><div class=\"flex items-center justify-between pt-1\"><div class=\"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">speed</span>Latensi: 14ms</div><a class=\"font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1\" data-path=\"kontak-siaga\" href=\"#\"><span class=\"material-symbols-outlined text-[14px]\">emergency</span>Kontak Siaga</a></div></div><!-- Portal Shortcut Buttons -->\n<div class=\"px-space-md pt-1 pb-2 flex flex-col gap-1.5\">\n  <button data-path=\"portal-satpam\" class=\"w-full py-2 px-3 rounded-xl border border-outline-variant/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">local_police</span>\n    <span>Buka Portal Satpam</span>\n  </button>\n  <button data-path=\"portal-publik\" class=\"w-full py-1.5 px-3 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">public</span>\n    <span>Kembali ke Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72 flex flex-col min-h-screen\"><header class=\"fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-space-lg flex items-center justify-between\"><div class=\"flex items-center gap-space-md\"><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface leading-tight\">BSI Admin Portal - Lost &amp; Found Kampus UII</span><div class=\"flex items-center gap-2 mt-1\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface\"><span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>Sistem Operasional Normal - Gateway BSI Terhubung</span><span class=\"px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant\">Production v2.4-sec</span><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[13px]\">key</span>MFA Aktif - Hardware Token</span></div></div></div><div class=\"flex items-center gap-space-md\"><div class=\"relative w-72\"><span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">search</span><input class=\"w-full h-10 pl-9 pr-3 rounded-full bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors\" placeholder=\"Cari log / item / ID insiden...\" type=\"text\"/></div><div class=\"relative flex items-center justify-center\"><button class=\"w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors\"><span class=\"material-symbols-outlined text-[20px]\">notifications</span></button><span class=\"absolute top-1 right-1 h-2 w-2 rounded-full bg-error\"></span></div><div class=\"flex items-center gap-3 pl-2\"><div class=\"flex flex-col text-right\"><span class=\"font-label-md text-label-md text-on-surface\">Ir. Ahmad Fauzi, M.T.</span><span class=\"font-label-sm text-label-sm text-on-surface-variant\">Super Admin / Audit Officer</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"ml-2 w-9 h-9 rounded-full hover:bg-error-container hover:text-on-error-container text-on-surface-variant flex items-center justify-center transition-colors\" data-path=\"login\" href=\"#\" title=\"Keluar dari Portal\"><span class=\"material-symbols-outlined text-[18px]\">logout</span></a></div></div>\n<!-- DROPDOWN NOTIFIKASI ADMIN -->\n<div id=\"dropdown-notifikasi\" style=\"display: none;\" class=\"fixed right-20 top-16 z-50 hidden w-96 max-w-[90vw] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden animate-in fade-in zoom-in-95 duration-150\">\n  <div class=\"px-4 py-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/30\">\n    <div class=\"flex items-center gap-2\">\n      <span class=\"material-symbols-outlined text-secondary text-[20px]\">notifications_active</span>\n      <span class=\"font-label-md text-label-md font-bold text-on-surface\">Pusat Notifikasi BSI</span>\n      <span id=\"badge-unread-count\" class=\"px-1.5 py-0.2 rounded-full bg-error text-on-error font-label-sm text-[10px] font-bold\">3</span>\n    </div>\n    <button data-action=\"mark-all-read\" class=\"text-secondary hover:underline font-label-sm text-[11px] cursor-pointer\">Tandai Dibaca</button>\n  </div>\n  <div class=\"divide-y divide-outline-variant/20 max-h-80 overflow-y-auto\">\n    <div class=\"p-3 hover:bg-surface-container-low/60 transition-colors cursor-pointer\" data-path=\"insiden\">\n      <div class=\"flex items-start gap-2.5\">\n        <span class=\"w-2 h-2 rounded-full bg-error mt-1.5 shrink-0\"></span>\n        <div class=\"flex flex-col\">\n          <span class=\"font-label-sm text-label-sm font-bold text-error\">FLAG-2024-0988 \u2022 Sengketa Klaim Kritis</span>\n          <p class=\"font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-snug\">3 pemohon berbeda mencoba klaim BRG-2024-0142 di Pos GKU dalam 24 jam.</p>\n          <span class=\"text-[10px] text-outline mt-1\">57 menit lalu</span>\n        </div>\n      </div>\n    </div>\n    <div class=\"p-3 hover:bg-surface-container-low/60 transition-colors cursor-pointer\" data-path=\"barang-ditahan\">\n      <div class=\"flex items-start gap-2.5\">\n        <span class=\"w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0\"></span>\n        <div class=\"flex flex-col\">\n          <span class=\"font-label-sm text-label-sm font-bold text-on-surface\">Pelepasan Barang Ditahan</span>\n          <p class=\"font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-snug\">BAST #0089 diterbitkan untuk pemindahan barang bukti ke Vault Lt. 3.</p>\n          <span class=\"text-[10px] text-outline mt-1\">2 jam lalu</span>\n        </div>\n      </div>\n    </div>\n    <div class=\"p-3 hover:bg-surface-container-low/60 transition-colors cursor-pointer\" data-path=\"audit-log\">\n      <div class=\"flex items-start gap-2.5\">\n        <span class=\"w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0\"></span>\n        <div class=\"flex flex-col\">\n          <span class=\"font-label-sm text-label-sm font-bold text-on-surface\">Audit Ledger Tersinkronisasi</span>\n          <p class=\"font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-snug\">142,891 blok hash tervalidasi 100% utuh tanpa tamper.</p>\n          <span class=\"text-[10px] text-outline mt-1\">Hari ini, 03:00 WIB</span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"px-4 py-2 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/30\">\n    <button data-path=\"insiden\" class=\"text-secondary hover:underline font-label-sm text-[11px] font-semibold flex items-center gap-1 cursor-pointer\">\n      <span>Lihat Semua Insiden</span>\n      <span class=\"material-symbols-outlined text-[14px]\">arrow_forward</span>\n    </button>\n    <button data-action=\"close-notif-dropdown\" class=\"px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest font-label-sm text-[11px] text-on-surface cursor-pointer\">Tutup</button>\n  </div>\n</div>\n\n</header><main class=\"w-full pt-20 px-space-lg flex-1 bg-surface max-w-[1440px] mx-auto pb-space-lg\"><div class=\"flex flex-col w-full pb-12\">\n<!-- 1. BREADCRUMB & HEADER INSIDEN -->\n<div class=\"flex flex-col gap-4 mb-6\">\n<!-- Breadcrumb -->\n<nav class=\"flex items-center gap-2 text-on-surface-variant font-label-md text-label-md\">\n<a class=\"hover:text-secondary flex items-center gap-1 transition-colors\" href=\"#\">\n<span class=\"material-symbols-outlined text-[16px]\">home</span>\n<span>Beranda Admin</span>\n</a>\n<span class=\"material-symbols-outlined text-[14px] text-outline\">chevron_right</span>\n<a class=\"hover:text-secondary transition-colors\" href=\"#\">Manajemen Insiden &amp; Investigasi</a>\n<span class=\"material-symbols-outlined text-[14px] text-outline\">chevron_right</span>\n<span class=\"font-semibold text-on-surface bg-surface-container px-2 py-0.5 rounded\">INS-2024-0042</span>\n</nav>\n<!-- Header & Action Zone -->\n<div class=\"flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 bg-surface-container-lowest p-space-md rounded-2xl shadow-sm\">\n<div class=\"flex flex-col gap-2 max-w-4xl\">\n<div class=\"flex flex-wrap items-center gap-2\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold tracking-wide\">\n<span class=\"material-symbols-outlined text-[14px]\">crisis_alert</span>\n            KRITIS / HIGH PRIORITY\n          </span>\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold\">\n<span class=\"h-2 w-2 rounded-full bg-on-secondary animate-pulse\"></span>\n            TAHAP INVESTIGASI &amp; MITIGASI AKTIF\n          </span>\n<span class=\"px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-mono\">\n            Klausul ISO 27001: A.16.1\n          </span>\n</div>\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface leading-tight mt-1\">\n          Kasus Insiden INS-2024-0042: Indikasi Klaim Ganda Identitas Silang &amp; Deviasi Ciri Rahasia (Rule A1 &amp; A2)\n        </h1>\n<div class=\"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-on-surface-variant font-body-sm text-body-sm\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">calendar_today</span>\n<div>\n<span class=\"block text-outline font-label-sm text-label-sm leading-none\">Dibuka Pada</span>\n<span class=\"font-medium text-on-surface\">24 Okt 2024, 11:15 WIB</span>\n</div>\n</div>\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">badge</span>\n<div>\n<span class=\"block text-outline font-label-sm text-label-sm leading-none\">Petugas Audit</span>\n<span class=\"font-medium text-on-surface\">Ir. Ahmad Fauzi, M.T.</span>\n</div>\n</div>\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">flag_circle</span>\n<div>\n<span class=\"block text-outline font-label-sm text-label-sm leading-none\">Pemicu Asal</span>\n<span class=\"font-mono text-on-surface\">FLAG-0988 &amp; 0982 (GKU)</span>\n</div>\n</div>\n<div class=\"flex items-center gap-2 bg-error-container/40 px-2.5 py-1.5 rounded-lg text-error\">\n<span class=\"material-symbols-outlined text-[18px] text-error animate-spin\" style=\"animation-duration: 6s;\">timer</span>\n<div>\n<span class=\"block font-label-sm text-label-sm leading-none text-on-error-container\">SLA Target BSI</span>\n<span class=\"font-semibold text-on-error-container\">01:45:00 tersisa / 04:00:00</span>\n</div>\n</div>\n</div>\n</div>\n<div class=\"flex sm:flex-col lg:flex-row items-center gap-2 shrink-0 pt-2 lg:pt-0\">\n<button class=\"inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all shadow-sm\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">picture_as_pdf</span>\n<span>Ekspor B.A. (PDF/A)</span>\n</button>\n<button class=\"inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-surface-tint font-label-md text-label-md transition-all shadow-sm\">\n<span class=\"material-symbols-outlined text-[18px]\">verified</span>\n<span>Audit Trail Lengkap</span>\n</button>\n</div>\n</div>\n</div>\n<!-- 2. STEPPER HORIZONTAL 5 TAHAP PENANGANAN INSIDEN -->\n<div class=\"w-full bg-surface-container-lowest p-space-md rounded-2xl shadow-sm mb-6\">\n<div class=\"flex items-center justify-between mb-4 pb-2\">\n<div>\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold\">Protokol Penanganan Standar BSI-SOP-SEC-09</span>\n<h2 class=\"font-headline-sm text-headline-sm text-on-surface\">Alur Investigasi &amp; Siklus Hidup Insiden (5 Tahap)</h2>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full\">\n        Kemajuan Kasus: <strong class=\"text-on-surface\">50% Tuntas</strong>\n</span>\n</div>\n<!-- Steps Graphic -->\n<div class=\"grid grid-cols-1 md:grid-cols-5 gap-3 relative\">\n<!-- Step 1: Deteksi (Completed) -->\n<div class=\"flex flex-col p-3 rounded-xl bg-surface-container-low transition-all\">\n<div class=\"flex items-center justify-between mb-2\">\n<span class=\"w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md\">\n<span class=\"material-symbols-outlined text-[16px]\">check</span>\n</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Selesai</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">1. Deteksi</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug\">\n          Anomali Rule A1 &amp; Flagging Otomatis Posko GKU.\n        </span>\n</div>\n<!-- Step 2: Tahan (Completed) -->\n<div class=\"flex flex-col p-3 rounded-xl bg-surface-container-low transition-all\">\n<div class=\"flex items-center justify-between mb-2\">\n<span class=\"w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md\">\n<span class=\"material-symbols-outlined text-[16px]\">check</span>\n</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold\">Selesai</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">2. Tahan (Contain)</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug\">\n          Brankas Fisik Locker A-04 &amp; Suspensi Satpam SEC-035.\n        </span>\n</div>\n<!-- Step 3: Investigasi (Active) -->\n<div class=\"flex flex-col p-3 rounded-xl bg-secondary-fixed/50 ring-2 ring-secondary shadow-md transition-all\">\n<div class=\"flex items-center justify-between mb-2\">\n<span class=\"w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-md text-label-md animate-pulse\">\n            3\n          </span>\n<span class=\"inline-flex items-center gap-1 font-label-sm text-label-sm text-on-secondary-fixed-variant font-bold\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>\n            Sedang Berjalan\n          </span>\n</div>\n<span class=\"font-label-md text-label-md text-on-secondary-fixed font-bold\">3. Investigasi</span>\n<span class=\"font-body-sm text-body-sm text-on-surface mt-1 leading-snug font-medium\">\n          Wawancara, Rekaman CCTV CAM-04, &amp; Hash Forensik.\n        </span>\n</div>\n<!-- Step 4: Rekonsiliasi (Pending) -->\n<div class=\"flex flex-col p-3 rounded-xl bg-surface-container opacity-70 transition-all\">\n<div class=\"flex items-center justify-between mb-2\">\n<span class=\"w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-md text-label-md\">\n            4\n          </span>\n<span class=\"font-label-sm text-label-sm text-outline\">Menunggu</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">4. Pulihkan / Putus</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug\">\n          Putusan Hak Barang &amp; Rehabilitasi/Sanksi Petugas.\n        </span>\n</div>\n<!-- Step 5: Evaluasi (Locked) -->\n<div class=\"flex flex-col p-3 rounded-xl bg-surface-container opacity-50 transition-all\">\n<div class=\"flex items-center justify-between mb-2\">\n<span class=\"w-7 h-7 rounded-full bg-surface-container-highest text-outline flex items-center justify-center font-label-md text-label-md\">\n<span class=\"material-symbols-outlined text-[14px]\">lock</span>\n</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Terkunci</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">5. Evaluasi &amp; Tutup</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug\">\n          Pembaruan Parameter AI Sentinel &amp; SOP Ditpam UII.\n        </span>\n</div>\n</div>\n</div>\n<!-- 3. GRID UTAMA DUA KOLOM (70% - 30%) -->\n<div class=\"grid grid-cols-1 lg:grid-cols-12 gap-6 items-start\">\n<!-- ================= KOLOM KIRI (70% / 8 cols) ================= -->\n<div class=\"lg:col-span-8 flex flex-col gap-6\">\n<!-- KARTU 1: TINDAKAN PENAHANAN (CONTAINMENT CARD) -->\n<section class=\"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-4\">\n<div class=\"flex items-center justify-between pb-3\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[22px]\">lock_clock</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-headline-sm text-on-surface\">Tindakan Penahanan &amp; Isolasi Darurat</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pencegahan risiko pemindahtanganan fisik dan manipulasi audit</span>\n</div>\n</div>\n<span class=\"inline-flex items-center gap-1 font-mono font-label-sm text-label-sm text-secondary bg-surface-container-high px-2.5 py-1 rounded-full\">\n<span class=\"material-symbols-outlined text-[13px]\">dataset</span> Blok #00142890\n          </span>\n</div>\n<!-- 2 Sub-Panel Status Penahanan -->\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n<!-- Barang Ditahan -->\n<div class=\"bg-surface-container-low p-4 rounded-xl flex flex-col justify-between gap-3\">\n<div class=\"flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold\">Objek Barang Bukti</span>\n<span class=\"px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm font-bold\">DITAHAN_ADMIN</span>\n</div>\n<div class=\"font-headline-sm text-headline-sm text-on-surface\">BRG-2024-0142</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n                Flashdisk Sandisk 64GB Merah-Hitam. Terkunci di <strong>Brankas Pos Induk GKU Locker A-04</strong>.\n              </p>\n<div class=\"flex items-center gap-2 mt-1 py-1 px-2 rounded bg-surface-container text-on-surface font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[16px] text-error\">lock</span>\n<span>Segel Fisik: <strong class=\"font-mono\">BSI-SEC-0981</strong></span>\n</div>\n</div>\n<button class=\"w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors\" onclick=\"document.getElementById('modal-tahan-barang').classList.remove('hidden')\">\n<span class=\"material-symbols-outlined text-[16px]\">add_moderator</span>\n<span>Tahan Barang Terkait Tambahan</span>\n</button>\n</div>\n<!-- Akun Satpam Ditangguhkan -->\n<div class=\"bg-surface-container-low p-4 rounded-xl flex flex-col justify-between gap-3\">\n<div class=\"flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold\">Kredensial Petugas Terkait</span>\n<span class=\"px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold\">DITANGGUHKAN</span>\n</div>\n<div class=\"font-headline-sm text-headline-sm text-on-surface\">Bripka Joko Wahyono</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n                NRP: <strong class=\"font-mono\">SEC-035</strong> (Pos Jaga Induk GKU). Akses edit data Lost &amp; Found dinonaktifkan otomatis oleh sistem mitigasi.\n              </p>\n<div class=\"flex items-center gap-2 mt-1 py-1 px-2 rounded bg-surface-container text-on-surface font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">block</span>\n<span>Dibatasi sejak: 24 Okt 11:25 WIB</span>\n</div>\n</div>\n<div class=\"grid grid-cols-2 gap-2\">\n<button class=\"inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm transition-colors\" onclick=\"document.getElementById('modal-tangguhkan-akun').classList.remove('hidden')\">\n<span class=\"material-symbols-outlined text-[14px]\">person_off</span>\n<span>Suspend Lain</span>\n</button>\n<button class=\"inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-surface text-secondary hover:bg-secondary-fixed font-label-sm text-label-sm transition-colors\" onclick=\"alert('Permintaan pembukaan suspensi membutuhkan otorisasi 2-Admin BSI!')\">\n<span class=\"material-symbols-outlined text-[14px]\">lock_open</span>\n<span>Buka Suspensi</span>\n</button>\n</div>\n</div>\n</div>\n<div class=\"flex items-center gap-2 pt-2 text-outline font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">check_circle</span>\n<span>Seluruh tindakan penahanan diamankan dengan tanda tangan kriptografis Super Admin MFA.</span>\n</div>\n</section>\n<!-- KARTU 2: BERKAS & FAKTA INVESTIGASI (INVESTIGATION CARD) -->\n<section class=\"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-5\">\n<div class=\"flex items-center justify-between pb-2\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[22px]\">find_in_page</span>\n</div>\n<div>\n<h3 class=\"font-headline-sm text-headline-sm text-on-surface\">Berkas Fakta, Riwayat Barang &amp; Klaim Bersaing</h3>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Kompilasi bukti forensik fisik dan pengujian verifikasi rahasia</span>\n</div>\n</div>\n<span class=\"px-2.5 py-1 rounded bg-surface-container text-on-surface font-mono font-label-sm text-label-sm\">\n            Tabel Audit: A_INV_ITEM_0142\n          </span>\n</div>\n<!-- Detail Barang & Koreksi -->\n<div class=\"p-4 rounded-xl bg-surface-container-low flex flex-col gap-3\">\n<div class=\"flex flex-wrap items-center justify-between gap-2\">\n<div class=\"flex items-center gap-3\">\n<span class=\"material-symbols-outlined text-[20px] text-secondary\">usb</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface\">Riwayat Aset Barang: BRG-2024-0142</span>\n</div>\n<span class=\"px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n              Deviasi Atribut Terdeteksi\n            </span>\n</div>\n<div class=\"grid grid-cols-1 sm:grid-cols-3 gap-3 text-body-sm font-body-sm\">\n<div class=\"bg-surface-container-lowest p-2.5 rounded-lg\">\n<span class=\"block text-outline font-label-sm text-label-sm\">Input Awal (08:32 WIB)</span>\n<span class=\"font-medium text-on-surface\">Kategori: Flashdisk</span>\n<span class=\"block text-on-surface-variant\">Deskripsi: \"Hitam Polos 32GB\"</span>\n</div>\n<div class=\"bg-surface-container-lowest p-2.5 rounded-lg\">\n<span class=\"block text-outline font-label-sm text-label-sm\">Koreksi Data (11:52 WIB)</span>\n<span class=\"font-medium text-error\">Diubah: \"Merah-Hitam Sandisk 64GB\"</span>\n<span class=\"block text-on-surface-variant\">Oleh: SEC-042 (Tanpa Foto Ulang)</span>\n</div>\n<div class=\"bg-surface-container-lowest p-2.5 rounded-lg\">\n<span class=\"block text-outline font-label-sm text-label-sm\">Hasil Uji Lab BSI</span>\n<span class=\"font-medium text-secondary\">Kapasitas Nyata: 64 GB</span>\n<span class=\"block font-mono text-[11px] text-outline\">SHA256: e3b0c442...98af</span>\n</div>\n</div>\n</div>\n<!-- 3 Klaim Bersaing (Comparative Claims Table/Cards) -->\n<div class=\"flex flex-col gap-3\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-lg text-label-lg text-on-surface\">3 Klaim Civitas Masuk (Uji Atribut Rahasia)</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Threshold Kesesuaian BSI: Min. 85%</span>\n</div>\n<div class=\"grid grid-cols-1 gap-2.5\">\n<!-- Klaim 1 -->\n<div class=\"p-3.5 rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-3\">\n<div class=\"flex items-start gap-3\">\n<span class=\"w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-label-sm shrink-0 mt-0.5\">01</span>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">M. Alif Febrian (NIM: 22523140)</span>\n<span class=\"px-2 py-0.2 rounded bg-surface-container-high text-on-surface font-mono font-label-sm text-label-sm\">HL-88219</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5\">\n<strong>Atribut Cocok:</strong> Menyebut nama file <em>\"Draft_Skripsi_Bab4_Alif_Final.docx\"</em> (Valid di Lab BSI).\n                    <br/><strong class=\"text-error\">Deviasi:</strong> Menyebut gantungan bertali biru (fakta fisik: tanpa gantungan).\n                  </span>\n</div>\n</div>\n<div class=\"flex items-center gap-3 shrink-0\">\n<div class=\"flex flex-col text-right\">\n<span class=\"font-label-md text-label-md text-secondary font-bold\">Skor Kecocokan: 78%</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Kandidat Terkuat</span>\n</div>\n<span class=\"px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold\">Uji Lanjutan</span>\n</div>\n</div>\n<!-- Klaim 2 -->\n<div class=\"p-3.5 rounded-xl bg-surface-container-low opacity-80 flex flex-col md:flex-row md:items-center justify-between gap-3\">\n<div class=\"flex items-start gap-3\">\n<span class=\"w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center font-bold text-label-sm shrink-0 mt-0.5\">02</span>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">Dimas Bagaskara (NIM: 21523098)</span>\n<span class=\"px-2 py-0.2 rounded bg-surface-container-high text-on-surface font-mono font-label-sm text-label-sm\">HL-88195</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5\">\n<strong>Klaim Kapasitas:</strong> 32 GB. Berisi slide kuliah kalkulus.\n                    <br/><strong class=\"text-error\">Deviasi Kritis:</strong> Kapasitas fisik objek adalah 64 GB Sandisk Ultra.\n                  </span>\n</div>\n</div>\n<div class=\"flex items-center gap-3 shrink-0\">\n<div class=\"flex flex-col text-right\">\n<span class=\"font-label-md text-label-md text-error font-bold\">Skor: 18%</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Anomali Gagal</span>\n</div>\n<span class=\"px-2.5 py-1 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">Ditolak</span>\n</div>\n</div>\n<!-- Klaim 3 -->\n<div class=\"p-3.5 rounded-xl bg-surface-container-low opacity-80 flex flex-col md:flex-row md:items-center justify-between gap-3\">\n<div class=\"flex items-start gap-3\">\n<span class=\"w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center font-bold text-label-sm shrink-0 mt-0.5\">03</span>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">Siti Nurhaliza (NIM: 23521012)</span>\n<span class=\"px-2 py-0.2 rounded bg-surface-container-high text-on-surface font-mono font-label-sm text-label-sm\">HL-88204</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5\">\n<strong>Lokasi Klaim:</strong> Meja Kantin Basement GKU pukul 09:30 WIB.\n                    <br/><strong class=\"text-error\">Deviasi Fakta:</strong> Ditemukan cleaning service pukul 08:15 WIB di Lab Komputer Lt. 2.\n                  </span>\n</div>\n</div>\n<div class=\"flex items-center gap-3 shrink-0\">\n<div class=\"flex flex-col text-right\">\n<span class=\"font-label-md text-label-md text-error font-bold\">Skor: 0%</span>\n<span class=\"font-label-sm text-label-sm text-outline\">Lokasi Tidak Valid</span>\n</div>\n<span class=\"px-2.5 py-1 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">Ditolak</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Bukti Fisik & Visual Forensik -->\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2\">\n<div class=\"flex flex-col gap-2\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Foto Barang Bukti &amp; Segel Brankas A-04</span>\n<div class=\"relative w-full h-44 rounded-xl overflow-hidden bg-surface-container-high\">\n<img class=\"w-full h-full object-cover\" data-alt=\"High-resolution evidence photo of a red and black SanDisk 64GB USB flash drive locked inside a university campus metal security locker with official red tamper-evident security seal stamp tape and a forensic QR code label on the case, crisp lighting, institutional security context.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuAh8YLOs_vfZxbwzbqZrlOpxe3tidu4rrBYpAV_ca2UFgVZkYgGuD4-kWlB35PlE8KJ1_s_N4QDgZE9IvnD8qpwbZ_WvkEY11WTa5IOFVg7zIupUMoUQ_eWIhtmlToDWoaZkv2v7j4oBwPUa5-h4XCC4GN45aVdOZuWCnFyhTRq0tEH75UUVO8UzBlVtEfUjKNktwLJ6IpIjupNP_ii4BPG1deiS4HPs3B_FkJRkpU\"/>\n<div class=\"absolute bottom-2 left-2 bg-primary/80 backdrop-blur-md px-2 py-1 rounded text-on-primary font-mono text-[11px] flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[12px] text-secondary-fixed\">qr_code_2</span>\n<span>SEC-TAG-0981.JPG [Verified]</span>\n</div>\n</div>\n</div>\n<div class=\"flex flex-col gap-2\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Tangkapan CCTV Loket Penyerahan (CAM-04)</span>\n<div class=\"relative w-full h-44 rounded-xl overflow-hidden bg-surface-container-high\">\n<img class=\"w-full h-full object-cover\" data-alt=\"Security CCTV camera screenshot showing the campus security desk at Gedung Kuliah Umum UII, security guard in uniform interacting through a plexiglass counter window under fluorescent lighting, timecode overlay on top 11:52:14 WIB.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuDRGtYiQPgUWxNRDalxgm7frjXtPHDVNmme335KPgKoL9KHGbh5RSe66XKemgMDAtmZwcHTxtYgEEBAChAo_qxG5EUh3l4Uafir4KohAsS8AtpXoL_b8NFQ1A0y26-9SWdlyUojATvd74fIW7DWKd06tAfxgz3tmB3LpD7NzW-SSI9cpjAydIKdl77N-HUQ4rUf31WOPORXv0pexk_q6F5zrrF4xPeZgFwajaPNWEQ\"/>\n<div class=\"absolute top-2 right-2 bg-error px-2 py-0.5 rounded text-on-error font-mono font-label-sm text-label-sm font-bold flex items-center gap-1\">\n<span class=\"h-1.5 w-1.5 rounded-full bg-white animate-ping\"></span>\n<span>REC CAM-04: 11:52 WIB</span>\n</div>\n<div class=\"absolute bottom-2 left-2 bg-primary/80 backdrop-blur-md px-2 py-1 rounded text-on-primary font-mono text-[11px]\">\n                Pelapor Hadir Sendiri (Kesesuaian Wajah 94%)\n              </div>\n</div>\n</div>\n</div>\n<!-- Keterangan Satpam / Berita Acara Interogasi Internal -->\n<div class=\"flex flex-col gap-2 pt-2\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-md text-label-md text-on-surface font-semibold flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">record_voice_over</span>\n              Pernyataan Berita Acara Petugas Satpam (Dicatat Admin BSI)\n            </label>\n<span class=\"font-label-sm text-label-sm text-outline\">Terakhir diedit: 11:42 WIB</span>\n</div>\n<textarea class=\"w-full p-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest transition-colors resize-none leading-relaxed\" rows=\"3\">Petugas SEC-042 menyatakan bahwa perbedaan koreksi warna pada pukul 11:52 WIB murni karena pencahayaan awal pos remang-remang saat penyerahan pagi. Tidak ada interaksi pribadi dengan pelapor HL-88219 di luar loket posko. Rekaman CCTV CAM-04 mengonfirmasi pelapor datang sendiri dan menyerahkan rincian nama berkas tanpa diarahkan petugas.</textarea>\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-outline flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">lock</span>\n              Ditandatangani secara digital oleh: Ir. Ahmad Fauzi, M.T. (Super Admin)\n            </span>\n<button class=\"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold transition-colors\" onclick=\"alert('Berita acara satpam berhasil diperbarui dan dicatat ke Audit Trail!')\">\n<span class=\"material-symbols-outlined text-[16px]\">draw</span>\n<span>Perbarui Berita Acara Satpam</span>\n</button>\n</div>\n</div>\n</section>\n<!-- KARTU 3: KEPUTUSAN & RESOLUSI INSIDEN (DECISION CARD) -->\n<section class=\"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-5\">\n<div class=\"flex items-center gap-3 pb-2\">\n<div class=\"w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[22px]\">gavel</span>\n</div>\n<div>\n<h3 class=\"font-headline-sm text-headline-sm text-on-surface\">Keputusan &amp; Resolusi Resmi Penanganan</h3>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Penetapan putusan final status personel dan disposisi fisik barang</span>\n</div>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-5\">\n<!-- Keputusan Akun Satpam -->\n<div class=\"flex flex-col gap-3\">\n<label class=\"font-label-md text-label-md text-on-surface font-bold flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">admin_panel_settings</span>\n              Status Personel Satpam Terkait (SEC-035)\n            </label>\n<div class=\"space-y-2\">\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors\">\n<input class=\"mt-1 accent-primary\" name=\"keputusan_satpam\" type=\"radio\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Pulihkan &amp; Aktifkan Kembali Akun</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Tidak terbukti pelanggaran SOP berat, hanya catatan pembinaan disiplin.</span>\n</div>\n</label>\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-error-container/30 ring-1 ring-error cursor-pointer\">\n<input checked=\"\" class=\"mt-1 accent-error\" name=\"keputusan_satpam\" type=\"radio\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-error font-semibold\">Cabut Akses &amp; Nonaktifkan Permanen</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Terbukti kelalaian modifikasi metadata / eskalasi sidang kode etik Ditpam UII.</span>\n</div>\n</label>\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors\">\n<input class=\"mt-1 accent-primary\" name=\"keputusan_satpam\" type=\"radio\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Pertahankan Status Ditangguhkan</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Menunggu hasil audit digital Ditpam UII hingga 7 hari kerja.</span>\n</div>\n</label>\n</div>\n</div>\n<!-- Keputusan Status Barang Bukti -->\n<div class=\"flex flex-col gap-3\">\n<label class=\"font-label-md text-label-md text-on-surface font-bold flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">inventory_2</span>\n              Disposisi Objek Barang Bukti (BRG-2024-0142)\n            </label>\n<div class=\"space-y-2\">\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors\">\n<input class=\"mt-1 accent-primary\" name=\"keputusan_barang\" type=\"radio\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Lepaskan &amp; Serahkan ke Pemilik Sah</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Klaim HL-88219 (M. Alif F.) diverifikasi valid setelah uji isi data skripsi.</span>\n</div>\n</label>\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-high cursor-pointer ring-1 ring-primary\">\n<input checked=\"\" class=\"mt-1 accent-primary\" name=\"keputusan_barang\" type=\"radio\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Limpahkan ke Brankas Pusat BSI</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Sengketa belum tuntas, amankan di Pusat Data BSI max 14 hari kerja.</span>\n</div>\n</label>\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors\">\n<input class=\"mt-1 accent-primary\" name=\"keputusan_barang\" type=\"radio\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Lelang Sosial SOP 90 Hari</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Jika kepemilikan sah tidak dapat dibuktikan hingga batas kedaluwarsa.</span>\n</div>\n</label>\n</div>\n</div>\n</div>\n<!-- Justifikasi Putusan Keputusan -->\n<div class=\"flex flex-col gap-2 pt-1\">\n<label class=\"font-label-md text-label-md text-on-surface font-bold flex items-center justify-between\">\n<span>Justifikasi &amp; Pertimbangan Audit (Wajib min. 50 karakter)</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-mono\" id=\"char-counter\">198 / 50 karakter</span>\n</label>\n<textarea class=\"w-full p-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest transition-colors leading-relaxed\" id=\"justifikasi-text\" placeholder=\"Tuliskan landasan hukum dan bukti forensik penentu...\" rows=\"3\">Berdasarkan rekaman forensik digital dan cross-check hash file flashdisk di Lab BSI, pelapor HL-88219 sah sebagai pemilik. Namun akun SEC-035 tetap dinonaktifkan sementara karena indikasi kebocoran metadata ke pihak luar.</textarea>\n</div>\n</section>\n<!-- KARTU 4: EVALUASI & PEMBARUAN SISTEM KEPATUHAN (EVALUATION CARD) -->\n<section class=\"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-5\">\n<div class=\"flex items-center gap-3 pb-2\">\n<div class=\"w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[22px]\">policy</span>\n</div>\n<div>\n<h3 class=\"font-headline-sm text-headline-sm text-on-surface\">Evaluasi &amp; Pembaruan Kebijakan Sentinel (ISO 27001)</h3>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Kriteria kelayakan sebelum penutupan permanen insiden dapat dieksekusi</span>\n</div>\n</div>\n<div class=\"space-y-3\">\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low cursor-pointer\">\n<input checked=\"\" class=\"mt-1 accent-primary w-4 h-4 rounded\" type=\"checkbox\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Pembaruan SOP Posko Fisik</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Penerimaan flashdisk/media penyimpanan wajib didokumentasikan di bawah lampu sorot posko (Lux &gt; 300) dan disaksikan 2 petugas.</span>\n</div>\n</label>\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low cursor-pointer\">\n<input checked=\"\" class=\"mt-1 accent-primary w-4 h-4 rounded\" type=\"checkbox\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Pembaruan Aturan Mesin Sentinel AI</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pengetatan Rule A1 (Klaim Ganda) dari threshold 3 percobaan menjadi 2 percobaan dalam 24 jam pada nomor inventaris yang sama.</span>\n</div>\n</label>\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors\">\n<input class=\"mt-1 accent-primary w-4 h-4 rounded\" id=\"chk-eval-3\" onchange=\"checkClosureReadiness()\" type=\"checkbox\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Pembaruan Parameter Sistem Gateway</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Penambahan durasi cooldown OTP WhatsApp dari 60 detik menjadi 180 detik untuk klaim kategori barang elektronik rentan.</span>\n</div>\n</label>\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors\">\n<input class=\"mt-1 accent-primary w-4 h-4 rounded\" id=\"chk-eval-4\" onchange=\"checkClosureReadiness()\" type=\"checkbox\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Notifikasi Formal Kepatuhan Ditpam &amp; Biro Administrasi Umum</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pengiriman tembusan Berita Acara ke Kepala Divisi Keamanan Kampus UII secara otomatis via email resmi BSI.</span>\n</div>\n</label>\n</div>\n<!-- Warning Callout Box -->\n<div class=\"p-3.5 rounded-xl bg-surface-container-high flex items-start gap-3\">\n<span class=\"material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5\">info</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n            Tombol <strong>\"Tutup Insiden\"</strong> hanya akan aktif setelah seluruh tahapan 1 sampai 5 selesai, seluruh checklist evaluasi dicentang, dan keputusan akhir ditandatangani dengan kunci hardware MFA token administrator.\n          </p>\n</div>\n<!-- Action Buttons -->\n<div class=\"flex flex-col sm:flex-row items-center justify-between gap-3 pt-2\">\n<button class=\"w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors\">\n<span class=\"material-symbols-outlined text-[18px]\">save</span>\n<span>Simpan Draf Investigasi</span>\n</button>\n<button class=\"w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-surface-container-highest text-outline font-label-md text-label-md cursor-not-allowed opacity-60 transition-all shadow-none\" disabled=\"\" id=\"btn-close-incident\" title=\"Selesaikan semua checklist evaluasi untuk mengaktifkan\">\n<span class=\"material-symbols-outlined text-[18px]\">gavel</span>\n<span>Tutup Insiden &amp; Terbitkan B.A. Final (BA-INS-0042)</span>\n</button>\n</div>\n</section>\n</div>\n<!-- ================= KOLOM KANAN (30% / 4 cols) ================= -->\n<div class=\"lg:col-span-4 flex flex-col gap-6\">\n<!-- TIMELINE AUDIT LOG (IMMUTABLE APPEND-ONLY) -->\n<div class=\"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-4 sticky top-24\">\n<div class=\"flex items-center justify-between pb-2\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[20px] text-secondary\">history_edu</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface\">Kronologi Tindakan</span>\n</div>\n<span class=\"px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-mono\">\n            Immutable Chain\n          </span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant -mt-2\">\n          Audit trail tercatat secara kronologis berurutan dengan penanda blok kriptografis sha256.\n        </p>\n<!-- Timeline Items Container -->\n<div class=\"relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high\">\n<!-- Event 1 (Newest) -->\n<div class=\"relative\">\n<div class=\"absolute -left-6 top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-surface-container-lowest\"></div>\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-mono text-label-sm text-label-sm font-semibold text-secondary\">24 Okt 11:58 WIB</span>\n<span class=\"font-mono text-[11px] text-outline\">Blok #00142893</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">INVESTIGATION_NOTE_ADDED</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n                \"Verifikasi rekaman CCTV CAM-02 &amp; CAM-04 selesai, tidak ditemukan kontak di luar jam loket.\"\n              </p>\n<span class=\"font-label-sm text-label-sm text-outline flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px]\">person</span> Ir. Ahmad Fauzi, M.T.\n              </span>\n</div>\n</div>\n<!-- Event 2 -->\n<div class=\"relative\">\n<div class=\"absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-surface-container-lowest\"></div>\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-mono text-label-sm text-label-sm font-semibold text-on-surface\">24 Okt 11:40 WIB</span>\n<span class=\"font-mono text-[11px] text-outline\">Blok #00142892</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">PHYSICAL_SEAL_APPLIED</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n                \"Barang BRG-2024-0142 disegel di Brankas Pos GKU dengan nomor segel BSI-SEC-0981.\"\n              </p>\n<span class=\"font-label-sm text-label-sm text-outline flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px]\">verified_user</span> Ir. Ahmad Fauzi, M.T.\n              </span>\n</div>\n</div>\n<!-- Event 3 -->\n<div class=\"relative\">\n<div class=\"absolute -left-6 top-1 w-4 h-4 rounded-full bg-error ring-4 ring-surface-container-lowest\"></div>\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-mono text-label-sm text-label-sm font-semibold text-error\">24 Okt 11:25 WIB</span>\n<span class=\"font-mono text-[11px] text-outline\">Blok #00142890</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">GUARD_ACCOUNT_SUSPENDED</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n                \"Penonaktifan sementara akun Bripka Joko Wahyono (SEC-035) untuk audit forensik.\"\n              </p>\n<span class=\"font-label-sm text-label-sm text-outline flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px]\">shield</span> Ir. Ahmad Fauzi, M.T.\n              </span>\n</div>\n</div>\n<!-- Event 4 -->\n<div class=\"relative\">\n<div class=\"absolute -left-6 top-1 w-4 h-4 rounded-full bg-secondary-container ring-4 ring-surface-container-lowest\"></div>\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-mono text-label-sm text-label-sm font-semibold text-on-surface\">24 Okt 11:15 WIB</span>\n<span class=\"font-mono text-[11px] text-outline\">Blok #00142888</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">INCIDENT_OPENED</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n                \"Eskalasi kasus penanda anomali FLAG-2024-0988 (Rule A1) menjadi Insiden Kritis INS-2024-0042.\"\n              </p>\n<span class=\"font-label-sm text-label-sm text-outline flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px]\">person</span> Ir. Ahmad Fauzi, M.T.\n              </span>\n</div>\n</div>\n<!-- Event 5 (Trigger/Oldest) -->\n<div class=\"relative\">\n<div class=\"absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface-container-highest ring-4 ring-surface-container-lowest\"></div>\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-mono text-label-sm text-label-sm font-semibold text-outline\">24 Okt 10:48 WIB</span>\n<span class=\"font-mono text-[11px] text-outline\">Blok #00142885</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-bold\">ANOMALY_TRIGGERED_A1</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n                \"Deteksi 3 percobaan klaim berbeda dalam 24 jam pada nomor barang yang sama.\"\n              </p>\n<span class=\"font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px]\">smart_toy</span> Sentinel-AI [Bot Engine]\n              </span>\n</div>\n</div>\n</div>\n<!-- Add Note Micro-form -->\n<div class=\"mt-4 pt-3 bg-surface-container-low p-3 rounded-xl flex flex-col gap-2\">\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px] text-secondary\">add_circle</span> Tambah Catatan Audit Baru\n          </span>\n<textarea class=\"w-full p-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none resize-none\" placeholder=\"Catat temuan baru pada rantai kejadian...\" rows=\"2\"></textarea>\n<div class=\"flex justify-end\">\n<button class=\"px-3 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-surface-tint transition-colors\" onclick=\"alert('Catatan berhasil ditambahkan ke append-only ledger!')\">\n              Tambahkan Log\n            </button>\n</div>\n</div>\n</div>\n<!-- KARTU TAMBAHAN: INFORMASI VERIFIKASI KEAMANAN & PUSAT DATA -->\n<div class=\"bg-surface-container-low p-space-md rounded-2xl flex flex-col gap-3\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold\">Integritas Bukti Forensik</span>\n<div class=\"flex flex-col gap-2\">\n<div class=\"flex items-center justify-between text-body-sm font-body-sm\">\n<span class=\"text-on-surface-variant\">Algoritma Hashing</span>\n<span class=\"font-mono text-on-surface font-semibold\">SHA-256 Digest</span>\n</div>\n<div class=\"flex items-center justify-between text-body-sm font-body-sm\">\n<span class=\"text-on-surface-variant\">Status Hardware MFA</span>\n<span class=\"text-secondary font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">key</span> Terpasang (YubiKey 5)\n            </span>\n</div>\n<div class=\"flex items-center justify-between text-body-sm font-body-sm\">\n<span class=\"text-on-surface-variant\">Penyimpanan Terdistribusi</span>\n<span class=\"font-mono text-on-surface font-semibold\">Node BSI-01 &amp; Node UII-DC</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n<!-- MODAL: TAHAN BARANG TAMBAHAN (INTERAKTIF) -->\n<div class=\"fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm hidden items-center justify-center p-4\" id=\"modal-tahan-barang\" style=\"display: none;\">\n<div class=\"bg-surface-container-lowest max-w-lg w-full rounded-2xl p-space-lg shadow-2xl flex flex-col gap-4\">\n<div class=\"flex items-center justify-between pb-2\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-error text-[24px]\">lock</span>\n<h4 class=\"font-headline-sm text-headline-sm text-on-surface\">Tahan Barang Bukti Tambahan</h4>\n</div>\n<button class=\"w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline\" onclick=\"document.getElementById('modal-tahan-barang').classList.add('hidden')\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n        Tindakan ini akan langsung mengunci status barang menjadi <strong>DITAHAN_ADMIN</strong> dan membekukan seluruh proses klaim pada portal publik.\n      </p>\n<div class=\"flex flex-col gap-3\">\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">ID Inventaris Barang</label>\n<input class=\"w-full p-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest\" placeholder=\"Contoh: BRG-2024-0143\" type=\"text\"/>\n</div>\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Nomor Segel Brankas Fisik</label>\n<input class=\"w-full p-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest\" placeholder=\"Contoh: BSI-SEC-0982\" type=\"text\"/>\n</div>\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Catatan Alasan Wajib (Min. 30 karakter)</label>\n<textarea class=\"w-full p-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest resize-none\" placeholder=\"Jelaskan keterkaitan barang dengan kasus INS-2024-0042...\" rows=\"3\"></textarea>\n</div>\n</div>\n<div class=\"flex items-center justify-end gap-2 pt-2\">\n<button class=\"px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md\" onclick=\"document.getElementById('modal-tahan-barang').classList.add('hidden')\">\n          Batal\n        </button>\n<button class=\"px-4 py-2 rounded-xl bg-error text-on-error font-label-md text-label-md font-semibold\" onclick=\"alert('Barang berhasil diamankan dan dicatat ke blok audit!'); document.getElementById('modal-tahan-barang').classList.add('hidden');\">\n          Konfirmasi Penahanan\n        </button>\n</div>\n</div>\n</div>\n<!-- MODAL: NONAKTIFKAN AKUN TAMBAHAN (INTERAKTIF) -->\n<div class=\"fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm hidden items-center justify-center p-4\" id=\"modal-tangguhkan-akun\" style=\"display: none;\">\n<div class=\"bg-surface-container-lowest max-w-lg w-full rounded-2xl p-space-lg shadow-2xl flex flex-col gap-4\">\n<div class=\"flex items-center justify-between pb-2\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-error text-[24px]\">person_off</span>\n<h4 class=\"font-headline-sm text-headline-sm text-on-surface\">Tangguhkan Akun Personel Satpam</h4>\n</div>\n<button class=\"w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline\" onclick=\"document.getElementById('modal-tangguhkan-akun').classList.add('hidden')\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n<div class=\"flex flex-col gap-3\">\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">NRP / ID Petugas Satpam</label>\n<input class=\"w-full p-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest\" placeholder=\"Contoh: SEC-042\" type=\"text\"/>\n</div>\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface font-semibold block mb-1\">Alasan Penonaktifan Sesi</label>\n<textarea class=\"w-full p-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest resize-none\" placeholder=\"Penyelidikan deviasi data dan ketidaksesuaian laporan fisik...\" rows=\"3\"></textarea>\n</div>\n<div class=\"p-2.5 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">security</span>\n<span>Akan mencabut JWT Token dan memaksa keluar dari aplikasi garda posko.</span>\n</div>\n</div>\n<div class=\"flex items-center justify-end gap-2 pt-2\">\n<button class=\"px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md\" onclick=\"document.getElementById('modal-tangguhkan-akun').classList.add('hidden')\">\n          Batal\n        </button>\n<button class=\"px-4 py-2 rounded-xl bg-error text-on-error font-label-md text-label-md font-semibold\" onclick=\"alert('Akun berhasil disuspend!'); document.getElementById('modal-tangguhkan-akun').classList.add('hidden');\">\n          Tangguhkan Kredensial\n        </button>\n</div>\n</div>\n</div>\n<!-- SUB-FOOTER KEPATUHAN -->\n<div class=\"mt-8 pt-4 border-t-0 flex flex-col sm:flex-row items-center justify-between text-outline font-label-sm text-label-sm gap-2\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">verified</span>\n<span>Badan Sistem Informasi (BSI) Universitas Islam Indonesia \u2022 Standar Manajemen Keamanan Informasi ISO/IEC 27001 \u2022 UU ITE &amp; Jejak Audit Kriptografis.</span>\n</div>\n<div class=\"font-mono text-[11px]\">\n      SESSION_ID: 88201-BSI-AF-PROD\n    </div>\n</div>\n<!-- SCRIPT KECIL UNTUK LOGIKA INTERAKTIF CHECKLIST & CLOSURE -->\n<script>\n    function checkClosureReadiness() {\n      const chk3 = document.getElementById('chk-eval-3');\n      const chk4 = document.getElementById('chk-eval-4');\n      const btnClose = document.getElementById('btn-close-incident');\n\n      if (chk3 && chk4 && chk3.checked && chk4.checked) {\n        btnClose.disabled = false;\n        btnClose.classList.remove('bg-surface-container-highest', 'text-outline', 'cursor-not-allowed', 'opacity-60');\n        btnClose.classList.add('bg-primary', 'text-on-primary', 'hover:bg-surface-tint', 'shadow-md', 'cursor-pointer');\n        btnClose.title = \"Seluruh kriteria terpenuhi. Klik untuk menutup insiden resmi.\";\n      } else {\n        btnClose.disabled = true;\n        btnClose.classList.add('bg-surface-container-highest', 'text-outline', 'cursor-not-allowed', 'opacity-60');\n        btnClose.classList.remove('bg-primary', 'text-on-primary', 'hover:bg-surface-tint', 'shadow-md', 'cursor-pointer');\n        btnClose.title = \"Selesaikan semua checklist evaluasi untuk mengaktifkan\";\n      }\n    }\n\n    // Interactive Char Counter for textarea\n    const justifikasiInput = document.getElementById('justifikasi-text');\n    const counterLabel = document.getElementById('char-counter');\n    if (justifikasiInput && counterLabel) {\n      justifikasiInput.addEventListener('input', function() {\n        const len = this.value.length;\n        counterLabel.textContent = len + ' / 50 karakter';\n        if (len < 50) {\n          counterLabel.classList.add('text-error');\n          counterLabel.classList.remove('text-secondary');\n        } else {\n          counterLabel.classList.remove('text-error');\n          counterLabel.classList.add('text-secondary');\n        }\n      });\n    }\n\n    // Close Incident Action Handler\n    const btnCloseIncident = document.getElementById('btn-close-incident');\n    if (btnCloseIncident) {\n      btnCloseIncident.addEventListener('click', function() {\n        if (!this.disabled) {\n          alert('PROSES DIVERIFIKASI:\\n\\n1. Kunci Hardware Token Ir. Ahmad Fauzi divalidasi.\\n2. Berita Acara Final BA-INS-0042 diterbitkan dan di-hash.\\n3. Status kasus berubah menjadi DITUTUP (CLOSED).\\n4. Notifikasi terkirim ke Ditpam & Rektorat.');\n        }\n      });\n    }\n  </script>\n</div></main><footer class=\"w-full bg-surface-container-lowest py-space-sm shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-auto\"><div class=\"max-w-[1440px] mx-auto px-space-lg flex items-center justify-between text-on-surface-variant\"><div class=\"flex items-center gap-2 font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[16px] text-secondary\">shield</span><span>Badan Sistem Informasi (BSI) Universitas Islam Indonesia \u2022 Kepatuhan ISO/IEC 27001 &amp; Audit Trail Terdistribusi</span></div><div class=\"font-label-sm text-label-sm text-outline\">Setiap tindakan dipertanggungjawabkan dalam rantai audit.</div></div></footer></div>";

export default function DetailInsiden({ onNavigate }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // Helper functions for showing / hiding modals cleanly with style.display & classList
    const showModal = (modalId) => {
      const m = el.querySelector('#' + modalId);
      if (m) {
        m.classList.remove('hidden');
        m.classList.add('flex');
        m.style.setProperty('display', 'flex', 'important');
      }
    };

    const hideModal = (modalId) => {
      const m = el.querySelector('#' + modalId);
      if (m) {
        m.classList.add('hidden');
        m.classList.remove('flex');
        m.style.setProperty('display', 'none', 'important');
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

      // Close notification dropdown when clicking outside
      const notifDrop = el.querySelector('#dropdown-notifikasi');
      if (notifDrop && notifDrop.style.display !== 'none' && !e.target.closest('#dropdown-notifikasi') && !e.target.closest('button:has(.material-symbols-outlined)') && !e.target.closest('#btn-admin-notifications')) {
        hideModal('dropdown-notifikasi');
      }

      // 2. Radio card selection inside modal-pelimpahan (EFEK HITAM PINDAH)
      const transferActionLabel = e.target.closest('#modal-pelimpahan label');
      if (transferActionLabel && transferActionLabel.querySelector('input[type="radio"]')) {
        e.preventDefault();
        const modalP = el.querySelector('#modal-pelimpahan');
        if (modalP) {
          const allActionLabels = modalP.querySelectorAll('label');
          allActionLabels.forEach(lbl => {
            const inp = lbl.querySelector('input[type="radio"]');
            if (!inp) return;
            const spans = lbl.querySelectorAll('span');
            if (lbl === transferActionLabel) {
              inp.checked = true;
              lbl.className = 'flex items-center gap-2 p-3 rounded-xl bg-primary-container text-on-primary cursor-pointer shadow-sm';
              if (spans[0]) spans[0].className = 'font-label-md text-label-md font-semibold text-on-primary';
              if (spans[1]) spans[1].className = 'text-[11px] text-primary-fixed-dim';
            } else {
              inp.checked = false;
              lbl.className = 'flex items-center gap-2 p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest cursor-pointer transition-colors text-on-surface';
              if (spans[0]) spans[0].className = 'font-label-md text-label-md font-semibold text-on-surface';
              if (spans[1]) spans[1].className = 'text-[11px] text-on-surface-variant';
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
      // NOTIFIKASI DROPDOWN TOGGLE (Ikon Lonceng Header)
      // =========================================================================
      if (
        (target.closest('button') && (lowerText === 'notifications' || target.querySelector('.material-symbols-outlined')?.textContent.trim() === 'notifications')) ||
        action === 'toggle-notif-dropdown'
      ) {
        e.preventDefault();
        const drop = el.querySelector('#dropdown-notifikasi');
        if (drop) {
          if (drop.style.display === 'flex' || (!drop.classList.contains('hidden') && drop.style.display !== 'none')) {
            hideModal('dropdown-notifikasi');
          } else {
            showModal('dropdown-notifikasi');
          }
        }
        return;
      }

      if (action === 'close-notif-dropdown') {
        e.preventDefault();
        hideModal('dropdown-notifikasi');
        return;
      }

      if (action === 'mark-all-read') {
        e.preventDefault();
        const redDot = el.querySelector('header .bg-error');
        if (redDot) redDot.style.display = 'none';
        const badgeUnread = el.querySelector('#badge-unread-count');
        if (badgeUnread) badgeUnread.style.display = 'none';
        alert('Seluruh notifikasi telah ditandai sebagai dibaca.');
        return;
      }

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
      if (path === 'beranda' || (lowerText === 'beranda' && target.closest('aside'))) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_dashboard');
        return;
      }
      if (path === 'penanda-anomali' || (lowerText.includes('penanda anomali') && target.closest('aside'))) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_anomali');
        return;
      }
      if (path === 'insiden' || (lowerText === 'insiden' && target.closest('aside'))) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_detail_insiden');
        return;
      }
      if (path === 'audit-log' || (lowerText.includes('audit log') && target.closest('aside'))) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_audit');
        return;
      }
      if (path === 'akun-satpam' || (lowerText.includes('akun satpam') && target.closest('aside'))) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_satpam');
        return;
      }
      if (path === 'barang-ditahan' || (lowerText.includes('barang ditahan') && target.closest('aside'))) {
        e.preventDefault();
        if (onNavigate) onNavigate('admin_barang_ditahan');
        return;
      }
      if (path === 'parameter' || (lowerText.includes('parameter') && target.closest('aside'))) {
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
      if (
        action === 'open-modal-pelimpahan' ||
        lowerText.includes('limpahkan') ||
        target.closest('[title*="Limpahkan"]') ||
        target.closest('[onclick*="modal-pelimpahan"]')
      ) {
        e.preventDefault();
        showModal('modal-pelimpahan');
        return;
      }

      // Close modal-pelimpahan on 'X' or 'Batal'
      if (
        action === 'close-modal-pelimpahan' ||
        ((lowerText === 'batal' || lowerText === 'close') && target.closest('#modal-pelimpahan'))
      ) {
        e.preventDefault();
        hideModal('modal-pelimpahan');
        return;
      }

      // Confirm modal-pelimpahan
      if (
        action === 'submit-modal-pelimpahan' ||
        (target.closest('#modal-pelimpahan') && (lowerText.includes('konfirmasi') || lowerText.includes('cetak bast')))
      ) {
        e.preventDefault();
        hideModal('modal-pelimpahan');
        alert('Otorisasi MFA Hardware Berhasil!\n\nBerita Acara Serah Terima (BAST) #BAST-2024-0089 telah diterbitkan ke printer dan dicatat pada Append-Only Audit Log Blok #00142895.');
        
        // Visual feedback on row badge
        const badge = el.querySelector('.bg-error-container') || el.querySelector('.bg-secondary-fixed');
        if (badge) {
          badge.className = 'px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-label-sm text-label-sm font-semibold flex items-center gap-1';
          badge.innerHTML = '<span class="material-symbols-outlined text-[14px]">check_circle</span> Dilimpahkan ke Brankas BSI';
        }
        return;
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
