"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { profile } from "@/content/data";
import { Magnetic, Scramble } from "../effects";
import { Arrow, Icons } from "../ui";

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
          href="#contato"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/5 py-1.5 pl-2 pr-4 font-mono text-xs text-emerald-300 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {profile.status}
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
            <span className="text-white">6+ anos</span> entregando produtos web com <span className="text-white">React</span>,{" "}
            <span className="text-white">Next.js</span> e <span className="text-white">TypeScript</span> — e usando IA para
            entregar mais rápido, com qualidade.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
            {profile.location} <span className="text-cyan">/</span> {profile.workModes}
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
              href={profile.cv}
              download
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 font-medium text-ink"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-violet transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">Baixar currículo</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="relative h-4 w-4 transition group-hover:translate-y-0.5" aria-hidden>
                <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#experiencia" className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-slate-200 backdrop-blur transition hover:border-cyan/60 hover:text-white">
              Ver experiência <Arrow className="transition group-hover:rotate-45" />
            </a>
          </Magnetic>
          <div className="flex items-center gap-2">
            {[
              { href: profile.linkedin, label: "LinkedIn", icon: Icons.linkedin },
              { href: profile.github, label: "GitHub", icon: Icons.github },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-12 w-12 place-items-center rounded-full border border-line text-slate-300 backdrop-blur transition hover:border-cyan/60 hover:text-cyan"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>

      </motion.div>

      <a href="#sobre" className="absolute bottom-12 right-12 z-10 hidden flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted md:flex">
        SCROLL
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span className="absolute inset-x-0 top-0 h-4 bg-cyan" animate={{ y: [-16, 40] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </a>
    </section>
  );
}
