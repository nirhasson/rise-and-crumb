"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/bread/navigation"
import { BreadCard } from "@/components/bread/bread-card"
import { Newsletter } from "@/components/bread/newsletter"
import { useLanguage } from "@/lib/language-context"
import { BREAD_RECIPES, type BreadType, type BreadRecipeConfig } from "@/lib/bread-types"
import { ArrowLeft, BookOpen, Sprout, Newspaper, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SanityRecipe } from "@/lib/sanity"

const CAROUSEL_IMAGES = Object.values(BREAD_RECIPES).map(r => ({
  src: r.image,
  name: r.name,
}))

const MARQUEE_ITEMS = [
  "אני לא אלים כי אני על עלים, אבל תנסה להתעסק איתי אתה תגמור כמו בצק עלים - שבק ס",
  "ואחרי שהכול ייגמר תישאר רק אהבה פשוטה פשוטה פשוטה כמו לחם טובה כמו אהבה - יאיר זיו", "קטע לא קטע, זה לא משטר של דיאטה, בין אם זה חומוס או  פטה בתוך בגט או ג'בטה - לוקאץ'",
  "אני מוכן לחיות על לחם ועל מים ורק לראות אותך תמיד מול העיניים - סטלוס ואורן חן",
  "Rise & Crumb", "קופידון ירה בי חץ והתאהבתי בחמץ - אורטגה", "Rise & Crumb", "אני זוכר אותה קונה שם לחם קימל, אני זוכר אותה מזמן מכיתה גימל - כוורת",
  "היי אחי, החיים שלך בלאפה, היי אחי, זורק את הכל לפיתה גדולה - טיפקס", "Rise & Crumb",
]

function sanityToConfig(r: SanityRecipe): BreadRecipeConfig {
  return {
    name: r.name,
    slug: r.slug.current,
    description: r.description ?? "",
    hydration: r.hydration ?? 75,
    hydrationDisplay: r.hydrationDisplay,
    salt: r.salt ?? 2,
    levainType: r.levainType ?? "sourdough",
    starterPercentage: r.starterPercentage,
    yeastPercentage: r.yeastPercentage,
    flourMix: r.flourMix ?? [{ name: "קמח לבן", percentage: 100 }],
    additionals: r.additionals ?? [],
    image: r.image ?? "/images/bread/sourdough.jpg",
    difficulty: r.difficulty ?? "בינוני",
    totalTime: r.totalTime ?? "24 שעות",
    loafWeight: r.loafWeight ?? 800,
    fermentation: {
      bulk: r.fermentation?.bulk ?? "4 שעות",
      proof: r.fermentation?.proof ?? "12 שעות",
      tips: r.fermentation?.tips ?? [],
    },
    shaping: {
      technique: r.shaping?.technique ?? "",
      tips: r.shaping?.tips ?? [],
    },
    baking: {
      temperature: r.baking?.temperature ?? "250°C",
      temperatureCelsius: r.baking?.temperatureCelsius ?? 250,
      ovenType: r.baking?.ovenType ?? "תנור ביתי",
      bakingTime: r.baking?.bakingTime ?? "40 דקות",
      steam: r.baking?.steam ?? false,
      steamTip: r.baking?.steamTip,
    },
    tips: r.tips ?? [],
    youtubeLinks: r.youtubeLinks ?? [],
  }
}

/* ─── Carousel: crossfade between bread images ─── */
function BreadCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setCurrent(c => (c + 1) % CAROUSEL_IMAGES.length),
      3600
    )
    return () => clearInterval(id)
  }, [])

  return (
    <div className="float-animate relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.75 0.16 65) 0%, transparent 65%)",
          filter: "blur(32px)",
          opacity: 0.38,
        }}
      />
      <div className="relative w-[280px] h-[280px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden border-4 border-background shadow-2xl">
        {CAROUSEL_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              i === current ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={img.src}
              alt={img.name}
              fill
              className="object-cover"
              sizes="300px"
            />
          </div>
        ))}
      </div>
      <div className="absolute -top-2 -right-4 bg-secondary text-secondary-foreground px-4 py-2 text-xs font-display font-black uppercase tracking-widest shadow-lg z-10">
        {CAROUSEL_IMAGES[current].name}
      </div>
      <div className="absolute -bottom-2 -left-4 bg-primary text-primary-foreground px-4 py-2 text-xs font-display font-black uppercase tracking-widest shadow-lg z-10">
        מחמצת &amp; שמרים
      </div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"
            )}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Hamburger full-screen menu ─── */
function HamburgerMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const navItems = [
    { href: "/", label: "מתכונים", icon: BookOpen },
    { href: "/starter", label: "מדריך מחמצת", icon: Sprout },
    { href: "/blog", label: "מגזין", icon: Newspaper },
    { href: "/bakeries", label: "מאפיות", icon: MapPin },
  ]

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="תפריט ניווט"
        className={cn(
          "fixed top-5 right-5 z-50 w-11 h-11 flex flex-col items-center justify-center gap-[5px]",
          "bg-background/90 backdrop-blur border-2 shadow-md transition-colors duration-200",
          open ? "border-primary" : "border-border hover:border-foreground"
        )}
      >
        <span className={cn("block w-5 h-[2px] bg-foreground transition-all duration-300 origin-center",
          open && "rotate-45 translate-y-[7px]")} />
        <span className={cn("block w-5 h-[2px] bg-foreground transition-all duration-300",
          open && "opacity-0 scale-x-0")} />
        <span className={cn("block w-5 h-[2px] bg-foreground transition-all duration-300 origin-center",
          open && "-rotate-45 -translate-y-[7px]")} />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center",
          "bg-background/97 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      >
        <nav className="flex flex-col items-center gap-6" onClick={e => e.stopPropagation()}>
          {navItems.map(({ href, label, icon: Icon }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-5 text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-foreground hover:text-primary transition-all duration-200"
              style={{
                letterSpacing: "-0.03em",
                transform: open ? "translateY(0)" : "translateY(16px)",
                opacity: open ? 1 : 0,
                transition: `transform 300ms ${i * 60}ms, opacity 300ms ${i * 60}ms, color 150ms`,
              }}
            >
              <Icon className="h-7 w-7 opacity-40 group-hover:opacity-100 transition-opacity" />
              {label}
            </Link>
          ))}
        </nav>
        <p className="absolute bottom-10 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
          RISE &amp; CRUMB · EST. 2026
        </p>
      </div>
    </>
  )
}

/* ─── Scroll-triggered entrance wrapper ─── */
function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: "opacity, transform",
        transitionDuration: "400ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
      }}
    >
      {children}
    </div>
  )
}

/* ─── Page ─── */
interface HomeClientProps {
  sanityRecipes?: SanityRecipe[]
}

export function HomeClient({ sanityRecipes = [] }: HomeClientProps) {
  const { t } = useLanguage()

  const hardcodedEntries = Object.entries(BREAD_RECIPES) as [BreadType, BreadRecipeConfig][]
  const sanityEntries = sanityRecipes.map(r => [r.slug.current, sanityToConfig(r)] as [string, BreadRecipeConfig])
  const allEntries: [string, BreadRecipeConfig][] = [...hardcodedEntries, ...sanityEntries]

  return (
    <div className="min-h-screen bg-background">
      <HamburgerMenu />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex flex-col overflow-hidden bg-background">
        <div
          className="blob-animate pointer-events-none absolute top-[30%] left-[10%] w-[520px] h-[520px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.14 60) 0%, oklch(0.88 0.08 75) 45%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="blob-animate pointer-events-none absolute top-[5%] right-[5%] w-[260px] h-[260px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.60 0.18 265) 0%, transparent 70%)",
            filter: "blur(50px)",
            opacity: 0.15,
            animationDelay: "3.5s",
          }}
        />
        <div className="absolute top-5 left-5 w-7 h-7 border-t-2 border-l-2 border-border z-10" />
        <div className="absolute top-5 right-20 w-7 h-7 border-t-2 border-r-2 border-border z-10" />

        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-4xl mx-auto px-6 w-full py-20">
            <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">
              <div className="flex flex-col gap-6 text-center md:text-right">
                <h1
                  className="font-black text-foreground leading-none tracking-tighter"
                  style={{
                    fontFamily: 'Impact, "Arial Black", sans-serif',
                    fontSize: "clamp(5rem, 16vw, 10rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  RISE
                  <br />
                  <span className="text-secondary">&amp;</span>
                  <br />
                  CRUMB
                </h1>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground font-mono">
                  {t("tagline")}
                </p>
                <div className="flex justify-center md:justify-start">
                  <Link
                    href="#recipes"
                    className="group inline-flex items-center gap-3 border-2 border-foreground px-8 py-4 text-sm font-display font-bold uppercase tracking-widest text-foreground relative overflow-hidden hover:text-primary-foreground transition-colors duration-300"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    <span
                      className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                      aria-hidden
                    />
                    <span className="relative z-10">גלה מתכונים</span>
                    <ArrowLeft className="relative z-10 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <BreadCarousel />
              </div>
            </div>
            <div className="flex md:hidden justify-center mt-16 mb-4">
              <BreadCarousel />
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground">
          <span className="text-[9px] uppercase tracking-[0.35em] font-mono">גלול</span>
          <div className="w-px h-8 bg-border relative overflow-hidden">
            <div className="absolute top-0 w-full h-1/2 bg-foreground/50 animate-bounce origin-top" />
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="border-t-2 border-b-2 border-border overflow-hidden py-2.5 bg-primary select-none" dir="ltr">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-xs font-black tracking-widest text-primary-foreground font-mono px-8">
              {item}
              <span className="mx-4 opacity-40">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── RECIPES ─── */}
      <div id="recipes" className="max-w-4xl mx-auto px-6 py-10">
        <Navigation />

        <p className="text-sm text-muted-foreground text-center mt-6 mb-6">
          מתכונים מלאים ללחמי מחמצת, באגטים, פוקצ'ות ועוד - עם מחשבון כמויות בכל מתכון
        </p>

        <main>
          <div className="space-y-3">
            {allEntries.map(([type, config], index) => (
              <AnimatedCard key={type} delay={index * 80}>
                <BreadCard type={type} config={config} index={index} isFeatured={index === 0} />
              </AnimatedCard>
            ))}
          </div>
        </main>

        <div className="mt-12">
          <Newsletter />
        </div>

        <footer className="mt-12 pt-8 border-t-2 border-border">
          <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
            <span>RISE &amp; CRUMB</span>
            <span>{t("footer")}</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
