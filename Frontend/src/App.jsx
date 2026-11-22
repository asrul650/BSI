import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/public/Home';
import KatalogTemuan from './pages/public/KatalogTemuan';
import DetailTemuan from './pages/public/DetailTemuan';
import LaporKehilangan from './pages/public/LaporKehilangan';
import LaporPenemuan from './pages/public/LaporPenemuan';
import PosSatpam from './pages/public/PosSatpam';
import CaraKerja from './pages/public/CaraKerja';
import DashboardSatpam from './pages/admin/DashboardSatpam';
import { initialFoundItems, initialLostReports } from './data/mockData';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [items, setItems] = useState(initialFoundItems);
  const [lostReports, setLostReports] = useState(initialLostReports);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleNewReport = (newReport) => {
    setLostReports([newReport, ...lostReports]);
  };

  const handleNewFoundItem = (newItem) => {
    setItems([newItem, ...items]);
  };

  const handleUpdateItemStatus = (itemId, newStatus) => {
    setItems(items.map(item => item.id === itemId ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvasBg text-slate-800 font-sans">
      {/* Top Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col">
        {activePage === 'home' && (
          <Home
            items={items}
            setActivePage={setActivePage}
            setSelectedItem={setSelectedItem}
          />
        )}

        {activePage === 'katalog' && (
          <KatalogTemuan
            items={items}
            setActivePage={setActivePage}
            setSelectedItem={setSelectedItem}
          />
        )}

        {activePage === 'detail' && (
          <DetailTemuan
            item={selectedItem}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'lapor-kehilangan' && (
          <LaporKehilangan
            setActivePage={setActivePage}
            onNewReport={handleNewReport}
          />
        )}

        {activePage === 'lapor-penemuan' && (
          <LaporPenemuan
            setActivePage={setActivePage}
            onNewFoundItem={handleNewFoundItem}
          />
        )}

        {activePage === 'pos-satpam' && (
          <PosSatpam
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'cara-kerja' && (
          <CaraKerja
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'admin-dashboard' && (
          <DashboardSatpam
            items={items}
            lostReports={lostReports}
            onUpdateItemStatus={handleUpdateItemStatus}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

