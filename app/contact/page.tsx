import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import AtmosphericTerrain from "@/components/AtmosphericTerrain";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Tsiaro Rakototiana for opportunities, collaborations and portfolio enquiries.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#17130f] px-5 pb-20 pt-32 text-[#e7ddca] md:px-10 md:pb-28 md:pt-40 lg:px-14">
      <AtmosphericTerrain variant="hybrid" tone="dark" className="opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,19,15,.18),rgba(23,19,15,.66)_56%,rgba(23,19,15,.9))]" />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <header className="grid gap-12 border-b border-[#c8a878]/25 pb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-9">
            <p className="font-mono text-[9px] uppercase tracking-[.24em] text-[#c8a878]/68">CONTACT / TRANSMISSION</p>
            <h1 className="resonance-title mt-10 max-w-[1450px] text-[#e7ddca]">
              Start a<br />conversation.
            </h1>
          </div>
          <div className="md:col-span-3">
            <p className="font-editorial text-3xl italic leading-[1] text-[#c8a878] md:text-4xl">Open channel for ideas, work and collaboration.</p>
            <p className="mt-6 max-w-md text-sm leading-6 text-[#d8cbb6]/72">For opportunities, collaborations, project conversations or portfolio enquiries.</p>
          </div>
        </header>

        <div className="grid gap-12 py-14 md:grid-cols-12 md:py-20">
          <div className="border border-[#c8a878]/22 bg-[#211b15]/58 p-6 backdrop-blur-xl md:col-span-7 md:p-9">
            <div className="mb-10 flex justify-between border-b border-[#c8a878]/18 pb-4 font-mono text-[8px] uppercase tracking-[.2em] text-[#c8a878]/55">
              <span>Message interface / 01</span>
              <span>Secure via local mail client</span>
            </div>
            <ContactForm />
          </div>

          <aside className="flex flex-col justify-between gap-12 border-t border-[#c8a878]/22 pt-8 md:col-span-4 md:col-start-9 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div className="space-y-10">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#c8a878]/55">Direct email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-3 block break-all font-editorial text-3xl text-[#e7ddca] underline decoration-[#c8a878]/30 underline-offset-8 transition-colors hover:text-[#c8a878]"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#c8a878]/55">Coordinates</p>
                <p className="mt-3 text-sm text-[#d8cbb6]/72">{siteConfig.location}</p>
              </div>
              <div className="flex flex-col gap-3 font-mono text-[9px] uppercase tracking-[.17em] text-[#c8a878]/62">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#e7ddca]">LinkedIn ↗</a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-[#e7ddca]">Instagram ↗</a>
              </div>
            </div>

            <div className="border-t border-[#c8a878]/18 pt-5 font-mono text-[8px] uppercase leading-5 tracking-[.2em] text-[#c8a878]/42">
              <p>System status / available</p>
              <p>Response channel / email</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
