import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tsiaro-portfolio.vercel.app"),
  title: {
    default: siteConfig.title,
    template: "%s — Tsiaro Rakototiana",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a
          href="#main-content"
          className="fixed left-3 top-3 z-[100] -translate-y-24 bg-bone px-4 py-2 text-xs text-space focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <div id="main-content">{children}</div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
