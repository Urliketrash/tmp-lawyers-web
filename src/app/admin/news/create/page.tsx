"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ActionLoader from "@/components/admin/ActionLoader";

export default function CreateNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [actionLoader, setActionLoader] = useState({
    isLoading: false,
    status: 'loading' as 'loading' | 'success' | 'error',
    message: ''
  });
  const [formData, setFormData] = useState({
    title: "",
    category: "LITIGATION",
    summary: "",
    content: "",
    imageUrl: "", // Uploading an image is now optional
    author: "Admin Team",
    date: new Date().toISOString().split('T')[0]
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        
        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Custom form validation to avoid silent HTML5 validation blocks
    if (!formData.title || !formData.date || !formData.summary) {
        setActionLoader({ isLoading: true, status: 'error', message: 'Validation Failed: Please fill in Title, Date, and Summary.' });
        setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 3000);
        return;
    }

    setLoading(true);
    setActionLoader({ isLoading: true, status: 'loading', message: 'Publishing Article...' });

    // Debug: Check Auth
    const user = auth.currentUser;
    if (!user) {
        setActionLoader({ isLoading: true, status: 'error', message: 'CRITICAL ERROR: You are not logged in! Please re-login.' });
        setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 3000);
        setLoading(false);
        return;
    }

    // Debug: Network Status
    if (!navigator.onLine) {
         setActionLoader({ isLoading: true, status: 'error', message: 'ERROR: You are OFFLINE. Check your internet connection.' });
         setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 3000);
         setLoading(false);
         return;
    }

    try {
        console.log("Attempting to upload file and write to Firestore...");
        
        let finalImageUrl = formData.imageUrl;

        // 1. Upload Image to Cloudinary if exists
        if (file) {
            setActionLoader({ isLoading: true, status: 'loading', message: 'Uploading Image...' });
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "tmp_upload"); // Unsigned preset we just created

            // Cloud Name: dy2stohsk
            const response = await fetch("https://api.cloudinary.com/v1_1/dy2stohsk/image/upload", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Cloudinary Error: ${errorData.error?.message || "Upload failed"}`);
            }

            const data = await response.json();
            finalImageUrl = data.secure_url; // Get the URL from Cloudinary
            setUploadProgress(100); // Mark as complete
        }

        // 2. Add to Firestore
        setActionLoader({ isLoading: true, status: 'loading', message: 'Saving to Database...' });
        const docData = { ...formData, imageUrl: finalImageUrl };

        // Timeout Promise
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Request Timed Out! Firestore/Storage is not responding.")), 15000)
        );

        // Race addDoc vs Timeout
        await Promise.race([
            addDoc(collection(db, "news"), docData),
            timeout
        ]);

        console.log("Write success!");
        setActionLoader({ isLoading: true, status: 'success', message: 'Article Published Successfully!' });
        
        setTimeout(() => {
            router.push("/admin/dashboard");
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
        <ActionLoader 
            isLoading={actionLoader.isLoading} 
            status={actionLoader.status} 
            message={actionLoader.message} 
        />
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <h1 className="text-2xl font-serif italic text-white">Create New Article</h1>
            <Link href="/admin/dashboard" className="text-gray-400 hover:text-white text-xs uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-arrow-left"></i> Cancel
            </Link>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder="Enter article title..."
                    suppressHydrationWarning
                />
            </div>

            {/* Category & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Category</label>
                    <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}
                        className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors appearance-none"
                        suppressHydrationWarning
                    >
                        <option value="LITIGATION">Litigation</option>
                        <option value="CORPORATE">Corporate</option>
                        <option value="EVENT">Event</option>
                        <option value="REGULATION">Regulation</option>
                    </select>
                </div>
                <div>
                    <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Date</label>
                    <input 
                        type="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange}
                        className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors [color-scheme:dark]"
                        suppressHydrationWarning
                    />
                </div>
            </div>

            {/* Summary */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Summary (Short Description)</label>
                <textarea 
                    name="summary" 
                    value={formData.summary} 
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors"
                    placeholder="Brief overview for the card display..."
                    suppressHydrationWarning
                />
            </div>

            {/* Content (HTML Supported) */}
            <div className="mb-6">
                <RichTextEditor
                    label="Content"
                    value={formData.content}
                    onChange={(html) => setFormData({ ...formData, content: html })}
                    placeholder="Write your article content here..."
                />
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">Image Upload (Optional)</label>
                
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                        <div className="bg-tmp-gold h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                )}

                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full bg-tmp-black border border-white/10 p-4 text-white focus:border-tmp-gold focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-tmp-gold file:text-black hover:file:bg-white"
                    suppressHydrationWarning
                />
                
                {previewUrl && (
                    <div className="mt-4 relative w-full h-48 border border-white/10 rounded overflow-hidden">
                        <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                    </div>
                )}
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-white/10 flex justify-end">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-tmp-gold text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Publishing..." : "Publish Article"}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
