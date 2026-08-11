import Link from "next/link";
import { projects } from "@/data/projects";

export default function WorkGrid({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <div>
      {items.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="project-link group grid gap-5 border-b border-black/15 py-8 md:grid-cols-12 md:items-center md:py-10"
        >
          <div className="md:col-span-1">
            <span className="font-mono text-[10px] tracking-[.16em] text-black/40">{project.number}</span>
          </div>
          <div className="md:col-span-6">
            <h3 className="text-3xl font-medium tracking-[-.04em] md:text-5xl lg:text-6xl">{project.title}</h3>
            <p className="mt-1 text-sm text-black/45">{project.subtitle}</p>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-black/45">{project.category}</p>
          </div>
          <div className="flex items-center justify-between md:col-span-2 md:justify-end">
            <span className="text-xs text-black/45">{project.year}</span>
            <span className="ml-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">↗</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
