import { currentRole, education, experience } from "@/content/data";
import { Reveal } from "../effects";
import { SectionHeader, Tag } from "../ui";

export function Experience() {
  return (
    <section id="trajetoria" className="relative mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
      <SectionHeader
        index="03"
        label="Trajetória"
        title={
          <>
            Seis anos evoluindo <span className="text-gradient">produtos reais</span>
          </>
        }
      />

      <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
        <ol className="relative border-l border-line">
          <li className="relative pb-12 pl-8 md:pl-12">
            <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-cyan shadow-[0_0_20px_4px_rgba(34,211,238,.6)]" />
            <Reveal>
              <p className="font-mono text-xs text-cyan">{currentRole.period}</p>
              <h3 className="mt-2 text-2xl font-semibold">
                {currentRole.title} <span className="text-muted">· MWM</span>
              </h3>
              <a href="#mwm" className="mt-2 inline-block font-mono text-xs text-muted underline decoration-cyan/40 underline-offset-4 hover:text-white">
                ver detalhes acima ↑
              </a>
            </Reveal>
          </li>
          {experience.map((e) => (
            <li key={e.company} className="group relative pb-12 pl-8 last:pb-0 md:pl-12">
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-cyan/60 bg-ink transition group-hover:bg-cyan" />
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="font-mono text-xs text-muted">{e.period}</p>
                  <p className="font-mono text-xs text-muted">{e.place}</p>
                </div>
                <h3 className="mt-2 text-2xl font-semibold">
                  {e.title} <span className="text-muted">· {e.company}</span>
                </h3>
                <ul className="mt-4 space-y-2">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-relaxed text-slate-400">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-cyan/60" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <aside>
          <Reveal>
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-cyan">Formação & certificações</h3>
          </Reveal>
          <ul className="space-y-3">
            {education.map((ed, i) => (
              <li key={ed.title}>
                <Reveal delay={i * 0.06} y={16}>
                  <div className="rounded-2xl border border-line bg-panel/70 p-5 transition hover:border-cyan/40">
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
        </aside>
      </div>
    </section>
  );
}
