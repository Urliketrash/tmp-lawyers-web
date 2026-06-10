"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminNewsList from "@/components/admin/AdminNewsList";

export default function DashboardPage() {
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string>("-");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
       try {
         // Get Total Articles & Latest Update
         const { count, error: countErr } = await supabase
           .from("news")
           .select("*", { count: "exact", head: true });
         
         if (countErr) throw countErr;
         setTotalArticles(count ?? 0);

         const { data: latestData, error: latestErr } = await supabase
           .from("news")
           .select("date")
           .order("date", { ascending: false })
           .limit(1);

         if (latestErr) throw latestErr;

         if (latestData && latestData.length > 0) {
            setLastUpdated(latestData[0].date || "Unknown");
         }

         // Get Team Members count
         const { count: teamCount, error: teamErr } = await supabase
           .from("lawyers")
           .select("*", { count: "exact", head: true });
         
         if (teamErr) throw teamErr;
         setTotalMembers(teamCount ?? 0);

       } catch (error) {
         console.error("Error fetching stats:", error);
       }
    };
    fetchStats();
  }, []);

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

      {/* Sidebar (Desktop & Mobile) */}
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
            <Link href="/admin/dashboard" className="block text-white bg-white/5 px-4 py-3 rounded text-sm font-bold border-l-2 border-tmp-gold">
                <i className="fas fa-newspaper mr-3"></i> News & Articles
            </Link>
            <Link href="/admin/team" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
                <i className="fas fa-users mr-3"></i> Team Profiles
            </Link>
            <Link href="#" className="block text-gray-500 hover:text-white px-4 py-3 rounded text-sm font-bold transition-colors opacity-50 cursor-not-allowed">
                <i className="fas fa-cog mr-3"></i> Settings (Soon)
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
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h2 className="text-2xl font-serif italic text-white">News Management</h2>
                <p className="text-gray-400 text-sm mt-1">Manage articles, updates, and publications.</p>
            </div>
            <Link href="/admin/news/create" className="bg-tmp-gold text-black px-6 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                + Create New
            </Link>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-tmp-black border border-white/10 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Total Articles</h3>
                    <i className="fas fa-newspaper text-tmp-gold opacity-50"></i>
                </div>
                <p className="text-3xl text-white font-serif italic">{totalArticles}</p>
                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-tmp-gold w-3/4 opacity-50"></div>
                </div>
            </div>
            
            <div className="bg-tmp-black border border-white/10 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Latest Publication</h3>
                    <i className="fas fa-calendar-check text-green-500 opacity-50"></i>
                </div>
                <p className="text-xl text-white font-serif italic">{lastUpdated}</p>
                 <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full opacity-50"></div>
                </div>
            </div>

            <div className="bg-tmp-black border border-white/10 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Team Members</h3>
                     <i className="fas fa-users text-blue-500 opacity-50"></i>
                </div>
                <p className="text-3xl text-white font-serif italic">{totalMembers}</p>
                 <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/2 opacity-50"></div>
                </div>
            </div>
        </div>

        {/* List */}
        <AdminNewsList />
      </main>
    </div>
  );
}
