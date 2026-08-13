"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/data/site";
import AtmosphericTerrain from "@/components/AtmosphericTerrain";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 82]);
  const terrainY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -48]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#090806] text-bone">
      <motion.div style={{ y: terrainY }} className="absolute inset-0 scale-[1.05]">
        <AtmosphericTerrain variant="hybrid" tone="dark" showAnalysis />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,5,4,.12),rgba(6,5,4,.1)_42%,rgba(5,4,3,.64)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] bg-[linear-gradient(180deg,transparent,rgba(4,4,3,.86))]" />

      <motion.div
        style={{ y: titleY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32 lg:px-14"
      >
        <div className="grid grid-cols-2 gap-4 border-b border-bone/15 pb-4 font-mono text-[8px] uppercase tracking-[.23em] text-bone/48 md:grid-cols-4">
          <span>{siteConfig.hero.eyebrow}</span>
          <span className="hidden md:block">ARCHIVE / TERRAIN / MEMORY</span>
          <span className="hidden md:block md:text-center">43.6532° N / 79.3832° W</span>
          <span className="text-right">{siteConfig.location}</span>
        </div>

        <div className="my-auto grid gap-12 py-16 md:grid-cols-12 md:items-end md:py-24">
          <div className="md:col-span-8">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7 }}
              className="mb-5 font-mono text-[9px] uppercase tracking-[.28em] text-sand"
            >
              {siteConfig.descriptor}
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .08, duration: .9, ease: [0.22, 1, 0.36, 1] }}
              className="resonance-title max-w-[1200px] text-bone"
            >
              Tsiaro<br />Rakototiana
            </motion.h1>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .18, duration: .8 }}
            className="md:col-span-4 md:pb-2"
          >
            <p className="font-editorial max-w-lg text-[clamp(2rem,3vw,3.8rem)] leading-[.95] tracking-[-.035em] text-cream">
              Designing between matter, memory and the unknown.
            </p>
            <p className="mt-7 max-w-md text-sm leading-6 text-bone/56 md:text-base md:leading-7">
              {siteConfig.hero.description}
            </p>
            <Link
              href="/work"
              className="mt-8 inline-flex items-center gap-5 border-b border-sand/45 pb-2 font-mono text-[9px] uppercase tracking-[.2em] text-sand transition-colors hover:border-sand"
            >
              Enter the archive <span aria-hidden="true">↘</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-3 border-t border-bone/15 pt-4 font-mono text-[8px] uppercase tracking-[.22em] text-bone/38 sm:grid-cols-3">
          <span>01 / Architecture - measured terrain</span>
          <span className="sm:text-center">02 / Art - fluid memory</span>
          <span className="sm:text-right">Scroll to descend ↓</span>
        </div>
      </motion.div>
    </section>
  );
}
