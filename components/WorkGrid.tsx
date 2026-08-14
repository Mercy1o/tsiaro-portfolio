"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

  const activeProject =
    items.find((project) => project.slug === activeSlug) ?? items[0];

  if (!activeProject) return null;

  const activeMedia = getProjectMedia(activeProject.slug);

  function activateProject(
    project: Project,
    element: HTMLElement
  ) {
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
                onMouseEnter={(event) =>
                  activateProject(project, event.currentTarget)
                }
                onFocus={(event) =>
                  activateProject(project, event.currentTarget)
                }
                onTouchStart={(event) =>
                  activateProject(project, event.currentTarget)
                }
                className="group border-b border-[#a98758]/12 py-2 first:border-t"
              >
                <div className="grid grid-cols-[2.6rem_1fr] items-baseline gap-2 md:grid-cols-[3.5rem_1fr_auto] md:gap-5">
                  <span className="font-mono text-[8px] uppercase tracking-[.18em] text-[#8f7758]/56 md:text-[9px]">
                    {project.number}
                  </span>

                  <h3
                    className={`text-[clamp(2.6rem,6.4vw,7rem)] font-medium leading-[.86] tracking-[-.065em] transition-all duration-300 ${
                      active
                        ? "translate-x-2 text-[#d8c5a5]"
                        : "text-[#b6a181]/68 group-hover:translate-x-2 group-hover:text-[#d0bb99]"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <span className="hidden font-mono text-[8px] uppercase tracking-[.16em] text-[#89745a]/50 md:block">
                    {project.year}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <aside
        className="
          absolute
          right-0
          hidden
          w-[24%]
          transition-[top]
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]
          md:block
        "
        style={{ top: previewTop }}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#15120f]">
          {activeMedia.cover ? (
            <Image
              key={activeMedia.cover}
              src={activeMedia.cover}
              alt={`${activeProject.title} · ${activeProject.subtitle}`}
              fill
              sizes="24vw"
              className="object-cover transition-opacity duration-500"
              priority
            />
          ) : null}
        </div>

        <div className="mt-4 border-t border-[#a98758]/12 pt-3">
          <p className="font-mono text-[8px] uppercase tracking-[.18em] text-[#8d7658]/52">
            {activeProject.category} · {activeProject.year}
          </p>

          <p className="mt-2 text-sm leading-6 text-[#a99a82]/62">
            {activeProject.subtitle}
          </p>
        </div>
      </aside>

      <div className="mb-8 md:hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#15120f]">
          {activeMedia.cover ? (
            <Image
              key={activeMedia.cover}
              src={activeMedia.cover}
              alt={`${activeProject.title} · ${activeProject.subtitle}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}