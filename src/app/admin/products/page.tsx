import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "../_components/AdminShell";
import { PageHeader, DangerButton } from "../_components/AdminField";
import { deleteProduct } from "../actions";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: products } = await (supabase as any)
    .from("products")
    .select("*")
    .order("sort_order") as { data: import("@/lib/supabase/types").Product[] | null };

  return (
    <AdminShell>
      <div className="mb-8 flex items-center justify-between">
        <PageHeader title="Produtos" sub={`${products?.length ?? 0} cadastrados`} />
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-full border border-[#39ff14]/30 bg-[#39ff14]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#39ff14] transition-all hover:bg-[#39ff14]/20"
        >
          <Plus size={13} weight="bold" />
          Novo produto
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {products?.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-zinc-900 px-5 py-4"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-sm font-semibold text-zinc-100">
                {p.name}
                {!p.active && (
                  <span className="ml-2 rounded-full bg-zinc-700 px-2 py-0.5 text-[9px] text-zinc-400">
                    inativo
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                {p.edition} · {p.price} · {p.condition}
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/products/${p.id}`}
                className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Editar
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteProduct(p.id);
                }}
              >
                <DangerButton type="submit">Excluir</DangerButton>
              </form>
            </div>
          </div>
        ))}
        {!products?.length && (
          <p className="py-12 text-center font-mono text-[11px] text-zinc-600">
            Nenhum produto cadastrado.
          </p>
        )}
      </div>
    </AdminShell>
  );
}
