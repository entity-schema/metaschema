import { TitleMetaschema } from '../../../types'
import { stringKeywords } from '../keywords/string-keywords'
import { numberKeywords } from '../keywords/number-keywords'
import { objectKeywords } from '../keywords/object-keywords'
import { arrayKeywords } from '../keywords/array-keywords'
import { JSONSchema6TypeName } from '../../../types/json-schema';

export interface SchemaFixtures {
  pass: TitleMetaschema[]
  fail: TitleMetaschema[]
}

export const failBecauseHasKeywords = (
  type: string, failType: string, keywordSchemas: TitleMetaschema[]
) => keywordSchemas.map( schema => {
  const title = `Has ${ failType } keyword ${ schema.title }`

  return Object.assign( {}, schema, { title, type } )
} )

export const passWithKeywords = (
  type: string, keywordSchemas: TitleMetaschema[]
) => keywordSchemas.map( schema => {
  const title = `Has ${ type } keyword ${ schema.title }`

  return Object.assign( {}, schema, { title, type } )
} )

export interface TitledSchemaMap {
  [ name: string ]: TitleMetaschema[]
}

export interface SchemaFixtureMap {
  [ name: string ]: SchemaFixtures
}

export const titledSchemaMap: TitledSchemaMap = {
  string: stringKeywords,
  number: numberKeywords,
  integer: numberKeywords,
  object: objectKeywords,
  array: arrayKeywords
}

export const keywordTypes = <JSONSchema6TypeName[]>Object.keys( titledSchemaMap )

export const titledSchemaMapToFailBecause = ( type: JSONSchema6TypeName ) => {
  const result: TitleMetaschema[] = []

  keywordTypes.forEach( name => {
    if( name === type ) return
    if ( type === 'integer' && name === 'number' ) return
    if ( type === 'number' && name === 'integer' ) return

    result.push( ...failBecauseHasKeywords( type, name, titledSchemaMap[ name ] ) )
  } )

  return result
}

export const getBasePassing = (
  type: JSONSchema6TypeName, validValues: any[], keyWords: TitleMetaschema[],
  ...exclude: string[]
) => {
  const schemas: TitleMetaschema[] = [
    {
      title: `Type is "${ type }"`,
      type
    }
  ]

  if( !exclude.includes( 'const' ) ){
    schemas.push( {
      title: `Const is ${ type }`,
      type,
      const: validValues[ 0 ]
    })
  }

  if ( !exclude.includes( 'enum' ) ) {
    schemas.push( {
      title: `Enum is ${ type } array`,
      type,
      enum: validValues
    })
  }

  schemas.push( ...passWithKeywords( type, keyWords ) )

  return schemas
}

export const getBaseFailing = (
  type: JSONSchema6TypeName, validValues: any[], invalidValues: any[],
  ...exclude: string[]
) => {
  const schemas: TitleMetaschema[] = [
    {
      title: 'Missing type'
    },
    {
      title: `Type is not "${ type }"`,
      type: keywordTypes.filter( t => t !== type )[ 0 ]
    }
  ]

  if ( !exclude.includes( 'const' ) ) {
    schemas.push( {
      title: `Const is not ${ type }`,
      type,
      const: invalidValues[ 0 ]
    } )
  }

  if ( !exclude.includes( 'enum' ) ) {
    schemas.push(
      {
        title: `Enum is not ${ type } array`,
        type,
        enum: invalidValues
      },
      {
        title: 'Should have used const instead of enum',
        type,
        enum: [ validValues[ 0 ] ]
      }
    )
  }

  schemas.push( ...titledSchemaMapToFailBecause( type ) )

  return schemas
}
