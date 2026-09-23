"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { profile, projects, type Project } from "@/content/data";
import { Reveal, TiltCard, useIsDesktop } from "../effects";
import { Arrow, Icons, SectionHeader, Tag } from "../ui";

function Links({ p }: { p: Project }) {
  if (!p.live && !p.repo)
    return <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Código proprietário</span>;
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-medium text-ink transition hover:bg-cyan"
        >
          Ver ao vivo <Arrow className="transition group-hover:rotate-45" />
        </a>
      )}
      {p.repo && (
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-slate-300 transition hover:border-white/40 hover:text-white"
        >
          {Icons.github} Código
        </a>
      )}
    </div>
  );
}

/** Arte de "dashboard" para o produto proprietário, que não pode ter print público. */
function DashboardArt({ accent }: { accent: string }) {
  const bars = [38, 62, 45, 80, 56, 92, 70, 84, 60, 96];
  return (
    <div className="absolute inset-0 grid grid-cols-[72px_1fr] bg-[#070a12]" aria-hidden>
      <div className="space-y-3 border-r border-white/5 p-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-2 rounded-full" style={{ background: i === 0 ? accent : "rgba(255,255,255,.08)" }} />
        ))}
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3">
          {["Abastecimento", "Faturamento", "Coleta"].map((k, i) => (
            <div key={k} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
              <p className="text-[9px] uppercase tracking-wider text-white/40">{k}</p>
              <div className="mt-2 h-3 w-2/3 rounded" style={{ background: i === 0 ? accent : "rgba(255,255,255,.15)" }} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-[55%] items-end gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-4">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t transition-all duration-700 group-hover:opacity-100"
              style={{ height: `${h}%`, background: `linear-gradient(to top, ${accent}33, ${accent})`, opacity: 0.55 + i * 0.04 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Mockup({ p, parallax }: { p: Project; parallax?: MotionValue<string> }) {
  const host = p.live ? new URL(p.live).host : "portal.interno";
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl shadow-black/60">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[10px] text-white/50">{host}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {p.image ? (
          <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={{ y: parallax }}>
            <Image
              src={p.image}
              alt={`Tela do projeto ${p.name}`}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </motion.div>
        ) : (
          <DashboardArt accent={p.accent} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
      </div>
    </div>
  );
}

function StackCard({ p, i, total, progress }: { p: Project; i: number; total: number; progress: MotionValue<number> }) {
  const desktop = useIsDesktop();
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i - 1) * 0.045]);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="md:sticky md:top-0 md:flex md:h-screen md:items-start md:pt-24">
      <motion.article
        style={desktop ? { scale, top: `${i * 20}px` } : undefined}
        className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-line bg-panel shadow-[0_-20px_60px_-20px_rgba(0,0,0,.8)]"
      >
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-25 blur-[100px]"
          style={{ background: p.accent }}
          aria-hidden
        />
        <div className="relative grid gap-8 p-6 md:grid-cols-[1fr_1.35fr] md:items-center md:gap-10 md:p-10">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-muted">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
              <span className="h-px w-8" style={{ background: p.accent }} />
              <span className="uppercase tracking-[0.2em]" style={{ color: p.accent }}>
                {p.kind}
              </span>
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight lg:text-[2.75rem] lg:leading-tight">{p.name}</h3>
            <p className="mt-3 text-xl leading-snug text-white/90">{p.headline}</p>
            <p className="mt-3 leading-relaxed text-muted md:line-clamp-3">{p.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <div className="mt-6">
              <Links p={p} />
            </div>
          </div>
          {p.live ? (
            <a href={p.live} target="_blank" rel="noreferrer" data-cursor="Abrir" aria-label={`Abrir ${p.name}`}>
              <Mockup p={p} parallax={parallax} />
            </a>
          ) : (
            <Mockup p={p} parallax={parallax} />
          )}
        </div>
      </motion.article>
    </div>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="projetos" className="relative mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
      <div className="pointer-events-none absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-violet/10 blur-[140px]" aria-hidden />
      <SectionHeader
        index="03"
        label="Projetos"
        title={
          <>
            Produtos reais, <span className="text-gradient">no ar</span>
          </>
        }
      >
        Sistemas corporativos, sites para clientes, produtos com IA e experiências 3D — clique nas telas para abrir cada projeto.
      </SectionHeader>

      <div ref={container} className="relative space-y-8 md:space-y-0">
        {featured.map((p, i) => (
          <StackCard key={p.name} p={p} i={i} total={featured.length} progress={scrollYProgress} />
        ))}
      </div>

      <Reveal className="mt-24 md:mt-10">
        <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-cyan">Mais projetos & laboratório</h3>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06} className="h-full">
            <TiltCard accent={p.accent} className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel/80">
              <div className="relative h-32 overflow-hidden border-b border-line bg-ink">
                {p.image ? (
                  <Image src={p.image} alt={`Tela do projeto ${p.name}`} fill sizes="300px" className="object-cover object-left-top opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                ) : (
                  <>
                    <div className="bg-grid absolute inset-0" />
                    <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-50 blur-2xl transition duration-700 group-hover:scale-150" style={{ background: p.accent }} />
                    <span className="text-outline absolute bottom-1 left-4 text-6xl font-bold">{p.name.slice(0, 2)}</span>
                  </>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: p.accent }}>
                  {p.kind}
                </p>
                <h4 className="mt-2 text-xl font-semibold">{p.name}</h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                <div className="mt-6">
                  <Links p={p} />
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3 font-mono text-sm text-slate-300 transition hover:border-cyan/60 hover:text-white"
        >
          {Icons.github} +60 repositórios no GitHub <Arrow className="transition group-hover:rotate-45" />
        </a>
      </Reveal>
    </section>
  );
}
