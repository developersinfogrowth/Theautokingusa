import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PROJECT_A_SUPABASE_URL!,
  process.env.PROJECT_A_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data: makes } = await supabase
    .from("makes")
    .select("id, name")
    .order("name");

  return Response.json(makes ?? []);
}