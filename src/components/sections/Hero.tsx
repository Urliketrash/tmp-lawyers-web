"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <header
      id="home"
      className="min-h-[100svh] flex items-center justify-center pt-20 px-6 relative overflow-hidden"
    >
      {/* Background Image using Next/Image for better control */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black z-10" />
        <Image
          src="/assets/hero-statue.jpg"
          alt="Lady Justice Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      <div className="max-w-5xl text-center relative z-20" data-aos="fade-up">
        <div className="inline-block border-y border-tmp-gold py-2 px-6 mb-8">
          <p className="text-tmp-gold tracking-[0.5em] text-[10px] uppercase font-bold italic">
            Trust • Strategy • Professional
          </p>
        </div>
        <h1 className="text-4xl md:text-8xl font-serif italic mb-6 md:mb-8 leading-tight">
          Advocate & <br />
          <span className="text-tmp-gold not-italic">Counsellor</span> at Law
        </h1>
        <p className="text-gray-400 text-xs md:text-lg max-w-4xl mx-auto leading-relaxed mb-8 md:mb-12">
          Menyediakan bantuan jasa hukum komprehensif dengan
          pelayanan optimal dan strategi <span className="whitespace-nowrap">efektif-efisien</span>.
        </p>
        <Link
          href="#contact"
          className="bg-tmp-gold text-black font-extrabold uppercase tracking-[0.2em] py-4 px-8 md:py-5 md:px-12 text-xs md:text-base transition-all duration-400 inline-block hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(197,160,89,0.2)] relative z-20 cursor-pointer"
          suppressHydrationWarning
        >
          Konsultasi Sekarang
        </Link>
      </div>
    </header>
  );
}
