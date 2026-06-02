"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE_IN:  [number, number, number, number] = [0.22, 1, 0.36, 1];   // easeOutExpo — entrada snappy
const EASE_OUT: [number, number, number, number] = [0.4, 0, 0.6, 1];     // easeInOut — saída suave

// ─── Variants ────────────────────────────────────────────────────
// Container: controla stagger
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0 } },
};

// Item: deslocamento de 110px + scale visível — impossível não notar
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 110, scale: 0.87 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "tween", duration: 0.7, ease: EASE_IN },
  },
};

type Props = { children: ReactNode; className?: string };

// ─── AnimatedSection ─────────────────────────────────────────────
// Camada exterior: exit via scroll (useScroll) — não usa whileInView
// Camada interior: entrance via whileInView once:true — sem bug de navegação
export function AnimatedSection({ children, className = "" }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Rastreia quando a seção está saindo pelo topo da viewport
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  // Exit: seção some ao sair pelo topo — 0% → 35% scrollado além do topo
  const exitOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const exitY       = useTransform(scrollYProgress, [0, 0.35], ["0px", "-56px"]);

  return (
    // Wrapper externo: aplica scroll-exit. Div puro (não motion) seria mais leve,
    // mas motion.div permite animar style props reativamente sem re-render.
    <motion.div ref={wrapperRef} style={{ opacity: exitOpacity, y: exitY }}>
      {/* Div interno: entrance com stagger, once:true para evitar black page na navegação */}
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ─── AnimatedItem ─────────────────────────────────────────────────
// Filhos herdam stagger do AnimatedSection pai — sem whileInView próprio.
export function AnimatedItem({ children, className = "" }: Props) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
