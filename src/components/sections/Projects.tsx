import { profile, projects, type Project } from "@/content/data";
import { Reveal, TiltCard } from "../effects";
import { Arrow, Icons, SectionHeader, Tag } from "../ui";

function Links({ p }: { p: Project }) {
  if (!p.live && !p.repo)
    return <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Código proprietário</span>;
  return (
    <div className="flex items-center gap-4 text-sm">
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white transition hover:text-cyan">
          Ao vivo <Arrow />
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted transition hover:text-white">
          {Icons.github} Código
        </a>
      )}
    </div>
  );
}

function Visual({ p, i }: { p: Project; i: number }) {
  return (
    <div className="relative h-48 overflow-hidden rounded-2xl border border-line bg-ink md:h-56" aria-hidden>
      <div className="bg-grid absolute inset-0" />
      <div
        className="absolute -right-10 -top-10 h-56 w-56 rounded-full opacity-50 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-80"
        style={{ background: p.accent }}
      />
      <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-violet/40 blur-3xl" />
      <span className="text-outline absolute bottom-2 left-5 text-[7rem] font-bold leading-none tracking-tighter transition-transform duration-700 group-hover:-translate-y-2">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="absolute right-5 top-5 flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-widest text-white/60">
        {p.stack.slice(0, 3).map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />
    </div>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projetos" className="relative mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
      <div className="pointer-events-none absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-violet/10 blur-[140px]" aria-hidden />
      <SectionHeader
        index="03"
        label="Projetos em destaque"
        title={
          <>
            Do dashboard corporativo à <span className="text-gradient">simulação 3D</span>
          </>
        }
      >
        Uma seleção do que construí — produtos em produção, sistemas com IA e experimentos com WebGL e física em tempo real.
      </SectionHeader>

      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 0.1}>
            <TiltCard accent={p.accent} className="h-full rounded-3xl border border-line bg-panel/80 p-4 md:p-5">
              <Visual p={p} i={i} />
              <div className="px-2 pb-2 pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: p.accent }}>
                  {p.kind}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{p.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
                <div className="mt-6 border-t border-line pt-5">
                  <Links p={p} />
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <TiltCard accent={p.accent} className="flex h-full flex-col rounded-3xl border border-line bg-panel/80 p-6">
              <span className="mb-6 h-1 w-10 rounded-full" style={{ background: p.accent }} />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{p.kind}</p>
              <h3 className="mt-2 text-xl font-semibold">{p.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
              <div className="mt-6">
                <Links p={p} />
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3 font-mono text-sm text-slate-300 transition hover:border-cyan/60 hover:text-white"
        >
          {Icons.github} +60 repositórios no GitHub <Arrow className="transition group-hover:rotate-45" />
        </a>
      </Reveal>
    </section>
  );
}
