import { titleFromFirstProperty } from '../util/title-from-first-property'

export const arrayKeywords = ( [
  { items: {} },
  { contains: {} },
  { additionalItems: true, items: [ {} ] },
  { minItems: 1 },
  { maxItems: 2 },
  { uniqueItems: true }
] ).map( titleFromFirstProperty )
