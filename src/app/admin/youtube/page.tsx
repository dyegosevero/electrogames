"use client";

import { useEffect, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { upsertVideo, deleteVideo } from "../actions";
import { AdminShell } from "../_components/AdminShell";
import { Field, Input, SaveButton, PageHeader, Card, DangerButton } from "../_components/AdminField";
import { Plus, YoutubeLogo } from "@phosphor-icons/react";
import type { YoutubeVideo } from "@/lib/supabase/types";

function VideoForm({ video, onDone }: { video?: YoutubeVideo; onDone: () => void }) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await upsertVideo(fd);
      onDone();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {video && <input type="hidden" name="id" value={video.id} />}
      <input type="hidden" name="active" value="true" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="ID do vídeo" hint="Ex: dQw4w9WgXcQ (parte final da URL do YouTube)">
          <Input name="video_id" required defaultValue={video?.video_id} placeholder="dQw4w9WgXcQ" />
        </Field>
        <Field label="Título">
          <Input name="title" defaultValue={video?.title} placeholder="Título do vídeo" />
        </Field>
      </div>
      <Field label="Ordem">
        <Input name="sort_order" type="number" defaultValue={video?.sort_order ?? 0} className="max-w-[120px]" />
      </Field>
      <div className="flex gap-3">
        <SaveButton pending={pending} />
        <button
          type="button"
          onClick={onDone}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default function YouTubePage() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [editing, setEditing] = useState<YoutubeVideo | "new" | null>(null);
  const [, startTransition] = useTransition();

  function load() {
    const supabase = createClient() as any;
    (supabase.from("youtube_videos").select("*").order("sort_order") as Promise<{ data: YoutubeVideo[] | null }>)
      .then(({ data }) => setVideos(data ?? []));
  }

  useEffect(() => { load(); }, []);

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteVideo(id);
      load();
    });
  }

  return (
    <AdminShell>
      <div className="mb-8 flex items-center justify-between">
        <PageHeader title="Vídeos do YouTube" sub={`${videos.length} cadastrados`} />
        <button
          onClick={() => setEditing("new")}
          className="flex items-center gap-2 rounded-full border border-[#39ff14]/30 bg-[#39ff14]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#39ff14] transition-all hover:bg-[#39ff14]/20"
        >
          <Plus size={13} weight="bold" />
          Novo vídeo
        </button>
      </div>

      {editing && (
        <Card className="mb-6">
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            {editing === "new" ? "Adicionar vídeo" : "Editar vídeo"}
          </h2>
          <VideoForm
            video={editing === "new" ? undefined : editing}
            onDone={() => { setEditing(null); load(); }}
          />
        </Card>
      )}

      <div className="flex flex-col gap-3">
        {videos.map((v) => (
          <div
            key={v.id}
            className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-zinc-900 px-5 py-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
              <YoutubeLogo size={18} weight="fill" className="text-red-500" />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="font-mono text-sm font-semibold text-zinc-100">
                {v.title || v.video_id}
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                youtu.be/{v.video_id} · ordem {v.sort_order}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(v)}
                className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Editar
              </button>
              <DangerButton onClick={() => handleDelete(v.id)}>Excluir</DangerButton>
            </div>
          </div>
        ))}
        {!videos.length && (
          <p className="py-12 text-center font-mono text-[11px] text-zinc-600">
            Nenhum vídeo cadastrado.
          </p>
        )}
      </div>
    </AdminShell>
  );
}
