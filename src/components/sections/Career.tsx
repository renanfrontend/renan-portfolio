"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type KeyboardEvent } from "react";
import { education, experience, type Level } from "@/content/data";
import { Reveal } from "../effects";
import { SectionHeader, Tag } from "../ui";

const levels: Level[] = ["Analista", "Pleno", "Sênior"];
const stepHeight = ["md:h-40", "md:h-52", "md:h-64"];

const startYear = (period: string) => Number(period.match(/\d{4}/)?.[0]);

/** Um degrau por nível: ano de entrada e empresas, do mais antigo ao mais recente. */
const ladder = levels.map((level) => {
  const roles = experience.filter((r) => r.level === level);
  return {
    level,
    since: Math.min(...roles.map((r) => startYear(r.period))),
    companies: roles.map((r) => r.company.split(" — ")[0]).reverse(),
    latestId: roles[0].id,
  };
});

export function Career() {
  const [activeId, setActiveId] = useState(experience[0].id);
  const active = experience.find((r) => r.id === activeId) ?? experience[0];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
    e.preventDefault();
    const i = experience.findIndex((r) => r.id === activeId);
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? i + 1 : i - 1;
    const role = experience[(next + experience.length) % experience.length];
    setActiveId(role.id);
    document.getElementById(`tab-${role.id}`)?.focus();
  }

  return (
    <section id="experiencia" className="relative mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-cyan/10 blur-[140px]" aria-hidden />

      <SectionHeader
        index="02"
        label="Experiência"
        title={
          <>
            De Analista a <span className="text-gradient">Sênior</span> em seis anos
          </>
        }
      >
        Uma trajetória de crescimento contínuo em produtos reais — saúde, telecom, indústria e logística.
      </SectionHeader>

      {/* Escada de carreira */}
      <ol className="mb-16 grid gap-4 md:grid-cols-3 md:items-end">
        {ladder.map((step, i) => {
          const current = step.level === active.level;
          return (
            <li key={step.level}>
              <Reveal delay={i * 0.12} y={40}>
                <button
                  type="button"
                  onClick={() => setActiveId(step.latestId)}
                  className={`group relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border p-6 text-left transition-colors ${stepHeight[i]} ${
                    current ? "border-cyan/50 bg-cyan/[0.06]" : "border-line bg-panel/70 hover:border-cyan/30"
                  }`}
                >
                  <span
                    className="absolute inset-x-0 bottom-0 h-1 origin-left bg-gradient-to-r from-cyan to-violet transition-transform duration-500"
                    style={{ transform: `scaleX(${current ? 1 : 0})` }}
                    aria-hidden
                  />
                  <span className="flex items-center justify-between font-mono text-xs text-muted">
                    <span>NÍVEL 0{i + 1}</span>
                    <span className={current ? "text-cyan" : ""}>desde {step.since}</span>
                  </span>
                  <span className="mt-6 block">
                    <span className={`block text-3xl font-semibold tracking-tight md:text-4xl ${current ? "text-gradient" : "text-white"}`}>
                      {step.level}
                    </span>
                    <span className="mt-2 block text-sm text-muted">{step.companies.join(" · ")}</span>
                  </span>
                </button>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* Explorador de cargos */}
      <Reveal>
        <div className="grid overflow-hidden rounded-3xl border border-line bg-panel/70 backdrop-blur md:grid-cols-[300px_1fr]">
          <div
            role="tablist"
            aria-label="Empresas"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex gap-2 overflow-x-auto border-b border-line p-3 md:flex-col md:gap-1 md:overflow-visible md:border-b-0 md:border-r"
          >
            {experience.map((r) => {
              const selected = r.id === activeId;
              return (
                <button
                  key={r.id}
                  id={`tab-${r.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="role-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(r.id)}
                  className={`relative shrink-0 rounded-2xl px-4 py-3 text-left transition-colors md:px-5 md:py-4 ${
                    selected ? "text-white" : "text-slate-400 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="role-indicator"
                      className="absolute inset-0 rounded-2xl border border-cyan/40 bg-cyan/[0.07]"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative block whitespace-nowrap font-medium md:whitespace-normal">{r.company.split(" — ")[0]}</span>
                  <span className="relative mt-0.5 block whitespace-nowrap font-mono text-[11px] text-muted">{r.period}</span>
                </button>
              );
            })}
          </div>

          <div id="role-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} className="relative min-h-[440px] p-6 md:p-10">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -24, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="rounded-full bg-cyan/10 px-3 py-1 text-cyan">{active.level.toUpperCase()}</span>
                  <span className="text-muted">{active.period}</span>
                  <span className="text-muted">· {active.place}</span>
                </div>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">{active.title}</h3>
                <p className="mt-1 text-lg text-cyan">{active.company}</p>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{active.summary}</p>

                <ul className="mt-8 space-y-3">
                  {active.points.map((pt, i) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex gap-4 leading-relaxed text-slate-400"
                    >
                      <span className="mt-1 font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                      {pt}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
                  {active.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      {/* Formação */}
      <Reveal className="mt-20">
        <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-cyan">Formação & certificações</h3>
      </Reveal>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {education.map((ed, i) => (
          <li key={ed.title}>
            <Reveal delay={i * 0.06} y={16} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-panel/70 p-5 transition hover:border-cyan/40">
                <p className="font-mono text-[11px] text-muted">{ed.period}</p>
                <p className="mt-1 font-medium text-white">{ed.title}</p>
                <p className="mt-1 text-sm text-muted">{ed.org}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal>
        <p className="mt-6 font-mono text-xs text-muted">+70 certificações em Frontend, Cloud e IA</p>
      </Reveal>
    </section>
  );
}
