import { titleFromFirstProperty } from '../util/title-from-first-property'

export const numberKeywords = ([
  { multipleOf: 2 },
  { minimum: 1 },
  { maximum: 2 },
  { exclusiveMinimum: 1 },
  { exclusiveMaximum: 2 }
]).map( titleFromFirstProperty )
