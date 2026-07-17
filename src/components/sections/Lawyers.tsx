"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { type Lawyer, lawyersData } from "@/data/lawyersData";
import { useTeam } from "@/hooks/use-news";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Public Lawyers section component. Shows an infinite marquee ticker of lawyers.
 * Clicking a lawyer opens a premium modal with detail biography.
 */
export default function Lawyers() {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [mounted, setMounted] = useState(false);
  const { data: dbLawyers } = useTeam();

  const [visibleCardsCount, setVisibleCardsCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const displayLawyers = dbLawyers && dbLawyers.length > 0 ? dbLawyers : lawyersData;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCardsCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCardsCount(2);
      } else {
        setVisibleCardsCount(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    const maxIndex = Math.max(0, displayLawyers.length - visibleCardsCount);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, displayLawyers.length - visibleCardsCount);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Ensure currentIndex stays within bounds when resizing
  useEffect(() => {
    const maxIndex = Math.max(0, displayLawyers.length - visibleCardsCount);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCardsCount, displayLawyers.length, currentIndex]);

  // Autoplay slider logic: slides from right to left, then pauses for a moment
  useEffect(() => {
    if (isPaused || selectedLawyer) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Stop/pause for 4 seconds on each slide
    return () => clearInterval(interval);
  }, [currentIndex, visibleCardsCount, isPaused, selectedLawyer, displayLawyers.length]);

  useEffect(() => {
    if (selectedLawyer) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedLawyer]);

  const showButtons = displayLawyers.length > visibleCardsCount;

  const content = (
    <section
      id="lawyers"
      className="py-32 px-6 bg-tmp-black border-t border-white/5 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal variant="fade-up" className="text-center mb-16">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Our Lawyers
          </h2>
          <h3 className="text-4xl font-serif italic">Meet Our Lawyers</h3>
        </ScrollReveal>
        
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="relative w-full py-6 px-0 md:px-12">
            {/* Left Button */}
            {showButtons && (
              <button
                suppressHydrationWarning
                onClick={prevSlide}
                className="absolute left-[-20px] md:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-tmp-black/80 backdrop-blur-md rounded-full border border-white/10 hover:border-tmp-gold/50 flex items-center justify-center text-white hover:text-tmp-gold shadow-lg cursor-pointer transition-all duration-300"
                aria-label="Previous lawyer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-0.5">
                  <path d="M14 18l-6-6 6-6v12z" />
                </svg>
              </button>
            )}

            {/* Carousel Viewport */}
            <div 
              className="overflow-hidden w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="flex transition-transform duration-500 ease-out py-2"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCardsCount)}%)`
                }}
              >
                {displayLawyers.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="shrink-0 px-3 transition-all duration-500"
                    style={{ width: `${100 / visibleCardsCount}%` }}
                  >
                    {/* Card container */}
                    <div
                      onClick={() => setSelectedLawyer(lawyer)}
                      className="relative w-full h-[480px] md:h-[520px] rounded-xl overflow-hidden border border-white/5 group cursor-pointer shadow-lg hover:border-tmp-gold/40 transition-all duration-500 bg-tmp-dark"
                    >
                      {/* Image container */}
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={lawyer.image || "/assets/logo.png"}
                          alt={lawyer.name}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-black group-hover:via-black/80 transition-all duration-500" />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col z-10 justify-end h-full">
                        {/* Role */}
                        <span className="text-tmp-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          {lawyer.role}
                        </span>

                        {/* Name */}
                        <h3 className="text-2xl font-serif italic text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          {lawyer.name}
                        </h3>

                        {/* Animating description on hover */}
                        <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                          <p className="text-gray-300 text-xs leading-relaxed text-justify mb-4 line-clamp-3">
                            {lawyer.shortDesc}
                          </p>
                        </div>

                        {/* Button/Link */}
                        <div className="mt-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                          <span className="text-tmp-gold text-xs font-bold uppercase tracking-widest border-b border-tmp-gold/30 pb-1 group-hover:border-tmp-gold transition-colors">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Button */}
            {showButtons && (
              <button
                suppressHydrationWarning
                onClick={nextSlide}
                className="absolute right-[-20px] md:right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-tmp-black/80 backdrop-blur-md rounded-full border border-white/10 hover:border-tmp-gold/50 flex items-center justify-center text-white hover:text-tmp-gold shadow-lg cursor-pointer transition-all duration-300"
                aria-label="Next lawyer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
                  <path d="M10 6l6 6-6 6V6z" />
                </svg>
              </button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );

  if (!mounted) return content;

  return (
    <>
      {content}
      {createPortal(
        <AnimatePresence mode="wait">
          {selectedLawyer && (
            <motion.div 
              key="lawyer-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            >
              {/* Card Container */}
              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-5xl bg-tmp-black border border-white/10 rounded-xl shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden"
              >
                
                {/* Close Button - Always visible */}
                <button
                  suppressHydrationWarning
                  onClick={() => setSelectedLawyer(null)}
                  className="absolute top-4 right-4 z-[99999] w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white text-2xl hover:text-tmp-gold hover:bg-black/80 transition-all border border-white/10 cursor-pointer"
                >
                  &times;
                </button>

                {/* Left Column - Lawyer Photo Card */}
                <div className="w-full md:w-[380px] shrink-0 p-6 md:p-8 flex items-center justify-center bg-tmp-black">
                  <div className="bg-white rounded-xl shadow-lg p-6 w-full aspect-[3/4] flex items-center justify-center relative overflow-hidden">
                    <div className="relative w-full h-full min-h-[260px] md:min-h-[340px]">
                      <Image 
                        src={selectedLawyer.image || "/assets/logo.png"} 
                        alt={selectedLawyer.name} 
                        fill 
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Lawyer Details */}
                <div className="flex-1 md:overflow-y-auto p-6 md:p-8 md:pl-0 flex flex-col">
                  {/* Name and Role */}
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-serif italic text-white mb-2">
                      {selectedLawyer.name}
                    </h2>
                    <h3 className="text-tmp-gold font-bold uppercase tracking-[0.2em] text-xs">
                      {selectedLawyer.role}
                    </h3>
                    {selectedLawyer.italicDesc && (
                      <p className="text-gray-400 italic text-xs md:text-sm border-l-2 border-tmp-gold/50 pl-3 py-0.5 mt-3 leading-relaxed">
                        &ldquo;{selectedLawyer.italicDesc}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Biography */}
                  <div className="mb-6 text-gray-300 text-sm leading-relaxed text-justify whitespace-pre-line">
                    {selectedLawyer.biography}
                  </div>

                  {/* Pendidikan */}
                  {selectedLawyer.education && selectedLawyer.education.length > 0 && (
                    <div className="py-6 border-t border-b border-white/10">
                      <h4 className="text-tmp-gold font-bold uppercase tracking-widest text-xs mb-4">
                        Education
                      </h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        {selectedLawyer.education.map((edu, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-tmp-gold mr-2 font-bold">-</span>
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pengalaman */}
                  {selectedLawyer.experience && selectedLawyer.experience.length > 0 && (
                    <div className="py-6 border-b border-white/10">
                      <h4 className="text-tmp-gold font-bold uppercase tracking-widest text-xs mb-4">
                        Experience
                      </h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        {selectedLawyer.experience.map((exp, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-tmp-gold mr-2 font-bold">-</span>
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Media Sosial */}
                  <div className="py-6 border-b border-white/10">
                    <h4 className="text-tmp-gold font-bold uppercase tracking-widest text-xs mb-4">
                      Social Media
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <span className="text-tmp-gold font-bold text-xs uppercase tracking-wider w-28 shrink-0">
                          Email
                        </span>
                        {selectedLawyer.email && selectedLawyer.email !== "-" ? (
                          <a 
                            href={`mailto:${selectedLawyer.email}`}
                            className="text-gray-300 hover:text-tmp-gold transition-colors font-medium"
                          >
                            {selectedLawyer.email}
                          </a>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <span className="text-tmp-gold font-bold text-xs uppercase tracking-wider w-28 shrink-0">
                          Instagram
                        </span>
                        {selectedLawyer.instagram && selectedLawyer.instagram !== "-" ? (
                          <a 
                            href={`https://instagram.com/${selectedLawyer.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-tmp-gold transition-colors font-medium"
                          >
                            {selectedLawyer.instagram}
                          </a>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Keahlian */}
                  {selectedLawyer.skills && selectedLawyer.skills.length > 0 && (
                    <div className="py-6">
                      <h4 className="text-tmp-gold font-bold uppercase tracking-widest text-xs mb-4">
                        Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLawyer.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="text-[10px] font-bold uppercase tracking-widest text-tmp-gold border border-tmp-gold/30 bg-tmp-gold/5 px-3 py-1.5 rounded-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
