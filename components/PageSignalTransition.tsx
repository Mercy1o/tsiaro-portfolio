"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export default function PageSignalTransition() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[120] overflow-hidden bg-[#080706]"
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }
        }
        animate={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, clipPath: "inset(49.7% 0% 49.7% 0%)" }
        }
        transition={{ duration: reduceMotion ? 0.01 : 0.92, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,148,100,.12),transparent_28%),linear-gradient(180deg,#090806,#070706)]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#b89464]/35 to-transparent" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#d0ae77]/70 to-transparent" />
        <div className="absolute left-[8%] top-[14%] font-mono text-[9px] uppercase tracking-[.2em] text-[#9a7e5a]/45">
          Route / {pathname === "/" ? "archive" : pathname.replaceAll("/", " ").trim()}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
