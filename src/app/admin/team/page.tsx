"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminTeamList from "@/components/admin/AdminTeamList";

/**
 * Halaman Manajemen Tim Pengacara (Admin)
 * Route: /admin/team
 * Menampilkan statistik total anggota tim dan tabel daftar pengacara dari database Supabase.
 */
export default function TeamManagementPage() {
  const [totalMembers, setTotalMembers] = useState(0); // State untuk menyimpan total jumlah pengacara
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk mengontrol buka/tutup sidebar pada mobile
  const router = useRouter(); // Hook Next.js untuk navigasi antar-halaman

  // Mengambil data statistik (total anggota) saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Mengambil jumlah baris (count) tabel 'lawyers' dari database Supabase
        const { count, error } = await supabase
          .from("lawyers")
          .select("*", { count: "exact", head: true });
        
        if (error) throw error;
        setTotalMembers(count ?? 0); // Memasukkan hasil count ke state
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  // Fungsi untuk menangani proses Logout akun admin
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut(); // Menghapus session login aktif di Supabase
      if (error) throw error;
      router.push("/admin/login"); // Arahkan kembali ke halaman login setelah logout sukses
    } catch (err) {
      console.error("Error signing out:", err);
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex relative">
      {/* HEADER KHUSUS MOBILE (Hanya muncul di layar kecil) */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-tmp-black border-b border-white/10 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
                <Image src="/assets/logo.png" alt="TMP" fill className="object-contain" />
            </div>
            <span className="text-tmp-gold font-bold">ADMIN</span>
        </div>
        {/* Tombol hamburger untuk membuka sidebar mobile */}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-tmp-gold text-xl">
            <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* SIDEBAR PANEL (Bisa digeser masuk/keluar di layar mobile, selalu muncul di desktop) */}
      <aside className={`fixed md:sticky top-0 left-0 h-full w-64 bg-tmp-black border-r border-white/10 p-6 flex flex-col z-40 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} pt-24 md:pt-6`}>
         {/* Logo dan Judul Sidebar (Hanya muncul di desktop) */}
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
            <p className="text-[10px] text-tmp-gold/80 italic mt-3 max-w-[200px] leading-relaxed">
              &ldquo;Halo admin ganteng, semangat menjalani hidup ya! :)&rdquo;
            </p>
         </div>
         
          <nav className="space-y-2 flex-1">
            {/* Navigasi ke Halaman Manajemen Berita */}
            <Link href="/admin/dashboard" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
              <i className="fas fa-newspaper mr-3"></i> News & Articles
            </Link>
            {/* Navigasi ke Halaman Manajemen Tim Pengacara (Aktif) */}
            <Link href="/admin/team" className="block text-white bg-white/5 px-4 py-3 rounded text-sm font-bold border-l-2 border-tmp-gold">
              <i className="fas fa-users mr-3"></i> Team Profiles
            </Link>
            <Link href="/admin/content" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
              <i className="fas fa-edit mr-3"></i> Kelola Konten (CMS)
            </Link>
            <Link href="/admin/analytics" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
              <i className="fas fa-chart-line mr-3"></i> Visitor Analytics
            </Link>
            <Link href="/admin/settings" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
              <i className="fas fa-cog mr-3"></i> Settings
            </Link>
          </nav>

         {/* Tombol Logout di bagian paling bawah sidebar */}
         <button 
            onClick={handleLogout} 
            className="text-gray-400 hover:text-white hover:bg-red-900/50 hover:border-red-500 border border-white/10 px-4 py-3 rounded text-xs uppercase tracking-widest mt-auto md:mt-0 font-bold flex items-center justify-center transition-all duration-300 w-full cursor-pointer text-left"
         >
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
         </button>
      </aside>

      {/* KONTEN UTAMA HALAMAN */}
      <main className="flex-1 p-8 pt-24 md:pt-8 w-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h2 className="text-2xl font-serif italic text-white">Team Management</h2>
                <p className="text-gray-400 text-sm mt-1">Manage lawyer profiles and team members.</p>
            </div>
            {/* Tombol Navigasi ke halaman form tambah pengacara baru */}
            <Link href="/admin/team/create" className="bg-tmp-gold text-black px-6 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                + Add Member
            </Link>
        </header>

        {/* WIDGET KARTU STATISTIK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-tmp-black border border-white/10 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Total Members</h3>
                    <i className="fas fa-users text-blue-500 opacity-50"></i>
                </div>
                <p className="text-3xl text-white font-serif italic">{totalMembers}</p>
                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/2 opacity-50"></div>
                </div>
            </div>
        </div>

        {/* TABEL DAFTAR PENGACARA */}
        <AdminTeamList />
      </main>
    </div>
  );
}
