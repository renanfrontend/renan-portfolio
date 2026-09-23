import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/content/data";
import "./globals.css";

const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profile.shortName} — ${profile.role}`,
  description: profile.summary,
  keywords: ["Senior Frontend Engineer", "React", "Next.js", "TypeScript", "three.js", "Renan Augusto", "portfólio"],
  authors: [{ name: profile.name, url: profile.linkedin }],
  openGraph: {
    title: `${profile.shortName} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = { themeColor: "#05060a" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${grotesk.variable} ${jetbrains.variable} antialiased`}>
      <body className="noise font-sans">{children}</body>
    </html>
  );
}
