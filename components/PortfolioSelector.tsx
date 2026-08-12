"use client";

import { useMemo, useState } from "react";
import WorkGrid from "@/components/WorkGrid";
import AtmosphericTerrain from "@/components/AtmosphericTerrain";
import { architecturalProjects, creativeProjects, type Project } from "@/data/projects";

export type PortfolioMode = "architecture" | "creative";

type PortfolioSelectorProps = { initialMode?: PortfolioMode | null };

const portfolioOptions = [
  {
    id: "architecture" as const,
    index: "01",
    title: "Architecture",
    subtitle: "Space · Systems · Technical Practice",
    description: "Measured observation, construction logic, spatial sequences and technical precision.",
  },
  {
    id: "creative" as const,
    index: "02",
    title: "Creative",
    subtitle: "Drawing · Ceramics · Collage · Making",
    description: "Gesture, memory, material and hand-made experimentation read through the same archive.",
  },
];

export default function PortfolioSelector({ initialMode = null }: PortfolioSelectorProps) {
  const [mode, setMode] = useState<PortfolioMode | null>(initialMode);

  const activeProjects: Project[] = useMemo(() => {
    if (mode === "architecture") return architecturalProjects;
    if (mode === "creative") return creativeProjects;
    return [];
  }, [mode]);

  return (
    <div>
      <section className="relative min-h-[70vh] overflow-hidden border-y border-[#a98758]/14 py-16 md:py-24">
        <AtmosphericTerrain variant="hybrid" tone="dark" showAnalysis={false} className="opacity-45" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090806] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090806] to-transparent" />

        <div className="relative z-10 grid min-h-[55vh] items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <button type="button" onClick={() => setMode("architecture")} aria-pressed={mode === "architecture"} className="group py-8 text-left md:py-12">
            <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#9a805d]/60">01 / {portfolioOptions[0].subtitle}</p>
            <h2 className={`mt-5 text-[clamp(3.4rem,7vw,7.5rem)] font-medium uppercase leading-[.8] tracking-[-.065em] transition-colors duration-500 ${mode === "architecture" ? "text-[#d1bb96]" : "text-[#aa9578]/56 group-hover:text-[#c8b18e]"}`}>Architecture</h2>
            <p className="mt-6 max-w-lg text-sm leading-6 text-[#968671]/56">{portfolioOptions[0].description}</p>
          </button>

          <div className="hidden h-40 w-px bg-gradient-to-b from-transparent via-[#a98758]/24 to-transparent md:block" />

          <button type="button" onClick={() => setMode("creative")} aria-pressed={mode === "creative"} className="group py-8 text-left md:py-12 md:text-right">
            <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#9a805d]/60">02 / {portfolioOptions[1].subtitle}</p>
            <h2 className={`mt-5 text-[clamp(3.4rem,7vw,7.5rem)] font-medium uppercase leading-[.8] tracking-[-.065em] transition-colors duration-500 ${mode === "creative" ? "text-[#d1bb96]" : "text-[#aa9578]/56 group-hover:text-[#c8b18e]"}`}>Creative</h2>
            <p className="mt-6 max-w-lg text-sm leading-6 text-[#968671]/56 md:ml-auto">{portfolioOptions[1].description}</p>
          </button>
        </div>
      </section>

      {mode ? (
        <section className="-mx-5 bg-[linear-gradient(180deg,rgba(9,8,6,0)_0%,rgba(9,8,6,.72)_8%,#090806_22%,#090806_100%)] px-5 pb-12 pt-24 md:-mx-10 md:px-10 md:pt-32 lg:-mx-14 lg:px-14" aria-live="polite">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-14 grid gap-8 border-b border-[#a98758]/14 pb-8 md:grid-cols-12 md:items-end">
              <p className="font-mono text-[9px] uppercase tracking-[.22em] text-[#92795a]/54 md:col-span-3">{mode === "architecture" ? "ARCH / 01—04" : "CREATIVE / 01—14 + HE"}</p>
              <h2 className="text-5xl font-medium uppercase tracking-[-.06em] text-[#c3ae8d] md:col-span-7 md:text-7xl">{mode === "creative" ? "Creative Portfolio" : "Architectural Portfolio"}</h2>
              <button type="button" onClick={() => setMode(null)} className="justify-self-start font-mono text-[9px] uppercase tracking-[.17em] text-[#8f7758]/56 transition-colors hover:text-[#c0a984] md:justify-self-end">Change field ↗</button>
            </div>
            <WorkGrid projects={activeProjects} />
          </div>
        </section>
      ) : (
        <div className="py-12 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#7f6d57]/44">Select a field to reveal its projects.</p>
        </div>
      )}
    </div>
  );
}
