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
      {items.map((project) => {
        const media = getProjectMedia(project.slug);

        return (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group block border border-black/10 bg-white/45 p-3 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-black/[0.035]">
              {media.cover ? (
                <Image
                  src={media.cover}
                  alt={`${project.title} — ${project.subtitle}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
              ) : null}
            </div>

            <div className="grid gap-4 px-1 pb-2 pt-5 sm:grid-cols-[auto_1fr_auto] sm:items-end">
              <span className="font-mono text-[10px] tracking-[.16em] text-black/40">
                {project.number}
              </span>

              <div>
                <h3 className="text-2xl font-medium tracking-[-.035em] md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-black/45">{project.subtitle}</p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                <p className="font-mono text-[9px] uppercase tracking-[.14em] text-black/40">
                  {project.category}
                </p>
                <p className="mt-1 text-xs text-black/45">{project.year}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
