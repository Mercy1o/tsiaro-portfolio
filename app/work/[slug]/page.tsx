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
  const portfolioQuery = project.portfolio === "Architectural Portfolio" ? "design" : "creative";
  const collectionHref = `/work/${portfolioQuery}`;

  return (
    <main className="project-split-page bg-white text-[#343633]">
      <div className="project-split-shell">
        <section className="project-split-copy">
          <div className="project-split-topline">
            <Link href={collectionHref}>← {portfolioQuery === "design" ? "Design" : "Creative"}</Link>
            <span>{project.number}</span>
            <span>{project.year}</span>
          </div>

          <div className="project-split-heading">
            <p className="project-split-kicker">{project.category} / {project.subtitle}</p>
            <h1>{project.title}</h1>
          </div>

          <div className="project-split-intro">
            <p>{project.description}</p>
          </div>

          <div className="project-split-narrative">
            <article>
              <span>01 / Context</span>
              <p>{project.context}</p>
            </article>
            <article>
              <span>02 / Concept</span>
              <p>{project.concept}</p>
            </article>
            <article>
              <span>03 / Process</span>
              <p>{project.process}</p>
            </article>
            <article>
              <span>04 / Result</span>
              <p>{project.result}</p>
            </article>
          </div>

          <div className="project-split-meta">
            <div>
              <span>Project type</span>
              <strong>{project.category}</strong>
            </div>
            <div>
              <span>Collection</span>
              <strong>{portfolioQuery === "design" ? "Design" : "Creative"}</strong>
            </div>
            <div>
              <span>Year</span>
              <strong>{project.year}</strong>
            </div>
            <div>
              <span>Format</span>
              <strong>{project.subtitle}</strong>
            </div>
          </div>

          <nav className="project-split-nav" aria-label="Project navigation">
            <Link href={`/work/${previousProject.slug}`}>← {previousProject.title}</Link>
            <Link href={collectionHref}>Index</Link>
            <Link href={`/work/${nextProject.slug}`}>{nextProject.title} →</Link>
          </nav>
        </section>

        <aside className="project-split-media" aria-label={`${project.title} media placeholder`}>
          <div className="project-split-frame">
            <div>
              <p>{project.number} / {project.year}</p>
              <h2>{project.title}</h2>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
