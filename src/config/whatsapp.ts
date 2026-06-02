/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║               CONFIGURAÇÃO GLOBAL — WHATSAPP                ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Edite este arquivo para alterar o comportamento de TODOS os
 * botões de WhatsApp do site de uma vez.
 *
 * Para override por página: passe a prop `config` no <WhatsAppButton>
 * ou no <LPHeroSection> com um objeto parcial { phone, popupEnabled, ... }
 */

export type WAConfig = {
  /** Número no formato internacional sem +  ex: "5541999999999" */
  phone: string;

  /**
   * Exibe o popup de mensagem antes de abrir o WhatsApp?
   * true  → popup aparece, usuário pode editar a mensagem
   * false → abre o WhatsApp diretamente com a mensagem padrão
   */
  popupEnabled: boolean;

  /**
   * URL do webhook que recebe o payload antes de abrir o WhatsApp.
   * Deixe string vazia ("") para desabilitar o webhook.
   * Suporta Make, n8n, Zapier, qualquer endpoint POST JSON.
   *
   * Payload enviado:
   * {
   *   event: "whatsapp_click",
   *   message: string,
   *   phone: string,
   *   page: string,          // URL atual
   *   referrer: string,      // document.referrer
   *   timestamp: string,     // ISO 8601
   *   utm_source?: string,
   *   utm_medium?: string,
   *   utm_campaign?: string,
   *   utm_term?: string,
   *   utm_content?: string,
   * }
   */
  webhookUrl: string;

  /** Mensagem padrão pré-preenchida quando não especificado no botão */
  defaultMessage: string;
};

export const WA_CONFIG: WAConfig = {
  // ── Trocar pelo número real ──────────────────────────────────
  phone: "5500000000000",

  // ── Popup ligado? ────────────────────────────────────────────
  popupEnabled: true,

  // ── Webhook (deixe "" para desabilitar) ─────────────────────
  webhookUrl: "",

  // ── Mensagem padrão ─────────────────────────────────────────
  defaultMessage:
    "Olá! Vim pelo site da Eletro Games e gostaria de um orçamento.",
};
