"use client" // הופך את הרכיב לרכיב לקוח

import { useEffect, useState } from "react"
import { client, articlesQuery } from "@/lib/sanity"
import { Blog } from "./blog"

export default function BlogServer() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch(articlesQuery)
        setPosts(data)
      } catch (error) {
        console.error("Sanity fetch error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <div className="text-center font-mono py-10">Loading recipes...</div>

  return <Blog posts={posts} />
}