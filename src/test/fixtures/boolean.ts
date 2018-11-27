import { validNumbers, validBooleans } from './util/valid-values'

import {
  SchemaFixtures, getBasePassing, getBaseFailing
} from './util/type-fixtures'

const type = 'boolean'

export const booleanFixtures: SchemaFixtures = {
  pass: [
    ...getBasePassing( type, validBooleans, [], 'enum' )
  ],

  fail: [
    ...getBaseFailing( type, validBooleans, validNumbers, 'enum' ),
    {
      title: 'Has enum',
      type: 'boolean',
      enum: [ true, false ]
    }
  ]
}
