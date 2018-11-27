import { validNumbers, validArrays } from './util/valid-values'
import {
  SchemaFixtures, getBasePassing, getBaseFailing
} from './util/type-fixtures'
import { arrayKeywords } from './keywords/array-keywords';

const type = 'array'

export const arrayFixtures: SchemaFixtures = {
  pass: [
    ...getBasePassing( type, validArrays, arrayKeywords )
  ],

  fail: [
    ...getBaseFailing( type, validArrays, validNumbers )
  ]
}
