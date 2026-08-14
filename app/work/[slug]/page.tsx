import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { getProjectMedia } from "@/data/projectMedia";

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
  const previousProject = portfolioProjects[(currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length];
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
    <main className="relative overflow-hidden bg-transparent text-[#343633]">
      <div className="relative z-10">
        <section className="min-h-[90svh] px-5 pb-12 pt-32 md:px-10 md:pt-40 lg:px-14">
          <div className="mx-auto flex min-h-[72svh] max-w-[1600px] flex-col justify-between">
            <div className="grid gap-4 border-b border-[#666963]/18 pb-4 font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/62 sm:grid-cols-3">
              <span>{project.number} / {creative ? "CREATIVE ARCHIVE" : "ARCHITECTURAL ARCHIVE"}</span>
              <Link href={`/work?portfolio=${portfolioQuery}`} className="transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#343633]/55 sm:text-center">← Return to {portfolioQuery}</Link>
              <span className="sm:text-right">{project.year}</span>
            </div>

            <div className="max-w-[1450px] py-16 md:py-20">
              <p className="mb-5 font-mono text-[9px] uppercase tracking-[.24em] text-[#666963]/68">{project.category} / {project.subtitle}</p>
              <h1 className="max-w-[1450px] text-[clamp(4rem,10vw,10.5rem)] font-medium uppercase leading-[.78] tracking-[-.07em] text-[#343633]">{project.title}</h1>
            </div>

            <div className="grid gap-8 border-t border-[#666963]/18 pt-6 md:grid-cols-12">
              <p className="max-w-2xl text-base leading-7 text-[#343633]/72 md:col-span-6">{project.description}</p>
              <div className="md:col-span-3 md:col-start-10">
                <p className="font-mono text-[8px] uppercase leading-5 tracking-[.2em] text-[#666963]/58">{creative ? "Object / gesture / memory" : "Observation / system / structure"}<br />Scroll to enter ↓</p>
              </div>
            </div>
          </div>
        </section>

        {media.cover ? (
          <section className="px-5 py-10 md:px-10 md:py-16 lg:px-14">
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-4 flex justify-between font-mono text-[8px] uppercase tracking-[.2em] text-[#666963]/55">
                <span>Primary visual / 00</span>
                <span>{project.title}</span>
              </div>
              <div className="image-reveal relative aspect-[16/9] overflow-hidden bg-[#dedbd3]/45">
                <Image src={media.cover} alt={`${project.title} - ${project.subtitle}`} fill priority sizes="100vw" className={creative ? "object-contain p-3 md:p-8" : "object-cover"} />
              </div>
            </div>
          </section>
        ) : null}

        <section className="px-5 py-20 md:px-10 md:py-32 lg:px-14">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-12 grid gap-8 border-b border-[#666963]/18 pb-7 md:grid-cols-12">
              <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/58 md:col-span-3">Narrative / four movements</p>
              <p className="max-w-3xl text-3xl font-light leading-[1] tracking-[-.04em] text-[#343633]/76 md:col-span-7 md:text-5xl">{creative ? "The work unfolds through feeling, making and reflection." : "The project unfolds through context, system and resolution."}</p>
            </div>

            {chapters.map(([label, text], index) => (
              <div key={label} className="grid gap-8 border-b border-[#666963]/16 py-12 md:grid-cols-12 md:py-16">
                <p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#666963]/70 md:col-span-3">{label}</p>
                <p className="max-w-4xl text-2xl font-light leading-snug tracking-[-.03em] text-[#343633]/74 md:col-span-8 md:text-4xl">{text}</p>
                <span className="hidden font-mono text-[8px] text-[#666963]/42 md:block md:text-right">0{index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="mx-auto max-w-[1600px] border-t border-[#666963]/18 pt-8">
            <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-end">
              <Link href={`/work/${previousProject.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#343633]/55">
                <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/58">Previous / {previousProject.number}</p>
                <p className="mt-3 text-3xl font-medium uppercase leading-[.9] tracking-[-.05em] text-[#343633]/72 transition-opacity group-hover:opacity-55 md:text-4xl">← {previousProject.title}</p>
              </Link>

              <Link href={`/work?portfolio=${portfolioQuery}`} className="justify-self-start font-mono text-[9px] uppercase tracking-[.18em] text-[#666963]/68 transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#343633]/55 md:justify-self-center">Index</Link>

              <Link href={`/work/${nextProject.slug}`} className="group block text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#343633]/55 md:text-right">
                <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#666963]/58">Next / {nextProject.number}</p>
                <p className="mt-3 text-3xl font-medium uppercase leading-[.9] tracking-[-.05em] text-[#343633] transition-opacity group-hover:opacity-55 md:text-4xl">{nextProject.title} →</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
