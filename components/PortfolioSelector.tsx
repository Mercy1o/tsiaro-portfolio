"use client";

import { useMemo, useState } from "react";
import WorkGrid from "@/components/WorkGrid";
import TopographicField from "@/components/TopographicField";
import BrushField from "@/components/BrushField";
import {
  architecturalProjects,
  creativeProjects,
  type Project,
} from "@/data/projects";

export type PortfolioMode = "architecture" | "creative";

type PortfolioSelectorProps = {
  initialMode?: PortfolioMode | null;
};

const portfolioOptions = [
  {
    id: "architecture" as const,
    index: "01",
    title: "Architecture",
    subtitle: "Space · Systems · Technical Practice",
    description:
      "Measured observation, construction logic, spatial sequences and technical precision.",
  },
  {
    id: "creative" as const,
    index: "02",
    title: "Art & Creative Work",
    subtitle: "Drawing · Painting · Ceramics · Making",
    description:
      "A more tactile archive of gesture, memory, material, colour and hand-made experimentation.",
  },
];

export default function PortfolioSelector({ initialMode = null }: PortfolioSelectorProps) {
  const [mode, setMode] = useState<PortfolioMode | null>(initialMode);

  const activeProjects: Project[] = useMemo(() => {
    if (mode === "architecture") return architecturalProjects;
    if (mode === "creative") return creativeProjects;
    return [];
  }, [mode]);

  const creativeMode = mode === "creative";

  return (
    <div>
      <section className="grid overflow-hidden border-x border-b border-black/15 lg:grid-cols-2">
        {portfolioOptions.map((option) => {
          const active = mode === option.id;
          const creative = option.id === "creative";

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setMode(option.id)}
              aria-pressed={active}
              className={`group relative min-h-[390px] overflow-hidden p-7 text-left transition-all duration-500 md:min-h-[480px] md:p-10 lg:min-h-[560px] ${
                option.id === "architecture" ? "border-b border-black/15 lg:border-b-0 lg:border-r" : ""
              } ${
                creative
                  ? "bg-[#1c241e] text-cream"
                  : "bg-[#0c0a07] text-bone"
              } ${active ? "ring-1 ring-inset ring-sand/60" : ""}`}
            >
              {creative ? <BrushField className="opacity-80" dense={false} /> : <TopographicField className="opacity-85" />}
              <div className={`absolute inset-0 ${creative ? "bg-black/20" : "bg-[linear-gradient(180deg,rgba(0,0,0,.03),rgba(0,0,0,.55))]"}`} />

              <div className="relative z-10 flex h-full min-h-[330px] flex-col justify-between md:min-h-[400px] lg:min-h-[480px]">
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-[9px] uppercase tracking-[.22em] text-current opacity-48">
                    {option.index} / PORTFOLIO
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[.2em] opacity-40">
                    {active ? "ACTIVE" : "ENTER"}
                  </span>
                </div>

                <div className={creative ? "mx-auto max-w-xl text-center" : "max-w-2xl"}>
                  <p className={`mb-5 font-mono text-[9px] uppercase tracking-[.21em] ${creative ? "text-rust" : "text-sand"}`}>
                    {option.subtitle}
                  </p>
                  <h2 className={
                    creative
                      ? "font-editorial text-[clamp(4rem,8vw,8rem)] font-normal leading-[.75] tracking-[-.05em]"
                      : "text-[clamp(3.8rem,7vw,7.5rem)] font-medium uppercase leading-[.82] tracking-[-.065em]"
                  }>
                    {option.title}
                  </h2>
                  <p className="mt-7 max-w-lg text-sm leading-6 text-current opacity-55 md:text-base md:leading-7">
                    {option.description}
                  </p>
                </div>

                <div className="flex items-end justify-between border-t border-current/15 pt-5 font-mono text-[8px] uppercase tracking-[.19em] opacity-50">
                  <span>{creative ? "Gesture / material / memory" : "Terrain / system / sequence"}</span>
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↘</span>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      {mode ? (
        <section className={`-mx-5 px-5 py-20 md:-mx-10 md:px-10 md:py-28 lg:-mx-14 lg:px-14 ${creativeMode ? "bg-[#d8d1c4]" : "bg-[#e9e2d6]"}`} aria-live="polite">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-12 grid gap-8 border-b border-black/15 pb-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-3">
                <p className="font-mono text-[9px] uppercase tracking-[.22em] text-black/42">
                  {mode === "architecture" ? "ARCH / 01—04" : "CREATIVE / 01—14 + HE"}
                </p>
              </div>
              <div className="md:col-span-7">
                <h2 className={creativeMode ? "font-editorial text-5xl font-normal tracking-[-.04em] text-black md:text-7xl" : "text-5xl font-medium uppercase tracking-[-.06em] text-black md:text-7xl"}>
                  {creativeMode ? "Creative Portfolio" : "Architectural Portfolio"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setMode(null)}
                className="justify-self-start font-mono text-[9px] uppercase tracking-[.17em] text-black/45 transition-colors hover:text-black md:justify-self-end"
              >
                Change field ↗
              </button>
            </div>

            <WorkGrid projects={activeProjects} />
          </div>
        </section>
      ) : (
        <div className="border-x border-b border-black/15 px-6 py-12 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[.2em] text-black/38">
            Select a field above. Each one opens with its own visual language.
          </p>
        </div>
      )}
    </div>
  );
}
