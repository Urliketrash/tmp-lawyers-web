"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { NewsItem, MOCK_NEWS } from "@/data/newsData";
import { lawyersData } from "@/data/lawyersData";
import ScrollReveal from "@/components/ScrollReveal";

const CATEGORIES = ["ALL", "CLIENT ALERT", "CLIENT INSIGHT", "REGULATION", "CORPORATE", "LITIGATION"];

const getReadTime = (content: string) => {
  if (!content) return "3 min read";
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 180));
  return `${minutes} min read`;
};

export default function News() {
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");

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
        console.error("Error fetching news, using fallback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = useMemo(() => {
    if (activeCategory === "ALL") return news;
    return news.filter(
      (item) => item.category.toUpperCase() === activeCategory || (activeCategory === "CLIENT ALERT" && item.category === "REGULATION") || (activeCategory === "CLIENT INSIGHT" && item.category === "CORPORATE")
    );
  }, [news, activeCategory]);

  const featuredArticle = filteredNews[0];
  const secondaryArticles = filteredNews.slice(1, 4);

  return (
    <section id="news" className="py-32 px-6 bg-tmp-black border-t border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-tmp-gold/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" className="text-center mb-12">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            INSIGHT & ARTICLE
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white max-w-2xl mx-auto leading-tight mb-4">
            Latest Legal Insights & Perspectives
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Independent legal publications and commentary by TMP Law Firm advocates on regulatory developments, risk mitigation, and corporate practice.
          </p>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal variant="fade-up" delay={0.1} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
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
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-[420px] bg-tmp-dark border border-white/5 rounded-xl animate-pulse p-8" />
            <div className="space-y-4">
              <div className="h-48 bg-tmp-dark border border-white/5 rounded-xl animate-pulse" />
              <div className="h-48 bg-tmp-dark border border-white/5 rounded-xl animate-pulse" />
            </div>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-tmp-dark border border-white/10 rounded-xl">
            <p className="text-gray-400 text-sm italic">No publications found in this category.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Article + Grid Layout (Umbra Style) */}
            {featuredArticle && (
              <ScrollReveal variant="fade-up">
                <Link
                  href={`/news/${featuredArticle.id}`}
                  className="group block bg-tmp-dark border border-white/10 hover:border-tmp-gold/50 rounded-xl overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-[0_10px_30px_rgba(197,160,89,0.15)]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                    {/* Featured Image Container - Controlled Aspect Ratio */}
                    <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto min-h-[280px] overflow-hidden bg-black">
                      <Image
                        src={featuredArticle.imageUrl || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200"}
                        alt={featuredArticle.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-tmp-dark via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-tmp-dark opacity-90" />
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="bg-tmp-gold text-black text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded shadow-md">
                          FEATURED PUBLICATION
                        </span>
                      </div>
                    </div>

                    {/* Featured Content Details */}
                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-tmp-dark">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4 text-[10px] text-gray-400 font-medium">
                          <span className="text-tmp-gold font-bold uppercase tracking-widest border border-tmp-gold/30 px-2.5 py-0.5 rounded bg-tmp-gold/5">
                            {featuredArticle.category}
                          </span>
                          <span>•</span>
                          <span>{getReadTime(featuredArticle.content)}</span>
                          <span>•</span>
                          <span>
                            {new Date(featuredArticle.date).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-serif italic text-white mb-4 line-clamp-3 group-hover:text-tmp-gold transition-colors leading-snug">
                          {featuredArticle.title}
                        </h3>

                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-4 mb-6 font-light">
                          {featuredArticle.summary}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {(() => {
                            const rawAuthor = featuredArticle.author || "Wang Tao Bicton Manullang, S.H.";
                            const authorName = rawAuthor.includes("|") ? rawAuthor.split("|")[0].trim() : rawAuthor;
                            const authorLower = authorName.toLowerCase();
                            const matched = lawyersData.find(
                              (l) => authorLower.includes(l.name.toLowerCase()) || l.name.toLowerCase().includes(authorLower)
                            );
                            const photo = matched ? matched.image : null;

                            return (
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-tmp-gold/50 flex items-center justify-center shrink-0 bg-tmp-black">
                                {photo ? (
                                  <Image src={photo} alt={authorName} fill className="object-cover" />
                                ) : (
                                  <Image src="/assets/logo.png" alt="TMP" fill className="object-contain p-1 bg-tmp-black" />
                                )}
                              </div>
                            );
                          })()}
                          <div>
                            <p className="text-white text-xs font-bold">
                              {featuredArticle.author?.includes("|") ? featuredArticle.author.split("|")[0].trim() : featuredArticle.author}
                            </p>
                            <p className="text-gray-400 text-[10px]">
                              {featuredArticle.author?.includes("|") ? featuredArticle.author.split("|")[1].trim() : "TMP Law Firm"}
                            </p>
                          </div>
                        </div>

                        <span className="inline-flex items-center text-tmp-gold text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                          Read Article <i className="fas fa-arrow-right ml-2 text-xs" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )}

            {/* Secondary Grid Articles (16:9 Thumbnail Cards) */}
            {secondaryArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {secondaryArticles.map((item, index) => (
                  <ScrollReveal key={item.id} variant="fade-up" delay={index * 0.1}>
                    <Link
                      href={`/news/${item.id}`}
                      className="group block bg-tmp-dark border border-white/10 hover:border-tmp-gold/40 rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1"
                    >
                      <div>
                        {/* Controlled 16:9 Thumbnail Container */}
                        <div className="relative w-full aspect-video bg-black overflow-hidden border-b border-white/5">
                          <Image
                            src={item.imageUrl || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-black/80 backdrop-blur text-tmp-gold border border-tmp-gold/30 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Meta & Body */}
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

                          <h4 className="text-base sm:text-lg font-serif italic text-white mb-3 line-clamp-2 group-hover:text-tmp-gold transition-colors leading-snug">
                            {item.title}
                          </h4>

                          <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed font-light mb-4">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs">
                        <span className="text-gray-400 text-[10px]">
                          By {item.author?.includes("|") ? item.author.split("|")[0].trim() : (item.author || "TMP Advocate")}
                        </span>
                        <span className="text-tmp-gold font-bold uppercase tracking-wider text-[10px] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          View Details &rarr;
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        )}

        {/* View All Button */}
        <ScrollReveal variant="fade-up" className="text-center mt-14">
          <Link
            href="/news"
            className="inline-flex items-center gap-3 border border-tmp-gold/40 px-8 py-3.5 rounded-md text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-tmp-gold hover:text-black transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(197,160,89,0.3)]"
          >
            View All Publications <i className="fas fa-arrow-right text-xs" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
