import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pizzaStyle',
  type: 'document',
  title: 'סגנון פיצה',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'שם הסגנון',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'מזהה URL',
      description: 'לחץ "Generate" ליצירה אוטומטית',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Pizza Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'hydration',
      type: 'number',
      title: 'Hydration %',
      validation: (Rule) => Rule.min(50).max(90).required(),
    }),
    defineField({
      name: 'salt',
      type: 'number',
      title: 'מלח %',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yeast',
      type: 'number',
      title: 'שמרים %',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'oil',
      type: 'number',
      title: 'שמן %',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kneading',
      type: 'object',
      title: 'הוראות לישה',
      fields: [
        { name: 'technique', type: 'string', title: 'טכניקה' },
        { name: 'duration', type: 'string', title: 'משך זמן' },
        { name: 'tips', type: 'array', title: 'טיפים', of: [{type: 'string'}] },
      ],
    }),
    defineField({
      name: 'proofing',
      type: 'object',
      title: 'הוראות תפיחה',
      fields: [
        { name: 'roomTemp', type: 'string', title: 'טמפרטורת חדר' },
        { name: 'coldProof', type: 'string', title: 'תסיסה קרה' },
        { name: 'tips', type: 'array', title: 'טיפים', of: [{type: 'string'}] },
      ],
    }),
    defineField({
      name: 'baking',
      type: 'object',
      title: 'הוראות אפייה',
      fields: [
        { name: 'temperature', type: 'string', title: 'טמפרטורה' },
        { name: 'temperatureCelsius', type: 'number', title: 'טמפרטורה (צלזיוס)' },
        { name: 'ovenType', type: 'string', title: 'סוג תנור' },
        { name: 'bakingTime', type: 'string', title: 'זמן אפייה' },
      ],
    }),
    defineField({
      name: 'youtubeLinks',
      type: 'array',
      title: 'YouTube Tutorials',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Video Title' },
            { name: 'url', type: 'url', title: 'YouTube URL' },
            { name: 'channel', type: 'string', title: 'Channel Name' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO',
      fields: [
        { 
          name: 'metaTitle', 
          type: 'string', 
          title: 'Meta Title',
          description: 'כותרת לקידום אתרים (50-60 תווים)',
          validation: (Rule) => Rule.max(60)
        },
        { 
          name: 'metaDescription', 
          type: 'text', 
          title: 'Meta Description',
          description: 'תיאור לקידום אתרים (150-160 תווים)',
          rows: 3,
          validation: (Rule) => Rule.max(160)
        },
        { 
          name: 'ogImage', 
          type: 'image', 
          title: 'תמונה לשיתוף ברשתות חברתיות',
          description: 'תמונה שתופיע בשיתוף בפייסבוק/טוויטר',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
    },
  },
})
