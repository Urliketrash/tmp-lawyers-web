"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // Authentication & System states
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newsCount, setNewsCount] = useState(0);
  const [lawyersCount, setLawyersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Email update state
  const [newEmail, setNewEmail] = useState("");
  const [emailCurrentPassword, setEmailCurrentPassword] = useState("");
  const [showEmailCurrentPassword, setShowEmailCurrentPassword] = useState(false);
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailMessage, setEmailMessage] = useState({ type: "", text: "" });

  // Password update state
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });

  // SEO & Maintenance settings states
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [seoSaving, setSeoSaving] = useState(false);
  const [seoMessage, setSeoMessage] = useState({ type: "", text: "" });

  // Analytics Bypass State
  const [ignoreAnalytics, setIgnoreAnalytics] = useState(false);

  // System utility states
  const [testingEmail, setTestingEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState({ type: "", text: "" });
  const [exportingBackup, setExportingBackup] = useState(false);
  const [exportResult, setExportResult] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Get current logged in user details
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser(user);
        } else {
          router.push("/admin/login");
          return;
        }

        // 2. Fetch database row counts
        const [newsCountRes, lawyersCountRes] = await Promise.all([
          supabase.from("news").select("*", { count: "exact", head: true }),
          supabase.from("lawyers").select("*", { count: "exact", head: true })
        ]);
        setNewsCount(newsCountRes.count || 0);
        setLawyersCount(lawyersCountRes.count || 0);

        // 3. Fetch Site Settings (SEO & Maintenance)
        const { data: settingsData } = await supabase.from("site_settings").select("*");
        if (settingsData) {
          settingsData.forEach((item) => {
            if (item.key === "site_title") setSiteTitle(item.value || "");
            if (item.key === "site_description") setSiteDescription(item.value || "");
            if (item.key === "maintenance_mode") setMaintenanceMode(item.value === "true");
          });
        }

        // 4. Load local analytics ignore status
        if (typeof window !== "undefined" && window.localStorage) {
          setIgnoreAnalytics(window.localStorage.getItem("tmp_ignore_analytics") === "true");
        }

      } catch (err) {
        console.error("Error fetching settings page data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Handle Ignore Analytics toggle change
  const handleIgnoreAnalyticsChange = (checked: boolean) => {
    setIgnoreAnalytics(checked);
    if (typeof window !== "undefined" && window.localStorage) {
      if (checked) {
        window.localStorage.setItem("tmp_ignore_analytics", "true");
      } else {
        window.localStorage.removeItem("tmp_ignore_analytics");
      }
    }
  };

  // Re-authenticate user to verify their current password
  const verifyCurrentPassword = async (password: string) => {
    if (!currentUser?.email) return false;
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: currentUser.email,
        password: password
      });
      return !error;
    } catch (e) {
      return false;
    }
  };

  // Handle saving new email
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSaving(true);
    setEmailMessage({ type: "", text: "" });

    try {
      if (!newEmail.trim() || !emailCurrentPassword) {
        throw new Error("Harap isi email baru dan konfirmasi password saat ini.");
      }

      // 1. Verify current password
      const isPasswordCorrect = await verifyCurrentPassword(emailCurrentPassword);
      if (!isPasswordCorrect) {
        throw new Error("Password saat ini salah.");
      }

      // 2. Call Supabase Auth update
      const { error } = await supabase.auth.updateUser({
        email: newEmail.trim()
      });

      if (error) throw error;

      setEmailMessage({
        type: "success",
        text: "Konfirmasi dikirim! Silakan periksa tautan konfirmasi di email lama ANDA dan email baru Anda untuk merampungkan penggantian.",
      });
      setNewEmail("");
      setEmailCurrentPassword("");
    } catch (err: any) {
      setEmailMessage({
        type: "error",
        text: err.message || "Gagal mengubah email. Coba lagi.",
      });
    } finally {
      setEmailSaving(false);
    }
  };

  // Handle saving new password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordMessage({ type: "", text: "" });

    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("Harap lengkapi semua kolom password.");
      }

      if (newPassword.length < 6) {
        throw new Error("Password baru minimal 6 karakter.");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Konfirmasi password baru tidak cocok.");
      }

      // 1. Verify current password
      const isPasswordCorrect = await verifyCurrentPassword(currentPassword);
      if (!isPasswordCorrect) {
        throw new Error("Password saat ini salah.");
      }

      // 2. Call Supabase Auth update
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setPasswordMessage({
        type: "success",
        text: "Password berhasil diperbarui! Silakan gunakan password baru ini pada login berikutnya.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordMessage({
        type: "error",
        text: err.message || "Gagal memperbarui password. Coba lagi.",
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  // Handle saving SEO and Site settings
  const handleSaveSEOAndSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSeoSaving(true);
    setSeoMessage({ type: "", text: "" });

    try {
      const updates = [
        { key: "site_title", value: siteTitle.trim() },
        { key: "site_description", value: siteDescription.trim() },
        { key: "maintenance_mode", value: maintenanceMode ? "true" : "false" },
      ];

      const { error } = await supabase.from("site_settings").upsert(updates);
      if (error) throw error;

      setSeoMessage({
        type: "success",
        text: "Pengaturan SEO & Mode Pemeliharaan berhasil disimpan dan langsung diterapkan!",
      });
    } catch (err: any) {
      setSeoMessage({
        type: "error",
        text: err.message || "Gagal menyimpan pengaturan situs.",
      });
    } finally {
      setSeoSaving(false);
    }
  };

  // Run email server connection test
  const handleTestEmail = async () => {
    setTestingEmail(true);
    setTestEmailResult({ type: "", text: "" });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) throw new Error("Gagal mengautentikasi sesi admin.");

      const res = await fetch("/api/contact/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim email tes.");

      setTestEmailResult({
        type: "success",
        text: `Email tes berhasil dikirim! Silakan periksa kotak masuk email target Anda.`
      });
    } catch (err: any) {
      setTestEmailResult({
        type: "error",
        text: err.message || "Gagal mengirim email tes."
      });
    } finally {
      setTestingEmail(false);
    }
  };

  // Export database backup
  const handleExportBackup = async () => {
    setExportingBackup(true);
    setExportResult({ type: "", text: "" });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) throw new Error("Gagal mengautentikasi sesi admin.");

      const res = await fetch("/api/backup", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Gagal mengekspor data cadangan.");
      }

      // Download the response file
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tmp_lawyers_backup_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setExportResult({
        type: "success",
        text: "Data cadangan berhasil diekspor dan diunduh!"
      });
    } catch (err: any) {
      setExportResult({
        type: "error",
        text: err.message || "Gagal mengekspor backup."
      });
    } finally {
      setExportingBackup(false);
    }
  };

  // Perform logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/admin/login");
    } catch (err) {
      console.error("Error signing out:", err);
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex relative">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-tmp-black border-b border-white/10 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image src="/assets/logo.png" alt="TMP" fill className="object-contain" />
          </div>
          <span className="text-tmp-gold font-bold">ADMIN</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-tmp-gold text-xl">
          <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-full w-64 bg-tmp-black border-r border-white/10 p-6 flex flex-col z-40 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} pt-24 md:pt-6`}>
        <div className="mb-12 flex-col items-center text-center hidden md:flex">
          <div className="relative w-20 h-20 mb-4">
            <Image src="/assets/logo.png" alt="TMP Logo" fill className="object-contain" priority />
          </div>
          <h1 className="text-tmp-gold font-bold text-xl mb-1">TMP ADMIN</h1>
          <p className="text-gray-500 text-xs tracking-widest">CONTENT MANAGER</p>
          <p className="text-[10px] text-tmp-gold/80 italic mt-3 max-w-[200px] leading-relaxed">
            "Halo admin ganteng, semangat menjalani hidup ya! :)"
          </p>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link href="/admin/dashboard" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
            <i className="fas fa-newspaper mr-3"></i> News & Articles
          </Link>
          <Link href="/admin/team" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
            <i className="fas fa-users mr-3"></i> Team Profiles
          </Link>
          <Link href="/admin/content" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
            <i className="fas fa-edit mr-3"></i> Kelola Konten (CMS)
          </Link>
          <Link href="/admin/analytics" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
            <i className="fas fa-chart-line mr-3"></i> Visitor Analytics
          </Link>
          <Link href="/admin/settings" className="block text-white bg-white/5 px-4 py-3 rounded text-sm font-bold border-l-2 border-tmp-gold">
            <i className="fas fa-cog mr-3"></i> Settings
          </Link>
        </nav>

        <button 
          onClick={handleLogout} 
          className="text-gray-400 hover:text-white hover:bg-red-900/50 hover:border-red-500 border border-white/10 px-4 py-3 rounded text-xs uppercase tracking-widest mt-auto md:mt-0 font-bold flex items-center justify-center transition-all duration-300 w-full cursor-pointer"
        >
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 pt-24 md:pt-8 w-full max-w-6xl">
        <header className="mb-8">
          <h2 className="text-2xl font-serif italic text-white">General Settings & System</h2>
          <p className="text-gray-400 text-sm mt-1">Mengelola keamanan akun, mode pemeliharaan website, SEO, dan utilitas sistem.</p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-xs tracking-widest">MEMUAT PENGATURAN...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* LEFT COLUMN: SECURITY & CREDENTIALS */}
            <div className="space-y-8">
              
              {/* CARD: GANTI EMAIL */}
              <form onSubmit={handleUpdateEmail} className="bg-tmp-black border border-white/10 p-6 rounded-lg space-y-4">
                <h3 className="text-tmp-gold text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">Ganti Email (Username)</h3>
                
                {emailMessage.text && (
                  <div className={`p-3 rounded text-xs font-bold ${emailMessage.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {emailMessage.text}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Baru</label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full bg-black border border-white/10 p-2.5 rounded text-sm focus:border-tmp-gold outline-none"
                      placeholder="Masukkan alamat email baru..."
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Verifikasi Password Saat Ini</label>
                    <div className="relative">
                      <input
                        type={showEmailCurrentPassword ? "text" : "password"}
                        value={emailCurrentPassword}
                        onChange={(e) => setEmailCurrentPassword(e.target.value)}
                        className="w-full bg-black border border-white/10 p-2.5 pr-10 rounded text-sm focus:border-tmp-gold outline-none"
                        placeholder="Masukkan password Anda saat ini..."
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowEmailCurrentPassword(!showEmailCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        <i className={`fas ${showEmailCurrentPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={emailSaving}
                    className="bg-tmp-gold text-black font-extrabold uppercase tracking-widest text-[10px] px-6 py-2.5 rounded hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {emailSaving ? "Memproses..." : "Perbarui Email"}
                  </button>
                </div>
              </form>

              {/* CARD: GANTI PASSWORD */}
              <form onSubmit={handleUpdatePassword} className="bg-tmp-black border border-white/10 p-6 rounded-lg space-y-4">
                <h3 className="text-tmp-gold text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">Ganti Password Admin</h3>

                {passwordMessage.text && (
                  <div className={`p-3 rounded text-xs font-bold ${passwordMessage.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {passwordMessage.text}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Password Saat Ini</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-black border border-white/10 p-2.5 pr-10 rounded text-sm focus:border-tmp-gold outline-none"
                        placeholder="Masukkan password saat ini..."
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        <i className={`fas ${showCurrentPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Password Baru</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-black border border-white/10 p-2.5 pr-10 rounded text-sm focus:border-tmp-gold outline-none"
                        placeholder="Minimal 6 karakter..."
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        <i className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Konfirmasi Password Baru</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-black border border-white/10 p-2.5 pr-10 rounded text-sm focus:border-tmp-gold outline-none"
                        placeholder="Ketik ulang password baru..."
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={passwordSaving}
                    className="bg-tmp-gold text-black font-extrabold uppercase tracking-widest text-[10px] px-6 py-2.5 rounded hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {passwordSaving ? "Memproses..." : "Perbarui Password"}
                  </button>
                </div>
              </form>

            </div>

            {/* RIGHT COLUMN: SYSTEM WIDGETS & UTILITIES */}
            <div className="space-y-8">
              
              {/* CARD: STATUS SISTEM */}
              <div className="bg-tmp-black border border-white/10 p-6 rounded-lg space-y-4">
                <h3 className="text-tmp-gold text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">Status Sistem & Analitik</h3>
                
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-400">Koneksi Supabase</span>
                    <span className="text-green-400 font-bold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse inline-block"></span> Online (Terhubung)
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-white/5">
                    <span className="text-gray-400">Email Akun Aktif</span>
                    <span className="text-white font-bold">{currentUser?.email}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-white/5">
                    <span className="text-gray-400">Login Terakhir</span>
                    <span className="text-white font-mono">{currentUser?.last_sign_in_at ? new Date(currentUser.last_sign_in_at).toLocaleString("id-ID") : "-"}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-white/5">
                    <span className="text-gray-400">Statistik Database</span>
                    <span className="text-tmp-gold font-bold">
                      {newsCount} Berita / {lawyersCount} Advokat
                    </span>
                  </div>

                  {/* Toggle Ignore Analytics */}
                  <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                    <input
                      id="ignore-analytics"
                      type="checkbox"
                      checked={ignoreAnalytics}
                      onChange={(e) => handleIgnoreAnalyticsChange(e.target.checked)}
                      className="mt-1 accent-tmp-gold w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <label htmlFor="ignore-analytics" className="text-white font-bold cursor-pointer">
                        Abaikan Kunjungan Saya (Ignore Analytics)
                      </label>
                      <p className="text-[10px] text-gray-500 leading-normal">
                        Bila dicentang, aktivitas kunjungan Anda pada halaman website publik tidak akan dicatat dalam analitik pengunjung.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD: MODE PEMELIHARAAN & SEO */}
              <form onSubmit={handleSaveSEOAndSite} className="bg-tmp-black border border-white/10 p-6 rounded-lg space-y-4">
                <h3 className="text-tmp-gold text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">SEO Global & Situs</h3>

                {seoMessage.text && (
                  <div className={`p-3 rounded text-xs font-bold ${seoMessage.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {seoMessage.text}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Maintenance Mode Toggle */}
                  <div className="flex items-center justify-between bg-black/40 p-3 border border-white/5 rounded">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white block">Mode Pemeliharaan (Maintenance)</span>
                      <span className="text-[10px] text-gray-500">Tampilkan halaman pemeliharaan di situs publik</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMaintenanceMode(!maintenanceMode)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${maintenanceMode ? "bg-tmp-gold" : "bg-gray-800"}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${maintenanceMode ? "translate-x-5" : "translate-x-0"}`}></span>
                    </button>
                  </div>

                  {/* Site Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Judul Situs (SEO Site Title)</label>
                    <input
                      type="text"
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                      className="w-full bg-black border border-white/10 p-2.5 rounded text-sm focus:border-tmp-gold outline-none"
                      placeholder="Masukkan Judul Website..."
                      required
                    />
                  </div>

                  {/* Site Description */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Deskripsi Situs (SEO Meta Description)</label>
                    <textarea
                      value={siteDescription}
                      onChange={(e) => setSiteDescription(e.target.value)}
                      rows={3}
                      className="w-full bg-black border border-white/10 p-2.5 rounded text-sm focus:border-tmp-gold outline-none resize-none"
                      placeholder="Masukkan deskripsi SEO situs..."
                      required
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={seoSaving}
                    className="bg-tmp-gold text-black font-extrabold uppercase tracking-widest text-[10px] px-6 py-2.5 rounded hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {seoSaving ? "Menyimpan..." : "Simpan SEO & Situs"}
                  </button>
                </div>
              </form>

              {/* CARD: PERKAKAS SISTEM */}
              <div className="bg-tmp-black border border-white/10 p-6 rounded-lg space-y-4">
                <h3 className="text-tmp-gold text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-2">Perkakas & Utilitas</h3>

                <div className="space-y-4 text-xs">
                  {/* Email Connection Test */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">Integrasi Server Email (Resend)</span>
                      <button
                        type="button"
                        onClick={handleTestEmail}
                        disabled={testingEmail}
                        className="bg-white/5 hover:bg-white/10 border border-white/15 text-tmp-gold hover:text-white px-4 py-1.5 rounded font-bold uppercase tracking-wider text-[9px] transition-all cursor-pointer"
                      >
                        {testingEmail ? "Menguji..." : "Kirim Email Tes"}
                      </button>
                    </div>
                    {testEmailResult.text && (
                      <p className={`p-2 rounded text-[10px] ${testEmailResult.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/15" : "bg-red-500/10 text-red-400 border border-red-500/15"}`}>
                        {testEmailResult.text}
                      </p>
                    )}
                  </div>

                  {/* Database JSON Backup */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">Cadangan Basis Data (Backup JSON)</span>
                        <span className="text-[10px] text-gray-500 mt-0.5 block">Ekspor berita, advokat, & pengaturan situs</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleExportBackup}
                        disabled={exportingBackup}
                        className="bg-tmp-gold hover:bg-white text-black px-4 py-1.5 rounded font-extrabold uppercase tracking-wider text-[9px] transition-all cursor-pointer"
                      >
                        {exportingBackup ? "Mengekspor..." : "Ekspor Backup"}
                      </button>
                    </div>
                    {exportResult.text && (
                      <p className={`p-2 rounded text-[10px] ${exportResult.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/15" : "bg-red-500/10 text-red-400 border border-red-500/15"}`}>
                        {exportResult.text}
                      </p>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}
      </main>
    </div>
  );
}
