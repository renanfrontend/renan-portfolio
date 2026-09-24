"use client";

import { useRef } from "react";
import { person } from "@/content/shared";
import { useContent } from "@/i18n/provider";
import { Magnetic, Reveal, Scramble, TiltCard } from "../effects";
import { Arrow, Icons, Rich } from "../ui";

const mail = (subject: string, body = "") =>
  `mailto:${person.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

const channels = [
  { label: "E-mail", value: person.email, href: `mailto:${person.email}`, icon: Icons.mail },
  { label: "LinkedIn", value: "in/renan-augusto-santos", href: person.linkedin, icon: Icons.linkedin },
  { label: "GitHub", value: "@renanfrontend", href: person.github, icon: Icons.github },
];

function GiantName() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r || !ref.current) return;
        ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
        ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className="giant-name relative mt-24 select-none overflow-hidden"
      aria-hidden
    >
      <p className="text-outline whitespace-nowrap text-center text-[13vw] font-bold leading-[0.8] tracking-[-0.05em]">RENAN AUGUSTO</p>
      <p className="giant-name__lit absolute inset-0 whitespace-nowrap text-center text-[13vw] font-bold leading-[0.8] tracking-[-0.05em]">
        RENAN AUGUSTO
      </p>
    </div>
  );
}

export function Contact() {
  const { profile, ui } = useContent();
  const t = ui.contact;
  const paths = [
    {
      ...t.recruiters,
      primary: { label: t.recruiters.primary, href: profile.cv, download: true },
      secondary: { label: t.recruiters.secondary, href: mail(t.recruiters.subject) },
      accent: "#22d3ee",
    },
    {
      ...t.clients,
      primary: { label: t.clients.primary, href: mail(ui.services.budgetSubject, ui.services.budgetBody), download: false },
      secondary: { label: t.clients.secondary, href: "#servicos" },
      accent: "#8b5cf6",
    },
  ];

  return (
    <section id="contato" className="relative overflow-hidden pt-28 md:pt-40">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan/20 via-violet/20 to-fuchsia-500/10 blur-[160px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            06 — <Scramble text={t.label} />
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-5xl text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            <Rich text={t.title} />
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 text-left md:grid-cols-2">
          {paths.map((p, i) => (
            <Reveal key={p.tag} delay={0.1 * i} className="h-full">
              <TiltCard accent={p.accent} className="flex h-full flex-col rounded-3xl border border-line bg-panel/80 p-8 backdrop-blur">
                <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: p.accent }}>
                  {p.tag}
                </p>
                <h3 className="mt-4 text-3xl font-semibold">{p.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{p.text}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a
                      href={p.primary.href}
                      download={p.primary.download || undefined}
                      className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium text-ink transition hover:brightness-110"
                      style={{ background: `linear-gradient(90deg, ${p.accent}, #e6e9f2)` }}
                    >
                      {p.primary.label} <Arrow className="transition group-hover:rotate-45" />
                    </a>
                  </Magnetic>
                  <a href={p.secondary.href} className="rounded-full px-4 py-3.5 text-slate-300 transition hover:text-white">
                    {p.secondary.label}
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={0.1 * i}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-line bg-panel/70 p-5 text-left backdrop-blur transition hover:-translate-y-1 hover:border-cyan/50"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line text-cyan transition group-hover:bg-cyan group-hover:text-ink">
                  {c.icon}
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">{c.label}</span>
                  <span className="block truncate text-sm text-white">{c.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <GiantName />

      <footer className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-line px-4 py-8 font-mono text-xs text-muted md:flex-row md:px-8">
        <p>© {new Date().getFullYear()} {person.name}</p>
        <p>{t.footer}</p>
        <a href="#top" className="hover:text-white">
          {t.backToTop}
        </a>
      </footer>
    </section>
  );
}
