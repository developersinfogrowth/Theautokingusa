import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Prevent indexing of internal tools, admin, and server-side logic
      disallow: ['/admin', '/api', '/(admin)', '/(auth)'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}