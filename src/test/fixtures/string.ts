import { validStrings, validNumbers } from './util/valid-values'
import { stringKeywords } from './keywords/string-keywords'
import {
  SchemaFixtures, getBasePassing, getBaseFailing
} from './util/type-fixtures'

const type = 'string'

export const stringFixtures: SchemaFixtures = {
  pass: [
    ...getBasePassing( type, validStrings, stringKeywords )
  ],

  fail: [
    ...getBaseFailing( type, validStrings, validNumbers )
  ]
}
