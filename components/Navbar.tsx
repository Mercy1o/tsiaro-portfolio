"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

function getBrowserZoom() {
  if (typeof window === "undefined") return 1;

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer) return 1;

  const viewportWidth = window.visualViewport?.width || window.innerWidth;
  if (!viewportWidth || !window.outerWidth) return 1;

  return Math.min(Math.max(window.outerWidth / viewportWidth, 0.35), 4);
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [brandZoom, setBrandZoom] = useState(1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateZoom = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setBrandZoom(getBrowserZoom());
      });
    };

    updateZoom();
    window.addEventListener("resize", updateZoom, { passive: true });
    window.visualViewport?.addEventListener("resize", updateZoom, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateZoom);
      window.visualViewport?.removeEventListener("resize", updateZoom);
    };
  }, []);

  const isHome = pathname === "/";
  const brandVisualSize = 18;
  const compensatedBrandSize = brandVisualSize / brandZoom;

  return (
    <header
      className={`mobile-safe-nav fixed inset-x-0 top-0 z-50 overflow-visible bg-transparent transition-all duration-500 ${
        scrolled ? "backdrop-blur-[24px]" : "backdrop-blur-[14px]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-10 h-14 backdrop-blur-[12px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,.85),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,.85),transparent)]"
      />

      <div
        className={`relative mx-auto grid max-w-[1600px] grid-cols-[auto_1fr] items-center gap-3 px-4 transition-all duration-500 sm:px-5 md:grid-cols-[1fr_auto_1fr] md:gap-0 md:px-10 lg:px-14 ${
          scrolled ? "min-h-[62px] md:h-[72px]" : "min-h-[68px] md:h-[88px]"
        }`}
      >
        {isHome ? (
          <span
            data-brand-target
            aria-hidden="true"
            className="invisible block h-[24px] w-[132px] justify-self-start font-medium tracking-[-.04em]"
            style={{ fontSize: `${compensatedBrandSize}px` }}
          />
        ) : (
          <Link
            href="/"
            aria-label={`${siteConfig.brand} home`}
            className="mobile-tap-target justify-self-start whitespace-nowrap font-medium tracking-[-.04em] text-[#343633] transition-opacity hover:opacity-55"
            style={{ fontSize: `${compensatedBrandSize}px` }}
          >
            {siteConfig.brand}
          </Link>
        )}

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
