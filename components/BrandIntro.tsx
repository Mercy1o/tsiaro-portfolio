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

function getBrowserZoom() {
  if (typeof window === "undefined") return 1;

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer) return 1;

  const viewportWidth = window.visualViewport?.width || window.innerWidth;
  if (!viewportWidth || !window.outerWidth) return 1;

  return Math.min(Math.max(window.outerWidth / viewportWidth, 0.35), 4);
}

export default function BrandIntro() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [target, setTarget] = useState<Target | null>(null);
  const [zoomFactor, setZoomFactor] = useState(1);
  const [visualViewportWidth, setVisualViewportWidth] = useState(1200);
  const [docked, setDocked] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (pathname !== "/") return;

    let frame = 0;
    let resizeObserver: ResizeObserver | null = null;

    const measure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const node = document.querySelector<HTMLElement>("[data-brand-target]");
        if (!node) return;

        targetRef.current = node;
        const rect = node.getBoundingClientRect();
        const styles = window.getComputedStyle(node);
        const zoom = getBrowserZoom();

        setZoomFactor(zoom);
        setVisualViewportWidth(window.innerWidth * zoom);
        setTarget({
          left: rect.left,
          top: rect.top + rect.height / 2,
          fontSize: (Number.parseFloat(styles.fontSize) || 18) / zoom,
        });
      });
    };

    measure();

    const node = document.querySelector<HTMLElement>("[data-brand-target]");
    if (node && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(node);
    }

    window.addEventListener("resize", measure, { passive: true });
    window.visualViewport?.addEventListener("resize", measure, { passive: true });

    document.fonts?.ready.then(measure).catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setDocked(false);
      return;
    }

    if (reduceMotion) {
      setDocked(true);
      return;
    }

    setDocked(false);
    const timer = window.setTimeout(() => {
      setDocked(true);
    }, 1050);

    return () => window.clearTimeout(timer);
  }, [pathname, reduceMotion]);

  if (pathname !== "/" || !target) return null;

  const introVisualSize = Math.min(Math.max(visualViewportWidth * 0.115, 68), 188);
  const largeFont = introVisualSize / zoomFactor;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <motion.div
        className="accent-brown fixed whitespace-nowrap font-medium tracking-[-.055em] will-change-[left,top,font-size,transform]"
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
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: docked ? 72 : 34,
                damping: docked ? 22 : 28,
                mass: docked ? 0.9 : 1.35,
                restDelta: 0.08,
                restSpeed: 0.08,
              }
        }
      >
        {siteConfig.brand.split("").map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="accent-brown inline-block"
            initial={reduceMotion ? false : { opacity: 0, y: -72, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.64,
                    delay: index * 0.065,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
