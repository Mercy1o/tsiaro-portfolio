import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} and contact information.`,
};

export default function AboutPage() {
  return (
    <main className="page-about min-h-screen bg-white px-5 pb-24 pt-32 text-[#343633] md:px-10 md:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.55fr)] lg:gap-16">
          <section>
            <div className="flex aspect-[4/3] items-center justify-center border border-[#666963]/14 bg-[#fafafa] px-6 text-center">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#666963]/50">Portrait</p>
                <p className="mt-3 text-xl font-medium tracking-[-.04em] text-[#343633]/62">{siteConfig.name}</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-[#f3f3f1] px-3 py-2">
                <p className="text-sm font-medium tracking-[-.02em]">About Me</p>
              </div>
              <div className="mt-5 max-w-2xl space-y-5 text-[15px] leading-6 text-[#343633]/78 md:text-base md:leading-7">
                <p>{siteConfig.about.description}</p>
                <p>
                  I work between design, technical development and making, with an interest in how space, material and lived experience shape one another.
                </p>
              </div>
            </div>
          </section>

          <aside id="contact" className="space-y-12 lg:pt-0">
            <section>
              <div className="bg-[#f3f3f1] px-3 py-2">
                <p className="text-sm font-medium tracking-[-.02em]">Contact</p>
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 inline-block text-[clamp(1.7rem,3vw,3.5rem)] font-light leading-none tracking-[-.055em] transition-opacity hover:opacity-55"
              >
                {siteConfig.email}
              </a>
            </section>

            <section>
              <div className="bg-[#f3f3f1] px-3 py-2">
                <p className="text-sm font-medium tracking-[-.02em]">Social</p>
              </div>
              <div className="mt-3 flex flex-col items-start text-[clamp(1.7rem,3vw,3.5rem)] font-light leading-[1.18] tracking-[-.055em]">
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-55">
                  Instagram
                </a>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-55">
                  LinkedIn
                </a>
              </div>
            </section>

            <section>
              <div className="bg-[#f3f3f1] px-3 py-2">
                <p className="text-sm font-medium tracking-[-.02em]">Based In</p>
              </div>
              <p className="mt-3 text-[clamp(1.7rem,3vw,3.5rem)] font-light leading-none tracking-[-.055em]">{siteConfig.location}</p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
