import Link from "next/link";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

const featuredSlugs = ["hikari", "baobab-fony", "the-smiling-wound", "cantley"];
const featuredProjects = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

export default function HomeExperience() {
  return (
    <main className="site-page home-page">
      <section className="site-shell home-hero">
        <p className="eyebrow">Portfolio / 2026</p>
        <h1>Tsiaro Rakototiana</h1>
        <div className="home-intro-grid">
          <p className="home-statement">Designing between architecture, making and creative experimentation.</p>
          <p className="body-copy">{siteConfig.hero.description}</p>
        </div>
      </section>

      <section className="site-shell project-index-section">
        <div className="section-heading-row">
          <p className="eyebrow">Selected work</p>
          <Link href="/work" className="text-link">View all work ↗</Link>
        </div>

        <div className="project-index">
          {featuredProjects.map((project, index) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="project-index-row">
              <span className="project-index-number">0{index + 1}</span>
              <span className="project-index-title">{project.title}</span>
              <span className="project-index-meta">{project.category} · {project.year}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-shell home-profile">
        <p className="eyebrow">Profile</p>
        <div className="home-profile-grid">
          <h2>A practice between systems and intuition.</h2>
          <div>
            <p className="body-copy">{siteConfig.about.description}</p>
            <Link href="/about" className="text-link">About me ↗</Link>
          </div>
        </div>
      </section>

      <section className="site-shell home-contact">
        <p className="eyebrow">Contact</p>
        <Link href="/contact" className="home-contact-link">Let’s work together ↗</Link>
      </section>
    </main>
  );
}
