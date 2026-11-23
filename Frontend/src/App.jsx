import React, { useState } from "react";

// =========================================================================
// 1. PORTAL PUBLIK
// =========================================================================
import LandingPage from "./pages/LandingPage";
import DaftarTemuanEnhanced from "./pages/DaftarTemuanEnhanced";
import DetailTemuan from "./pages/DetailTemuan";
import LaporKehilanganStep1 from "./pages/LaporKehilanganStep1";
import LaporKehilanganStep2OTP from "./pages/LaporKehilanganStep2OTP";
import LaporKehilanganStep3 from "./pages/LaporKehilanganStep3";
import LaporKehilanganSukses from "./pages/LaporKehilanganSukses";
import PilihanPenyerahanTemuan from "./pages/PilihanPenyerahanTemuan";
import LaporTemuanStep1 from "./pages/LaporTemuanStep1";
import LaporTemuanStep2OTP from "./pages/LaporTemuanStep2OTP";
import LaporTemuanStep3 from "./pages/LaporTemuanStep3";
import LaporTemuanSukses from "./pages/LaporTemuanSukses";
import CaraKerja from "./pages/CaraKerja";
import FAQ from "./pages/FAQ";
import KebijakanPrivasi from "./pages/KebijakanPrivasi";

// =========================================================================
// 2. PORTAL SATPAM
// =========================================================================
import DashboardSatpam from "./pages/satpam/DashboardSatpam";
import AntreanPenerimaan from "./pages/satpam/AntreanPenerimaan";
import PenerimaanBarang from "./pages/satpam/PenerimaanBarang";
import DaftarInventaris from "./pages/satpam/DaftarInventaris";
import DetailFisikInventaris from "./pages/satpam/DetailFisikInventaris";
import HasilMatchingAlgoritma from "./pages/satpam/HasilMatchingAlgoritma";
import VerifikasiLangkah1 from "./pages/satpam/VerifikasiLangkah1";
import VerifikasiLangkah3 from "./pages/satpam/VerifikasiLangkah3";
import KoreksiDataInventaris from "./pages/satpam/KoreksiDataInventaris";
import DaftarLaporanKehilangan from "./pages/satpam/DaftarLaporanKehilangan";

// =========================================================================
// 3. PORTAL ADMINISTRATOR BSI
// =========================================================================
import BerandaAdmin from "./pages/admin/BerandaAdmin";
import PenandaAnomali from "./pages/admin/PenandaAnomali";
import DetailInsiden from "./pages/admin/DetailInsiden";
import AuditLog from "./pages/admin/AuditLog";
import ManajemenSatpam from "./pages/admin/ManajemenSatpam";
import BarangDitahan from "./pages/admin/BarangDitahan";
import KonfigurasiSentinel from "./pages/admin/KonfigurasiSentinel";

const screens = {
  landing: LandingPage,
  temuan_enhanced: DaftarTemuanEnhanced,
  detail: DetailTemuan,

  lapor_1: LaporKehilanganStep1,
  lapor_2_otp: LaporKehilanganStep2OTP,
  lapor_3: LaporKehilanganStep3,
  lapor_sukses: LaporKehilanganSukses,

  pilihan_penyerahan: PilihanPenyerahanTemuan,
  lapor_temuan_1: LaporTemuanStep1,
  lapor_temuan_2_otp: LaporTemuanStep2OTP,
  lapor_temuan_3: LaporTemuanStep3,
  lapor_temuan_sukses: LaporTemuanSukses,

  cara_kerja: CaraKerja,
  faq: FAQ,
  cara_kerja_faq: CaraKerja,
  kebijakan_privasi: KebijakanPrivasi,

  satpam_dashboard: DashboardSatpam,
  satpam_antrean: AntreanPenerimaan,
  satpam_penerimaan: PenerimaanBarang,
  satpam_inventaris: DaftarInventaris,
  satpam_detail_inventaris: DetailFisikInventaris,
  satpam_matching: HasilMatchingAlgoritma,
  satpam_verifikasi_1: VerifikasiLangkah1,
  satpam_verifikasi_3: VerifikasiLangkah3,
  satpam_koreksi: KoreksiDataInventaris,
  satpam_kehilangan: DaftarLaporanKehilangan,

  admin_dashboard: BerandaAdmin,
  admin_anomali: PenandaAnomali,
  admin_detail_insiden: DetailInsiden,
  admin_audit: AuditLog,
  admin_satpam: ManajemenSatpam,
  admin_barang_ditahan: BarangDitahan,
  admin_parameter: KonfigurasiSentinel,
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState("landing");

  // State bersama untuk alur laporan kehilangan
  const [lostReportDraft, setLostReportDraft] = useState(null);
  const [otpPhone, setOtpPhone] = useState("");
  const [lostVerificationToken, setLostVerificationToken] = useState("");
  const [lostReportResult, setLostReportResult] = useState(null);
  const [selectedFoundReport, setSelectedFoundReport] = useState(null);

  const CurrentScreenComponent = screens[activeScreen] || LandingPage;

  const isSatpamPortal = activeScreen.startsWith("satpam_");
  const isAdminPortal = activeScreen.startsWith("admin_");
  const isPublicPortal = !isSatpamPortal && !isAdminPortal;

  const handleNavigate = (target) => {
    const destination =
      target === "satpam_penerimaan" && !selectedFoundReport ? "satpam_antrean" : target;
    if (screens[destination]) {
      if (destination === "satpam_antrean") setSelectedFoundReport(null);
      setActiveScreen(destination);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Memulai laporan kehilangan baru
  const resetLostReport = () => {
    setLostReportDraft(null);
    setOtpPhone("");
    setLostVerificationToken("");
    setLostReportResult(null);
  };

  const getPortalLabel = () => {
    if (isAdminPortal) return "Portal Admin BSI";
    if (isSatpamPortal) return "Portal Satpam";
    return "Portal Publik";
  };

  // Props khusus untuk setiap langkah laporan kehilangan
  const screenProps = {
    onNavigate: handleNavigate,
  };

  if (activeScreen === "satpam_antrean") {
    screenProps.onSelectFoundReport = (report) => {
      setSelectedFoundReport(report);
      setActiveScreen("satpam_penerimaan");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  if (activeScreen === "satpam_penerimaan") {
    screenProps.foundReport = selectedFoundReport;
  }

  if (activeScreen === "lapor_1") {
    Object.assign(screenProps, {
      onSaveDraft: setLostReportDraft,
      onSetOtpPhone: setOtpPhone,
    });
  }

  if (activeScreen === "lapor_2_otp") {
    Object.assign(screenProps, {
      formData: lostReportDraft,
      otpPhone,
      onVerificationSuccess: setLostVerificationToken,
    });
  }

  if (activeScreen === "lapor_3") {
    Object.assign(screenProps, {
      formData: lostReportDraft,
      verificationToken: lostVerificationToken,
      onReportSuccess: setLostReportResult,
    });
  }

  if (activeScreen === "lapor_sukses") {
    Object.assign(screenProps, {
      reportResult: lostReportResult,
      formData: lostReportDraft,
      onNewReport: resetLostReport,
    });
  }

  return (
    <div className="relative min-h-screen">
      <CurrentScreenComponent {...screenProps} />

      {/* Floating 3-Way Portal Switcher */}
      <aside aria-label="Portal Switcher" className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/95 text-white shadow-2xl backdrop-blur-md border border-slate-700/80 text-xs font-semibold">
          <div className="flex items-center gap-1.5 pl-3 pr-2 border-r border-slate-700/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 hidden md:inline">Mode:</span>
            <strong className="text-white font-medium">{getPortalLabel()}</strong>
          </div>

          <div className="flex items-center gap-1">
            {!isPublicPortal && (
              <button
                onClick={() => handleNavigate("landing")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm cursor-pointer"
                title="Buka Portal Publik Mahasiswa/Sivitas"
              >
                <span className="material-symbols-outlined text-[15px]">public</span>
                <span className="hidden sm:inline">Publik</span>
              </button>
            )}

            {!isSatpamPortal && (
              <button
                onClick={() => handleNavigate("satpam_dashboard")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white transition-all shadow-sm cursor-pointer"
                title="Buka Portal Satpam Kampus UII"
              >
                <span className="material-symbols-outlined text-[15px]">local_police</span>
                <span className="hidden sm:inline">Satpam</span>
              </button>
            )}

            {!isAdminPortal && (
              <button
                onClick={() => handleNavigate("admin_dashboard")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm cursor-pointer"
                title="Buka Portal Administrator BSI UII"
              >
                <span className="material-symbols-outlined text-[15px]">admin_panel_settings</span>
                <span className="hidden sm:inline">Admin BSI</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
