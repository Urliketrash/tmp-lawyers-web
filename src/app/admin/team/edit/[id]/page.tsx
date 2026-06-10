"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ActionLoader from "@/components/admin/ActionLoader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lawyerSchema, LawyerInput } from "@/lib/validations/news";
import { lawyersData } from "@/data/lawyersData";

/**
 * Halaman Form Edit Profil Tim Pengacara (Admin)
 * Route: /admin/team/edit/[id]
 */
export default function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Membaca parameter ID (slug) secara asinkron dari URL (React 19 pattern)
  const router = useRouter(); // Hook Next.js untuk navigasi halaman
  const [loading, setLoading] = useState(false); // State indikasi saat menyimpan perubahan
  const [fetching, setFetching] = useState(true); // State indikasi saat mengambil data awal profil
  const [currentImage, setCurrentImage] = useState<string>(""); // Menyimpan URL gambar yang aktif saat ini
  // State indikator loader aksi proses
  const [actionLoader, setActionLoader] = useState({
    isLoading: false,
    status: 'loading' as 'loading' | 'success' | 'error',
    message: ''
  });

  // Inisialisasi React Hook Form dengan skema validasi Zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LawyerInput>({
    resolver: zodResolver(lawyerSchema),
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

  // Efek samping (Effect) untuk memuat data pengacara saat halaman dimuat
  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        // Ambil satu record data pengacara dari Supabase berdasarkan ID (slug)
        const { data, error } = await supabase
          .from("lawyers")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          // Jika data tidak ditemukan di database Supabase (misal, masih data statis bawaan),
          // cari di file lokal 'lawyersData' sebagai fallback.
          const staticLawyer = lawyersData.find((l) => l.id === id);
          if (staticLawyer) {
            console.log("Lawyer not found in database, falling back to static data for editing:", id);
            // Pre-populate input form dengan data statis lokal
            setValue("id", staticLawyer.id);
            setValue("name", staticLawyer.name);
            setValue("role", staticLawyer.role as any); // Type cast aman
            setValue("shortDesc", staticLawyer.shortDesc || "");
            setValue("italicDesc", staticLawyer.italicDesc || "");
            setValue("biography", staticLawyer.biography || "");
            setValue("email", staticLawyer.email || "");
            setValue("instagram", staticLawyer.instagram || "");
            // Gabungkan kembali array menjadi format teks biasa dengan baris baru (\n) / koma (,)
            setValue("education", (staticLawyer.education || []).join('\n'));
            setValue("experience", (staticLawyer.experience || []).join('\n'));
            setValue("skills", (staticLawyer.skills || []).join(', '));
            setCurrentImage(staticLawyer.image || "");
            return;
          }
          throw error;
        }

        // Jika data pengacara ditemukan di database Supabase
        if (data) {
          setValue("id", data.id);
          setValue("name", data.name);
          setValue("role", data.role as any);
          setValue("shortDesc", data.short_desc || "");
          setValue("italicDesc", data.italic_desc || "");
          setValue("biography", data.biography || "");
          setValue("email", data.email || "");
          setValue("instagram", data.instagram || "");
          setValue("education", (data.education || []).join('\n'));
          setValue("experience", (data.experience || []).join('\n'));
          setValue("skills", (data.skills || []).join(', '));
          setCurrentImage(data.image || "");
        }
      } catch (error: any) {
        console.error("Error fetching lawyer:", error);
        setActionLoader({ isLoading: true, status: 'error', message: `Failed to load profile data: ${error.message || 'Unknown error'}` });
        setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 3000);
      } finally {
        setFetching(false); // Selesai memuat data
      }
    };

    fetchLawyer();
  }, [id, setValue]);

  const [file, setFile] = useState<File | null>(null); // State file foto profil baru
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State preview foto profil baru

  // Fungsi saat admin memilih file foto baru
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); // Tampilkan preview foto baru
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Fungsi pengiriman perubahan data (Update)
  const onSubmit = async (data: LawyerInput) => {
    setLoading(true);
    setActionLoader({ isLoading: true, status: 'loading', message: 'Updating Profile...' });

    // Cek otorisasi user login admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setActionLoader({ isLoading: true, status: 'error', message: 'CRITICAL ERROR: You are not logged in! Please re-login.' });
      setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 3000);
      setLoading(false);
      return;
    }

    try {
      let finalImageUrl = currentImage; // Default ke gambar lama jika tidak mengunggah gambar baru

      // 1. Unggah gambar baru jika admin memilih file gambar baru
      if (file) {
        setActionLoader({ isLoading: true, status: 'loading', message: 'Uploading Photo...' });
        
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `team/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('news-images')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Storage Error: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('news-images')
          .getPublicUrl(filePath);

        finalImageUrl = publicUrl; // Simpan URL publik foto profil baru
      }

      // 2. Parse isian input berformat teks biasa ke tipe array
      const educationArr = data.education ? data.education.split('\n').map(s => s.trim()).filter(Boolean) : null;
      const experienceArr = data.experience ? data.experience.split('\n').map(s => s.trim()).filter(Boolean) : null;
      const skillsArr = data.skills ? data.skills.split(',').map(s => s.trim().toUpperCase()).filter(Boolean) : null;

      // 3. Simpan perubahan ke Database Supabase menggunakan operasi UPSERT
      // - Upsert: Perbarui baris jika ID (slug) sudah ada, atau buat baris baru jika ID belum ada (misal data statis)
      setActionLoader({ isLoading: true, status: 'loading', message: 'Saving to Database...' });
      const docData = {
        id, // Masukkan ID slug
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
      };

      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request Timed Out!")), 15000)
      );

      // Gunakan UPSERT untuk menyimpan data
      const updatePromise = supabase.from('lawyers').upsert(docData);
      const result: any = await Promise.race([updatePromise, timeout]);

      if (result.error) {
        throw result.error;
      }

      // Notifikasi sukses dan kembali ke list tim
      setActionLoader({ isLoading: true, status: 'success', message: 'Profile Updated Successfully!' });
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

  // Indikator memuat halaman pertama kali
  if (fetching) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-tmp-gold rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-500 text-sm">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <ActionLoader 
            isLoading={actionLoader.isLoading} 
            status={actionLoader.status} 
            message={actionLoader.message} 
        />
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <h1 className="text-2xl font-serif italic text-white">Edit Team Member</h1>
            <Link href="/admin/team" className="text-gray-400 hover:text-white text-xs uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-arrow-left"></i> Cancel
            </Link>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ID / Slug Pengacara (Hanya Bisa Dibaca / Readonly) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">ID (Slug URL) — Read Only</label>
                    <input 
                        type="text" 
                        {...register("id")}
                        readOnly
                        className="w-full bg-tmp-black border border-white/10 p-4 text-gray-500 focus:outline-none cursor-not-allowed"
                        suppressHydrationWarning
                    />
                </div>
                <div>
                    <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Nama Lengkap</label>
                    <input 
                        type="text" 
                        {...register("name")}
                        className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                        placeholder="e.g. John Doe, S.H."
                        suppressHydrationWarning
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                </div>
            </div>

            {/* Jabatan */}
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
                    placeholder="Brief overview shown on cards..."
                    suppressHydrationWarning
                />
                {errors.shortDesc && (
                    <p className="text-red-500 text-xs mt-1">{errors.shortDesc.message}</p>
                )}
            </div>

            {/* Tagline */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Tagline (Teks Miring)</label>
                <textarea 
                    {...register("italicDesc")}
                    rows={2}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder="Specialist tagline..."
                    suppressHydrationWarning
                />
                {errors.italicDesc && (
                    <p className="text-red-500 text-xs mt-1">{errors.italicDesc.message}</p>
                )}
            </div>

            {/* Biografi */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Biografi (Opsional)</label>
                <textarea 
                    {...register("biography")}
                    rows={8}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder="Full biography..."
                    suppressHydrationWarning
                />
            </div>

            {/* Kontak */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Email (Opsional)</label>
                    <input 
                        type="text" 
                        {...register("email")}
                        className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                        placeholder="name@tmplawyers.com"
                        suppressHydrationWarning
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Instagram (Opsional)</label>
                    <input 
                        type="text" 
                        {...register("instagram")}
                        className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                        placeholder="@username"
                        suppressHydrationWarning
                    />
                </div>
            </div>

            {/* Pendidikan */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Pendidikan (Satu per baris)</label>
                <textarea 
                    {...register("education")}
                    rows={3}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder={"Sarjana Hukum, Universitas XYZ\nMagister Hukum, Universitas ABC"}
                    suppressHydrationWarning
                />
            </div>

            {/* Pengalaman */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Pengalaman (Satu per baris)</label>
                <textarea 
                    {...register("experience")}
                    rows={3}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder={"Associate Lawyer, TMP Law Firm\nLegal Consultant, PT ABC"}
                    suppressHydrationWarning
                />
            </div>

            {/* Keahlian */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Keahlian (Pisahkan dengan koma)</label>
                <input 
                    type="text" 
                    {...register("skills")}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder="Corporate Law, Litigation, Contract Drafting"
                    suppressHydrationWarning
                />
            </div>

            {/* Gambar Saat Ini & Form Unggah Baru */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Foto Profil</label>
                
                {/* Tampilkan foto saat ini jika ada */}
                {currentImage && !previewUrl && (
                    <div className="mb-4 flex items-center gap-4">
                        <div className="relative w-20 h-24 border border-white/10 rounded overflow-hidden">
                            <img src={currentImage} alt="Current" className="object-cover w-full h-full" />
                        </div>
                        <span className="text-gray-500 text-xs">Current photo</span>
                    </div>
                )}

                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-tmp-gold file:text-black hover:file:bg-white"
                    suppressHydrationWarning
                />
                
                {/* Preview foto baru jika dipilih */}
                {previewUrl && (
                    <div className="mt-4 relative w-32 h-40 border border-white/10 rounded overflow-hidden">
                        <img src={previewUrl} alt="New Preview" className="object-cover w-full h-full" />
                    </div>
                )}
            </div>

            {/* Tombol Aksi submit */}
            <div className="pt-6 border-t border-white/10 flex justify-end">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-tmp-gold text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
