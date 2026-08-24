import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discovery",
  description: "An observation archive of buildings, exhibitions, objects and design references documented by Tsiaro Rakototiana.",
};

const discoverySlots = [
  "Building",
  "Interior",
  "Exhibition",
  "Object",
  "Detail",
  "Material",
  "Place",
  "Reference",
];

export default function DiscoveryPage() {
  return (
    <main className="min-h-screen bg-white px-5 pb-24 pt-32 text-[#343633] md:px-10 md:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <header className="grid gap-8 border-b border-[#666963]/16 pb-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[.22em] text-[#666963]/62">DISCOVERY / FIELD NOTES</p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <h1 className="text-[clamp(4rem,8vw,8.5rem)] font-medium uppercase leading-[.8] tracking-[-.07em]">Discovery</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#343633]/70 md:text-lg">
              A personal observation archive for buildings, exhibitions, objects, materials and work by others that I document and reinterpret through my own lens.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-x-4 gap-y-8 py-12 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
          {discoverySlots.map((label, index) => (
            <article key={label} className="group">
              <div className="flex aspect-[3/4] items-center justify-center border border-[#666963]/14 bg-[#fafafa] px-4 text-center transition-colors group-hover:bg-white">
                <p className="text-[clamp(1.35rem,2.3vw,2.6rem)] font-medium uppercase leading-[.9] tracking-[-.05em] text-[#343633]/72">{label}</p>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[.16em] text-[#666963]/58">
                <span>0{index + 1}</span>
                <span>To document</span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
