import * as fs from 'fs'
import {
  FileResult, getSchemaExport, getSchemaIndexExport
} from './generate-schema-exports'
import { getSchemaFilesMap } from './get-schema-files-map'

const map = getSchemaFilesMap( './src/meta-schema' )

const files: FileResult[] = []

Object.keys( map ).forEach( pathName => {
  const schemaExport = getSchemaExport( map, pathName )

  files.push( schemaExport )
})

files.push( getSchemaIndexExport( map, './src/metaschema.ts' ) )

files.forEach( f => {
  fs.writeFileSync( f.filename, f.contents, 'utf8' )
})
