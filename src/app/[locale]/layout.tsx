import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { getContent, person } from "@/content";
import { siteUrl } from "@/content/site";
import { isLocale, locales } from "@/i18n/config";
import { I18nProvider } from "@/i18n/provider";
import "../globals.css";

const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { profile, ui, ogLocale } = getContent(locale);
  const title = `${person.shortName} — ${profile.role}`;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description: profile.pitch,
    keywords: ui.meta.keywords,
    authors: [{ name: person.name, url: person.linkedin }],
    alternates: {
      canonical: `/${locale}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title,
      description: profile.pitch,
      type: "profile",
      locale: ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => getContent(l).ogLocale),
      url: `/${locale}`,
    },
    twitter: { card: "summary_large_image", title, description: profile.pitch },
  };
}

export const viewport: Viewport = { themeColor: "#05060a" };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const { profile, experience, skills } = content;

  // Dados estruturados: ajudam o Google a exibir nome, cargo e perfis ao buscarem por você.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: profile.role,
    description: profile.summary,
    url: `${siteUrl}/${locale}`,
    email: `mailto:${person.email}`,
    address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressCountry: "BR" },
    sameAs: [person.linkedin, person.github],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade São Judas Tadeu" },
    hasOccupation: { "@type": "Occupation", name: profile.role, skills: skills.flatMap((g) => g.items).join(", ") },
    knowsAbout: [...new Set(experience.flatMap((r) => r.stack))],
  };

  return (
    <html lang={content.htmlLang} className={`${grotesk.variable} ${jetbrains.variable} antialiased`}>
      <body className="noise font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <I18nProvider content={content}>{children}</I18nProvider>
      </body>
    </html>
  );
}
