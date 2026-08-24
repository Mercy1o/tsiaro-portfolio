import type { Metadata } from "next";
import PortfolioSelector, { type PortfolioMode } from "@/components/PortfolioSelector";

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
  const initialMode: PortfolioMode | null =
    portfolio === "design" || portfolio === "creative" ? portfolio : null;

  return (
    <main className="page-work relative min-h-screen overflow-hidden bg-transparent px-5 pb-28 pt-32 text-[#343633] md:px-10 md:pt-36 lg:px-14">
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <header className="grid gap-8 pb-12 md:grid-cols-12 md:items-end md:pb-16">
          <div className="md:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[.24em] text-[#666963]/72">WORK / INDEX</p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <h1 className="text-[clamp(4rem,8vw,8.5rem)] font-medium uppercase leading-[.8] tracking-[-.07em]">Work</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#343633]/70 md:text-lg">
              Two parts of the same practice. Design gathers spatial, technical and professional work. Creative gathers drawing, ceramics, collage and material experimentation.
            </p>
          </div>
        </header>

        <PortfolioSelector initialMode={initialMode} />
      </div>
    </main>
  );
}
