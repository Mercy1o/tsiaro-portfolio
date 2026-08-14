"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { getProjectMedia } from "@/data/projectMedia";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

type Stage = "hero" | "work" | "profile" | "contact";

const featuredSlugs = ["hikari", "baobab-fony", "the-smiling-wound"];
const featuredProjects = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

export default function HomeExperience() {
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<Stage>("hero");
  const { scrollY } = useScroll();

  const textY = useSpring(scrollY, {
    stiffness: 42,
    damping: 30,
    mass: 0.62,
    restDelta: 0.5,
  });
  const narrativeY = reduceMotion ? scrollY : textY;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextStage: Stage =
      latest < 1080 ? "hero" : latest < 2550 ? "work" : latest < 4140 ? "profile" : "contact";
    setActiveStage((current) => (current === nextStage ? current : nextStage));
  });

  const heroOpacity = useTransform(narrativeY, [0, 105, 260, 900, 1260], [0, 0, 1, 1, 0]);
  const heroY = useTransform(narrativeY, [105, 260, 900, 1260], [54, 0, 0, -64]);
  const heroBlur = useTransform(narrativeY, [105, 260, 900, 1260], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  const workOpacity = useTransform(narrativeY, [850, 1120, 2200, 2580], [0, 1, 1, 0]);
  const workY = useTransform(narrativeY, [850, 1120, 2200, 2580], [58, 0, 0, -56]);
  const workBlur = useTransform(narrativeY, [850, 1120, 2200, 2580], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  const profileOpacity = useTransform(narrativeY, [2180, 2550, 3700, 4160], [0, 1, 1, 0]);
  const profileY = useTransform(narrativeY, [2180, 2550, 3700, 4160], [60, 0, 0, -58]);
  const profileBlur = useTransform(narrativeY, [2180, 2550, 3700, 4160], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  const contactOpacity = useTransform(narrativeY, [3700, 4140, 5520, 5900], [0, 1, 1, 0.92]);
  const contactY = useTransform(narrativeY, [3700, 4140, 5520], [62, 0, -18]);
  const contactBlur = useTransform(narrativeY, [3700, 4140], ["blur(10px)", "blur(0px)"]);

  return (
    <main className="relative h-[6200px] overflow-clip text-[#343633] md:h-[6500px]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 z-10 px-5 pt-24 md:px-10 md:pt-28 lg:px-14">
          <div className="relative mx-auto h-full w-full max-w-[1600px]">
            <motion.section
              aria-label="Introduction"
              style={{ opacity: heroOpacity, y: heroY, filter: heroBlur }}
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full max-w-[1450px]">
                <p className="font-mono text-[10px] uppercase tracking-[.21em] md:text-[11px]">{siteConfig.hero.eyebrow}</p>
                <h1 className="mt-5 text-[clamp(4.2rem,10.6vw,10.8rem)] font-medium uppercase leading-[.76] tracking-[-.07em]">Tsiaro<br />Rakototiana</h1>
                <div className="mt-9 grid gap-8 border-t pt-6 md:grid-cols-12 md:items-end">
                  <p className="max-w-3xl text-[clamp(1.65rem,3.3vw,3.7rem)] font-light leading-[.98] tracking-[-.04em] md:col-span-7">Designing between matter, memory and the unknown.</p>
                  <p className="max-w-lg text-[15px] leading-7 md:col-span-4 md:col-start-9 md:text-base">Architecture, technical precision and making come together as one evolving practice.</p>
                </div>
              </div>
            </motion.section>

            <motion.section
              aria-label="Featured work"
              style={{ opacity: workOpacity, y: workY, filter: workBlur }}
              className={`absolute inset-0 flex items-center ${activeStage === "work" ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="w-full">
                <div className="mb-7 flex items-end justify-between border-b pb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[.19em] md:text-[11px]">01 / Selected work</p>
                    <p className="mt-2 max-w-xl text-sm leading-6 opacity-70">A short selection from the larger archive.</p>
                  </div>
                  <Link href="/work" className="hidden font-mono text-[10px] uppercase tracking-[.17em] transition-opacity hover:opacity-50 md:block">View all work ↗</Link>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {featuredProjects.map((project, index) => {
                    const media = getProjectMedia(project.slug);
                    return (
                      <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={media.cover}
                            alt={project.title}
                            fill
                            sizes="(max-width: 767px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                          />
                        </div>
                        <div className="mt-3 flex items-start justify-between gap-4 border-t pt-3">
                          <div>
                            <p className="font-mono text-[8px] uppercase tracking-[.18em] opacity-55">0{index + 1} · {project.category}</p>
                            <h2 className="mt-1 text-[clamp(1.6rem,2.4vw,2.8rem)] font-medium leading-[.95] tracking-[-.045em]">{project.title}</h2>
                          </div>
                          <span className="font-mono text-[8px] uppercase tracking-[.16em] opacity-55">{project.year}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <Link href="/work" className="mt-7 inline-flex font-mono text-[10px] uppercase tracking-[.17em] transition-opacity hover:opacity-50 md:hidden">View all work ↗</Link>
              </div>
            </motion.section>

            <motion.section
              aria-label="Profile preview"
              style={{ opacity: profileOpacity, y: profileY, filter: profileBlur }}
              className={`absolute inset-0 flex items-center ${activeStage === "profile" ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="grid w-full gap-10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-7">
                  <p className="font-mono text-[10px] uppercase tracking-[.19em] md:text-[11px]">02 / Profile</p>
                  <h2 className="mt-6 max-w-4xl text-[clamp(3rem,5.6vw,6.4rem)] font-medium leading-[.9] tracking-[-.055em]">I move between design, construction knowledge and material experimentation.</h2>
                </div>
                <div className="md:col-span-4 md:col-start-9">
                  <p className="text-base leading-8 opacity-75 md:text-lg">The full profile contains education, professional practice, tools and recognition.</p>
                  <Link href="/about" className="mt-8 inline-flex min-h-11 items-center border-t pt-5 font-mono text-[11px] uppercase tracking-[.17em] transition-opacity hover:opacity-50">About me ↗</Link>
                </div>
              </div>
            </motion.section>

            <motion.section
              aria-label="Contact direction"
              style={{ opacity: contactOpacity, y: contactY, filter: contactBlur }}
              className={`absolute inset-0 flex items-center ${activeStage === "contact" ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="w-full border-t pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[.18em] md:text-[11px]">03 / Direction</p>
                <div className="py-14 md:py-20">
                  <p className="max-w-5xl text-[clamp(2.8rem,6vw,6.8rem)] font-medium leading-[.88] tracking-[-.06em]">Continue the conversation.</p>
                  <Link href="/contact" className="mt-8 inline-flex min-h-11 items-center text-[clamp(1.45rem,3.4vw,3.6rem)] font-light tracking-[-.04em] transition-opacity hover:opacity-50">Contact ↗</Link>
                </div>
                <div className="flex items-center justify-end border-t pt-5 font-mono text-[10px] uppercase tracking-[.17em] md:text-[11px]">
                  <Link href="/work" className="transition-opacity hover:opacity-50">Explore the archive ↑</Link>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  );
}
