"use client";

import { useState } from "react";
import { ArrowUpRight, PaperPlaneTilt } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — integrar com backend/email depois
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(57,255,20,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] flex flex-col gap-10 md:grid md:grid-cols-[1fr_1fr] md:gap-20">
        {/* Left — texto */}
        <AnimatedSection className="flex flex-col gap-6 justify-center md:gap-8">
          <AnimatedItem>
            <EyebrowBadge>ELECTRO GAMES // CONTATO</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="font-sans text-3xl font-semibold leading-[0.98] tracking-tighter text-foreground sm:text-4xl md:text-5xl">
              Fale com a{" "}
              <span className="text-accent">nossa equipe.</span>
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="max-w-[40ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
              Dúvida sobre consoles, orçamento de serviço ou quer saber a
              disponibilidade de um produto? Nos manda uma mensagem — respondemos
              imediata.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <WhatsAppButton
              label="Abrir WhatsApp"
              message="Olá! Vim pelo site da Eletro Games e gostaria de um orçamento."
              className="px-6 py-3"
            />
          </AnimatedItem>
          <AnimatedItem>
            <div className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
              <span>Seg – Sex &nbsp;&middot;&nbsp; 9h às 18h</span>
              <span>Sáb &nbsp;&middot;&nbsp; 9h às 14h</span>
            </div>
          </AnimatedItem>
        </AnimatedSection>

        {/* Right — formulário */}
        <AnimatedSection className="flex flex-col justify-center">
          <AnimatedItem>
            {sent ? (
              <div className="card-surface flex flex-col items-center gap-4 p-10 text-center">
                <span className="text-4xl">✅</span>
                <h3 className="font-sans text-xl font-semibold text-foreground">
                  Mensagem enviada!
                </h3>
                <p className="font-sans text-sm text-zinc-400">
                  Obrigado pelo contato. Retornamos em breve.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 hover:text-foreground transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-surface flex flex-col gap-5 p-7 md:p-8">
                {/* Nome */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-sans text-sm text-foreground placeholder-zinc-600 outline-none transition-all duration-200 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/20"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-sans text-sm text-foreground placeholder-zinc-600 outline-none transition-all duration-200 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/20"
                  />
                </div>

                {/* Mensagem */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    Mensagem
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Conte o que precisa — serviço, console, orçamento..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-sans text-sm text-foreground placeholder-zinc-600 outline-none transition-all duration-200 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/20"
                  />
                </div>

                {/* Botões */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="group flex flex-1 items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/[0.1] px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent transition-all duration-200 hover:bg-accent/[0.2] active:translate-y-[1px]"
                  >
                    <PaperPlaneTilt size={13} weight="bold" />
                    Enviar mensagem
                  </button>
                  <WhatsAppButton
                    label="WhatsApp"
                    message="Olá! Vim pelo site e gostaria de um orçamento."
                    className="flex-1 justify-center"
                  />
                </div>
              </form>
            )}
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
