import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Mohon isi semua kolom.");
      setStatus("idle");
      return;
    }

    try {
      // EmailJS Configuration
      const serviceID = "service_hostinger";
      const templateID = "template_mihzk1e";
      const publicKey = "qrrcpPi0u2kRsEHHJ";

      // Send email
      await emailjs.send(
        serviceID, 
        templateID, 
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
          to_email: "tmp@tmplawyers.com", // Target Email
        }, 
        publicKey
      );
      
      // Success state
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
      alert("Maaf, pesan gagal terkirim. Silakan coba lagi atau hubungi WhatsApp kami.");
    }
  };
  return (
    <section
      id="contact"
      className="py-32 px-6 bg-tmp-black border-t border-white/5"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2" data-aos="fade-right">
            <h2 className="text-4xl font-serif italic mb-10 text-white">
              Our Contact
            </h2>
            <p className="text-gray-400 text-sm mb-12 italic">
              Menerima tamu kapan saja untuk konsultasi profesional.
            </p>
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <i className="fas fa-map-marker-alt text-tmp-gold text-xl"></i>
                <p className="text-sm text-gray-400">
                  The Habibie Center, Lt 1, Jln. Kemang Selatan No. 98, Cilandak
                  Timur, Jakarta Selatan, 12560.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <i className="fab fa-whatsapp text-tmp-gold text-xl"></i>
                <a
                  href="https://wa.me/6281210054874"
                  target="_blank"
                  className="text-sm text-gray-300 font-bold tracking-widest hover:text-tmp-gold"
                >
                  0812-1005-4874
                </a>
              </div>
              <div className="flex items-center gap-6">
                <i className="fas fa-globe text-tmp-gold text-xl"></i>
                <a
                  href="http://www.tmplawyers.com"
                  target="_blank"
                  className="text-sm text-gray-300 font-bold tracking-widest hover:text-tmp-gold"
                >
                  www.tmplawyers.com
                </a>
              </div>
              <div className="flex items-center gap-6">
                <i className="fab fa-instagram text-tmp-gold text-xl"></i>
                <a
                  href="https://www.instagram.com/tmplawfirm"
                  target="_blank"
                  className="text-sm text-gray-300 font-bold tracking-widest hover:text-tmp-gold"
                >
                  @tmplawfirm
                </a>
              </div>
            </div>
            <div className="mt-10" data-aos="fade-up">
              <div>
                <a
                  href="https://maps.google.com/?q=The+Habibie+Center,+Jl.+Kemang+Selatan+No.98,+Jakarta+Selatan"
                  target="_blank"
                  className="block cursor-pointer"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.498!2d106.8128!3d-6.2606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b%3A0x1234567890abcdef!2sThe%20Habibie%20Center%2C%20Jl.%20Kemang%20Selatan%20No.98%2C%20Jakarta%20Selatan!5e0!3m2!1sen!2sid!4v1703123456789!5m2!1sen!2sid"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=The+Habibie+Center,+Jl.+Kemang+Selatan+No.98,+Jakarta+Selatan"
                  target="_blank"
                  className="mt-3 inline-block px-5 py-2 bg-tmp-gold text-black font-bold rounded shadow hover:bg-yellow-400 transition"
                >
                  Dapatkan Rute
                </a>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2" data-aos="fade-left">
            {status === "success" ? (
              <div className="bg-white/5 border border-white/10 p-8 rounded-lg text-center animate-fade-in">
                <div className="w-16 h-16 bg-tmp-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-tmp-gold text-2xl"></i>
                </div>
                <h3 className="text-2xl font-serif italic text-white mb-4">
                  Pesan Terkirim!
                </h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Terima kasih telah menghubungi kami. Tim kami akan segera meninjau pesan Anda dan memberikan balasan secepatnya.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-tmp-gold text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 p-5 outline-none transition-all duration-400 text-white text-sm focus:border-tmp-gold focus:bg-white/5"
                  placeholder="Full Name"
                  disabled={status === "sending"}
                  required
                  suppressHydrationWarning
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 p-5 outline-none transition-all duration-400 text-white text-sm focus:border-tmp-gold focus:bg-white/5"
                  placeholder="Email Address"
                  disabled={status === "sending"}
                  required
                  suppressHydrationWarning
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 p-5 outline-none transition-all duration-400 text-white text-sm focus:border-tmp-gold focus:bg-white/5"
                  rows={6}
                  placeholder="How can we help you?"
                  disabled={status === "sending"}
                  required
                  suppressHydrationWarning
                ></textarea>
                <button 
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-tmp-gold text-black font-extrabold uppercase tracking-[0.2em] py-5 px-12 w-full text-sm transition-all duration-400 hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(197,160,89,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  suppressHydrationWarning
                >
                  {status === "sending" ? "Mengirim..." : "Kirimkan Pertanyaan"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
