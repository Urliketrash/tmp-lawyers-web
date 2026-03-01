"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NewsItem } from "@/data/newsData";

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Query getting the latest 3 documents
        // Note: For simple creation time ordering, we can sort in memory for now or adding orderBy later
        const querySnapshot = await getDocs(collection(db, "news"));
        if (!querySnapshot.empty) {
          const firebaseNews: NewsItem[] = [];
          querySnapshot.forEach((doc) => {
              const data = doc.data();
              firebaseNews.push({
                  id: doc.id,
                  title: data.title,
                  date: data.date,
                  category: data.category,
                  summary: data.summary,
                  content: data.content,
                  imageUrl: data.imageUrl,
                  author: data.author
              } as NewsItem);
          });
          // Sort by date descending and take top 3
          // Assuming date is YYYY-MM-DD string
          const sorted = firebaseNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setNews(sorted.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return null; // Or a loading skeleton

  if (news.length === 0) return null; // Don't show section if no news

  return (
    <section id="news" className="py-32 px-6 bg-tmp-dark border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Insight & Article
          </h2>
          <h3 className="text-4xl font-serif italic text-white">Latest Legal Updates</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <Link 
                href={`/news/${item.id}`} 
                key={item.id}
                className="group block bg-tmp-black border border-white/5 hover:border-tmp-gold/30 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
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
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up">
            <Link 
                href="/news"
                className="inline-block border border-white/20 px-8 py-3 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
                View All News
            </Link>
        </div>
      </div>
    </section>
  );
}
