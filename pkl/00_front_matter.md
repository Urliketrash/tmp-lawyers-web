# HALAMAN SAMPUL

<div align="center">

**PERANCANGAN WEBSITE COMPANY PROFILE MENGGUNAKAN NEXT.JS DAN FIREBASE PADA TAO MANULLANG & PARTNERS LAW FIRM**

<br>
<br>

**LAPORAN PRAKTEK KERJA LAPANGAN**

<br>
<br>
<br>

Logo Universitas Lancang Kuning
<br>
<br>

**OLEH**

**[Nama Mahasiswa]**  
**[NIM Mahasiswa]**

<br>
<br>
<br>
<br>

**PROGRAM STUDI SISTEM INFORMASI**  
**FAKULTAS ILMU KOMPUTER**  
**UNIVERSITAS LANCANG KUNING**  
**PEKANBARU**  
**2026**

</div>

---

# LEMBAR PERSETUJUAN

<br>
<br>

**NIM** : [NIM Mahasiswa]  
**Nama** : [Nama Mahasiswa]  
**Judul Kerja Praktek** : Perancangan *Website Company Profile* Menggunakan Next.js dan Firebase Pada TAO MANULLANG & Partners Law Firm  

<br>
<br>

<div align="center">

**Laporan Kerja Praktek Ini Telah Diperiksa dan Disetujui.**

<br>
Pekanbaru, [Tanggal] 2026
<br>
<br>
<br>

**Pembimbing I**

<br>
<br>
<br>
<br>

**[Nama Dosen Pembimbing]**  
NIDN. [NIDN]

<br>
<br>
<br>
<br>

**Mengetahui,**  
**Ketua Program Studi**  
**Sistem Informasi**

<br>
<br>
<br>
<br>

**Febrizal Alfarasy Syam, M.Kom.**  
NIDN. 1027029102

</div>

---

# LEMBAR PENGESAHAN PRAKTEK KERJA LAPANGAN

<br>
<br>

**Nama** : [Nama Mahasiswa]  
**NIM** : [NIM Mahasiswa]  
**Program Studi** : Sistem Informasi  
**Judul** : Perancangan *Website Company Profile* Menggunakan Next.js dan Firebase Pada TAO MANULLANG & Partners Law Firm  

<br>
<br>

<div align="center">

**Disetujui dan Disahkan Oleh:**

<br>
Pekanbaru, [Tanggal] 2026
<br>
<br>

| **Dosen Penguji I** | **Dosen Penguji II** |
| :---: | :---: |
| | |
| | |
| **[Nama Penguji I]** | **[Nama Penguji II]** |
| NIDN. [NIDN] | NIDN. [NIDN] |

<br>
<br>
<br>
<br>

**Mengetahui,**  
**Ketua Program Studi**  
**Sistem Informasi**

<br>
<br>
<br>
<br>

**Febrizal Alfarasy Syam, M.Kom.**  
NIDN. 1027029102

</div>

---

# KATA PENGANTAR

Puji syukur penulis panjatkan ke hadirat Allah SWT atas segala rahmat, hidayah, dan karunia-Nya, sehingga penulis dapat menyelesaikan Laporan Praktek Kerja Lapangan (PKL) ini dengan baik dan tepat waktu. Laporan ini disusun berdasarkan hasil pelaksanaan PKL di TAO MANULLANG & Partners Law Firm dengan judul **"Perancangan Website Company Profile Menggunakan Next.js dan Firebase Pada TAO MANULLANG & Partners Law Firm"**.

Penyusunan laporan ini tidak lepas dari bimbingan, arahan, serta dukungan dari berbagai pihak. Oleh karena itu, pada kesempatan ini penulis ingin menyampaikan terima kasih yang sebesar-besarnya kepada:

1. Orang tua dan seluruh keluarga tercinta yang senantiasa memberikan doa restu, dukungan moral, maupun material yang tidak terhingga selama masa perkuliahan dan penyusunan laporan ini.
2. Bapak Dr. Yogi Yunefri, M.Kom., MTA., MCE selaku Dekan Fakultas Ilmu Komputer Universitas Lancang Kuning.
3. Bapak Afriyansyah, M.Kom., MTA selaku Wakil Dekan I Fakultas Ilmu Komputer Universitas Lancang Kuning.
4. Ibu Dr. Lucky Lhaura Van FC, M.Kom., MTA selaku Wakil Dekan II Fakultas Ilmu Komputer Universitas Lancang Kuning.
5. Bapak Dr. Sutejo, M.Kom., MTA selaku Wakil Dekan III Fakultas Ilmu Komputer Universitas Lancang Kuning.
6. Bapak Febrizal Alfarasy Syam, M.Kom., MTA selaku Ketua Program Studi Sistem Informasi Fakultas Ilmu Komputer Universitas Lancang Kuning yang telah banyak memberikan kemudahan administrasi bagi penulis.
7. Bapak/Ibu [Nama Dosen Pembimbing] selaku Dosen Pembimbing yang telah meluangkan waktu dan memberikan banyak masukan, arahan, serta bimbingan yang sangat berharga selama penyusunan laporan ini.
8. Bapak dan Ibu dosen Fakultas Ilmu Komputer Universitas Lancang Kuning yang telah memberikan bekal ilmu pengetahuan yang sangat bermanfaat bagi penulis selama menempuh pendidikan.
9. Seluruh tim manajemen dan staf di TAO MANULLANG & Partners Law Firm yang telah memberikan izin, kesempatan bimbingan, serta menyediakan data-data yang penulis perlukan selama melaksanakan PKL di firma hukum tersebut.
10. Rekan-rekan mahasiswa angkatan 2022 dan semua pihak yang tidak dapat penulis sebutkan satu per satu, yang telah memberikan bantuan, semangat, serta motivasi dalam penyelesaian laporan ini.

Penulis menyadari bahwa Laporan PKL ini masih jauh dari kata sempurna karena keterbatasan pengetahuan dan pengalaman penulis. Oleh karena itu, penulis mengharapkan kritik dan saran yang membangun dari para pembaca demi perbaikan di masa mendatang. Semoga laporan ini dapat memberikan manfaat nyata bagi pembaca, institusi pendidikan, dan khususnya bagi pihak instansi tempat PKL dilaksanakan.

<br>
Pekanbaru, [Bulan] 2026
<br>
<br>
<br>
<br>
**[Nama Mahasiswa]**

---

# DAFTAR ISI

```text
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
  D. Budaya Kerja .................................................... 31
  E. Logo Instansi ................................................... 31

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
```

---

# DAFTAR TABEL

```text
**Tabel 2. 1 Penelitian Terdahulu ...................................... 7**
**Tabel 2. 2 Simbol Use Case Diagram ................................... 16**
**Tabel 2. 3 Simbol Activity Diagram ................................... 17**
**Tabel 2. 4 Simbol Class Diagram ...................................... 18**
**Tabel 5. 1 Struktur Koleksi News ..................................... 45**
**Tabel 5. 2 Struktur Koleksi Lawyers .................................. 45**
**Tabel 5. 3 Struktur Data Users (Firebase Authentication) .............. 46**
```

---

# DAFTAR GAMBAR

```text
**Gambar 3. 1 Tahap Penelitian ......................................... 22**
**Gambar 3. 2 Metode Prototyping ....................................... 27**
**Gambar 4. 1 Kantor TAO MANULLANG & Partners Law Firm ................. 29**
**Gambar 4. 2 Struktur Organisasi TAO MANULLANG & Partners Law Firm .... 30**
**Gambar 4. 3 Logo TAO MANULLANG & Partners Law Firm ................... 31**
**Gambar 5. 1 Flowchart Sistem yang Sedang Berjalan .................... 33**
**Gambar 5. 2 Use Case Diagram ......................................... 35**
**Gambar 5. 3 Activity Diagram Login Admin ............................. 37**
**Gambar 5. 4 Activity Diagram Kelola Berita ........................... 38**
**Gambar 5. 5 Activity Diagram Mengakses Berita ........................ 39**
**Gambar 5. 6 Activity Diagram Mengirim Pesan Kontak .................. 40**
**Gambar 5. 7 Class Diagram ............................................ 41**
**Gambar 5. 8 Sequence Diagram Login Admin ............................. 42**
**Gambar 5. 9 Sequence Diagram Kelola Berita ........................... 43**
**Gambar 5. 10 Desain Tampilan Halaman Utama ........................... 47**
**Gambar 5. 11 Desain Tampilan Profil Pengacara ........................ 48**
**Gambar 5. 12 Desain Tampilan Halaman Berita .......................... 49**
**Gambar 5. 13 Desain Tampilan Halaman Login Admin ..................... 49**
**Gambar 5. 14 Desain Tampilan Dashboard Admin ......................... 50**
**Gambar 5. 15 Desain Tampilan Form Tambah Berita ...................... 51**
```

---

# DAFTAR LAMPIRAN

```text
Lampiran 1 Surat Izin Penelitian / PKL ............................... 56
Lampiran 2 Foto Wawancara ............................................ 57
Lampiran 3 Kartu Bimbingan ........................................... 58
```
