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

  const terrainScale = useTransform(scrollYProgress, [0, 1], [1.02, reduceMotion ? 1.02 : 1.1]);
  const terrainY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -42]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.17, 0.25], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, reduceMotion ? 0 : -74]);
  const choiceOpacity = useTransform(scrollYProgress, [0.16, 0.28, 0.48, 0.57], [0, 1, 1, 0]);
  const choiceY = useTransform(scrollYProgress, [0.18, 0.34, 0.54], [64, 0, -56]);
  const aboutOpacity = useTransform(scrollYProgress, [0.48, 0.59, 0.72, 0.8], [0, 1, 1, 0]);
  const aboutY = useTransform(scrollYProgress, [0.5, 0.64, 0.78], [56, 0, -50]);
  const contactOpacity = useTransform(scrollYProgress, [0.72, 0.84, 1], [0, 1, 1]);
  const contactY = useTransform(scrollYProgress, [0.73, 0.88], [50, 0]);
  const imageFieldOpacity = useTransform(scrollYProgress, [0.15, 0.28, 0.5, 0.62], [0, 0.9, 0.7, 0]);

  const architectureCover = getProjectMedia("hikari").cover;
  const creativeCover = getProjectMedia("the-smiling-wound").cover;

  return (
    <main ref={rootRef} className="relative bg-[#090806] text-[#d5c5aa]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale: terrainScale, y: terrainY }} className="absolute inset-0">
          <AtmosphericTerrain variant="hybrid" tone="dark" className="opacity-100" />
        </motion.div>

        <motion.div style={{ opacity: imageFieldOpacity }} className="absolute inset-0">
          <div
            className={`absolute inset-y-0 left-0 w-[58%] transition-opacity duration-700 ${field === "creative" ? "opacity-[.02]" : field === "architecture" ? "opacity-[.24]" : "opacity-[.09]"}`}
            style={{ WebkitMaskImage: "radial-gradient(ellipse at 24% 52%, black 0%, rgba(0,0,0,.84) 30%, transparent 72%)", maskImage: "radial-gradient(ellipse at 24% 52%, black 0%, rgba(0,0,0,.84) 30%, transparent 72%)" }}
          >
            <Image src={architectureCover} alt="" fill sizes="60vw" className="object-cover grayscale contrast-125 saturate-50" />
          </div>

          <div
            className={`absolute inset-y-0 right-0 w-[58%] transition-opacity duration-700 ${field === "architecture" ? "opacity-[.02]" : field === "creative" ? "opacity-[.22]" : "opacity-[.08]"}`}
            style={{ WebkitMaskImage: "radial-gradient(ellipse at 76% 50%, black 0%, rgba(0,0,0,.8) 28%, transparent 70%)", maskImage: "radial-gradient(ellipse at 76% 50%, black 0%, rgba(0,0,0,.8) 28%, transparent 70%)" }}
          >
            <Image src={creativeCover} alt="" fill sizes="60vw" className="object-cover grayscale contrast-125 saturate-50" />
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,transparent_0%,rgba(8,7,6,.08)_38%,rgba(8,7,6,.64)_88%)]" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#070706] via-[#070706]/82 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#070706] via-[#070706]/78 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070706]/72 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070706]/72 to-transparent" />
      </div>

      <div className="relative z-10 -mt-[100svh]">
        <section className="relative min-h-[150svh]">
          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="sticky top-0 flex h-[100svh] items-center px-5 pt-24 md:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="mb-9 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.2em] text-[#aa8c63]/72">
                <span>{siteConfig.hero.eyebrow}</span>
                <span className="hidden sm:block">Terrain / memory / making</span>
              </div>

              <h1 className="max-w-[1450px] text-[clamp(4.4rem,10.8vw,11rem)] font-medium uppercase leading-[.77] tracking-[-.072em] text-[#d7c6a7]">
                Tsiaro<br />Rakototiana
              </h1>

              <div className="mt-11 grid gap-10 border-t border-[#ad8d61]/20 pt-7 md:grid-cols-12 md:items-end">
                <p className="max-w-3xl text-[clamp(1.8rem,3.4vw,3.8rem)] font-light leading-[.98] tracking-[-.04em] text-[#bca887] md:col-span-7">
                  Designing between matter, memory and the unknown.
                </p>
                <div className="md:col-span-4 md:col-start-9">
                  <p className="max-w-md text-[15px] leading-7 text-[#aa9a82]/74 md:text-base">
                    {siteConfig.hero.description}
                  </p>
                  <p className="mt-7 font-mono text-[10px] uppercase tracking-[.18em] text-[#9d815d]/68">Scroll to enter ↓</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative min-h-[150svh]">
          <motion.div style={{ opacity: choiceOpacity, y: choiceY }} className="sticky top-0 flex h-[100svh] items-center px-5 pt-20 md:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="mb-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.19em] text-[#aa8c63]/68">
                <span>01 / Choose a field</span>
                <span>One archive / two readings</span>
              </div>

              <div className="grid min-h-[60vh] items-center gap-10 md:grid-cols-[minmax(0,4fr)_minmax(180px,2fr)_minmax(0,4fr)]">
                <Link
                  href="/work?portfolio=architecture"
                  onMouseEnter={() => setField("architecture")}
                  onMouseLeave={() => setField(null)}
                  onFocus={() => setField("architecture")}
                  onBlur={() => setField(null)}
                  className="group self-center py-10"
                >
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-[.18em] text-[#a98758]/72">01 / measured terrain</p>
                  <h2 className="text-[clamp(3.4rem,6.8vw,7.6rem)] font-medium uppercase leading-[.8] tracking-[-.06em] text-[#b8a386]/62 transition-all duration-700 group-hover:text-[#d5c09a]">
                    Architecture
                  </h2>
                  <p className="mt-7 max-w-md text-[15px] leading-7 text-[#9c8d77]/66 md:text-base">
                    Space, systems, site evidence, technical development and professional work.
                  </p>
                </Link>

                <div className="hidden h-[42vh] items-center justify-center md:flex">
                  <div className="h-full w-px bg-gradient-to-b from-transparent via-[#a98758]/24 to-transparent" />
                </div>

                <Link
                  href="/work?portfolio=creative"
                  onMouseEnter={() => setField("creative")}
                  onMouseLeave={() => setField(null)}
                  onFocus={() => setField("creative")}
                  onBlur={() => setField(null)}
                  className="group self-center py-10 text-left md:text-right"
                >
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-[.18em] text-[#a98758]/72">02 / fluid memory</p>
                  <h2 className="text-[clamp(3.4rem,6.8vw,7.6rem)] font-medium uppercase leading-[.8] tracking-[-.06em] text-[#b8a386]/62 transition-all duration-700 group-hover:text-[#d5c09a]">
                    Creative
                  </h2>
                  <p className="mt-7 max-w-md text-[15px] leading-7 text-[#9c8d77]/66 md:ml-auto md:text-base">
                    Drawing, ceramics, collage, material experiments and personal visual work.
                  </p>
                </Link>
              </div>

              <div className="flex items-center justify-between border-t border-[#ad8d61]/18 pt-5 font-mono text-[10px] uppercase tracking-[.18em] text-[#92795a]/58">
                <span>Move across the field</span>
                <span>Both belong to the same archive ↘</span>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative min-h-[140svh]">
          <motion.div style={{ opacity: aboutOpacity, y: aboutY }} className="sticky top-0 flex h-[100svh] items-center px-5 pt-20 md:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="grid min-h-[58vh] gap-10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-4">
                  <p className="font-mono text-[10px] uppercase tracking-[.19em] text-[#a98758]/66">02 / Profile / field notes</p>
                  <h2 className="mt-7 max-w-xl text-[clamp(2.8rem,4.8vw,5.6rem)] font-medium leading-[.92] tracking-[-.05em] text-[#c9b595]">
                    Architecture is one layer of how I create.
                  </h2>
                  <Link href="/about" className="mt-9 inline-block font-mono text-[11px] uppercase tracking-[.17em] text-[#b18f62]/76 transition-colors hover:text-[#d0b88f]">
                    Open full profile ↗
                  </Link>
                </div>

                <div className="hidden md:col-span-4 md:block" aria-hidden="true" />

                <div className="md:col-span-4">
                  <p className="max-w-lg text-base leading-8 text-[#a99a82]/72 md:text-lg">
                    {siteConfig.about.description}
                  </p>

                  <div className="mt-10 space-y-8 border-t border-[#ad8d61]/18 pt-7">
                    {profileFacts.map((fact, index) => (
                      <div key={fact.label} className="grid grid-cols-[72px_1fr] gap-5 border-b border-[#ad8d61]/12 pb-7 last:border-b-0">
                        <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#947a58]/62">0{index + 1}</p>
                        <div>
                          <p className="text-lg font-medium tracking-[-.025em] text-[#bba888] md:text-xl">{fact.value}</p>
                          <p className="mt-2 text-[14px] leading-6 text-[#928573]/66">{fact.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative min-h-[130svh]">
          <motion.div style={{ opacity: contactOpacity, y: contactY }} className="sticky top-0 flex h-[100svh] items-center px-5 pt-20 md:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="grid min-h-[56vh] gap-10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-5">
                  <p className="font-mono text-[10px] uppercase tracking-[.19em] text-[#a98758]/68">03 / Open channel</p>
                  <h2 className="mt-8 text-[clamp(3.8rem,7.5vw,8rem)] font-medium uppercase leading-[.8] tracking-[-.065em] text-[#cfba98]">
                    Let&apos;s create<br />what comes next.
                  </h2>
                </div>

                <div className="hidden md:col-span-3 md:block" aria-hidden="true" />

                <div className="md:col-span-4">
                  <p className="max-w-md text-base leading-7 text-[#a99a82]/72">
                    Opportunities, collaborations, project conversations and portfolio enquiries.
                  </p>
                  <a href={`mailto:${siteConfig.email}`} className="mt-9 block text-lg text-[#c3ae8d] transition-colors hover:text-[#d8c09a]">
                    {siteConfig.email}
                  </a>
                  <div className="mt-6 flex flex-wrap gap-x-7 gap-y-4 font-mono text-[11px] uppercase tracking-[.16em] text-[#a98758]/74">
                    <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#d0b88f]">LinkedIn ↗</a>
                    <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#d0b88f]">Instagram ↗</a>
                    <Link href="/contact" className="transition-colors hover:text-[#d0b88f]">Contact ↗</Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[#ad8d61]/18 pt-5 font-mono text-[10px] uppercase tracking-[.18em] text-[#92795a]/58">
                <span>{siteConfig.location}</span>
                <span>End of field / continue through work ↑</span>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
