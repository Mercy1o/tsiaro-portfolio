import { siteConfig } from "@/data/site";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-deep px-5 pb-8 pt-28 text-bone md:px-10 md:pt-40 lg:px-14"
    >
      <div className="pointer-events-none absolute -right-[10%] top-0 h-[520px] w-[520px] rounded-full border border-white/[0.06]" />

      <div className="mx-auto max-w-[1600px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sand">
          CONTACT / TRANSMISSION
        </p>

        <div className="mt-12 border-b border-white/10 pb-24">
          <h2 className="max-w-6xl text-[clamp(3.5rem,9vw,9rem)] font-medium uppercase leading-[0.82] tracking-[-0.065em]">
            Let&apos;s create
            <br />
            what comes next.
          </h2>

          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm underline decoration-white/25 underline-offset-8 transition-opacity hover:opacity-55"
            >
              {siteConfig.email}
            </a>

            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-bone/50 transition-colors hover:text-bone"
            >
              LinkedIn ↗
            </a>

            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-bone/50 transition-colors hover:text-bone"
            >
              Instagram ↗
            </a>
          </div>
        </div>

        <footer className="flex flex-col gap-4 py-7 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/30 sm:flex-row sm:justify-between">
          <span>Tsiaro Rakototiana</span>

          <span>Toronto / 2026</span>

          <span>Architecture · Technology · Making</span>
        </footer>
      </div>
    </section>
  );
}