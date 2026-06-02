"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Product, YoutubeVideo } from "@/lib/supabase/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SB = Awaited<ReturnType<typeof createClient>> & { from: (t: string) => any };

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  redirect("/admin/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveSettings(entries: Record<string, string>) {
  const supabase = await createClient() as SB;
  const rows = Object.entries(entries).map(([key, value]) => ({ key, value }));
  const { error } = await supabase.from("settings").upsert(rows, { onConflict: "key" });
  if (error) return { error: error.message };
  return { ok: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient() as SB;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  return { ok: true };
}

export async function upsertProduct(formData: FormData) {
  const supabase = await createClient() as SB;
  const id = formData.get("id") as string | null;
  const specsRaw = formData.get("specs") as string;

  const payload: Partial<Product> = {
    name: formData.get("name") as string,
    edition: formData.get("edition") as string,
    specs: specsRaw.split("\n").map((s) => s.trim()).filter(Boolean),
    price: formData.get("price") as string,
    installments: formData.get("installments") as string,
    condition: formData.get("condition") as string,
    image_url: formData.get("image_url") as string,
    buy_url: formData.get("buy_url") as string,
    active: formData.get("active") === "true",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (id) {
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) return { error: error.message };
  }

  redirect("/admin/products");
}

export async function deleteVideo(id: string) {
  const supabase = await createClient() as SB;
  const { error } = await supabase.from("youtube_videos").delete().eq("id", id);
  if (error) return { error: error.message };
  return { ok: true };
}

export async function upsertVideo(formData: FormData) {
  const supabase = await createClient() as SB;
  const id = formData.get("id") as string | null;

  const payload: Partial<YoutubeVideo> = {
    video_id: formData.get("video_id") as string,
    title: formData.get("title") as string,
    active: formData.get("active") === "true",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (id) {
    const { error } = await supabase.from("youtube_videos").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("youtube_videos").insert(payload);
    if (error) return { error: error.message };
  }

  redirect("/admin/youtube");
}
