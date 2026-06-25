import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'המדריך המלא להכנת מחמצת מאפס | Rise & Crumb',
  description: 'מדריך שלב-אחר-שלב להכנת מחמצת בריאה ופעילה מאפס. תהליך של 7 ימים עם הסבר מדעי, טיפים לתחזוקה ופתרון בעיות נפוצות.',
  openGraph: {
    title: 'המדריך המלא להכנת מחמצת מאפס',
    description: 'מדריך שלב-אחר-שלב להכנת מחמצת בריאה ופעילה מאפס. תהליך של 7 ימים עם הסבר מדעי וטיפים מעשיים.',
    url: 'https://www.riseandcrumb.com/starter',
    type: 'article',
    locale: 'he_IL',
    siteName: 'Rise & Crumb',
  },
  alternates: {
    canonical: 'https://www.riseandcrumb.com/starter',
  },
}

export default function StarterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
