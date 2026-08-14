import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.brand}.`,
};

export default function ContactPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-transparent px-5 pb-10 pt-32 text-[#343633] md:px-10 md:pb-12 md:pt-36 lg:px-14">
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-10rem)] max-w-[1600px] flex-col justify-between">
        <div className="grid gap-3 border-t border-[#666963]/18 pt-5 font-mono text-[9px] uppercase tracking-[.18em] text-[#666963]/66 sm:grid-cols-2 md:text-[10px]">
          <span>Contact / Direct correspondence</span>
          <span className="sm:text-right">Toronto, Canada</span>
        </div>

        <section className="py-20 md:py-28">
          <p className="text-[clamp(2.5rem,6vw,7rem)] font-medium leading-[.88] tracking-[-.06em] text-[#343633]">
            {siteConfig.brand}
          </p>

          <p className="mt-8 max-w-4xl text-[clamp(1.8rem,4vw,4.8rem)] font-light leading-[.98] tracking-[-.05em] text-[#343633]/82">
            Interested in working together?
          </p>

          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-10 inline-flex min-h-11 items-center border-t border-[#666963]/18 pt-5 text-[clamp(1.35rem,3vw,3.3rem)] font-light tracking-[-.04em] text-[#343633] transition-opacity duration-300 hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#343633]/55"
          >
            {siteConfig.email} ↗
          </a>
        </section>

        <div className="grid gap-6 border-t border-[#666963]/18 pt-6 font-mono text-[9px] uppercase tracking-[.16em] text-[#666963]/66 sm:grid-cols-2 md:text-[10px]">
          <div className="flex gap-5">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#343633]/55">Instagram ↗</a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#343633]/55">LinkedIn ↗</a>
          </div>
          <span className="sm:text-right">Open to collaboration and conversation</span>
        </div>
      </div>
    </main>
  );
}
