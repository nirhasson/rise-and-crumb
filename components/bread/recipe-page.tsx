"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SanityRecipe } from "@/lib/sanity"
import {
  ArrowRight,
  Wheat,
  Droplets,
  Circle,
  Sprout,
  Clock,
  Flame,
  Timer,
  Hand,
  Youtube,
  Share2,
  ExternalLink,
  Hash,
  Wind,
  Minus,
  Plus,
  Play,
  Square,
  RotateCcw,
} from "lucide-react"
import {
  type BreadType,
  type BreadIngredients,
  BREAD_RECIPES,
  calculateBreadRecipe,
} from "@/lib/bread-types"

interface RecipePageProps {
  slug: string
  initialSanityRecipe?: SanityRecipe | null
}

export function RecipePage({ slug, initialSanityRecipe }: RecipePageProps) {
  const type = (Object.keys(BREAD_RECIPES) as BreadType[]).find(
    (k) => BREAD_RECIPES[k].slug === slug
  )

  if (type) return <RecipeView type={type} />

  if (!initialSanityRecipe) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">מתכון לא נמצא</p>
        <Button asChild className="mt-4">
          <Link href="/">חזרה למתכונים</Link>
        </Button>
      </div>
    )
  }

  return <SanityRecipeView recipe={initialSanityRecipe} />
}

/* ─── Sanity recipe view — matches RecipeView styling exactly ─── */
function SanityRecipeView({ recipe }: { recipe: SanityRecipe }) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative h-72 w-full overflow-hidden border-2 border-border">
        {recipe.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <Button
          variant="ghost"
          size="sm"
          asChild
          className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white border border-white/20"
        >
          <Link href="/">
            <ArrowRight className="h-4 w-4 ml-2" />
            חזרה
          </Link>
        </Button>

        <div className="absolute bottom-0 right-0 left-0 p-6">
          <h1
            className="text-4xl md:text-5xl font-black font-display text-white leading-none mb-2"
            style={{ letterSpacing: "-0.03em" }}
          >
            {recipe.name.toUpperCase()}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            {recipe.difficulty && (
              <span className="text-white/80 text-xs font-bold uppercase border border-white/40 px-2 py-0.5">
                {recipe.difficulty}
              </span>
            )}
            {recipe.totalTime && (
              <span className="text-white/70 text-xs font-mono flex items-center gap-1">
                <Clock className="h-3 w-3" /> {recipe.totalTime}
              </span>
            )}
            {recipe.hydration && (
              <span className="text-white/70 text-xs font-mono flex items-center gap-1">
                <Droplets className="h-3 w-3" /> {recipe.hydrationDisplay ?? `${recipe.hydration}%`} הידרציה
              </span>
            )}
            {recipe.levainType && (
              <span className="text-white/70 text-xs font-mono uppercase">
                {recipe.levainType === "sourdough" ? "מחמצת" : "שמרים"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {recipe.description && (
        <p className="text-sm text-muted-foreground leading-relaxed px-1">{recipe.description}</p>
      )}

      {/* Flour mix + additionals */}
      {((recipe.flourMix && recipe.flourMix.length > 0) || (recipe.additionals && recipe.additionals.length > 0)) && (
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-display font-black" style={{ letterSpacing: "-0.02em" }}>
              <Wheat className="h-4 w-4 text-primary" />
              מרכיבים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Flour mix */}
            {recipe.flourMix && recipe.flourMix.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">קמחים</p>
                <div className="space-y-2">
                  {recipe.flourMix.map((f, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span>{f.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-muted overflow-hidden">
                          <div className="h-full bg-primary transition-all duration-700" style={{ width: `${f.percentage}%` }} />
                        </div>
                        <span className="font-bold font-mono w-10 text-right">{f.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Water, salt, starter/yeast */}
            {(recipe.hydration || recipe.salt || recipe.starterPercentage || recipe.yeastPercentage) && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">פרמטרים</p>
                <div className="space-y-2">
                  {recipe.hydration && (
                    <div className="flex items-center justify-between text-sm">
                      <span>מים</span>
                      <span className="font-bold font-mono">{recipe.hydrationDisplay ?? `${recipe.hydration}%`}</span>
                    </div>
                  )}
                  {recipe.salt && (
                    <div className="flex items-center justify-between text-sm">
                      <span>מלח</span>
                      <span className="font-bold font-mono">{recipe.salt}%</span>
                    </div>
                  )}
                  {recipe.starterPercentage && (
                    <div className="flex items-center justify-between text-sm">
                      <span>מחמצת</span>
                      <span className="font-bold font-mono">{recipe.starterPercentage}%</span>
                    </div>
                  )}
                  {recipe.yeastPercentage && (
                    <div className="flex items-center justify-between text-sm">
                      <span>שמרים</span>
                      <span className="font-bold font-mono">{recipe.yeastPercentage}%</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additionals */}
            {recipe.additionals && recipe.additionals.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">תוספות</p>
                <div className="space-y-2">
                  {recipe.additionals.map((a, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span>{a.name}</span>
                      <span className="font-bold font-mono">{a.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Fermentation */}
      {recipe.fermentation && (
        <div className="border-2 border-border">
          <div className="flex items-center gap-2 p-4 border-b-2 border-border">
            <Timer className="h-4 w-4 text-primary" />
            <span className="text-base font-display font-black" style={{ letterSpacing: "-0.02em" }}>תסיסה</span>
          </div>
          <div className="p-4 space-y-3">
            {recipe.fermentation.bulk && <InfoRow label="תסיסה ראשונה (Bulk)" value={recipe.fermentation.bulk} />}
            {recipe.fermentation.proof && <InfoRow label="התפחה סופית" value={recipe.fermentation.proof} />}
            {recipe.fermentation.tips && recipe.fermentation.tips.length > 0 && (
              <TipsList tips={recipe.fermentation.tips} />
            )}
          </div>
        </div>
      )}

      {/* Shaping */}
      {(recipe.shaping?.technique || (recipe.shaping?.tips && recipe.shaping.tips.length > 0)) && (
        <SectionCard icon={Hand} title="עיצוב">
          {recipe.shaping?.technique && <p className="text-sm">{recipe.shaping.technique}</p>}
          {recipe.shaping?.tips && recipe.shaping.tips.length > 0 && (
            <TipsList tips={recipe.shaping.tips} />
          )}
        </SectionCard>
      )}

      {/* Baking */}
      {recipe.baking && (
        <SectionCard icon={Flame} title="אפייה">
          {(recipe.baking.temperature || recipe.baking.temperatureCelsius) && (
            <InfoRow label="טמפרטורה" value={recipe.baking.temperature ?? `${recipe.baking.temperatureCelsius}°C`} />
          )}
          {recipe.baking.bakingTime && <InfoRow label="זמן אפייה" value={recipe.baking.bakingTime} />}
          {recipe.baking.ovenType && <InfoRow label="סוג תנור" value={recipe.baking.ovenType} />}
          {recipe.baking.steam && (
            <div className="p-3 bg-muted border border-border text-sm flex items-start gap-2 mt-2">
              <Wind className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>{recipe.baking.steamTip || "נדרשים אדים לאפייה נכונה"}</span>
            </div>
          )}
          {recipe.tips && recipe.tips.length > 0 && <TipsList tips={recipe.tips} />}
        </SectionCard>
      )}

      {/* General tips (when no baking section) */}
      {recipe.tips && recipe.tips.length > 0 && !recipe.baking && (
        <SectionCard icon={Hash} title="טיפים">
          <TipsList tips={recipe.tips} />
        </SectionCard>
      )}

      {/* YouTube */}
      {recipe.youtubeLinks && recipe.youtubeLinks.length > 0 && (
        <SectionCard icon={Youtube} title="למד עוד">
          <div className="space-y-2">
            {recipe.youtubeLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">{link.title}</p>
                  <p className="text-xs text-muted-foreground">{link.channel}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  )
}

/* ─── Animated number that counts up when value changes ─── */
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value)
  const prevRef = useRef(value)

  useEffect(() => {
    const from = prevRef.current
    const to = value
    prevRef.current = to
    if (from === to) return

    const steps = 18
    const diff = to - from
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplay(Math.round(from + (diff * i) / steps))
      if (i >= steps) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [value])

  return <>{display}</>
}

/* ─── Fermentation countdown timer ─── */
function FermentationTimer({ label, defaultMinutes }: { label: string; defaultMinutes: number }) {
  const [minutes, setMinutes] = useState(defaultMinutes)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback(() => {
    setRemaining(minutes * 60)
    setRunning(true)
  }, [minutes])

  const stop = useCallback(() => {
    setRunning(false)
    setRemaining(null)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const reset = useCallback(() => {
    setRunning(false)
    setRemaining(null)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (!running || remaining === null) return
    if (remaining <= 0) {
      setRunning(false)
      return
    }
    intervalRef.current = setInterval(() => {
      setRemaining(r => (r !== null && r > 0 ? r - 1 : 0))
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, remaining])

  const displaySecs = remaining !== null ? remaining : minutes * 60
  const h = Math.floor(displaySecs / 3600)
  const m = Math.floor((displaySecs % 3600) / 60)
  const s = displaySecs % 60
  const timeStr = h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`
  const totalSecs = minutes * 60
  const progress = remaining !== null ? (remaining / totalSecs) * 100 : 100
  const done = remaining === 0

  return (
    <div className={`border-2 p-4 transition-colors duration-300 ${done ? "border-secondary bg-secondary/10" : "border-border"}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
        {done && (
          <span className="text-xs font-black text-secondary uppercase tracking-widest animate-pulse">
            מוכן!
          </span>
        )}
      </div>

      {/* Time display */}
      <div
        className="font-mono font-black text-center mb-4 tabular-nums"
        style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", letterSpacing: "-0.04em" }}
      >
        {timeStr}
      </div>

      {/* Progress bar */}
      {remaining !== null && (
        <div className="w-full h-1 bg-muted mb-4 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Set time (only when not running) */}
      {!running && remaining === null && (
        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={() => setMinutes(m => Math.max(5, m - 15))}
            className="w-8 h-8 border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="font-mono font-bold text-lg tabular-nums w-20 text-center">
            {Math.floor(minutes / 60) > 0
              ? `${Math.floor(minutes / 60)}ש ${minutes % 60}ד`
              : `${minutes} דקות`}
          </span>
          <button
            onClick={() => setMinutes(m => Math.min(480, m + 15))}
            className="w-8 h-8 border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="flex gap-2">
        {!running && remaining === null && (
          <button
            onClick={start}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            <Play className="h-3 w-3" />
            התחל טיימר
          </button>
        )}
        {running && (
          <button
            onClick={stop}
            className="flex-1 flex items-center justify-center gap-2 py-2 border-2 border-foreground text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors"
          >
            <Square className="h-3 w-3" />
            עצור
          </button>
        )}
        {!running && remaining !== null && (
          <button
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2 py-2 border-2 border-border text-xs font-bold uppercase tracking-widest hover:border-primary transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            אפס
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── Main recipe view ─── */
function RecipeView({ type }: { type: BreadType }) {
  const config = BREAD_RECIPES[type]
  const [numLoaves, setNumLoaves] = useState(1)
  const [loafWeight, setLoafWeight] = useState(config.loafWeight)
  const [ingredients, setIngredients] = useState<BreadIngredients>(() =>
    calculateBreadRecipe(config.loafWeight, 1, type)
  )
  const [prevIngredients, setPrevIngredients] = useState<BreadIngredients | null>(null)
  const [timerSection, setTimerSection] = useState<"bulk" | "proof" | null>(null)

  // Real-time calculation: updates whenever inputs change
  useEffect(() => {
    setPrevIngredients(ingredients)
    setIngredients(calculateBreadRecipe(loafWeight, numLoaves, type))
  }, [loafWeight, numLoaves, type])

  const handleShare = async () => {
    const text = `${config.name} (${numLoaves} כיכרות, ${loafWeight}ג):
קמח: ${ingredients.flour}ג
מים: ${ingredients.water}ג
מלח: ${ingredients.salt}ג
${ingredients.starter ? `מחמצת: ${ingredients.starter}ג` : ""}
${ingredients.yeast ? `שמרים: ${ingredients.yeast}ג` : ""}
${ingredients.oil ? `שמן זית: ${ingredients.oil}ג` : ""}

Rise & Crumb`

    if (navigator.share) {
      try { await navigator.share({ title: config.name, text }) } catch {}
    } else {
      await navigator.clipboard.writeText(text)
      alert("המתכון הועתק!")
    }
  }

  // Parse fermentation times from strings like "4-6 שעות" → minutes
  const parseMins = (str: string): number => {
    const match = str.match(/(\d+)/)
    if (!match) return 240
    const n = parseInt(match[1])
    if (str.includes("שעה") || str.includes("שעות")) return n * 60
    return n
  }
  const bulkMins = parseMins(config.fermentation.bulk)
  const proofMins = parseMins(config.fermentation.proof)

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative h-72 w-full overflow-hidden border-2 border-border">
        <Image
          src={config.image || "/placeholder.jpg"}
          alt={config.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <Button
          variant="ghost"
          size="sm"
          asChild
          className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white border border-white/20"
        >
          <Link href="/">
            <ArrowRight className="h-4 w-4 ml-2" />
            חזרה
          </Link>
        </Button>

        <div className="absolute bottom-0 right-0 left-0 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1
                className="text-4xl md:text-5xl font-black font-display text-white leading-none mb-2"
                style={{ letterSpacing: "-0.03em" }}
              >
                {config.name.toUpperCase()}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-white/80 text-xs font-bold uppercase border border-white/40 px-2 py-0.5">
                  {config.difficulty}
                </span>
                <span className="text-white/70 text-xs font-mono flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {config.totalTime}
                </span>
                <span className="text-white/70 text-xs font-mono flex items-center gap-1">
                  <Droplets className="h-3 w-3" /> {config.hydrationDisplay ?? `${config.hydration}%`} הידרציה
                </span>
                <span className="text-white/70 text-xs font-mono uppercase">
                  {config.levainType === "sourdough" ? "מחמצת" : "שמרים"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed px-1">{config.description}</p>

      {/* Flour Mix */}
      {config.flourMix.length > 1 && (
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-display font-black" style={{ letterSpacing: "-0.02em" }}>
              <Wheat className="h-4 w-4 text-primary" />
              תערובת קמחים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {config.flourMix.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span>{f.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-700"
                      style={{ width: `${f.percentage}%` }}
                    />
                  </div>
                  <span className="font-bold font-mono w-10 text-right">{f.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ─── Live Calculator ─── */}
      <div className="border-2 border-border">
        <div className="flex items-center gap-2 p-4 border-b-2 border-border">
          <Hash className="h-4 w-4 text-primary" />
          <span className="text-base font-display font-black" style={{ letterSpacing: "-0.02em" }}>
            מחשבון כמויות
          </span>
          <span className="mr-auto text-xs text-muted-foreground font-mono">
            מתעדכן בזמן אמת
          </span>
        </div>

        <div className="p-4 space-y-5">
          {/* Number of loaves – stepper */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">מספר כיכרות</label>
              <span className="font-mono font-black text-lg">{numLoaves}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setNumLoaves(n => Math.max(1, n - 1))}
                disabled={numLoaves <= 1}
                className="w-10 h-10 border-2 border-border flex items-center justify-center hover:border-primary disabled:opacity-30 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex-1 flex gap-1">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <button
                    key={n}
                    onClick={() => setNumLoaves(n)}
                    className={`flex-1 h-10 text-sm font-bold border-2 transition-all duration-150 ${
                      numLoaves === n
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setNumLoaves(n => Math.min(10, n + 1))}
                disabled={numLoaves >= 10}
                className="w-10 h-10 border-2 border-border flex items-center justify-center hover:border-primary disabled:opacity-30 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Loaf weight – slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">משקל כיכר</label>
              <span className="font-mono font-black text-lg">{loafWeight}ג</span>
            </div>
            <input
              type="range"
              min={300}
              max={1500}
              step={50}
              value={loafWeight}
              onChange={e => setLoafWeight(Number(e.target.value))}
              className="w-full h-2 bg-muted appearance-none cursor-pointer"
              style={{
                accentColor: "oklch(0.44 0.22 265)",
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1">
              <span>300ג</span>
              <span>900ג</span>
              <span>1500ג</span>
            </div>
          </div>

          {/* Live results */}
          <div className="border-t-2 border-border pt-4">
            <p className="text-xs text-muted-foreground font-mono mb-3">
              {numLoaves} × {loafWeight}ג = {numLoaves * loafWeight}ג סה"כ
            </p>
            <div className="space-y-0">
              <IngRow icon={Wheat} label="קמח">
                <AnimatedNumber value={ingredients.flour} />ג
              </IngRow>
              <IngRow icon={Droplets} label="מים">
                <AnimatedNumber value={ingredients.water} />ג
              </IngRow>
              <IngRow icon={Circle} label="מלח">
                <AnimatedNumber value={ingredients.salt} />ג
              </IngRow>
              {ingredients.starter && (
                <IngRow icon={Sprout} label="מחמצת">
                  <AnimatedNumber value={ingredients.starter} />ג
                </IngRow>
              )}
              {ingredients.yeast && (
                <IngRow icon={Clock} label="שמרים">
                  <AnimatedNumber value={ingredients.yeast} />ג
                </IngRow>
              )}
              {ingredients.oil && (
                <IngRow icon={Droplets} label="שמן זית">
                  <AnimatedNumber value={ingredients.oil} />ג
                </IngRow>
              )}
              {ingredients.sugar && (
                <IngRow icon={Circle} label="סוכר">
                  <AnimatedNumber value={ingredients.sugar} />ג
                </IngRow>
              )}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-2">
              <p className="text-xs text-muted-foreground font-mono">
                {config.hydrationDisplay ?? `${config.hydration}%`} הידרציה · {config.salt}% מלח
                {config.starterPercentage ? ` · ${config.starterPercentage}% מחמצת` : ""}
              </p>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Share2 className="h-3 w-3" />
                שתף
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Fermentation with timers ─── */}
      <div className="border-2 border-border">
        <div className="flex items-center gap-2 p-4 border-b-2 border-border">
          <Timer className="h-4 w-4 text-primary" />
          <span className="text-base font-display font-black" style={{ letterSpacing: "-0.02em" }}>
            תסיסה
          </span>
        </div>
        <div className="p-4 space-y-4">
          <InfoRow label="תסיסה ראשונה (Bulk)" value={config.fermentation.bulk} />
          <InfoRow label="התפחה סופית" value={config.fermentation.proof} />
          <TipsList tips={config.fermentation.tips} />

          {/* Timers toggle */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setTimerSection(s => s === "bulk" ? null : "bulk")}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all duration-200 ${
                timerSection === "bulk"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              טיימר Bulk
            </button>
            <button
              onClick={() => setTimerSection(s => s === "proof" ? null : "proof")}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all duration-200 ${
                timerSection === "proof"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              טיימר התפחה
            </button>
          </div>

          {timerSection === "bulk" && (
            <FermentationTimer label="תסיסה ראשונה (Bulk)" defaultMinutes={bulkMins} />
          )}
          {timerSection === "proof" && (
            <FermentationTimer label="התפחה סופית" defaultMinutes={proofMins} />
          )}
        </div>
      </div>

      {/* Shaping */}
      <SectionCard icon={Hand} title="עיצוב">
        <p className="text-sm">{config.shaping.technique}</p>
        <TipsList tips={config.shaping.tips} />
      </SectionCard>

      {/* Baking */}
      <SectionCard icon={Flame} title="אפייה">
        <InfoRow label="טמפרטורה" value={config.baking.temperature} />
        <InfoRow label="זמן אפייה" value={config.baking.bakingTime} />
        <InfoRow label="סוג תנור" value={config.baking.ovenType} />
        {config.baking.steam && (
          <div className="p-3 bg-muted border border-border text-sm flex items-start gap-2 mt-2">
            <Wind className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>{config.baking.steamTip || "נדרשים אדים לאפייה נכונה"}</span>
          </div>
        )}
        <TipsList tips={config.tips} />
      </SectionCard>

      {/* YouTube */}
      {config.youtubeLinks.length > 0 && (
        <SectionCard icon={Youtube} title="למד עוד">
          <div className="space-y-2">
            {config.youtubeLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">{link.title}</p>
                  <p className="text-xs text-muted-foreground">{link.channel}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  )
}

function IngRow({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="font-bold font-mono text-foreground tabular-nums">{children}</span>
    </div>
  )
}

function SectionCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-display font-black" style={{ letterSpacing: "-0.02em" }}>
          <Icon className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-right mr-4">{value}</span>
    </div>
  )
}

function TipsList({ tips }: { tips: string[] }) {
  return (
    <div className="pt-2 border-t border-border/50">
      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">טיפים</p>
      <ul className="space-y-1.5">
        {tips.map((tip, i) => (
          <li key={i} className="text-sm flex items-start gap-2">
            <span className="text-primary mt-1 shrink-0 font-bold">-</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}
