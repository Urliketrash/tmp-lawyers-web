export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-tmp-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div data-aos="fade-right">
            <h2 className="text-tmp-gold text-xs font-bold uppercase tracking-[0.5em] mb-6">
              Our Firm
            </h2>
            <h3 className="text-4xl font-serif italic mb-10 text-white">
              Sejak 2021
            </h3>
            <p className="text-gray-400 text-sm leading-loose mb-6 text-justify">
              Law Firm Tao Manullang & Partners hadir menawarkan bantuan jasa
              hukum komprehensif mencakup area litigasi, non-litigasi, dan area
              bisnis komersil bagi individu/perusahaan.
            </p>
            <p className="text-gray-400 text-sm leading-loose text-justify">
              Kami melakukan upaya preventif dengan identifikasi regulasi,
              analisa pengelolaan resiko, dan memberikan pertimbangan hukum
              sehingga klien mampu mengambil keputusan tepat.
            </p>
          </div>
          <div
            className="bg-tmp-dark p-10 border-l-2 border-tmp-gold"
            data-aos="fade-left"
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
          </div>
        </div>
      </div>
    </section>
  );
}
