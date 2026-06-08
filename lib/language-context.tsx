"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "he" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  he: {
    siteName: "Rise & Crumb",
    tagline: "מגזין האפייה של ישראל",
    footer: "EST. 2026",

    // Navigation
    recipes: "מתכונים",
    starter: "מדריך מחמצת",
    blog: "מגזין",
    bakeries: "מאפיות",

    // Recipe calculator
    backToRecipes: "חזרה למתכונים",
    loafWeight: "משקל כיכר (גרם)",
    numberOfLoaves: "מספר כיכרות",
    grams: "גרם",
    loaves: "כיכרות",
    calculate: "חשב כמויות",
    ingredients: "מרכיבים",
    flour: "קמח",
    water: "מים",
    salt: "מלח",
    starter_ing: "מחמצת",
    yeast: "שמרים",
    oil: "שמן זית",
    sugar: "סוכר",
    fermentation: "תסיסה",
    bulk: "תסיסה ראשונה (Bulk)",
    proof: "התפחה סופית",
    tips: "טיפים",
    shaping: "עיצוב",
    baking: "אפייה",
    temperature: "טמפרטורה",
    ovenType: "סוג תנור",
    bakingTime: "זמן אפייה",
    steam: "אדים",
    videoTutorials: "למד עוד",
    shareRecipe: "שתף מתכון",
    difficulty: "רמת קושי",
    totalTime: "זמן כולל",
    hydration: "הידרציה",
    flourMix: "תערובת קמחים",

    // Newsletter
    newsletter: {
      title: "הירשמו לניוזלטר וקבלו הפתעות ועדכונים מעולם האפייה",
      subtitle: "מתכונים, טיפים, מדריכים וחדשות טעימות ישירות לתיבה שלכם",
      placeholder: "האימייל שלך",
      button: "הרשמה",
      privacy: "ניתן להסרה בכל עת, מבטיחים לא להטריד",
      success: "תודה שנרשמת! תקבל את הניוזלטר הבא שלנו בקרוב.",
      error: "אנא הזן כתובת אימייל תקינה",
    },

    footerTitle: "RISE & CRUMB",
    footerYear: "EST. 2026",
  },
  en: {
    siteName: "Rise & Crumb",
    tagline: "Israel's Baking Magazine",
    footer: "EST. 2026",

    // Navigation
    recipes: "Recipes",
    starter: "Starter Guide",
    blog: "Magazine",
    bakeries: "Bakeries",

    // Recipe calculator
    backToRecipes: "Back to Recipes",
    loafWeight: "Loaf Weight (g)",
    numberOfLoaves: "Number of Loaves",
    grams: "grams",
    loaves: "loaves",
    calculate: "Calculate",
    ingredients: "Ingredients",
    flour: "Flour",
    water: "Water",
    salt: "Salt",
    starter_ing: "Sourdough Starter",
    yeast: "Yeast",
    oil: "Olive Oil",
    sugar: "Sugar",
    fermentation: "Fermentation",
    bulk: "Bulk Fermentation",
    proof: "Final Proof",
    tips: "Tips",
    shaping: "Shaping",
    baking: "Baking",
    temperature: "Temperature",
    ovenType: "Oven Type",
    bakingTime: "Baking Time",
    steam: "Steam",
    videoTutorials: "Learn More",
    shareRecipe: "Share Recipe",
    difficulty: "Difficulty",
    totalTime: "Total Time",
    hydration: "Hydration",
    flourMix: "Flour Mix",

    // Newsletter
    newsletter: {
      title: "Everything you need to bake better bread",
      subtitle: "Recipes, tips and guides straight to your inbox",
      placeholder: "your@email.com",
      button: "Subscribe",
      privacy: "No spam, unsubscribe anytime.",
      success: "Thanks for subscribing! You'll receive our next newsletter soon.",
      error: "Please enter a valid email address",
    },

    footerTitle: "RISE & CRUMB",
    footerYear: "EST. 2026",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("he")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved) setLanguageState(saved)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return the key if not found
      }
    }

    return typeof value === 'string' ? value : key
  }

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === "he" ? "rtl" : "ltr"
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
