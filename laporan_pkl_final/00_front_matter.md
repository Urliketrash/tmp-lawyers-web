PERANCANGAN WEBSITE COMPANY PROFILE MENGGUNAKAN NEXT.JS DAN FIREBASE PADA TAO MANULLANG & PARTNERS LAW FIRM

LAPORAN PRAKTEK KERJA LAPANGAN

OLEH
[Nama Mahasiswa]
[NIM Mahasiswa]

PROGRAM STUDI SISTEM INFORMASI
FAKULTAS ILMU KOMPUTER
UNIVERSITAS LANCANG KUNING
2026

---

LEMBAR PERSETUJUAN

NIM         : [NIM Mahasiswa]
Nama        : [Nama Mahasiswa]
Judul Kerja Praktek : Perancangan Website Company Profile Menggunakan
                      Next.js dan Firebase Pada TAO MANULLANG & Partners
                      Law Firm

Laporan Kerja Praktek Ini Telah Diperiksa dan Disetujui.

Pekanbaru, [Tanggal] 2026

Pembimbing I

[Nama Dosen Pembimbing]
NIDN. [NIDN]

Mengetahui,
Ketua Program Studi
Sistem Informasi

Febrizal Alfarasy Syam, M.Kom.
NIDN. 1027029102

---

LEMBAR PENGESAHAN PRAKTEK KERJA LAPANGAN

Nama         : [Nama Mahasiswa]
NIM          : [NIM Mahasiswa]
Program Studi: Sistem Informasi
Judul        : Perancangan Website Company Profile Menggunakan Next.js
               dan Firebase Pada TAO MANULLANG & Partners Law Firm

Disetujui dan Disahkan Oleh :

Pekanbaru, [Tanggal] 2026

Dosen Penguji I                    Dosen Penguji II

[Nama Penguji I]                   [Nama Penguji II]
NIDN. [NIDN]                      NIDN. [NIDN]

Mengetahui,
Ketua Program Studi
Sistem Informasi

Febrizal Alfarasy Syam, M.Kom.
NIDN. 1027029102

---

KATA PENGANTAR

       Alhamdulillah Segala Puji bagi Allah Subhannahu wa Ta'ala yang telah memberikan Rahmat dan Hidayah-Nya kepada penulis dalam menyelesaikan Laporan Praktek Kerja Lapangan ini sehingga penulis dapat menyelesaikan tepat pada waktunya, dengan judul "Perancangan Website Company Profile Menggunakan Next.js dan Firebase Pada TAO MANULLANG & Partners Law Firm".
       Penulis menyadari bahwa tanpa adanya bantuan dari berbagai pihak, penulis akan banyak menemui kesulitan dalam penyusunan laporan ini. Untuk itu izinkan penulis mengucapkan terimakasih kepada :
1. Kepada orang tua dan keluarga saya tercinta yang selalu memberikan support dan do'a yang tidak hentinya dalam keadaan apapun.
2. Bapak Dr. Yogi Yunefri, M.Kom., MTA., MCE selaku Dekan Fakultas Ilmu Komputer Universitas Lancang Kuning.
3. Bapak Afriyansyah, M.Kom., MTA selaku Wakil Dekan I Fakultas Ilmu Komputer Universitas Lancang Kuning.
4. Ibu Dr. Lucky Lhaura Van FC, M.Kom., MTA selaku Wakil Dekan II Fakultas Ilmu Komputer Universitas Lancang Kuning.
5. Bapak Dr. Sutejo, M.Kom., MTA selaku Wakil Dekan III Fakultas Ilmu Komputer Universitas Lancang Kuning.
6. Bapak Febrizal Alfarasy Syam, M.Kom., MTA selaku Ketua Prodi Sistem Informasi Fakultas Ilmu Komputer Universitas Lancang Kuning.
7. [Nama Dosen Pembimbing] selaku Dosen Pembimbing yang telah memberikan arahan dan bimbingan kepada penulis.
8. Bapak dan Ibu dosen Fakultas Ilmu Komputer Universitas Lancang Kuning yang telah memberikan bekal ilmu kepada penulis.
9. Pihak TAO MANULLANG & Partners Law Firm yang telah memberikan kesempatan dan informasi kepada penulis sehingga laporan ini dapat terselesaikan dengan baik.
10. Teman-teman dan yang telah membantu dan selalu memberikan support kepada penulis.
       Penulis tentu menyadari bahwa Praktek Kerja Lapangan (PKL) ini masih jauh dari kata sempurna dan masih banyak terdapat kesalahan serta kekurangan di dalamnya, penulis mengharapkan kritik serta saran dari pembaca untuk Praktek Kerja Lapangan (PKL) ini, supaya Praktek Kerja Lapangan (PKL) ini nantinya dapat menjadi laporan yang lebih baik lagi, apabila terdapat banyak kesalahan pada Praktek Kerja Lapangan (PKL) ini penulis mohon maaf. Semoga laporan ini dapat bermanfaat. Terimakasih.

Pekanbaru, [Bulan] 2026

[Nama Mahasiswa]

---

DAFTAR ISI

LEMBAR PERSETUJUAN .................................................... ii
LEMBAR PENGESAHAN PRAKTEK KERJA LAPANGAN ............................ iii
KATA PENGANTAR ....................................................... iv
DAFTAR ISI ........................................................... vi
DAFTAR TABEL ........................................................ viii
DAFTAR GAMBAR ....................................................... ix
DAFTAR LAMPIRAN ..................................................... xi

BAB I PENDAHULUAN .................................................... 1
  A. Latar Belakang .................................................. 1
  B. Rumusan Masalah ................................................. 3
  C. Batasan Masalah ................................................. 3
  D. Tujuan Penelitian ............................................... 4
  E. Manfaat Penelitian .............................................. 4
  F. Sistematika Penulisan ........................................... 5

BAB II TINJAUAN PUSTAKA .............................................. 7
  A. Tinjauan Penelitian Terdahulu ................................... 7
  B. Teori-Teori Dasar ............................................... 11

BAB III METODOLOGI PENELITIAN ........................................ 22
  A. Tahapan-Tahapan Penelitian ...................................... 22
  B. Lokasi dan Waktu Penelitian ..................................... 25
  C. Data yang Digunakan ............................................. 25
  D. Teknik Pengumpulan Data ......................................... 25
  E. Metode/Pemodelan yang Digunakan ................................. 27

BAB IV GAMBARAN UMUM OBJEK PENELITIAN ................................ 29
  A. Sejarah Instansi ................................................ 29
  B. Struktur Organisasi ............................................. 30
  C. Visi dan Misi ................................................... 31
  D. Logo Instansi ................................................... 31

BAB V HASIL KEGIATAN PRAKTEK KERJA LAPANGAN .......................... 32
  A. Sistem yang Sedang Berjalan ..................................... 32
  B. Perancangan Sistem yang Ditawarkan .............................. 34
  C. Basis Data ...................................................... 44
  D. Perancangan Tampilan ............................................ 47

BAB VI KESIMPULAN DAN SARAN .......................................... 52
  A. Kesimpulan ...................................................... 52
  B. Saran ........................................................... 52

DAFTAR PUSTAKA ....................................................... 54
LAMPIRAN ............................................................. 56

---

DAFTAR TABEL

Tabel 2. 1 Penelitian Terdahulu ...................................... 7
Tabel 2. 2 Simbol Use Case Diagram ................................... 16
Tabel 2. 3 Simbol Activity Diagram ................................... 17
Tabel 2. 4 Simbol Class Diagram ...................................... 18
Tabel 5. 1 Struktur Koleksi News ..................................... 45
Tabel 5. 2 Struktur Koleksi Lawyers .................................. 45
Tabel 5. 3 Struktur Data Users ....................................... 46

---

DAFTAR GAMBAR

Gambar 3. 1 Tahap Penelitian ......................................... 22
Gambar 3. 2 Metode Prototyping ....................................... 27
Gambar 4. 1 Kantor TAO MANULLANG & Partners Law Firm ................. 29
Gambar 4. 2 Struktur Organisasi TAO MANULLANG & Partners ............. 30
Gambar 4. 3 Logo TAO MANULLANG & Partners Law Firm ................... 31
Gambar 5. 1 Flowchart Sistem yang Sedang Berjalan .................... 33
Gambar 5. 2 Use Case Diagram ......................................... 35
Gambar 5. 3 Activity Diagram Login Admin ............................. 37
Gambar 5. 4 Activity Diagram Kelola Berita ........................... 38
Gambar 5. 5 Activity Diagram Mengakses Berita ........................ 39
Gambar 5. 6 Activity Diagram Mengirim Pesan Kontak ................... 40
Gambar 5. 7 Class Diagram ............................................ 41
Gambar 5. 8 Sequence Diagram Login Admin ............................. 42
Gambar 5. 9 Sequence Diagram Kelola Berita ........................... 43
Gambar 5. 10 Desain Tampilan Halaman Utama ........................... 47
Gambar 5. 11 Desain Tampilan Profil Pengacara ........................ 48
Gambar 5. 12 Desain Tampilan Halaman Berita .......................... 49
Gambar 5. 13 Desain Tampilan Halaman Login Admin ..................... 49
Gambar 5. 14 Desain Tampilan Dashboard Admin ......................... 50
Gambar 5. 15 Desain Tampilan Form Tambah Berita ...................... 51

---

DAFTAR LAMPIRAN

Lampiran 1 Surat Izin Penelitian ..................................... 56
Lampiran 2 Foto Wawancara ........................................... 57
Lampiran 3 Kartu Bimbingan .......................................... 58

---

BAB I
PENDAHULUAN

A. Latar Belakang

       Kemajuan teknologi informasi saat ini telah membawa perubahan yang cukup besar dalam berbagai bidang kehidupan, termasuk di sektor jasa profesional seperti firma hukum. Pada era yang serba digital ini, keberadaan sebuah website resmi bukan lagi sekadar pelengkap, melainkan sudah menjadi kebutuhan utama bagi sebuah perusahaan untuk menunjukkan eksistensi dan kredibilitasnya di mata publik. Calon klien zaman sekarang cenderung mencari informasi mengenai penyedia jasa terlebih dahulu melalui internet sebelum memutuskan untuk menggunakan jasanya. Oleh karena itu, sebuah firma hukum yang belum memiliki website resmi akan kesulitan dalam menjangkau calon klien baru, terutama generasi yang sudah terbiasa dengan budaya digital.
       TAO MANULLANG & Partners Law Firm merupakan firma hukum yang didirikan di Jakarta sejak tahun 2021 dan berkantor di The Habibie Center Lantai 1, Jalan Kemang Selatan No. 98, Jakarta Selatan. Firma ini menyediakan bantuan jasa hukum yang cukup luas, mulai dari litigasi, non-litigasi, sampai area bisnis komersial bagi individu maupun badan usaha. Meskipun sudah berjalan selama beberapa tahun, penulis menemukan bahwa firma ini belum memiliki sebuah website resmi yang dapat diakses oleh masyarakat umum secara bebas.
       Berdasarkan hasil wawancara yang penulis lakukan dengan pihak firma selama pelaksanaan PKL, diketahui bahwa selama ini penyampaian profil perusahaan kepada calon klien masih mengandalkan dokumen cetak berupa brosur atau file PDF yang dikirimkan lewat email secara manual. Informasi mengenai kegiatan firma seperti seminar hukum dan liputan perkara juga hanya dipublikasikan melalui akun media sosial Instagram yang kontennya tersebar dan tidak terdokumentasi secara rapi. Selain itu, firma ini belum memiliki sistem pengelolaan konten yang memungkinkan stafnya untuk mempublikasikan berita atau artikel hukum secara mandiri tanpa bantuan pihak luar.
       Kondisi tersebut tentu menimbulkan sejumlah kendala. Pertama, calon klien tidak dapat memperoleh informasi lengkap mengenai firma secara mandiri tanpa harus menghubungi pihak firma terlebih dahulu. Kedua, informasi yang tersebar di media sosial tidak terindeks oleh mesin pencari sehingga jangkauannya terbatas. Ketiga, citra profesional firma belum terwakili secara optimal di dunia digital karena belum adanya platform resmi yang menampilkan profil perusahaan secara terstruktur.
       Melihat permasalahan tersebut, penulis berinisiatif untuk merancang dan mengembangkan sebuah website company profile untuk TAO MANULLANG & Partners Law Firm. Website ini dirancang tidak hanya sebagai media informasi statis, tetapi juga dilengkapi dengan sistem pengelolaan berita (CMS) yang memungkinkan staf firma untuk menambah, mengubah, dan menghapus berita hukum secara mandiri. Selain itu, website juga menyediakan formulir kontak yang terintegrasi langsung ke email firma sehingga calon klien dapat mengirimkan pesan konsultasi awal secara online.
       Dalam pengembangan website ini, penulis menggunakan framework Next.js sebagai basis pembangunan frontend karena framework tersebut mendukung fitur Server-Side Rendering yang sangat baik untuk keperluan optimasi mesin pencari. Untuk sisi backend, penulis memanfaatkan Firebase sebagai penyedia layanan database, autentikasi, dan penyimpanan file secara cloud tanpa perlu membangun server sendiri. Sementara untuk tampilan antarmuka, digunakan Tailwind CSS yang memungkinkan pembuatan desain responsif secara cepat dan konsisten.
       Berdasarkan latar belakang tersebut, penulis tertarik untuk melakukan penelitian mengenai "Perancangan Website Company Profile Menggunakan Next.js dan Firebase Pada TAO MANULLANG & Partners Law Firm", guna membantu memecahkan permasalahan yang ada serta mendukung transformasi digital firma hukum tersebut.

B. Rumusan Masalah

       Berdasarkan latar belakang masalah yang telah diuraikan di atas, maka rumusan masalah dalam penelitian ini adalah sebagai berikut :
1. Bagaimana merancang dan membangun website company profile yang informatif dan profesional untuk TAO MANULLANG & Partners Law Firm menggunakan framework Next.js?
2. Bagaimana mendesain antarmuka pengguna (user interface) website serta panel admin yang mudah digunakan oleh staf firma hukum?

C. Batasan Masalah

       Agar penelitian ini lebih terarah dan terfokus, maka penulis menetapkan batasan masalah sebagai berikut :
1. Sistem yang dikembangkan berfokus pada pembuatan website company profile dan modul pengelolaan berita hukum.
2. Pengembangan tampilan menggunakan framework Next.js dan Tailwind CSS dengan desain yang responsif.
3. Backend menggunakan layanan Firebase meliputi Firestore sebagai database, Authentication untuk login admin, dan Storage untuk penyimpanan gambar.

D. Tujuan Penelitian

       Adapun tujuan dari penelitian ini adalah sebagai berikut :
1. Merancang dan membangun website company profile yang dapat merepresentasikan profil TAO MANULLANG & Partners Law Firm secara digital.
2. Merancang desain antarmuka panel admin yang memudahkan staf firma dalam mengelola konten berita hukum secara mandiri.

E. Manfaat Penelitian

Bagi Penulis
       Penelitian ini memberikan pengalaman praktis kepada penulis dalam menerapkan teori dan metode perancangan sistem informasi berbasis web. Penulis dapat mengembangkan keterampilan dalam analisis kebutuhan, perancangan antarmuka, serta pengembangan sistem menggunakan teknologi web modern seperti Next.js dan Firebase.

Bagi Pembaca
       Hasil penelitian ini dapat menjadi referensi bagi mahasiswa atau pihak lain yang tertarik dalam pengembangan website company profile menggunakan framework JavaScript modern. Penelitian ini juga dapat memperkaya literatur mengenai penggunaan Firebase sebagai backend pada aplikasi web.

Bagi Objek Penelitian
       Website yang dihasilkan diharapkan dapat membantu TAO MANULLANG & Partners Law Firm dalam memperluas jangkauan klien secara digital, meningkatkan citra profesional firma, serta menyediakan wadah publikasi berita dan artikel hukum yang terstruktur.

F. Sistematika Penulisan

       Dalam penyusunan penelitian Praktek Kerja Lapangan ini, pembahasan terbagi menjadi enam bab yang akan diuraikan secara singkat sebagai pedoman agar mempermudah dalam melakukan penulisan yaitu sebagai berikut :
BAB I PENDAHULUAN
       Pada bab ini menjelaskan tentang latar belakang, rumusan masalah, batasan masalah, tujuan penelitian, manfaat penelitian dan sistematika penulisan.
BAB II TINJAUAN PUSTAKA
       Pada bab ini berisi deskripsi dari tinjauan penelitian terdahulu dan teori-teori dasar yang digunakan dalam penelitian ini.
BAB III METODOLOGI PENELITIAN
       Bab ini berisikan tahapan-tahapan yang terstruktur untuk menyelesaikan penelitian meliputi tahapan penelitian, lokasi penelitian, data yang digunakan, model dan teknik pengumpulan data serta metode atau pemodelan yang digunakan.
BAB IV GAMBARAN UMUM OBJEK PENELITIAN
       Bab ini menjelaskan terkait sejarah perusahaan, struktur organisasi, visi dan misi hingga logo perusahaan yang menjadi objek penelitian terkait.
BAB V HASIL KEGIATAN PRAKTEK KERJA LAPANGAN
       Pada bab ini memaparkan hasil dari seluruh tahapan kegiatan penelitian yang meliputi tahap analisis, perancangan sistem, basis data dan perancangan tampilan.
BAB VI KESIMPULAN DAN SARAN
       Bab ini membahas mengenai kesimpulan dari penelitian yang dilakukan oleh penulis terkait dengan tujuan dan permasalahan yang ada, serta saran untuk pengembangan sistem dimasa mendatang.
