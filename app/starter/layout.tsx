import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'המדריך המלא להכנת מחמצת מאפס | Rise & Crumb',
}

export default function StarterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
