"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Our Firm", href: "#about" },
  { name: "Our Lawyers", href: "#lawyers" },
  { name: "Services", href: "#services" },
  { name: "Clients", href: "#clients" },
  { name: "Our News", href: "#news" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [clickCounts, setClickCounts] = useState<number[]>([]);

  const handleLogoClick = (e: React.MouseEvent) => {
    const now = Date.now();
    const recentClicks = clickCounts.filter((time) => now - time < 1000); // Look for clicks in the last 1 second
    const newClicks = [...recentClicks, now];
    
    setClickCounts(newClicks);

    if (newClicks.length === 3) {
      e.preventDefault();
      setClickCounts([]); // Reset completely after successful trigger
      router.push("/admin/login");
    }
  };

  const getHref = (href: string) => {
    if (pathname === "/") return href;
    return `/${href}`;
  };

  // Hide Navbar on Admin pages
  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-tmp-black/98 border-b border-tmp-gold/10 py-3"
          : "bg-tmp-black/80 md:bg-transparent py-4 md:py-6 backdrop-blur-sm md:backdrop-blur-none"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center gap-4">
          <Link href="/" className="block p-0" onClick={handleLogoClick}>
            <div className="relative h-16 md:h-20 lg:h-24 w-auto aspect-[1/1]">
                 {/* Using standard img tag temporarily if Next/Image is tricky with unknown aspect ratios, 
                     but standard layout='fill' or objectFit is better. For now assuming squares or managing width manually */}
                <Image 
                    src="/assets/logo.png" 
                    alt="Tao Manullang & Partners" 
                    width={100} 
                    height={100}
                    className="h-full w-auto object-contain scale-[1.15]"
                />
            </div>
          </Link>
          <div className="hidden sm:block">
            <p className="text-xs font-bold tracking-[0.3em] text-tmp-gold uppercase leading-none">
              Tao Manullang & Partners
            </p>
            <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase mt-1">
              Law Firm
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 text-[10px] font-semibold uppercase tracking-widest items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={getHref(link.href)}
              className="text-gray-400 hover:text-tmp-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-tmp-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            href={getHref("#contact")}
            className="border border-tmp-gold text-tmp-gold px-7 py-2.5 transition-all duration-300 hover:bg-tmp-gold hover:text-black hover:shadow-[0_0_15px_rgba(197,160,89,0.5)]"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-tmp-gold text-2xl w-8 h-8 flex items-center justify-center focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          suppressHydrationWarning
        >
          {isMounted ? (
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          ) : (
            <i className="fas fa-bars opacity-0"></i>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMounted && isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-tmp-black border-t border-white/10 p-6 flex flex-col space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={getHref(link.href)}
              className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-tmp-gold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={getHref("#contact")}
            className="text-tmp-gold text-xs font-bold uppercase tracking-widest border border-tmp-gold p-3 text-center hover:bg-tmp-gold hover:text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
