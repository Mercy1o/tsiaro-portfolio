"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MathematicalWindField from "@/components/MathematicalWindField";
import CelestialAtmosphere from "@/components/CelestialAtmosphere";

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
    }, reduceMotion ? 160 : 9800);

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
          className="fixed inset-0 z-[200] overflow-hidden bg-[#070706] text-[#d1ba94]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 1.035,
                  filter: "blur(7px)",
                }
          }
          transition={{ duration: reduceMotion ? 0.14 : 1.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <CelestialAtmosphere />
          <MathematicalWindField intensity="strong" className="opacity-80" />

          <motion.div
            className="absolute left-1/2 top-[58%] h-[62vw] max-h-[780px] w-[62vw] max-w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8c5a4]/8"
            initial={{ scale: 0.52, opacity: 0, rotate: -7 }}
            animate={
              reduceMotion
                ? { opacity: 0.12 }
                : { scale: [0.52, 0.92, 1.04, 1.08], opacity: [0, 0.2, 0.1, 0.04], rotate: [-7, -2, 0.5, 1.5] }
            }
            transition={{ duration: 8.2, times: [0, 0.34, 0.72, 1], ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="absolute left-1/2 top-[58%] h-px w-[68vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d8c5a4]/48 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 0.18 } : { scaleX: [0, 0.55, 1, 0.72], opacity: [0, 0.26, 0.62, 0.18] }}
            transition={{ duration: 8.4, times: [0, 0.25, 0.64, 1], ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-7 md:px-10 md:py-9 lg:px-14">
            <motion.div
              className="flex items-start justify-between gap-6 font-mono text-[10px] uppercase tracking-[.2em] text-[#ad9875]/62 md:text-[11px]"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.55, duration: 1.4 }}
            >
              <p>TR / FIELD / 2026</p>
              <p className="text-right">wind 04.82 / stable</p>
            </motion.div>

            <div className="relative mx-auto w-full max-w-[1600px]">
              <motion.p
                className="mb-5 font-mono text-[10px] uppercase tracking-[.26em] text-[#b99b70]/60 md:text-[11px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0, 0, 1], y: [8, 8, 0] }}
                transition={{ duration: 3.6, times: [0, 0.56, 1] }}
              >
                terrain / memory / signal
              </motion.p>

              <motion.h1
                className="max-w-[1350px] text-[clamp(4.2rem,10.5vw,10.8rem)] font-medium uppercase leading-[.74] tracking-[-.075em] text-[#d4be98]"
                initial={{ opacity: 0, y: 52, filter: "blur(18px)" }}
                animate={
                  reduceMotion
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {
                        opacity: [0, 0, 0.5, 1],
                        y: [52, 52, 22, 0],
                        filter: ["blur(18px)", "blur(18px)", "blur(8px)", "blur(0px)"],
                      }
                }
                transition={{ duration: 5.6, times: [0, 0.28, 0.64, 1], ease: [0.22, 1, 0.36, 1] }}
              >
                Tsiaro<br />Rakototiana
              </motion.h1>

              <motion.div
                className="mt-7 flex max-w-3xl items-center gap-4 border-t border-[#b89464]/14 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 5.1, duration: 1.6 }}
              >
                <span className="h-px w-10 bg-[#b89464]/38" />
                <p className="font-mono text-[10px] uppercase tracking-[.17em] text-[#aa9370]/62 md:text-[11px]">
                  architecture / art / making
                </p>
              </motion.div>
            </div>

            <motion.div
              className="flex items-end justify-between gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 6.1, duration: 1.5 }}
            >
              <div className="font-mono text-[9px] uppercase leading-5 tracking-[.18em] text-[#7f6d54]/52 md:text-[10px]">
                <p>∇ field resolved</p>
                <p>Σ layers / 07</p>
              </div>

              <button
                type="button"
                onClick={closeIntro}
                className="border-b border-[#b89464]/28 pb-1 font-mono text-[10px] uppercase tracking-[.18em] text-[#baa078]/68 transition-colors hover:text-[#dec9a5] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#b89464] md:text-[11px]"
              >
                Enter archive ↘
              </button>
            </motion.div>
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-transparent via-[#d3b57d]/72 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.1 : 8.6, ease: "linear" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
