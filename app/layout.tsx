import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./mobile.css";
import "./water-theme.css";
import "./continuous-water.css";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSignalTransition from "@/components/PageSignalTransition";
import BrandIntro from "@/components/BrandIntro";
import LiquidMarbleBackground from "@/components/LiquidMarbleBackground";
import { siteConfig } from "@/data/site";

const displaySans = Inter({
  variable: "--font-display-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-ui",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#e2e0da",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tsiaro-portfolio.vercel.app"),
  title: {
    default: siteConfig.title,
    template: "%s - Tsiaro Rakototiana",
  },
  description: siteConfig.description,
  applicationName: "Tsiaro Rakototiana Portfolio",
  creator: siteConfig.name,
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
      <body className={`${displaySans.variable} ${mono.variable}`}>
        <LiquidMarbleBackground />
        <div className="relative z-10">
          <a href="#main-content" className="skip-link">Skip to content</a>
          <MotionProvider>
            <PageSignalTransition />
            <Navbar />
            <BrandIntro />
            <div id="main-content">{children}</div>
            <Footer />
          </MotionProvider>
        </div>
      </body>
    </html>
  );
}
