import type { Metadata } from "next";
import { awards, profileFacts, siteConfig, skills } from "@/data/site";
import TopographicField from "@/components/TopographicField";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <section className="architecture-atmosphere cinematic-grid relative min-h-[76svh] overflow-hidden px-5 pb-14 pt-32 text-bone md:px-10 md:pt-40 lg:px-14">
        <TopographicField className="opacity-65" />
        <div className="relative z-10 mx-auto flex min-h-[60svh] max-w-[1600px] flex-col justify-between">
          <div className="flex justify-between border-b border-white/12 pb-4 font-mono text-[8px] uppercase tracking-[.22em] text-bone/38">
            <span>PROFILE / FIELD NOTES</span>
            <span>TORONTO / 2026</span>
          </div>

          <div className="grid gap-12 py-16 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="mb-5 font-editorial text-3xl italic text-sand md:text-5xl">A practice between systems and intuition.</p>
              <h1 className="resonance-title max-w-6xl text-bone">Tsiaro<br />Rakototiana</h1>
            </div>
            <p className="max-w-md text-base leading-7 text-bone/55 md:col-span-3 md:col-start-10">{siteConfig.about.description}</p>
          </div>
        </div>
      </section>

      <section className="archive-paper micro-grid px-5 py-20 md:px-10 md:py-28 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 border-b border-black/15 pb-10 md:grid-cols-12">
            <p className="font-mono text-[8px] uppercase tracking-[.22em] text-black/36 md:col-span-3">EDUCATION / PRACTICE</p>
            <h2 className="font-editorial max-w-4xl text-4xl font-normal leading-[.95] tracking-[-.035em] text-black/78 md:col-span-8 md:text-6xl">
              Learning, making and professional practice continue to inform one another.
            </h2>
          </div>

          <div className="grid md:grid-cols-3">
            {profileFacts.map((fact, index) => (
              <article key={fact.label} className="border-b border-black/15 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <span className="font-mono text-[8px] uppercase tracking-[.2em] text-black/30">0{index + 1} / {fact.label}</span>
                <p className="mt-10 text-3xl font-medium tracking-[-.045em] text-black/82">{fact.value}</p>
                <p className="mt-3 text-sm leading-6 text-black/46">{fact.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="creative-atmosphere relative overflow-hidden px-5 py-20 text-cream md:px-10 md:py-28 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 border-b border-cream/15 pb-12 md:grid-cols-12">
            <p className="font-mono text-[8px] uppercase tracking-[.22em] text-cream/35 md:col-span-3">TOOLS / DISCIPLINES</p>
            <div className="md:col-span-8">
              <h2 className="font-editorial text-5xl font-normal leading-[.88] tracking-[-.04em] text-cream md:text-7xl">Digital precision.<br />Physical instinct.</h2>
              <p className="mt-7 max-w-2xl text-sm leading-6 text-cream/52 md:text-base md:leading-7">
                Software is part of the process, not the identity. The work moves between technical production and direct material experimentation.
              </p>
            </div>
          </div>

          <div className="grid gap-14 py-14 md:grid-cols-12">
            <div className="md:col-span-5 md:col-start-4">
              <p className="mb-5 font-mono text-[8px] uppercase tracking-[.2em] text-rust">Advanced software</p>
              <div className="flex flex-wrap gap-2">
                {skills.advanced.map((item) => <span key={item} className="border border-cream/15 bg-black/10 px-3 py-2 text-sm text-cream/65">{item}</span>)}
              </div>
            </div>
            <div className="md:col-span-4">
              <p className="mb-5 font-mono text-[8px] uppercase tracking-[.2em] text-rust">Practice</p>
              <div className="flex flex-wrap gap-2">
                {skills.disciplines.map((item) => <span key={item} className="border border-cream/15 bg-black/10 px-3 py-2 text-sm text-cream/65">{item}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="archive-paper px-5 py-20 md:px-10 md:py-28 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 md:grid-cols-12">
            <p className="font-mono text-[8px] uppercase tracking-[.22em] text-black/36 md:col-span-3">RECOGNITION</p>
            <div className="space-y-0 md:col-span-8">
              {awards.map((award, index) => (
                <div key={award.title} className="grid gap-4 border-t border-black/15 py-8 sm:grid-cols-[70px_1fr]">
                  <span className="font-mono text-[8px] text-black/25">0{index + 1}</span>
                  <div>
                    <p className="font-editorial text-4xl font-normal tracking-[-.035em] text-black/80">{award.title}</p>
                    <p className="mt-2 text-sm leading-6 text-black/45">{award.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
