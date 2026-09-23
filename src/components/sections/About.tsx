import { profile, stats, strengths } from "@/content/data";
import { Counter, Reveal, TiltCard } from "../effects";
import { SectionHeader } from "../ui";

export function About() {
  return (
    <section id="sobre" className="relative mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
      <SectionHeader
        index="01"
        label="Resumo"
        title={
          <>
            Frontend sênior com <span className="text-gradient">visão de produto</span>
          </>
        }
      >
        {profile.summary}
      </SectionHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {strengths.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <TiltCard className="h-full rounded-3xl border border-line bg-panel/80 p-7">
              <p className="font-mono text-xs text-cyan">0{i + 1}</p>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <dl className="mt-6 grid grid-cols-3 divide-x divide-line rounded-3xl border border-line bg-panel/60">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center md:py-10">
              <dd className="text-4xl font-semibold tabular-nums md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
