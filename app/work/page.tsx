import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Work",
  description: "Design and creative work by Tsiaro Rakototiana.",
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ portfolio?: string }>;
}) {
  const { portfolio } = await searchParams;

  if (portfolio === "design") redirect("/work/design");
  if (portfolio === "creative") redirect("/work/creative");

  return (
    <main className="page-work min-h-screen bg-white px-5 pb-28 pt-32 text-[#343633] md:px-10 md:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <header className="grid gap-8 border-b border-[#737873]/16 pb-12 md:grid-cols-12 md:items-end md:pb-16">
          <div className="md:col-span-3">
            <p className="accent-brown font-mono text-[9px] uppercase tracking-[.24em]">WORK / INDEX</p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <h1 className="text-[clamp(4rem,8vw,8.5rem)] font-medium uppercase leading-[.8] tracking-[-.07em]">Work</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#343633]/70 md:text-lg">
              Two distinct collections. Enter Design for spatial, technical and professional work, or Creative for drawing, ceramics, collage and material experimentation.
            </p>
          </div>
        </header>

        <section className="grid md:grid-cols-2">
          <Link
            href="/work/design"
            className="group border-b border-[#737873]/16 py-14 md:border-b-0 md:border-r md:py-20 md:pr-10"
          >
            <p className="accent-brown font-mono text-[8px] uppercase tracking-[.2em]">01 / Space · Systems · Technical Practice</p>
            <h2 className="mt-5 text-[clamp(4rem,8vw,8rem)] font-medium uppercase leading-[.8] tracking-[-.065em] transition-opacity group-hover:opacity-55">Design</h2>
            <p className="mt-6 max-w-lg text-sm leading-6 text-[#343633]/68 md:text-base">
              Architecture, construction logic, spatial sequences and professional practice.
            </p>
            <p className="accent-brown mt-12 font-mono text-[9px] uppercase tracking-[.18em]">Enter Design →</p>
          </Link>

          <Link
            href="/work/creative"
            className="group py-14 md:py-20 md:pl-10"
          >
            <p className="accent-rust font-mono text-[8px] uppercase tracking-[.2em]">02 / Drawing · Ceramics · Collage · Making</p>
            <h2 className="mt-5 text-[clamp(4rem,8vw,8rem)] font-medium uppercase leading-[.8] tracking-[-.065em] transition-opacity group-hover:opacity-55">Creative</h2>
            <p className="mt-6 max-w-lg text-sm leading-6 text-[#343633]/68 md:text-base">
              Gesture, memory, material and hand-made experimentation.
            </p>
            <p className="accent-rust mt-12 font-mono text-[9px] uppercase tracking-[.18em]">Enter Creative →</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
