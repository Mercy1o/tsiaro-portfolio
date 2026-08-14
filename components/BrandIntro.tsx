"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/data/site";

type Target = {
  left: number;
  top: number;
  fontSize: number;
};

export default function BrandIntro() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [target, setTarget] = useState<Target | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const [docked, setDocked] = useState(false);
  const returnTimer = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (pathname !== "/" || reduceMotion) return;

    const measure = () => {
      const node = document.querySelector<HTMLElement>("[data-brand-target]");
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const styles = window.getComputedStyle(node);

      setViewportWidth(window.innerWidth);
      setTarget({
        left: rect.left,
        top: rect.top + rect.height / 2,
        fontSize: Number.parseFloat(styles.fontSize) || 18,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname, reduceMotion]);

  useEffect(() => {
    if (pathname !== "/" || reduceMotion || !target) return;

    const clearReturnTimer = () => {
      if (returnTimer.current !== null) {
        window.clearTimeout(returnTimer.current);
        returnTimer.current = null;
      }
    };

    const onScroll = () => {
      const y = window.scrollY;

      if (y > 56) {
        clearReturnTimer();
        setDocked(true);
        return;
      }

      // The hero text follows a spring-smoothed scroll value, so it can still be
      // visually exiting after the browser has already reached scrollY = 0.
      // Keep the brand docked until that motion has fully settled.
      if (y <= 1 && docked && returnTimer.current === null) {
        returnTimer.current = window.setTimeout(() => {
          if (window.scrollY <= 1) {
            setDocked(false);
          }
          returnTimer.current = null;
        }, 1050);
      }
    };

    if (window.scrollY > 56) {
      setDocked(true);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearReturnTimer();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, reduceMotion, target, docked]);

  if (pathname !== "/" || reduceMotion || !target) return null;

  const largeFont = Math.min(Math.max(viewportWidth * 0.115, 68), 188);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <motion.div
        className="fixed whitespace-nowrap font-medium tracking-[-.055em] text-[#343633]"
        initial={false}
        animate={
          docked
            ? {
                left: target.left,
                top: target.top,
                x: 0,
                y: "-50%",
                fontSize: target.fontSize,
              }
            : {
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
                fontSize: largeFont,
              }
        }
        transition={{
          duration: docked ? 0.82 : 1.05,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {siteConfig.brand.split("").map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block"
            initial={{ opacity: 0, y: -72, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.64,
              delay: index * 0.065,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
