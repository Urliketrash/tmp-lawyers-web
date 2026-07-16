"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { MOCK_NEWS, NewsItem } from "@/data/newsData";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";

export default function NewsPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS); // Default to mock for SSR/Initial
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const mappedNews: NewsItem[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          date: item.date,
          category: item.category,
          summary: item.summary,
          content: item.content,
          imageUrl: item.image_url || "",
          author: item.author
        }));
        setNews(mappedNews);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      // Keep MOCK_NEWS if error
    } finally {
        setLoading(false);
    }
  };

  return (
    <main className="bg-tmp-black min-h-screen text-white pt-32">
      {/* Navbar is in layout.tsx, but checks path. verify if this needs it or not. 
          Actually layout.tsx has Navbar globally, except for admin. 
          So we DO NOT need <Navbar /> here. 
      */}
      
      <div className="container mx-auto px-6 max-w-6xl pb-24">
        <ScrollReveal variant="fade-right" className="mb-8">
            <a 
                href="/#news"
                className="inline-flex items-center text-gray-400 hover:text-tmp-gold transition-colors text-xs uppercase tracking-widest font-bold"
            >
                <i className="fas fa-arrow-left mr-3"></i> Back
            </a>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" className="text-center mb-16">
            <h1 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
                Insight & Article
            </h1>
            <h2 className="text-4xl font-serif italic text-white">
                Latest Updates from TMP Law Firm
            </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
            <ScrollReveal
                key={item.id}
                variant="fade-up"
                delay={index * 0.1}
            >
                <Link 
                    href={`/news/${item.id}`} 
                    className="group block bg-tmp-dark border border-white/5 hover:border-tmp-gold/30 transition-all duration-300 rounded-lg overflow-hidden h-full"
                >
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] text-tmp-gold font-bold uppercase tracking-widest border border-tmp-gold/30 px-2 py-1">
                                {item.category}
                            </span>
                            <p className="text-gray-500 text-[10px] uppercase tracking-widest">
                                {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                        <h4 className="text-xl font-serif italic text-white mb-4 line-clamp-2 group-hover:text-tmp-gold transition-colors">
                            {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                            {item.summary}
                        </p>
                        <span className="inline-flex items-center text-tmp-gold text-[10px] font-bold uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">
                            Read Full Article <i className="fas fa-arrow-right ml-2"></i>
                        </span>
                    </div>
                </Link>
            </ScrollReveal>
            ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
