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
    id: "4",
    title: "Hukum Percobaan Aborsi di Indonesia Berkaitan dengan Berlakunya KUHP Baru",
    date: "2026-06-18",
    category: "REGULATION",
    summary: "Analisis hukum mengenai percobaan aborsi di Indonesia berdasarkan UU Kesehatan serta perbandingan ketentuan KUHP lama dan KUHP baru (UU 1/2023).",
    content: "<p>Menurut KBBI, aborsi adalah tindakan menggugurkan kandungan. Dalam istilah hukum, aborsi dikenal sebagai <em>abortus provocatus</em>, yaitu pengguguran kandungan yang dilakukan secara sengaja, baik oleh perempuan yang hamil maupun oleh pihak lain.</p><p>Berdasarkan suatu contoh kasus yaitu seorang perempuan hamil yang setuju melakukan aborsi walaupun awalnya disuruh/dibujuk oleh sang pacar. Tindakan aborsi yang dilakukan oleh perempuan yang hamil dan pacarnya, di mana perbuatan aborsi dilakukan atas kehendak dan persetujuan perempuan yang hamil, sekalipun berhasil atau gagal. Dengan demikian, perbuatan tersebut dapat dikatakan bukanlah terjadi karena keadaan terpaksa atau sebab di luar kendali mereka. Sekalipun aborsi tersebut tidak sampai terjadi, keduanya tetap berpotensi dipidana karena termasuk dalam kategori percobaan melakukan aborsi.</p><h2>Larangan Aborsi dalam UU Kesehatan</h2><p>Dalam hukum Indonesia, larangan aborsi diatur secara tegas dalam <strong>Pasal 60 ayat (1) UU Kesehatan</strong>, yang menyatakan bahwa setiap orang dilarang melakukan aborsi kecuali dalam kondisi tertentu yang dibenarkan oleh peraturan perundang-undangan. Aborsi hanya dapat dilakukan apabila memenuhi persyaratan, antara lain dilakukan oleh tenaga medis berwenang, di fasilitas kesehatan yang ditentukan, serta disertai persetujuan perempuan hamil dan suami, kecuali dalam kasus korban perkosaan. Jika aborsi dilakukan secara ilegal, maka berdasarkan <strong>Pasal 428 UU Kesehatan</strong>, perempuan yang melakukan aborsi dengan persetujuannya sendiri dapat dikenakan pidana penjara paling lama 5 tahun.</p><h2>Ketentuan Percobaan Tindak Pidana</h2><p>Selain UU Kesehatan, ketentuan mengenai percobaan tindak pidana juga diatur dalam KUHP lama dan KUHP baru (UU 1/2023). Dalam <strong>Pasal 53 KUHP lama</strong>, percobaan kejahatan dapat dipidana apabila terdapat niat, sudah ada permulaan pelaksanaan, dan kegagalan bukan karena kehendak pelaku sendiri. Sementara dalam KUHP baru, konsep tersebut ditegaskan dalam <strong>Pasal 17 UU 1/2023</strong>, dengan ketentuan bahwa percobaan dapat dipidana paling banyak 2/3 dari ancaman pidana maksimum.</p><h2>Ketentuan Aborsi: Perbandingan KUHP Lama &amp; KUHP Baru</h2><p>Untuk ketentuan aborsi, KUHP lama mengatur dalam <strong>Pasal 346</strong> bahwa perempuan yang sengaja menggugurkan kandungan dapat dipidana paling lama 4 tahun. Sedangkan KUHP baru melalui <strong>Pasal 463</strong> juga menetapkan ancaman pidana serupa, namun memberikan pengecualian bagi korban perkosaan atau kondisi kedaruratan medis.</p><p>Sementara itu, bagi pihak lain yang melakukan aborsi terhadap perempuan dengan persetujuan perempuan tersebut, KUHP lama mengatur dalam <strong>Pasal 348</strong>, dengan ancaman pidana maksimal 5 tahun 6 bulan, dan dapat meningkat jika menyebabkan kematian. KUHP baru mengatur hal ini dalam <strong>Pasal 464</strong>, dengan ancaman pidana hingga 5 tahun jika dilakukan dengan persetujuan, dan lebih berat jika tanpa persetujuan atau menyebabkan kematian.</p><h2>Analisis Hukum Kasus Percobaan Aborsi</h2><p>Dengan demikian, seorang perempuan hamil dan sang pacar yang melakukan percobaan Aborsi, berpotensi dijerat Pasal terkait larangan aborsi dalam UU Kesehatan serta ketentuan percobaan Aborsi dalam KUHP atau KUHP baru, sedangkan pacarnya dapat dikenakan pasal mengenai tindakan aborsi terhadap orang lain. Namun karena tindakan tersebut tidak sampai berhasil menggugurkan kandungan, maka yang dapat dikenakan adalah pidana percobaan aborsi, bukan aborsi yang telah selesai.</p><p>Hal ini sejalan dengan pendapat <strong>R. Soesilo</strong> yang menjelaskan unsur percobaan tindak pidana, yaitu adanya niat melakukan kejahatan, adanya permulaan pelaksanaan, serta kegagalan yang terjadi bukan karena pelaku membatalkan sendiri. Dalam kasus ini, unsur niat sudah terlihat dari kedua pihak, tindakan pelaksanaan sudah dimulai, tetapi aborsi tidak terjadi karena faktor yang berada di luar kehendak mereka.</p><blockquote><p>Jika Anda atau kerabat mengalami tekanan atau paksaan semacam ini, segera cari perlindungan hukum dan bantuan profesional. Ingat, keputusan medis adalah hak mutlak pasien (ibu hamil) yang harus dihormati.</p></blockquote><hr /><p><em><strong>Disclaimer:</strong> Artikel ini adalah informasi hukum umum dan bukan nasihat hukum profesional. Konsultasikan kasus spesifik Anda dengan pengacara.</em></p>",
    imageUrl: "/assets/aborsi_hukum.png",
    author: "Admin"
  },
  {
    id: "5",
    title: "Kewajiban Baru Laporan Tahunan Perseroan Terbatas (PT) Berdasarkan Permenkum Nomor 49 Tahun 2025",
    date: "2025-05-05",
    category: "CORPORATE",
    summary: "Kementerian Hukum RI menerbitkan Permenkum No. 49 Tahun 2025 yang membawa kewajiban pelaporan Laporan Tahunan PT melalui SABH dengan konsekuensi sanksi administratif.",
    content: "<p>Kementerian Hukum Republik Indonesia telah menerbitkan Peraturan Menteri Hukum Nomor 49 Tahun 2025 tentang Syarat dan Tata Cara Pendirian, Perubahan, dan Pembubaran Badan Hukum Perseroan Terbatas (<strong>\"Permenkum 49/2025\"</strong>), yang menggantikan Permenkumham Nomor 21 Tahun 2021.</p><p>Peraturan ini membawa perubahan penting terhadap kewajiban penyusunan, persetujuan, dan penyampaian Laporan Tahunan Perseroan Terbatas (PT), khususnya dengan diperkenalkannya kewajiban pelaporan kepada Menteri Hukum melalui Sistem Administrasi Badan Hukum (SABH).</p><h2>Apa yang Berubah?</h2><p>Sebelumnya, Laporan Tahunan pada prinsipnya merupakan dokumen internal Perseroan yang disusun oleh Direksi, ditelaah oleh Dewan Komisaris, dan disetujui melalui RUPS Tahunan.</p><p>Kini, Perseroan juga diwajibkan untuk menyampaikan persetujuan atas Laporan Tahunan kepada Menteri Hukum melalui SABH.</p><h2>Mekanisme yang Harus Dilakukan Perseroan</h2><p>Perseroan perlu memperhatikan tahapan berikut:</p><ul><li>Direksi menyusun Laporan Tahunan.</li><li>Dewan Komisaris melakukan penelaahan.</li><li>Perseroan menyelenggarakan RUPS Tahunan.</li><li>Persetujuan atas Laporan Tahunan wajib dituangkan dalam Akta Notaris.</li><li>Direksi melalui Notaris menyampaikan dokumen kepada Menteri Hukum melalui SABH.</li></ul><p>Dokumen yang wajib disampaikan meliputi:</p><ul><li>Akta Notaris mengenai persetujuan Laporan Tahunan; dan</li><li>Dokumen Laporan Tahunan.</li></ul><h2>Tenggat Waktu yang Perlu Diperhatikan</h2><p>Perseroan wajib memperhatikan dua batas waktu penting, yaitu:</p><ol><li><strong>Penyampaian kepada RUPS</strong>: Laporan Tahunan wajib disampaikan paling lambat 6 (enam) bulan setelah tahun buku berakhir.</li><li><strong>Penyampaian kepada Menteri Hukum</strong>: Akta Notaris dan Laporan Tahunan wajib disampaikan melalui SABH paling lambat 30 (tiga puluh) hari sejak Akta Notaris ditandatangani.</li></ol><h2>Substansi Minimal Laporan Tahunan</h2><p>Laporan Tahunan sekurang-kurangnya memuat:</p><ul><li>Laporan keuangan;</li><li>Laporan kegiatan Perseroan;</li><li>Laporan pelaksanaan tanggung jawab sosial dan lingkungan (TJSL/CSR);</li><li>Permasalahan yang memengaruhi kegiatan usaha Perseroan;</li><li>Laporan pengawasan Dewan Komisaris;</li><li>Susunan Direksi dan Dewan Komisaris; dan</li><li>Informasi mengenai gaji, honorarium, dan tunjangan Direksi serta Dewan Komisaris.</li></ul><h2>Sanksi atas Ketidakpatuhan</h2><p>Perseroan yang tidak memenuhi kewajiban pelaporan dapat dikenakan sanksi administratif berupa:</p><ol><li>Teguran tertulis; dan/atau</li><li>Pemblokiran akses SABH.</li></ol><p>Pemblokiran akses SABH berpotensi menghambat pelaksanaan berbagai tindakan korporasi, termasuk perubahan Direksi, Dewan Komisaris, pemegang saham, modal Perseroan, maupun perubahan Anggaran Dasar.</p><h2>Dasar Hukum</h2><ul><li>Undang-Undang Nomor 40 Tahun 2007 tentang Perseroan Terbatas sebagaimana telah diubah melalui Undang-Undang Nomor 6 Tahun 2023.</li><li>Peraturan Menteri Hukum Nomor 49 Tahun 2025 tentang Syarat dan Tata Cara Pendirian, Perubahan, dan Pembubaran Badan Hukum Perseroan Terbatas.</li></ul><p><em><strong>Catatan:</strong> Mengingat adanya kewajiban administratif baru beserta konsekuensi sanksinya, Perseroan perlu melakukan penyesuaian terhadap kalender kepatuhan (compliance calendar) dan tata kelola internal terkait penyusunan, persetujuan, serta pelaporan Laporan Tahunan.</em></p>",
    imageUrl: "/assets/laporan_tahunan.png",
    author: "Admin"
  },
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
