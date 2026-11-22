import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import DaftarTemuanEnhanced from './pages/DaftarTemuanEnhanced';
import DetailTemuan from './pages/DetailTemuan';
import LaporKehilanganStep1 from './pages/LaporKehilanganStep1';
import LaporKehilanganStep2OTP from './pages/LaporKehilanganStep2OTP';

const screens = [
  { id: 'landing', label: '2. Landing Page', component: LandingPage },
  { id: 'temuan_enhanced', label: '1. Daftar Barang Temuan (Enhanced)', component: DaftarTemuanEnhanced },
  { id: 'detail', label: '4. Detail Barang Temuan', component: DetailTemuan },
  { id: 'lapor_1', label: '5. Lapor Kehilangan (Langkah 1)', component: LaporKehilanganStep1 },
  { id: 'lapor_2_otp', label: '6. Lapor Kehilangan (Langkah 2: OTP)', component: LaporKehilanganStep2OTP },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState('landing');
  const [showSwitcher, setShowSwitcher] = useState(true);

  const CurrentScreenComponent = screens.find(s => s.id === activeScreen)?.component || LandingPage;

  return (
    <div className="relative min-h-screen">
      {/* Quick Screen Switcher Bar (Directly matching the 5 Active Stitch Screens) */}
      <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${showSwitcher ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl border border-slate-700/80 flex items-center gap-2 max-w-[95vw] overflow-x-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 pl-1 shrink-0">
            LAYAR STITCH:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(screen.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  activeScreen === screen.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {screen.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowSwitcher(false)}
            className="ml-2 text-slate-400 hover:text-white text-xs px-2 py-1 rounded-full hover:bg-slate-800 cursor-pointer"
            title="Sembunyikan bilah navigasi layar"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Button to reopen switcher if closed */}
      {!showSwitcher && (
        <button
          onClick={() => setShowSwitcher(true)}
          className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg border border-slate-700 cursor-pointer hover:bg-slate-800 transition"
        >
          📱 Pilih Layar Stitch (5 Layar)
        </button>
      )}

      {/* Render the Exact Screen Component */}
      <CurrentScreenComponent onNavigate={(target) => setActiveScreen(target)} />
    </div>
  );
}
