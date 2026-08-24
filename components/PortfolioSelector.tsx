"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import WorkGrid from "@/components/WorkGrid";
import { architecturalProjects, creativeProjects, type Project } from "@/data/projects";

export type PortfolioMode = "design" | "creative";

type PortfolioSelectorProps = { initialMode?: PortfolioMode | null };

const portfolioOptions = [
  {
    id: "design" as const,
    index: "01",
    title: "Design",
    subtitle: "Space · Systems · Technical Practice",
    description: "Architecture, construction logic, spatial sequences and technical precision.",
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<PortfolioMode | null>(initialMode);

  useEffect(() => {
    const portfolio = searchParams.get("portfolio");
    const nextMode: PortfolioMode | null =
      portfolio === "design" || portfolio === "creative" ? portfolio : null;
    setMode(nextMode);
  }, [searchParams]);

  const activeProjects: Project[] = useMemo(() => {
    if (mode === "design") return architecturalProjects;
    if (mode === "creative") return creativeProjects;
    return [];
  }, [mode]);

  function selectMode(nextMode: PortfolioMode | null) {
    setMode(nextMode);
    const nextUrl = nextMode ? `${pathname}?portfolio=${nextMode}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }

  return (
    <div>
      <section className="relative border-y border-[#737873]/16 py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          {portfolioOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => selectMode(option.id)}
              aria-pressed={mode === option.id}
              className="group border-b border-[#737873]/16 py-8 text-left last:border-b-0 md:border-b-0 md:py-10"
            >
              <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#666963]/66">
                {option.index} / {option.subtitle}
              </p>
              <h2 className={`mt-4 text-[clamp(3.2rem,6vw,6.8rem)] font-medium uppercase leading-[.82] tracking-[-.06em] transition-opacity ${mode === option.id ? "opacity-100" : "opacity-65 group-hover:opacity-100"}`}>
                {option.title}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#666963] opacity-82">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {mode ? (
        <section className="-mx-5 bg-transparent px-5 pb-12 pt-16 md:-mx-10 md:px-10 md:pt-20 lg:-mx-14 lg:px-14" aria-live="polite">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 flex items-end justify-between gap-6 border-b border-[#737873]/16 pb-6">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#666963]/66">
                  {mode === "design" ? "DESIGN / 01-04" : "CREATIVE / 01-14 + HE"}
                </p>
                <h2 className="mt-3 text-5xl font-medium uppercase tracking-[-.06em] text-[#343633] md:text-7xl">
                  {mode === "creative" ? "Creative" : "Design"}
                </h2>
              </div>
              <button type="button" onClick={() => selectMode(null)} className="font-mono text-[9px] uppercase tracking-[.17em] text-[#666963]/70 transition-opacity hover:opacity-55">
                Change field ↗
              </button>
            </div>
            <WorkGrid projects={activeProjects} />
          </div>
        </section>
      ) : (
        <div className="py-12 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#666963]/56">Select a field to reveal its projects.</p>
        </div>
      )}
    </div>
  );
}
