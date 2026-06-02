"use client";

import Image from "next/image";
import { ArrowUpRight, Package, CreditCard, ShieldCheck } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";

const categories = [
  {
    id: "c1",
    title: "Controles",
    subtitle: "Hall Effect · Paddles · Conserto",
    image: "/services/ctrl-analog.jpg",
    href: "/servicos/controles",
  },
  {
    id: "c2",
    title: "Consoles",
    subtitle: "PS5 · Xbox · Nintendo",
    image: "/services/console-manut.jpg",
    href: "/servicos/consoles",
  },
  {
    id: "c3",
    title: "Computadores",
    subtitle: "PCs · Notebooks · Upgrades",
    image: "/services/ctrl-bateria.jpg",
    href: "/servicos/computadores",
  },
  {
    id: "c4",
    title: "Celulares",
    subtitle: "Tela · Bateria · Peças",
    image: "/services/celular.jpg",
    href: "/servicos/celulares",
  },
];

const trustItems = [
  {
    icon: Package,
    label: "Para todo o Brasil",
    sub: "Envio nacional garantido",
  },
  {
    icon: CreditCard,
    label: "Parcelado ou à vista",
    sub: "Até 12x no cartão",
  },
  {
    icon: ShieldCheck,
    label: "Até 1 ano de garantia",
    sub: "Em todos os serviços",
  },
];

export function ServiceCategoriesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(57,255,20,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] flex flex-col gap-14">

        {/* Header */}
        <AnimatedSection className="flex flex-col items-center gap-4 text-center">
          <AnimatedItem>
            <EyebrowBadge>ELECTRO GAMES // SERVIÇOS</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="font-sans text-3xl font-semibold leading-[0.98] tracking-tighter text-foreground sm:text-4xl md:text-5xl">
              O que você{" "}
              <span className="text-accent">procura?</span>
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
              Escolha o serviço, veja os detalhes e solicite o orçamento em minutos.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        {/* Cards */}
        <AnimatedSection className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <AnimatedItem key={c.id} className="h-full">
              <a href={c.href} className="group block h-full overflow-hidden rounded-[20px] border border-white/[0.08] bg-[rgba(24,24,27,0.55)] backdrop-blur-[20px] transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(57,255,20,0.07)]">

                {/* Imagem — topo do card */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Gradient fade imagem → card */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, rgba(24,24,27,0.85) 100%)",
                    }}
                  />
                  {/* Glow verde sutil no canto inferior */}
                  <div
                    className="pointer-events-none absolute bottom-0 inset-x-0 h-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(57,255,20,0.18) 0%, transparent 70%)",
                    }}
                  />
                </div>

                {/* Texto */}
                <div className="flex flex-col gap-1.5 px-5 pb-5 pt-4">
                  <h3 className="font-sans text-base font-bold leading-tight tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    {c.subtitle}
                  </p>
                  <div className="mt-3 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    <span>Ver detalhes</span>
                    <ArrowUpRight
                      size={10}
                      weight="bold"
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>

              </a>
            </AnimatedItem>
          ))}
        </AnimatedSection>

        {/* Trust badges */}
        <AnimatedSection className="flex flex-col items-start gap-6 border-t border-white/[0.06] pt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-12">
          {trustItems.map((t) => (
            <AnimatedItem key={t.label}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <t.icon size={18} weight="light" className="text-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-semibold text-foreground">
                    {t.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    {t.sub}
                  </span>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>

      </div>
    </section>
  );
}
