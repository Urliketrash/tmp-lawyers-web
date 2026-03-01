"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/data/newsData";
import Footer from "@/components/Footer";

export default function NewsDetailContent({ news }: { news: NewsItem }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <main className="bg-tmp-black text-white pt-32 min-h-screen flex flex-col justify-between">
      
      <article className="container mx-auto px-6 max-w-5xl pb-24 flex-grow">
        {/* Header */}
        <header className="text-center mb-12" data-aos="fade-up">
            <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-tmp-gold text-[10px] font-bold uppercase tracking-[0.2em] border border-tmp-gold/30 px-3 py-1 rounded-full">
                    {news.category}
                </span>
                <span className="text-gray-500 text-[10px] uppercase tracking-widest">
                    {new Date(news.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif italic text-white leading-tight mb-8">
                {news.title}
            </h1>
        </header>

        {/* Featured Image (Optional) */}
        {news.imageUrl && (
            <div className="relative w-full mb-12 rounded-xl overflow-hidden shadow-2xl border border-white/5" data-aos="zoom-in">
                <Image
                    src={news.imageUrl}
                    alt={news.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-contain"
                    priority
                />
            </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none mx-auto text-gray-300 leading-relaxed font-light [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-6 [&_li]:mb-2 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_p]:mb-6 [&_strong]:text-white [&_b]:text-white" data-aos="fade-up">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </div>

        {/* Share / Back */}
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <Link href="/news" className="text-gray-400 hover:text-white text-xs uppercase tracking-widest flex items-center gap-2 transition-colors">
                <i className="fas fa-arrow-left"></i> Back to All News
            </Link>

        </div>
      </article>

      <Footer />
    </main>
  );
}
