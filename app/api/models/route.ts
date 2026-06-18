import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PROJECT_A_SUPABASE_URL!,
  process.env.PROJECT_A_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const make = new URL(req.url).searchParams.get("make");

  if (!make) return Response.json({ error: "make is required" }, { status: 400 });

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

  return Response.json(models ?? []);
}