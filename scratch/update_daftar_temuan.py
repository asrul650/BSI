import re

with open('Frontend/src/pages/DaftarTemuanEnhanced.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_use_effect = """  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const cards = el.querySelectorAll('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4.gap-6 > .group');
    const searchInput = el.querySelector('#searchInput');
    const chips = el.querySelectorAll('.category-chip');
    const resetBtn = Array.from(el.querySelectorAll('button')).find(b => b.textContent.includes('Reset Semua Filter'));
    const countBadge = el.querySelector('strong.text-white.font-bold');

    let activeCategory = 'semua';
    let searchQuery = '';

    const applyFilter = () => {
      let visible = 0;
      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        let matchesCategory = true;
        if (activeCategory !== 'semua') {
          if (activeCategory.includes('dompet')) {
            matchesCategory = text.includes('dompet') || text.includes('kartu');
          } else if (activeCategory.includes('kunci')) {
            matchesCategory = text.includes('kunci') || text.includes('vario') || text.includes('motor');
          } else if (activeCategory.includes('tas')) {
            matchesCategory = text.includes('tas') || text.includes('ransel');
          } else if (activeCategory.includes('ponsel') || activeCategory.includes('gadget')) {
            matchesCategory = text.includes('gadget') || text.includes('smartwatch') || text.includes('ponsel');
          } else if (activeCategory.includes('botol') || activeCategory.includes('tumbler')) {
            matchesCategory = text.includes('tumbler') || text.includes('botol');
          } else if (activeCategory.includes('helm')) {
            matchesCategory = text.includes('helm');
          } else if (activeCategory.includes('elektronik')) {
            matchesCategory = text.includes('elektronik') || text.includes('powerbank');
          } else {
            matchesCategory = text.includes(activeCategory);
          }
        }

        let matchesSearch = true;
        if (searchQuery) {
          matchesSearch = text.includes(searchQuery);
        }

        if (matchesCategory && matchesSearch) {
          card.style.display = '';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countBadge) {
        countBadge.textContent = visible;
      }
    };

    // Category chips click
    chips.forEach((chip) => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        chips.forEach((c) => {
          c.classList.remove('custom-pill-active');
          c.classList.add('custom-pill-idle');
        });
        chip.classList.remove('custom-pill-idle');
        chip.classList.add('custom-pill-active');

        activeCategory = chip.textContent.trim().toLowerCase();
        applyFilter();
      });
    });

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        applyFilter();
      });
    }

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        activeCategory = 'semua';
        chips.forEach((c, idx) => {
          if (idx === 0) {
            c.classList.remove('custom-pill-idle');
            c.classList.add('custom-pill-active');
          } else {
            c.classList.remove('custom-pill-active');
            c.classList.add('custom-pill-idle');
          }
        });
        applyFilter();
      });
    }

    // Intercept clicks on links or buttons with data-path, href, or text
    const handleClick = (e) => {
      // Don't navigate if clicking on category chip or reset button or search
      if (e.target.closest('#categoryChips') || e.target.closest('#searchInput') || e.target.closest('button')?.textContent.includes('Reset')) {
        return;
      }

      const target = e.target.closest('a, button, div.group');
      if (!target) return;

      const path = target.getAttribute('data-path') || target.getAttribute('href') || '';
      const text = (target.textContent || '').trim();

      // "Saya Kehilangan" or "Lapor Kehilangan Sekarang" or "Buat Laporan Kehilangan Baru"
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

      // "Klaim di Pos Satpam" OR clicking any card in the grid -> goes to detail
      if (text.includes('Klaim di Pos Satpam') || target.closest('.grid .group') || path.includes('detail') || path.includes('0064cc74')) {
        e.preventDefault();
        if (onNavigate) onNavigate('detail');
        return;
      }

      // "Beranda" or Logo
      if (path === '#beranda' || path === 'beranda' || target.closest('a')?.getAttribute('href') === '#' || text.includes('Lost & Found UII')) {
        e.preventDefault();
        if (onNavigate) onNavigate('landing');
        return;
      }

      // "Barang Temuan"
      if (path === '#barang-temuan' || path === 'barang-temuan' || path === '#katalog-lengkap') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [onNavigate]);"""

# Replace the old useEffect
pattern = r"  useEffect\(\(\) => \{.*?  \}, \[onNavigate\]\);"
new_content = re.sub(pattern, lambda m: new_use_effect, content, flags=re.DOTALL)

with open('Frontend/src/pages/DaftarTemuanEnhanced.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated DaftarTemuanEnhanced.jsx successfully.")

