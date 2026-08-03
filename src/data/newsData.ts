export type NewsItem = {
  id: string;
  title: string;
  date: string; // ISO string 2024-02-13
  category: string;
  summary: string;
  content: string; // HTML content or Markdown
  imageUrl: string;
  author: string;
  readTime?: string;
  authorRole?: string;
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "4",
    title: "Attempted Abortion Law in Indonesia Under the New Criminal Code (KUHP)",
    date: "2026-06-18",
    category: "REGULATION",
    summary: "Legal analysis of attempted abortion in Indonesia under the Health Law, and a comparison between the old and new Criminal Codes (UU 1/2023).",
    content: "<p>According to the KBBI (Indonesian Standard Dictionary), abortion is the act of terminating a pregnancy. In legal terminology, it is known as <em>abortus provocatus</em>, which is the intentional termination of a pregnancy, whether carried out by the pregnant woman herself or by a third party.</p><p>Based on a common scenario where a pregnant woman agrees to undergo an abortion, even if initially persuaded or coerced by her partner. If the abortion is initiated with the consent and agreement of the pregnant woman, whether it succeeds or fails, it is not considered a result of force majeure or circumstances beyond their control. Therefore, even if the abortion fails to terminate the pregnancy, both parties can still be prosecuted for attempted abortion.</p><h2>Abortion Prohibition under the Health Law</h2><p>In Indonesian law, the prohibition of abortion is strictly regulated under <strong>Article 60 paragraph (1) of the Health Law</strong>, which states that anyone is prohibited from performing an abortion unless under specific conditions justified by statutory regulations. Abortion is only permitted if it meets criteria such as being performed by an authorized medical professional, at a designated health facility, and with the consent of the pregnant woman and her husband (except in cases of rape). If an abortion is performed illegally, under <strong>Article 428 of the Health Law</strong>, a woman who performs an abortion with her own consent can face imprisonment for up to 5 years.</p><h2>Provisions on Attempted Crime</h2><p>Besides the Health Law, regulations on criminal attempts are governed by both the old and new Criminal Codes (UU 1/2023). Under <strong>Article 53 of the old Criminal Code (KUHP)</strong>, a criminal attempt is punishable if there is intent, execution has commenced, and the failure is not due to the perpetrator's own volition. In the new Criminal Code, this concept is reinforced in <strong>Article 17 of UU 1/2023</strong>, stating that attempted offenses are punishable by up to two-thirds of the maximum statutory penalty.</p><h2>Abortion Provisions: Old KUHP vs. New KUHP Comparison</h2><p>For abortion provisions, the old Criminal Code regulates in <strong>Article 346</strong> that a woman who intentionally aborts her pregnancy faces up to 4 years of imprisonment. The new Criminal Code, under <strong>Article 463</strong>, imposes similar penalties but provides clear exemptions for rape victims and medical emergencies.</p><p>Meanwhile, for third parties performing an abortion with the woman's consent, the old Criminal Code under <strong>Article 348</strong> prescribes a maximum penalty of 5 years and 6 months, which increases if it results in death. The new Criminal Code regulates this in <strong>Article 464</strong>, with penalties of up to 5 years with consent, and heavier penalties if performed without consent or resulting in death.</p><h2>Legal Analysis of Attempted Abortion</h2><p>In conclusion, a pregnant woman and her partner who attempt an abortion can be prosecuted under the relevant Health Law provisions and the attempted crime rules of the Criminal Code. However, because the pregnancy was not successfully terminated, the charge would be attempted abortion rather than completed abortion.</p><p>This aligns with the legal opinion of <strong>R. Soesilo</strong>, who explains the elements of a criminal attempt: intent to commit a crime, the commencement of execution, and failure occurring due to factors independent of the perpetrator's will. In this case, intent was evident from both parties, execution commenced, but the abortion did not occur due to external circumstances.</p><blockquote><p>If you or someone you know is experiencing pressure or coercion of this nature, seek legal protection and professional counsel immediately. Remember, medical decisions are the absolute right of the patient (the pregnant mother) and must be respected.</p></blockquote><hr /><p><em><strong>Disclaimer:</strong> This article provides general legal information and does not constitute professional legal advice. Consult a qualified attorney for your specific case.</em></p>",
    imageUrl: "/assets/aborsi_hukum.png",
    author: "Admin"
  },
  {
    id: "5",
    title: "New Annual Report Submission Requirements for Limited Liability Companies (PT) under Permenkum No. 49 of 2025",
    date: "2025-05-05",
    category: "CORPORATE",
    summary: "The Indonesian Ministry of Law has issued Regulation No. 49 of 2025, mandating the submission of PT Annual Reports through the SABH system, with administrative sanctions for non-compliance.",
    content: "<p>The Ministry of Law of the Republic of Indonesia has issued Minister of Law Regulation Number 49 of 2025 concerning the Requirements and Procedures for the Establishment, Amendment, and Dissolution of Limited Liability Companies (PT) (<strong>\"Permenkum 49/2025\"</strong>), replacing Permenkumham Number 21 of 2021.</p><p>This regulation brings key changes to the preparation, approval, and submission of PT Annual Reports, introducing a mandatory report filing to the Minister of Law through the Legal Entity Administration System (SABH).</p><h2>What Has Changed?</h2><p>Previously, the Annual Report was primarily an internal company document prepared by the Board of Directors, reviewed by the Board of Commissioners, and approved during the Annual General Meeting of Shareholders (AGMS/RUPS).</p><p>Now, the company is also required to submit the approved Annual Report to the Minister of Law through the SABH platform.</p><h2>Required Compliance Steps for Companies</h2><p>Companies must pay close attention to the following steps:</p><ul><li>The Board of Directors prepares the Annual Report.</li><li>The Board of Commissioners conducts a review.</li><li>The Company holds the Annual RUPS (AGMS).</li><li>Approval of the Annual Report must be formalized in a Notarial Deed.</li><li>The Board of Directors, through a Notary, submits the documents to the Minister of Law via SABH.</li></ul><p>The mandatory documents to be submitted include:</p><ul><li>Notarial Deed regarding the approval of the Annual Report; and</li><li>The Annual Report document.</li></ul><h2>Key Deadlines</h2><p>Companies must respect two critical deadlines:</p><ol><li><strong>Submission to RUPS</strong>: The Annual Report must be submitted to shareholders no later than 6 (six) months after the end of the financial year.</li><li><strong>Submission to the Minister of Law</strong>: The Notarial Deed and Annual Report must be uploaded to SABH within 30 (thirty) days from the signing of the Notarial Deed.</li></ol><h2>Minimum Contents of the Annual Report</h2><p>The Annual Report must at least contain:</p><ul><li>Financial statements;</li><li>Company activity report;</li><li>Social and environmental responsibility (CSR) implementation report;</li><li>Key issues affecting the company's business activities;</li><li>Board of Commissioners supervision report;</li><li>Composition of the Board of Directors and Board of Commissioners; and</li><li>Information on salaries, honoraria, and allowances for directors and commissioners.</li></ul><h2>Sanctions for Non-Compliance</h2><p>Companies that fail to meet these reporting obligations face administrative sanctions, including:</p><ol><li>Written warnings; and/or</li><li>Suspension of access to the SABH system.</li></ol><p>Suspension of SABH access can halt various corporate actions, including changing directors, commissioners, shareholders, company capital, or amending the Articles of Association.</p><h2>Legal Basis</h2><ul><li>Law Number 40 of 2007 concerning Limited Liability Companies, as amended by Law Number 6 of 2023.</li><li>Minister of Law Regulation Number 49 of 2025 concerning the Requirements and Procedures for the Establishment, Amendment, and Dissolution of Limited Liability Companies.</li></ul><p><em><strong>Note:</strong> Due to these new administrative duties and associated sanctions, companies are advised to update their compliance calendars and internal governance workflows for preparing, approving, and filing their Annual Reports.</em></p>",
    imageUrl: "/assets/laporan_tahunan.png",
    author: "Admin"
  },
  {
    id: "1",
    title: "TMP Law Firm Wins Commercial Land Dispute for Corporate Client",
    date: "2024-02-12",
    category: "LITIGATION",
    summary: "The TMP Law Firm team successfully won a 50 Billion Rupiah land dispute lawsuit in the South Jakarta District Court.",
    content: "<p>The TMP Law Firm legal team successfully won a landmark land dispute lawsuit valued at 50 Billion Rupiah in the South Jakarta District Court...</p>",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200",
    author: "Admin"
  },
  {
    id: "2",
    title: "Legal Seminar: Personal Data Protection (PDP) in the Digital Era",
    date: "2024-02-10",
    category: "EVENT",
    summary: "TMP Law Firm hosted a comprehensive legal seminar on the PDP Law featuring national cyber law experts.",
    content: "<p>TMP Law Firm hosted a successful legal seminar addressing the implementation of the Personal Data Protection (PDP) Law, featuring prominent cyber law experts...</p>",
    imageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200",
    author: "Admin"
  },
  {
    id: "3",
    title: "Regulatory Update: Key Changes to Indonesian Labor Laws 2024",
    date: "2024-02-08",
    category: "REGULATION",
    summary: "An in-depth analysis of the crucial amendments in the latest Job Creation Law (UU Cipta Kerja) labor cluster.",
    content: "<p>An in-depth legal analysis of the crucial amendments and compliance requirements under the latest Job Creation Law labor cluster...</p>",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
    author: "Admin"
  }
];
