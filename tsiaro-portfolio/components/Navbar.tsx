import Link from "next/link";

import { siteConfig } from "@/data/site";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10 lg:px-14">
          <Link
            href="/"
            className="font-mono text-[11px] tracking-[0.18em] text-bone"
            aria-label="Tsiaro Rakototiana — Home"
          >
            {siteConfig.shortName}
          </Link>

          <nav
            aria-label="Main navigation"
            className="flex items-center gap-5 md:gap-9"
          >
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs uppercase tracking-[0.14em] text-bone/65 transition-colors duration-300 hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}