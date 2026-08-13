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
      className={`mobile-safe-nav fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ${
        scrolled
          ? "border-[#d0b382]/16 bg-[#090806]/66 shadow-[0_10px_34px_rgba(0,0,0,.18)]"
          : "border-[#d0b382]/12 bg-[#090806]/42 shadow-[0_8px_28px_rgba(0,0,0,.1)]"
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(233,217,190,.045),rgba(9,8,6,.035)_42%,rgba(9,8,6,.18))]" />

      <div
        className={`relative mx-auto grid max-w-[1600px] grid-cols-[auto_1fr] items-center gap-3 px-4 transition-all duration-500 sm:px-5 md:grid-cols-[1fr_auto_1fr] md:gap-0 md:px-10 lg:px-14 ${
          scrolled ? "min-h-[62px] md:h-[72px]" : "min-h-[68px] md:h-[88px]"
        }`}
      >
        <Link
          href="/"
          aria-label={`${siteConfig.brand} home`}
          className="mobile-tap-target justify-self-start whitespace-nowrap text-[15px] font-medium tracking-[-.04em] text-[#ddc8a6] transition-colors hover:text-[#f0dec0] sm:text-[16px] md:text-[18px]"
        >
          {siteConfig.brand}
        </Link>

        <nav aria-label="Main navigation" className="justify-self-end md:justify-self-center">
          <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-10">
            {siteConfig.navigation.map((item, index) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`mobile-tap-target group relative flex min-h-11 items-center px-2 font-mono text-[9px] uppercase tracking-[.12em] transition-colors sm:px-3 sm:text-[10px] sm:tracking-[.15em] md:min-h-0 md:px-0 md:text-[13px] md:tracking-[.17em] ${
                    active ? "text-[#ead6b4]" : "text-[#c6ae8b]/88 hover:text-[#ead6b4]"
                  }`}
                >
                  <span className="mr-1.5 hidden text-[#c49a66]/68 lg:inline">0{index + 1}</span>
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-2 right-2 h-px bg-[#c49a66] transition-all duration-300 md:-bottom-2.5 md:left-0 md:right-auto ${
                      active ? "opacity-100 md:w-full" : "opacity-0 md:w-0 md:group-hover:w-full md:group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        <div aria-hidden="true" className="hidden md:block" />
      </div>
    </header>
  );
}
