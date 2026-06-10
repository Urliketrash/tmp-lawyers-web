import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-tmp-black">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal variant="fade-up" className="text-center mb-16">
          <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-4">
            Our Firm
          </h2>
          <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-white max-w-5xl mx-auto leading-relaxed">
            Comprehensive Legal Services With Effective and Efficient.
          </h3>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal variant="fade-right">
            <div className="space-y-4 text-justify text-gray-400 text-sm leading-loose">
              <p>
                TMP Law Firm merupakan firma hukum yang didirikan di Jakarta sejak 2021. TMP Law Firm hadir menawarkan bantuan jasa hukum yang komprehensif kepada klien kami. Jasa hukum yang disediakan mencakup berbagai area sesuai kebutuhan dan kepentingan klien, seperti area litigasi, non-litigasi, termasuk area bisnis komersil bagi individu/perusahaan.
              </p>
              <p>
                TMP Law Firm akan senantiasa memenuhi kebutuhan dengan pelayanan yang optimal dalam setiap penanganan perkara/permasalahan hukum dengan strategi yang efektif-efisien sehingga mampu memberikan hasil terbaik bagi klien. Tujuan utama TMP Law Firm yaitu menjadi firma hukum yang mampu menjawab kebutuhan klien atas segala permasalahan hukum yang dihadapi.
              </p>
              <p>
                Tujuan tersebut didukung dengan pengalaman kami pada segala aspek, mulai dari partner serta associates yang memiliki pengalaman dalam setiap bidang keahliannya. TMP Law Firm mampu membantu permasalahan hukum Anda dengan tim yang profesional dalam bidangnya seperti Hukum Pidana, Hukum Perdata, Hukum Bisnis, Hukum Perbankan atau Jasa Keuangan, Hukum Properti, Hukum Pajak, Hukum Pasar Modal, Hukum Ketenagakerjaan, dan Perlindungan Konsumen.
              </p>
              <p>
                Kami juga mampu memberikan Pelayanan Jasa Hukum pada setiap kegiatan bisnis klien dalam upaya preventif dengan melakukan identifikasi atas setiap regulasi, analisa pengelolaan risiko, dan memberikan pertimbangan hukum sehingga klien mampu mengambil keputusan yang tepat dalam pelaksanaan kegiatan bisnis.
              </p>
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
              Menjadi firma hukum yang mampu menjawab kebutuhan klien atas
              segala permasalahan hukum yang dihadapi.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
