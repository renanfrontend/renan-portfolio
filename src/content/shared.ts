/** Dados que não mudam entre idiomas. */
export const person = {
  name: "Renan Augusto dos Santos",
  shortName: "Renan Augusto",
  email: "renan.gabba@gmail.com",
  linkedin: "https://www.linkedin.com/in/renan-augusto-santos/",
  github: "https://github.com/renanfrontend",
};

export const gh = (repo: string) => `https://github.com/renanfrontend/${repo}`;

/** Links, imagens e cores de cada projeto, na ordem em que aparecem. */
export const projectMeta = {
  mwm: { name: "MWM Portal", stack: ["React", "TypeScript", "Tailwind", "Shadcn/UI", "Recharts", "Azure"], featured: true, accent: "#22d3ee" },
  aster: {
    name: "Aster Centro Terapêutico",
    stack: ["HTML", "CSS", "JavaScript", "SEO", "LGPD"],
    repo: gh("aster-ct"),
    live: "https://renanfrontend.github.io/aster-ct/",
    image: "/projects/aster.png",
    featured: true,
    accent: "#facc15",
  },
  escudo: {
    name: "Escudo Cidadão",
    stack: ["React", "TypeScript", "Material UI", "Node.js", "Express"],
    repo: gh("escudo-cidadao"),
    live: "https://escudo-cidadao.netlify.app/",
    image: "/projects/escudo.png",
    featured: true,
    accent: "#a78bfa",
  },
  manor: {
    name: "Manor Escape",
    stack: ["React 19", "three.js", "R3F", "XState", "Zustand", "Playwright"],
    repo: gh("manor-escape"),
    live: "https://renanfrontend.github.io/manor-escape/",
    image: "/projects/manor.png",
    featured: true,
    accent: "#e0b566",
  },
  gemini: {
    name: "Gemini Beyond Prompts",
    stack: ["Next.js", "TypeScript", "Gemini", "RAG", "LangGraph"],
    repo: gh("gemini-beyond-prompts"),
    live: "https://gemini-beyond-prompts.vercel.app",
    image: "/projects/gemini.png",
    featured: true,
    accent: "#60a5fa",
  },
  helios: { name: "HELIOS Lab", stack: ["TypeScript", "Canvas 2D", "WebAudio"], repo: gh("helios-lab"), accent: "#fb923c" },
  gascontrol: {
    name: "GasControl",
    stack: ["React", "TypeScript", "Charts"],
    repo: gh("gascontrol-frontend"),
    image: "/projects/gascontrol.png",
    accent: "#c084fc",
  },
  nexus: { name: "Nexus 3D", stack: ["R3F", "GLSL", "three.js"], repo: gh("nexus-3d"), accent: "#4ade80" },
  paroquia: { name: "Paróquia Conectada", stack: ["React Native", "Expo", "Supabase"], repo: gh("paroquia-app"), accent: "#f472b6" },
};

export type ProjectKey = keyof typeof projectMeta;

export const roleStacks = {
  mwm: ["React", "TypeScript", "Vite", "Tailwind", "Shadcn/UI", "Docker", "Azure", "Spring Boot"],
  "portal-telemedicina": ["Angular", "TypeScript", "GitHub Actions"],
  olos: ["React", "Next.js", "TypeScript", "Material UI"],
  safira: ["React", "TypeScript", "JWT", "AWS", "Azure"],
  clude: ["React", "JavaScript", "Sass", "Bootstrap"],
};

export const skillItems = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript ES6+", "Vite", "Redux", "React Query", "Angular", "Vue"],
  ai: ["Claude Code", "Google Gemini", "GitHub Copilot", "ChatGPT", "Prompt Engineering", "LLMs", "RAG"],
  devops: ["Docker", "Azure DevOps", "Azure Container Apps", "ACR", "Nginx", "GitHub Actions", "CI/CD"],
};
