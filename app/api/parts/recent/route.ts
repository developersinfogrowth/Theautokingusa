import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const type    = req.nextUrl.searchParams.get("type") || "engine";
  const exclude = req.nextUrl.searchParams.get("exclude") || "";

  const { data } = await supabase
    .from("autoking_brands")
    .select("slug, title")
    .eq("type", type)
    .neq("slug", exclude)
    .order("created_at", { ascending: false })
    .limit(6);

  return NextResponse.json({ data: data ?? [] });
}