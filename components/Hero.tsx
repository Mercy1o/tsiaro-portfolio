"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/data/site";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 850], [0, reduceMotion ? 0 : 90]);
  const orbitY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -70]);

  return (
    <section className="space-field cinematic-grid relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y: orbitY }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-[47%] h-[58vw] min-h-[430px] w-[108vw] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="orbit h-full w-full"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="orbit absolute left-1/2 top-[47%] h-[34vw] min-h-[280px] w-[79vw] -translate-x-1/2 -translate-y-1/2 -rotate-12" />
        <div className="absolute right-[12%] top-[28%] h-1.5 w-1.5 rounded-full bg-bone shadow-[0_0_30px_rgba(240,238,232,.75)]" />
        <div className="absolute bottom-[21%] left-[16%] h-1 w-1 rounded-full bg-sand" />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pb-8 pt-32 md:px-10 md:pb-10 md:pt-36 lg:px-14">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[.22em] text-bone/45">{siteConfig.hero.eyebrow}</p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[.22em] text-bone/35 sm:block">{siteConfig.location}</p>
        </div>

        <div className="my-auto py-20">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 font-mono text-[10px] uppercase tracking-[.24em] text-sand"
          >
            {siteConfig.descriptor}
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .12 }}
            className="display-title max-w-[1450px] font-medium text-bone"
          >
            Tsiaro<br />Rakototiana
          </motion.h1>

          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .24 }}
              className="max-w-xl text-xl leading-snug text-bone md:col-span-5 md:text-2xl lg:text-3xl"
            >
              {siteConfig.hero.title}
            </motion.h2>
            <div className="md:col-span-4 md:col-start-8">
              <p className="max-w-md text-sm leading-6 text-bone/55 md:text-base md:leading-7">{siteConfig.hero.description}</p>
              <Link href="/work" className="mt-7 inline-flex items-center gap-4 text-xs uppercase tracking-[.16em] text-bone transition-opacity hover:opacity-55">
                Explore work <span aria-hidden="true">↘</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-5 font-mono text-[9px] uppercase tracking-[.2em] text-bone/30">
          <span>Selected work / 2019—2026</span>
          <span>Scroll / ↓</span>
        </div>
      </motion.div>
    </section>
  );
}
