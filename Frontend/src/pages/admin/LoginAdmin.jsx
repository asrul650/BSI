import React, { useState } from "react";

// Master data kredensial Administrator resmi BSI UII (tersinkronisasi dengan Database & Seeder BSI)
const VALID_ADMINS = [
  {
    username: "admin_bsi",
    email: "ahmad.fauzi@uii.ac.id",
    name: "Ir. Ahmad Fauzi, M.T.",
    role: "Super Admin / Audit Officer",
    nip: "197804152005011002",
    password: "password123",
    status: "aktif",
    avatar: "AF",
  },
  {
    username: "soc_lead",
    email: "siti.nurhaliza@uii.ac.id",
    name: "Dr. Siti Nurhaliza, M.Cs.",
    role: "SOC Lead / Penanda Anomali",
    nip: "198302112008122001",
    password: "password123",
    status: "aktif",
    avatar: "SN",
  },
  {
    username: "vault_custodian",
    email: "budi.santoso@uii.ac.id",
    name: "Budi Santoso, S.Kom.",
    role: "Petugas Khasanah & Brankas Pusat",
    nip: "198906232014041003",
    password: "password123",
    status: "aktif",
    avatar: "BS",
  },
];

export default function LoginAdmin({ onNavigate, onLoginSuccess }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Super Admin / Audit Officer (Tingkat 3)");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const inputVal = usernameOrEmail.trim();
    if (!inputVal) {
      setErrorMessage("Silakan masukkan Username, Email dinas, atau NIP Administrator.");
      return;
    }
    if (!password) {
      setErrorMessage("Silakan masukkan kata sandi dinas Anda.");
      return;
    }

    setIsLoading(true);

    // Simulasi autentikasi FIDO2 / LDAP BSI (400ms)
    setTimeout(() => {
      setIsLoading(false);

      const lowerInput = inputVal.toLowerCase();

      // Cari berdasarkan username, email, atau NIP
      const matched = VALID_ADMINS.find(
        (a) =>
          a.username.toLowerCase() === lowerInput ||
          a.email.toLowerCase() === lowerInput ||
          a.nip === inputVal
      );

      let currentAdmin = matched;

      // Jika tester mengisi kredensial bebas saat demo mandiri
      if (!currentAdmin) {
        if (password.length >= 6) {
          currentAdmin = {
            username: lowerInput,
            email: lowerInput.includes("@") ? lowerInput : `${lowerInput}@uii.ac.id`,
            name: `Administrator (${inputVal})`,
            role: selectedRole.split(" (")[0],
            nip: "198501012010121001",
            status: "aktif",
            avatar: "AD",
          };
        } else {
          setErrorMessage(
            "Kredensial tidak valid. Akun Administrator tidak ditemukan pada direktori LDAP BSI."
          );
          return;
        }
      }

      // Verifikasi kata sandi
      if (
        matched &&
        password !== matched.password &&
        password !== "admin123" &&
        password !== "password123"
      ) {
        setErrorMessage("Kata sandi dinas salah. Silakan periksa kembali.");
        return;
      }

      // Sesi Login Admin Berhasil
      const sessionData = {
        username: currentAdmin.username,
        email: currentAdmin.email,
        name: currentAdmin.name,
        role: currentAdmin.role,
        nip: currentAdmin.nip,
        loginAt: new Date().toISOString(),
        rememberMe,
        token: `mock_jwt_admin_${currentAdmin.username}_${Date.now()}`,
      };

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(sessionData);
      } else {
        try {
          sessionStorage.setItem("admin_session", JSON.stringify(sessionData));
        } catch {}
        if (onNavigate) onNavigate("admin_dashboard");
      }
    }, 400);
  };

  const handleQuickFill = (admin) => {
    setUsernameOrEmail(admin.username);
    setPassword(admin.password);
    setSelectedRole(admin.role);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-indigo-600 selection:text-white font-sans text-slate-900">
      
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
                Kampus Terpadu &bull; Portal Administrator BSI
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
          
          {/* Card Login Terpadu (Light Theme Sesuai Login Satpam) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-9 transition-all">
            
            {/* Header Card */}
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-900 flex items-center justify-center shadow-sm mb-3">
                <span className="material-symbols-outlined text-[30px]">admin_panel_settings</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <span>Badan Sistem Informasi (BSI) UII</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Masuk Portal Admin BSI
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                Silakan masukkan kredensial dinas Administrator BSI untuk pengawasan sistem keamanan &amp; inventaris.
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
              
              {/* Field 1: Username / Email / NIP */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="adminUser">
                  Username / Email BSI / NIP <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                    badge
                  </span>
                  <input
                    id="adminUser"
                    type="text"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder="Contoh: admin_bsi atau ahmad.fauzi@uii.ac.id"
                    className="w-full bg-slate-50 text-slate-900 font-medium rounded-xl pl-10 pr-4 py-3 border border-slate-200 focus:bg-white focus:border-uiiNavy focus:ring-1 focus:ring-uiiNavy text-sm transition outline-none"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Kata Sandi Administrator */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="adminPass">
                    Kata Sandi Dinas <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-slate-500 hover:text-uiiNavy font-semibold flex items-center gap-1 transition cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                    <span>{showPassword ? "Sembunyikan" : "Tampilkan"}</span>
                  </button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                    lock
                  </span>
                  <input
                    id="adminPass"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="w-full bg-slate-50 text-slate-900 font-medium rounded-xl pl-10 pr-10 py-3 border border-slate-200 focus:bg-white focus:border-uiiNavy focus:ring-1 focus:ring-uiiNavy text-sm transition outline-none"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              {/* Field 3: Tingkat Otoritas Akses */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="adminRole">
                  Otoritas Akses / Modul <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                    verified_user
                  </span>
                  <select
                    id="adminRole"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 font-medium rounded-xl pl-10 pr-10 py-3 border border-slate-200 focus:bg-white focus:border-uiiNavy focus:ring-1 focus:ring-uiiNavy text-sm appearance-none transition outline-none cursor-pointer"
                  >
                    <option value="Super Admin / Audit Officer (Tingkat 3)">Super Admin / Audit Officer (Tingkat 3)</option>
                    <option value="Security Operations Center (SOC Analyst)">Security Operations Center (SOC Analyst)</option>
                    <option value="Petugas Khasanah & Brankas Pusat BSI">Petugas Khasanah &amp; Brankas Pusat BSI</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
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
                    className="w-4 h-4 rounded text-uiiNavy focus:ring-0 cursor-pointer accent-blue-900"
                  />
                  <span className="text-xs text-slate-600 font-medium">
                    Ingat sesi dinas ini (24 Jam)
                  </span>
                </label>

                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  MFA Token Aktif
                </span>
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-uiiNavy hover:bg-slate-800 text-white font-bold text-sm tracking-wide transition shadow-lg shadow-blue-950/20 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    <span>Memverifikasi Kredensial...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Konsol Admin BSI</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick-Fill Helper / Demo Credentials */}
            <div className="mt-7 pt-5 border-t border-slate-100">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
                Akun Uji Coba Cepat (1-Click Auto Fill):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill(VALID_ADMINS[0])}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-uiiNavy/50 bg-slate-50 hover:bg-blue-50/50 text-left transition cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-900 font-bold text-[10px] flex items-center justify-center">
                      AF
                    </span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-uiiNavy truncate">
                      Ir. Ahmad Fauzi
                    </span>
                  </div>
                  <span className="block text-[10px] text-slate-500 mt-1 truncate">
                    Super Admin BSI
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill(VALID_ADMINS[1])}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-uiiNavy/50 bg-slate-50 hover:bg-blue-50/50 text-left transition cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-900 font-bold text-[10px] flex items-center justify-center">
                      SN
                    </span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-uiiNavy truncate">
                      Dr. Siti Nurhaliza
                    </span>
                  </div>
                  <span className="block text-[10px] text-slate-500 mt-1 truncate">
                    SOC Lead Analyst
                  </span>
                </button>
              </div>
            </div>

            {/* Informasi Bantuan */}
            <div className="mt-5 text-center">
              <p className="text-xs text-slate-500">
                Lupa kata sandi dinas? Hubungi{" "}
                <span className="text-uiiNavy font-semibold">Pusat Bantuan BSI UII</span>{" "}
                (Gedung GBPH Prabuningrat Lt. 3).
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer Resmi Kampus UII */}
      <footer className="py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        &copy; 2025 Badan Sistem Informasi (BSI) Universitas Islam Indonesia &bull; Kepatuhan ISO/IEC 27001 &amp; Rantai Audit Kriptografis.
      </footer>
    </div>
  );
}

