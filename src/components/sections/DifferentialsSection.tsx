"use client";

import { ShieldCheck, Shield, Wrench, Headset, Star, Timer } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";

const items = [
  {
    icon: Shield,
    title: "6 meses de garantia",
    desc: "Em todos os analógicos Hall Effect instalados. A maior garantia do mercado.",
    accent: true,
  },
  {
    icon: ShieldCheck,
    title: "90 dias de garantia",
    desc: "Em todos os demais serviços de reparo, upgrade e manutenção.",
    accent: false,
  },
  {
    icon: Wrench,
    title: "Diagnóstico gratuito",
    desc: "Avaliamos seu equipamento sem cobrar nada. Você aprova o orçamento antes.",
    accent: false,
  },
  {
    icon: Headset,
    title: "Especializado em gamers",
    desc: "Atendimento focado em performance. Entendemos o que você precisa para jogar melhor.",
    accent: false,
  },
  {
    icon: Star,
    title: "Peças premium",
    desc: "Hall Effect, Metal Líquido Thermal Grizzly, Pasta SnowDog. Só o que funciona de verdade.",
    accent: false,
  },
  {
    icon: Timer,
    title: "Entrega ágil",
    desc: "Maioria dos serviços entregues no mesmo dia ou em até 24h após aprovação.",
    accent: false,
  },
];

export function DifferentialsSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(57,255,20,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] flex flex-col gap-14">
        <AnimatedSection className="flex flex-col items-center gap-4 text-center">
          <AnimatedItem>
            <EyebrowBadge>ELETRO GAMES // DIFERENCIAIS</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="font-sans text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
              Por que escolher a{" "}
              <span className="text-accent">Eletro Games?</span>
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <AnimatedItem key={item.title}>
              <div
                className={`card-surface flex h-full flex-col gap-4 p-6 transition-all duration-300 hover:border-accent/20 ${
                  item.accent ? "border-accent/30 bg-accent/[0.04]" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    item.accent
                      ? "border-accent/40 bg-accent/[0.12]"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <item.icon
                    size={20}
                    weight={item.accent ? "fill" : "light"}
                    className={item.accent ? "text-accent" : "text-zinc-400"}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3
                    className={`font-sans text-base font-semibold tracking-tight ${
                      item.accent ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
