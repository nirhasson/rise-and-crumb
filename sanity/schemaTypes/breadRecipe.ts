import { defineType, defineField } from 'sanity'

export const breadRecipe = defineType({
  name: 'breadRecipe',
  title: 'מתכון לחם',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'שם הלחם',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (כתובת URL)',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'תיאור (פסקאות)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'תיאור חופשי של הלחם – כמה משפטים על הטעם, המרקם, הרקע',
    }),
    defineField({
      name: 'mainImage',
      title: 'תמונה ראשית',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'difficulty',
      title: 'רמת קושי',
      type: 'string',
      options: {
        list: [
          { title: 'קל', value: 'קל' },
          { title: 'בינוני', value: 'בינוני' },
          { title: 'מתקדם', value: 'מתקדם' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'totalTime',
      title: 'זמן כולל',
      type: 'string',
      description: 'לדוגמה: 24-36 שעות',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'loafWeight',
      title: 'משקל כיכר ברירת מחדל (גרם)',
      type: 'number',
      validation: (rule) => rule.required().min(200).max(3000),
    }),
    defineField({
      name: 'hydration',
      title: 'הידרציה (%)',
      type: 'number',
      validation: (rule) => rule.required().min(50).max(110),
    }),
    defineField({
      name: 'salt',
      title: 'מלח (%)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(4),
    }),
    defineField({
      name: 'levainType',
      title: 'סוג שמרים',
      type: 'string',
      options: {
        list: [
          { title: 'מחמצת', value: 'sourdough' },
          { title: 'שמרים מסחריים', value: 'yeast' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'starterPercentage',
      title: 'אחוז מחמצת (%)',
      type: 'number',
      description: 'רק למחמצת',
    }),
    defineField({
      name: 'yeastPercentage',
      title: 'אחוז שמרים (%)',
      type: 'number',
      description: 'רק לשמרים מסחריים',
    }),
    defineField({
      name: 'flourMix',
      title: 'תערובת קמחים',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'סוג קמח', type: 'string' }),
            defineField({ name: 'percentage', title: 'אחוז', type: 'number' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'additionals',
      title: 'תוספות (שמן, סוכר, וכו\')',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'שם', type: 'string' }),
            defineField({ name: 'percentage', title: 'אחוז', type: 'number' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'fermentation',
      title: 'תסיסה',
      type: 'object',
      fields: [
        defineField({ name: 'bulk', title: 'תסיסה ראשונה (Bulk)', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'proof', title: 'התפחה סופית', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'tips', title: 'טיפים', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),
    defineField({
      name: 'shaping',
      title: 'עיצוב',
      type: 'object',
      fields: [
        defineField({ name: 'technique', title: 'טכניקה', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'tips', title: 'טיפים', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),
    defineField({
      name: 'baking',
      title: 'אפייה',
      type: 'object',
      fields: [
        defineField({ name: 'temperature', title: 'טמפרטורה', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'bakingTime', title: 'זמן אפייה', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'ovenType', title: 'סוג תנור', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'steam', title: 'נדרשים אדים', type: 'boolean' }),
        defineField({ name: 'steamTip', title: 'הסבר על האדים', type: 'string' }),
      ],
    }),
    defineField({
      name: 'tips',
      title: 'טיפים כלליים',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'youtubeLinks',
      title: 'קישורי YouTube',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'כותרת', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'channel', title: 'ערוץ', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'סדר הצגה',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'difficulty', media: 'mainImage' },
  },
  orderings: [
    { title: 'סדר הצגה', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
