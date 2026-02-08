"use client";

import { useState } from "react";
import Image from "next/image";

export default function Founder() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="founder"
      className="py-32 px-6 bg-tmp-black border-t border-white/5"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/3" data-aos="zoom-in">
            <div className="p-2">
              <div className="aspect-[4/5] flex items-center justify-center relative overflow-hidden group">
                {/* Placeholder for local image */}
                <Image
                  src="/assets/founder_v2.png"
                  alt="Wang Tao Bicton Manullang, S.H."
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-2/3" data-aos="fade-up">
            <h4 className="text-tmp-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-4">
              Founder
            </h4>
            <h2 className="text-4xl font-serif italic text-white mb-6">
              Wang Tao Bicton Manullang, S.H.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 text-justify">
              Alumni FH Universitas Katolik Parahyangan. Ahli dalam negosiasi,
              penulisan hukum, dan transaksi bisnis energi (Konsorsium, JDA,
              EPC, O&M) serta M&A.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 text-justify italic">
              Dipercaya sebagai Advokat dan Konsultan Hukum pada beberapa
              instansi Kementerian dan BUMN. Aktif sebagai Ketua GMKI Bandung
              dan Wakil Ketua KNPI.
            </p>

            {isExpanded && (
              <div className="animate-fade-in">
                <p className="text-gray-400 text-sm leading-relaxed mb-8 text-justify">
                  Merupakan Advokat sekaligus Founder. Wang Tao merupakan Alumni
                  Fakultas Hukum Universitas Katolik Parahyangan yang telah
                  menggeluti dunia hukum sejak 2018. Wang Tao pernah meraih
                  prestasi penghargaan dan kejuaraan diantaranya: Sidang Semu
                  MPR & Constitutional Drafting Padjadjaran Law Fair (2015),
                  Kompetisi Debat UNPAR (2014), Business Law Competition
                  Universitas Indonesia (2016) dan UNSC Bali World Model United
                  Nation Udayana Bali (2017). Hal tersebut membuat Wang Tao
                  membuatnya dikenal ahli dalam negosiasi, penulisan hukum dan
                  transaksi bisnis. Selama berprofesi sebagai Advokat, Wang Tao
                  memiliki spesialisasi terfokus bidang hukum Bisnis/Perusahaan
                  (Corporate Lawyer) secara umum dan kejahatan bisnis secara
                  khusus, serta upaya preventif pada setiap kegiatan bisnis dan
                  permasalahan hukum publik/privat. Hal ini membuat Wang Tao
                  dipercaya sebagai Advokat dan Konsultan Hukum pada beberapa
                  instansi Kementerian dan BUMN, serta dipercaya mewakili klien
                  dalam menyusun setiap kontrak. dalam hal ini sebagai
                  negosiator pada transaksi bisnis dibidang energi dan
                  konstruksi seperti pada proyek-proyek pembangkit (Konsorsium,
                  JDA, EPC, O&M) serta kontrak bisnis dalam kegiatan bisnis
                  perbankan/pembiayaan dan asuransi termasuk M&A. Wang Tao juga
                  aktif dan pernah berkarir dalam organisasi eksternal antara
                  lain: Ketua GMKI Bandung, Alumni FH UNPAR serta Wakil Ketua
                  KNPI. Oleh karena itu, Wang Tao dikenal sebagai sosok Lawyer
                  yang energik dan profesional.
                </p>
              </div>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-tmp-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mt-6"
              suppressHydrationWarning
            >
              {isExpanded ? "Tutup" : "Lihat Selengkapnya"}
            </button>

            <div className="grid grid-cols-2 gap-4 text-[9px] text-tmp-gold uppercase tracking-[0.2em] font-bold mt-8">
              <div className="border border-tmp-gold/20 p-3">
                Sidang Semu MPR & Constitutional Drafting Padjadjaran Law Fair
                2015
              </div>
              <div className="border border-tmp-gold/20 p-3">
                Kompetisi Debat UNPAR 2014
              </div>
              <div className="border border-tmp-gold/20 p-3">
                UI Business Law Comp 2016
              </div>
              <div className="border border-tmp-gold/20 p-3">
                World MUN Udayana 2017
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
