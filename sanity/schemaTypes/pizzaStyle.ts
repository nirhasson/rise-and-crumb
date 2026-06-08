import { defineType, defineField } from 'sanity'
import { PizzaIcon } from '@sanity/icons'

export const pizzaStyle = defineType({
  name: 'pizzaStyle',
  title: 'סגנון פיצה',
  type: 'document',
  icon: PizzaIcon,
  fields: [
    defineField({
      name: 'styleId',
      title: 'מזהה (אנגלית)',
      type: 'string',
      description: 'מזהה ייחודי באנגלית (neapolitan, newyork, וכו\')',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'שם',
      type: 'string',
      description: 'שם הסגנון בעברית',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'תיאור',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'תמונה',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'hydration',
      title: 'אחוז הידרציה',
      type: 'number',
      description: 'אחוז המים ביחס לקמח (60-80)',
      validation: (rule) => rule.required().min(50).max(100),
    }),
    defineField({
      name: 'saltPercentage',
      title: 'אחוז מלח',
      type: 'number',
      description: 'אחוז המלח ביחס לקמח (בדרך כלל 2-3)',
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'yeastPercentage',
      title: 'אחוז שמרים',
      type: 'number',
      description: 'אחוז השמרים ביחס לקמח',
      validation: (rule) => rule.required().min(0.1).max(5),
    }),
    defineField({
      name: 'oilPercentage',
      title: 'אחוז שמן',
      type: 'number',
      description: 'אחוז השמן ביחס לקמח (0 אם אין)',
      validation: (rule) => rule.required().min(0).max(10),
    }),
    
    // Kneading section
    defineField({
      name: 'kneading',
      title: 'לישה',
      type: 'object',
      fields: [
        defineField({
          name: 'technique',
          title: 'טכניקה',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'duration',
          title: 'משך זמן',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'tips',
          title: 'טיפים',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    
    // Proofing section
    defineField({
      name: 'proofing',
      title: 'תפיחה',
      type: 'object',
      fields: [
        defineField({
          name: 'roomTemp',
          title: 'בטמפרטורת החדר',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'coldProof',
          title: 'תפיחה קרה',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'tips',
          title: 'טיפים',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    
    // Baking section
    defineField({
      name: 'baking',
      title: 'אפייה',
      type: 'object',
      fields: [
        defineField({
          name: 'temperature',
          title: 'טמפרטורה',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'bakingTime',
          title: 'זמן אפייה',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'ovenType',
          title: 'סוג תנור',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    
    defineField({
      name: 'youtubeLinks',
      title: 'קישורי YouTube',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'כותרת',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'כתובת URL',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
    
    defineField({
      name: 'order',
      title: 'סדר הצגה',
      type: 'number',
      description: 'מספר נמוך יוצג קודם',
      validation: (rule) => rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'סדר הצגה',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
