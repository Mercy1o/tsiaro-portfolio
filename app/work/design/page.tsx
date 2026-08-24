import type { Metadata } from "next";
import Link from "next/link";
import WorkGrid from "@/components/WorkGrid";
import { architecturalProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Design",
  description: "Design, architecture, technical and professional work by Tsiaro Rakototiana.",
};

export default function DesignWorkPage() {
  return (
    <main className="page-work min-h-screen bg-white px-5 pb-28 pt-32 text-[#343633] md:px-10 md:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-12 border-b border-[#737873]/16 pb-8 md:mb-16 md:pb-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="accent-brown font-mono text-[9px] uppercase tracking-[.22em]">WORK / 01</p>
              <h1 className="mt-4 text-[clamp(4.5rem,10vw,10rem)] font-medium uppercase leading-[.78] tracking-[-.07em]">Design</h1>
            </div>
            <Link href="/work" className="font-mono text-[9px] uppercase tracking-[.18em] text-[#666963]/68 transition-opacity hover:opacity-50">← All work</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-12 md:items-end">
            <p className="max-w-2xl text-xl font-light leading-[1.05] tracking-[-.03em] md:col-span-7 md:text-3xl">
              Spatial design, technical development and professional practice.
            </p>
            <Link href="/work/creative" className="accent-rust font-mono text-[9px] uppercase tracking-[.18em] transition-opacity hover:opacity-50 md:col-span-3 md:col-start-10 md:text-right">Creative →</Link>
          </div>
        </header>

        <WorkGrid projects={architecturalProjects} />
      </div>
    </main>
  );
}
