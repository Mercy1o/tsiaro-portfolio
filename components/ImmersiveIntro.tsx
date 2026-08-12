"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import MathematicalWindField from "@/components/MathematicalWindField";
import CelestialAtmosphere from "@/components/CelestialAtmosphere";

export default function ImmersiveIntro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
      root.style.overflow = previousOverflow;
    }, reduceMotion ? 160 : 6800);

    return () => {
      window.clearTimeout(timer);
      root.style.overflow = previousOverflow;
    };
  }, [reduceMotion]);

  function closeIntro() {
    setVisible(false);
    document.documentElement.style.overflow = "";
  }

  return (
    <AnimatePresence>
      {visible ? (
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
                  scale: 1.025,
                  filter: "blur(5px)",
                }
          }
          transition={{ duration: reduceMotion ? 0.14 : 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <CelestialAtmosphere />
          <MathematicalWindField intensity="strong" className="opacity-90" />

          <motion.div
            className="absolute left-1/2 top-[58%] h-[62vw] max-h-[780px] w-[62vw] max-w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e4d1af]/10"
            initial={{ scale: 0.64, opacity: 0, rotate: -5 }}
            animate={
              reduceMotion
                ? { opacity: 0.12 }
                : { scale: [0.64, 0.96, 1.05], opacity: [0, 0.2, 0.045], rotate: [-5, -0.8, 0.8] }
            }
            transition={{ duration: 5.4, times: [0, 0.52, 1], ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="absolute left-1/2 top-[58%] h-px w-[68vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ead8b8]/55 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 0.18 } : { scaleX: [0, 1, 0.8], opacity: [0, 0.68, 0.2] }}
            transition={{ duration: 5.1, times: [0, 0.6, 1], ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-7 md:px-10 md:py-9 lg:px-14">
            <motion.div
              className="flex items-start justify-between gap-6 font-mono text-[10px] uppercase tracking-[.2em] text-[#b8a17e]/70 md:text-[11px]"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.18, duration: 0.85 }}
            >
              <p>TR / FIELD / 2026</p>
              <p className="text-right">wind 04.82 / stable</p>
            </motion.div>

            <div className="relative mx-auto w-full max-w-[1600px]">
              <motion.p
                className="mb-5 font-mono text-[10px] uppercase tracking-[.26em] text-[#c0a477]/68 md:text-[11px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0, 1], y: [8, 0] }}
                transition={{ delay: reduceMotion ? 0 : 0.65, duration: 0.9 }}
              >
                terrain / memory / signal
              </motion.p>

              <motion.h1
                className="max-w-[1220px] text-[clamp(4rem,9.2vw,9.4rem)] font-medium uppercase leading-[.77] tracking-[-.07em] text-[#dac4a0]"
                initial={{ opacity: 0, y: 38, filter: "blur(14px)" }}
                animate={
                  reduceMotion
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {
                        opacity: [0, 0.62, 1],
                        y: [38, 14, 0],
                        filter: ["blur(14px)", "blur(5px)", "blur(0px)"],
                      }
                }
                transition={{ delay: reduceMotion ? 0 : 1.1, duration: 2.25, times: [0, 0.58, 1], ease: [0.22, 1, 0.36, 1] }}
              >
                Tsiaro<br />Rakototiana
              </motion.h1>

              <motion.div
                className="mt-7 flex max-w-3xl items-center gap-4 border-t border-[#c9a56e]/18 pt-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 2.65, duration: 0.9 }}
              >
                <span className="h-px w-10 bg-[#c6a36f]/48" />
                <p className="font-mono text-[10px] uppercase tracking-[.17em] text-[#b9a07b]/70 md:text-[11px]">
                  architecture / art / making
                </p>
              </motion.div>
            </div>

            <motion.div
              className="flex items-end justify-between gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 3.6, duration: 1 }}
            >
              <div className="font-mono text-[9px] uppercase leading-5 tracking-[.18em] text-[#8f7b5f]/58 md:text-[10px]">
                <p>∇ field resolved</p>
                <p>Σ layers / 07</p>
              </div>

              <button
                type="button"
                onClick={closeIntro}
                className="border-b border-[#c4a16b]/38 pb-1 font-mono text-[10px] uppercase tracking-[.18em] text-[#c4aa80]/80 transition-colors hover:text-[#f0dfc1] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c4a16b] md:text-[11px]"
              >
                Enter archive ↘
              </button>
            </motion.div>
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-transparent via-[#e0bd83]/78 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.1 : 5.8, ease: "linear" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
