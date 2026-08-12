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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#c8a878]/16 bg-[#17130f]/78 backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-500 md:px-10 lg:px-14 ${scrolled ? "h-16" : "h-20"}`}>
        <Link href="/" className="flex items-center gap-4" aria-label="Tsiaro Rakototiana home">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c8a878]/35 font-serif text-sm italic text-[#e7ddca]">T</span>
          <span className="font-mono text-[9px] uppercase tracking-[.22em] text-[#d8cbb6]/74 sm:text-[10px]">
            {siteConfig.shortName}
          </span>
        </Link>

        <div className="hidden font-mono text-[8px] uppercase tracking-[.26em] text-[#c8a878]/34 md:block">
          Archive / 2026 / Toronto
        </div>

        <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-7 md:gap-9">
          {siteConfig.navigation.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative font-mono text-[9px] uppercase tracking-[.17em] transition-colors sm:text-[10px] ${
                  active ? "text-[#e7ddca]" : "text-[#d8cbb6]/52 hover:text-[#e7ddca]"
                }`}
              >
                <span className="mr-1 hidden text-[#c8a878]/30 lg:inline">0{index + 1}</span>
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-px bg-[#c8a878] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
