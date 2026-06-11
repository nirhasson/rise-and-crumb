export type Region = "north" | "center" | "south"

export interface Bakery {
  id: string
  name: string
  region: Region
  city: string
  address: string
  lat: number
  lng: number
  description: string
  specialties: string[]
  hours: string
  image: string
  instagram?: string
  website?: string
  mapsUrl?: string
  tags: string[]
}

export const REGION_LABELS: Record<Region, string> = {
  north: "צפון",
  center: "מרכז",
  south: "דרום",
}

// Map view center + zoom for each filter value
export const REGION_VIEW: Record<Region | "all", [number, number, number]> = {
  all: [31.6, 34.95, 8],
  north: [32.82, 35.0, 10],
  center: [32.04, 34.82, 11],
  south: [31.25, 34.79, 10],
}

export const BAKERIES: Bakery[] = [
  {
    id: "wild-bread",
    name: "Wild Bread",
    region: "center",
    city: "כפר דניאל",
    address: "רחוב ז'בוטינסקי 111, ראשון לציון",
    lat: 31.9318675,
    lng: 34.9309399,
    description: "מאפייה ארטיזנלית המתמחה בלחמי מחמצת עם תסיסה ארוכה, באגטים צרפתיים, וקרואסונים חמאתיים. אווירה שקטה ואיכות שמדברת בעד עצמה.",
    specialties: ["לחם מחמצת", "באגט", "קרואסון", "לחם שיפון"],
    hours: "ראשון–שישי 7:00–14:00",
    image: "/images/bakeries/wild bread.jpg",
    mapsUrl: "https://www.google.com/maps/place/Wild+Bread/@31.931872,34.928365,17z/data=!3m1!4b1!4m6!3m5!1s0x151d4b2aa8d38733:0xb80655517f51495!8m2!3d31.9318675!4d34.9309399!16s%2Fg%2F11j6_ykc2y",
    tags: ["מחמצת", "באגט", "קרואסון"],
  },
  {
    id: "hagi-vehalechem",
    name: "חגי והלחם",
    region: "center",
    city: "תל אביב",
    address: "שוק לוינסקי, תל אביב",
    lat: 32.0560,
    lng: 34.7726,
    description: "אחת המאפיות האהובות בדרום תל אביב. לחם אמיתי עם אופי – מחמצת, עשבי תיבול, קמחים מיוחדים. תור בוקר מובטח.",
    specialties: ["לחם מחמצת", "פוקצ'ה", "לחם עשבי תיבול", "רולים"],
    hours: "ראשון–שישי 7:00–13:00 (עד שנגמר)",
    image: "/images/bakeries/hagai bread.jpg",
    mapsUrl: "https://www.google.com/maps/place/%D7%97%D7%92%D7%99+%D7%95%D7%94%D7%9C%D7%97%D7%9D%E2%80%AD/data=!4m2!3m1!1s0x151d375bb8db06cf:0xb2d396d77f4cceb6",
    tags: ["מחמצת", "אורגני", "שוק"],
  },
  {
    id: "lehamim",
    name: "לחמים",
    region: "center",
    city: "תל אביב",
    address: "רחוב הארבעה, תל אביב",
    lat: 32.0666,
    lng: 34.7836,
    description: "מאפיית הדגל של אורי שפט – שף לחם מהמפורסמים בישראל. לחמי מחמצת מרהיבים לצד מאפים מתוקים ומלוחים. עיצוב מינימליסטי, איכות מקסימלית.",
    specialties: ["לחם מחמצת", "חלה", "באבקה", "קרואסון"],
    hours: "ראשון–חמישי 7:00–19:00, שישי 7:00–14:00",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
    instagram: "https://www.instagram.com/lehamim_bakery",
    tags: ["מחמצת", "מאפים", "חלה", "בוטיק"],
  },
  {
    id: "breada-haifa",
    name: "Breada",
    region: "north",
    city: "חיפה",
    address: "חיפה",
    lat: 32.8176167,
    lng: 35.0025826,
    description: "מאפייה ארטיזנלית בחיפה המתמחה בלחמי מחמצת ומאפים עשויים בעבודת יד. לחמים טריים נאפים מדי בוקר.",
    specialties: ["לחם מחמצת", "מאפים טריים", "פרעצל"],
    hours: "ראשון-שישי 7:00–15:00, שבת 8:30–16:00",
    image: "/images/bakeries/breada-haifa.jpg",
    mapsUrl: "https://www.google.com/maps/place/Breada/@32.8176167,35.0025826,17z/data=!3m1!4b1!4m6!3m5!1s0x151dba3651e771cb:0x24c92ca20af3e347!8m2!3d32.8176167!4d35.0025826!16s%2Fg%2F11fxqq30xv",
    tags: ["מחמצת", "חיפה", "ארטיזן"],
  },

  {
    id: "lasha-mitzpe-ramon",
    name: "לשה",
    region: "south",
    city: "מצפה רמון",
    address: "מצפה רמון",
    lat: 30.6197735,
    lng: 34.8006429,
    description: "מאפייה ארטיזנלית מיוחדת בלב מצפה רמון. לחמים טריים שנאפים מדי יום, עם דגש על קמחים איכותיים ותהליך תסיסה אטי.",
    specialties: ["לחם מחמצת", "לחם כוסמין", "מאפים טריים"],
    hours: "בדיקה מומלצת לפני ביקור",
    image: "/images/bakeries/lasha.jpg",
    mapsUrl: "https://www.google.com/maps/place/Lasha+Bakery/@30.6197735,34.798068,16z/data=!3m1!4b1!4m6!3m5!1s0x1501f24b476e5661:0x72816aabb6f6b15e!8m2!3d30.6197735!4d34.8006429!16s%2Fg%2F11b6vjq0cs",
    tags: ["מחמצת", "נגב", "מצפה רמון"],
  },
]
