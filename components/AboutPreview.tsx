import Link from "next/link";
import { profileFacts, siteConfig } from "@/data/site";

export default function AboutPreview() {
  return (
    <section className="archive-paper micro-grid px-5 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 border-b border-black/15 pb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[.23em] text-black/42">PROFILE / FIELD NOTES</p>
            <p className="mt-5 max-w-[14rem] font-mono text-[8px] uppercase leading-5 tracking-[.15em] text-black/25">
              Architecture / technology / hand-making / visual culture
            </p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <h2 className="font-editorial max-w-5xl text-5xl font-normal leading-[.92] tracking-[-.045em] text-black md:text-7xl lg:text-8xl">
              {siteConfig.about.title}
            </h2>
            <div className="mt-9 grid gap-7 md:grid-cols-2">
              <p className="max-w-2xl text-base leading-7 text-black/55 md:text-lg md:leading-8">{siteConfig.about.description}</p>
              <div className="md:text-right">
                <Link href="/about" className="inline-flex border-b border-black/25 pb-2 font-mono text-[9px] uppercase tracking-[.18em] text-black/62 transition-colors hover:border-black hover:text-black">
                  Open profile ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3">
          {profileFacts.map((fact, index) => (
            <div key={fact.label} className="border-b border-black/15 py-9 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <p className="font-mono text-[8px] uppercase tracking-[.2em] text-black/32">0{index + 1} / {fact.label}</p>
              <p className="mt-8 text-2xl font-medium tracking-[-.035em] text-black/82">{fact.value}</p>
              <p className="mt-2 text-sm leading-6 text-black/45">{fact.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
