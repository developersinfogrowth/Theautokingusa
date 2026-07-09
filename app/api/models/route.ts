// app/api/models/route.ts
import { createAdminClient } from "@/lib/supabase/server";

export const revalidate = 3600;

export async function GET(req: Request) {
  const make = new URL(req.url).searchParams.get("make");
  if (!make) return Response.json({ error: "make is required" }, { status: 400 });

  const supabase = createAdminClient();

  const { data: makeRow } = await supabase
    .from("makes")
    .select("id")
    .eq("name", make)
    .single();

  if (!makeRow) return Response.json([], { status: 200 });

  const { data: models } = await supabase
    .from("models")
    .select("id, name")
    .eq("make_id", makeRow.id)
    .order("name");

  return Response.json(models ?? [], {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}