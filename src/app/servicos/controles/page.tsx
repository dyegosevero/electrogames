import type { Metadata } from "next";
import { LPNavbar } from "@/components/ui/LPNavbar";
import { Footer } from "@/components/sections/Footer";
import { LPControlesBody } from "./LPControlesBody";

export const metadata: Metadata = {
  title: "Upgrade & Reparo de Controles — Eletro Games",
  description:
    "Hall Effect, paddles, conserto de drift e personalização para PS4, PS5, Xbox e Joy-Con. Diagnóstico gratuito em Curitiba.",
};

export default function ControlesPage() {
  return (
    <>
      <LPNavbar />
      <main>
        <LPControlesBody />
      </main>
      <Footer />
    </>
  );
}
