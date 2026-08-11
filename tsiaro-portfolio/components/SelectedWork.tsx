import { selectedProjects } from "@/data/projects";

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="analog-surface relative bg-bone px-5 py-24 text-space md:px-10 md:py-36 lg:px-14"
    >
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <div className="mb-20 grid gap-8 border-b border-black/15 pb-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/45">
              WORK / 001—005
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-5">
            <h2 className="max-w-3xl text-4xl font-medium tracking-[-0.04em] md:text-6xl lg:text-7xl">
              Selected work across space, systems and making.
            </h2>
          </div>
        </div>

        <div>
          {selectedProjects.map((project) => (
            <article
              key={project.number}
              className="project-row group grid gap-5 border-b border-black/15 py-7 md:grid-cols-12 md:items-center md:py-10"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-[10px] tracking-[0.16em] text-black/40">
                  {project.number}
                </span>
              </div>

              <div className="md:col-span-6">
                <h3 className="text-3xl font-medium tracking-[-0.04em] md:text-5xl lg:text-6xl">
                  {project.title}
                </h3>

                <p className="mt-1 text-sm text-black/45">
                  {project.subtitle}
                </p>
              </div>

              <div className="md:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/45">
                  {project.category}
                </p>
              </div>

              <div className="flex justify-between md:col-span-2 md:justify-end">
                <span className="text-xs text-black/45">
                  {project.year}
                </span>

                <span className="ml-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.18em] text-black/35">
          Individual case studies will be connected in the next development phase.
        </p>
      </div>
    </section>
  );
}