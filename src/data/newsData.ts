export type NewsItem = {
  id: string;
  title: string;
  date: string; // ISO string 2024-02-13
  category: string;
  summary: string;
  content: string; // HTML content or Markdown
  imageUrl: string;
  author: string;
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Kemenangan Klien TMP Law Firm dalam Sengketa Lahan Komersial",
    date: "2024-02-12",
    category: "LITIGATION",
    summary: "Tim TMP Law Firm berhasil memenangkan gugatan sengketa lahan senilai 50 Miliar Rupiah di Pengadilan Negeri Jakarta Selatan.",
    content: "<p>Tim TMP Law Firm berhasil memenangkan gugatan sengketa lahan senilai 50 Miliar Rupiah di Pengadilan Negeri Jakarta Selatan...</p>",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200",
    author: "Admin"
  },
  {
    id: "2",
    title: "Seminar Hukum: Perlindungan Data Pribadi di Era Digital",
    date: "2024-02-10",
    category: "EVENT",
    summary: "TMP Law Firm menyelenggarakan seminar hukum mengenai UU PDP bersama para ahli hukum siber nasional.",
    content: "<p>TMP Law Firm menyelenggarakan seminar hukum mengenai UU PDP bersama para ahli hukum siber nasional...</p>",
    imageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200",
    author: "Admin"
  },
  {
    id: "3",
    title: "Update Regulasi: Perubahan Hukum Ketenagakerjaan 2024",
    date: "2024-02-08",
    category: "REGULATION",
    summary: "Analisis mendalam mengenai poin-poin krusial perubahan UU Cipta Kerja klaster Ketenagakerjaan terbaru.",
    content: "<p>Analisis mendalam mengenai poin-poin krusial perubahan UU Cipta Kerja klaster Ketenagakerjaan terbaru...</p>",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
    author: "Admin"
  }
];
