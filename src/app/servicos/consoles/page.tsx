import type { Metadata } from "next";
import { LPNavbar } from "@/components/ui/LPNavbar";
import { Footer } from "@/components/sections/Footer";
import { LPConsolesBody } from "./LPConsolesBody";

export const metadata: Metadata = {
  title: "Manutenção de Consoles — Eletro Games",
  description:
    "Limpeza preventiva, metal líquido Thermal Grizzly, pasta térmica SnowDog e reparos gerais em PS5, PS4, Xbox e Nintendo Switch. Diagnóstico gratuito em Curitiba.",
};

export default function ConsolesPage() {
  return (
    <>
      <LPNavbar />
      <main>
        <LPConsolesBody />
      </main>
      <Footer />
    </>
  );
}
