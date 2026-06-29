import Image from "next/image";
import { ArrowUpRight, ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { createClient } from "@/lib/supabase/server";

export async function ProductsGallery() {
  const supabase = await createClient();
  const { data: products } = await (supabase as any)
    .from("products")
    .select("*")
    .eq("active", true)
    .order("sort_order") as { data: import("@/lib/supabase/types").Product[] | null };

  if (!products?.length) return null;

  return (
    <section
      id="products"
      className="relative border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14">
        {/* Header */}
        <AnimatedSection className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <AnimatedItem>
            <div className="flex flex-col gap-4">
              <EyebrowBadge>ELECTRO GAMES // LOJA</EyebrowBadge>
              <h2 className="font-sans text-3xl font-semibold leading-[0.98] tracking-tighter text-foreground sm:text-4xl md:text-6xl">
                Consoles à{" "}
                <span className="text-accent">venda agora.</span>
              </h2>
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <p className="max-w-[40ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
              Novos e seminovos — todos testados, revisados e com nota fiscal.
              Parcelamos em até 12x no cartão.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        {/* Grid de produtos */}
        <AnimatedSection className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <AnimatedItem key={p.id} className="h-full">
              <div className="card-surface group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/15 hover:shadow-[0_28px_56px_rgba(0,0,0,0.5)]">
                {/* Foto do console */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={p.image_url || "/consoles/placeholder.jpg"}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-md">
                    {p.condition}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-sans text-base font-semibold tracking-tight text-foreground">
                      {p.name}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      {p.edition}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-1.5">
                    {p.specs.map((spec) => (
                      <li
                        key={spec}
                        className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-1">
                    <div className="flex flex-col">
                      <span className="font-sans text-xl font-semibold tracking-tight text-foreground">
                        {p.price}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                        ou {p.installments}
                      </span>
                    </div>
                    <a
                      href={p.buy_url || "#contact"}
                      target={p.buy_url ? "_blank" : undefined}
                      rel={p.buy_url ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.08] px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent transition-all duration-200 hover:bg-accent/[0.18]"
                    >
                      <ShoppingCart size={11} weight="bold" />
                      Comprar
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>

        <AnimatedSection>
          <AnimatedItem>
            <div className="flex justify-center">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400 backdrop-blur-md transition-all duration-200 hover:bg-white/[0.07] hover:text-foreground"
              >
                Ver catálogo completo
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
