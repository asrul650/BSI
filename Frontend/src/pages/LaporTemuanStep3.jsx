import React, { useEffect, useRef, useState } from "react";

const API_BASE_URL = "http://localhost:8080";

export default function LaporTemuanStep3({ onNavigate }) {
  const containerRef = useRef(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const draft = JSON.parse(sessionStorage.getItem("foundReportDraft") || "{}");

  const handleSubmit = async () => {
    if (!consent) {
      setError("Silakan setujui pernyataan terlebih dahulu.");
      return;
    }

    const verificationToken = sessionStorage.getItem("foundVerificationToken");

    if (!verificationToken) {
      setError("Verifikasi WhatsApp belum dilakukan. Silakan ulangi verifikasi OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/v1/public/found-reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: Number(draft.category_id),
          color: draft.color,
          location_id: Number(draft.location_id),
          item_name: draft.item_name,
          description: draft.description,
          found_at: draft.found_at,
          finder_name: draft.finder_name,
          finder_whatsapp: draft.finder_whatsapp,
          verification_token: verificationToken,
          consent: true,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || "Gagal mengirim laporan.");
      }

      sessionStorage.setItem("foundReportResult", JSON.stringify(result));

      onNavigate?.("lapor_temuan_sukses");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengirim laporan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const handleClick = (event) => {
      const button = event.target.closest("button");

      if (!button) return;

      const text = button.textContent.trim();

      if (text.includes("Kirim Laporan") || text.includes("Kirim") || button.id === "submitFoundReport") {
        event.preventDefault();
        handleSubmit();
      }

      if (text.includes("Kembali")) {
        event.preventDefault();
        onNavigate?.("lapor_temuan_1");
      }
    };

    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [consent, loading, draft, onNavigate]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div ref={containerRef} className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-2 text-2xl font-bold">Konfirmasi Laporan Temuan</h1>

        <p className="mb-6 text-slate-600">Periksa kembali laporan sebelum dikirim.</p>

        <div className="mb-6 space-y-2 text-sm">
          <p>
            <strong>Nama barang:</strong> {draft.item_name || draft.category_name || "-"}
          </p>
          <p>
            <strong>Warna:</strong> {draft.color || "-"}
          </p>
          <p>
            <strong>Nama pelapor:</strong> {draft.finder_name || "-"}
          </p>
          <p>
            <strong>WhatsApp:</strong> {draft.finder_whatsapp || "-"}
          </p>
        </div>

        <label className="mb-4 flex items-start gap-3">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1" />
          <span className="text-sm text-slate-700">Saya menyatakan bahwa informasi yang diberikan benar dan bersedia mengikuti prosedur penyerahan barang.</span>
        </label>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button id="submitFoundReport" type="button" onClick={handleSubmit} disabled={loading} className="w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white disabled:opacity-50">
          {loading ? "Mengirim..." : "Kirim Laporan"}
        </button>
      </div>
    </div>
  );
}
