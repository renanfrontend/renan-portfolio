# Portfólio — Renan Augusto

Portfólio pessoal de **Renan Augusto dos Santos**, Senior Frontend Engineer.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · three.js / React Three Fiber (shaders GLSL) · Motion · Lenis · Tailwind CSS 4

## Rodar localmente

```bash
npm install
npm run dev   # http://localhost:3000
```

## Editar conteúdo

Todo o texto (perfil, cargo na MWM, experiências, projetos, skills, formação) fica em `src/content/data.ts`.

## Estrutura

```
src/
├── app/                 layout, página e estilos globais
├── content/data.ts      conteúdo do portfólio
└── components/
    ├── three/           cena 3D do hero (núcleo com shader + partículas)
    ├── sections/        Nav, Hero, MWM, Projetos, Trajetória, Stack, Contato
    ├── effects.tsx      smooth scroll, cursor, scramble, reveal, tilt, magnetic
    └── ui.tsx           cabeçalho de seção, tags, ícones
```

## Deploy na Vercel

```bash
npx vercel        # preview
npx vercel --prod # produção
```
