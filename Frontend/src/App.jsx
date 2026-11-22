import React, { useState } from 'react';

// =========================================================================
// 1. PORTAL PUBLIK (Mahasiswa, Tendik, Tamu Kampus)
// =========================================================================
import LandingPage from './pages/LandingPage';
import DaftarTemuanEnhanced from './pages/DaftarTemuanEnhanced';
import DetailTemuan from './pages/DetailTemuan';
import LaporKehilanganStep1 from './pages/LaporKehilanganStep1';
import LaporKehilanganStep2OTP from './pages/LaporKehilanganStep2OTP';
import LaporKehilanganStep3 from './pages/LaporKehilanganStep3';
import LaporKehilanganSukses from './pages/LaporKehilanganSukses';
import PilihanPenyerahanTemuan from './pages/PilihanPenyerahanTemuan';
import LaporTemuanStep1 from './pages/LaporTemuanStep1';
import LaporTemuanSukses from './pages/LaporTemuanSukses';
import CaraKerja from './pages/CaraKerja';
import FAQ from './pages/FAQ';
import KebijakanPrivasi from './pages/KebijakanPrivasi';

// =========================================================================
// 2. PORTAL INTERNAL SATPAM (Unit Keamanan Kampus Terpadu UII)
// =========================================================================
import DashboardSatpam from './pages/satpam/DashboardSatpam';
import AntreanPenerimaan from './pages/satpam/AntreanPenerimaan';
import PenerimaanBarang from './pages/satpam/PenerimaanBarang';
import DaftarInventaris from './pages/satpam/DaftarInventaris';
import DetailFisikInventaris from './pages/satpam/DetailFisikInventaris';
import HasilMatchingAlgoritma from './pages/satpam/HasilMatchingAlgoritma';
import VerifikasiLangkah1 from './pages/satpam/VerifikasiLangkah1';
import VerifikasiLangkah3 from './pages/satpam/VerifikasiLangkah3';
import KoreksiDataInventaris from './pages/satpam/KoreksiDataInventaris';
import DaftarLaporanKehilangan from './pages/satpam/DaftarLaporanKehilangan';

const screens = {
  // === Alur Portal Publik ===
  landing: LandingPage,
  temuan_enhanced: DaftarTemuanEnhanced,
  detail: DetailTemuan,
  lapor_1: LaporKehilanganStep1,
  lapor_2_otp: LaporKehilanganStep2OTP,
  lapor_3: LaporKehilanganStep3,
  lapor_sukses: LaporKehilanganSukses,
  pilihan_penyerahan: PilihanPenyerahanTemuan,
  lapor_temuan_1: LaporTemuanStep1,
  lapor_temuan_sukses: LaporTemuanSukses,
  cara_kerja: CaraKerja,
  faq: FAQ,
  cara_kerja_faq: CaraKerja, // alias fallback
  kebijakan_privasi: KebijakanPrivasi,

  // === Alur Portal Satpam (Dipisahkan) ===
  satpam_dashboard: DashboardSatpam,
  satpam_antrean: AntreanPenerimaan,
  satpam_penerimaan: PenerimaanBarang,
  satpam_inventaris: DaftarInventaris,
  satpam_detail_inventaris: DetailFisikInventaris,
  satpam_matching: HasilMatchingAlgoritma,
  satpam_verifikasi_1: VerifikasiLangkah1,
  satpam_verifikasi_3: VerifikasiLangkah3,
  satpam_koreksi: KoreksiDataInventaris,
  satpam_kehilangan: DaftarLaporanKehilangan,
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState('landing');

  const CurrentScreenComponent = screens[activeScreen] || LandingPage;
  const isSatpamPortal = activeScreen.startsWith('satpam_');

  const handleNavigate = (target) => {
    if (screens[target]) {
      setActiveScreen(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      <CurrentScreenComponent onNavigate={handleNavigate} />

      {/* Floating Mode Switcher Button (Bisa beralih langsung antara Portal Publik & Portal Satpam) */}
      <aside aria-label="Portal Switcher" className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-900/90 text-white shadow-xl backdrop-blur-md border border-slate-700/60 text-xs font-semibold">
          <span className="pl-3 pr-1 text-slate-300 hidden sm:inline">
            Mode: <strong className="text-white">{isSatpamPortal ? 'Portal Satpam' : 'Portal Publik'}</strong>
          </span>
          {isSatpamPortal ? (
            <button
              onClick={() => handleNavigate('landing')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm"
              title="Kembali ke Portal Publik"
            >
              <span className="material-symbols-outlined text-[16px]">public</span>
              <span>Buka Portal Publik</span>
            </button>
          ) : (
            <button
              onClick={() => handleNavigate('satpam_dashboard')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white transition-all shadow-sm"
              title="Buka Portal Satpam Kampus UII"
            >
              <span className="material-symbols-outlined text-[16px]">local_police</span>
              <span>Buka Portal Satpam</span>
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
