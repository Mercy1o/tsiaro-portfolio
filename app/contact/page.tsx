import type { Metadata } from "next";
import AtmosphericTerrain from "@/components/AtmosphericTerrain";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.brand}.`,
};

export default function ContactPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#080706] px-5 pb-10 pt-32 text-[#d0bd9e] md:px-10 md:pb-12 md:pt-36 lg:px-14">
      <AtmosphericTerrain variant="liquid" tone="dark" className="fixed inset-0 opacity-24" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_68%_34%,rgba(171,112,57,.11),transparent_34%),linear-gradient(180deg,rgba(8,7,6,.22),rgba(8,7,6,.74))]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-10rem)] max-w-[1600px] flex-col justify-between">
        <div className="border-t border-[#a98758]/16 pt-5 font-mono text-[10px] uppercase tracking-[.18em] text-[#927a5c]/68 md:text-[11px]">
          Contact
        </div>

        <section className="py-20 md:py-28">
          <p className="text-[clamp(2.5rem,6vw,7rem)] font-medium leading-[.88] tracking-[-.06em] text-[#d9c4a2]">
            {siteConfig.brand}
          </p>

          <p className="mt-8 max-w-3xl text-[clamp(1.8rem,4vw,4.8rem)] font-light leading-[.98] tracking-[-.05em] text-[#cbb693]">
            Interested in working together?
          </p>

          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-10 inline-flex min-h-11 items-center border-t border-[#a98758]/18 pt-5 text-[clamp(1.35rem,3vw,3.3rem)] font-light tracking-[-.04em] text-[#ead7b8] transition-opacity duration-500 hover:opacity-58"
          >
            Get in touch ↗
          </a>
        </section>

        <div className="border-t border-[#a98758]/16 pt-6 font-mono text-[10px] uppercase tracking-[.16em] text-[#876f54]/58 md:text-[11px]">
          Direct correspondence
        </div>
      </div>
    </main>
  );
}
