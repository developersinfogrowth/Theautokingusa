// lib/supabase/storage.ts
import type { SupabaseClient } from "@supabase/supabase-js"
import { convertToCustomDomain } from '@/lib/utils/imageUrl'

const BUCKET = 'blog-images'

// optional validation
const validateFile = (file: File) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 2 * 1024 * 1024

  if (!allowed.includes(file.type)) {
    throw new Error(`Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP`)
  }

  if (file.size > maxSize) {
    throw new Error(`File too large: ${(file.size / (1024 * 1024)).toFixed(2)}MB. Max: 2MB`)
  }
}

export const uploadSingle = async (
  supabaseClient: SupabaseClient,
  blogId: string,
  file: File | undefined,
  type: 'cover' | 'avatar' | 'content-image'
): Promise<string | null> => {
  if (!file) {
    return null
  }

  try {
    validateFile(file)

    const ext = file.name.split('.').pop()
    let folderName = blogId
    if (/^\d{8,}$/.test(blogId)) {
      folderName = `blog-${blogId}`
    }
    // If the type is 'cover', or 'avatar', use as before. If 'content-image', use that name.
    let fileName = `${type}.${ext}`;
    if (type === 'content-image') {
      fileName = `content-image.${ext}`;
    }
    const path = `blog/${folderName}/${fileName}`


    const { error } = await supabaseClient.storage
      .from(BUCKET)
      .upload(path, file, { upsert: true })

    if (error) {
      throw new Error(`Upload failed: ${error.message}`)
    }

    // ✅ Get Supabase public URL
    const { data } = supabaseClient.storage
      .from(BUCKET)
      .getPublicUrl(path)

    // ✅ Convert to custom domain URL
    const customUrl = convertToCustomDomain(data.publicUrl)
    
    return customUrl
  } catch (error) {
    console.error(`❌ Error uploading ${type}:`, error)
    throw error
  }
}

export const uploadBlogImages = async (
  supabaseClient: SupabaseClient,
  blogId: string,
  files: {
    cover: File
    avatar?: File
    contentImage?: File
  }
) => {
  try {
    const coverUrl = await uploadSingle(supabaseClient, blogId, files.cover, 'cover')
    const avatarUrl = await uploadSingle(supabaseClient, blogId, files.avatar, 'avatar')
    const contentImageUrl = files.contentImage
      ? await uploadSingle(supabaseClient, blogId, files.contentImage, 'content-image')
      : null;
    return {
      cover_image: coverUrl,
      avatar: avatarUrl || null,
      content_image: contentImageUrl || null,
    }
  } catch (error) {
    console.error(`💥 Image upload batch failed:`, error)
    throw error
  }
}