"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-nav">
      <div className="site-shell site-nav-inner">
        <Link href="/" className="site-brand" aria-label={`${siteConfig.brand} home`}>
          {siteConfig.brand}
        </Link>

        <nav aria-label="Main navigation" className="site-nav-links">
          {siteConfig.navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.label} href={item.href} className={active ? "is-active" : ""}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
