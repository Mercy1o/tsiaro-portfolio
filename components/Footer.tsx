import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080706] px-5 pb-10 pt-20 text-[#bba888] md:px-10 md:pb-12 md:pt-24 lg:px-14">
      <div className="mx-auto max-w-[1600px] border-t border-[#a98758]/16 pt-7">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="text-[clamp(2.2rem,4.8vw,5.2rem)] font-medium leading-none tracking-[-.06em] text-[#d7c29f] transition-colors hover:text-[#ead8b9]"
            >
              {siteConfig.brand}
            </Link>
            <p className="mt-4 max-w-md font-mono text-[10px] uppercase tracking-[.17em] text-[#988267]/64 md:text-[11px]">
              {siteConfig.name} · {siteConfig.location}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#8e7657]/58">Contact</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 block text-lg tracking-[-.025em] text-[#c9b493] transition-colors hover:text-[#e6d2b1] md:text-xl"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#8e7657]/58">Social</p>
            <div className="mt-3 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#aa8c65]/76 md:text-[11px]">
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-[#e0c9a5]">Instagram ↗</a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#e0c9a5]">LinkedIn ↗</a>
            </div>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[.16em] text-[#87745e]/58 md:col-span-2 md:text-right">
            © {year}
          </div>
        </div>
      </div>
    </footer>
  );
}
