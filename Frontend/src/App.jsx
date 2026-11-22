import React, { useState } from 'react';
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
import CaraKerjaFAQ from './pages/CaraKerjaFAQ';
import KebijakanPrivasi from './pages/KebijakanPrivasi';

const screens = {
  // 1. Beranda & Katalog
  landing: LandingPage,
  temuan_enhanced: DaftarTemuanEnhanced,
  detail: DetailTemuan,

  // 2. Alur Lapor Kehilangan
  lapor_1: LaporKehilanganStep1,
  lapor_2_otp: LaporKehilanganStep2OTP,
  lapor_3: LaporKehilanganStep3,
  lapor_sukses: LaporKehilanganSukses,

  // 3. Alur Saya Menemukan Barang
  pilihan_penyerahan: PilihanPenyerahanTemuan,
  lapor_temuan_1: LaporTemuanStep1,
  lapor_temuan_sukses: LaporTemuanSukses,

  // 4. Informasi & Kebijakan
  cara_kerja_faq: CaraKerjaFAQ,
  kebijakan_privasi: KebijakanPrivasi,
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState('landing');

  const CurrentScreenComponent = screens[activeScreen] || LandingPage;

  const handleNavigate = (target) => {
    if (screens[target]) {
      setActiveScreen(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      <CurrentScreenComponent onNavigate={handleNavigate} />
    </div>
  );
}
