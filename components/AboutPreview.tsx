import Link from "next/link";
import { profileFacts, siteConfig } from "@/data/site";

export default function AboutPreview() {
  return (
    <section className="bg-space px-5 py-24 text-bone md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-sand">PROFILE / 001</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="max-w-5xl text-4xl font-medium tracking-[-.04em] md:text-6xl lg:text-7xl">{siteConfig.about.title}</h2>
            <p className="mt-10 max-w-2xl text-base leading-7 text-bone/55 md:text-lg md:leading-8">{siteConfig.about.description}</p>
            <Link href="/about" className="mt-8 inline-flex text-xs uppercase tracking-[.16em] text-bone/70 hover:text-bone">Read profile ↗</Link>
          </div>
        </div>

        <div className="mt-24 grid border-t border-white/10 md:grid-cols-3">
          {profileFacts.map((fact, index) => (
            <div key={fact.label} className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
              <p className="font-mono text-[9px] uppercase tracking-[.18em] text-bone/30">0{index + 1} / {fact.label}</p>
              <p className="mt-7 text-xl tracking-[-.02em]">{fact.value}</p>
              <p className="mt-2 text-sm text-bone/40">{fact.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
