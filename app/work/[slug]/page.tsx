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

  const portfolioProjects = projects.filter((item) => item.portfolio === project.portfolio);
  const currentIndex = portfolioProjects.findIndex((item) => item.slug === project.slug);
  const previousProject = portfolioProjects[(currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length];
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];

  const chapters = [
    ["Context", project.context],
    ["Concept", project.concept],
    ["Process", project.process],
    ["Result", project.result],
  ] as const;

  return (
    <main className="site-page page-project">
      <section className="site-shell project-hero-simple">
        <div className="project-kicker-row">
          <Link href="/work" className="text-link">← Work</Link>
          <span>{project.category} · {project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <p className="page-intro">{project.description}</p>
      </section>

      <section className="site-shell project-placeholder-section">
        <div className="project-placeholder"><span>{project.title}</span></div>
      </section>

      <section className="site-shell project-story">
        {chapters.map(([label, text], index) => (
          <article key={label} className="story-row">
            <span className="story-number">0{index + 1}</span>
            <h2>{label}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="site-shell project-nav-simple">
        <Link href={`/work/${previousProject.slug}`}>← {previousProject.title}</Link>
        <Link href="/work">Index</Link>
        <Link href={`/work/${nextProject.slug}`}>{nextProject.title} →</Link>
      </section>
    </main>
  );
}
