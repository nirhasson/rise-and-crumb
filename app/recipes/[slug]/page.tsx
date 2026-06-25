import Link from "next/link"
import { Navigation } from "@/components/bread/navigation"
import { RecipePage } from "@/components/bread/recipe-page"
import { client, recipeBySlugQuery, type SanityRecipe } from "@/lib/sanity"
import { BREAD_RECIPES, type BreadRecipeConfig } from "@/lib/bread-types"

const baseUrl = 'https://www.riseandcrumb.com'

function toISO(str: string): string {
  const n = parseInt((str.match(/\d+/) ?? ['1'])[0])
  if (/שעה|שעות/.test(str)) return `PT${n}H`
  if (/דקה|דקות/.test(str)) return `PT${n}M`
  if (/יום|ימים/.test(str)) return `P${n}D`
  return `PT${n}H`
}

function hardcodedJsonLd(config: BreadRecipeConfig, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: config.name,
    description: config.description,
    author: { '@type': 'Organization', name: 'Rise & Crumb', url: baseUrl },
    url: `${baseUrl}/recipes/${slug}`,
    image: config.image || undefined,
    totalTime: toISO(config.totalTime),
    cookTime: toISO(config.baking.bakingTime),
    recipeYield: `כיכר ${config.loafWeight}ג`,
    recipeCategory: 'לחם',
    recipeCuisine: 'ישראלית',
    keywords: `לחם, אפייה, ${config.name}, ${config.levainType === 'sourdough' ? 'מחמצת' : 'שמרים'}`,
    recipeIngredient: [
      ...config.flourMix.map(f => `${f.name} — ${f.percentage}% מהקמח`),
      `מים — הידרציה ${config.hydration}%`,
      `מלח — ${config.salt}% מהקמח`,
      ...(config.starterPercentage ? [`מחמצת — ${config.starterPercentage}% מהקמח`] : []),
      ...(config.yeastPercentage ? [`שמרים — ${config.yeastPercentage}%`] : []),
      ...config.additionals.map(a => `${a.name} — ${a.percentage}%`),
    ],
    recipeInstructions: [
      { '@type': 'HowToStep', name: 'תסיסה ראשונה (Bulk)', text: `${config.fermentation.bulk}. ${config.fermentation.tips.join(' ')}` },
      { '@type': 'HowToStep', name: 'עיצוב', text: `${config.shaping.technique}. ${config.shaping.tips.join(' ')}` },
      { '@type': 'HowToStep', name: 'התפחה סופית', text: config.fermentation.proof },
      { '@type': 'HowToStep', name: 'אפייה', text: `אפייה ב-${config.baking.temperature} למשך ${config.baking.bakingTime} בתנור ${config.baking.ovenType}.${config.baking.steamTip ? ' ' + config.baking.steamTip : ''}` },
    ],
  }
}

function sanityJsonLd(recipe: SanityRecipe, slug: string) {
  const tempStr = recipe.baking?.temperature ?? (recipe.baking?.temperatureCelsius ? `${recipe.baking.temperatureCelsius}°C` : '')
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    author: { '@type': 'Organization', name: 'Rise & Crumb', url: baseUrl },
    url: `${baseUrl}/recipes/${encodeURIComponent(slug)}`,
    image: recipe.image || undefined,
    ...(recipe.totalTime ? { totalTime: toISO(recipe.totalTime) } : {}),
    ...(recipe.baking?.bakingTime ? { cookTime: toISO(recipe.baking.bakingTime) } : {}),
    ...(recipe.loafWeight ? { recipeYield: `כיכר ${recipe.loafWeight}ג` } : {}),
    recipeCategory: 'לחם',
    recipeCuisine: 'ישראלית',
    recipeIngredient: [
      ...(recipe.flourMix ?? []).map(f => `${f.name} — ${f.percentage}% מהקמח`),
      ...(recipe.hydration ? [`מים — הידרציה ${recipe.hydration}%`] : []),
      ...(recipe.salt ? [`מלח — ${recipe.salt}%`] : []),
      ...(recipe.additionals ?? []).map(a => `${a.name} — ${a.percentage}%`),
    ],
    recipeInstructions: [
      ...(recipe.fermentation?.bulk ? [{ '@type': 'HowToStep', name: 'תסיסה ראשונה (Bulk)', text: recipe.fermentation.bulk }] : []),
      ...(recipe.shaping?.technique ? [{ '@type': 'HowToStep', name: 'עיצוב', text: recipe.shaping.technique }] : []),
      ...(recipe.fermentation?.proof ? [{ '@type': 'HowToStep', name: 'התפחה סופית', text: recipe.fermentation.proof }] : []),
      ...(recipe.baking ? [{ '@type': 'HowToStep', name: 'אפייה', text: [tempStr, recipe.baking.bakingTime].filter(Boolean).join(', ') }] : []),
    ],
  }
}

export default async function RecipeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)

  let sanityRecipe: SanityRecipe | null = null
  let jsonLd: object | null = null

  const hardcodedConfig = Object.values(BREAD_RECIPES).find(r => r.slug === slug) ?? null

  if (hardcodedConfig) {
    jsonLd = hardcodedJsonLd(hardcodedConfig, slug)
  } else {
    try {
      sanityRecipe = await client.fetch(
        recipeBySlugQuery,
        { slug },
        { next: { revalidate: 60 } }
      )
      if (sanityRecipe) jsonLd = sanityJsonLd(sanityRecipe, slug)
    } catch {
      // fall through to "not found"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-8 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-border" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-border" />
          <Link href="/">
            <h1
              className="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-none hover:text-foreground transition-colors duration-200"
              style={{ fontFamily: 'Impact, "Arial Black", sans-serif', letterSpacing: "-0.03em" }}
            >
              Rise &amp; Crumb
            </h1>
          </Link>
        </header>

        <Navigation />

        <main className="mt-8">
          <RecipePage slug={slug} initialSanityRecipe={sanityRecipe} />
        </main>

        <footer className="mt-12 pt-8 border-t-2 border-primary/20">
          <div className="flex justify-between items-center text-xs font-mono">
            <span>RISE &amp; CRUMB</span>
            <span>EST. 2026</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
