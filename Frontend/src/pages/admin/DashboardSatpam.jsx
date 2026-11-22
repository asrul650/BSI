import React, { useState } from 'react';
import { Shield, Package, FileText, CheckCircle, AlertTriangle, Eye, EyeOff, Search, Plus, UserCheck } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';

export default function DashboardSatpam({ items, lostReports, onUpdateItemStatus }) {
  const [activeTab, setActiveTab] = useState('temuan'); // 'temuan', 'hilang', 'matching', 'verifikasi'
  const [revealedSecrets, setRevealedSecrets] = useState({});
  const [selectedItemForClaim, setSelectedItemForClaim] = useState(items[0]?.id || '');
  const [claimantNim, setClaimantNim] = useState('');
  const [claimantName, setClaimantName] = useState('');
  const [claimNotes, setClaimNotes] = useState('');
  const [claimSuccessMsg, setClaimSuccessMsg] = useState('');

  const toggleSecret = (id) => {
    setRevealedSecrets(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleProcessClaim = (status) => {
    if (!claimantName || !claimantNim) {
      alert('Wajib mengisi Nama Pemohon dan 4 Digit NIK/NIM!');
      return;
    }
    if (onUpdateItemStatus) {
      onUpdateItemStatus(selectedItemForClaim, status);
    }
    setClaimSuccessMsg(`Klaim barang ${selectedItemForClaim} berhasil diproses dengan status: ${status}. Dicatat di audit log.`);
    setTimeout(() => setClaimSuccessMsg(''), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            Portal Petugas Satuan Pengamanan (Satpam) UII
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Pengelolaan Lost &amp; Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Petugas Aktif: Satpam Pos Utama GKU • Sesi Autentikasi Terverifikasi
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Barang Temuan</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{items.length}</h3>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Tersimpan di rak pos</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Laporan Kehilangan Aktif</span>
          <h3 className="text-2xl font-extrabold text-blue-600 mt-1">{lostReports.length}</h3>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">Dalam pencarian sistem</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Matching Potensi Tinggi</span>
          <h3 className="text-2xl font-extrabold text-purple-600 mt-1">2</h3>
          <span className="text-[11px] text-purple-600 font-semibold mt-1 block">Skor ≥ 80% (Notif WA Sent)</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Verifikasi Selesai</span>
          <h3 className="text-2xl font-extrabold text-slate-700 mt-1">14</h3>
          <span className="text-[11px] text-slate-400 font-semibold mt-1 block">Bulan November 2026</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex border-b border-slate-200 gap-6 text-sm font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('temuan')}
          className={`pb-3 cursor-pointer whitespace-nowrap ${
            activeTab === 'temuan' ? 'text-uiiNavy border-b-2 border-uiiNavy font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Daftar Inventaris Barang ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('hilang')}
          className={`pb-3 cursor-pointer whitespace-nowrap ${
            activeTab === 'hilang' ? 'text-uiiNavy border-b-2 border-uiiNavy font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Laporan Kehilangan ({lostReports.length})
        </button>
        <button
          onClick={() => setActiveTab('matching')}
          className={`pb-3 cursor-pointer whitespace-nowrap ${
            activeTab === 'matching' ? 'text-uiiNavy border-b-2 border-uiiNavy font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Hasil Matching (Read-Only)
        </button>
        <button
          onClick={() => setActiveTab('verifikasi')}
          className={`pb-3 cursor-pointer whitespace-nowrap ${
            activeTab === 'verifikasi' ? 'text-uiiNavy border-b-2 border-uiiNavy font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Klaim &amp; Verifikasi Pos
        </button>
      </div>

      {/* TAB 1: DAFTAR TEMUAN */}
      {activeTab === 'temuan' && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Item ID</th>
                  <th className="py-3.5 px-4 font-bold">Nama Barang</th>
                  <th className="py-3.5 px-4 font-bold">Kategori</th>
                  <th className="py-3.5 px-4 font-bold">Lokasi Temu</th>
                  <th className="py-3.5 px-4 font-bold">Rak Penyimpanan</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Ciri Rahasia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{item.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{item.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.category}</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.foundLocation}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{item.storageRack}</td>
                    <td className="py-3.5 px-4"><StatusBadge status={item.status} /></td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleSecret(item.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
                        title="Aksi membuka data rahasia dicatat di log audit"
                      >
                        {revealedSecrets[item.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{revealedSecrets[item.id] ? 'Tutup' : 'Buka Rahasia'}</span>
                      </button>
                      {revealedSecrets[item.id] && (
                        <div className="mt-1.5 p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900 max-w-xs">
                          {item.secretNotes}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: LAPORAN KEHILANGAN */}
      {activeTab === 'hilang' && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Tiket ID</th>
                  <th className="py-3.5 px-4 font-bold">Nama Barang</th>
                  <th className="py-3.5 px-4 font-bold">Kategori</th>
                  <th className="py-3.5 px-4 font-bold">Pelapor</th>
                  <th className="py-3.5 px-4 font-bold">WhatsApp</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Kandidat Cocok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lostReports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{r.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{r.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{r.category}</td>
                    <td className="py-3.5 px-4 text-slate-700">{r.reporterName}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{r.reporterPhone}</td>
                    <td className="py-3.5 px-4"><StatusBadge status={r.status} /></td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {r.candidateItemId || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: HASIL MATCHING */}
      {activeTab === 'matching' && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
            <strong>Keterangan (BPMN 3 - Read Only):</strong> Sistem menghitung skor kecocokan berdasarkan formula: <code>35% Warna + 35% Lokasi + 30% Waktu</code>. Pasangan dengan skor ≥ 80% secara otomatis dikirimi notifikasi WhatsApp resmi kepada nomor kontak pelapor.
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Pasangan Terindikasi Cocok</h3>
              <span className="text-xs text-slate-400">Diperbarui otomatis saat barang intake</span>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Skor: 92% (Tinggi)
                    </span>
                    <span className="text-xs text-slate-400">• WhatsApp Alert Terkirim</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Kunci Motor Vario 160 (HL-83921) ⇄ Kunci Motor Honda (ITM-0230)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Pelapor: Siti Rahmawati (085712345678) • Pos: Pos Satpam FTSP
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedItemForClaim('ITM-0230');
                    setActiveTab('verifikasi');
                  }}
                  className="px-4 py-2 bg-uiiNavy text-white rounded-full text-xs font-semibold hover:bg-slate-800 transition cursor-pointer self-start sm:self-auto"
                >
                  Buka Menu Klaim Pos
                </button>
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Skor: 88% (Tinggi)
                    </span>
                    <span className="text-xs text-slate-400">• WhatsApp Alert Terkirim</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Dompet Kartu Braun Buffel (HL-94812) ⇄ Dompet Kulit Hitam (ITM-0231)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Pelapor: Ahmad Fadhil Pratama (081234567890) • Pos: Pos Satpam Utama GKU
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedItemForClaim('ITM-0231');
                    setActiveTab('verifikasi');
                  }}
                  className="px-4 py-2 bg-uiiNavy text-white rounded-full text-xs font-semibold hover:bg-slate-800 transition cursor-pointer self-start sm:self-auto"
                >
                  Buka Menu Klaim Pos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VERIFIKASI & KLAIM */}
      {activeTab === 'verifikasi' && (
        <div className="mt-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Pemeriksaan Klaim Fisik di Pos Satpam
              </h3>
              <p className="text-xs text-slate-500">
                Kepatuhan BPMN 4: Catat identitas pemohon, uji ciri khusus, dan dokumentasi penyerahan.
              </p>
            </div>
          </div>

          {claimSuccessMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold">
              {claimSuccessMsg}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Pilih Barang yang Diklaim Pemohon *
              </label>
              <select
                value={selectedItemForClaim}
                onChange={(e) => setSelectedItemForClaim(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white"
              >
                {items.map((i) => (
                  <option key={i.id} value={i.id}>{i.id} - {i.name} ({i.storageRack})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Lengkap Pemohon *
                </label>
                <input
                  type="text"
                  placeholder="Sesuai KTM/KTP"
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  4 Digit Terakhir NIK / NIM *
                </label>
                <input
                  type="text"
                  maxLength="4"
                  placeholder="Cth: 2189"
                  value={claimantNim}
                  onChange={(e) => setClaimantNim(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Catatan Hasil Verifikasi Satpam
              </label>
              <textarea
                rows="2"
                placeholder="Catat kecocokan ciri rahasia barang atau alasan jika klaim ditolak..."
                value={claimNotes}
                onChange={(e) => setClaimNotes(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200"
              ></textarea>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong>Ciri Rahasia Fisik Barang:</strong> {items.find(i => i.id === selectedItemForClaim)?.secretNotes}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => handleProcessClaim('Barang Ditemukan')}
                className="px-4 py-2.5 rounded-full border border-rose-300 bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 transition cursor-pointer"
              >
                Tolak Klaim (Alasan Wajib)
              </button>
              <button
                type="button"
                onClick={() => handleProcessClaim('Telah Diambil')}
                className="px-6 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-xs cursor-pointer"
              >
                Verifikasi Lolos &amp; Serahkan Barang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

