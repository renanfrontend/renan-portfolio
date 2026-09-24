import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, pickLocale } from "@/i18n/config";

/**
 * Quem abre a raiz do site é enviado para /pt ou /en.
 * A região vem do cabeçalho de geolocalização da Vercel; localmente ele não existe
 * e a escolha cai no idioma do navegador (veja pickLocale).
 */
export function proxy(request: NextRequest) {
  const locale = pickLocale({
    cookie: request.cookies.get(LOCALE_COOKIE)?.value,
    country: request.headers.get("x-vercel-ip-country"),
    acceptLanguage: request.headers.get("accept-language"),
  });
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: "/" };
