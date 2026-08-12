import type { Metadata } from "next";
import PortfolioSelector, { type PortfolioMode } from "@/components/PortfolioSelector";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Tsiaro Rakototiana's architectural portfolio and creative art portfolio as two distinct bodies of work.",
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ portfolio?: string }>;
}) {
  const { portfolio } = await searchParams;
  const initialMode: PortfolioMode | null =
    portfolio === "architecture" || portfolio === "creative" ? portfolio : null;

  return (
    <main className="archive-paper min-h-screen px-5 pb-28 pt-32 md:px-10 md:pt-40 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <header className="grid min-h-[54vh] gap-10 border-b border-black/15 pb-14 md:grid-cols-12 md:items-end md:pb-16">
          <div className="self-start md:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[.24em] text-black/42">
              INDEX / SELECT A FIELD
            </p>
            <p className="mt-4 max-w-[15rem] font-mono text-[8px] uppercase leading-5 tracking-[.16em] text-black/28">
              Architecture and creative practice are related, but they do not need to look identical.
            </p>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <h1 className="resonance-title max-w-6xl text-[#16130f]">
              Two practices.<br />One evolving vision.
            </h1>
            <div className="mt-8 grid gap-7 border-t border-black/15 pt-6 md:grid-cols-2">
              <p className="font-editorial text-3xl leading-[1] tracking-[-.03em] text-black/72 md:text-4xl">
                Measured terrain on one side. Gesture and memory on the other.
              </p>
              <p className="max-w-lg text-sm leading-6 text-black/52 md:text-base md:leading-7">
                Enter architecture for spatial, technical and professional work. Enter the creative archive for drawing, painting, ceramics, collage and making.
              </p>
            </div>
          </div>
        </header>

        <PortfolioSelector initialMode={initialMode} />
      </div>
    </main>
  );
}
