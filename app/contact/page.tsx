import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import TopographicField from "@/components/TopographicField";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Tsiaro Rakototiana for opportunities, collaborations and portfolio enquiries.",
};

export default function ContactPage() {
  return (
    <main className="chroma-field relative min-h-screen overflow-hidden px-5 pb-20 pt-32 text-white md:px-10 md:pb-28 md:pt-40 lg:px-14">
      <TopographicField className="opacity-20 mix-blend-screen" warm={false} />
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <header className="grid gap-12 border-b border-white/20 pb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-9">
            <p className="font-mono text-[9px] uppercase tracking-[.24em] text-white/62">CONTACT / TRANSMISSION</p>
            <h1 className="resonance-title mt-10 max-w-[1450px] text-white">
              Start a<br />conversation.
            </h1>
          </div>
          <div className="md:col-span-3">
            <p className="font-editorial text-3xl italic leading-[1] text-cream md:text-4xl">Open channel for ideas, work and collaboration.</p>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/62">For opportunities, collaborations, project conversations or portfolio enquiries.</p>
          </div>
        </header>

        <div className="grid gap-12 py-14 md:grid-cols-12 md:py-20">
          <div className="border border-white/20 bg-black/20 p-6 backdrop-blur-xl md:col-span-7 md:p-9">
            <div className="mb-10 flex justify-between border-b border-white/15 pb-4 font-mono text-[8px] uppercase tracking-[.2em] text-white/45">
              <span>Message interface / 01</span>
              <span>Secure via local mail client</span>
            </div>
            <ContactForm />
          </div>

          <aside className="flex flex-col justify-between gap-12 border-t border-white/20 pt-8 md:col-span-4 md:col-start-9 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div className="space-y-10">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.2em] text-white/42">Direct email</p>
                <a href={`mailto:${siteConfig.email}`} className="mt-3 block break-all font-editorial text-3xl text-cream underline decoration-white/25 underline-offset-8 transition-opacity hover:opacity-65">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.2em] text-white/42">Coordinates</p>
                <p className="mt-3 text-sm text-white/66">{siteConfig.location}</p>
              </div>
              <div className="flex flex-col gap-3 font-mono text-[9px] uppercase tracking-[.17em] text-white/55">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn ↗</a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram ↗</a>
              </div>
            </div>

            <div className="border-t border-white/15 pt-5 font-mono text-[8px] uppercase leading-5 tracking-[.2em] text-white/32">
              <p>System status / available</p>
              <p>Response channel / email</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
