import { client, articlesQuery } from "@/lib/sanity"
import { Blog } from "./blog"

export default async function BlogServer() {
  let posts = []

  try {
    posts = await client.fetch(articlesQuery, {}, { next: { revalidate: 60 } })
  } catch (error) {
    console.error("Sanity fetch error:", error)
  }

  return <Blog posts={posts} />
}
