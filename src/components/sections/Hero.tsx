"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <header
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-6 relative bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(5,5,5,0.88), rgba(5,5,5,1)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
      }}
    >
      <div className="max-w-5xl text-center" data-aos="fade-up">
        <div className="inline-block border-y border-tmp-gold py-2 px-6 mb-8">
          <p className="text-tmp-gold tracking-[0.5em] text-[10px] uppercase font-bold italic">
            Trust • Strategy • Professional
          </p>
        </div>
        <h1 className="text-5xl md:text-8xl font-serif italic mb-8 leading-tight">
          Advocate & <br />
          <span className="text-tmp-gold not-italic">Counsellor</span> at Law
        </h1>
        <p className="text-gray-400 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
          Menyediakan bantuan jasa hukum komprehensif sejak 2021 dengan
          pelayanan optimal dan strategi efektif-efisien.
        </p>
        <Link
          href="#contact"
          className="bg-tmp-gold text-black font-extrabold uppercase tracking-[0.2em] py-5 px-12 transition-all duration-400 inline-block hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(197,160,89,0.2)] relative z-20 cursor-pointer"
          suppressHydrationWarning
        >
          Konsultasi Sekarang
        </Link>
      </div>
    </header>
  );
}
