"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { client, articlesQuery } from "@/lib/sanity"
import Image from "next/image"
import { Calendar, Clock, User, Search, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PortableText } from "@portabletext/react"
import urlBuilder from "@sanity/image-url"

// עזר לעיבוד תמונות מסניטי
const builder = urlBuilder(client)
const urlFor = (source: any) => source ? builder.image(source).url() : "/placeholder.svg"

// לזה (הוספת שדה slug):
const blogPosts = [
  {
    id: "local-1",
    slug: { current: "local-flour-guide" },
    title: "בחירת הקמח המתאים ללחם שלכם",
    excerpt: "הבסיס של כל לחם מעולה מתחיל בקמח. הנה כל מה שאתם צריכים לדעת על בחירת הקמח המושלם לסגנון האפייה שלכם.",
    image: "/images/blog/wheat-grain.jpg",
    date: "29 ינואר, 2026",
    readTime: "8 דקות קריאה",
    author: "צוות Rise & Crumb",
    tags: ["קמח", "מרכיבים", "טיפים"],
    content: `
      <p>הסוד לפיצה מצוינת מתחיל הרבה לפני התנור - הכל מתחיל בבחירת הקמח הנכון. בעולם הקמח, לא כל הקמחים נבראו שווים, ובחירת הקמח שלכם תשפיע באופן משמעותי על המרקם, הטעם והמראה של הקרום.</p>

      <h2>מדוע החלבון חשוב</h2>
      <p>תכולת החלבון בקמח היא הגורם המכריע ביותר בקביעת מאפייני הבצק שלכם. כאשר מערבבים קמח עם מים, החלבונים (בעיקר גלוטנין וגליאדין) נקשרים זה לזה ויוצרים את הגלוטן - הרשת האלסטית שנותנת לבצק את המבנה, הגמישות והיכולת להחזיק את בועות האוויר שנוצרות בתהליך התפיחה.</p>
      
      <p>קמח עם תכולת חלבון גבוהה יותר יפתח רשת גלוטן חזקה יותר, מה שמביא לבצק יותר גמיש וקרום עם "לעיסה" (chew). מאידך, קמח עם פחות חלבון יוצר קרום יותר רך ושביר. כל סגנון פיצה דורש איזון שונה של תכונות אלו.</p>
      
      <div class="bg-muted p-6 rounded-lg my-6">
        <h3 class="font-bold text-lg mb-4">מדריך מהיר לבחירת קמח לפי סגנון פיצה:</h3>
        <ul class="list-disc pr-6 space-y-3 text-sm">
          <li><strong>פיצה נפוליטנית / רומית:</strong> 11-12.5% חלבון (קמח Tipo 00) - לקרום רך, אוורירי ועדין</li>
          <li><strong>פיצה ניו יורקית / ניו הייבן:</strong> 12-13% חלבון (קמח לחם או קמח לכל מטרה) - לקרום עם לעיסה מאוזנת</li>
          <li><strong>דיפ-דיש / סיציליאנית:</strong> 13-14% חלבון (קמח לחם גלוטן גבוה) - לבצקים עבים ועמידים</li>
          <li><strong>פוקאצ'ה / פיצה ביאנקה:</strong> 11-12% חלבון - לבצק נפוח ורך במיוחד</li>
        </ul>
      </div>

      <h2>Tipo 00: תקן הזהב האיטלקי</h2>
      <p>קמח Tipo 00 הוא לב ליבה של הפיצה הנפוליטנית האותנטית. השם "00" מתייחס לרמת הטחינה - זהו הקמח הדק ביותר שאפשר למצוא, כמעט כמו אבקת טלק למגע. הטחינה העדינה הזו אינה משפיעה רק על המרקם - היא משנה את אופן ההתנהגות של הבצק.</p>

      <p>החלקיקים העדינים יותר של Tipo 00 יכולים לספוג מים בצורה אחידה ויעילה יותר, מה שמוביל להידרציה טובה יותר ולבצק חלק במיוחד. זה גם מאפשר תפיחה מהירה יותר ויוצר את המבנה האוורירי המיוחד של קרום נפוליטני - פנים רך עם קורניצ'ונה (שוליים) מנופחת ופריכה.</p>

      <img src="/images/blog-pizza-dough.jpg" alt="בצק פיצה טרי" class="my-6" />

      <h3>איך להשתמש ב-Tipo 00</h3>
      <p>בצק עשוי מ-Tipo 00 מתנהג קצת אחרת מקמח לחם רגיל. הוא רך יותר, פחות אלסטי, וקל יותר למתוח. זה אידיאלי לפיצות דקות במיוחד שצריכות להיאפות במהירות בטמפרטורות גבוהות מאוד (400-500°C בתנור עצים). אם אתם אופים בתנור ביתי רגיל, שקלו לערבב Tipo 00 עם קמח לחם לתוצאות טובות יותר.</p>

      <h2>קמח לחם אמריקאי: סוס העבודה</h2>
      <p>קמח לחם (Bread Flour) עם 12-14% חלבון הוא הבחירה המועדפת על אפיות ביתיות רבות בארה"ב ובעולם. זהו קמח רב-תכליתי שעובד מצוין עם מגוון רחב של סגנונות - מניו יורק ועד ניו הייבן.</p>

      <p>תכולת החלבון הגבוהה יותר יוצרת קרום עם "לעיסה" נעימה - לא קשה, אלא גמיש ומתמשך. זה מאפשר לבצק להחזיק טופינגים כבדים יותר מבלי להתמוטט, ויוצר מבנה שמתאים לאפייה בטמפרטורות נמוכות יותר (250-280°C) לזמן ארוך יותר.</p>

      <div class="bg-primary/5 border-r-4 border-primary p-6 my-6">
        <h3 class="font-bold text-lg mb-3">💡 טיפ מקצועי: ערבוב קמחים</h3>
        <p class="mb-3">אחד הסודות הכי שמורים של אפיות פיצה מקצועיות הוא ערבוב קמחים. זה מאפשר לכם לשלוט במדויק על תכונות הבצק ולהתאים אותו בדיוק לטעם האישי שלכם.</p>
        <p class="font-medium">תערובות מומלצות:</p>
        <ul class="list-disc pr-6 mt-2 space-y-2">
          <li><strong>50% Tipo 00 + 50% קמח לחם:</strong> שילוב מושלם של רכות ומבנה - מצוין לתנורים ביתיים</li>
          <li><strong>70% קמח לחם + 30% קמח מלא:</strong> מוסיף טעם עמוק ומורכב</li>
          <li><strong>80% Tipo 00 + 20% סולת דורום:</strong> מוסיף צבע זהוב ומרקם מיוחד</li>
        </ul>
      </div>

      <h2>קמח לכל מטרה: האופציה הזמינה</h2>
      <p>אם אין לכם גישה לקמח לחם או Tipo 00, קמח לכל מטרה (All-Purpose Flour) עם 10-12% חלבון עדיין יכול לתת תוצאות טובות. זה לא יהיה אותו הדבר בדיוק, אבל עם הטכניקות הנכונות - הידרציה גבוהה יותר, זמן תפיחה ארוך יותר, וטיפול עדין בבצק - תוכלו להשיג פיצה ביתית מצוינת.</p>

      <h2>איך לבחור בפועל</h2>
      <p>הנה כמה שאלות שיעזרו לכם לבחור את הקמח הנכון:</p>
      <ul class="list-disc pr-6 space-y-2 my-4">
        <li>באיזה טמפרטורה אתם אופים? תנורים חמים מאוד (מעל 400°C) מתאימים ל-Tipo 00, תנורים ביתיים רגילים - קמח לחם</li>
        <li>כמה עבה הקרום שאתם רוצים? דק ורך - Tipo 00, עבה יותר - קמח לחם</li>
        <li>איזה מרקם אתם מחפשים? פריך וקל - Tipo 00, לעיסתי - קמח לחם</li>
        <li>כמה זמן יש לכם לתפיחה? תפיחה קצרה - קמח עם יותר חלבון עוזר</li>
      </ul>

      <p class="text-lg font-medium mt-8">זכרו: הקמח הוא רק נקודת המוצא. הטכניקה, ההידרציה, זמן התפיחה והטיפול בבצק - כולם חשובים לא פחות. התחילו עם קמח איכותי, אבל אל תפחדו לנסות ולהתנסות עד שתמצאו את השילוב המושלם בשבילכם!</p>
    `
  },
  {
    id: "local-sourdough-science",
    slug: { current: "local-sourdough-science" },
    title: "המדע מאחורי המחמצת: חיידקים, שמרים וטמפרטורה",
    excerpt: "מה בעצם קורה בצנצנת שלכם? מיקרוביולוגיה פשוטה שתסביר למה המחמצת לא עולה, למה הלחם שטוח, ואיך לשלוט בטעם.",
    image: "/images/blog/sour dough starter.jpg",
    date: "3 יוני, 2026",
    readTime: "10 דקות קריאה",
    author: "צוות Rise & Crumb",
    tags: ["מחמצת", "מדע", "תסיסה"],
    content: ``
  },
]

export function Blog() {
  const [searchQuery, setSearchQuery] = useState("")

  const [sanityPosts, setSanityPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch(articlesQuery)
        setSanityPosts(data)
      } catch (error) {
        console.error("Failed to fetch from Sanity:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // 💡 איחוד רשימות: סניטי קודם, אחר כך המקומיות
  const allPosts = [...sanityPosts, ...blogPosts]

  const filteredPosts = allPosts.filter((post) => {
    const query = searchQuery.toLowerCase()
    return (
      post.title?.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query)
    )
  })

  // פונקציית עזר להצגת תמונה (סניטי או מקומי)
  const getImageUrl = (post: any) => {
    if (post.mainImage) return urlFor(post.mainImage) // תמונה מסניטי
    return post.image || "/placeholder.svg" // תמונה מקומית
  }


  return (
    <div className="space-y-8">
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="חיפוש כתבות..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
      </div>

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post._id || post.id} className="border-2 hover:border-primary transition-colors overflow-hidden">
            <CardContent className="p-0 flex flex-col md:flex-row gap-6">
              <Link href={`/blog/${post.slug?.current || post._id || post.id}`} className="relative w-full md:w-64 h-48 block shrink-0">
                <Image src={getImageUrl(post)} alt={post.title} fill className="object-cover" />
              </Link>
              <div className="p-6 flex-1">
                <Link href={`/blog/${post.slug?.current || post._id || post.id}`}>
                  <h2 className="text-2xl font-bold hover:text-primary transition-colors">{post.title}</h2>
                </Link>
                <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug?.current || post._id || post.id}`}
                  className="inline-flex items-center gap-1 mt-4 border-2 border-border px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200"
                >
                  המשך קריאה <ChevronLeft className="h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}