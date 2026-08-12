"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-[linear-gradient(180deg,rgba(7,7,6,.94)_0%,rgba(7,7,6,.72)_46%,rgba(7,7,6,.28)_74%,transparent_100%)] transition-all duration-500 ${scrolled ? "backdrop-blur-[10px]" : ""}`}
    >
      <div className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-500 md:px-10 lg:px-14 ${scrolled ? "h-16" : "h-20"}`}>
        <Link href="/" className="flex items-center gap-4" aria-label="Tsiaro Rakototiana home">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#a98758]/32 text-sm font-medium text-[#c8b18e]">T</span>
          <span className="font-mono text-[9px] uppercase tracking-[.22em] text-[#b8a386]/72 sm:text-[10px]">
            {siteConfig.shortName}
          </span>
        </Link>

        <div className="hidden font-mono text-[8px] uppercase tracking-[.26em] text-[#8e7859]/38 md:block">
          Archive / 2026 / Toronto
        </div>

        <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-7 md:gap-9">
          {siteConfig.navigation.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative font-mono text-[9px] uppercase tracking-[.17em] transition-colors sm:text-[10px] ${active ? "text-[#d1bb96]" : "text-[#9a8669]/58 hover:text-[#c8b18e]"}`}
              >
                <span className="mr-1 hidden text-[#8b7355]/32 lg:inline">0{index + 1}</span>
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-px bg-[#a98758] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
