import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { BREAD_RECIPES } from '@/lib/bread-types'

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

  // Hardcoded recipe pages
  const recipePages: MetadataRoute.Sitemap = Object.values(BREAD_RECIPES).map(r => ({
    url: `${baseUrl}/recipes/${r.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Sanity articles
  let articlePages: MetadataRoute.Sitemap = []
  try {
    const articles = await client.fetch(`*[_type == "article"]{ "slug": slug.current, _updatedAt }`)
    articlePages = articles.map((a: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: new Date(a._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {}

  // Sanity recipes
  let sanityRecipePages: MetadataRoute.Sitemap = []
  try {
    const recipes = await client.fetch(`*[_type == "recipe"]{ "slug": slug.current, _updatedAt }`)
    sanityRecipePages = recipes.map((r: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/recipes/${r.slug}`,
      lastModified: new Date(r._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch {}

  return [...staticPages, ...recipePages, ...articlePages, ...sanityRecipePages]
}
