import { skills } from "@/content/data";
import { Reveal, TiltCard, VelocityMarquee } from "../effects";
import { SectionHeader } from "../ui";

const rows = [
  ["React", "Next.js", "TypeScript", "three.js", "Tailwind", "Shadcn/UI", "Vite", "GLSL"],
  ["Claude Code", "Gemini", "Copilot", "Docker", "Azure", "CI/CD", "Acessibilidade", "UI/UX"],
];

function Row({ items, outline }: { items: string[]; outline?: boolean }) {
  return (
    <div className="flex shrink-0 gap-12 pr-12">
      {items.map((m, i) => (
        <span
          key={m}
          className={`text-5xl font-bold tracking-tight md:text-8xl ${(i + (outline ? 1 : 0)) % 2 ? "text-outline" : "text-white/90"}`}
        >
          {m} <span className="text-cyan">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Stack() {
  return (
    <section id="stack" className="relative overflow-hidden py-28 md:py-40">
      <div className="relative mb-20 -rotate-2 space-y-4 border-y border-line bg-ink py-6" aria-hidden>
        <VelocityMarquee baseVelocity={-2.5}>
          <Row items={rows[0]} />
        </VelocityMarquee>
        <VelocityMarquee baseVelocity={2.5}>
          <Row items={rows[1]} outline />
        </VelocityMarquee>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader
          index="05"
          label="Stack & competências"
          title={
            <>
              Ferramentas que <span className="text-gradient">domino</span>
            </>
          }
        >
          Do pixel ao pipeline: interface, experiência, IA aplicada ao desenvolvimento e a infraestrutura que coloca tudo em produção.
        </SectionHeader>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.08}>
              <TiltCard className="h-full rounded-3xl border border-line bg-panel/80 p-6">
                <p className="font-mono text-xs text-cyan">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-semibold">{g.group}</h3>
                <ul className="mt-6 space-y-2.5">
                  {g.items.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-slate-300">
                      <span className="h-1 w-1 rounded-full bg-cyan" />
                      {s}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
