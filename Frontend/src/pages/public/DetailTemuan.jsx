import React from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, ShieldCheck, AlertCircle, Phone, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';

export default function DetailTemuan({ item, setActivePage }) {
  if (!item) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p className="text-slate-500">Pilih barang temuan terlebih dahulu.</p>
        <button
          onClick={() => setActivePage('katalog')}
          className="mt-4 px-4 py-2 bg-uiiNavy text-white rounded-full text-xs"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      {/* Back button */}
      <button
        onClick={() => setActivePage('katalog')}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-uiiNavy transition mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Daftar Barang Temuan
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image & Item Specs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs p-4">
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src={item.photoUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-slate-900/85 backdrop-blur-md text-white shadow-sm">
                  {item.id}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <StatusBadge status={item.status} />
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Kategori: {item.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {item.name}
              </h1>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {item.description}
              </p>

              {/* Data Grid */}
              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-xs">Warna Dominan</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{item.color}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-xs">Tanggal &amp; Waktu Temu</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{item.foundDate} • {item.foundTime}</span>
                </div>
                <div className="col-span-2 p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-xs">Lokasi Ditemukan</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{item.foundLocation}</span>
                </div>
              </div>

              {/* Privacy Notice Banner */}
              <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900 leading-relaxed">
                  <strong>Perlindungan Privasi (BR-14):</strong> Identitas penemu dan detail nomor telepon sengaja disembunyikan dari publik untuk menjaga keamanan. Proses pencocokan ciri fisik rahasia hanya dilakukan langsung bersama petugas Satpam.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Claim Procedures at Pos Satpam */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Fisik Barang Tersedia di Pos
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Apakah barang ini milik Anda?
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Barang ini disimpan secara aman dan tidak dapat diserahkan secara online. Silakan datangi pos penjagaan berikut:
            </p>

            {/* Storage Pos Card */}
            <div className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2">
              <span className="text-xs font-semibold text-slate-500 block">Lokasi Pos Penyimpanan:</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                <span>{item.storageLocation}</span>
              </h3>
              <p className="text-xs text-slate-500 pl-6">
                Nomor Rak Inventaris: <span className="font-mono font-semibold text-slate-800">{item.storageRack}</span>
              </p>
            </div>

            {/* SOP Steps */}
            <div className="mt-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Prosedur Verifikasi Pengambilan (BPMN 4)
              </h4>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    1
                  </div>
                  <div>
                    <strong>Sebutkan Item ID ({item.id})</strong> kepada petugas satpam yang berjaga di pos.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    2
                  </div>
                  <div>
                    <strong>Tunjukkan KTM / KTP asli</strong> untuk pencatatan nama dan 4 digit terakhir NIK/NIM.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    3
                  </div>
                  <div>
                    <strong>Sebutkan ciri-ciri khusus rahasia</strong> yang tidak tercantum di foto ini (contoh: isi dompet, goresan khusus, nomor seri).
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    4
                  </div>
                  <div>
                    <strong>Dokumentasi foto serah terima</strong> bersama petugas saat barang diserahkan secara sah.
                  </div>
                </li>
              </ul>
            </div>

            {/* Security Hotline */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Pertanyaan sebelum ke pos?</span>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                Chat WhatsApp Satpam
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

