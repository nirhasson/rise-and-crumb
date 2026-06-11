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

// ── Articles ──────────────────────────────────────────────────────────────────

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

// ── Bakeries ──────────────────────────────────────────────────────────────────

export interface SanityBakery {
  _id: string
  name: string
  region: "north" | "center" | "south"
  city: string
  address?: string
  lat: number
  lng: number
  description?: string
  hours?: string
  image?: string
  specialties?: string[]
  tags?: string[]
  instagram?: string
  mapsUrl?: string
}

export const bakeriesQuery = `
  *[_type == "bakery"] | order(region asc) {
    _id,
    name,
    region,
    city,
    address,
    lat,
    lng,
    description,
    hours,
    "image": image.asset->url,
    specialties,
    tags,
    instagram,
    mapsUrl
  }
`

// ── Recipes ───────────────────────────────────────────────────────────────────

export interface SanityRecipe {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  image?: string
  difficulty?: "קל" | "בינוני" | "מתקדם"
  totalTime?: string
  hydration?: number
  hydrationDisplay?: string
  salt?: number
  levainType?: "sourdough" | "yeast"
  starterPercentage?: number
  yeastPercentage?: number
  loafWeight?: number
  flourMix?: Array<{ name: string; percentage: number }>
  additionals?: Array<{ name: string; percentage: number }>
  fermentation?: { bulk?: string; proof?: string; tips?: string[] }
  shaping?: { technique?: string; tips?: string[] }
  baking?: {
    temperature?: string
    temperatureCelsius?: number
    ovenType?: string
    bakingTime?: string
    steam?: boolean
    steamTip?: string
  }
  tips?: string[]
  youtubeLinks?: Array<{ title: string; url: string; channel: string }>
}

export const recipesQuery = `
  *[_type == "recipe"] | order(_createdAt asc) {
    _id,
    name,
    slug,
    description,
    "image": image.asset->url,
    difficulty,
    totalTime,
    hydration,
    hydrationDisplay,
    salt,
    levainType,
    starterPercentage,
    yeastPercentage,
    loafWeight,
    flourMix,
    additionals,
    fermentation,
    shaping,
    baking,
    tips,
    youtubeLinks
  }
`

export const recipeBySlugQuery = `
  *[_type == "recipe" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    "image": image.asset->url,
    difficulty,
    totalTime,
    hydration,
    hydrationDisplay,
    salt,
    levainType,
    starterPercentage,
    yeastPercentage,
    loafWeight,
    flourMix,
    additionals,
    fermentation,
    shaping,
    baking,
    tips,
    youtubeLinks
  }
`
