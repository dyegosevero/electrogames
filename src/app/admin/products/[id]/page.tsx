import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { AdminShell } from "../../_components/AdminShell";
import { PageHeader } from "../../_components/AdminField";
import { ProductForm } from "../_components/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await (supabase as any)
    .from("products")
    .select("*")
    .eq("id", id)
    .single() as { data: import("@/lib/supabase/types").Product | null };

  if (!product) notFound();

  return (
    <AdminShell>
      <PageHeader title="Editar Produto" sub={product.name} />
      <ProductForm product={product} />
    </AdminShell>
  );
}
