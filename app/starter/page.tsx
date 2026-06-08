"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/bread/navigation"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout, AlertCircle, CheckCircle2, Droplets, Clock, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

const CREATION_DAYS = [
  {
    day: 1,
    title: "יום 1 – ההתחלה",
    action: "50ג קמח מלא + 50ג מים בטמפרטורת חדר (25°C). ערבבו היטב, כסו בצורה רופפת.",
    expect: "לא הרבה. אולי בועה קטנה אחת. זה נורמלי לחלוטין.",
    tip: "השתמשו בצנצנת שקופה כדי לראות את הפעילות",
  },
  {
    day: 2,
    title: "יום 2 – סימני חיים ראשונים",
    action: "זרקו חצי מהתערובת. הוסיפו 50ג קמח + 50ג מים. ערבבו.",
    expect: "בועות קטנות, ריח חמצמץ קל. המחמצת מתחילה לעבוד.",
    tip: "הריח החמצמץ הוא סימן טוב – חיידקים חיים ופעילים",
  },
  {
    day: 3,
    title: "יום 3 – פעילות מוגברת",
    action: "זרקו חצי. הוסיפו 50ג קמח לבן + 50ג מים. ערבבו.",
    expect: "הכפלת נפח תוך 4-8 שעות, בועות נראות, ריח חמצמץ מובהק.",
    tip: "סמנו את גובה המחמצת בטוש כדי לעקוב אחרי העלייה",
  },
  {
    day: 4,
    title: "יום 4 – מחמצת פעילה",
    action: "האכילו פעמיים: בוקר וערב. 1:1:1 (מחמצת:קמח:מים).",
    expect: "עלייה ונפילה מסודרת, שיא בועות, ריח מורכב ונחמד.",
    tip: "אם היא עולה ב-4-6 שעות ויורדת תוך 8-12 – מצוין!",
  },
  {
    day: 5,
    title: "יום 5 – בדיקת float test",
    action: "לפני האכלה: הכניסו כפית מחמצת לכוס מים קרים.",
    expect: "אם היא צפה – המחמצת מוכנה! אם שוקעת – עוד יום אחד.",
    tip: "Float test עובד הכי טוב בשיא הפעילות (4-6 שעות אחרי האכלה)",
  },
  {
    day: 7,
    title: "יום 7 – מוכנה לאפות!",
    action: "האכילו בבוקר, חכו לשיא הפעילות, ואפו את הלחם הראשון שלכם.",
    expect: "מחמצת שמכפילה נפח תוך 4-6 שעות ועוברת float test.",
    tip: "המחמצת הראשונה תהיה עדינה – עם כל אפייה היא מתחזקת",
  },
]

const FEEDING_RATIOS = [
  { ratio: "1:1:1", meaning: "100ג מחמצת + 100ג קמח + 100ג מים", when: "תחזוקה יומית רגילה" },
  { ratio: "1:5:5", meaning: "20ג מחמצת + 100ג קמח + 100ג מים", when: "לפני אפייה (שיא גבוה יותר)" },
  { ratio: "1:10:10", meaning: "10ג מחמצת + 100ג קמח + 100ג מים", when: "אחסון ארוך – פחות תדיר" },
]

const PROBLEMS = [
  {
    problem: "המחמצת לא תופחת",
    icon: ThumbsDown,
    solutions: [
      "וודאו שהטמפרטורה 22-26°C – קר מדי = פעילות איטית",
      "נסו קמח מלא (יש בו יותר שמרי בר)",
      "המתינו עוד יום – מחמצות חדשות לפעמים איטיות",
      "וודאו שהמים לא כלוריניים – השתמשו במסונן או מינרלים",
    ],
  },
  {
    problem: "ריח חזק מדי (גרוע)",
    icon: AlertCircle,
    solutions: [
      "האכילו יותר תדיר – ריח חריף = חומצת חלב בעודף",
      "הגדילו את יחס האכלה ל-1:5:5",
      "שמרו במקרר אם אפייה לא מתוכננת בקרוב",
      "ריח של אצטון/נייל פוליש = זקוקה להאכלה דחופה",
    ],
  },
  {
    problem: "שכבה נוזלית כהה מעל",
    icon: Droplets,
    solutions: [
      "זה 'hooch' – אלכוהול שהמחמצת מייצרת כשהיא רעבה",
      "זכרו: לא מסוכן! פשוט ערבבו פנימה או שפכו",
      "האכילו מיד ושקלו להאכיל יותר תדיר",
      "במקרר: hooch נורמלי אחרי שבוע",
    ],
  },
  {
    problem: "עובש על המחמצת",
    icon: AlertCircle,
    solutions: [
      "עובש = זרקו הכל ותתחילו מחדש. אין פשרות.",
      "ניקו את הצנצנת היטב לפני השימוש",
      "הכסו רופפת אבל לא אטומה",
      "שמרו על מחמצת נקייה – עבדו עם ידיים נקיות",
    ],
  },
]

const STORAGE_KEY = "starter-progress-v1"

export default function StarterGuidePage() {
  const { t } = useLanguage()
  const [checked, setChecked] = useState<boolean[]>(new Array(CREATION_DAYS.length).fill(false))
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setChecked(JSON.parse(stored))
    } catch {}
    setHydrated(true)
  }, [])

  const toggleDay = (index: number) => {
    setChecked(prev => {
      const next = [...prev]
      next[index] = !next[index]
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const resetProgress = () => {
    const fresh = new Array(CREATION_DAYS.length).fill(false)
    setChecked(fresh)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  const completedCount = checked.filter(Boolean).length
  const progressPct = (completedCount / CREATION_DAYS.length) * 100
  const allDone = completedCount === CREATION_DAYS.length

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

        <main className="mt-8 space-y-8">
          {/* Intro */}
          <div className="border-2 border-primary bg-primary/5 p-6">
            <div className="flex items-start gap-4">
              <Sprout className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                <h2
                  className="text-2xl font-black text-primary mb-2"
                  style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                >
                  מה זה מחמצת?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  מחמצת (Sourdough Starter) היא תרבית חיה של שמרי בר וחיידקי חומצת חלב שמתפתחת
                  מקמח ומים בלבד. בניגוד לשמרים מסחריים, המחמצת מייצרת לחם עם טעם מורכב וחמצמץ,
                  קרום מרשים, ופנים אוורירי. ברגע שיש לכם מחמצת פעילה, היא תחיה איתכם לנצח –
                  בתנאי שתאכילו אותה.
                </p>
              </div>
            </div>
          </div>

          {/* ─── 7-Day Progress Tracker ─── */}
          <section>
            <div className="flex items-baseline justify-between mb-2">
              <h2
                className="text-3xl font-black text-foreground uppercase"
                style={{ letterSpacing: "-0.03em" }}
              >
                יצירת מחמצת מאפס – 7 ימים
              </h2>
              {hydrated && completedCount > 0 && (
                <button
                  onClick={resetProgress}
                  className="text-xs text-muted-foreground hover:text-foreground font-mono uppercase tracking-wider transition-colors"
                >
                  אפס התקדמות
                </button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              כל מה שצריך: קמח, מים, צנצנת ו-7 ימים של סבלנות
            </p>

            {/* Progress bar */}
            {hydrated && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    התקדמות
                  </span>
                  <span className={cn(
                    "text-xs font-black font-mono uppercase tracking-wider transition-colors",
                    allDone ? "text-secondary" : "text-foreground"
                  )}>
                    {completedCount}/{CREATION_DAYS.length}
                    {allDone && " · מוכן לאפות! 🎉"}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted overflow-hidden">
                  <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{
                      width: `${progressPct}%`,
                      background: allDone
                        ? "oklch(0.93 0.20 112)"
                        : "oklch(0.44 0.22 265)",
                    }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              {CREATION_DAYS.map((day, i) => {
                const done = hydrated && checked[i]
                return (
                  <div
                    key={i}
                    className={cn(
                      "border-2 overflow-hidden flex transition-all duration-200",
                      done ? "border-primary/40 bg-primary/5" : "border-border hover:border-foreground"
                    )}
                  >
                    {/* Day number + checkbox */}
                    <button
                      onClick={() => toggleDay(i)}
                      className={cn(
                        "w-14 shrink-0 flex flex-col items-center justify-center gap-1 transition-all duration-200",
                        done ? "bg-primary" : "bg-muted hover:bg-muted-foreground/10"
                      )}
                      aria-label={done ? "סמן כלא הושלם" : "סמן כהושלם"}
                    >
                      {done ? (
                        <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <span
                          className="font-black text-sm text-muted-foreground"
                          style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                        >
                          {i + 1}
                        </span>
                      )}
                    </button>

                    <div className={cn(
                      "p-4 flex-1 transition-opacity duration-200",
                      done && "opacity-60"
                    )}>
                      <h3 className={cn(
                        "font-bold text-sm mb-2",
                        done && "line-through text-muted-foreground"
                      )}>
                        {day.title}
                      </h3>
                      <p className="text-sm text-foreground mb-1">
                        <span className="font-semibold">פעולה: </span>
                        {day.action}
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-semibold text-foreground">מה לצפות: </span>
                        {day.expect}
                      </p>
                      <p className="text-xs text-primary font-medium flex items-start gap-1 mt-2">
                        <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                        {day.tip}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Feeding */}
          <section>
            <h2
              className="text-3xl font-black text-foreground mb-4 uppercase"
              style={{ letterSpacing: "-0.03em" }}
            >
              האכלה ותחזוקה
            </h2>

            <div className="grid gap-3 mb-6">
              {FEEDING_RATIOS.map((r, i) => (
                <div key={i} className="border-2 border-border p-4 flex items-center gap-4">
                  <div className="text-2xl font-black text-primary font-mono shrink-0">{r.ratio}</div>
                  <div>
                    <p className="text-sm font-medium">{r.meaning}</p>
                    <p className="text-xs text-muted-foreground">{r.when}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-display font-black" style={{ letterSpacing: "-0.02em" }}>
                  <Clock className="h-4 w-4 text-primary" />
                  מאחסנים במקרר?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {[
                    "האכילו פעם בשבוע כשהמחמצת במקרר",
                    "הוציאו 1-2 שעות לפני האכלה להתחמם",
                    "לפני אפייה: האכילו פעמיים ברצף (בוקר + ערב) כדי לחזק אותה",
                    "מחמצת קרה = פחות פעילה, לא מתה",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Float Test */}
          <section>
            <h2
              className="text-3xl font-black text-foreground mb-4 uppercase"
              style={{ letterSpacing: "-0.03em" }}
            >
              Float Test – האם המחמצת מוכנה?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-green-400 bg-green-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-green-800">צפה = מוכנה לאפות</span>
                </div>
                <p className="text-sm text-green-700">
                  המחמצת מלאה בבועות אוויר שמחזיקות אותה על המים. זה אומר שהיא בשיא הפעילות ומוכנה
                  ללחם.
                </p>
              </div>
              <div className="border-2 border-amber-400 bg-amber-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <span className="font-bold text-amber-800">שוקעת = עוד מעט</span>
                </div>
                <p className="text-sm text-amber-700">
                  לא בשיא הפעילות עדיין. המתינו עוד שעה-שעתיים ובדקו שוב, או האכילו עוד פעם.
                </p>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section>
            <h2
              className="text-3xl font-black text-foreground mb-4 uppercase"
              style={{ letterSpacing: "-0.03em" }}
            >
              פתרון בעיות
            </h2>
            <div className="space-y-4">
              {PROBLEMS.map((p, i) => {
                const Icon = p.icon
                return (
                  <Card key={i} className="border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base font-display font-black" style={{ letterSpacing: "-0.02em" }}>
                        <Icon className="h-4 w-4 text-primary" />
                        {p.problem}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {p.solutions.map((s, j) => (
                          <li key={j} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-1 shrink-0">→</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
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
