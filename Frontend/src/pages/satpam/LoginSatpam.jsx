import React, { useState } from "react";

// Daftar akun Satpam resmi yang terdaftar di BSI UII (sesuai Portal Admin BSI & Seeder DB)
const MOCK_GUARDS = [
  {
    nrp: "SEC-042",
    username: "satpam_pos1",
    name: "Bripka Hendra Kurniawan",
    jabatan: "Komandan Regu (Danru)",
    pos: "Pos Induk GKU (Sardjito)",
    posId: "pos-gku",
    status: "aktif",
    password: "password123",
    avatar: "HK",
  },
  {
    nrp: "SEC-019",
    username: "satpam_pos2",
    name: "Aipda Agus Susanto",
    jabatan: "Petugas Jaga Siaga",
    pos: "Pos Gerbang Utama (Jl. Kaliurang)",
    posId: "pos-gerbang",
    status: "aktif",
    password: "password123",
    avatar: "AS",
  },
  {
    nrp: "SEC-008",
    username: "satpam_pos3",
    name: "Sertu Bambang Supriyadi",
    jabatan: "Petugas Verifikasi Lapangan",
    pos: "Pos Masjid Ulil Albab",
    posId: "pos-masjid",
    status: "aktif",
    password: "password123",
    avatar: "BS",
  },
  {
    nrp: "SEC-035",
    username: "satpam_joko",
    name: "Bripka Joko Wahyono",
    jabatan: "Dalam Penyelidikan",
    pos: "Pos Perpustakaan Pusat",
    posId: "pos-perpus",
    status: "ditangguhkan",
    password: "password123",
    avatar: "JW",
    incidentNote: "Kasus INS-2024-0091: Indikasi Bypass Data Rahasia (Dibekukan oleh BSI)",
  },
];

export default function LoginSatpam({ onNavigate, onLoginSuccess }) {
  const [nrpOrUsername, setNrpOrUsername] = useState("SEC-042");
  const [password, setPassword] = useState("password123");
  const [selectedPos, setSelectedPos] = useState("Pos Induk GKU (Sardjito)");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi isi otomatis akun contoh (1-Click Fill untuk pengujian & SA)
  const handleSelectMockGuard = (guard) => {
    setNrpOrUsername(guard.nrp);
    setPassword(guard.password);
    setSelectedPos(guard.pos);
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const inputNrp = nrpOrUsername.trim().toUpperCase();
    const inputUser = nrpOrUsername.trim().toLowerCase();

    if (!inputNrp) {
      setErrorMessage("Silakan masukkan NRP atau Username Satpam Anda.");
      return;
    }
    if (!password) {
      setErrorMessage("Silakan masukkan kata sandi dinas Anda.");
      return;
    }

    setIsLoading(true);

    // Simulasi respons autentikasi backend
    setTimeout(() => {
      setIsLoading(false);

      const matched = MOCK_GUARDS.find(
        (g) =>
          g.nrp.toUpperCase() === inputNrp ||
          g.username.toLowerCase() === inputUser
      );

      if (!matched) {
        setErrorMessage(
          "Kredensial tidak valid. NRP/Username atau kata sandi tidak ditemukan pada direktori LDAP BSI."
        );
        return;
      }

      // Simulasi penolakan akun ditangguhkan (Rule Anomali Integritas)
      if (matched.status === "ditangguhkan") {
        setErrorMessage(
          `AKSES DITOLAK: Akun ${matched.name} (${matched.nrp}) saat ini DITANGGUHKAN oleh Admin BSI. Catatan: ${matched.incidentNote}`
        );
        return;
      }

      // Cek password sederhana (mock)
      if (password !== matched.password && password !== "satpam123") {
        setErrorMessage("Kata sandi salah. Silakan periksa kembali atau hubungi Admin BSI.");
        return;
      }

      // Login Sukses
      const sessionData = {
        nrp: matched.nrp,
        username: matched.username,
        name: matched.name,
        jabatan: matched.jabatan,
        pos: selectedPos || matched.pos,
        loginAt: new Date().toISOString(),
        token: `mock_jwt_satpam_${matched.nrp}_${Date.now()}`,
      };

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(sessionData);
      } else {
        localStorage.setItem("satpam_session", JSON.stringify(sessionData));
        if (onNavigate) onNavigate("satpam_dashboard");
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Bar Akses Cepat */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <span className="material-symbols-outlined text-[24px]">local_police</span>
          </div>
          <div>
            <span className="block text-base sm:text-lg font-bold text-white tracking-tight leading-none">
              Portal Keamanan Satpam
            </span>
            <span className="block text-xs font-medium text-slate-400 mt-0.5">
              Sistem Lost &amp; Found Kampus Terpadu UII
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigate && onNavigate("landing")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/70 text-xs font-semibold transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Ke Portal Publik</span>
        </button>
      </header>

      {/* Konten Utama: 2 Kolom (Kiri: Form Login, Kanan: Info & Mock Kredensial untuk SA/Backend) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Kolom Kiri: Form Login Satpam (5 Kolom) */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto bg-slate-900/90 rounded-2xl border border-slate-800/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-2.5 pb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold uppercase tracking-wider">
                Autentikasi Petugas
              </span>
              <span className="text-xs text-slate-400">Shift Siaga 24 Jam</span>
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
              Masuk Terminal Satpam
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-6">
              Kredensial resmi satpam diterbitkan langsung oleh <strong>Admin BSI UII</strong>. Gunakan NRP dinas Anda.
            </p>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
                <span className="material-symbols-outlined text-[20px] text-red-400 shrink-0 mt-0.5">
                  warning
                </span>
                <div className="flex-1 leading-snug">{errorMessage}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field NRP / Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  NRP / ID Petugas Satpam <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    badge
                  </span>
                  <input
                    type="text"
                    value={nrpOrUsername}
                    onChange={(e) => setNrpOrUsername(e.target.value)}
                    placeholder="Contoh: SEC-042 atau satpam_pos1"
                    className="w-full bg-slate-950/70 text-white rounded-xl pl-10 pr-4 py-2.5 border border-slate-700/80 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm font-mono transition"
                    required
                  />
                </div>
              </div>

              {/* Field Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Kata Sandi Dinas <span className="text-amber-400">*</span></span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-amber-400 hover:underline font-normal cursor-pointer"
                  >
                    {showPassword ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    lock
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="w-full bg-slate-950/70 text-white rounded-xl pl-10 pr-10 py-2.5 border border-slate-700/80 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Field Pos Jaga Bertugas */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Posko Jaga / Lokasi Dinas Aktif <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    domain
                  </span>
                  <select
                    value={selectedPos}
                    onChange={(e) => setSelectedPos(e.target.value)}
                    className="w-full bg-slate-950/70 text-white rounded-xl pl-10 pr-8 py-2.5 border border-slate-700/80 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm appearance-none cursor-pointer"
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
                <p className="text-[11px] text-slate-400 mt-1">
                  Menentukan identitas pos saat mencetak bukti label barang &amp; BAST.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                      <span>Memverifikasi Kredensial LDAP BSI...</span>
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

            <div className="mt-5 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
              Lupa kata sandi dinas? Hubungi <strong className="text-slate-300">Admin BSI (ext. 102)</strong> untuk reset kredensial.
            </div>
          </div>

          {/* Kolom Kanan: Rujukan Mock Akun untuk SA & Backend Developer (7 Kolom) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Header Rujukan SA & Backend */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">dataset</span>
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      Rujukan Mock Akun Satpam (Untuk System Analyst &amp; Backend)
                    </h2>
                    <p className="text-xs text-slate-400">
                      Sesuai data master <code className="text-amber-300">staff</code> di database PostgreSQL &amp; Portal Admin BSI
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  Tersinkronisasi
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                Setiap akun satpam memiliki <strong>NRP unik</strong> yang dicatat di tabel <code className="text-amber-300 font-mono">staff</code> (role: <code className="text-amber-300 font-mono">satpam</code>). Klik kartu di bawah untuk <strong>1-Click Pengisian Otomatis</strong>:
              </p>

              {/* Grid 4 Kartu Satpam Mock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {MOCK_GUARDS.map((guard) => {
                  const isSuspended = guard.status === "ditangguhkan";
                  const isSelected = nrpOrUsername === guard.nrp;

                  return (
                    <div
                      key={guard.nrp}
                      onClick={() => handleSelectMockGuard(guard)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500/80 ring-1 ring-amber-500/50"
                          : isSuspended
                          ? "bg-red-950/20 border-red-500/30 hover:bg-red-950/30"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                              isSuspended
                                ? "bg-red-900/50 text-red-300"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {guard.avatar}
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-white truncate max-w-[150px]">
                              {guard.name}
                            </span>
                            <span className="block text-[11px] font-mono text-amber-400 font-semibold">
                              {guard.nrp} • {guard.username}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isSuspended
                              ? "bg-red-500/20 text-red-300 border border-red-500/40"
                              : "bg-emerald-500/20 text-emerald-300"
                          }`}
                        >
                          {isSuspended ? "Dibekukan" : "Aktif"}
                        </span>
                      </div>

                      <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1 truncate">
                        <span className="material-symbols-outlined text-[13px] text-slate-500">place</span>
                        <span>{guard.pos}</span>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono">PW: {guard.password}</span>
                        <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                          <span>Pakai Akun</span>
                          <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Catatan Arsitektur untuk Backend API & DB */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">terminal</span>
                <span>Spesifikasi Endpoint API untuk Tim Backend:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>
                  <strong className="text-slate-200">POST /v1/auth/login</strong>: Menerima <code className="text-amber-300 font-mono">&#123; username: "SEC-042", password: "...", pos_id: 1 &#125;</code>.
                </li>
                <li>
                  <strong className="text-slate-200">Session Cookie &amp; CSRF</strong>: Backend mengembalikan cookie <code className="text-amber-300 font-mono">lf_session</code> (HttpOnly) dan header <code className="text-amber-300 font-mono">X-CSRF-Token</code>.
                </li>
                <li>
                  <strong className="text-slate-200">Integritas Audit</strong>: Setiap satpam yang login wajib mencatat <code className="text-amber-300 font-mono">staff_id</code> ke dalam <code className="text-amber-300 font-mono">audit_log</code> saat memverifikasi atau menyerahkan barang (BAST).
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Hak Cipta */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-slate-500 border-t border-slate-800/60">
        &copy; 2026 Badan Sistem Informasi (BSI) &bull; Unit Keamanan Terpadu Universitas Islam Indonesia.
      </footer>
    </div>
  );
}
