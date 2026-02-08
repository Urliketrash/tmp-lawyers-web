"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Founder from "@/components/sections/Founder";
import Lawyers from "@/components/sections/Lawyers";

import Services from "@/components/sections/Services";
import Clients from "@/components/sections/Clients";
import Contact from "@/components/sections/Contact";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <main className="bg-tmp-black min-h-screen text-white">

      <Hero />
      <About />
      <Founder />
      <Lawyers />

      <Services />
      <Clients />
      <Contact />
      <Footer />
    </main>
  );
}
