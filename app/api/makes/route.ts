// app/api/makes/route.ts
import { createAdminClient } from "@/lib/supabase/server";

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  const supabase = createAdminClient();

  const { data: makes, error } = await supabase
    .from("makes")
    .select("id, name")
    .order("name");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(makes ?? [], {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}