import { lastRole } from "@/content/data";
import { Reveal, TiltCard } from "../effects";
import { SectionHeader, Tag } from "../ui";

export function LastRole() {
  return (
    <section id="mwm" className="relative mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-cyan/10 blur-[140px]" aria-hidden />

      <SectionHeader
        index="01"
        label="Último cargo"
        title={
          <>
            Engenharia frontend na <span className="text-gradient">MWM Motores e Geradores</span>
          </>
        }
      >
        {lastRole.intro}
      </SectionHeader>

      <Reveal>
        <div className="beam-border overflow-hidden rounded-3xl">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
            {/* Painel de identificação */}
            <div className="relative border-b border-line p-8 md:p-12 lg:border-b-0 lg:border-r">
              <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3 py-1 text-cyan">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> ÚLTIMA POSIÇÃO
                  </span>
                  <span className="text-muted">{lastRole.period}</span>
                </div>

                <p className="mt-10 font-mono text-sm tracking-[0.3em] text-cyan">MWM</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">{lastRole.title}</h3>
                <p className="mt-3 text-muted">
                  {lastRole.company} · {lastRole.mode}
                </p>

                <div className="mt-10 rounded-2xl border border-line bg-ink/70 p-5 font-mono text-[13px] leading-relaxed">
                  <p className="mb-3 flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </p>
                  <p>
                    <span className="text-violet">const</span> <span className="text-cyan">role</span> = {"{"}
                  </p>
                  <p className="pl-4">
                    produtos: [<span className="text-emerald-300">&quot;MWM Portal&quot;</span>, <span className="text-emerald-300">&quot;Bio Plantas&quot;</span>],
                  </p>
                  <p className="pl-4">
                    frente: <span className="text-emerald-300">&quot;SPA / PWA&quot;</span>,
                  </p>
                  <p className="pl-4">
                    cloud: <span className="text-emerald-300">&quot;Azure&quot;</span>,
                  </p>
                  <p className="pl-4">
                    foco: [<span className="text-emerald-300">&quot;performance&quot;</span>, <span className="text-emerald-300">&quot;a11y&quot;</span>, <span className="text-emerald-300">&quot;dados&quot;</span>],
                  </p>
                  <p>{"}"};</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {lastRole.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            </div>

            {/* Entregas */}
            <ol className="divide-y divide-line">
              {lastRole.highlights.map((h, i) => (
                <li key={h.code}>
                  <Reveal delay={i * 0.06} y={16}>
                    <TiltCard className="flex gap-6 p-7 transition-colors hover:bg-white/[0.02] md:p-8">
                      <span className="font-mono text-sm text-cyan">{h.code}</span>
                      <div>
                        <h4 className="text-lg font-medium text-white">{h.title}</h4>
                        <p className="mt-2 leading-relaxed text-muted">{h.text}</p>
                      </div>
                    </TiltCard>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
