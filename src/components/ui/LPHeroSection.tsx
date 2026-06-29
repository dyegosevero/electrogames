"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export type LPStat = {
  value: string;
  label: string;
  sub: string;
  wide?: boolean;
};

export type LPHeroSectionProps = {
  badge: string;
  line1: string;
  line2: string;
  description: string;
  whatsappUrl?: string; // legado — usar whatsappMessage no lugar
  whatsappMessage?: string;
  stats: LPStat[];
  decorativeBg: string;
  glowSide?: "left" | "right";
  heroImage?: string; // caminho da imagem de fundo (ex: /bg/bg-cel.jpg)
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

export function LPHeroSection({
  badge,
  line1,
  line2,
  description,
  whatsappMessage,
  stats,
  decorativeBg,
  glowSide = "left",
  heroImage,
}: LPHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax — neutro no mobile
  const bgY          = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -100]);
  const textBgY      = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 80]);
  const contentY     = useTransform(scrollYProgress, [0, 0.7], isMobile ? [0, 0] : [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], isMobile ? [1, 1] : [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-background px-6 pb-20 pt-32 md:px-10 md:pt-36"
    >
      {/* Hero image background */}
      {heroImage && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ y: bgY }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-zinc-950/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/40 to-transparent" />
        </motion.div>
      )}

      {/* Glow — parallax no desktop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          y: bgY,
          background:
            glowSide === "left"
              ? "radial-gradient(ellipse 90% 70% at 20% 90%, rgba(57,255,20,0.09) 0%, transparent 60%)"
              : "radial-gradient(ellipse 90% 70% at 80% 90%, rgba(57,255,20,0.09) 0%, transparent 60%)",
        }}
      />

      {/* Texto decorativo BG — parallax inverso no desktop */}
      <motion.span
        aria-hidden
        style={{ y: textBgY }}
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-mono text-[22vw] font-bold leading-none text-white/[0.018] ${
          glowSide === "left" ? "right-0" : "left-0"
        }`}
      >
        {decorativeBg}
      </motion.span>

      {/* Grid de conteúdo — scroll exit + entrance on mount */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-[1400px] w-full grid grid-cols-1 gap-14 md:grid-cols-[3fr_2fr] md:items-center"
      >
        {/* Coluna esquerda — anima na entrada da página */}
        <motion.div
          className="flex flex-col gap-6 md:gap-8"
          initial={{ opacity: 0, y: 72 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <EyebrowBadge>{badge}</EyebrowBadge>
          <h1 className="font-sans text-4xl font-bold leading-[0.9] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {line1}
            <br />
            <span className="text-accent">{line2}</span>
          </h1>
          <p className="max-w-[40ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton
              label="Solicitar orçamento"
              message={whatsappMessage}
              className="px-6 py-3"
            />
            <a
              href="#servicos"
              className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400 transition-all duration-200 hover:border-accent/20 hover:text-accent"
            >
              Ver serviços
              <ArrowRight size={12} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* Stat cards — entram depois da esquerda */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 72 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.sub}
              className={`card-surface flex flex-col items-center gap-1 p-6 text-center ${s.wide ? "col-span-2" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.3 + i * 0.08 }}
            >
              <span className={`font-sans font-bold leading-none tracking-tighter text-accent ${s.wide ? "text-2xl" : "text-4xl"}`}>
                {s.value}
              </span>
              <span className="font-sans text-xs font-medium text-zinc-300">{s.label}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">{s.sub}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
