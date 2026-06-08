"use client"

import Link from "next/link"
import { Navigation } from "@/components/bread/navigation"
import { RecipePage } from "@/components/bread/recipe-page"
import { useLanguage } from "@/lib/language-context"
import { use } from "react"

export default function RecipeSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { t } = useLanguage()

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
              {t("siteName").split(" ").map((word, i) => (
                <span key={i}>{word} </span>
              ))}
            </h1>
          </Link>
        </header>

        <Navigation />

        <main className="mt-8">
          <RecipePage slug={slug} />
        </main>

        <footer className="mt-12 pt-8 border-t-2 border-primary/20">
          <div className="flex justify-between items-center text-xs font-mono">
            <span>{t("siteName").toUpperCase()}</span>
            <span>{t("footer")}</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
