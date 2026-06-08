import Link from "next/link"
import BlogServer from "@/components/bread/blog-server"
import { Navigation } from "@/components/bread/navigation"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מגזין האפייה | Rise & Crumb',
  description: 'מדריכים מעמיקים על קמחים, תסיסה, טכניקות אפייה וכל מה שצריך לדעת כדי לאפות לחם מושלם.',
}

export default function BlogPage() {
  return (
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
        <BlogServer />
      </main>
    </div>
  )
}