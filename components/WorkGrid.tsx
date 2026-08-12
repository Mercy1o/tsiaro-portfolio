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
    <div className="grid gap-x-8 gap-y-20 md:grid-cols-2 md:gap-y-28 xl:gap-x-12">
      {items.map((project, index) => {
        const media = getProjectMedia(project.slug);
        const creative = project.portfolio === "TMU Creative Portfolio";
        const wide = index % 5 === 0;

        return (
          <Link key={project.slug} href={`/work/${project.slug}`} className={`project-link group block ${wide ? "md:col-span-2" : ""}`}>
            <div className={`image-reveal relative overflow-hidden bg-[#15120f] ${wide ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
              {media.cover ? (
                <Image
                  src={media.cover}
                  alt={`${project.title} — ${project.subtitle}`}
                  fill
                  sizes={wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  className={`object-cover transition-all duration-1000 ${creative ? "saturate-[.58] contrast-[1.08]" : "saturate-[.5] contrast-[1.12]"}`}
                />
              ) : null}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(9,8,6,.32)_82%)]" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090806]/58 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090806]/72 to-transparent" />
              <div className="absolute left-4 top-4 font-mono text-[8px] uppercase tracking-[.22em] text-[#b69a70]/62">{project.number} / {creative ? "CREATIVE" : "ARCH"}</div>
            </div>

            <div className="mt-5 grid gap-5 border-t border-[#a98758]/12 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="mb-3 font-mono text-[8px] uppercase tracking-[.19em] text-[#937a59]/54">{project.category} · {project.year}</p>
                <h3 className="text-3xl font-medium uppercase leading-[.9] tracking-[-.055em] text-[#bca786] md:text-4xl">{project.title}</h3>
                <p className="mt-3 text-sm text-[#92836e]/54">{project.subtitle}</p>
              </div>
              <span className="text-xl text-[#a98758] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">↗</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
