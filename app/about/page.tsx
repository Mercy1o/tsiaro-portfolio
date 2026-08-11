import type { Metadata } from "next";
import { awards, profileFacts, siteConfig, skills } from "@/data/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="bg-space px-5 pb-28 pt-36 text-bone md:px-10 md:pt-44 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 border-b border-white/10 pb-20 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-sand">ABOUT / PROFILE</p>
          </div>
          <div className="md:col-span-8">
            <h1 className="max-w-5xl text-5xl font-medium tracking-[-.055em] md:text-7xl lg:text-8xl">{siteConfig.about.title}</h1>
            <p className="mt-10 max-w-3xl text-lg leading-8 text-bone/55">{siteConfig.about.description}</p>
          </div>
        </div>

        <section className="grid gap-10 border-b border-white/10 py-20 md:grid-cols-12">
          <h2 className="font-mono text-[10px] uppercase tracking-[.2em] text-bone/35 md:col-span-3">EDUCATION / PRACTICE</h2>
          <div className="space-y-10 md:col-span-8">
            {profileFacts.map((fact, index) => (
              <div key={fact.label} className="grid gap-3 border-b border-white/10 pb-8 sm:grid-cols-[70px_1fr]">
                <span className="font-mono text-[10px] text-bone/25">0{index + 1}</span>
                <div><p className="text-2xl tracking-[-.03em]">{fact.value}</p><p className="mt-2 text-sm text-bone/40">{fact.detail}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-white/10 py-20 md:grid-cols-12">
          <h2 className="font-mono text-[10px] uppercase tracking-[.2em] text-bone/35 md:col-span-3">TOOLS / DISCIPLINES</h2>
          <div className="grid gap-12 md:col-span-8 lg:grid-cols-2">
            <div><p className="mb-5 text-sm text-sand">Advanced software</p><div className="flex flex-wrap gap-2">{skills.advanced.map((item) => <span key={item} className="border border-white/10 px-3 py-2 text-sm text-bone/60">{item}</span>)}</div></div>
            <div><p className="mb-5 text-sm text-sand">Practice</p><div className="flex flex-wrap gap-2">{skills.disciplines.map((item) => <span key={item} className="border border-white/10 px-3 py-2 text-sm text-bone/60">{item}</span>)}</div></div>
          </div>
        </section>

        <section className="grid gap-10 pt-20 md:grid-cols-12">
          <h2 className="font-mono text-[10px] uppercase tracking-[.2em] text-bone/35 md:col-span-3">RECOGNITION</h2>
          <div className="space-y-8 md:col-span-8">{awards.map((award) => <div key={award.title}><p className="text-2xl tracking-[-.03em]">{award.title}</p><p className="mt-1 text-sm text-bone/40">{award.detail}</p></div>)}</div>
        </section>
      </div>
    </main>
  );
}
