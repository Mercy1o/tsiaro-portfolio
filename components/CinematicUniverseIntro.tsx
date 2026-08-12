"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import RealtimeWindThreads from "@/components/RealtimeWindThreads";

const AUTO_SCROLL_DURATION = 5600;
const AUTO_SCROLL_DELAY = 180;

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

  // The vertical image starts in deep space, pauses around the two small suns,
  // then travels through the stellar field toward the main planet and ground.
  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.34, 0.68, 0.88, 1],
    ["0%", "4%", "24%", "61%", "86%", "100%"],
  );
  const sceneScale = useTransform(scrollYProgress, [0, 0.52, 1], [1.035, 1.015, 1]);
  const windOpacity = useTransform(scrollYProgress, [0, 0.2, 0.72, 1], [0.18, 0.32, 0.48, 0.28]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.35, 0.8, 1], [0.52, 0.24, 0.18, 0.32]);

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
      className="relative h-[430svh] bg-[#070706]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#070706]">
        {/* Fallback scene remains visible until the new vertical artwork is added. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: 'url("/images/site/universe-4k.png")' }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-[background-position,transform]"
          style={{
            backgroundImage: 'url("/images/site/universe-vertical.png")',
            backgroundPositionY,
            scale: sceneScale,
          }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-screen"
          style={{ opacity: windOpacity }}
        >
          <RealtimeWindThreads strength="normal" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_0%,rgba(7,7,6,.04)_52%,rgba(7,7,6,.72)_100%)]"
          style={{ opacity: vignetteOpacity }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[18vh] bg-gradient-to-b from-[#070706]/34 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-t from-[#070706]/30 to-transparent"
        />

        <div className="pointer-events-none absolute bottom-6 right-5 z-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.18em] text-[#d8c6a8]/58 md:bottom-8 md:right-10 md:text-[11px]">
          <span className="h-px w-10 bg-[#d8c6a8]/28" />
          <span>stellar descent</span>
        </div>
      </div>
    </section>
  );
}
