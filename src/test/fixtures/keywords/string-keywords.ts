import { titleFromFirstProperty } from '../util/title-from-first-property'

export const stringKeywords = ([
  { minLength: 0 },
  { maxLength: 1 },
  { pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$' },
  { format: 'uri' }
]).map( titleFromFirstProperty )
