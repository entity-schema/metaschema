import { SchemaFixtures } from './util/type-fixtures'

export const allOfFixtures: SchemaFixtures = {
  pass: [
    {
      title: 'Has allOf',
      allOf: [ { type: 'string' } ]
    }
  ],

  fail: [
    {
      title: 'Missing allOf'
    }
  ]
}

export const anyOfFixtures: SchemaFixtures = {
  pass: [
    {
      title: 'Has anyOf',
      anyOf: [ { type: 'string' } ]
    }
  ],

  fail: [
    {
      title: 'Missing anyOf'
    }
  ]
}


export const oneOfFixtures: SchemaFixtures = {
  pass: [
    {
      title: 'Has oneOf',
      oneOf: [ { type: 'string' } ]
    }
  ],

  fail: [
    {
      title: 'Missing oneOf'
    }
  ]
}

export const notFixtures: SchemaFixtures = {
  pass: [
    {
      title: 'Has not',
      not: { type: 'string' }
    }
  ],

  fail: [
    {
      title: 'Missing not'
    }
  ]
}