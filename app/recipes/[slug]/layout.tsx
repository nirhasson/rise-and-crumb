import type { Metadata } from 'next'
import { BREAD_RECIPES } from '@/lib/bread-types'
import { client, recipeBySlugQuery } from '@/lib/sanity'

const baseUrl = 'https://www.riseandcrumb.com'

// Meta descriptions: keep whole sentences, up to ~155 chars
function metaDescription(text: string | undefined, fallback: string): string {
  if (!text) return fallback
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= 155) return clean
  const cut = clean.slice(0, 155)
  const lastStop = cut.lastIndexOf('.')
  return lastStop > 60 ? cut.slice(0, lastStop + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…'
}

const absolute = (url: string) => (url.startsWith('http') ? url : `${baseUrl}${url}`)

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)

  const hardcoded = Object.values(BREAD_RECIPES).find(r => r.slug === slug)
  if (hardcoded) {
    const desc = metaDescription(hardcoded.description, `מתכון ל${hardcoded.name}`)
    return {
      title: `מתכון ל${hardcoded.name} | Rise & Crumb`,
      description: desc,
      alternates: { canonical: `${baseUrl}/recipes/${slug}` },
      openGraph: {
        title: `מתכון ל${hardcoded.name} | Rise & Crumb`,
        description: desc,
        url: `${baseUrl}/recipes/${slug}`,
        images: hardcoded.image ? [{ url: absolute(hardcoded.image) }] : [],
        type: 'article',
        locale: 'he_IL',
        siteName: 'Rise & Crumb',
      },
    }
  }

  try {
    const recipe = await client.fetch(recipeBySlugQuery, { slug })
    if (recipe) {
      const desc = metaDescription(recipe.description, `מתכון ל${recipe.name}`)
      return {
        title: `מתכון ל${recipe.name} | Rise & Crumb`,
        description: desc,
        alternates: { canonical: `${baseUrl}/recipes/${slug}` },
        openGraph: {
          title: `מתכון ל${recipe.name} | Rise & Crumb`,
          description: desc,
          url: `${baseUrl}/recipes/${slug}`,
          images: recipe.image ? [{ url: recipe.image }] : [],
          type: 'article',
          locale: 'he_IL',
          siteName: 'Rise & Crumb',
        },
      }
    }
  } catch {}

  return {
    title: 'מתכון | Rise & Crumb',
  }
}

export default function RecipeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
