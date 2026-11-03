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
  alternates: { canonical: 'https://www.riseandcrumb.com/bakeries' },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "מאפיות ארטיזנליות בישראל",
    itemListElement: bakeries.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Bakery",
        name: b.name,
        description: b.description || undefined,
        image: b.image ? (b.image.startsWith("http") ? b.image : `https://www.riseandcrumb.com${b.image}`) : undefined,
        address: {
          "@type": "PostalAddress",
          streetAddress: b.address || undefined,
          addressLocality: b.city,
          addressCountry: "IL",
        },
        geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
        sameAs: [b.instagram, b.website].filter(Boolean),
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BakeriesClient bakeries={bakeries} />
    </>
  )
}
