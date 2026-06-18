import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

// ─────────────────────────────────────────────────────────────────────────────
// POST — Create blog post (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const richContent =
      Array.isArray(body.content_sections) && body.content_sections.length > 0
        ? body.content_sections
            .map((s: { heading: string; content: string }) =>
              `<h2>${s.heading}</h2>${s.content}`
            )
            .join("\n")
        : body.rich_content || null;

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("blogs_autoking")
      .insert({
        slug:            body.slug,
        title:           body.title,
        excerpt:         body.excerpt          || null,
        rich_content:    richContent,
        cover_image:     body.cover_image      || null,
        author_name:     body.author_name      || null,
        author_role:     body.author_role      || null,
        author_avatar:   body.author_avatar    || null,
        categories:      body.categories       || [],
        tags:            body.tags             || [],
        brand:           body.brand            || null,
        rating:          body.rating           ?? null,
        views:           body.views            ?? 0,
        faqs:            body.faqs             || [],
        seo_title:       body.seo_title        || null,
        seo_description: body.seo_description  || null,
        seo_keywords:    body.seo_keywords     || [],
        read_time:       body.read_time        || null,
        is_published:    body.is_published     ?? false,
      })
      .select()
      .single();

    if (error) {
      console.error("🔴 Database Error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("💥 API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GET — Fetch blog posts with filters
//
// Query params:
//   page        number    default 1
//   limit       number    default 9
//   published   "true"    → is_published = true
//   search      string    → title OR excerpt ilike
//   brand       string    → exact match on brand column
//   min_rating  number    → rating >= min_rating  (e.g. "2" shows 2.0, 2.5, 3.0 ... 5.0)
//                           "4.5" shows ONLY 4.5 and 5.0
//                           "2" shows everything rated 2.0 and above (correct behavior)
//   sort        string    → "created_at" (latest) | "views" (popular)
//   order       string    → "desc" | "asc"
// ─────────────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const sp = req.nextUrl.searchParams;

    const page      = Math.max(1, Number(sp.get("page")  || 1));
    const limit     = Math.max(1, Number(sp.get("limit") || 9));
    const search    = sp.get("search")     || "";
    const published = sp.get("published")  || "";
    const brand     = sp.get("brand")      || "";
    const minRating = sp.get("min_rating") || "";   // ← KEY: must be min_rating not rating
    const sort      = sp.get("sort")       || "created_at";
    const order     = sp.get("order")      || "desc";
    const ascending = order === "asc";

    const from = (page - 1) * limit;
    const to   = from + limit - 1;

    let query = supabase
      .from("blogs_autoking")
      .select("*", { count: "exact" });

    // is_published filter
    if (published !== "") {
      query = query.eq("is_published", published === "true");
    }

    // search: ilike on title OR excerpt
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,excerpt.ilike.%${search}%`
      );
    }

    // brand: exact text match
    if (brand) {
      query = query.eq("brand", brand);
    }

    // min_rating: WHERE rating >= min_rating
    // e.g. min_rating=2  → shows posts with rating 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 4.8, 5.0
    // e.g. min_rating=4  → shows posts with rating 4.0, 4.5, 4.8, 5.0
    // e.g. min_rating=4.5 → shows posts with rating 4.5, 5.0 only
    // NOTE: showing 4.8 when "2 & above" is selected IS correct — 4.8 >= 2
    if (minRating !== "") {
      const minVal = parseFloat(minRating);
      if (!isNaN(minVal)) {
        query = query.gte("rating", minVal);
      }
    }

    // sort
    const sortCol = sort === "views" ? "views" : "created_at";
    query = query.order(sortCol, { ascending }).range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("🔴 Blog GET Error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}