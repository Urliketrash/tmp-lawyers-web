"use client";

import { useEffect, useState } from "react";
import Preloader from "./Preloader";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth-store";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

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

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading]);

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
    </>
  );
}
