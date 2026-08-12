import Image from "next/image";
import Link from "next/link";
import { projects as allProjects, type Project } from "@/data/projects";
import { getProjectMedia } from "@/data/projectMedia";

type WorkGridProps = {
  limit?: number;
  projects?: Project[];
};

export default function WorkGrid({ limit, projects }: WorkGridProps) {
  const source = projects ?? allProjects;
  const items = typeof limit === "number" ? source.slice(0, limit) : source;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((project, index) => {
        const media = getProjectMedia(project.slug);
        const creative = project.portfolio === "TMU Creative Portfolio";

        return (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className={`project-link group block overflow-hidden border ${
              creative
                ? "border-black/10 bg-[#20271f] text-cream"
                : "border-black/10 bg-[#0d0b08] text-bone"
            }`}
          >
            <div className={`image-reveal relative overflow-hidden ${index % 4 === 0 ? "aspect-[5/4]" : "aspect-[4/3]"}`}>
              {media.cover ? (
                <Image
                  src={media.cover}
                  alt={`${project.title} — ${project.subtitle}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className={`object-cover ${creative ? "saturate-[.82]" : "saturate-[.72] contrast-[1.04]"}`}
                />
              ) : null}
              <div
                className={`absolute inset-0 ${
                  creative
                    ? "bg-[linear-gradient(180deg,transparent_38%,rgba(19,24,19,.72))]"
                    : "bg-[linear-gradient(180deg,transparent_35%,rgba(8,6,4,.78))]"
                }`}
              />
              <div className="absolute left-4 top-4 font-mono text-[8px] uppercase tracking-[.22em] text-white/65">
                {project.number} / {creative ? "CREATIVE" : "ARCH"}
              </div>
            </div>

            <div className="grid min-h-[180px] gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-end md:p-6">
              <div>
                <p className={`mb-3 font-mono text-[8px] uppercase tracking-[.19em] ${creative ? "text-cream/45" : "text-sand/60"}`}>
                  {project.category} · {project.year}
                </p>
                <h3
                  className={
                    creative
                      ? "font-editorial text-4xl font-normal leading-[.9] tracking-[-.035em] text-cream md:text-5xl"
                      : "text-3xl font-medium uppercase leading-[.9] tracking-[-.055em] text-bone md:text-4xl"
                  }
                >
                  {project.title}
                </h3>
                <p className={`mt-3 text-sm ${creative ? "text-cream/48" : "text-bone/42"}`}>{project.subtitle}</p>
              </div>

              <span
                className={`text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${creative ? "text-cream/70" : "text-sand"}`}
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
