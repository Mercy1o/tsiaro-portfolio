import type { Metadata } from "next";
import PortfolioSelector from "@/components/PortfolioSelector";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Tsiaro Rakototiana's architectural portfolio and creative art portfolio as two distinct bodies of work.",
};

export default function WorkPage() {
  return (
    <main className="paper-noise min-h-screen px-5 pb-28 pt-36 text-space md:px-10 md:pt-44 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 border-b border-black/15 pb-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-black/45">
              WORK / SELECT A PORTFOLIO
            </p>
          </div>

          <div className="md:col-span-8">
            <h1 className="max-w-5xl text-5xl font-medium tracking-[-.055em] md:text-7xl lg:text-8xl">
              Two practices. One evolving way of seeing.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-black/50 md:text-lg md:leading-8">
              Enter the architectural portfolio for spatial, technical and professional work, or enter the creative portfolio for drawing, painting, ceramics, collage and making.
            </p>
          </div>
        </div>

        <PortfolioSelector />
      </div>
    </main>
  );
}
