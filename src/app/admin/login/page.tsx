"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Using dummy firebase config
import AOS from "aos";
import "aos/dist/aos.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Login Failed: Invalid Email or Password (or check Firebase Console if user exists)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Ambient Background Animation */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-80">
        <div className="absolute w-[800px] h-[800px] bg-tmp-gold/40 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute w-[700px] h-[700px] bg-white/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000 top-0 right-1/4"></div>
        <div className="absolute w-[900px] h-[900px] bg-tmp-gold/30 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000 bottom-0 left-1/4"></div>
      </div>

      <div className="w-full max-w-md bg-tmp-black/80 backdrop-blur-2xl border border-white/10 p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10" data-aos="zoom-in">
        <div className="text-center mb-8" data-aos="fade-down" data-aos-delay="200">
            <div className="relative w-20 h-20 mx-auto mb-4">
               <Image src="/assets/logo.png" alt="TMP Logo" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-serif italic text-white mb-1">Admin Access</h1>
            <h2 className="text-xs text-tmp-gold font-bold uppercase tracking-[0.3em]">Restricted Area</h2>
        </div>
        
        {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded text-xs mb-6 text-center" data-aos="shake">
                {error}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6" data-aos="fade-up" data-aos-delay="400">
            <div>
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Email Address</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-tmp-gold transition-colors text-sm placeholder:text-gray-600"
                    placeholder="Your email address"
                    suppressHydrationWarning
                />
            </div>
            <div>
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Password</label>
                <div className="relative w-full">
                    <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 pr-12 text-white focus:outline-none focus:border-tmp-gold transition-colors text-sm placeholder:text-gray-600"
                        placeholder="Your password"
                        suppressHydrationWarning
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors focus:outline-none ${
                            showPassword ? "text-tmp-gold" : "text-gray-500 hover:text-white"
                        }`}
                        suppressHydrationWarning
                    >
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                </div>
            </div>
            <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-tmp-gold text-black py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            suppressHydrationWarning
          >
            {loading ? "Verifying..." : "Enter Dashboard"}
          </button>
        </form>
        
        <div className="mt-8 flex flex-col items-center space-y-4" data-aos="fade-up" data-aos-delay="600">
            <Link 
              href="/"
              className="text-tmp-gold text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
            >
              <i className="fas fa-arrow-left"></i> Back to Website
            </Link>
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">
                &copy; 2026 Tao Manullang & Partners. Security logged.
            </p>
        </div>
      </div>
    </div>
  );
}
