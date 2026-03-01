export default function Services() {
  const services = [
    {
      title: "Konsultasi Hukum",
      description:
        "TMP Law Firm mampu membantu setiap klien baik perorangan maupun badan usaha, mencakup Konsultasi lisan maupun tertulis, Legal Opinion, Analis Risiko Hukum serta Strategi penyelesaian masalah hukum.",
    },
    {
      title: "Pendampingan dan \nPerwakilan atas \nPenanganan Perkara",
      description:
        "Pengacara kami sangat berpengalaman dalam memberikan jasa pendampingan hukum kepada klien dalam berbagai proses hukum, termasuk pendampingan dalam setiap negosiasi dan/atau mediasi, pemeriksaan pada Kepolisian/Kejaksaan dan instansi terkait serta pendampingan dan mewakili klien dalam persidangan di pengadilan.",
    },
    {
      title: "Litigasi",
      description:
        "Mewakili Klien dalam proses penyelesaian sengketa di Pengadilan, meliputi perkara perdata, perkara pidana, Hubungan Industrial (PHI), kepailitan dan PKPU, sengketa tanah dan properti.",
    },
    {
      title: "Non-Litigasi",
      description:
        "TMP Law Firm juga berpengalaman dalam penyelesaian sengketa di luar pengadilan melalui pendekatan hukum dan negosiasi, seperti Mediasi dan arbitrase, penyusunan surat somasi, penyelesaian sengketa secara damai serta pelaksanaan perjanjian perdamaian.",
    },
    {
      title: "Penyusunan dan Review Dokumen Hukum",
      description:
        "TMP Law Firm dikenal berpengalaman dalam penyusunan, analisa dan pemeriksaan dokumen hukum, meliputi Perjanjian/Kontrak Kerja, Memorandum of Understanding (MoU), Akta Perjanjian pendukung Notaris, Perjanjian Jual-Beli, sewa dan hibah serta kontrak bisnis dan perjanjian investasi.",
    },
    {
      title: "Hukum Pertanahan dan Properti",
      description:
        "Tim Pengacara kami sangat berpengalaman dalam memberikan layanan hukum terkait tanah dan properti, mencakup Sengketa Tanah, pendampingan jual-beli tanah/bangunan, PPJB dan AJB, pemeriksaan legalitas atas tanah serta pengurusan Balik Nama, Waris dan Hibah atas Tanah.",
    },
    {
      title: "Hukum Ketenagakerjaan",
      description:
        "Kami juga memberikan pelayanan jasa hukum bagi perusahaan maupun individu/pekerja, meliputi penyusunan PKWT/PKWTT, penyelesaian sengketa hubungan industrial, pemutusan hubungan kerja (PHK), pendampingan bipartit, tripartit, mediasi dan PHI serta memberikan nasihat hukum kepada perusahaan berkaitan dengan regulasi ketenagakerjaan.",
    },
    {
      title: "Retainer/Kuasa Hukum tetap Perusahaan",
      description:
        "Terkait pelayanan Jasa Hukum retainer, TMP Law Firm memberikan layanan terhadap Perusahaan, antara lain Konsultasi rutin, penyusunan kontrak bisnis, pendampingan kegiatan bisnis meliputi negosiasi dan transaksi, review dokumen legal perusahaan, serta sengketa perusahaan.",
    },
    {
      title: "Penyusunan dan Review Kontrak Bisnis Sektor Energi",
      description:
        "Sebagai salah bidang bisnis yang mengutamakan aspek legal, kami berpengalaman dalam pelaksanaan kontrak bisnis di bidang energi, termasuk namun tidak terbatas pada Kontrak Konsorsium, Joint Development Agreement (JDA), Engineering, Procurement dan Construction (EPC), Operating & Maintenance (O&M), Kontrak Pengadaan, Kerja Sama Operasi (KSO) hingga penyusunan legal risk assessment dalam proyek.",
    },
    {
      title: "Sektor Perbankan dan Lembaga Keuangan",
      description:
        "Memberikan layanan hukum terkait sektor perbankan dan struktur pembiayaan bisnis dan proyek, mencakup penyusunan dan review perjanjian pembiayaan (Leasing, factoring, consumer financing) atau perjanjian pinjaman (Loan Agreement), Perjanjian jaminan, Fidusia, Hak Tanggungan, Gadai, Saham, Restrukturisasi Hutang dan renegosiasi, serta penyelesaian sengketa baik melalui pengadilan, BPSK maupun BANI.",
    },
    {
      title: "Hukum Korporasi termasuk Merger & Akuisisi Perusahaan/Saham",
      description:
        "Memberikan layanan hukum dalam kegiatan usaha termasuk transaksi merger dan akuisisi, mencakup Pendirian badan usaha, Legal Due Diligence (LDD), Perjanjian-Perjanjian, PPJB dan AJB Pengambilalihan Saham, Penyusunan Struktur Transaksi, Penyusunan SPA-APA-JVA, pendampingan perizinan, penyusunan dokumen RUPS, perubahan Anggaran Dasar, Perjanjian Pemegang Saham (SHA) serta penyelesaian sengketa pasca akuisisi.",
    },
    {
      title: "Hukum Keluarga dan Waris",
      description:
        "TMP Law Firm juga berpengalaman dalam sengketa yang berkaitan dengan Hukum Keluarga termasuk Waris, antara lain Perceraian dan pembagian harta bersama, Hak Asuh Anak, Gugatan dan Permohonan di Pengadilan, sengketa waris dan perjanjian perkawinan.",
    },
  ];

  return (
    <section
      id="services"
      className="py-32 px-6 bg-tmp-black border-t border-white/5"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Our Services
          </h2>
          <h3 className="text-4xl font-serif italic mb-6">Area of Practice</h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            TMP Law Firm hadir menawarkan bantuan jasa hukum yang komprehensif
            kepada klien kami dengan motto: Trust - Strategy - Professional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-tmp-dark p-8 rounded-lg group hover:bg-[#1a1a1a] transition-all duration-300 border border-white/5 hover:border-tmp-gold/20 flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <h4 className="text-tmp-gold font-bold uppercase tracking-widest text-sm mb-4 min-h-[3rem] flex items-center justify-center text-center">
                {service.title}
              </h4>
              <p className="text-gray-400 text-xs leading-loose text-justify">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
