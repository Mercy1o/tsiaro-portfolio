"use client";

import { useEffect, useLayoutEffect, useState } from "react";
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
  const [phase, setPhase] = useState<"letters" | "hold" | "dock" | "done">("done");

  useLayoutEffect(() => {
    if (pathname !== "/" || reduceMotion) {
      document.documentElement.removeAttribute("data-brand-intro");
      setPhase("done");
      return;
    }

    const measure = () => {
      const node = document.querySelector<HTMLElement>("[data-brand-target]");
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const styles = window.getComputedStyle(node);
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

    document.documentElement.setAttribute("data-brand-intro", "active");
    setPhase("letters");

    const hold = window.setTimeout(() => setPhase("hold"), 900);
    const dock = window.setTimeout(() => setPhase("dock"), 1450);
    const done = window.setTimeout(() => {
      setPhase("done");
      document.documentElement.removeAttribute("data-brand-intro");
    }, 2850);

    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(dock);
      window.clearTimeout(done);
      document.documentElement.removeAttribute("data-brand-intro");
    };
  }, [pathname, reduceMotion, target]);

  if (pathname !== "/" || reduceMotion || !target || phase === "done") return null;

  const largeFont = Math.min(Math.max(window.innerWidth * 0.115, 68), 188);
  const docked = phase === "dock";

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
          duration: docked ? 1.15 : 0.01,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {siteConfig.brand.split("").map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block"
            initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.58,
              delay: index * 0.055,
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
