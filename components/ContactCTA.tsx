import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function ContactCTA() {
  return (
    <section className="chroma-field relative px-5 py-24 text-white md:px-10 md:py-36 lg:px-14">
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <div className="flex items-center justify-between border-b border-white/20 pb-4 font-mono text-[8px] uppercase tracking-[.22em] text-white/55">
          <span>CONTACT / OPEN CHANNEL</span>
          <span>TRGT / 43.6532° N</span>
        </div>

        <div className="py-20 md:py-28">
          <p className="mb-6 font-editorial text-3xl italic tracking-[-.02em] text-cream/88 md:text-5xl">The next signal starts with a conversation.</p>
          <h2 className="resonance-title max-w-[1450px] text-white">
            Let&apos;s create<br />what comes next.
          </h2>

          <div className="mt-14 grid gap-8 border-t border-white/20 pt-7 md:grid-cols-12">
            <p className="max-w-md text-sm leading-6 text-white/62 md:col-span-4 md:text-base md:leading-7">
              Opportunities, collaborations, project conversations and portfolio enquiries.
            </p>
            <div className="flex flex-col items-start gap-4 md:col-span-4 md:col-start-7">
              <a href={`mailto:${siteConfig.email}`} className="border-b border-white/30 pb-1 text-sm text-white transition-colors hover:border-white">{siteConfig.email}</a>
              <div className="flex gap-6 font-mono text-[9px] uppercase tracking-[.17em] text-white/55">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn ↗</a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram ↗</a>
              </div>
            </div>
            <div className="md:col-span-2 md:col-start-11 md:text-right">
              <Link href="/contact" className="inline-flex border border-white/30 px-5 py-3 font-mono text-[9px] uppercase tracking-[.18em] transition-colors hover:bg-white hover:text-indigo">
                Contact page ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
