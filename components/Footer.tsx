import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#c8a878]/16 bg-[#17130f] px-5 py-10 text-[#e7ddca] md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <Link href="/" className="font-editorial text-3xl font-normal tracking-[-.035em] text-[#c8a878] md:text-4xl">
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-md font-mono text-[8px] uppercase leading-5 tracking-[.18em] text-[#d8cbb6]/42">{siteConfig.descriptor}</p>
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[9px] uppercase tracking-[.17em] text-[#d8cbb6]/58 md:col-span-4">
          {siteConfig.navigation.map((item, index) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[#c8a878]">
              <span className="mr-1 text-[#c8a878]/30">0{index + 1}</span>{item.label}
            </Link>
          ))}
        </div>

        <div className="font-mono text-[8px] uppercase leading-5 tracking-[.18em] text-[#c8a878]/42 md:col-span-3 md:text-right">
          <p>{siteConfig.location}</p>
          <p>© {year} / Visual archive</p>
        </div>
      </div>
    </footer>
  );
}
