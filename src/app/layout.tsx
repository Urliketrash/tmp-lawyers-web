import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TMP Law Firm - Tao Manullang & Partners",
    template: "%s | TMP Law Firm",
  },
  description: "Advocate & Counsellor at Law. Trust • Strategy • Professional. Providing premium litigation, corporate, events, and regulation legal services.",
  keywords: ["TMP Law Firm", "Tao Manullang & Partners", "Law Firm Jakarta", "Jakarta Lawyers", "Jakarta Attorneys", "Litigation", "Corporate Law", "Regulation"],
  authors: [{ name: "TMP Law Firm" }],
  openGraph: {
    title: "TMP Law Firm - Tao Manullang & Partners",
    description: "Advocate & Counsellor at Law. Trust • Strategy • Professional.",
    url: "https://tmplawyers.com",
    siteName: "TMP Law Firm",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TMP Law Firm - Tao Manullang & Partners",
    description: "Advocate & Counsellor at Law. Trust • Strategy • Professional.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import LayoutWrapper from "@/components/LayoutWrapper";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/providers/query-provider";
import { OrganizationJsonLd } from "@/components/JsonLd";
import VisitorTracker from "@/components/VisitorTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased bg-tmp-black text-white overflow-x-hidden`}
        suppressHydrationWarning
      >
        <div className="relative w-full overflow-x-hidden min-h-screen">
          <OrganizationJsonLd
            name="TMP Law Firm - Tao Manullang & Partners"
            url="https://tmplawyers.com"
            logo="https://tmplawyers.com/assets/logo.png"
            sameAs={["https://www.instagram.com/tmplawfirm"]}
          />
          <QueryProvider>
            <VisitorTracker />
            <LayoutWrapper>
              <Navbar />
              {children}
            </LayoutWrapper>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
