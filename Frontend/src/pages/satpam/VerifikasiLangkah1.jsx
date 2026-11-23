import React, { useEffect, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const readAPIResponse = async (response) => {
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('Respons server tidak valid.');
  }

  if (!response.ok) {
    throw new Error(result.error || `Permintaan gagal (HTTP ${response.status}).`);
  }

  return result;
};

const normalizeItemStatus = (status) =>
  String(status || '').trim().toLowerCase().replace(/[\s-]+/g, '_');

// Layar Stitch Portal Satpam: Verifikasi Kepemilikan (Langkah 1: Cari Barang & Identitas) - Portal Satpam UII
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto\"><div class=\"flex flex-col\"><div class=\"p-gutter pb-space-sm flex items-center gap-space-sm\"><div class=\"w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm\"><span class=\"material-symbols-outlined text-secondary-fixed\">verified_user</span></div><div class=\"flex flex-col min-w-0\"><span class=\"font-headline-sm text-headline-sm text-on-surface truncate tracking-tight\">Lost &amp; Found UII</span><span class=\"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider\">PORTAL SATPAM KAMPUS</span></div></div><div class=\"px-gutter py-space-xs\"><div class=\"h-px bg-surface-container-high w-full\"></div></div><div class=\"px-space-sm py-space-xs\"><span class=\"px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block\">Navigasi Utama</span></div><nav class=\"flex flex-col gap-1 px-space-sm\" data-active-classes=\"bg-primary text-on-primary font-label-lg shadow-sm\">\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">dashboard</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"penerimaan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">move_to_inbox</span>\n    <span>Penerimaan</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"barang\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">inventory_2</span>\n    <span>Barang</span>\n  </a>\n  <a class=\"flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"hasil-matching\" href=\"#\">\n    <div class=\"flex items-center gap-space-sm\">\n      <span class=\"material-symbols-outlined text-[20px]\">auto_awesome</span>\n      <span>Hasil Matching</span>\n    </div>\n    <span class=\"px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm\">AI</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors bg-primary text-on-primary font-label-lg shadow-sm font-semibold cursor-pointer\" data-path=\"verifikasi\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Verifikasi</span>\n  </a>\n  <a class=\"flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg cursor-pointer\" data-path=\"laporan-kehilangan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">receipt_long</span>\n    <span>Laporan Kehilangan</span>\n  </a>\n</nav></div><div class=\"p-space-sm flex flex-col gap-space-sm\"><div class=\"bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1\"><div class=\"flex items-center gap-2\"><span class=\"w-2.5 h-2.5 rounded-full bg-secondary animate-pulse\"></span><span class=\"font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider\">Pos Jaga Aktif</span></div><p class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Posko Induk GKU</p><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Shift Siang (07:00 - 15:30 WIB)</span></div><div class=\"px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm\"><span class=\"flex items-center gap-1\"><span class=\"material-symbols-outlined text-[16px]\">contact_support</span> BSI Helpdesk: x102</span><span>v2.4.0</span></div></div><!-- Portal Publik Shortcut Button -->\n<div class=\"px-space-sm pt-2\">\n  <button data-path=\"portal-publik\" class=\"w-full py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">logout</span>\n    <span>Kembali ke Portal Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72\"><header class=\"fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter\"><div class=\"flex items-center gap-gutter flex-1 max-w-xl\"><div class=\"relative w-full\"><span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">search</span><input class=\"w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/40 shadow-sm transition-all\" placeholder=\"Cari nomor tiket TM- / HL- / nama barang...\" type=\"text\"/></div></div><div class=\"flex items-center gap-space-md shrink-0\"><div class=\"hidden xl:flex flex-col text-right\"><span class=\"font-label-lg text-label-lg text-on-surface\">Kamis, 24 Oktober 2024</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Pukul 11:42 WIB</span></div><div class=\"hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold\"><span class=\"material-symbols-outlined text-[16px]\">shield</span><span>Status Siaga 1</span></div><div class=\"h-8 w-px bg-surface-container-high hidden sm:block\"></div><div class=\"flex items-center gap-space-sm\"><div class=\"flex flex-col text-right hidden md:block\"><span class=\"font-label-lg text-label-lg text-on-surface truncate font-semibold\">Bripka Hendra Kurniawan</span><span class=\"font-body-sm text-body-sm text-on-surface-variant\">Petugas Pos Jaga Induk GKU (SEC-042)</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors ml-1\" data-path=\"login\" href=\"#\" title=\"Keluar Portal\"><span class=\"material-symbols-outlined text-[20px]\">logout</span></a></div></div></header><main class=\"w-full pt-16 bg-surface min-h-screen px-gutter py-space-lg\"><div class=\"flex flex-col w-full\">\n<!-- Stepper & Wizard Header -->\n<div class=\"flex flex-col gap-space-sm mb-space-md\">\n<div class=\"flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2 mb-1\">\n<span class=\"inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold tracking-wide uppercase\">\n<span class=\"material-symbols-outlined text-[14px]\">verified</span>\n            SOP No. 04/SK-BSI/2024\n          </span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant font-mono\">SEC-VRF-4019</span>\n</div>\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold\">Verifikasi Kepemilikan Barang</h1>\n<p class=\"font-body-md text-body-md text-on-surface-variant max-w-3xl mt-0.5\">\n          Proses verifikasi identitas pemohon dan pencocokan kepemilikan fisik tatap muka di pos jaga sebelum serah terima resmi.\n        </p>\n</div>\n<!-- Quick Session Indicator -->\n<div class=\"flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-sm border border-outline-variant/30 self-start sm:self-auto\">\n<div class=\"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary\">\n<span class=\"material-symbols-outlined text-[20px]\">videocam</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm font-semibold text-on-surface\">Kamera Jaga #02 Aktif</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Audit Visual Sinkron</span>\n</div>\n</div>\n</div>\n<!-- Stepper Navigation 4 Langkah -->\n<div class=\"bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] mt-2\">\n<div class=\"grid grid-cols-1 md:grid-cols-4 gap-2\">\n<!-- Step 1 (Active) -->\n<div class=\"flex items-center gap-3 p-3 rounded-lg bg-primary text-on-primary shadow-sm transition-all\">\n<div class=\"w-8 h-8 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md flex items-center justify-center shrink-0 font-bold shadow-sm\">\n            1\n          </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm text-secondary-fixed font-semibold tracking-wide uppercase\">Langkah 1 (Aktif)</span>\n<span class=\"font-label-lg text-label-lg font-bold truncate\">Cari Barang &amp; Identitas</span>\n</div>\n</div>\n<!-- Step 2 -->\n<div class=\"flex items-center gap-3 p-3 rounded-lg bg-surface-container-low text-on-surface-variant transition-all hover:bg-surface-container\">\n<div class=\"w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-label-md flex items-center justify-center shrink-0 font-semibold\">\n            2\n          </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-medium\">Langkah Berikutnya</span>\n<span class=\"font-label-lg text-label-lg font-semibold truncate text-on-surface\">Validasi Identitas</span>\n</div>\n</div>\n<!-- Step 3 -->\n<div class=\"flex items-center gap-3 p-3 rounded-lg bg-surface-container-low text-on-surface-variant transition-all hover:bg-surface-container\">\n<div class=\"w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-label-md flex items-center justify-center shrink-0 font-semibold\">\n            3\n          </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-medium\">Langkah 3</span>\n<span class=\"font-label-lg text-label-lg font-semibold truncate text-on-surface\">Bandingkan Ciri Khusus</span>\n</div>\n</div>\n<!-- Step 4 -->\n<div class=\"flex items-center gap-3 p-3 rounded-lg bg-surface-container-low text-on-surface-variant transition-all hover:bg-surface-container\">\n<div class=\"w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-label-md flex items-center justify-center shrink-0 font-semibold\">\n            4\n          </div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-medium\">Langkah Akhir</span>\n<span class=\"font-label-lg text-label-lg font-semibold truncate text-on-surface\">Serah Terima &amp; BAST</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n<!-- Main Grid Content Area -->\n<div class=\"grid grid-cols-1 xl:grid-cols-12 gap-space-md\">\n<!-- Left Column: Search & Item Information (7 Cols) -->\n<div class=\"xl:col-span-7 flex flex-col gap-space-md\">\n<!-- Section 1: Pencarian Barang & Quick Selection -->\n<div class=\"bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-sm\">\n<div class=\"flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-secondary text-[22px]\">manage_search</span>\n<h2 class=\"font-headline-sm text-headline-sm text-on-surface font-semibold\">Pencarian Barang Inventaris Pos</h2>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Database Sinkron Real-time</span>\n</div>\n<!-- Input and Search Button -->\n<div class=\"flex flex-col sm:flex-row gap-2 mt-1\">\n<div class=\"relative flex-1\">\n<span class=\"material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]\">qr_code_scanner</span>\n<input class=\"w-full h-11 pl-11 pr-10 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all\" id=\"itemSearchInput\" placeholder=\"Masukkan Item ID (contoh: BRG-2024-0142) atau Nomor Laporan (HL-88219)...\" type=\"text\" value=\"BRG-2024-0142\"/>\n<button class=\"absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors\" onclick=\"document.getElementById('itemSearchInput').value=''\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">close</span>\n</button>\n</div>\n<button class=\"h-11 px-5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-on-surface transition-all shadow-sm shrink-0\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">search</span>\n<span>Cari Barang</span>\n</button>\n</div>\n<!-- Quick Matching Chips -->\n<div class=\"flex flex-wrap items-center gap-2 pt-1\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-medium\">Kandidat Teratas:</span>\n<button class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold hover:bg-secondary hover:text-on-secondary transition-all shadow-xs\" onclick=\"setValidState()\" type=\"button\">\n<span class=\"material-symbols-outlined text-[14px]\">bolt</span>\n<span>BRG-2024-0142 (Flashdisk Sandisk 64GB - HL-88219)</span>\n</button>\n<button class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-medium hover:bg-surface-dim transition-all\" onclick=\"setBlockedState()\" type=\"button\">\n<span class=\"material-symbols-outlined text-[14px]\">lock</span>\n<span>BRG-2024-0115 (Ditahan BSI)</span>\n</button>\n</div>\n</div>\n<!-- Simulation State Switcher (Demo Interactive) -->\n<div class=\"bg-surface-container-low p-3 rounded-lg flex items-center justify-between gap-3\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-on-surface-variant text-[18px]\">tune</span>\n<span class=\"font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider\">Simulasi Status Barang:</span>\n</div>\n<div class=\"flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg shadow-xs\">\n<button class=\"px-3 py-1 rounded text-label-sm font-label-sm font-semibold bg-primary text-on-primary shadow-xs transition-all flex items-center gap-1\" id=\"btnStateValid\" onclick=\"setValidState()\" type=\"button\">\n<span class=\"w-2 h-2 rounded-full bg-emerald-400\"></span>\n<span>Tersedia (Normal)</span>\n</button>\n<button class=\"px-3 py-1 rounded text-label-sm font-label-sm font-medium text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1\" id=\"btnStateBlocked\" onclick=\"setBlockedState()\" type=\"button\">\n<span class=\"w-2 h-2 rounded-full bg-error\"></span>\n<span>Ditahan / Error</span>\n</button>\n</div>\n</div>\n<!-- State 1: VALID ITEM CARD -->\n<div class=\"bg-surface-container-lowest rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col transition-all\" id=\"validItemCard\">\n<!-- Card Header -->\n<div class=\"p-space-md bg-surface-container-low/60 flex flex-wrap items-center justify-between gap-space-sm\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-surface-container-lowest text-secondary flex items-center justify-center font-headline-sm font-bold shadow-sm\">\n<span class=\"material-symbols-outlined text-[24px]\">usb</span>\n</div>\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-headline-sm text-headline-sm font-bold text-on-surface\">BRG-2024-0142</span>\n<span class=\"px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-semibold flex items-center gap-1\">\n<span class=\"w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse\"></span>\n                  Barang Ditemukan (Di Brankas)\n                </span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Laporan Temuan Ref: TM-7F3P9X \u2022 Tiket Kehilangan: HL-88219</span>\n</div>\n</div>\n<div class=\"flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-xs text-on-surface font-label-sm text-label-sm font-semibold\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">inventory_2</span>\n<span>Locker GKU-A04 (Posko Induk)</span>\n</div>\n</div>\n<!-- Card Body with Image & Details -->\n<div class=\"p-space-md grid grid-cols-1 sm:grid-cols-12 gap-space-md\">\n<!-- Thumbnail & Documentation -->\n<div class=\"sm:col-span-4 flex flex-col gap-2\">\n<div class=\"relative rounded-lg overflow-hidden bg-surface-container aspect-4/3 shadow-sm group\">\n<img class=\"w-full h-full object-cover\" data-alt=\"A macro studio photograph of a compact black and red Sandisk Cruzer Blade USB flash drive resting on a dark slate verification tray under clear security post lighting, crisp texture and subtle scratches documented with high fidelity, institutional archive aesthetic with neutral tones.\" src=\"https://lh3.googleusercontent.com/aida-public/AB6AXuCdeUzKutNeK-TDgVC6lqSAyZVsQvm2U1tJX4O4W38_ZtJ9TjWs95SUl8A5hrYz1VyHsEal01FRJwUU796fy7iJuzr5GdstCwfIwJ7aoZnrfNu0XoCOi3cwgQFaojdIF_C1XgRpvdioZCDqXq47ejYcmkgUanNMgFcuxGtnd39a0yrW2JdgMkM0DmkSXkL9zlHPebwOOB0pvxMh4TdXhor_FXKMWq3klJFm-a0zc3k\"/>\n<span class=\"absolute top-2 left-2 px-2 py-0.5 rounded bg-on-surface/80 backdrop-blur-md text-on-primary font-label-sm text-label-sm font-medium flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px]\">photo_camera</span>\n                Webcam Pos Induk\n              </span>\n<div class=\"absolute bottom-2 right-2 px-2 py-0.5 rounded bg-surface-container-lowest/90 text-on-surface font-label-sm text-label-sm font-mono text-[10px]\">\n                20/11/24 15:12\n              </div>\n</div>\n<div class=\"flex items-center justify-between px-1\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">ID Fisik Tag: #TAG-0982</span>\n<a class=\"font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-0.5\" href=\"#\">\n<span>Perbesar Foto</span>\n<span class=\"material-symbols-outlined text-[14px]\">open_in_full</span>\n</a>\n</div>\n</div>\n<!-- Item Metadata Attributes -->\n<div class=\"sm:col-span-8 flex flex-col justify-between\">\n<div class=\"flex flex-col gap-2.5\">\n<div>\n<span class=\"font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider\">Elektronik &amp; Aksesoris</span>\n<h3 class=\"font-headline-sm text-headline-sm font-bold text-on-surface\">Flashdisk Sandisk Cruzer Blade 64GB</h3>\n</div>\n<div class=\"grid grid-cols-2 gap-x-4 gap-y-2 py-2\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Warna &amp; Tekstur</span>\n<div class=\"flex items-center gap-1.5 mt-0.5\">\n<span class=\"w-3 h-3 rounded-full bg-red-600 inline-block\"></span>\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium\">Merah - Hitam Doff</span>\n</div>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Kondisi Fisik</span>\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium mt-0.5\">Baik / Normal (Tutup Utuh)</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Waktu Penerimaan</span>\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium mt-0.5\">20 Nov 2024, 15:10 WIB</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Petugas Penerima</span>\n<span class=\"font-body-sm text-body-sm text-on-surface font-medium mt-0.5 truncate\">Bripka Hendra K. (SEC-042)</span>\n</div>\n</div>\n</div>\n<!-- Lokasi Penemuan -->\n<div class=\"p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2.5 mt-2\">\n<span class=\"material-symbols-outlined text-secondary text-[20px] shrink-0\">pin_drop</span>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm font-semibold text-on-surface\">Lokasi Ditemukan</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant truncate\">Meja Dosen Lab Komputer 3.2, Gedung FTI Kampus Terpadu UII</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n<!-- State 2: BLOCKING ERROR CARD (Hidden by default, shown via simulation) -->\n<div class=\"hidden bg-error-container/40 p-space-md rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-sm border-l-4 border-error\" id=\"blockedItemCard\">\n<div class=\"flex items-start gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm\">\n<span class=\"material-symbols-outlined text-[24px]\">block</span>\n</div>\n<div class=\"flex flex-col flex-1\">\n<div class=\"flex items-center gap-2\">\n<span class=\"font-headline-sm text-headline-sm font-bold text-on-error-container\">Tidak Dapat Diproses (Barang Ditahan / Terkunci)</span>\n<span class=\"px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm font-bold uppercase\">Restricted</span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface mt-1\">\n              Barang dengan ID <strong>BRG-2024-0115</strong> berstatus <strong>DITAHAN</strong> untuk penyelidikan lanjutan oleh Kepala Pengamanan Badan Sistem Informasi (BSI). Verifikasi klaim dan serah terima tidak diizinkan untuk item ini tanpa otorisasi tertulis komandan regu.\n            </p>\n</div>\n</div>\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 bg-surface-container-lowest/80 p-3 rounded-lg\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Alasan Penahanan:</span>\n<span class=\"font-body-sm text-body-sm font-semibold text-error\">Investigasi Pelanggaran Integritas Data Akademik</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Penanggung Jawab Penahanan:</span>\n<span class=\"font-body-sm text-body-sm font-medium text-on-surface\">Kompol Agus Santoso (Kasi Pam BSI)</span>\n</div>\n</div>\n<div class=\"flex items-center justify-between pt-2\">\n<span class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[16px]\">info</span>\n            Segera hubungi Posko Komando untuk konfirmasi eskalasi.\n          </span>\n<button class=\"px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant font-label-md text-label-md cursor-not-allowed opacity-60\" disabled=\"\" type=\"button\">\n            Aksi Dikunci Petugas\n          </button>\n</div>\n</div>\n<!-- Section 3: Prior-Failed-Claims Warning Banner (Anomali Klaim Sebelumnya) -->\n<div class=\"bg-amber-50 p-space-md rounded-xl shadow-sm flex flex-col gap-2.5\" id=\"anomalyWarningCard\">\n<div class=\"flex items-start gap-3\">\n<div class=\"w-9 h-9 rounded-lg bg-amber-500 text-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm\">\n<span class=\"material-symbols-outlined text-[22px]\">warning</span>\n</div>\n<div class=\"flex flex-col flex-1\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-headline-sm text-headline-sm font-bold text-amber-950\">Peringatan Anomali Pos Jaga: 1 Riwayat Klaim Gagal</span>\n<span class=\"px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-label-sm text-label-sm font-bold\">Perhatian Khusus</span>\n</div>\n<p class=\"font-body-md text-body-md text-amber-900 mt-1\">\n              Pada <strong>22 Nov 2024, 09:15 WIB</strong>, pemohon an. <strong>Rendy S. (NIM: 20523***)</strong> <span class=\"font-semibold text-error\">gagal</span> menyebutkan kapasitas partisi folder dan ciri goresan rahasia pada stiker casing.\n            </p>\n</div>\n</div>\n<div class=\"p-3 bg-white/80 rounded-lg flex items-center justify-between text-amber-900 mt-1\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-amber-600 text-[18px]\">gavel</span>\n<span class=\"font-body-sm text-body-sm font-medium\">Instruksi Satpam: Lakukan pengujian detail folder \"SKRIPSI_FINAL\" dan 4 digit identitas fisik.</span>\n</div>\n<span class=\"font-label-sm text-label-sm font-bold text-amber-800\">Tingkat Kewaspadaan: Tinggi</span>\n</div>\n</div>\n<!-- Trust & Physical Evidence Visual Strip -->\n<div class=\"grid grid-cols-3 gap-3\">\n<div class=\"bg-surface-container-lowest p-3 rounded-xl shadow-xs flex items-center gap-3\">\n<div class=\"w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[20px]\">badge</span>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm font-bold text-on-surface truncate\">KTM Asli Wajib</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant truncate\">Cek hologram resmi</span>\n</div>\n</div>\n<div class=\"bg-surface-container-lowest p-3 rounded-xl shadow-xs flex items-center gap-3\">\n<div class=\"w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[20px]\">person_check</span>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm font-bold text-on-surface truncate\">Tatap Muka Pos</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant truncate\">Sesuai wajah pemohon</span>\n</div>\n</div>\n<div class=\"bg-surface-container-lowest p-3 rounded-xl shadow-xs flex items-center gap-3\">\n<div class=\"w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0\">\n<span class=\"material-symbols-outlined text-[20px]\">description</span>\n</div>\n<div class=\"flex flex-col min-w-0\">\n<span class=\"font-label-sm text-label-sm font-bold text-on-surface truncate\">BAST Digital</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant truncate\">Tanda tangan elektronik</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Right Column: Applicant Presence & Identity Verification Form (5 Cols) -->\n<div class=\"xl:col-span-5 flex flex-col gap-space-md\">\n<!-- Section 4: Formulir Identitas Pemohon Hadir di Pos -->\n<div class=\"bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-sm h-full justify-between\">\n<div class=\"flex flex-col gap-space-sm\">\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between\">\n<h2 class=\"font-headline-sm text-headline-sm font-bold text-on-surface\">Data Identitas Pemohon Hadir</h2>\n<span class=\"w-2.5 h-2.5 rounded-full bg-emerald-500\"></span>\n</div>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">\n              Wajib diperiksa langsung dari kartu identitas fisik asli yang ditunjukkan pemohon di meja pos jaga.\n            </p>\n</div>\n<!-- Privacy Protection Callout Badge -->\n<div class=\"p-3 rounded-lg bg-surface-container-low flex items-start gap-2.5\">\n<span class=\"material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5\">privacy_tip</span>\n<div class=\"flex flex-col\">\n<span class=\"font-label-sm text-label-sm font-bold text-on-surface\">Tanpa Foto KTP / KTM (Kebijakan Privasi UII)</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant leading-relaxed\">\n                Hanya periksa keaslian fisik dan simpan 4 digit terakhir nomor identitas demi keamanan data mahasiswa/dosen.\n              </span>\n</div>\n</div>\n<!-- Form Fields -->\n<form class=\"flex flex-col gap-space-sm mt-1\">\n<!-- Field 1: Jenis Identitas -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-sm text-label-sm font-semibold text-on-surface\">Jenis Identitas Fisik:</label>\n<div class=\"grid grid-cols-3 gap-2\">\n<label class=\"flex items-center justify-center gap-1.5 p-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold cursor-pointer shadow-xs transition-all\">\n<input checked=\"\" class=\"hidden\" name=\"idType\" type=\"radio\" value=\"KTM\"/>\n<span class=\"material-symbols-outlined text-[16px]\">school</span>\n<span>KTM UII</span>\n</label>\n<label class=\"flex items-center justify-center gap-1.5 p-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm font-medium hover:bg-surface-container cursor-pointer transition-all\">\n<input class=\"hidden\" name=\"idType\" type=\"radio\" value=\"KTP\"/>\n<span class=\"material-symbols-outlined text-[16px]\">badge</span>\n<span>KTP / SIM</span>\n</label>\n<label class=\"flex items-center justify-center gap-1.5 p-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm font-medium hover:bg-surface-container cursor-pointer transition-all\">\n<input class=\"hidden\" name=\"idType\" type=\"radio\" value=\"PEGAWAI\"/>\n<span class=\"material-symbols-outlined text-[16px]\">business_center</span>\n<span>Pegawai</span>\n</label>\n</div>\n</div>\n<!-- Field 2: Nama Lengkap Pemohon -->\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-sm text-label-sm font-semibold text-on-surface\">Nama Lengkap Pemohon</label>\n<span class=\"font-label-sm text-label-sm text-secondary font-medium\">Sesuai Kartu Identitas</span>\n</div>\n<div class=\"relative\">\n<span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]\">person</span>\n<input class=\"w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface font-medium focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:outline-none transition-all\" type=\"text\" value=\"M. Alif Fadhlorrahman\"/>\n</div>\n</div>\n<!-- Field 3: 4 Digit Terakhir Nomor Identitas -->\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-sm text-label-sm font-semibold text-on-surface\">4 Digit Terakhir NIM / NIK</label>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Proteksi Data Pribadi</span>\n</div>\n<div class=\"grid grid-cols-12 gap-2\">\n<div class=\"col-span-5 h-10 px-3 rounded-lg bg-surface-container flex items-center justify-center font-mono font-bold text-on-surface-variant text-[13px] tracking-wider select-none\">\n                  XXXX - XXXX -\n                </div>\n<div class=\"col-span-7 relative\">\n<input class=\"w-full h-10 px-3 rounded-lg bg-surface-container-low font-mono font-bold text-on-surface text-center tracking-widest text-[15px] focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:outline-none transition-all\" maxlength=\"4\" type=\"text\" value=\"1842\"/>\n</div>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant mt-0.5\">Cocokkan dengan digit akhir nomor induk mahasiswa pada KTM.</span>\n</div>\n<!-- Field 4: Nomor WhatsApp Aktif -->\n<div class=\"flex flex-col gap-1\">\n<div class=\"flex items-center justify-between\">\n<label class=\"font-label-sm text-label-sm font-semibold text-on-surface\">Nomor WhatsApp Aktif</label>\n<span class=\"px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-bold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[13px]\">check_circle</span>\n                  Terverifikasi OTP\n                </span>\n</div>\n<div class=\"relative\">\n<span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]\">chat</span>\n<input class=\"w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:outline-none transition-all\" type=\"text\" value=\"+62 812-9844-8910\"/>\n</div>\n</div>\n<!-- Field 5: Hubungan Pemohon -->\n<div class=\"flex flex-col gap-1.5\">\n<label class=\"font-label-sm text-label-sm font-semibold text-on-surface\">Hubungan Pemohon Terhadap Barang:</label>\n<div class=\"grid grid-cols-2 gap-2\">\n<label class=\"flex items-center gap-2 p-2 rounded-lg bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm font-semibold cursor-pointer shadow-xs\">\n<input checked=\"\" class=\"accent-secondary\" name=\"claimRel\" type=\"radio\" value=\"owner\"/>\n<span>Pemilik Asli (Langsung)</span>\n</label>\n<label class=\"flex items-center gap-2 p-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm font-medium hover:bg-surface-container cursor-pointer transition-all\">\n<input class=\"accent-secondary\" name=\"claimRel\" type=\"radio\" value=\"proxy\"/>\n<span>Kuasa / Perwakilan</span>\n</label>\n</div>\n</div>\n<!-- Verification Sub-panel: Checklist Kehadiran Fisik -->\n<div class=\"mt-2 p-3 rounded-lg bg-surface-container-low flex flex-col gap-2\">\n<span class=\"font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5\">\n<span class=\"material-symbols-outlined text-secondary text-[16px]\">checklist</span>\n                Checklist Fisik Petugas Satpam:\n              </span>\n<label class=\"flex items-start gap-2.5 cursor-pointer\">\n<input checked=\"\" class=\"mt-0.5 rounded text-secondary focus:ring-secondary accent-primary\" type=\"checkbox\"/>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Pemohon hadir secara langsung di Pos Jaga Induk GKU</span>\n</label>\n<label class=\"flex items-start gap-2.5 cursor-pointer\">\n<input checked=\"\" class=\"mt-0.5 rounded text-secondary focus:ring-secondary accent-primary\" type=\"checkbox\"/>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Menunjukkan kartu identitas fisik asli (bukan fotokopi / tangkapan layar)</span>\n</label>\n<label class=\"flex items-start gap-2.5 cursor-pointer\">\n<input checked=\"\" class=\"mt-0.5 rounded text-secondary focus:ring-secondary accent-primary\" type=\"checkbox\"/>\n<span class=\"font-body-sm text-body-sm text-on-surface\">Bersedia menandatangani Berita Acara Serah Terima (BAST) jika verifikasi cocok</span>\n</label>\n</div>\n</form>\n</div>\n<!-- Security Stamp & Metadata -->\n<div class=\"pt-3 flex items-center justify-between border-t border-surface-container-high/60 mt-2\">\n<div class=\"flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"material-symbols-outlined text-[16px]\">shield_person</span>\n<span>Verifikator: Bripka Hendra Kurniawan</span>\n</div>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant font-mono\">IP: 10.12.8.44</span>\n</div>\n</div>\n</div>\n</div>\n<!-- Section 5: Bottom Operational Action Bar -->\n<div class=\"mt-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-space-sm\">\n<div class=\"flex items-center gap-3\">\n<button class=\"h-11 px-5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg font-semibold transition-all flex items-center gap-2\" onclick=\"resetFormState()\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">restart_alt</span>\n<span>Batal / Reset Pencarian</span>\n</button>\n<button class=\"h-11 px-4 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold transition-all hidden md:flex items-center gap-1.5\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">history</span>\n<span>Lihat Log Tiket</span>\n</button>\n</div>\n<!-- Security footnote & Primary Action -->\n<div class=\"flex flex-col sm:flex-row items-center gap-4\">\n<div class=\"flex items-center gap-2 text-on-surface-variant text-right hidden lg:flex\">\n<span class=\"material-symbols-outlined text-secondary text-[18px]\">lock_clock</span>\n<span class=\"font-body-sm text-body-sm max-w-sm leading-tight text-left\">\n          Pemeriksaan tatap muka wajib mematuhi SOP Pengamanan Kampus UII No. 04/SK-BSI/2024. Audit log tercatat otomatis.\n        </span>\n</div>\n<button class=\"w-full sm:w-auto h-12 px-7 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-3 hover:bg-on-surface active:scale-[0.99] transition-all shadow-md\" id=\"btnProceedVerification\" type=\"button\">\n<span>Mulai Verifikasi (Lanjut ke Langkah 2: Bandingkan Ciri)</span>\n<span class=\"material-symbols-outlined text-[20px]\">arrow_forward</span>\n</button>\n</div>\n</div>\n</div>\n<script>\n  function setValidState() {\n    const validCard = document.getElementById('validItemCard');\n    const blockedCard = document.getElementById('blockedItemCard');\n    const anomalyCard = document.getElementById('anomalyWarningCard');\n    const btnValid = document.getElementById('btnStateValid');\n    const btnBlocked = document.getElementById('btnStateBlocked');\n    const proceedBtn = document.getElementById('btnProceedVerification');\n    const searchInput = document.getElementById('itemSearchInput');\n\n    if (searchInput) searchInput.value = 'BRG-2024-0142';\n\n    if (validCard) validCard.classList.remove('hidden');\n    if (blockedCard) blockedCard.classList.add('hidden');\n    if (anomalyCard) anomalyCard.classList.remove('hidden');\n\n    if (btnValid) {\n      btnValid.className = 'px-3 py-1 rounded text-label-sm font-label-sm font-semibold bg-primary text-on-primary shadow-xs transition-all flex items-center gap-1';\n    }\n    if (btnBlocked) {\n      btnBlocked.className = 'px-3 py-1 rounded text-label-sm font-label-sm font-medium text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1';\n    }\n\n    if (proceedBtn) {\n      proceedBtn.disabled = false;\n      proceedBtn.classList.remove('opacity-50', 'cursor-not-allowed');\n      proceedBtn.innerHTML = `<span>Mulai Verifikasi (Lanjut ke Langkah 2: Bandingkan Ciri)</span><span class=\"material-symbols-outlined text-[20px]\">arrow_forward</span>`;\n    }\n  }\n\n  function setBlockedState() {\n    const validCard = document.getElementById('validItemCard');\n    const blockedCard = document.getElementById('blockedItemCard');\n    const anomalyCard = document.getElementById('anomalyWarningCard');\n    const btnValid = document.getElementById('btnStateValid');\n    const btnBlocked = document.getElementById('btnStateBlocked');\n    const proceedBtn = document.getElementById('btnProceedVerification');\n    const searchInput = document.getElementById('itemSearchInput');\n\n    if (searchInput) searchInput.value = 'BRG-2024-0115';\n\n    if (validCard) validCard.classList.add('hidden');\n    if (blockedCard) blockedCard.classList.remove('hidden');\n    if (anomalyCard) anomalyCard.classList.add('hidden');\n\n    if (btnBlocked) {\n      btnBlocked.className = 'px-3 py-1 rounded text-label-sm font-label-sm font-semibold bg-error text-on-error shadow-xs transition-all flex items-center gap-1';\n    }\n    if (btnValid) {\n      btnValid.className = 'px-3 py-1 rounded text-label-sm font-label-sm font-medium text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1';\n    }\n\n    if (proceedBtn) {\n      proceedBtn.disabled = true;\n      proceedBtn.classList.add('opacity-50', 'cursor-not-allowed');\n      proceedBtn.innerHTML = `<span>Verifikasi Terkunci (Barang Ditahan BSI)</span><span class=\"material-symbols-outlined text-[20px]\">lock</span>`;\n    }\n  }\n\n  function resetFormState() {\n    const searchInput = document.getElementById('itemSearchInput');\n    if (searchInput) searchInput.value = '';\n    setValidState();\n  }\n</script></main></div>\n<!-- LIGHTBOX MODAL: Zoom Foto Barang -->\n<div id=\"modal-zoom-image\" class=\"fixed inset-0 z-50 hidden bg-inverse-surface/80 backdrop-blur-md flex items-center justify-center p-4\">\n  <div class=\"relative max-w-3xl w-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200\">\n    <div class=\"p-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high\">\n      <div class=\"flex items-center gap-2\">\n        <span class=\"material-symbols-outlined text-secondary text-[22px]\">photo_camera</span>\n        <span class=\"font-headline-sm text-headline-sm font-semibold text-on-surface\">Dokumentasi Foto Fisik Resolusi Tinggi</span>\n      </div>\n      <button class=\"p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors\" data-action=\"close-modal-zoom\">\n        <span class=\"material-symbols-outlined text-[22px]\">close</span>\n      </button>\n    </div>\n    <div class=\"p-6 flex flex-col items-center justify-center bg-black/5\">\n      <img src=\"https://images.unsplash.com/photo-1624823183493-27e7f7b6b907?auto=format&fit=crop&w=1200&q=80\" alt=\"Foto Fisik Barang Inventaris\" class=\"max-h-[65vh] w-auto rounded-xl shadow-lg object-contain\"/>\n      <div class=\"mt-4 px-4 py-2 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm flex items-center gap-3\">\n        <span>Kamera Posko Induk GKU #02</span>\n        <span>\u2022</span>\n        <span>Resolusi: 1920x1080 (Webcam HD)</span>\n        <span>\u2022</span>\n        <span>Hash: 8f4c3e1a</span>\n      </div>\n    </div>\n  </div>\n</div>\n";

export default function VerifikasiLangkah1({
  onNavigate,
  verification,
  onVerificationStarted,
  satpamUser,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const itemInput = el.querySelector('#itemSearchInput');
    const proceedButton = el.querySelector('#btnProceedVerification');
    const claimantForm = el.querySelector('input[name="idType"]')?.closest('form');
    const claimantInputs = Array.from(claimantForm?.querySelectorAll('input[type="text"]') || []);
    const feedback = el.ownerDocument.createElement('div');
    const inventoryController = new AbortController();
    let inventoryItems = [];
    let isActive = true;
    let selectedItem = null;
    let selectedQuery = '';
    let isSubmitting = false;

    feedback.id = 'verification-feedback';
    feedback.className = 'hidden fixed top-4 right-4 z-[70] max-w-lg rounded-xl px-5 py-3 text-sm font-semibold shadow-xl';
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    el.append(feedback);

    const readyItemsPanel = el.ownerDocument.createElement('section');
    readyItemsPanel.className =
      'mt-4 rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-4 shadow-sm';
    readyItemsPanel.setAttribute('aria-labelledby', 'ready-items-heading');

    const readyItemsHeading = el.ownerDocument.createElement('h3');
    readyItemsHeading.id = 'ready-items-heading';
    readyItemsHeading.className = 'font-label-lg text-label-lg font-bold text-on-surface';
    readyItemsHeading.textContent = 'Barang Siap Diambil';

    const readyItemsDescription = el.ownerDocument.createElement('p');
    readyItemsDescription.className = 'mt-1 text-sm text-on-surface-variant';
    readyItemsDescription.textContent =
      'Daftar barang dari inventaris dengan status Barang Ditemukan.';

    const readyItemsList = el.ownerDocument.createElement('div');
    readyItemsList.className = 'mt-3 grid gap-2';
    readyItemsList.setAttribute('aria-live', 'polite');
    readyItemsPanel.append(readyItemsHeading, readyItemsDescription, readyItemsList);

    const searchRow = itemInput?.parentElement?.parentElement;
    searchRow?.after(readyItemsPanel);

    const showFeedback = (message, isError = false) => {
      feedback.textContent = message;
      feedback.className = `fixed top-4 right-4 z-[70] max-w-lg rounded-xl px-5 py-3 text-sm font-semibold shadow-xl ${
        isError ? 'bg-red-100 text-red-900' : 'bg-emerald-100 text-emerald-900'
      }`;
    };

    const renderReadyItems = () => {
      if (!isActive) return;

      const readyItems = inventoryItems.filter(
        (item) => normalizeItemStatus(item.status) === 'barang_ditemukan',
      );
      readyItemsHeading.textContent = `Barang Siap Diambil (${readyItems.length})`;
      readyItemsList.replaceChildren();

      if (readyItems.length === 0) {
        const emptyState = el.ownerDocument.createElement('p');
        emptyState.className = 'rounded-lg bg-surface-container-low p-3 text-sm text-on-surface-variant';
        emptyState.textContent = 'Belum ada barang dengan status Barang Ditemukan.';
        readyItemsList.append(emptyState);
        return;
      }

      readyItems.forEach((item) => {
        const button = el.ownerDocument.createElement('button');
        button.type = 'button';
        button.dataset.readyItemId = item.item_id;
        button.className =
          'flex w-full flex-col gap-1 rounded-lg border border-outline-variant/50 bg-surface-container-low p-3 text-left transition hover:border-secondary hover:bg-secondary-fixed/30 focus:outline-none focus:ring-2 focus:ring-secondary sm:flex-row sm:items-center sm:justify-between';

        const itemName = el.ownerDocument.createElement('span');
        itemName.className = 'font-semibold text-on-surface';
        itemName.textContent = `${item.item_id} — ${item.item_name || item.category_name || 'Barang temuan'}`;

        const itemDetails = el.ownerDocument.createElement('span');
        itemDetails.className = 'text-sm text-on-surface-variant';
        itemDetails.textContent = [
          item.category_name,
          item.color,
          item.storage_rack ? `Lokasi: ${item.storage_rack}` : '',
        ]
          .filter(Boolean)
          .join(' • ');

        button.append(itemName, itemDetails);
        readyItemsList.append(button);
      });
    };

    const fetchInventoryItems = async (options) => {
      const inventory = await readAPIResponse(
        await fetch(`${API_BASE_URL}/v1/staff/items`, options),
      );
      if (!Array.isArray(inventory.data)) {
        throw new Error('Format daftar inventaris dari server tidak valid.');
      }
      inventoryItems = inventory.data;
      renderReadyItems();
      return inventoryItems;
    };

    const loadReadyItems = async () => {
      const loading = el.ownerDocument.createElement('p');
      loading.className = 'text-sm text-on-surface-variant';
      loading.textContent = 'Memuat daftar inventaris...';
      readyItemsList.replaceChildren(loading);

      try {
        await fetchInventoryItems({ signal: inventoryController.signal });
      } catch (error) {
        if (!isActive || error.name === 'AbortError') return;

        const errorState = el.ownerDocument.createElement('p');
        errorState.className = 'rounded-lg bg-error-container/40 p-3 text-sm text-error';
        errorState.textContent = `Daftar barang siap diambil tidak dapat dimuat: ${error.message}`;
        readyItemsList.replaceChildren(errorState);
        console.error('Gagal memuat barang siap diambil:', error);
        showFeedback('Tidak dapat memuat daftar barang dari inventaris.', true);
      }
    };

    const setProceedEnabled = (enabled, label) => {
      if (!proceedButton) return;
      proceedButton.disabled = !enabled;
      proceedButton.classList.toggle('opacity-50', !enabled);
      proceedButton.classList.toggle('cursor-not-allowed', !enabled);
      if (label) {
        proceedButton.innerHTML = `<span>${label}</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span>`;
      }
    };

    const activeVerification =
      verification?.status === 'proses_verifikasi' ? verification : null;
    if (itemInput) itemInput.value = activeVerification?.item_id || '';
    if (claimantInputs.length >= 3) {
      claimantInputs[0].value = activeVerification?.claim?.claimant_name || '';
      claimantInputs[1].value = activeVerification?.claimant_identity_last4 || '';
      claimantInputs[2].value =
        activeVerification?.claimant_phone || activeVerification?.claim?.claimant_wa || '';
    }
    claimantForm?.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = false;
    });
    ['#validItemCard', '#blockedItemCard', '#anomalyWarningCard'].forEach((selector) => {
      el.querySelector(selector)?.classList.add('hidden');
    });
    Array.from(el.querySelectorAll('span')).find(
      (span) => span.textContent.trim() === 'Kandidat Teratas:',
    )?.parentElement?.classList.add('hidden');
    el.querySelector('#btnStateValid')?.closest('.bg-surface-container-low')?.classList.add('hidden');

    if (activeVerification && itemInput) {
      selectedItem = { item_id: activeVerification.item_id, status: activeVerification.status };
      selectedQuery = activeVerification.item_id;
      setProceedEnabled(true, 'Lanjutkan Perbandingan Ciri');
      showFeedback(`Verifikasi ${activeVerification.item_id} sedang berjalan.`, false);
    } else {
      setProceedEnabled(false);
    }

    const searchItem = async () => {
      const query = itemInput?.value.trim();
      if (!query) {
        showFeedback('Masukkan Item ID atau nomor laporan kehilangan terlebih dahulu.', true);
        return;
      }

      selectedItem = null;
      selectedQuery = '';
      setProceedEnabled(false);
      showFeedback('Mencari barang di inventaris...');

      try {
        let itemID = query;
        let lostReportID = '';

        if (/^HL-/i.test(query)) {
          const matches = await readAPIResponse(
            await fetch(`${API_BASE_URL}/v1/staff/matches?page=1&page_size=100`),
          );
          const match = matches.data?.find(
            (entry) => entry.lost_report_id?.toUpperCase() === query.toUpperCase(),
          );
          if (!match?.item_id) {
            throw new Error('Tidak ada barang yang cocok dengan nomor laporan tersebut.');
          }
          itemID = match.item_id;
          lostReportID = query.toUpperCase();
        }

        const items = await fetchInventoryItems();
        const item = items.find(
          (entry) => entry.item_id?.toUpperCase() === itemID.toUpperCase(),
        );
        if (!item) {
          throw new Error(`Barang dengan ID ${itemID} tidak ditemukan di inventaris.`);
        }

        const resuming =
          activeVerification?.item_id === item.item_id &&
          normalizeItemStatus(item.status) === 'proses_verifikasi';
        if (normalizeItemStatus(item.status) !== 'barang_ditemukan' && !resuming) {
          throw new Error(`Barang berstatus "${item.status}" dan tidak dapat mulai diverifikasi.`);
        }

        selectedItem = { ...item, lost_report_id: lostReportID };
        selectedQuery = query;
        setProceedEnabled(true, resuming ? 'Lanjutkan Perbandingan Ciri' : undefined);
        showFeedback(
          `${item.item_id} — ${item.item_name || item.category_name || 'Barang temuan'} siap diverifikasi.`,
        );
      } catch (error) {
        console.error('Gagal mencari barang untuk verifikasi:', error);
        showFeedback(
          error instanceof TypeError ? 'Server inventaris tidak dapat dihubungi.' : error.message,
          true,
        );
      }
    };

    const startVerification = async () => {
      if (activeVerification && itemInput?.value.trim() === activeVerification.item_id) {
        onNavigate?.('satpam_verifikasi_3');
        return;
      }

      if (!selectedItem || selectedQuery !== itemInput?.value.trim()) {
        showFeedback('Cari dan pilih barang yang masih berstatus Barang Ditemukan terlebih dahulu.', true);
        return;
      }

      const [nameInput, lastFourInput, phoneInput] = claimantInputs;
      const claimantName = nameInput?.value.trim() || '';
      const identityLast4 = lastFourInput?.value.trim() || '';
      const claimantPhone = phoneInput?.value.trim() || '';
      const idType = claimantForm?.querySelector('input[name="idType"]:checked')?.value || '';
      const relation = claimantForm?.querySelector('input[name="claimRel"]:checked')?.value || '';
      const checklist = Array.from(claimantForm?.querySelectorAll('input[type="checkbox"]') || []);

      if (claimantName.length < 3) {
        showFeedback('Nama pemohon minimal 3 karakter.', true);
        nameInput?.focus();
        return;
      }
      if (!/^\d{4}$/.test(identityLast4)) {
        showFeedback('Masukkan tepat 4 digit terakhir nomor identitas pemohon.', true);
        lastFourInput?.focus();
        return;
      }
      if (claimantPhone.replace(/\D/g, '').length < 8) {
        showFeedback('Masukkan nomor WhatsApp pemohon yang valid.', true);
        phoneInput?.focus();
        return;
      }
      if (!idType || !relation) {
        showFeedback('Pilih jenis identitas dan hubungan pemohon terhadap barang.', true);
        return;
      }
      if (checklist.length === 0 || checklist.some((input) => !input.checked)) {
        showFeedback('Lengkapi checklist pemeriksaan fisik sebelum memulai verifikasi.', true);
        return;
      }
      if (!onVerificationStarted) {
        showFeedback('Alur verifikasi tidak terhubung ke aplikasi.', true);
        return;
      }
      const staffID = Number(satpamUser?.staff_id);
      if (!Number.isSafeInteger(staffID) || staffID <= 0) {
        showFeedback('Sesi Satpam tidak valid. Silakan masuk kembali.', true);
        return;
      }

      isSubmitting = true;
      setProceedEnabled(false, 'Memulai Verifikasi...');
      showFeedback('Menyimpan proses verifikasi...');
      try {
        const result = await readAPIResponse(
          await fetch(
            `${API_BASE_URL}/v1/staff/items/${encodeURIComponent(selectedItem.item_id)}/start-verify`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                staff_id: staffID,
                claimant_name: claimantName,
                claimant_id_type: idType.toLowerCase() === 'pegawai' ? 'lainnya' : idType.toLowerCase(),
                id_last4: identityLast4,
                claimant_wa: claimantPhone,
                lost_report_id: selectedItem.lost_report_id || '',
              }),
            },
          ),
        );

        if (result.status !== 'proses_verifikasi') {
          throw new Error('Server tidak mengembalikan status proses verifikasi yang valid.');
        }

        onVerificationStarted({
          ...result,
          item_id: selectedItem.item_id,
          lost_report_id: selectedItem.lost_report_id,
          claimant_identity_last4: identityLast4,
          claimant_relation: relation,
          claimant_phone: claimantPhone,
        });
      } catch (error) {
        console.error('Gagal memulai verifikasi kepemilikan:', error);
        showFeedback(
          error instanceof TypeError ? 'Server verifikasi tidak dapat dihubungi.' : error.message,
          true,
        );
        setProceedEnabled(true);
      } finally {
        isSubmitting = false;
      }
    };

    const handleItemInput = () => {
      selectedItem = null;
      selectedQuery = '';
      setProceedEnabled(false);
    };

    itemInput?.addEventListener('input', handleItemInput);

    const handleClick = (e) => {
      const target = e.target.closest('a, button, [data-path], [data-action], tr, [role="button"], label');
      if (!target) return;

      const path = (target.getAttribute('data-path') || target.getAttribute('href') || '').trim();
      const action = (target.getAttribute('data-action') || '').trim();
      const title = (target.getAttribute('title') || '').toLowerCase();
      const text = (target.textContent || '').trim();
      const lowerText = text.toLowerCase();

      if (target.id === 'btnProceedVerification') {
        e.preventDefault();
        if (!isSubmitting) void startVerification();
        return;
      }

      if (target.dataset.readyItemId) {
        e.preventDefault();
        if (itemInput) {
          itemInput.value = target.dataset.readyItemId;
          void searchItem();
        }
        return;
      }

      if (
        target.id === 'btnStateValid' ||
        target.id === 'btnStateBlocked' ||
        lowerText.includes('cari barang')
      ) {
        e.preventDefault();
        if (target.id === 'btnStateValid' || target.id === 'btnStateBlocked') {
          const suggestedID = text.match(/\bBRG-[A-Z0-9-]+\b/i)?.[0];
          if (suggestedID && itemInput) itemInput.value = suggestedID;
        }
        void searchItem();
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

    void loadReadyItems();
    el.addEventListener('click', handleClick);
    return () => {
      isActive = false;
      inventoryController.abort();
      el.removeEventListener('click', handleClick);
      itemInput?.removeEventListener('input', handleItemInput);
      readyItemsPanel.remove();
      feedback.remove();
    };
  }, [onNavigate, verification, onVerificationStarted]);

  return (
    <div
      ref={containerRef}
      className="bg-surface font-body-md text-on-surface antialiased min-h-screen"
      dangerouslySetInnerHTML={{ __html: rawHTML }}
    />
  );
}
