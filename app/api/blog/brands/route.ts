// File: app/api/blog/brands/route.ts
//
// Returns all distinct non-null brand values from published blog posts.
// The blog page sidebar fetches this on mount to populate the Brand dropdown.
// Without this file, the brand dropdown will always show "No brands found".

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Fetch brand column from all published posts where brand is not null.
    // Supabase JS client doesn't support SELECT DISTINCT natively,
    // so we deduplicate in JS below.
    const { data, error } = await supabase
      .from("blogs_autoking")
      .select("brand")
      .eq("is_published", true)
      .not("brand", "is", null);

    if (error) throw error;

    // Deduplicate + remove empty strings + sort A→Z
    const brands: string[] = [
      ...new Set(
        (data ?? [])
          .map((row: { brand: string | null }) => row.brand)
          .filter((b): b is string => typeof b === "string" && b.trim() !== "")
      ),
    ].sort();

    return NextResponse.json({ success: true, data: brands });

  } catch (error) {
    console.error("🔴 Brands API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
        data: [],
      },
      { status: 500 }
    );
  }
}