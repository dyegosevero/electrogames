"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition, type ReactNode } from "react";
import {
  Gauge,
  Sliders,
  Package,
  YoutubeLogo,
  SignOut,
} from "@phosphor-icons/react";
import { logout } from "../actions";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/admin/settings",  label: "Configurações", icon: Sliders },
  { href: "/admin/products",  label: "Produtos", icon: Package },
  { href: "/admin/youtube",   label: "YouTube", icon: YoutubeLogo },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-white/[0.06] bg-zinc-900 px-3 py-6">
        <div className="mb-6 flex items-center gap-2 px-3">
          <span className="h-2 w-2 rounded-full bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-100">
            Electro Games
          </span>
        </div>

        {NAV.map(({ href, label, icon: Icon }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                active
                  ? "bg-[#39ff14]/10 text-[#39ff14]"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
              }`}
            >
              <Icon size={16} weight={active ? "fill" : "regular"} />
              {label}
            </Link>
          );
        })}

        <div className="mt-auto">
          <button
            onClick={() => startTransition(() => logout())}
            disabled={pending}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-red-400"
          >
            <SignOut size={16} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
