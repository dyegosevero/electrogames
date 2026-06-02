import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
        {label}
      </label>
      {children}
      {hint && (
        <p className="font-mono text-[10px] text-zinc-600">{hint}</p>
      )}
    </div>
  );
}

const base =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-sm text-zinc-100 outline-none placeholder-zinc-600 transition-colors focus:border-[#39ff14]/40 focus:ring-1 focus:ring-[#39ff14]/20";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${base} resize-none ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${base} ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}

export function SaveButton({ pending = false }: { pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-[#39ff14]/30 bg-[#39ff14]/10 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#39ff14] transition-all hover:bg-[#39ff14]/20 disabled:opacity-40"
    >
      {pending ? "Salvando…" : "Salvar"}
    </button>
  );
}

export function DangerButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400 transition-all hover:bg-red-500/20 disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8 flex flex-col gap-1">
      <h1 className="font-mono text-xl font-bold tracking-tight text-zinc-100">
        {title}
      </h1>
      {sub && (
        <p className="font-mono text-[11px] text-zinc-500">{sub}</p>
      )}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/[0.07] bg-zinc-900 p-6 ${className}`}>
      {children}
    </div>
  );
}
