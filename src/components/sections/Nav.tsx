"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const links = [
  { href: "#sobre", label: "Resumo", n: "01" },
  { href: "#experiencia", label: "Experiência", n: "02" },
  { href: "#projetos", label: "Projetos", n: "03" },
  { href: "#stack", label: "Stack", n: "04" },
  { href: "#contato", label: "Contato", n: "05" },
];

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--:--"}</span>;
}

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div className="h-[2px] origin-left bg-gradient-to-r from-cyan via-violet to-fuchsia-400" style={{ scaleX: progress }} />
      <nav className="mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl border border-line bg-ink/60 px-4 py-3 backdrop-blur-xl md:mx-6 md:px-6 xl:mx-auto">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan/40 bg-cyan/10 text-cyan transition group-hover:bg-cyan group-hover:text-ink">
            RA
          </span>
          <span className="hidden text-slate-300 sm:inline">renan.dev</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:text-white">
                <span className="mr-1 font-mono text-[10px] text-cyan/70">{l.n}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 font-mono text-xs text-muted lg:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          SP · <Clock />
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-lg border border-line md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <span className="flex flex-col gap-1.5">
            <span className={`h-px w-5 bg-white transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-white transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-2 rounded-2xl border border-line bg-ink/95 p-2 backdrop-blur-xl md:hidden"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-200 hover:bg-white/5">
                <span className="font-mono text-xs text-cyan">{l.n}</span>
                {l.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </header>
  );
}
