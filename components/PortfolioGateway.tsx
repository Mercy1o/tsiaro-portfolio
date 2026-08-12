import Image from "next/image";
import Link from "next/link";
import { architecturalProjects, creativeProjects } from "@/data/projects";
import { getProjectMedia } from "@/data/projectMedia";
import TopographicField from "@/components/TopographicField";
import BrushField from "@/components/BrushField";

export default function PortfolioGateway() {
  const architectureCover = getProjectMedia("hikari").cover;
  const creativeCover = getProjectMedia("the-smiling-wound").cover;

  return (
    <section className="archive-paper px-5 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 grid gap-8 border-b border-black/15 pb-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[.24em] text-black/42">INDEX / TWO PRACTICES</p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <h2 className="max-w-5xl text-4xl font-medium tracking-[-.055em] md:text-6xl lg:text-7xl">
              The visual language changes with the work.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-black/52 md:text-base md:leading-7">
              Architecture is treated as terrain, systems and measured observation. Creative work becomes more tactile, painterly and emotional.
            </p>
          </div>
        </div>

        <div className="grid overflow-hidden border border-black/15 lg:grid-cols-2">
          <Link
            href="/work?portfolio=architecture"
            className="group relative min-h-[560px] overflow-hidden bg-[#0b0907] text-bone lg:min-h-[720px]"
          >
            <Image
              src={architectureCover}
              alt="Architectural portfolio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-18 grayscale transition-all duration-1000 group-hover:scale-[1.03] group-hover:opacity-26"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,.2),rgba(5,4,3,.88))]" />
            <TopographicField className="opacity-80" />

            <div className="relative z-10 flex min-h-[560px] flex-col justify-between p-7 lg:min-h-[720px] lg:p-10">
              <div className="flex justify-between font-mono text-[9px] uppercase tracking-[.22em] text-bone/45">
                <span>01 / FIELD</span>
                <span>{architecturalProjects.length} PROJECTS</span>
              </div>

              <div className="max-w-2xl">
                <p className="mb-4 font-mono text-[9px] uppercase tracking-[.22em] text-sand">Space · systems · technical practice</p>
                <h3 className="text-[clamp(3.8rem,7vw,7.8rem)] font-medium uppercase leading-[.82] tracking-[-.065em]">Architecture</h3>
                <p className="mt-7 max-w-lg text-sm leading-6 text-bone/55 md:text-base md:leading-7">
                  Spatial design, construction logic, drawings, details and professional project experience.
                </p>
              </div>

              <div className="flex items-end justify-between border-t border-white/12 pt-5 font-mono text-[9px] uppercase tracking-[.2em] text-bone/42">
                <span>Topography / archive / sequence</span>
                <span className="text-lg text-bone transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </div>
            </div>
          </Link>

          <Link
            href="/work?portfolio=creative"
            className="group relative min-h-[560px] overflow-hidden bg-forest text-cream lg:min-h-[720px]"
          >
            <Image
              src={creativeCover}
              alt="Creative portfolio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-28 saturate-[.7] transition-all duration-1000 group-hover:scale-[1.035] group-hover:opacity-36"
            />
            <BrushField className="opacity-85" dense />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,17,12,.08),rgba(13,14,11,.72)_78%)]" />

            <div className="relative z-10 flex min-h-[560px] flex-col justify-between p-7 lg:min-h-[720px] lg:p-10">
              <div className="flex justify-between font-mono text-[9px] uppercase tracking-[.22em] text-cream/55">
                <span>02 / FIELD</span>
                <span>{creativeProjects.length} WORKS</span>
              </div>

              <div className="mx-auto max-w-xl text-center">
                <p className="mb-5 font-mono text-[9px] uppercase tracking-[.22em] text-rust">Drawing · painting · ceramics · making</p>
                <h3 className="font-editorial text-[clamp(4rem,8vw,8.8rem)] font-normal leading-[.72] tracking-[-.055em] text-cream">
                  Art &<br />Creative Work
                </h3>
                <p className="mx-auto mt-8 max-w-md text-sm leading-6 text-cream/62 md:text-base md:leading-7">
                  Personal work driven by memory, material, drawing, hand-making and visual experimentation.
                </p>
              </div>

              <div className="flex items-end justify-between border-t border-cream/15 pt-5 font-mono text-[9px] uppercase tracking-[.2em] text-cream/48">
                <span>Gesture / object / memory</span>
                <span className="text-lg text-cream transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
