import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Filter, PackageOpen, ArrowLeft } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import { categories, posSatpamList } from '../../data/mockData';

export default function KatalogTemuan({ items, setActivePage, setSelectedItem }) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('Semua');
  const [selectedPos, setSelectedPos] = useState('Semua');

  const filtered = items.filter((item) => {
    const matchesCat = selectedCat === 'Semua' || item.category === selectedCat;
    const matchesPos = selectedPos === 'Semua' || item.storageLocation.includes(selectedPos);
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase()) ||
                          item.foundLocation.toLowerCase().includes(search.toLowerCase()) ||
                          item.id.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesPos && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Katalog Publik Terbuka
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Daftar Barang Temuan Kampus
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Seluruh barang temuan di bawah ini telah diverifikasi fisik dan disimpan di Pos Satpam UII.
          </p>
        </div>

        <button
          onClick={() => setActivePage('lapor-kehilangan')}
          className="self-start md:self-auto inline-flex items-center px-4 py-2.5 rounded-full bg-uiiNavy text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition cursor-pointer shadow-xs"
        >
          Barangmu Belum Ada? Lapor Kehilangan
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kata kunci barang, warna, lokasi penemuan, atau Item ID..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'Semua' ? 'Semua Kategori' : c}</option>
            ))}
          </select>

          <select
            value={selectedPos}
            onChange={(e) => setSelectedPos(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
          >
            <option value="Semua">Semua Pos Satpam</option>
            <option value="Gedung Kuliah Umum">Pos Utama GKU</option>
            <option value="FTSP">Pos FTSP</option>
            <option value="FTI">Pos FTI</option>
            <option value="Masjid Ulil Albab">Pos Masjid Ulil Albab</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>Menampilkan <strong>{filtered.length}</strong> barang ditemukan</span>
        {(search || selectedCat !== 'Semua' || selectedPos !== 'Semua') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCat('Semua');
              setSelectedPos('Semua');
            }}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Grid Cards or Empty State */}
      {filtered.length === 0 ? (
        <div className="my-16 text-center max-w-md mx-auto p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Tidak ada barang yang cocok</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Tidak ditemukan barang dengan filter pencarian tersebut. Silakan buat laporan kehilangan agar sistem otomatis mengabari saat barang ditemukan.
          </p>
          <button
            onClick={() => setActivePage('lapor-kehilangan')}
            className="mt-6 px-5 py-2.5 bg-uiiNavy text-white rounded-full text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
          >
            Buat Laporan Kehilangan
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setActivePage('detail');
              }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-elevated transition duration-200 flex flex-col cursor-pointer group"
            >
              <div className="relative bg-slate-100 aspect-[16/10] overflow-hidden">
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-900/80 backdrop-blur-md text-white">
                    {item.id}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <StatusBadge status={item.status} />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug mt-0.5 group-hover:text-blue-600 transition">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate"><strong>Ditemukan di:</strong> {item.foundLocation}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.foundDate} • {item.foundTime}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 truncate max-w-[180px]">
                    📍 {item.storageLocation.split('(')[0]}
                  </span>
                  <span className="text-xs font-bold text-uiiNavy group-hover:text-blue-600 transition">
                    Lihat Prosedur Klaim →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

