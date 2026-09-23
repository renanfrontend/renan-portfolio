import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { experience, profile, skills } from "@/content/data";
import { siteUrl } from "@/content/site";
import "./globals.css";

const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const title = `${profile.shortName} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: profile.pitch,
  keywords: ["Senior Frontend Engineer", "React", "Next.js", "TypeScript", "three.js", "Renan Augusto", "portfólio", "São Paulo"],
  authors: [{ name: profile.name, url: profile.linkedin }],
  alternates: { canonical: "/" },
  openGraph: { title, description: profile.pitch, type: "profile", locale: "pt_BR", url: "/" },
  twitter: { card: "summary_large_image", title, description: profile.pitch },
};

export const viewport: Viewport = { themeColor: "#05060a" };

// Dados estruturados: ajudam o Google a exibir nome, cargo e perfis ao buscarem por você.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.summary,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressCountry: "BR" },
  sameAs: [profile.linkedin, profile.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade São Judas Tadeu" },
  hasOccupation: { "@type": "Occupation", name: profile.role, skills: skills.flatMap((g) => g.items).join(", ") },
  knowsAbout: [...new Set(experience.flatMap((r) => r.stack))],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${grotesk.variable} ${jetbrains.variable} antialiased`}>
      <body className="noise font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
