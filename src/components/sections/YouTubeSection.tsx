import { ArrowUpRight, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { createClient } from "@/lib/supabase/server";

export async function YouTubeSection() {
  const supabase = await createClient();
  const sb = supabase as any;
  const [{ data: videos }, { data: channelSetting }] = await Promise.all([
    sb.from("youtube_videos").select("*").eq("active", true).order("sort_order").limit(3) as Promise<{ data: import("@/lib/supabase/types").YoutubeVideo[] | null }>,
    sb.from("settings").select("value").eq("key", "youtube_channel_url").single() as Promise<{ data: { value: string } | null }>,
  ]);

  const channelUrl =
    channelSetting?.value || "https://www.youtube.com/@eletrogames.cwb";

  if (!videos?.length) return null;

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-background px-6 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(255,0,0,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] flex flex-col gap-12">
        <AnimatedSection className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <AnimatedItem>
            <div className="flex flex-col gap-3">
              <EyebrowBadge>ELETRO GAMES // YOUTUBE</EyebrowBadge>
              <h2 className="font-sans text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                Veja na prática{" "}
                <span className="text-accent">como trabalhamos.</span>
              </h2>
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[#ff0000]/30 bg-[#ff0000]/[0.08] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#ff4444] transition-all duration-200 hover:bg-[#ff0000]/[0.14]"
            >
              <YoutubeLogo size={14} weight="fill" />
              Ver canal completo
              <ArrowUpRight size={12} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {videos.map((v) => (
            <AnimatedItem key={v.id}>
              <div className="card-surface overflow-hidden">
                <div className="relative aspect-video w-full bg-zinc-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.video_id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                {v.title && (
                  <div className="px-4 py-3">
                    <p className="font-sans text-sm font-medium text-zinc-300">{v.title}</p>
                  </div>
                )}
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
