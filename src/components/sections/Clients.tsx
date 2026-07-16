"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/lib/supabase";

const defaultTopClients = [
  "PT. Asuransi Allianz Utama Indonesia",
  "PT. Asuransi Allianz Life Indonesia",
  "Ministry of Marine Affairs and Fisheries (KKP)",
  "Astra Sedaya Finance (ACC)",
  "PT Apca Tirta Engineering",
  "PT Bank Raya Indonesia (BRI Agro)",
  "Kredit Plus (PT KB Finansia Multi Finance)",
  "Nusantara Energy Ltd (Malaysia)",
];

const defaultOtherClients = [
  "PT Culturo Integra Niaga",
  "PT. Gramedia",
  "Insan Sejahtera Group (Leasing, Cooperatives and Property)",
  "PT Barless Darya Aguna Barikan",
  "PT KPM Oil & Gas",
  "Aston Hotel",
  "PT PSW Hotel",
  "JDA Papua Utara Cluster PT PLN EPI",
  "KSO Luwuk 40 MW PLTMG Project PT PLN Persero",
  "Nusa Tenggara LNG Consortium PT PLN EPI",
  "KSO ITC PLTMG-PLTG-PLTGU Project 3 x 200 MW PT PLN Batam",
];

export default function Clients() {
  const [topClients, setTopClients] = useState<string[]>(defaultTopClients);
  const [otherClients, setOtherClients] = useState<string[]>(defaultOtherClients);

  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        const { data, error } = await supabase.from("site_settings").select("*");
        if (error) throw error;
        if (data) {
          const topItem = data.find((row) => row.key === "clients_top");
          const otherItem = data.find((row) => row.key === "clients_other");

          if (topItem && topItem.value) {
            const parsed = JSON.parse(topItem.value);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setTopClients(parsed);
            }
          }
          if (otherItem && otherItem.value) {
            const parsed = JSON.parse(otherItem.value);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setOtherClients(parsed);
            }
          }
        }
      } catch (e) {
        console.error("Error loading clients from database:", e);
      }
    };
    fetchClientsData();
  }, []);

  return (
    <section
      id="clients"
      className="py-32 px-6 bg-tmp-black border-t border-white/5"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Top Clients - 4x2 Grid */}
        <ScrollReveal variant="fade-up" className="text-center mb-12">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Our Clients
          </h2>
          <h3 className="text-4xl font-serif italic text-white">Our Top Clients</h3>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {topClients.map((client, index) => (
            <ScrollReveal
              key={index}
              variant="fade-up"
              delay={index * 0.05}
              className="border border-white/10 bg-tmp-dark p-6 md:p-8 flex items-center justify-center text-center rounded hover:border-tmp-gold/50 transition-colors duration-300 group min-h-[120px]"
            >
              <span className="text-gray-300 text-[10px] md:text-xs font-bold uppercase tracking-widest group-hover:text-white leading-relaxed">
                {client}
              </span>
            </ScrollReveal>
          ))}
        </div>

        {/* Other Clients - Grid */}
        <div className="border-t border-white/5 pt-16">
          <ScrollReveal variant="fade-up" className="text-center mb-12">
            <h3 className="text-3xl font-serif italic text-white mb-4">
              Our Clients & Legal Assistance for Projects
            </h3>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {otherClients.map((client, index) => (
              <ScrollReveal
                key={index}
                variant="fade-up"
                delay={index * 0.03}
                className="border border-white/10 bg-tmp-dark p-6 md:p-8 flex items-center justify-center text-center rounded hover:border-tmp-gold/50 transition-colors duration-300 group min-h-[120px]"
              >
                <span className="text-gray-300 text-[10px] md:text-xs font-bold uppercase tracking-widest group-hover:text-white leading-relaxed">
                  {client}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
