"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/lib/supabase";

const defaultServices = [
  {
    title: "Legal Consultation",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    description:
      "TMP Law Firm is capable of assisting every client, both individuals and business entities, covering oral and written consultation, Legal Opinions, Legal Risk Analysis, and strategic resolution of legal issues.",
  },
  {
    title: "Legal Assistance & Representation",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
    description:
      "Our lawyers are highly experienced in providing legal assistance to clients in various legal processes, including representation in negotiations and/or mediations, examinations by Police/Prosecutors and related institutions, and assisting and representing clients in court trials.",
  },
  {
    title: "Litigation",
    image: "https://images.unsplash.com/photo-1505664194779-8bebcb95c557?auto=format&fit=crop&w=600&q=80",
    description:
      "Representing clients in dispute resolution processes in Court, including civil cases, criminal cases, Industrial Relations Disputes (PHI), bankruptcy and PKPU, land and property disputes.",
  },
  {
    title: "Non-Litigation",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    description:
      "TMP Law Firm is also experienced in out-of-court dispute resolution through legal approaches and negotiations, such as Mediation and arbitration, drafting warning letters (somasi), peaceful dispute resolution, and the execution of settlement agreements.",
  },
  {
    title: "Drafting & Reviewing Legal Documents",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    description:
      "TMP Law Firm is known for its experience in drafting, analyzing, and reviewing legal documents, including Employment Agreements/Contracts, Memorandum of Understanding (MoU), Notarial supporting agreements, Sale and Purchase Agreements, leases, deeds of gift, as well as business contracts and investment agreements.",
  },
  {
    title: "Land & Property Law",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
    description:
      "Our legal team is highly experienced in providing legal services related to land and property, including Land Disputes, assistance in sale and purchase of land/buildings, PPJB and AJB, legal verification of land titles, and the processing of Title Transfer, Inheritance, and Land Gifts.",
  },
  {
    title: "Labor & Employment Law",
    image: "https://images.unsplash.com/photo-1521791136364-7286472b539c?auto=format&fit=crop&w=600&q=80",
    description:
      "We also provide legal services for both companies and individuals/workers, including drafting PKWT/PKWTT (fixed/non-fixed term contracts), resolving industrial relations disputes, termination of employment (PHK), bipartite and tripartite assistance, mediation, PHI representation, and advising companies on labor regulations.",
  },
  {
    title: "Retainer/Corporate Legal Counsel",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    description:
      "Regarding retainer legal services, TMP Law Firm provides services to companies, including routine consultation, drafting business contracts, assistance in business activities including negotiations and transactions, reviewing corporate legal documents, and corporate disputes.",
  },
  {
    title: "Energy Sector Business Contract Review",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    description:
      "As one of the business fields that prioritizes legal aspects, we are experienced in the execution of energy sector business contracts, including but not limited to Consortium Agreements, Joint Development Agreements (JDA), Engineering, Procurement, and Construction (EPC), Operating & Maintenance (O&M), Procurement Contracts, Joint Operations (KSO), and compiling legal risk assessments in projects.",
  },
  {
    title: "Banking & Financial Institution Sector",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=600&q=80",
    description:
      "Providing legal services related to the banking sector and business and project financing structures, including drafting and reviewing financing agreements (Leasing, factoring, consumer financing) or loan agreements, security agreements, Fiduciary, Mortgages, Pledges, Shares, Debt Restructuring and renegotiation, as well as dispute resolution through courts, BPSK, or BANI.",
  },
  {
    title: "Corporate Law & Mergers & Acquisitions",
    image: "https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=600&q=80",
    description:
      "Providing legal services in business operations including merger and acquisition transactions, covering business entity establishment, Legal Due Diligence (LDD), Agreements, PPJB and AJB for Share Acquisition, Transaction Structure Design, SPA-APA-JVA compilation, licensing assistance, drafting AGMS documents, changes to Articles of Association, Shareholder Agreements (SHA), and post-acquisition dispute resolution.",
  },
  {
    title: "Family & Inheritance Law",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
    description:
      "TMP Law Firm is also experienced in disputes related to Family Law including Inheritance, such as divorce and division of marital property, Child Custody, lawsuits and applications in Court, inheritance disputes, and prenuptial agreements.",
  },
];

export default function Services() {
  const [services, setServices] = useState<any[]>(defaultServices);
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const { data, error } = await supabase.from("site_settings").select("*");
        if (error) throw error;
        if (data) {
          const item = data.find((row) => row.key === "services_data");
          if (item && item.value) {
            const parsed = JSON.parse(item.value);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setServices(parsed);
            }
          }
        }
      } catch (e) {
        console.error("Error loading services from database:", e);
      }
    };
    fetchServicesData();
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
    const maxIndex = Math.max(0, services.length - visibleCardsCount);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, services.length - visibleCardsCount);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Ensure currentIndex stays within bounds when resizing
  useEffect(() => {
    const maxIndex = Math.max(0, services.length - visibleCardsCount);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCardsCount, services.length, currentIndex]);

  // Autoplay slider logic: slides from right to left, then pauses for a moment
  useEffect(() => {
    if (isPaused || isExpanded) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Stop/pause for 4 seconds on each slide
    return () => clearInterval(interval);
  }, [currentIndex, visibleCardsCount, isPaused, isExpanded, services.length]);

  const showButtons = services.length > visibleCardsCount;

  const content = (
    <section
      id="services"
      className="py-32 px-6 bg-tmp-black border-t border-white/5 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal variant="fade-up" className="text-center mb-20">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Our Services
          </h2>
          <h3 className="text-4xl font-serif italic mb-6">Area of Practice</h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            TMP Law Firm is here to offer comprehensive legal services
            to our clients with the motto: Trust - Strategy - Professional.
          </p>
        </ScrollReveal>
        
        {isExpanded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ScrollReveal
                key={index}
                variant="fade-up"
                delay={index * 0.05}
                className="relative w-full h-[420px] rounded-xl overflow-hidden border border-white/5 group shadow-lg transition-all duration-500 bg-tmp-dark"
              >
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/75 group-hover:bg-black/80 transition-all duration-500" />
                </div>

                {/* Inset Border (Style 11 characteristic) */}
                <div className="absolute inset-5 border border-white/0 group-hover:border-tmp-gold/30 rounded-lg transition-all duration-500 z-10 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col z-20 justify-center items-center text-center h-full">
                  {/* Label */}
                  <span className="text-tmp-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    Area of Practice
                  </span>

                  {/* Title */}
                  <h4 className="text-xl font-serif text-white font-medium mb-4 transform translate-y-2 group-hover:translate-y-[-6px] transition-transform duration-500 ease-out leading-snug px-2">
                    {service.title}
                  </h4>

                  {/* Description (fades and slides up on hover) */}
                  <p className="text-gray-300 text-xs leading-relaxed max-h-0 opacity-0 overflow-hidden group-hover:max-h-[180px] group-hover:opacity-100 transition-all duration-500 ease-in-out px-2 text-justify">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="relative w-full py-6 px-0 md:px-12">
              {/* Left Button */}
              {showButtons && (
                <button
                  suppressHydrationWarning
                  onClick={prevSlide}
                  className="absolute left-[-20px] md:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-tmp-black/80 backdrop-blur-md rounded-full border border-white/10 hover:border-tmp-gold/50 flex items-center justify-center text-white hover:text-tmp-gold shadow-lg cursor-pointer transition-all duration-300"
                  aria-label="Previous service"
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
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="shrink-0 px-3 transition-all duration-500"
                      style={{ width: `${100 / visibleCardsCount}%` }}
                    >
                      {/* Card container (Style 11 Interactive Banner replica) */}
                      <div
                        className="relative w-full h-[420px] rounded-xl overflow-hidden border border-white/5 group shadow-lg transition-all duration-500 bg-tmp-dark"
                      >
                        {/* Background Image & Overlay */}
                        <div className="absolute inset-0 w-full h-full">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover opacity-50 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 ease-out"
                          />
                          {/* Dark Overlay */}
                          <div className="absolute inset-0 bg-black/75 group-hover:bg-black/80 transition-all duration-500" />
                        </div>

                        {/* Inset Border (Style 11 characteristic) */}
                        <div className="absolute inset-5 border border-white/0 group-hover:border-tmp-gold/30 rounded-lg transition-all duration-500 z-10 pointer-events-none" />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-8 flex flex-col z-20 justify-center items-center text-center h-full">
                          {/* Label */}
                          <span className="text-tmp-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            Area of Practice
                          </span>

                          {/* Title */}
                          <h4 className="text-xl font-serif text-white font-medium mb-4 transform translate-y-2 group-hover:translate-y-[-6px] transition-transform duration-500 ease-out leading-snug px-2">
                            {service.title}
                          </h4>

                          {/* Description (fades and slides up on hover) */}
                          <p className="text-gray-300 text-xs leading-relaxed max-h-0 opacity-0 overflow-hidden group-hover:max-h-[180px] group-hover:opacity-100 transition-all duration-500 ease-in-out px-2 text-justify">
                            {service.description}
                          </p>
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
                  aria-label="Next service"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
                    <path d="M10 6l6 6-6 6V6z" />
                  </svg>
                </button>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* View All Button */}
        <ScrollReveal variant="fade-up" delay={0.2} className="text-center mt-12">
          <button
            suppressHydrationWarning
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-8 py-3 bg-transparent border border-tmp-gold text-tmp-gold hover:bg-tmp-gold hover:text-tmp-black font-bold uppercase tracking-widest text-xs rounded-sm transition-all duration-300 cursor-pointer"
          >
            {isExpanded ? "Show Less" : "View All Services"}
          </button>
        </ScrollReveal>
      </div>
    </section>
  );

  return content;
}
