import { type SchemaTypeDefinition } from 'sanity'
import { breadRecipe } from './breadRecipe'
import { article } from './article'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [breadRecipe, article],
}
