import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const type = req.nextUrl.searchParams.get("type") || "engine";

  if (!slug) {
    return NextResponse.json({ data: null }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("autoking_brands")
    .select("*")
    .eq("slug", slug)
    .eq("type", type)
    .single();

  if (error || !data) {
    return NextResponse.json({ data: null }, { status: 404 });
  }

  return NextResponse.json({ data });
}