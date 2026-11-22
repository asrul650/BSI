import React from 'react';
import { Shield, Search, PlusCircle, HelpCircle, Building2, Lock } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Identity */}
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center space-x-3.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-11 h-11 rounded-xl bg-uiiNavy text-white flex items-center justify-center shadow-md group-hover:bg-blue-700 transition">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
              Lost &amp; Found UII
            </span>
            <span className="block text-xs font-medium text-slate-500">
              Kampus Terpadu • Temukan kembali barangmu
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-slate-600">
          <button
            onClick={() => setActivePage('home')}
            className={`transition pb-1 cursor-pointer ${
              activePage === 'home'
                ? 'text-uiiNavy font-bold border-b-2 border-uiiNavy'
                : 'hover:text-uiiNavy'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => setActivePage('katalog')}
            className={`transition pb-1 cursor-pointer ${
              activePage === 'katalog' || activePage === 'detail'
                ? 'text-uiiNavy font-bold border-b-2 border-uiiNavy'
                : 'hover:text-uiiNavy'
            }`}
          >
            Barang Temuan
          </button>
          <button
            onClick={() => setActivePage('cara-kerja')}
            className={`transition pb-1 cursor-pointer ${
              activePage === 'cara-kerja'
                ? 'text-uiiNavy font-bold border-b-2 border-uiiNavy'
                : 'hover:text-uiiNavy'
            }`}
          >
            Cara Kerja
          </button>
          <button
            onClick={() => setActivePage('pos-satpam')}
            className={`transition pb-1 cursor-pointer ${
              activePage === 'pos-satpam'
                ? 'text-uiiNavy font-bold border-b-2 border-uiiNavy'
                : 'hover:text-uiiNavy'
            }`}
          >
            Pos Satpam
          </button>
          <button
            onClick={() => setActivePage('admin-dashboard')}
            className={`transition pb-1 flex items-center gap-1 cursor-pointer ${
              activePage === 'admin-dashboard' || activePage === 'admin-login'
                ? 'text-blue-700 font-bold border-b-2 border-blue-700'
                : 'text-slate-500 hover:text-uiiNavy'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Portal Satpam
          </button>
        </nav>

        {/* Action Buttons (No Login Required) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActivePage('lapor-kehilangan')}
            type="button"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 hover:border-slate-400 shadow-xs transition cursor-pointer"
          >
            Saya Kehilangan
          </button>
          <button
            onClick={() => setActivePage('lapor-penemuan')}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-uiiNavy hover:bg-slate-800 rounded-full shadow-xs hover:shadow transition cursor-pointer"
          >
            Saya Menemukan
          </button>
        </div>
      </div>
    </header>
  );
}

