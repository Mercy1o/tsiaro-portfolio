import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="space-field cinematic-grid min-h-screen px-5 pb-16 pt-36 text-bone md:px-10 md:pt-44 lg:px-14">
      <div className="mx-auto flex min-h-[75vh] max-w-[1600px] flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-sand">CONTACT / TRANSMISSION</p>
          <h1 className="mt-10 max-w-6xl text-[clamp(4rem,10vw,10rem)] font-medium uppercase leading-[.8] tracking-[-.07em]">Start a<br />conversation.</h1>
        </div>

        <div className="grid gap-10 border-t border-white/10 py-10 md:grid-cols-12">
          <div className="md:col-span-5"><p className="max-w-md text-base leading-7 text-bone/50">For opportunities, collaborations, project conversations or portfolio enquiries.</p></div>
          <div className="space-y-4 md:col-span-5 md:col-start-8">
            <a href={`mailto:${siteConfig.email}`} className="block text-xl underline decoration-white/20 underline-offset-8 hover:opacity-60">{siteConfig.email}</a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="block text-sm text-bone/50 hover:text-bone">LinkedIn ↗</a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="block text-sm text-bone/50 hover:text-bone">Instagram ↗</a>
          </div>
        </div>
      </div>
    </main>
  );
}
