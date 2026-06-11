import { client, bakeriesQuery, type SanityBakery } from "@/lib/sanity"
import { BAKERIES, type Bakery } from "@/lib/bakery-data"
import { BakeriesClient } from "@/components/bread/bakeries-client"

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
    if (sanity.length > 0) {
      bakeries = sanity.map(sanityToBakery)
    }
  } catch {
    // Sanity unavailable — fall back to hardcoded data
  }

  return <BakeriesClient bakeries={bakeries} />
}
