import type { Metadata } from "next";
import { awards, profileFacts, siteConfig, skills } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} and contact information.`,
};

export default function AboutPage() {
  return (
    <main className="page-about min-h-screen bg-transparent px-5 pb-24 pt-32 text-[#343633] md:px-10 md:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <header className="grid gap-10 border-b border-[#666963]/16 pb-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[.22em] text-[#666963]/62">ABOUT / PROFILE</p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <h1 className="text-[clamp(4rem,8vw,8.5rem)] font-medium uppercase leading-[.8] tracking-[-.07em]">About</h1>
            <p className="mt-7 max-w-3xl text-[clamp(1.45rem,2.5vw,2.6rem)] font-light leading-[1.08] tracking-[-.035em] text-[#343633]/82">
              {siteConfig.about.description}
            </p>
          </div>
        </header>

        <section className="grid gap-10 border-b border-[#666963]/16 py-14 md:grid-cols-12">
          <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/58 md:col-span-3">Education / Practice</p>
          <div className="md:col-span-8">
            {profileFacts.map((fact, index) => (
              <article key={fact.label} className="grid gap-3 border-t border-[#666963]/14 py-7 first:border-t-0 sm:grid-cols-[72px_1fr_auto] sm:items-baseline">
                <span className="font-mono text-[8px] uppercase tracking-[.18em] text-[#666963]/54">0{index + 1}</span>
                <div>
                  <p className="text-2xl font-medium tracking-[-.04em] md:text-3xl">{fact.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#343633]/64">{fact.label}</p>
                </div>
                <p className="text-sm leading-6 text-[#343633]/64 sm:text-right">{fact.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-[#666963]/16 py-14 md:grid-cols-12">
          <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/58 md:col-span-3">Tools / Practice</p>
          <div className="grid gap-10 md:col-span-8 md:grid-cols-2">
            <div>
              <p className="mb-4 font-mono text-[8px] uppercase tracking-[.18em] text-[#666963]/58">Software</p>
              <p className="text-lg leading-8 text-[#343633]/78">{skills.advanced.join(" · ")}</p>
            </div>
            <div>
              <p className="mb-4 font-mono text-[8px] uppercase tracking-[.18em] text-[#666963]/58">Disciplines</p>
              <p className="text-lg leading-8 text-[#343633]/78">{skills.disciplines.join(" · ")}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-10 border-b border-[#666963]/16 py-14 md:grid-cols-12">
          <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/58 md:col-span-3">Recognition</p>
          <div className="md:col-span-8">
            {awards.map((award, index) => (
              <div key={award.title} className="grid gap-3 border-t border-[#666963]/14 py-7 first:border-t-0 sm:grid-cols-[72px_1fr]">
                <span className="font-mono text-[8px] text-[#666963]/52">0{index + 1}</span>
                <div>
                  <p className="text-2xl font-medium tracking-[-.04em] md:text-3xl">{award.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#343633]/64">{award.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="grid gap-10 py-16 md:grid-cols-12 md:py-20">
          <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/58 md:col-span-3">Contact</p>
          <div className="md:col-span-8">
            <p className="max-w-4xl text-[clamp(2.2rem,4vw,4.8rem)] font-light leading-[.98] tracking-[-.05em]">Interested in working together or continuing a conversation?</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-10 inline-block border-t border-[#666963]/16 pt-5 text-[clamp(1.35rem,2.6vw,2.8rem)] font-light tracking-[-.04em] transition-opacity hover:opacity-55">
              {siteConfig.email} ↗
            </a>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[9px] uppercase tracking-[.16em] text-[#666963]/66">
              <span>{siteConfig.location}</span>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-55">Instagram ↗</a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-55">LinkedIn ↗</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
