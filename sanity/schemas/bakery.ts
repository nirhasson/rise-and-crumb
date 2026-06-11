import { defineType, defineField } from 'sanity'
import { PinIcon } from '@sanity/icons'

export default defineType({
  name: 'bakery',
  title: 'מאפייה',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'שם המאפייה',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'region',
      title: 'אזור',
      type: 'string',
      options: {
        list: [
          { title: 'צפון', value: 'north' },
          { title: 'מרכז', value: 'center' },
          { title: 'דרום', value: 'south' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'city',
      title: 'עיר',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'address',
      title: 'כתובת',
      type: 'string',
    }),
    defineField({
      name: 'lat',
      title: 'קו רוחב (Latitude)',
      description: 'מגוגל מפס — לחץ ימני על המקום ← "העתק קורדינטות" — המספר הראשון',
      type: 'number',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'lng',
      title: 'קו אורך (Longitude)',
      description: 'מגוגל מפס — לחץ ימני על המקום ← "העתק קורדינטות" — המספר השני',
      type: 'number',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'תיאור',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'hours',
      title: 'שעות פתיחה',
      type: 'string',
      description: 'לדוגמה: ראשון–שישי 7:00–14:00',
    }),
    defineField({
      name: 'image',
      title: 'תמונה',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'specialties',
      title: 'התמחויות',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'tags',
      title: 'תגיות',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'instagram',
      title: 'אינסטגרם',
      type: 'url',
    }),
    defineField({
      name: 'mapsUrl',
      title: 'קישור גוגל מפס',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'אזור',
      name: 'regionAsc',
      by: [{ field: 'region', direction: 'asc' }],
    },
  ],
})
