import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import DaftarTemuanEnhanced from './pages/DaftarTemuanEnhanced';
import DetailTemuan from './pages/DetailTemuan';
import LaporKehilanganStep1 from './pages/LaporKehilanganStep1';
import LaporKehilanganStep2OTP from './pages/LaporKehilanganStep2OTP';

const screens = {
  landing: LandingPage,
  temuan_enhanced: DaftarTemuanEnhanced,
  detail: DetailTemuan,
  lapor_1: LaporKehilanganStep1,
  lapor_2_otp: LaporKehilanganStep2OTP,
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
