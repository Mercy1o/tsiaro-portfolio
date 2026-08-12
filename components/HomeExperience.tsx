"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import AtmosphericTerrain from "@/components/AtmosphericTerrain";
import { getProjectMedia } from "@/data/projectMedia";
import { profileFacts, siteConfig } from "@/data/site";

export default function HomeExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [field, setField] = useState<"architecture" | "creative" | null>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  const terrainScale = useTransform(scrollYProgress, [0, 1], [1.02, reduceMotion ? 1.02 : 1.12]);
  const terrainY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -54]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.17, 0.25], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, reduceMotion ? 0 : -90]);
  const choiceOpacity = useTransform(scrollYProgress, [0.16, 0.28, 0.48, 0.57], [0, 1, 1, 0]);
  const choiceY = useTransform(scrollYProgress, [0.18, 0.34, 0.54], [80, 0, -70]);
  const aboutOpacity = useTransform(scrollYProgress, [0.48, 0.59, 0.72, 0.8], [0, 1, 1, 0]);
  const aboutY = useTransform(scrollYProgress, [0.5, 0.64, 0.78], [70, 0, -60]);
  const contactOpacity = useTransform(scrollYProgress, [0.72, 0.84, 1], [0, 1, 1]);
  const contactY = useTransform(scrollYProgress, [0.73, 0.88], [60, 0]);
  const imageFieldOpacity = useTransform(scrollYProgress, [0.15, 0.28, 0.5, 0.62], [0, 0.95, 0.75, 0]);

  const architectureCover = getProjectMedia("hikari").cover;
  const creativeCover = getProjectMedia("the-smiling-wound").cover;

  return (
    <main ref={rootRef} className="relative bg-[#090806] text-[#d5c5aa]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale: terrainScale, y: terrainY }} className="absolute inset-0">
          <AtmosphericTerrain variant="hybrid" tone="dark" className="opacity-90" />
        </motion.div>

        <motion.div style={{ opacity: imageFieldOpacity }} className="absolute inset-0">
          <div
            className={`absolute inset-y-0 left-0 w-[72%] transition-opacity duration-700 ${field === "creative" ? "opacity-[.04]" : field === "architecture" ? "opacity-[.28]" : "opacity-[.14]"}`}
            style={{ WebkitMaskImage: "radial-gradient(ellipse at 35% 52%, black 0%, rgba(0,0,0,.86) 34%, transparent 72%)", maskImage: "radial-gradient(ellipse at 35% 52%, black 0%, rgba(0,0,0,.86) 34%, transparent 72%)" }}
          >
            <Image
              src={architectureCover}
              alt=""
              fill
              sizes="75vw"
              className="object-cover grayscale contrast-125 saturate-50"
            />
          </div>

          <div
            className={`absolute inset-y-0 right-0 w-[68%] transition-opacity duration-700 ${field === "architecture" ? "opacity-[.03]" : field === "creative" ? "opacity-[.26]" : "opacity-[.12]"}`}
            style={{ WebkitMaskImage: "radial-gradient(ellipse at 68% 50%, black 0%, rgba(0,0,0,.8) 30%, transparent 70%)", maskImage: "radial-gradient(ellipse at 68% 50%, black 0%, rgba(0,0,0,.8) 30%, transparent 70%)" }}
          >
            <Image
              src={creativeCover}
              alt=""
              fill
              sizes="70vw"
              className="object-cover grayscale contrast-125 saturate-50"
            />
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgba(8,7,6,.16)_35%,rgba(8,7,6,.62)_82%)]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#070706] via-[#070706]/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#070706] via-[#070706]/72 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#070706]/75 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#070706]/75 to-transparent" />
      </div>

      <div className="relative z-10 -mt-[100svh]">
        <section className="relative min-h-[150svh]">
          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="sticky top-0 flex h-[100svh] items-center px-5 pt-24 md:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="mb-10 flex items-center justify-between font-mono text-[8px] uppercase tracking-[.24em] text-[#aa8c63]/65">
                <span>{siteConfig.hero.eyebrow}</span>
                <span className="hidden sm:block">Terrain / memory / making</span>
              </div>

              <h1 className="max-w-[1500px] text-[clamp(4.4rem,11vw,11.8rem)] font-medium uppercase leading-[.76] tracking-[-.075em] text-[#d7c6a7]">
                Tsiaro<br />Rakototiana
              </h1>

              <div className="mt-10 grid gap-8 border-t border-[#ad8d61]/18 pt-7 md:grid-cols-12 md:items-end">
                <p className="max-w-3xl text-[clamp(1.8rem,3.6vw,4rem)] font-light leading-[.96] tracking-[-.045em] text-[#bca887] md:col-span-7">
                  Designing between matter, memory and the unknown.
                </p>
                <div className="md:col-span-4 md:col-start-9">
                  <p className="max-w-md text-sm leading-6 text-[#aa9a82]/66 md:text-base md:leading-7">
                    {siteConfig.hero.description}
                  </p>
                  <p className="mt-7 font-mono text-[8px] uppercase tracking-[.21em] text-[#9d815d]/55">Scroll to enter ↓</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative min-h-[150svh]">
          <motion.div style={{ opacity: choiceOpacity, y: choiceY }} className="sticky top-0 flex h-[100svh] items-center px-5 pt-20 md:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="mb-14 flex items-center justify-between font-mono text-[8px] uppercase tracking-[.23em] text-[#aa8c63]/55">
                <span>01 / Choose a field</span>
                <span>One practice / two readings</span>
              </div>

              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
                <Link
                  href="/work?portfolio=architecture"
                  onMouseEnter={() => setField("architecture")}
                  onMouseLeave={() => setField(null)}
                  onFocus={() => setField("architecture")}
                  onBlur={() => setField(null)}
                  className="group block py-8 md:py-14"
                >
                  <p className="mb-5 font-mono text-[8px] uppercase tracking-[.2em] text-[#a98758]/66">01 / measured terrain</p>
                  <h2 className="text-[clamp(3.5rem,7.8vw,8.6rem)] font-medium uppercase leading-[.78] tracking-[-.065em] text-[#b8a386]/58 transition-all duration-700 group-hover:text-[#d5c09a]">
                    Architecture
                  </h2>
                  <p className="mt-7 max-w-md text-sm leading-6 text-[#9c8d77]/56 md:text-base">
                    Space, systems, site evidence, technical development and professional work.
                  </p>
                </Link>

                <div className="hidden h-40 w-px bg-gradient-to-b from-transparent via-[#a98758]/30 to-transparent md:block" />

                <Link
                  href="/work?portfolio=creative"
                  onMouseEnter={() => setField("creative")}
                  onMouseLeave={() => setField(null)}
                  onFocus={() => setField("creative")}
                  onBlur={() => setField(null)}
                  className="group block py-8 text-left md:py-14 md:text-right"
                >
                  <p className="mb-5 font-mono text-[8px] uppercase tracking-[.2em] text-[#a98758]/66">02 / fluid memory</p>
                  <h2 className="text-[clamp(3.5rem,7.8vw,8.6rem)] font-medium uppercase leading-[.78] tracking-[-.065em] text-[#b8a386]/58 transition-all duration-700 group-hover:text-[#d5c09a]">
                    Creative
                  </h2>
                  <p className="mt-7 max-w-md text-sm leading-6 text-[#9c8d77]/56 md:ml-auto md:text-base">
                    Drawing, ceramics, collage, material experiments and personal visual work.
                  </p>
                </Link>
              </div>

              <div className="mt-14 flex items-center justify-between border-t border-[#ad8d61]/16 pt-5 font-mono text-[8px] uppercase tracking-[.2em] text-[#92795a]/45">
                <span>Move across the field</span>
                <span>Both belong to the same archive ↘</span>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative min-h-[135svh]">
          <motion.div style={{ opacity: aboutOpacity, y: aboutY }} className="sticky top-0 flex h-[100svh] items-center px-5 pt-20 md:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="grid gap-12 md:grid-cols-12 md:items-end">
                <div className="md:col-span-3">
                  <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#a98758]/58">02 / Profile / field notes</p>
                </div>
                <div className="md:col-span-8 md:col-start-5">
                  <h2 className="max-w-5xl text-[clamp(3rem,6.5vw,7rem)] font-medium leading-[.9] tracking-[-.055em] text-[#c9b595]">
                    Architecture is one layer of how I create.
                  </h2>
                  <p className="mt-8 max-w-3xl text-base leading-7 text-[#a99a82]/63 md:text-lg md:leading-8">
                    {siteConfig.about.description}
                  </p>
                </div>
              </div>

              <div className="mt-16 grid gap-y-8 border-t border-[#ad8d61]/16 pt-8 md:grid-cols-3 md:gap-x-10">
                {profileFacts.map((fact, index) => (
                  <div key={fact.label}>
                    <p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#947a58]/50">0{index + 1} / {fact.label}</p>
                    <p className="mt-5 text-xl font-medium tracking-[-.035em] text-[#bba888] md:text-2xl">{fact.value}</p>
                    <p className="mt-2 text-sm text-[#928573]/55">{fact.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-right">
                <Link href="/about" className="font-mono text-[8px] uppercase tracking-[.2em] text-[#a98758]/66 transition-colors hover:text-[#d0b88f]">Open full profile ↗</Link>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative min-h-[125svh]">
          <motion.div style={{ opacity: contactOpacity, y: contactY }} className="sticky top-0 flex h-[100svh] items-center px-5 pt-20 md:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[1600px]">
              <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#a98758]/58">03 / Open channel</p>
              <h2 className="mt-8 max-w-[1450px] text-[clamp(4rem,10vw,10.5rem)] font-medium uppercase leading-[.78] tracking-[-.07em] text-[#cfba98]">
                Let&apos;s create<br />what comes next.
              </h2>

              <div className="mt-12 grid gap-8 border-t border-[#ad8d61]/18 pt-7 md:grid-cols-12">
                <p className="max-w-md text-sm leading-6 text-[#a99a82]/62 md:col-span-4 md:text-base">
                  Opportunities, collaborations, project conversations and portfolio enquiries.
                </p>
                <div className="md:col-span-4 md:col-start-7">
                  <a href={`mailto:${siteConfig.email}`} className="text-base text-[#c3ae8d] transition-colors hover:text-[#d8c09a]">
                    {siteConfig.email}
                  </a>
                  <div className="mt-4 flex gap-6 font-mono text-[8px] uppercase tracking-[.18em] text-[#987d59]/58">
                    <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                    <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
                  </div>
                </div>
                <div className="md:col-span-2 md:col-start-11 md:text-right">
                  <Link href="/contact" className="font-mono text-[8px] uppercase tracking-[.2em] text-[#a98758]/66 transition-colors hover:text-[#d0b88f]">Contact ↗</Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
