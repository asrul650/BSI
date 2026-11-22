import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, ShieldAlert, MapPin, Building2 } from 'lucide-react';
import { categories, posSatpamList } from '../../data/mockData';

export default function LaporPenemuan({ setActivePage, onNewFoundItem }) {
  const [mode, setMode] = useState('online'); // 'online' or 'direct'
  const [step, setStep] = useState(1);
  const [ticketId, setTicketId] = useState('');

  const [formData, setFormData] = useState({
    finderName: '',
    finderPhone: '',
    itemName: '',
    category: '',
    color: '',
    foundLocation: '',
    foundDate: new Date().toISOString().split('T')[0],
    foundTime: '12:00',
    description: '',
    targetPos: posSatpamList[0].name
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomTicket = 'TM-' + Math.floor(10000 + Math.random() * 90000);
    setTicketId(randomTicket);

    if (onNewFoundItem) {
      onNewFoundItem({
        id: 'ITM-' + Math.floor(100 + Math.random() * 900),
        name: formData.itemName,
        category: formData.category,
        color: formData.color,
        description: formData.description,
        foundLocation: formData.foundLocation,
        foundDate: formData.foundDate,
        foundTime: formData.foundTime + ' WIB',
        storageLocation: formData.targetPos,
        storageRack: 'Antrean Intake',
        status: 'Menunggu Penyerahan',
        photoUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
        secretNotes: 'Laporan online dari penemu.',
        finderName: formData.finderName,
        finderPhone: formData.finderPhone
      });
    }

    setStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
      {/* Choice mode */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setMode('online')}
          className={`p-5 rounded-2xl border text-left transition cursor-pointer ${
            mode === 'online'
              ? 'bg-blue-50/80 border-blue-500 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">Pilihan A (Direkomendasikan)</span>
          <h3 className="font-bold text-slate-900 text-base mt-1">Lapor Online Terlebih Dahulu</h3>
          <p className="text-xs text-slate-500 mt-1">
            Catat detail barang di web, dapatkan kode tiket TM, lalu serahkan fisik ke pos satpam terdekat.
          </p>
        </button>

        <button
          onClick={() => setMode('direct')}
          className={`p-5 rounded-2xl border text-left transition cursor-pointer ${
            mode === 'direct'
              ? 'bg-blue-50/80 border-blue-500 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Pilihan B (Langsung Fisik)</span>
          <h3 className="font-bold text-slate-900 text-base mt-1">Langsung Datang ke Pos Satpam</h3>
          <p className="text-xs text-slate-500 mt-1">
            Tidak perlu isi form online. Serahkan barang langsung ke petugas satpam yang berjaga di pos kampus.
          </p>
        </button>
      </div>

      {mode === 'direct' ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs text-center max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Penyerahan Fisik Langsung
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Terima kasih atas itikad baik Anda! Anda cukup membawa barang temuan tersebut ke Pos Satpam UII terdekat. Petugas Satpam akan melakukan pencatatan intake resmi di sistem.
          </p>

          <div className="mt-6 space-y-3 text-left">
            {posSatpamList.map((pos) => (
              <div key={pos.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{pos.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{pos.location} • {pos.operatingHours}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActivePage('home')}
            className="mt-8 px-6 py-3 bg-uiiNavy text-white rounded-full text-xs font-semibold hover:bg-slate-800 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      ) : step === 1 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Lapor Temuan Online
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Formulir Laporan Barang Ditemukan
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Setiap barang yang dilaporkan wajib diserahkan secara fisik ke pos satpam untuk disimpan dengan aman.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap Penemu *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cth: Rizky Kurniawan"
                  value={formData.finderName}
                  onChange={(e) => setFormData({ ...formData, finderName: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp Penemu *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Cth: 081298765432"
                  value={formData.finderPhone}
                  onChange={(e) => setFormData({ ...formData, finderPhone: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kategori Barang *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>Pilih Kategori</option>
                  {categories.filter(c => c !== 'Semua').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Barang Temuan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cth: Kunci Motor Beat Karbu"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Warna Dominan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cth: Hitam kombinasi merah"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Lokasi Tempat Menemukan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cth: Parkiran Gedung FTSP sisi selatan dekat mushola"
                  value={formData.foundLocation}
                  onChange={(e) => setFormData({ ...formData, foundLocation: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tanggal Penemuan *
                </label>
                <input
                  type="date"
                  required
                  value={formData.foundDate}
                  onChange={(e) => setFormData({ ...formData, foundDate: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pos Satpam Tujuan Penyerahan *
                </label>
                <select
                  value={formData.targetPos}
                  onChange={(e) => setFormData({ ...formData, targetPos: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {posSatpamList.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Deskripsi Kondisi Fisik Barang *
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan kondisi barang saat Anda temukan..."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <strong>Ketentuan Penyerahan Fisik (BPMN 2):</strong> Setelah menekan tombol kirim di bawah, Anda akan menerima nomor tiket laporan. Harap serahkan barang fisik ke Pos Satpam pilihan Anda dalam waktu <strong>maksimal 24 jam</strong> agar laporan tidak kedaluwarsa.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActivePage('home')}
                className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-uiiNavy text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition shadow-xs cursor-pointer"
              >
                <span>Dapatkan Kode Tiket Penyerahan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Status: Menunggu Penyerahan Fisik
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-3">
            Kode Tiket: {ticketId}
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Laporan barang temuan Anda telah tercatat. Silakan bawa barang fisik dan tunjukkan kode tiket ini ke petugas satpam di:
          </p>

          <div className="mt-5 p-4 bg-blue-50/80 rounded-2xl border border-blue-100 text-left text-xs text-blue-900 space-y-1">
            <strong>Tujuan Pos:</strong> {formData.targetPos}
            <br />
            <strong>Batas Waktu:</strong> 24 Jam sejak laporan ini dibuat
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setActivePage('katalog')}
              className="px-6 py-3 bg-uiiNavy text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-slate-800 transition"
            >
              Kembali ke Katalog
            </button>
            <button
              onClick={() => setActivePage('home')}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-full text-xs sm:text-sm font-semibold hover:bg-slate-200 transition"
            >
              Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

