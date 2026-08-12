import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { getProjectMedia } from "@/data/projectMedia";
import AtmosphericTerrain from "@/components/AtmosphericTerrain";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const media = getProjectMedia(project.slug);
  const portfolioProjects = projects.filter((item) => item.portfolio === project.portfolio);
  const currentIndex = portfolioProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];
  const portfolioQuery = project.portfolio === "Architectural Portfolio" ? "architecture" : "creative";
  const creative = portfolioQuery === "creative";

  const chapters = [
    ["01 / Context", project.context],
    ["02 / Concept", project.concept],
    ["03 / Process", project.process],
    ["04 / Result", project.result],
  ] as const;

  return (
    <main className="relative overflow-hidden bg-[#090806] text-[#cbb798]">
      <AtmosphericTerrain
        variant={creative ? "liquid" : "planetary"}
        tone="dark"
        className="fixed inset-0 opacity-48"
      />
      <div className="fixed inset-x-0 top-0 h-44 bg-gradient-to-b from-[#070706] via-[#070706]/76 to-transparent" />
      <div className="fixed inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#070706] via-[#070706]/70 to-transparent" />

      <div className="relative z-10">
        <section className="min-h-[90svh] px-5 pb-12 pt-32 md:px-10 md:pt-40 lg:px-14">
          <div className="mx-auto flex min-h-[72svh] max-w-[1600px] flex-col justify-between">
            <div className="grid gap-4 border-b border-[#a98758]/14 pb-4 font-mono text-[8px] uppercase tracking-[.22em] text-[#8f7758]/52 sm:grid-cols-3">
              <span>{project.number} / {creative ? "CREATIVE ARCHIVE" : "SITE ARCHIVE"}</span>
              <Link href={`/work?portfolio=${portfolioQuery}`} className="transition-colors hover:text-[#c1aa86] sm:text-center">← Return to {portfolioQuery}</Link>
              <span className="sm:text-right">{project.year}</span>
            </div>

            <div className="max-w-[1450px] py-16 md:py-20">
              <p className="mb-5 font-mono text-[9px] uppercase tracking-[.24em] text-[#a37d50]">{project.category} / {project.subtitle}</p>
              <h1 className="max-w-[1450px] text-[clamp(4rem,10vw,10.5rem)] font-medium uppercase leading-[.78] tracking-[-.07em] text-[#cdb896]">{project.title}</h1>
            </div>

            <div className="grid gap-8 border-t border-[#a98758]/14 pt-6 md:grid-cols-12">
              <p className="max-w-2xl text-base leading-7 text-[#a99a82]/60 md:col-span-6">{project.description}</p>
              <div className="md:col-span-3 md:col-start-10">
                <p className="font-mono text-[8px] uppercase leading-5 tracking-[.2em] text-[#846f55]/44">{creative ? "Object / gesture / memory" : "Observation / system / structure"}<br />Scroll to enter ↓</p>
              </div>
            </div>
          </div>
        </section>

        {media.cover ? (
          <section className="px-5 py-10 md:px-10 md:py-16 lg:px-14">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-4 flex justify-between font-mono text-[8px] uppercase tracking-[.2em] text-[#816d55]/42">
                <span>Primary visual / 00</span>
                <span>{project.title}</span>
              </div>
              <div className="image-reveal relative aspect-[16/9] overflow-hidden bg-[#15120f]">
                <Image src={media.cover} alt={`${project.title} — ${project.subtitle}`} fill priority sizes="100vw" className={creative ? "object-contain p-3 md:p-8" : "object-cover"} />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090806]/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090806]/62 to-transparent" />
              </div>
            </div>
          </section>
        ) : null}

        <section className="px-5 py-20 md:px-10 md:py-32 lg:px-14">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-12 grid gap-8 border-b border-[#a98758]/14 pb-7 md:grid-cols-12">
              <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#846f55]/46 md:col-span-3">Narrative / four movements</p>
              <p className="max-w-3xl text-3xl font-light leading-[1] tracking-[-.04em] text-[#b6a181]/72 md:col-span-7 md:text-5xl">{creative ? "The work unfolds through feeling, making and reflection." : "The project unfolds through context, system and resolution."}</p>
            </div>

            {chapters.map(([label, text], index) => (
              <div key={label} className="grid gap-8 border-b border-[#a98758]/12 py-12 md:grid-cols-12 md:py-16">
                <p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#a37d50] md:col-span-3">{label}</p>
                <p className="max-w-4xl text-2xl font-light leading-snug tracking-[-.03em] text-[#b6a181]/72 md:col-span-8 md:text-4xl">{text}</p>
                <span className="hidden font-mono text-[8px] text-[#806b52]/34 md:block md:text-right">0{index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {media.gallery.length > 0 ? (
          <section className="px-5 py-20 md:px-10 md:py-28 lg:px-14">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-10 flex items-end justify-between border-b border-[#a98758]/14 pb-5">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#846f55]/46">Visual archive</p>
                  <h2 className="mt-3 text-4xl font-medium uppercase tracking-[-.055em] text-[#bfa989] md:text-6xl">{creative ? "Fragments & process" : "Drawings & evidence"}</h2>
                </div>
                <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#806b52]/38">{String(media.gallery.length).padStart(2, "0")} images</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {media.gallery.map((src, index) => {
                  const wide = index % 5 === 0 || (!creative && index % 4 === 2);
                  return (
                    <figure key={src} className={wide ? "md:col-span-2" : ""}>
                      <div className={`image-reveal relative overflow-hidden bg-[#15120f] ${wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                        <Image src={src} alt={`${project.title} visual ${index + 1}`} fill sizes={wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"} className="object-contain" />
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#090806]/30 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#090806]/38 to-transparent" />
                      </div>
                      <figcaption className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[.17em] text-[#7f6b53]/38"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.title}</span></figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-[linear-gradient(180deg,rgba(9,8,6,0)_0%,rgba(7,7,6,.66)_28%,#070706_100%)] px-5 py-24 md:px-10 md:py-32 lg:px-14">
          <Link href={`/work/${nextProject.slug}`} className="group mx-auto block max-w-[1600px]">
            <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#846f55]/50">NEXT {creative ? "CREATIVE" : "ARCHITECTURAL"} PROJECT / {nextProject.number}</p>
            <div className="mt-8 flex items-end justify-between gap-8 border-t border-[#a98758]/14 pt-8">
              <h2 className="text-5xl font-medium uppercase leading-[.82] tracking-[-.06em] text-[#bca786] md:text-7xl lg:text-8xl">{nextProject.title}</h2>
              <span className="text-3xl text-[#a98758] transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">→</span>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
