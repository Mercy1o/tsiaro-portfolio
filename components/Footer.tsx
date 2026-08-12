import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#070706] px-5 py-10 text-bone md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <Link href="/" className="font-editorial text-3xl font-normal tracking-[-.035em] text-cream md:text-4xl">
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-md font-mono text-[8px] uppercase leading-5 tracking-[.18em] text-bone/30">{siteConfig.descriptor}</p>
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[9px] uppercase tracking-[.17em] text-bone/48 md:col-span-4">
          {siteConfig.navigation.map((item, index) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-bone">
              <span className="mr-1 text-bone/18">0{index + 1}</span>{item.label}
            </Link>
          ))}
        </div>

        <div className="font-mono text-[8px] uppercase leading-5 tracking-[.18em] text-bone/28 md:col-span-3 md:text-right">
          <p>{siteConfig.location}</p>
          <p>© {year} / Visual archive</p>
        </div>
      </div>
    </footer>
  );
}
