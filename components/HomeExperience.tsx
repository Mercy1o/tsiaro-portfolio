"use client";

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
import WaterMarbleBackground from "@/components/WaterMarbleBackground";
import { siteConfig } from "@/data/site";

type Stage = "hero" | "choice" | "profile" | "contact";

export default function HomeExperience() {
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<Stage>("hero");
  const [field, setField] = useState<"architecture" | "creative" | null>(null);
  const { scrollY } = useScroll();

  const textY = useSpring(scrollY, { stiffness: 42, damping: 30, mass: 0.62, restDelta: 0.5 });
  const narrativeY = reduceMotion ? scrollY : textY;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextStage: Stage = latest < 1080 ? "hero" : latest < 2550 ? "choice" : latest < 4140 ? "profile" : "contact";
    setActiveStage((current) => (current === nextStage ? current : nextStage));
  });

  const heroOpacity = useTransform(narrativeY, [0, 105, 260, 900, 1260], [0, 0, 1, 1, 0]);
  const heroY = useTransform(narrativeY, [105, 260, 900, 1260], [54, 0, 0, -64]);
  const heroBlur = useTransform(narrativeY, [105, 260, 900, 1260], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  const choiceOpacity = useTransform(narrativeY, [850, 1120, 2200, 2580], [0, 1, 1, 0]);
  const choiceY = useTransform(narrativeY, [850, 1120, 2200, 2580], [58, 0, 0, -56]);
  const choiceBlur = useTransform(narrativeY, [850, 1120, 2200, 2580], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  const profileOpacity = useTransform(narrativeY, [2180, 2550, 3700, 4160], [0, 1, 1, 0]);
  const profileY = useTransform(narrativeY, [2180, 2550, 3700, 4160], [60, 0, 0, -58]);
  const profileBlur = useTransform(narrativeY, [2180, 2550, 3700, 4160], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  const contactOpacity = useTransform(narrativeY, [3700, 4140, 5520, 5900], [0, 1, 1, 0.92]);
  const contactY = useTransform(narrativeY, [3700, 4140, 5520], [62, 0, -18]);
  const contactBlur = useTransform(narrativeY, [3700, 4140], ["blur(10px)", "blur(0px)"]);

  return (
    <main className="relative h-[6200px] overflow-clip text-[#343633] md:h-[6500px]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <WaterMarbleBackground />

        <div className="absolute inset-0 z-10 px-5 pt-24 md:px-10 md:pt-28 lg:px-14">
          <div className="relative mx-auto h-full w-full max-w-[1600px]">
            <motion.section aria-label="Introduction" style={{ opacity: heroOpacity, y: heroY, filter: heroBlur }} className="absolute inset-0 flex items-center">
              <div className="w-full max-w-[1450px]">
                <p className="font-mono text-[10px] uppercase tracking-[.21em] text-[#b79a70]/78 md:text-[11px]">{siteConfig.hero.eyebrow}</p>
                <h1 className="mt-5 text-[clamp(4.2rem,10.6vw,10.8rem)] font-medium uppercase leading-[.76] tracking-[-.07em] text-[#e4d3b5]">Tsiaro<br />Rakototiana</h1>
                <div className="mt-9 grid gap-8 border-t border-[#c29d69]/24 pt-6 md:grid-cols-12 md:items-end">
                  <p className="max-w-3xl text-[clamp(1.65rem,3.3vw,3.7rem)] font-light leading-[.98] tracking-[-.04em] text-[#cbb693] md:col-span-7">Designing between matter, memory and the unknown.</p>
                  <p className="max-w-lg text-[15px] leading-7 text-[#c0b099]/84 md:col-span-4 md:col-start-9 md:text-base">I work across architecture, technical development, drawing and making.</p>
                </div>
              </div>
            </motion.section>

            <motion.section aria-label="Choose a field" style={{ opacity: choiceOpacity, y: choiceY, filter: choiceBlur }} className={`absolute inset-0 flex items-center ${activeStage === "choice" ? "pointer-events-auto" : "pointer-events-none"}`}>
              <div className="w-full">
                <p className="mb-8 font-mono text-[10px] uppercase tracking-[.19em] text-[#b59669]/80 md:text-[11px]">01 / Choose a field</p>
                <div className="grid min-h-[56vh] items-center gap-8 md:grid-cols-2">
                  <Link href="/work?portfolio=architecture" onMouseEnter={() => setField("architecture")} onMouseLeave={() => setField(null)} className={`group py-8 transition-opacity ${field === "creative" ? "opacity-35" : "opacity-100"}`}>
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[.18em] text-[#bb9560]/82">01 / measured terrain</p>
                    <h2 className="text-[clamp(3.5rem,7vw,7.7rem)] font-medium uppercase leading-[.8] tracking-[-.06em] text-[#d7c19d]">Architecture</h2>
                  </Link>
                  <Link href="/work?portfolio=creative" onMouseEnter={() => setField("creative")} onMouseLeave={() => setField(null)} className={`group py-8 md:text-right ${field === "architecture" ? "opacity-35" : "opacity-100"}`}>
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[.18em] text-[#bb9560]/82">02 / fluid memory</p>
                    <h2 className="text-[clamp(3.5rem,7vw,7.7rem)] font-medium uppercase leading-[.8] tracking-[-.06em] text-[#d7c19d]">Creative</h2>
                  </Link>
                </div>
              </div>
            </motion.section>

            <motion.section aria-label="Profile field notes" style={{ opacity: profileOpacity, y: profileY, filter: profileBlur }} className={`absolute inset-0 flex items-center ${activeStage === "profile" ? "pointer-events-auto" : "pointer-events-none"}`}>
              <div className="grid w-full gap-10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-6">
                  <p className="font-mono text-[10px] uppercase tracking-[.19em] text-[#b59669]/80 md:text-[11px]">02 / Profile</p>
                  <h2 className="mt-6 max-w-2xl text-[clamp(2.9rem,5vw,5.8rem)] font-medium leading-[.91] tracking-[-.052em] text-[#d9c3a0]">Architecture is one layer of how I create.</h2>
                </div>
                <div className="md:col-span-5 md:col-start-8">
                  <p className="text-base leading-8 text-[#c0b098]/84 md:text-lg">The detailed profile - education, practice, tools and recognition - lives in one place.</p>
                  <Link href="/about" className="mt-8 inline-flex min-h-11 items-center border-t border-[#c09b68]/22 pt-5 font-mono text-[11px] uppercase tracking-[.17em] text-[#c09a67]/88 hover:text-[#ead6b3]">Open full profile ↗</Link>
                </div>
              </div>
            </motion.section>

            <motion.section aria-label="Contact" style={{ opacity: contactOpacity, y: contactY, filter: contactBlur }} className={`absolute inset-0 flex items-center ${activeStage === "contact" ? "pointer-events-auto" : "pointer-events-none"}`}>
              <div className="w-full border-t border-[#c09b68]/22 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#ae8d62]/78 md:text-[11px]">03 / Direction</p>
                <div className="py-14 md:py-20">
                  <p className="max-w-5xl text-[clamp(2.6rem,6vw,6.8rem)] font-medium leading-[.88] tracking-[-.06em] text-[#d9c4a2]">Interested in working together?</p>
                  <Link href="/contact" className="mt-8 inline-flex min-h-11 items-center text-[clamp(1.45rem,3.4vw,3.6rem)] font-light tracking-[-.04em] text-[#ead7b8] hover:opacity-60">Get in touch ↗</Link>
                </div>
                <div className="flex items-center justify-between border-t border-[#c09b68]/22 pt-5 font-mono text-[10px] uppercase tracking-[.17em] text-[#9b8060]/68 md:text-[11px]">
                  <span>{siteConfig.brand}</span>
                  <Link href="/work" className="hover:text-[#ead6b3]">Continue through work ↑</Link>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  );
}
