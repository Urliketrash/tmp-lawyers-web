# Product Requirement Document (PRD)

## Feature

AI-Powered Internationalization (i18n) System

## Project

TMPLawyers.com

## Version

v2.0

---

# 1. Background

TMPLawyers merupakan website law firm yang menargetkan:

* Client Indonesia
* Foreign Investor
* Foreign Company
* International Business Partner
* Expatriate

Saat ini website hanya tersedia dalam satu bahasa.

Dibutuhkan sistem multilingual yang:

1. Mendukung Bahasa Indonesia dan English.
2. Memungkinkan admin hanya menginput konten Bahasa Indonesia.
3. Secara otomatis menerjemahkan konten ke Bahasa Inggris menggunakan AI.
4. Menampilkan bahasa sesuai pilihan user.
5. Tetap memungkinkan admin melakukan review atau edit hasil translate.

---

# 2. Goals

### Business Goals

* Menjangkau client internasional
* Meningkatkan trust dan profesionalitas
* Meningkatkan SEO internasional
* Mengurangi pekerjaan admin dalam mengelola dua bahasa

---

# 3. Scope

## Bahasa yang didukung

* Indonesia (Default)
* English

---

# 4. User Roles

## Visitor

Dapat:

* Mengubah bahasa
* Melihat konten sesuai bahasa
* Bahasa tersimpan ketika refresh

---

## Admin

Dapat:

* Membuat lawyer baru
* Membuat artikel baru
* Membuat service baru
* Mengedit hasil translate AI
* Melihat status translation

---

# 5. Functional Requirements

## FR-01 Language Switcher

Website menyediakan tombol:

🌐 Indonesia | English

Lokasi:

* Navbar Desktop
* Mobile Menu
* Footer (Optional)

---

## FR-02 URL Routing

Indonesia

/

/about

/services

/articles

---

English

/en

/en/about

/en/services

/en/articles

---

## FR-03 Browser Detection

Jika browser:

en-US

Maka redirect:

/en

Jika:

id-ID

Maka redirect:

/

---

## FR-04 Persist User Preference

Pilihan bahasa disimpan menggunakan:

* Cookie
  atau
* Local Storage

Sehingga refresh halaman tidak mengubah bahasa.

---

# 6. AI Translation Workflow

## Admin membuat Lawyer

Input:

Nama

Muhammad Rizky, S.H., M.H.

Jabatan

Partner

Bio

Muhammad Rizky adalah seorang advokat yang berpengalaman dalam bidang hukum korporasi dan investasi.

Checkbox:

☑ Translate Automatically

---

Ketika klik Simpan:

1. Save Indonesian Content

↓

2. AI Translate

↓

3. Save English Translation

↓

4. translation_status = translated

---

Jika AI gagal:

translation_status

failed

Admin masih dapat menyimpan versi Indonesia.

---

# 7. Translation Status

Setiap data memiliki status:

draft

Admin baru membuat data.

---

translating

AI sedang menerjemahkan.

---

translated

AI berhasil menerjemahkan.

---

reviewed

Admin telah memeriksa atau mengedit hasil translate.

---

failed

AI gagal menerjemahkan.

---

# 8. CMS UI

## Lawyers

Nama

[Muhammad Rizky, S.H., M.H.]

Jabatan

[Partner]

Bio

[.....]

☑ Translate Automatically

Translation Status:

Translated

English Translation:

[Editable Textarea]

[ Save ]

---

Admin dapat:

* Mengedit hasil translate
* Menjalankan translate ulang
* Menandai reviewed

---

# 9. Database Design

## lawyers

id

name

photo

position_id

position_en

bio_id

bio_en

expertise_id

expertise_en

translation_status

created_at

updated_at

---

## services

id

slug

title_id

title_en

description_id

description_en

translation_status

created_at

updated_at

---

## articles

id

slug

cover_image

title_id

title_en

excerpt_id

excerpt_en

content_id

content_en

translation_status

published_at

created_at

updated_at

---

# 10. Frontend Behavior

Ketika user memilih:

Indonesia

Maka:

position_id

bio_id

title_id

content_id

yang ditampilkan.

---

Ketika user memilih:

English

Maka:

position_en

bio_en

title_en

content_en

yang ditampilkan.

---

Tidak ada translate real-time.

Frontend hanya mengambil data yang sudah tersedia.

---

# 11. SEO Requirements

Setiap bahasa memiliki:

### Metadata

Indonesia

TMPLawyers | Firma Hukum Profesional

---

English

TMPLawyers | Professional Law Firm

---

### Hreflang

hreflang="id"

href="https://tmplawyers.com" />

---

hreflang="en"

href="https://tmplawyers.com/en" />

---

### Sitemap

sitemap.xml

berisi:

/

/about

/services

/articles

/en

/en/about

/en/services

/en/articles

---

# 12. AI Translation Rules

AI harus:

✓ Mempertahankan nama orang

✓ Mempertahankan nama perusahaan

✓ Mempertahankan gelar

✓ Mempertahankan istilah hukum tertentu

---

Contoh:

Muhammad Rizky, S.H., M.H.

tetap:

Muhammad Rizky, S.H., M.H.

---

PT Nusantara Abadi

tetap:

PT Nusantara Abadi

---

Perbuatan Melawan Hukum

tidak diterjemahkan literal.

Gunakan:

Unlawful Act

atau

Tort

sesuai konteks.

---

# 13. Error Handling

Jika AI gagal:

* Konten Indonesia tetap disimpan.
* translation_status = failed
* Admin dapat klik:

[ Retry Translation ]

---

Jika English kosong:

Landing Page English akan:

1. Menampilkan Indonesia sementara

atau

2. Menampilkan badge:

Translation Coming Soon

(Pilih salah satu, default: tampilkan Indonesia)

---

# 14. Analytics

Track event:

language_changed

properties:

from_language

to_language

page

---

translation_created

properties:

content_type

translation_status

---

translation_failed

properties:

content_type

error_message

---

# 15. Technical Recommendation

Framework:

Next.js App Router

---

Internationalization:

next-intl

---

Database:

PostgreSQL

---

ORM:

Drizzle ORM

---

AI Translation:

OpenAI API

Model:

GPT-5 atau GPT-5-mini

---

Storage:

Cookie

NEXT_LOCALE

---

CMS:

Custom Admin Panel

---

# 16. Future Enhancement

Phase 2

* Auto translate ke Chinese
* Auto translate ke Japanese
* Auto translate ke Arabic

---

Phase 3

* Translation Memory

Jika ada kalimat:

"Hubungi Kami"

yang pernah diterjemahkan menjadi:

"Contact Us"

Maka AI tidak perlu menerjemahkan ulang.

---

Phase 4

AI Writing Assistant

Admin menulis:

"Kami adalah firma hukum profesional"

AI menyarankan:

"We are a professional law firm specializing in corporate and investment law."

Admin tinggal approve.
