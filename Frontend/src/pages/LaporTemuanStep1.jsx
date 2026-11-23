import React, { useEffect, useRef } from 'react';

// Layar Stitch: Form Lapor Temuan (Langkah 1: Detail Barang)
const rawHTML = "<!-- BEGIN: MainHeader -->\n<header class=\"sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-200\">\n<div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between\">\n<!-- Brand Logo & Identity -->\n<a class=\"flex items-center space-x-3.5 group cursor-pointer\" data-path=\"beranda\" href=\"#beranda\">\n<div class=\"w-11 h-11 rounded-xl bg-uiiNavy text-white flex items-center justify-center shadow-md group-hover:bg-blue-700 transition\">\n<svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n<path d=\"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"></path>\n</svg>\n</div>\n<div>\n<span class=\"block text-lg font-bold text-slate-900 tracking-tight leading-tight\">Lost &amp; Found UII</span>\n<span class=\"block text-xs font-medium text-slate-500\">Kampus Terpadu \\u2022 Temukan kembali barangmu</span>\n</div>\n</a>\n<!-- Desktop Navigation Links -->\n<nav class=\"hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600\">\n<a class=\"hover:text-uiiNavy transition cursor-pointer\" data-path=\"beranda\" href=\"#beranda\">Beranda</a>\n<a class=\"hover:text-uiiNavy transition cursor-pointer\" data-path=\"barang-temuan\" href=\"#barang-temuan\">Barang Temuan</a>\n<a class=\"hover:text-uiiNavy transition cursor-pointer\" data-path=\"cara-kerja\" href=\"#cara-kerja\">Cara Kerja</a>\n<a class=\"hover:text-uiiNavy transition cursor-pointer\" data-path=\"pos-satpam\" href=\"#pos-satpam\">Pos Satpam</a>\n<a class=\"hover:text-uiiNavy transition cursor-pointer\" data-path=\"faq\" href=\"#faq\">FAQ</a>\n</nav>\n<!-- Action Buttons (No Login Required) -->\n<div class=\"flex items-center space-x-3\">\n<button class=\"hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 hover:border-slate-400 shadow-sm transition cursor-pointer\" data-path=\"saya-kehilangan\" type=\"button\">\n  Saya Kehilangan\n</button>\n<button class=\"inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-uiiNavy hover:bg-slate-800 rounded-full shadow-sm hover:shadow transition cursor-pointer\" data-path=\"saya-menemukan\" type=\"button\">\n  Saya Menemukan\n</button>\n</div>\n</div>\n</header>\n<!-- END: MainHeader --><main class=\"w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]\"><div class=\"flex flex-col w-full\">\n<!-- Content Area Container (1200px max, margins) -->\n<div class=\"max-w-[1200px] w-full mx-auto px-margin-mobile md:px-margin pb-space-xl\">\n<!-- 1. Breadcrumb Bar & Status Pill -->\n<nav aria-label=\"Breadcrumb\" class=\"py-space-md flex flex-wrap items-center justify-between gap-y-2 gap-x-4\">\n<ol class=\"flex items-center flex-wrap gap-1.5 font-label-md text-label-md text-on-surface-variant\">\n<li>\n<a class=\"hover:text-on-surface transition-colors flex items-center gap-1\" href=\"#\">\n<span class=\"material-symbols-outlined text-[16px]\">home</span>\n<span>Beranda</span>\n</a>\n</li>\n<li class=\"text-outline-variant font-normal\">/</li>\n<li>\n<a class=\"hover:text-on-surface transition-colors\" href=\"#\">Saya Menemukan Barang</a>\n</li>\n<li class=\"text-outline-variant font-normal\">/</li>\n<li class=\"text-on-surface font-semibold truncate max-w-[280px] sm:max-w-none\">\n          Lapor Temuan Online (Langkah 1: Detail Barang &amp; Penemu)\n        </li>\n</ol>\n<div class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shadow-sm\">\n<span class=\"material-symbols-outlined text-[14px]\">security</span>\n<span>Unit Layanan Keamanan Terpadu UII</span>\n</div>\n</nav>\n<!-- 2. Stepper Progres 3 Langkah (Campus Guardian Design) -->\n<div class=\"grid grid-cols-1 md:grid-cols-3 gap-gutter my-space-md\">\n<!-- Step 1: Active Navy Card -->\n<div class=\"bg-primary text-on-primary rounded-xl p-space-md shadow-md flex items-center gap-space-sm relative overflow-hidden\">\n<div class=\"w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-sm text-headline-sm shrink-0 shadow-sm\">\n          1\n        </div>\n<div class=\"min-w-0 flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold\">Langkah Aktif</span>\n<span class=\"font-headline-sm text-headline-sm text-on-primary truncate\">Detail Barang &amp; Kontak</span>\n</div>\n<div class=\"absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-10 pointer-events-none\">\n<span class=\"material-symbols-outlined text-[72px]\">assignment</span>\n</div>\n</div>\n<!-- Step 2: Pending Step -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center gap-space-sm opacity-80\">\n<div class=\"w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-headline-sm text-headline-sm shrink-0\">\n          2\n        </div>\n<div class=\"min-w-0 flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Langkah 2</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface truncate\">Verifikasi WhatsApp</span>\n</div>\n</div>\n<!-- Step 3: Pending Step -->\n<div class=\"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center gap-space-sm opacity-80\">\n<div class=\"w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-headline-sm text-headline-sm shrink-0\">\n          3\n        </div>\n<div class=\"min-w-0 flex flex-col\">\n<span class=\"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider\">Langkah 3</span>\n<span class=\"font-headline-sm text-headline-sm text-on-surface truncate\">Persetujuan &amp; Selesai</span>\n</div>\n</div>\n</div>\n<!-- 3. Header Formulir -->\n<div class=\"pt-space-md pb-space-lg\">\n<div class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm mb-2\">\n<span class=\"w-2 h-2 rounded-full bg-secondary\"></span>\n<span>Formulir Penemuan Barang Civitas UII</span>\n</div>\n<h1 class=\"font-headline-lg text-headline-lg text-on-surface tracking-tight\">Lapor Barang Temuan</h1>\n<p class=\"font-body-lg text-body-lg text-on-surface-variant mt-1 max-w-3xl\">\n        Bantu kembalikan barang milik civitas kampus yang tertinggal. Isi rincian temuan di bawah ini untuk memulai pencatatan tiket inventarisasi resmi.\n      </p>\n</div>\n<!-- 4. Layout Utama (Grid 2 Kolom: 8 Col Kiri, 4 Col Kanan) -->\n<div class=\"grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start\">\n<!-- ================= KOLOM KIRI (Formulir Utama) ================= -->\n<div class=\"lg:col-span-8 flex flex-col gap-space-lg\">\n<!-- Notifikasi: Dokumentasi Foto Barang Temuan -->\n<div class=\"bg-blue-50 border border-blue-200/80 rounded-xl p-space-md shadow-sm flex items-start gap-space-sm\">\n  <div class=\"w-10 h-10 rounded-xl bg-uiiNavy text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5\">\n    <span class=\"material-symbols-outlined text-[22px]\">add_a_photo</span>\n  </div>\n  <div class=\"flex flex-col gap-0.5\">\n    <div class=\"flex items-center gap-2\">\n      <span class=\"font-label-lg text-label-lg text-slate-900 font-bold\">Dokumentasi Foto Fisik Barang:</span>\n      <span class=\"px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-label-sm font-label-sm font-semibold\">Mempercepat Matching</span>\n    </div>\n    <p class=\"font-body-md text-body-md text-slate-700 leading-relaxed\">\n      Unggah foto barang temuan Anda pada formulir di bawah ini agar sistem AI Matching dapat langsung menganalisis kesesuaian visual dengan laporan kehilangan civitas kampus. Petugas Satpam juga akan mendokumentasikan foto resmi saat verifikasi serah terima di Pos Jaga.\n    </p>\n  </div>\n</div></div><div class=\"space-y-space-sm\"><h3 class=\"font-headline-sm text-headline-sm text-on-surface\">Tautan Cepat</h3><ul class=\"space-y-space-xs font-body-sm text-body-sm\"><li class=\"flex items-center gap-1 text-on-surface-variant hover:text-on-surface\"><span class=\"material-symbols-outlined text-[14px]\">chevron_right</span><a data-path=\"beranda\" href=\"#\">Halaman Beranda</a></li><li class=\"flex items-center gap-1 text-on-surface-variant hover:text-on-surface\"><span class=\"material-symbols-outlined text-[14px]\">chevron_right</span><a data-path=\"barang-temuan\" href=\"#\">Daftar Barang Temuan Terkini</a></li><li class=\"flex items-center gap-1 text-on-surface-variant hover:text-on-surface\"><span class=\"material-symbols-outlined text-[14px]\">chevron_right</span><a data-path=\"cara-kerja\" href=\"#\">Prosedur Klaim Kepemilikan</a></li><li class=\"flex items-center gap-1 text-on-surface-variant hover:text-on-surface\"><span class=\"material-symbols-outlined text-[14px]\">chevron_right</span><a data-path=\"pos-satpam\" href=\"#\">Daftar Lokasi Pos Jaga</a></li><li class=\"flex items-center gap-1 text-on-surface-variant hover:text-on-surface\"><span class=\"material-symbols-outlined text-[14px]\">chevron_right</span><a data-path=\"faq\" href=\"#\">Pertanyaan Umum (FAQ)</a></li></ul></div></div><div class=\"mt-space-lg pt-space-md border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant\"><p>\\u00a9 2025 Universitas Islam Indonesia \\u2022 Unit Keamanan &amp; Ketertiban Kampus Terpadu.</p><div class=\"flex items-center gap-space-md font-label-sm text-label-sm\"><a class=\"hover:text-on-surface transition-colors\" href=\"#\">Kebijakan Privasi</a><span class=\"text-outline-variant\">\\u2022</span><a class=\"hover:text-on-surface transition-colors\" href=\"#\">Ketentuan Layanan</a><span class=\"text-outline-variant\">\\u2022</span><a class=\"hover:text-on-surface transition-colors\" href=\"#\">Panduan Verifikasi</a></div></div></div></footer></body></html>";

export default function LaporTemuanStep1({ onNavigate }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // --- Photo Upload Handling ---
    const fileInput = el.querySelector('#itemPhoto');
    const dropzone = el.querySelector('#photoDropzone');
    const promptEl = el.querySelector('#photoPrompt');
    const previewContainer = el.querySelector('#photoPreviewContainer');
    const previewImg = el.querySelector('#photoPreviewImg');
    const fileNameEl = el.querySelector('#photoFileName');
    const btnRemove = el.querySelector('#btnRemovePhoto');

    const handleFile = (file) => {
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (previewImg) previewImg.src = e.target.result;
        if (fileNameEl) fileNameEl.textContent = file.name;
        if (promptEl) promptEl.classList.add('hidden');
        if (previewContainer) {
          previewContainer.classList.remove('hidden');
          previewContainer.classList.add('flex');
        }
      };
      reader.readAsDataURL(file);
    };

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', (e) => {
        if (e.target.closest('#btnRemovePhoto')) return;
        fileInput.click();
      });

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
      });

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('border-uiiNavy', 'bg-blue-50/50');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('border-uiiNavy', 'bg-blue-50/50');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-uiiNavy', 'bg-blue-50/50');
        const file = e.dataTransfer?.files?.[0];
        if (file) handleFile(file);
      });
    }

    if (btnRemove && fileInput) {
      btnRemove.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.value = '';
        if (previewImg) previewImg.src = '';
        if (previewContainer) {
          previewContainer.classList.remove('flex');
          previewContainer.classList.add('hidden');
        }
        if (promptEl) promptEl.classList.remove('hidden');
      });
    }

    // --- Quick Color Selection ---
    const colorInput = el.querySelector('#dominantColor');
    const colorButtons = el.querySelectorAll('button[onclick*="selectColor"]');
    colorButtons.forEach((btn) => {
      btn.removeAttribute('onclick');
      btn.addEventListener('click', () => {
        const label = btn.textContent.trim();
        if (colorInput) {
          colorInput.value = label;
          colorInput.focus();
        }
        colorButtons.forEach((b) => {
          b.classList.remove('bg-slate-900', 'text-white', 'ring-2', 'ring-uiiNavy');
          b.classList.add('bg-surface-container', 'text-on-surface');
        });
        btn.classList.remove('bg-surface-container', 'text-on-surface');
        btn.classList.add('bg-slate-900', 'text-white', 'ring-2', 'ring-uiiNavy');
      });
    });

    // --- Quick Time Selection ---
    const timeInput = el.querySelector('#foundTime');
    const timeButtons = el.querySelectorAll('button[onclick*="setTimePreset"]');
    timeButtons.forEach((btn) => {
      btn.removeAttribute('onclick');
      btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        let timeVal = '10:30';
        if (text.includes('Pagi')) timeVal = '08:30';
        else if (text.includes('Siang')) timeVal = '13:15';
        else if (text.includes('Sore') || text.includes('Malam')) timeVal = '16:45';

        if (timeInput) timeInput.value = timeVal;

        timeButtons.forEach((b) => {
          b.classList.remove('bg-slate-900', 'text-white', 'ring-2', 'ring-uiiNavy');
          b.classList.add('bg-surface-container-high', 'text-on-surface');
        });
        btn.classList.remove('bg-surface-container-high', 'text-on-surface');
        btn.classList.add('bg-slate-900', 'text-white', 'ring-2', 'ring-uiiNavy');
      });
    });

    // --- Form Submission Handling ---
    const form = el.querySelector('#lostFoundForm');
    if (form) {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const cat = el.querySelector('#itemCategory')?.value || '';
        const name = el.querySelector('#itemName')?.value?.trim() || '';
        const loc = el.querySelector('#foundLocation')?.value?.trim() || '';
        const wa = el.querySelector('#reporterWhatsapp')?.value?.trim() || '';

        let hasError = false;

        const showErr = (groupId, condition) => {
          const grp = el.querySelector(groupId);
          const err = grp?.querySelector('.field-error-msg');
          if (condition) {
            err?.classList.remove('hidden');
            err?.classList.add('flex');
            hasError = true;
          } else {
            err?.classList.remove('flex');
            err?.classList.add('hidden');
          }
        };

        showErr('#group-category', !cat);
        showErr('#group-itemName', !name);
        showErr('#group-location', !loc || loc.length < 3);
        showErr('#group-whatsapp', !wa || wa.replace(/\D/g, '').length < 8);

        if (!hasError) {
          if (onNavigate) onNavigate('lapor_temuan_sukses');
        }
      });
    }

    // --- Global Click & Navigation Delegation ---
    const handleClick = (e) => {
      const target = e.target.closest('a, button, div.group, div[data-path]');
      if (!target) return;

      const path = target.getAttribute('data-path') || target.getAttribute('href') || '';
      const text = (target.textContent || '').trim();

      // Submit form
      if (text.includes('Kirim OTP') || text.includes('Lanjut ke Verifikasi') || target.type === 'submit') {
        return;
      }

      // Batal / Kembali ke Menu Penyerahan
      if (text.includes('Batal') || text.includes('Kembali ke Menu') || text.includes('Kembali ke Pilihan') || path === 'pilihan_penyerahan') {
        e.preventDefault();
        if (onNavigate) onNavigate('pilihan_penyerahan');
        return;
      }

      // Beranda / Logo
      if (path === '#beranda' || path === 'beranda' || text === 'Beranda' || target.closest('a')?.getAttribute('href') === '#' || text.includes('Lost & Found UII')) {
        e.preventDefault();
        if (onNavigate) onNavigate('landing');
        return;
      }

      // Barang Temuan
      if (text.includes('Barang Temuan') || path === '#barang-temuan' || path === 'barang-temuan') {
        e.preventDefault();
        if (onNavigate) onNavigate('temuan_enhanced');
        return;
      }

      // Cara Kerja
      if (text.includes('Cara Kerja') || path === '#cara-kerja' || path === 'cara-kerja') {
        e.preventDefault();
        if (onNavigate) onNavigate('cara_kerja');
        return;
      }

      // FAQ
      if (text.includes('FAQ') || path === '#faq' || path === 'faq') {
        e.preventDefault();
        if (onNavigate) onNavigate('faq');
        return;
      }

      // Saya Kehilangan
      if (text.includes('Saya Kehilangan') || path === '#lapor-kehilangan' || path === 'lapor-kehilangan' || path === 'saya-kehilangan') {
        e.preventDefault();
        if (onNavigate) onNavigate('lapor_1');
        return;
      }

      // Saya Menemukan (Kembali ke Pilihan Penyerahan)
      if (path === 'saya-menemukan' || path === '#lapor-temuan') {
        e.preventDefault();
        if (onNavigate) onNavigate('pilihan_penyerahan');
        return;
      }

      // Kebijakan Privasi
      if (text.includes('Kebijakan Privasi') || path === '#kebijakan-privasi') {
        e.preventDefault();
        if (onNavigate) onNavigate('kebijakan_privasi');
        return;
      }
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [onNavigate]);

  return (
    <div
      ref={containerRef}
      className="bg-surface font-body-md text-on-surface antialiased"
      dangerouslySetInnerHTML={{ __html: rawHTML }}
    />
  );
}