"use client";

import { ArrowUpRight, Star } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";

const reviews = [
  {
    name: "Gabriel M.",
    initial: "G",
    rating: 5,
    date: "Mar 2025",
    text: "Levei meu PS5 pra troca de metal líquido e fiquei impressionado com o resultado. Console voltou a funcionar em silêncio. Diagnóstico na hora, entrega no mesmo dia.",
  },
  {
    name: "Lucas S.",
    initial: "L",
    rating: 5,
    date: "Fev 2025",
    text: "Instalaram Hall Effect no meu DualSense e a diferença é absurda. Zero drift, precisão total. Ainda veio com 6 meses de garantia. Não levo mais em outro lugar.",
  },
  {
    name: "Ana P.",
    initial: "A",
    rating: 5,
    date: "Abr 2025",
    text: "Diagnóstico gratuito, orçamento honesto e entrega no mesmo dia. Meu Xbox Series X voltou como novo. Profissionalismo de verdade — raríssimo no mercado.",
  },
  {
    name: "Rodrigo T.",
    initial: "R",
    rating: 5,
    date: "Jan 2025",
    text: "Colocaram paddles no meu controle PS5 e ficou incrível. Parece um controle Pro. Qualidade excelente e preço justo. Recomendo demais pra quem quer jogar melhor.",
  },
  {
    name: "Fernanda K.",
    initial: "F",
    rating: 5,
    date: "Mai 2025",
    text: "Meu Switch estava com joystick travando. Resolveram na hora. Profissionais que entendem o que os gamers precisam — atendimento rápido e sem enrolação.",
  },
  {
    name: "Diego V.",
    initial: "D",
    rating: 5,
    date: "Mar 2025",
    text: "Limpeza preventiva no PS4 Pro. O console parou de fazer aquele barulho absurdo do ventilador. Vale cada centavo. Peguei no mesmo dia, zero stress.",
  },
];

export function FeedbacksSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 75% 50%, rgba(57,255,20,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] flex flex-col gap-14">

        {/* Header */}
        <AnimatedSection className="flex flex-col items-center gap-5 text-center">
          <AnimatedItem>
            <EyebrowBadge>ELETRO GAMES // AVALIAÇÕES</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <div className="flex items-center gap-2.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} weight="fill" className="text-accent" />
              ))}
              <span className="ml-1 font-sans text-xl font-bold text-foreground">5.0</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                no Google
              </span>
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="font-sans text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
              O que nossos clientes{" "}
              <span className="text-accent">dizem.</span>
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        {/* Reviews grid */}
        <AnimatedSection className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <AnimatedItem key={r.name} className="h-full">
              <div className="card-surface flex h-full flex-col gap-4 p-6">
                {/* Stars + date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={13} weight="fill" className="text-accent" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
                    {r.date}
                  </span>
                </div>

                {/* Review text */}
                <p className="flex-1 font-sans text-sm leading-relaxed text-zinc-300">
                  &ldquo;{r.text}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-bold text-accent">
                    {r.initial}
                  </div>
                  <span className="font-sans text-sm font-medium text-foreground">
                    {r.name}
                  </span>
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-600">
                    Google
                  </span>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>

        {/* Ver todas */}
        <AnimatedSection className="flex justify-center">
          <AnimatedItem>
            <a
              href="https://g.page/r/eletrogames"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 transition-all duration-200 hover:border-accent/20 hover:text-accent"
            >
              Ver todas avaliações no Google
              <ArrowUpRight
                size={12}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </AnimatedItem>
        </AnimatedSection>

      </div>
    </section>
  );
}
