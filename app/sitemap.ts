import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import type { Database } from "@/lib/supabase/types/database.types"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // 1. Fetch data from both tables in parallel
  const [blogsRes, seoPagesRes] = await Promise.all([
    supabase
      .from('blogs_autoking')
      .select('slug, updated_at')
      .eq('is_published', true),
    supabase
      .from('autoking_brands')
      .select('slug, type, updated_at')
      .eq('status', 'published') // Assuming you use 'published' status
  ])

  // 2. Define your static routes
  const staticRoutes = [
    '', '/blogs', '/used-engine', '/used-transmission', 
    '/commercial-vehicles', '/contact-us', '/about'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 3. Map dynamic blogs
  const blogUrls = (blogsRes.data || []).map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 4. Map dynamic SEO pages (assuming your type defines the URL path)
  const seoPageUrls = (seoPagesRes.data || []).map((page) => ({
    url: `${baseUrl}/${page.type}/${page.slug}`,
    lastModified: new Date(page.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogUrls, ...seoPageUrls]
}