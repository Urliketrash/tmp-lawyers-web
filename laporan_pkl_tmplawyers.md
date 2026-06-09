PERANCANGAN DAN PENGEMBANGAN WEBSITE COMPANY PROFILE BERBASIS WEB MENGGUNAKAN NEXT.JS DAN FIREBASE PADA TAO MANULLANG & PARTNERS LAW FIRM

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
Judul Kerja Praktek : Perancangan dan Pengembangan Website Company Profile
                      Berbasis Web Menggunakan Next.js dan Firebase Pada
                      TAO MANULLANG & Partners Law Firm

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
Judul        : Perancangan dan Pengembangan Website Company Profile
               Berbasis Web Menggunakan Next.js dan Firebase Pada
               TAO MANULLANG & Partners Law Firm

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

       Alhamdulillah Segala Puji bagi Allah Subhannahu wa Ta'ala yang telah memberikan Rahmat dan Hidayah-Nya kepada penulis dalam menyelesaikan Laporan Praktek Kerja Lapangan ini sehingga penulis dapat menyelesaikan tepat pada waktunya, dengan judul "Perancangan dan Pengembangan Website Company Profile Berbasis Web Menggunakan Next.js dan Firebase Pada TAO MANULLANG & Partners Law Firm".
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
       Berdasarkan latar belakang tersebut, penulis tertarik untuk melakukan penelitian mengenai "Perancangan dan Pengembangan Website Company Profile Berbasis Web Menggunakan Next.js dan Firebase Pada TAO MANULLANG & Partners Law Firm", guna membantu memecahkan permasalahan yang ada serta mendukung transformasi digital firma hukum tersebut.

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
BAB II
TINJAUAN PUSTAKA

A. Tinjauan Penelitian Terdahulu

       Dalam proses perancangan dan pengembangan website company profile berbasis web ini, terdapat sejumlah penelitian terdahulu yang menjadi referensi penting dan relevan. Penelitian-penelitian ini memberikan gambaran mengenai tren teknologi yang digunakan, efektivitas sistem yang dikembangkan, serta tantangan dan solusi yang dapat diterapkan. Berikut adalah beberapa penelitian terdahulu yang menjadi rujukan dalam mendukung penelitian ini, diantaranya :

Tabel 2. 1 Penelitian Terdahulu

| No | Peneliti | Judul Penelitian dan Tahun | Metode | Hasil Penelitian | Relevansi |
|----|----------|---------------------------|--------|------------------|-----------|
| 1. | Azizul Hakim, NM Faizah, Widyat Nurcahyo | Rancang Bangun Sistem Informasi Akademik di Madrasah Ibtidaiyah Al Hidayah Subang dengan Metode Waterfall menggunakan PHP dan MySQL Berbasis Web (2023) | Waterfall | Sistem mampu memudahkan pengelolaan data dan mendukung pengambilan keputusan berbasis data. | Menekankan pentingnya pengembangan sistem informasi berbasis web untuk meningkatkan efisiensi pengelolaan data. |
| 2. | Naufal Anshor Al Azfar, Sharazita Dyah Anggita | Penerapan Metode Waterfall pada Sistem Informasi E-Rapor (2024) | Waterfall | Sistem mampu mengatasi kendala sistem lama seperti pencatatan manual dan akses informasi terbatas. | Menunjukkan bahwa penerapan metode pengembangan yang terstruktur berhasil meningkatkan efisiensi. |
| 3. | M. Yasser Arafat, Yoga Putra Pratama | Sistem Informasi Akademik Berbasis Web Menggunakan Metode Extreme Programming (2024) | XP | Sistem memudahkan pengolahan data dan meningkatkan akses informasi dengan kecepatan tinggi. | Relevansi dalam kemampuan mendukung pengembangan sistem yang fleksibel dan adaptif. |
| 4. | Jamaludin, Romindo | Sistem Informasi Akademik Berbasis Web Menggunakan Metode Waterfall pada SMA Kemala Bhayangkari I Medan (2019) | Waterfall | Penerapan sistem berbasis web meningkatkan kecepatan dan efisiensi pengolahan data. | Sistem berbasis web dapat mengurangi ketergantungan terhadap proses manual. |
| 5. | Susana Dwi Yulianti, Bachri Nur Alam | Penerapan Sistem Informasi Akademik Berbasis Website dengan Metode Waterfall di Pondok Pesantren Al-Falah (2023) | Waterfall | Sistem berhasil mempermudah proses administrasi dan manajemen secara sistematis. | Relevan dalam peningkatan efisiensi pengelolaan data melalui teknologi informasi. |
| 6. | Kevin Fahrezi dkk. | Penerapan Model Waterfall dalam Pengembangan Sistem Informasi Akademik Berbasis Web (2021) | Waterfall | Pengembangan dilakukan melalui enam tahap mulai dari perencanaan hingga pemeliharaan. | Mendukung efisiensi proses administrasi melalui pengembangan sistem yang terstruktur. |
| 7. | Syahid Abdullah | Perancangan SIAKAD Berbasis Web Menggunakan Metode Waterfall Studi Kasus SMK Plus Nusa Putra (2022) | Waterfall | Sistem membantu meningkatkan efisiensi dan mengurangi kesalahan pendataan. | Mendukung kebutuhan institusi dalam meningkatkan efisiensi pengolahan data. |

B. Teori-Teori Dasar

       Agar proses perancangan dan pengembangan website ini berjalan dengan baik, maka diperlukan landasan teori yang mendukung. Berikut adalah teori-teori dasar yang digunakan dalam penelitian ini.

1. Sistem Informasi

       Sistem informasi merupakan sekumpulan komponen yang saling berhubungan dan bekerja sama untuk mengumpulkan, memproses, menyimpan, dan mendistribusikan informasi guna mendukung pengambilan keputusan dalam suatu organisasi (Laudon dan Laudon, 2020). Dalam penelitian ini, sistem informasi diwujudkan dalam bentuk website company profile yang menjadi platform digital untuk menyampaikan informasi profil perusahaan, layanan hukum, profil pengacara, dan berita hukum secara terstruktur.

2. Website

       Website atau situs web merupakan kumpulan halaman-halaman yang dapat diakses melalui jaringan internet dan menampilkan informasi dalam bentuk teks, gambar, video, maupun multimedia lainnya. Berdasarkan sifatnya, website dibedakan menjadi dua jenis yaitu website statis yang kontennya tetap dan hanya berubah jika kode sumbernya diedit secara langsung, serta website dinamis yang kontennya dapat berubah secara otomatis berdasarkan interaksi pengguna atau data dari database. Website yang dikembangkan dalam penelitian ini termasuk website dinamis karena konten berita dapat dikelola melalui panel admin tanpa perlu mengedit kode program.

3. Company Profile

       Company profile adalah media yang berisi informasi lengkap mengenai suatu perusahaan, meliputi sejarah pendirian, visi misi, bidang usaha, layanan yang ditawarkan, struktur organisasi, dan informasi kontak. Di era digital saat ini, company profile tidak lagi terbatas pada media cetak saja melainkan sudah bertransformasi ke dalam bentuk website yang dapat diakses secara online oleh siapa saja dan kapan saja. Sebuah website company profile yang baik harus mampu merepresentasikan identitas dan citra profesional perusahaan melalui desain yang menarik serta pengalaman pengguna yang nyaman.

4. Next.js

       Next.js merupakan framework React yang dikembangkan oleh Vercel untuk membangun aplikasi web modern. Framework ini mendukung fitur Server-Side Rendering (SSR) di mana konten halaman website dapat di-render terlebih dahulu di sisi server sebelum dikirimkan ke browser pengunjung. Hal ini sangat bermanfaat untuk keperluan Search Engine Optimization (SEO) karena mesin pencari dapat mengindeks konten website dengan lebih optimal. Pada versi terbarunya, Next.js menggunakan arsitektur App Router yang memungkinkan pengaturan routing halaman secara otomatis berbasis struktur folder. Sebagai contoh, pembuatan folder bernama news/[id] secara otomatis akan menangani halaman dinamis untuk setiap berita berdasarkan identitasnya masing-masing.

5. Firebase

       Firebase merupakan platform layanan backend yang disediakan oleh Google dan dikenal dengan istilah Backend-as-a-Service (BaaS). Platform ini memungkinkan pengembang untuk memanfaatkan layanan infrastruktur backend seperti database, autentikasi, dan penyimpanan file tanpa perlu membangun server sendiri. Dalam penelitian ini, tiga layanan Firebase yang digunakan adalah :
       a) Firebase Authentication yang menyediakan sistem login admin menggunakan metode email dan password secara aman.
       b) Cloud Firestore yang merupakan database NoSQL berbasis dokumen untuk menyimpan data berita dan artikel hukum.
       c) Firebase Storage yang digunakan untuk menyimpan file gambar yang diunggah melalui panel admin.

6. Tailwind CSS

       Tailwind CSS merupakan framework CSS yang menggunakan pendekatan utility-first, yaitu pengembang membangun tampilan dengan mengombinasikan kelas-kelas utilitas yang sudah disediakan secara langsung pada elemen HTML. Berbeda dengan framework CSS lain seperti Bootstrap yang menyediakan komponen jadi, Tailwind CSS memberikan kebebasan penuh untuk membuat desain yang unik sesuai kebutuhan. Dalam proyek ini digunakan Tailwind CSS versi 4 yang konfigurasinya dilakukan langsung melalui file CSS menggunakan variabel warna khusus sesuai identitas firma hukum, yaitu warna hitam dan emas.

7. Unified Modeling Language (UML)

       Unified Modeling Language (UML) merupakan bahasa pemodelan standar yang digunakan untuk merancang dan mendokumentasikan sistem perangkat lunak secara visual. UML menyediakan seperangkat notasi grafis yang membantu pengembang dalam menggambarkan arsitektur dan perilaku sistem sebelum masuk ke tahap implementasi. Beberapa jenis diagram UML yang digunakan dalam penelitian ini antara lain :

a) Use Case Diagram
       Use case diagram menggambarkan interaksi antara aktor (pengguna sistem) dengan fungsionalitas yang tersedia pada sistem. Diagram ini menunjukkan fitur apa saja yang dapat diakses oleh setiap jenis pengguna.

Tabel 2. 2 Simbol Use Case Diagram

| Simbol | Nama | Deskripsi |
|--------|------|-----------|
| (Ikon Orang) | Actor | Menspesifikasikan himpunan peran yang pengguna mainkan ketika berinteraksi dengan sistem. |
| (Oval) | Use Case | Deskripsi dan urutan aksi-aksi yang ditampilkan sistem yang menghasilkan hasil terukur bagi aktor. |
| (Garis) | Association | Menghubungkan antara aktor dengan use case. |
| (Panah <<extend>>) | Extend | Menspesifikasikan bahwa use case target memperluas perilaku dari use case sumber. |
| (Panah <<include>>) | Include | Menspesifikasikan bahwa use case sumber secara eksplisit menyertakan perilaku use case lain. |
| (Kotak) | System Boundary | Menspesifikasikan batas sistem yang menampilkan use case di dalamnya. |

b) Activity Diagram
       Activity diagram menggambarkan alur kerja atau aktivitas dari sebuah proses dalam sistem. Diagram ini menunjukkan urutan langkah-langkah yang harus dilakukan untuk menyelesaikan suatu tugas tertentu.

Tabel 2. 3 Simbol Activity Diagram

| Simbol | Nama | Deskripsi |
|--------|------|-----------|
| (Lingkaran Penuh) | Initial Node | Status awal yang menandakan dimulainya suatu aktivitas. |
| (Persegi Panjang Rounded) | Activity | Memperlihatkan aktivitas atau aksi yang dilakukan dalam proses. |
| (Diamond) | Decision | Pilihan untuk mengambil keputusan berdasarkan kondisi tertentu. |
| (Garis Tebal) | Fork/Join Node | Percabangan atau penggabungan aliran aktivitas. |
| (Lingkaran Ganda) | Activity Final Node | Status akhir yang menandakan berakhirnya suatu aktivitas. |

c) Class Diagram
       Class diagram menggambarkan struktur kelas-kelas dalam sistem beserta hubungan antar kelasnya. Diagram ini menampilkan nama kelas, atribut, metode, serta relasi seperti asosiasi, agregasi, dan komposisi.

Tabel 2. 4 Simbol Class Diagram

| Simbol | Nama | Deskripsi |
|--------|------|-----------|
| (Kotak 3 Bagian) | Class | Blok pembangun pada pemrograman berorientasi objek yang terdiri dari nama, atribut, dan method. |
| (Garis) | Association | Hubungan umum antara dua class. |
| (Jajargenjang Kosong) | Aggregation | Relasi mempunyai dimana class anak dapat berdiri sendiri. |
| (Jajargenjang Penuh) | Composition | Relasi bagian dari dimana class anak tidak dapat berdiri sendiri. |
| (Panah Solid) | Generalization | Relasi inheritance dimana class anak mewarisi perilaku class induk. |
| (Panah Putus-putus) | Dependency | Relasi ketergantungan antar class. |

8. Database NoSQL

       Database NoSQL merupakan jenis database yang tidak menggunakan model tabel relasional tradisional. Berbeda dengan database seperti MySQL yang menyimpan data dalam tabel dengan baris dan kolom, database NoSQL menyimpan data dalam format yang lebih fleksibel seperti dokumen. Cloud Firestore yang digunakan dalam penelitian ini menyimpan data dalam bentuk koleksi yang berisi dokumen-dokumen, di mana setiap dokumen memiliki identitas unik dan berisi pasangan field-value yang tidak harus seragam antar dokumen satu dengan lainnya.
BAB III
METODOLOGI PENELITIAN

A. Tahapan-Tahapan Penelitian

       Dalam proses penulisan Laporan Praktek Kerja Lapangan ini, penulis melakukan beberapa tahapan yang digambarkan seperti struktur dibawah ini :

Gambar 3. 1 Tahap Penelitian

1. Perencanaan
       Perencanaan merupakan tahap awal dalam sebuah penelitian yang berfungsi untuk mengarahkan dan membatasi ruang lingkup penelitian agar tetap fokus dan terarah. Tahapan ini mencakup beberapa langkah penting :
a) Menentukan Rumusan Masalah
       Mengidentifikasi masalah yang akan diteliti. Rumusan masalah harus jelas dan spesifik sehingga dapat dijawab melalui penelitian.
b) Menetapkan Tujuan
       Menentukan apa yang ingin dicapai melalui penelitian. Tujuan penelitian harus relevan dengan masalah yang diidentifikasi dan dapat memberikan solusi.
c) Menetapkan Batasan
       Mengidentifikasi ruang lingkup dan batasan penelitian untuk menghindari cakupan yang terlalu luas.
d) Menentukan Manfaat Penelitian
       Mengidentifikasi kontribusi penelitian baik secara teoritis maupun praktis.

2. Pengumpulan Data
       Pengumpulan data adalah tahapan dimana informasi yang diperlukan untuk menjawab pertanyaan penelitian dikumpulkan. Beberapa metode yang digunakan adalah :
a) Observasi
       Mengamati secara langsung kondisi penyampaian informasi yang sedang berjalan di firma hukum.
b) Wawancara
       Mengumpulkan data melalui interaksi langsung dengan pihak manajemen firma untuk menggali kebutuhan website.
c) Studi Pustaka
       Mengumpulkan data dari literatur, jurnal, dokumentasi teknis, dan sumber lain yang relevan.

3. Perancangan
       Pada tahap ini dilakukan perancangan terhadap tiga aspek utama yaitu :
a) Perancangan Sistem
       Membuat rancangan teknis dari sistem yang akan dikembangkan menggunakan diagram-diagram UML meliputi use case diagram, activity diagram, class diagram, dan sequence diagram.
b) Perancangan Database
       Merancang struktur data dan hubungan antar data untuk memastikan informasi disimpan dan dikelola secara efektif.
c) Perancangan Tampilan
       Mendesain antarmuka pengguna (user interface) agar website mudah digunakan dan memenuhi kebutuhan pengguna.

B. Lokasi dan Waktu Penelitian

       Lokasi penelitian ini dilaksanakan di TAO MANULLANG & Partners Law Firm yang beralamat di The Habibie Center Lantai 1, Jalan Kemang Selatan No. 98, Cilandak Timur, Jakarta Selatan, 12560. Pelaksanaan penelitian pada [Tanggal] 2026.

C. Data yang Digunakan

       Dalam penyusunan Laporan Praktek Kerja Lapangan, penulis menggunakan data-data sebagai berikut :

1. Data Primer
       Data primer didapatkan dengan melakukan observasi langsung pada pihak TAO MANULLANG & Partners Law Firm dan wawancara dengan pihak manajemen firma. Data primer meliputi informasi profil pengacara, area praktik layanan hukum, informasi kontak, aset visual seperti logo dan foto pengacara, serta kebutuhan fitur website yang diinginkan.

2. Data Sekunder
       Data yang didapat pada data sekunder ini adalah jurnal yang berhubungan dengan penelitian yaitu tentang pengembangan website berbasis web, dokumentasi resmi framework Next.js, dokumentasi Firebase, dan dokumentasi Tailwind CSS.

D. Teknik Pengumpulan Data

       Pada penelitian ini teknik pengumpulan data yang digunakan adalah :

1. Observasi
       Pengamatan langsung terhadap sistem penyampaian informasi yang masih dilakukan secara konvensional di TAO MANULLANG & Partners Law Firm. Melalui observasi ini, penulis dapat memahami bagaimana selama ini firma menyampaikan profil perusahaan kepada calon klien, media apa yang digunakan untuk publikasi kegiatan hukum, serta kendala-kendala apa saja yang dihadapi. Hasil observasi menunjukkan bahwa firma masih mengandalkan dokumen cetak dan media sosial yang kontennya tersebar untuk menyampaikan informasi.

2. Wawancara
       Wawancara dilakukan dengan pihak manajemen firma hukum secara langsung untuk menggali informasi yang lebih mendalam mengenai kebutuhan website yang diharapkan. Wawancara mencakup pertanyaan terkait fitur apa saja yang diinginkan, desain visual seperti apa yang diharapkan, konten yang harus ditampilkan, serta siapa yang akan bertanggung jawab mengelola konten website setelah selesai dikembangkan. Informasi dari wawancara ini menjadi dasar utama dalam menentukan kebutuhan sistem.

3. Studi Pustaka
       Mengumpulkan data dan informasi dari berbagai sumber literatur seperti jurnal ilmiah, dokumentasi teknis framework, dan laporan penelitian terdahulu yang relevan. Studi pustaka ini bertujuan untuk memperoleh dasar teori yang kuat dan mendukung proses perancangan sistem, baik dari segi teknis seperti pemodelan UML dan teknologi web maupun dari segi metodologis. Dengan menggabungkan ketiga teknik ini, penulis dapat menyusun perancangan sistem secara komprehensif, terarah, dan sesuai dengan kebutuhan nyata di lapangan.

E. Metode/Pemodelan yang Digunakan

       Pada penelitian ini, metode pengembangan yang digunakan adalah metode Prototyping. Metode Prototyping merupakan pendekatan pengembangan sistem dimana pengembang membangun prototipe atau model awal dari sistem terlebih dahulu, kemudian prototipe tersebut ditunjukkan kepada pengguna atau klien untuk dievaluasi. Berdasarkan umpan balik yang diterima, prototipe diperbaiki secara berulang sampai sesuai dengan kebutuhan yang diharapkan. Metode ini dipilih karena sangat cocok untuk proyek pengembangan website company profile di mana kebutuhan desain visual dan pengalaman pengguna memerlukan umpan balik langsung dari pihak firma secara berkala.

Gambar 3. 2 Metode Prototyping

       Tahapan metode Prototyping yang diterapkan adalah sebagai berikut :
1. Identifikasi Kebutuhan Awal : Penulis mengidentifikasi kebutuhan website melalui wawancara dan observasi. Pada tahap ini ditetapkan bahwa website harus memiliki tampilan premium dengan skema warna hitam dan emas, dilengkapi animasi scroll, serta panel admin untuk pengelolaan berita.
2. Membangun Prototipe : Penulis membangun prototipe awal berupa halaman-halaman website yang mencakup landing page dengan komponen profil firma, profil pengacara, area praktik, berita, dan kontak.
3. Evaluasi dan Umpan Balik : Prototipe ditunjukkan kepada pihak firma untuk mendapatkan masukan terkait desain, konten, dan fungsionalitas. Pada tahap ini dilakukan beberapa kali perbaikan terutama pada desain profil pengacara dan tata letak konten.
4. Penyempurnaan dan Pengembangan : Berdasarkan umpan balik, penulis melakukan penyempurnaan hingga sistem final siap untuk digunakan.

---

BAB IV
GAMBARAN UMUM OBJEK PENELITIAN

A. Sejarah Instansi

Gambar 4. 1 Kantor TAO MANULLANG & Partners Law Firm

       TAO MANULLANG & Partners Law Firm merupakan kantor pengacara dan advokat yang didirikan di Jakarta pada tahun 2021 oleh Wang Tao Bicton Manullang, S.H. selaku Founding Partner. Firma ini berlokasi di The Habibie Center Lantai 1, Jalan Kemang Selatan No. 98, Cilandak Timur, Jakarta Selatan, 12560.
       Sejak didirikan, TMP Law Firm hadir untuk menawarkan bantuan jasa hukum yang komprehensif kepada klien baik perorangan maupun badan usaha. Jasa hukum yang disediakan mencakup berbagai area sesuai kebutuhan klien, meliputi area litigasi, non-litigasi, hingga area bisnis komersial bagi individu maupun perusahaan. Firma ini mengusung motto "Trust â€“ Strategy â€“ Professional" yang menjadi landasan dalam setiap pelayanan hukum yang diberikan.
       TMP Law Firm didukung oleh tim pengacara yang profesional di berbagai bidang keahlian, meliputi Hukum Pidana, Hukum Perdata, Hukum Bisnis, Hukum Perbankan, Hukum Properti, Hukum Ketenagakerjaan, hingga sektor Energi dan Konstruksi. Selain menangani perkara, firma ini juga memberikan pelayanan jasa hukum preventif bagi kegiatan bisnis klien melalui identifikasi regulasi, analisis pengelolaan risiko, dan pemberian pertimbangan hukum.

B. Struktur Organisasi

Gambar 4. 2 Struktur Organisasi TAO MANULLANG & Partners Law Firm

       Struktur organisasi TAO MANULLANG & Partners Law Firm terdiri dari :
1. Founding Partner : Wang Tao Bicton Manullang, S.H.
   Pendiri dan pimpinan firma yang bertanggung jawab atas strategi bisnis dan penanganan perkara di bidang hukum korporasi dan energi.
2. Partner : H Ronaldo Munthe, S.H.
   Partner firma yang berpengalaman dalam litigasi, non-litigasi, dan sengketa pertanahan.
3. Associate Lawyer : Yudis Arya Bramasta, S.H.
   Advokat dengan spesialisasi dalam Legal Due Diligence dan hukum korporasi.
4. Associate Lawyer : Fadil Taufiq, S.H.
   Konsultan hukum yang fokus pada hukum komersial dan ketenagakerjaan.

C. Visi dan Misi

Visi :
       Menjadi firma hukum terdepan dan terpercaya yang mampu menjawab kebutuhan klien atas segala permasalahan hukum yang dihadapi.

Misi :
1. Memberikan pelayanan hukum terbaik dan solutif kepada setiap klien.
2. Berdedikasi terhadap transparansi dan etika profesi advokat.
3. Meningkatkan kesadaran hukum masyarakat melalui publikasi dan edukasi hukum.
4. Membangun tim pengacara yang kompeten dan profesional.
5. Mendukung upaya preventif pada kegiatan bisnis klien melalui analisis risiko hukum.

D. Logo Instansi

Gambar 4. 3 Logo TAO MANULLANG & Partners Law Firm

       Logo TAO MANULLANG & Partners Law Firm menggunakan perpaduan warna hitam dan emas sebagai identitas visual utama. Warna hitam mencerminkan kesan formal dan otoritatif yang identik dengan profesi hukum, sedangkan warna emas melambangkan kepercayaan dan standar kualitas tinggi. Kombinasi warna ini digunakan secara konsisten baik pada media cetak maupun pada desain website yang dikembangkan dalam penelitian ini.
BAB V
HASIL KEGIATAN PRAKTEK KERJA LAPANGAN

A. Sistem yang Sedang Berjalan

       Sistem penyampaian informasi profil perusahaan yang sedang berjalan di TAO MANULLANG & Partners Law Firm saat ini masih bersifat konvensional dan belum memanfaatkan teknologi informasi secara maksimal. Berdasarkan hasil observasi dan wawancara yang dilakukan selama pelaksanaan PKL, ditemukan beberapa kondisi sebagai berikut.
       Penyampaian profil firma kepada calon klien masih mengandalkan dokumen cetak berupa brosur atau file PDF yang dikirimkan melalui email secara manual. Setiap kali ada perubahan informasi, dokumen harus diperbarui dan didistribusikan kembali. Calon klien tidak dapat memperoleh informasi terkini mengenai firma secara mandiri tanpa menghubungi pihak firma terlebih dahulu.
       Publikasi kegiatan hukum dan berita masih tersebar di media sosial tanpa adanya satu pusat informasi resmi yang terstruktur. Informasi yang dipublikasikan tidak terarsip dengan baik dan tidak terindeks oleh mesin pencari sehingga jangkauannya terbatas. Selain itu, belum ada sistem administrasi konten internal yang memungkinkan staf firma mengelola berita secara mandiri.
       Dengan berbagai keterbatasan tersebut, dapat disimpulkan bahwa sistem yang sedang berjalan belum mendukung efisiensi penyampaian informasi dan belum memfasilitasi kemudahan akses bagi calon klien. Berikut ini merupakan flowchart yang menggambarkan sistem yang sedang berjalan.

Gambar 5. 1 Flowchart Sistem yang Sedang Berjalan

B. Perancangan Sistem yang Ditawarkan

       Berdasarkan hasil analisis terhadap sistem yang sedang berjalan, maka penulis menawarkan solusi berupa perancangan dan pengembangan website company profile yang terintegrasi dengan sistem pengelolaan berita. Website ini dirancang untuk mengatasi berbagai permasalahan pada sistem lama, di mana calon klien dapat mengakses informasi profil firma secara lengkap dan mandiri melalui website resmi tmplawyers.com.
       Sistem ini terdiri dari dua jenis pengguna utama, yaitu pengunjung dan admin. Pengunjung dapat melihat seluruh informasi publik meliputi profil firma, profil pengacara, area praktik layanan hukum, berita, dan mengirim pesan konsultasi. Admin memiliki hak akses untuk masuk ke panel admin setelah melakukan login, kemudian mengelola konten berita meliputi menambah, mengubah, dan menghapus berita.
       Dari sisi antarmuka, website dirancang dengan tampilan premium menggunakan skema warna hitam dan emas sesuai identitas firma. Desain dibuat responsif sehingga dapat diakses melalui berbagai perangkat. Seluruh data berita tersimpan dalam database cloud Firebase Firestore, dan pengelolaan data dilakukan melalui panel admin yang dibangun dengan Next.js.
       Perancangan sistem ini menggunakan diagram UML yang meliputi use case diagram, activity diagram, class diagram, dan sequence diagram.

1. Use Case Diagram

Gambar 5. 2 Use Case Diagram

       Use Case Diagram menggambarkan hubungan antara aktor dengan fungsionalitas sistem. Diagram ini menunjukkan fitur apa saja yang dapat diakses oleh masing-masing pengguna.
       Aktor dalam sistem ini :
a) Pengunjung : melihat halaman utama, melihat profil firma, melihat profil pengacara, melihat area praktik, membaca berita, melihat detail berita, dan mengirim pesan konsultasi.
b) Admin : melakukan login, melihat dashboard, menambah berita, mengedit berita, dan menghapus berita.
       Dengan pembagian hak akses ini, pengunjung dapat mengakses seluruh informasi publik sementara admin dapat mengelola konten berita melalui panel yang dilindungi autentikasi.

2. Activity Diagram Login Admin

Gambar 5. 3 Activity Diagram Login Admin

       Activity diagram ini menggambarkan alur proses admin saat melakukan login ke panel admin. Admin mengakses halaman login, kemudian memasukkan email dan password. Sistem memverifikasi credential melalui Firebase Authentication. Jika credential valid, admin diarahkan ke halaman dashboard. Jika tidak valid, sistem menampilkan pesan kesalahan dan admin dapat mencoba kembali.

3. Activity Diagram Kelola Berita

Gambar 5. 4 Activity Diagram Kelola Berita

       Activity diagram ini menggambarkan alur pengelolaan berita oleh admin meliputi tiga aksi utama. Untuk menambah berita, admin mengklik tombol tambah, mengisi formulir berita, menulis konten menggunakan editor teks, lalu menyimpan data ke database. Untuk mengedit, admin memilih berita yang ingin diubah, mengubah data yang diperlukan, lalu menyimpan perubahan. Untuk menghapus, admin memilih berita yang ingin dihapus, mengonfirmasi penghapusan, lalu data dihapus dari database.

4. Activity Diagram Mengakses Berita

Gambar 5. 5 Activity Diagram Mengakses Berita

       Activity diagram ini menggambarkan alur pengunjung saat mengakses berita. Pengunjung melihat daftar berita terbaru pada halaman utama, kemudian dapat mengklik salah satu berita untuk melihat isi lengkapnya pada halaman detail berita.

5. Activity Diagram Mengirim Pesan Kontak

Gambar 5. 6 Activity Diagram Mengirim Pesan Kontak

       Activity diagram ini menggambarkan alur pengunjung saat mengirim pesan melalui formulir kontak. Pengunjung mengisi nama, email, dan isi pesan pada formulir yang tersedia. Setelah menekan tombol kirim, sistem memvalidasi kelengkapan data. Jika semua terisi, pesan dikirimkan ke email firma. Jika ada yang kosong, sistem menampilkan peringatan.

6. Class Diagram

Gambar 5. 7 Class Diagram

       Class Diagram menggambarkan empat kelas utama dalam sistem beserta atribut dan metodenya. Kelas NewsItem menyimpan data berita meliputi judul, tanggal, kategori, ringkasan, konten, dan gambar. Kelas Lawyer menyimpan data pengacara meliputi nama, jabatan, biografi, dan keahlian. Kelas User menyimpan data admin untuk autentikasi. Kelas ContactMessage menyimpan data pesan konsultasi dari pengunjung.

7. Sequence Diagram Login Admin

Gambar 5. 8 Sequence Diagram Login Admin

       Sequence diagram ini menggambarkan urutan interaksi antar objek saat proses login admin. Admin memasukkan credential pada halaman login, kemudian sistem mengirimkan data ke Firebase Authentication untuk verifikasi. Firebase mengembalikan hasil verifikasi, dan sistem mengarahkan admin ke dashboard jika berhasil atau menampilkan pesan error jika gagal.

8. Sequence Diagram Kelola Berita

Gambar 5. 9 Sequence Diagram Kelola Berita

       Sequence diagram ini menggambarkan urutan interaksi saat admin melakukan pengelolaan berita. Admin menginput data berita melalui formulir, sistem menyimpan data ke Cloud Firestore, dan mengembalikan konfirmasi keberhasilan. Untuk penghapusan, sistem menampilkan dialog konfirmasi terlebih dahulu sebelum menghapus data dari database.

C. Basis Data

       Sistem ini menggunakan Firebase Cloud Firestore sebagai database dengan arsitektur NoSQL berbasis dokumen. Data disimpan dalam bentuk koleksi yang berisi dokumen-dokumen dengan struktur field-value yang fleksibel. Berikut adalah struktur koleksi yang digunakan :

Tabel 5. 1 Struktur Koleksi News

| No | Nama Field | Tipe Data | Keterangan |
|----|-----------|-----------|------------|
| 1 | id | String | ID dokumen (auto-generated) |
| 2 | title | String | Judul berita |
| 3 | date | String | Tanggal publikasi |
| 4 | category | String | Kategori berita |
| 5 | summary | String | Ringkasan singkat |
| 6 | content | String | Isi lengkap berita dalam format HTML |
| 7 | imageUrl | String | URL gambar dari Firebase Storage |
| 8 | author | String | Nama penulis |

Tabel 5. 2 Struktur Koleksi Lawyers

| No | Nama Field | Tipe Data | Keterangan |
|----|-----------|-----------|------------|
| 1 | id | String | Identifier unik pengacara |
| 2 | name | String | Nama lengkap beserta gelar |
| 3 | role | String | Jabatan di firma |
| 4 | image | String | Path foto profil |
| 5 | shortDesc | String | Deskripsi singkat |
| 6 | biography | String | Biografi lengkap |
| 7 | email | String | Alamat email profesional |
| 8 | skills | Array | Daftar keahlian hukum |

Tabel 5. 3 Struktur Data Users (Firebase Authentication)

| No | Nama Field | Tipe Data | Keterangan |
|----|-----------|-----------|------------|
| 1 | uid | String | User ID (auto-generated) |
| 2 | email | String | Alamat email admin |
| 3 | password | String | Password terenkripsi |

       Data autentikasi pengguna dikelola sepenuhnya oleh layanan Firebase Authentication dan tidak disimpan dalam koleksi Firestore. Firebase Auth menangani enkripsi password dan manajemen sesi secara otomatis.

D. Perancangan Tampilan

       Desain antarmuka website TAO MANULLANG & Partners Law Firm dibangun dengan konsep premium dan elegan menggunakan skema warna hitam dan emas yang konsisten dengan identitas visual firma. Berikut adalah rancangan tampilan setiap halaman utama :

1. Desain Tampilan Halaman Utama (Landing Page)

Gambar 5. 10 Desain Tampilan Halaman Utama

       Halaman utama merupakan tampilan pertama yang dilihat pengunjung. Halaman ini terdiri dari beberapa bagian yang disusun secara vertikal, meliputi header dengan tagline firma, profil singkat perusahaan beserta motto, daftar profil empat orang pengacara dalam format kartu, daftar area praktik layanan hukum, tiga berita terbaru, serta formulir kontak beserta peta lokasi kantor. Navigasi menggunakan menu yang dapat diklik untuk mengarahkan pengunjung ke bagian yang diinginkan.

2. Desain Tampilan Profil Pengacara

Gambar 5. 11 Desain Tampilan Profil Pengacara

       Ketika pengunjung mengklik tombol detail pada kartu pengacara, muncul tampilan modal yang menampilkan informasi lengkap pengacara meliputi foto, nama, jabatan, biografi, kontak email dan media sosial, serta daftar keahlian hukum. Tampilan modal ini menutupi seluruh layar dengan latar belakang gelap transparan.

3. Desain Tampilan Halaman Berita

Gambar 5. 12 Desain Tampilan Halaman Berita

       Halaman detail berita menampilkan informasi lengkap dari sebuah artikel hukum yang dipilih, meliputi kategori berita, tanggal publikasi, judul, gambar utama, dan isi konten. Terdapat tombol navigasi untuk kembali ke daftar seluruh berita.

4. Desain Tampilan Halaman Login Admin

Gambar 5. 13 Desain Tampilan Halaman Login Admin

       Halaman login admin memiliki desain khusus dengan latar belakang animasi. Di bagian tengah terdapat kartu login yang berisi logo firma, kolom input email dan password, serta tombol masuk. Terdapat juga tombol untuk kembali ke halaman utama website.

5. Desain Tampilan Dashboard Admin

Gambar 5. 14 Desain Tampilan Dashboard Admin

       Dashboard admin menggunakan tata letak dengan panel navigasi di sisi kiri dan area konten utama di sisi kanan. Panel navigasi berisi logo, menu, dan tombol keluar. Area konten utama menampilkan tiga kartu statistik yaitu total artikel, publikasi terakhir, dan jumlah anggota tim, serta tabel daftar berita yang dapat dikelola.

6. Desain Tampilan Form Tambah Berita

Gambar 5. 15 Desain Tampilan Form Tambah Berita

       Halaman tambah berita menyediakan formulir lengkap untuk membuat berita baru. Formulir terdiri dari kolom judul, kategori, tanggal, ringkasan, unggah gambar, dan editor teks untuk menulis isi konten berita. Terdapat tombol untuk mempublikasikan berita yang akan menyimpan data ke database.
BAB VI
KESIMPULAN DAN SARAN

A. Kesimpulan

       Berdasarkan hasil kegiatan Praktek Kerja Lapangan yang telah dilaksanakan, maka dapat disimpulkan sebagai berikut :
1. Penulis telah berhasil merancang dan membangun website company profile untuk TAO MANULLANG & Partners Law Firm menggunakan framework Next.js. Website ini menyediakan informasi lengkap mengenai profil firma, profil pengacara, area praktik layanan hukum, berita hukum, serta formulir kontak yang terintegrasi dengan email firma. Desain website menggunakan skema warna hitam dan emas yang konsisten dengan identitas profesional firma hukum.
2. Penulis telah berhasil merancang antarmuka pengguna website serta panel admin yang intuitif dan mudah digunakan. Panel admin dilengkapi dengan fitur pengelolaan berita meliputi tambah, ubah, dan hapus berita yang datanya tersimpan pada database Firebase Firestore. Dengan adanya panel admin ini, staf firma dapat mengelola konten berita secara mandiri tanpa memerlukan pengetahuan teknis tentang pemrograman.

B. Saran

       Mengacu pada hasil kegiatan dan kesimpulan yang telah diperoleh, maka penulis memberikan beberapa saran sebagai berikut :
1. Disarankan kepada pihak TAO MANULLANG & Partners Law Firm untuk secara rutin memperbarui konten berita dan artikel hukum melalui panel admin agar website tetap aktif dan terindeks dengan baik oleh mesin pencari.
2. Untuk pengembangan selanjutnya, dapat ditambahkan fitur konsultasi online secara langsung atau fitur penjadwalan janji temu dengan pengacara melalui website.
3. Bagi penelitian selanjutnya, dapat ditambahkan fitur keamanan yang lebih lengkap seperti pengaturan hak akses untuk beberapa admin sekaligus serta fitur pencadangan data secara otomatis.

---

DAFTAR PUSTAKA

Adli, Bismi Abdul, and Syahid Abdullah. 2022. "Perancangan Sistem Informasi Akademik (SIAKAD) Berbasis Web Menggunakan Metode Waterfall Studi Kasus SMK Plus Nusa Putra." Mekatronika dan Ilmu Komputer, Universitas Nusa Putra.

Arafat, Muhamad Yasser, and Yoga Putra Pratama. 2025. "Sistem Informasi Akademik Berbasis Web Menggunakan Metode Pengembangan Sistem Extreme Programming." Jurnal Informatika Universitas Pamulang 9 (4): 172â€“77.

Azfar, Naufal Anshor Al, and Sharazita Dyah Anggita. 2024. "Penerapan Metode Waterfall pada Sistem Informasi E-Rapor." Information System Journal 7 (01): 45â€“55.

Firebase Documentation. 2025. "Firebase Documentation." Google. Diakses Maret 2026. https://firebase.google.com/docs.

Hakim, Azizul, NM Faizah, and Widyat Nurcahyo. 2023. "Rancang Bangun Sistem Informasi Akademik di Madrasah Ibtidaiyah Al Hidayah Subang dengan Metode Waterfall Menggunakan PHP dan MySQL Berbasis Web." Journal Digital Technology Trend 2 (2): 65â€“73.

Jamaludin and Romindo. 2019. "Sistem Informasi Akademik Berbasis Web Menggunakan Metode Waterfall pada SMA Kemala Bhayangkari I Medan." Prosiding Seminar Nasional Teknologi Informatika, Vol. 2.

Laudon, Kenneth C., and Jane P. Laudon. 2020. Management Information Systems: Managing the Digital Firm. 16th ed. Pearson.

Next.js Documentation. 2025. "Next.js Documentation." Vercel. Diakses Maret 2026. https://nextjs.org/docs.

Pressman, Roger S., and Bruce R. Maxim. 2020. Software Engineering: A Practitioner's Approach. 9th ed. McGraw-Hill Education.

Rosa A.S., and M. Shalahuddin. 2018. Rekayasa Perangkat Lunak: Terstruktur dan Berorientasi Objek. Edisi Revisi. Bandung: Informatika Bandung.

Sommerville, Ian. 2016. Software Engineering. 10th ed. Pearson.

Tailwind CSS Documentation. 2025. "Tailwind CSS Documentation." Tailwind Labs. Diakses Maret 2026. https://tailwindcss.com/docs.

Yulianti, Susana Dwi, and Bachri Nur Alam. 2023. "Penerapan Sistem Informasi Akademik Berbasis Website dengan Metode Waterfall di Pondok Pesantren Al-Falah Rempoa Tangerang Selatan." Jurnal Ilmiah Sekolah Tinggi Teknologi Informasi NIIT 19 (1): 17.

---

LAMPIRAN

Lampiran 1 : Surat Izin Penelitian / PKL
[Halaman ini diisi dengan scan surat izin PKL dari kampus ke instansi]

Lampiran 2 : Foto Wawancara
[Halaman ini diisi dengan foto dokumentasi wawancara dengan pihak TAO MANULLANG & Partners Law Firm]

Lampiran 3 : Kartu Bimbingan
[Halaman ini diisi dengan scan kartu bimbingan PKL yang sudah ditandatangani dosen pembimbing]
