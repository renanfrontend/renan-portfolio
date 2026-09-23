export const profile = {
  name: "Renan Augusto dos Santos",
  shortName: "Renan Augusto",
  role: "Senior Frontend Engineer",
  tagline: "React · TypeScript · Next.js · IA aplicada ao desenvolvimento",
  location: "São Paulo, Brasil",
  email: "renan.gabba@gmail.com",
  linkedin: "https://www.linkedin.com/in/renan-augusto-santos/",
  github: "https://github.com/renanfrontend",
  avatar: "https://avatars.githubusercontent.com/u/146970438?v=4",
  summary:
    "Senior Frontend Engineer com mais de 6 anos construindo aplicações web modernas, escaláveis e de alta performance no ecossistema React, TypeScript e Next.js. Integro Inteligência Artificial ao ciclo de desenvolvimento — Claude Code, Gemini, Copilot e Prompt Engineering — para acelerar entregas e elevar a qualidade do produto, com base sólida em arquitetura, UI/UX, Cloud e CI/CD.",
};

export const stats = [
  { value: 6, suffix: "+", label: "anos em frontend" },
  { value: 5, suffix: "", label: "empresas" },
  { value: 60, suffix: "+", label: "repositórios públicos" },
  { value: 70, suffix: "+", label: "certificações" },
];

export const currentRole = {
  company: "MWM Motores e Geradores",
  title: "Senior Frontend Engineer",
  period: "set/2025 — atual",
  mode: "São Paulo · Híbrido",
  intro:
    "Lidero a construção de interfaces para sistemas corporativos e logísticos — do componente à infraestrutura em nuvem.",
  highlights: [
    {
      code: "01",
      title: "SPAs & PWAs corporativas",
      text: "Interfaces escaláveis com React, TypeScript e Vite para o MWM Portal e o Bio Plantas.",
    },
    {
      code: "02",
      title: "Dashboards de logística e qualidade",
      text: "Visualização de dados com Google Charts otimizando gestão de portaria, cooperados e análise operacional.",
    },
    {
      code: "03",
      title: "Modernização de UI/UX",
      text: "Migração de interfaces legadas para Tailwind CSS e Shadcn/UI, com foco em responsividade e acessibilidade.",
    },
    {
      code: "04",
      title: "Cloud & DevOps no Azure",
      text: "Orquestração com Docker, Azure Container Apps e ACR; CI/CD automatizado no Azure DevOps.",
    },
    {
      code: "05",
      title: "Integração full-stack",
      text: "Consumo de APIs REST em Java Spring Boot e configuração de servidores Nginx.",
    },
  ],
  stack: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "Shadcn/UI",
    "Google Charts",
    "Docker",
    "Azure Container Apps",
    "Azure DevOps",
    "Spring Boot",
    "Nginx",
  ],
};

export const experience = [
  {
    company: "Portal Telemedicina",
    title: "Frontend Engineer Sênior",
    period: "out/2024 — jan/2025",
    place: "Barueri, SP · Remoto",
    points: [
      "Interfaces responsivas e acessíveis com Angular, TypeScript, HTML e CSS.",
      "Princípios de UI/UX para experiências intuitivas e testes para garantir robustez.",
      "Integração com APIs e serviços, com pipelines em GitHub Actions.",
    ],
    stack: ["Angular", "TypeScript", "GitHub Actions"],
  },
  {
    company: "Olos Tecnologia",
    title: "Frontend Engineer Pleno",
    period: "out/2023 — jun/2024",
    place: "São Paulo, SP",
    points: [
      "Interfaces com React, TypeScript, Next.js, Styled Components e Material UI.",
      "Layouts responsivos e boas práticas de UI/UX.",
      "Gestão de pipelines CI/CD com GitHub Actions.",
    ],
    stack: ["React", "Next.js", "Material UI"],
  },
  {
    company: "SAFIRA Soluções & Tecnologia",
    title: "Frontend Engineer Pleno",
    period: "mar/2022 — set/2023",
    place: "São Paulo · Híbrido",
    points: [
      "Único desenvolvedor frontend: defini a stack e a arquitetura de ponta a ponta.",
      "Componentes reutilizáveis em React/TypeScript, autenticação JWT e APIs RESTful.",
      "Decisões técnicas de performance e segurança; mentoria de desenvolvedores juniores.",
    ],
    stack: ["React", "TypeScript", "AWS", "Azure"],
  },
  {
    company: "Clude — Cartão de Saúde 360°",
    title: "Analista Desenvolvedor Frontend",
    period: "fev/2020 — mar/2022",
    place: "São Paulo, SP",
    points: [
      "Aplicações web responsivas com React.js, JavaScript, Sass e Bootstrap.",
      "Soluções focadas em usabilidade e experiência do usuário.",
    ],
    stack: ["React", "JavaScript", "Sass"],
  },
];

export type Project = {
  name: string;
  kind: string;
  description: string;
  stack: string[];
  repo?: string;
  live?: string;
  featured?: boolean;
  accent: string;
};

const gh = (repo: string) => `https://github.com/renanfrontend/${repo}`;

export const projects: Project[] = [
  {
    name: "MWM Portal",
    kind: "Produto corporativo · MWM",
    description:
      "Portal de Business Intelligence para operações agroindustriais: abastecimento, faturamento, coleta e cooperados, com RBAC por perfil e filial. Migrado de Bulma para Tailwind + Shadcn/UI.",
    stack: ["React", "TypeScript", "Tailwind", "Shadcn/UI", "Recharts", "Azure"],
    featured: true,
    accent: "#22d3ee",
  },
  {
    name: "Gemini Beyond Prompts",
    kind: "IA · RAG · Agentes",
    description:
      "Sistema de IA multifuncional: chat com memória via Google Gemini, análise de documentos com RAG e busca semântica, e agentes autônomos orquestrados com LangGraph.",
    stack: ["Next.js", "TypeScript", "Gemini", "RAG", "LangGraph"],
    repo: gh("gemini-beyond-prompts"),
    live: "https://gemini-beyond-prompts.vercel.app",
    featured: true,
    accent: "#a78bfa",
  },
  {
    name: "Manor Escape",
    kind: "Jogo web · 3D",
    description:
      "Escape room vitoriano no navegador com cofre 3D interativo. Fluxo modelado em XState, estado em Zustand, Clean Architecture e testes E2E com Playwright.",
    stack: ["React 19", "three.js", "R3F", "XState", "Zustand", "Playwright"],
    repo: gh("manor-escape"),
    featured: true,
    accent: "#f472b6",
  },
  {
    name: "HELIOS Lab",
    kind: "Game · Simulação física",
    description:
      "Survival horror em câmera fixa onde os puzzles são sistemas dinâmicos reais: pêndulo duplo caótico (RK4), convecção de Rayleigh e placa de Galton. Renderer e áudio procedurais próprios.",
    stack: ["TypeScript", "Canvas 2D", "WebAudio", "Física numérica"],
    repo: gh("helios-lab"),
    featured: true,
    accent: "#fb923c",
  },
  {
    name: "Escudo Cidadão",
    kind: "Cibersegurança · Fullstack",
    description:
      "Aplicação B2C que protege o cidadão contra fraudes digitais, com API Node.js dedicada à inteligência de ameaças.",
    stack: ["React", "TypeScript", "Material UI", "Node.js", "Express"],
    repo: gh("escudo-cidadao"),
    live: "https://escudo-cidadao.netlify.app/",
    accent: "#34d399",
  },
  {
    name: "Nexus 3D",
    kind: "Experiência 3D",
    description:
      "Portfólio 3D com tema Matrix: shaders GLSL, modelo sci-fi e efeito de chuva de código em React Three Fiber.",
    stack: ["R3F", "GLSL", "three.js", "Vite"],
    repo: gh("nexus-3d"),
    accent: "#4ade80",
  },
  {
    name: "GasControl",
    kind: "Dashboard · IoT",
    description:
      "Gestão de consumo de gás em condomínios: KPIs, gráficos de consumo, alertas, sidebar inteligente e tema claro/escuro.",
    stack: ["React", "TypeScript", "Charts"],
    repo: gh("gascontrol-frontend"),
    accent: "#38bdf8",
  },
  {
    name: "Paróquia Conectada",
    kind: "App mobile",
    description:
      "App React Native para comunicação paroquial: horários, liturgia diária, mural, pedidos de oração e dízimo via PIX, com cache offline.",
    stack: ["React Native", "Expo Router", "Supabase", "TypeScript"],
    repo: gh("paroquia-app"),
    accent: "#facc15",
  },
];

export const skills = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript ES6+", "Vite", "Redux", "React Query", "Angular", "Vue"],
  },
  {
    group: "UI / UX",
    items: ["Tailwind CSS", "Shadcn/UI", "Styled Components", "Material UI", "Acessibilidade", "Figma", "three.js"],
  },
  {
    group: "IA & Produtividade",
    items: ["Claude Code", "Google Gemini", "GitHub Copilot", "ChatGPT", "Prompt Engineering", "LLMs", "RAG"],
  },
  {
    group: "DevOps & Cloud",
    items: ["Docker", "Azure DevOps", "Azure Container Apps", "ACR", "Nginx", "GitHub Actions", "CI/CD"],
  },
];

export const education = [
  {
    title: "Pós-graduação em Inteligência Artificial e Ciência de Dados",
    org: "Universidade São Judas Tadeu",
    period: "2026 — atual",
  },
  {
    title: "Análise e Desenvolvimento de Sistemas",
    org: "Universidade São Judas Tadeu",
    period: "Graduação",
  },
  {
    title: "Interação Humano-Computador e UX",
    org: "Universidade São Judas Tadeu",
    period: "Certificação · 2026",
  },
  {
    title: "Acessibilidade com React",
    org: "Rocketseat",
    period: "Certificação · 2025",
  },
];
