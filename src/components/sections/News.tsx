"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { NewsItem, MOCK_NEWS } from "@/data/newsData";
import ScrollReveal from "@/components/ScrollReveal";
export default function News() {
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS); // Default to static mock data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("date", { ascending: false })
          .limit(3);

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
        console.error("Error fetching news, using fallback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section id="news" className="py-32 px-6 bg-tmp-dark border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal variant="fade-up" className="text-center mb-16">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Insight & Article
          </h2>
          <h3 className="text-4xl font-serif italic text-white">Latest Legal Updates</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-tmp-black border border-white/5 animate-pulse"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-5 w-20 bg-white/10 rounded" />
                      <div className="h-3 w-28 bg-white/5 rounded" />
                    </div>
                    <div className="h-6 w-full bg-white/10 rounded mb-2" />
                    <div className="h-6 w-3/4 bg-white/10 rounded mb-4" />
                    <div className="space-y-2 mb-6">
                      <div className="h-4 w-full bg-white/5 rounded" />
                      <div className="h-4 w-full bg-white/5 rounded" />
                      <div className="h-4 w-2/3 bg-white/5 rounded" />
                    </div>
                    <div className="h-3 w-24 bg-tmp-gold/20 rounded" />
                  </div>
                </div>
              ))
            : news.map((item, index) => (
            <ScrollReveal
              key={item.id}
              variant="fade-up"
              delay={index * 0.1}
            >
              <Link 
                  href={`/news/${item.id}`} 
                  className="group block bg-tmp-black border border-white/5 hover:border-tmp-gold/30 transition-all duration-300 h-full"
              >
                  <div className="p-8">
                      <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] text-tmp-gold font-bold uppercase tracking-widest border border-tmp-gold/30 px-2 py-1">
                              {item.category}
                          </span>
                          <p className="text-gray-500 text-[10px] uppercase tracking-widest">
                              {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                      </div>

                      <h4 className="text-xl font-serif italic text-white mb-4 line-clamp-2 group-hover:text-tmp-gold transition-colors">
                          {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                          {item.summary}
                      </p>
                      <span className="inline-flex items-center text-tmp-gold text-[10px] font-bold uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">
                          Read More <i className="fas fa-arrow-right ml-2"></i>
                      </span>
                  </div>
              </Link>
            </ScrollReveal>
              ))
          }
        </div>

        <ScrollReveal variant="fade-up" className="text-center mt-12">
            <Link 
                href="/news"
                className="inline-block border border-white/20 px-8 py-3 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
                View All News
            </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
