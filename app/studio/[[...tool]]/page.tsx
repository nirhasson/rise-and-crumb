'use client'

import { NextStudio } from 'next-sanity/studio'
// @ts-ignore
import config from '../../../sanity.config.ts'

export default function StudioPage() {
  return <NextStudio config={config} />
}
 