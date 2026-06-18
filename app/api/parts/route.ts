import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const slug = searchParams.get("slug");

    let query = supabase.from("parts_content_autoking").select("*");

    if (type) query = query.eq("type", type);
    if (slug) query = query.eq("slug", slug);

    const { data, error } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, type, title, description, warranty, badge, image, seo, content, rich_content } = body;

    if (!slug || !type || !title) {
      return NextResponse.json(
        { error: "Slug, type and title are required" },
        { status: 400 }
      );
    }

    const part = {
      id:           randomUUID(),
      slug,
      type,
      title,
      description:  description  || null,
      warranty:     warranty     || null,
      badge:        badge        || null,
      image:        image        || null,
      seo:          seo          || {},
      content:      content      || {},
      rich_content: rich_content || null,
      created_at:   new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("parts_content_autoking")
      .insert([part])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, slug, type, title, description, warranty, badge, image, seo, content, rich_content } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const updates = {
      ...(slug        && { slug }),
      ...(type        && { type }),
      ...(title       && { title }),
      ...(description !== undefined && { description }),
      ...(warranty    !== undefined && { warranty }),
      ...(badge       !== undefined && { badge }),
      ...(image       !== undefined && { image }),
      ...(seo         && { seo }),
      ...(content     !== undefined && { content }),
      ...(rich_content !== undefined && { rich_content }),
    };

    const { data, error } = await supabase
      .from("parts_content_autoking")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const { error } = await supabase
      .from("parts_content_autoking")
      .delete()
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}