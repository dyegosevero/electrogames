"use client";

/**
 * WhatsAppButton + Popup
 * ──────────────────────
 * Configuração global fica em src/config/whatsapp.ts
 * Configuração por página: passe props diretamente (override).
 *
 * Fluxo:
 *   1. Usuário clica no botão
 *   2. Se POPUP_ENABLED → abre modal com campo de mensagem
 *   3. Ao confirmar → fetch para WEBHOOK_URL com payload completo (UTMs incluídas)
 *   4. Abre WhatsApp independente do resultado do fetch
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo, X, ArrowUpRight, PaperPlaneTilt } from "@phosphor-icons/react";
import { WA_CONFIG, type WAConfig } from "@/config/whatsapp";
import { useSiteSettings } from "@/components/providers/SettingsProvider";

// ─── Utilitários ─────────────────────────────────────────────────

function getUTMs(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  return Object.fromEntries(keys.flatMap((k) => (p.get(k) ? [[k, p.get(k)!]] : [])));
}

async function sendWebhook(
  webhookUrl: string,
  payload: Record<string, unknown>
): Promise<void> {
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // keepalive mantém a requisição mesmo se o usuário navegar
      keepalive: true,
    });
  } catch {
    // Falha silenciosa — usuário já vai pro WhatsApp de qualquer forma
  }
}

function buildWhatsAppURL(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// ─── Popup ────────────────────────────────────────────────────────

interface PopupProps {
  defaultMessage: string;
  onConfirm: (message: string) => void;
  onClose: () => void;
}

function WhatsAppPopup({ defaultMessage, onConfirm, onClose }: PopupProps) {
  const [message, setMessage] = useState(defaultMessage);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    textareaRef.current?.focus();
    textareaRef.current?.select();
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Fecha ao pressionar Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const content = (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Overlay — rendered fora de qualquer transform ancestor via portal */}
      <div
        className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="card-surface relative w-full max-w-md p-7"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <WhatsappLogo size={20} weight="fill" className="text-[#25d366]" />
              <span className="font-sans text-base font-semibold text-foreground">
                Falar no WhatsApp
              </span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Personalize sua mensagem
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-colors hover:border-white/20 hover:text-foreground"
          >
            <X size={14} weight="bold" />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-sans text-sm leading-relaxed text-foreground placeholder-zinc-600 outline-none transition-all duration-200 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/20"
        />

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-white/10 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-foreground"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(message)}
            disabled={!message.trim()}
            className="group flex flex-[2] items-center justify-center gap-2 rounded-full border border-[#25d366]/30 bg-[#25d366]/[0.1] py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#25d366] transition-all duration-200 hover:bg-[#25d366]/[0.2] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <PaperPlaneTilt size={13} weight="bold" />
            Enviar mensagem
            <ArrowUpRight size={12} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}

// ─── Botão principal ──────────────────────────────────────────────

export interface WhatsAppButtonProps {
  /** Texto do botão */
  label?: string;
  /** Mensagem pré-preenchida no popup / WhatsApp */
  message?: string;
  /** Override da config global */
  config?: Partial<WAConfig>;
  /** Variantes visuais */
  variant?: "default" | "ghost" | "accent";
  /**
   * Modo bare: renderiza como link de texto simples (sem border/background).
   * Ideal para botões inline dentro de cards, ex: "Consultar preço".
   */
  bare?: boolean;
  /** Ícone apenas (sem label) */
  iconOnly?: boolean;
  className?: string;
}

export function WhatsAppButton({
  label = "Falar no WhatsApp",
  message,
  config,
  variant = "default",
  bare = false,
  iconOnly = false,
  className = "",
}: WhatsAppButtonProps) {
  const [open, setOpen] = useState(false);
  const siteSettings = useSiteSettings();

  // Mescla config global → settings do DB → override local
  const cfg: WAConfig = {
    ...WA_CONFIG,
    phone: siteSettings.whatsapp_phone || WA_CONFIG.phone,
    webhookUrl: siteSettings.webhook_url || WA_CONFIG.webhookUrl,
    ...config,
  };
  const defaultMsg = message ?? cfg.defaultMessage;

  const handleClick = () => {
    if (cfg.popupEnabled) {
      setOpen(true);
    } else {
      void handleSend(defaultMsg);
    }
  };

  const handleSend = async (msg: string) => {
    setOpen(false);

    const utms = getUTMs();
    const payload = {
      event: "whatsapp_click",
      message: msg,
      phone: cfg.phone,
      page: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      timestamp: new Date().toISOString(),
      ...utms,
    };

    // Fire-and-forget webhook (não bloqueia a abertura do WhatsApp)
    if (cfg.webhookUrl) {
      void sendWebhook(cfg.webhookUrl, payload);
    }

    window.open(buildWhatsAppURL(cfg.phone, msg), "_blank", "noopener,noreferrer");
  };

  const variantClass =
    variant === "accent"
      ? "border-accent/30 bg-accent/[0.1] text-accent hover:bg-accent/[0.2]"
      : variant === "ghost"
      ? "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-accent/20 hover:text-accent"
      : "border-[#25d366]/30 bg-[#25d366]/[0.1] text-[#25d366] hover:bg-[#25d366]/[0.2]";

  // Modo bare: link de texto sutil, sem borda nem fundo
  const bareClass =
    "group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-accent";

  return (
    <>
      <button
        onClick={handleClick}
        className={
          bare
            ? `${bareClass} ${className}`
            : `group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] transition-all duration-200 active:translate-y-[1px] ${variantClass} ${className}`
        }
      >
        {!bare && <WhatsappLogo size={15} weight="fill" />}
        {!iconOnly && label}
        {!iconOnly && (
          <ArrowUpRight
            size={bare ? 10 : 12}
            weight="bold"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <WhatsAppPopup
            defaultMessage={defaultMsg}
            onConfirm={(msg) => void handleSend(msg)}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
