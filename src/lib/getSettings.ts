import { createClient } from "@/lib/supabase/server";

export async function getSettings(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("key, value") as { data: { key: string; value: string }[] | null };
  if (!data) return {};
  return Object.fromEntries(data.map((r) => [r.key, r.value]));
}
