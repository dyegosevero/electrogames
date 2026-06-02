import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminShell } from "../_components/AdminShell";
import { Card, PageHeader } from "../_components/AdminField";
import { Package, YoutubeLogo, Sliders, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const sb = supabase as any;
  const [{ count: productCount }, { count: videoCount }] = await Promise.all([
    sb.from("products").select("*", { count: "exact", head: true }),
    sb.from("youtube_videos").select("*", { count: "exact", head: true }),
  ]);

  const tiles = [
    { href: "/admin/settings",  icon: Sliders,      label: "Configurações", sub: "WhatsApp · Webhook · Script" },
    { href: "/admin/products",  icon: Package,      label: "Produtos",      sub: `${productCount ?? 0} cadastrados` },
    { href: "/admin/youtube",   icon: YoutubeLogo,  label: "YouTube",       sub: `${videoCount ?? 0} vídeos` },
  ];

  return (
    <AdminShell>
      <PageHeader title="Dashboard" sub={user.email ?? ""} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tiles.map(({ href, icon: Icon, label, sub }) => (
          <Link key={href} href={href}>
            <Card className="group flex flex-col gap-4 transition-colors hover:border-[#39ff14]/20">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon size={20} className="text-[#39ff14]" />
                </div>
                <ArrowRight size={14} className="text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-400" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-sm font-semibold text-zinc-100">{label}</span>
                <span className="font-mono text-[11px] text-zinc-500">{sub}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
