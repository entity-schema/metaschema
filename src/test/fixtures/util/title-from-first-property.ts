import { JSONSchema6 } from '../../../types/json-schema'
import { TitleMetaschema } from '../../../types'

export const titleFromFirstProperty = ( schema: JSONSchema6 ): TitleMetaschema => {
  const keys = Object.keys( schema )

  if ( keys.length < 1 )
    throw Error( 'Expected at least one property on the schema' )

  const title = schema.title || keys[ 0 ]

  return Object.assign( {}, schema, { title } )
}