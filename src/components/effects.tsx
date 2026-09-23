"use client";

import Lenis from "lenis";
import {
  animate,
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return null;
}

/** Halo que segue o ponteiro + anel que cresce sobre elementos interativos. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const enabled = useSyncExternalStore(
    () => () => {},
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element;
      setHover(!!target.closest?.("a,button,[data-hover]"));
      setLabel(target.closest?.("[data-cursor]")?.getAttribute("data-cursor") ?? "");
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ x: sx, y: sy, background: "radial-gradient(circle, rgba(34,211,238,.12), rgba(139,92,246,.06) 40%, transparent 70%)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-300/70 font-mono text-[11px] font-bold uppercase tracking-wider text-ink"
        style={{ x: sx, y: sy }}
        animate={{
          width: label ? 88 : hover ? 56 : 18,
          height: label ? 88 : hover ? 56 : 18,
          backgroundColor: label ? "rgba(34,211,238,1)" : hover ? "rgba(34,211,238,.15)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {label}
      </motion.div>
    </>
  );
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFabcdef";

/** Decodifica o texto caractere a caractere quando entra na tela. */
export function Scramble({
  text,
  className,
  delay = 0,
  play = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || !play) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setOut(text);
    let frame = 0;
    let id = 0;
    const total = text.length * 2.2 + 12;
    const start = setTimeout(function tick() {
      const progress = frame / total;
      setOut(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i / text.length < progress * 1.15 - 0.1) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (frame++ < total) id = window.setTimeout(tick, 28);
      else setOut(text);
    }, delay);
    return () => {
      clearTimeout(start);
      clearTimeout(id);
    };
  }, [inView, play, text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 32,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const c = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = Math.round(v) + suffix),
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

/** Card com inclinação 3D e luz que acompanha o ponteiro. */
export function TiltCard({
  children,
  className = "",
  accent = "#22d3ee",
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
  }

  return (
    <motion.div
      ref={ref}
      data-hover
      onPointerMove={onMove}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, ["--accent" as string]: accent }}
      className={`spotlight group relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Botão que é atraído levemente pelo ponteiro. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Intro: sinaliza para o hero quando a abertura termina ---------- */

let introDone = false;
const introListeners = new Set<() => void>();

function finishIntro() {
  if (introDone) return;
  introDone = true;
  introListeners.forEach((l) => l());
}

export function useIntroDone() {
  return useSyncExternalStore(
    (cb) => {
      introListeners.add(cb);
      return () => introListeners.delete(cb);
    },
    () => introDone,
    () => false,
  );
}

const bootLines = ["iniciando renan.dev", "compilando shaders GLSL", "montando experiência"];

/** Sequência de boot curta (~1,4s). Some de imediato com movimento reduzido. */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishIntro();
      const t = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(t);
    }
    const c = animate(0, 100, {
      duration: 1.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (counter.current) counter.current.textContent = String(Math.round(v)).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete: () => {
        setVisible(false);
        finishIntro();
      },
    });
    return () => c.stop();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink p-6 font-mono md:p-12"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <ul className="space-y-1 text-xs text-muted md:text-sm">
            {bootLines.map((l, i) => (
              <motion.li key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.25 }}>
                <span className="text-cyan">&gt;</span> {l}
                <span className="text-emerald-400"> ok</span>
              </motion.li>
            ))}
          </ul>
          <div>
            <span ref={counter} className="text-outline block text-[28vw] font-bold leading-none tracking-tighter md:text-[18vw]">
              000
            </span>
            <span className="mt-4 block h-px w-full bg-line">
              <span ref={bar} className="block h-px origin-left scale-x-0 bg-gradient-to-r from-cyan to-violet" />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Revela o bloco com uma "cortina" de baixo para cima.
 * O wrapper externo é quem é observado: um elemento 100% recortado por clip-path
 * nunca é reportado como visível pelo IntersectionObserver.
 */
export function WipeReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-60px" }}>
      <motion.div
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)", y: 40 },
          shown: { clipPath: "inset(0 0 -20% 0)", y: 0 },
        }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Faixa infinita que acelera, inverte e inclina conforme a velocidade da rolagem. */
export function VelocityMarquee({ children, baseVelocity = 3 }: { children: ReactNode; baseVelocity?: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(velocity, [-3000, 3000], [-10, 10]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    let move = direction.current * baseVelocity * (delta / 1000);
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="overflow-hidden">
      <motion.div className="flex w-max whitespace-nowrap" style={{ x, skewX }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/** true em telas >= 768px (para efeitos que só fazem sentido no desktop). */
export function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true,
  );
}
