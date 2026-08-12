import Link from "next/link";
import AtmosphericTerrain from "@/components/AtmosphericTerrain";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#090806] px-5 pb-12 pt-28 text-[#bba888] md:px-10 md:pt-36 lg:px-14">
      <AtmosphericTerrain variant="hybrid" tone="dark" showAnalysis={false} className="opacity-35" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-transparent via-[#090806]/62 to-[#090806]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#070706] to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1600px] gap-12 border-t border-[#a98758]/18 pt-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <Link href="/" className="text-xl font-medium uppercase tracking-[-.025em] text-[#c5b08f] transition-colors hover:text-[#dac29a] md:text-2xl">
            {siteConfig.name}
          </Link>
          <p className="mt-4 max-w-md font-mono text-[10px] uppercase leading-6 tracking-[.16em] text-[#9b886f]/60">
            {siteConfig.descriptor}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-4 font-mono text-[11px] uppercase tracking-[.15em] text-[#a08867]/72 md:col-span-4">
          {siteConfig.navigation.map((item, index) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[#d1bb96]">
              <span className="mr-1.5 text-[#8d7351]/48">0{index + 1}</span>{item.label}
            </Link>
          ))}
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#d1bb96]">LinkedIn ↗</a>
          <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#d1bb96]">Instagram ↗</a>
        </div>

        <div className="font-mono text-[10px] uppercase leading-6 tracking-[.16em] text-[#907b61]/62 md:col-span-3 md:text-right">
          <p>{siteConfig.location}</p>
          <p>{siteConfig.email}</p>
          <p>© {year} / Visual archive</p>
        </div>
      </div>
    </footer>
  );
}
