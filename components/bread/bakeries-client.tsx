"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/bread/navigation"
import { BakeryMap } from "@/components/bread/bakery-map"
import { REGION_LABELS, type Bakery, type Region } from "@/lib/bakery-data"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"

type FilterValue = "all" | Region

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "הכל" },
  { value: "north", label: REGION_LABELS.north },
  { value: "center", label: REGION_LABELS.center },
  { value: "south", label: REGION_LABELS.south },
]

interface BakeriesClientProps {
  bakeries: Bakery[]
}

export function BakeriesClient({ bakeries }: BakeriesClientProps) {
  const [region, setRegion] = useState<FilterValue>("all")

  const counts = {
    all: bakeries.length,
    north: bakeries.filter(b => b.region === "north").length,
    center: bakeries.filter(b => b.region === "center").length,
    south: bakeries.filter(b => b.region === "south").length,
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ direction: "rtl" }}>

      <header className="max-w-4xl w-full mx-auto px-6 pt-10 pb-4 relative">
        <div className="absolute top-10 right-6 w-8 h-8 border-t-2 border-r-2 border-border" />
        <div className="absolute top-10 left-6 w-8 h-8 border-t-2 border-l-2 border-border" />
        <Link href="/">
          <h1
            className="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-none text-center hover:text-foreground transition-colors duration-200"
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif', letterSpacing: "-0.03em" }}
          >
            Rise &amp; Crumb
          </h1>
        </Link>
      </header>

      <div className="max-w-4xl w-full mx-auto px-6 pb-4">
        <Navigation />
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 pb-4">
        <div className="flex items-end justify-between gap-4 border-b-2 border-border pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground font-mono">
                מדריך מאפיות ארטיזנליות
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black font-display text-foreground leading-none"
              style={{ letterSpacing: "-0.03em" }}
            >
              מאפיות השוות ביקור
            </h2>
          </div>
          <p className="text-xs text-muted-foreground font-mono hidden md:block">
            {counts[region]} מאפיות
          </p>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 pb-3">
        <div className="flex gap-0 border-2 border-border overflow-hidden w-fit">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setRegion(f.value)}
              className={cn(
                "px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-150 relative",
                "border-l-2 border-border first:border-l-0",
                region === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-muted"
              )}
            >
              {f.label}
              <span className={cn(
                "mr-1.5 text-[10px] font-mono",
                region === f.value ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {counts[f.value]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="mx-6 mb-6 max-w-4xl w-full self-center border-2 border-border relative"
        style={{ height: "60vh", minHeight: "520px" }}
      >
        <BakeryMap bakeries={bakeries} regionFilter={region} />
      </div>

      <footer className="max-w-4xl w-full mx-auto px-6 pb-6">
        <div className="flex justify-between items-center text-xs font-mono text-muted-foreground border-t-2 border-border pt-4">
          <span>RISE &amp; CRUMB</span>
          <span>EST. 2026</span>
        </div>
      </footer>

    </div>
  )
}
