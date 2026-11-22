import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, ShieldAlert, MapPin, Building2, Smartphone } from "lucide-react";
import { posSatpamList } from "../../data/mockData";
const API_BASE_URL = "http://localhost:8080";

export default function LaporPenemuan({ setActivePage, onNewFoundItem }) {
  const [mode, setMode] = useState("online"); // 'online' or 'direct'
  const [step, setStep] = useState(1);
  const [ticketId, setTicketId] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(180);
  const [verificationToken, setVerificationToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formOptions, setFormOptions] = useState({
    categories: [],
    colors: [],
    locations: [],
  });

  useEffect(() => {
    if (step !== 2 || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  const [formData, setFormData] = useState({
    finderName: "",
    finderPhone: "",
    itemName: "",
    category: "",
    color: "",
    foundLocation: "",
    foundDate: new Date().toISOString().split("T")[0],
    foundTime: "12:00",
    description: "",
    targetPos: posSatpamList[0].name,
  });

  // Mengambil pilihan kategori, warna, dan lokasi dari backend
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

    if (!consent) {
      alert("Mohon setujui penggunaan data sebelum melanjutkan.");
      return;
    }

    if (!formData.finderName || !formData.finderPhone || !formData.itemName || !formData.category || !formData.color || !formData.foundLocation || !formData.description) {
      alert("Mohon lengkapi seluruh field wajib (*).");
      return;
    }

    if (formData.itemName.trim().length > 100) {
      alert("Nama barang maksimal 100 karakter.");
      return;
    }

    if (formData.finderName.trim().length < 3) {
      alert("Nama penemu minimal 3 karakter.");
      return;
    }

    if (formData.description.trim().length < 10 || formData.description.trim().length > 300) {
      alert("Deskripsi harus terdiri dari 10 sampai 300 karakter.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/v1/public/otp/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.finderPhone,
          purpose: "found_report",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengirim OTP.");
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
      setOtpError("Kode OTP harus terdiri dari 6 digit angka.");
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
          phone: formData.finderPhone,
          purpose: "found_report",
          code: otpInput,
        }),
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyResult.error || "Verifikasi OTP gagal.");
      }

      const token = verifyResult.verification_token;

      if (!token) {
        throw new Error("Token verifikasi tidak diterima dari server.");
      }

      setVerificationToken(token);

      // 2. Gabungkan tanggal dan waktu penemuan
      const foundAt = new Date(`${formData.foundDate}T${formData.foundTime}:00+07:00`).toISOString();

      // 3. Simpan laporan ke backend
      const reportResponse = await fetch(`${API_BASE_URL}/v1/public/found-reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: Number(formData.category),
          item_name: formData.itemName.trim(),
          color: formData.color,
          location_id: Number(formData.foundLocation),
          found_at: foundAt,
          description: formData.description.trim(),
          finder_name: formData.finderName.trim(),
          finder_whatsapp: formData.finderPhone,
          verification_token: token,
          consent: consent,
        }),
      });

      const reportResult = await reportResponse.json();

      if (!reportResponse.ok) {
        throw new Error(reportResult.error || "Gagal menyimpan laporan.");
      }

      // 4. Ambil ID tiket asli dari backend
      const realTicketId = reportResult.report?.report_id || reportResult.report?.found_report_id || reportResult.found_report_id || reportResult.report_id;

      if (!realTicketId) {
        throw new Error("Laporan mungkin sudah tersimpan, tetapi ID tiket tidak ditemukan dalam respons server.");
      }

      setTicketId(realTicketId);

      // 5. Perbarui data katalog jika callback tersedia
      if (onNewFoundItem) {
        onNewFoundItem({
          id: realTicketId,
          name: formData.itemName,
          category: formData.category,
          color: formData.color,
          description: formData.description,
          foundLocation: formData.foundLocation,
          foundDate: formData.foundDate,
          foundTime: formData.foundTime + " WIB",
          storageLocation: formData.targetPos,
          storageRack: "Menunggu Penyerahan",
          status: "Menunggu Penyerahan",
          finderName: formData.finderName,
          finderPhone: formData.finderPhone,
        });
      }

      setStep(3);
    } catch (error) {
      console.error("Proses laporan gagal:", error);
      setOtpError(error.message || "Terjadi kesalahan pada server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
      {/* Choice mode */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setMode("online")}
          className={`p-5 rounded-2xl border text-left transition cursor-pointer ${mode === "online" ? "bg-blue-50/80 border-blue-500 shadow-xs" : "bg-white border-slate-200 hover:border-slate-300"}`}
        >
          <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">Pilihan A (Direkomendasikan)</span>
          <h3 className="font-bold text-slate-900 text-base mt-1">Lapor Online Terlebih Dahulu</h3>
          <p className="text-xs text-slate-500 mt-1">Catat detail barang di web, dapatkan kode tiket TM, lalu serahkan fisik ke pos satpam terdekat.</p>
        </button>

        <button
          onClick={() => setMode("direct")}
          className={`p-5 rounded-2xl border text-left transition cursor-pointer ${mode === "direct" ? "bg-blue-50/80 border-blue-500 shadow-xs" : "bg-white border-slate-200 hover:border-slate-300"}`}
        >
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Pilihan B (Langsung Fisik)</span>
          <h3 className="font-bold text-slate-900 text-base mt-1">Langsung Datang ke Pos Satpam</h3>
          <p className="text-xs text-slate-500 mt-1">Tidak perlu isi form online. Serahkan barang langsung ke petugas satpam yang berjaga di pos kampus.</p>
        </button>
      </div>

      {mode === "direct" ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs text-center max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Penyerahan Fisik Langsung</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Terima kasih atas itikad baik Anda! Anda cukup membawa barang temuan tersebut ke Pos Satpam UII terdekat. Petugas Satpam akan melakukan pencatatan intake resmi di sistem.
          </p>

          <div className="mt-6 space-y-3 text-left">
            {posSatpamList.map((pos) => (
              <div key={pos.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{pos.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {pos.location} • {pos.operatingHours}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setActivePage("home")} className="mt-8 px-6 py-3 bg-uiiNavy text-white rounded-full text-xs font-semibold hover:bg-slate-800 transition">
            Kembali ke Beranda
          </button>
        </div>
      ) : step === 1 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">Lapor Temuan Online</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">Formulir Laporan Barang Ditemukan</h1>
            <p className="text-sm text-slate-600 mt-1">Setiap barang yang dilaporkan wajib diserahkan secara fisik ke pos satpam untuk disimpan dengan aman.</p>
          </div>

          <form onSubmit={handleNextToOTP} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nama Lengkap Penemu *</label>
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nomor WhatsApp Penemu *</label>
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Kategori Barang *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  {formOptions.categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nama Barang Temuan *</label>
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Lokasi Tempat Menemukan *</label>
                <select
                  required
                  value={formData.foundLocation}
                  onChange={(e) => setFormData({ ...formData, foundLocation: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Pilih Lokasi Penemuan</option>

                  {formOptions.locations.map((location) => (
                    <option key={location.location_id} value={location.location_id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tanggal Penemuan *</label>
                <input
                  type="date"
                  required
                  value={formData.foundDate}
                  onChange={(e) => setFormData({ ...formData, foundDate: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Waktu Penemuan *</label>
                <input
                  type="time"
                  required
                  value={formData.foundTime}
                  onChange={(e) => setFormData({ ...formData, foundTime: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Pos Satpam Tujuan Penyerahan *</label>
                <select
                  value={formData.targetPos}
                  onChange={(e) => setFormData({ ...formData, targetPos: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {posSatpamList.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Deskripsi Kondisi Fisik Barang *</label>
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

            <div className="flex items-start gap-3">
              <input type="checkbox" id="foundConsent" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer" />

              <label htmlFor="foundConsent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                Saya menyetujui penggunaan data pribadi dan informasi barang yang saya berikan untuk keperluan pengelolaan laporan penemuan dan pencocokan barang oleh sistem Lost &amp; Found UII.
              </label>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <strong>Ketentuan Penyerahan Fisik (BPMN 2):</strong> Setelah menekan tombol kirim di bawah, Anda akan menerima nomor tiket laporan. Harap serahkan barang fisik ke Pos Satpam pilihan Anda dalam waktu{" "}
                <strong>maksimal 24 jam</strong> agar laporan tidak kedaluwarsa.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button type="button" onClick={() => setActivePage("home")} className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800">
                Batal
              </button>
              <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-uiiNavy text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition shadow-xs cursor-pointer">
                <span>Lanjut: Kirim OTP WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : step === 2 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs max-w-lg mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">Verifikasi Nomor WhatsApp</h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Kode OTP 6 digit telah dikirim ke nomor WhatsApp:
            <strong className="text-slate-800"> {formData.finderPhone}</strong>
          </p>

          <div className="mt-8">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
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

            <div className="mt-4">
              <p className="text-xs text-slate-400">Kode OTP berlaku selama 3 menit</p>

              <p className={`text-lg font-bold ${timer <= 30 ? "text-rose-600" : "text-blue-700"}`}>
                {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}
              </p>

              {timer === 0 && <p className="text-xs text-rose-600">Kode OTP telah kedaluwarsa. Silakan kembali dan kirim kode baru.</p>}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={handleVerifyOTP}
              disabled={isSubmitting || timer <= 0}
              className="w-full py-3.5 bg-uiiNavy text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Memproses..." : "Verifikasi & Simpan Laporan"}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpInput("");
                setOtpError("");
                setStep(1);
              }}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Ubah Nomor WhatsApp
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">Status: Menunggu Penyerahan Fisik</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-3">Kode Tiket: {ticketId}</h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">Laporan barang temuan Anda telah tercatat. Silakan bawa barang fisik dan tunjukkan kode tiket ini ke petugas satpam di:</p>

          <div className="mt-5 p-4 bg-blue-50/80 rounded-2xl border border-blue-100 text-left text-xs text-blue-900 space-y-1">
            <strong>Tujuan Pos:</strong> {formData.targetPos}
            <br />
            <strong>Batas Waktu:</strong> 24 Jam sejak laporan ini dibuat
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setActivePage("katalog")} className="px-6 py-3 bg-uiiNavy text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-slate-800 transition">
              Kembali ke Katalog
            </button>
            <button onClick={() => setActivePage("home")} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-full text-xs sm:text-sm font-semibold hover:bg-slate-200 transition">
              Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
