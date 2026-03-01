export default function Clients() {
  const topClients = [
    "PT. Asuransi Allianz Utama Indonesia",
    "PT. Asuransi Allianz Life Indonesia",
    "Kementerian Kelautan dan Perikanan (KKP)",
    "Astra Sedaya Finance (ACC)",
    "PT Apca Tirta Engineering",
    "PT Bank Raya Indonesia (BRI Agro)",
    "Kredit Plus (PT KB Finansia Multi Finance)",
    "Nusantara Energy Ltd (Malaysia)",
  ];

  const otherClients = [
    "PT Culturo Integra Niaga",
    "PT. Gramedia",
    "Insan Sejahtera Group (Leasing, Koperasi dan Property)",
    "PT Barless Darya Aguna Barikan",
    "PT KPM Oil & Gas",
    "Aston Hotel",
    "PT PSW Hotel",
    "JDA Papua Utara Cluster PT PLN EPI",
    "KSO Proyek PLTMG Luwuk 40 MW PT PLN Persero",
    "Konsorsium LNG Nusa Tenggara PT PLN EPI",
    "KSO Proyek ITC PLTMG-PLTG-PLTGU 3 x 200 MW PT PLN Batam",
  ];

  return (
    <section
      id="clients"
      className="py-32 px-6 bg-tmp-black border-t border-white/5"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Top Clients - 4x2 Grid */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Our Clients
          </h2>
          <h3 className="text-4xl font-serif italic text-white">Our Top Clients</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {topClients.map((client, index) => (
            <div
              key={index}
              className="border border-white/10 bg-tmp-dark p-6 md:p-8 flex items-center justify-center text-center rounded hover:border-tmp-gold/50 transition-colors duration-300 group min-h-[120px]"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <span className="text-gray-300 text-[10px] md:text-xs font-bold uppercase tracking-widest group-hover:text-white leading-relaxed">
                {client}
              </span>
            </div>
          ))}
        </div>

        {/* Other Clients - Grid layout matching Top Clients */}
        <div className="border-t border-white/5 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif italic text-white mb-4">Our Clients & Legal Assistance for Projects</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {otherClients.map((client, index) => (
                <div
                  key={index}
                  className="border border-white/10 bg-tmp-dark p-6 md:p-8 flex items-center justify-center text-center rounded hover:border-tmp-gold/50 transition-colors duration-300 group min-h-[120px]"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <span className="text-gray-300 text-[10px] md:text-xs font-bold uppercase tracking-widest group-hover:text-white leading-relaxed">
                    {client}
                  </span>
                </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
}
