import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// ─── GET ──────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "slug is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_slug", slug)
    .order("position", { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// ─── POST ─────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { page_slug, section_type, position, content } = body;

  if (!page_slug || !section_type || position === undefined) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("page_sections")
    .insert({
      page_slug,
      section_type,
      position,
      content: content ?? {},
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}

// ─── PATCH ────────────────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  // Batch reorder
  if (Array.isArray(body)) {
    const updates = await Promise.all(
      body.map(
        ({ id, position }: { id: string; position: number }) =>
          supabase
            .from("page_sections")
            .update({ position })
            .eq("id", id)
      )
    );

    const failed = updates.find((r) => r.error);

    if (failed?.error) {
      return NextResponse.json(
        { error: failed.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  }

  // Single update
  const { id, content, position, section_type } = body;

  if (!id) {
    return NextResponse.json(
      { error: "id is required" },
      { status: 400 }
    );
  }

  const updatePayload: Record<string, unknown> = {};

  if (content !== undefined) updatePayload.content = content;
  if (position !== undefined) updatePayload.position = position;
  if (section_type !== undefined)
    updatePayload.section_type = section_type;

  const { data, error } = await supabase
    .from("page_sections")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// ─── DELETE ───────────────────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "id is required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("page_sections")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}