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
    <main className="relative min-h-screen overflow-hidden bg-[#090806] px-5 pb-20 pt-32 text-[#cbb798] md:px-10 md:pb-28 md:pt-40 lg:px-14">
      <AtmosphericTerrain variant="liquid" tone="dark" className="fixed inset-0 opacity-55" />
      <div className="fixed inset-x-0 top-0 h-44 bg-gradient-to-b from-[#070706] via-[#070706]/76 to-transparent" />
      <div className="fixed inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#070706] via-[#070706]/72 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <header className="grid min-h-[58vh] gap-12 border-b border-[#a98758]/14 pb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-9">
            <p className="font-mono text-[9px] uppercase tracking-[.24em] text-[#987d59]/58">CONTACT / TRANSMISSION</p>
            <h1 className="mt-10 max-w-[1450px] text-[clamp(4rem,9vw,9.5rem)] font-medium uppercase leading-[.78] tracking-[-.07em] text-[#cdb896]">Start a<br />conversation.</h1>
          </div>
          <div className="md:col-span-3">
            <p className="text-2xl font-light leading-[1] tracking-[-.035em] text-[#b39d7b] md:text-3xl">Open channel for ideas, work and collaboration.</p>
            <p className="mt-6 max-w-md text-sm leading-6 text-[#978872]/58">For opportunities, collaborations, project conversations or portfolio enquiries.</p>
          </div>
        </header>

        <div className="grid gap-14 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <div className="mb-10 flex justify-between border-b border-[#a98758]/14 pb-4 font-mono text-[8px] uppercase tracking-[.2em] text-[#8e7657]/48">
              <span>Message interface / 01</span>
              <span>Local mail client</span>
            </div>
            <ContactForm />
          </div>

          <aside className="flex flex-col justify-between gap-12 border-t border-[#a98758]/14 pt-8 md:col-span-4 md:col-start-9 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div className="space-y-10">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#8e7657]/48">Direct email</p>
                <a href={`mailto:${siteConfig.email}`} className="mt-3 block break-all text-2xl font-medium tracking-[-.03em] text-[#bca786] transition-colors hover:text-[#cfb58d] md:text-3xl">{siteConfig.email}</a>
              </div>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#8e7657]/48">Coordinates</p>
                <p className="mt-3 text-sm text-[#958671]/58">{siteConfig.location}</p>
              </div>
              <div className="flex flex-col gap-3 font-mono text-[9px] uppercase tracking-[.17em] text-[#937857]/56">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#c3ad89]">LinkedIn ↗</a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-[#c3ad89]">Instagram ↗</a>
              </div>
            </div>

            <div className="border-t border-[#a98758]/14 pt-5 font-mono text-[8px] uppercase leading-5 tracking-[.2em] text-[#7e694f]/42">
              <p>System status / available</p>
              <p>Response channel / email</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
