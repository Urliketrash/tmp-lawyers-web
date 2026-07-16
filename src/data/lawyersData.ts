export type Lawyer = {
  id: string;
  name: string;
  role: string;
  image: string;
  shortDesc: string;
  italicDesc: string;
  biography?: string;
  email?: string;
  instagram?: string;
  education?: string[];
  experience?: string[];
  skills?: string[];
};

export const lawyersData: Lawyer[] = [
  {
    id: "founder",
    name: "Wang Tao Bicton Manullang, S.H.",
    role: "FOUNDER",
    image: "/assets/founder_v2.png",
    shortDesc:
      "Advocate and Founder of TMP Law Firm. Alumnus of the Faculty of Law, Parahyangan Catholic University. He is known as an expert strategist in handling legal cases, negotiations, legal writing, and business transactions.",
    italicDesc:
      "Trusted as an Advocate and Legal Consultant for several Ministries and State-Owned Enterprises (BUMN).",
    biography: `Advocate and Founder of TMP Law Firm. Wang Tao is an alumnus of the Faculty of Law, Parahyangan Catholic University. Wang Tao has achieved various awards, including: MPR Mock Court & Constitutional Drafting Padjadjaran Law Fair (2015), UNPAR Debate Competition (2014), Business Law Competition Universitas Indonesia (2016), and UNSC Bali World Model United Nation Udayana Bali (2017). These achievements have established Wang Tao as an expert strategist in handling legal cases, negotiations, legal writing, and business transactions.\n\nThroughout his career as an Advocate at TMP Law Firm, Wang Tao has specialized in general Business/Corporate Law and specifically business crimes, as well as preventive measures in business activities and public/private legal matters. This has earned him the trust to serve as an Advocate and Legal Consultant for several Ministries and State-Owned Enterprises (BUMN), as well as representing clients in drafting regulations and contracts. Wang Tao is also frequently trusted as a negotiator in business transactions, particularly in the energy and construction sectors, such as power plant projects (Consortium, JDA, EPC, O&M) in cooperation with PT PLN Persero and Pertamina, a consultant in the implementation of banking/financing contracts for state-owned and private banks including insurance, and is experienced in M&A business activities.\n\nWang Tao is also active and has built a career in external organizations, including: Chairman of GMKI Bandung, Alumnus of FH UNPAR, and Vice Chairman of KNPI. Therefore, Wang Tao is known as an energetic and professional lawyer.`,
    education: [
      "Bachelor of Laws (S.H.), Parahyangan Catholic University"
    ],
    experience: [
      "Founder & Managing Partner, Tao Manullang & Partners",
      "Chairman of GMKI Bandung",
      "Alumnus of FH UNPAR",
      "Vice Chairman of KNPI"
    ],
    skills: ["CORPORATE LAW", "ENERGY & CONSTRUCTION", "MERGERS & ACQUISITIONS", "BUSINESS CRIME DEFENSE", "NEGOTIATION"],
    email: "wangtao@tmplawyers.com",
    instagram: "@wangtaomanullang"
  },
  {
    id: "ronaldo",
    name: "H Ronaldo Munthe, S.H.",
    role: "PARTNER",
    image: "/assets/lawyers 2.png",
    shortDesc:
      "Advocate and Legal Consultant. Alumnus of the Faculty of Law, Bandar Lampung University. Experienced in Litigation and Non-Litigation, Land Disputes, and legal assistance for victims of violence (Komnas PPA).",
    italicDesc:
      "Specializes in Litigation, Criminal Law, Civil Law, and persuasive dispute resolution.",
    biography: `H Ronaldo Munthe, S.H. is an Advocate, Legal Consultant, and Partner at TMP Law Firm. He is an alumnus of the Faculty of Law, Bandar Lampung University, with a strong academic background, winning the National Moot Court Competition, and remaining actively involved in the Moot Court Community and organizational activities to this day. This foundation has shaped his structured, analytical, and argumentative legal mindset, which he consistently applies in his professional practice.\n\nSince entering legal practice in 2021 as an Advocate, Ronaldo is frequently requested to draft business contracts to anticipate future legal issues. His case resolution focus spans Litigation and Non-Litigation, including Criminal Law, Civil Law, Land and Property Disputes, and providing pro-bono assistance to victims of violence at the Commission for Women and Child Protection (Komnas PPA). He has also handled PKPU and Bankruptcy cases, Tax Disputes, Licensing, Immigration matters, Medical Law, and Inheritance Law.\n\nIn addition to formal legal approaches, Ronaldo prioritizes mediation and persuasive resolution with a humanistic approach as initial steps in every legal matter, particularly in cases involving family relationships and social interests. To this day, Ronaldo is trusted to manage and supervise the execution of wills, reflecting the high trust clients place in his professionalism and integrity.`,
    education: [
      "Bachelor of Laws (S.H.), Bandar Lampung University"
    ],
    experience: [
      "Partner, TMP Law Firm (2021-present)",
      "Victim Advocate, Commission for Women and Child Protection (Komnas PPA)"
    ],
    skills: ["LITIGATION & NON-LITIGATION", "CRIMINAL & CIVIL LAW", "LAND DISPUTE", "MEDICAL LAW", "BANKRUPTCY & PKPU"],
    email: "ronaldomunthe@tmplawyers.com",
    instagram: "@hisarronaldomunthe"
  },
  {
    id: "yudis",
    name: "Yudis Arya Bramasta, S.H.",
    role: "ASSOCIATE",
    image: "/assets/lawyers 3.png",
    shortDesc:
      "Advocate and PERADI member. Associate Lawyer at TMP Law Firm. Alumnus of the Faculty of Law, Universitas Pendidikan Ganesha. Specializes in Legal Due Diligence, criminal law, and corporate civil law.",
    italicDesc:
      "Expertise includes drafting strategic legal opinions and mitigating legal risks for individual and corporate clients.",
    biography: `Yudis Arya Bramasta, S.H. is an Advocate and member of the Indonesian Advocates Association (PERADI) who serves as an Associate Lawyer at TMP Law Firm. An alumnus of the Faculty of Law, Universitas Pendidikan Ganesha, he has a strong organizational background and extensive experience as corporate legal counsel. His expertise ranges from drafting strategic legal opinions to conducting in-depth Legal Due Diligence to mitigate legal risks for both individual and corporate clients.\n\nIn criminal law practice, Yudis handles general criminal cases such as theft, embezzlement, and fraud, including corporate crimes. He also specializes in special criminal cases, including cybercrime, narcotics, women and child protection, and oil and gas offenses. His sharp analytical skills in handling technical cases make him a reliable practitioner in facing complex legal dynamics, both in and out of court.\n\nIn civil law, Yudis is experienced as a legal consultant and corporate attorney, particularly in resolving corporate disputes in the financial services sector such as leasing, banking, and cooperatives. He has also handled financial services legal issues related to financing restructuring for state-owned, private, and Sharia banks. Yudis has expertise in special civil law, with specializations including Intellectual Property Rights (IPR) such as Trademarks, Patents, Copyrights, and Geographical Indications (GI), PKPU/bankruptcy cases, and consumer protection in the property business. With a professional and solution-oriented approach, Yudis is committed to providing high-standard legal protection for all clients.`,
    education: [
      "Bachelor of Laws (S.H.), Universitas Pendidikan Ganesha"
    ],
    experience: [
      "Associate Lawyer, TMP Law Firm"
    ],
    skills: ["LEGAL DUE DILIGENCE", "CORPORATE LAW", "CYBER CRIME", "INTELLECTUAL PROPERTY (HKI)", "BANKRUPTCY & PKPU"],
    email: "yudisarya@tmplawyers.com",
    instagram: "@_yudisaryaa"
  },
  {
    id: "fadil",
    name: "Fadil Taufiq, S.H.",
    role: "ASSOCIATE",
    image: "/assets/lawyers 4.png",
    shortDesc:
      "Legal Consultant & Associate Lawyer at TMP Law Firm. Alumnus of the Faculty of Law, Parahyangan Catholic University. Experienced in procurement, F&B business, and legal assistance for MSMEs.",
    italicDesc:
      "Focuses on Litigation & Non-Litigation, Commercial Law, Contracts, Employment, and Cyber/ITE Crimes.",
    biography: `Fadil Taufiq, S.H. is a Legal Consultant and Associate Lawyer at TMP Law Firm. He is an alumnus of the Faculty of Law, Parahyangan Catholic University, Bandung, and is active in various private organizations, including those providing free educational spaces for the public. He has also actively pursued a career as a consultant in various business sectors, especially the Food & Beverage industry, giving him deep knowledge in both legal fields and the establishment of Micro, Small, and Medium Enterprises (MSMEs).\n\nWith his practical mindset in his legal career and professional journey, Fadil has experience in actively assisting companies, providing legal opinions, and drafting appropriate legal documents such as trade contracts, partnership agreements, licensing, and others.\n\nAs an Associate Lawyer at TMP Law Firm, Fadil focuses on resolving cases within Litigation and Non-Litigation, covering both general Civil and Criminal Law, including handling cases in Criminal Law, Commercial Law, Inheritance Law, Contract Law, Labor Law, Banking Law, and Cyber/ITE-based crimes.`,
    education: [
      "Bachelor of Laws (S.H.), Parahyangan Catholic University"
    ],
    experience: [
      "Associate Lawyer, TMP Law Firm",
      "Business Legal Consultant (F&B & MSMEs)"
    ],
    skills: ["LITIGATION & NON-LITIGATION", "COMMERCIAL LAW", "CONTRACT DRAFTING", "ITE LAW", "LABOR LAW"],
    email: "fadiltaufiq@tmplawyers.com",
    instagram: "@pakdejako"
  },
];
