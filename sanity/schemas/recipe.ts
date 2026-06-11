import { defineType, defineField } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'recipe',
  title: 'מתכון',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'שם המתכון',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'מזהה URL',
      type: 'slug',
      description: 'לחץ "Generate" ליצירה אוטומטית',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'תיאור',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'תמונה',
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
        layout: 'radio',
      },
      initialValue: 'בינוני',
    }),
    defineField({
      name: 'totalTime',
      title: 'זמן כולל',
      type: 'string',
      description: 'לדוגמה: 24 שעות, 3 שעות',
    }),
    defineField({
      name: 'hydration',
      title: 'הידרציה (%)',
      type: 'number',
      description: 'יחס מים לקמח. לדוגמה: 75 = 75%',
    }),
    defineField({
      name: 'hydrationDisplay',
      title: 'תצוגת הידרציה (אופציונלי)',
      type: 'string',
      description: 'עוקף את האחוז הרגיל. לדוגמה: "80-90%"',
    }),
    defineField({
      name: 'salt',
      title: 'מלח (%)',
      type: 'number',
      description: 'אחוז מלח מהקמח. לדוגמה: 2.2',
    }),
    defineField({
      name: 'levainType',
      title: 'סוג שמרים',
      type: 'string',
      options: {
        list: [
          { title: 'מחמצת', value: 'sourdough' },
          { title: 'שמרים', value: 'yeast' },
        ],
        layout: 'radio',
      },
      initialValue: 'sourdough',
    }),
    defineField({
      name: 'starterPercentage',
      title: 'אחוז מחמצת (%)',
      type: 'number',
      description: 'רלוונטי למחמצת בלבד',
      hidden: ({ document }) => document?.levainType !== 'sourdough',
    }),
    defineField({
      name: 'yeastPercentage',
      title: 'אחוז שמרים (%)',
      type: 'number',
      hidden: ({ document }) => document?.levainType !== 'yeast',
    }),
    defineField({
      name: 'loafWeight',
      title: 'משקל כיכר (גרם)',
      type: 'number',
    }),
    defineField({
      name: 'flourMix',
      title: 'תערובת קמחים',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'סוג קמח', type: 'string' },
            { name: 'percentage', title: 'אחוז', type: 'number' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'percentage' },
            prepare: ({ title, subtitle }) => ({ title, subtitle: `${subtitle}%` }),
          },
        },
      ],
    }),
    defineField({
      name: 'additionals',
      title: 'תוספות (שמן, סוכר וכו׳)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'שם', type: 'string' },
            { name: 'percentage', title: 'אחוז', type: 'number' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'percentage' },
            prepare: ({ title, subtitle }) => ({ title, subtitle: `${subtitle}%` }),
          },
        },
      ],
    }),

    // Fermentation
    defineField({
      name: 'fermentation',
      title: 'תסיסה',
      type: 'object',
      fields: [
        { name: 'bulk', title: 'תסיסה ראשונית (Bulk)', type: 'string' },
        { name: 'proof', title: 'התפחה סופית', type: 'string' },
        {
          name: 'tips',
          title: 'טיפים לתסיסה',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),

    // Shaping
    defineField({
      name: 'shaping',
      title: 'עיצוב',
      type: 'object',
      fields: [
        { name: 'technique', title: 'טכניקת עיצוב', type: 'text', rows: 3 },
        {
          name: 'tips',
          title: 'טיפים לעיצוב',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),

    // Baking
    defineField({
      name: 'baking',
      title: 'אפייה',
      type: 'object',
      fields: [
        { name: 'temperature', title: 'טמפרטורה (טקסט)', type: 'string', description: 'לדוגמה: 250°C' },
        { name: 'temperatureCelsius', title: 'טמפרטורה (מספר °C)', type: 'number' },
        { name: 'ovenType', title: 'סוג תנור', type: 'string', description: 'לדוגמה: תנור ביתי עם אבן' },
        { name: 'bakingTime', title: 'זמן אפייה', type: 'string', description: 'לדוגמה: 20 דק׳ עם קיטור + 20 דק׳ ללא' },
        { name: 'steam', title: 'קיטור?', type: 'boolean', initialValue: false },
        { name: 'steamTip', title: 'טיפ לקיטור', type: 'string' },
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
      title: 'סרטוני יוטיוב',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'כותרת', type: 'string' },
            { name: 'url', title: 'קישור YouTube', type: 'url' },
            { name: 'channel', title: 'ערוץ', type: 'string' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'channel' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'difficulty',
      media: 'image',
    },
  },
})
