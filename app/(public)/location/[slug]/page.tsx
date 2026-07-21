import { permanentRedirect, notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Static params ─────────────────────────────────────────────
// Kept so Next still generates a page per known location slug (so the
// redirect itself is prebuilt rather than falling back to on-demand
// rendering for every hit).
export async function generateStaticParams() {
  const { data, error } = await supabase
    .from("autoking_brands")
    .select("slug")
    .eq("type", "location")
    .eq("status", "published");

  if (error) {
    console.error("Location static params error:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    slug: row.slug,
  }));
}

// ── Page ──────────────────────────────────────────────────────
// /location/[slug] is no longer the canonical URL — locations now live
// at /used-engine/[slug]. This route just 301s so any link that's
// already out there (bookmarks, old search-engine index) still works.
export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: location } = await supabase
    .from("autoking_brands")
    .select("slug")
    .eq("slug", slug)
    .eq("type", "location")
    .eq("status", "published")
    .single();

  if (!location) {
    return notFound();
  }

  permanentRedirect(`/used-engine/${slug}`);
}