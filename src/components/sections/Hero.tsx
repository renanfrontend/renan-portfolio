"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { currentRole, profile, stats } from "@/content/data";
import { Counter, Magnetic, Scramble } from "../effects";
import { Arrow } from "../ui";

const HeroScene = dynamic(() => import("../three/HeroScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  // Para o loop do WebGL quando o hero sai da tela.
  const onScreen = useInView(ref, { margin: "0px 0px -10% 0px" });

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity, scale: sceneScale }} aria-hidden>
        <HeroScene active={onScreen} />
      </motion.div>
      <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent via-cyan/[0.04] to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" aria-hidden />

      {/* Cantos de HUD */}
      <div className="pointer-events-none absolute inset-6 hidden md:block" aria-hidden>
        {["left-0 top-20 border-l border-t", "right-0 top-20 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-cyan/40 ${c}`} />
        ))}
        <span className="absolute bottom-2 right-10 font-mono text-[10px] tracking-[0.3em] text-muted">
          RENDER · WEBGL · GLSL
        </span>
      </div>

      <motion.div style={{ y: textY }} className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
        <motion.a
          href="#mwm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan/30 bg-cyan/5 py-1.5 pl-2 pr-4 font-mono text-xs text-cyan backdrop-blur"
        >
          <span className="rounded-full bg-cyan px-2 py-0.5 text-[10px] font-bold text-ink">AGORA</span>
          {currentRole.title} @ MWM
          <Arrow />
        </motion.a>

        <h1 className="text-[clamp(3rem,11vw,9.5rem)] font-bold leading-[0.88] tracking-[-0.04em]">
          <motion.span className="block" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.1 }}>
            <Scramble text="RENAN" />
          </motion.span>
          <motion.span className="block text-gradient" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.2 }}>
            <Scramble text="AUGUSTO" delay={200} />
          </motion.span>
        </h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="mt-8 max-w-xl">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-cyan">
            <span className="text-muted">&gt;_</span> {profile.role}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-300 md:text-xl">
            Construo interfaces de alta performance com <span className="text-white">React</span>,{" "}
            <span className="text-white">Next.js</span> e <span className="text-white">TypeScript</span> — e uso IA para
            entregar mais rápido e melhor.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#projetos"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 font-medium text-ink"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-violet transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">Ver projetos</span>
              <Arrow className="relative transition group-hover:rotate-45" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contato" className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-slate-200 backdrop-blur transition hover:border-cyan/60 hover:text-white">
              Vamos conversar
            </a>
          </Magnetic>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 grid max-w-2xl grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-semibold tabular-nums md:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </dd>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">{s.label}</p>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <a href="#mwm" className="absolute bottom-12 right-12 z-10 hidden flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted md:flex">
        SCROLL
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span className="absolute inset-x-0 top-0 h-4 bg-cyan" animate={{ y: [-16, 40] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </a>
    </section>
  );
}
