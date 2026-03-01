"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Lawyers from "@/components/sections/Lawyers";

import Services from "@/components/sections/Services";
import Clients from "@/components/sections/Clients";
import News from "@/components/sections/News";
import Contact from "@/components/sections/Contact";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });

    // Fix Next.js aggressive scroll-to-top on cross-route navigation
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      let attempts = 0;
      const scrollInterval = setInterval(() => {
        const element = document.getElementById(id);
        if (element) {
          // Add offset for the fixed navbar
          const topPos = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: topPos, behavior: 'smooth' });
          attempts++;
        }
        if (attempts > 5) {
          clearInterval(scrollInterval);
        }
      }, 150); // Try grabbing it 5 times within 750ms
    }
  }, []);

  return (
    <main className="bg-tmp-black min-h-screen text-white">

      <Hero />
      <About />
      <Lawyers />

      <Services />
      <Clients />
      <News />
      <Contact />
      <Footer />
    </main>
  );
}
