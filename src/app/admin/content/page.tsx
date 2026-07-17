"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface ServiceItem {
  title: string;
  image: string;
  description: string;
}

export default function ContentManagerPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "about" | "services" | "clients" | "lawyers" | "contact">("home");
  const router = useRouter();

  // Loading & Saving States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Home (Hero) states
  const [homeHeroTitle, setHomeHeroTitle] = useState("");
  const [homeHeroDesc, setHomeHeroDesc] = useState("");
  const [homeHeroCta, setHomeHeroCta] = useState("");

  // About states
  const [aboutHeading, setAboutHeading] = useState("");
  const [aboutP1, setAboutP1] = useState("");
  const [aboutP2, setAboutP2] = useState("");
  const [aboutP3, setAboutP3] = useState("");
  const [aboutP4, setAboutP4] = useState("");
  const [aboutMottoDesc, setAboutMottoDesc] = useState("");

  // Contact & Social states
  const [contactWhatsapp, setContactWhatsapp] = useState("");
  const [contactEmailTo, setContactEmailTo] = useState("");
  const [contactLinkedin, setContactLinkedin] = useState("");
  const [contactInstagram, setContactInstagram] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contactMapsEmbed, setContactMapsEmbed] = useState("");

  // Services states
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [newService, setNewService] = useState<ServiceItem>({ title: "", image: "", description: "" });
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);

  // Clients states
  const [topClients, setTopClients] = useState<string[]>([]);
  const [newTopClient, setNewTopClient] = useState("");
  const [otherClients, setOtherClients] = useState<string[]>([]);
  const [newOtherClient, setNewOtherClient] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("site_settings").select("*");
        if (error) throw error;

        if (data) {
          // Default fallbacks (in English as translated previously)
          let heroTitle = "Advocate & Counsellor at Law";
          let heroDesc = "Providing comprehensive legal assistance with optimal support and effective-efficient strategies.";
          let heroCta = "Consult Now";

          let heading = "Comprehensive Legal Services With Effective and Efficient.";
          let p1 = "TMP Law Firm is a law firm established in Jakarta since 2021. TMP Law Firm is here to offer comprehensive legal assistance to our clients. The legal services provided cover various areas according to the needs and interests of clients, such as litigation, non-litigation, including commercial business areas for individuals/companies.";
          let p2 = "TMP Law Firm will always meet client needs with optimal service in handling every legal case/issue using effective-efficient strategies to deliver the best results for our clients. The main objective of TMP Law Firm is to be a law firm capable of addressing clients' needs for all legal issues they face.";
          let p3 = "This objective is supported by our experience in all aspects, starting from partners and associates who have experience in their respective areas of expertise. TMP Law Firm is capable of assisting with your legal issues with a professional team in fields such as Criminal Law, Civil Law, Business Law, Banking or Financial Services Law, Property Law, Tax Law, Capital Market Law, Employment Law, and Consumer Protection.";
          let p4 = "We are also capable of providing Legal Services for every business activity of our clients as a preventive measure by identifying each regulation, analyzing risk management, and providing legal counsel so that clients can make the right decisions in conducting their business activities.";
          let mottoDesc = "To be a law firm capable of addressing clients' needs for all legal issues they face.";

          let whatsapp = "0812-1005-4874";
          let emailTo = "tmp@tmplawyers.com";
          let linkedin = "https://www.linkedin.com/company/law-firm-tao-manullang-partners/";
          let instagram = "@tmplawfirm";
          let address = "The Habibie Center, Lt 1, Jln. Kemang Selatan No. 98, Cilandak Timur, Jakarta Selatan, 12560.";
          let mapsEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.498!2d106.8128!3d-6.2606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b%3A0x1234567890abcdef!2sThe%20Habibie%20Center%2C%20Jl.%20Kemang%20Selatan%20No.98%2C%20Jakarta%20Selatan!5e0!3m2!1sen!2sid!4v1703123456789!5m2!1sen!2sid";

          let servicesList: ServiceItem[] = [
            {
              title: "Legal Consultation",
              image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
              description: "TMP Law Firm is capable of assisting every client, both individuals and business entities, covering oral and written consultation, Legal Opinions, Legal Risk Analysis, and strategic resolution of legal issues."
            },
            {
              title: "Legal Assistance & Representation",
              image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
              description: "Our lawyers are highly experienced in providing legal assistance to clients in various legal processes, including representation in negotiations and/or mediations, examinations by Police/Prosecutors and related institutions, and assisting and representing clients in court trials."
            },
            {
              title: "Litigation",
              image: "https://images.unsplash.com/photo-1505664194779-8bebcb95c557?auto=format&fit=crop&w=600&q=80",
              description: "Representing clients in dispute resolution processes in Court, including civil cases, criminal cases, Industrial Relations Disputes (PHI), bankruptcy and PKPU, land and property disputes."
            },
            {
              title: "Non-Litigation",
              image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
              description: "TMP Law Firm is also experienced in out-of-court dispute resolution through legal approaches and negotiations, such as Mediation and arbitration, drafting warning letters (somasi), peaceful dispute resolution, and the execution of settlement agreements."
            },
            {
              title: "Drafting & Reviewing Legal Documents",
              image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
              description: "TMP Law Firm is known for its experience in drafting, analyzing, and reviewing legal documents, including Employment Agreements/Contracts, Memorandum of Understanding (MoU), Notarial supporting agreements, Sale and Purchase Agreements, leases, deeds of gift, as well as business contracts and investment agreements."
            },
            {
              title: "Land & Property Law",
              image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
              description: "Our legal team is highly experienced in providing legal services related to land and property, including Land Disputes, assistance in sale and purchase of land/buildings, PPJB and AJB, legal verification of land titles, and the processing of Title Transfer, Inheritance, and Land Gifts."
            },
            {
              title: "Labor & Employment Law",
              image: "https://images.unsplash.com/photo-1521791136364-7286472b539c?auto=format&fit=crop&w=600&q=80",
              description: "We also provide legal services for both companies and individuals/workers, including drafting PKWT/PKWTT (fixed/non-fixed term contracts), resolving industrial relations disputes, termination of employment (PHK), bipartite and tripartite assistance, mediation, PHI representation, and advising companies on labor regulations."
            },
            {
              title: "Retainer/Corporate Legal Counsel",
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
              description: "Regarding retainer legal services, TMP Law Firm provides services to companies, including routine consultation, drafting business contracts, assistance in business activities including negotiations and transactions, reviewing corporate legal documents, and corporate disputes."
            },
            {
              title: "Energy Sector Business Contract Review",
              image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
              description: "As one of the business fields that prioritizes legal aspects, we are experienced in the execution of energy sector business contracts, including but not limited to Consortium Agreements, Joint Development Agreements (JDA), Engineering, Procurement, and Construction (EPC), Operating & Maintenance (O&M), Procurement Contracts, Joint Operations (KSO), and compiling legal risk assessments in projects."
            },
            {
              title: "Banking & Financial Institution Sector",
              image: "https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=600&q=80",
              description: "Providing legal services related to the banking sector and business and project financing structures, including drafting and reviewing financing agreements (Leasing, factoring, consumer financing) or loan agreements, security agreements, Fiduciary, Mortgages, Pledges, Shares, Debt Restructuring and renegotiation, as well as dispute resolution through courts, BPSK, or BANI."
            },
            {
              title: "Corporate Law & Mergers & Acquisitions",
              image: "https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=600&q=80",
              description: "Providing legal services in business operations including merger and acquisition transactions, covering business entity establishment, Legal Due Diligence (LDD), Agreements, PPJB and AJB for Share Acquisition, Transaction Structure Design, SPA-APA-JVA compilation, licensing assistance, drafting AGMS documents, changes to Articles of Association, Shareholder Agreements (SHA), and post-acquisition dispute resolution."
            },
            {
              title: "Family & Inheritance Law",
              image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
              description: "TMP Law Firm is also experienced in disputes related to Family Law including Inheritance, such as divorce and division of marital property, Child Custody, lawsuits and applications in Court, inheritance disputes, and prenuptial agreements."
            }
          ];

          let topClientsList: string[] = [
            "PT. Asuransi Allianz Utama Indonesia",
            "PT. Asuransi Allianz Life Indonesia",
            "Ministry of Marine Affairs and Fisheries (KKP)",
            "Astra Sedaya Finance (ACC)",
            "PT Apca Tirta Engineering",
            "PT Bank Raya Indonesia (BRI Agro)",
            "Kredit Plus (PT KB Finansia Multi Finance)",
            "Nusantara Energy Ltd (Malaysia)"
          ];

          let otherClientsList: string[] = [
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
            "KSO ITC PLTMG-PLTG-PLTGU Project 3 x 200 MW PT PLN Batam"
          ];

          data.forEach((item) => {
            if (item.key === "home_hero_title") heroTitle = item.value;
            if (item.key === "home_hero_desc") heroDesc = item.value;
            if (item.key === "home_hero_cta") heroCta = item.value;

            if (item.key === "about_heading") heading = item.value;
            if (item.key === "about_p1") p1 = item.value;
            if (item.key === "about_p2") p2 = item.value;
            if (item.key === "about_p3") p3 = item.value;
            if (item.key === "about_p4") p4 = item.value;
            if (item.key === "about_motto_desc") mottoDesc = item.value;

            if (item.key === "whatsapp") whatsapp = item.value;
            if (item.key === "email_to") emailTo = item.value;
            if (item.key === "linkedin") linkedin = item.value;
            if (item.key === "instagram") instagram = item.value;
            if (item.key === "address") address = item.value;
            if (item.key === "maps_embed") mapsEmbed = item.value;

            if (item.key === "services_data") {
              try {
                servicesList = JSON.parse(item.value);
              } catch (e) {
                console.error("Error parsing services_data:", e);
              }
            }
            if (item.key === "clients_top") {
              try {
                topClientsList = JSON.parse(item.value);
              } catch (e) {
                console.error("Error parsing clients_top:", e);
              }
            }
            if (item.key === "clients_other") {
              try {
                otherClientsList = JSON.parse(item.value);
              } catch (e) {
                console.error("Error parsing clients_other:", e);
              }
            }
          });

          setHomeHeroTitle(heroTitle);
          setHomeHeroDesc(heroDesc);
          setHomeHeroCta(heroCta);

          setAboutHeading(heading);
          setAboutP1(p1);
          setAboutP2(p2);
          setAboutP3(p3);
          setAboutP4(p4);
          setAboutMottoDesc(mottoDesc);

          setContactWhatsapp(whatsapp);
          setContactEmailTo(emailTo);
          setContactLinkedin(linkedin);
          setContactInstagram(instagram);
          setContactAddress(address);
          setContactMapsEmbed(mapsEmbed);

          setServices(servicesList);
          setTopClients(topClientsList);
          setOtherClients(otherClientsList);
        }
      } catch (err) {
        console.error("Error fetching page content settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const updates = [
        { key: "home_hero_title", value: homeHeroTitle.trim() },
        { key: "home_hero_desc", value: homeHeroDesc.trim() },
        { key: "home_hero_cta", value: homeHeroCta.trim() },
        { key: "about_heading", value: aboutHeading.trim() },
        { key: "about_p1", value: aboutP1.trim() },
        { key: "about_p2", value: aboutP2.trim() },
        { key: "about_p3", value: aboutP3.trim() },
        { key: "about_p4", value: aboutP4.trim() },
        { key: "about_motto_desc", value: aboutMottoDesc.trim() },
        { key: "whatsapp", value: contactWhatsapp.trim() },
        { key: "email_to", value: contactEmailTo.trim() },
        { key: "linkedin", value: contactLinkedin.trim() },
        { key: "instagram", value: contactInstagram.trim() },
        { key: "address", value: contactAddress.trim() },
        { key: "maps_embed", value: contactMapsEmbed.trim() },
        { key: "services_data", value: JSON.stringify(services) },
        { key: "clients_top", value: JSON.stringify(topClients) },
        { key: "clients_other", value: JSON.stringify(otherClients) },
      ];

      const { error } = await supabase.from("site_settings").upsert(updates);
      if (error) throw error;

      setMessage({
        type: "success",
        text: "Konten website berhasil disimpan dan diperbarui secara instan!",
      });
    } catch (err: any) {
      console.error("Error saving website content:", err);
      setMessage({
        type: "error",
        text: err.message || "Gagal menyimpan konten. Coba periksa koneksi internet Anda.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/admin/login");
    } catch (err) {
      console.error("Error signing out:", err);
      router.push("/admin/login");
    }
  };

  // Services Helpers
  const addService = () => {
    if (!newService.title.trim()) return;
    setServices([...services, { ...newService }]);
    setNewService({ title: "", image: "", description: "" });
    setShowAddServiceForm(false);
  };

  const removeService = (index: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus layanan ini?")) {
      setServices(services.filter((_, idx) => idx !== index));
    }
  };

  const startEditService = (index: number) => {
    setEditingServiceIndex(index);
  };

  const saveEditedService = (index: number, updatedItem: ServiceItem) => {
    const updated = [...services];
    updated[index] = updatedItem;
    setServices(updated);
    setEditingServiceIndex(null);
  };

  // Top Clients Helpers
  const addTopClient = () => {
    if (!newTopClient.trim()) return;
    setTopClients([...topClients, newTopClient.trim()]);
    setNewTopClient("");
  };

  const removeTopClient = (index: number) => {
    setTopClients(topClients.filter((_, idx) => idx !== index));
  };

  // Other Clients Helpers
  const addOtherClient = () => {
    if (!newOtherClient.trim()) return;
    setOtherClients([...otherClients, newOtherClient.trim()]);
    setNewOtherClient("");
  };

  const removeOtherClient = (index: number) => {
    setOtherClients(otherClients.filter((_, idx) => idx !== index));
  };

  return (
    <div className="min-h-screen bg-black text-white flex relative">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-tmp-black border-b border-white/10 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image src="/assets/logo.png" alt="TMP" fill className="object-contain" />
          </div>
          <span className="text-tmp-gold font-bold">ADMIN</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-tmp-gold text-xl">
          <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-full w-64 bg-tmp-black border-r border-white/10 p-6 flex flex-col z-40 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} pt-24 md:pt-6`}>
        <div className="mb-12 flex-col items-center text-center hidden md:flex">
          <div className="relative w-20 h-20 mb-4">
            <Image src="/assets/logo.png" alt="TMP Logo" fill className="object-contain" priority />
          </div>
          <h1 className="text-tmp-gold font-bold text-xl mb-1">TMP ADMIN</h1>
          <p className="text-gray-500 text-xs tracking-widest">CONTENT MANAGER</p>
          <p className="text-[10px] text-tmp-gold/80 italic mt-3 max-w-[200px] leading-relaxed">
            &ldquo;Halo admin ganteng, semangat menjalani hidup ya! :)&rdquo;
          </p>
        </div>

        <nav className="space-y-2 flex-1">
          <Link href="/admin/dashboard" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
            <i className="fas fa-newspaper mr-3"></i> News & Articles
          </Link>
          <Link href="/admin/team" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
            <i className="fas fa-users mr-3"></i> Team Profiles
          </Link>
          <Link href="/admin/content" className="block text-white bg-white/5 px-4 py-3 rounded text-sm font-bold border-l-2 border-tmp-gold">
            <i className="fas fa-edit mr-3"></i> Kelola Konten (CMS)
          </Link>
          <Link href="/admin/analytics" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
            <i className="fas fa-chart-line mr-3"></i> Visitor Analytics
          </Link>
          <Link href="/admin/settings" className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded text-sm font-bold transition-colors">
            <i className="fas fa-cog mr-3"></i> Settings
          </Link>
        </nav>

        <button onClick={handleLogout} className="text-gray-400 hover:text-white hover:bg-red-900/50 hover:border-red-500 border border-white/10 px-4 py-3 rounded text-xs uppercase tracking-widest mt-auto md:mt-0 font-bold flex items-center justify-center transition-all duration-300 w-full cursor-pointer">
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 pt-24 md:pt-8 w-full max-w-5xl">
        <header className="mb-8">
          <h2 className="text-2xl font-serif italic text-white">Kelola Konten Website (CMS)</h2>
          <p className="text-gray-400 text-sm mt-1">Perbarui teks, layanan, dan daftar klien di halaman utama secara dinamis.</p>
        </header>

        {/* Tab Controls */}
        <div className="flex flex-wrap border-b border-white/10 mb-8 gap-2">
          {(["home", "about", "services", "clients", "lawyers", "contact"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === tab ? "border-tmp-gold text-tmp-gold bg-white/5" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab === "home" && "Home Section"}
              {tab === "about" && "About Section"}
              {tab === "services" && "Our Services"}
              {tab === "clients" && "Our Clients"}
              {tab === "lawyers" && "Team Members"}
              {tab === "contact" && "Contact & Socials"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-xs tracking-widest">MEMUAT KONTEN WEBSITE...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8 bg-tmp-black border border-white/10 p-6 md:p-8 rounded-lg">
            {message.text && (
              <div className={`p-4 rounded text-xs font-bold ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                {message.text}
              </div>
            )}

            {/* TAB: HOME */}
            {activeTab === "home" && (
              <div className="space-y-6">
                <h3 className="text-tmp-gold text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">Hero Section Content</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Hero Main Title</label>
                    <textarea
                      value={homeHeroTitle}
                      onChange={(e) => setHomeHeroTitle(e.target.value)}
                      rows={2}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none resize-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Hero Subtitle / Description</label>
                    <textarea
                      value={homeHeroDesc}
                      onChange={(e) => setHomeHeroDesc(e.target.value)}
                      rows={3}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none resize-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">CTA Button Text</label>
                    <input
                      type="text"
                      value={homeHeroCta}
                      onChange={(e) => setHomeHeroCta(e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ABOUT */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <h3 className="text-tmp-gold text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">About Section Content</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">About Main Heading</label>
                    <input
                      type="text"
                      value={aboutHeading}
                      onChange={(e) => setAboutHeading(e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">About Paragraph 1</label>
                    <textarea
                      value={aboutP1}
                      onChange={(e) => setAboutP1(e.target.value)}
                      rows={4}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none resize-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">About Paragraph 2</label>
                    <textarea
                      value={aboutP2}
                      onChange={(e) => setAboutP2(e.target.value)}
                      rows={4}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none resize-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">About Paragraph 3</label>
                    <textarea
                      value={aboutP3}
                      onChange={(e) => setAboutP3(e.target.value)}
                      rows={4}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none resize-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">About Paragraph 4</label>
                    <textarea
                      value={aboutP4}
                      onChange={(e) => setAboutP4(e.target.value)}
                      rows={4}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none resize-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Motto / Vision Sub-Text</label>
                    <textarea
                      value={aboutMottoDesc}
                      onChange={(e) => setAboutMottoDesc(e.target.value)}
                      rows={2}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none resize-none"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h3 className="text-tmp-gold text-[10px] font-bold uppercase tracking-widest">Our Services List</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddServiceForm(!showAddServiceForm)}
                    className="bg-tmp-gold text-black px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                  >
                    {showAddServiceForm ? "Batal" : "+ Tambah Layanan"}
                  </button>
                </div>

                {/* Add Service Inline Form */}
                {showAddServiceForm && (
                  <div className="border border-tmp-gold/30 bg-tmp-gold/5 p-4 rounded space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tambah Layanan Baru</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Nama Layanan (Contoh: Corporate Law)"
                        value={newService.title}
                        onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                        className="w-full bg-black border border-white/10 p-2.5 rounded text-xs focus:border-tmp-gold outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Tautan Gambar Unsplash (600x800)"
                        value={newService.image}
                        onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                        className="w-full bg-black border border-white/10 p-2.5 rounded text-xs focus:border-tmp-gold outline-none"
                      />
                      <textarea
                        placeholder="Deskripsi ringkas layanan..."
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        rows={3}
                        className="w-full bg-black border border-white/10 p-2.5 rounded text-xs focus:border-tmp-gold outline-none resize-none"
                      />
                      <button
                        type="button"
                        onClick={addService}
                        className="bg-tmp-gold text-black px-5 py-2 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                      >
                        Simpan Layanan Baru
                      </button>
                    </div>
                  </div>
                )}

                {/* List of Current Services */}
                <div className="space-y-3">
                  {services.map((service, idx) => (
                    <div key={idx} className="border border-white/10 bg-black p-4 rounded flex flex-col md:flex-row gap-4 items-start justify-between">
                      {editingServiceIndex === idx ? (
                        /* Edit Form mode */
                        <div className="w-full space-y-3">
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => {
                              const updated = [...services];
                              updated[idx].title = e.target.value;
                              setServices(updated);
                            }}
                            className="w-full bg-black border border-white/10 p-2 rounded text-xs focus:border-tmp-gold outline-none font-bold"
                          />
                          <input
                            type="text"
                            value={service.image}
                            onChange={(e) => {
                              const updated = [...services];
                              updated[idx].image = e.target.value;
                              setServices(updated);
                            }}
                            className="w-full bg-black border border-white/10 p-2 rounded text-xs focus:border-tmp-gold outline-none"
                          />
                          <textarea
                            value={service.description}
                            onChange={(e) => {
                              const updated = [...services];
                              updated[idx].description = e.target.value;
                              setServices(updated);
                            }}
                            rows={3}
                            className="w-full bg-black border border-white/10 p-2 rounded text-xs focus:border-tmp-gold outline-none resize-none"
                          />
                          <button
                            type="button"
                            onClick={() => setEditingServiceIndex(null)}
                            className="bg-tmp-gold text-black px-4 py-1.5 rounded text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                          >
                            Selesai Edit
                          </button>
                        </div>
                      ) : (
                        /* View Mode */
                        <>
                          <div className="flex gap-4">
                            {service.image && (
                              <div className="relative w-12 h-16 shrink-0 rounded overflow-hidden border border-white/10">
                                <Image src={service.image} alt={service.title} fill className="object-cover" />
                              </div>
                            )}
                            <div>
                              <h4 className="text-white font-bold text-sm font-serif italic">{service.title}</h4>
                              <p className="text-gray-400 text-xs mt-1 leading-relaxed">{service.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 self-end md:self-start">
                            <button
                              type="button"
                              onClick={() => startEditService(idx)}
                              className="text-tmp-gold hover:text-white text-xs px-2 py-1 rounded bg-white/5 border border-white/10 transition cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => removeService(idx)}
                              className="text-red-500 hover:text-white hover:bg-red-600 border border-red-500/30 text-xs px-2 py-1 rounded transition cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CLIENTS */}
            {activeTab === "clients" && (
              <div className="space-y-8">
                {/* TOP CLIENTS */}
                <div className="space-y-4">
                  <h3 className="text-tmp-gold text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">Top Clients Grid</h3>
                  
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Tambah nama Klien Utama..."
                      value={newTopClient}
                      onChange={(e) => setNewTopClient(e.target.value)}
                      className="flex-1 bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                    />
                    <button
                      type="button"
                      onClick={addTopClient}
                      className="bg-tmp-gold text-black px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                    >
                      Tambah
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {topClients.map((client, idx) => (
                      <div key={idx} className="flex justify-between items-center border border-white/10 p-3 bg-black rounded">
                        <span className="text-xs text-gray-300 font-bold uppercase tracking-wider">{client}</span>
                        <button
                          type="button"
                          onClick={() => removeTopClient(idx)}
                          className="text-red-500 hover:text-red-400 text-xs cursor-pointer px-2"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* OTHER PROJECTS/CLIENTS */}
                <div className="space-y-4">
                  <h3 className="text-tmp-gold text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">Project & Legal Assistance Clients</h3>
                  
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Tambah nama Proyek/Klien Kerja Sama..."
                      value={newOtherClient}
                      onChange={(e) => setNewOtherClient(e.target.value)}
                      className="flex-1 bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                    />
                    <button
                      type="button"
                      onClick={addOtherClient}
                      className="bg-tmp-gold text-black px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                    >
                      Tambah
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {otherClients.map((client, idx) => (
                      <div key={idx} className="flex justify-between items-center border border-white/10 p-3 bg-black rounded">
                        <span className="text-xs text-gray-300 font-bold uppercase tracking-wider">{client}</span>
                        <button
                          type="button"
                          onClick={() => removeOtherClient(idx)}
                          className="text-red-500 hover:text-red-400 text-xs cursor-pointer px-2"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: LAWYERS */}
            {activeTab === "lawyers" && (
              <div className="space-y-6 py-6 text-center">
                <div className="w-16 h-16 bg-tmp-gold/10 text-tmp-gold border border-tmp-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-2xl"></i>
                </div>
                <h3 className="text-white font-serif italic text-xl">Profil Tim & Advokat</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                  Manajemen profil advokat (menambah pengacara, riwayat, dan keahlian) telah dipisahkan ke modul khusus untuk fungsionalitas yang lebih mendalam.
                </p>
                <div className="pt-4">
                  <Link
                    href="/admin/team"
                    className="inline-block bg-tmp-gold text-black font-extrabold uppercase tracking-widest text-xs px-8 py-3 rounded hover:bg-white transition-colors"
                  >
                    Buka Pengelola Profil Tim &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* TAB: CONTACT & SOCIALS */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <h3 className="text-tmp-gold text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-2">Contact & Socials Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* WhatsApp */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">WhatsApp Number</label>
                    <input
                      type="text"
                      value={contactWhatsapp}
                      onChange={(e) => setContactWhatsapp(e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                      placeholder="e.g. 0812-1005-4874"
                      required
                    />
                  </div>

                  {/* Email Destination */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Inquiry Target Email</label>
                    <input
                      type="email"
                      value={contactEmailTo}
                      onChange={(e) => setContactEmailTo(e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                      placeholder="e.g. tmp@tmplawyers.com"
                      required
                    />
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">LinkedIn Page Link (Optional)</label>
                    <input
                      type="url"
                      value={contactLinkedin}
                      onChange={(e) => setContactLinkedin(e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                      placeholder="e.g. https://www.linkedin.com/company/..."
                    />
                  </div>

                  {/* Instagram */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Instagram Username (Optional)</label>
                    <input
                      type="text"
                      value={contactInstagram}
                      onChange={(e) => setContactInstagram(e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                      placeholder="e.g. @tmplawfirm"
                    />
                  </div>

                  {/* Office Address */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Office Address</label>
                    <textarea
                      value={contactAddress}
                      onChange={(e) => setContactAddress(e.target.value)}
                      rows={3}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none resize-none"
                      placeholder="e.g. Jalan Kemang Selatan No. 98..."
                      required
                    />
                  </div>

                  {/* Google Maps Embed Iframe URL */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Google Maps Iframe Source (embed src)</label>
                    <input
                      type="text"
                      value={contactMapsEmbed}
                      onChange={(e) => setContactMapsEmbed(e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 rounded text-sm focus:border-tmp-gold outline-none"
                      placeholder="e.g. https://www.google.com/maps/embed?pb=..."
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save bar */}
            {activeTab !== "lawyers" && (
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-tmp-gold text-black font-extrabold uppercase tracking-widest text-xs px-8 py-3 rounded hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Menyimpan..." : "Simpan Semua Perubahan"}
                </button>
              </div>
            )}
          </form>
        )}
      </main>
    </div>
  );
}
