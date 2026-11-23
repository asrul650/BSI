import re

# 1. Update LaporTemuanSukses.jsx
with open('Frontend/src/pages/LaporTemuanSukses.jsx', 'r', encoding='utf-8') as f:
    lts_content = f.read()

# Remove simulation toggle bar:
sim_bar_pattern = r'<!-- Active State & Expired Toggle Controller.*?<!-- MAIN VIEW CONTAINER'
lts_content = re.sub(sim_bar_pattern, '<!-- MAIN VIEW CONTAINER', lts_content, flags=re.DOTALL)

# Remove expired state simulation section:
exp_section_pattern = r'<!-- 8\. VARIANT STATE SECTION: EXPIRED SIMULATION.*?<!-- 9\. Navigation Actions'
lts_content = re.sub(exp_section_pattern, '<!-- 9. Navigation Actions', lts_content, flags=re.DOTALL)

# Remove inline script
lts_content = re.sub(r'<script>.*?</script>', '', lts_content, flags=re.DOTALL)

# Replace alert attributes on Unduh and Kirim WA buttons
lts_content = re.sub(r'onclick="alert\([^"]*\);"', 'id="btnUnduhTiket"', lts_content)
lts_content = re.sub(r'onclick="alert\([^"]*\);"', 'id="btnKirimWA"', lts_content)

new_lts_use_effect = """  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // Toast element helper
    const showToast = (msg) => {
      let toast = el.querySelector('#action-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'action-toast';
        toast.className = 'fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold';
        el.appendChild(toast);
      }
      toast.innerHTML = `<span class="material-symbols-outlined text-emerald-400 text-lg">check_circle</span> <span>${msg}</span>`;
      toast.classList.remove('opacity-0', 'translate-y-4');
      toast.classList.add('opacity-100', 'translate-y-0');
      setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-4');
      }, 3000);
    };

    // 1. Copy Ticket Code
    const copyBtn = el.querySelector('#copyTicketBtn');
    const copyLabel = el.querySelector('#copyLabel');
    const ticketCode = 'TM-7F3P9X';

    if (copyBtn) {
      copyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(ticketCode);
          }
        } catch (err) {}
        if (copyLabel) copyLabel.textContent = 'Tersalin!';
        copyBtn.classList.add('bg-emerald-100', 'text-emerald-800');
        showToast('Nomor Tiket TM-7F3P9X berhasil disalin!');
        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = 'Salin Kode';
          copyBtn.classList.remove('bg-emerald-100', 'text-emerald-800');
        }, 2500);
      });
    }

    // 2. Countdown Timer
    let totalSeconds = 23 * 3600 + 58 * 60 + 40;
    const hoursBox = el.querySelector('#hoursBox');
    const minutesBox = el.querySelector('#minutesBox');
    const secondsBox = el.querySelector('#secondsBox');

    const timerInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        return;
      }
      totalSeconds--;
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      if (hoursBox) hoursBox.textContent = String(h).padStart(2, '0');
      if (minutesBox) minutesBox.textContent = String(m).padStart(2, '0');
      if (secondsBox) secondsBox.textContent = String(s).padStart(2, '0');
    }, 1000);

    // 3. Unduh & Kirim WA Buttons
    const btnUnduh = el.querySelector('#btnUnduhTiket') || Array.from(el.querySelectorAll('button')).find(b => b.textContent.includes('Unduh Tiket'));
    if (btnUnduh) {
      btnUnduh.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Tiket dan QR Code berhasil diunduh dalam format berkas.');
      });
    }

    const btnKirimWA = el.querySelector('#btnKirimWA') || Array.from(el.querySelectorAll('button')).find(b => b.textContent.includes('Kirim Ulang ke WhatsApp'));
    if (btnKirimWA) {
      btnKirimWA.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Notifikasi konfirmasi berhasil dikirim ke nomor WhatsApp.');
      });
    }

    // 4. Click Navigation Handling
    const handleClick = (e) => {
      if (e.target.closest('#copyTicketBtn') || e.target.closest('#btnUnduhTiket') || e.target.closest('#btnKirimWA')) {
        return;
      }

      const target = e.target.closest('a, button, div.group, div[data-path]');
      if (!target) return;

      const path = target.getAttribute('data-path') || target.getAttribute('href') || '';
      const text = (target.textContent || '').trim();

      // Cetak Tanda Terima
      if (text.includes('Cetak') || text.includes('Simpan Bukti')) {
        e.preventDefault();
        window.print();
        return;
      }

      // Lihat Daftar Barang Temuan
      if (text.includes('Lihat Daftar') || text.includes('Cari Barang') || text.includes('Barang Temuan') || text.includes('Lihat Etalase') || path === '#barang-temuan' || path === 'barang-temuan') {
        e.preventDefault();
        if (onNavigate) onNavigate('temuan_enhanced');
        return;
      }

      // Kembali ke Beranda / Logo
      if (text.includes('Kembali ke Beranda') || text.includes('Beranda') || path === '#beranda' || path === 'beranda' || target.closest('a')?.getAttribute('href') === '#' || text.includes('Lost & Found UII')) {
        e.preventDefault();
        if (onNavigate) onNavigate('landing');
        return;
      }

      // Lapor Temuan Baru
      if (text.includes('Lapor Temuan Baru') || text.includes('Lapor Lagi')) {
        e.preventDefault();
        if (onNavigate) onNavigate('pilihan_penyerahan');
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
      if (text.includes('Saya Kehilangan') || path === '#lapor-kehilangan' || path === 'saya-kehilangan') {
        e.preventDefault();
        if (onNavigate) onNavigate('lapor_1');
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
    return () => {
      el.removeEventListener('click', handleClick);
      clearInterval(timerInterval);
    };
  }, [onNavigate]);"""

lts_content = re.sub(r'  useEffect\(\(\) => \{.*?  \}, \[onNavigate\]\);', lambda m: new_lts_use_effect, lts_content, flags=re.DOTALL)

with open('Frontend/src/pages/LaporTemuanSukses.jsx', 'w', encoding='utf-8') as f:
    f.write(lts_content)
print("Updated LaporTemuanSukses.jsx successfully.")

# 2. Update LaporKehilanganStep1.jsx
with open('Frontend/src/pages/LaporKehilanganStep1.jsx', 'r', encoding='utf-8') as f:
    lks1_content = f.read()

# Remove the dummy Error State demonstration box:
demo_error_pattern = r'<!-- Inline Error State Demonstration Box.*?<!-- Form Action CTA Buttons -->'
lks1_content = re.sub(demo_error_pattern, '<!-- Form Action CTA Buttons -->', lks1_content, flags=re.DOTALL)

# Remove rate limit banner from initial view:
rate_limit_pattern = r'<!-- 3\. Rate-Limit Banner Callout.*?<!-- Main Two-Column Layout'
lks1_content = re.sub(rate_limit_pattern, '<!-- Main Two-Column Layout', lks1_content, flags=re.DOTALL)

# Remove inline script at bottom:
lks1_content = re.sub(r'<script>.*?</script>', '', lks1_content, flags=re.DOTALL)

new_lks1_use_effect = """  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // Character counter for ciri_khusus
    const textarea = el.querySelector('#ciri_khusus');
    const counter = el.querySelector('#char-counter');
    if (textarea && counter) {
      const updateCount = () => {
        counter.textContent = `${textarea.value.length} / 500 karakter`;
      };
      textarea.addEventListener('input', updateCount);
      updateCount();
    }

    const handleClick = (e) => {
      const target = e.target.closest('a, button, div[data-path]');
      if (!target) return;

      const path = target.getAttribute('data-path') || target.getAttribute('href') || '';
      const text = (target.textContent || '').trim();

      // Submit / Next Step: Kirim OTP via WhatsApp
      if (text.includes('Kirim OTP') || target.id === 'btn-submit-otp') {
        e.preventDefault();
        if (onNavigate) onNavigate('lapor_2_otp');
        return;
      }

      // Stepper Step 2 click
      if (path === 'lapor_2_otp') {
        e.preventDefault();
        if (onNavigate) onNavigate('lapor_2_otp');
        return;
      }

      // Batal / Kembali ke Beranda / Logo
      if (text.includes('Batal') || text.includes('Kembali ke Beranda') || path === '#beranda' || path === 'beranda' || target.closest('a')?.getAttribute('href') === '#' || text.includes('Lost & Found UII')) {
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

      // Saya Menemukan
      if (text.includes('Saya Menemukan') || path === '#lapor-temuan' || path === 'saya-menemukan') {
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
  }, [onNavigate]);"""

lks1_content = re.sub(r'  useEffect\(\(\) => \{.*?  \}, \[onNavigate\]\);', lambda m: new_lks1_use_effect, lks1_content, flags=re.DOTALL)

with open('Frontend/src/pages/LaporKehilanganStep1.jsx', 'w', encoding='utf-8') as f:
    f.write(lks1_content)
print("Updated LaporKehilanganStep1.jsx successfully.")

