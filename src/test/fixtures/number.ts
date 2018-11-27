import { numberKeywords } from './keywords/number-keywords'
import {
  SchemaFixtures, getBasePassing, getBaseFailing
} from './util/type-fixtures'
import { validNumbers, validStrings } from './util/valid-values'

const type = 'number'

export const numberFixtures: SchemaFixtures = {
  pass: [
    ...getBasePassing( type, validNumbers, numberKeywords )
  ],

  fail: [
    ...getBaseFailing( type, validNumbers, validStrings ),
    {
      title: 'Use either minimum or exlusiveMinimum',
      type,
      minimum: 1,
      exclusiveMinimum: 1
    },
    {
      title: 'Use either maximum or exlusiveMaximum',
      type,
      maximum: 2,
      exclusiveMaximum: 2
    }
  ]
}
