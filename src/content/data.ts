export const profile = {
  name: "Renan Augusto dos Santos",
  shortName: "Renan Augusto",
  role: "Senior Frontend Engineer",
  tagline: "React · TypeScript · Next.js · IA aplicada ao desenvolvimento",
  location: "São Paulo, Brasil",
  workModes: "Remoto · Híbrido",
  email: "renan.gabba@gmail.com",
  linkedin: "https://www.linkedin.com/in/renan-augusto-santos/",
  github: "https://github.com/renanfrontend",
  cv: "/curriculo-renan-augusto.pdf",
  status: "Disponível para vagas e projetos",
  pitch:
    "Senior Frontend Engineer com 6+ anos entregando produtos web em React, Next.js e TypeScript — de dashboards corporativos a experiências 3D. Uso IA no dia a dia de engenharia para entregar mais rápido, com qualidade.",
  summary:
    "Senior Frontend Engineer com mais de 6 anos construindo aplicações web modernas, escaláveis e de alta performance no ecossistema React, TypeScript e Next.js. Integro Inteligência Artificial ao ciclo de desenvolvimento — Claude Code, Gemini, Copilot e Prompt Engineering — para acelerar entregas e elevar a qualidade do produto, com base sólida em arquitetura, UI/UX, Cloud e CI/CD.",
};

export const stats = [
  { value: 6, suffix: "+", label: "anos em frontend" },
  { value: 60, suffix: "+", label: "repositórios públicos" },
  { value: 70, suffix: "+", label: "certificações" },
];

/** Diferenciais que um recrutador precisa enxergar em segundos. */
export const strengths = [
  { title: "Sênior de ponta a ponta", text: "Da definição de stack e arquitetura ao deploy em nuvem — já atuei como único frontend de um produto." },
  { title: "IA no fluxo de engenharia", text: "Claude Code, Gemini e Copilot no dia a dia; pós-graduação em IA e Ciência de Dados em andamento." },
  { title: "Produto e UX", text: "Interfaces acessíveis e responsivas, modernização de legado e dashboards orientados a dados." },
];

export type Level = "Sênior" | "Pleno" | "Analista";

export type Role = {
  id: string;
  company: string;
  title: string;
  level: Level;
  period: string;
  place: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "mwm",
    company: "MWM Motores e Geradores",
    title: "Senior Frontend Engineer",
    level: "Sênior",
    period: "set/2025 — set/2026",
    place: "São Paulo · Híbrido",
    summary: "Frontend de sistemas corporativos e logísticos, do componente à infraestrutura no Azure.",
    points: [
      "Construí SPAs e PWAs em React, TypeScript e Vite para o MWM Portal e o Bio Plantas.",
      "Entreguei dashboards de logística e qualidade (Google Charts) que centralizaram a gestão de portaria, cooperados e dados operacionais.",
      "Modernizei interfaces legadas para Tailwind CSS e Shadcn/UI, elevando responsividade e acessibilidade.",
      "Automatizei build e deploy com Docker, Azure Container Apps, ACR e pipelines no Azure DevOps.",
      "Integrei o frontend a APIs REST em Java Spring Boot e configurei servidores Nginx.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Shadcn/UI", "Docker", "Azure", "Spring Boot"],
  },
  {
    id: "portal-telemedicina",
    company: "Portal Telemedicina",
    title: "Frontend Engineer Sênior",
    level: "Sênior",
    period: "out/2024 — jan/2025",
    place: "Barueri, SP · Remoto",
    summary: "Interfaces para uma plataforma de telemedicina em Angular.",
    points: [
      "Desenvolvi interfaces responsivas e acessíveis com Angular e TypeScript.",
      "Traduzi layouts em código limpo, aplicando princípios de UI/UX e testes para garantir robustez.",
      "Integrei APIs e serviços com entrega contínua via GitHub Actions.",
    ],
    stack: ["Angular", "TypeScript", "GitHub Actions"],
  },
  {
    id: "olos",
    company: "Olos Tecnologia",
    title: "Frontend Engineer Pleno",
    level: "Pleno",
    period: "out/2023 — jun/2024",
    place: "São Paulo, SP",
    summary: "Produtos web em React e Next.js com foco em UI/UX.",
    points: [
      "Desenvolvi interfaces com React, Next.js, TypeScript, Styled Components e Material UI.",
      "Implementei layouts responsivos seguindo boas práticas de UI/UX.",
      "Mantive pipelines de CI/CD no GitHub Actions para entregas contínuas e seguras.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Material UI"],
  },
  {
    id: "safira",
    company: "SAFIRA Soluções & Tecnologia",
    title: "Frontend Engineer Pleno",
    level: "Pleno",
    period: "mar/2022 — set/2023",
    place: "São Paulo · Híbrido",
    summary: "Único desenvolvedor frontend do produto — dono da stack e da arquitetura.",
    points: [
      "Defini a stack e estruturei a arquitetura frontend de ponta a ponta.",
      "Criei biblioteca de componentes reutilizáveis em React/TypeScript, autenticação JWT e integrações REST.",
      "Tomei decisões técnicas de performance, escalabilidade e segurança e mentorei desenvolvedores juniores.",
      "Atuei com cloud AWS/Azure e esteiras de CI/CD.",
    ],
    stack: ["React", "TypeScript", "JWT", "AWS", "Azure"],
  },
  {
    id: "clude",
    company: "Clude — Cartão de Saúde 360°",
    title: "Analista Desenvolvedor Frontend",
    level: "Analista",
    period: "fev/2020 — mar/2022",
    place: "São Paulo, SP",
    summary: "Onde comecei: aplicações web de saúde em React.",
    points: [
      "Desenvolvi aplicações web responsivas com React.js, JavaScript, Sass e Bootstrap.",
      "Entreguei soluções focadas em usabilidade e experiência do usuário.",
    ],
    stack: ["React", "JavaScript", "Sass", "Bootstrap"],
  },
];

export type Project = {
  name: string;
  kind: string;
  /** Uma frase: o que o projeto resolve, para leitura rápida. */
  headline: string;
  description: string;
  stack: string[];
  repo?: string;
  live?: string;
  image?: string;
  featured?: boolean;
  accent: string;
};

const gh = (repo: string) => `https://github.com/renanfrontend/${repo}`;

export const projects: Project[] = [
  {
    name: "MWM Portal",
    kind: "Produto corporativo · Indústria",
    headline: "BI para operações agroindustriais, do dado à decisão.",
    description:
      "Portal de Business Intelligence para abastecimento, faturamento, coleta e cooperados, com controle de acesso por perfil e filial. Interface migrada de Bulma para Tailwind + Shadcn/UI.",
    stack: ["React", "TypeScript", "Tailwind", "Shadcn/UI", "Recharts", "Azure"],
    featured: true,
    accent: "#22d3ee",
  },
  {
    name: "Aster Centro Terapêutico",
    kind: "Cliente · Site institucional",
    headline: "Presença digital que transmite acolhimento e gera contato.",
    description:
      "Site completo para uma clínica: landing responsiva com tema claro/escuro, blog com compartilhamento, contato via WhatsApp e formulário, consentimento LGPD e SEO com sitemap e Open Graph.",
    stack: ["HTML", "CSS", "JavaScript", "SEO", "LGPD"],
    repo: gh("aster-ct"),
    live: "https://renanfrontend.github.io/aster-ct/",
    image: "/projects/aster.png",
    featured: true,
    accent: "#facc15",
  },
  {
    name: "Escudo Cidadão",
    kind: "Cibersegurança · Fullstack",
    headline: "Proteção contra fraudes digitais para o cidadão comum.",
    description:
      "Aplicação B2C com painel de score de segurança, verificação de links e monitoramento, consumindo uma API Node.js dedicada à inteligência de ameaças.",
    stack: ["React", "TypeScript", "Material UI", "Node.js", "Express"],
    repo: gh("escudo-cidadao"),
    live: "https://escudo-cidadao.netlify.app/",
    image: "/projects/escudo.png",
    featured: true,
    accent: "#a78bfa",
  },
  {
    name: "Manor Escape",
    kind: "Jogo web · 3D",
    headline: "Escape room jogável no navegador, com cofre em 3D.",
    description:
      "Quatro enigmas encadeados e um cofre 3D interativo. Fluxo modelado em XState, estado em Zustand, Clean Architecture e testes E2E com Playwright.",
    stack: ["React 19", "three.js", "R3F", "XState", "Zustand", "Playwright"],
    repo: gh("manor-escape"),
    live: "https://renanfrontend.github.io/manor-escape/",
    image: "/projects/manor.png",
    featured: true,
    accent: "#e0b566",
  },
  {
    name: "Gemini Beyond Prompts",
    kind: "IA · RAG · Agentes",
    headline: "Chat, análise de documentos e agentes em um só lugar.",
    description:
      "Sistema de IA multifuncional: chat com memória via Google Gemini, análise de documentos com RAG e busca semântica, e agentes autônomos orquestrados com LangGraph.",
    stack: ["Next.js", "TypeScript", "Gemini", "RAG", "LangGraph"],
    repo: gh("gemini-beyond-prompts"),
    live: "https://gemini-beyond-prompts.vercel.app",
    image: "/projects/gemini.png",
    featured: true,
    accent: "#60a5fa",
  },
  {
    name: "HELIOS Lab",
    kind: "Game · Simulação física",
    headline: "Puzzles que são sistemas físicos reais.",
    description:
      "Survival horror em câmera fixa com pêndulo duplo caótico (RK4), convecção de Rayleigh e placa de Galton. Renderer e áudio procedurais próprios.",
    stack: ["TypeScript", "Canvas 2D", "WebAudio"],
    repo: gh("helios-lab"),
    accent: "#fb923c",
  },
  {
    name: "GasControl",
    kind: "Dashboard · Condomínios",
    headline: "Consumo de gás sob controle.",
    description: "KPIs, gráficos de consumo, alertas, sidebar inteligente e tema claro/escuro.",
    stack: ["React", "TypeScript", "Charts"],
    repo: gh("gascontrol-frontend"),
    image: "/projects/gascontrol.png",
    accent: "#c084fc",
  },
  {
    name: "Nexus 3D",
    kind: "Experiência 3D",
    headline: "Portfólio 3D com tema Matrix.",
    description: "Shaders GLSL, modelo sci-fi e chuva de código em React Three Fiber.",
    stack: ["R3F", "GLSL", "three.js"],
    repo: gh("nexus-3d"),
    accent: "#4ade80",
  },
  {
    name: "Paróquia Conectada",
    kind: "App mobile",
    headline: "Comunicação paroquial no bolso.",
    description: "Horários, liturgia diária, mural, pedidos de oração e dízimo via PIX, com cache offline.",
    stack: ["React Native", "Expo", "Supabase"],
    repo: gh("paroquia-app"),
    accent: "#f472b6",
  },
];

export const services = [
  {
    title: "Sites e landing pages",
    text: "Rápidos, responsivos e prontos para o Google — pensados para transformar visita em contato.",
    tags: ["Next.js", "SEO", "Animações"],
    example: "Aster Centro Terapêutico",
  },
  {
    title: "Sistemas web e dashboards",
    text: "Painéis e portais que organizam dados e operação, com controle de acesso e ótima usabilidade.",
    tags: ["React", "TypeScript", "Gráficos"],
    example: "MWM Portal · GasControl",
  },
  {
    title: "Experiências 3D e interativas",
    text: "Produtos que marcam: WebGL, shaders e interações que fazem sua marca ser lembrada.",
    tags: ["three.js", "WebGL", "GLSL"],
    example: "Manor Escape · este site",
  },
  {
    title: "Produtos com IA",
    text: "Chat, análise de documentos e agentes integrados ao seu produto, com interface clara.",
    tags: ["Gemini", "RAG", "Agentes"],
    example: "Gemini Beyond Prompts",
  },
];

export const workflow = [
  { step: "01", title: "Descoberta", text: "Entendo o objetivo, o público e o que define sucesso." },
  { step: "02", title: "Protótipo", text: "Estrutura e visual validados antes de escrever código." },
  { step: "03", title: "Desenvolvimento", text: "Entregas frequentes, com código tipado e testado." },
  { step: "04", title: "Lançamento", text: "Deploy, SEO e acompanhamento para evoluir com dados." },
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
