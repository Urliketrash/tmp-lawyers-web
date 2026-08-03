"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { MOCK_NEWS, NewsItem } from "@/data/newsData";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const CATEGORIES = ["ALL", "CLIENT ALERT", "CLIENT INSIGHT", "REGULATION", "CORPORATE", "LITIGATION", "EVENT"];

const getReadTime = (content: string) => {
  if (!content) return "3 min read";
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 180));
  return `${minutes} min read`;
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
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
            author: item.author || "Wang Tao & Partners"
          }));
          setNews(mappedNews);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory =
        activeCategory === "ALL" ||
        item.category.toUpperCase() === activeCategory ||
        (activeCategory === "CLIENT ALERT" && item.category === "REGULATION") ||
        (activeCategory === "CLIENT INSIGHT" && item.category === "CORPORATE");

      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [news, activeCategory, searchQuery]);

  return (
    <main className="bg-tmp-black min-h-screen text-white pt-32">
      <div className="container mx-auto px-6 max-w-6xl pb-24">
        {/* Navigation Back Link */}
        <ScrollReveal variant="fade-right" className="mb-8">
          <Link
            href="/#news"
            className="inline-flex items-center text-gray-400 hover:text-tmp-gold transition-colors text-xs uppercase tracking-widest font-bold gap-2"
          >
            <i className="fas fa-arrow-left text-xs" /> Back to Homepage
          </Link>
        </ScrollReveal>

        {/* Page Header */}
        <ScrollReveal variant="fade-up" className="text-center mb-12">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            INSIGHT & ARTICLE
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white mb-4">
            Legal Insights & Articles
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Comprehensive archive of legal analysis, regulatory updates, and client alerts authored by TMP Law Firm attorneys.
          </p>
        </ScrollReveal>

        {/* Search & Category Filter Controls */}
        <ScrollReveal variant="fade-up" delay={0.1} className="space-y-6 mb-14">
          {/* Search Input Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search publication title or legal topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-tmp-dark/90 border border-white/10 text-white placeholder-gray-500 px-5 py-3.5 pr-12 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-tmp-gold transition-colors shadow-inner"
            />
            <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-tmp-gold text-black border-tmp-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                    : "bg-tmp-dark/80 text-gray-400 border-white/10 hover:border-tmp-gold/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Articles Grid (Clean 16:9 Thumbnails) */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-20 bg-tmp-dark border border-white/10 rounded-xl">
            <i className="fas fa-newspaper text-3xl text-gray-600 mb-4 block" />
            <p className="text-gray-400 text-sm italic">
              No publications match your search query or selected filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              <ScrollReveal key={item.id} variant="fade-up" delay={index * 0.05}>
                <Link
                  href={`/news/${item.id}`}
                  className="group block bg-tmp-dark border border-white/10 hover:border-tmp-gold/50 transition-all duration-300 rounded-xl overflow-hidden h-full flex flex-col justify-between hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_25px_rgba(197,160,89,0.12)]"
                >
                  <div>
                    {/* Controlled 16:9 Thumbnail Image */}
                    <div className="relative w-full aspect-video bg-black overflow-hidden border-b border-white/5">
                      <Image
                        src={item.imageUrl || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/80 backdrop-blur text-tmp-gold border border-tmp-gold/30 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mb-3">
                        <span>{getReadTime(item.content)}</span>
                        <span>
                          {new Date(item.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-serif italic text-white mb-3 line-clamp-2 group-hover:text-tmp-gold transition-colors leading-snug">
                        {item.title}
                      </h2>

                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4 font-light">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-gray-400 text-[10px]">
                      By {item.author?.includes("|") ? item.author.split("|")[0].trim() : (item.author || "TMP Advocate")}
                    </span>
                    <span className="text-tmp-gold text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Article &rarr;
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
