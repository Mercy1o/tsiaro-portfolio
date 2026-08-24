"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";

function BrandWordmark() {
  return (
    <>
      <span className="brand-trnsk">trnsk</span>
      <span className="brand-design">Design</span>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="site-nav">
      <div className="site-shell site-nav-inner">
        {isHome ? (
          <span
            data-brand-target
            aria-hidden="true"
            className="site-brand site-brand-target"
          >
            <BrandWordmark />
          </span>
        ) : (
          <Link href="/" className="site-brand" aria-label={`${siteConfig.brand} home`}>
            <BrandWordmark />
          </Link>
        )}

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
