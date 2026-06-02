"use client";

import { useState, useTransition } from "react";
import { upsertProduct } from "../../actions";
import {
  Field, Input, Textarea, Select, SaveButton, Card,
} from "../../_components/AdminField";
import { ImageUpload } from "./ImageUpload";
import Link from "next/link";
import type { Product } from "@/lib/supabase/types";

export function ProductForm({ product }: { product?: Product }) {
  const [pending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [name, setName] = useState(product?.name ?? "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("image_url", imageUrl);
    startTransition(async () => { await upsertProduct(fd); });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      {product && <input type="hidden" name="id" value={product.id} />}

      <Card className="flex flex-col gap-5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">Produto</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nome">
            <Input
              name="name"
              required
              defaultValue={product?.name}
              placeholder="PlayStation 5"
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Edição / Variante">
            <Input name="edition" defaultValue={product?.edition} placeholder="Edição Digital" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Preço">
            <Input name="price" required defaultValue={product?.price} placeholder="R$ 3.499" />
          </Field>
          <Field label="Parcelas">
            <Input name="installments" defaultValue={product?.installments} placeholder="12x R$ 291" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Condição">
            <Select name="condition" defaultValue={product?.condition ?? "Novo"}>
              <option value="Novo">Novo</option>
              <option value="Seminovo">Seminovo</option>
              <option value="Usado">Usado</option>
            </Select>
          </Field>
          <Field label="Status">
            <Select name="active" defaultValue={String(product?.active ?? true)}>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </Select>
          </Field>
        </div>
        <Field label="Specs" hint="Uma por linha: 825GB SSD / 4K 120fps / DualSense incluso">
          <Textarea
            name="specs"
            rows={4}
            defaultValue={product?.specs.join("\n")}
            placeholder={"825GB SSD\n4K 120fps\nDualSense incluso"}
          />
        </Field>
      </Card>

      <Card className="flex flex-col gap-5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">Links & Mídia</h2>
        <Field label="Imagem do produto" hint="Será recortada (4:3) e convertida para WebP">
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            productName={name}
          />
        </Field>
        <Field label="URL de Compra" hint="Link para a loja / marketplace">
          <Input name="buy_url" defaultValue={product?.buy_url} placeholder="https://..." />
        </Field>
        <Field label="Ordem de exibição">
          <Input name="sort_order" type="number" defaultValue={product?.sort_order ?? 0} />
        </Field>
      </Card>

      <div className="flex items-center gap-3">
        <SaveButton pending={pending} />
        <Link
          href="/admin/products"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-300"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
