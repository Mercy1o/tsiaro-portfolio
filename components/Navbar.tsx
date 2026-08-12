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
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ${
        scrolled
          ? "border-[#d0b382]/14 bg-[#090806]/58 shadow-[0_10px_34px_rgba(0,0,0,.16)]"
          : "border-[#d0b382]/10 bg-[#090806]/34 shadow-[0_8px_28px_rgba(0,0,0,.08)]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(233,217,190,.035),rgba(9,8,6,.03)_42%,rgba(9,8,6,.16))]"
      />

      <div
        className={`relative mx-auto grid max-w-[1600px] grid-cols-[1fr_auto] items-center px-5 transition-all duration-500 md:grid-cols-[1fr_auto_1fr] md:px-10 lg:px-14 ${
          scrolled ? "h-[66px]" : "h-[82px]"
        }`}
      >
        <Link
          href="/"
          aria-label={`${siteConfig.brand} home`}
          className="justify-self-start text-[15px] font-medium tracking-[-.035em] text-[#d2bea0] transition-colors hover:text-[#ead8bb] md:text-base"
        >
          {siteConfig.brand}
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center justify-center gap-4 sm:gap-7 md:gap-9"
        >
          {siteConfig.navigation.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative font-mono text-[10px] uppercase tracking-[.16em] transition-colors sm:text-[11px] ${
                  active ? "text-[#e3d0ae]" : "text-[#b8a182]/72 hover:text-[#e3d0ae]"
                }`}
              >
                <span className="mr-1.5 hidden text-[#b58e5c]/52 lg:inline">0{index + 1}</span>
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-[#b99160] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden justify-self-end font-mono text-[10px] uppercase tracking-[.2em] text-[#b39a75]/62 md:block">
          Tsiaro Rakototiana / Toronto
        </div>
      </div>
    </header>
  );
}
