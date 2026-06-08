"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { BookOpen, Sprout, Newspaper, MapPin } from "lucide-react"

export function Navigation() {
  const { t } = useLanguage()
  const pathname = usePathname()

  const tabs = [
    {
      value: "recipes" as const,
      label: t("recipes"),
      shortLabel: "מתכונים",
      icon: BookOpen,
      href: "/",
    },
    {
      value: "starter" as const,
      label: t("starter"),
      shortLabel: "מחמצת",
      icon: Sprout,
      href: "/starter",
    },
    {
      value: "blog" as const,
      label: t("blog"),
      shortLabel: "מגזין",
      icon: Newspaper,
      href: "/blog",
    },
    {
      value: "bakeries" as const,
      label: t("bakeries"),
      shortLabel: "מאפיות",
      icon: MapPin,
      href: "/bakeries",
    },
  ]

  const isActive = (href: string) => {
    if (href === "/" && (pathname === "/" || pathname.startsWith("/recipes"))) return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <nav className="flex border-2 border-border overflow-hidden">
      {tabs.map((tab, index) => {
        const Icon = tab.icon
        const active = isActive(tab.href)

        return (
          <Link
            key={tab.value}
            href={tab.href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 md:gap-2",
              "px-1 py-2.5 md:px-4 md:py-4",
              "font-bold uppercase tracking-normal md:tracking-wider transition-all relative",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-muted",
              index > 0 && "border-r-2 border-border"
            )}
          >
            <Icon className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
            {/* Short label on mobile, full label on desktop */}
            <span className="text-[9px] md:hidden leading-none text-center whitespace-nowrap">
              {tab.shortLabel}
            </span>
            <span className="hidden md:block text-xs leading-tight text-center">
              {tab.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
