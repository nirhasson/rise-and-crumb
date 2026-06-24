import type { Metadata } from 'next'
import { BREAD_RECIPES } from '@/lib/bread-types'
import { client, recipeBySlugQuery } from '@/lib/sanity'

const baseUrl = 'https://www.riseandcrumb.com'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)

  const hardcoded = Object.values(BREAD_RECIPES).find(r => r.slug === slug)
  if (hardcoded) {
    const desc = hardcoded.description.split('.')[0] + '.'
    return {
      title: `מתכון ל${hardcoded.name} | Rise & Crumb`,
      description: desc,
      openGraph: {
        title: `מתכון ל${hardcoded.name} | Rise & Crumb`,
        description: desc,
        url: `${baseUrl}/recipes/${slug}`,
        images: hardcoded.image ? [{ url: `${baseUrl}${hardcoded.image}` }] : [],
        type: 'article',
        locale: 'he_IL',
        siteName: 'Rise & Crumb',
      },
    }
  }

  try {
    const recipe = await client.fetch(recipeBySlugQuery, { slug })
    if (recipe) {
      const desc = recipe.description?.split('.')[0] + '.' ?? `מתכון ל${recipe.name}`
      return {
        title: `מתכון ל${recipe.name} | Rise & Crumb`,
        description: desc,
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
