import $RefParser = require( 'json-schema-ref-parser' )
import { IdToSchemaMap } from './get-schema-files-map'

export const createMapResolver = ( map: IdToSchemaMap ) => {
  const mapResolver: $RefParser.ResolverOptions = {
    order: 1,
    canRead: true,
    read: file => {
      const { url } = file
      const id = url + '#'

      if ( !( id in map ) ) throw Error( `${ id } not found in "map"` )

      const resolved = JSON.stringify( map[ id ] )

      return resolved
    }
  }

  return mapResolver
}

export const createMapResolverOptions = ( map: IdToSchemaMap ) => {
  const mapResolver = createMapResolver( map )

  const options: $RefParser.Options = {
    dereference: {
      circular: 'ignore'
    },
    resolve: <any>( { mapResolver } )
  }

  return options
}

export const resolveRefs = ( map: IdToSchemaMap, id: string ) => {
  if( !( id in map ) ) throw Error( `${ id } not found in "map"` )

  const schema = map[ id ]

  const mapResolver: $RefParser.ResolverOptions = {
    order: 1,
    canRead: true,
    read: file => {
      const { url } = file
      const id = url + '#'

      if ( !( id in map ) ) throw Error( `${ id } not found in "map"` )

      const resolved = JSON.stringify( map[ id ] )

      return resolved
    }
  }

  const options: $RefParser.Options = {
    dereference: {
      circular: 'ignore'
    },
    resolve: <any>({ mapResolver })
  }

  return $RefParser.bundle( schema, options )
}
