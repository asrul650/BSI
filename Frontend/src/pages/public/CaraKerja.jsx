import React from 'react';
import { ArrowRight, Shield, CheckCircle, Search, FileText } from 'lucide-react';

export default function CaraKerja({ setActivePage }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Panduan SOP Lengkap
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
          Alur &amp; Prosedur Lost &amp; Found
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Dirancang untuk memastikan barang yang hilang dapat kembali ke pemilik aslinya tanpa risiko penipuan atau klaim palsu.
        </p>
      </div>

      <div className="space-y-8">
        {/* BPMN 1 Flow */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
              1
            </span>
            <h2 className="text-xl font-bold text-slate-900">Alur Pelaporan Barang Hilang (BPMN 1)</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Pengguna membuka form pelaporan kehilangan tanpa login. Mengisi kategori, deskripsi ciri rahasia, warna, lokasi, dan nomor WhatsApp. Sistem mengirimkan kode OTP 6-digit untuk memvalidasi nomor WA. Setelah valid, tiket <strong>HL-[acak]</strong> diterbitkan dan masuk ke antrean matching. Laporan kehilangan <strong>tidak ditampilkan publik</strong>.
          </p>
        </div>

        {/* BPMN 2 Flow */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
              2
            </span>
            <h2 className="text-xl font-bold text-slate-900">Alur Penemuan &amp; Penyimpanan Fisik (BPMN 2)</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Penemu membuat laporan online dan memperoleh kode tiket <strong>TM-[acak]</strong>. Penemu wajib menyerahkan barang fisik ke Pos Satpam dalam waktu 24 jam. Satpam memeriksa fisik, menentukan rak penyimpanan, mengambil foto resmi, dan mengaktifkan <strong>Item ID (ITM-xxxx)</strong>. Setelah berstatus <em>Barang Ditemukan</em>, barang baru muncul di katalog publik.
          </p>
        </div>

        {/* BPMN 3 Flow */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
              3
            </span>
            <h2 className="text-xl font-bold text-slate-900">Algoritma Matching Otomatis (BPMN 3)</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Sistem secara otomatis menghitung kecocokan dengan rumus pembobotan:
            <br />
            <code className="inline-block mt-2 px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono text-slate-800">
              Skor = (35% × Warna) + (35% × Lokasi) + (30% × Selisih Waktu)
            </code>
            <br />
            Jika skor ≥ 80% (ambang batas), sistem mengirim notifikasi WhatsApp otomatis ke pelapor yang berisi nomor tiket dan ajakan verifikasi ke Pos Satpam.
          </p>
        </div>

        {/* BPMN 4 Flow */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
              4
            </span>
            <h2 className="text-xl font-bold text-slate-900">Verifikasi Kepemilikan di Pos Satpam (BPMN 4)</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Pelapor datang ke Pos Satpam menyebutkan Item ID. Satpam mencatat nama dan 4 digit terakhir NIK/NIM. Satpam menekan tombol <em>Buka Data Rahasia</em> (tercatat di audit log) dan membandingkan jawaban pelapor dengan ciri rahasia barang. Jika cocok, satpam mengambil foto serah terima dan status berubah menjadi <strong>Telah Diambil</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

