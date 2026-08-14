"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { projects as allProjects, type Project } from "@/data/projects";
import { getProjectMedia } from "@/data/projectMedia";

type WorkGridProps = {
  limit?: number;
  projects?: Project[];
};

export default function WorkGrid({ limit, projects }: WorkGridProps) {
  const source = projects ?? allProjects;
  const items = typeof limit === "number" ? source.slice(0, limit) : source;

  const [activeSlug, setActiveSlug] = useState(items[0]?.slug ?? "");
  const [previewTop, setPreviewTop] = useState(0);

  useEffect(() => {
    setActiveSlug(items[0]?.slug ?? "");
    setPreviewTop(0);
  }, [items]);

  const activeProject = items.find((project) => project.slug === activeSlug) ?? items[0];

  if (!activeProject) return null;

  const activeMedia = getProjectMedia(activeProject.slug);

  function activateProject(project: Project, element: HTMLElement) {
    setActiveSlug(project.slug);
    setPreviewTop(element.offsetTop);
  }

  return (
    <div className="relative">
      <div className="md:w-[72%] lg:w-[74%]">
        <div className="flex flex-col">
          {items.map((project) => {
            const active = project.slug === activeProject.slug;

            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                onMouseEnter={(event) => activateProject(project, event.currentTarget)}
                onFocus={(event) => activateProject(project, event.currentTarget)}
                className="group border-b border-[#666963]/16 py-2 first:border-t focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#343633]/55"
              >
                <div className="grid grid-cols-[2.6rem_1fr] items-baseline gap-2 md:grid-cols-[3.5rem_1fr_auto] md:gap-5">
                  <span className="font-mono text-[8px] uppercase tracking-[.18em] text-[#666963]/58 md:text-[9px]">
                    {project.number}
                  </span>

                  <h3
                    className={`text-[clamp(2.6rem,6.4vw,7rem)] font-medium leading-[.86] tracking-[-.065em] transition-all duration-300 ${
                      active
                        ? "translate-x-2 text-[#343633]"
                        : "text-[#343633]/58 group-hover:translate-x-2 group-hover:text-[#343633]"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <span className="hidden font-mono text-[8px] uppercase tracking-[.16em] text-[#666963]/52 md:block">
                    {project.year}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <aside
        aria-live="polite"
        className="absolute right-0 hidden w-[24%] transition-[top] duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:block"
        style={{ top: previewTop }}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#dedbd3]/45">
          {activeMedia.cover ? (
            <Image
              key={activeMedia.cover}
              src={activeMedia.cover}
              alt={`${activeProject.title} · ${activeProject.subtitle}`}
              fill
              sizes="24vw"
              className="object-cover transition-opacity duration-500"
            />
          ) : null}
        </div>

        <div className="mt-4 border-t border-[#666963]/16 pt-3">
          <p className="font-mono text-[8px] uppercase tracking-[.18em] text-[#666963]/58">
            {activeProject.category} · {activeProject.year}
          </p>

          <p className="mt-2 text-sm leading-6 text-[#343633]/66">
            {activeProject.subtitle}
          </p>
        </div>
      </aside>
    </div>
  );
}
