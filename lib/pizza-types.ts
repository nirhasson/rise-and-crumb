export type PizzaStyle = "neapolitan" | "newyork" | "roman" | "newhaven" | "detroit" | "sicilian"

export interface BakingInfo {
  temperature: string
  temperatureCelsius: number
  ovenType: string
  bakingTime: string
}

export interface KneadingInfo {
  technique: string
  duration: string
  tips: string[]
}

export interface ProofingInfo {
  roomTemp: string
  coldProof: string
  tips: string[]
}

export interface YouTubeLink {
  title: string
  url: string
  channel: string
}

export interface PizzaStyleConfig {
  name: string
  description: string
  hydration: number
  salt: number
  yeast: number
  oil: number
  image: string
  baking: BakingInfo
  kneading: KneadingInfo
  proofing: ProofingInfo
  youtubeLinks: YouTubeLink[]
}

export const PIZZA_STYLES: Record<PizzaStyle, PizzaStyleConfig> = {
  neapolitan: {
    name: "פיצה נפוליטנית",
    description: "בצק רך ואוורירי, שוליים תפוחים, אפייה בטמפרטורה גבוהה",
    hydration: 65,
    salt: 2.8,
    yeast: 0.2,
    oil: 0,
    image: "/images/neapolitan-pizza.jpg",
    baking: {
      temperature: "450-500°C",
      temperatureCelsius: 450,
      ovenType: "תנור עצים או תנור פיצה ביתי (Ooni)",
      bakingTime: "60-90 שניות"
    },
    kneading: {
      technique: "לישה עדינה ידנית, שיטת סטירה וקיפול",
      duration: "10-15 דקות",
      tips: [
        "אל תעבדו יתר על המידה את הבצק",
        "תנו לבצק לנוח 20 דקות אם הוא נעשה אלסטי מדי",
        "שאפו למשטח חלק ומעט דביק"
      ]
    },
    proofing: {
      roomTemp: "8-24 שעות בטמפרטורת חדר",
      coldProof: "24-72 שעות במקרר (מומלץ)",
      tips: [
        "תסיסה קרה ארוכה יותר = יותר טעם",
        "הוציאו לטמפרטורת חדר 2 שעות לפני עיצוב",
        "הבצק אמור להכפיל את עצמו בנפח"
      ]
    },
    youtubeLinks: [
      { title: "בצק פיצה נפוליטנית מושלם", url: "https://www.youtube.com/watch?v=1-SJGQ2HLp8", channel: "Vito Iacopelli" },
      { title: "מאסטרקלאס פיצה נפוליטנית", url: "https://www.youtube.com/watch?v=G-jPoROGHGE", channel: "Italia Squisita" }
    ]
  },
  newyork: {
    name: "פיצה ניו יורקית",
    description: "בצק דק וגמיש, תחתית פריכה, קל לקיפול",
    hydration: 60,
    salt: 2.5,
    yeast: 0.5,
    oil: 2,
    image: "/images/newyork-pizza.jpg",
    baking: {
      temperature: "260-290°C",
      temperatureCelsius: 260,
      ovenType: "תנור ביתי עם אבן פיצה או פלדה",
      bakingTime: "6-8 דקות"
    },
    kneading: {
      technique: "מיקסר עם וו בצק או לישה ידנית",
      duration: "8-10 דקות",
      tips: [
        "לושו עד שהבצק חלק ואלסטי",
        "הבצק צריך לעבור את מבחן החלון",
        "הוסיפו שמן בהדרגה אם עובדים ידנית"
      ]
    },
    proofing: {
      roomTemp: "4-6 שעות בטמפרטורת חדר",
      coldProof: "24-48 שעות במקרר",
      tips: [
        "תסיסה קצרה יותר מנפוליטנית",
        "השמן עוזר לקבל פריכות",
        "אפשר להשתמש באותו יום אם צריך"
      ]
    },
    youtubeLinks: [
      { title: "פיצת ניו יורק בבית", url: "https://www.youtube.com/watch?v=SDpCzJw2xm4", channel: "Kenji Lopez-Alt" },
      { title: "מדריך פיצה בסגנון NYC", url: "https://www.youtube.com/watch?v=whnvQBhXh3A", channel: "Brian Lagerstrom" }
    ]
  },
  roman: {
    name: "פיצה רומית (אל טליו)",
    description: "מלבנית, אווררית ופריכה, נמכרת לפי משקל",
    hydration: 80,
    salt: 2.5,
    yeast: 0.1,
    oil: 3,
    image: "/images/roman-pizza.jpg",
    baking: {
      temperature: "240-260°C",
      temperatureCelsius: 250,
      ovenType: "תנור ביתי עם תבנית",
      bakingTime: "12-15 דקות"
    },
    kneading: {
      technique: "שיטת מתיחה וקיפול, טיפול מינימלי",
      duration: "4-6 סטים של מתיחות וקיפולים על פני 2-3 שעות",
      tips: [
        "הידרציה גבוהה דורשת טיפול עדין",
        "השתמשו בידיים רטובות",
        "אל תנסו ללוש בצורה מסורתית"
      ]
    },
    proofing: {
      roomTemp: "1-2 שעות עם קיפולים",
      coldProof: "48-72 שעות מינימום, עד 5 ימים",
      tips: [
        "סגנון זה דורש תסיסה קרה ארוכה",
        "ההידרציה הגבוהה יוצרת בועות אוויר גדולות",
        "סבלנות היא המפתח"
      ]
    },
    youtubeLinks: [
      { title: "פיצה רומית אל טליו", url: "https://www.youtube.com/watch?v=kwyOBo8NBXI", channel: "Simply Bread Co" },
      { title: "פיצת טליה מושלמת", url: "https://www.youtube.com/watch?v=V-AK53CIc-g", channel: "Gozney" }
    ]
  },
  newhaven: {
    name: "פיצה ניו הייבן (אפיצה)",
    description: "דקה וחרוכה, צורה לא סימטרית, מפורסמת בפיצת צדפות לבנות",
    hydration: 60,
    salt: 2.5,
    yeast: 0.3,
    oil: 1,
    image: "/images/newhaven-pizza.jpg",
    baking: {
      temperature: "340-370°C",
      temperatureCelsius: 345,
      ovenType: "תנור פחמי, תנור ביתי חם מאוד עם פלדה",
      bakingTime: "4-6 דקות"
    },
    kneading: {
      technique: "לישה אינטנסיבית לגלוטן חזק",
      duration: "10-12 דקות במיקסר",
      tips: [
        "הבצק צריך להיות די נוקשה לעומת סגנונות אחרים",
        "ההידרציה הנמוכה יוצרת את החריכה המיוחדת",
        "אל תפחדו ממעט חריכה על השוליים"
      ]
    },
    proofing: {
      roomTemp: "4-6 שעות",
      coldProof: "24-48 שעות",
      tips: [
        "תסיסה קצרה יותר מנפוליטנית",
        "החריכה מגיעה מחום התנור, לא מהתסיסה",
        "הבצק צריך להרגיש יציב ולא רפוי"
      ]
    },
    youtubeLinks: [
      { title: "אפיצה בסגנון ניו הייבן", url: "https://www.youtube.com/watch?v=BERjGpdBe_0", channel: "Vito Iacopelli" },
      { title: "פיצה בסגנון Sally's", url: "https://www.youtube.com/watch?v=169eWnqe1FU", channel: "First We Feast" }
    ]
  },
  detroit: {
    name: "פיצה דטרויט",
    description: "עבה, אווררית, דמוית פוקצ'ה עם קצוות גבינה קרמליים. רוטב מעל",
    hydration: 70,
    salt: 2,
    yeast: 0.7,
    oil: 4,
    image: "/images/detroit-pizza.jpg",
    baking: {
      temperature: "240-260°C",
      temperatureCelsius: 260,
      ovenType: "תנור ביתי עם תבנית דטרויט",
      bakingTime: "12-15 דקות"
    },
    kneading: {
      technique: "מיקסר או מתיחה וקיפול",
      duration: "6-8 דקות במיקסר, אחר כך מתיחה לתבנית",
      tips: [
        "שמנו את התבנית בנדיבות",
        "הבצק צריך למלא את פינות התבנית אחרי התפחה",
        "אל תחששו מכמות השמן"
      ]
    },
    proofing: {
      roomTemp: "2-4 שעות בתבנית",
      coldProof: "24-48 שעות (תפיחה בתבנית או ככדור)",
      tips: [
        "אפשר להתפיח ישירות בתבנית הפלדה הכחולה",
        "דחפו את הבצק לפינות אחרי שהוא נרגע",
        "השמן יוצר את התחתית הפריכה"
      ]
    },
    youtubeLinks: [
      { title: "פיצת דטרויט בבית", url: "https://www.youtube.com/watch?v=R3S_4EdvkQo", channel: "Charlie Anderson" },
      { title: "פיצת דטרויט מושלמת", url: "https://www.youtube.com/watch?v=hFibUq8pq0c", channel: "Patio Pizza" }
    ]
  },
  sicilian: {
    name: "פיצה סיצילאנית",
    description: "עבה, ספוגית ומרובעת. בסיס דמוי פוקצ'ה עם רוטב עגבניות עשיר",
    hydration: 68,
    salt: 2.5,
    yeast: 0.5,
    oil: 5,
    image: "/images/sicilian-pizza.jpg",
    baking: {
      temperature: "220-240°C",
      temperatureCelsius: 230,
      ovenType: "תנור ביתי עם תבנית אפייה",
      bakingTime: "20-25 דקות"
    },
    kneading: {
      technique: "מיקסר עם וו בצק",
      duration: "8-10 דקות עד חלק",
      tips: [
        "שמן נדיב בתבנית יוצר את התחתית הפריכה",
        "אל תקמצנו בשמן זית",
        "טקסטורת ספוג מגיעה מתסיסה ארוכה"
      ]
    },
    proofing: {
      roomTemp: "2-3 שעות בתבנית",
      coldProof: "24-72 שעות לטעם מורכב",
      tips: [
        "ספינצ'ונה מסורתי משתמש בתסיסה ללילה",
        "גמדו את הבצק כמו פוקצ'ה",
        "ההתפחה הארוכה יוצרת את המרקם האווררי"
      ]
    },
    youtubeLinks: [
      { title: "מתכון פיצה סיצילאנית", url: "https://www.youtube.com/watch?v=SXFch6pMdDs", channel: "Alexandra's Kitchen" },
      { title: "ספינצ'ונה אותנטי", url: "https://www.youtube.com/watch?v=gtT34bqAhsw", channel: "Gozney" }
    ]
  }
}

export interface Recipe {
  flour: number
  water: number
  salt: number
  yeast: number
  oil: number
  sugar: number
}

export function calculateRecipe(
  ballWeight: number,
  numberOfBalls: number,
  style: PizzaStyle
): Recipe {
  const config = PIZZA_STYLES[style]
  const totalWeight = ballWeight * numberOfBalls

  const flourWeight = totalWeight / (1 + config.hydration / 100 + config.salt / 100 + config.yeast / 100 + config.oil / 100)
  const waterWeight = flourWeight * (config.hydration / 100)
  const saltWeight = flourWeight * (config.salt / 100)
  const yeastWeight = flourWeight * (config.yeast / 100)
  const oilWeight = flourWeight * (config.oil / 100)

  return {
    flour: Math.round(flourWeight),
    water: Math.round(waterWeight),
    salt: Math.round(saltWeight),
    yeast: Math.round(yeastWeight * 10) / 10,
    oil: Math.round(oilWeight),
    sugar: 0
  }
}

export type DoughProblem = "tooMuchWater" | "tooMuchFlour" | "forgotSalt" | "tooSticky"

export const DOUGH_PROBLEMS = [
  { value: "tooMuchWater", label: "הוספתי יותר מדי מים" },
  { value: "tooMuchFlour", label: "הוספתי יותר מדי קמח" },
  { value: "forgotSalt", label: "שכחתי להוסיף מלח" },
  { value: "tooSticky", label: "הבצק דביק מדי" },
] as const

export function calculateRescue(
  actualFlour: number,
  actualWater: number,
  problem: DoughProblem,
  targetStyle: PizzaStyle
): string[] {
  const config = PIZZA_STYLES[targetStyle]
  const targetHydration = config.hydration / 100
  const currentHydration = (actualWater / actualFlour) * 100

  switch (problem) {
    case "tooMuchWater": {
      const neededFlour = Math.round(actualWater / targetHydration - actualFlour)
      const recommendations = []

      if (neededFlour > 0) {
        recommendations.push(`הוסף ${neededFlour} גרם קמח כדי להגיע להידרציה של ${config.hydration}% עבור ${config.name}`)
        recommendations.push(`ההידרציה הנוכחית היא ${currentHydration.toFixed(1)}%, היעד הוא ${config.hydration}%`)
        recommendations.push("הוסף קמח בהדרגה תוך כדי לישה כדי למנוע תיקון יתר")
        recommendations.push("התאם מלח באופן יחסי: הוסף " + Math.round(neededFlour * (config.salt / 100)) + " גרם מלח")
      } else {
        recommendations.push("יחס ההידרציה שלך למעשה טוב לסגנון זה!")
        recommendations.push(`נוכחי: ${currentHydration.toFixed(1)}%, יעד: ${config.hydration}%`)
        recommendations.push("אם הבצק מרגיש רטוב מדי, נסה להניח אותו למנוחה 30 דקות או השתמש בפחות מים בפעם הבאה")
      }

      return recommendations
    }
    case "tooMuchFlour": {
      const neededWater = Math.round(actualFlour * targetHydration - actualWater)
      const recommendations = []

      if (neededWater > 0) {
        recommendations.push(`הוסף ${neededWater} גרם מים כדי להגיע להידרציה של ${config.hydration}% עבור ${config.name}`)
        recommendations.push(`ההידרציה הנוכחית היא ${currentHydration.toFixed(1)}%, היעד הוא ${config.hydration}%`)
        recommendations.push("הוסף מים בהדרגה, ערבב היטב בין תוספות")
        recommendations.push("בצק בהידרציה נמוכה ירגיש נוקשה - זה נורמלי לפני הוספת המים")
      } else {
        recommendations.push("יחס הקמח למים שלך למעשה נכון!")
        recommendations.push(`נוכחי: ${currentHydration.toFixed(1)}%, יעד: ${config.hydration}%`)
        recommendations.push("אם הבצק מרגיש יבש, וודא שאתה לש מספיק זמן כדי לפתח גלוטן")
      }

      return recommendations
    }
    case "forgotSalt": {
      const neededSalt = Math.round(actualFlour * (config.salt / 100))
      return [
        `הוסף ${neededSalt} גרם מלח (${config.salt}% ממשקל הקמח)`,
        "המס את המלח בכמות קטנה של מים חמימים תחילה",
        "לוש היטב כדי לפזר את המלח באופן אחיד בבצק",
        "תן לבצק לנוח 15 דקות אחרי הוספת המלח כדי לאפשר ספיגה"
      ]
    }
    case "tooSticky": {
      const recommendations = []
      recommendations.push(`הידרציה נוכחית: ${currentHydration.toFixed(1)}% - ${config.name} שואף ל-${config.hydration}%`)

      if (currentHydration > config.hydration + 5) {
        const flourToAdd = Math.round(actualFlour * 0.05)
        recommendations.push(`הבצק בהידרציה יתר. נסה להוסיף ${flourToAdd} גרם קמח (5% מהקמח הנוכחי)`)
      } else {
        recommendations.push("ההידרציה נכונה - דביקות היא נורמלית בשלב זה")
      }

      recommendations.push("שמן את הידיים במקום להוסיף קמח בעת טיפול בבצק")
      recommendations.push("הנח את הבצק במקרר ל-30-60 דקות כדי להקל על העבודה איתו")
      recommendations.push("השתמש בטכניקת מתיחה וקיפול במקום לישה מסורתית")

      return recommendations
    }
    default:
      return ["לא נמצא פתרון"]
  }
}
