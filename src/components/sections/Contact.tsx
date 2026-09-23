import { profile } from "@/content/data";
import { Magnetic, Reveal, Scramble } from "../effects";
import { Arrow, Icons } from "../ui";

const channels = [
  { label: "E-mail", value: profile.email, href: `mailto:${profile.email}`, icon: Icons.mail },
  { label: "LinkedIn", value: "in/renan-augusto-santos", href: profile.linkedin, icon: Icons.linkedin },
  { label: "GitHub", value: "@renanfrontend", href: profile.github, icon: Icons.github },
];

export function Contact() {
  return (
    <section id="contato" className="relative overflow-hidden px-4 pb-10 pt-28 md:px-8 md:pt-40">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan/20 via-violet/20 to-fuchsia-500/10 blur-[160px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            05 — <Scramble text="Conexão aberta" />
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-5xl text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            Vamos construir algo <span className="text-gradient">extraordinário?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted">
            Aberto a novos desafios, projetos e boas conversas sobre frontend, 3D na web e IA aplicada.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan to-violet px-10 py-5 text-lg font-medium text-ink shadow-[0_0_60px_-10px_rgba(34,211,238,.7)]"
            >
              Enviar mensagem <Arrow className="h-5 w-5 transition group-hover:rotate-45" />
            </a>
          </Magnetic>
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-4xl gap-4 md:grid-cols-3">
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

      <footer className="relative mx-auto mt-28 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-line pt-8 font-mono text-xs text-muted md:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Next.js · TypeScript · three.js · deploy na Vercel</p>
        <a href="#top" className="hover:text-white">
          voltar ao topo ↑
        </a>
      </footer>
    </section>
  );
}
