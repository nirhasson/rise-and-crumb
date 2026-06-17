import React from "react"
import type { Metadata } from 'next'
import { Heebo, Assistant, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import Script from 'next/script'
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
  metadataBase: new URL('https://www.riseandcrumb.com'),
  verification: {
    google: 'hnm6OnVLzbNEJPn4JBgJAWlTrSlcgRaQzZlmCFEVYoA',
  },
  openGraph: {
    title: 'Rise & Crumb - מגזין האפייה של ישראל',
    description: "מתכונים ללחמי מחמצת, באגטים, פוקצ'ות וחלות. מדריך מחמצת מלא ומגזין אפייה.",
    url: 'https://www.riseandcrumb.com',
    siteName: 'Rise & Crumb',
    locale: 'he_IL',
    type: 'website',
  },
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
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NC3CML9C');`,
          }}
        />
      </head>
      <body className={`${heebo.variable} ${assistant.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NC3CML9C"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}