"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/data/site";
import TopographicField from "@/components/TopographicField";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 92]);
  const topoY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -62]);

  return (
    <section className="chroma-field relative min-h-[100svh] overflow-hidden text-white">
      <motion.div style={{ y: topoY }} className="absolute inset-0 opacity-35">
        <TopographicField warm={false} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,8,.06),rgba(5,5,8,.18)_48%,rgba(5,5,8,.5))]" />

      <motion.div
        style={{ y: titleY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32 lg:px-14"
      >
        <div className="flex items-center justify-between border-b border-white/20 pb-4 font-mono text-[9px] uppercase tracking-[.22em] text-white/65">
          <span>{siteConfig.hero.eyebrow}</span>
          <span className="hidden sm:block">{siteConfig.location}</span>
        </div>

        <div className="my-auto py-16 md:py-24">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className="mb-5 font-mono text-[9px] uppercase tracking-[.28em] text-white/70"
          >
            {siteConfig.descriptor}
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .08, duration: .9, ease: [0.22, 1, 0.36, 1] }}
            className="resonance-title max-w-[1500px] text-white"
          >
            Tsiaro<br />Rakototiana
          </motion.h1>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .18, duration: .8 }}
              className="md:col-span-6"
            >
              <p className="font-editorial max-w-3xl text-[clamp(2.1rem,4vw,4.6rem)] leading-[.94] tracking-[-.035em] text-cream">
                Designing between matter, memory and the unknown.
              </p>
            </motion.div>

            <div className="md:col-span-4 md:col-start-9">
              <p className="max-w-md text-sm leading-6 text-white/72 md:text-base md:leading-7">
                {siteConfig.hero.description}
              </p>
              <Link
                href="/work"
                className="mt-7 inline-flex items-center gap-5 border-b border-white/30 pb-2 font-mono text-[10px] uppercase tracking-[.18em] text-white transition-colors hover:border-white"
              >
                Enter the archive <span aria-hidden="true">↘</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-3 border-t border-white/20 pt-4 font-mono text-[8px] uppercase tracking-[.22em] text-white/55 sm:grid-cols-3">
          <span>01 / Architecture</span>
          <span className="sm:text-center">02 / Art & making</span>
          <span className="sm:text-right">Scroll to explore ↓</span>
        </div>
      </motion.div>
    </section>
  );
}
