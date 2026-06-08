import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

export const client = createClient({
  projectId: "k2yjkrkz",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export interface SanityArticle {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: SanityImageSource
  content: unknown[]
  publishedAt?: string
  category?: string
  tags?: string[]
  readTime?: number
}

export const articlesQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    mainImage,
    category,
    tags,
    readTime
  }
`

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    excerpt,
    content,
    publishedAt,
    mainImage,
    category,
    tags,
    readTime
  }
`
