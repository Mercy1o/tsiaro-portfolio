import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Tsiaro Rakototiana for opportunities, collaborations and portfolio enquiries.",
};

export default function ContactPage() {
  return (
    <main className="space-field cinematic-grid min-h-screen px-5 pb-20 pt-36 text-bone md:px-10 md:pb-28 md:pt-44 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-sand">CONTACT / TRANSMISSION</p>
            <h1 className="mt-10 max-w-6xl text-[clamp(4rem,10vw,10rem)] font-medium uppercase leading-[.8] tracking-[-.07em]">
              Start a<br />conversation.
            </h1>
          </div>
          <p className="max-w-md text-base leading-7 text-bone/50 md:col-span-3 md:col-start-10">
            For opportunities, collaborations, project conversations or portfolio enquiries.
          </p>
        </div>

        <div className="grid gap-14 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <aside className="space-y-8 border-t border-white/10 pt-8 md:col-span-4 md:col-start-9 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.18em] text-bone/30">Direct email</p>
              <a href={`mailto:${siteConfig.email}`} className="mt-3 block break-all text-lg underline decoration-white/20 underline-offset-8 hover:opacity-60">
                {siteConfig.email}
              </a>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.18em] text-bone/30">Location</p>
              <p className="mt-3 text-base text-bone/60">{siteConfig.location}</p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-bone/50">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">LinkedIn ↗</a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-bone">Instagram ↗</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
