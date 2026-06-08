export type BreadType =
  | "sourdough"
  | "baguette"
  | "focaccia"
  | "ciabatta"
  | "rye"
  | "challah"

export interface FlourComponent {
  name: string
  percentage: number
}

export interface Additional {
  name: string
  percentage: number
}

export interface BakingInfo {
  temperature: string
  temperatureCelsius: number
  ovenType: string
  bakingTime: string
  steam: boolean
  steamTip?: string
}

export interface FermentationInfo {
  bulk: string
  proof: string
  tips: string[]
}

export interface ShapingInfo {
  technique: string
  tips: string[]
}

export interface YouTubeLink {
  title: string
  url: string
  channel: string
}

export interface BreadRecipeConfig {
  name: string
  slug: string
  description: string
  hydration: number
  hydrationDisplay?: string
  salt: number
  levainType: "sourdough" | "yeast"
  starterPercentage?: number
  yeastPercentage?: number
  flourMix: FlourComponent[]
  additionals: Additional[]
  image: string
  difficulty: "קל" | "בינוני" | "מתקדם"
  totalTime: string
  loafWeight: number
  fermentation: FermentationInfo
  shaping: ShapingInfo
  baking: BakingInfo
  tips: string[]
  youtubeLinks: YouTubeLink[]
}

export const BREAD_RECIPES: Record<BreadType, BreadRecipeConfig> = {
  sourdough: {
    name: "לחם כפרי",
    slug: "sourdough",
    description:
      "לחם כפרי מחמצת הוא הלחם שכולם חולמים עליו. קרום זהוב-חום עם חריצים פתוחים, פנים אוורירי ומלא חורים גדולים, וטעם עמוק עם חמיצות עדינה שמגיעה מהמחמצת. הוא דורש סבלנות – תסיסה ארוכה של 12 עד 18 שעות – אבל התוצאה שווה כל דקה. זה הלחם שיגרום לכם להבין למה אפיית לחם היא הרבה יותר מבישול.",
    hydration: 75,
    salt: 2.2,
    levainType: "sourdough",
    starterPercentage: 20,
    flourMix: [
      { name: "קמח לבן חזק (12%+ חלבון)", percentage: 80 },
      { name: "קמח מחיטה מלאה", percentage: 20 },
    ],
    additionals: [],
    image: "https://images.unsplash.com/photo-1753012247961-feb139675068?w=900&q=80",
    difficulty: "בינוני",
    totalTime: "24-36 שעות",
    loafWeight: 900,
    fermentation: {
      bulk: "12-16 שעות בטמפרטורת חדר (22-24°C) עם 4 סטים של מתיחות וקיפולים בשעה הראשונה. בטמפרטורות בארץ שלב זה עשוי לקחת אפילו פחות זמן, יש להסתכל על עלייה של לפחות 70%",
      proof: "1-2 שעות בטמפרטורת חדר, או 8-12 שעות במקרר (retard)",
      tips: [
        "בצק מוכן לעיצוב כאשר הוא גדל ב-50-75% ויש בו בועות",
        "תסיסה קרה לילה שלם מעמיקה טעמים ומקלה על חריצה",
        "טמפרטורה משפיעה מאוד – קר = איטי = יותר טעם",
      ],
    },
    shaping: {
      technique: "עיצוב בצק עגול (boule) או ארוך (bâtard) עם מתיחות ומתח פני השטח",
      tips: [
        "שטחו רטוב, ידיים רטובות – לא קמח",
        "מתחו את הבצק כלפי עצמכם ליצירת מתח",
        "ניתן ורצוי לשים בסלסלת התפחה (banneton) מקומחת היטב – מסייעת בשמירת הצורה",
      ],
    },
    baking: {
      temperature: "250°C → 220°C",
      temperatureCelsius: 250,
      ovenType: "תנור ביתי עם סיר ברזל יצוק (Dutch oven)",
      bakingTime: "25 דקות מכוסה ב-250°C, לאחר מכן 20 דקות פתוח ב-220°C",
      steam: true,
      steamTip: "הסיר הסגור יוצר אוויר לח שמאפשר לקרום להתרחב – חובה",
    },
    tips: [
      "חממו את הסיר בתנור לפחות 45 דקות לפני האפייה",
      "חרצו את הלחם מיד לאחר הוצאה מהמקרר",
      "אם אין סיר, הוסיפו מים חמים לתחתית התנור ב-5 הדקות הראשונות לקבלת אדים",
      "חכו לפחות שעה לפני חיתוך – הלחם ממשיך לאפות מבפנים",
    ],
    youtubeLinks: [
      {
        title: "לחם מחמצת למתחילים",
        url: "https://www.youtube.com/watch?v=vjINRSzTQpQ",
        channel: "Joshua Weissman",
      },
      {
        title: "Open Crumb Sourdough",
        url: "https://www.youtube.com/watch?v=HlJEjW-QSnQ",
        channel: "Proof Bread",
      },
    ],
  },

  baguette: {
    name: "באגט",
    slug: "baguette",
    description:
      "הבאגט הצרפתי הוא אחד הלחמים הקשים ביותר לשכפל בבית – ובה בעת אחד המספקים ביותר. הסוד טמון בטכניקת העיצוב, הניקוד הדיאגונלי האייקוני, ובאדים שיוצרים את הקרום הדק והפריך להפליא. פנים הבאגט הוא לבן ואוורירי עם חורים בינוניים, ובשילוב עם חמאה איכותית – זו שלמות.",
    hydration: 72,
    salt: 2,
    levainType: "yeast",
    yeastPercentage: 0.3,
    flourMix: [{ name: "קמח לבן T65 (או קמח לחם)", percentage: 100 }],
    additionals: [],
    image: "https://images.unsplash.com/photo-1554475659-9fd915c8f156?w=900&q=80",
    difficulty: "מתקדם",
    totalTime: "18-24 שעות",
    loafWeight: 280,
    fermentation: {
      bulk: "1 שעה בטמפרטורת חדר, ואז 12-16 שעות במקרר (retard ארוך = טעם עמוק)",
      proof: "45-75 דקות בטמפרטורת חדר לאחר עיצוב",
      tips: [
        "תסיסה קרה ארוכה היא הסוד לטעם מורכב",
        "הבאגט צריך לצמוח ב-50% ולא יותר לפני האפייה",
        "טמפרטורת הבצק לפני עיצוב: 18-20°C",
      ],
    },
    shaping: {
      technique: "מתיחה עדינה לצורת מלבן, גלגול הדוק מלמעלה למטה, ואז הארכה עם כפות הידיים",
      tips: [
        "אל תלחצו חזק מדי – שמרו על גזים בבצק",
        "תרגלו על בצק פיצה קודם – אותה טכניקת גלגול",
        "הקפידו על עובי אחיד לאורך כל הבאגט",
      ],
    },
    baking: {
      temperature: "260°C",
      temperatureCelsius: 260,
      ovenType: "תנור ביתי עם אבן/פלדת אפייה + אדים",
      bakingTime: "18-22 דקות",
      steam: true,
      steamTip: "הכניסו כוס מים רותחים לתנור בזמן ההכנסה לקבלת קיטור",
    },
    tips: [
      "השתמשו בסכין חריצה בזווית 30 מעלות לניקוד",
      "הניחו על מגבת קמחית (couche) בין הבאגטים לשמור על צורה",
      "בשביל קרום פריך אמיתי – פתחו את התנור ב-3 דקות האחרונות",
    ],
    youtubeLinks: [
      {
        title: "Perfect French Baguette at Home",
        url: "https://www.youtube.com/watch?v=oxHbQjX1Q9I",
        channel: "Brian Lagerstrom",
      },
      {
        title: "Traditional Baguette Recipe",
        url: "https://www.youtube.com/watch?v=nMYKHJRUQ_g",
        channel: "Binging with Babish",
      },
    ],
  },

  focaccia: {
    name: "פוקצ'ה",
    slug: "focaccia",
    description:
      "פוקצ'ה היא הלחם הכי מסלח לשגיאות שיש – וזה הופך אותה למושלמת למתחילים. בצק בהידרציה גבוהה, שמן זית נדיב בתוך ועל הבצק, ותסיסה ארוכה שיוצרת מבנה אוורירי עם בועות גדולות. אפשר להוסיף עליה כל דבר – עגבניות שרי, זיתים, שום, רוזמרין – וכל גרסה תצא נהדרת.",
    hydration: 82,
    salt: 2,
    levainType: "sourdough",
    starterPercentage: 20,
    flourMix: [{ name: "קמח לבן (11-12% חלבון)", percentage: 100 }],
    additionals: [{ name: "שמן זית", percentage: 5 }],
    image: "https://images.unsplash.com/photo-1593629718617-bc1b024cf15a?w=900&q=80",
    difficulty: "קל",
    totalTime: "20-28 שעות",
    loafWeight: 800,
    fermentation: {
      bulk: "3-4 שעות בטמפרטורת חדר עם 4 סטים של מתיחות וקיפולים",
      proof: "12-16 שעות במקרר בתבנית (retard בתבנית)",
      tips: [
        "ההידרציה הגבוהה מרגישה מפחידה – אל תוסיפו קמח",
        "אחרי הוצאה מהמקרר, חכו שעה לפני האפייה",
        "יותר שמן זית = יותר פריכות בתחתית",
      ],
    },
    shaping: {
      technique: "ללא עיצוב אמיתי – יוצקים לתבנית, מפזרים שמן זית בנדיבות ומתחילים ללחוץ עם אצבעות",
      tips: [
        "ידיים רטובות בשמן זית לא בצק",
        "\"דחיפות\" עם האצבעות יוצרות את הבועות האייקוניות",
        "לפני האפייה – שמן זית נוסף על הכל",
      ],
    },
    baking: {
      temperature: "230°C",
      temperatureCelsius: 230,
      ovenType: "תנור ביתי עם תבנית מתכת שמנונית",
      bakingTime: "20-25 דקות עד זהוב-כהה",
      steam: false,
    },
    tips: [
      "חממו את התבנית עם שמן בתנור לפני הוצאת הבצק",
      "תבנית אלומיניום כהה = תחתית יותר פריכה",
      "פוקצ'ה מוכנה כשהיא זהובה מכל הצדדים, כולל התחתית",
    ],
    youtubeLinks: [
      {
        title: "Sourdough Focaccia Recipe",
        url: "https://www.youtube.com/watch?v=fBMvMTpxTAs",
        channel: "Patrick Ryan",
      },
      {
        title: "Perfect Focaccia Every Time",
        url: "https://www.youtube.com/watch?v=yM2gR5pLiAo",
        channel: "Brian Lagerstrom",
      },
    ],
  },

  ciabatta: {
    name: "צ'יאבטה",
    slug: "ciabatta",
    description:
      "צ'יאבטה (\"נעל\" באיטלקית) היא לחם ההידרציה הגבוהה הקלאסי. פנים מלא חורים גדולים ולא אחידים, קרום דק ופריך, ומרקם קל ואוורירי שמושלם לסנדוויצ'ים. הסוד הוא לא לנסות לעבד את הבצק הדביק מאוד – פחות נגיעה = יותר חורים = יותר יפה.",
    hydration: 82,
    salt: 2,
    levainType: "sourdough",
    starterPercentage: 15,
    flourMix: [{ name: "קמח לבן חזק (13% חלבון)", percentage: 100 }],
    additionals: [{ name: "שמן זית", percentage: 2 }],
    image: "https://plus.unsplash.com/premium_photo-1700581634513-5a68e1b976b5?w=900&q=80",
    difficulty: "מתקדם",
    totalTime: "18-24 שעות",
    loafWeight: 400,
    fermentation: {
      bulk: "12-14 שעות במקרר, או 4-5 שעות בטמפרטורת חדר עם מתיחות וקיפולים",
      proof: "45-60 דקות לאחר חיתוך לצורה",
      tips: [
        "הבצק הדביק מאוד הוא נורמלי לחלוטין",
        "השתמשו בקלף (bench scraper) ולא בידיים לעיצוב",
        "פחות נגיעה = שמירת גזים = חורים גדולים",
      ],
    },
    shaping: {
      technique: "חיתוך הבצק לרצועות ויפוך על שטח מקומח – עיצוב מינימלי",
      tips: [
        "קמחו היטב את השטח לפני הנחת הבצק",
        "יפוך הבצק חושף חלק חלק שיעזור לאפייה",
        "עבדו מהר – אל תתנו לבצק להירגע מדי לפני האפייה",
      ],
    },
    baking: {
      temperature: "240°C",
      temperatureCelsius: 240,
      ovenType: "תנור ביתי עם אבן/פלדת אפייה + אדים",
      bakingTime: "22-25 דקות",
      steam: true,
      steamTip: "אדים ב-10 הדקות הראשונות חיוניים לפתיחת הקרום",
    },
    tips: [
      "הכניסו לתנור ישירות מהמקרר – הבצק קר מחזיק צורה טוב יותר",
      "אל תפתחו את התנור בדקות הראשונות",
      "הקרום הסופי צריך להיות קרמלי-כהה, לא בהיר",
    ],
    youtubeLinks: [
      {
        title: "How to make Ciabatta at Home",
        url: "https://www.youtube.com/watch?v=oFgCnFOMOfE",
        channel: "Ethan Chlebowski",
      },
      {
        title: "Sourdough Ciabatta",
        url: "https://www.youtube.com/watch?v=gIQJoNpGjDs",
        channel: "Foodgeek",
      },
    ],
  },

  rye: {
    name: "לחם שיפון",
    slug: "rye",
    description:
      "לחם שיפון הוא אחד הלחמים העתיקים בעולם – כהה, סמיך, עשיר בטעם עם חמיצות מובהקת. קמח השיפון אינו יוצר גלוטן כמו חיטה, לכן המרקם שונה לחלוטין – יותר רטוב ודחוס, פחות אוורירי. אבל הטעם? עמוק, אדמתי, ועם קרום כהה ופריך. מושלם עם גבינה, אבוקדו, או סתם חמאה טובה.",
    hydration: 80,
    hydrationDisplay: "80-90%",
    salt: 2,
    levainType: "sourdough",
    starterPercentage: 25,
    flourMix: [
      { name: "קמח שיפון כהה", percentage: 40 },
      { name: "קמח חיטה מלאה", percentage: 30 },
      { name: "קמח לבן", percentage: 30 },
    ],
    additionals: [],
    image: "https://images.unsplash.com/photo-1744217256006-6fbf3195adc6?w=900&q=80",
    difficulty: "בינוני",
    totalTime: "20-28 שעות",
    loafWeight: 800,
    fermentation: {
      bulk: "4-6 שעות בטמפרטורת חדר – בצק שיפון תוסס מהר יותר",
      proof: "1-2 שעות בטמפרטורת חדר, או 8-12 שעות במקרר",
      tips: [
        "בצק שיפון תוסס מהיר יותר – שימו לב שלא יתסוס יתר",
        "אין windowpane test בבצק שיפון – פשוט עבדו לפי הזמן",
        "מחמצת חזקה ופעילה חיונית במיוחד כאן",
      ],
    },
    shaping: {
      technique: "עיצוב לתבנית קסטן (תבנית אפייה) – הכי קל לשיפון – או boule בסל",
      tips: [
        "ידיים רטובות, לא קמח – קמח שיפון דביק מאוד",
        "בתבנית: הבצק ימלא את הפינות בתפיחה",
        "השטח צריך להיות חלק ומתוח",
      ],
    },
    baking: {
      temperature: "240°C → 200°C",
      temperatureCelsius: 240,
      ovenType: "תנור ביתי עם/בלי סיר ברזל יצוק",
      bakingTime: "15 דקות ב-240°C, ואז 40-45 דקות ב-200°C",
      steam: true,
      steamTip: "אדים ב-15 הדקות הראשונות חשובים לקרום יפה",
    },
    tips: [
      "חכו 24 שעות לפחות לפני חיתוך – פנים לחם השיפון מתייצב בזמן",
      "פרוסות דקות יותר – לחם שיפון עשיר ומשביע",
      "מתחזק ביום השני והשלישי",
    ],
    youtubeLinks: [
      {
        title: "Dark Rye Sourdough",
        url: "https://www.youtube.com/watch?v=V2B_ghzQ8AQ",
        channel: "Foodgeek",
      },
      {
        title: "Beginner Rye Bread",
        url: "https://www.youtube.com/watch?v=7_3gSHJBtQk",
        channel: "The Bread Code",
      },
    ],
  },

  challah: {
    name: "חלה",
    slug: "challah",
    description:
      "חלה שבת היא לחם הכי ישראלי שיש. קלועה, רכה להפליא, עם קרום מבריק ממריחת ביצה ופנים ספוגי ועשיר. בניגוד ללחמים האחרים כאן, החלה היא לחם עם שמרים מסחריים ובצק מתוק-עשיר (enriched dough), מה שאומר שהתהליך קצר יותר ותצליח בה כמעט בוודאות. הקליעה היא מיומנות שמשתפרת בכל אפייה.",
    hydration: 60,
    salt: 1.8,
    levainType: "yeast",
    yeastPercentage: 1.5,
    flourMix: [{ name: "קמח לבן רב-תכליתי", percentage: 100 }],
    additionals: [
      { name: "שמן קנולה / שמן זית", percentage: 8 },
      { name: "סוכר", percentage: 5 },
      { name: "ביצים (2 ל-500 גרם קמח)", percentage: 0 },
    ],
    image: "https://images.unsplash.com/photo-1552302094-91d111d7aad0?w=900&q=80",
    difficulty: "קל",
    totalTime: "4-5 שעות",
    loafWeight: 700,
    fermentation: {
      bulk: "1.5-2 שעות בטמפרטורת חדר עד הכפלת נפח",
      proof: "45-60 דקות לאחר קליעה",
      tips: [
        "הכפלת נפח מלאה חיונית לחלה רכה",
        "אל תתסיסו יותר מדי – חלה מתפיחה יתר תצא שטוחה",
        "בחורף – השתמשו בתנור עם אור פנימי כתא תסיסה חמים",
      ],
    },
    shaping: {
      technique: "קליעה ב-3, 4, 5 או 6 צמות – לפי בחירה",
      tips: [
        "תחלקו את הבצק לחתיכות שוות לפי המשקל",
        "גלגלו כל חתיכה לחבל אחיד",
        "אחרי קליעה – הדקו את הקצוות היטב מתחת",
      ],
    },
    baking: {
      temperature: "180°C",
      temperatureCelsius: 180,
      ovenType: "תנור ביתי רגיל",
      bakingTime: "30-35 דקות עד זהוב עמוק",
      steam: false,
    },
    tips: [
      "שתי מריחות ביצה: לפני ואחרי ההתפחה",
      "שומשום או ניצני פרג לקישוט – אחרי המריחה השנייה",
      "חלה מוכנה כשהתחתית נשמעת חלולה בנקישה",
    ],
    youtubeLinks: [
      {
        title: "Perfect Challah Recipe",
        url: "https://www.youtube.com/watch?v=dU7h2GpSgaQ",
        channel: "Ethan Chlebowski",
      },
      {
        title: "6-Strand Challah Braid",
        url: "https://www.youtube.com/watch?v=X0LxNX5jDn8",
        channel: "Joshua Weissman",
      },
    ],
  },
}

export interface BreadIngredients {
  flour: number
  water: number
  salt: number
  starter?: number
  yeast?: number
  oil?: number
  sugar?: number
}

export function calculateBreadRecipe(
  loafWeight: number,
  numberOfLoaves: number,
  type: BreadType
): BreadIngredients {
  const config = BREAD_RECIPES[type]
  const totalWeight = loafWeight * numberOfLoaves

  const divisor =
    1 +
    config.hydration / 100 +
    config.salt / 100 +
    (config.starterPercentage ? config.starterPercentage / 100 : 0) +
    (config.yeastPercentage ? config.yeastPercentage / 100 : 0) +
    config.additionals.reduce((sum, a) => sum + a.percentage / 100, 0)

  const flour = Math.round(totalWeight / divisor)
  const water = Math.round(flour * (config.hydration / 100))
  const salt = Math.round(flour * (config.salt / 100))
  const starter = config.starterPercentage
    ? Math.round(flour * (config.starterPercentage / 100))
    : undefined
  const yeast = config.yeastPercentage
    ? Math.round((flour * (config.yeastPercentage / 100)) * 10) / 10
    : undefined
  const oilAdditional = config.additionals.find((a) => a.name.includes("שמן"))
  const sugarAdditional = config.additionals.find((a) => a.name.includes("סוכר"))

  return {
    flour,
    water,
    salt,
    starter,
    yeast,
    oil: oilAdditional ? Math.round(flour * (oilAdditional.percentage / 100)) : undefined,
    sugar: sugarAdditional ? Math.round(flour * (sugarAdditional.percentage / 100)) : undefined,
  }
}

export const DIFFICULTY_COLOR: Record<BreadRecipeConfig["difficulty"], string> = {
  קל: "text-green-700 bg-green-100",
  בינוני: "text-amber-700 bg-amber-100",
  מתקדם: "text-red-700 bg-red-100",
}
