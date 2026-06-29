"use client";

import {
  CheckCircle,
  GameController,
  Lightning,
  PaintBrush,
  Wrench,
  Drop,
  Shield,
  ShieldCheck,
  Joystick,
} from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { LPHeroSection } from "@/components/ui/LPHeroSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const WA_MSG = "Olá! Vim pelo site da Eletro Games e gostaria de um orçamento para controle.";

const services = [
  {
    icon: Lightning,
    title: "Analógicos Hall Effect",
    desc: "Tecnologia magnética. Sem desgaste, sem drift. A upgrade mais impactante que você pode fazer no seu controle.",
    badge: "6 meses de garantia",
    accent: true,
  },
  {
    icon: Joystick,
    title: "Analógicos Originais",
    desc: "Substituição com peça original de fábrica. Ideal para quem quer restaurar o controle ao padrão do fabricante.",
    badge: null,
    accent: false,
  },
  {
    icon: GameController,
    title: "Paddles / Back Buttons",
    desc: "Botões traseiros para ações rápidas sem tirar os polegares dos analógicos. Jogue no nível dos pros.",
    badge: null,
    accent: false,
  },
  {
    icon: Wrench,
    title: "Conserto de Drift e Falhas",
    desc: "Joystick indo sozinho, botão travado, gatilho com falha. Diagnóstico gratuito e orçamento sem compromisso.",
    badge: "Diagnóstico grátis",
    accent: false,
  },
  {
    icon: PaintBrush,
    title: "Personalização Visual",
    desc: "Faceplates, botões coloridos, grip customizado. Deixe o seu controle com a sua identidade.",
    badge: null,
    accent: false,
  },
  {
    icon: Drop,
    title: "Limpeza & Manutenção",
    desc: "Controle pegajoso, botões duros ou com resposta ruim. Higienização completa e lubrificação dos gatilhos.",
    badge: null,
    accent: false,
  },
];

const devices = [
  { name: "PS5 DualSense", tag: "PlayStation 5" },
  { name: "PS4 DualShock 4", tag: "PlayStation 4" },
  { name: "Xbox Series", tag: "Series S / X" },
  { name: "Xbox One", tag: "One S / One X" },
  { name: "Nintendo Joy-Con", tag: "Switch / Switch Lite" },
];

const steps = [
  { n: "01", title: "Agendamento", desc: "Manda uma mensagem no WhatsApp ou vem direto na loja. Zero burocracia." },
  { n: "02", title: "Diagnóstico Grátis", desc: "Avaliamos seu controle sem cobrar nada. Você só aprova o orçamento antes de qualquer serviço." },
  { n: "03", title: "Reparo com Qualidade", desc: "Peças selecionadas, mãos especializadas. Conforme o serviço, originais ou premium." },
  { n: "04", title: "Garantia Entregue", desc: "Hall Effect: 6 meses. Demais serviços: 90 dias. Você sai daqui com segurança de volta." },
];

export function LPControlesBody() {
  return (
    <>
      <LPHeroSection
        badge="ELETRO GAMES // CONTROLES"
        line1="Seu Controle,"
        line2="Reinventado."
        description="Hall Effect, paddles, personalização e conserto. Cada detalhe cuidado para que o seu jogo funcione no mais alto nível."
        whatsappMessage={WA_MSG}
        decorativeBg="CTR"
        glowSide="left"
        heroImage="/bg/bg-controles.jpg"
        stats={[
          { value: "6", label: "meses", sub: "Hall Effect" },
          { value: "90", label: "dias", sub: "Demais serviços" },
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
                  <WhatsAppButton
                    bare
                    label="Consultar preço"
                    message={`Olá! Quero saber o preço de: ${s.title}`}
                    className="mt-auto"
                  />
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── HALL EFFECT ──────────────────────────────────────── */}
      <section id="destaque" className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(57,255,20,0.07) 0%, transparent 65%)" }} />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="card-surface overflow-hidden border-accent/20 bg-accent/[0.02] p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.1] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    <Lightning size={11} weight="fill" /> Tecnologia Hall Effect
                  </span>
                  <h2 className="font-sans text-3xl font-bold leading-[0.92] tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                    Zero drift.<br /><span className="text-accent">Para sempre.</span>
                  </h2>
                </div>
                <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
                  Os analógicos tradicionais usam potenciômetros que desgastam com o tempo — drift inevitável. Hall Effect usa campo magnético. Sem contato mecânico, sem desgaste, sem drift. Jamais.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["Compatível com PS4, PS5, Xbox e Joy-Con", "6 meses de garantia", "Instalação rápida", "Peças premium selecionadas"].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle size={16} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                      <span className="font-sans text-sm text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <WhatsAppButton
                  variant="accent"
                  label="Quero Hall Effect"
                  message="Olá! Tenho interesse no upgrade de Hall Effect para meu controle."
                  className="mt-2 self-start px-6 py-3"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">Compatível com</span>
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
              { icon: Shield, title: "6 meses", sub: "Analógicos Hall Effect", accent: true },
              { icon: ShieldCheck, title: "90 dias", sub: "Demais serviços", accent: false },
              { icon: Wrench, title: "Grátis", sub: "Diagnóstico sempre", accent: false },
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
                Pronto pra dar um <span className="text-accent">upgrade?</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
                Manda uma mensagem e a gente te responde na hora. Diagnóstico gratuito, sem compromisso.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <WhatsAppButton
                label="Falar no WhatsApp"
                message={WA_MSG}
                className="px-8 py-4 text-[12px] tracking-[0.24em]"
              />
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
