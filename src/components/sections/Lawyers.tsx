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

  const displayLawyers = dbLawyers && dbLawyers.length > 0 ? dbLawyers : lawyersData;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const content = (
    <section
      id="lawyers"
      className="py-32 px-6 bg-tmp-black border-t border-white/5"
    >
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal variant="fade-up" className="text-center mb-16">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Our Lawyers
          </h2>
          <h3 className="text-4xl font-serif italic">Meet Our Lawyers</h3>
        </ScrollReveal>
        
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="relative w-full overflow-hidden py-6">
            {/* Track Marquee Ticker */}
            <div className="flex w-max animate-marquee-left py-2">
              {/* First set */}
              {displayLawyers.map((lawyer) => (
                <div
                  key={`first-${lawyer.id}`}
                  className="mx-4 w-[280px] sm:w-[320px] shrink-0 bg-tmp-dark p-6 rounded-lg group flex flex-col h-[480px] border border-white/5 hover:border-tmp-gold/30 transition-colors duration-300"
                >
                  <div className="relative w-full h-64 mb-4 overflow-hidden">
                    <Image
                      src={lawyer.image || "/assets/logo.png"}
                      alt={lawyer.name}
                      fill
                      className="object-cover rounded opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <h4 className="text-tmp-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-2">
                    {lawyer.role}
                  </h4>
                  <h3 className="text-xl font-serif italic text-white mb-4 min-h-[3.5rem] flex items-center">
                    {lawyer.name}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3 text-justify line-clamp-3 min-h-[3.75rem]">
                    {lawyer.shortDesc}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLawyer(lawyer);
                    }}
                    className="relative z-10 text-tmp-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mt-auto pt-4 cursor-pointer text-left"
                    suppressHydrationWarning
                  >
                    Lihat Selengkapnya
                  </button>
                </div>
              ))}

              {/* Second set (duplicate for seamless scrolling) */}
              {displayLawyers.map((lawyer) => (
                <div
                  key={`second-${lawyer.id}`}
                  className="mx-4 w-[280px] sm:w-[320px] shrink-0 bg-tmp-dark p-6 rounded-lg group flex flex-col h-[480px] border border-white/5 hover:border-tmp-gold/30 transition-colors duration-300"
                >
                  <div className="relative w-full h-64 mb-4 overflow-hidden">
                    <Image
                      src={lawyer.image || "/assets/logo.png"}
                      alt={lawyer.name}
                      fill
                      className="object-cover rounded opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <h4 className="text-tmp-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-2">
                    {lawyer.role}
                  </h4>
                  <h3 className="text-xl font-serif italic text-white mb-4 min-h-[3.5rem] flex items-center">
                    {lawyer.name}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3 text-justify line-clamp-3 min-h-[3.75rem]">
                    {lawyer.shortDesc}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLawyer(lawyer);
                    }}
                    className="relative z-10 text-tmp-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mt-auto pt-4 cursor-pointer text-left"
                    suppressHydrationWarning
                  >
                    Lihat Selengkapnya
                  </button>
                </div>
              ))}
            </div>
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
                        "{selectedLawyer.italicDesc}"
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
                        Pendidikan
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
                        Pengalaman
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
                      Media Sosial
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
                        Keahlian
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
