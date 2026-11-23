import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function LoginSatpam({ onNavigate, onLoginSuccess }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPos, setSelectedPos] = useState("Pos Induk GKU (Sardjito)");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const username = usernameInput.trim();
    if (!username) {
      setErrorMessage("Silakan masukkan username Petugas Satpam.");
      return;
    }
    if (!password) {
      setErrorMessage("Silakan masukkan kata sandi dinas Anda.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(
          response.status === 401
            ? "Username atau password salah."
            : result.error || `Login gagal (HTTP ${response.status}).`
        );
        return;
      }

      const staff = result.staff;
      if (
        !staff ||
        !Number.isSafeInteger(Number(staff.staff_id)) ||
        staff.role !== "satpam" ||
        !staff.username ||
        !staff.name
      ) {
        throw new Error("Respons login tidak berisi akun Satpam yang valid.");
      }

      const sessionData = {
        staff_id: Number(staff.staff_id),
        username: staff.username,
        name: staff.name,
        role: staff.role,
        pos: selectedPos,
        loginAt: new Date().toISOString(),
        rememberMe,
      };

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(sessionData);
      } else {
        const storage = rememberMe ? localStorage : sessionStorage;
        const otherStorage = rememberMe ? sessionStorage : localStorage;
        otherStorage.removeItem("satpam_session");
        storage.setItem("satpam_session", JSON.stringify(sessionData));
        if (onNavigate) onNavigate("satpam_dashboard");
      }
    } catch (error) {
      console.error("Gagal memproses login Satpam:", error);
      setErrorMessage(
        error instanceof TypeError
          ? "Server login tidak dapat dihubungi."
          : "Login gagal diproses. Silakan coba kembali."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans text-slate-900">
      
      {/* 1. Header Resmi Portal Lost & Found UII */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Identitas Kampus */}
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
                Kampus Terpadu &bull; Portal Keamanan Satpam
              </span>
            </div>
          </div>

          {/* Tombol Aksi Navigasi ke Publik */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("landing")}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 hover:border-slate-400 shadow-sm transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-slate-500">arrow_back</span>
            <span>Kembali ke Portal Publik</span>
          </button>
        </div>
      </header>

      {/* 2. Main Container: Form Login Terpusat Sesuai Desain Aplikasi */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-md">
          
          {/* Card Login Terpadu (Light Theme) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-9 transition-all">
            
            {/* Header Card */}
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 border border-blue-100 text-uiiNavy flex items-center justify-center shadow-sm mb-3">
                <span className="material-symbols-outlined text-[30px]">local_police</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Unit Keamanan Terpadu UII</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Masuk Terminal Satpam
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                Silakan masukkan kredensial dinas yang diterbitkan oleh Badan Sistem Informasi (BSI).
              </p>
            </div>

            {/* Alert Error (Jika Ada) */}
            {errorMessage && (
              <div className="mt-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
                <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0 mt-0.5">
                  error
                </span>
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              
              {/* Field 1: NRP / Username */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="guardUsername">
                  Username Petugas Satpam <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                    badge
                  </span>
                  <input
                    id="guardUsername"
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Masukkan username Satpam"
                    maxLength={64}
                    className="w-full bg-slate-50 text-slate-900 font-medium rounded-xl pl-10 pr-4 py-3 border border-slate-200 focus:bg-white focus:border-uiiNavy focus:ring-1 focus:ring-uiiNavy text-sm transition outline-none"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Kata Sandi Dinas */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="guardPassword">
                    Kata Sandi Dinas <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer select-none"
                  >
                    {showPassword ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                    lock
                  </span>
                  <input
                    id="guardPassword"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    maxLength={72}
                    className="w-full bg-slate-50 text-slate-900 font-medium rounded-xl pl-10 pr-10 py-3 border border-slate-200 focus:bg-white focus:border-uiiNavy focus:ring-1 focus:ring-uiiNavy text-sm transition outline-none"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    title={showPassword ? "Sembunyikan password" : "Lihat password"}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Field 3: Posko Jaga Aktif */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="guardPos">
                  Posko Jaga Bertugas <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                    domain
                  </span>
                  <select
                    id="guardPos"
                    value={selectedPos}
                    onChange={(e) => setSelectedPos(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 font-medium rounded-xl pl-10 pr-8 py-3 border border-slate-200 focus:bg-white focus:border-uiiNavy focus:ring-1 focus:ring-uiiNavy text-sm transition outline-none appearance-none cursor-pointer"
                  >
                    <option value="Pos Induk GKU (Sardjito)">Pos Induk GKU (Gedung Sardjito)</option>
                    <option value="Pos Gerbang Utama (Jl. Kaliurang)">Pos Gerbang Utama (Jl. Kaliurang KM 14.5)</option>
                    <option value="Pos Masjid Ulil Albab">Pos Masjid Ulil Albab</option>
                    <option value="Pos Perpustakaan Pusat">Pos Perpustakaan Pusat UII</option>
                    <option value="Pos Parkir Barat / GOR">Pos Parkir Barat / GOR Ki Bagus</option>
                    <option value="Pos Fakultas Teknik Sipil">Pos Fakultas Teknik Sipil (FTSP)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Checkbox Ingat Sesi */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-uiiNavy focus:ring-uiiNavy border-slate-300 cursor-pointer accent-blue-900"
                  />
                  <span className="text-xs font-medium text-slate-600">
                    Ingat sesi terminal pos jaga ini
                  </span>
                </label>
              </div>

              {/* Tombol Submit Masuk */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-uiiNavy hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Memverifikasi Kredensial...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">login</span>
                      <span>Masuk ke Dashboard Satpam</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Bantuan Kredensial & Helpdesk */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-slate-400">help</span>
                <span>Lupa kata sandi?</span>
              </span>
              <a
                href="https://wa.me/628112555844"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
              >
                Hubungi Admin BSI (ext. 102)
              </a>
            </div>

          </div>

          {/* Catatan Kepatuhan di Bawah Form */}
          <div className="text-center mt-5 text-xs text-slate-500 space-y-1">
            <p>Sistem Informasi Inventarisasi Barang Temuan &amp; Kehilangan UII</p>
            <p className="text-[11px] text-slate-400">
              Hak akses diaudit dan tercatat dalam Berita Acara Digital Satpam.
            </p>
          </div>

        </div>
      </main>

      {/* 3. Footer Sesuai Gaya Aplikasi */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-uiiNavy">verified</span>
            <span>&copy; 2026 Universitas Islam Indonesia &bull; Unit Keamanan Terpadu &amp; BSI.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Standar Operasional Prosedur Keamanan Kampus</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
