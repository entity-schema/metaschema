import { IdToSchemaMap } from './get-schema-files-map'
import { compile, Options } from 'json-schema-to-typescript'
import { createMapResolverOptions } from './ref-parser';

export const generateTypeScriptInterface = ( map: IdToSchemaMap, id: string ) => {
  if ( !( id in map ) ) throw Error( `${ id } not found in "map"` )

  const schema = map[ id ]
  const options: Partial<Options> = {
    $refOptions: createMapResolverOptions( map )
  }

  const contents = compile( <any>schema, schema.title!, options )

  return contents
}