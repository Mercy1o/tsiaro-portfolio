"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { siteConfig } from "@/data/site";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();

  const contentY = useTransform(
    scrollY,
    [0, 800],
    [0, reduceMotion ? 0 : 100],
  );

  const orbitY = useTransform(
    scrollY,
    [0, 900],
    [0, reduceMotion ? 0 : -70],
  );

  return (
    <section className="space-field cinematic-grid relative min-h-[100svh] overflow-hidden">
      {/* ORBITAL SYSTEM */}
      <motion.div
        style={{ y: orbitY }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[48%] h-[58vw] min-h-[430px] w-[105vw] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-full w-full rounded-[50%] border border-white/[0.09]"
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 90,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="absolute left-1/2 top-[48%] h-[35vw] min-h-[280px] w-[80vw] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] rounded-[50%] border border-sand/10" />

        <div className="absolute right-[12%] top-[29%] h-[5px] w-[5px] rounded-full bg-bone shadow-[0_0_28px_rgba(240,238,232,0.8)]" />

        <div className="absolute bottom-[22%] left-[17%] h-[3px] w-[3px] rounded-full bg-sand" />
      </motion.div>

      {/* HERO CONTENT */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pb-8 pt-32 md:px-10 md:pb-10 md:pt-36 lg:px-14"
      >
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="flex items-center justify-between"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/50">
            {siteConfig.hero.eyebrow}
          </p>

          <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40 sm:block">
            {siteConfig.location}
          </p>
        </motion.div>

        <div className="relative my-auto py-20">
          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-sand"
          >
            {siteConfig.descriptor}
          </motion.p>

          <motion.h1
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 40,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.16,
            }}
            className="max-w-[1350px] text-[clamp(3.8rem,10.5vw,10.5rem)] font-medium uppercase leading-[0.79] tracking-[-0.07em] text-bone"
          >
            Tsiaro
            <br />
            Rakototiana
          </motion.h1>

          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
            <motion.h2
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 22,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.28,
              }}
              className="max-w-xl text-xl leading-snug text-bone md:col-span-5 md:text-2xl lg:text-3xl"
            >
              {siteConfig.hero.title}
            </motion.h2>

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 22,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.36,
              }}
              className="md:col-span-4 md:col-start-8"
            >
              <p className="max-w-md text-sm leading-6 text-bone/55 md:text-base md:leading-7">
                {siteConfig.hero.description}
              </p>

              <a
                href="#work"
                className="mt-7 inline-flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-bone transition-opacity hover:opacity-60"
              >
                Explore work

                <span aria-hidden="true">↓</span>
              </a>
            </motion.div>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-5">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/35">
            Selected work / 2019—2026
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/35">
            Scroll / ↓
          </span>
        </div>
      </motion.div>
    </section>
  );
}