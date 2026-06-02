"use client";

import { ArrowUpRight, Clock, MapPin } from "@phosphor-icons/react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";

export function LocationSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 80%, rgba(57,255,20,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] flex flex-col gap-12">

        {/* Header */}
        <AnimatedSection className="flex flex-col gap-4">
          <AnimatedItem>
            <EyebrowBadge>ELETRO GAMES // LOCALIZAÇÃO</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="font-sans text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
              Venha nos{" "}
              <span className="text-accent">visitar.</span>
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        {/* Content grid */}
        <AnimatedSection className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.8fr]">

          {/* Info card */}
          <AnimatedItem>
            <div className="card-surface flex flex-col gap-8 p-7 md:p-8 h-full">

              <div className="flex flex-col gap-5">
                {/* Endereço */}
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <MapPin size={18} weight="duotone" className="text-accent" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                      Endereço
                    </span>
                    <span className="font-sans text-sm font-medium leading-snug text-foreground">
                      R. Padre Estanislau Piasecki, 763
                      <br />
                      <span className="text-zinc-400">Cidade Industrial, Curitiba - PR</span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                      CEP 81280-040
                    </span>
                  </div>
                </div>

                {/* Horários */}
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Clock size={18} weight="duotone" className="text-accent" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                      Horário de Atendimento
                    </span>
                    <span className="font-sans text-sm leading-relaxed text-foreground">
                      Seg – Sex &nbsp;<span className="text-zinc-400">9h às 18h</span>
                    </span>
                    <span className="font-sans text-sm leading-relaxed text-foreground">
                      Sábado &nbsp;<span className="text-zinc-400">9h às 14h</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-white/[0.06] pt-6">
                <WhatsAppButton
                  label="Falar no WhatsApp"
                  message="Olá! Vim pelo site e gostaria de informações sobre localização e horários."
                />
                <a
                  href="https://maps.google.com/?q=R.+Padre+Estanislau+Piasecki,+763,+Cidade+Industrial+de+Curitiba,+Curitiba-PR,+81280-040"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500 transition-colors hover:text-accent"
                >
                  Abrir no Google Maps
                  <ArrowUpRight
                    size={11}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

            </div>
          </AnimatedItem>

          {/* Mapa */}
          <AnimatedItem>
            <div className="card-surface overflow-hidden" style={{ minHeight: 360 }}>
              {/*
                Substitua o src pelo embed do seu endereço real:
                1. Vá em maps.google.com
                2. Pesquise seu endereço
                3. Clique em Compartilhar → Incorporar mapa
                4. Copie o src do iframe e cole aqui
              */}
              <iframe
                src="https://maps.google.com/maps?q=R.+Padre+Estanislau+Piasecki,+763,+Cidade+Industrial+de+Curitiba,+Curitiba,+PR,+81280-040&t=&z=16&ie=UTF8&iwloc=&output=embed"
                title="Localização Eletro Games — Curitiba"
                className="h-full w-full"
                style={{ minHeight: 360, border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.6)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </AnimatedItem>

        </AnimatedSection>
      </div>
    </section>
  );
}
