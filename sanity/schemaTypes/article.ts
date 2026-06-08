import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const article = defineType({
  name: 'article',
  title: 'כתבה',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      description: 'לחץ "Generate" ליצירה אוטומטית מהכותרת',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'תקציר',
      type: 'text',
      rows: 3,
  description: 'תיאור קצר שיופיע בעמוד המגזין',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'תמונת שער',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'תוכן',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'רגיל', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'ציטוט', value: 'blockquote' },
          ],
          lists: [
            { title: 'רשימה עם תבליטים', value: 'bullet' },
            { title: 'רשימה ממוספרת', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'מודגש', value: 'strong' },
              { title: 'נטוי', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'קישור',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'טקסט חלופי',
              description: 'תיאור התמונה לנגישות',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'כיתוב',
            },
          ],
        }),
        defineArrayMember({
          name: 'youtube',
          type: 'object',
          title: 'סרטון YouTube',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'קישור YouTube',
            },
          ],
          preview: {
            select: {
              url: 'url',
            },
            prepare({ url }) {
              return {
                title: 'סרטון YouTube',
                subtitle: url,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'תגיות',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'תאריך פרסום',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'מומלץ',
      type: 'boolean',
      description: 'הצג בראש עמוד הבלוג',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'תאריך פרסום (חדש לישן)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
