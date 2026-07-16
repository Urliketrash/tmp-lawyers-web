"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  const [heading, setHeading] = useState("Comprehensive Legal Services With Effective and Efficient.");
  const [p1, setP1] = useState("TMP Law Firm is a law firm established in Jakarta since 2021. TMP Law Firm is here to offer comprehensive legal assistance to our clients. The legal services provided cover various areas according to the needs and interests of clients, such as litigation, non-litigation, including commercial business areas for individuals/companies.");
  const [p2, setP2] = useState("TMP Law Firm will always meet client needs with optimal service in handling every legal case/issue using effective-efficient strategies to deliver the best results for our clients. The main objective of TMP Law Firm is to be a law firm capable of addressing clients' needs for all legal issues they face.");
  const [p3, setP3] = useState("This objective is supported by our experience in all aspects, starting from partners and associates who have experience in their respective areas of expertise. TMP Law Firm is capable of assisting with your legal issues with a professional team in fields such as Criminal Law, Civil Law, Business Law, Banking or Financial Services Law, Property Law, Tax Law, Capital Market Law, Employment Law, and Consumer Protection.");
  const [p4, setP4] = useState("We are also capable of providing Legal Services for every business activity of our clients as a preventive measure by identifying each regulation, analyzing risk management, and providing legal counsel so that clients can make the right decisions in conducting their business activities.");
  const [mottoDesc, setMottoDesc] = useState("To be a law firm capable of addressing clients' needs for all legal issues they face.");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const { data, error } = await supabase.from("site_settings").select("*");
        if (error) throw error;
        if (data) {
          data.forEach((item) => {
            if (item.key === "about_heading") setHeading(item.value);
            if (item.key === "about_p1") setP1(item.value);
            if (item.key === "about_p2") setP2(item.value);
            if (item.key === "about_p3") setP3(item.value);
            if (item.key === "about_p4") setP4(item.value);
            if (item.key === "about_motto_desc") setMottoDesc(item.value);
          });
        }
      } catch (e) {
        console.error("Error loading about data:", e);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <section id="about" className="py-32 px-6 bg-tmp-black">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal variant="fade-up" className="text-center mb-16">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Our Firm
          </h2>
          <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-white max-w-5xl mx-auto leading-relaxed">
            {heading}
          </h3>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal variant="fade-right">
            <div className="space-y-4 text-justify text-gray-400 text-sm leading-loose">
              {p1 && <p>{p1}</p>}
              {p2 && <p>{p2}</p>}
              {p3 && <p>{p3}</p>}
              {p4 && <p>{p4}</p>}
            </div>
          </ScrollReveal>
          <ScrollReveal
            variant="fade-left"
            className="bg-tmp-dark p-10 border-l-2 border-tmp-gold"
          >
            <h4 className="text-tmp-gold font-bold text-xs uppercase mb-4 tracking-widest">
              Motto
            </h4>
            <p className="text-2xl font-serif italic mb-4">
              &quot;Trust - Strategy - Professional&quot;
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              {mottoDesc}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
