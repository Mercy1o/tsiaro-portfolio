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
          ? "border-[#d0b382]/16 bg-[#090806]/62 shadow-[0_10px_34px_rgba(0,0,0,.18)]"
          : "border-[#d0b382]/12 bg-[#090806]/38 shadow-[0_8px_28px_rgba(0,0,0,.1)]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(233,217,190,.045),rgba(9,8,6,.035)_42%,rgba(9,8,6,.18))]"
      />

      <div
        className={`relative mx-auto grid max-w-[1600px] grid-cols-[1fr_auto] items-center px-5 transition-all duration-500 md:grid-cols-[1fr_auto_1fr] md:px-10 lg:px-14 ${
          scrolled ? "h-[72px]" : "h-[88px]"
        }`}
      >
        <Link
          href="/"
          aria-label={`${siteConfig.brand} home`}
          className="justify-self-start text-[17px] font-medium tracking-[-.04em] text-[#ddc8a6] transition-colors hover:text-[#f0dec0] md:text-[18px]"
        >
          {siteConfig.brand}
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center justify-center gap-5 sm:gap-8 md:gap-10"
        >
          {siteConfig.navigation.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative font-mono text-[11px] uppercase tracking-[.17em] transition-colors sm:text-[12px] md:text-[13px] ${
                  active ? "text-[#ead6b4]" : "text-[#c6ae8b]/84 hover:text-[#ead6b4]"
                }`}
              >
                <span className="mr-1.5 hidden text-[#c49a66]/68 lg:inline">0{index + 1}</span>
                {item.label}
                <span
                  className={`absolute -bottom-2.5 left-0 h-px bg-[#c49a66] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden justify-self-end font-mono text-[11px] uppercase tracking-[.19em] text-[#c1a985]/80 md:block lg:text-[12px]">
          Tsiaro Rakototiana / Toronto
        </div>
      </div>
    </header>
  );
}
