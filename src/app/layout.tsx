import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { getSettings } from "@/lib/getSettings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Electro Games — Sua Loja Gamer em Curitiba",
  description:
    "Electro Games em Curitiba: consoles, games e acessórios novos e seminovos. PlayStation, Xbox, Nintendo e mais. Venha nos visitar ou fale pelo WhatsApp.",
  metadataBase: new URL("https://www.electrogames.com.br"),
  alternates: {
    canonical: "https://www.electrogames.com.br",
  },
  openGraph: {
    title: "Electro Games — Sua Loja Gamer em Curitiba",
    description:
      "Consoles, games e acessórios novos e seminovos. PlayStation, Xbox, Nintendo e mais.",
    url: "https://www.electrogames.com.br",
    siteName: "Electro Games",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const footerScript = settings.footer_script ?? "";

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-background text-foreground grain">
        <SettingsProvider settings={{
          whatsapp_phone: settings.whatsapp_phone ?? "5500000000000",
          webhook_url: settings.webhook_url ?? "",
        }}>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </SettingsProvider>
        {footerScript && (
          <div dangerouslySetInnerHTML={{ __html: footerScript }} />
        )}
      </body>
    </html>
  );
}
