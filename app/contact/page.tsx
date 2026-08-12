import type { Metadata } from "next";
import AtmosphericTerrain from "@/components/AtmosphericTerrain";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} / ${siteConfig.brand}.`,
};

export default function ContactPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#080706] px-5 pb-10 pt-32 text-[#d0bd9e] md:px-10 md:pb-12 md:pt-36 lg:px-14">
      <AtmosphericTerrain variant="liquid" tone="dark" className="fixed inset-0 opacity-24" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_68%_34%,rgba(171,112,57,.11),transparent_34%),linear-gradient(180deg,rgba(8,7,6,.22),rgba(8,7,6,.74))]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-10rem)] max-w-[1600px] flex-col justify-between">
        <div className="flex items-start justify-between border-t border-[#a98758]/16 pt-5 font-mono text-[10px] uppercase tracking-[.18em] text-[#927a5c]/68 md:text-[11px]">
          <span>Contact</span>
          <span>{siteConfig.location}</span>
        </div>

        <section className="py-20 md:py-28">
          <p className="text-[clamp(2.5rem,6vw,7rem)] font-medium leading-[.88] tracking-[-.06em] text-[#d9c4a2]">
            {siteConfig.brand}
          </p>

          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-8 block max-w-fit break-all text-[clamp(1.8rem,4.8vw,5.6rem)] font-light leading-[.96] tracking-[-.05em] text-[#ead7b8] transition-opacity duration-500 hover:opacity-58"
          >
            {siteConfig.email}
          </a>
        </section>

        <div className="grid gap-10 border-t border-[#a98758]/16 pt-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#8f7657]/62 md:text-[11px]">Social</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-lg tracking-[-.025em] text-[#c6b18f] md:text-xl">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity duration-300 hover:opacity-55"
              >
                Instagram ↗
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity duration-300 hover:opacity-55"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9 md:text-right">
            <p className="text-[15px] leading-7 text-[#a99982]/76 md:text-base">
              Architecture, design, making, collaborations and selected opportunities.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[.16em] text-[#876f54]/58 md:text-[11px]">
              {siteConfig.name} / {siteConfig.brand}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
