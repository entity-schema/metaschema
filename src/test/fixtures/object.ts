import { validNumbers, validObjects } from './util/valid-values'
import {
  SchemaFixtures, getBasePassing, getBaseFailing
} from './util/type-fixtures'
import { objectKeywords } from './keywords/object-keywords'

const type = 'object'

export const objectFixtures: SchemaFixtures = {
  pass: [
    ...getBasePassing( type, validObjects, objectKeywords )
  ],

  fail: [
    ...getBaseFailing( type, validObjects, validNumbers ),
    {
      title: "If required, at least one entry",
      required: []
    }
  ]
}
