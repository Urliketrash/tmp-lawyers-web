"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Using dummy firebase config

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-tmp-black border border-white/10 p-8 rounded-xl shadow-2xl">
        <div className="text-center mb-8">
            <div className="relative w-20 h-20 mx-auto mb-4">
               <Image src="/assets/logo.png" alt="TMP Logo" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-serif italic text-white mb-1">Admin Access</h1>
            <h2 className="text-xs text-tmp-gold font-bold uppercase tracking-[0.3em]">Restricted Area</h2>
        </div>
        
        {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded text-xs mb-6 text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Email Address</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-tmp-gold transition-colors text-sm placeholder:text-gray-600"
                    placeholder="Your email address"
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
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors focus:outline-none ${
                            showPassword ? "text-tmp-gold" : "text-gray-500 hover:text-white"
                        }`}
                    >
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                </div>
            </div>
            <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-tmp-gold text-black py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Enter Dashboard"}
          </button>
        </form>
        
        <div className="mt-8 flex flex-col items-center space-y-4">
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
