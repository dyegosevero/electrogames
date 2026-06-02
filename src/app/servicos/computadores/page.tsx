import type { Metadata } from "next";
import { LPNavbar } from "@/components/ui/LPNavbar";
import { Footer } from "@/components/sections/Footer";
import { LPComputadoresBody } from "./LPComputadoresBody";

export const metadata: Metadata = {
  title: "Computadores & Notebooks — Eletro Games",
  description:
    "Upgrade de peças, formatação, limpeza preventiva e reparos em PCs gamer, notebooks e workstations. Diagnóstico gratuito em Curitiba.",
};

export default function ComputadoresPage() {
  return (
    <>
      <LPNavbar />
      <main>
        <LPComputadoresBody />
      </main>
      <Footer />
    </>
  );
}
