import { client, recipesQuery, type SanityRecipe } from "@/lib/sanity"
import { HomeClient } from "@/components/bread/home-client"

export default async function Page() {
  let sanityRecipes: SanityRecipe[] = []

  try {
    sanityRecipes = await client.fetch(
      recipesQuery,
      {},
      { next: { revalidate: 60 } }
    )
  } catch {
    // Sanity unavailable — hardcoded recipes are shown as fallback
  }

  return <HomeClient sanityRecipes={sanityRecipes} />
}
