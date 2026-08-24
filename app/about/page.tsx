import type { Metadata } from "next";
import { awards, profileFacts, siteConfig, skills } from "@/data/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="site-page page-about">
      <section className="site-shell page-hero">
        <p className="eyebrow">Profile</p>
        <h1>About</h1>
        <p className="page-intro">{siteConfig.about.description}</p>
      </section>

      <section className="site-shell info-section">
        <p className="eyebrow">Education / Practice</p>
        <div className="info-grid">
          {profileFacts.map((fact) => (
            <article key={fact.label} className="info-block">
              <p className="info-label">{fact.label}</p>
              <h2>{fact.value}</h2>
              <p className="body-copy">{fact.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell info-section">
        <p className="eyebrow">Tools / Disciplines</p>
        <div className="two-column-info">
          <div>
            <h2>Software</h2>
            <div className="plain-list">
              {[...skills.advanced, ...skills.intermediate].map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div>
            <h2>Practice</h2>
            <div className="plain-list">
              {skills.disciplines.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell info-section">
        <p className="eyebrow">Recognition</p>
        <div className="project-index">
          {awards.map((award, index) => (
            <div key={award.title} className="project-index-row static-row">
              <span className="project-index-number">0{index + 1}</span>
              <span className="project-index-title">{award.title}</span>
              <span className="project-index-meta">{award.detail}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
