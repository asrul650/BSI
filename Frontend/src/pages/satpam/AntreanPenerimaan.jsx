import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Satpam: Antrean Penerimaan (Intake Queue) - Portal Satpam UII
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto\"><div class=\"flex flex-col\"><div class=\"p-gutter pb-space-sm flex items-center gap-space-sm\"><div class=\"w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm\"><span class=\"material-symbols-outlined text-secondary-fixed\">verified_user</span></div><div class=\"flex flex-col min-w-0\"><span class=\"font-headline-sm text-headline-sm text-on-surface truncate tracking-tight\">Lost &amp; Found UII</span><span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">Portal Satpam Kampus</span></div></div><div class=\"px-gutter py-space-xs\"><div class=\"h-px bg-surface-container-high w-full\"></div></div><div class=\"px-space-sm py-space-xs\"><span class=\"px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block\">Navigasi Utama</span></div><nav class=\"flex flex-col gap-1 px-space-sm\" data-active-classes=\"bg-primary text-on-primary font-label-lg shadow-sm\">\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">dashboard</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors bg-primary text-on-primary font-label-lg shadow-sm font-semibold cursor-pointer\" data-path=\"penerimaan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">move_to_inbox</span>\n    <span>Penerimaan</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"barang\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">inventory_2</span>\n    <span>Barang</span>\n  </a>\n  <a class=\"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"hasil-matching\" href=\"#\">\n    <div class=\"flex items-center gap-space-sm\">\n      <span class=\"material-symbols-outlined text-[20px]\">auto_awesome</span>\n      <span>Hasil Matching</span>\n    </div>\n    <span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm\">AI</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"verifikasi\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Verifikasi</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"laporan-kehilangan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">receipt_long</span>\n    <span>Laporan Kehilangan</span>\n  </a>\n</nav></div><div class=\"p-space-sm flex flex-col gap-space-sm\"><div class=\"bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1\"><div class=\"flex items-center gap-2\"><span class=\"w-2.5 h-2.5 rounded-full bg-secondary animate-pulse\"></span><span class=\"font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider\">Pos Jaga Aktif</span></div><p class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Posko Induk GKU</p><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Shift Siang (07:00 - 15:30 WIB)</span></div><div class=\"px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\"><span class=\"flex items-center gap-1\"><span class=\"material-symbols-outlined text-[16px]\">contact_support</span> BSI Helpdesk: x102</span><span>v2.4.0</span></div></div><!-- Portal Publik Shortcut Button -->\n<div class=\"px-space-sm pt-2\">\n  <button data-path=\"portal-publik\" class=\"w-full py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">logout</span>\n    <span>Kembali ke Portal Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72\"><header class=\"fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter\"><div class=\"flex items-center gap-gutter flex-1 max-w-xl\"><div class=\"relative w-full\"><span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">search</span><input class=\"w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm transition-all\" placeholder=\"Cari nomor tiket TM- / HL- / nama barang...\" type=\"text\"/></div></div><div class=\"flex items-center gap-space-md shrink-0\"><div class=\"hidden xl:flex flex-col text-right\"><span class=\"font-label-lg text-label-lg text-on-surface\">Kamis, 24 Oktober 2024</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pukul 11:42 WIB</span></div><div class=\"hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\"><span class=\"material-symbols-outlined text-[16px]\">shield</span><span>Status Siaga 1</span></div><div class=\"h-8 w-px bg-surface-container-high hidden sm:block\"></div><div class=\"flex items-center gap-space-sm\"><div class=\"flex flex-col text-right hidden md:block\"><span class=\"font-label-lg text-label-lg text-on-surface truncate font-semibold\">Bripka Hendra Kurniawan</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Petugas Pos Jaga Induk GKU (SEC-042)</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors ml-1\" data-path=\"login\" href=\"#\" title=\"Keluar Portal\"><span class=\"material-symbols-outlined text-[20px]\">logout</span></a></div></div></header><main class=\"w-full pt-16 bg-surface min-h-screen px-gutter py-space-lg\"><div class=\"flex flex-col w-full\">\n<!-- Interactive Toast Notification Container -->\n<div class=\"fixed top-20 right-8 z-50 transform translate-x-full opacity-0 transition-all duration-300 ease-out flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-on-primary shadow-xl pointer-events-none\" id=\"toast-notification\">\n<span class=\"material-symbols-outlined text-secondary-container text-[20px]\">info</span>\n<span class=\"font-body-sm text-body-sm text-on-primary\" id=\"toast-text\">Tindakan berhasil dicatat.</span>\n</div>\n<!-- Header Section with Breadcrumb, Title & Top Actions -->\n<div class=\"flex flex-col gap-4 pb-6\">\n<div class=\"flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"hover:text-primary transition-colors cursor-pointer\">Beranda</span>\n<span class=\"material-symbols-outlined text-[14px]\">chevron_right</span>\n<span class=\"hover:text-primary transition-colors cursor-pointer\">Penerimaan</span>\n<span class=\"material-symbols-outlined text-[14px]\">chevron_right</span>\n<span class=\"text-on-surface font-semibold\">Antrean Serah Terima Fisik</span>\n</div>\n<div class=\"flex flex-col lg:flex-row lg:items-center justify-between gap-4\">\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center gap-3\">\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight\">Antrean Penerimaan Barang (Intake Queue)</h1>\n<span class=\"px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">Posko GKU</span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface-variant max-w-3xl\">\n          Daftar tiket penyerahan barang temuan daring (TM-) yang menunggu serah fisik di pos jaga dalam batas waktu 24 jam.\n        </p>\n</div>\n<!-- Header CTAs -->\n<div class=\"flex items-center gap-3 shrink-0\">\n<button class=\"px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all flex items-center gap-2 shadow-sm font-label-lg text-label-lg active:scale-95\" onclick=\"openQrScannerModal()\">\n<span class=\"material-symbols-outlined text-[20px] text-secondary\">qr_code_scanner</span>\n<span>Scan QR Drop-Off Pass</span>\n</button>\n<button class=\"px-5 py-2.5 rounded-full bg-primary text-on-primary hover:bg-primary/90 transition-all flex items-center gap-2 shadow-md font-label-lg text-label-lg active:scale-95\" onclick=\"openWalkInModal()\">\n<span class=\"material-symbols-outlined text-[20px] text-secondary-fixed\">add_box</span>\n<span>+ Catat Tanpa Nomor Laporan</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Operational Stat Pods (Tonal Elevation Cards) -->\n<div class=\"grid grid-cols-1 md:grid-cols-4 gap-4 pb-6\">\n<div class=\"bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between\">\n<div class=\"flex items-center justify-between text-on-surface-variant\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider font-semibold\">Perlu Tindakan Cepat</span>\n<span class=\"material-symbols-outlined text-[20px] text-error\">alarm_on</span>\n</div>\n<div class=\"mt-3 flex items-baseline gap-2\">\n<span class=\"font-display text-display text-on-surface\">2</span>\n<span class=\"font-label-md text-label-md text-error flex items-center font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-error inline-block mr-1 animate-ping\"></span>\n          Kritis &lt; 3 Jam\n        </span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1\">Batas verifikasi fisik hampir habis</span>\n</div>\n<div class=\"bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between\">\n<div class=\"flex items-center justify-between text-on-surface-variant\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider font-semibold\">Total Antrean Daring</span>\n<span class=\"material-symbols-outlined text-[20px] text-secondary\">pending_actions</span>\n</div>\n<div class=\"mt-3 flex items-baseline gap-2\">\n<span class=\"font-display text-display text-on-surface\">7</span>\n<span class=\"font-label-md text-label-md text-on-surface-variant\">Tiket aktif</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1\">Terjadwal drop-off hari ini</span>\n</div>\n<div class=\"bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between\">\n<div class=\"flex items-center justify-between text-on-surface-variant\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider font-semibold\">Diterima Shift Ini</span>\n<span class=\"material-symbols-outlined text-[20px] text-secondary\">check_circle</span>\n</div>\n<div class=\"mt-3 flex items-baseline gap-2\">\n<span class=\"font-display text-display text-on-surface\">11</span>\n<span class=\"font-label-md text-label-md text-secondary font-semibold\">+4 walk-in</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-1\">Diproses oleh Bripka Hendra (SEC-042)</span>\n</div>\n<div class=\"bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between\">\n<div class=\"flex items-center justify-between text-on-surface-variant\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider font-semibold\">Kapasitas Locker GKU</span>\n<span class=\"material-symbols-outlined text-[20px] text-on-surface-variant\">lock_clock</span>\n</div>\n<div class=\"mt-3 flex items-baseline gap-2\">\n<span class=\"font-display text-display text-on-surface\">68%</span>\n<span class=\"font-label-md text-label-md text-on-surface-variant\">24/35 Loker</span>\n</div>\n<div class=\"w-full bg-surface-container rounded-full h-1.5 mt-2 overflow-hidden\">\n<div class=\"bg-secondary h-1.5 rounded-full\" style=\"width: 68%\"></div>\n</div>\n</div>\n</div>\n<!-- Filter & Workflow Tabs Module -->\n<div class=\"bg-surface-container-lowest rounded-xl shadow-sm p-space-md mb-6 flex flex-col gap-4\">\n<!-- Status Tabs -->\n<div class=\"flex flex-wrap items-center justify-between gap-3 border-b-0 pb-1\">\n<div class=\"flex items-center gap-2\">\n<button class=\"px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all\">\n<span>Menunggu Penyerahan</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container-lowest/20 text-on-primary text-[11px] font-bold\">7 Laporan Aktif</span>\n</button>\n<button class=\"px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all\">\n<span>Kedaluwarsa</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px]\">14 Laporan</span>\n</button>\n<button class=\"px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all\">\n<span>Ditolak / Dibatalkan</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px]\">3 Laporan</span>\n</button>\n</div>\n<div class=\"flex items-center gap-2\">\n<button class=\"p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors\" onclick=\"showToast('Data antrean diperbarui otomatis dari server')\" title=\"Muat Ulang Antrean\">\n<span class=\"material-symbols-outlined text-[20px]\">sync</span>\n</button>\n<button class=\"px-3.5 py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1.5 font-label-md text-label-md\" onclick=\"showToast('Format rekap harian CSV/PDF sedang diexport')\">\n<span class=\"material-symbols-outlined text-[18px]\">download</span>\n<span>Unduh Rekap Harian</span>\n</button>\n</div>\n</div>\n<!-- Filter Fields Bar -->\n<div class=\"grid grid-cols-1 md:grid-cols-12 gap-3 pt-2\">\n<!-- Search Input with Keyboard Shortcut -->\n<div class=\"md:col-span-5 relative\">\n<span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">tag</span>\n<input class=\"w-full h-11 pl-10 pr-20 rounded-xl bg-surface font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest transition-all\" id=\"queue-search\" placeholder=\"Cari nomor TM- (contoh: TM-7F3P9X)...\" type=\"text\"/>\n<div class=\"absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1\">\n<kbd class=\"px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm\">Ctrl+K</kbd>\n</div>\n</div>\n<!-- Kategori Filter -->\n<div class=\"md:col-span-3\">\n<div class=\"relative\">\n<select class=\"w-full h-11 px-3.5 rounded-xl bg-surface font-body-md text-body-md text-on-surface appearance-none focus:outline-none cursor-pointer pr-10\">\n<option value=\"\">Semua Kategori Barang</option>\n<option value=\"elektronik\">Elektronik &amp; Aksesoris</option>\n<option value=\"dompet\">Dompet &amp; Uang Tunai</option>\n<option value=\"kunci\">Kunci &amp; Kendaraan</option>\n<option value=\"dokumen\">Kartu &amp; Dokumen Identitas</option>\n<option value=\"pakaian\">Pakaian &amp; Aksesori Fashion</option>\n<option value=\"peralatan\">Peralatan Kuliah &amp; Buku</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]\">expand_more</span>\n</div>\n</div>\n<!-- Lokasi Temuan Filter -->\n<div class=\"md:col-span-2\">\n<div class=\"relative\">\n<select class=\"w-full h-11 px-3.5 rounded-xl bg-surface font-body-md text-body-md text-on-surface appearance-none focus:outline-none cursor-pointer pr-10\">\n<option value=\"\">Semua Gedung</option>\n<option selected=\"\" value=\"gku\">Gedung Kuliah Umum (GKU)</option>\n<option value=\"ftsp\">FTSP Kampus Terpadu</option>\n<option value=\"fti\">FTI Gedung KH Mas Mansur</option>\n<option value=\"feb\">FEB Condongcatur</option>\n<option value=\"fpsb\">FPSB</option>\n<option value=\"perpus\">Perpustakaan Pusat</option>\n<option value=\"masjid\">Masjid Ulil Albab</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]\">expand_more</span>\n</div>\n</div>\n<!-- Pos Jaga Tujuan Filter -->\n<div class=\"md:col-span-2\">\n<div class=\"relative\">\n<select class=\"w-full h-11 px-3.5 rounded-xl bg-surface font-body-md text-body-md text-on-surface appearance-none focus:outline-none cursor-pointer pr-10\">\n<option selected=\"\" value=\"gku-induk\">Pos Jaga Induk GKU</option>\n<option value=\"pos-utara\">Pos Portal Gerbang Utara</option>\n<option value=\"pos-selatan\">Pos Gerbang Selatan Utama</option>\n<option value=\"pos-masjid\">Pos Masjid Kampus</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]\">expand_more</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Primary Intake Queue Table (High Density Dashboard Table) -->\n<div class=\"bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col\">\n<div class=\"overflow-x-auto\">\n<table class=\"w-full text-left border-collapse\">\n<thead>\n<tr class=\"bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider\">\n<th class=\"py-3 px-4\">Nomor TM- &amp; QR</th>\n<th class=\"py-3 px-4\">Kategori &amp; Nama Barang</th>\n<th class=\"py-3 px-3\">Warna</th>\n<th class=\"py-3 px-4\">Lokasi Ditemukan</th>\n<th class=\"py-3 px-4\">Nama Penemu</th>\n<th class=\"py-3 px-4\">Waktu Lapor</th>\n<th class=\"py-3 px-4\">Sisa Waktu</th>\n<th class=\"py-3 px-3\">Status</th>\n<th class=\"py-3 px-4 text-right\">Aksi Penyerahan</th>\n</tr>\n</thead>\n<tbody class=\"divide-y divide-surface-container-high font-body-sm text-body-sm text-on-surface\">\n<!-- Row 1 (Critical countdown) -->\n<tr class=\"hover:bg-surface transition-colors group cursor-pointer\" data-action=\"terima-fisik\" title=\"Klik baris atau tombol Terima untuk proses fisik\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-7 h-7 rounded bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface\" title=\"QR Code Tiket Drop-Off\">\n<span class=\"material-symbols-outlined text-[16px]\">qr_code_2</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-[13px] font-bold tracking-wider text-secondary\">TM-7F3P9X</span>\n<a class=\"text-[11px] text-on-surface-variant hover:text-primary underline\" href=\"#\" onclick=\"showDetailsModal('TM-7F3P9X', 'Flashdisk Sandisk 64GB Merah')\">Detail Tiket</a>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg font-semibold text-on-surface group-hover:text-secondary transition-colors\">Flashdisk Sandisk 64GB Merah</span>\n<span class=\"font-label-sm text-[11px] text-on-surface-variant\">Elektronik &amp; Aksesoris</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-2.5 h-2.5 rounded-full bg-error inline-block shrink-0 shadow-xs\"></span>\n<span>Merah</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-1.5 text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">location_on</span>\n<span class=\"truncate max-w-[160px]\" title=\"GKU Lantai 2 (R. 2.14)\">GKU Lt. 2 (R. 2.14)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Civitas Peduli</span>\n<span class=\"text-[11px] text-on-surface-variant flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[12px]\">visibility_off</span>\n<span>(Anonim / Anon)</span>\n</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span>20 Nov 2024</span>\n<span class=\"text-[11px] text-on-surface-variant\">14:30 WIB (22 jam lalu)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-error animate-ping\"></span>\n<span class=\"font-mono\">\u23f3 01:14:18</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span>Kritis (&lt;2 Jam)</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3.5 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary/85 transition-all flex items-center gap-1 font-label-md text-label-md shadow-sm active:scale-95\" onclick=\"openVerificationModal('TM-7F3P9X', 'Flashdisk Sandisk 64GB Merah', 'GKU Lt. 2 (R. 2.14)')\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary-fixed\">inventory</span>\n<span>Terima</span>\n</button>\n<div class=\"relative group/menu\">\n<button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n<div class=\"absolute right-0 top-full mt-1 hidden group-hover/menu:flex flex-col w-44 bg-surface-container-lowest rounded-xl shadow-xl py-1 z-30\">\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"showDetailsModal('TM-7F3P9X', 'Flashdisk Sandisk 64GB Merah')\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span> Lihat Detail Tiket\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2 text-on-surface-variant\" onclick=\"showToast('Fitur penemu anonim: tidak tersedia kontak seluler')\">\n<span class=\"material-symbols-outlined text-[16px]\">chat</span> Chat WhatsApp\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"markCancelled('TM-7F3P9X')\">\n<span class=\"material-symbols-outlined text-[16px]\">cancel</span> Batalkan Tiket\n                    </button>\n</div>\n</div>\n</div>\n</td>\n</tr>\n<!-- Row 2 (Critical warning countdown) -->\n<tr class=\"hover:bg-surface transition-colors group cursor-pointer\" data-action=\"terima-fisik\" title=\"Klik baris atau tombol Terima untuk proses fisik\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-7 h-7 rounded bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface\" title=\"QR Code Tiket Drop-Off\">\n<span class=\"material-symbols-outlined text-[16px]\">qr_code_2</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-[13px] font-bold tracking-wider text-secondary\">TM-9K2L1A</span>\n<a class=\"text-[11px] text-on-surface-variant hover:text-primary underline\" href=\"#\" onclick=\"showDetailsModal('TM-9K2L1A', 'Kunci Motor Honda Vario (Gantungan Biru)')\">Detail Tiket</a>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg font-semibold text-on-surface group-hover:text-secondary transition-colors\">Kunci Motor Honda Vario (Gantungan Biru)</span>\n<span class=\"font-label-sm text-[11px] text-on-surface-variant\">Kunci &amp; Kendaraan</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-2.5 h-2.5 rounded-full bg-primary inline-block shrink-0 shadow-xs\"></span>\n<span>Hitam-Biru</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-1.5 text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">location_on</span>\n<span class=\"truncate max-w-[160px]\" title=\"Parkir Timur Masjid Kampus\">Parkir Timur Masjid</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Rizky Pratama</span>\n<span class=\"text-[11px] text-on-surface-variant flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[12px] text-secondary\">school</span>\n<span>Mhs FTI (21523***)</span>\n</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span>20 Nov 2024</span>\n<span class=\"text-[11px] text-on-surface-variant\">16:15 WIB (21 jam lalu)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-error\"></span>\n<span class=\"font-mono\">\u23f3 02:52:40</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold\">\n<span>Kritis (&lt;3 Jam)</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3.5 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary/85 transition-all flex items-center gap-1 font-label-md text-label-md shadow-sm active:scale-95\" onclick=\"openVerificationModal('TM-9K2L1A', 'Kunci Motor Honda Vario', 'Parkir Timur Masjid')\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary-fixed\">inventory</span>\n<span>Terima</span>\n</button>\n<div class=\"relative group/menu\">\n<button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n<div class=\"absolute right-0 top-full mt-1 hidden group-hover/menu:flex flex-col w-44 bg-surface-container-lowest rounded-xl shadow-xl py-1 z-30\">\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"showDetailsModal('TM-9K2L1A', 'Kunci Motor Honda Vario')\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span> Lihat Detail Tiket\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2 text-secondary\" onclick=\"showToast('Membuka WhatsApp penemu: Rizky Pratama (0812-2819-****)')\">\n<span class=\"material-symbols-outlined text-[16px]\">chat</span> Chat WhatsApp\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"markCancelled('TM-9K2L1A')\">\n<span class=\"material-symbols-outlined text-[16px]\">cancel</span> Batalkan Tiket\n                    </button>\n</div>\n</div>\n</div>\n</td>\n</tr>\n<!-- Row 3 (Safe countdown) -->\n<tr class=\"hover:bg-surface transition-colors group cursor-pointer\" data-action=\"terima-fisik\" title=\"Klik baris atau tombol Terima untuk proses fisik\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-7 h-7 rounded bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface\">\n<span class=\"material-symbols-outlined text-[16px]\">qr_code_2</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-[13px] font-bold tracking-wider text-secondary\">TM-4B8W7C</span>\n<a class=\"text-[11px] text-on-surface-variant hover:text-primary underline\" href=\"#\" onclick=\"showDetailsModal('TM-4B8W7C', 'Dompet Lipat Hitam Eiger')\">Detail Tiket</a>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg font-semibold text-on-surface group-hover:text-secondary transition-colors\">Dompet Lipat Hitam Eiger</span>\n<span class=\"font-label-sm text-[11px] text-on-surface-variant\">Dompet &amp; Uang Tunai</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-2.5 h-2.5 rounded-full bg-on-surface inline-block shrink-0 shadow-xs\"></span>\n<span>Hitam</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-1.5 text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">location_on</span>\n<span class=\"truncate max-w-[160px]\" title=\"Selasar FTSP Lt. 1\">Selasar FTSP Lt. 1</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Siti Aminah</span>\n<span class=\"text-[11px] text-on-surface-variant flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[12px] text-secondary\">badge</span>\n<span>Tendik FTSP</span>\n</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span>20 Nov 2024</span>\n<span class=\"text-[11px] text-on-surface-variant\">19:40 WIB (17 jam lalu)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"font-mono\">06:19:56</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span>Menunggu Fisik</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3.5 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary/85 transition-all flex items-center gap-1 font-label-md text-label-md shadow-sm active:scale-95\" onclick=\"openVerificationModal('TM-4B8W7C', 'Dompet Lipat Hitam Eiger', 'Selasar FTSP Lt. 1')\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary-fixed\">inventory</span>\n<span>Terima</span>\n</button>\n<div class=\"relative group/menu\">\n<button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n<div class=\"absolute right-0 top-full mt-1 hidden group-hover/menu:flex flex-col w-44 bg-surface-container-lowest rounded-xl shadow-xl py-1 z-30\">\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"showDetailsModal('TM-4B8W7C', 'Dompet Lipat Hitam Eiger')\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span> Lihat Detail Tiket\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2 text-secondary\" onclick=\"showToast('Membuka WhatsApp penemu: Siti Aminah (0856-4310-****)')\">\n<span class=\"material-symbols-outlined text-[16px]\">chat</span> Chat WhatsApp\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"markCancelled('TM-4B8W7C')\">\n<span class=\"material-symbols-outlined text-[16px]\">cancel</span> Batalkan Tiket\n                    </button>\n</div>\n</div>\n</div>\n</td>\n</tr>\n<!-- Row 4 -->\n<tr class=\"hover:bg-surface transition-colors group cursor-pointer\" data-action=\"terima-fisik\" title=\"Klik baris atau tombol Terima untuk proses fisik\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-7 h-7 rounded bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface\">\n<span class=\"material-symbols-outlined text-[16px]\">qr_code_2</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-[13px] font-bold tracking-wider text-secondary\">TM-2M5P0E</span>\n<a class=\"text-[11px] text-on-surface-variant hover:text-primary underline\" href=\"#\" onclick=\"showDetailsModal('TM-2M5P0E', 'Botol Minum Corkcicle Hijau Sage')\">Detail Tiket</a>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg font-semibold text-on-surface group-hover:text-secondary transition-colors\">Botol Minum Corkcicle Hijau Sage</span>\n<span class=\"font-label-sm text-[11px] text-on-surface-variant\">Peralatan Personal</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim inline-block shrink-0 shadow-xs\"></span>\n<span>Hijau Sage</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-1.5 text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">location_on</span>\n<span class=\"truncate max-w-[160px]\" title=\"Perpustakaan Pusat Lt. 1\">Perpus Pusat Lt. 1</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Civitas Peduli</span>\n<span class=\"text-[11px] text-on-surface-variant flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[12px]\">visibility_off</span>\n<span>(Anonim / Anon)</span>\n</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span>21 Nov 2024</span>\n<span class=\"text-[11px] text-on-surface-variant\">00:25 WIB (12 jam lalu)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"font-mono\">11:05:36</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span>Menunggu Fisik</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3.5 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary/85 transition-all flex items-center gap-1 font-label-md text-label-md shadow-sm active:scale-95\" onclick=\"openVerificationModal('TM-2M5P0E', 'Botol Minum Corkcicle Hijau Sage', 'Perpus Pusat Lt. 1')\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary-fixed\">inventory</span>\n<span>Terima</span>\n</button>\n<div class=\"relative group/menu\">\n<button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n<div class=\"absolute right-0 top-full mt-1 hidden group-hover/menu:flex flex-col w-44 bg-surface-container-lowest rounded-xl shadow-xl py-1 z-30\">\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"showDetailsModal('TM-2M5P0E', 'Botol Minum Corkcicle Hijau Sage')\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span> Lihat Detail Tiket\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2 text-on-surface-variant\" onclick=\"showToast('Fitur penemu anonim: tidak tersedia kontak seluler')\">\n<span class=\"material-symbols-outlined text-[16px]\">chat</span> Chat WhatsApp\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"markCancelled('TM-2M5P0E')\">\n<span class=\"material-symbols-outlined text-[16px]\">cancel</span> Batalkan Tiket\n                    </button>\n</div>\n</div>\n</div>\n</td>\n</tr>\n<!-- Row 5 -->\n<tr class=\"hover:bg-surface transition-colors group cursor-pointer\" data-action=\"terima-fisik\" title=\"Klik baris atau tombol Terima untuk proses fisik\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-7 h-7 rounded bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface\">\n<span class=\"material-symbols-outlined text-[16px]\">qr_code_2</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-[13px] font-bold tracking-wider text-secondary\">TM-8X1Q4Z</span>\n<a class=\"text-[11px] text-on-surface-variant hover:text-primary underline\" href=\"#\" onclick=\"showDetailsModal('TM-8X1Q4Z', 'Kartu Mahasiswa (KTM) &amp; Flazz BCA')\">Detail Tiket</a>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg font-semibold text-on-surface group-hover:text-secondary transition-colors\">Kartu Mahasiswa (KTM) &amp; Flazz BCA</span>\n<span class=\"font-label-sm text-[11px] text-on-surface-variant\">Kartu &amp; Dokumen Identitas</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-2.5 h-2.5 rounded-full bg-secondary inline-block shrink-0 shadow-xs\"></span>\n<span>Biru / Kuning</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-1.5 text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">location_on</span>\n<span class=\"truncate max-w-[160px]\" title=\"Kantin Boulevard Kampus\">Kantin Boulevard</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Ahmad Fauzan</span>\n<span class=\"text-[11px] text-on-surface-variant flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[12px] text-secondary\">school</span>\n<span>Mhs FEB (22312***)</span>\n</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span>21 Nov 2024</span>\n<span class=\"text-[11px] text-on-surface-variant\">03:50 WIB (9 jam lalu)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"font-mono\">14:30:11</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span>Menunggu Fisik</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3.5 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary/85 transition-all flex items-center gap-1 font-label-md text-label-md shadow-sm active:scale-95\" onclick=\"openVerificationModal('TM-8X1Q4Z', 'Kartu Mahasiswa (KTM) &amp; Flazz BCA', 'Kantin Boulevard')\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary-fixed\">inventory</span>\n<span>Terima</span>\n</button>\n<div class=\"relative group/menu\">\n<button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n<div class=\"absolute right-0 top-full mt-1 hidden group-hover/menu:flex flex-col w-44 bg-surface-container-lowest rounded-xl shadow-xl py-1 z-30\">\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"showDetailsModal('TM-8X1Q4Z', 'Kartu Mahasiswa (KTM) &amp; Flazz BCA')\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span> Lihat Detail Tiket\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2 text-secondary\" onclick=\"showToast('Membuka WhatsApp penemu: Ahmad Fauzan (0821-3948-****)')\">\n<span class=\"material-symbols-outlined text-[16px]\">chat</span> Chat WhatsApp\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"markCancelled('TM-8X1Q4Z')\">\n<span class=\"material-symbols-outlined text-[16px]\">cancel</span> Batalkan Tiket\n                    </button>\n</div>\n</div>\n</div>\n</td>\n</tr>\n<!-- Row 6 -->\n<tr class=\"hover:bg-surface transition-colors group cursor-pointer\" data-action=\"terima-fisik\" title=\"Klik baris atau tombol Terima untuk proses fisik\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-7 h-7 rounded bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface\">\n<span class=\"material-symbols-outlined text-[16px]\">qr_code_2</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-[13px] font-bold tracking-wider text-secondary\">TM-3N7V2R</span>\n<a class=\"text-[11px] text-on-surface-variant hover:text-primary underline\" href=\"#\" onclick=\"showDetailsModal('TM-3N7V2R', 'Jam Tangan Casio G-Shock')\">Detail Tiket</a>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg font-semibold text-on-surface group-hover:text-secondary transition-colors\">Jam Tangan Casio G-Shock</span>\n<span class=\"font-label-sm text-[11px] text-on-surface-variant\">Elektronik &amp; Aksesoris</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-2.5 h-2.5 rounded-full bg-inverse-surface inline-block shrink-0 shadow-xs\"></span>\n<span>Hitam Doff</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-1.5 text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">location_on</span>\n<span class=\"truncate max-w-[160px]\" title=\"Toilet Mushola FTI Lt. 3\">Toilet Mushola FTI Lt. 3</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Dedi Hermawan</span>\n<span class=\"text-[11px] text-on-surface-variant flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[12px] text-secondary\">verified</span>\n<span>Alumni UII</span>\n</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span>21 Nov 2024</span>\n<span class=\"text-[11px] text-on-surface-variant\">06:10 WIB (6 jam lalu)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"font-mono\">16:50:22</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span>Menunggu Fisik</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3.5 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary/85 transition-all flex items-center gap-1 font-label-md text-label-md shadow-sm active:scale-95\" onclick=\"openVerificationModal('TM-3N7V2R', 'Jam Tangan Casio G-Shock', 'Toilet Mushola FTI Lt. 3')\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary-fixed\">inventory</span>\n<span>Terima</span>\n</button>\n<div class=\"relative group/menu\">\n<button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n<div class=\"absolute right-0 top-full mt-1 hidden group-hover/menu:flex flex-col w-44 bg-surface-container-lowest rounded-xl shadow-xl py-1 z-30\">\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"showDetailsModal('TM-3N7V2R', 'Jam Tangan Casio G-Shock')\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span> Lihat Detail Tiket\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2 text-secondary\" onclick=\"showToast('Membuka WhatsApp penemu: Dedi Hermawan (0877-3810-****)')\">\n<span class=\"material-symbols-outlined text-[16px]\">chat</span> Chat WhatsApp\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"markCancelled('TM-3N7V2R')\">\n<span class=\"material-symbols-outlined text-[16px]\">cancel</span> Batalkan Tiket\n                    </button>\n</div>\n</div>\n</div>\n</td>\n</tr>\n<!-- Row 7 -->\n<tr class=\"hover:bg-surface transition-colors group cursor-pointer\" data-action=\"terima-fisik\" title=\"Klik baris atau tombol Terima untuk proses fisik\">\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-7 h-7 rounded bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface\">\n<span class=\"material-symbols-outlined text-[16px]\">qr_code_2</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-[13px] font-bold tracking-wider text-secondary\">TM-6P9X1S</span>\n<a class=\"text-[11px] text-on-surface-variant hover:text-primary underline\" href=\"#\" onclick=\"showDetailsModal('TM-6P9X1S', 'Buku Catatan Hardcover &amp; Pulpen')\">Detail Tiket</a>\n</div>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg font-semibold text-on-surface group-hover:text-secondary transition-colors\">Buku Catatan Hardcover &amp; Pulpen</span>\n<span class=\"font-label-sm text-[11px] text-on-surface-variant\">Peralatan Kuliah &amp; Buku</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-2.5 h-2.5 rounded-full bg-outline inline-block shrink-0 shadow-xs\"></span>\n<span>Cokelat Kraft</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex items-center gap-1.5 text-on-surface\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">location_on</span>\n<span class=\"truncate max-w-[160px]\" title=\"Gazebo Taman Sayap Barat\">Gazebo Taman Barat</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Laila Nurul</span>\n<span class=\"text-[11px] text-on-surface-variant flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[12px] text-secondary\">school</span>\n<span>Mhs FPSB (23321***)</span>\n</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"flex flex-col\">\n<span>21 Nov 2024</span>\n<span class=\"text-[11px] text-on-surface-variant\">08:30 WIB (4 jam lalu)</span>\n</div>\n</td>\n<td class=\"py-3.5 px-4\">\n<div class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"font-mono\">19:10:45</span>\n</div>\n</td>\n<td class=\"py-3.5 px-3\">\n<span class=\"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span>Menunggu Fisik</span>\n</span>\n</td>\n<td class=\"py-3.5 px-4 text-right\">\n<div class=\"flex items-center justify-end gap-1.5\">\n<button class=\"px-3.5 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary/85 transition-all flex items-center gap-1 font-label-md text-label-md shadow-sm active:scale-95\" onclick=\"openVerificationModal('TM-6P9X1S', 'Buku Catatan Hardcover &amp; Pulpen', 'Gazebo Taman Barat')\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary-fixed\">inventory</span>\n<span>Terima</span>\n</button>\n<div class=\"relative group/menu\">\n<button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\">\n<span class=\"material-symbols-outlined text-[18px]\">more_vert</span>\n</button>\n<div class=\"absolute right-0 top-full mt-1 hidden group-hover/menu:flex flex-col w-44 bg-surface-container-lowest rounded-xl shadow-xl py-1 z-30\">\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"showDetailsModal('TM-6P9X1S', 'Buku Catatan Hardcover &amp; Pulpen')\">\n<span class=\"material-symbols-outlined text-[16px]\">visibility</span> Lihat Detail Tiket\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-surface-container font-label-sm text-label-sm flex items-center gap-2 text-secondary\" onclick=\"showToast('Membuka WhatsApp penemu: Laila Nurul (0895-1234-****)')\">\n<span class=\"material-symbols-outlined text-[16px]\">chat</span> Chat WhatsApp\n                    </button>\n<button class=\"px-3 py-1.5 text-left hover:bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-2\" onclick=\"markCancelled('TM-6P9X1S')\">\n<span class=\"material-symbols-outlined text-[16px]\">cancel</span> Batalkan Tiket\n                    </button>\n</div>\n</div>\n</div>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n<!-- Table Footer & Pagination -->\n<div class=\"px-space-md py-3.5 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-3 font-body-sm text-body-sm text-on-surface-variant\">\n<div class=\"flex items-center gap-2\">\n<span>Menampilkan <strong class=\"text-on-surface font-semibold\">1 - 7</strong> dari <strong class=\"text-on-surface font-semibold\">7</strong> laporan aktif</span>\n<span class=\"w-1.5 h-1.5 rounded-full bg-outline-variant\"></span>\n<span class=\"text-[11px]\">Sistem auto-refresh setiap 30 detik</span>\n</div>\n<div class=\"flex items-center gap-1.5\">\n<button class=\"p-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface disabled:opacity-40\" disabled=\"\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_left</span>\n</button>\n<span class=\"px-3 py-1 rounded-lg bg-primary text-on-primary font-label-md text-label-md\">1</span>\n<button class=\"p-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface disabled:opacity-40\" disabled=\"\">\n<span class=\"material-symbols-outlined text-[18px]\">chevron_right</span>\n</button>\n</div>\n</div>\n</div>\n<!-- SOP Guidance & Audit Footnote -->\n<div class=\"mt-6 flex flex-col gap-3\">\n<div class=\"p-4 rounded-xl bg-surface-container-low flex items-start gap-3.5 shadow-sm\">\n<div class=\"w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[20px]\">assignment_turned_in</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold\">Catatan Standar Operasional Prosedur (SOP) Pos Jaga:</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5\">\n          Penyerahan fisik wajib diverifikasi kecocokan barang, difoto langsung oleh petugas jaga untuk arsip etalase publik, dan diterbitkan Berita Acara Serah Terima (BAST). Pastikan penemu menerima tanda terima digital berupa tautan lacak atau SMS/WhatsApp konfirmasi.\n        </p>\n</div>\n</div>\n<div class=\"flex items-center justify-between px-2 text-on-surface-variant font-label-sm text-label-sm\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">encrypted</span>\n<span>Semua aksi penerimaan tercatat di audit log terenkripsi &amp; diverifikasi identitas petugas SEC-042.</span>\n</div>\n<span>Lost &amp; Found Kampus Terpadu UII \u00a9 2024</span>\n</div>\n</div>\n<!-- MODAL: Penerimaan & Verifikasi Fisik (Intake Verification Modal) -->\n<div class=\"fixed inset-0 z-50 hidden bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4\" id=\"modal-verification\">\n<div class=\"bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200\">\n<div class=\"px-6 py-4 bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex items-center gap-2.5\">\n<span class=\"material-symbols-outlined text-secondary text-[22px]\">inventory_2</span>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-headline-sm text-on-surface font-bold\">Verifikasi &amp; Terima Fisik Barang</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-mono\" id=\"modal-ticket-id\">TM-7F3P9X</span>\n</div>\n</div>\n<button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\" onclick=\"closeModal('modal-verification')\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n<div class=\"p-6 flex flex-col gap-5 max-h-[798px] overflow-y-auto\">\n<div class=\"bg-surface p-4 rounded-xl flex items-center justify-between\">\n<div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block\">Barang Dilaporkan</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\" id=\"modal-item-name\">Flashdisk Sandisk 64GB Merah</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant block mt-0.5\" id=\"modal-item-loc\">Lokasi: GKU Lantai 2 (R. 2.14)</span>\n</div>\n<span class=\"px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">Drop-off Pass Aktif</span>\n</div>\n<!-- Verification Checklist -->\n<div class=\"flex flex-col gap-3\">\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold\">Pemeriksaan Fisik Barang (Checklist):</span>\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer\">\n<input checked=\"\" class=\"mt-1 w-4 h-4 accent-secondary rounded\" type=\"checkbox\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-medium\">Bentuk, Merek, dan Ciri Khusus Sesuai</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Karakteristik fisik sesuai dengan deskripsi awal pelapor.</span>\n</div>\n</label>\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer\">\n<input checked=\"\" class=\"mt-1 w-4 h-4 accent-secondary rounded\" type=\"checkbox\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-medium\">Tidak Mengandung Benda Terlarang / Berbahaya</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Bukan cairan kimia berbahaya, zat mudah terbakar, atau benda tajam ilegal.</span>\n</div>\n</label>\n<label class=\"flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer\">\n<input class=\"mt-1 w-4 h-4 accent-secondary rounded\" id=\"check-identitas-finder\" type=\"checkbox\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-medium\">Verifikasi Identitas Penyerah Fisik</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Kesesuaian pembawa barang (KTM/KTP/Pengakuan anonimitas terdata).</span>\n</div>\n</label>\n</div>\n<!-- Photo Capture / Evidence Intake -->\n<div class=\"flex flex-col gap-2\">\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold\">Foto Dokumentasi Serah Terima (Wajib):</span>\n<div class=\"p-6 rounded-xl bg-surface border border-dashed border-outline-variant flex flex-col items-center justify-center text-center gap-2 hover:bg-surface-container-low transition-colors cursor-pointer\">\n<div class=\"w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[24px]\">add_a_photo</span>\n</div>\n<span class=\"font-label-md text-label-md text-on-surface font-medium\">Buka Kamera Pos Jaga atau Unggah Foto</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Maksimal 3 foto (sisi depan, nomor seri/ciri, dan tampak samping).</span>\n</div>\n</div>\n<!-- Lokasi Penyimpanan Posko -->\n<div class=\"grid grid-cols-2 gap-3\">\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface-variant block mb-1\">Pilih Nomor Loker Simpan</label>\n<select class=\"w-full h-10 px-3 rounded-xl bg-surface font-body-md text-body-md text-on-surface focus:outline-none\">\n<option value=\"LK-GKU-04\">Loker GKU #04 (Elektronik Kecil)</option>\n<option value=\"LK-GKU-05\">Loker GKU #05 (Elektronik Kecil)</option>\n<option value=\"LK-GKU-12\">Loker GKU #12 (Dompet &amp; Kartu)</option>\n<option value=\"LK-GKU-20\">Loker GKU #20 (Barang Sedang)</option>\n</select>\n</div>\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface-variant block mb-1\">Kondisi Saat Diterima</label>\n<select class=\"w-full h-10 px-3 rounded-xl bg-surface font-body-md text-body-md text-on-surface focus:outline-none\">\n<option value=\"baik\">Kondisi Baik / Berfungsi Normal</option>\n<option value=\"lecet\">Ada Goresan / Bekas Pakai</option>\n<option value=\"rusak-ringan\">Layar Retak / Rusak Fisik</option>\n<option value=\"mati\">Mati Total / Tidak Menyala</option>\n</select>\n</div>\n</div>\n<!-- Optional Notes -->\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface-variant block mb-1\">Catatan Tambahan Petugas Jaga</label>\n<input class=\"w-full h-10 px-3 rounded-xl bg-surface font-body-md text-body-md text-on-surface focus:outline-none placeholder:text-on-surface-variant\" placeholder=\"Contoh: Diterima langsung di posko GKU pukul 11:45 oleh petugas Hendra\" type=\"text\"/>\n</div>\n</div>\n<div class=\"p-6 bg-surface-container-low flex items-center justify-end gap-3\">\n<button class=\"px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-all\" onclick=\"closeModal('modal-verification')\">\n          Batal\n        </button>\n<button class=\"px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-all flex items-center gap-2 shadow-md\" onclick=\"submitIntake()\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary-fixed\">verified</span>\n<span>Konfirmasi Penerimaan Fisik &amp; Terbitkan BAST</span>\n</button>\n</div>\n</div>\n</div>\n<!-- MODAL: Walk-In Intake Form (Pencatatan Temuan Langsung Tanpa Nomor Laporan Online) -->\n<div class=\"fixed inset-0 z-50 hidden bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4\" id=\"modal-walk-in\">\n<div class=\"bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200\">\n<div class=\"px-6 py-4 bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex items-center gap-2.5\">\n<span class=\"material-symbols-outlined text-secondary text-[22px]\">add_box</span>\n<div class=\"flex flex-col\">\n<span class=\"font-headline-sm text-headline-sm text-on-surface font-bold\">Catat Temuan Langsung (Walk-In Finder)</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Penemu menyerahkan barang langsung ke pos jaga tanpa laporan daring</span>\n</div>\n</div>\n<button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\" onclick=\"closeModal('modal-walk-in')\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n<div class=\"p-6 flex flex-col gap-4 max-h-[798px] overflow-y-auto\">\n<div class=\"grid grid-cols-2 gap-3\">\n<div class=\"col-span-2\">\n<label class=\"font-label-sm text-label-sm text-on-surface-variant block mb-1\">Nama Barang Temuan <span class=\"text-error\">*</span></label>\n<input class=\"w-full h-10 px-3 rounded-xl bg-surface font-body-md text-body-md text-on-surface focus:outline-none\" placeholder=\"Contoh: Helm KYT DJ Maru Putih\" type=\"text\"/>\n</div>\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface-variant block mb-1\">Kategori Barang <span class=\"text-error\">*</span></label>\n<select class=\"w-full h-10 px-3 rounded-xl bg-surface font-body-md text-body-md text-on-surface focus:outline-none\">\n<option value=\"\">Pilih Kategori...</option>\n<option value=\"elektronik\">Elektronik &amp; Gadget</option>\n<option value=\"kunci\">Kunci &amp; Kendaraan</option>\n<option value=\"dompet\">Dompet &amp; Uang</option>\n<option value=\"kartu\">Kartu / Identitas</option>\n<option value=\"lainnya\">Lainnya</option>\n</select>\n</div>\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface-variant block mb-1\">Warna Dominan <span class=\"text-error\">*</span></label>\n<input class=\"w-full h-10 px-3 rounded-xl bg-surface font-body-md text-body-md text-on-surface focus:outline-none\" placeholder=\"Contoh: Putih Glossy\" type=\"text\"/>\n</div>\n<div class=\"col-span-2\">\n<label class=\"font-label-sm text-label-sm text-on-surface-variant block mb-1\">Lokasi Ditemukan <span class=\"text-error\">*</span></label>\n<input class=\"w-full h-10 px-3 rounded-xl bg-surface font-body-md text-body-md text-on-surface focus:outline-none\" placeholder=\"Contoh: Parkiran motor basement FTSP deret B\" type=\"text\"/>\n</div>\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface-variant block mb-1\">Nama Penemu Fisik</label>\n<input class=\"w-full h-10 px-3 rounded-xl bg-surface font-body-md text-body-md text-on-surface focus:outline-none\" placeholder=\"Ketik nama atau centang anonim\" type=\"text\"/>\n</div>\n<div>\n<label class=\"font-label-sm text-label-sm text-on-surface-variant block mb-1\">Nomor WhatsApp / HP Penemu</label>\n<input class=\"w-full h-10 px-3 rounded-xl bg-surface font-body-md text-body-md text-on-surface focus:outline-none\" placeholder=\"08xxxxxxxxxx\" type=\"tel\"/>\n</div>\n</div>\n<div class=\"flex items-center gap-2 pt-1\">\n<input class=\"w-4 h-4 accent-secondary rounded\" id=\"anon-walkin\" type=\"checkbox\"/>\n<label class=\"font-body-sm text-body-sm text-on-surface\" for=\"anon-walkin\">Penemu meminta dirahasiakan identitasnya (Anonim)</label>\n</div>\n<div class=\"p-4 rounded-xl bg-surface flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">qr_code</span>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Nomor Tiket Otomatis: <strong class=\"font-mono text-secondary\">TM-AUTO-GEN</strong></span>\n</div>\n<span class=\"text-on-surface-variant text-[11px]\">Diterbitkan seketika saat disimpan</span>\n</div>\n</div>\n<div class=\"p-6 bg-surface-container-low flex items-center justify-end gap-3\">\n<button class=\"px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-all\" onclick=\"closeModal('modal-walk-in')\">\n          Batal\n        </button>\n<button class=\"px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-all flex items-center gap-2 shadow-md\" onclick=\"submitWalkIn()\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary-fixed\">save</span>\n<span>Simpan &amp; Lanjutkan ke Foto Barang</span>\n</button>\n</div>\n</div>\n</div>\n<!-- MODAL: QR Scanner Simulator Modal -->\n<div class=\"fixed inset-0 z-50 hidden bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4\" id=\"modal-qr\">\n<div class=\"bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200\">\n<div class=\"px-6 py-4 bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">qr_code_scanner</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Pindai QR Drop-Off Pass</span>\n</div>\n<button class=\"p-1 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors\" onclick=\"closeModal('modal-qr')\">\n<span class=\"material-symbols-outlined text-[18px]\">close</span>\n</button>\n</div>\n<div class=\"p-6 flex flex-col items-center gap-4 text-center\">\n<!-- Scanner Visual Viewport Mock -->\n<div class=\"w-64 h-64 rounded-2xl bg-inverse-surface relative overflow-hidden flex items-center justify-center shadow-inner\">\n<div class=\"absolute inset-4 border-2 border-secondary/60 border-dashed rounded-xl\"></div>\n<div class=\"w-full h-0.5 bg-secondary-fixed absolute top-1/3 animate-pulse shadow-[0_0_12px_#93ccff]\"></div>\n<span class=\"material-symbols-outlined text-surface/30 text-[72px]\">qr_code_2</span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant max-w-xs\">\n          Arahkan kamera ke layar ponsel penemu yang menampilkan kode QR Tiket Drop-Off.\n        </p>\n<div class=\"w-full pt-2\">\n<button class=\"w-full py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-all\" onclick=\"simulateScanSuccess()\">\n            Simulasikan Scan Sukses (TM-7F3P9X)\n          </button>\n</div>\n</div>\n</div>\n</div>\n<!-- Inline Micro-Interactions Script -->\n<script>\n    function showToast(message) {\n      const toast = document.getElementById('toast-notification');\n      const toastText = document.getElementById('toast-text');\n      if (toast && toastText) {\n        toastText.textContent = message;\n        toast.classList.remove('translate-x-full', 'opacity-0');\n        toast.classList.add('translate-x-0', 'opacity-100');\n        setTimeout(() => {\n          toast.classList.remove('translate-x-0', 'opacity-100');\n          toast.classList.add('translate-x-full', 'opacity-0');\n        }, 3000);\n      }\n    }\n\n    function openVerificationModal(ticketId, itemName, itemLoc) {\n      const modal = document.getElementById('modal-verification');\n      document.getElementById('modal-ticket-id').textContent = ticketId;\n      document.getElementById('modal-item-name').textContent = itemName;\n      document.getElementById('modal-item-loc').textContent = 'Lokasi: ' + itemLoc;\n      if (modal) modal.classList.remove('hidden');\n    }\n\n    function openWalkInModal() {\n      const modal = document.getElementById('modal-walk-in');\n      if (modal) modal.classList.remove('hidden');\n    }\n\n    function openQrScannerModal() {\n      const modal = document.getElementById('modal-qr');\n      if (modal) modal.classList.remove('hidden');\n    }\n\n    function closeModal(modalId) {\n      const modal = document.getElementById(modalId);\n      if (modal) modal.classList.add('hidden');\n    }\n\n    function submitIntake() {\n      closeModal('modal-verification');\n      showToast('Berhasil! BAST diterbitkan dan barang dialokasikan ke loker.');\n    }\n\n    function submitWalkIn() {\n      closeModal('modal-walk-in');\n      showToast('Tiket walk-in dibuat otomatis. Silakan ambil foto barang.');\n    }\n\n    function simulateScanSuccess() {\n      closeModal('modal-qr');\n      setTimeout(() => {\n        openVerificationModal('TM-7F3P9X', 'Flashdisk Sandisk 64GB Merah', 'GKU Lt. 2 (R. 2.14)');\n        showToast('QR Code Drop-Off Pass valid!');\n      }, 300);\n    }\n\n    function showDetailsModal(id, name) {\n      showToast('Membuka rincian lengkap ' + id + ' (' + name + ')');\n    }\n\n    function markCancelled(id) {\n      if (confirm('Yakin ingin membatalkan tiket ' + id + ' karena tidak diserahkan?')) {\n        showToast('Tiket ' + id + ' telah dipindahkan ke tab Ditolak / Dibatalkan');\n      }\n    }\n\n    // Ctrl+K Keyboard Shortcut listener for Quick Filter\n    document.addEventListener('keydown', function(e) {\n      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {\n        e.preventDefault();\n        const searchInput = document.getElementById('queue-search');\n        if (searchInput) searchInput.focus();\n      }\n    });\n  </script>\n</div></main></div>";

export default function AntreanPenerimaan({ onNavigate }) {
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

        // Update button styles
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

        // Update button styles
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

        // Update toggle buttons
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
        // If clicking inside table, select row and DO NOT navigate to matching
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
