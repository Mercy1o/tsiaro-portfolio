import { siteConfig } from "@/data/site";

export default function AboutPreview() {
  return (
    <section
      id="about"
      className="relative bg-space px-5 py-24 text-bone md:px-10 md:py-36 lg:px-14"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sand">
              {siteConfig.about.eyebrow}
            </p>
          </div>

          <div className="md:col-span-8">
            <h2 className="max-w-5xl text-4xl font-medium tracking-[-0.04em] md:text-6xl lg:text-7xl">
              {siteConfig.about.title}
            </h2>

            <p className="mt-10 max-w-2xl text-base leading-7 text-bone/55 md:text-lg md:leading-8">
              {siteConfig.about.description}
            </p>
          </div>
        </div>

        <div className="mt-24 grid border-t border-white/10 md:grid-cols-3">
          {siteConfig.profileFacts.map((fact, index) => (
            <div
              key={fact.label}
              className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/30">
                0{index + 1} / {fact.label}
              </p>

              <p className="mt-7 text-xl tracking-[-0.02em]">
                {fact.value}
              </p>

              <p className="mt-2 text-sm text-bone/40">
                {fact.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}