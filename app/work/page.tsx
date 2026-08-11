import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <main className="paper-noise min-h-screen px-5 pb-28 pt-36 text-space md:px-10 md:pt-44 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 border-b border-black/15 pb-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-black/45">WORK / INDEX</p>
          </div>
          <div className="md:col-span-8">
            <h1 className="max-w-5xl text-5xl font-medium tracking-[-.055em] md:text-7xl lg:text-8xl">Selected work across architecture, systems and making.</h1>
          </div>
        </div>
        <WorkGrid />
      </div>
    </main>
  );
}
