import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Halaman login staf (satpam & admin), lihat F-01/F-02. Kode MFA selalu
// ditampilkan sebagai field opsional -- backend tidak pernah membedakan
// pesan gagal antara "akun bukan admin" dan "kode MFA salah", jadi UI ini
// juga tidak boleh membedakannya.
export default function StaffLogin({ onLoginSuccess, onNavigate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, mfa_code: mfaCode }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Login gagal. Periksa username dan password.");
      }

      onLoginSuccess(result);
    } catch (err) {
      setError(err.message || "Login gagal. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-surface-container-lowest rounded-xl shadow-sm p-8 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1 mb-2">
          <h1 className="text-xl font-semibold text-on-surface">Login Staf</h1>
          <p className="text-sm text-on-surface-variant">Lost &amp; Found UII — Portal Satpam / Admin</p>
        </div>

        {error && (
          <div role="alert" className="px-3 py-2 rounded-lg bg-error-container text-on-error-container text-sm">
            {error}
          </div>
        )}

        <label className="flex flex-col gap-1 text-sm text-on-surface">
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoComplete="username"
            autoFocus
            className="h-11 px-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-on-surface">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={12}
            autoComplete="current-password"
            className="h-11 px-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-on-surface">
          Kode MFA (khusus admin)
          <input
            type="text"
            value={mfaCode}
            onChange={(event) => setMfaCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="6 digit, kosongkan jika bukan admin"
            inputMode="numeric"
            autoComplete="one-time-code"
            className="h-11 px-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="h-11 rounded-full bg-primary text-on-primary font-semibold disabled:opacity-60 transition-all"
        >
          {submitting ? "Memproses..." : "Masuk"}
        </button>

        <button
          type="button"
          onClick={() => onNavigate("landing")}
          className="text-sm text-on-surface-variant hover:text-on-surface underline"
        >
          Kembali ke Portal Publik
        </button>
      </form>
    </div>
  );
}
