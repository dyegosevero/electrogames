import type { Metadata } from "next";
import { LPNavbar } from "@/components/ui/LPNavbar";
import { Footer } from "@/components/sections/Footer";
import { LPCelularesBody } from "./LPCelularesBody";

export const metadata: Metadata = {
  title: "Reparo de Celulares — Eletro Games",
  description:
    "Troca de tela, bateria, conector de carga e reparos gerais em iPhone, Samsung, Motorola e Xiaomi. Diagnóstico gratuito em Curitiba.",
};

export default function CelularesPage() {
  return (
    <>
      <LPNavbar />
      <main>
        <LPCelularesBody />
      </main>
      <Footer />
    </>
  );
}
