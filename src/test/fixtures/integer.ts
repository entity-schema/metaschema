import { numberKeywords } from './keywords/number-keywords'
import {
  SchemaFixtures, getBasePassing, getBaseFailing
} from './util/type-fixtures'
import { validNumbers, validIntegers } from './util/valid-values'

const type = 'integer'

export const integerFixtures: SchemaFixtures = {
  pass: [
    ...getBasePassing( type, validIntegers, numberKeywords )
  ],

  fail: [
    ...getBaseFailing( type, validIntegers, validNumbers ),
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
