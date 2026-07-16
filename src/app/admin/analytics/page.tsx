"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import VisitorAnalytics from "@/components/admin/VisitorAnalytics";

export default function AnalyticsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

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
          <Link href="/admin/analytics" className="block text-white bg-white/5 px-4 py-3 rounded text-sm font-bold border-l-2 border-tmp-gold">
            <i className="fas fa-chart-line mr-3"></i> Visitor Analytics
          </Link>
          <Link href="/admin/settings" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
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
      <main className="flex-1 p-8 pt-24 md:pt-8 w-full">
        <VisitorAnalytics />
      </main>
    </div>
  );
}
