"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const links = [
  { href: "#sobre", label: "Resumo", n: "01" },
  { href: "#experiencia", label: "Experiência", n: "02" },
  { href: "#projetos", label: "Projetos", n: "03" },
  { href: "#servicos", label: "Serviços", n: "04" },
  { href: "#stack", label: "Stack", n: "05" },
];

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" }));
    const first = setTimeout(fmt, 0);
    const id = setInterval(fmt, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span className="tabular-nums">{time || "--:--"}</span>;
}

/** Seção visível no momento, para destacar o link correspondente. */
function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = [...links.map((l) => l.href.slice(1)), "contato"];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div className="h-[2px] origin-left bg-gradient-to-r from-cyan via-violet to-fuchsia-400" style={{ scaleX: progress }} />
      <nav
        aria-label="Principal"
        className="mx-3 mt-3 flex max-w-7xl items-center justify-between rounded-2xl border border-line bg-ink/60 px-4 py-2.5 backdrop-blur-xl md:mx-6 md:px-5 xl:mx-auto"
      >
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan/40 bg-cyan/10 text-cyan transition group-hover:bg-cyan group-hover:text-ink">
            RA
          </span>
          <span className="hidden text-slate-300 sm:inline">renan.dev</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const current = active === l.href.slice(1);
            return (
              <li key={l.href} className="relative">
                {current && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <a
                  href={l.href}
                  aria-current={current ? "true" : undefined}
                  className={`relative block rounded-lg px-3 py-2 text-sm transition ${current ? "text-white" : "text-slate-400 hover:text-white"}`}
                >
                  <span className={`mr-1 font-mono text-[10px] ${current ? "text-cyan" : "text-cyan/50"}`}>{l.n}</span>
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-xs text-muted xl:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            SP · <Clock />
          </span>
          <a
            href="#contato"
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              active === "contato" ? "bg-cyan text-ink" : "bg-white text-ink hover:bg-cyan"
            }`}
          >
            Contratar
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <span className="flex flex-col gap-1.5">
              <span className={`h-px w-5 bg-white transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-white transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            className="mx-3 mt-2 rounded-2xl border border-line bg-ink/95 p-2 backdrop-blur-xl md:mx-6 lg:hidden"
          >
            {links.map((l, i) => (
              <motion.li key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/5 ${active === l.href.slice(1) ? "text-white" : "text-slate-300"}`}
                >
                  <span className="font-mono text-xs text-cyan">{l.n}</span>
                  {l.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
