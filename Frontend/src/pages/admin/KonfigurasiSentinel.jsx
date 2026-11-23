import React, { useEffect, useRef } from 'react';

// Layar Stitch Portal Administrator BSI: Konfigurasi Parameter Sistem & Mesin Sentinel - Portal Administrator BSI
const rawHTML = "<aside class=\"fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]\"><div class=\"flex flex-col\"><div class=\"px-space-md py-space-md flex items-center gap-3 bg-surface-container-low\"><div class=\"w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shrink-0\"><span class=\"material-symbols-outlined text-secondary-fixed text-[24px]\">verified_user</span></div><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none\">BSI \u2022 UII</span><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1\">Portal Administrator BSI</span></div></div><div class=\"px-space-md pt-space-md pb-space-xs\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest\">Menu Navigasi Audit</span></div><nav class=\"flex flex-col px-space-sm gap-1\" data-active-classes=\"bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)]\">\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"beranda\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">grid_view</span>\n    <span>Beranda</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"penanda-anomali\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">warning</span>\n    <span>Penanda Anomali</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"insiden\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">security_update_warning</span>\n    <span>Insiden</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"audit-log\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">history_edu</span>\n    <span>Audit Log</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"akun-satpam\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">badge</span>\n    <span>Akun Satpam</span>\n  </a>\n  <a class=\"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md cursor-pointer\" data-path=\"barang-ditahan\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">lock_clock</span>\n    <span>Barang Ditahan</span>\n  </a>\n  <a aria-current=\"page\" class=\"flex items-center gap-3 px-space-md py-space-xs transition-all bg-primary-container text-on-primary font-label-lg rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.15)] font-semibold cursor-pointer\" data-path=\"parameter\" href=\"#\">\n    <span class=\"material-symbols-outlined text-[20px]\">tune</span>\n    <span>Parameter</span>\n  </a>\n</nav></div><div class=\"p-space-md m-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\"><div class=\"flex items-center justify-between\"><span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Keamanan Sesi</span><span class=\"flex h-2 w-2 rounded-full bg-secondary\"></span></div><div class=\"font-label-md text-label-md text-on-surface font-semibold\">Sesi Aktif: 07:42:15 tersisa</div><div class=\"font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">vpn_lock</span>10.12.0.4 - VPN Terpadu</div><div class=\"flex items-center justify-between pt-1\"><div class=\"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1\"><span class=\"material-symbols-outlined text-[14px]\">speed</span>Latensi: 14ms</div><a class=\"font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1\" data-path=\"kontak-siaga\" href=\"#\"><span class=\"material-symbols-outlined text-[14px]\">emergency</span>Kontak Siaga</a></div></div><!-- Portal Shortcut Buttons -->\n<div class=\"px-space-md pt-1 pb-2 flex flex-col gap-1.5\">\n  <button data-path=\"portal-satpam\" class=\"w-full py-2 px-3 rounded-xl border border-outline-variant/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">local_police</span>\n    <span>Buka Portal Satpam</span>\n  </button>\n  <button data-path=\"portal-publik\" class=\"w-full py-1.5 px-3 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer\">\n    <span class=\"material-symbols-outlined text-[16px]\">public</span>\n    <span>Kembali ke Publik</span>\n  </button>\n</div>\n</aside><div class=\"pl-72 flex flex-col min-h-screen\"><header class=\"fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-space-lg flex items-center justify-between\"><div class=\"flex items-center gap-space-md\"><div class=\"flex flex-col\"><span class=\"font-headline-sm text-headline-sm text-on-surface leading-tight\">BSI Admin Portal - Lost &amp; Found Kampus UII</span><div class=\"flex items-center gap-2 mt-1\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface\"><span class=\"h-1.5 w-1.5 rounded-full bg-secondary\"></span>Sistem Operasional Normal - Gateway BSI Terhubung</span><span class=\"px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant\">Production v2.4-sec</span><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[13px]\">key</span>MFA Aktif - Hardware Token</span></div></div></div><div class=\"flex items-center gap-space-md\"><div class=\"relative w-72\"><span class=\"material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]\">search</span><input class=\"w-full h-10 pl-9 pr-3 rounded-full bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors\" placeholder=\"Cari log / item / ID insiden...\" type=\"text\"/></div><div class=\"relative flex items-center justify-center\"><button class=\"w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors\"><span class=\"material-symbols-outlined text-[20px]\">notifications</span></button><span class=\"absolute top-1 right-1 h-2 w-2 rounded-full bg-error\"></span></div><div class=\"flex items-center gap-3 pl-2\"><div class=\"flex flex-col text-right\"><span class=\"font-label-md text-label-md text-on-surface\">Ir. Ahmad Fauzi, M.T.</span><span class=\"font-label-sm text-label-sm text-on-surface-variant\">Super Admin / Audit Officer</span></div><div class=\"w-8 h-8 rounded-full bg-primary flex items-center justify-center\"><span class=\"material-symbols-outlined text-on-primary text-[18px]\">person</span></div><a class=\"ml-2 w-9 h-9 rounded-full hover:bg-error-container hover:text-on-error-container text-on-surface-variant flex items-center justify-center transition-colors\" data-path=\"login\" href=\"#\" title=\"Keluar dari Portal\"><span class=\"material-symbols-outlined text-[18px]\">logout</span></a></div></div>\n<!-- DROPDOWN NOTIFIKASI ADMIN -->\n<div id=\"dropdown-notifikasi\" style=\"display: none;\" class=\"fixed right-20 top-16 z-50 hidden w-96 max-w-[90vw] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden animate-in fade-in zoom-in-95 duration-150\">\n  <div class=\"px-4 py-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/30\">\n    <div class=\"flex items-center gap-2\">\n      <span class=\"material-symbols-outlined text-secondary text-[20px]\">notifications_active</span>\n      <span class=\"font-label-md text-label-md font-bold text-on-surface\">Pusat Notifikasi BSI</span>\n      <span id=\"badge-unread-count\" class=\"px-1.5 py-0.2 rounded-full bg-error text-on-error font-label-sm text-[10px] font-bold\">3</span>\n    </div>\n    <button data-action=\"mark-all-read\" class=\"text-secondary hover:underline font-label-sm text-[11px] cursor-pointer\">Tandai Dibaca</button>\n  </div>\n  <div class=\"divide-y divide-outline-variant/20 max-h-80 overflow-y-auto\">\n    <div class=\"p-3 hover:bg-surface-container-low/60 transition-colors cursor-pointer\" data-path=\"insiden\">\n      <div class=\"flex items-start gap-2.5\">\n        <span class=\"w-2 h-2 rounded-full bg-error mt-1.5 shrink-0\"></span>\n        <div class=\"flex flex-col\">\n          <span class=\"font-label-sm text-label-sm font-bold text-error\">FLAG-2024-0988 \u2022 Sengketa Klaim Kritis</span>\n          <p class=\"font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-snug\">3 pemohon berbeda mencoba klaim BRG-2024-0142 di Pos GKU dalam 24 jam.</p>\n          <span class=\"text-[10px] text-outline mt-1\">57 menit lalu</span>\n        </div>\n      </div>\n    </div>\n    <div class=\"p-3 hover:bg-surface-container-low/60 transition-colors cursor-pointer\" data-path=\"barang-ditahan\">\n      <div class=\"flex items-start gap-2.5\">\n        <span class=\"w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0\"></span>\n        <div class=\"flex flex-col\">\n          <span class=\"font-label-sm text-label-sm font-bold text-on-surface\">Pelepasan Barang Ditahan</span>\n          <p class=\"font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-snug\">BAST #0089 diterbitkan untuk pemindahan barang bukti ke Vault Lt. 3.</p>\n          <span class=\"text-[10px] text-outline mt-1\">2 jam lalu</span>\n        </div>\n      </div>\n    </div>\n    <div class=\"p-3 hover:bg-surface-container-low/60 transition-colors cursor-pointer\" data-path=\"audit-log\">\n      <div class=\"flex items-start gap-2.5\">\n        <span class=\"w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0\"></span>\n        <div class=\"flex flex-col\">\n          <span class=\"font-label-sm text-label-sm font-bold text-on-surface\">Audit Ledger Tersinkronisasi</span>\n          <p class=\"font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-snug\">142,891 blok hash tervalidasi 100% utuh tanpa tamper.</p>\n          <span class=\"text-[10px] text-outline mt-1\">Hari ini, 03:00 WIB</span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"px-4 py-2 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/30\">\n    <button data-path=\"insiden\" class=\"text-secondary hover:underline font-label-sm text-[11px] font-semibold flex items-center gap-1 cursor-pointer\">\n      <span>Lihat Semua Insiden</span>\n      <span class=\"material-symbols-outlined text-[14px]\">arrow_forward</span>\n    </button>\n    <button data-action=\"close-notif-dropdown\" class=\"px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest font-label-sm text-[11px] text-on-surface cursor-pointer\">Tutup</button>\n  </div>\n</div>\n\n</header><main class=\"w-full pt-20 px-space-lg flex-1 bg-surface max-w-[1440px] mx-auto pb-space-lg\"><div class=\"flex flex-col w-full\">\n<!-- Script for sidebar active link highlight synchronization -->\n<script>\n    document.addEventListener(\"DOMContentLoaded\", function () {\n      const navLinks = document.querySelectorAll(\"aside nav a\");\n      navLinks.forEach((link) => {\n        if (link.getAttribute(\"data-path\") === \"parameter\") {\n          link.className = \"flex items-center gap-3 px-space-md py-space-xs rounded-xl bg-primary-container text-on-primary font-label-lg shadow-[0_4px_12px_rgba(19,27,46,0.15)] transition-all\";\n        } else {\n          link.className = \"flex items-center gap-3 px-space-md py-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-body-md text-body-md\";\n        }\n      });\n    });\n  </script>\n<!-- Top Breadcrumb & Page Header -->\n<section class=\"flex flex-col gap-space-xs mb-space-md\">\n<nav class=\"flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant\">\n<a class=\"hover:text-secondary flex items-center gap-1 transition-colors\" href=\"#\">\n<span class=\"material-symbols-outlined text-[15px]\">home</span>\n<span>Beranda Admin</span>\n</a>\n<span class=\"material-symbols-outlined text-[13px] text-outline-variant\">chevron_right</span>\n<span class=\"text-on-surface-variant\">Pengawasan Sentinel</span>\n<span class=\"material-symbols-outlined text-[13px] text-outline-variant\">chevron_right</span>\n<span class=\"text-on-surface font-semibold\">Konfigurasi Parameter Sistem</span>\n</nav>\n<div class=\"flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pt-1\">\n<div class=\"flex flex-col\">\n<div class=\"flex items-center gap-3\">\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight\">Konfigurasi Parameter &amp; Mesin Sentinel</h1>\n<span class=\"px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold tracking-wide flex items-center gap-1\">\n<span class=\"w-2 h-2 rounded-full bg-secondary animate-pulse\"></span>\n            ACTIVE RUNTIME v2.4.1\n          </span>\n</div>\n<p class=\"font-body-md text-body-md text-on-surface-variant mt-1 max-w-4xl\">\n          Pengaturan komputasi algoritma pencocokan, mitigasi abuse OTP gateway, siklus kedaluwarsa inventaris, dan batas ambang penanda anomali otomatis.\n        </p>\n</div>\n<div class=\"flex items-center gap-2 shrink-0\">\n<button class=\"px-space-md py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1.5 shadow-sm\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">restart_alt</span>\n<span>Pulihkan Pengaturan Default</span>\n</button>\n<button class=\"px-space-md py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1.5 shadow-sm\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">file_download</span>\n<span>Ekspor Konfigurasi (.JSON)</span>\n</button>\n<button class=\"px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-md hover:bg-primary-container transition-all flex items-center gap-2 relative\" onclick=\"document.getElementById('modal-konfirmasi').classList.remove('hidden')\" type=\"button\">\n<span class=\"w-2 h-2 rounded-full bg-secondary-container\"></span>\n<span>Simpan Perubahan Parameter</span>\n<span class=\"px-1.5 py-0.2 rounded bg-surface-container-lowest text-primary text-[10px] font-bold\">2 DRAFT</span>\n</button>\n</div>\n</div>\n</section>\n<!-- Top Security & Audit Notice Strip -->\n<div class=\"p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md mb-space-lg\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-secondary\">\n<span class=\"material-symbols-outlined text-[24px]\">verified</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-bold tracking-wide\">\n          Parameter Aktif v2.4.1 \u2014 Berlaku Efektif sejak 12 Okt 2024, 14:20 WIB\n        </span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">\n          Perubahan konfigurasi membutuhkan justifikasi administratif, ditandatangani kunci FIDO2 hardware token, dan dicatat langsung ke Append-Only Ledger.\n        </span>\n</div>\n</div>\n<div class=\"flex items-center gap-3 shrink-0 text-on-surface-variant font-label-sm text-label-sm\">\n<span class=\"flex items-center gap-1 px-3 py-1 rounded-lg bg-surface-container-low\">\n<span class=\"material-symbols-outlined text-[15px] text-secondary\">token</span>\n        YubiKey 5C NFC Siap\n      </span>\n<span class=\"flex items-center gap-1 px-3 py-1 rounded-lg bg-surface-container-low font-mono\">\n        Ledger Block: #00142896\n      </span>\n</div>\n</div>\n<!-- Main Grid: Dense Settings Architecture -->\n<div class=\"grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl\">\n<!-- LEFT 7 COLS: Core Engines -->\n<div class=\"lg:col-span-7 flex flex-col gap-space-lg\">\n<!-- CARD 1: Algoritma Pencocokan & Rekomendasi -->\n<section class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md\">\n<div class=\"flex items-center justify-between pb-space-xs\">\n<div class=\"flex items-center gap-2.5\">\n<div class=\"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary\">\n<span class=\"material-symbols-outlined text-[20px]\">psychology</span>\n</div>\n<div>\n<h2 class=\"font-headline-sm text-headline-sm text-on-surface\">Algoritma Pencocokan &amp; Rekomendasi (Matching Engine)</h2>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">Kalkulasi bobot kemiripan otomatis antara laporan temuan fisik satpam dan laporan kehilangan sivitas.</p>\n</div>\n</div>\n<span class=\"font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-semibold\">\n            ENGINE ACTIVE\n          </span>\n</div>\n<!-- Slider Calculation Group -->\n<div class=\"bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-md\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md text-on-surface\">Distribusi Komposisi Bobot Parameter</span>\n<!-- Live Total Badge -->\n<span class=\"px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1.5\" id=\"badge-total-bobot\">\n<span class=\"material-symbols-outlined text-[16px] text-secondary\">check_circle</span>\n<span id=\"label-total-bobot\">Total Bobot: 100% (Valid &amp; Seimbang)</span>\n</span>\n</div>\n<!-- Color Weight -->\n<div class=\"flex flex-col gap-1.5\">\n<div class=\"flex justify-between items-center text-on-surface\">\n<label class=\"font-label-md text-label-md flex items-center gap-1.5\" for=\"slider-warna\">\n<span class=\"w-2.5 h-2.5 rounded-full bg-secondary\"></span>\n<span>Bobot Warna &amp; Visual Barcode</span>\n</label>\n<div class=\"flex items-center gap-1\">\n<input class=\"w-16 h-7 text-right px-2 rounded-lg bg-surface-container-lowest font-mono font-label-md text-label-md text-on-surface focus:outline-none\" id=\"num-warna\" max=\"100\" min=\"0\" oninput=\"updateSliders('warna', this.value)\" type=\"number\" value=\"35\"/>\n<span class=\"font-mono text-on-surface-variant font-label-sm text-label-sm\">%</span>\n</div>\n</div>\n<input class=\"w-full accent-secondary cursor-pointer h-2 bg-surface-container-highest rounded-lg appearance-none\" id=\"slider-warna\" max=\"100\" min=\"0\" oninput=\"updateSliders('warna', this.value)\" type=\"range\" value=\"35\"/>\n<span class=\"font-body-sm text-[11px] text-on-surface-variant\">Mendeteksi kecocokan dominasi spektrum warna utama barang (Vision Model v1.8).</span>\n</div>\n<!-- Location Weight -->\n<div class=\"flex flex-col gap-1.5\">\n<div class=\"flex justify-between items-center text-on-surface\">\n<label class=\"font-label-md text-label-md flex items-center gap-1.5\" for=\"slider-lokasi\">\n<span class=\"w-2.5 h-2.5 rounded-full bg-secondary-container\"></span>\n<span>Bobot Kluster Lokasi Kampus</span>\n</label>\n<div class=\"flex items-center gap-1\">\n<input class=\"w-16 h-7 text-right px-2 rounded-lg bg-surface-container-lowest font-mono font-label-md text-label-md text-on-surface focus:outline-none\" id=\"num-lokasi\" max=\"100\" min=\"0\" oninput=\"updateSliders('lokasi', this.value)\" type=\"number\" value=\"35\"/>\n<span class=\"font-mono text-on-surface-variant font-label-sm text-label-sm\">%</span>\n</div>\n</div>\n<input class=\"w-full accent-secondary cursor-pointer h-2 bg-surface-container-highest rounded-lg appearance-none\" id=\"slider-lokasi\" max=\"100\" min=\"0\" oninput=\"updateSliders('lokasi', this.value)\" type=\"range\" value=\"35\"/>\n<span class=\"font-body-sm text-[11px] text-on-surface-variant\">Kedekatan radius perimeter gedung (FTSP, FTI, FIAI, FPSB, Rektorat GBPH Prabuningrat).</span>\n</div>\n<!-- Time Weight -->\n<div class=\"flex flex-col gap-1.5\">\n<div class=\"flex justify-between items-center text-on-surface\">\n<label class=\"font-label-md text-label-md flex items-center gap-1.5\" for=\"slider-waktu\">\n<span class=\"w-2.5 h-2.5 rounded-full bg-on-secondary-fixed-variant\"></span>\n<span>Bobot Waktu &amp; Kronologi Kejadian</span>\n</label>\n<div class=\"flex items-center gap-1\">\n<input class=\"w-16 h-7 text-right px-2 rounded-lg bg-surface-container-lowest font-mono font-label-md text-label-md text-on-surface focus:outline-none\" id=\"num-waktu\" max=\"100\" min=\"0\" oninput=\"updateSliders('waktu', this.value)\" type=\"number\" value=\"30\"/>\n<span class=\"font-mono text-on-surface-variant font-label-sm text-label-sm\">%</span>\n</div>\n</div>\n<input class=\"w-full accent-secondary cursor-pointer h-2 bg-surface-container-highest rounded-lg appearance-none\" id=\"slider-waktu\" max=\"100\" min=\"0\" oninput=\"updateSliders('waktu', this.value)\" type=\"range\" value=\"30\"/>\n<span class=\"font-body-sm text-[11px] text-on-surface-variant\">Pencocokan rentang tanggal dan jam perkiraan kehilangan vs registrasi posko.</span>\n</div>\n<!-- Visual Bar Proportion -->\n<div class=\"w-full h-3 rounded-full bg-surface-container flex overflow-hidden\">\n<div class=\"h-full bg-secondary transition-all duration-300\" id=\"bar-warna\" style=\"width: 35%;\"></div>\n<div class=\"h-full bg-secondary-container transition-all duration-300\" id=\"bar-lokasi\" style=\"width: 35%;\"></div>\n<div class=\"h-full bg-on-secondary-fixed-variant transition-all duration-300\" id=\"bar-waktu\" style=\"width: 30%;\"></div>\n</div>\n</div>\n<!-- Matching Engine Fine Parameters -->\n<div class=\"grid grid-cols-1 md:grid-cols-3 gap-space-sm\">\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Ambang Batas Rekomendasi</span>\n<div class=\"flex items-baseline gap-1 my-1\">\n<span class=\"font-headline-md text-headline-md text-on-surface font-mono font-bold\">80</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">/ 100 skor</span>\n</div>\n<span class=\"font-body-sm text-[11px] text-on-surface-variant\">Skor minimal agar kandidat ditandai rekomendasi valid untuk satpam.</span>\n</div>\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Batas Notifikasi WhatsApp</span>\n<div class=\"flex items-baseline gap-1 my-1\">\n<span class=\"font-headline-md text-headline-md text-on-surface font-mono font-bold\">3</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">pesan / hari</span>\n</div>\n<span class=\"font-body-sm text-[11px] text-on-surface-variant\">Maksimal pesan pembaruan otomatis per pelapor untuk mencegah flood.</span>\n</div>\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Toleransi Deviasi Waktu</span>\n<div class=\"flex items-baseline gap-1 my-1\">\n<span class=\"font-headline-md text-headline-md text-on-surface font-mono font-bold\">\u00b1 2</span>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">jam</span>\n</div>\n<span class=\"font-body-sm text-[11px] text-on-surface-variant\">Jendela fleksibilitas waktu kehilangan vs penemuan lapangan.</span>\n</div>\n</div>\n</section>\n<!-- CARD 2: Keamanan & Rate-Limit OTP Gateway (WhatsApp Auth) -->\n<section class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md\">\n<div class=\"flex items-center justify-between pb-space-xs\">\n<div class=\"flex items-center gap-2.5\">\n<div class=\"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary\">\n<span class=\"material-symbols-outlined text-[20px]\">lock_reset</span>\n</div>\n<div>\n<h2 class=\"font-headline-sm text-headline-sm text-on-surface\">Keamanan &amp; Rate-Limit OTP Gateway (WhatsApp Auth)</h2>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">Pertahanan otentikasi publik sivitas terhadap SMS/WA blasting dan serangan brute-force.</p>\n</div>\n</div>\n<span class=\"font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-semibold flex items-center gap-1\">\n<span class=\"material-symbols-outlined text-[15px] text-secondary\">cloud_done</span>\n            Gateway UII-WA-Direct\n          </span>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-space-md\">\n<!-- Parameter Row 1 -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Masa Berlaku Kode OTP</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Batas kedaluwarsa token 6-digit</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<input class=\"w-20 h-9 px-2 rounded-lg bg-surface-container-lowest font-mono font-label-md text-label-md text-on-surface text-center focus:outline-none\" type=\"number\" value=\"180\"/>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">detik</span>\n</div>\n</div>\n<!-- Parameter Row 2 -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Jeda Kirim Ulang (Cooldown)</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Waktu tunggu tombol Resend</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<input class=\"w-20 h-9 px-2 rounded-lg bg-surface-container-lowest font-mono font-label-md text-label-md text-on-surface text-center focus:outline-none\" type=\"number\" value=\"60\"/>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">detik</span>\n</div>\n</div>\n<!-- Parameter Row 3 -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Batas Request per Nomor WA</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Maksimal request per MSISDN</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<input class=\"w-20 h-9 px-2 rounded-lg bg-surface-container-lowest font-mono font-label-md text-label-md text-on-surface text-center focus:outline-none\" type=\"number\" value=\"3\"/>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">kali / jam</span>\n</div>\n</div>\n<!-- Parameter Row 4 -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Batas Request per IP Address</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Proteksi subnet Wi-Fi UII</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<input class=\"w-20 h-9 px-2 rounded-lg bg-surface-container-lowest font-mono font-label-md text-label-md text-on-surface text-center focus:outline-none\" type=\"number\" value=\"10\"/>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">kali / jam</span>\n</div>\n</div>\n<!-- Parameter Row 5 -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Batas Kesalahan Input OTP</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Maksimal percobaan verifikasi salah</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<input class=\"w-20 h-9 px-2 rounded-lg bg-surface-container-lowest font-mono font-label-md text-label-md text-on-surface text-center focus:outline-none\" type=\"number\" value=\"5\"/>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">kali</span>\n</div>\n</div>\n<!-- Parameter Row 6 -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Durasi Penguncian (Lockout)</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Cooldown jika melampaui batas salah</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<input class=\"w-20 h-9 px-2 rounded-lg bg-surface-container-lowest font-mono font-label-md text-label-md text-on-surface text-center focus:outline-none\" type=\"number\" value=\"15\"/>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">menit</span>\n</div>\n</div>\n</div>\n<div class=\"p-space-sm rounded-xl bg-secondary-fixed/30 flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-secondary text-[20px]\">timer</span>\n<span class=\"font-label-md text-label-md text-on-surface\">Masa Berlaku Token Sesi Verifikasi Publik</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<span class=\"font-mono font-bold text-on-surface\">15 Menit</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">(Sejak OTP terverifikasi sebelum finalisasi submit)</span>\n</div>\n</div>\n</section>\n<!-- CARD 4: Jeda Percobaan Ulang Notifikasi & Gateway Retry -->\n<section class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md\">\n<div class=\"flex items-center justify-between\">\n<div class=\"flex items-center gap-2.5\">\n<div class=\"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary\">\n<span class=\"material-symbols-outlined text-[20px]\">sync_problem</span>\n</div>\n<div>\n<h2 class=\"font-headline-sm text-headline-sm text-on-surface\">Jeda Percobaan Ulang Notifikasi &amp; Gateway Retry</h2>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">Penanganan kegagalan pengiriman transmisi status via WhatsApp Cloud API.</p>\n</div>\n</div>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-2 gap-space-md\">\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\">\n<div class=\"flex items-center justify-between\">\n<span class=\"font-label-md text-label-md text-on-surface\">Exponential Backoff Interval</span>\n<span class=\"font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono\">3 Tahap</span>\n</div>\n<div class=\"flex items-center gap-2 font-mono text-on-surface font-label-md text-label-md pt-1\">\n<span class=\"px-2.5 py-1 rounded bg-surface-container-lowest shadow-sm\">1 Menit</span>\n<span class=\"material-symbols-outlined text-outline text-[16px]\">arrow_forward</span>\n<span class=\"px-2.5 py-1 rounded bg-surface-container-lowest shadow-sm\">5 Menit</span>\n<span class=\"material-symbols-outlined text-outline text-[16px]\">arrow_forward</span>\n<span class=\"px-2.5 py-1 rounded bg-surface-container-lowest shadow-sm\">30 Menit</span>\n</div>\n<span class=\"font-body-sm text-[11px] text-on-surface-variant\">Jika percobaan ke-3 gagal, tiket dikirim ke antrian isolasi manual satpam.</span>\n</div>\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col justify-between\">\n<div class=\"flex items-center justify-between\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Mode SMS Gateway Fallback</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Kanal darurat jika server WhatsApp mati total</span>\n</div>\n<div class=\"px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n                DINONAKTIFKAN\n              </div>\n</div>\n<span class=\"font-body-sm text-[11px] text-on-surface-variant\">Kebijakan BSI: Seluruh dispatch wajib terenkripsi end-to-end via WhatsApp verified badge UII.</span>\n</div>\n</div>\n</section>\n</div>\n<!-- RIGHT 5 COLS: Sentinel Engine, Lifecycle & Audit History -->\n<div class=\"lg:col-span-5 flex flex-col gap-space-lg\">\n<!-- CARD 5: Ambang Batas Penanda Anomali Otomatis (Sentinel Rules Engine) -->\n<section class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md\">\n<div class=\"flex items-center justify-between pb-space-xs\">\n<div class=\"flex items-center gap-2.5\">\n<div class=\"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary\">\n<span class=\"material-symbols-outlined text-[20px]\">security_update_warning</span>\n</div>\n<div>\n<h2 class=\"font-headline-sm text-headline-sm text-on-surface\">Ambang Batas Penanda Anomali (Sentinel Rules)</h2>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">Aturan otomatis deteksi fraud klaim barang berharga kampus.</p>\n</div>\n</div>\n<span class=\"px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold\">\n            3 RULES AKTIF\n          </span>\n</div>\n<div class=\"flex flex-col gap-space-sm\">\n<!-- Rule A1 -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\">\n<div class=\"flex items-start justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"px-2 py-0.5 rounded bg-primary-container text-on-primary font-mono text-[11px] font-bold\">RULE A1</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Klaim Ganda Identitas Berbeda</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-secondary font-mono font-semibold\">Tinggi</span>\n</div>\n<p class=\"font-body-sm text-[12px] text-on-surface-variant\">\n              Memicu penguncian inventaris otomatis apabila terdeteksi\n              <input class=\"inline w-12 h-6 text-center rounded bg-surface-container-lowest font-mono font-semibold text-on-surface mx-1 focus:outline-none\" type=\"number\" value=\"3\"/>\n              kali percobaan klaim gagal dalam kurun 24 jam pada satu nomor tiket temuan yang sama.\n            </p>\n</div>\n<!-- Rule A6 -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\">\n<div class=\"flex items-start justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono text-[11px] font-bold\">RULE A6</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Batas Frekuensi Laporan per Nomor</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono font-semibold\">Sedang</span>\n</div>\n<p class=\"font-body-sm text-[12px] text-on-surface-variant\">\n              Tandai anomali spam / social engineering jika 1 nomor WhatsApp membuat lebih dari\n              <input class=\"inline w-12 h-6 text-center rounded bg-surface-container-lowest font-mono font-semibold text-on-surface mx-1 focus:outline-none\" type=\"number\" value=\"3\"/>\n              laporan baru dalam kurun 7 hari kalender.\n            </p>\n</div>\n<!-- Rule A5 -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2\">\n<div class=\"flex items-start justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono text-[11px] font-bold\">RULE A5</span>\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Koreksi Berulang Petugas Satpam</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono font-semibold\">Audit Internal</span>\n</div>\n<p class=\"font-body-sm text-[12px] text-on-surface-variant\">\n              Eskalasi notifikasi ke supervisor jika satpam lapangan melakukan modifikasi atribut barang lebih dari\n              <input class=\"inline w-12 h-6 text-center rounded bg-surface-container-lowest font-mono font-semibold text-on-surface mx-1 focus:outline-none\" type=\"number\" value=\"2\"/>\n              kali dalam 1 jam setelah cetak label barcode.\n            </p>\n</div>\n</div>\n</section>\n<!-- CARD 3: Siklus Hidup & Batas Kedaluwarsa Laporan (Lifecycle & Expiration) -->\n<section class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md\">\n<div class=\"flex items-center justify-between pb-space-xs\">\n<div class=\"flex items-center gap-2.5\">\n<div class=\"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary\">\n<span class=\"material-symbols-outlined text-[20px]\">hourglass_top</span>\n</div>\n<div>\n<h2 class=\"font-headline-sm text-headline-sm text-on-surface\">Siklus Hidup &amp; Batas Kedaluwarsa (Lifecycle)</h2>\n<p class=\"font-body-sm text-body-sm text-on-surface-variant\">SOP batas retensi dan transisi status inventaris kampus.</p>\n</div>\n</div>\n</div>\n<div class=\"flex flex-col gap-space-sm\">\n<div class=\"flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Penyerahan Fisik Temuan Mandiri</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Batas tiket sebelum dibatalkan sistem</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<input class=\"w-16 h-8 text-center rounded bg-surface-container-lowest font-mono font-semibold text-on-surface focus:outline-none\" type=\"number\" value=\"24\"/>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Jam</span>\n</div>\n</div>\n<div class=\"flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Penutupan Otomatis Kehilangan</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Auto-close jika tanpa interaksi klaim</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<input class=\"w-16 h-8 text-center rounded bg-surface-container-lowest font-mono font-semibold text-on-surface focus:outline-none\" type=\"number\" value=\"60\"/>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Hari</span>\n</div>\n</div>\n<div class=\"flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low\">\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface\">Retensi Simpan Barang Fisik SOP</span>\n<span class=\"font-body-sm text-body-sm text-on-surface-variant\">Sebelum disposisi lelang sosial UII</span>\n</div>\n<div class=\"flex items-center gap-2\">\n<input class=\"w-16 h-8 text-center rounded bg-surface-container-lowest font-mono font-semibold text-on-surface focus:outline-none\" type=\"number\" value=\"90\"/>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Hari</span>\n</div>\n</div>\n</div>\n</section>\n<!-- CARD 6: Cryptographic Change History (Append-Only Ledger) -->\n<section class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm\">\n<div class=\"flex items-center justify-between\">\n<div class=\"flex items-center gap-2\">\n<span class=\"material-symbols-outlined text-[20px] text-secondary\">history_edu</span>\n<h3 class=\"font-headline-sm text-headline-sm text-on-surface\">Riwayat Perubahan Parameter (Ledger)</h3>\n</div>\n<a class=\"font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-0.5\" href=\"#\">\n<span>Audit Trail Lengkap</span>\n<span class=\"material-symbols-outlined text-[14px]\">arrow_outward</span>\n</a>\n</div>\n<div class=\"flex flex-col gap-2.5 mt-1\">\n<!-- History Item 1 -->\n<div class=\"p-3 rounded-lg bg-surface-container-low flex flex-col gap-1\">\n<div class=\"flex items-center justify-between text-on-surface\">\n<div class=\"flex items-center gap-2\">\n<span class=\"px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-mono text-[11px] font-bold\">v2.4.1</span>\n<span class=\"font-label-sm text-label-sm font-semibold\">Ir. Ahmad Fauzi, M.T.</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">12 Okt 2024, 14:20</span>\n</div>\n<p class=\"font-body-sm text-[12px] text-on-surface-variant\">\n              \"Pengetatan ambang Rule A1 dari 5 menjadi 3 percobaan klaim sesuai rekomendasi audit INS-2024-0028.\"\n            </p>\n<span class=\"font-mono text-[10px] text-outline truncate\">Hash: 8b6f3a09c21e58d9e2e6fa89c0d12e8310ba</span>\n</div>\n<!-- History Item 2 -->\n<div class=\"p-3 rounded-lg bg-surface-container-low flex flex-col gap-1\">\n<div class=\"flex items-center justify-between text-on-surface\">\n<div class=\"flex items-center gap-2\">\n<span class=\"px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono text-[11px] font-bold\">v2.4.0</span>\n<span class=\"font-label-sm text-label-sm font-semibold\">Ir. Ahmad Fauzi, M.T.</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">01 Sep 2024, 09:15</span>\n</div>\n<p class=\"font-body-sm text-[12px] text-on-surface-variant\">\n              \"Penyesuaian cooldown OTP dari 30s ke 60s untuk mencegah lonjakan kuota gateway WA.\"\n            </p>\n<span class=\"font-mono text-[10px] text-outline truncate\">Hash: 5e42d76a18cb1032f913d80a1c1d8820f4ae</span>\n</div>\n<!-- History Item 3 -->\n<div class=\"p-3 rounded-lg bg-surface-container-low flex flex-col gap-1\">\n<div class=\"flex items-center justify-between text-on-surface\">\n<div class=\"flex items-center gap-2\">\n<span class=\"px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono text-[11px] font-bold\">v2.3.8</span>\n<span class=\"font-label-sm text-label-sm font-semibold\">BSI System Admin</span>\n</div>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">15 Jul 2024, 11:00</span>\n</div>\n<p class=\"font-body-sm text-[12px] text-on-surface-variant\">\n              \"Inisialisasi bobot komputasi runtime awal (Warna 35%, Lokasi 35%, Waktu 30%).\"\n            </p>\n<span class=\"font-mono text-[10px] text-outline truncate\">Hash: a19f074d32098b98124bc0192e44f801657c</span>\n</div>\n</div>\n</section>\n</div>\n</div>\n<!-- Simulated Active Confirmation Modal (FIDO2 MFA & Append-Only Commitment) -->\n<div class=\"fixed inset-0 z-50 hidden items-center justify-center p-4 bg-primary/40 backdrop-blur-sm\" id=\"modal-konfirmasi\" style=\"display: none;\">\n<div class=\"bg-surface-container-lowest rounded-xl max-w-2xl w-full shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200\">\n<!-- Modal Header -->\n<div class=\"px-space-md py-space-md bg-surface-container flex items-center justify-between\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-10 h-10 rounded-xl bg-primary-container text-secondary-fixed flex items-center justify-center\">\n<span class=\"material-symbols-outlined text-[24px]\">verified_user</span>\n</div>\n<div class=\"flex flex-col\">\n<h3 class=\"font-headline-sm text-headline-sm text-on-surface\">Konfirmasi Penerapan Perubahan Parameter Sistem</h3>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant\">Otorisasi FIDO2 Hardware Token \u2022 BSI Ledger Commit</span>\n</div>\n</div>\n<button class=\"w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors\" onclick=\"document.getElementById('modal-konfirmasi').classList.add('hidden')\" type=\"button\">\n<span class=\"material-symbols-outlined text-[20px]\">close</span>\n</button>\n</div>\n<!-- Modal Body -->\n<div class=\"p-space-md flex flex-col gap-space-md\">\n<!-- Warning Notice -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex items-start gap-3\">\n<span class=\"material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5\">info</span>\n<p class=\"font-body-sm text-body-sm text-on-surface leading-snug\">\n            Tindakan ini akan langsung memperbarui logika komputasi runtime dan mesin Sentinel di seluruh posko satpam dan portal publik. Seluruh sesi cache akan diinvalidasi dalam 60 detik.\n          </p>\n</div>\n<!-- Diff Summary Box -->\n<div class=\"flex flex-col gap-1.5\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Ringkasan Perubahan Parameter (Draft Diff)</span>\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2 font-mono text-body-sm text-body-sm\">\n<div class=\"flex items-center justify-between\">\n<span class=\"text-on-surface-variant\">Ambang Rule A1 (Klaim Ganda)</span>\n<span class=\"font-semibold text-on-surface\">3 Percobaan (Tetap)</span>\n</div>\n<div class=\"flex items-center justify-between\">\n<span class=\"text-on-surface-variant\">Toleransi Deviasi Waktu</span>\n<span class=\"font-semibold text-on-surface\">\u00b1 2 Jam (Draft Terverifikasi)</span>\n</div>\n<div class=\"flex items-center justify-between\">\n<span class=\"text-on-surface-variant\">Distribusi Bobot Engine</span>\n<span class=\"font-semibold text-secondary\">35% Visual / 35% Lokasi / 30% Waktu (Seimbang)</span>\n</div>\n</div>\n</div>\n<!-- Justification Input -->\n<div class=\"flex flex-col gap-1.5\">\n<div class=\"flex justify-between items-center\">\n<label class=\"font-label-md text-label-md text-on-surface font-semibold\" for=\"input-justifikasi\">\n              Alasan &amp; Justifikasi Administratif Perubahan <span class=\"text-error\">*</span>\n</label>\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\" id=\"char-counter\">0 / 30 karakter min</span>\n</div>\n<textarea class=\"w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors\" id=\"input-justifikasi\" oninput=\"handleJustificationInput(this)\" placeholder=\"Tuliskan justifikasi formal (contoh: Penyesuaian rekomendasi audit internal BSI setelah simulasi pengujian beban gateway)...\" rows=\"3\"></textarea>\n</div>\n<!-- FIDO2 YubiKey Hardware Token Step -->\n<div class=\"p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between\">\n<div class=\"flex items-center gap-3\">\n<div class=\"w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface\">\n<span class=\"material-symbols-outlined text-[22px]\">key</span>\n</div>\n<div class=\"flex flex-col\">\n<span class=\"font-label-md text-label-md text-on-surface font-semibold\">Otorisasi FIDO2 Hardware Token</span>\n<span class=\"font-body-sm text-[12px] text-on-surface-variant\">Sentuh kunci fisik (YubiKey 5C) pada laptop untuk menandatangani blok.</span>\n</div>\n</div>\n<span class=\"flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold\">\n<span class=\"w-2 h-2 rounded-full bg-secondary animate-ping\"></span>\n            Menunggu Sentuhan\n          </span>\n</div>\n</div>\n<!-- Modal Footer -->\n<div class=\"px-space-md py-space-sm bg-surface-container flex items-center justify-between\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant font-mono\">Operator: ahmad.fauzi@uii.ac.id</span>\n<div class=\"flex items-center gap-2\">\n<button class=\"px-space-md py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors\" onclick=\"document.getElementById('modal-konfirmasi').classList.add('hidden')\" type=\"button\">\n            Batal\n          </button>\n<button class=\"px-space-md py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-2 shadow-md\" id=\"btn-submit-mfa\" onclick=\"submitConfiguration()\" type=\"button\">\n<span class=\"material-symbols-outlined text-[18px]\">fingerprint</span>\n<span>Terapkan &amp; Tanda Tangani Perubahan (MFA)</span>\n</button>\n</div>\n</div>\n</div>\n</div>\n<!-- Inline Script for Reactive Slider Weights and Character Counter -->\n<script>\n    function updateSliders(source, val) {\n      let numVal = parseInt(val) || 0;\n      if (numVal < 0) numVal = 0;\n      if (numVal > 100) numVal = 100;\n\n      // Sync input and slider for modified parameter\n      if (source === 'warna') {\n        document.getElementById('slider-warna').value = numVal;\n        document.getElementById('num-warna').value = numVal;\n      } else if (source === 'lokasi') {\n        document.getElementById('slider-lokasi').value = numVal;\n        document.getElementById('num-lokasi').value = numVal;\n      } else if (source === 'waktu') {\n        document.getElementById('slider-waktu').value = numVal;\n        document.getElementById('num-waktu').value = numVal;\n      }\n\n      const wWarna = parseInt(document.getElementById('num-warna').value) || 0;\n      const wLokasi = parseInt(document.getElementById('num-lokasi').value) || 0;\n      const wWaktu = parseInt(document.getElementById('num-waktu').value) || 0;\n      const total = wWarna + wLokasi + wWaktu;\n\n      // Update proportion bar\n      document.getElementById('bar-warna').style.width = wWarna + '%';\n      document.getElementById('bar-lokasi').style.width = wLokasi + '%';\n      document.getElementById('bar-waktu').style.width = wWaktu + '%';\n\n      // Update Live Status\n      const badge = document.getElementById('badge-total-bobot');\n      const label = document.getElementById('label-total-bobot');\n\n      if (total === 100) {\n        badge.className = \"px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1.5\";\n        label.textContent = \"Total Bobot: 100% (Valid & Seimbang)\";\n      } else {\n        badge.className = \"px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-1.5\";\n        label.textContent = \"Total Bobot: \" + total + \"% (Harus Tepat 100%)\";\n      }\n    }\n\n    function handleJustificationInput(el) {\n      const len = el.value.trim().length;\n      const counter = document.getElementById('char-counter');\n      counter.textContent = len + \" / 30 karakter min\";\n      if (len >= 30) {\n        counter.className = \"font-label-sm text-label-sm text-secondary font-mono font-semibold\";\n      } else {\n        counter.className = \"font-label-sm text-label-sm text-on-surface-variant font-mono\";\n      }\n    }\n\n    function submitConfiguration() {\n      const justifikasi = document.getElementById('input-justifikasi').value.trim();\n      if (justifikasi.length < 30) {\n        alert(\"Alasan & Justifikasi Administratif wajib diisi minimal 30 karakter sebelum FIDO2 commitment.\");\n        return;\n      }\n      \n      const btn = document.getElementById('btn-submit-mfa');\n      btn.innerHTML = '<span class=\"material-symbols-outlined text-[18px] animate-spin\">refresh</span><span>Menandatangani ke Ledger...</span>';\n      \n      setTimeout(() => {\n        alert(\"Tanda tangan FIDO2 berhasil divalidasi! Blok konfigurasi #00142897 telah ditambahkan ke Append-Only Ledger BSI.\");\n        document.getElementById('modal-konfirmasi').classList.add('hidden');\n        btn.innerHTML = '<span class=\"material-symbols-outlined text-[18px]\">fingerprint</span><span>Terapkan & Tanda Tangani Perubahan (MFA)</span>';\n      }, 1200);\n    }\n  </script>\n</div></main><footer class=\"w-full bg-surface-container-lowest py-space-sm shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-auto\"><div class=\"max-w-[1440px] mx-auto px-space-lg flex items-center justify-between text-on-surface-variant\"><div class=\"flex items-center gap-2 font-label-sm text-label-sm\"><span class=\"material-symbols-outlined text-[16px] text-secondary\">shield</span><span>Badan Sistem Informasi (BSI) Universitas Islam Indonesia \u2022 Kepatuhan ISO/IEC 27001 &amp; Audit Trail Terdistribusi</span></div><div class=\"font-label-sm text-label-sm text-outline\">Setiap tindakan dipertanggungjawabkan dalam rantai audit.</div></div></footer></div>";

export default function KonfigurasiSentinel({ onNavigate }) {
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
