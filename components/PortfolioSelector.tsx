"use client";

import { useMemo, useState } from "react";
import WorkGrid from "@/components/WorkGrid";
import {
  architecturalProjects,
  creativeProjects,
  type Project,
} from "@/data/projects";

export type PortfolioMode = "architecture" | "creative";

type PortfolioSelectorProps = {
  initialMode?: PortfolioMode | null;
};

const portfolioOptions: Array<{
  id: PortfolioMode;
  index: string;
  title: string;
  subtitle: string;
  description: string;
}> = [
  {
    id: "architecture",
    index: "01",
    title: "Architecture",
    subtitle: "Space · Systems · Technical Practice",
    description:
      "Architectural design, construction drawings, immersive spatial work and professional project experience.",
  },
  {
    id: "creative",
    index: "02",
    title: "Art & Creative Work",
    subtitle: "Drawing · Painting · Ceramics · Making",
    description:
      "Personal and experimental work across drawing, collage, ceramics, painting, wood and spatial making.",
  },
];

export default function PortfolioSelector({ initialMode = null }: PortfolioSelectorProps) {
  const [mode, setMode] = useState<PortfolioMode | null>(initialMode);

  const activeProjects: Project[] = useMemo(() => {
    if (mode === "architecture") return architecturalProjects;
    if (mode === "creative") return creativeProjects;
    return [];
  }, [mode]);

  const activeLabel =
    mode === "architecture" ? "Architectural Portfolio" : "Creative Portfolio";

  return (
    <div>
      <section className="grid border-b border-black/15 md:grid-cols-2">
        {portfolioOptions.map((option) => {
          const active = mode === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setMode(option.id)}
              aria-pressed={active}
              className={`group min-h-[320px] border-b border-black/15 p-7 text-left transition-colors duration-500 md:min-h-[410px] md:border-b-0 md:p-10 ${
                option.id === "architecture" ? "md:border-r md:border-black/15" : ""
              } ${active ? "bg-space text-bone" : "bg-transparent text-space hover:bg-black/[0.035]"}`}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-6">
                  <span className={`font-mono text-[10px] tracking-[.18em] ${active ? "text-bone/45" : "text-black/40"}`}>
                    {option.index} / PORTFOLIO
                  </span>
                  <span aria-hidden="true" className={`text-xl transition-transform duration-300 group-hover:translate-x-1 ${active ? "text-bone" : "text-black/55"}`}>↘</span>
                </div>

                <div className="mt-20">
                  <p className={`mb-4 font-mono text-[10px] uppercase tracking-[.16em] ${active ? "text-sand" : "text-black/40"}`}>
                    {option.subtitle}
                  </p>
                  <h2 className="max-w-xl text-5xl font-medium tracking-[-.055em] md:text-6xl lg:text-7xl">{option.title}</h2>
                  <p className={`mt-7 max-w-lg text-sm leading-6 md:text-base md:leading-7 ${active ? "text-bone/55" : "text-black/50"}`}>
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      {mode ? (
        <section className="pt-16 md:pt-24" aria-live="polite">
          <div className="mb-10 flex flex-col gap-5 border-b border-black/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-black/40">
                {mode === "architecture" ? "ARCH / 01—04" : "CREATIVE / 01—14 + HE"}
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-.04em] md:text-5xl">{activeLabel}</h2>
            </div>
            <button
              type="button"
              onClick={() => setMode(null)}
              className="self-start font-mono text-[10px] uppercase tracking-[.16em] text-black/45 transition-colors hover:text-black sm:self-auto"
            >
              Change portfolio ↗
            </button>
          </div>

          <WorkGrid projects={activeProjects} />
        </section>
      ) : (
        <div className="flex min-h-[180px] items-center justify-center border-b border-black/15 px-6 py-14 text-center">
          <p className="max-w-lg font-mono text-[10px] uppercase leading-6 tracking-[.18em] text-black/35">
            Choose a portfolio above to enter the work.
          </p>
        </div>
      )}
    </div>
  );
}
