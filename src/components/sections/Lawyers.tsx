"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Lawyer = {
  id: string;
  name: string;
  role: string;
  image: string;
  shortDesc: string;
  italicDesc: string;
  biography?: string;
  education?: string[];
  experience?: string[];
  skills?: string[];
};

const lawyersData: Lawyer[] = [
  {
    id: "founder",
    name: "Wang Tao Bicton Manullang, S.H.",
    role: "FOUNDER & MANAGING PARTNER",
    image: "/assets/founder_v2.png",
    shortDesc:
      "Merupakan Advokat sekaligus Founder. Wang Tao merupakan Alumni Fakultas Hukum Universitas Katolik Parahyangan. Ia dikenal ahli sebagai konseptor dalam menangani setiap perkara, negosiasi, penulisan hukum, dan transaksi bisnis.",
    italicDesc:
      "Dipercaya sebagai Advokat dan Konsultan Hukum pada beberapa instansi Kementerian dan BUMN.",
    biography: "Merupakan Advokat sekaligus Founder. Wang Tao merupakan Alumni Fakultas Hukum Universitas Katolik Parahyangan. Wang Tao pernah meraih prestasi penghargaan diantaranya: Sidang Semu MPR & Constitutional Drafting Padjadjaran Law Fair (2015), Kompetisi Debat UNPAR (2014), Bussiness Law Competition Universitas Indonesia (2016) dan UNSC Bali World Model United Nation Udayana Bali (2017). Hal tersebut membuat Wang Tao dikenal ahli sebagai konseptor dalam menangani setiap perkara, negosiasi, penulisan hukum dan transaksi bisnis.\n\nSelama berprofesi sebagai Advokat dan berkarir di TMP Law Firm, Wang Tao memiliki spesialisasi terfokus bidang hukum Bisnis/Perusahaan secara umum dan kejahatan bisnis secara khusus, serta upaya preventif pada setiap kegiatan bisnis dan permasalahan hukum publik/privat. Hal ini membuat Wang Tao dipercaya sebagai Advokat dan Konsultan Hukum pada beberapa instansi Kementerian dan BUMN, serta dipercaya mewakili klien dalam menyusun setiap regulasi dan kontrak. Wang Tao juga kerap dipercaya negosiator pada transaksi bisnis diantaranya dibidang energi dan konstruksi seperti pada proyek-proyek pembangkit (Konsorsium, JDA, EPC, O&M) yang bekerja sama dengan PT PLN Persero dan Pertamina, konsultan pada pelaksanaan kontrak bisnis perbankan/ jasa pembiayaan oleh Bank BUMN maupun Swasta termasuk bidang asuransi serta berpengalaman pada kegiatan bisnis M&A.\n\nWang Tao juga aktif dan pernah berkarir dalam organisasi eksternal antara lain : Ketua GMKI Bandung, Ilumni FH UNPAR serta Wakil Ketua KNPI. Oleh karena itu, Wang Tao dikenal sebagai sosok Lawyer yang energik dan profesional.",
    education: [
      "Sarjana Hukum, Universitas Katolik Parahyangan"
    ],
    experience: [
      "Founder & Managing Partner, Tao Manullang & Partners",
      "Ketua GMKI Bandung",
      "Ilumni FH UNPAR",
      "Wakil Ketua KNPI"
    ],
    skills: ["CORPORATE LAW", "ENERGY & CONSTRUCTION", "MERGERS & ACQUISITIONS", "BUSINESS CRIME DEFENSE", "NEGOTIATION"]
  },
  {
    id: "ronaldo",
    name: "H Ronaldo Munthe, S.H.",
    role: "PARTNER",
    image: "/assets/lawyers 2.png",
    shortDesc:
      "Advokat dan Konsultan Hukum. Alumni FH Universitas Bandar Lampung. Berpengalaman dalam Litigasi dan Non-Litigasi, Sengketa Pertanahan, serta pendampingan korban kekerasan (Komnas PPA).",
    italicDesc:
      "Spesialisasi dalam Litigasi, Pidana, Perdata, dan penyelesaian sengketa secara persuasif.",
    biography: "H Ronaldo Munthe, S.H. merupakan Advokat dan Konsultan Hukum dan Partner pada TMP Law Firm, yang juga merupakan Alumni Fakultas Hukum Universitas Bandar Lampung, dengan latar belakang akademik yang kuat serta prestasi Juara Kompetisi Peradilan Semu Tingkat Nasional dan keterlibatan aktif khususnya dalam Moot Court Community (Peradilan Semu) maupun kegiatan organisasi hingga saat ini, yang menjadi fondasi penting dalam membentuk pola pikir yuridis, serta kemampuan analisis hukum yang terstruktur dan argumentatif yang terus dijaga dan diimplementasikan secara konsisten dalam praktik hukum profesional.\n\nSejak terjun dalam praktik hukum sejak 2021 dan berprofesi sebagai Advokat, tak jarang Ronaldo diminta untuk membuatkan kontrak-kontrak bisnis demi mengantisipasi masalah hukum di kemudian hari, selain itu fokus penanganan dan penyelesaian perkara yang telah ditangani adalah Litigasi dan Non-Litigasi, meliputi Pidana, Perdata, Sengketa Pertanahan dan/atau Property, mendampingi korban kekerasan di Komnas Perlindungan Perempuan dan Anak (Komnas PPA) sebagai wujud sosial profesi, serta pernah menangani perkara PKPU dan Kepailitan, Sengketa Pajak, Perizinan serta berkaitan dengan Imigrasi dan terkait dengan Hukum Medis hingga yang berkaitan dengan Hukum Waris.\n\nSelain pendekatan yuridis formal, dalam setiap permasalahan hukum selalu diupayakan langkah awal berupa mediasi dan penyelesaian secara persuasif dengan pendekatan humanis, khususnya dalam perkara-perkara yang berkaitan dengan hubungan keluarga dan kepentingan sosial. Hingga saat ini Ronaldo juga masih dipercaya untuk menjalankan amanat hukum berupa pengurusan dan pengawasan dalam pelaksanaan wasiat, sebagai bentuk kepercayaan klien atas profesionalisme dan tanggung jawab untuk menjunjung integritas tinggi dalam profesi.",
    education: [
      "Sarjana Hukum, Universitas Bandar Lampung"
    ],
    experience: [
      "Partner, TMP Law Firm (2021-sekarang)",
      "Pendamping Korban, Komnas Perlindungan Perempuan dan Anak (Komnas PPA)"
    ],
    skills: ["LITIGATION & NON-LITIGATION", "CRIMINAL & CIVIL LAW", "LAND DISPUTE", "MEDICAL LAW", "BANKRUPTCY & PKPU"]
  },
  {
    id: "yudis",
    name: "Yudis Arya Bramasta, S.H.",
    role: "ASSOCIATE",
    image: "/assets/lawyers 3.png",
    shortDesc:
      "Advokat dan anggota PERADI. Associate Lawyer di TMP Law Firm. Alumni FH Universitas Pendidikan Ganesha. Spesialisasi dalam Legal Due Diligence, hukum pidana & perdata korporasi.",
    italicDesc:
      "Keahlian mencakup penyusunan opini hukum strategis dan mitigasi risiko hukum bagi klien individu maupun korporasi.",
    biography: "Yudis Arya Bramasta, S.H. adalah seorang Advokat dan anggota Perhimpunan Advokat Indonesia (PERADI) yang menjabat sebagai Associate Lawyer di TMP Law Firm. Alumnus Fakultas Hukum Universitas Pendidikan Ganesha ini memiliki latar belakang organisasi yang kuat dan pengalaman luas sebagai tim legal korporasi. Keahliannya mencakup penyusunan opini hukum strategis hingga pelaksanaan Legal Due Diligence (uji tuntas hukum) yang mendalam untuk memitigasi risiko hukum bagi klien individu maupun korporasi.\n\nDalam praktik hukum pidana, Yudis menangani perkara Pidana Umum seperti pencurian, penggelapan, dan penipuan, termasuk kejahatan korporasi serta memiliki spesialisasi pada Pidana Khusus yang meliputi kejahatan siber (cyber crime), narkotika, perlindungan perempuan dan anak, hingga tindak pidana minyak dan gas bumi. Ketajaman analisisnya dalam menangani kasus-kasus teknis ini menjadikannya praktisi yang andal dalam menghadapi dinamika hukum pidana yang kompleks, baik di dalam maupun di luar persidangan.\n\nDi bidang perdata, Yudis berpengalaman sebagai konsultan hukum dan pengacara perusahaan terkhusus dalam penyelesaian sengketa korporasi dibidang Jasa Keuangan seperti Leasing, Bank dan Koperasi. Termasuk pernah menangani permasalahan hukum jasa keuangan yang berkaitan dengan restrukturisasi pembiayaan pada Bank BUMN, Swasta maupun Syariah. Yudis juga memiliki keahlian pada Perdata Khusus. Spesialisasinya mencakup Hak Kekayaan Intelektual (HKI) seperti Merek, Paten, Hak Cipta, dan Merek Indikasi Geografis (MIG), perkara PKPU/Kepailitan, perlindungan konsumen pada bidang bisnis properti. Dengan pendekatan yang profesional dan solutif, Yudis berkomitmen memberikan perlindungan hukum yang presisi dan berstandar tinggi bagi setiap kliennya.",
    education: [
      "Sarjana Hukum, Universitas Pendidikan Ganesha"
    ],
    experience: [
      "Associate Lawyer, TMP Law Firm"
    ],
    skills: ["LEGAL DUE DILIGENCE", "CORPORATE LAW", "CYBER CRIME", "INTELLECTUAL PROPERTY (HKI)", "BANKRUPTCY & PKPU"]
  },
  {
    id: "fadil",
    name: "Fadil Taufiq, S.H.",
    role: "ASSOCIATE",
    image: "/assets/lawyers 4.png",
    shortDesc:
      "Konsultan Hukum & Associate Lawyer TMP Law Firm. Alumni FH UNPAR. Berpengalaman di bidang pengadaan, bisnis F&B, dan pendampingan hukum UMKM.",
    italicDesc:
      "Fokus pada Litigasi & Non-Litigasi, Hukum Komersial, Perikatan, Ketenagakerjaan, dan Kejahatan ITE.",
    biography: "Fadil Taufiq, S.H. Konsultan Hukum yang menjabat sebagai Associate Lawyer pada TMP Law Firm ini merupakan Alumni Fakultas Hukum Universitas Katolik Parahyangan Bandung yang aktif dalam berbagai kegiatan organisasi swasta seperti organisasi yang bergerak di bidang pengadaan ruang belajar dan mengajar gratis untuk orang umum serta sempat turut aktif dalam menjalani karir sebagai Konsultan dalam berbagai bidang usaha terutama bidang usaha Food & Beverage. Hal tersebut membuat Fadil Taufiq dikenal bukan hanya pada bidang Hukum namun juga pada bidang pembentukan Usaha Mandiri dalam kelas Usaha Mikro Kecil dan Menengah.\n\nDengan pemikiran praktisnya dalam karir hukumnya juga dalam perjalanan profesionalnya, Fadil Taufiq memiliki pengalaman sebagai pada perusahaan yang secara aktif seperti pendampingan perkara, memberikan pendapat hukum dan membantu membentuk dokumen hukum yang sesuai seperti kontrak dagang, kontrak Kerjasama, perizinan, dan sebagainya.\n\nSebagai Associate Lawyer dari TMP Law Firm, Fadil Taufiq fokus pada penyelesaian masalah dalam lingkup Litigasi dan Non-Litigasi, baik Perdata maupun Pidana secara umum, seperti menangani penyelesaian kasus dalam bidang hukum seperti Criminal Law, Commercial Law, Hukum Waris, Hukum Perikatan, Ketenagakerjaan dan Hukum Perbankan dan Kejahatan berbasis ITE.",
    education: [
      "Sarjana Hukum, Universitas Katolik Parahyangan"
    ],
    experience: [
      "Associate Lawyer, TMP Law Firm",
      "Konsultan Hukum Bisnis (F&B & UMKM)"
    ],
    skills: ["LITIGATION & NON-LITIGATION", "COMMERCIAL LAW", "CONTRACT DRAFTING", "ITE LAW", "LABOR LAW"]
  },
];

export default function Lawyers() {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  useEffect(() => {
    if (selectedLawyer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedLawyer]);

  return (
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
          {lawyersData.map((lawyer, index) => (
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
                Lawyer
              </h4>
              <h3 className="text-xl font-serif italic text-white mb-4 min-h-[3.5rem] flex items-center">
                {lawyer.name}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-3 text-justify line-clamp-3 min-h-[3.75rem]">
                {lawyer.shortDesc}
              </p>
              <button
                onClick={() => setSelectedLawyer(lawyer)}
                className="text-tmp-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mt-auto pt-4"
                suppressHydrationWarning
              >
                Lihat Selengkapnya
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lawyer Modal - Redesigned */}
      {selectedLawyer && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
          <div className="bg-black border border-white/10 max-w-4xl w-full relative animate-fade-in shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedLawyer(null)}
              className="absolute top-10 right-8 text-white text-4xl hover:text-tmp-gold transition-colors z-50"
            >
              &times;
            </button>
            
            <div className="flex flex-col items-center pt-12 pb-8 px-8 md:px-16 text-center border-b border-white/10">
                 <div className="relative w-40 h-52 md:w-48 md:h-64 mb-8 shadow-2xl">
                    <Image 
                        src={selectedLawyer.image} 
                        alt={selectedLawyer.name} 
                        fill 
                        className="object-cover"
                    />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-3">
                    {selectedLawyer.name}
                 </h2>
                 <h3 className="text-white font-bold uppercase tracking-[0.2em] text-sm md:text-base">
                    {selectedLawyer.role}
                 </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-12 p-8 md:p-16 text-left">
                {/* Left Column */}
                <div className="space-y-8">
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Biografi</h4>
                        <p className="text-gray-400 text-sm leading-loose text-justify whitespace-pre-line">
                            {selectedLawyer.biography}
                        </p>
                    </div>
                    <div>
                         <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Pendidikan</h4>
                         <ul className="text-gray-400 text-sm leading-loose space-y-2">
                            {selectedLawyer.education?.map((edu, idx) => (
                                <li key={idx}>• {edu}</li>
                            ))}
                         </ul>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                     <div>
                         <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Pengalaman</h4>
                         <ul className="text-gray-400 text-sm leading-loose space-y-2">
                            {selectedLawyer.experience?.map((exp, idx) => (
                                <li key={idx}>• {exp}</li>
                            ))}
                         </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Keahlian</h4>
                        <div className="flex flex-wrap gap-3">
                             {selectedLawyer.skills?.map((skill, idx) => (
                                 <span key={idx} className="text-[10px] font-bold uppercase tracking-widest text-tmp-gold border border-tmp-gold/30 px-3 py-1">
                                    {skill}
                                 </span>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
