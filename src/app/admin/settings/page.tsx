"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // Settings states
  const [whatsapp, setWhatsapp] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [address, setAddress] = useState("");
  const [mapsEmbed, setMapsEmbed] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("site_settings").select("*");

        if (error) throw error;

        if (data) {
          data.forEach((item) => {
            if (item.key === "whatsapp") setWhatsapp(item.value);
            if (item.key === "email_to") setEmailTo(item.value);
            if (item.key === "linkedin") setLinkedin(item.value);
            if (item.key === "instagram") setInstagram(item.value);
            if (item.key === "address") setAddress(item.value);
            if (item.key === "maps_embed") setMapsEmbed(item.value);
          });
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const updates = [
        { key: "whatsapp", value: whatsapp.trim() },
        { key: "email_to", value: emailTo.trim() },
        { key: "linkedin", value: linkedin.trim() },
        { key: "instagram", value: instagram.trim() },
        { key: "address", value: address.trim() },
        { key: "maps_embed", value: mapsEmbed.trim() },
      ];

      const { error } = await supabase.from("site_settings").upsert(updates);

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Pengaturan berhasil disimpan! Informasi kontak di landing page utama langsung diperbarui.",
      });
    } catch (err: any) {
      console.error("Error saving settings:", err);
      setMessage({
        type: "error",
        text: err.message || "Gagal menyimpan pengaturan. Coba periksa koneksi Anda.",
      });
    } finally {
      setSaving(false);
    }
  };

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
            <Image 
              src="/assets/logo.png" 
              alt="TMP Logo" 
              fill 
              className="object-contain" 
              priority
            />
          </div>
          <h1 className="text-tmp-gold font-bold text-xl mb-1">TMP ADMIN</h1>
          <p className="text-gray-500 text-xs tracking-widest">CONTENT MANAGER</p>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link href="/admin/dashboard" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
            <i className="fas fa-newspaper mr-3"></i> News & Articles
          </Link>
          <Link href="/admin/team" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
            <i className="fas fa-users mr-3"></i> Team Profiles
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
          className="text-gray-400 hover:text-white hover:bg-red-900/50 hover:border-red-500 border border-white/10 px-4 py-3 rounded text-xs uppercase tracking-widest mt-auto md:mt-0 font-bold flex items-center justify-center transition-all duration-300 w-full cursor-pointer text-left"
        >
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 pt-24 md:pt-8 w-full max-w-4xl">
        <header className="mb-8">
          <h2 className="text-2xl font-serif italic text-white">General Settings</h2>
          <p className="text-gray-400 text-sm mt-1">Manage contact information and social media links.</p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-xs tracking-widest">LOADING SETTINGS...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6 bg-tmp-black border border-white/10 p-6 md:p-8 rounded-lg">
            {message.text && (
              <div
                className={`p-4 rounded text-xs font-bold ${
                  message.type === "success"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WhatsApp */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                  placeholder="e.g. 0812-1005-4874"
                  required
                />
              </div>

              {/* Email Destination */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Inquiry Target Email
                </label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                  placeholder="e.g. tmp@tmplawyers.com"
                  required
                />
              </div>

              {/* LinkedIn */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  LinkedIn Page Link
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                  placeholder="e.g. https://www.linkedin.com/company/..."
                  required
                />
              </div>

              {/* Instagram */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Instagram Username
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                  placeholder="e.g. @tmplawfirm"
                  required
                />
              </div>

              {/* Office Address */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Office Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none resize-none"
                  placeholder="e.g. Jalan Kemang Selatan No. 98..."
                  required
                />
              </div>

              {/* Google Maps Embed Iframe URL */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Google Maps Iframe Source (embed src)
                </label>
                <input
                  type="text"
                  value={mapsEmbed}
                  onChange={(e) => setMapsEmbed(e.target.value)}
                  className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                  placeholder="e.g. https://www.google.com/maps/embed?pb=..."
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-tmp-gold text-black font-extrabold uppercase tracking-widest text-xs px-8 py-3 rounded hover:bg-white transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
