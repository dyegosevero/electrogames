"use client";

import { useEffect, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { saveSettings } from "../actions";
import { AdminShell } from "../_components/AdminShell";
import { Field, Input, Textarea, SaveButton, PageHeader, Card } from "../_components/AdminField";

export default function SettingsPage() {
  const [values, setValues] = useState({
    whatsapp_phone: "",
    webhook_url: "",
    footer_script: "",
    youtube_channel_url: "",
  });
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const supabase = createClient() as any;
    (supabase.from("settings").select("key, value") as Promise<{ data: { key: string; value: string }[] | null }>).then(({ data }) => {
      if (!data) return;
      const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
      setValues((v) => ({ ...v, ...map }));
    });
  }, []);

  function handleChange(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    startTransition(async () => {
      await saveSettings(values);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <AdminShell>
      <PageHeader title="Configurações" sub="Dados globais do site" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
        <Card className="flex flex-col gap-5">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Contato
          </h2>
          <Field label="Número do WhatsApp" hint="Formato internacional sem + ex: 5541999999999">
            <Input
              value={values.whatsapp_phone}
              onChange={(e) => handleChange("whatsapp_phone", e.target.value)}
              placeholder="5541999999999"
            />
          </Field>
          <Field label="URL do Webhook" hint="Recebe um POST JSON a cada clique no botão de WhatsApp">
            <Input
              value={values.webhook_url}
              onChange={(e) => handleChange("webhook_url", e.target.value)}
              placeholder="https://hook.make.com/..."
            />
          </Field>
        </Card>

        <Card className="flex flex-col gap-5">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            YouTube
          </h2>
          <Field label="URL do Canal" hint="Link exibido na seção YouTube da home">
            <Input
              value={values.youtube_channel_url}
              onChange={(e) => handleChange("youtube_channel_url", e.target.value)}
              placeholder="https://www.youtube.com/@eletrogames.cwb"
            />
          </Field>
        </Card>

        <Card className="flex flex-col gap-5">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Rodapé
          </h2>
          <Field
            label="Script no rodapé"
            hint="Tag <script> inteira. Injetada antes de </body> em todas as páginas."
          >
            <Textarea
              rows={6}
              value={values.footer_script}
              onChange={(e) => handleChange("footer_script", e.target.value)}
              placeholder={'<script src="https://...">\n</script>'}
            />
          </Field>
        </Card>

        <div className="flex items-center gap-4">
          <SaveButton pending={pending} />
          {saved && (
            <span className="font-mono text-[11px] text-[#39ff14]">Salvo ✓</span>
          )}
        </div>
      </form>
    </AdminShell>
  );
}
