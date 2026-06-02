"use client";

import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowUpRight } from "@phosphor-icons/react";

const services = [
  {
    id: "s1",
    icon: "🎮",
    title: "Manutenção Geral",
    description:
      "Diagnóstico completo do console, identificação de falhas e reparo especializado. PS5, Xbox Series, PS4, Xbox One e Nintendo Switch.",
    tag: "DIAGNÓSTICO GRÁTIS",
    href: "/servicos/manutencao-geral",
  },
  {
    id: "s2",
    icon: "❄️",
    title: "Limpeza & Pasta Térmica",
    description:
      "Limpeza interna profunda e troca de pasta térmica. Elimina superaquecimento, barulho excessivo e quedas de desempenho.",
    tag: "MAIS VENDIDO",
    href: "/servicos/limpeza-pasta-termica",
  },
  {
    id: "s3",
    icon: "🔧",
    title: "Troca de Peças",
    description:
      "Analógicos, botões, leitor de disco, cooler e tampa. Usamos peças originais e compatíveis com garantia de serviço.",
    tag: "PEÇAS COM GARANTIA",
    href: "/servicos/troca-de-pecas",
  },
  {
    id: "s4",
    icon: "💾",
    title: "Upgrade de Armazenamento",
    description:
      "Instalação de SSD e HD externo. Mais espaço, carregamentos mais rápidos e melhor performance geral no seu console.",
    tag: "SSD & HD",
    href: "/servicos/upgrade-armazenamento",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32"
    >
      {/* Ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(57,255,20,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 80% 60%, rgba(57,255,20,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] flex flex-col gap-12 md:gap-16">
        <AnimatedSection className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
          <AnimatedItem>
            <div className="flex flex-col gap-3">
              <EyebrowBadge>ELECTRO GAMES // SERVIÇOS</EyebrowBadge>
              <h2 className="font-sans text-3xl font-semibold leading-[0.98] tracking-tighter text-foreground sm:text-4xl md:text-6xl">
                Nas mãos de{" "}
                <span className="text-accent">quem entende.</span>
              </h2>
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base lg:text-lg">
              Mais de 5 anos consertando e otimizando consoles. Cada serviço
              começa com um diagnóstico gratuito — você aprova antes, a gente executa depois.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <AnimatedItem key={s.id} className="h-full">
              <a
                href={s.href}
                className="card-surface group flex h-full flex-col gap-4 p-5 md:p-7 transition-all duration-300 hover:border-accent/20 hover:shadow-[0_0_40px_rgba(57,255,20,0.06)] hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl md:text-3xl">{s.icon}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent text-right">
                    {s.tag}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="font-sans text-base font-semibold tracking-tight text-foreground md:text-lg">
                    {s.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-zinc-400">
                    {s.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-200 group-hover:text-accent">
                    Ver detalhes
                  </span>
                  <ArrowUpRight
                    size={13}
                    weight="bold"
                    className="text-zinc-600 transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </a>
            </AnimatedItem>
          ))}
        </AnimatedSection>

        <AnimatedSection>
          <AnimatedItem>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md transition-all duration-200 hover:bg-accent/[0.15] active:translate-y-[1px]"
              >
                Pedir orçamento
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <div className="flex flex-col gap-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:flex-row sm:gap-3 sm:items-center">
                <span>Resposta imediata</span>
                <span className="hidden sm:inline text-zinc-700">&middot;</span>
                <span>WhatsApp disponível</span>
              </div>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
