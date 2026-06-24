import { NextRequest } from 'next/server'
import { client, recipeBySlugQuery } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') ?? 'מתכון-בייגלה-ירושלמי'

  try {
    const allRecipes = await client.fetch(
      `*[_type == "recipe"] { _id, name, "slugCurrent": slug.current }`
    )
    const recipe = await client.fetch(recipeBySlugQuery, { slug })

    return Response.json({
      requestedSlug: slug,
      allRecipeSlugs: allRecipes,
      foundRecipe: recipe ? { _id: recipe._id, name: recipe.name } : null,
    })
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 })
  }
}
