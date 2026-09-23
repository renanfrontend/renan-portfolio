import { skills } from "@/content/data";
import { Reveal, TiltCard } from "../effects";
import { SectionHeader } from "../ui";

const marquee = ["React", "Next.js", "TypeScript", "three.js", "Tailwind", "Claude Code", "Gemini", "Docker", "Azure", "Vite", "Shadcn/UI", "GLSL"];

export function Stack() {
  return (
    <section id="stack" className="relative py-28 md:py-40">
      <div className="relative mb-20 overflow-hidden border-y border-line py-6" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className={`text-5xl font-bold tracking-tight md:text-7xl ${i % 2 ? "text-outline" : "text-white/90"}`}>
              {m} <span className="text-cyan">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader
          index="04"
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
