"use client";


import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";


import { type Lawyer, lawyersData } from "@/data/lawyersData";

export default function Lawyers() {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [mounted, setMounted] = useState(false);
  // Default to static data since admin feature is postponed
  const [displayLawyers, setDisplayLawyers] = useState<Lawyer[]>(lawyersData);

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
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Our Lawyers
          </h2>
          <h3 className="text-4xl font-serif italic">Meet Our Lawyers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayLawyers.map((lawyer, index) => (
            <div
              key={lawyer.id}
              className="bg-tmp-dark p-6 rounded-lg group flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative w-full h-64 mb-4 overflow-hidden">
                <Image
                  src={lawyer.image}
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
                className="relative z-10 text-tmp-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mt-auto pt-4 cursor-pointer"
                suppressHydrationWarning
              >
                Lihat Selengkapnya
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (!mounted) return content;

  return (
    <>
      {content}
      {selectedLawyer && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Card Container */}
          <div className="relative w-full max-w-4xl bg-tmp-black border border-white/10 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Close Button - Always visible */}
            <button
              onClick={() => setSelectedLawyer(null)}
              className="absolute top-4 right-4 z-[99999] w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white text-2xl hover:text-tmp-gold hover:bg-black/80 transition-all border border-white/10 cursor-pointer"
            >
              &times;
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-0">
              <div className="flex flex-col items-center pt-16 pb-8 px-8 md:px-16 text-center border-b border-white/10 bg-gradient-to-b from-tmp-black to-tmp-dark/50">
                   <div className="relative w-40 h-52 md:w-48 md:h-64 mb-8 shadow-2xl rounded-lg overflow-hidden border border-white/5">
                      <Image 
                          src={selectedLawyer.image} 
                          alt={selectedLawyer.name} 
                          fill 
                          className="object-cover"
                      />
                   </div>
                   <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-3">
                      {selectedLawyer.name}
                   </h2>
                   <h3 className="text-white font-bold uppercase tracking-[0.2em] text-xs md:text-sm text-tmp-gold">
                      {selectedLawyer.role}
                   </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 text-left bg-tmp-black">
                  {/* Left Column */}
                  <div className="space-y-8">
                      <div>
                          <h4 className="text-tmp-gold font-bold uppercase tracking-widest text-xs mb-4 border-b border-white/10 pb-2">Biografi</h4>
                          <p className="text-gray-400 text-sm leading-loose text-justify whitespace-pre-line">
                              {selectedLawyer.biography}
                          </p>
                      </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                       <div>
                           <h4 className="text-tmp-gold font-bold uppercase tracking-widest text-xs mb-4 border-b border-white/10 pb-2">Media Sosial</h4>
                           <div className="space-y-4">
                              <div className="flex items-center gap-3 text-gray-400 text-sm">
                                <span className="text-tmp-gold font-bold text-xs uppercase tracking-wider w-24 shrink-0">Email</span>
                                <span className="break-all">{selectedLawyer.email || "-"}</span>
                              </div>
                              
                              <div className="flex items-center gap-3 text-gray-400 text-sm">
                                <span className="text-tmp-gold font-bold text-xs uppercase tracking-wider w-24 shrink-0">Instagram</span>
                                {selectedLawyer.instagram && selectedLawyer.instagram !== "-" ? (
                                    <a 
                                        href={`https://instagram.com/${selectedLawyer.instagram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-tmp-gold transition-colors font-medium border-b border-white/10 hover:border-tmp-gold pb-0.5"
                                    >
                                        {selectedLawyer.instagram}
                                    </a>
                                ) : (
                                    <span>-</span>
                                )}
                              </div>
                           </div>
                       </div>
                      <div>
                          <h4 className="text-tmp-gold font-bold uppercase tracking-widest text-xs mb-4 border-b border-white/10 pb-2">Keahlian</h4>
                          <div className="flex flex-wrap gap-2">
                               {selectedLawyer.skills?.map((skill, idx) => (
                                   <span key={idx} className="text-[10px] font-bold uppercase tracking-widest text-tmp-gold border border-tmp-gold/30 bg-tmp-gold/5 px-3 py-1.5 rounded-sm">
                                      {skill}
                                   </span>
                               ))}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
