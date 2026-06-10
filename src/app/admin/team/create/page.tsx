"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ActionLoader from "@/components/admin/ActionLoader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lawyerSchema, LawyerInput } from "@/lib/validations/news";

/**
 * Halaman Form Tambah Profil Tim Pengacara Baru (Admin)
 * Route: /admin/team/create
 */
export default function CreateTeamPage() {
  const router = useRouter(); // Hook Next.js untuk mengarahkan navigasi halaman
  const [loading, setLoading] = useState(false); // State indikator saat mengirim formulir
  // State untuk mengontrol loader feedback visual (menyimpan, sukses, error)
  const [actionLoader, setActionLoader] = useState({
    isLoading: false,
    status: 'loading' as 'loading' | 'success' | 'error',
    message: ''
  });

  // Inisialisasi React Hook Form dengan Zod validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LawyerInput>({
    resolver: zodResolver(lawyerSchema), // Menggunakan skema validasi Zod
    defaultValues: {
      id: "",
      name: "",
      role: "ASSOCIATE",
      shortDesc: "",
      italicDesc: "",
      biography: "",
      email: "",
      instagram: "",
      education: "",
      experience: "",
      skills: "",
    }
  });

  const [file, setFile] = useState<File | null>(null); // State file gambar yang dipilih untuk diunggah
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State URL preview gambar di layar

  // Fungsi untuk menangani pemilihan file gambar oleh admin
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Membaca file gambar lokal untuk membuat preview sebelum diunggah
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Fungsi submit data ketika formulir tervalidasi dengan sukses
  const onSubmit = async (data: LawyerInput) => {
    setLoading(true);
    setActionLoader({ isLoading: true, status: 'loading', message: 'Saving Profile...' });

    // 1. Cek keamanan: Memastikan admin saat ini sudah login
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setActionLoader({ isLoading: true, status: 'error', message: 'CRITICAL ERROR: You are not logged in! Please re-login.' });
      setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 3000);
      setLoading(false);
      return;
    }

    try {
      let finalImageUrl = "";

      // 2. Unggah file gambar ke Supabase Storage (jika ada file terpilih)
      if (file) {
        setActionLoader({ isLoading: true, status: 'loading', message: 'Uploading Photo...' });
        
        const fileExt = file.name.split('.').pop();
        // Generate nama file unik menggunakan kombinasi waktu dan string acak
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `team/${fileName}`; // Folder tujuan di bucket storage: team/

        // Upload ke bucket 'news-images' di Supabase
        const { error: uploadError } = await supabase.storage
          .from('news-images')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Storage Error: ${uploadError.message}`);
        }

        // Ambil URL publik gambar yang berhasil diunggah
        const { data: { publicUrl } } = supabase.storage
          .from('news-images')
          .getPublicUrl(filePath);

        finalImageUrl = publicUrl;
      }

      // 3. Konversi data teks textarea menjadi array
      // - Untuk riwayat pendidikan & pengalaman: pisahkan berdasarkan baris baru (\n)
      const educationArr = data.education ? data.education.split('\n').map(s => s.trim()).filter(Boolean) : null;
      const experienceArr = data.experience ? data.experience.split('\n').map(s => s.trim()).filter(Boolean) : null;
      // - Untuk keahlian: pisahkan berdasarkan koma (,) dan jadikan huruf kapital
      const skillsArr = data.skills ? data.skills.split(',').map(s => s.trim().toUpperCase()).filter(Boolean) : null;

      // 4. Dapatkan total jumlah pengacara untuk menentukan urutan penampilan (display_order)
      const { count } = await supabase
        .from('lawyers')
        .select('*', { count: 'exact', head: true });

      // 5. Kirim data baru ke tabel 'lawyers' di Supabase Database
      setActionLoader({ isLoading: true, status: 'loading', message: 'Saving to Database...' });
      const docData = {
        id: data.id,
        name: data.name,
        role: data.role,
        image: finalImageUrl || null,
        short_desc: data.shortDesc,
        italic_desc: data.italicDesc,
        biography: data.biography || null,
        email: data.email || null,
        instagram: data.instagram || null,
        education: educationArr,
        experience: experienceArr,
        skills: skillsArr,
        display_order: (count ?? 0) + 1,
      };

      // Batasi waktu request maksimal 15 detik (timeout guard)
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request Timed Out!")), 15000)
      );

      const insertPromise = supabase.from('lawyers').insert(docData);
      const result: any = await Promise.race([insertPromise, timeout]);

      if (result.error) {
        throw result.error;
      }

      // Memberi notifikasi sukses dan arahkan kembali ke daftar tim setelah 1.5 detik
      setActionLoader({ isLoading: true, status: 'success', message: 'Profile Created Successfully!' });
      setTimeout(() => {
        router.push("/admin/team");
      }, 1500);

    } catch (error: any) {
      console.error("Detailed Error:", error);
      setActionLoader({ isLoading: true, status: 'error', message: `FAILED: ${error.message}` });
      setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Panel loader status aksi */}
        <ActionLoader 
            isLoading={actionLoader.isLoading} 
            status={actionLoader.status} 
            message={actionLoader.message} 
        />
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <h1 className="text-2xl font-serif italic text-white">Add Team Member</h1>
            <Link href="/admin/team" className="text-gray-400 hover:text-white text-xs uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-arrow-left"></i> Cancel
            </Link>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Input Slug ID & Nama Lengkap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">ID (Slug URL)</label>
                    <input 
                        type="text" 
                        {...register("id")}
                        className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                        placeholder="contoh: budi-santoso"
                        suppressHydrationWarning
                    />
                    {errors.id && (
                        <p className="text-red-500 text-xs mt-1">{errors.id.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Nama Lengkap</label>
                    <input 
                        type="text" 
                        {...register("name")}
                        className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                        placeholder="contoh: Budi Santoso, S.H."
                        suppressHydrationWarning
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                </div>
            </div>

            {/* Pemilihan Jabatan/Role */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Jabatan (Role)</label>
                <select 
                    {...register("role")}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors appearance-none"
                    suppressHydrationWarning
                >
                    <option value="FOUNDER">Founder</option>
                    <option value="PARTNER">Partner</option>
                    <option value="ASSOCIATE">Associate</option>
                    <option value="JUNIOR ASSOCIATE">Junior Associate</option>
                    <option value="PARALEGAL">Paralegal</option>
                </select>
                {errors.role && (
                    <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                )}
            </div>

            {/* Deskripsi Singkat */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Deskripsi Singkat</label>
                <textarea 
                    {...register("shortDesc")}
                    rows={3}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder="Penjelasan singkat yang muncul di kartu profil depan..."
                    suppressHydrationWarning
                />
                {errors.shortDesc && (
                    <p className="text-red-500 text-xs mt-1">{errors.shortDesc.message}</p>
                )}
            </div>

            {/* Deskripsi Miring / Tagline Spesialisasi */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Tagline Spesialisasi (Teks Miring)</label>
                <textarea 
                    {...register("italicDesc")}
                    rows={2}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder="contoh: Berpengalaman menangani sengketa bisnis skala nasional..."
                    suppressHydrationWarning
                />
                {errors.italicDesc && (
                    <p className="text-red-500 text-xs mt-1">{errors.italicDesc.message}</p>
                )}
            </div>

            {/* Biografi Lengkap */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Biografi Lengkap (Opsional)</label>
                <textarea 
                    {...register("biography")}
                    rows={8}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder="Profil biografi lengkap pengacara..."
                    suppressHydrationWarning
                />
            </div>

            {/* Informasi Kontak (Email & Instagram) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Email (Opsional)</label>
                    <input 
                        type="text" 
                        {...register("email")}
                        className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                        placeholder="budi@tmplawyers.com"
                        suppressHydrationWarning
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Instagram Username (Opsional)</label>
                    <input 
                        type="text" 
                        {...register("instagram")}
                        className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                        placeholder="contoh: @budisantoso"
                        suppressHydrationWarning
                    />
                </div>
            </div>

            {/* Riwayat Pendidikan */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Riwayat Pendidikan (Satu per baris)</label>
                <textarea 
                    {...register("education")}
                    rows={3}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder={"Sarjana Hukum, Universitas Katolik Parahyangan\nMagister Hukum, Universitas Indonesia"}
                    suppressHydrationWarning
                />
            </div>

            {/* Riwayat Pengalaman Kerja */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Riwayat Pengalaman Kerja (Satu per baris)</label>
                <textarea 
                    {...register("experience")}
                    rows={3}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder={"Associate Lawyer, TMP Law Firm (2020 - Sekarang)\nLegal Counsel, PT Gojek Indonesia"}
                    suppressHydrationWarning
                />
            </div>

            {/* Keahlian Hukum */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Keahlian Hukum (Pisahkan dengan koma)</label>
                <input 
                    type="text" 
                    {...register("skills")}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder="contoh: Corporate Law, Litigation, Contract Drafting"
                    suppressHydrationWarning
                />
            </div>

            {/* Unggah Foto Profil */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Foto Profil (Opsional)</label>
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-tmp-gold file:text-black hover:file:bg-white"
                    suppressHydrationWarning
                />
                
                {/* Menampilkan preview gambar yang baru dipilih jika ada */}
                {previewUrl && (
                    <div className="mt-4 relative w-32 h-40 border border-white/10 rounded overflow-hidden">
                        <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                    </div>
                )}
            </div>

            {/* Tombol Simpan Form */}
            <div className="pt-6 border-t border-white/10 flex justify-end">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-tmp-gold text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving..." : "Save Profile"}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
