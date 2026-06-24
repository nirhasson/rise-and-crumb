import Link from "next/link"
import { Navigation } from "@/components/bread/navigation"
import { RecipePage } from "@/components/bread/recipe-page"
import { client, recipeBySlugQuery, type SanityRecipe } from "@/lib/sanity"
import { BREAD_RECIPES } from "@/lib/bread-types"

export default async function RecipeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let sanityRecipe: SanityRecipe | null = null

  const isHardcoded = Object.values(BREAD_RECIPES).some(r => r.slug === slug)

  if (!isHardcoded) {
    try {
      sanityRecipe = await client.fetch(
        recipeBySlugQuery,
        { slug },
        { next: { revalidate: 60 } }
      )
    } catch {
      // fall through to "not found"
    }
  }

  return (
    <div className="min-h-screen bg-background">
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
