"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Content } from "@/content/types";

const I18nContext = createContext<Content | null>(null);

export function I18nProvider({ content, children }: { content: Content; children: ReactNode }) {
  return <I18nContext.Provider value={content}>{children}</I18nContext.Provider>;
}

/** Conteúdo do idioma atual (textos, dados e rótulos da interface). */
export function useContent() {
  const content = useContext(I18nContext);
  if (!content) throw new Error("useContent precisa estar dentro de <I18nProvider>");
  return content;
}
