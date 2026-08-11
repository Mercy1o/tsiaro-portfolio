import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";

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

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="bg-space text-bone">
      <section className="space-field cinematic-grid min-h-[92svh] px-5 pb-12 pt-36 md:px-10 md:pt-44 lg:px-14">
        <div className="mx-auto flex min-h-[72svh] max-w-[1600px] flex-col justify-between">
          <div className="flex justify-between gap-6 font-mono text-[10px] uppercase tracking-[.18em] text-bone/40">
            <span>{project.number} / {project.category}</span>
            <span>{project.year}</span>
          </div>

          <div className="py-14">
            <h1 className="display-title font-medium">{project.title}</h1>
            <p className="mt-8 text-xl text-sand md:text-2xl">{project.subtitle}</p>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-7 md:grid-cols-12">
            <p className="max-w-2xl text-base leading-7 text-bone/55 md:col-span-6">{project.description}</p>
            <div className="md:col-span-3 md:col-start-10"><p className="font-mono text-[9px] uppercase tracking-[.18em] text-bone/30">Case study / scroll ↓</p></div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 md:px-10 lg:px-14">
        <div className="placeholder-frame mx-auto aspect-[16/9] max-w-[1600px]">
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[.22em] text-bone/35">{project.coverLabel}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
        {[
          ["01 / Context", project.context],
          ["02 / Concept", project.concept],
          ["03 / Process", project.process],
          ["04 / Result", project.result],
        ].map(([label, text]) => (
          <div key={label} className="grid gap-8 border-t border-white/10 py-14 md:grid-cols-12 md:py-20">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-sand md:col-span-3">{label}</p>
            <p className="max-w-3xl text-2xl leading-snug tracking-[-.025em] text-bone/75 md:col-span-7 md:text-3xl">{text}</p>
          </div>
        ))}
      </section>

      <section className="paper-noise px-5 py-24 text-space md:px-10 md:py-32 lg:px-14">
        <Link href={`/work/${nextProject.slug}`} className="group mx-auto block max-w-[1600px]">
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-black/40">NEXT PROJECT / {nextProject.number}</p>
          <div className="mt-8 flex items-end justify-between gap-8 border-t border-black/15 pt-8">
            <h2 className="text-5xl font-medium tracking-[-.05em] md:text-7xl lg:text-8xl">{nextProject.title}</h2>
            <span className="text-3xl transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">→</span>
          </div>
        </Link>
      </section>
    </main>
  );
}
