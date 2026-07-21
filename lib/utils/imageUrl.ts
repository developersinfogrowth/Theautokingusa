/**
 * Image URL Utilities
 * Convert Supabase storage URLs to custom domain URLs
 */

/**
 * Convert Supabase storage URL to custom domain URL
 * 
 * @param supabaseUrl - Direct Supabase storage URL
 * @returns Custom domain URL or original if invalid
 * 
 * @example
 * // Input: https://your-project.supabase.co/storage/v1/object/public/blog-images/...

 */
export function convertToCustomDomain(supabaseUrl: string | null): string | null {
  if (!supabaseUrl) {
    return null
  }

  // Validate it's a valid Supabase URL
  if (!supabaseUrl.includes('.supabase.co') || !supabaseUrl.includes('/storage/')) {
    console.warn('⚠️  Invalid Supabase URL:', supabaseUrl)
    return supabaseUrl // Return original if not Supabase
  }

  // Get domain based on environment
  let domain = process.env.NEXT_PUBLIC_APP_URL

  // Fallback for client-side only
  if (!domain && typeof window !== 'undefined') {
    domain = window.location.origin
  }

  // If still no domain, return Supabase URL (safety fallback)
  if (!domain) {
    console.warn('⚠️  NEXT_PUBLIC_APP_URL not set, using Supabase URL directly')
    return supabaseUrl
  }

  // Encode the Supabase URL
  const encoded = encodeURIComponent(supabaseUrl)

  // Build the custom domain URL
  const customUrl = `${domain}/api/images?src=${encoded}`
  
  return customUrl
}

/**
 * Batch convert multiple image URLs
 */
export function convertImageUrls(urls: {
  cover_image: string | null
  author_avatar?: string | null
}) {
  return {
    cover_image: convertToCustomDomain(urls.cover_image),
    author_avatar: convertToCustomDomain(urls.author_avatar || null),
  }
}

/**
 * Check if URL is already using custom domain
 */
export function isCustomDomainUrl(url: string): boolean {
  if (!url) return false
  
  const customDomain = process.env.NEXT_PUBLIC_APP_URL
  if (!customDomain) return false
  
  return url.includes(customDomain) && url.includes('/api/images')
}