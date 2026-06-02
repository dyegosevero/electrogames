"use client";

import { useState, useTransition } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await login(fd);
      if (res?.error) setError(res.error);
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/[0.07] bg-zinc-900 p-8">
        <div className="mb-8 flex flex-col gap-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-100">
              Electro Games
            </span>
          </div>
          <h1 className="font-mono text-lg font-bold text-zinc-100">Admin</h1>
          <p className="font-mono text-[11px] text-zinc-500">
            Entre com sua conta Supabase
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-sm text-zinc-100 outline-none placeholder-zinc-600 transition-colors focus:border-[#39ff14]/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
              Senha
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-sm text-zinc-100 outline-none placeholder-zinc-600 transition-colors focus:border-[#39ff14]/40"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 font-mono text-[11px] text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-full border border-[#39ff14]/30 bg-[#39ff14]/10 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#39ff14] transition-all hover:bg-[#39ff14]/20 disabled:opacity-40"
          >
            {pending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
