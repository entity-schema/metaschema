import * as assert from 'assert'

import { stringKeywords } from './fixtures/keywords/string-keywords'
import { numberKeywords } from './fixtures/keywords/number-keywords'
import { objectKeywords } from './fixtures/keywords/object-keywords'
import { arrayKeywords } from './fixtures/keywords/array-keywords'
import { JSONSchema6 } from '../types/json-schema'
import { TitleMetaschema } from '../types'
import { stringFixtures } from './fixtures/string'
import { numberFixtures } from './fixtures/number'
import { SchemaFixtureMap } from './fixtures/util/type-fixtures'
import { objectFixtures } from './fixtures/object'
import { arrayFixtures } from './fixtures/array'
import { booleanFixtures } from './fixtures/boolean'
import { integerFixtures } from './fixtures/integer'
import { nullFixtures } from './fixtures/null'

import {
  allOfFixtures, anyOfFixtures, oneOfFixtures, notFixtures
} from './fixtures/combining'

import { validator } from '../validator'

describe( 'meta-schema', () => {
  it( 'a schema is a boolean or an object', () => {
    assert( validator.validate( 'coreMetaschema', {} ) )
    assert( validator.validate( 'coreMetaschema', true ) )
    assert( validator.validate( 'coreMetaschema', false ) )
    assert( !validator.validate( 'coreMetaschema', [] ) )
  } )

  it( 'a SchemaObject is an object only', () => {
    assert( validator.validate( 'schemaObjectMetaschema', {} ) )
    assert( !validator.validate( 'schemaObjectMetaschema', true ) )
    assert( !validator.validate( 'schemaObjectMetaschema', false ) )
    assert( !validator.validate( 'schemaObjectMetaschema', [] ) )
  } )

  it( 'if SchemaObject the properties must be correct', () => {
    assert( validator.validate( 'schemaObjectMetaschema', { title: 'hello' } ) )
    assert( !validator.validate( 'schemaObjectMetaschema', { title: 42 } ) )
  } )

  describe( 'should not have keywords', () => {
    const noKeywordsForType = (
      type: string, schemaRef: string,
      valid: JSONSchema6, invalid: TitleMetaschema[]
    ) => {
      describe( `no ${ type } keywords`, () => {
        it( 'valid schema', () => {
          assert( validator.validate( schemaRef, valid ) )
        } )

        invalid.forEach( schema => {
          it( schema.title, () => {
            assert( !validator.validate( schemaRef, schema ) )
            assert( validator.errors )
            assert.strictEqual( validator.errors!.length, 1 )
            assert.strictEqual( validator.errors![ 0 ].keyword, 'false schema' )
          } )
        } )
      } )
    }

    noKeywordsForType(
      'stringMetaschema', 'noStringKeywordsMetaschema',
      { title: 'hello' },
      stringKeywords
    )

    noKeywordsForType(
      'numberMetaschema', 'noNumberKeywordsMetaschema',
      { title: 'hello' },
      numberKeywords
    )

    noKeywordsForType(
      'objectMetaschema', 'noObjectKeywordsMetaschema',
      { title: 'hello' },
      objectKeywords
    )

    noKeywordsForType(
      'arrayMetaschema', 'noArrayKeywordsMetaschema',
      { title: 'hello' },
      arrayKeywords
    )
  } )

  describe( 'typed schemas', () => {
    const nameToFixturesMap: SchemaFixtureMap = {
      stringMetaschema: stringFixtures,
      numberMetaschema: numberFixtures,
      integerMetaschema: integerFixtures,
      objectMetaschema: objectFixtures,
      arrayMetaschema: arrayFixtures,
      booleanMetaschema: booleanFixtures,
      nullMetaschema: nullFixtures
    }

    const testTypedSchema = ( schemaRef: string ) => {
      const fixtures = nameToFixturesMap[ schemaRef ]
      const { pass, fail } = fixtures

      describe( schemaRef, () => {
        describe( 'expect to pass', () => {
          pass.forEach( schema => {
            it( schema.title, () => {
              const passed = validator.validate( schemaRef, schema )
              if ( !passed ) {
                console.log( 'Unexpected fail when should pass' )
                console.log( JSON.stringify( schema, null, 2 ) )
                console.log( validator.errors )
              }

              assert( passed )
            } )
          } )
        } )

        describe( 'expect to fail', () => {
          fail.forEach( schema => {
            it( schema.title, () => {
              assert( !validator.validate( schemaRef, schema ) )
            } )
          } )
        } )
      } )
    }

    testTypedSchema( 'stringMetaschema' )
    testTypedSchema( 'numberMetaschema' )
    testTypedSchema( 'integerMetaschema' )
    testTypedSchema( 'objectMetaschema' )
    testTypedSchema( 'arrayMetaschema' )
    testTypedSchema( 'booleanMetaschema' )
    testTypedSchema( 'nullMetaschema' )

    describe( 'Typed (union schema)', () => {
      const names = Object.keys( nameToFixturesMap )

      names.forEach( name => {
        const fixtures = nameToFixturesMap[ name ]
        const { pass } = fixtures

        it( `${ name } is typed`, () => {
          const schema = pass[ 0 ]
          const passed = validator.validate( 'typedMetaschema', schema )

          if ( !passed ) {
            console.log( 'Unexpected fail when should pass' )
            console.log( JSON.stringify( schema, null, 2 ) )
            console.log( validator.errors )
          }

          assert( passed )
        } )
      } )
    } )

    describe( 'Any', () => {
      const names = Object.keys( nameToFixturesMap )

      it( 'no type is any', () => {
        const passed = validator.validate( 'anyMetaschema', { title: 'Hello' } )

        if ( !passed ) {
          console.log( 'Unexpected fail when should pass' )
          console.log( validator.errors )
        }

        assert( passed )
      } )

      names.forEach( name => {
        const fixtures = nameToFixturesMap[ name ]
        const { pass } = fixtures

        it( `${ name } is not any`, () => {
          const schema = pass[ 0 ]
          const passed = validator.validate( 'anyMetaschema', schema )

          if ( passed ) {
            console.log( 'Unexpected pass when should fail' )
            console.log( JSON.stringify( schema, null, 2 ) )
            console.log( validator.errors )
          }

          assert( !passed )
        } )
      } )
    } )
  } )

  describe( 'combining schema', () => {
    const nameToFixturesMap: SchemaFixtureMap = {
      allOfMetaschema: allOfFixtures,
      anyOfMetaschema: anyOfFixtures,
      oneOfMetaschema: oneOfFixtures,
      notMetaschema: notFixtures
    }

    const names = Object.keys( nameToFixturesMap )

    names.forEach( schemaRef => {
      const { pass, fail } = nameToFixturesMap[ schemaRef ]

      pass.forEach( schema => {
        it( `${ schema.title }`, () => {
          const passed = validator.validate( schemaRef, schema )

          if ( !passed ) {
            console.log( 'Unexpected fail when should pass' )
            console.log( validator.errors )
          }

          assert( passed )
        } )

        it( `${ schema.title } is combining`, () => {
          const passed = validator.validate( 'combiningMetaschema', schema )

          if ( !passed ) {
            console.log( 'Unexpected fail when should pass' )
            console.log( validator.errors )
          }

          assert( passed )
        })
      } )

      fail.forEach( schema => {
        it( `${ schema.title }`, () => {
          const passed = validator.validate( schemaRef, schema )

          if ( passed ) {
            console.log( 'Unexpected pass when should fail' )
            console.log( validator.errors )
          }

          assert( !passed )
        } )

        it( `${ schema.title } is not combining`, () => {
          const passed = validator.validate( 'combiningMetaschema', schema )

          if ( passed ) {
            console.log( 'Unexpected pass when should fail' )
            console.log( validator.errors )
          }

          assert( !passed )
        } )
      } )
    } )
  } )
} )
