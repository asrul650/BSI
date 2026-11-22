import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, ShieldCheck, ArrowRight, CheckCircle, Sparkles, Filter, Package } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import { categories } from '../../data/mockData';

export default function Home({ items, setActivePage, setSelectedItem }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.foundLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.color.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-blue-50/50 via-white to-canvasBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-100/70 via-sky-50 to-blue-50/50 rounded-3xl p-8 sm:p-10 lg:p-14 border border-blue-100/80 shadow-soft-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Hero Content */}
              <div className="lg:col-span-7 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-blue-700 border border-blue-200/60 mb-5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Layanan Resmi Satuan Pengamanan UII
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                  Kehilangan atau menemukan barang di kampus?
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                  Lapor sekarang tanpa ribet. Petugas Satpam UII dan sistem verifikasi terpadu kami siap membantu menemukan kembali barangmu dengan aman.
                </p>

                {/* Dual CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => setActivePage('lapor-kehilangan')}
                    className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white rounded-full border border-slate-200 shadow-xs hover:bg-slate-50 hover:border-slate-300 transition group cursor-pointer"
                  >
                    <span>Saya Kehilangan</span>
                    <ArrowRight className="ml-2 w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setActivePage('lapor-penemuan')}
                    className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-uiiNavy rounded-full shadow-md hover:bg-slate-800 transition cursor-pointer"
                  >
                    Saya Menemukan
                  </button>
                </div>
              </div>

              {/* Right Hero Illustration Graphic */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl bg-white/70 backdrop-blur-sm border border-white/90 p-6 shadow-elevated flex items-center justify-center overflow-hidden">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-uiiNavy to-blue-600 flex items-center justify-center text-white shadow-xl mb-4 border-2 border-white/60">
                      <Package className="w-12 h-12 text-sky-100" />
                    </div>
                    <span className="font-extrabold text-slate-900 text-base">Portal Terintegrasi UII</span>
                    <span className="text-xs text-slate-500 mt-1 max-w-xs">
                      Menghubungkan Pos Satpam, Pelapor, dan Penemu Barang secara transparan.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-lg border border-slate-200/80 flex items-center gap-3">
              <div className="pl-3.5 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama barang temuan, warna, atau lokasi kampus..."
                className="w-full border-none focus:ring-0 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent py-2.5 outline-none"
              />
              <button
                onClick={() => setActivePage('katalog')}
                className="hidden sm:inline-flex px-5 py-2.5 bg-uiiNavy text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition cursor-pointer"
              >
                Cari
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat ? 'custom-pill-active shadow-sm font-semibold' : 'custom-pill-idle'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Found Items Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Barang Terbaru Ditemukan</h2>
              <p className="text-sm text-slate-500 mt-1">
                Telah diamankan oleh Pos Satpam kampus dan menunggu proses verifikasi pemilik.
              </p>
            </div>
            <button
              onClick={() => setActivePage('katalog')}
              className="inline-flex items-center text-sm font-semibold text-uiiNavy hover:text-blue-700 transition cursor-pointer"
            >
              <span>Lihat Semua ({items.length})</span>
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setActivePage('detail');
                }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-elevated transition duration-200 flex flex-col cursor-pointer"
              >
                <div className="relative bg-slate-100 aspect-[4/3] overflow-hidden flex items-center justify-center">
                  <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-uiiNavy text-white">
                    Baru
                  </span>
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition">
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">Item ID: {item.id}</p>
                    <div className="mt-3.5 space-y-1.5 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.foundLocation}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.foundDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <StatusBadge status={item.status} />
                    <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                      Detail Klaim →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3 Reassurance Value Props */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-200/90 shadow-soft-card p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="flex items-center space-x-4 pt-2 md:pt-0">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Tanpa Login Publik</h4>
                  <p className="text-xs text-slate-500">Mahasiswa &amp; warga kampus lapor instan dengan OTP WhatsApp</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4 md:pt-0 md:pl-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Verifikasi Tatap Muka</h4>
                  <p className="text-xs text-slate-500">Barang fisik aman di pos satpam, serah terima wajib cek KTM/KTP</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4 md:pt-0 md:pl-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Privasi &amp; Ciri Rahasia</h4>
                  <p className="text-xs text-slate-500">Nomor kontak &amp; tanda khusus barang tidak tampil ke publik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section className="py-16 lg:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              Alur Prosedur Resmi
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Cara Kerja Lost &amp; Found UII</h2>
            <p className="text-base text-slate-600 mt-2">
              Empat langkah mudah pengembalian barang yang aman dan terstruktur sesuai SOP Satuan Pengamanan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition">
              <div>
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-lg mb-5 border border-blue-100">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Lapor Kehilangan / Temuan</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Isi formulir online secara rinci tanpa login. Deskripsi rahasia disimpan aman untuk verifikasi.
                </p>
              </div>
              <div className="mt-5 text-xs text-slate-400 font-medium">Langkah cepat ≤ 2 Menit</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition">
              <div>
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-lg mb-5 border border-blue-100">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Verifikasi OTP WhatsApp</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Nomor WhatsApp divalidasi via kode OTP 6-digit untuk mencegah spam dan menghubungkan kontak pelapor.
                </p>
              </div>
              <div className="mt-5 text-xs text-slate-400 font-medium">Validasi resmi instan</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition">
              <div>
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-lg mb-5 border border-blue-100">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Pencocokan Otomatis</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sistem weighted scoring mencocokkan laporan dengan barang temuan satpam. Jika cocok, WA dikirim otomatis.
                </p>
              </div>
              <div className="mt-5 text-xs text-slate-400 font-medium">Threshold matching ≥ 80%</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition">
              <div>
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-lg mb-5 border border-blue-100">
                  4
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Ambil di Pos Satpam</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Datang ke pos satpam yang tertera dengan membawa KTM/KTP asli untuk verifikasi fisik dan serah terima.
                </p>
              </div>
              <div className="mt-5 text-xs text-slate-400 font-medium">Pos Satpam Siaga 24 Jam</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

