"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { person } from "@/content/shared";
import { useContent } from "@/i18n/provider";
import { Magnetic, Scramble, useIntroDone } from "../effects";
import { Arrow, Icons, Rich } from "../ui";

const HeroScene = dynamic(() => import("../three/HeroScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { profile, ui } = useContent();
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // Para o loop do WebGL quando o hero sai da tela.
  const onScreen = useInView(ref, { margin: "0px 0px -10% 0px" });

  const show = (delay: number, y = 40) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease, delay },
  });

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity }} aria-hidden>
        <HeroScene active={onScreen} progress={scrollYProgress} />
      </motion.div>
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent via-cyan/[0.04] to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" aria-hidden />

      {/* Cantos de HUD */}
      <div className="pointer-events-none absolute inset-6 hidden md:block" aria-hidden>
        {["left-0 top-20 border-l border-t", "right-0 top-20 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-cyan/40 ${c}`} />
        ))}
        <span className="absolute bottom-2 left-10 font-mono text-[10px] tracking-[0.3em] text-muted">{ui.hero.hud}</span>
      </div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
        <motion.a
          href="#contato"
          {...show(0, 12)}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/5 py-1.5 pl-3 pr-4 font-mono text-xs text-emerald-300 backdrop-blur transition hover:bg-emerald-400/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {profile.status}
          <Arrow />
        </motion.a>

        <h1 className="pb-2 text-[clamp(3.2rem,12vw,10rem)] font-bold leading-[0.86] tracking-[-0.045em]">
          <span className="block overflow-hidden">
            <motion.span className="block" initial={{ y: "105%" }} animate={ready ? { y: 0 } : undefined} transition={{ duration: 1.1, ease, delay: 0.05 }}>
              <Scramble text="RENAN" play={ready} />
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span className="text-gradient block" initial={{ y: "105%" }} animate={ready ? { y: 0 } : undefined} transition={{ duration: 1.1, ease, delay: 0.15 }}>
              <Scramble text="AUGUSTO" delay={150} play={ready} />
            </motion.span>
          </span>
        </h1>

        <motion.div {...show(0.35, 20)} className="mt-8 max-w-xl">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-cyan">
            <span className="text-muted">&gt;_</span> {profile.role}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-300 md:text-xl">
            <Rich text={profile.heroLead} />
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-slate-400">
            {profile.location} <span className="text-cyan">/</span> {profile.workModes}
          </p>
        </motion.div>

        <motion.div {...show(0.5, 20)} className="mt-10 flex flex-wrap items-center gap-3 md:gap-4">
          <Magnetic>
            <a
              href={profile.cv}
              download
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 font-medium text-ink"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-violet transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">{ui.hero.downloadCv}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="relative h-4 w-4 transition group-hover:translate-y-0.5" aria-hidden>
                <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#servicos"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-ink/40 px-7 py-4 text-slate-200 backdrop-blur transition hover:border-cyan/60 hover:text-white"
            >
              {ui.hero.project} <Arrow className="transition group-hover:rotate-45" />
            </a>
          </Magnetic>
          <div className="flex items-center gap-2">
            {[
              { href: person.linkedin, label: "LinkedIn", icon: Icons.linkedin },
              { href: person.github, label: "GitHub", icon: Icons.github },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-12 w-12 place-items-center rounded-full border border-line bg-ink/40 text-slate-300 backdrop-blur transition hover:border-cyan/60 hover:text-cyan"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <a href="#sobre" className="absolute bottom-12 right-12 z-10 hidden flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted md:flex">
        {ui.hero.scroll}
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span className="absolute inset-x-0 top-0 h-4 bg-cyan" animate={{ y: [-16, 40] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </a>
    </section>
  );
}
