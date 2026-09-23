"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile, services, workflow } from "@/content/data";
import { Magnetic, Reveal, TiltCard } from "../effects";
import { Arrow, SectionHeader, Tag } from "../ui";

const icons = [
  // navegador
  <path key="a" d="M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01" />,
  // gráfico
  <path key="b" d="M4 20V10m6 10V4m6 16v-7m4 7H2" />,
  // cubo
  <path key="c" d="m12 2 9 5v10l-9 5-9-5V7zm0 0v20M3 7l9 5 9-5" />,
  // faísca
  <path key="d" d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6" />,
];

const budgetLink = `mailto:${profile.email}?subject=${encodeURIComponent("Orçamento de projeto")}&body=${encodeURIComponent(
  "Olá, Renan!\n\nSobre o projeto:\n- O que precisa ser feito:\n- Prazo desejado:\n- Referências (links):\n",
)}`;

export function Services() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="servicos" className="relative mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
      <div className="pointer-events-none absolute left-1/3 top-10 h-[500px] w-[700px] rounded-full bg-cyan/[0.07] blur-[160px]" aria-hidden />
      <SectionHeader
        index="04"
        label="Para empresas & clientes"
        title={
          <>
            Tem um projeto? <span className="text-gradient">Eu tiro do papel.</span>
          </>
        }
      >
        Do site que gera contatos ao sistema que organiza sua operação — com o mesmo padrão de qualidade que uso em produtos corporativos.
      </SectionHeader>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 0.1}>
            <TiltCard className="h-full rounded-3xl border border-line bg-panel/80 p-8">
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan/30 bg-cyan/10 text-cyan transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
                    {icons[i]}
                  </svg>
                </span>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Ex.: <span className="text-cyan">{s.example}</span>
              </p>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24">
        <h3 className="mb-10 font-mono text-xs uppercase tracking-[0.3em] text-cyan">Como trabalho</h3>
      </Reveal>
      <ol ref={ref} className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        <span className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" aria-hidden />
        <motion.span
          className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gradient-to-r from-cyan to-violet md:block"
          style={{ scaleX: line }}
          aria-hidden
        />
        {workflow.map((w, i) => (
          <li key={w.step} className="relative pl-8 md:pl-0 md:pt-10">
            <span className="absolute left-0 top-0 h-[15px] w-[15px] rounded-full border-2 border-cyan bg-ink shadow-[0_0_16px_rgba(34,211,238,.6)] md:top-0" />
            {i < workflow.length - 1 && <span className="absolute bottom-[-2.5rem] left-[7px] top-[15px] w-px bg-line md:hidden" aria-hidden />}
            <Reveal delay={i * 0.1} y={16}>
              <p className="font-mono text-xs text-cyan">{w.step}</p>
              <p className="mt-2 text-xl font-semibold">{w.title}</p>
              <p className="mt-2 leading-relaxed text-muted">{w.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-20 flex flex-col items-center gap-4 rounded-3xl border border-line bg-gradient-to-r from-cyan/10 via-violet/10 to-transparent p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left">
        <div>
          <p className="text-2xl font-semibold">Vamos conversar sobre o seu projeto?</p>
          <p className="mt-1 text-muted">Conte o que você precisa — respondo com os próximos passos.</p>
        </div>
        <Magnetic>
          <a
            href={budgetLink}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 font-medium text-ink transition hover:bg-cyan"
          >
            Solicitar orçamento <Arrow className="transition group-hover:rotate-45" />
          </a>
        </Magnetic>
      </Reveal>
    </section>
  );
}
