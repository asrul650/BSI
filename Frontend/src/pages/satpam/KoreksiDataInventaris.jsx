import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Satpam: Koreksi Data Barang Inventaris (BRG-2024-0142) - Portal Satpam UII
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto\"><div class=\"flex flex-col\"><div class=\"p-gutter pb-space-sm flex items-center gap-space-sm\"><div class=\"w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm\"><span class=\"material-symbols-outlined text-secondary-fixed\">verified_user</span></div><div class=\"flex flex-col min-w-0\"><span class=\"font-headline-sm text-headline-sm text-on-surface truncate tracking-tight\">Lost &amp; Found UII</span><span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">PORTAL SATPAM KAMPUS</span></div></div><div class=\"px-gutter py-space-xs\"><div class=\"h-px bg-surface-container-high w-full\"></div></div><div class=\"px-space-sm py-space-xs\"><span class=\"px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block\">Navigasi Utama</span></div><nav class=\"flex flex-col gap-1 px-space-sm\" data-active-classes=\"bg-primary text-on-primary font-label-lg shadow-sm\">\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">dashboard</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"penerimaan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">move_to_inbox</span>\n    <span>Penerimaan</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors bg-primary text-on-primary font-label-lg shadow-sm font-semibold cursor-pointer\" data-path=\"barang\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">inventory_2</span>\n    <span>Barang</span>\n  </a>\n  <a class=\"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"hasil-matching\" href=\"#\">\n    <div class=\"flex items-center gap-space-sm\">\n      <span class=\"material-symbols-outlined text-[20px]\">auto_awesome</span>\n      <span>Hasil Matching</span>\n    </div>\n    <span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm\">AI</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"verifikasi\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Verifikasi</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"laporan-kehilangan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">receipt_long</span>\n    <span>Laporan Kehilangan</span>\n  </a>\n</nav></div><div class=\"p-space-sm flex flex-col gap-space-sm\"><div class=\"bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1\"><div class=\"flex items-center gap-2\"><span class=\"w-2.5 h-2.5 rounded-full bg-secondary animate-pulse\"></span><span class=\"font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider\">Pos Jaga Aktif</span></div><p class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Posko Induk GKU</p><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Shift Siang (07:00 - 15:30 WIB)</span></div><div class=\"px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\"><span class=\"flex items-center gap-1\"><span class=\"material-symbols-outlined text-[16px]\">contact_support</span> BSI Helpdesk: x102</span><span>v2.4.0</span></div></div><!-- Portal Publik Shortcut Button -->\n<div class=\"px-space-sm pt-2\">\n  <button data-path=\"portal-publik\" class=\"w-full py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">logout</span>\n    <span>Kembali ke Portal Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72\"><header class=\"fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter\"><div class=\"flex items-center gap-gutter flex-1 max-w-xl\"><div class=\"relative w-full\"><span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">search</span><input class=\"w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm transition-all\" placeholder=\"Cari nomor tiket TM- / HL- / nama barang...\" type=\"text\"/></div></div><div class=\"flex items-center gap-space-md shrink-0\"><div class=\"hidden xl:flex flex-col text-right\"><span class=\"font-label-lg text-label-lg text-on-surface\">Kamis, 24 Oktober 2024</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pukul 11:42 WIB</span></div><div class=\"hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\"><span class=\"material-symbols-outlined text-[16px]\">shield</span><span>Status Siaga 1</span></div><div class=\"h-8 w-px bg-surface-container-high hidden sm:block\"></div><div class=\"flex items-center gap-space-sm\"><div class=\"flex flex-col text-right hidden md:block\"><span class=\"font-label-lg text-label-lg text-on-surface truncate font-semibold\">Bripka Hendra Kurniawan</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Petugas Pos Jaga Induk GKU (SEC-042)</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors ml-1\" data-path=\"login\" href=\"#\" title=\"Keluar Portal\"><span class=\"material-symbols-outlined text-[20px]\">logout</span></a></div></div></header><main class=\"w-full pt-16 bg-surface min-h-screen px-gutter py-space-lg\"><div class=\"flex flex-col w-full\">\n<!-- Breadcrumb Navigation -->\n<nav aria-label=\"Breadcrumb\" class=\"flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md pb-space-sm\">\n<a class=\"hover:text-secondary flex items-center gap-1 transition-colors\" href=\"#\">\n<span class=\"material-symbols-outlined text-[16px]\">home</span>\n      Beranda\n    </a>\n<span class=\"material-symbols-outlined text-[14px] text-outline-variant\">chevron_right</span>\n<a class=\"hover:text-secondary transition-colors\" href=\"#\">Inventaris Barang</a>\n<span class=\"material-symbols-outlined text-[14px] text-outline-variant\">chevron_right</span>\n<a class=\"hover:text-secondary transition-colors font-medium text-on-surface\" href=\"#\">Detail BRG-2024-0142</a>\n<span class=\"material-symbols-outlined text-[14px] text-outline-variant\">chevron_right</span>\n<span class=\"text-secondary font-semibold\">Koreksi Data</span>\n</nav>\n<!-- Screen Header Banner -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-md\">\n<div class=\"flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm pb-space-sm\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-space-xs\">\n<span class=\"px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold tracking-wide uppercase\">\n            Formulir Koreksi Satpam\n          </span>\n<span class=\"text-on-surface-variant font-label-sm text-label-sm\">Dokumen Terproteksi v1.0</span>\n</div>\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1\">\n          Koreksi Data Fisik Barang \u2014 BRG-2024-0142\n        </h1>\n<p class=\"font-body-md text-body-md text-on-surface-variant mt-0.5 max-w-4xl\">\n          Perbaikan catatan fisik inventaris barang temuan di brankas. Setiap perubahan dicatat permanen dalam audit log keamanan kampus terintegrasi.\n        </p>\n</div>\n<!-- Key Status Badges Pill -->\n<div class=\"flex items-center flex-wrap gap-2 shrink-0 self-start lg:self-center\">\n<div class=\"flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">inventory_2</span>\n<span class=\"font-bold\">BRG-2024-0142</span>\n</div>\n<div class=\"flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n<span>Di Brankas Penyimpanan</span>\n</div>\n<div class=\"flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[16px] text-on-surface-variant\">lock</span>\n<span>Locker GKU-A04</span>\n</div>\n</div>\n</div>\n<!-- SOP Compliance Warning Box -->\n<div class=\"rounded-lg bg-secondary-fixed/40 p-space-sm flex items-start gap-3 mt-space-xs\">\n<span class=\"material-symbols-outlined text-secondary shrink-0 text-[20px] mt-0.5\" style=\"font-variation-settings: 'FILL' 1;\">gavel</span>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md font-bold text-on-secondary-fixed\">Peringatan SOP Audit Kampus (Peraturan Keamanan Bab IV Pasal 12):</span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed\">\n          Koreksi data hanya diperkenankan untuk memperbaiki kekeliruan pencatatan fisik awal (warna, nomor rak, kondisi fisik aktual). Koreksi ini <span class=\"font-semibold text-on-surface\">tidak menghapus catatan versi 1.0</span> dan secara instan membentuk entri Versi 1.1 pada rantai audit log tak terhapuskan (immutable audit trail).\n        </p>\n</div>\n</div>\n</div>\n<!-- Main Content Grid (Dense 2-Column Desktop Layout) -->\n<div class=\"grid grid-cols-12 gap-space-md items-start\">\n<!-- LEFT COLUMN: Side-by-Side Live Diff Form (8 Cols) -->\n<div class=\"col-span-12 xl:col-span-8 flex flex-col gap-space-md\">\n<!-- Section 1: Item Attributes Diff Card -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm\">\n<div class=\"flex items-center justify-between pb-space-sm mb-space-sm\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-primary text-[22px]\">tune</span>\n<h2 class=\"font-headline-md text-headline-md font-bold text-on-surface\">Parameter Fisik Barang</h2>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded-full\">\n            6 Atribut Diperiksa \u2022 4 Dimodifikasi\n          </span>\n</div>\n<div class=\"space-y-space-md\">\n<!-- Field 1: Kategori Barang (Unchanged) -->\n<div class=\"p-space-sm rounded-lg bg-surface-container-low/60 flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-lg text-label-lg font-semibold text-on-surface flex items-center gap-1.5\">\n<span>1. Kategori Barang</span>\n</label>\n<span class=\"px-2 py-0.5 rounded text-on-surface-variant bg-surface-container-highest font-label-sm text-label-sm flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">check</span> Tidak Berubah\n              </span>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-3 pt-1\">\n<div class=\"flex flex-col bg-surface-container-lowest p-2.5 rounded-lg shadow-sm\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">Nilai Semula (v1.0)</span>\n<span class=\"font-body-md text-body-md text-on-surface\">Elektronik &amp; Aksesoris Komputer</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-1 font-semibold\">Koreksi Saat Ini (v1.1)</span>\n<select class=\"w-full h-10 px-3 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm cursor-pointer\">\n<option selected=\"\">Elektronik &amp; Aksesoris Komputer</option>\n<option>Dokumen &amp; Kartu Identitas</option>\n<option>Tas, Dompet &amp; Perlengkapan</option>\n<option>Kunci Kendaraan / Ruangan</option>\n<option>Peralatan Laboratorium</option>\n</select>\n</div>\n</div>\n</div>\n<!-- Field 2: Nama / Seri Barang (Modified) -->\n<div class=\"p-space-sm rounded-lg bg-surface-container-low/60 flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-lg text-label-lg font-semibold text-on-surface flex items-center gap-1.5\">\n<span>2. Nama / Seri Barang</span>\n<span class=\"text-error font-bold\">*</span>\n</label>\n<span class=\"px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">edit</span> Diubah: Tambahan Detail Tali\n              </span>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-3 pt-1\">\n<div class=\"flex flex-col bg-surface-container-lowest p-2.5 rounded-lg shadow-sm\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">Nilai Semula (v1.0)</span>\n<span class=\"font-body-md text-body-md text-on-surface line-through text-outline\">Flashdisk Sandisk Cruzer Blade 64GB</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-1 font-semibold\">Koreksi Saat Ini (v1.1)</span>\n<input class=\"w-full h-10 px-3 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm\" type=\"text\" value=\"Flashdisk SanDisk Cruzer Blade 64GB (Ada Gantungan Tali Hitam-Abu)\"/>\n</div>\n</div>\n</div>\n<!-- Field 3: Warna Dominan (Modified) -->\n<div class=\"p-space-sm rounded-lg bg-surface-container-low/60 flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-lg text-label-lg font-semibold text-on-surface flex items-center gap-1.5\">\n<span>3. Warna Dominan Fisik</span>\n<span class=\"text-error font-bold\">*</span>\n</label>\n<span class=\"px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">palette</span> [Merah] \u2192 [Merah - Hitam Doff]\n              </span>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-3 pt-1\">\n<div class=\"flex flex-col bg-surface-container-lowest p-2.5 rounded-lg shadow-sm\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">Nilai Semula (v1.0)</span>\n<div class=\"flex items-center gap-2\">\n<span class=\"w-3.5 h-3.5 rounded-full bg-error shrink-0\"></span>\n<span class=\"font-body-md text-body-md text-on-surface line-through text-outline\">Merah</span>\n</div>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-1 font-semibold\">Koreksi Saat Ini (v1.1)</span>\n<div class=\"relative\">\n<input class=\"w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm\" type=\"text\" value=\"Merah kombinasi Hitam Doff\"/>\n<span class=\"material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary text-[18px]\">color_lens</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Field 4: Kondisi Fisik (Modified) -->\n<div class=\"p-space-sm rounded-lg bg-surface-container-low/60 flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-lg text-label-lg font-semibold text-on-surface flex items-center gap-1.5\">\n<span>4. Kondisi Fisik Aktual</span>\n</label>\n<span class=\"px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">checklist</span> Diperinci\n              </span>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-3 pt-1\">\n<div class=\"flex flex-col bg-surface-container-lowest p-2.5 rounded-lg shadow-sm\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">Nilai Semula (v1.0)</span>\n<span class=\"font-body-md text-body-md text-on-surface line-through text-outline\">Baik / Normal</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-1 font-semibold\">Koreksi Saat Ini (v1.1)</span>\n<select class=\"w-full h-10 px-3 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm cursor-pointer\">\n<option selected=\"\">Baik (Tutup casing ada, goresan halus di dekat soket)</option>\n<option>Sangat Baik / Mulus Tanpa Cacat</option>\n<option>Kondisi Rusak Ringan / Bodi Retak</option>\n<option>Mati Total / Tidak Merespons Daya</option>\n</select>\n</div>\n</div>\n</div>\n<!-- Field 5: Lokasi Rak / Brankas Penyimpanan (Modified) -->\n<div class=\"p-space-sm rounded-lg bg-surface-container-low/60 flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-lg text-label-lg font-semibold text-on-surface flex items-center gap-1.5\">\n<span>5. Lokasi Rak / Brankas Posko</span>\n<span class=\"text-error font-bold\">*</span>\n</label>\n<span class=\"px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">move_item</span> Pindah Rak: A04 \u2192 B02\n              </span>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-3 pt-1\">\n<div class=\"flex flex-col bg-surface-container-lowest p-2.5 rounded-lg shadow-sm\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">Lokasi Semula (v1.0)</span>\n<div class=\"flex items-center gap-1.5 text-on-surface\">\n<span class=\"material-symbols-outlined text-[16px] text-error\">meeting_room</span>\n<span class=\"font-body-md text-body-md line-through text-outline\">Locker GKU-A04 (Posko Induk)</span>\n</div>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-1 font-semibold\">Lokasi Baru (v1.1)</span>\n<div class=\"relative\">\n<select class=\"w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm cursor-pointer\">\n<option selected=\"\">Locker GKU-B02 (Posko Induk - Rak Elektronik Aman)</option>\n<option>Locker GKU-A04 (Posko Induk - Campuran)</option>\n<option>Locker GKU-C01 (Lemari Khusus Dokumen)</option>\n<option>Brankas Kunci Utama Kasatpam</option>\n</select>\n<span class=\"material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary text-[18px]\">verified</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Field 6: Lokasi Penemuan Fisik (Modified) -->\n<div class=\"p-space-sm rounded-lg bg-surface-container-low/60 flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-lg text-label-lg font-semibold text-on-surface flex items-center gap-1.5\">\n<span>6. Lokasi Titik Penemuan Fisik</span>\n<span class=\"text-error font-bold\">*</span>\n</label>\n<span class=\"px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">location_on</span> Koreksi Titik Temu\n              </span>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-3 pt-1\">\n<div class=\"flex flex-col bg-surface-container-lowest p-2.5 rounded-lg shadow-sm\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">Catatan Semula (v1.0)</span>\n<span class=\"font-body-md text-body-md text-on-surface line-through text-outline\">Gedung FTI Lt. 3</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-1 font-semibold\">Koreksi Spesifik (v1.1)</span>\n<input class=\"w-full h-10 px-3 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm\" type=\"text\" value=\"Meja Dosen Lab 3.2 Gedung Kuliah Umum (GKU) Lt. 2\"/>\n</div>\n</div>\n</div>\n<!-- Field 7: Ciri Khusus / Kunci Verifikasi Rahasia (Restricted Security Field) -->\n<div class=\"p-space-sm rounded-lg bg-surface-container-low/60 flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<label class=\"font-label-lg text-label-lg font-semibold text-on-surface flex items-center gap-1.5\">\n<span>7. Ciri Khusus Rahasia (Verifikasi Hanya Petugas)</span>\n<span class=\"text-error font-bold\">*</span>\n</label>\n<span class=\"px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-medium\">Restricted</span>\n</div>\n<span class=\"px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">lock_reset</span> Diperbarui\n              </span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant -mt-1\">\n              Data ini tidak pernah dipublikasikan ke mahasiswa. Digunakan untuk menguji keabsahan klaim pemilik saat verifikasi fisik di pos.\n            </p>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-3 pt-1\">\n<div class=\"flex flex-col bg-surface-container-lowest p-2.5 rounded-lg shadow-sm\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1\">Catatan Semula (v1.0)</span>\n<p class=\"font-body-md text-body-md text-outline line-through leading-relaxed\">\n                  Goresan inisial huruf R di bodi belakang\n                </p>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-1 font-semibold\">Koreksi Lengkap (v1.1)</span>\n<textarea class=\"w-full p-2.5 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm leading-relaxed resize-none\" rows=\"3\">Goresan inisial huruf R di bodi belakang dekat konektor USB, kapasitas terpartisi 'TUGAS_AKHIR_FTI'</textarea>\n</div>\n</div>\n</div>\n</div>\n</div>\n<!-- Section 2: Required Justification and Audit Trail Reason Card -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm\">\n<div class=\"flex items-center gap-2 pb-space-sm mb-space-sm\">\n<span class=\"material-symbols-outlined text-secondary text-[22px]\">policy</span>\n<div>\n<h2 class=\"font-headline-md text-headline-md font-bold text-on-surface\">Justifikasi &amp; Berita Acara Koreksi</h2>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">Setiap input wajib dipertanggungjawabkan di hadapan Komandan Regu (Danru).</p>\n</div>\n</div>\n<div class=\"flex flex-col gap-space-md\">\n<!-- Dropdown Reason Category -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-lg text-label-lg font-semibold text-on-surface flex items-center justify-between\">\n<span>Kategori Alasan Koreksi <span class=\"text-error\">*</span></span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Sesuai SOP SEC-09</span>\n</label>\n<select class=\"w-full h-11 px-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm cursor-pointer\">\n<option selected=\"\">Koreksi kesesuaian fisik saat verifikasi / inventarisasi berkala</option>\n<option>Pemindahan lokasi brankas/rak penyimpanan barang berharga</option>\n<option>Koreksi salah ketik petugas input awal</option>\n<option>Hasil pemeriksaan ulang komandan regu / supervisor</option>\n<option>Temuan ciri khusus baru pasca pembersihan fisik</option>\n</select>\n</div>\n<!-- Mandatory Textarea Description -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-lg text-label-lg font-semibold text-on-surface flex items-center justify-between\">\n<span>Uraian Alasan Koreksi Fisik (Wajib &amp; Terperinci) <span class=\"text-error\">*</span></span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Minimal 30 karakter</span>\n</label>\n<textarea class=\"w-full p-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm leading-relaxed\" placeholder=\"Tuliskan keterangan detail alasan koreksi dan nama personil pendamping...\" rows=\"4\">Pemeriksaan fisik ulang bersama Danru Pos GKU menemukan bahwa flashdisk memiliki gantungan abu-abu dan warna bodi merupakan kombinasi hitam doff dengan aksen merah. Lokasi rak dipindahkan ke Locker B02 agar sesuai kluster perangkat penyimpanan digital dan aman dari tumpukan barang tas.</textarea>\n</div>\n<!-- File Attachment / Macro Photo Proof -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-lg text-label-lg font-semibold text-on-surface flex items-center justify-between\">\n<span>Foto Bukti Fisik Baru (Grid Mat / Penggaris Satpam)</span>\n<span class=\"font-label-sm text-label-sm text-secondary font-medium\">Opsional tapi disarankan</span>\n</label>\n<div class=\"grid grid-cols-1 sm:grid-cols-3 gap-3\">\n<!-- Upload Action Box -->\n<div class=\"sm:col-span-2 p-4 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors group\">\n<div class=\"w-10 h-10 rounded-full bg-surface-container-highest group-hover:bg-secondary-fixed flex items-center justify-center text-secondary transition-colors mb-2\">\n<span class=\"material-symbols-outlined text-[20px]\">add_a_photo</span>\n</div>\n<span class=\"font-label-md text-label-md font-semibold text-on-surface\">Ambil / Unggah Foto Bukti Fisik Baru</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5\">Format JPG/PNG maks 5MB dengan latar alas grid mat</span>\n</div>\n<!-- Preview of Verified Photo -->\n<div class=\"relative rounded-xl overflow-hidden shadow-sm group\">\n<img class=\"w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300\" data-alt=\"High quality overhead macro photograph of a black and red USB flash drive resting on a university security millimeter grid mat with calibration ruler, sharp focus, clean institutional lighting.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuC6Hrw6EqXR6Kjn84KUhjfqsiz0PB6J1AbyhzEu_Ija4gyQ-0FpFnuiCFyqkicvKwRUU_0UJ4zX2ITqDvKLER-MNhnh0orHjnt41iZ-7t1_VK5kBkhWV4i9rUEU0DEL4rG4w8ZmcQ7yr8xA6w5Z_SGVqSggEYt4iaX2gCQp6V9bJw2RaENdp5Jc0PGwecIixWwNNq4LexIGhpuJ8sMaEE4RhjIOaje6Z7hdjbJmA2g\"/>\n<div class=\"absolute inset-0 bg-primary/40 flex items-end p-2\">\n<span class=\"px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold\">Foto Grid Mat Baru</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<!-- RIGHT COLUMN: Diff Summary & Security Audit Trail Preview (4 Cols) -->\n<div class=\"col-span-12 xl:col-span-4 flex flex-col gap-space-md\">\n<!-- Card: Diff Preview & Impact Notification -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm\">\n<div class=\"flex items-center justify-between pb-space-sm mb-space-sm\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">difference</span>\n<h3 class=\"font-headline-sm text-headline-sm font-bold text-on-surface\">Ringkasan Perubahan</h3>\n</div>\n<span class=\"font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold\">4 Diff</span>\n</div>\n<!-- Visual Diff List -->\n<div class=\"space-y-3\">\n<!-- Diff Item 1 -->\n<div class=\"p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-semibold\">Nama / Identitas Barang</span>\n<div class=\"text-body-sm font-body-sm line-through text-outline\">\n              Flashdisk Sandisk Cruzer Blade 64GB\n            </div>\n<div class=\"text-body-sm font-body-sm text-on-surface font-semibold flex items-center gap-1 text-secondary\">\n<span class=\"material-symbols-outlined text-[14px]\">add_circle</span>\n              SanDisk 64GB (Ada Gantungan Tali Hitam-Abu)\n            </div>\n</div>\n<!-- Diff Item 2 -->\n<div class=\"p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-semibold\">Warna Dominan</span>\n<div class=\"flex items-center gap-2 text-body-sm font-body-sm\">\n<span class=\"line-through text-outline\">Merah</span>\n<span class=\"material-symbols-outlined text-[14px] text-on-surface-variant\">arrow_forward</span>\n<span class=\"font-semibold text-on-surface\">Merah - Hitam Doff</span>\n</div>\n</div>\n<!-- Diff Item 3 -->\n<div class=\"p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-semibold\">Lokasi Penyimpanan Rak</span>\n<div class=\"flex items-center gap-2 text-body-sm font-body-sm\">\n<span class=\"line-through text-outline\">Locker A04</span>\n<span class=\"material-symbols-outlined text-[14px] text-on-surface-variant\">arrow_forward</span>\n<span class=\"font-semibold text-secondary\">Locker GKU-B02 (Elektronik)</span>\n</div>\n</div>\n<!-- Diff Item 4 -->\n<div class=\"p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-semibold\">Ciri Khusus Rahasia</span>\n<div class=\"text-body-sm font-body-sm text-on-surface font-medium\">\n              Ditambahkan verifikasi nama partisi USB <span class=\"bg-surface-container-highest px-1 rounded font-mono text-[11px]\">'TUGAS_AKHIR_FTI'</span>\n</div>\n</div>\n</div>\n<!-- AI Matching Impact Notice -->\n<div class=\"mt-space-md p-space-sm rounded-lg bg-secondary-fixed/50 flex flex-col gap-2\">\n<div class=\"flex items-center gap-1.5 text-on-secondary-fixed\">\n<span class=\"material-symbols-outlined text-[18px]\">psychology</span>\n<span class=\"font-label-md text-label-md font-bold\">Dampak AI Matching Otomatis</span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant leading-relaxed\">\n            Perubahan parameter <strong class=\"text-on-surface\">Warna</strong> dan <strong class=\"text-on-surface\">Lokasi</strong> akan secara instan memicu rekalkulasi otomatis skor AI matching terhadap seluruh tiket laporan kehilangan (<span class=\"font-mono text-[11px] font-semibold\">HL-</span>) aktif dalam tempo 5 menit.\n          </p>\n</div>\n</div>\n<!-- Card: Security Authority & Session Metadata -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm\">\n<div class=\"flex items-center gap-2 pb-space-xs\">\n<span class=\"material-symbols-outlined text-primary text-[20px]\">badge</span>\n<h3 class=\"font-headline-sm text-headline-sm font-bold text-on-surface\">Otoritas &amp; Terminal Jaga</h3>\n</div>\n<div class=\"space-y-2.5\">\n<div class=\"flex items-center justify-between text-body-sm font-body-sm\">\n<span class=\"text-on-surface-variant\">Petugas Pengoreksi</span>\n<span class=\"font-semibold text-on-surface\">Bripka Hendra Kurniawan</span>\n</div>\n<div class=\"flex items-center justify-between text-body-sm font-body-sm\">\n<span class=\"text-on-surface-variant\">NRP / ID Satpam</span>\n<span class=\"font-mono text-on-surface font-semibold bg-surface-container-low px-2 py-0.5 rounded\">SEC-042</span>\n</div>\n<div class=\"flex items-center justify-between text-body-sm font-body-sm\">\n<span class=\"text-on-surface-variant\">Pos Jaga Operasional</span>\n<span class=\"text-on-surface font-medium\">Posko Induk GKU</span>\n</div>\n<div class=\"flex items-center justify-between text-body-sm font-body-sm\">\n<span class=\"text-on-surface-variant\">Waktu Pengajuan</span>\n<span class=\"text-on-surface font-medium\">Kamis, 24 Okt 2024, 11:48 WIB</span>\n</div>\n<div class=\"flex items-center justify-between text-body-sm font-body-sm\">\n<span class=\"text-on-surface-variant\">IP Terminal Jaga</span>\n<span class=\"font-mono text-on-surface text-[12px]\">10.12.8.44 (Static)</span>\n</div>\n<div class=\"flex items-center justify-between text-body-sm font-body-sm\">\n<span class=\"text-on-surface-variant\">Evolusi Dokumen</span>\n<span class=\"font-semibold text-secondary flex items-center gap-1\">\n              v1.0 <span class=\"material-symbols-outlined text-[14px]\">arrow_right_alt</span> v1.1\n            </span>\n</div>\n</div>\n<div class=\"mt-2 p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">encrypted</span>\n<span>Tanda tangan digital enkripsi SHA-256 diterapkan pada catatan ini</span>\n</div>\n</div>\n<!-- Item Photo Snapshot of Item in Vault -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex flex-col gap-2\">\n<div class=\"flex items-center justify-between px-1\">\n<span class=\"font-label-md text-label-md font-semibold text-on-surface\">Foto Inventaris Saat Penerimaan (v1.0)</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Arsip</span>\n</div>\n<div class=\"relative rounded-lg overflow-hidden h-36\">\n<img class=\"w-full h-full object-cover\" data-alt=\"Clear photographic record of a black SanDisk flash drive taken during intake at campus lost and found security desk under bright indoor lamp, crisp details.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuBRhfXtUK6Tnmk4xWhYrqrui_UzRJDy6aM3AAceyZ99CL53nEGaZUI97vc6IfyRPPD9aDjw3IX1-sBabgM5gC4awbs9pgyd7ptzE-lk-8yC_V9KOL4gkfy9NxkzFEbb4hwDTbd-sdhEOuagnuPQXbqXjbRMn-4WSzv4YbQWDR5diBA5NGWHdV5wiHoZSzrGF56FZuxaLl3Hfej1eVWFUClTnbXR45DzLC4YwWmeyhc\"/>\n<div class=\"absolute bottom-2 left-2 px-2 py-0.5 rounded bg-primary/80 backdrop-blur text-on-primary font-mono text-[10px]\">\n            INPUT_DATE: 2024-10-23\n          </div>\n</div>\n</div>\n</div>\n</div>\n<!-- Persistent Sticky Bottom Action Bar -->\n<div class=\"sticky bottom-0 z-30 mt-space-lg -mx-gutter px-gutter py-space-sm bg-surface-container-lowest/95 backdrop-blur-md shadow-xl flex items-center justify-between\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0\">\n<span class=\"material-symbols-outlined text-[20px]\" style=\"font-variation-settings: 'FILL' 1;\">security</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg font-bold text-on-surface\">Konfirmasi Pembaruan Versi Dokumen Fisik</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">\n          Setiap koreksi tercatat secara permanen di riwayat dan audit log sistem keamanan UII.\n        </span>\n</div>\n</div>\n<!-- Action Buttons -->\n<div class=\"flex items-center gap-space-sm\">\n<a class=\"h-11 px-5 rounded-full bg-surface-container-low hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center\" href=\"#\">\n        Batal\n      </a>\n<button class=\"h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label-lg text-label-lg shadow-sm transition-all flex items-center gap-2 group\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform\">check_circle</span>\n<span>Simpan Koreksi (v1.1)</span>\n</button>\n</div>\n</div>\n</div></main></div>";

export default function KoreksiDataInventaris({ onNavigate }) {
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
