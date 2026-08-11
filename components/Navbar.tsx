"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/25 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10 lg:px-14">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.18em] text-bone"
          aria-label="Tsiaro Rakototiana home"
        >
          {siteConfig.shortName}
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-5 md:gap-9">
          {siteConfig.navigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? "text-bone" : "text-bone/50 hover:text-bone"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
