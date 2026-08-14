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
      className={`mobile-safe-nav fixed inset-x-0 top-0 z-50 overflow-visible border-b backdrop-blur-[28px] backdrop-saturate-[.82] transition-all duration-500 ${
        scrolled
          ? "border-[#737873]/12 bg-[#eceae4]/56 shadow-[0_10px_36px_rgba(60,64,61,.07)]"
          : "border-[#737873]/8 bg-[#eceae4]/38 shadow-[0_8px_30px_rgba(60,64,61,.045)]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.24),rgba(226,224,218,.06))]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-8 h-10 bg-[linear-gradient(180deg,rgba(232,230,224,.18),rgba(232,230,224,0))] backdrop-blur-[14px] [mask-image:linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div
        className={`relative mx-auto grid max-w-[1600px] grid-cols-[auto_1fr] items-center gap-3 px-4 transition-all duration-500 sm:px-5 md:grid-cols-[1fr_auto_1fr] md:gap-0 md:px-10 lg:px-14 ${
          scrolled ? "min-h-[62px] md:h-[72px]" : "min-h-[68px] md:h-[88px]"
        }`}
      >
        <Link
          href="/"
          aria-label={`${siteConfig.brand} home`}
          data-brand-target
          className="mobile-tap-target justify-self-start whitespace-nowrap text-[15px] font-medium tracking-[-.04em] text-[#343633] transition-opacity hover:opacity-55 sm:text-[16px] md:text-[18px]"
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
                  className={`mobile-tap-target group relative flex min-h-11 items-center px-2 font-mono text-[9px] uppercase tracking-[.12em] transition-opacity sm:px-3 sm:text-[10px] sm:tracking-[.15em] md:min-h-0 md:px-0 md:text-[13px] md:tracking-[.17em] ${
                    active ? "opacity-100" : "opacity-72 hover:opacity-100"
                  }`}
                >
                  <span className="mr-1.5 hidden lg:inline">0{index + 1}</span>
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-2 right-2 h-px bg-[#666963]/55 transition-all duration-300 md:-bottom-2.5 md:left-0 md:right-auto ${
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
