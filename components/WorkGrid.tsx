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

  const activeProject =
    items.find((project) => project.slug === activeSlug) ?? items[0];

  if (!activeProject) return null;

  const activeMedia = getProjectMedia(activeProject.slug);

  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-12">
      <div className="order-2 md:order-1 md:col-span-8 lg:col-span-9">
        <div className="flex flex-col">
          {items.map((project) => {
            const active = project.slug === activeProject.slug;

            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                onMouseEnter={() => setActiveSlug(project.slug)}
                onFocus={() => setActiveSlug(project.slug)}
                onTouchStart={() => setActiveSlug(project.slug)}
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

      <aside className="order-1 md:order-2 md:col-span-4 lg:col-span-3">
        <div className="md:sticky md:top-32">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#15120f]">
            {activeMedia.cover ? (
              <Image
                key={activeMedia.cover}
                src={activeMedia.cover}
                alt={`${activeProject.title} · ${activeProject.subtitle}`}
                fill
                sizes="(max-width: 767px) 100vw, 30vw"
                className="object-cover transition-opacity duration-500"
                priority
              />
            ) : null}

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,6,.02),rgba(9,8,6,.15))]" />
          </div>

          <div className="mt-4 border-t border-[#a98758]/12 pt-3">
            <p className="font-mono text-[8px] uppercase tracking-[.18em] text-[#8d7658]/52">
              {activeProject.category} · {activeProject.year}
            </p>

            <p className="mt-2 text-sm leading-6 text-[#a99a82]/62">
              {activeProject.subtitle}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
