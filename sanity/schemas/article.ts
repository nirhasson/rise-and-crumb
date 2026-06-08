import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'article',
  type: 'document',
  title: 'כתבה',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'כותרת',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'מזהה URL',
      description: 'לחץ "Generate" ליצירה אוטומטית',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'תקציר',
  description: 'תיאור קצר שיופיע בעמוד המגזין',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'תמונת שער',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'קטגוריה',
      options: {
        list: [
          { title: 'מחמצת', value: 'sourdough' },
          { title: 'קמחים', value: 'flour' },
          { title: 'טכניקות אפייה', value: 'technique' },
          { title: 'מתכונים', value: 'recipe' },
          { title: 'ציוד', value: 'equipment' },
          { title: 'מאפיות', value: 'bakeries' },
          { title: 'מגזין', value: 'magazine' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'readTime',
      type: 'number',
      title: 'זמן קריאה (דקות)',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'תגיות',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'תוכן',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
        // --- הוספת בלוק רווח (Spacer) ---
        {
          type: 'object',
          name: 'spacer',
          title: 'Spacer (רווח)',
          fields: [
            {
              name: 'size',
              title: 'גודל הרווח',
              type: 'string',
              options: {
                list: [
                  { title: 'קטן (Small)', value: 'small' },
                  { title: 'בינוני (Medium)', value: 'medium' },
                  { title: 'גדול (Large)', value: 'large' },
                ],
                layout: 'radio',
              },
              initialValue: 'medium'
            },
          ],
        },
        // --- הוספת בלוק וידאו (YouTube) ---
        {
          type: 'object',
          name: 'youtube',
          title: 'YouTube Embed',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube Video URL',
              description: 'הדבק כאן לינק לסרטון יוטיוב'
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'תאריך פרסום',
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
      title: 'title',
      subtitle: 'excerpt',
      media: 'mainImage',
    },
  },
})