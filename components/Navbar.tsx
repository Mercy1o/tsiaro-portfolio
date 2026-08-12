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
          ? "border-b border-[#a98758]/12 bg-[linear-gradient(180deg,rgba(7,7,6,.94),rgba(7,7,6,.68))] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-[#070706]/82 to-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-500 md:px-10 lg:px-14 ${scrolled ? "h-[66px]" : "h-[82px]"}`}>
        <Link
          href="/"
          aria-label={`${siteConfig.brand} home`}
          className="text-[15px] font-medium tracking-[-.035em] text-[#d2bea0] transition-colors hover:text-[#ead8bb] md:text-base"
        >
          {siteConfig.brand}
        </Link>

        <div className="hidden font-mono text-[10px] uppercase tracking-[.2em] text-[#9f825e]/55 md:block">
          Tsiaro Rakototiana / Toronto
        </div>

        <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-7 md:gap-9">
          {siteConfig.navigation.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative font-mono text-[10px] uppercase tracking-[.16em] transition-colors sm:text-[11px] ${
                  active ? "text-[#d9c6a4]" : "text-[#aa9575]/65 hover:text-[#d9c6a4]"
                }`}
              >
                <span className="mr-1.5 hidden text-[#a98758]/42 lg:inline">0{index + 1}</span>
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
