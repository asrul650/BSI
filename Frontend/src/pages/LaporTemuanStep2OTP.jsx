import React, { useEffect, useRef, useState } from "react";

const API_BASE_URL = "http://localhost:8080";

export default function LaporTemuanStep2OTP({ onNavigate }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  const phone = sessionStorage.getItem("foundReportPhone") || "";

  useEffect(() => {
    if (!phone) {
      onNavigate("lapor_temuan_1");
    }
  }, [phone, onNavigate]);

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const updated = [...code];
    updated[index] = digit;
    setCode(updated);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    const updated = [...code];
    digits.split("").forEach((digit, index) => {
      updated[index] = digit;
    });

    setCode(updated);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    const otp = code.join("");

    if (otp.length !== 6) {
      setError("Masukkan 6 digit kode OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/v1/public/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          purpose: "found_report",
          code: otp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Verifikasi OTP gagal.");
      }

      if (!result.verification_token) {
        throw new Error("Token verifikasi tidak ditemukan.");
      }

      sessionStorage.setItem("foundVerificationToken", result.verification_token);

      onNavigate("lapor_temuan_3");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResending(true);

    try {
      const response = await fetch(`${API_BASE_URL}/v1/public/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          purpose: "found_report",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Gagal mengirim ulang OTP.");
      }

      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-7">
        <button type="button" onClick={() => onNavigate("lapor_temuan_1")} className="text-sm text-slate-500 hover:text-slate-800 mb-7">
          ← Kembali
        </button>

        <div className="text-center">
          <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-blue-600">mark_email_read</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Verifikasi WhatsApp</h1>

          <p className="text-sm text-slate-500 mt-3">Masukkan kode OTP yang dikirim ke nomor:</p>

          <p className="font-semibold text-slate-800 mt-1">{phone}</p>
        </div>

        <form onSubmit={handleVerify} className="mt-8">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-11 h-12 text-center text-xl font-bold border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            ))}
          </div>

          {error && <p className="text-sm text-red-600 text-center mt-4">{error}</p>}

          <button type="submit" disabled={loading} className="w-full mt-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50">
            {loading ? "Memverifikasi..." : "Verifikasi dan Kirim Laporan"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">Belum menerima kode?</p>
          <button type="button" onClick={handleResend} disabled={resending} className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-1 disabled:opacity-50">
            {resending ? "Mengirim ulang..." : "Kirim ulang kode OTP"}
          </button>
        </div>
      </div>
    </main>
  );
}
