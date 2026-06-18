import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data } = await supabase
    .from("blogs_autoking")
    .select("categories")
    .eq("is_published", true);

  const all = new Set<string>();
  (data ?? []).forEach((row) => {
    (row.categories ?? []).forEach((c: string) => all.add(c));
  });

  return NextResponse.json({ success: true, data: Array.from(all).sort() });
}