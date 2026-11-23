import React, { useEffect, useRef } from "react";

// Layar Stitch: Form Lapor Temuan (Langkah 1: Detail Barang)
const rawHTML =
  '<!-- BEGIN: MainHeader -->\n<header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-200">\n<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">\n<!-- Brand Logo & Identity -->\n<a class="flex items-center space-x-3.5 group cursor-pointer" data-path="beranda" href="#beranda">\n<div class="w-11 h-11 rounded-xl bg-uiiNavy text-white flex items-center justify-center shadow-md group-hover:bg-blue-700 transition">\n<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n<path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>\n</svg>\n</div>\n<div>\n<span class="block text-lg font-bold text-slate-900 tracking-tight leading-tight">Lost &amp; Found UII</span>\n<span class="block text-xs font-medium text-slate-500">Kampus Terpadu \u2022 Temukan kembali barangmu</span>\n</div>\n</a>\n<!-- Desktop Navigation Links -->\n<nav class="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">\n<a class="hover:text-uiiNavy transition cursor-pointer" data-path="beranda" href="#beranda">Beranda</a>\n<a class="hover:text-uiiNavy transition cursor-pointer" data-path="barang-temuan" href="#barang-temuan">Barang Temuan</a>\n<a class="hover:text-uiiNavy transition cursor-pointer" data-path="cara-kerja" href="#cara-kerja">Cara Kerja</a>\n<a class="hover:text-uiiNavy transition cursor-pointer" data-path="pos-satpam" href="#pos-satpam">Pos Satpam</a>\n<a class="hover:text-uiiNavy transition cursor-pointer" data-path="faq" href="#faq">FAQ</a>\n</nav>\n<!-- Action Buttons (No Login Required) -->\n<div class="flex items-center space-x-3">\n<button class="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 hover:border-slate-400 shadow-sm transition cursor-pointer" data-path="saya-kehilangan" type="button">\n  Saya Kehilangan\n</button>\n<button class="inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-uiiNavy hover:bg-slate-800 rounded-full shadow-sm hover:shadow transition cursor-pointer" data-path="saya-menemukan" type="button">\n  Saya Menemukan\n</button>\n</div>\n</div>\n</header>\n<!-- END: MainHeader --><main class="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]"><div class="flex flex-col w-full">\n<!-- Content Area Container (1200px max, margins) -->\n<div class="max-w-[1200px] w-full mx-auto px-margin-mobile md:px-margin pb-space-xl">\n<!-- 1. Breadcrumb Bar & Status Pill -->\n<nav aria-label="Breadcrumb" class="py-space-md flex flex-wrap items-center justify-between gap-y-2 gap-x-4">\n<ol class="flex items-center flex-wrap gap-1.5 font-label-md text-label-md text-on-surface-variant">\n<li>\n<a class="hover:text-on-surface transition-colors flex items-center gap-1 cursor-pointer" data-path="beranda" href="#beranda">\n<span class="material-symbols-outlined text-[16px]">home</span>\n<span>Beranda</span>\n</a>\n</li>\n<li class="text-outline-variant font-normal">/</li>\n<li>\n<a class="hover:text-on-surface transition-colors cursor-pointer" data-path="saya-menemukan" href="#">Saya Menemukan Barang</a>\n</li>\n<li class="text-outline-variant font-normal">/</li>\n<li class="text-on-surface font-semibold truncate max-w-[280px] sm:max-w-none">\n          Lapor Temuan Online (Langkah 1: Detail Barang &amp; Penemu)\n        </li>\n</ol>\n<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shadow-sm">\n<span class="material-symbols-outlined text-[14px]">security</span>\n<span>Unit Layanan Keamanan Terpadu UII</span>\n</div>\n</nav>\n<!-- 2. Stepper Progres 3 Langkah (Campus Guardian Design) -->\n<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter my-space-md">\n<!-- Step 1: Active Navy Card -->\n<div class="bg-primary text-on-primary rounded-xl p-space-md shadow-md flex items-center gap-space-sm relative overflow-hidden">\n<div class="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-sm text-headline-sm shrink-0 shadow-sm">\n          1\n        </div>\n<div class="min-w-0 flex flex-col">\n<span class="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">Langkah Aktif</span>\n<span class="font-headline-sm text-headline-sm text-on-primary truncate">Detail Barang &amp; Kontak</span>\n</div>\n<div class="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-10 pointer-events-none">\n<span class="material-symbols-outlined text-[72px]">assignment</span>\n</div>\n</div>\n<!-- Step 2: Pending Step -->\n<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center gap-space-sm opacity-80">\n<div class="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-headline-sm text-headline-sm shrink-0">\n          2\n        </div>\n<div class="min-w-0 flex flex-col">\n<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Langkah 2</span>\n<span class="font-headline-sm text-headline-sm text-on-surface truncate">Verifikasi WhatsApp</span>\n</div>\n</div>\n<!-- Step 3: Pending Step -->\n<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center gap-space-sm opacity-80">\n<div class="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-headline-sm text-headline-sm shrink-0">\n          3\n        </div>\n<div class="min-w-0 flex flex-col">\n<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Langkah 3</span>\n<span class="font-headline-sm text-headline-sm text-on-surface truncate">Persetujuan &amp; Selesai</span>\n</div>\n</div>\n</div>\n<!-- 3. Header Formulir -->\n<div class="pt-space-md pb-space-lg">\n<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm mb-2">\n<span class="w-2 h-2 rounded-full bg-secondary"></span>\n<span>Formulir Penemuan Barang Civitas UII</span>\n</div>\n<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Lapor Barang Temuan</h1>\n<p class="font-body-lg text-body-lg text-on-surface-variant mt-1 max-w-3xl">\n        Bantu kembalikan barang milik civitas kampus yang tertinggal. Isi rincian temuan di bawah ini untuk memulai pencatatan tiket inventarisasi resmi.\n      </p>\n</div>\n<!-- 4. Layout Utama (Grid 2 Kolom: 8 Col Kiri, 4 Col Kanan) -->\n<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">\n<!-- ================= KOLOM KIRI (Formulir Utama) ================= -->\n<div class="lg:col-span-8 flex flex-col gap-space-lg">\n<!-- Notifikasi / Catatan Penting: Foto Barang Dilakukan di Pos Satpam -->\n<div class="bg-secondary-fixed/50 rounded-xl p-space-md shadow-sm flex items-start gap-space-sm">\n<div class="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm mt-0.5">\n<span class="material-symbols-outlined text-[22px]">no_photography</span>\n</div>\n<div class="flex flex-col gap-0.5">\n<div class="flex items-center gap-2">\n<span class="font-label-lg text-label-lg text-on-secondary-fixed font-bold">Catatan Penting Penyerahan:</span>\n<span class="px-2 py-0.5 rounded-full bg-surface-container-lowest text-secondary text-label-sm font-label-sm font-semibold">SOP Terverifikasi</span>\n</div>\n<p class="font-body-md text-body-md text-on-surface leading-relaxed">\n<strong>Foto barang akan diambil dan didokumentasikan langsung oleh petugas Satpam</strong> saat penyerahan fisik di Pos Jaga terdekat. Anda tidak perlu mengunggah foto sekarang.\n            </p>\n<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">\n              Hal ini dilakukan demi menjaga netralitas, objektivitas sudut dokumentasi katalog kampus, dan verifikasi fisik segel oleh regu keamanan.\n            </p>\n</div>\n</div>\n<!-- Formulir Aktif -->\n<form class="flex flex-col gap-space-lg" id="lostFoundForm">\n<!-- BAGIAN 1: Rincian Barang Temuan -->\n<div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">\n<div class="flex items-center justify-between pb-space-xs">\n<div class="flex items-center gap-space-xs">\n<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">\n<span class="material-symbols-outlined text-[20px]">category</span>\n</div>\n<h2 class="font-headline-md text-headline-md text-on-surface">1. Data Karakteristik Barang</h2>\n</div>\n<span class="font-label-sm text-label-sm text-secondary font-semibold bg-secondary-fixed/40 px-2.5 py-1 rounded-full">Wajib Diisi</span>\n</div>\n<!-- Field Kategori Barang -->\n<div class="flex flex-col gap-1.5" id="group-category">\n<label class="font-label-lg text-label-lg text-on-surface flex items-center justify-between" for="itemCategory">\n<span>Kategori Barang <span class="text-error">*</span></span>\n<span class="font-label-sm text-label-sm text-on-surface-variant">Pilih yang paling mendekati</span>\n</label>\n<div class="relative">\n<select class="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-xl px-4 py-3 appearance-none focus:outline-none focus:bg-surface-container transition-all cursor-pointer" id="itemCategory" name="itemCategory">\n<option value=\"\">Pilih kategori barang temuan...</option>\n<option value=\"1\">Elektronik &amp; Gadget (Laptop, Ponsel, Tablet, Charger, Earphone)</option>\n<option value=\"2\">Dompet, Uang Tunai &amp; Dokumen Penting (KTM, KTP, SIM, STNK, ATM)</option>\n<option value=\"3\">Kunci Kendaraan / Kunci Ruangan / Loker</option>\n<option value=\"4\">Tas, Ransel, Tote Bag &amp; Pouch</option>\n<option value=\"5\">Perlengkapan Belajar, Binder, Buku Teks &amp; Kalkulator Ilmiah</option>\n<option value=\"6\">Botol Minum / Tumbler, Payung &amp; Pakaian (Jaket, Jas Lab)</option>\n<option value=\"7\">Kacamata &amp; Aksesoris Pribadi (Jam Tangan, Perhiasan)</option>\n<option value=\"8\">Lain-lain / Belum Teridentifikasi</option>\n</select>\n<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">\n<span class="material-symbols-outlined text-[20px]">expand_more</span>\n</div>\n</div>\n<span class="field-error-msg hidden font-label-sm text-label-sm text-error items-center gap-1">\n<span class="material-symbols-outlined text-[14px]">error</span>\n<span>Kategori barang wajib dipilih.</span>\n</span>\n</div>\n<!-- Field Warna Dominan (Input bebas + Quick chips) -->\n<div class="flex flex-col gap-1.5">\n<label class="font-label-lg text-label-lg text-on-surface flex items-center justify-between" for="dominantColor">\n<span>Warna Dominan Barang <span class="text-error">*</span></span>\n<span class="font-label-sm text-label-sm text-on-surface-variant">Contoh: Hitam, Biru Dongker</span>\n</label>\n<input class="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-xl px-4 py-3 focus:outline-none focus:bg-surface-container transition-all" id="dominantColor" name="dominantColor" placeholder="Ketik warna dominan atau kombinasi (cth: Hitam aksen merah)" type="text"/>\n<!-- Quick selection chips -->\n<div class="flex flex-wrap items-center gap-1.5 pt-1">\n<span class="font-label-sm text-label-sm text-on-surface-variant mr-1">Rekomendasi Cepat:</span>\n<button class="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer" type="button" data-color="Hitam">\n<span class="w-2.5 h-2.5 rounded-full bg-black inline-block"></span> Hitam\n</button>\n<button class="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer" type="button" data-color="Biru Dongker (Navy)">\n<span class="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span> Biru / Navy\n</button>\n<button class="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer" type="button" data-color="Abu-abu / Silver">\n<span class="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block"></span> Abu-abu\n</button>\n<button class="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer" type="button" data-color="Putih">\n<span class="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] inline-block"></span> Putih\n</button>\n<button class="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer" type="button" data-color="Cokelat">\n<span class="w-2.5 h-2.5 rounded-full bg-amber-900 inline-block"></span> Cokelat\n</button>\n</div>\n</div>\n<!-- Field Lokasi Ditemukan -->\n<div class="flex flex-col gap-1.5" id="group-location">\n<label class="font-label-lg text-label-lg text-on-surface flex items-center justify-between" for="foundLocation">\n<span>Lokasi Ditemukan di Kampus <span class="text-error">*</span></span>\n<span class="font-label-sm text-label-sm text-on-surface-variant">Pilih atau sebutkan area kampus</span>\n</label>\n<div class="relative">\n<select class="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-xl pl-4 pr-10 py-3 appearance-none focus:outline-none focus:bg-surface-container transition-all cursor-pointer" id="foundLocation" name="foundLocation">\n<option value=\"\">Pilih lokasi ditemukan di kampus...</option>\n<option value=\"1\">Gedung Kuliah Umum (GKU) Prof. Dr. Sardjito - Lantai 1</option>\n<option value=\"2\">Gedung Kuliah Umum (GKU) Prof. Dr. Sardjito - Lantai 2</option>\n<option value=\"3\">Gedung Kuliah Umum (GKU) Prof. Dr. Sardjito - Lantai 3</option>\n<option value=\"4\">Perpustakaan Pusat UII - Area Baca Terbuka</option>\n<option value=\"5\">Perpustakaan Pusat UII - Ruang Referensi &amp; Skripsi</option>\n<option value=\"6\">Masjid Ulil Albab - Area Wudhu / Sholat Pria</option>\n<option value=\"7\">Masjid Ulil Albab - Area Wudhu / Sholat Wanita</option>\n<option value=\"8\">Masjid Ulil Albab - Serambi Depan</option>\n<option value=\"9\">Gedung GBPH Prabuningrat (Rektorat) - Lobi Informasi</option>\n<option value=\"10\">Fakultas Bisnis dan Ekonomika (FBE) - Selasar Utara</option>\n<option value=\"11\">Fakultas Teknik Sipil dan Perencanaan (FTSP) - Lab Komputer</option>\n<option value=\"12\">Fakultas Teknologi Industri (FTI) - Ruang Diskusi</option>\n<option value=\"13\">Fakultas Hukum (FH) - Gazebo Mahasiswa</option>\n<option value=\"14\">Kantin Sentral Boulevard Utama</option>\n<option value=\"15\">Area Parkir Sepeda Motor Gerbang Barat</option>\n<option value=\"16\">Area Parkir Utama Gedung Olahraga (GOR)</option>\n</select>\n<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">\n<span class="material-symbols-outlined text-[20px]">expand_more</span>\n</div>\n</div>\n<span class="field-error-msg hidden font-label-sm text-label-sm text-error items-center gap-1">\n<span class="material-symbols-outlined text-[14px]">error</span>\n<span>Lokasi ditemukan wajib dipilih.</span>\n</span>\n</div>\n<!-- Field Waktu Ditemukan: Tanggal & Perkiraan Jam -->\n<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">\n<!-- Tanggal Ditemukan -->\n<div class="flex flex-col gap-1.5">\n<label class="font-label-lg text-label-lg text-on-surface" for="foundDate">\n                  Tanggal Ditemukan <span class="text-error">*</span>\n</label>\n<div class="relative">\n<input class="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-xl px-4 py-3 focus:outline-none focus:bg-surface-container transition-all cursor-pointer" id="foundDate" name="foundDate" type="date"/>\n</div>\n</div>\n<!-- Jam / Rentang Waktu -->\n<div class="flex flex-col gap-1.5">\n<label class="font-label-lg text-label-lg text-on-surface flex items-center justify-between" for="foundTime">\n<span>Perkiraan Jam Ditemukan</span>\n<span class="font-label-sm text-label-sm text-on-surface-variant">WIB</span>\n</label>\n<input class="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-xl px-4 py-3 focus:outline-none focus:bg-surface-container transition-all" id="foundTime" name="foundTime" type="time" value="10:30"/>\n</div>\n</div>\n<!-- Quick Shift Radio Pills -->\n<div class="flex flex-wrap items-center gap-2">\n<span class="font-label-sm text-label-sm text-on-surface-variant">Atau pilih perkiraan rentang waktu:</span>\n<button class="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all cursor-pointer" type="button" data-time="08:30">\n                Pagi (07.00 - 11.00)\n              </button>\n<button class="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all cursor-pointer" type="button" data-time="13:15">\n                Siang (11.00 - 15.00)\n              </button>\n<button class="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all cursor-pointer" type="button" data-time="16:45">\n                Sore / Malam (15.00 - 20.00)\n              </button>\n</div>\n<!-- Field Deskripsi Singkat -->\n<div class="flex flex-col gap-1.5" id="group-description">\n<label class="font-label-lg text-label-lg text-on-surface flex items-center justify-between" for="itemDescription">\n<span>Deskripsi Singkat &amp; Ciri Khusus <span class="text-error">*</span></span>\n<span class="font-label-sm text-label-sm text-on-surface-variant" id="charCount">Min. 10 karakter</span>\n</label>\n<textarea class="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-xl px-4 py-3 focus:outline-none focus:bg-surface-container transition-all resize-none" id="itemDescription" name="itemDescription" placeholder="Contoh: Dompet lipat hitam merk Eiger, ditemukan di kursi deret ketiga ruang kelas 2.4 GKU setelah perkuliahan jam kedua selesai. Terdapat gantungan tali kecil warna abu-abu." rows="3"></textarea>\n<div class="flex items-center justify-between">\n<p class="font-body-sm text-body-sm text-on-surface-variant">\n                  Sebutkan kondisi umum dan letak spesifik barang saat Anda menemukannya.\n                </p>\n</div>\n<span class="field-error-msg hidden font-label-sm text-label-sm text-error items-center gap-1">\n<span class="material-symbols-outlined text-[14px]">error</span>\n<span>Deskripsi terlalu pendek (minimal 10 karakter).</span>\n</span>\n</div>\n</div>\n<!-- BAGIAN 2: Data Diri Penemu & WhatsApp -->\n<div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">\n<div class="flex items-center justify-between pb-space-xs">\n<div class="flex items-center gap-space-xs">\n<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">\n<span class="material-symbols-outlined text-[20px]">person_pin</span>\n</div>\n<h2 class="font-headline-md text-headline-md text-on-surface">2. Kontak Penemu (Untuk Pengiriman Kode Tiket)</h2>\n</div>\n<span class="font-label-sm text-label-sm text-secondary font-semibold bg-secondary-fixed/40 px-2.5 py-1 rounded-full">Kerahasiaan Terjaga</span>\n</div>\n<!-- Callout Perlindungan Privasi / Anonimitas -->\n<div class="bg-surface-container-low rounded-xl p-space-md flex items-start gap-space-xs">\n<span class="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">lock</span>\n<p class="font-body-sm text-body-sm text-on-surface-variant">\n<strong>Privasi Terjamin:</strong> Nomor telepon dan identitas asli Anda tidak akan pernah dipublikasikan. Data hanya digunakan oleh sistem Keamanan UII untuk konfirmasi serah terima fisik barang.\n              </p>\n</div>\n<!-- Field Nama Penemu -->\n<div class="flex flex-col gap-1.5">\n<label class="font-label-lg text-label-lg text-on-surface flex items-center justify-between" for="reporterName">\n<span>Nama Lengkap Anda</span>\n<span class="font-label-sm text-label-sm text-on-surface-variant">Opsional jika anonim</span>\n</label>\n<input class="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-xl px-4 py-3 focus:outline-none focus:bg-surface-container transition-all" id="reporterName" name="reporterName" placeholder="Ketik nama lengkap atau inisial Anda..." type="text"/>\n<!-- Checkbox Anonim -->\n<label class="flex items-center gap-2.5 mt-1 cursor-pointer select-none">\n<input checked=\"\" class="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary" id="anonCheck" name="isAnonymous" type="checkbox"/>\n<span class="font-body-md text-body-md text-on-surface">\n                  Tampilkan nama saya sebagai <strong class="text-secondary font-semibold">\u201cCivitas Peduli (Anonim)\u201d</strong> di katalog barang temuan publik.\n                </span>\n</label>\n</div>\n<!-- Field Nomor WhatsApp -->\n<div class="flex flex-col gap-1.5" id="group-whatsapp">\n<label class="font-label-lg text-label-lg text-on-surface flex items-center justify-between" for="reporterWhatsapp">\n<span>Nomor WhatsApp Aktif <span class="text-error">*</span></span>\n<span class="font-label-sm text-label-sm text-secondary font-semibold">Tujuan Kirim OTP</span>\n</label>\n<div class="flex rounded-xl overflow-hidden bg-surface-container-low focus-within:bg-surface-container transition-all">\n<div class="flex items-center gap-1.5 px-4 bg-surface-container text-on-surface font-label-md text-label-md shrink-0">\n<span class="material-symbols-outlined text-[18px] text-on-surface-variant">call</span>\n<span>+62 (ID)</span>\n</div>\n<input class="w-full bg-transparent text-on-surface font-body-md text-body-md px-4 py-3 focus:outline-none" id="reporterWhatsapp" name="reporterWhatsapp" placeholder="812-3456-7890" type="tel"/>\n</div>\n<div class="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">\n<span class="material-symbols-outlined text-[14px] text-secondary">verified</span>\n<span>Kode verifikasi OTP 6-digit dan bukti tanda terima laporan akan otomatis dikirimkan ke nomor ini.</span>\n</div>\n<span class="field-error-msg hidden font-label-sm text-label-sm text-error items-center gap-1">\n<span class="material-symbols-outlined text-[14px]">error</span>\n<span>Nomor WhatsApp tidak valid. Masukkan minimal 9-13 digit nomor aktif.</span>\n</span>\n</div>\n</div>\n<!-- Bagian Aksi Formulir (CTA Buttons) -->\n<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">\n<a class="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-space-md py-3 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all text-center cursor-pointer" data-path="saya-menemukan" href="#">\n<span class="material-symbols-outlined text-[18px]">arrow_back</span>\n<span>Batal / Kembali ke Menu</span>\n</a>\n<div class="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-space-xs">\n<span class="font-label-sm text-label-sm text-on-surface-variant text-center sm:text-right hidden md:block">\n                Estimasi verifikasi &lt; 1 menit\n              </span>\n<button class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:opacity-95 transition-all cursor-pointer" type="submit">\n<span>Kirim OTP &amp; Lanjut ke Verifikasi</span>\n<span class="material-symbols-outlined text-[18px]">arrow_forward</span>\n</button>\n</div>\n</div>\n</form>\n<!-- SEKSI SIMULASI VALIDASI ERROR -->\n<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">\n<div class="flex items-center justify-between">\n<div class="flex items-center gap-2">\n<div class="w-7 h-7 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">\n<span class="material-symbols-outlined text-[18px]">rule</span>\n</div>\n<span class="font-headline-sm text-headline-sm text-on-surface">Tampilan Status Validasi Formulir (Per-field Error States)</span>\n</div>\n<button class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer" id="btnToggleDemo" type="button">\n<span class="material-symbols-outlined text-[14px]">tune</span>\n<span id="demoToggleText">Simulasikan Error</span>\n</button>\n</div>\n<p class="font-body-sm text-body-sm text-on-surface-variant">\n            Pratinjau aturan pencegahan kesalahan pengisian formulir sebelum tiket inventarisasi diproses oleh sistem keamanan:\n          </p>\n<div class="grid grid-cols-1 sm:grid-cols-2 gap-space-xs pt-1">\n<div class="p-2.5 rounded-lg bg-surface-container flex items-start gap-2">\n<span class="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">cancel</span>\n<div class="flex flex-col">\n<span class="font-label-md text-label-md text-on-surface">Kategori Barang</span>\n<span class="font-body-sm text-body-sm text-error">Wajib dipilih dari opsi terstandar.</span>\n</div>\n</div>\n<div class="p-2.5 rounded-lg bg-surface-container flex items-start gap-2">\n<span class="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">cancel</span>\n<div class="flex flex-col">\n<span class="font-label-md text-label-md text-on-surface">Lokasi Ditemukan</span>\n<span class="font-body-sm text-body-sm text-error">Harus spesifik sebutkan gedung &amp; lantai.</span>\n</div>\n</div>\n<div class="p-2.5 rounded-lg bg-surface-container flex items-start gap-2">\n<span class="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">cancel</span>\n<div class="flex flex-col">\n<span class="font-label-md text-label-md text-on-surface">Deskripsi Barang</span>\n<span class="font-body-sm text-body-sm text-error">Terlalu pendek (minimal 10 karakter rinci).</span>\n</div>\n</div>\n<div class="p-2.5 rounded-lg bg-surface-container flex items-start gap-2">\n<span class="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">cancel</span>\n<div class="flex flex-col">\n<span class="font-label-md text-label-md text-on-surface">Nomor WhatsApp</span>\n<span class="font-body-sm text-body-sm text-error">Nomor tidak valid (harus 9-13 digit angka aktif).</span>\n</div>\n</div>\n</div>\n</div>\n</div>\n<!-- ================= KOLOM KANAN (Sidebar Bantuan & SOP) ================= -->\n<aside class="lg:col-span-4 flex flex-col gap-space-md">\n<!-- CARD 1: Alur Setelah Lapor Online -->\n<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">\n<div class="flex items-center gap-space-xs pb-space-xs">\n<div class="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">\n<span class="material-symbols-outlined text-[18px]">timeline</span>\n</div>\n<h3 class="font-headline-sm text-headline-sm text-on-surface">Alur Setelah Lapor Online</h3>\n</div>\n<!-- Step Timeline -->\n<div class="relative pl-6 space-y-4">\n<!-- Timeline vertical line -->\n<div class="absolute left-2.5 top-2 bottom-2 w-0.5 bg-surface-container-high"></div>\n<!-- Step 1 (Current) -->\n<div class="relative flex flex-col">\n<span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-secondary-fixed"></span>\n<span class="font-label-md text-label-md text-secondary font-semibold">1. Isi Form &amp; Verifikasi WhatsApp</span>\n<span class="font-body-sm text-body-sm text-on-surface-variant">Sedang berlangsung di halaman ini.</span>\n</div>\n<!-- Step 2 -->\n<div class="relative flex flex-col">\n<span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-outline-variant"></span>\n<span class="font-label-md text-label-md text-on-surface font-semibold">2. Dapatkan Tiket Laporan &amp; QR</span>\n<span class="font-body-sm text-body-sm text-on-surface-variant">Sistem mengenerate kode unik drop-off dan bukti serah terima via WhatsApp.</span>\n</div>\n<!-- Step 3 -->\n<div class="relative flex flex-col">\n<span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-outline-variant"></span>\n<span class="font-label-md text-label-md text-on-surface font-semibold">3. Serahkan Fisik Barang</span>\n<span class="font-body-sm text-body-sm text-on-surface-variant">Bawa barang ke salah satu Pos Satpam dalam waktu maksimal <strong>24 jam</strong>.</span>\n</div>\n<!-- Step 4 -->\n<div class="relative flex flex-col">\n<span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-outline-variant"></span>\n<span class="font-label-md text-label-md text-on-surface font-semibold">4. Verifikasi &amp; Foto Satpam</span>\n<span class="font-body-sm text-body-sm text-on-surface-variant">Petugas memotret barang fisik dan mempublikasikannya ke etalase publik.</span>\n</div>\n</div>\n</div>\n<!-- CARD 2: Titik Drop-off Pos Satpam Siaga 24 Jam -->\n<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">\n<div class="flex items-center justify-between pb-space-xs">\n<div class="flex items-center gap-space-xs">\n<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">\n<span class="material-symbols-outlined text-[18px]">local_police</span>\n</div>\n<h3 class="font-headline-sm text-headline-sm text-on-surface">Titik Drop-off Pos Jaga</h3>\n</div>\n<span class="font-label-sm text-label-sm text-on-secondary-fixed bg-secondary-fixed px-2 py-0.5 rounded-full font-semibold">24 Jam</span>\n</div>\n<div class="space-y-space-xs font-body-sm text-body-sm">\n<!-- Pos 1 -->\n<div class="p-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-start gap-space-xs">\n<span class="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">location_on</span>\n<div class="flex flex-col">\n<span class="font-label-md text-label-md text-on-surface font-bold">Posko Induk GKU (Gedung Sardjito)</span>\n<span class="text-on-surface-variant">Lantai Dasar Sayap Barat \u2022 Buka 24 Jam</span>\n</div>\n</div>\n<!-- Pos 2 -->\n<div class="p-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-start gap-space-xs">\n<span class="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">location_on</span>\n<div class="flex flex-col">\n<span class="font-label-md text-label-md text-on-surface font-bold">Pos Gerbang Utama (Jl. Kaliurang KM 14.5)</span>\n<span class="text-on-surface-variant">Layanan Drop Cepat 24 Jam di Pintu Masuk Utama</span>\n</div>\n</div>\n<!-- Pos 3 -->\n<div class="p-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-start gap-space-xs">\n<span class="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">location_on</span>\n<div class="flex flex-col">\n<span class="font-label-md text-label-md text-on-surface font-bold">Pos Parkir Sentral / GOR UII</span>\n<span class="text-on-surface-variant">Area Parkir Timur Dekat Lapangan Tenis</span>\n</div>\n</div>\n</div>\n<div class="pt-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">\n<span class="flex items-center gap-1">\n<span class="material-symbols-outlined text-[16px]">call</span>\n<span>Hotline Satpam: 0274-898444 (ext. 1111)</span>\n</span>\n</div>\n</div>\n<!-- CARD 3: Prinsip Integritas Kampus -->\n<div class="bg-surface-container rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs relative overflow-hidden">\n<div class="flex items-center gap-2">\n<span class="material-symbols-outlined text-secondary text-[22px]">verified_user</span>\n<h3 class="font-headline-sm text-headline-sm text-on-surface">Prinsip Integritas Kampus</h3>\n</div>\n<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">\n            Menjunjung tinggi nilai amanah, kejujuran, dan kepedulian sesama warga kampus. Setiap pelaporan dan penyerahan barang di UII adalah <strong>100% bebas biaya</strong>.\n          </p>\n<div class="mt-2 pt-2 flex flex-col gap-1.5 font-label-sm text-label-sm text-on-surface">\n<div class="flex items-center gap-1.5">\n<span class="material-symbols-outlined text-secondary text-[16px]">check_circle</span>\n<span>Pencatatan Berita Acara Serah Terima Resmi</span>\n</div>\n<div class="flex items-center gap-1.5">\n<span class="material-symbols-outlined text-secondary text-[16px]">check_circle</span>\n<span>Loker Penyimpanan Bersegel Khusus</span>\n</div>\n<div class="flex items-center gap-1.5">\n<span class="material-symbols-outlined text-secondary text-[16px]">check_circle</span>\n<span>Klarifikasi Bukti Kepemilikan yang Ketat</span>\n</div>\n</div>\n</div>\n<!-- Visual Campus Support Card -->\n<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center gap-3">\n<div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">\n<span class="material-symbols-outlined text-[24px] text-on-surface-variant">support_agent</span>\n</div>\n<div class="flex flex-col">\n<span class="font-label-md text-label-md text-on-surface">Butuh Bantuan Mendesak?</span>\n<span class="font-body-sm text-body-sm text-on-surface-variant">Hubungi Satpam Kampus Terpadu via WhatsApp</span>\n<a class="font-label-sm text-label-sm text-secondary font-semibold hover:underline mt-0.5 flex items-center gap-0.5" href="https://wa.me/628112555844" target="_blank">\n<span>Buka WhatsApp Keamanan</span>\n<span class="material-symbols-outlined text-[14px]">arrow_outward</span>\n</a>\n</div>\n</div>\n</aside>\n</div>\n</div>\n</div></main><footer class="w-full bg-surface-container-lowest shadow-[0_-4px_24px_rgba(15,23,42,0.03)] mt-space-xl"><div class="max-w-[1200px] mx-auto px-margin py-space-xl"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter"><div class="space-y-space-sm"><div class="flex items-center gap-space-xs"><div class="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed"><span class="material-symbols-outlined text-[18px]">shield</span></div><span class="font-headline-sm text-headline-sm text-on-surface">Lost &amp; Found UII</span></div><p class="font-body-sm text-body-sm text-on-surface-variant">Sistem informasi inventarisasi pelaporan barang temuan dan kehilangan civitas akademika Universitas Islam Indonesia, terkoordinasi dengan Unit Keamanan Terpadu.</p><div class="pt-space-xs flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm"><span class="material-symbols-outlined text-secondary text-[16px]">verified</span><span>Layanan Resmi Kampus Terpadu</span></div></div><div class="space-y-space-sm"><h3 class="font-headline-sm text-headline-sm text-on-surface">Pos Satpam Siaga</h3><ul class="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant"><li><strong class="text-on-surface block font-label-md text-label-md">Pos Gerbang Utama:</strong>Jl. Kaliurang KM 14.5 (Pintu Masuk Utama)</li><li><strong class="text-on-surface block font-label-md text-label-md">Pos Gedung Kuliah Umum (GKU):</strong>Lantai Dasar Sayap Barat Gedung Prof. Dr. Sardjito</li><li><strong class="text-on-surface block font-label-md text-label-md">Gedung Rektorat (GBPH Prabuningrat):</strong>Lobi Informasi Keamanan &amp; Ketertiban</li></ul></div><div class="space-y-space-sm"><h3 class="font-headline-sm text-headline-sm text-on-surface">Kontak Cepat Keamanan</h3><div class="space-y-space-xs"><div class="flex items-start gap-space-xs"><span class="material-symbols-outlined text-secondary text-[18px] mt-0.5">phone_in_talk</span><div><span class="font-label-sm text-label-sm text-on-surface-variant block">Hotline Keamanan 24 Jam</span><span class="font-label-md text-label-md text-on-surface">(0274) 898444 ext. 1111</span></div></div><div class="flex items-start gap-space-xs"><span class="material-symbols-outlined text-secondary text-[18px] mt-0.5">chat</span><div><span class="font-label-sm text-label-sm text-on-surface-variant block">WhatsApp Call Center</span><span class="font-label-md text-label-md text-on-surface">+62 811-2555-844</span></div></div><div class="flex items-start gap-space-xs"><span class="material-symbols-outlined text-secondary text-[18px] mt-0.5">mail</span><div><span class="font-label-sm text-label-sm text-on-surface-variant block">Surel Layanan</span><span class="font-label-md text-label-md text-on-surface">keamanan@uii.ac.id</span></div></div></div></div><div class="space-y-space-sm"><h3 class="font-headline-sm text-headline-sm text-on-surface">Tautan Cepat</h3><ul class="space-y-space-xs font-body-sm text-body-sm"><li class="flex items-center gap-1 text-on-surface-variant hover:text-on-surface"><span class="material-symbols-outlined text-[14px]">chevron_right</span><a data-path="beranda" href="#">Halaman Beranda</a></li><li class="flex items-center gap-1 text-on-surface-variant hover:text-on-surface"><span class="material-symbols-outlined text-[14px]">chevron_right</span><a data-path="barang-temuan" href="#">Daftar Barang Temuan Terkini</a></li><li class="flex items-center gap-1 text-on-surface-variant hover:text-on-surface"><span class="material-symbols-outlined text-[14px]">chevron_right</span><a data-path="cara-kerja" href="#">Prosedur Klaim Kepemilikan</a></li><li class="flex items-center gap-1 text-on-surface-variant hover:text-on-surface"><span class="material-symbols-outlined text-[14px]">chevron_right</span><a data-path="pos-satpam" href="#">Daftar Lokasi Pos Jaga</a></li><li class="flex items-center gap-1 text-on-surface-variant hover:text-on-surface"><span class="material-symbols-outlined text-[14px]">chevron_right</span><a data-path="faq" href="#">Pertanyaan Umum (FAQ)</a></li></ul></div></div><div class="mt-space-lg pt-space-md border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant"><p>\u00a9 2025 Universitas Islam Indonesia \u2022 Unit Keamanan &amp; Ketertiban Kampus Terpadu.</p><div class="flex items-center gap-space-md font-label-sm text-label-sm"><a class="hover:text-on-surface transition-colors" href="#">Kebijakan Privasi</a><span class="text-outline-variant">\u2022</span><a class="hover:text-on-surface transition-colors" href="#">Ketentuan Layanan</a><span class="text-outline-variant">\u2022</span><a class="hover:text-on-surface transition-colors" href="#">Panduan Verifikasi</a></div></div></div></footer>';

const API_BASE_URL = "http://localhost:8080";

const DEFAULT_CATEGORIES = [
  { category_id: 1, name: "Elektronik & Gadget (Laptop, Ponsel, Tablet, Charger, Earphone)" },
  { category_id: 2, name: "Dompet, Uang Tunai & Dokumen Penting (KTM, KTP, SIM, STNK, ATM)" },
  { category_id: 3, name: "Kunci Kendaraan / Kunci Ruangan / Loker" },
  { category_id: 4, name: "Tas, Ransel, Tote Bag & Pouch" },
  { category_id: 5, name: "Perlengkapan Belajar, Binder, Buku Teks & Kalkulator Ilmiah" },
  { category_id: 6, name: "Botol Minum / Tumbler, Payung & Pakaian (Jaket, Jas Lab)" },
  { category_id: 7, name: "Kacamata & Aksesoris Pribadi (Jam Tangan, Perhiasan)" },
  { category_id: 8, name: "Lain-lain / Belum Teridentifikasi" },
];

const DEFAULT_LOCATIONS = [
  { location_id: 1, name: "Gedung Kuliah Umum (GKU) Prof. Dr. Sardjito - Lantai 1" },
  { location_id: 2, name: "Gedung Kuliah Umum (GKU) Prof. Dr. Sardjito - Lantai 2" },
  { location_id: 3, name: "Gedung Kuliah Umum (GKU) Prof. Dr. Sardjito - Lantai 3" },
  { location_id: 4, name: "Perpustakaan Pusat UII - Area Baca Terbuka" },
  { location_id: 5, name: "Perpustakaan Pusat UII - Ruang Referensi & Skripsi" },
  { location_id: 6, name: "Masjid Ulil Albab - Area Wudhu / Sholat Pria" },
  { location_id: 7, name: "Masjid Ulil Albab - Area Wudhu / Sholat Wanita" },
  { location_id: 8, name: "Masjid Ulil Albab - Serambi Depan" },
  { location_id: 9, name: "Gedung GBPH Prabuningrat (Rektorat) - Lobi Informasi" },
  { location_id: 10, name: "Fakultas Bisnis dan Ekonomika (FBE) - Selasar Utara" },
  { location_id: 11, name: "Fakultas Teknik Sipil dan Perencanaan (FTSP) - Lab Komputer" },
  { location_id: 12, name: "Fakultas Teknologi Industri (FTI) - Ruang Diskusi" },
  { location_id: 13, name: "Fakultas Hukum (FH) - Gazebo Mahasiswa" },
  { location_id: 14, name: "Kantin Sentral Boulevard Utama" },
  { location_id: 15, name: "Area Parkir Sepeda Motor Gerbang Barat" },
  { location_id: 16, name: "Area Parkir Utama Gedung Olahraga (GOR)" },
];

export default function LaporTemuanStep1({ onNavigate }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let categories = DEFAULT_CATEGORIES;
    let locations = DEFAULT_LOCATIONS;

    const form = el.querySelector("#lostFoundForm");
    if (!form) return;

    // Set tanggal default hari ini
    const dateInput = el.querySelector("#foundDate");
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split("T")[0];
    }

    // Ambil kategori dan lokasi dari backend (dengan silent fallback data kampus)
    const loadOptions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/public/meta/form-options`);
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.categories) && data.categories.length > 0) {
            categories = data.categories;
          }
          if (data && Array.isArray(data.locations) && data.locations.length > 0) {
            locations = data.locations;
          }
        }
      } catch (err) {
        // Backend offline / mode frontend-first: gunakan master data kampus lokal tanpa alert error
        console.warn("Backend API form-options tidak terjangkau, menggunakan data master kampus bawaan.");
      }

      const categorySelect = el.querySelector("#itemCategory");
      if (categorySelect) {
        categorySelect.innerHTML = '<option value="">Pilih kategori barang temuan...</option>';
        categories.forEach((item) => {
          const option = document.createElement("option");
          option.value = String(item.category_id);
          option.textContent = item.name;
          categorySelect.appendChild(option);
        });
      }

      const locationSelect = el.querySelector("#foundLocation");
      if (locationSelect) {
        locationSelect.innerHTML = '<option value="">Pilih lokasi ditemukan di kampus...</option>';
        locations.forEach((item) => {
          const option = document.createElement("option");
          option.value = String(item.location_id);
          option.textContent = item.name;
          locationSelect.appendChild(option);
        });
      }
    };

    loadOptions();

    // Listener tombol pilihan warna & waktu preset
    const handleClick = (e) => {
      const colorBtn = e.target.closest("button[data-color]");
      if (colorBtn) {
        e.preventDefault();
        const colorInput = el.querySelector("#dominantColor");
        if (colorInput) {
          colorInput.value = colorBtn.getAttribute("data-color");
          colorInput.focus();
        }
        return;
      }

      const timeBtn = e.target.closest("button[data-time]");
      if (timeBtn) {
        e.preventDefault();
        const timeInput = el.querySelector("#foundTime");
        if (timeInput) {
          timeInput.value = timeBtn.getAttribute("data-time");
        }
        return;
      }

      // Navigasi tautan header & breadcrumb
      const navTarget = e.target.closest("a[data-path], button[data-path]");
      if (navTarget) {
        const path = navTarget.getAttribute("data-path");
        if (path === "beranda" || path === "#beranda") {
          e.preventDefault();
          if (onNavigate) onNavigate("landing");
        } else if (path === "saya-kehilangan") {
          e.preventDefault();
          if (onNavigate) onNavigate("lapor_1");
        } else if (path === "saya-menemukan") {
          e.preventDefault();
          if (onNavigate) onNavigate("pilihan_penyerahan");
        } else if (path === "barang-temuan") {
          e.preventDefault();
          if (onNavigate) onNavigate("temuan_enhanced");
        } else if (path === "cara-kerja") {
          e.preventDefault();
          if (onNavigate) onNavigate("cara_kerja");
        } else if (path === "faq") {
          e.preventDefault();
          if (onNavigate) onNavigate("faq");
        }
      }
    };

    // Karakter counter deskripsi
    const descTextarea = el.querySelector("#itemDescription");
    const charCounter = el.querySelector("#charCount");
    const handleDescInput = () => {
      if (descTextarea && charCounter) {
        const count = descTextarea.value.length;
        charCounter.textContent = `${count} karakter (min. 10)`;
        if (count >= 10) {
          charCounter.className = "font-label-sm text-label-sm text-secondary font-semibold";
        } else {
          charCounter.className = "font-label-sm text-label-sm text-on-surface-variant";
        }
      }
    };
    if (descTextarea) {
      descTextarea.addEventListener("input", handleDescInput);
    }

    // Toggle demo validasi error
    const toggleBtn = el.querySelector("#btnToggleDemo");
    let isSimulating = false;
    const handleToggleDemo = () => {
      isSimulating = !isSimulating;
      const btnText = el.querySelector("#demoToggleText");
      if (btnText) btnText.textContent = isSimulating ? "Reset Status Validasi" : "Simulasikan Error";
      const errorMsgs = el.querySelectorAll(".field-error-msg");
      errorMsgs.forEach((msg) => {
        if (isSimulating) {
          msg.classList.remove("hidden");
          msg.classList.add("flex");
        } else {
          msg.classList.remove("flex");
          msg.classList.add("hidden");
        }
      });
    };
    if (toggleBtn) {
      toggleBtn.addEventListener("click", handleToggleDemo);
    }

    // Kirim formulir & Trigger OTP
    const handleSubmit = async (e) => {
      e.preventDefault();

      const catEl = el.querySelector("#itemCategory");
      const locEl = el.querySelector("#foundLocation");
      const colorEl = el.querySelector("#dominantColor");
      const descEl = el.querySelector("#itemDescription");
      const anonEl = el.querySelector("#anonCheck");
      const nameEl = el.querySelector("#reporterName");
      const dateEl = el.querySelector("#foundDate");
      const timeEl = el.querySelector("#foundTime");
      const waEl = el.querySelector("#reporterWhatsapp");

      const categoryVal = catEl?.value || "";
      const locationVal = locEl?.value || "";
      const color = (colorEl?.value || "").trim();
      const description = (descEl?.value || "").trim();
      const anonymous = anonEl ? anonEl.checked : true;
      const enteredName = (nameEl?.value || "").trim();
      const foundDate = dateEl?.value || new Date().toISOString().split("T")[0];
      const foundTime = timeEl?.value || "10:30";

      let categoryId = Number(categoryVal);
      if (!categoryId || isNaN(categoryId)) {
        const catMap = {
          elektronik: 1,
          dompet: 2,
          kunci: 3,
          tas: 4,
          belajar: 5,
          botol: 6,
          kacamata: 7,
          lainnya: 8,
        };
        categoryId = catMap[categoryVal.toLowerCase()] || (categoryVal ? 1 : 0);
      }

      let locationId = Number(locationVal);
      if (!locationId || isNaN(locationId)) {
        locationId = locationVal ? 1 : 0;
      }

      const itemName =
        categories.find((item) => Number(item.category_id) === categoryId)?.name ||
        "Barang Temuan Civitas";

      const locationName =
        locations.find((item) => Number(item.location_id) === locationId)?.name ||
        "Gedung Kuliah Umum (GKU)";

      const phoneInput = waEl?.value || "";
      let phone = phoneInput.replace(/\D/g, "");
      if (phone.startsWith("0")) {
        phone = "62" + phone.slice(1);
      } else if (phone.startsWith("8")) {
        phone = "62" + phone;
      } else if (!phone.startsWith("62") && phone.length > 0) {
        phone = "62" + phone;
      }

      // Validasi spesifik dengan pesan yang jelas
      if (!categoryId) {
        alert("Silakan pilih Kategori Barang terlebih dahulu.");
        catEl?.focus();
        return;
      }
      if (!color) {
        alert("Silakan isi Warna Dominan Barang.");
        colorEl?.focus();
        return;
      }
      if (!locationId && !locationVal) {
        alert("Silakan pilih Lokasi Ditemukan di Kampus.");
        locEl?.focus();
        return;
      }
      if (description.length < 10) {
        alert("Deskripsi barang minimal 10 karakter agar memudahkan proses identifikasi.");
        descEl?.focus();
        return;
      }
      if (phone.length < 9 || phone.length > 15) {
        alert("Nomor WhatsApp tidak valid. Masukkan nomor WhatsApp aktif (contoh: 081234567890).");
        waEl?.focus();
        return;
      }
      if (!anonymous && enteredName.length < 3) {
        alert("Silakan masukkan nama lengkap penemu (minimal 3 karakter) atau centang opsi Anonim.");
        nameEl?.focus();
        return;
      }

      const draft = {
        category_id: categoryId,
        category_name: itemName,
        color,
        location_id: locationId,
        location_name: locationName,
        item_name: itemName,
        description,
        found_at: `${foundDate}T${foundTime}:00+07:00`,
        finder_name: anonymous ? "Civitas Peduli (Anonim)" : enteredName,
        finder_whatsapp: phone,
      };

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Mengirim OTP...";
      }

      try {
        let sentOk = false;
        try {
          const response = await fetch(`${API_BASE_URL}/v1/public/otp/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone,
              purpose: "found_report",
            }),
          });
          if (response.ok) {
            sentOk = true;
          }
        } catch (fetchErr) {
          console.warn("Backend API OTP tidak aktif, menggunakan fallback simulasi:", fetchErr);
        }

        sessionStorage.setItem("foundReportDraft", JSON.stringify(draft));
        sessionStorage.setItem("foundReportPhone", phone);
        sessionStorage.setItem("mock_otp_found", "123456");

        if (sentOk) {
          alert(`Kode verifikasi OTP 6-digit berhasil dikirimkan ke WhatsApp +${phone}.`);
        } else {
          alert(
            `Kode verifikasi OTP 6-digit (Simulasi: 123456) telah dikirimkan ke WhatsApp +${phone}.\n\nMelanjutkan ke Langkah 2: Verifikasi Kode OTP...`
          );
        }

        if (onNavigate) onNavigate("lapor_temuan_2_otp");
      } catch (error) {
        alert(error.message || "Terjadi kesalahan saat memproses formulir.");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Kirim OTP & Lanjut ke Verifikasi";
        }
      }
    };

    form.addEventListener("submit", handleSubmit);
    el.addEventListener("click", handleClick);

    return () => {
      form.removeEventListener("submit", handleSubmit);
      el.removeEventListener("click", handleClick);
      if (descTextarea) descTextarea.removeEventListener("input", handleDescInput);
      if (toggleBtn) toggleBtn.removeEventListener("click", handleToggleDemo);
    };
  }, [onNavigate]);

  return (
    <div
      ref={containerRef}
      className="bg-surface font-body-md text-on-surface antialiased"
      dangerouslySetInnerHTML={{ __html: rawHTML }}
    />
  );
}
