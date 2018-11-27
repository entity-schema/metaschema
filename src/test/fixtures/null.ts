import { validNumbers, validNulls } from './util/valid-values'

import {
  SchemaFixtures, getBasePassing, getBaseFailing
} from './util/type-fixtures'

const type = 'null'

export const nullFixtures: SchemaFixtures = {
  pass: [
    ...getBasePassing( type, validNulls, [], 'enum', 'const' )
  ],

  fail: [
    ...getBaseFailing( type, validNulls, validNumbers, 'enum', 'const' ),
    {
      title: 'Has enum',
      type: 'null',
      enum: [ null, null ]
    },
    {
      title: 'Has const',
      type: 'null',
      const: null
    }
  ]
}
