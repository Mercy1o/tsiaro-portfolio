"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";

const gallerySlugs = [
  "hikari",
  "baobab-fony",
  "professional-practice",
  "the-smiling-wound",
  "in-my-head",
  "a-falling-angel",
  "light-and-shadow",
  "minaret",
];

const galleryProjects = gallerySlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

export default function HomeExperience() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="home-project-field min-h-screen bg-white text-[#343633]">
      <div
        className={`home-project-grid mx-auto max-w-[1700px] px-5 pb-20 pt-28 transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] sm:px-6 md:px-8 md:pt-36 ${
          revealed ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[8px]"
        }`}
        aria-hidden={!revealed}
      >
        {galleryProjects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className={`home-project-tile home-project-tile-${index + 1} group relative block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#343633]`}
            aria-label={`Open ${project.title}`}
          >
            <div className="home-project-frame flex aspect-[3/4] items-center justify-center overflow-hidden border border-[#666963]/18 bg-white px-5 text-center">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.18em] text-[#343633]/48">
                  {project.number} / {project.year}
                </p>
                <p className="home-project-placeholder-title mt-3 text-[clamp(1rem,1.55vw,1.65rem)] font-medium uppercase leading-[.9] tracking-[-.045em] text-[#343633]/78">
                  {project.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
