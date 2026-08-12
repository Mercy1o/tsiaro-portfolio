"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import RealtimeWindThreads from "@/components/RealtimeWindThreads";

const AUTO_SCROLL_DURATION = 6200;
const AUTO_SCROLL_DELAY = 240;

function cinematicEase(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

export default function CinematicUniverseIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  // We move the artwork itself instead of moving a cropped background.
  // On desktop the full vertical image is wider than the viewport and therefore
  // extends several screens in height. The translation reveals it from top to bottom.
  const sceneY = useTransform(
    scrollYProgress,
    [0, 0.08, 0.26, 0.52, 0.78, 1],
    ["0%", "-2%", "-15%", "-34%", "-53%", "-66%"],
  );
  const sceneScale = useTransform(scrollYProgress, [0, 0.55, 1], [1.015, 1.006, 1]);

  // Keep the first view almost text-free. The main name enters only after the
  // visitor has begun the descent, roughly after two small wheel movements.
  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.055, 0.105, 0.225, 0.315],
    [0, 0, 1, 1, 0],
  );
  const introY = useTransform(
    scrollYProgress,
    [0.055, 0.105, 0.315],
    [30, 0, -30],
  );

  const fieldOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.36, 0.52, 0.64],
    [0, 1, 1, 0],
  );
  const fieldY = useTransform(scrollYProgress, [0.25, 0.64], [34, -34]);

  const planetOpacity = useTransform(
    scrollYProgress,
    [0.56, 0.68, 0.84, 0.93],
    [0, 1, 1, 0],
  );
  const planetY = useTransform(scrollYProgress, [0.56, 0.93], [34, -28]);

  const groundOpacity = useTransform(scrollYProgress, [0.82, 0.93, 1], [0, 1, 1]);
  const groundY = useTransform(scrollYProgress, [0.82, 1], [28, 0]);

  const windOpacity = useTransform(scrollYProgress, [0, 0.22, 0.68, 1], [0.14, 0.24, 0.4, 0.28]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.36, 0.8, 1], [0.32, 0.12, 0.1, 0.2]);

  useEffect(() => {
    if (reduceMotion) return;

    const root = rootRef.current;
    if (!root || window.scrollY > 32) return;

    let animationFrame = 0;
    let timeoutId = 0;
    let cancelled = false;

    const cancelAutoScroll = () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeoutId);
    };

    const startAutoScroll = () => {
      if (cancelled || !rootRef.current) return;

      const startY = window.scrollY;
      const rootTop = rootRef.current.getBoundingClientRect().top + window.scrollY;
      const targetY = rootTop + rootRef.current.offsetHeight - window.innerHeight;
      const distance = Math.max(0, targetY - startY);
      const startedAt = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;

        const elapsed = now - startedAt;
        const progress = Math.min(1, elapsed / AUTO_SCROLL_DURATION);
        const eased = cinematicEase(progress);
        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(tick);
        }
      };

      animationFrame = window.requestAnimationFrame(tick);
    };

    timeoutId = window.setTimeout(startAutoScroll, AUTO_SCROLL_DELAY);

    const interruptEvents: (keyof WindowEventMap)[] = [
      "wheel",
      "touchstart",
      "pointerdown",
      "keydown",
    ];

    interruptEvents.forEach((eventName) => {
      window.addEventListener(eventName, cancelAutoScroll, { passive: true, once: true });
    });

    return () => {
      cancelAutoScroll();
      interruptEvents.forEach((eventName) => {
        window.removeEventListener(eventName, cancelAutoScroll);
      });
    };
  }, [reduceMotion]);

  return (
    <section
      ref={rootRef}
      aria-label="Cinematic descent through the portfolio universe"
      className="relative h-[520svh] bg-[#070706]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#070706]">
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-0 w-[100vw] min-w-[65svh] -translate-x-1/2 will-change-transform max-md:w-[145vw]"
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
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_0%,rgba(7,7,6,.015)_54%,rgba(7,7,6,.56)_100%)]"
          style={{ opacity: vignetteOpacity }}
        />

        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[14vh] bg-gradient-to-b from-[#070706]/28 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[14vh] bg-gradient-to-t from-[#070706]/24 to-transparent" />

        <div className="pointer-events-none absolute inset-0 z-10 px-5 pt-24 md:px-10 md:pt-28 lg:px-14">
          <div className="mx-auto h-full w-full max-w-[1600px]">
            <motion.div
              style={{ opacity: introOpacity, y: introY }}
              className="absolute left-5 top-[18vh] max-w-[920px] md:left-10 lg:left-14"
            >
              <p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#d5c09a]/72 md:text-[11px]">
                00 / Deep field / Toronto 2026
              </p>
              <h1 className="mt-5 text-[clamp(3.6rem,9vw,9.5rem)] font-medium uppercase leading-[.78] tracking-[-.065em] text-[#eadbc1] [text-shadow:0_2px_30px_rgba(7,7,6,.52)]">
                Tsiaro<br />Rakototiana
              </h1>
              <p className="mt-7 max-w-xl text-[clamp(1.2rem,2vw,2rem)] font-light leading-[1.08] tracking-[-.025em] text-[#d4c19f]">
                Architecture, making and visual exploration across one continuous world.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: fieldOpacity, y: fieldY }}
              className="absolute right-5 top-[26vh] max-w-xl text-right md:right-10 lg:right-14"
            >
              <p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#d6bd91]/72 md:text-[11px]">
                01 / Stellar field
              </p>
              <p className="mt-5 text-[clamp(2.4rem,5vw,5.8rem)] font-medium uppercase leading-[.86] tracking-[-.055em] text-[#eadbc1] [text-shadow:0_2px_28px_rgba(7,7,6,.62)]">
                Between<br />structure<br />and memory
              </p>
              <p className="ml-auto mt-6 max-w-md text-[15px] leading-7 text-[#c7b79d] md:text-base">
                A field where technical discipline and personal experimentation occupy the same orbit.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: planetOpacity, y: planetY }}
              className="absolute left-5 top-[52vh] max-w-2xl md:left-10 lg:left-14"
            >
              <p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#d6bd91]/72 md:text-[11px]">
                02 / Approaching terrain
              </p>
              <p className="mt-5 text-[clamp(2.6rem,5.8vw,6.5rem)] font-medium uppercase leading-[.84] tracking-[-.06em] text-[#eadbc1] [text-shadow:0_2px_30px_rgba(7,7,6,.65)]">
                Designing<br />the unknown
              </p>
              <p className="mt-6 max-w-lg text-[15px] leading-7 text-[#c7b79d] md:text-base">
                Read the site, trace the system, then push beyond what is already visible.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: groundOpacity, y: groundY }}
              className="absolute bottom-[11vh] right-5 max-w-xl text-right md:right-10 lg:right-14"
            >
              <p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#d6bd91]/72 md:text-[11px]">
                03 / Ground contact
              </p>
              <p className="mt-4 text-[clamp(2.3rem,5vw,5.5rem)] font-medium uppercase leading-[.86] tracking-[-.055em] text-[#eadbc1] [text-shadow:0_2px_28px_rgba(7,7,6,.7)]">
                Enter<br />the archive
              </p>
              <p className="ml-auto mt-5 max-w-sm font-mono text-[10px] uppercase tracking-[.18em] text-[#d5c09a]/78 md:text-[11px]">
                Continue scrolling ↓
              </p>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-5 z-20 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.18em] text-[#d8c6a8]/58 md:bottom-8 md:left-10 md:text-[11px]">
          <span className="h-px w-10 bg-[#d8c6a8]/28" />
          <span>automatic descent / interrupt anytime</span>
        </div>
      </div>
    </section>
  );
}
