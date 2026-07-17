"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Preloader from "./Preloader";
import BackToTop from "./BackToTop";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth-store";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  // Maintenance & SEO States
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [contactWhatsapp, setContactWhatsapp] = useState("");

  useEffect(() => {
    // Check initial user
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (err) {
        console.error("Error getting user session:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Fetch Maintenance & SEO settings
    const fetchMaintenanceAndSEO = async () => {
      try {
        const { data, error } = await supabase.from("site_settings").select("*");
        if (error) throw error;
        if (data) {
          let maintenance = "false";
          let title = "";
          let desc = "";
          let whatsapp = "";
          
          data.forEach((item) => {
            if (item.key === "maintenance_mode") maintenance = item.value;
            if (item.key === "site_title") title = item.value;
            if (item.key === "site_description") desc = item.value;
            if (item.key === "whatsapp") whatsapp = item.value;
          });

          setMaintenanceMode(maintenance === "true");
          setContactWhatsapp(whatsapp);

          // Only override SEO elements on public pages
          if (!pathname?.startsWith("/admin")) {
            if (title) {
              document.title = title;
            }
            if (desc) {
              const metaDescription = document.querySelector('meta[name="description"]');
              if (metaDescription) {
                metaDescription.setAttribute("content", desc);
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to load maintenance status:", err);
      }
    };

    fetchMaintenanceAndSEO();

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, pathname]);

  // Render maintenance page if enabled and not on an admin route
  if (maintenanceMode && !pathname?.startsWith("/admin")) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient Background Animation */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-60">
          <div className="absolute w-[600px] h-[600px] bg-tmp-gold/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        </div>

        <div className="z-10 text-center max-w-xl space-y-8 flex flex-col items-center">
          {/* Logo */}
          <div className="relative w-28 h-28 animate-pulse">
            <img src="/assets/logo.png" alt="TMP Logo" className="w-full h-full object-contain" />
          </div>

          <div className="space-y-4">
            <h1 className="text-[10px] tracking-[0.4em] font-bold text-tmp-gold uppercase">Under Maintenance</h1>
            <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">We&apos;ll Be Back Soon</h2>
            <div className="w-12 h-[1px] bg-tmp-gold mx-auto my-4"></div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
              Our website is currently undergoing scheduled maintenance to improve our services. We appreciate your patience and will be back online shortly.
            </p>
          </div>

          {contactWhatsapp && contactWhatsapp !== "-" && (
            <div className="bg-tmp-black/50 backdrop-blur border border-white/10 p-6 rounded-lg w-full max-w-md shadow-2xl space-y-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Need Immediate Assistance?</p>
              <p className="text-xs text-gray-300">For urgent inquiries or immediate legal counsel, please reach us directly via WhatsApp:</p>
              <a
                href={`https://wa.me/${contactWhatsapp.startsWith("0") ? "62" + contactWhatsapp.slice(1).replace(/[^0-9]/g, "") : contactWhatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-tmp-gold text-black hover:bg-white hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] px-8 py-3 rounded-md w-full"
              >
                <i className="fab fa-whatsapp text-lg"></i> Chat on WhatsApp
              </a>
            </div>
          )}

          <div className="pt-6">
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">
              &copy; 2026 Tao Manullang & Partners. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Preloader onFinish={() => setIsLoaded(true)} />
      <div
        className={`transition-all duration-1000 ease-out transform ${
          isLoaded
            ? "opacity-100 translate-y-0 filter-none"
            : "opacity-0 translate-y-10 blur-sm pointer-events-none"
        }`}
      >
        {children}
      </div>
      <BackToTop />
    </>
  );
}

