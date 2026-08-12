import Image from "next/image";
import Link from "next/link";
import { architecturalProjects, creativeProjects } from "@/data/projects";
import { getProjectMedia } from "@/data/projectMedia";

const portals = [
  {
    id: "architecture",
    index: "01",
    label: "Architecture",
    kicker: "Space · Systems · Technical Practice",
    description:
      "Student housing, technical construction drawings, immersive spatial work and professional coordination.",
    count: architecturalProjects.length,
    cover: getProjectMedia("hikari").cover,
    href: "/work?portfolio=architecture",
  },
  {
    id: "creative",
    index: "02",
    label: "Art & Creative Work",
    kicker: "Drawing · Painting · Ceramics · Making",
    description:
      "Personal work across drawing, collage, ceramics, painting, woodwork and experimental spatial making.",
    count: creativeProjects.length,
    cover: getProjectMedia("the-smiling-wound").cover,
    href: "/work?portfolio=creative",
  },
] as const;

export default function PortfolioGateway() {
  return (
    <section className="paper-noise px-5 py-24 text-space md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 grid gap-8 border-b border-black/15 pb-8 md:grid-cols-12 md:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-black/45 md:col-span-3">
            WORK / TWO PRACTICES
          </p>
          <div className="md:col-span-7 md:col-start-5">
            <h2 className="text-4xl font-medium tracking-[-.045em] md:text-6xl lg:text-7xl">
              Choose how you want to enter the work.
            </h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {portals.map((portal) => (
            <Link
              key={portal.id}
              href={portal.href}
              className="group border border-black/10 bg-white/45 p-3"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-black/[.04]">
                <Image
                  src={portal.cover}
                  alt={`${portal.label} portfolio`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 text-white md:p-7">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[.18em] text-white/60">
                      {portal.index} / {portal.count} projects
                    </p>
                    <h3 className="mt-2 text-3xl font-medium tracking-[-.04em] md:text-5xl">
                      {portal.label}
                    </h3>
                  </div>
                  <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>

              <div className="grid gap-3 px-2 py-5 md:grid-cols-2">
                <p className="font-mono text-[9px] uppercase tracking-[.16em] text-black/45">
                  {portal.kicker}
                </p>
                <p className="text-sm leading-6 text-black/55">{portal.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
