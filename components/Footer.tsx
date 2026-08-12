import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[linear-gradient(180deg,rgba(7,7,6,0)_0%,rgba(7,7,6,.72)_28%,#070706_100%)] px-5 pb-12 pt-20 text-[#bba888] md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1600px] gap-10 border-t border-[#a98758]/14 pt-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <Link href="/" className="text-2xl font-medium tracking-[-.035em] text-[#c5b08f] md:text-3xl">
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-md font-mono text-[8px] uppercase leading-5 tracking-[.18em] text-[#8f7c63]/46">{siteConfig.descriptor}</p>
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[9px] uppercase tracking-[.17em] text-[#927b5c]/58 md:col-span-4">
          {siteConfig.navigation.map((item, index) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[#c5b08f]">
              <span className="mr-1 text-[#8d7351]/34">0{index + 1}</span>{item.label}
            </Link>
          ))}
        </div>

        <div className="font-mono text-[8px] uppercase leading-5 tracking-[.18em] text-[#836f57]/46 md:col-span-3 md:text-right">
          <p>{siteConfig.location}</p>
          <p>© {year} / Visual archive</p>
        </div>
      </div>
    </footer>
  );
}
