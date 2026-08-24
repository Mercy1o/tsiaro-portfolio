import type { Metadata } from "next";
import Link from "next/link";
import { architecturalProjects, creativeProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Architecture and creative work by Tsiaro Rakototiana.",
};

function ProjectList({ projects }: { projects: typeof architecturalProjects }) {
  return (
    <div className="project-index">
      {projects.map((project) => (
        <Link key={project.slug} href={`/work/${project.slug}`} className="project-index-row">
          <span className="project-index-number">{project.number}</span>
          <span className="project-index-title">{project.title}</span>
          <span className="project-index-meta">{project.category} · {project.year}</span>
        </Link>
      ))}
    </div>
  );
}

export default function WorkPage() {
  return (
    <main className="site-page page-work">
      <section className="site-shell page-hero">
        <p className="eyebrow">Work</p>
        <h1>Collection</h1>
        <p className="page-intro">Architecture and creative work presented as two connected fields of the same practice.</p>
      </section>

      <section className="site-shell collection-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">01</p>
            <h2>Architecture</h2>
          </div>
          <p className="section-note">Space · Systems · Technical Practice</p>
        </div>
        <ProjectList projects={architecturalProjects} />
      </section>

      <section className="site-shell collection-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">02</p>
            <h2>Creative</h2>
          </div>
          <p className="section-note">Drawing · Ceramics · Collage · Making</p>
        </div>
        <ProjectList projects={creativeProjects} />
      </section>
    </main>
  );
}
