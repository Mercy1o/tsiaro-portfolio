import type { Metadata } from "next";
import PortfolioSelector, { type PortfolioMode } from "@/components/PortfolioSelector";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Tsiaro Rakototiana's architectural portfolio and creative art portfolio as two connected bodies of work.",
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
    <main className="relative min-h-screen overflow-hidden bg-transparent px-5 pb-28 pt-32 text-[#343633] md:px-10 md:pt-40 lg:px-14">
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <header className="grid min-h-[62vh] gap-10 pb-14 md:grid-cols-12 md:items-end md:pb-16">
          <div className="self-start md:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[.24em] text-[#666963]/72">
              INDEX / SELECT A FIELD
            </p>
            <p className="mt-4 max-w-[15rem] font-mono text-[8px] uppercase leading-5 tracking-[.16em] text-[#666963]/58">
              Architecture and creative work remain distinct readings of the same practice.
            </p>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <h1 className="max-w-6xl text-[clamp(4rem,9vw,9.5rem)] font-medium uppercase leading-[.78] tracking-[-.07em] text-[#343633]">
              Two fields.<br />One archive.
            </h1>
            <div className="mt-8 grid gap-7 border-t border-[#666963]/18 pt-6 md:grid-cols-2">
              <p className="text-2xl font-light leading-[1] tracking-[-.035em] text-[#343633]/86 md:text-4xl">
                Measured terrain and fluid memory occupy the same landscape.
              </p>
              <p className="max-w-lg text-sm leading-6 text-[#343633]/72 md:text-base md:leading-7">
                Choose architecture for spatial, technical and professional work. Choose creative for drawing, ceramics, collage and material experimentation.
              </p>
            </div>
          </div>
        </header>

        <PortfolioSelector initialMode={initialMode} />
      </div>
    </main>
  );
}
