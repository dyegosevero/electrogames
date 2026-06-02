"use client";

import {
  CheckCircle,
  HardDrive,
  Lightning,
  Monitor,
  Shield,
  Wrench,
  Recycle,
  Cpu,
  ShieldCheck,
  RocketLaunch,
} from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { LPHeroSection } from "@/components/ui/LPHeroSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const WA_MSG = "Olá! Vim pelo site da Eletro Games e gostaria de um orçamento para computador ou notebook.";

const services = [
  {
    icon: Lightning,
    title: "Upgrade de Peças",
    desc: "Memória RAM, SSD, placa de vídeo, processador. Mais performance com as melhores marcas do mercado.",
    badge: "Nvidia · AMD · Intel",
    accent: true,
  },
  {
    icon: HardDrive,
    title: "Formatação",
    desc: "Windows, drivers e programas essenciais instalados. PC limpo, rápido e sem lentidão.",
    badge: null,
    accent: false,
  },
  {
    icon: Recycle,
    title: "Limpeza Preventiva",
    desc: "Remoção de poeira, troca de pasta térmica e lubrificação dos coolers. PC mais frio e silencioso.",
    badge: null,
    accent: false,
  },
  {
    icon: Wrench,
    title: "Reparos Gerais",
    desc: "Teclado, tela, porta USB, cooler, fonte. Diagnóstico gratuito antes de qualquer serviço.",
    badge: "Diagnóstico grátis",
    accent: false,
  },
  {
    icon: Cpu,
    title: "Montagem de PC",
    desc: "Monte seu PC gamer ou workstation do zero. Escolha as peças, a gente monta e testa tudo.",
    badge: null,
    accent: false,
  },
  {
    icon: Monitor,
    title: "Troca de Tela",
    desc: "Notebook com tela quebrada ou sem imagem. Substituição rápida com tela compatível.",
    badge: null,
    accent: false,
  },
];

const devices = [
  { name: "Notebooks Gamer", tag: "Qualquer marca" },
  { name: "Notebooks Profissionais", tag: "Dell · Lenovo · HP · Asus" },
  { name: "PCs Gamer", tag: "Nvidia · AMD · Intel" },
  { name: "Workstations", tag: "Alta performance" },
  { name: "PCs Desktop", tag: "Montagem e reparo" },
  { name: "All-in-One", tag: "iMac e similares" },
];

const steps = [
  { n: "01", title: "Agendamento", desc: "Manda uma mensagem no WhatsApp ou traz o equipamento direto na loja. Zero burocracia." },
  { n: "02", title: "Diagnóstico Grátis", desc: "Avaliamos o hardware e identificamos o problema sem cobrar nada. Você aprova antes." },
  { n: "03", title: "Reparo ou Upgrade", desc: "Peças selecionadas, mãos especializadas. Nvidia, AMD, Intel — só o que funciona de verdade." },
  { n: "04", title: "Garantia Entregue", desc: "90 dias em todos os serviços. Você sai com o equipamento testado e garantia no papel." },
];

export function LPComputadoresBody() {
  return (
    <>
      <LPHeroSection
        badge="ELETRO GAMES // COMPUTADORES"
        line1="PC & Notebook,"
        line2="no limite."
        description="Upgrades, formatação, limpeza e reparos em PCs gamer, notebooks e workstations. Diagnóstico gratuito, peças de qualidade."
        whatsappMessage={WA_MSG}
        decorativeBg="PC"
        glowSide="right"
        stats={[
          { value: "90", label: "dias", sub: "Garantia" },
          { value: "24h", label: "prazo", sub: "Maioria dos serviços" },
          { value: "Grátis", label: "Diagnóstico", sub: "Sem compromisso", wide: true },
        ]}
      />

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section id="servicos" className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32">
        <div className="mx-auto max-w-[1400px] flex flex-col gap-14">
          <AnimatedSection className="flex flex-col gap-4">
            <AnimatedItem><EyebrowBadge>SERVIÇOS</EyebrowBadge></AnimatedItem>
            <AnimatedItem>
              <h2 className="font-sans text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                O que a gente <span className="text-accent">faz.</span>
              </h2>
            </AnimatedItem>
          </AnimatedSection>
          <AnimatedSection className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <AnimatedItem key={s.title} className="h-full">
                <div className={`card-surface flex h-full flex-col gap-4 p-6 transition-all duration-300 hover:border-accent/20 ${s.accent ? "border-accent/30 bg-accent/[0.03]" : ""}`}>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${s.accent ? "border-accent/40 bg-accent/[0.12]" : "border-white/10 bg-white/[0.04]"}`}>
                    <s.icon size={22} weight={s.accent ? "fill" : "light"} className={s.accent ? "text-accent" : "text-zinc-400"} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className={`font-sans text-base font-semibold tracking-tight ${s.accent ? "text-accent" : "text-foreground"}`}>{s.title}</h3>
                    <p className="font-sans text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                  </div>
                  {s.badge && (
                    <div className="mt-auto pt-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] ${s.accent ? "bg-accent/10 text-accent" : "bg-white/[0.05] text-zinc-500"}`}>
                        <CheckCircle size={11} weight="fill" />{s.badge}
                      </span>
                    </div>
                  )}
                  <WhatsAppButton bare label="Consultar preço" message={`Olá! Quero saber o preço de: ${s.title}`} className="mt-auto" />
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── FEATURE: UPGRADE ─────────────────────────────────── */}
      <section id="destaque" className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(57,255,20,0.07) 0%, transparent 65%)" }} />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="card-surface overflow-hidden border-accent/20 bg-accent/[0.02] p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.1] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    <RocketLaunch size={11} weight="fill" /> Upgrade de Performance
                  </span>
                  <h2 className="font-sans text-3xl font-bold leading-[0.92] tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                    Mais rápido.<br /><span className="text-accent">Na hora.</span>
                  </h2>
                </div>
                <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
                  Um SSD NVMe ou mais RAM transforma um PC lento em máquina de trabalho — sem precisar comprar um novo. A gente avalia o seu equipamento e indica o upgrade com melhor custo-benefício pra você.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    "SSD NVMe: boot em segundos, abertura instantânea de programas",
                    "RAM: mais abas, mais processos, mais fluidez",
                    "GPU Nvidia ou AMD: jogue ou edite sem travar",
                    "Peças selecionadas com 90 dias de garantia",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle size={16} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                      <span className="font-sans text-sm text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <WhatsAppButton
                  variant="accent"
                  label="Quero fazer upgrade"
                  message="Olá! Tenho interesse em fazer upgrade no meu PC ou notebook."
                  className="mt-2 self-start px-6 py-3"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">Equipamentos atendidos</span>
                {devices.map((d) => (
                  <div key={d.name} className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 transition-all duration-200 hover:border-accent/20 hover:bg-accent/[0.03]">
                    <span className="font-sans text-sm font-semibold text-foreground">{d.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{d.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="processo" className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32">
        <div className="mx-auto max-w-[1400px] flex flex-col gap-14">
          <AnimatedSection className="flex flex-col items-center gap-4 text-center">
            <AnimatedItem><EyebrowBadge>PROCESSO</EyebrowBadge></AnimatedItem>
            <AnimatedItem>
              <h2 className="font-sans text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                Como <span className="text-accent">funciona.</span>
              </h2>
            </AnimatedItem>
          </AnimatedSection>
          <AnimatedSection className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <AnimatedItem key={step.n} className="h-full">
                <div className="card-surface relative flex h-full flex-col gap-4 p-6">
                  {i < steps.length - 1 && <div className="pointer-events-none absolute -right-2 top-7 hidden h-px w-4 bg-white/10 lg:block" />}
                  <span className="font-mono text-2xl font-bold leading-none tracking-tight text-accent/30">{step.n}</span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-sans text-base font-semibold tracking-tight text-foreground">{step.title}</h3>
                    <p className="font-sans text-sm leading-relaxed text-zinc-400">{step.desc}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section id="orcamento" className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(57,255,20,0.06) 0%, transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-[1400px] flex flex-col gap-14">
          <AnimatedSection className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Shield, title: "90 dias", sub: "Todos os serviços", accent: true },
              { icon: ShieldCheck, title: "Grátis", sub: "Diagnóstico sempre", accent: false },
              { icon: Wrench, title: "24h", sub: "Maioria dos serviços", accent: false },
            ].map((g) => (
              <AnimatedItem key={g.title} className="h-full">
                <div className={`card-surface flex h-full flex-col items-center gap-3 p-7 text-center ${g.accent ? "border-accent/30 bg-accent/[0.03]" : ""}`}>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${g.accent ? "border-accent/40 bg-accent/[0.12]" : "border-white/10 bg-white/[0.04]"}`}>
                    <g.icon size={24} weight={g.accent ? "fill" : "light"} className={g.accent ? "text-accent" : "text-zinc-400"} />
                  </div>
                  <span className={`font-sans text-2xl font-bold tracking-tight ${g.accent ? "text-accent" : "text-foreground"}`}>{g.title}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{g.sub}</span>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
          <AnimatedSection className="flex flex-col items-center gap-6 text-center">
            <AnimatedItem>
              <h2 className="font-sans text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                PC lento ou com problema? <span className="text-accent">A gente resolve.</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
                Manda uma mensagem e a gente te responde na hora. Diagnóstico gratuito, sem compromisso.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <WhatsAppButton label="Falar no WhatsApp" message={WA_MSG} className="px-8 py-4 text-[12px] tracking-[0.24em]" />
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
