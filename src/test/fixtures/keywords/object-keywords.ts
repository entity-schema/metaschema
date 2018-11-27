import { titleFromFirstProperty } from '../util/title-from-first-property'

export const objectKeywords = ( [
  { properties: {} },
  { additionalProperties: false },
  { required: [ 'name' ] },
  { propertyNames: {} },
  { minProperties: 1 },
  { maxProperties: 2 },
  { dependencies: { 'foo': [ 'bar' ] } },
  { patternProperties: { '$S_': {} } }
] ).map( titleFromFirstProperty )
