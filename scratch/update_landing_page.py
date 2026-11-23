import re

with open('Frontend/src/pages/LandingPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's check the handleClick and useEffect in LandingPage.jsx
new_use_effect = """  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    // 1. Category Pills Toggle & Filtering on Landing Page
    const pills = el.querySelectorAll('.custom-pill-active, .custom-pill-idle');
    const cards = el.querySelectorAll('#barang-temuan .grid > .group');

    pills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        pills.forEach((p) => {
          p.classList.remove('custom-pill-active', 'shadow-sm', 'font-semibold');
          p.classList.add('custom-pill-idle', 'font-medium');
        });
        pill.classList.remove('custom-pill-idle', 'font-medium');
        pill.classList.add('custom-pill-active', 'shadow-sm', 'font-semibold');

        const catText = pill.textContent.trim().toLowerCase();
        cards.forEach((card) => {
          const cardText = card.textContent.toLowerCase();
          if (catText === 'semua' || cardText.includes(catText)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // 2. Search Input & Button
    const searchInput = el.querySelector('input[placeholder*="Cari nama barang"]');
    const searchBtn = el.querySelector('button:has(svg + span), button:contains("Cari")') || Array.from(el.querySelectorAll('button')).find(b => b.textContent.trim() === 'Cari');

    const handleSearch = () => {
      if (onNavigate) onNavigate('temuan_enhanced');
    };

    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSearch();
        }
      });
    }

    // 3. General Click Handling
    const handleClick = (e) => {
      const target = e.target.closest('a, button, div.group');
      if (!target) return;

      const path = target.getAttribute('data-path') || target.getAttribute('href') || '';
      const text = (target.textContent || '').trim();

      // "Cari" button
      if (text === 'Cari') {
        e.preventDefault();
        handleSearch();
        return;
      }

      // "Tanya Satpam Sekarang"
      if (text.includes('Tanya Satpam')) {
        e.preventDefault();
        const posSection = el.querySelector('#pos-satpam');
        if (posSection) posSection.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // "Saya Kehilangan"
      if (text.includes('Saya Kehilangan') || path === '#lapor-kehilangan' || path === 'lapor-kehilangan') {
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

      // "Barang Temuan" or "Lihat Semua"
      if (text.includes('Barang Temuan') || text.includes('Lihat Semua') || path === '#barang-temuan' || path === '#katalog-lengkap') {
        e.preventDefault();
        if (onNavigate) onNavigate('temuan_enhanced');
        return;
      }

      // Clicking any card in "Barang Terbaru" on landing page -> goes to detail
      if (target.closest('#barang-temuan .group') || text.includes('Dompet kulit hitam') || text.includes('Kunci motor Honda') || text.includes('Tas ransel abu-abu') || text.includes('Botol minum stainless')) {
        e.preventDefault();
        if (onNavigate) onNavigate('detail');
        return;
      }

      // "Beranda" or logo
      if (path === '#beranda' || path === 'beranda' || target.closest('a')?.getAttribute('href') === '#' || text.includes('Lost & Found UII')) {
        e.preventDefault();
        if (onNavigate) onNavigate('landing');
        return;
      }
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [onNavigate]);"""

# Replace the old useEffect
pattern = r"  useEffect\(\(\) => \{.*?  \}, \[onNavigate\]\);"
new_content = re.sub(pattern, lambda m: new_use_effect, content, flags=re.DOTALL)

with open('Frontend/src/pages/LandingPage.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated LandingPage.jsx successfully.")

