import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { getProjectMedia } from "@/data/projectMedia";
import TopographicField from "@/components/TopographicField";
import BrushField from "@/components/BrushField";

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
    <main className={creative ? "bg-[#151a16] text-cream" : "bg-space text-bone"}>
      <section className={`relative min-h-[88svh] overflow-hidden px-5 pb-12 pt-32 md:px-10 md:pt-40 lg:px-14 ${creative ? "creative-atmosphere" : "architecture-atmosphere cinematic-grid"}`}>
        {creative ? <BrushField className="opacity-70" dense={false} /> : <TopographicField className="opacity-90" />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(4,4,4,.62)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-between">
          <div className="grid gap-4 border-b border-current/15 pb-4 font-mono text-[8px] uppercase tracking-[.22em] text-current opacity-55 sm:grid-cols-3">
            <span>{project.number} / {creative ? "CREATIVE ARCHIVE" : "SITE ARCHIVE"}</span>
            <Link href={`/work?portfolio=${portfolioQuery}`} className="transition-opacity hover:opacity-100 sm:text-center">
              ← Return to {portfolioQuery}
            </Link>
            <span className="sm:text-right">{project.year}</span>
          </div>

          <div className={`py-16 md:py-20 ${creative ? "mx-auto max-w-6xl text-center" : "max-w-[1450px]"}`}>
            <p className={`mb-5 font-mono text-[9px] uppercase tracking-[.24em] ${creative ? "text-rust" : "text-sand"}`}>
              {project.category} / {project.subtitle}
            </p>
            <h1 className={creative ? "editorial-title text-cream" : "display-title text-bone"}>
              {project.title}
            </h1>
          </div>

          <div className="grid gap-8 border-t border-current/15 pt-6 md:grid-cols-12">
            <p className={`max-w-2xl text-base leading-7 md:col-span-6 ${creative ? "text-cream/62" : "text-bone/55"}`}>
              {project.description}
            </p>
            <div className="md:col-span-3 md:col-start-10">
              <p className="font-mono text-[8px] uppercase leading-5 tracking-[.2em] text-current opacity-38">
                {creative ? "Object / gesture / memory" : "Observation / system / structure"}<br />Scroll to enter ↓
              </p>
            </div>
          </div>
        </div>
      </section>

      {media.cover ? (
        <section className={creative ? "archive-paper px-5 py-16 md:px-10 md:py-24 lg:px-14" : "bg-[#080705] px-5 py-8 md:px-10 md:py-12 lg:px-14"}>
          <div className="mx-auto max-w-[1600px]">
            <div className={`mb-4 flex justify-between font-mono text-[8px] uppercase tracking-[.2em] ${creative ? "text-black/38" : "text-bone/28"}`}>
              <span>Primary visual / 00</span>
              <span>{project.title}</span>
            </div>
            <div className={`image-reveal relative overflow-hidden ${creative ? "mx-auto aspect-[4/3] max-w-[1180px] bg-[#d9d2c7]" : "aspect-[16/9] bg-graphite"}`}>
              <Image
                src={media.cover}
                alt={`${project.title} — ${project.subtitle}`}
                fill
                priority
                sizes="100vw"
                className={creative ? "object-contain p-2 md:p-6" : "object-cover"}
              />
              {!creative ? <TopographicField className="opacity-20 mix-blend-screen" /> : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className={creative ? "archive-paper px-5 py-20 md:px-10 md:py-32 lg:px-14" : "bg-space px-5 py-20 md:px-10 md:py-32 lg:px-14"}>
        <div className="mx-auto max-w-[1600px]">
          <div className={`mb-12 grid gap-8 border-b pb-7 md:grid-cols-12 ${creative ? "border-black/15" : "border-white/10"}`}>
            <p className={`font-mono text-[8px] uppercase tracking-[.22em] md:col-span-3 ${creative ? "text-black/38" : "text-bone/30"}`}>Narrative / four movements</p>
            <p className={`font-editorial max-w-3xl text-3xl leading-[1] tracking-[-.03em] md:col-span-7 md:text-5xl ${creative ? "text-black/75" : "text-bone/70"}`}>
              {creative ? "The work is read as a sequence of feeling, making and reflection." : "The project is read as a sequence of context, system and resolution."}
            </p>
          </div>

          {chapters.map(([label, text], index) => (
            <div key={label} className={`grid gap-8 border-b py-12 md:grid-cols-12 md:py-16 ${creative ? "border-black/12" : "border-white/10"}`}>
              <p className={`font-mono text-[9px] uppercase tracking-[.2em] md:col-span-3 ${creative ? "text-rust" : "text-sand"}`}>{label}</p>
              <p className={creative
                ? "font-editorial max-w-4xl text-3xl leading-[1.05] tracking-[-.025em] text-black/76 md:col-span-8 md:text-5xl"
                : "max-w-4xl text-2xl leading-snug tracking-[-.03em] text-bone/72 md:col-span-7 md:text-4xl"
              }>
                {text}
              </p>
              <span className={`hidden font-mono text-[8px] md:block md:text-right ${creative ? "text-black/22" : "text-bone/18"}`}>0{index + 1}</span>
            </div>
          ))}
        </div>
      </section>

      {media.gallery.length > 0 ? (
        <section className={`relative overflow-hidden px-5 py-20 md:px-10 md:py-28 lg:px-14 ${creative ? "creative-atmosphere" : "bg-[#090806]"}`}>
          {creative ? <BrushField className="opacity-20" dense={false} /> : <TopographicField className="opacity-18" />}
          <div className="relative z-10 mx-auto max-w-[1600px]">
            <div className="mb-10 flex items-end justify-between border-b border-current/15 pb-5">
              <div>
                <p className={`font-mono text-[8px] uppercase tracking-[.22em] ${creative ? "text-cream/40" : "text-bone/32"}`}>Visual archive</p>
                <h2 className={creative ? "font-editorial mt-3 text-5xl font-normal tracking-[-.04em] text-cream md:text-7xl" : "mt-3 text-4xl font-medium uppercase tracking-[-.055em] text-bone md:text-6xl"}>
                  {creative ? "Fragments & process" : "Drawings & evidence"}
                </h2>
              </div>
              <p className="font-mono text-[8px] uppercase tracking-[.2em] text-current opacity-30">{String(media.gallery.length).padStart(2, "0")} images</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {media.gallery.map((src, index) => {
                const wide = index % 5 === 0 || (!creative && index % 4 === 2);
                return (
                  <figure key={src} className={wide ? "md:col-span-2" : ""}>
                    <div className={`image-reveal relative overflow-hidden ${creative ? "bg-[#11150f]" : "bg-graphite"} ${wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                      <Image
                        src={src}
                        alt={`${project.title} visual ${index + 1}`}
                        fill
                        sizes={wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                        className="object-contain"
                      />
                    </div>
                    <figcaption className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[.17em] text-current opacity-28">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span>{project.title}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className={creative ? "chroma-field px-5 py-24 text-white md:px-10 md:py-32 lg:px-14" : "archive-paper px-5 py-24 md:px-10 md:py-32 lg:px-14"}>
        <Link href={`/work/${nextProject.slug}`} className="group relative z-10 mx-auto block max-w-[1600px]">
          <p className={`font-mono text-[8px] uppercase tracking-[.22em] ${creative ? "text-white/55" : "text-black/40"}`}>
            NEXT {creative ? "CREATIVE" : "ARCHITECTURAL"} PROJECT / {nextProject.number}
          </p>
          <div className={`mt-8 flex items-end justify-between gap-8 border-t pt-8 ${creative ? "border-white/22" : "border-black/15"}`}>
            <h2 className={creative ? "font-editorial text-6xl font-normal leading-[.8] tracking-[-.05em] md:text-8xl lg:text-9xl" : "text-5xl font-medium uppercase leading-[.82] tracking-[-.06em] text-black md:text-7xl lg:text-8xl"}>
              {nextProject.title}
            </h2>
            <span className="text-3xl transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">→</span>
          </div>
        </Link>
      </section>
    </main>
  );
}
