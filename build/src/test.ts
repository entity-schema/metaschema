import { getSchemaFilesMap, createIdToSchemaMap } from './get-schema-files-map'
import { resolveRefs } from './ref-parser'
import { generateTypeScriptInterface } from './generate-typescript-interface';

const map = getSchemaFilesMap( './src/meta-schema' )

const idToSchemaMap = createIdToSchemaMap( map )

const awaitResolve = async () => {
  const resolved = await resolveRefs( idToSchemaMap, 'http://example.com/schema/schema-object#' )

  console.log( JSON.stringify( resolved, null, 2 ) )
}

awaitResolve()

const ts = generateTypeScriptInterface( idToSchemaMap, 'http://example.com/schema/schema-object#' )

console.log( ts )