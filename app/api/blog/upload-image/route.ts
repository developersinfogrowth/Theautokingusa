import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

async function uploadSingle(
  supabase: SupabaseClient,
  blogId: string,
  file: File,
  folder: string
): Promise<string> {
  const ext      = file.name.split('.').pop() ?? 'jpg'
  const fileName = `${folder}/${blogId}-${Date.now()}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabase.storage
    .from('blog-images')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const blogId = formData.get('blogId') as string
    const cover  = formData.get('cover')  as File | null
    const avatar = formData.get('avatar') as File | null

    if (!blogId) {
      return NextResponse.json(
        { error: 'Missing required field: blogId' },
        { status: 400 }
      )
    }

    if (!cover && !avatar) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const result: { cover_image?: string; avatar?: string } = {}

    if (cover) {
      result.cover_image = await uploadSingle(supabase, blogId, cover, 'covers')
    }

    if (avatar) {
      result.avatar = await uploadSingle(supabase, blogId, avatar, 'avatars')
    }

    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('💥 Image upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}