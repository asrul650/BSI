import React, { useLayoutEffect, useRef } from 'react';

// Layar Stitch Portal Satpam: Penerimaan Barang Temuan (Item Receiving) - Portal Satpam UII
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto\"><div class=\"flex flex-col\"><div class=\"p-gutter pb-space-sm flex items-center gap-space-sm\"><div class=\"w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm\"><span class=\"material-symbols-outlined text-secondary-fixed\">verified_user</span></div><div class=\"flex flex-col min-w-0\"><span class=\"font-headline-sm text-headline-sm text-on-surface truncate tracking-tight\">Lost &amp; Found UII</span><span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">Portal Satpam Kampus</span></div></div><div class=\"px-gutter py-space-xs\"><div class=\"h-px bg-surface-container-high w-full\"></div></div><div class=\"px-space-sm py-space-xs\"><span class=\"px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block\">Navigasi Utama</span></div><nav class=\"flex flex-col gap-1 px-space-sm\" data-active-classes=\"bg-primary text-on-primary font-label-lg shadow-sm\">\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">dashboard</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors bg-primary text-on-primary font-label-lg shadow-sm font-semibold cursor-pointer\" data-path=\"penerimaan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">move_to_inbox</span>\n    <span>Penerimaan</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"barang\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">inventory_2</span>\n    <span>Barang</span>\n  </a>\n  <a class=\"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"hasil-matching\" href=\"#\">\n    <div class=\"flex items-center gap-space-sm\">\n      <span class=\"material-symbols-outlined text-[20px]\">auto_awesome</span>\n      <span>Hasil Matching</span>\n    </div>\n    <span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm\">AI</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"verifikasi\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Verifikasi</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"laporan-kehilangan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">receipt_long</span>\n    <span>Laporan Kehilangan</span>\n  </a>\n</nav></div><div class=\"p-space-sm flex flex-col gap-space-sm\"><div class=\"bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1\"><div class=\"flex items-center gap-2\"><span class=\"w-2.5 h-2.5 rounded-full bg-secondary animate-pulse\"></span><span class=\"font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider\">Pos Jaga Aktif</span></div><p class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Posko Induk GKU</p><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Shift Siang (07:00 - 15:30 WIB)</span></div><div class=\"px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\"><span class=\"flex items-center gap-1\"><span class=\"material-symbols-outlined text-[16px]\">contact_support</span> BSI Helpdesk: x102</span><span>v2.4.0</span></div></div><!-- Portal Publik Shortcut Button -->\n<div class=\"px-space-sm pt-2\">\n  <button data-path=\"portal-publik\" class=\"w-full py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">logout</span>\n    <span>Kembali ke Portal Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72\"><header class=\"fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter\"><div class=\"flex items-center gap-gutter flex-1 max-w-xl\"><div class=\"relative w-full\"><span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">search</span><input class=\"w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm transition-all\" placeholder=\"Cari nomor tiket TM- / HL- / nama barang...\" type=\"text\"/></div></div><div class=\"flex items-center gap-space-md shrink-0\"><div class=\"hidden xl:flex flex-col text-right\"><span class=\"font-label-lg text-label-lg text-on-surface\">Kamis, 24 Oktober 2024</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pukul 11:42 WIB</span></div><div class=\"hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\"><span class=\"material-symbols-outlined text-[16px]\">shield</span><span>Status Siaga 1</span></div><div class=\"h-8 w-px bg-surface-container-high hidden sm:block\"></div><div class=\"flex items-center gap-space-sm\"><div class=\"flex flex-col text-right hidden md:block\"><span class=\"font-label-lg text-label-lg text-on-surface truncate font-semibold\">Bripka Hendra Kurniawan</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Petugas Pos Jaga Induk GKU (SEC-042)</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors ml-1\" data-path=\"login\" href=\"#\" title=\"Keluar Portal\"><span class=\"material-symbols-outlined text-[20px]\">logout</span></a></div></div></header><main class=\"w-full pt-16 bg-surface min-h-screen px-gutter py-space-lg\"><div class=\"flex flex-col w-full gap-space-lg\">\n<script>\n    document.addEventListener(\"DOMContentLoaded\", function() {\n      const navLinks = document.querySelectorAll(\"aside nav a\");\n      navLinks.forEach(link => {\n        if (link.getAttribute(\"data-path\") === \"penerimaan\") {\n          link.className = \"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg bg-primary text-on-primary font-label-lg shadow-sm transition-colors\";\n          const icon = link.querySelector(\".material-symbols-outlined\");\n          if (icon) icon.className = \"material-symbols-outlined text-[20px] text-secondary-fixed\";\n        } else {\n          link.className = \"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg\";\n        }\n      });\n    });\n  </script>\n<!-- Top Breadcrumb & Page Header -->\n<div class=\"flex flex-col gap-space-xs\">\n<div class=\"flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant\">\n<span class=\"hover:text-on-surface transition-colors cursor-pointer\">Beranda</span>\n<span class=\"material-symbols-outlined text-[14px]\">chevron_right</span>\n<span class=\"hover:text-on-surface transition-colors cursor-pointer\">Penerimaan</span>\n<span class=\"material-symbols-outlined text-[14px]\">chevron_right</span>\n<span class=\"text-secondary font-semibold\">Proses Penerimaan Fisik</span>\n</div>\n<div class=\"flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mt-1\">\n<div>\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight\">Penerimaan Fisik Barang Temuan</h1>\n<p class=\"font-body-md text-body-md text-on-surface-variant mt-0.5\">\n          Verifikasi fisik barang temuan dari pelapor/penemu, dokumentasikan foto resmi pos, dan terbitkan Item ID inventaris brankas.\n        </p>\n</div>\n<!-- State Simulation Controller Pill -->\n<div class=\"inline-flex items-center gap-1.5 p-1.5 rounded-full bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] shrink-0 self-start lg:self-center\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant pl-3 pr-1 font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[15px] text-secondary\">tune</span>\n          Simulasi View:\n        </span>\n<button class=\"px-3.5 py-1.5 rounded-full font-label-sm text-label-sm transition-all font-semibold bg-primary text-on-primary shadow-sm flex items-center gap-1.5\" id=\"toggle-form-btn\" onclick=\"setScreenState('form')\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping\"></span>\n          Form Inspeksi Aktif\n        </button>\n<button class=\"px-3.5 py-1.5 rounded-full font-label-sm text-label-sm transition-all font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low flex items-center gap-1.5\" id=\"toggle-success-btn\" onclick=\"setScreenState('success')\">\n<span class=\"material-symbols-outlined text-[14px] text-secondary\">verified</span>\n          Status Berhasil (Sukses)\n        </button>\n</div>\n</div>\n</div>\n<!-- Mode Switcher Tabs -->\n<div class=\"flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest p-2 rounded-xl shadow-[0_2px_12px_rgba(15,23,42,0.04)]\">\n<div class=\"flex items-center gap-1.5\">\n<button class=\"flex items-center gap-2 px-4 py-2 rounded-lg font-label-lg text-label-lg transition-all bg-primary text-on-primary shadow-sm\" id=\"tab-registered\" onclick=\"switchMode('registered')\">\n<span class=\"material-symbols-outlined text-[18px]\">document_scanner</span>\n<span>Dengan Nomor Laporan (TM-)</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold tracking-wide\">TM-7F3P9X</span>\n</button>\n<button class=\"flex items-center gap-2 px-4 py-2 rounded-lg font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high\" id=\"tab-walkin\" onclick=\"switchMode('walkin')\">\n<span class=\"material-symbols-outlined text-[18px]\">person_pin_circle</span>\n<span>Tanpa Nomor Laporan (Walk-in)</span>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">Mandiri</span>\n</button>\n</div>\n<div class=\"flex items-center gap-2 px-3 py-1 font-body-sm text-body-sm text-on-surface-variant\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">info</span>\n<span>Prosedur wajib: Sesuai SOP Pengamanan Aset Kampus UII No. 04/SK-BSI/2024</span>\n</div>\n</div>\n<!-- SUCCESS STATE VIEW (Initially Hidden or Shown based on toggle) -->\n<div class=\"hidden flex-col gap-space-lg animate-fadeIn\" id=\"success-view-container\">\n<div class=\"bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_-4px_rgba(15,23,42,0.08)] p-space-lg flex flex-col gap-space-lg\">\n<div class=\"flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md\">\n<div class=\"flex items-center gap-space-md\">\n<div class=\"w-14 h-14 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 shadow-sm\">\n<span class=\"material-symbols-outlined text-[34px]\">check_circle</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold\">Status: Terverifikasi &amp; Tersimpan</span>\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Audit Ref #SEC-LOG-88190</span>\n</div>\n<h2 class=\"font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight\">Barang Berhasil Diterima &amp; Terdaftar</h2>\n<p class=\"font-body-md text-body-md text-on-surface-variant mt-0.5\">Penyerahan fisik dari civitas dinyatakan sah dan resmi masuk ke sistem brankas pusat.</p>\n</div>\n</div>\n<div class=\"flex items-center gap-space-sm self-stretch md:self-auto justify-end\">\n<button class=\"px-4 py-2.5 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center gap-1.5\" onclick=\"setScreenState('form')\">\n<span class=\"material-symbols-outlined text-[18px]\">arrow_back</span>\n            Periksa Laporan Lain\n          </button>\n</div>\n</div>\n<!-- Generated ID Highlight Strip -->\n<div class=\"grid grid-cols-1 md:grid-cols-3 gap-space-md bg-surface-container-low p-space-md rounded-xl\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Nomor Item ID Resmi Inventaris</span>\n<div class=\"flex items-baseline gap-2 mt-1\">\n<span class=\"font-display text-display text-on-surface tracking-wider font-bold select-all\">BRG-2024-0142</span>\n<span class=\"material-symbols-outlined text-[20px] text-secondary cursor-pointer hover:opacity-80\" title=\"Salin ID\">content_copy</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Linked ke Laporan: <strong class=\"text-on-surface\">TM-7F3P9X</strong></span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Penempatan Brankas / Rak Posko</span>\n<div class=\"flex items-center gap-2 mt-2\">\n<span class=\"material-symbols-outlined text-secondary text-[24px]\">lock</span>\n<span class=\"font-headline-md text-headline-md text-on-surface font-semibold\">Locker GKU-A04</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Kompartemen Elektronik Brankas Lantai Dasar</span>\n</div>\n<div class=\"flex flex-col justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Petugas Validasi Terdaftar</span>\n<div class=\"flex items-center gap-2.5 mt-2\">\n<div class=\"w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-sm\">HK</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg text-on-surface\">Bripka Hendra Kurniawan</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">NRP 84090122 \u2022 Posko Induk GKU</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Mandatory Security Callout -->\n<div class=\"p-space-md rounded-xl bg-tertiary-fixed/30 flex items-start gap-space-md\">\n<div class=\"w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[24px]\">priority_high</span>\n</div>\n<div class=\"flex flex-col gap-1\">\n<h4 class=\"font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight\">PERHATIAN PETUGAS JAGA:</h4>\n<p class=\"font-body-md text-body-md text-on-surface\">\n            Segera cetak label barcode inventaris dan tempelkan langsung pada plastik wadah fisik barang. Simpan segera ke dalam <strong>Locker GKU-A04</strong> sebelum pergantian shift jaga berikutnya pukul 15:30 WIB.\n          </p>\n</div>\n</div>\n<!-- Matching Pipeline Live Banner -->\n<div class=\"p-space-md rounded-xl bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-space-md\">\n<div class=\"flex items-center gap-space-sm\">\n<div class=\"w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary animate-pulse shrink-0\">\n<span class=\"material-symbols-outlined text-[18px]\">auto_awesome</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold\">Pencocokan AI Otomatis Sedang Berjalan di Latar Belakang</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Membandingkan ciri rahasia dan spesifikasi dengan 14 laporan kehilangan aktif (HL-) di area Gedung GKU.</span>\n</div>\n</div>\n<a class=\"inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-lowest text-secondary font-label-lg text-label-lg font-semibold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-sm shrink-0\" href=\"#\">\n<span>Lihat Status Matching (BRG-2024-0142)</span>\n<span class=\"material-symbols-outlined text-[18px]\">arrow_forward</span>\n</a>\n</div>\n<!-- Primary Action Buttons for Post-Receiving -->\n<div class=\"flex flex-wrap items-center gap-space-sm pt-space-xs\">\n<button class=\"px-6 py-3 rounded-full font-label-lg text-label-lg font-semibold bg-primary text-on-primary hover:opacity-90 transition-all shadow-md flex items-center gap-2\" onclick=\"window.print()\">\n<span class=\"material-symbols-outlined text-[20px]\">print</span>\n          Cetak Label Barcode / QR (Item ID)\n        </button>\n<button class=\"px-5 py-3 rounded-full font-label-lg text-label-lg font-semibold bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[20px]\">description</span>\n          Cetak Berita Acara Serah Terima (BAST)\n        </button>\n<button class=\"px-5 py-3 rounded-full font-label-lg text-label-lg font-semibold bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container transition-colors flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[20px]\">chat</span>\n          Kirim Bukti WhatsApp ke Penemu\n        </button>\n</div>\n</div>\n</div>\n<!-- WALK-IN MODE PLACEHOLDER CONTAINER (Hidden by default, shown if walk-in tab chosen) -->\n<div class=\"hidden flex-col gap-space-lg\" id=\"walkin-view-container\">\n<div class=\"bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] p-space-lg flex flex-col gap-space-md\">\n<div class=\"flex items-center justify-between pb-space-sm\">\n<div>\n<span class=\"px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold uppercase\">Pendaftaran Walk-in Mandiri</span>\n<h2 class=\"font-headline-md text-headline-md text-on-surface mt-1\">Penerimaan Langsung Tanpa Nomor Tiket Daring</h2>\n<p class=\"font-body-md text-body-md text-on-surface-variant\">SOP Keterbukaan &amp; Integritas: Barang dicatat langsung atas nama penemu asli di meja pos jaga.</p>\n</div>\n<button class=\"px-3 py-1.5 rounded-lg font-label-sm text-label-sm text-secondary hover:bg-surface-container-low transition-colors flex items-center gap-1\" onclick=\"switchMode('registered')\">\n<span class=\"material-symbols-outlined text-[16px]\">arrow_back</span>\n          Kembali ke Mode Tiket TM-\n        </button>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-space-md\">\n<div class=\"flex flex-col gap-1\">\n<label class=\"font-label-lg text-label-lg text-on-surface\">Nama Lengkap Penemu Asli *</label>\n<input class=\"h-11 px-3.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm\" placeholder=\"Masukkan nama sesuai KTP / KTM...\" type=\"text\"/>\n</div>\n<div class=\"flex flex-col gap-1\">\n<label class=\"font-label-lg text-label-lg text-on-surface\">Nomor WhatsApp Aktif *</label>\n<input class=\"h-11 px-3.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm\" placeholder=\"Contoh: 0812-xxxx-xxxx\" type=\"text\"/>\n</div>\n<div class=\"flex flex-col gap-1\">\n<label class=\"font-label-lg text-label-lg text-on-surface\">Status Civitas UII *</label>\n<select class=\"h-11 px-3.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest\">\n<option>Mahasiswa UII (Wajib verifikasi NIM)</option>\n<option>Tenaga Kependidikan / Tendik</option>\n<option>Dosen Tetap / Tidak Tetap</option>\n<option>Tamu Luar / Vendor Kampus</option>\n</select>\n</div>\n<div class=\"flex flex-col gap-1\">\n<label class=\"font-label-lg text-label-lg text-on-surface\">Lokasi Spesifik Ditemukan *</label>\n<input class=\"h-11 px-3.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest\" placeholder=\"Contoh: Musholla Ulil Albab Lt. 1 Saf Belakang...\" type=\"text\"/>\n</div>\n<div class=\"flex flex-col gap-1 md:col-span-2\">\n<label class=\"font-label-lg text-label-lg text-on-surface\">Nama &amp; Ringkasan Barang *</label>\n<input class=\"h-11 px-3.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest\" placeholder=\"Contoh: Dompet Kulit Coklat Merk Braun Buffel berisi KTP &amp; STNK\" type=\"text\"/>\n</div>\n</div>\n<div class=\"flex items-center justify-end gap-space-sm pt-space-sm\">\n<button class=\"px-5 py-2.5 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors\" onclick=\"switchMode('registered')\">Batal</button>\n<button class=\"px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-semibold shadow-sm hover:opacity-95\" onclick=\"setScreenState('success')\">Lanjutkan ke Pemeriksaan Fisik Walk-in</button>\n</div>\n</div>\n</div>\n<!-- MAIN DUAL-COLUMN INSPECTION INTERFACE -->\n<div class=\"grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start\" id=\"main-form-view\">\n<!-- COLUMN 1: READ-ONLY REPORT DATA (45% -> 5 cols on 12-grid desktop) -->\n<div class=\"lg:col-span-5 flex flex-col gap-space-md\">\n<!-- Report Header Card -->\n<div class=\"bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] p-space-md flex flex-col gap-space-md\">\n<div class=\"flex items-start justify-between gap-space-sm\">\n<div>\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold\">Laporan Temuan Daring</span>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\">Aktif</span>\n</div>\n<h3 class=\"font-headline-md text-headline-md text-on-surface mt-0.5\">Data Tiket: TM-7F3P9X</h3>\n</div>\n<!-- Critical Countdown Badge -->\n<div class=\"flex flex-col items-end shrink-0\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-error font-bold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">timer</span>\n              Kritis (&lt; 2 Jam)\n            </span>\n<span class=\"font-headline-sm text-headline-sm text-error font-mono font-bold\">01:14:18</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant text-[11px]\">Batas serah fisik</span>\n</div>\n</div>\n<!-- Status Chip Banner -->\n<div class=\"flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low\">\n<div class=\"flex items-center gap-2\">\n<div class=\"w-3 h-3 rounded-full bg-secondary animate-pulse\"></div>\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold\">Menunggu Penyerahan Fisik</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Pos Jaga Tujuan: GKU Induk</span>\n</div>\n<!-- Read-Only Detailed Data Grid -->\n<div class=\"flex flex-col gap-space-sm font-body-md text-body-md\">\n<div class=\"flex items-start justify-between py-1.5 bg-surface-container-low/50 px-3 rounded-lg\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant shrink-0\">Kategori Barang</span>\n<span class=\"font-label-lg text-label-lg text-on-surface text-right\">Elektronik &amp; Aksesoris</span>\n</div>\n<div class=\"flex items-start justify-between py-1.5 px-3\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant shrink-0\">Nama / Model</span>\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold text-right\">Flashdisk Sandisk 64GB Cruzer Blade</span>\n</div>\n<div class=\"flex items-start justify-between py-1.5 bg-surface-container-low/50 px-3 rounded-lg\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant shrink-0\">Warna Dominan</span>\n<div class=\"flex items-center gap-1.5\">\n<span class=\"w-3 h-3 rounded-full bg-error inline-block\"></span>\n<span class=\"w-3 h-3 rounded-full bg-primary inline-block\"></span>\n<span class=\"font-body-md text-body-md text-on-surface\">Merah kombinasi Hitam</span>\n</div>\n</div>\n<div class=\"flex items-start justify-between py-1.5 px-3\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant shrink-0\">Lokasi Ditemukan</span>\n<span class=\"font-body-md text-body-md text-on-surface text-right font-medium\">Gedung Kuliah Umum (GKU) Lt. 2, Ruang 2.14</span>\n</div>\n<div class=\"flex items-start justify-between py-1.5 bg-surface-container-low/50 px-3 rounded-lg\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant shrink-0\">Waktu Ditemukan</span>\n<span class=\"font-body-md text-body-md text-on-surface text-right\">Rabu, 20 Nov 2024 \u2022 13:45 WIB</span>\n</div>\n<div class=\"flex items-start justify-between py-1.5 px-3\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant shrink-0\">Waktu Lapor Daring</span>\n<span class=\"font-body-md text-body-md text-on-surface text-right\">Rabu, 20 Nov 2024 \u2022 14:30 WIB</span>\n</div>\n</div>\n<!-- Pelapor Initial Photo Preview Thumbnail -->\n<div class=\"flex flex-col gap-2 pt-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Foto Awal dari Penemu Daring</span>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm\">Bukan Foto Pos</span>\n</div>\n<div class=\"relative rounded-xl overflow-hidden bg-surface-container-high group aspect-[16/9]\">\n<img class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300\" data-alt=\"Close up amateur smartphone photo of a red and black Sandisk Cruzer Blade USB flash drive lying horizontally on a wooden lecture hall classroom desk at Islamic University of Indonesia, natural afternoon fluorescent lighting, slightly angled perspective.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuALOhMof5mxaeVCtieY6aCjqTZ1amBuZ64ysrOJa3Z2p4IBTD7wOyCwj8wATv5cqtpwXWft5A7xDoMLZ9NdbjEnmoXUQ0okDGCC2Vpp37TqrDh9E9Ta8wOhrF-D1JZdWGy7FYWV2uWnlA6mjkk1ZJA8KJQi9TSaIgkOAzRG1s6IT9iJMAsDOxFRODllkXr7ChvZuMrh-Us_0O-mTf-emd-R-GUL4MpMgNy795SOvxA\"/>\n<div class=\"absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent flex items-end p-3\">\n<span class=\"font-label-sm text-label-sm text-on-primary bg-primary/60 backdrop-blur-sm px-2.5 py-1 rounded-md\">Unggahan Pelapor: flashdisk_meja214.jpg</span>\n</div>\n</div>\n</div>\n<!-- Finder Information Panel -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs mt-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[16px]\">how_to_reg</span>\n              Identitas Penemu (Finder Info)\n            </span>\n<span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm\">OTP Terverifikasi</span>\n</div>\n<div class=\"grid grid-cols-2 gap-2 mt-1\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Nama Pelapor:</span>\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold\">Civitas Peduli (Minta Anonim)</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Status Civitas:</span>\n<span class=\"font-label-lg text-label-lg text-on-surface\">Mahasiswa FTI UII</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant text-[11px]\">NIM: 21523*** (Disamarkan)</span>\n</div>\n<div class=\"flex flex-col col-span-2 pt-1\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Kontak WhatsApp:</span>\n<div class=\"flex items-center gap-2\">\n<span class=\"font-label-lg text-label-lg text-on-surface font-mono\">+62 812-9844-xxxx</span>\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">verified</span>\n</div>\n</div>\n<div class=\"flex flex-col col-span-2 pt-1\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Pilihan Hak Barang (Jika 90 Hari Tak Diambil):</span>\n<span class=\"font-body-md text-body-md text-on-surface font-medium mt-0.5\">Diserahkan untuk kegiatan sosial kampus / infaq masjid kampus.</span>\n</div>\n</div>\n</div>\n<!-- Finder's Specific Note -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-high/60 flex items-start gap-2.5\">\n<span class=\"material-symbols-outlined text-on-surface-variant text-[20px] shrink-0 mt-0.5\">format_quote</span>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold\">Catatan Khusus Penemu</span>\n<p class=\"font-body-md text-body-md text-on-surface italic mt-0.5\">\n              \"Ditemukan tertinggal di slot USB meja dosen ruang multimedia 2.14 setelah jam perkuliahan selesai.\"\n            </p>\n</div>\n</div>\n</div>\n<!-- Campus Integrity Trust Strip -->\n<div class=\"grid grid-cols-3 gap-2 bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_2px_10px_rgba(15,23,42,0.03)] text-center\">\n<div class=\"flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">verified_user</span>\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold mt-1\">SOP Berlapis</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant text-[10px]\">Tervalidasi BSI</span>\n</div>\n<div class=\"flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">encrypted</span>\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold mt-1\">Data Dilindungi</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant text-[10px]\">Privasi Mahasiswa</span>\n</div>\n<div class=\"flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-low\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">nest_clock_farsight_analog</span>\n<span class=\"font-label-sm text-label-sm text-on-surface font-semibold mt-1\">Audit 24 Jam</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant text-[10px]\">Log Terenkripsi</span>\n</div>\n</div>\n</div>\n<!-- COLUMN 2: PHYSICAL INSPECTION FORM (55% -> 7 cols on 12-grid desktop) -->\n<div class=\"lg:col-span-7 flex flex-col gap-space-md\">\n<div class=\"bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] p-space-lg flex flex-col gap-space-lg\">\n<!-- Inspector Identity & Title Header -->\n<div class=\"flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm gap-2\">\n<div>\n<span class=\"font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold\">Langkah 2: Pemeriksaan Pos Satpam</span>\n<h2 class=\"font-headline-md text-headline-md text-on-surface mt-0.5\">Formulir Pemeriksaan &amp; Validasi Fisik</h2>\n</div>\n<div class=\"flex items-center gap-2 p-2 rounded-lg bg-surface-container-low self-start sm:self-auto\">\n<span class=\"material-symbols-outlined text-secondary text-[18px]\">security</span>\n<span class=\"font-body-sm text-body-sm text-on-surface font-semibold\">Petugas: Hendra K. (SEC-042)</span>\n</div>\n</div>\n<!-- Match Validation Radio Selection -->\n<div class=\"flex flex-col gap-space-xs\">\n<label class=\"font-label-lg text-label-lg text-on-surface font-semibold\">\n            Hasil Kesesuaian Fisik dengan Laporan TM- *\n          </label>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-1\">\n<label class=\"cursor-pointer p-space-sm rounded-xl transition-all flex items-start gap-3 bg-primary text-on-primary shadow-sm\" id=\"match-card-true\" onclick=\"setInspectionMatch(true)\">\n<input checked=\"\" class=\"mt-1 accent-secondary\" name=\"kesesuaian\" type=\"radio\" value=\"sesuai\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg font-bold flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-[18px]\">check_circle</span>\n                  Sesuai (Cocok)\n                </span>\n<span class=\"font-body-sm text-body-sm text-on-primary-container mt-0.5\">Fisik barang cocok persis dengan rincian laporan penemu daring.</span>\n</div>\n</label>\n<label class=\"cursor-pointer p-space-sm rounded-xl transition-all flex items-start gap-3 bg-surface-container-low text-on-surface hover:bg-surface-container-high\" id=\"match-card-false\" onclick=\"setInspectionMatch(false)\">\n<input class=\"mt-1 accent-error\" name=\"kesesuaian\" type=\"radio\" value=\"tidak_sesuai\"/>\n<div class=\"flex flex-col\">\n<span class=\"font-label-lg text-label-lg font-bold flex items-center gap-1.5 text-error\">\n<span class=\"material-symbols-outlined text-[18px]\">cancel</span>\n                  Tidak Sesuai / Tolak\n                </span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5\">Barang berbeda, rusak total hancur, atau indikasi palsu.</span>\n</div>\n</label>\n</div>\n</div>\n<!-- CONDITIONAL BLOCK A: MATCH SUCCESS FORM FIELDS -->\n<div class=\"flex flex-col gap-space-md\" id=\"section-sesuai\">\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-space-md\">\n<!-- Physical Condition Selector -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-lg text-label-lg text-on-surface font-semibold flex items-center justify-between\">\n<span>Kondisi Fisik Barang *</span>\n<span class=\"font-body-sm text-body-sm text-secondary font-normal\">Hasil cek fisik</span>\n</label>\n<div class=\"relative\">\n<select class=\"w-full h-11 pl-3.5 pr-10 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm\">\n<option selected=\"\">Baik / Berfungsi Normal (Default)</option>\n<option>Lecet Pemakaian Ringan</option>\n<option>Rusak / Bodi Pecah / Retak</option>\n<option>Mati Total / Tidak Berfungsi</option>\n<option>Kondisi Basah / Terkena Cairan / Kotor</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]\">expand_more</span>\n</div>\n</div>\n<!-- Storage Locker Assignment -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-lg text-label-lg text-on-surface font-semibold flex items-center justify-between\">\n<span>Lokasi Penyimpanan Locker *</span>\n<span class=\"font-body-sm text-body-sm text-secondary font-normal\">Brankas Pos</span>\n</label>\n<div class=\"relative\">\n<select class=\"w-full h-11 pl-3.5 pr-10 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm font-semibold\">\n<option selected=\"\">Locker GKU-A04 (Khusus Elektronik / Brankas)</option>\n<option>Locker GKU-B02 (Dokumen / Dompet)</option>\n<option>Locker GKU-C01 (Aksesoris Umum)</option>\n<option>Locker Gerbang Utama (Transit Darurat)</option>\n</select>\n<span class=\"material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]\">expand_more</span>\n</div>\n</div>\n</div>\n<!-- Additional Accessories / Completeness Checklist -->\n<div class=\"flex flex-col gap-1.5\">\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold\">Kelengkapan Tambahan Fisik Ditemukan:</span>\n<div class=\"flex flex-wrap items-center gap-2 pt-1\">\n<label class=\"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/60 cursor-pointer hover:bg-surface-container-high transition-colors\">\n<input checked=\"\" class=\"rounded text-primary focus:ring-0\" type=\"checkbox\"/>\n<span class=\"font-body-md text-body-md text-on-surface font-medium\">Tutup flashdisk ada</span>\n</label>\n<label class=\"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/60 cursor-pointer hover:bg-surface-container-high transition-colors\">\n<input class=\"rounded text-primary focus:ring-0\" type=\"checkbox\"/>\n<span class=\"font-body-md text-body-md text-on-surface font-medium\">Ada gantungan tali</span>\n</label>\n<label class=\"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/60 cursor-pointer hover:bg-surface-container-high transition-colors\">\n<input checked=\"\" class=\"rounded text-primary focus:ring-0\" type=\"checkbox\"/>\n<span class=\"font-body-md text-body-md text-on-surface font-medium\">Disertai wadah plastik transparan</span>\n</label>\n</div>\n</div>\n<!-- Official Security Post Photo Capture Section (MANDATORY) -->\n<div class=\"flex flex-col gap-2 p-space-md rounded-xl bg-surface-container-low\">\n<div class=\"flex flex-col sm:flex-row sm:items-center justify-between gap-1\">\n<div>\n<span class=\"font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary\">photo_camera</span>\n                  Foto Resmi Dokumentasi Pos Jaga (WAJIB) *\n                </span>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n                  Ambil foto barang jelas dengan latar meja pos jaga bersegel UII untuk etalase publik.\n                </p>\n</div>\n<span class=\"px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold shrink-0 self-start sm:self-auto\">\n                Tersedia 1 Foto Resmi\n              </span>\n</div>\n<!-- Dual Action Upload & Webcam Triggers -->\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-2\">\n<button class=\"flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg font-semibold shadow-sm transition-colors\" type=\"button\">\n<span class=\"material-symbols-outlined text-secondary text-[22px]\">videocam</span>\n<span>Buka Kamera Webcam Pos</span>\n</button>\n<button class=\"flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg font-semibold shadow-sm transition-colors\" type=\"button\">\n<span class=\"material-symbols-outlined text-secondary text-[22px]\">upload_file</span>\n<span>Unggah File Foto (.jpg/png)</span>\n</button>\n</div>\n<!-- Official Photo Captured Preview Container -->\n<div class=\"relative rounded-xl overflow-hidden bg-surface-container-highest mt-2 aspect-[16/9]\">\n<img class=\"w-full h-full object-cover\" data-alt=\"Crisp professional security inventory documentation photo of a red and black Sandisk Cruzer Blade 64GB USB flash drive placed neatly centered on a blue millimeter grid cutting mat on a university campus security desk, accompanied by an official official UII security stamp watermark and clear lighting.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuAQXvQ0Tt0NVBEMfKeB7bimkVigSOydYSI2WV3LPA2mOkVxpRGYMUmFtMLunw02SzIPWPmVB2TM45Kv5HOQsCKjUwxRA2rFSfAA8DfGpeOv2RoAfQQxc3CiyjwXxn_ZQD0F8Ix2OqoVjEirDlQxxgoe6KedV4-sBeXy3LUQ0e2WQUkbP_pm7qWN3PzcYnJSEhqwUikW_OrZMOmJqW7ytkDW3JHRHOEnrP-fxWs1QFE\"/>\n<div class=\"absolute top-3 left-3 flex items-center gap-2\">\n<span class=\"px-2.5 py-1 rounded bg-primary/80 backdrop-blur-md text-on-primary font-mono text-[11px] font-bold tracking-wider\">\n                  STAMP: 20/11/2024 15:10 WIB \u2022 SEC-042\n                </span>\n<span class=\"px-2 py-1 rounded bg-secondary-fixed/90 backdrop-blur-md text-on-secondary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[14px]\">verified</span>\n                  Foto Etalase Resmi\n                </span>\n</div>\n<div class=\"absolute bottom-3 right-3 flex items-center gap-2\">\n<button class=\"p-2 rounded-lg bg-surface-container-lowest/90 backdrop-blur text-on-surface hover:bg-surface-container-lowest transition-colors shadow\" title=\"Ambil Ulang\">\n<span class=\"material-symbols-outlined text-[18px]\">replay</span>\n</button>\n<button class=\"p-2 rounded-lg bg-surface-container-lowest/90 backdrop-blur text-on-surface hover:bg-surface-container-lowest transition-colors shadow\" title=\"Perbesar Foto\">\n<span class=\"material-symbols-outlined text-[18px]\">zoom_in</span>\n</button>\n</div>\n</div>\n</div>\n<!-- Secret / Confidential Marks Identified by Security Officer -->\n<div class=\"flex flex-col gap-1.5\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-secondary text-[18px]\">visibility_off</span>\n                Ciri Rahasia Tambahan yang Ditemukan Petugas (Opsional)\n              </label>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Disembunyikan dari Publik</span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n              Ciri rahasia ini akan digunakan sistem AI dan satpam saat memvalidasi klaim pemilik asli nanti.\n            </p>\n<input class=\"w-full h-11 px-3.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm\" type=\"text\" value=\"Ada goresan inisial huruf 'R' kecil di bagian belakang bodi flashdisk dekat lubang gantungan.\"/>\n</div>\n<!-- Action Submission Row -->\n<div class=\"flex flex-col sm:flex-row items-center justify-end gap-space-sm pt-space-xs\">\n<button class=\"w-full sm:w-auto px-6 py-3 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors text-center\" type=\"button\">\n              Batal / Tunda Penyerahan\n            </button>\n<button class=\"w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:opacity-90 shadow-md transition-all flex items-center justify-center gap-2\" onclick=\"setScreenState('success')\" type=\"button\">\n<span class=\"material-symbols-outlined text-[20px] text-secondary-fixed\">inventory_2</span>\n<span>\u2713 Simpan &amp; Buat Item ID Inventaris</span>\n</button>\n</div>\n</div>\n<!-- CONDITIONAL BLOCK B: MISMATCH / REJECTION PANEL (Hidden by Default) -->\n<div class=\"hidden flex-col gap-space-md animate-fadeIn\" id=\"section-tidak-sesuai\">\n<div class=\"p-space-md rounded-xl bg-error-container/40 flex flex-col gap-space-sm\">\n<div class=\"flex items-center gap-2 text-error\">\n<span class=\"material-symbols-outlined text-[24px]\">report_problem</span>\n<span class=\"font-headline-sm text-headline-sm font-bold\">Prosedur Penolakan Serah Terima</span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface\">\n              Jika fisik barang ditolak, tiket pelaporan TM-7F3P9X akan otomatis dibatalkan, dan penemu akan menerima notifikasi penjelasan resmi melalui WhatsApp.\n            </p>\n</div>\n<!-- Rejection Chips Suggestion -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-lg text-label-lg text-on-surface font-semibold\">Pilih Alasan Standar:</label>\n<div class=\"flex flex-wrap gap-2\">\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm transition-colors text-left\" onclick=\"setRejectionReason('Fisik barang yang dibawa penemu berbeda dengan model Sandisk 64GB di laporan')\" type=\"button\">\n                Barang tidak cocok\n              </button>\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm transition-colors text-left\" onclick=\"setRejectionReason('Barang rusak parah / hancur total sehingga nomor seri dan identitas fisik tidak dapat diidentifikasi sama sekali')\" type=\"button\">\n                Barang rusak parah tak teridentifikasi\n              </button>\n<button class=\"px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm transition-colors text-left\" onclick=\"setRejectionReason('Pelapor membatalkan serah terima secara sukarela karena barang ternyata telah diambil langsung')\" type=\"button\">\n                Pelapor batal secara sukarela\n              </button>\n</div>\n</div>\n<!-- Mandatory Explanation Textarea -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-lg text-label-lg text-on-surface font-semibold\">Alasan Penolakan / Ketidaksesuaian *</label>\n<textarea class=\"w-full p-3.5 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm\" id=\"rejection-textarea\" placeholder=\"Jelaskan secara detail ketidaksesuaian fisik barang dengan laporan TM-, alasan penolakan penyerahan, atau barang tidak memenuhi syarat keamanan kampus...\" rows=\"4\"></textarea>\n</div>\n<!-- Reject Action Buttons -->\n<div class=\"flex flex-col sm:flex-row items-center justify-end gap-space-sm pt-space-xs\">\n<button class=\"w-full sm:w-auto px-6 py-2.5 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors\" onclick=\"setInspectionMatch(true)\" type=\"button\">\n              Kembali ke Opsi Sesuai\n            </button>\n<button class=\"w-full sm:w-auto px-7 py-3 rounded-full bg-error text-on-error font-label-lg text-label-lg font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2\" type=\"button\">\n<span class=\"material-symbols-outlined text-[20px]\">block</span>\n<span>\u2715 Tolak Laporan &amp; Batalkan Tiket TM-</span>\n</button>\n</div>\n</div>\n</div>\n</div>\n</div>\n<!-- Bottom Audit & Security Footnote -->\n<div class=\"flex flex-col sm:flex-row items-center justify-between gap-space-sm py-space-sm px-space-md rounded-xl bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.02)] text-on-surface-variant font-body-sm text-body-sm\">\n<div class=\"flex items-center gap-2 text-center sm:text-left\">\n<span class=\"material-symbols-outlined text-[18px] text-secondary shrink-0\">gavel</span>\n<span>Semua aksi penerimaan fisik tercatat dalam audit log terenkripsi UII-SEC. Petugas bertanggung jawab penuh atas kebenaran fisik barang di brankas.</span>\n</div>\n<div class=\"flex items-center gap-4 shrink-0 font-label-sm text-label-sm font-mono\">\n<span>SERVER: GKU-SEC-NODE-01</span>\n<span>ENCRYPTION: AES-256-GCM</span>\n</div>\n</div>\n<!-- Client-Side State Controller Script -->\n<script>\n    function setScreenState(state) {\n      const formView = document.getElementById('main-form-view');\n      const successView = document.getElementById('success-view-container');\n      const walkinView = document.getElementById('walkin-view-container');\n      const btnForm = document.getElementById('toggle-form-btn');\n      const btnSuccess = document.getElementById('toggle-success-btn');\n\n      if (state === 'success') {\n        formView.classList.add('hidden');\n        walkinView.classList.add('hidden');\n        successView.classList.remove('hidden');\n        successView.classList.add('flex');\n\n        btnSuccess.className = \"px-3.5 py-1.5 rounded-full font-label-sm text-label-sm transition-all font-semibold bg-primary text-on-primary shadow-sm flex items-center gap-1.5\";\n        btnForm.className = \"px-3.5 py-1.5 rounded-full font-label-sm text-label-sm transition-all font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low flex items-center gap-1.5\";\n      } else {\n        successView.classList.add('hidden');\n        successView.classList.remove('flex');\n        formView.classList.remove('hidden');\n\n        btnForm.className = \"px-3.5 py-1.5 rounded-full font-label-sm text-label-sm transition-all font-semibold bg-primary text-on-primary shadow-sm flex items-center gap-1.5\";\n        btnSuccess.className = \"px-3.5 py-1.5 rounded-full font-label-sm text-label-sm transition-all font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low flex items-center gap-1.5\";\n      }\n    }\n\n    function switchMode(mode) {\n      const formView = document.getElementById('main-form-view');\n      const walkinView = document.getElementById('walkin-view-container');\n      const successView = document.getElementById('success-view-container');\n      const tabReg = document.getElementById('tab-registered');\n      const tabWalkin = document.getElementById('tab-walkin');\n\n      successView.classList.add('hidden');\n      successView.classList.remove('flex');\n\n      if (mode === 'walkin') {\n        formView.classList.add('hidden');\n        walkinView.classList.remove('hidden');\n        walkinView.classList.add('flex');\n\n        tabWalkin.className = \"flex items-center gap-2 px-4 py-2 rounded-lg font-label-lg text-label-lg transition-all bg-primary text-on-primary shadow-sm\";\n        tabReg.className = \"flex items-center gap-2 px-4 py-2 rounded-lg font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high\";\n      } else {\n        walkinView.classList.add('hidden');\n        walkinView.classList.remove('flex');\n        formView.classList.remove('hidden');\n\n        tabReg.className = \"flex items-center gap-2 px-4 py-2 rounded-lg font-label-lg text-label-lg transition-all bg-primary text-on-primary shadow-sm\";\n        tabWalkin.className = \"flex items-center gap-2 px-4 py-2 rounded-lg font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high\";\n      }\n    }\n\n    function setInspectionMatch(isMatch) {\n      const sectionSesuai = document.getElementById('section-sesuai');\n      const sectionTidakSesuai = document.getElementById('section-tidak-sesuai');\n      const cardTrue = document.getElementById('match-card-true');\n      const cardFalse = document.getElementById('match-card-false');\n\n      if (isMatch) {\n        sectionSesuai.classList.remove('hidden');\n        sectionTidakSesuai.classList.add('hidden');\n        sectionTidakSesuai.classList.remove('flex');\n\n        cardTrue.className = \"cursor-pointer p-space-sm rounded-xl transition-all flex items-start gap-3 bg-primary text-on-primary shadow-sm\";\n        cardFalse.className = \"cursor-pointer p-space-sm rounded-xl transition-all flex items-start gap-3 bg-surface-container-low text-on-surface hover:bg-surface-container-high\";\n        document.querySelector('input[name=\"kesesuaian\"][value=\"sesuai\"]').checked = true;\n      } else {\n        sectionSesuai.classList.add('hidden');\n        sectionTidakSesuai.classList.remove('hidden');\n        sectionTidakSesuai.classList.add('flex');\n\n        cardFalse.className = \"cursor-pointer p-space-sm rounded-xl transition-all flex items-start gap-3 bg-error-container text-on-error-container shadow-sm\";\n        cardTrue.className = \"cursor-pointer p-space-sm rounded-xl transition-all flex items-start gap-3 bg-surface-container-low text-on-surface hover:bg-surface-container-high\";\n        document.querySelector('input[name=\"kesesuaian\"][value=\"tidak_sesuai\"]').checked = true;\n      }\n    }\n\n    function setRejectionReason(text) {\n      const area = document.getElementById('rejection-textarea');\n      if (area) {\n        area.value = text;\n        area.focus();\n      }\n    }\n  </script>\n</div></main></div>";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function PenerimaanBarang({ onNavigate, foundReport, staffSession, onSessionExpired }) {
  const containerRef = useRef(null);
  const intakePhotoRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const cameraButton = Array.from(el.querySelectorAll('button')).find((button) =>
      button.textContent.includes('Buka Kamera Webcam Pos'),
    );
    const photoPreview = cameraButton?.parentElement?.nextElementSibling;
    const photoPreviewImage = photoPreview?.querySelector('img');
    const photoBadge = Array.from(el.querySelectorAll('span')).find((node) =>
      ['Tersedia 1 Foto Resmi', 'Tidak ada foto', 'Foto siap disimpan'].includes(
        node.textContent.trim(),
      ),
    );
    const photoStamp = Array.from(photoPreview?.querySelectorAll('span') || []).find((node) =>
      /^(STAMP:|Tidak ada foto$|Foto diambil )/.test(node.textContent.trim()),
    );
    const photoLabel = Array.from(photoPreview?.querySelectorAll('span') || []).find(
      (node) => {
        const text = node.textContent.trim();
        return (
          text.includes('Foto Etalase Resmi') ||
          ['Tidak ada foto', 'Belum ada foto', 'Foto dokumentasi pos'].includes(text)
        );
      },
    );
    const photoTitle = Array.from(el.querySelectorAll('span')).find((node) =>
      /Foto (Resmi )?Dokumentasi Pos Jaga/.test(node.textContent.trim()),
    );
    const photoInput = document.createElement('input');
    photoInput.type = 'file';
    photoInput.accept = 'image/jpeg,image/png,image/webp';
    photoInput.hidden = true;
    el.appendChild(photoInput);

    let isDisposed = false;
    let cameraStream = null;
    let cameraDialog = null;
    const closeCamera = () => {
      const dialog = cameraDialog;
      if (!dialog) return;
      cameraDialog = null;
      cameraStream?.getTracks().forEach((track) => track.stop());
      cameraStream = null;
      if (dialog.open) dialog.close();
      dialog.remove();
    };

    const setIntakePhoto = async (file) => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Pilih foto berformat JPG, PNG, atau WEBP.');
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        alert('Ukuran foto maksimal 4 MB.');
        return;
      }

      try {
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') resolve(reader.result);
            else reject(new Error('Foto tidak dapat dibaca.'));
          };
          reader.onerror = () => reject(new Error('Foto tidak dapat dibaca.'));
          reader.readAsDataURL(file);
        });

        if (isDisposed) return;
        intakePhotoRef.current = dataUrl;
        if (photoPreviewImage) {
          photoPreviewImage.src = dataUrl;
          photoPreviewImage.alt = 'Foto barang dari petugas satpam';
          photoPreviewImage.hidden = false;
        }
        if (photoBadge) photoBadge.textContent = 'Foto siap disimpan';
        if (photoStamp) {
          photoStamp.textContent = `Foto diambil ${new Date().toLocaleString('id-ID')}`;
        }
        if (photoLabel) photoLabel.textContent = 'Foto dokumentasi pos';
      } catch (error) {
        alert(`Gagal membaca foto: ${error.message}`);
      }
    };

    const handlePhotoInput = () => {
      const file = photoInput.files?.[0];
      photoInput.value = '';
      if (file) void setIntakePhoto(file);
    };
    photoInput.addEventListener('change', handlePhotoInput);

    if (photoPreviewImage) {
      photoPreviewImage.removeAttribute('src');
      photoPreviewImage.removeAttribute('data-alt');
      photoPreviewImage.alt = 'Tidak ada foto';
      photoPreviewImage.hidden = true;
    }
    if (photoBadge) photoBadge.textContent = 'Tidak ada foto';
    if (photoStamp) photoStamp.textContent = 'Tidak ada foto';
    if (photoLabel) photoLabel.textContent = 'Tidak ada foto';
    if (photoTitle) photoTitle.textContent = 'Foto Dokumentasi Pos Jaga (Opsional)';

    if (foundReport && el.dataset.reportId !== foundReport.report_id) {
      const formatDateTime = (value) => {
        const date = new Date(value);
        return Number.isNaN(date.getTime())
          ? '-'
          : date.toLocaleString('id-ID', {
              dateStyle: 'medium',
              timeStyle: 'short',
              timeZone: 'Asia/Jakarta',
            }) + ' WIB';
      };
      const textNodes = el.ownerDocument.createTreeWalker(el, window.NodeFilter.SHOW_TEXT);
      let textNode;
      while ((textNode = textNodes.nextNode())) {
        if (textNode.nodeValue.includes('TM-7F3P9X')) {
          textNode.nodeValue = textNode.nodeValue.replaceAll('TM-7F3P9X', foundReport.report_id);
        }
      }

      const setLabeledValue = (labelText, value) => {
        const label = Array.from(el.querySelectorAll('span')).find(
          (node) => node.textContent.trim() === labelText,
        );
        const valueContainer = label && Array.from(label.parentElement.children).find(
          (child) => child !== label,
        );
        if (!valueContainer) return;

        const valueNode = valueContainer.querySelector('.font-body-md, .font-label-lg') || valueContainer;
        valueNode.textContent = value || '-';
      };

      setLabeledValue('Kategori Barang', foundReport.category_name);
      setLabeledValue(
        'Nama / Model',
        foundReport.item_name || foundReport.description || foundReport.category_name,
      );
      setLabeledValue('Warna Dominan', foundReport.color_label || foundReport.color);
      setLabeledValue('Lokasi Ditemukan', foundReport.location_name);
      setLabeledValue('Waktu Ditemukan', formatDateTime(foundReport.found_at));
      setLabeledValue('Waktu Lapor Daring', formatDateTime(foundReport.created_at));
      setLabeledValue('Nama Pelapor:', foundReport.finder_name);
      setLabeledValue('Kontak WhatsApp:', foundReport.finder_whatsapp);
      setLabeledValue('Catatan Khusus Penemu', foundReport.description);
      setLabeledValue(
        'Unggahan Pelapor:',
        foundReport.photo_key ? foundReport.photo_key.split(/[\\/]/).pop() : 'Tidak ada foto tersimpan',
      );

      const colorLabel = Array.from(el.querySelectorAll('span')).find(
        (node) => node.textContent.trim() === 'Warna Dominan',
      );
      const colorValue = colorLabel?.parentElement?.querySelector('span.w-3');
      colorValue?.parentElement?.querySelectorAll('span.w-3').forEach((node) => node.remove());

      const sourceLabel = Array.from(el.querySelectorAll('span')).find((node) =>
        node.textContent.trim().startsWith('Pos Jaga Tujuan:'),
      );
      if (sourceLabel) {
        sourceLabel.textContent = `Sumber laporan: ${
          foundReport.source === 'pos' ? 'Pos Satpam' : 'Daring'
        }`;
      }

      ['Status Civitas:', 'Pilihan Hak Barang (Jika 90 Hari Tak Diambil):'].forEach((labelText) => {
        const label = Array.from(el.querySelectorAll('span')).find(
          (node) => node.textContent.trim() === labelText,
        );
        if (label) label.parentElement.remove();
      });

      const reportInputs = [
        ['input[placeholder^="Masukkan nama sesuai"]', foundReport.finder_name],
        ['input[placeholder^="Contoh: 0812"]', foundReport.finder_whatsapp],
        ['input[placeholder^="Contoh: Musholla"]', foundReport.location_name],
        [
          'input[placeholder^="Contoh: Dompet"]',
          foundReport.item_name || foundReport.description || foundReport.category_name,
        ],
      ];
      reportInputs.forEach(([selector, value]) => {
        const input = el.querySelector(selector);
        if (input) {
          input.value = value || '';
          input.readOnly = true;
        }
      });

      const secretNote = el.querySelector('#section-sesuai input[type="text"]');
      if (secretNote) {
        secretNote.value = foundReport.description || '';
        secretNote.readOnly = true;
      }

      const images = el.querySelectorAll('img');
      const photoKey = foundReport.photo_key;
      if (images[0]) {
        images[0].alt = `${foundReport.item_name || foundReport.description || 'Barang temuan'} dari laporan ${foundReport.report_id}`;
        if (photoKey && /^https?:\/\//i.test(photoKey)) {
          images[0].src = photoKey;
        } else {
          images[0].hidden = true;
        }
      }
      if (images[1]) images[1].hidden = true;

      const itemStatus = Array.from(el.querySelectorAll('span')).find(
        (node) => node.textContent.trim() === 'Menunggu Penyerahan Fisik',
      );
      if (itemStatus) itemStatus.textContent = foundReport.status;
      const deadline = Array.from(el.querySelectorAll('span')).find(
        (node) => node.textContent.trim() === '01:14:18',
      );
      if (deadline) {
        const remainingSeconds = Math.max(
          0,
          Math.floor((new Date(foundReport.expires_at).getTime() - Date.now()) / 1000),
        );
        deadline.textContent = Number.isFinite(remainingSeconds)
          ? `${Math.floor(remainingSeconds / 3600)}j ${Math.floor((remainingSeconds % 3600) / 60)}m`
          : '-';
      }
      const reportStatus = Array.from(el.querySelectorAll('span')).find(
        (node) => node.textContent.trim() === 'Aktif',
      );
      if (reportStatus) reportStatus.textContent = foundReport.status;

      const inspectionSelects = el.querySelectorAll('#section-sesuai select');
      const normalCondition = inspectionSelects[0]?.querySelector('option');
      if (normalCondition) normalCondition.textContent = 'Baik / Berfungsi Normal';
      [
        [inspectionSelects[0], 'Pilih kondisi setelah pemeriksaan fisik'],
        [inspectionSelects[1], 'Pilih lokasi rak penyimpanan'],
      ].forEach(([select, placeholder]) => {
        if (!select) return;
        const option = el.ownerDocument.createElement('option');
        option.value = '';
        option.textContent = placeholder;
        option.disabled = true;
        option.selected = true;
        select.insertBefore(option, select.firstChild);
        select.required = true;
        select.value = '';
      });

      const accessoryLabel = Array.from(el.querySelectorAll('span')).find(
        (node) => node.textContent.trim() === 'Kelengkapan Tambahan Fisik Ditemukan:',
      );
      accessoryLabel?.parentElement.remove();
      el.dataset.reportId = foundReport.report_id;
    }

    const handleClick = (e) => {
      const target = e.target.closest('a, button, [data-path], [data-action], tr, [role="button"], label');
      if (!target) return;

      const path = (target.getAttribute('data-path') || target.getAttribute('href') || '').trim();
      const action = (target.getAttribute('data-action') || '').trim();
      const title = (target.getAttribute('title') || '').toLowerCase();
      const text = (target.textContent || '').trim();
      const lowerText = text.toLowerCase();

      if (lowerText.includes('kirim bukti whatsapp ke penemu')) {
        e.preventDefault();
        if (!foundReport?.report_id) {
          alert('Nomor laporan tidak tersedia untuk mengirim bukti penerimaan.');
          return;
        }
        if (target.dataset.receiptSent === 'true' || target.disabled) return;

        target.disabled = true;
        fetch(
          `${API_BASE_URL}/v1/staff/found-reports/${encodeURIComponent(
            foundReport.report_id,
          )}/receipt/send`,
          {
            method: 'POST',
            credentials: 'include',
            headers: staffSession?.csrf_token ? { 'X-CSRF-Token': staffSession.csrf_token } : {},
          },
        )
          .then(async (response) => {
            if (response.status === 401 && onSessionExpired) {
              onSessionExpired();
              throw new Error('Sesi berakhir, silakan login kembali.');
            }
            const result = await response.json().catch(() => ({}));
            if (!response.ok) {
              throw new Error(result.error || 'Gagal mengirim bukti penerimaan.');
            }
            target.dataset.receiptSent = 'true';
            target.textContent = 'Bukti WhatsApp Terkirim';
            alert('Bukti penerimaan berhasil dikirim ke WhatsApp pelapor.');
          })
          .catch((error) => {
            alert(`Pengiriman bukti gagal: ${error.message}`);
          })
          .finally(() => {
            if (target.isConnected && target.dataset.receiptSent !== 'true') {
              target.disabled = false;
            }
          });
        return;
      }

      if (lowerText.includes('buka kamera webcam pos')) {
        e.preventDefault();
        if (!navigator.mediaDevices?.getUserMedia) {
          alert('Kamera tidak tersedia di browser ini. Gunakan tombol unggah foto.');
          return;
        }
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false })
          .then((stream) => {
            if (isDisposed) {
              stream.getTracks().forEach((track) => track.stop());
              return;
            }
            cameraStream = stream;
            const dialog = document.createElement('dialog');
            dialog.className = 'm-auto w-[min(92vw,48rem)] rounded-2xl bg-surface p-4 shadow-xl';
            const content = document.createElement('div');
            content.className = 'flex flex-col gap-4';
            const title = document.createElement('h2');
            title.className = 'font-headline-md text-headline-md';
            title.textContent = 'Ambil Foto Barang';
            const video = document.createElement('video');
            video.autoplay = true;
            video.playsInline = true;
            video.muted = true;
            video.className = 'max-h-[65vh] w-full rounded-xl bg-black object-contain';
            video.srcObject = stream;
            const actions = document.createElement('div');
            actions.className = 'flex justify-end gap-2';
            const cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.className = 'rounded-lg px-4 py-2 font-semibold';
            cancelButton.textContent = 'Batal';
            cancelButton.addEventListener('click', closeCamera);
            const captureButton = document.createElement('button');
            captureButton.type = 'button';
            captureButton.className = 'rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary';
            captureButton.textContent = 'Ambil Foto';
            captureButton.addEventListener('click', () => {
              if (!video.videoWidth || !video.videoHeight) {
                alert('Kamera belum siap. Coba lagi sebentar.');
                return;
              }
              const scale = Math.min(1, 1600 / video.videoWidth);
              const canvas = document.createElement('canvas');
              canvas.width = Math.round(video.videoWidth * scale);
              canvas.height = Math.round(video.videoHeight * scale);
              const context = canvas.getContext('2d');
              if (!context) {
                alert('Browser tidak dapat memproses foto kamera.');
                return;
              }
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              canvas.toBlob(
                (blob) => {
                  if (!blob) {
                    alert('Gagal mengambil foto dari kamera.');
                    return;
                  }
                  void setIntakePhoto(
                    new File([blob], `foto-barang-${Date.now()}.jpg`, { type: 'image/jpeg' }),
                  ).then(closeCamera);
                },
                'image/jpeg',
                0.82,
              );
            });
            actions.append(cancelButton, captureButton);
            content.append(title, video, actions);
            dialog.append(content);
            dialog.addEventListener('close', closeCamera, { once: true });
            cameraDialog = dialog;
            document.body.append(dialog);
            dialog.showModal();
          })
          .catch((error) => {
            if (!isDisposed) alert(`Kamera tidak dapat dibuka: ${error.message}`);
          });
        return;
      }

      if (lowerText.includes('unggah file foto')) {
        e.preventDefault();
        photoInput.click();
        return;
      }

      if (lowerText.includes('periksa laporan lain')) {
        e.preventDefault();
        if (onNavigate) onNavigate('satpam_antrean');
        return;
      }

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
            textarea.value = foundReport
              ? `Fisik barang berbeda dengan rincian ${
                  foundReport.item_name || foundReport.description
                } pada laporan ${foundReport.report_id}.`
              : 'Fisik barang berbeda dengan rincian pada laporan temuan.';
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
        if (!foundReport?.report_id) {
          alert('Pilih laporan dari antrean penerimaan terlebih dahulu.');
          if (onNavigate) onNavigate('satpam_antrean');
          return;
        }

        const storageSelects = el.querySelectorAll('#section-sesuai select');
        const storageSelect = storageSelects[storageSelects.length - 1];
        const storageRack = storageSelect?.selectedOptions[0]?.textContent.trim();
        const conditionSelect = storageSelects[0];
        const condition = conditionSelect?.selectedOptions[0]?.textContent.trim();
        if (!storageSelect?.value) {
          alert('Pilih lokasi penyimpanan barang.');
          return;
        }
        if (!conditionSelect?.value) {
          alert('Pilih kondisi fisik barang.');
          return;
        }

        fetch(`${API_BASE_URL}/v1/staff/found-reports/${encodeURIComponent(foundReport.report_id)}/receive`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(staffSession?.csrf_token ? { 'X-CSRF-Token': staffSession.csrf_token } : {}),
          },
          body: JSON.stringify({
            storage_rack: storageRack,
            condition,
            intake_photo: intakePhotoRef.current || '',
          }),
        })
          .then(async (response) => {
            if (response.status === 401 && onSessionExpired) {
              onSessionExpired();
              throw new Error('Sesi berakhir, silakan login kembali.');
            }
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.error || 'Gagal menyimpan penerimaan barang.');

            const successView = el.querySelector('#success-view-container');
            const formView = el.querySelector('#main-form-view');
            formView?.classList.add('hidden');
            if (successView) {
              successView.classList.remove('hidden');
              successView.classList.add('flex');
              const itemID = successView.querySelector('.select-all');
              if (itemID) itemID.textContent = result.item_id;
              const reportID = successView.querySelector('strong.text-on-surface');
              if (reportID) reportID.textContent = foundReport.report_id;
              const rack = successView.querySelector('.font-headline-md.text-headline-md');
              const rackName = storageRack.split(' (')[0];
              if (rack) rack.textContent = rackName;

              const successTextNodes = el.ownerDocument.createTreeWalker(
                successView,
                window.NodeFilter.SHOW_TEXT,
              );
              let successTextNode;
              while ((successTextNode = successTextNodes.nextNode())) {
                if (successTextNode.nodeValue.includes('Locker GKU-A04')) {
                  successTextNode.nodeValue = successTextNode.nodeValue.replaceAll(
                    'Locker GKU-A04',
                    rackName,
                  );
                }
              }

              const auditReference = Array.from(successView.querySelectorAll('span')).find(
                (node) => node.textContent.includes('Audit Ref #SEC-LOG-88190'),
              );
              if (auditReference) auditReference.textContent = 'Penerimaan barang tersimpan';

              const receiverName = Array.from(successView.querySelectorAll('span')).find(
                (node) => node.textContent.trim() === 'Bripka Hendra Kurniawan',
              );
              if (receiverName) {
                receiverName.textContent = result.received_by_name || 'Petugas Satpam';
                const receiverRole = receiverName.parentElement?.querySelector('.font-body-sm');
                if (receiverRole) receiverRole.textContent = 'Petugas penerima';
              }
            }
          })
          .catch((error) => alert(`Penerimaan gagal: ${error.message}`));
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
    return () => {
      isDisposed = true;
      el.removeEventListener('click', handleClick);
      photoInput.removeEventListener('change', handlePhotoInput);
      photoInput.remove();
      closeCamera();
      intakePhotoRef.current = null;
    };
  }, [onNavigate, foundReport]);

  return (
    <div
      ref={containerRef}
      className="bg-surface font-body-md text-on-surface antialiased min-h-screen"
      dangerouslySetInnerHTML={{ __html: rawHTML }}
    />
  );
}
