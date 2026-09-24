import type { Locale } from "@/i18n/config";

export type LevelKey = "analyst" | "mid" | "senior";

export type Role = {
  id: string;
  company: string;
  title: string;
  level: LevelKey;
  period: string;
  place: string;
  summary: string;
  points: string[];
  stack: string[];
};

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

/**
 * Tudo o que a página mostra em um idioma. Títulos aceitam uma marcação mínima:
 * `{texto}` → gradiente e `**texto**` → destaque em branco (veja `Rich` em ui.tsx).
 */
export type Content = {
  locale: Locale;
  htmlLang: string;
  ogLocale: string;
  profile: {
    role: string;
    tagline: string;
    location: string;
    workModes: string;
    cv: string;
    status: string;
    pitch: string;
    summary: string;
    heroLead: string;
  };
  stats: { value: number; suffix: string; label: string }[];
  strengths: { title: string; text: string }[];
  experience: Role[];
  projects: Project[];
  services: { title: string; text: string; tags: string[]; example: string }[];
  workflow: { step: string; title: string; text: string }[];
  skills: { group: string; items: string[] }[];
  education: { title: string; org: string; period: string }[];
  ui: {
    meta: { keywords: string[] };
    skipLink: string;
    boot: string[];
    nav: { links: { href: string; label: string; n: string }[]; hire: string; openMenu: string; closeMenu: string; language: string };
    hero: { downloadCv: string; project: string; scroll: string; hud: string };
    about: { label: string; title: string };
    career: {
      label: string;
      title: string;
      sub: string;
      levels: Record<LevelKey, string>;
      levelTag: string;
      since: string;
      companies: string;
      education: string;
      certifications: string;
    };
    projects: {
      label: string;
      title: string;
      sub: string;
      proprietary: string;
      live: string;
      code: string;
      more: string;
      repos: string;
      open: string;
      screenshotOf: string;
      internalHost: string;
      dashboardKpis: string[];
    };
    services: {
      label: string;
      title: string;
      sub: string;
      example: string;
      howIWork: string;
      ctaTitle: string;
      ctaText: string;
      ctaButton: string;
      budgetSubject: string;
      budgetBody: string;
    };
    stack: { label: string; title: string; sub: string; rows: string[][] };
    contact: {
      label: string;
      title: string;
      recruiters: { tag: string; title: string; text: string; primary: string; secondary: string; subject: string };
      clients: { tag: string; title: string; text: string; primary: string; secondary: string };
      footer: string;
      backToTop: string;
    };
  };
};
