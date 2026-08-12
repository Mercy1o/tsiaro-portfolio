import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-space px-5 py-8 text-bone md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <Link href="/" className="text-2xl font-medium tracking-[-.035em]">
            {siteConfig.name}
          </Link>
          <p className="mt-2 max-w-md text-sm leading-6 text-bone/40">{siteConfig.descriptor}</p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[.14em] text-bone/55 md:col-span-4">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-bone">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="font-mono text-[9px] uppercase leading-5 tracking-[.16em] text-bone/30 md:col-span-3 md:text-right">
          <p>{siteConfig.location}</p>
          <p>© {year} / All work by Tsiaro Rakototiana</p>
        </div>
      </div>
    </footer>
  );
}
