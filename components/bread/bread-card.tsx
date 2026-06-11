"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, Droplets } from "lucide-react"
import { type BreadRecipeConfig } from "@/lib/bread-types"

interface BreadCardProps {
  type: string
  config: BreadRecipeConfig
  index: number
  isFeatured?: boolean
}

export function BreadCard({ type, config, index, isFeatured }: BreadCardProps) {
  if (isFeatured) {
    return (
      <Link href={`/recipes/${config.slug}`} className="block group mb-3">
        <div className="border-2 border-border hover:border-primary transition-all duration-200 overflow-hidden relative">
          {/* Large image area */}
          <div className="relative w-full overflow-hidden" style={{ height: "320px" }}>
            <Image
              src={config.image || "/placeholder.jpg"}
              alt={config.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="100vw"
              priority
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.75) 100%)" }}
            />

            {/* Featured badge */}
            <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 text-[10px] font-display font-black uppercase tracking-widest">
              מומלץ
            </div>

            {/* Index */}
            <div
              className="absolute top-4 left-5 font-black leading-none"
              style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                fontSize: "clamp(3rem, 6vw, 4rem)",
                color: "rgba(255,255,255,0.15)",
              }}
            >
              01
            </div>

            {/* Title over image */}
            <div className="absolute bottom-4 left-5 right-5">
              <h2
                className="font-display font-black text-white group-hover:text-secondary transition-colors leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {config.name.toUpperCase()}
              </h2>
            </div>
          </div>

          {/* Bottom info bar */}
          <div className="p-4 flex items-center justify-between gap-4 flex-wrap bg-card">
            <p className="text-xs text-muted-foreground flex-1 min-w-[180px] line-clamp-1">
              {config.description.split(".")[0]}.
            </p>
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <span className="text-xs font-bold text-foreground uppercase tracking-wide border border-border px-2 py-0.5">
                {config.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Clock className="h-3 w-3" />
                {config.totalTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Droplets className="h-3 w-3" />
                {config.hydration}%
              </span>
              <span className="text-base text-border group-hover:text-foreground transition-colors">←</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/recipes/${config.slug}`} className="block group">
      <div className="border-2 border-border hover:border-foreground transition-all duration-200 overflow-hidden">
        <div className="flex">
          {/* Image */}
          <div className="relative w-36 h-36 md:w-48 md:h-48 shrink-0 overflow-hidden">
            <Image
              src={config.image || "/placeholder.jpg"}
              alt={config.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
            <div>
              {/* Index + name row */}
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="text-muted-foreground/50 font-black text-2xl leading-none shrink-0"
                  style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2
                  className="font-display font-black text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors leading-none"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {config.name.toUpperCase()}
                </h2>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {config.description.split(".")[0]}.
              </p>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <span className="text-xs font-bold text-foreground uppercase tracking-wide border border-border px-2 py-0.5">
                {config.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Clock className="h-3 w-3" />
                {config.totalTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Droplets className="h-3 w-3" />
                {config.hydration}%
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {config.levainType === "sourdough" ? "מחמצת" : "שמרים"}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div className="w-8 shrink-0 flex items-center justify-center text-border group-hover:text-foreground transition-colors">
            <span className="text-base">←</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
