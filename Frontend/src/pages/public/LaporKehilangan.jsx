import React, { useState, useEffect } from "react";
import LaporKehilanganStep3 from "./LaporKehilanganStep3";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Lock, Smartphone, Timer, AlertCircle } from "lucide-react";
const API_BASE_URL = "http://localhost:8080";

export default function LaporKehilangan({ setActivePage, onNewReport }) {
  const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Success
  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    color: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    time: "12:00",
    description: "",
    reporterName: "",
    whatsapp: "",
    consent: false,
  });

  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(180);
  useEffect(() => {
    if (step !== 2 || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);
  const [ticketId, setTicketId] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formOptions, setFormOptions] = useState({
    categories: [],
    colors: [],
    locations: [],
  });

  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/public/meta/form-options`);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Gagal mengambil pilihan formulir");
        }

        setFormOptions({
          categories: result.categories || [],
          colors: result.colors || [],
          locations: result.locations || [],
        });
      } catch (error) {
        console.error("Gagal mengambil form options:", error);
        alert(error.message);
      }
    };

    fetchFormOptions();
  }, []);

  const handleNextToOTP = async (e) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("Mohon setujui penggunaan data sebelum melanjutkan.");
      return;
    }

    if (!formData.category || !formData.itemName || !formData.color || !formData.location || !formData.description || !formData.reporterName || !formData.whatsapp) {
      alert("Mohon lengkapi seluruh field wajib (*)");
      return;
    }

    if (formData.description.length < 10) {
      alert("Deskripsi ciri-ciri khusus minimal 10 karakter!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/v1/public/otp/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.whatsapp,
          purpose: "lost_report",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengirim OTP");
      }

      setOtpInput("");
      setOtpError("");
      setTimer(180);
      setStep(2);

      alert("Kode OTP berhasil dikirim ke WhatsApp kamu.");
    } catch (error) {
      console.error("Gagal mengirim OTP:", error);
      alert(error.message || "Tidak dapat terhubung ke server.");
    }
  };

  const handleVerifyOTP = async () => {
    if (timer <= 0) {
      setOtpError("Kode OTP telah kedaluwarsa. Silakan minta kode baru.");
      return;
    }

    if (otpInput.length !== 6) {
      setOtpError("Kode OTP harus terdiri dari 6 digit angka");
      return;
    }

    setIsSubmitting(true);
    setOtpError("");

    try {
      // 1. Verifikasi OTP
      const verifyResponse = await fetch(`${API_BASE_URL}/v1/public/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.whatsapp,
          purpose: "lost_report",
          code: otpInput,
        }),
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyResult.error || "Verifikasi OTP gagal");
      }

      const token = verifyResult.verification_token;

      if (!token) {
        throw new Error("Token verifikasi tidak diterima dari server");
      }

      // 2. Simpan token dan data laporan sementara
      const lostAt = new Date(`${formData.date}T${formData.time}:00+07:00`).toISOString();

      const draft = {
        category: formData.category,
        item_name: formData.itemName,
        color: formData.color,
        location: formData.location,
        lost_date: formData.date,
        lost_time: formData.time,
        lost_at: lostAt,
        description: formData.description,
        reporter_name: formData.reporterName,
        reporter_whatsapp: formData.whatsapp,
        consent: formData.consent,
      };

      sessionStorage.setItem("lostReportDraft", JSON.stringify(draft));
      sessionStorage.setItem("lostVerificationToken", token);
      sessionStorage.setItem("lostReportPhone", formData.whatsapp);

      setVerificationToken(token);

      // 3. Pindah ke halaman review (Step 3)
      setStep(3);
    } catch (error) {
      console.error("Verifikasi OTP gagal:", error);
      setOtpError(error.message || "Terjadi kesalahan pada server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
      {/* Stepper Header */}
      <div className="mb-8 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm font-semibold">
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 ${step >= 1 ? "text-blue-700" : "text-slate-400"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>1</span>
            <span>Detail Barang</span>
          </div>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 ${step >= 2 ? "text-blue-700" : "text-slate-400"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>2</span>
            <span>Verifikasi OTP</span>
          </div>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 ${step === 3 ? "text-emerald-700" : "text-slate-400"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>3</span>
            <span>Tiket Selesai</span>
          </div>
        </div>
      </div>

      {/* STEP 1: FORM */}
      {step === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">Tanpa Perlu Login</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">Formulir Laporan Kehilangan Barang</h1>
            <p className="text-sm text-slate-600 mt-1">Data ini akan dicocokkan otomatis dengan barang temuan fisik yang dikelola oleh Satpam UII.</p>
          </div>

          <form onSubmit={handleNextToOTP} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Kategori Barang *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>
                    Pilih Kategori Barang
                  </option>
                  {formOptions.categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nama Barang *</label>
                <input
                  type="text"
                  required
                  placeholder="Cth: Dompet Kulit Braun Buffel"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Warna Dominan *</label>
                <select
                  required
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Pilih Warna</option>

                  {formOptions.colors.map((color) => (
                    <option key={color.code} value={color.label}>
                      {color.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Perkiraan Lokasi Kehilangan *</label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Pilih Lokasi Kehilangan</option>

                  {formOptions.locations.map((location) => (
                    <option key={location.location_id} value={location.location_id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tanggal Kehilangan *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Perkiraan Waktu (WIB) *</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ciri-Ciri Khusus / Tanda Rahasia * (Min. 10 Karakter)</label>
                  <span className="text-[11px] text-slate-400">{formData.description.length}/500</span>
                </div>
                <textarea
                  required
                  rows="3"
                  maxLength="500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Sebutkan detail yang hanya Anda ketahui (contoh: stiker kecil di sudut, isi gantungan kunci, kartu nama di slot terdalam, atau goresan halus)..."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-blue-700">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Deskripsi rahasia ini <strong>tidak ditampilkan ke publik</strong> untuk mencegah klaim palsu.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nama Lengkap Pemilik *</label>
                <input
                  type="text"
                  required
                  placeholder="Sesuai KTM / KTP Anda"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nomor WhatsApp Aktif *</label>
                <input
                  type="tel"
                  required
                  placeholder="Cth: 081234567890"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" id="consent" checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer" />

              <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                Saya menyetujui penggunaan data pribadi dan informasi barang yang saya berikan untuk keperluan pengelolaan laporan kehilangan dan pencocokan barang oleh sistem Lost & Found UII.
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button type="button" onClick={() => setActivePage("home")} className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 cursor-pointer">
                Batal
              </button>
              <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-uiiNavy text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition shadow-xs cursor-pointer">
                <span>Lanjut: Kirim OTP WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 2: VERIFIKASI OTP */}
      {step === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs max-w-lg mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Verifikasi Nomor WhatsApp</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Kode verifikasi OTP 6-digit telah dikirimkan ke nomor WhatsApp: <strong className="text-slate-800">{formData.whatsapp}</strong>
          </p>

          <div className="mt-8">
            <input
              type="text"
              maxLength="6"
              autoFocus
              value={otpInput}
              onChange={(e) => {
                setOtpInput(e.target.value.replace(/\D/g, ""));
                setOtpError("");
              }}
              placeholder="123456"
              className="text-center font-mono text-3xl font-extrabold tracking-widest px-4 py-3 bg-slate-50 rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:outline-none w-56 mx-auto block"
            />
            {otpError && <p className="text-xs text-rose-600 mt-2 font-medium">{otpError}</p>}

            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <Timer className="w-3.5 h-3.5" />
                Kode OTP berlaku selama 3 menit
              </p>

              <p className={`text-lg font-bold ${timer <= 30 ? "text-rose-600" : "text-blue-700"}`}>
                {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}
              </p>

              {timer === 0 && <p className="text-xs text-rose-600">Kode OTP telah kedaluwarsa. Silakan minta kode baru.</p>}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button onClick={handleVerifyOTP} className="w-full py-3.5 bg-uiiNavy text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-xs cursor-pointer">
              Verifikasi &amp; Simpan Laporan
            </button>
            <button onClick={() => setStep(1)} className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer">
              Ubah Nomor WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SUKSES */}
      {step === 3 && <LaporKehilanganStep3 onNavigate={(page) => setActivePage(page)} />}
    </div>
  );
}
