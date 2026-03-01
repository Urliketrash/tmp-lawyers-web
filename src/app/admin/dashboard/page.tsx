"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminNewsList from "@/components/admin/AdminNewsList";
import { lawyersData } from "@/data/lawyersData";

export default function DashboardPage() {
  const [totalArticles, setTotalArticles] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string>("-");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
       try {
         // Get Total Articles & Latest Update
         const q = query(collection(db, "news"), orderBy("date", "desc"), limit(1));
         const snapshot = await getDocs(collection(db, "news"));
         const latestSnapshot = await getDocs(q);
         
         setTotalArticles(snapshot.size);

         if (!latestSnapshot.empty) {
            const latestDoc = latestSnapshot.docs[0].data();
            // Format date if possible, assuming date is a string or timestamp
            setLastUpdated(latestDoc.date || "Unknown");
         }

       } catch (error) {
         console.error("Error fetching stats:", error);
       }
    };
    fetchStats();
  }, []);

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
            <Link href="#" className="block text-gray-500 hover:text-white px-4 py-3 rounded text-sm font-bold transition-colors opacity-50 cursor-not-allowed">
                <i className="fas fa-users mr-3"></i> Team Profiles (Soon)
            </Link>
            <Link href="#" className="block text-gray-500 hover:text-white px-4 py-3 rounded text-sm font-bold transition-colors opacity-50 cursor-not-allowed">
                <i className="fas fa-cog mr-3"></i> Settings (Soon)
            </Link>
         </nav>

         <Link href="/" className="text-gray-500 hover:text-white text-xs uppercase tracking-widest mt-auto md:mt-0">
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
         </Link>
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
                <p className="text-3xl text-white font-serif italic">{lawyersData.length}</p>
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
