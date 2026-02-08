"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader({ onFinish }: { onFinish?: () => void }) {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 500); // Wait for fade out animation
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-tmp-black transition-opacity duration-500 ${
        loading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center relative">
        <div className="relative w-24 h-24 mx-auto mb-4 animate-pulse">
           <Image
             src="/assets/logo.png"
             alt="Loading..."
             fill
             className="object-contain"
           />
        </div>
        <p className="text-tmp-gold text-xs font-bold tracking-[0.5em] uppercase animate-pulse">
          Tao Manullang & Partners
        </p>
      </div>
    </div>
  );
}
