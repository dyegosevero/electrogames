"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import { WA_CONFIG } from "@/config/whatsapp";

interface LPNavbarProps {
  whatsappMessage?: string;
}

export function LPNavbar({ whatsappMessage }: LPNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message = whatsappMessage ?? WA_CONFIG.defaultMessage;
  const waUrl = `https://wa.me/${WA_CONFIG.phone}?text=${encodeURIComponent(message)}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/60 backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8 md:py-5">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-400 transition-colors hover:text-foreground"
        >
          <ArrowLeft
            size={12}
            weight="bold"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Electro Games
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#servicos"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-foreground"
          >
            Serviços
          </a>
          <a
            href="#destaque"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-foreground"
          >
            Destaque
          </a>
          <a
            href="#processo"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-foreground"
          >
            Processo
          </a>
          <a
            href="#orcamento"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-foreground"
          >
            Orçamento
          </a>
        </nav>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md transition-all duration-200 hover:bg-accent/[0.15] active:translate-y-[1px]"
        >
          Orçamento
          <ArrowUpRight
            size={14}
            weight="bold"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </header>
  );
}
