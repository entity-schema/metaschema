import * as path from 'path'
import { PathToSchemaFilesMap } from './get-schema-files-map'
import { preamble } from './preamble'
import camelCase = require( 'lodash.camelcase' )
import { wrap } from './wrap'

export interface FileResult {
  filename: string
  contents: string
}

export const fileNameToVarName = ( fileName: string ) => {
  const segs = fileName.split( '.schema.json' )
  const hyphenName = segs[ 0 ]
  const varName = camelCase( hyphenName ) + 'Metaschema'

  return varName
}

export const getSchemaExport = ( map: PathToSchemaFilesMap, pathName: string ) => {
  if( !( pathName in map ) ) throw Error( `${ pathName } does not exist in "map"` )

  const schemaNames = map[ pathName ]

  let contents = preamble
  const varNames: string[] = []

  schemaNames.forEach( fileName => {
    const varName = fileNameToVarName( fileName )

    varNames.push( varName )

    contents += `import * as ${ varName } from './${ fileName }'\n`
  } )

  contents += '\n'

  contents += `export {\n${ wrap( varNames.join( ', ' ) ) }\n}\n`

  const filename = path.join( './src', pathName, 'index.ts' )

  return <FileResult>{ filename, contents }
}

export const getSchemaIndexExport = ( map: PathToSchemaFilesMap, filename: string ) => {
  let contents = preamble

  Object.keys( map ).forEach( directoryPath => {
    const fileNames = map[ directoryPath ]
    const varNames = fileNames.map( fileNameToVarName )

    contents += `export {\n${
      wrap( varNames.join( ', ' ) ) }\n} from '${ directoryPath }'\n\n`
  } )

  return <FileResult>{ filename, contents }
}
