import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity' // וודא שהנתיב ל-client שלך נכון

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.riseandcrumb.com'
  const lastModified = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/starter`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/bakeries`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog/local-flour-guide`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/local-sourdough-science`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const query = `*[_type == "article"]{ "slug": slug.current, _updatedAt }`

  let dynamicPages: MetadataRoute.Sitemap = []

  try {
    const posts = await client.fetch(query)

    dynamicPages = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
  }

  return [...staticPages, ...dynamicPages]
}