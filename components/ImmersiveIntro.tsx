"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MathematicalWindField from "@/components/MathematicalWindField";

export default function ImmersiveIntro() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(pathname === "/");

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    setVisible(true);
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
      root.style.overflow = previousOverflow;
    }, reduceMotion ? 120 : 4700);

    return () => {
      window.clearTimeout(timer);
      root.style.overflow = previousOverflow;
    };
  }, [pathname, reduceMotion]);

  function closeIntro() {
    setVisible(false);
    document.documentElement.style.overflow = "";
  }

  return (
    <AnimatePresence>
      {visible && pathname === "/" ? (
        <motion.div
          key="immersive-entry"
          className="fixed inset-0 z-[200] overflow-hidden bg-[#070706] text-[#d4bd96]"
          initial={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  clipPath: "inset(49.85% 0% 49.85% 0%)",
                  filter: "blur(5px)",
                }
          }
          transition={{ duration: reduceMotion ? 0.12 : 1.15, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(161,116,63,.13),transparent_24%),radial-gradient(circle_at_70%_22%,rgba(186,146,92,.07),transparent_16%),linear-gradient(180deg,#0b0907_0%,#070706_58%,#0b0907_100%)]" />
          <MathematicalWindField intensity="strong" />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[46vw] max-h-[620px] w-[46vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b89464]/12"
            initial={{ scale: 0.42, opacity: 0, rotate: -8 }}
            animate={reduceMotion ? { opacity: 0.25 } : { scale: [0.42, 1, 1.06], opacity: [0, 0.32, 0.08], rotate: [-8, 0, 2] }}
            transition={{ duration: 3.9, times: [0, 0.56, 1], ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 h-px w-[72vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d2b37d]/72 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 0.28 } : { scaleX: [0, 1, 0.4], opacity: [0, 1, 0.32] }}
            transition={{ duration: 3.6, times: [0, 0.34, 1], ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-7 md:px-10 md:py-9 lg:px-14">
            <motion.div
              className="flex items-start justify-between gap-6 font-mono text-[10px] uppercase tracking-[.2em] text-[#ad8f67]/72 md:text-[11px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.22, duration: 0.8 }}
            >
              <div>
                <p>TR / FIELD SYSTEM / 2026</p>
                <p className="mt-2 text-[#7e6a50]/60">Initializing spatial archive</p>
              </div>
              <div className="text-right">
                <p>Signal / stable</p>
                <p className="mt-2 text-[#7e6a50]/60">Wind vector / 04.82</p>
              </div>
            </motion.div>

            <div className="relative mx-auto w-full max-w-[1600px]">
              <motion.p
                className="font-mono text-[10px] uppercase tracking-[.24em] text-[#b89464]/72 md:text-[11px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1] }}
                transition={{ duration: 1.6, times: [0, 0.45, 1] }}
              >
                Terrain / memory / signal
              </motion.p>

              <motion.h1
                className="mt-5 max-w-[1500px] text-[clamp(4rem,11vw,11.5rem)] font-medium uppercase leading-[.74] tracking-[-.075em] text-[#d6bf99]"
                initial={{ opacity: 0, y: 60, letterSpacing: "-.02em", filter: "blur(14px)" }}
                animate={
                  reduceMotion
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {
                        opacity: [0, 0, 1],
                        y: [60, 28, 0],
                        letterSpacing: ["-.02em", "-.04em", "-.075em"],
                        filter: ["blur(14px)", "blur(7px)", "blur(0px)"],
                      }
                }
                transition={{ duration: 2.7, times: [0, 0.46, 1], ease: [0.22, 1, 0.36, 1] }}
              >
                Tsiaro<br />Rakototiana
              </motion.h1>

              <motion.div
                className="mt-8 grid gap-6 border-t border-[#b89464]/18 pt-5 md:grid-cols-12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 2.15, duration: 1 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#a88b65]/70 md:col-span-4 md:text-[11px]">
                  The archive is not a page.<br />It is a terrain.
                </p>
                <p className="max-w-xl text-sm leading-6 text-[#a99a82]/68 md:col-span-4 md:col-start-9 md:text-base">
                  Architecture, art and making converge inside one continuous field.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="flex items-end justify-between gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 1.3, duration: 1.2 }}
            >
              <div className="font-mono text-[9px] uppercase leading-5 tracking-[.18em] text-[#806b50]/55 md:text-[10px]">
                <p>∇ field resolved / 98.4%</p>
                <p>Σ layers / 07</p>
              </div>

              <button
                type="button"
                onClick={closeIntro}
                className="border-b border-[#b89464]/30 pb-1 font-mono text-[10px] uppercase tracking-[.18em] text-[#b59a72]/72 transition-colors hover:text-[#dbc49d] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#b89464] md:text-[11px]"
              >
                Enter archive ↘
              </button>
            </motion.div>
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#6f4c2e] via-[#d5b579] to-[#6f4c2e]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0.1 : 4.15, ease: "linear" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
