"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[9999] w-12 h-12 bg-tmp-gold/90 hover:bg-tmp-gold text-black rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          aria-label="Scroll to top"
          suppressHydrationWarning
        >
          <i className="fas fa-chevron-up text-sm"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
