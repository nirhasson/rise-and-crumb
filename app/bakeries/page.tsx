import type { Metadata } from 'next'
import { client, bakeriesQuery, type SanityBakery } from "@/lib/sanity"
import { BAKERIES, type Bakery } from "@/lib/bakery-data"
import { BakeriesClient } from "@/components/bread/bakeries-client"

export const metadata: Metadata = {
  title: 'מאפיות ארטיזנליות בישראל | Rise & Crumb',
  description: 'מדריך המאפיות הארטיזנליות של ישראל — לחם מחמצת, באגטים, מאפים. מפה אינטראקטיבית עם פרטים, שעות ותגיות.',
  openGraph: {
    title: 'מאפיות ארטיזנליות בישראל | Rise & Crumb',
    description: 'מדריך המאפיות הארטיזנליות של ישראל — לחם מחמצת, באגטים, מאפים.',
    url: 'https://www.riseandcrumb.com/bakeries',
    type: 'website',
    locale: 'he_IL',
    siteName: 'Rise & Crumb',
  },
}

function sanityToBakery(b: SanityBakery): Bakery {
  return {
    id: b._id,
    name: b.name,
    region: b.region,
    city: b.city,
    address: b.address ?? "",
    lat: b.lat,
    lng: b.lng,
    description: b.description ?? "",
    hours: b.hours ?? "",
    image: b.image ?? "",
    specialties: b.specialties ?? [],
    tags: b.tags ?? [],
    instagram: b.instagram,
    mapsUrl: b.mapsUrl,
  }
}

export default async function BakeriesPage() {
  let bakeries: Bakery[] = BAKERIES

  try {
    const sanity: SanityBakery[] = await client.fetch(
      bakeriesQuery,
      {},
      { next: { revalidate: 60 } }
    )
    // Merge: hardcoded first, then Sanity additions
    bakeries = [...BAKERIES, ...sanity.map(sanityToBakery)]
  } catch {
    // Sanity unavailable — fall back to hardcoded data
  }

  return <BakeriesClient bakeries={bakeries} />
}
