import React from 'react';
import { Phone, Clock, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
          {/* Brand & Description */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-uiiNavy text-white flex items-center justify-center font-bold text-sm">
                UII
              </div>
              <span className="font-bold text-slate-900 text-lg">
                Lost &amp; Found Kampus UII
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pr-0 md:pr-8">
              Layanan resmi pelaporan barang hilang dan temuan untuk mahasiswa, dosen, tenaga kependidikan, dan pengunjung Universitas Islam Indonesia bekerja sama langsung dengan Satuan Pengamanan (Satpam) Kampus.
            </p>
            <div className="mt-4 flex items-center space-x-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Sistem Terpadu Aktif 24 Jam
              </span>
              <span>•</span>
              <span>Kampus Terpadu Yogyakarta</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Tautan Layanan
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <button
                  onClick={() => setActivePage('home')}
                  className="hover:text-uiiNavy transition cursor-pointer"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('katalog')}
                  className="hover:text-uiiNavy transition cursor-pointer"
                >
                  Daftar Barang Temuan
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('lapor-kehilangan')}
                  className="hover:text-uiiNavy transition cursor-pointer"
                >
                  Form Lapor Kehilangan (Publik)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('lapor-penemuan')}
                  className="hover:text-uiiNavy transition cursor-pointer"
                >
                  Form Lapor Penemuan Barang
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('pos-satpam')}
                  className="hover:text-uiiNavy transition cursor-pointer"
                >
                  Lokasi Pos Satpam Kampus
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Security */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Kontak Satuan Pengamanan (Satpam)
            </h4>
            <div className="text-sm text-slate-600 space-y-3">
              <p className="leading-relaxed flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                <span>
                  <strong>Pos Utama Satpam:</strong> Gedung Kuliah Umum (GKU) &amp; Gerbang Utama, Kampus Terpadu UII, Jl. Kaliurang Km 14,5, Sleman, D.I. Yogyakarta 55584.
                </span>
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="block text-xs font-semibold text-slate-500">
                  Hotline 24 Jam Satpam:
                </span>
                <span className="text-base font-bold text-uiiNavy block">
                  (0274) 898444 ext. 101 / Satpam
                </span>
                <span className="block text-xs text-slate-500">
                  WhatsApp Siaga: +62 812-3456-7890
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Universitas Islam Indonesia • Badan Sistem Informasi (BSI). Dilindungi hak cipta.</p>
          <div className="flex items-center space-x-5">
            <span className="inline-flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verifikasi Tatap Muka Terlindungi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

