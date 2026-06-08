import React from "react"
import type { Metadata } from 'next'
import { Heebo, Assistant, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: '--font-display',
  weight: ['400', '700', '800', '900']
});
const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  variable: '--font-sans',
  weight: ['400', '600', '700']
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Rise & Crumb - מגזין האפייה של ישראל - מתכוני לחם, מחמצת ואפייה',
  description: "מתכונים ללחמי מחמצת, באגטים, פוקצ'ות וחלות. מדריך מחמצת מלא, מחשבון כמויות ומגזין אפייה.",
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="stylesheet" href="/leaflet.css" />
      </head>
      <body className={`${heebo.variable} ${assistant.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}