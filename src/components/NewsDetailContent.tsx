"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsItem, MOCK_NEWS } from "@/data/newsData";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import sanitizeHtml from "@/lib/sanitize";

const getReadTime = (content: string) => {
  if (!content) return "3 min read";
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 180));
  return `${minutes} min read`;
};

export default function NewsDetailContent({ news }: { news: NewsItem }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);

  // Calculate Reading Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter Related Articles
  useEffect(() => {
    const filtered = MOCK_NEWS.filter((item) => item.id !== news.id).slice(0, 3);
    setRelatedArticles(filtered);
  }, [news.id]);

  // Social Share Handlers
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(news.title);

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

  return (
    <main className="bg-tmp-black text-white pt-28 min-h-screen flex flex-col justify-between relative">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-tmp-gold z-[100] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(197,160,89,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="container mx-auto px-6 max-w-6xl pb-24 flex-grow">
        {/* Navigation Breadcrumb */}
        <ScrollReveal variant="fade-right" className="mb-8">
          <Link
            href="/news"
            className="inline-flex items-center text-gray-400 hover:text-tmp-gold transition-colors text-xs uppercase tracking-widest font-bold gap-2"
          >
            <i className="fas fa-arrow-left text-xs" /> Back to Insights & Articles
          </Link>
        </ScrollReveal>

        {/* Article Title & Meta Header */}
        <ScrollReveal variant="fade-up" className="mb-8 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-tmp-gold text-[10px] font-bold uppercase tracking-[0.2em] border border-tmp-gold/30 bg-tmp-gold/10 px-3 py-1 rounded">
              {news.category}
            </span>
            <span className="text-gray-500 text-xs">•</span>
            <span className="text-gray-400 text-xs font-light">{getReadTime(news.content)}</span>
            <span className="text-gray-500 text-xs">•</span>
            <span className="text-gray-400 text-xs font-light">
              {new Date(news.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight mb-8">
            {news.title}
          </h1>

          {/* Author Attribution Card */}
          {(() => {
            const rawAuthor = news.author || "Wang Tao Bicton Manullang, S.H.";
            const displayAuthor = rawAuthor.includes("|") ? rawAuthor.split("|")[0].trim() : rawAuthor;
            const displayRole = rawAuthor.includes("|")
              ? rawAuthor.split("|")[1].trim()
              : (news.authorRole || "ADVOKAT & KONSULTAN HUKUM • TMP LAW FIRM");

            return (
              <div className="flex items-center gap-4 bg-tmp-dark/90 border border-white/10 p-4 rounded-xl max-w-md">
                <div className="w-12 h-12 rounded-full bg-tmp-gold/20 border border-tmp-gold/50 flex items-center justify-center text-tmp-gold font-serif font-bold text-base shrink-0">
                  TMP
                </div>
                <div>
                  <p className="text-white text-xs font-bold">{displayAuthor}</p>
                  <p className="text-tmp-gold text-[10px] uppercase tracking-wider font-semibold mt-0.5">
                    {displayRole}
                  </p>
                </div>
              </div>
            );
          })()}
        </ScrollReveal>

        {/* Featured Image Container - Controlled Max Height (Fixing "Too Large" issue!) */}
        {news.imageUrl && (
          <ScrollReveal variant="zoom-in" className="mb-12">
            <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] max-h-[440px] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <Image
                src={news.imageUrl}
                alt={news.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tmp-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </ScrollReveal>
        )}

        {/* 2-Column Responsive Body Layout (Content Left, Sticky Sidebar Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Text Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Article Content with Custom Editorial Typography */}
            <ScrollReveal
              variant="fade-up"
              className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-light 
                [&_p]:mb-6 [&_p]:text-sm [&_p]:sm:text-base [&_p]:leading-relaxed [&_p]:text-justify
                [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-serif [&_h2]:italic [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-l-2 [&_h2]:border-tmp-gold [&_h2]:pl-3
                [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-tmp-gold [&_h3]:mt-6 [&_h3]:mb-3
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:text-xs [&_ul]:sm:text-sm
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2 [&_ol]:text-xs [&_ol]:sm:text-sm
                [&_li]:text-gray-300
                [&_strong]:text-white [&_strong]:font-semibold
                [&_b]:text-white [&_b]:font-semibold
                [&_blockquote]:border-l-2 [&_blockquote]:border-tmp-gold [&_blockquote]:bg-tmp-gold/5 [&_blockquote]:p-6 [&_blockquote]:rounded-r-lg [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-tmp-gold [&_blockquote]:text-sm sm:[&_blockquote]:text-base"
            >
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(news.content) }} />
            </ScrollReveal>

            {/* Legal Disclaimer Box (Umbra Style Standard) */}
            <ScrollReveal variant="fade-up" className="bg-tmp-dark/80 border border-tmp-gold/30 p-6 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-tmp-gold font-bold text-xs uppercase tracking-widest">
                <i className="fas fa-gavel" /> Legal Disclaimer Notice
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-light text-justify">
                Artikel dan publikasi hukum ini disusun semata-mata untuk tujuan edukasi dan informasi umum, serta tidak boleh ditafsirkan sebagai nasihat hukum formal atau pendapat hukum resmi atas kasus tertentu. Untuk konsultasi dan penanganan perkara hukum konkret, silakan menghubungi tim advokat TMP Law Firm.
              </p>
            </ScrollReveal>

            {/* Share Article Bar */}
            <ScrollReveal variant="fade-up" className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                Bagikan Publikasi Ini:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/30 px-4 py-2 rounded-md text-xs font-bold transition-all duration-300 inline-flex items-center gap-2"
                >
                  <i className="fab fa-whatsapp text-sm" /> WhatsApp
                </a>
                <a
                  href={linkedinShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#0A66C2]/30 px-4 py-2 rounded-md text-xs font-bold transition-all duration-300 inline-flex items-center gap-2"
                >
                  <i className="fab fa-linkedin text-sm" /> LinkedIn
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="bg-white/5 hover:bg-white/15 text-white border border-white/15 px-4 py-2 rounded-md text-xs font-bold transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
                >
                  <i className="fas fa-link text-xs" />
                  {copied ? "Link Tersalin!" : "Salin Tautan"}
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Sticky Sidebar Column */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
            {/* Consultation CTA Box */}
            <ScrollReveal variant="fade-up" className="bg-gradient-to-br from-tmp-dark to-black border border-tmp-gold/40 p-6 sm:p-8 rounded-xl shadow-2xl space-y-4">
              <div className="w-10 h-10 rounded-full bg-tmp-gold/20 border border-tmp-gold/50 flex items-center justify-center text-tmp-gold">
                <i className="fas fa-balance-scale text-lg" />
              </div>

              <div>
                <h3 className="text-white font-serif italic text-xl mb-2">Butuh Konsultasi Hukum?</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  Tim Advokat & Konsultan Hukum TMP Law Firm siap membantu analisis, penanganan perkara, dan mitigasi risiko bisnis Anda.
                </p>
              </div>

              <a
                href="https://wa.me/6281210054874?text=Halo%20TMP%20Law%20Firm,%20saya%20tertarik%20berkonsultasi%20mengenai%20layanan%20hukum."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-tmp-gold text-black font-extrabold uppercase tracking-widest text-[10px] sm:text-xs py-3.5 px-4 rounded-md hover:bg-white transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2 text-center"
              >
                <i className="fab fa-whatsapp text-sm" /> Konsultasi via WhatsApp &rarr;
              </a>
            </ScrollReveal>

            {/* Related Articles Widget */}
            {relatedArticles.length > 0 && (
              <ScrollReveal variant="fade-up" delay={0.1} className="bg-tmp-dark border border-white/10 p-6 rounded-xl space-y-4">
                <h4 className="text-tmp-gold text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-3 flex items-center justify-between">
                  <span>Artikel Terkait</span>
                  <i className="fas fa-bookmark text-xs opacity-60" />
                </h4>

                <div className="space-y-4 divide-y divide-white/5">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/news/${rel.id}`}
                      className="group block pt-4 first:pt-0"
                    >
                      <span className="text-tmp-gold text-[9px] font-bold uppercase tracking-wider block mb-1">
                        {rel.category}
                      </span>
                      <h5 className="text-xs sm:text-sm font-serif italic text-white group-hover:text-tmp-gold transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h5>
                      <span className="text-gray-500 text-[10px] mt-1 block">
                        {new Date(rel.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
