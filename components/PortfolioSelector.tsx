"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import WorkGrid from "@/components/WorkGrid";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<PortfolioMode | null>(initialMode);

  useEffect(() => {
    const portfolio = searchParams.get("portfolio");
    const nextMode: PortfolioMode | null =
      portfolio === "architecture" || portfolio === "creative" ? portfolio : null;
    setMode(nextMode);
  }, [searchParams]);

  const activeProjects: Project[] = useMemo(() => {
    if (mode === "architecture") return architecturalProjects;
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
      <section className="relative min-h-[70vh] border-y border-[#737873]/16 py-16 md:py-24">
        <div className="relative grid min-h-[55vh] items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <button type="button" onClick={() => selectMode("architecture")} aria-pressed={mode === "architecture"} className="group py-8 text-left focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#343633]/55 md:py-12">
            <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#666963]/66">01 / {portfolioOptions[0].subtitle}</p>
            <h2 className={`mt-5 text-[clamp(3.4rem,7vw,7.5rem)] font-medium uppercase leading-[.8] tracking-[-.065em] transition-opacity duration-500 ${mode === "architecture" ? "opacity-100" : "opacity-68 group-hover:opacity-100"}`}>Architecture</h2>
            <p className="mt-6 max-w-lg text-sm leading-6 text-[#666963] opacity-82">{portfolioOptions[0].description}</p>
          </button>

          <div className="hidden h-40 w-px bg-[linear-gradient(180deg,transparent,rgba(77,82,78,.22),transparent)] md:block" />

          <button type="button" onClick={() => selectMode("creative")} aria-pressed={mode === "creative"} className="group py-8 text-left focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#343633]/55 md:py-12 md:text-right">
            <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#666963]/66">02 / {portfolioOptions[1].subtitle}</p>
            <h2 className={`mt-5 text-[clamp(3.4rem,7vw,7.5rem)] font-medium uppercase leading-[.8] tracking-[-.065em] transition-opacity duration-500 ${mode === "creative" ? "opacity-100" : "opacity-68 group-hover:opacity-100"}`}>Creative</h2>
            <p className="mt-6 max-w-lg text-sm leading-6 text-[#666963] opacity-82 md:ml-auto">{portfolioOptions[1].description}</p>
          </button>
        </div>
      </section>

      {mode ? (
        <section className="-mx-5 bg-transparent px-5 pb-12 pt-24 md:-mx-10 md:px-10 md:pt-32 lg:-mx-14 lg:px-14" aria-live="polite">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-14 grid gap-8 border-b border-[#737873]/16 pb-8 md:grid-cols-12 md:items-end">
              <p className="font-mono text-[9px] uppercase tracking-[.22em] text-[#666963]/66 md:col-span-3">{mode === "architecture" ? "ARCH / 01-04" : "CREATIVE / 01-14 + HE"}</p>
              <h2 className="text-5xl font-medium uppercase tracking-[-.06em] text-[#343633] md:col-span-7 md:text-7xl">{mode === "creative" ? "Creative Portfolio" : "Architectural Portfolio"}</h2>
              <button type="button" onClick={() => selectMode(null)} className="justify-self-start font-mono text-[9px] uppercase tracking-[.17em] text-[#666963]/70 transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#343633]/55 md:justify-self-end">Change field ↗</button>
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
