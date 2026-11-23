import re

with open('Frontend/src/pages/DetailTemuan.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's clean the dummy simulation buttons in rawHTML:
# Remove the 3 simulation buttons:
raw_html_clean = content

# Replace simulation buttons block:
sim_btn_pattern = r'<div class="flex items-center gap-2">\s*<button[^>]*showStateVariant\(\'claimed\'\)[^>]*>.*?</button>\s*<button[^>]*showStateVariant\(\'verifying\'\)[^>]*>.*?</button>\s*<button[^>]*showStateVariant\(\'active\'\)[^>]*>.*?</button>\s*</div>'
raw_html_clean = re.sub(sim_btn_pattern, '', raw_html_clean, flags=re.DOTALL)

# Also remove inline <script>...</script> at the bottom of rawHTML:
raw_html_clean = re.sub(r'<script>.*?</script>', '', raw_html_clean, flags=re.DOTALL)

new_use_effect = """  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // 1. Multi-Angle Thumbnail Switcher
    const mainImg = el.querySelector('#main-product-image');
    const angleBadge = el.querySelector('#main-product-image')?.parentElement?.querySelector('.bottom-3.right-3 span:last-child');
    const thumbs = el.querySelectorAll('.thumbnail-btn');

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const img = thumb.querySelector('img');
        if (img && mainImg) {
          mainImg.style.opacity = '0.4';
          const newSrc = img.src;
          const altText = img.alt || 'Foto Barang';
          setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
            if (angleBadge) angleBadge.textContent = altText;
          }, 120);
        }

        thumbs.forEach((t) => {
          t.classList.remove('ring-2', 'ring-blue-600', 'bg-blue-50');
        });
        thumb.classList.add('ring-2', 'ring-blue-600', 'bg-blue-50');
      });
    });

    // 2. Copy Item ID
    const copyBtn = el.querySelector('button[title*="Salin Kode"]') || el.querySelector('button[onclick*="copyItemId"]');
    const toast = el.querySelector('#copy-toast');

    const handleCopy = async () => {
      const code = 'LF-0248';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(code);
        }
      } catch (err) {}

      if (toast) {
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        setTimeout(() => {
          toast.classList.remove('translate-y-0', 'opacity-100');
          toast.classList.add('translate-y-20', 'opacity-0');
        }, 2500);
      }
    };

    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleCopy();
      });
    }

    // 3. Navigation Click Handling
    const handleClick = (e) => {
      // Don't intercept thumbnail clicks
      if (e.target.closest('.thumbnail-btn') || e.target.closest('button[title*="Salin Kode"]')) {
        return;
      }

      const target = e.target.closest('a, button');
      if (!target) return;

      const path = target.getAttribute('data-path') || target.getAttribute('href') || '';
      const text = (target.textContent || '').trim();

      // "Kembali ke Daftar Barang" or "Barang Temuan"
      if (text.includes('Kembali ke Daftar') || text.includes('Barang Temuan') || path === '#barang-temuan' || path === 'barang-temuan') {
        e.preventDefault();
        if (onNavigate) onNavigate('temuan_enhanced');
        return;
      }

      // "Saya Kehilangan" or "Bukan barangmu? Lapor Kehilangan"
      if (text.includes('Saya Kehilangan') || text.includes('Lapor Kehilangan') || path === '#lapor-kehilangan' || path === 'lapor-kehilangan') {
        e.preventDefault();
        if (onNavigate) onNavigate('lapor_1');
        return;
      }

      // "Saya Menemukan"
      if (text.includes('Saya Menemukan') || path === '#lapor-temuan' || path === 'lapor-temuan') {
        e.preventDefault();
        if (onNavigate) onNavigate('pilihan_penyerahan');
        return;
      }

      // "Cara Kerja" or "FAQ"
      if (text.includes('Cara Kerja') || text.includes('FAQ') || path === '#cara-kerja' || path === '#faq') {
        e.preventDefault();
        if (onNavigate) {
          if (text.includes('FAQ') || path.includes('faq')) onNavigate('faq');
          else onNavigate('cara_kerja');
        }
        return;
      }

      // "Kebijakan Privasi"
      if (text.includes('Kebijakan Privasi') || path === '#kebijakan-privasi') {
        e.preventDefault();
        if (onNavigate) onNavigate('kebijakan_privasi');
        return;
      }

      // "Lihat Lokasi Pos Satpam"
      if (text.includes('Lihat Lokasi Pos') || path === '#lokasi-pos') {
        e.preventDefault();
        const posEl = el.querySelector('#lokasi-pos');
        if (posEl) posEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // "Beranda" or Logo
      if (path === '#beranda' || path === 'beranda' || text === 'Beranda' || target.closest('a')?.getAttribute('href') === '#' || text.includes('Lost & Found UII')) {
        e.preventDefault();
        if (onNavigate) onNavigate('landing');
        return;
      }
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [onNavigate]);"""

# Replace the useEffect
pattern = r"  useEffect\(\(\) => \{.*?  \}, \[onNavigate\]\);"
raw_html_clean = re.sub(pattern, lambda m: new_use_effect, raw_html_clean, flags=re.DOTALL)

with open('Frontend/src/pages/DetailTemuan.jsx', 'w', encoding='utf-8') as f:
    f.write(raw_html_clean)

print("Updated DetailTemuan.jsx successfully.")

