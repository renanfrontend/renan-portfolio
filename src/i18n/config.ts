export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Países de língua portuguesa (ISO 3166-1 alfa-2). */
const LUSOPHONE = new Set(["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL", "MO", "GQ"]);

/**
 * Escolhe o idioma de quem chega na raiz do site.
 * 1. Escolha explícita salva em cookie (seletor PT/EN).
 * 2. Navegador com português como idioma principal — um brasileiro no exterior continua em PT.
 * 3. Região do IP (cabeçalho x-vercel-ip-country): país lusófono → PT, demais → EN.
 * 4. Sem nenhum sinal (ex.: ambiente local): idioma padrão.
 */
export function pickLocale({
  cookie,
  country,
  acceptLanguage,
}: {
  cookie?: string | null;
  country?: string | null;
  acceptLanguage?: string | null;
}): Locale {
  if (cookie && isLocale(cookie)) return cookie;
  const primary = acceptLanguage?.split(",")[0]?.trim().toLowerCase() ?? "";
  if (primary.startsWith("pt")) return "pt";
  if (country) return LUSOPHONE.has(country.toUpperCase()) ? "pt" : "en";
  if (primary) return primary.startsWith("en") ? "en" : defaultLocale;
  return defaultLocale;
}
