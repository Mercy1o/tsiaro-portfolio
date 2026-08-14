import type { Metadata } from "next";
import { awards, profileFacts, siteConfig, skills } from "@/data/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="page-about relative min-h-screen overflow-hidden bg-transparent text-[#343633]">
      <div className="relative z-10">
        <section className="min-h-[88svh] px-5 pb-14 pt-32 md:px-10 md:pt-40 lg:px-14">
          <div className="mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-between">
            <div className="flex justify-between border-b border-[#666963]/18 pb-4 font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/62">
              <span>PROFILE / FIELD NOTES</span>
              <span>TORONTO / 2026</span>
            </div>

            <div className="grid gap-12 py-16 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <p className="mb-5 text-2xl font-light tracking-[-.035em] text-[#343633]/82 md:text-4xl">A practice between systems and intuition.</p>
                <h1 className="max-w-6xl text-[clamp(4rem,9vw,9.5rem)] font-medium uppercase leading-[.78] tracking-[-.07em] text-[#343633]">Profile</h1>
              </div>
              <p className="max-w-md text-base leading-7 text-[#343633]/72 md:col-span-3 md:col-start-10">{siteConfig.about.description}</p>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-10 border-b border-[#666963]/18 pb-10 md:grid-cols-12">
              <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/62 md:col-span-3">EDUCATION / PRACTICE</p>
              <h2 className="max-w-4xl text-4xl font-medium leading-[.95] tracking-[-.045em] text-[#343633] md:col-span-8 md:text-6xl">Learning, making and professional practice continue to inform one another.</h2>
            </div>

            <div className="grid md:grid-cols-3">
              {profileFacts.map((fact, index) => (
                <article key={fact.label} className="border-b border-[#666963]/16 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                  <span className="font-mono text-[8px] uppercase tracking-[.2em] text-[#666963]/58">0{index + 1} / {fact.label}</span>
                  <p className="mt-10 text-3xl font-medium tracking-[-.045em] text-[#343633]">{fact.value}</p>
                  <p className="mt-3 text-sm leading-6 text-[#343633]/68">{fact.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-12 border-b border-[#666963]/18 pb-12 md:grid-cols-12">
              <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/62 md:col-span-3">TOOLS / DISCIPLINES</p>
              <div className="md:col-span-8">
                <h2 className="text-5xl font-medium uppercase leading-[.86] tracking-[-.055em] text-[#343633] md:text-7xl">Digital precision.<br />Physical instinct.</h2>
                <p className="mt-7 max-w-2xl text-sm leading-6 text-[#343633]/68 md:text-base md:leading-7">Software is part of the process, not the identity. The work moves between technical production and direct material experimentation.</p>
              </div>
            </div>

            <div className="grid gap-14 py-14 md:grid-cols-12">
              <div className="md:col-span-5 md:col-start-4">
                <p className="mb-5 font-mono text-[8px] uppercase tracking-[.2em] text-[#666963]/72">Advanced software</p>
                <div className="flex flex-wrap gap-2">
                  {skills.advanced.map((item) => <span key={item} className="border border-[#666963]/16 bg-transparent px-3 py-2 text-sm text-[#343633]/72">{item}</span>)}
                </div>
              </div>
              <div className="md:col-span-4">
                <p className="mb-5 font-mono text-[8px] uppercase tracking-[.2em] text-[#666963]/72">Practice</p>
                <div className="flex flex-wrap gap-2">
                  {skills.disciplines.map((item) => <span key={item} className="border border-[#666963]/16 bg-transparent px-3 py-2 text-sm text-[#343633]/72">{item}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-10 md:grid-cols-12">
              <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/62 md:col-span-3">RECOGNITION</p>
              <div className="space-y-0 md:col-span-8">
                {awards.map((award, index) => (
                  <div key={award.title} className="grid gap-4 border-t border-[#666963]/18 py-8 sm:grid-cols-[70px_1fr]">
                    <span className="font-mono text-[8px] text-[#666963]/54">0{index + 1}</span>
                    <div>
                      <p className="text-4xl font-medium tracking-[-.045em] text-[#343633]">{award.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#343633]/68">{award.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
