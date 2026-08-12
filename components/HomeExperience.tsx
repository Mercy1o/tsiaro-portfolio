"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import RealtimeWindThreads from "@/components/RealtimeWindThreads";
import { profileFacts, siteConfig } from "@/data/site";

type Stage = "hero" | "choice" | "profile" | "contact";

export default function HomeExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<Stage>("hero");
  const [field, setField] = useState<"architecture" | "creative" | null>(null);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    stiffness: 76,
    damping: 26,
    mass: 0.3,
    restDelta: 0.5,
  });
  const y = reduceMotion ? scrollY : smoothY;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextStage: Stage =
      latest < 980
        ? "hero"
        : latest < 2450
          ? "choice"
          : latest < 4050
            ? "profile"
            : "contact";

    setActiveStage((current) => (current === nextStage ? current : nextStage));
  });

  // One uninterrupted vertical artwork. It is translated rather than background-covered,
  // so the browser actually travels from deep sky to the ground without restarting the image.
  const sceneY = useTransform(y, [0, 5650], ["0%", "-66%"]);
  const sceneScale = useTransform(y, [0, 5650], [1.01, reduceMotion ? 1.01 : 1.035]);
  const windOpacity = useTransform(y, [0, 900, 2800, 5000, 6000], [0.12, 0.28, 0.38, 0.3, 0.2]);
  const veilOpacity = useTransform(y, [0, 1000, 3200, 5600], [0.3, 0.16, 0.12, 0.22]);

  // HERO — intentionally starts after roughly 1.5 normal wheel gestures.
  const heroOpacity = useTransform(y, [0, 105, 170, 810, 1080], [0, 0, 1, 1, 0]);
  const heroY = useTransform(y, [105, 170, 810, 1080], [58, 0, 0, -78]);
  const heroScale = useTransform(y, [105, 170, 810, 1080], [0.985, 1, 1, 0.975]);
  const heroBlur = useTransform(y, [105, 170, 810, 1080], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(14px)"]);

  // CHOICE — overlaps the hero exit so there is never a hard visual cut.
  const choiceOpacity = useTransform(y, [860, 1040, 2110, 2390], [0, 1, 1, 0]);
  const choiceY = useTransform(y, [860, 1040, 2110, 2390], [72, 0, 0, -68]);
  const choiceScale = useTransform(y, [860, 1040, 2110, 2390], [0.975, 1, 1, 0.975]);
  const choiceBlur = useTransform(y, [860, 1040, 2110, 2390], ["blur(14px)", "blur(0px)", "blur(0px)", "blur(14px)"]);

  // PROFILE — same entrance/exit language as the field selector.
  const profileOpacity = useTransform(y, [2190, 2430, 3650, 3980], [0, 1, 1, 0]);
  const profileY = useTransform(y, [2190, 2430, 3650, 3980], [76, 0, 0, -72]);
  const profileScale = useTransform(y, [2190, 2430, 3650, 3980], [0.975, 1, 1, 0.975]);
  const profileBlur = useTransform(y, [2190, 2430, 3650, 3980], ["blur(14px)", "blur(0px)", "blur(0px)", "blur(14px)"]);

  // CONTACT — arrives before Profile has fully disappeared, then stays through the terrain landing.
  const contactOpacity = useTransform(y, [3740, 4030, 5520, 5900], [0, 1, 1, 0.92]);
  const contactY = useTransform(y, [3740, 4030, 5520], [78, 0, -18]);
  const contactScale = useTransform(y, [3740, 4030, 5520], [0.975, 1, 1]);
  const contactBlur = useTransform(y, [3740, 4030], ["blur(14px)", "blur(0px)"]);

  return (
    <main
      ref={rootRef}
      className="relative h-[6200px] overflow-clip bg-[#080706] text-[#d5c5aa] md:h-[6500px]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#080706]">
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-0 w-[100vw] -translate-x-1/2 will-change-transform max-md:w-[145vw]"
          style={{ y: sceneY, scale: sceneScale }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/site/universe-vertical.png"
            alt=""
            className="block h-auto w-full select-none"
            draggable={false}
          />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-screen"
          style={{ opacity: windOpacity }}
        >
          <RealtimeWindThreads strength="normal" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_47%,transparent_0%,rgba(8,7,6,.02)_48%,rgba(8,7,6,.58)_100%)]"
          style={{ opacity: veilOpacity }}
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#070706]/76 via-[#070706]/26 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#070706]/54 to-transparent" />

        <div className="absolute inset-0 z-10 px-5 pt-24 md:px-10 md:pt-28 lg:px-14">
          <div className="relative mx-auto h-full w-full max-w-[1600px]">
            <motion.section
              aria-label="Introduction"
              style={{ opacity: heroOpacity, y: heroY, scale: heroScale, filter: heroBlur }}
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full max-w-[1450px]">
                <p className="font-mono text-[10px] uppercase tracking-[.21em] text-[#b79a70]/78 md:text-[11px]">
                  {siteConfig.hero.eyebrow}
                </p>
                <h1 className="mt-5 text-[clamp(4.2rem,10.6vw,10.8rem)] font-medium uppercase leading-[.76] tracking-[-.07em] text-[#e4d3b5] [text-shadow:0_3px_34px_rgba(6,5,4,.62)]">
                  Tsiaro<br />Rakototiana
                </h1>

                <div className="mt-9 grid gap-8 border-t border-[#c29d69]/24 pt-6 md:grid-cols-12 md:items-end">
                  <p className="max-w-3xl text-[clamp(1.65rem,3.3vw,3.7rem)] font-light leading-[.98] tracking-[-.04em] text-[#cbb693] md:col-span-7">
                    Designing between matter, memory and the unknown.
                  </p>
                  <div className="md:col-span-4 md:col-start-9">
                    <p className="max-w-lg text-[15px] leading-7 text-[#c0b099]/84 md:text-base">
                      I work across architecture, technical development, drawing and making — connecting precision with experimentation and human experience.
                    </p>
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-[.18em] text-[#b08c5c]/86 md:text-[11px]">
                      Scroll to enter ↓
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              aria-label="Choose a field"
              style={{ opacity: choiceOpacity, y: choiceY, scale: choiceScale, filter: choiceBlur }}
              className={`absolute inset-0 flex items-center ${activeStage === "choice" ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="w-full">
                <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.19em] text-[#b59669]/80 md:text-[11px]">
                  <span>01 / Choose a field</span>
                  <span>One archive / two readings</span>
                </div>

                <div className="grid min-h-[56vh] items-center gap-8 md:grid-cols-[minmax(0,4fr)_minmax(120px,1.2fr)_minmax(0,4fr)]">
                  <Link
                    href="/work?portfolio=architecture"
                    onMouseEnter={() => setField("architecture")}
                    onMouseLeave={() => setField(null)}
                    onFocus={() => setField("architecture")}
                    onBlur={() => setField(null)}
                    className={`group py-8 transition-opacity duration-500 ${field === "creative" ? "opacity-35" : "opacity-100"}`}
                  >
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[.18em] text-[#bb9560]/82 md:text-[11px]">
                      01 / measured terrain
                    </p>
                    <h2 className="text-[clamp(3.5rem,7vw,7.7rem)] font-medium uppercase leading-[.8] tracking-[-.06em] text-[#d7c19d] transition-transform duration-700 group-hover:translate-x-3">
                      Architecture
                    </h2>
                    <p className="mt-6 max-w-md text-[15px] leading-7 text-[#b6a68f]/82 md:text-base">
                      Space, systems, site evidence, technical development and professional work.
                    </p>
                  </Link>

                  <div className="hidden h-[38vh] items-center justify-center md:flex" aria-hidden="true">
                    <div className="h-full w-px bg-gradient-to-b from-transparent via-[#c09b68]/30 to-transparent" />
                  </div>

                  <Link
                    href="/work?portfolio=creative"
                    onMouseEnter={() => setField("creative")}
                    onMouseLeave={() => setField(null)}
                    onFocus={() => setField("creative")}
                    onBlur={() => setField(null)}
                    className={`group py-8 text-left transition-opacity duration-500 md:text-right ${field === "architecture" ? "opacity-35" : "opacity-100"}`}
                  >
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[.18em] text-[#bb9560]/82 md:text-[11px]">
                      02 / fluid memory
                    </p>
                    <h2 className="text-[clamp(3.5rem,7vw,7.7rem)] font-medium uppercase leading-[.8] tracking-[-.06em] text-[#d7c19d] transition-transform duration-700 group-hover:-translate-x-3">
                      Creative
                    </h2>
                    <p className="mt-6 max-w-md text-[15px] leading-7 text-[#b6a68f]/82 md:ml-auto md:text-base">
                      Drawing, ceramics, collage, material experiments and personal visual work.
                    </p>
                  </Link>
                </div>

                <div className="flex items-center justify-between border-t border-[#c09b68]/22 pt-5 font-mono text-[10px] uppercase tracking-[.18em] text-[#a98a63]/78 md:text-[11px]">
                  <span>Move across the field</span>
                  <span>Both belong to the same archive ↘</span>
                </div>
              </div>
            </motion.section>

            <motion.section
              aria-label="Profile field notes"
              style={{ opacity: profileOpacity, y: profileY, scale: profileScale, filter: profileBlur }}
              className={`absolute inset-0 flex items-center ${activeStage === "profile" ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="grid w-full gap-10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-5">
                  <p className="font-mono text-[10px] uppercase tracking-[.19em] text-[#b59669]/80 md:text-[11px]">
                    02 / Profile / field notes
                  </p>
                  <h2 className="mt-6 max-w-xl text-[clamp(2.9rem,5vw,5.8rem)] font-medium leading-[.91] tracking-[-.052em] text-[#d9c3a0]">
                    Architecture is one layer of how I create.
                  </h2>
                  <Link
                    href="/about"
                    className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[.17em] text-[#c09a67]/88 transition-colors hover:text-[#ead6b3] md:text-xs"
                  >
                    Open full profile ↗
                  </Link>
                </div>

                <div className="md:col-span-1" aria-hidden="true" />

                <div className="md:col-span-6">
                  <p className="max-w-2xl text-base leading-8 text-[#c0b098]/84 md:text-lg">
                    My work moves between spatial design, technical documentation, drawing, collage and physical making. I am interested in the point where structure, culture, memory and imagination begin to influence one another.
                  </p>

                  <div className="mt-8 space-y-5 border-t border-[#c09b68]/22 pt-6">
                    {profileFacts.map((fact, index) => (
                      <div
                        key={fact.label}
                        className="grid grid-cols-[52px_1fr] gap-4 border-b border-[#c09b68]/14 pb-5 last:border-b-0"
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#ad8c61]/78 md:text-[11px]">
                          0{index + 1}
                        </p>
                        <div>
                          <p className="text-lg font-medium tracking-[-.025em] text-[#d0bb99] md:text-xl">
                            {fact.value}
                          </p>
                          <p className="mt-1 text-[14px] leading-6 text-[#aa9b84]/82 md:text-[15px]">
                            {fact.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              aria-label="Contact"
              style={{ opacity: contactOpacity, y: contactY, scale: contactScale, filter: contactBlur }}
              className={`absolute inset-0 flex items-center ${activeStage === "contact" ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="w-full">
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#b59669]/82 md:text-[11px]">
                  03 / Open channel
                </p>

                <div className="mt-6 grid gap-10 md:grid-cols-12 md:items-end">
                  <div className="md:col-span-7">
                    <h2 className="text-[clamp(4rem,9vw,9.4rem)] font-medium uppercase leading-[.78] tracking-[-.068em] text-[#e1ceb0]">
                      Let&apos;s create<br />what comes next.
                    </h2>
                  </div>

                  <div className="md:col-span-4 md:col-start-9">
                    <p className="max-w-lg text-[16px] leading-8 text-[#c0b098]/86 md:text-lg">
                      Opportunities, collaborations, project conversations and portfolio enquiries.
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-7 block text-lg text-[#ddc7a5] transition-colors hover:text-[#f0dfc3] md:text-xl"
                    >
                      {siteConfig.email}
                    </a>

                    <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[11px] uppercase tracking-[.17em] text-[#b89464]/90 md:text-xs">
                      <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#ead6b3]">
                        LinkedIn ↗
                      </a>
                      <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-[#ead6b3]">
                        Instagram ↗
                      </a>
                      <Link href="/contact" className="hover:text-[#ead6b3]">
                        Contact ↗
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-[#c09b68]/22 pt-5 font-mono text-[10px] uppercase tracking-[.18em] text-[#ae8d62]/78 md:text-[11px]">
                  <span>Toronto, Canada</span>
                  <Link href="/work" className="pointer-events-auto hover:text-[#ead6b3]">
                    End of field / continue through work ↑
                  </Link>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  );
}
