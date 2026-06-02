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
  title: "Electro Games — Sua Loja Gamer",
  description:
    "Games, consoles e acessórios com os melhores preços. Role para entrar na arena.",
  metadataBase: new URL("http://localhost:3000"),
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
