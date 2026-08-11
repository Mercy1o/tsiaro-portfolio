import Hero from "@/components/Hero";
import WorkGrid from "@/components/WorkGrid";
import AboutPreview from "@/components/AboutPreview";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="paper-noise px-5 py-24 text-space md:px-10 md:py-36 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-20 grid gap-8 border-b border-black/15 pb-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-black/45">SELECTED WORK / 001—006</p>
            </div>
            <div className="md:col-span-7 md:col-start-5">
              <h2 className="max-w-4xl text-4xl font-medium tracking-[-.04em] md:text-6xl lg:text-7xl">
                Space, systems, objects and visual experiments.
              </h2>
            </div>
          </div>
          <WorkGrid limit={6} />
        </div>
      </section>

      <AboutPreview />
      <ContactCTA />
    </main>
  );
}
