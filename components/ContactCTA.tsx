import Link from "next/link";
import { siteConfig } from "@/data/site";
import AtmosphericTerrain from "@/components/AtmosphericTerrain";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-[#17130f] px-5 py-24 text-[#e7ddca] md:px-10 md:py-36 lg:px-14">
      <AtmosphericTerrain variant="liquid" tone="dark" showAnalysis={false} className="opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,19,15,.88)_0%,rgba(23,19,15,.58)_44%,rgba(23,19,15,.82)_100%)]" />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <div className="flex items-center justify-between border-b border-[#c8a878]/25 pb-4 font-mono text-[8px] uppercase tracking-[.22em] text-[#c8a878]/65">
          <span>CONTACT / OPEN CHANNEL</span>
          <span>TRGT / 43.6532° N</span>
        </div>

        <div className="py-20 md:py-28">
          <p className="mb-6 font-editorial text-3xl italic tracking-[-.02em] text-[#c8a878] md:text-5xl">
            The next signal starts with a conversation.
          </p>
          <h2 className="resonance-title max-w-[1450px] text-[#e7ddca]">
            Let&apos;s create<br />what comes next.
          </h2>

          <div className="mt-14 grid gap-8 border-t border-[#c8a878]/25 pt-7 md:grid-cols-12">
            <p className="max-w-md text-sm leading-6 text-[#d8cbb6]/72 md:col-span-4 md:text-base md:leading-7">
              Opportunities, collaborations, project conversations and portfolio enquiries.
            </p>

            <div className="flex flex-col items-start gap-4 md:col-span-4 md:col-start-7">
              <a
                href={`mailto:${siteConfig.email}`}
                className="border-b border-[#c8a878]/35 pb-1 text-sm text-[#e7ddca] transition-colors hover:border-[#c8a878] hover:text-[#c8a878]"
              >
                {siteConfig.email}
              </a>
              <div className="flex gap-6 font-mono text-[9px] uppercase tracking-[.17em] text-[#c8a878]/62">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#e7ddca]">LinkedIn ↗</a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-[#e7ddca]">Instagram ↗</a>
              </div>
            </div>

            <div className="md:col-span-2 md:col-start-11 md:text-right">
              <Link
                href="/contact"
                className="inline-flex border border-[#c8a878]/35 px-5 py-3 font-mono text-[9px] uppercase tracking-[.18em] text-[#d8cbb6] transition-colors hover:border-[#c8a878] hover:bg-[#c8a878]/10 hover:text-[#c8a878]"
              >
                Contact page ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
