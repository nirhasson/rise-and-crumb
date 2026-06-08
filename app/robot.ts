import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // דפים שאתה לא רוצה שיסרקו
    },
    sitemap: 'https://www.sliceafterslice.co.il/sitemap.xml',
  }
}