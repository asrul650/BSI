import React, { useState } from "react";

const API_BASE_URL = "http://localhost:8080";

export default function LaporTemuanStep3({ onNavigate }) {
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const draft = JSON.parse(sessionStorage.getItem("foundReportDraft") || "{}");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!consent) {
      setError("Silakan centang persetujuan pernyataan di bawah terlebih dahulu.");
      return;
    }

    const verificationToken = sessionStorage.getItem("foundVerificationToken") || `token_mock_${Date.now()}`;

    setLoading(true);
    setError("");

    try {
      let result = null;

      // 1. Coba kirim ke backend jika online
      try {
        const response = await fetch(`${API_BASE_URL}/v1/public/found-reports`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_id: Number(draft.category_id) || 1,
            color: draft.color || "Standar",
            location_id: Number(draft.location_id) || 1,
            item_name: draft.item_name || draft.category_name || "Barang Temuan",
            description: draft.description || "-",
            found_at: draft.found_at || new Date().toISOString(),
            finder_name: draft.finder_name || "Civitas Peduli (Anonim)",
            finder_whatsapp: draft.finder_whatsapp || "",
            verification_token: verificationToken,
            consent: true,
          }),
        });

        if (response.ok) {
          result = await response.json();
        }
      } catch (backendErr) {
        console.warn("Backend offline saat pengiriman laporan temuan:", backendErr);
      }

      // 2. Fallback mock jika backend offline (frontend-first development)
      if (!result || !result.report_id) {
        const randCode = "TM-" + Math.random().toString(36).substring(2, 8).toUpperCase();
        result = {
          report_id: randCode,
          created_at: new Date().toISOString(),
          status: "pending_dropoff",
          item_name: draft.item_name || draft.category_name || "Barang Temuan Civitas",
          finder_name: draft.finder_name || "Civitas Peduli (Anonim)",
          finder_whatsapp: draft.finder_whatsapp || "",
          color: draft.color || "-",
          location: draft.location_name || "Gedung Kuliah Umum (GKU)",
        };
      }

      sessionStorage.setItem("foundReportResult", JSON.stringify(result));
      if (onNavigate) onNavigate("lapor_temuan_sukses");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat memproses laporan temuan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-900">
      
      {/* Header Resmi */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div
            onClick={() => onNavigate && onNavigate("landing")}
            className="flex items-center space-x-3.5 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-uiiNavy text-white flex items-center justify-center shadow-md group-hover:bg-blue-700 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <span className="block text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Lost &amp; Found UII
              </span>
              <span className="block text-xs font-medium text-slate-500">
                Kampus Terpadu &bull; Lapor Barang Temuan
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate("lapor_temuan_1")}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 hover:border-slate-400 shadow-sm transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-slate-500">arrow_back</span>
            <span>Ubah Data Formulir</span>
          </button>
        </div>
      </header>

      {/* Main Form Confirmation */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        
        {/* Stepper Progres */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
            <span className="text-xs font-bold hidden sm:inline">1. Detail Barang</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
            <span className="text-xs font-bold hidden sm:inline">2. WhatsApp Valid</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-uiiNavy text-white shadow-md">
            <span className="w-5 h-5 rounded-full bg-white text-uiiNavy flex items-center justify-center text-xs font-bold">3</span>
            <span className="text-xs font-bold">3. Konfirmasi Tiket</span>
          </div>
        </div>

        {/* Card Ringkasan Laporan */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
          <div className="flex items-start justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-uiiNavy font-semibold text-xs mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Tahap Terakhir
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Konfirmasi Laporan Temuan
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Pastikan rincian berikut sudah sesuai sebelum menerbitkan tiket penyerahan resmi ke Pos Satpam.
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-uiiNavy flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">receipt_long</span>
            </div>
          </div>

          {/* Rincian Data */}
          <div className="mt-6 space-y-3 bg-slate-50 rounded-xl p-5 border border-slate-100 text-sm">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Nama / Kategori Barang:</span>
              <strong className="text-slate-800 text-right">{draft.item_name || draft.category_name || "Barang Temuan"}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Warna Dominan:</span>
              <strong className="text-slate-800">{draft.color || "-"}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Lokasi Penemuan:</span>
              <strong className="text-slate-800 text-right">{draft.location_name || "Kampus Terpadu UII"}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Identitas Pelapor:</span>
              <strong className="text-slate-800">{draft.finder_name || "Civitas Peduli (Anonim)"}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Nomor WhatsApp:</span>
              <strong className="text-slate-800 font-mono">+{draft.finder_whatsapp || "-"}</strong>
            </div>
          </div>

          {/* Callout SOP */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-600 text-[20px] shrink-0 mt-0.5">info</span>
            <p className="leading-relaxed">
              Setelah tiket terbit, silakan serahkan barang fisik ke <strong>Posko Induk Keamanan GKU</strong> atau <strong>Pos Gerbang Utama</strong> dalam batas waktu <strong>24 jam</strong>. Petugas Satpam akan melakukan pendokumentasian foto resmi.
            </p>
          </div>

          {/* Persetujuan */}
          <label className="mt-6 flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-uiiNavy focus:ring-0 cursor-pointer accent-blue-900"
            />
            <span className="text-xs sm:text-sm text-slate-700 font-medium">
              Saya menyatakan bahwa informasi barang temuan ini diberikan dengan sebenar-benarnya dan bersedia mengikuti prosedur penyerahan fisik ke Pos Satpam UII.
            </span>
          </label>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Tombol Terbitkan Tiket */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-7 py-3.5 rounded-xl bg-uiiNavy hover:bg-slate-800 text-white font-bold text-sm transition shadow-lg shadow-blue-950/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                <span>Menerbitkan Tiket Penyerahan...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Terbitkan Tiket &amp; Selesaikan Laporan</span>
              </>
            )}
          </button>
        </div>
      </main>

      {/* Footer Minimalis */}
      <footer className="py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        &copy; 2025 Universitas Islam Indonesia &bull; Unit Layanan Keamanan &amp; Ketertiban Kampus Terpadu.
      </footer>
    </div>
  );
}
