import * as path from 'path'
import * as fs from 'fs'
import { walkDirectory } from './walk-directory'
import { FileResult } from './generate-schema-exports'
import { JSONSchema6 } from 'json-schema'

export interface PathToSchemaFilesMap {
  [ path: string ]: string[]
}

export interface IdToSchemaMap {
  [ id: string ]: JSONSchema6
}

export const getSchemaFilesMap = ( root: string, relativeTo = 'src' ) => {
  const pathToVarMap: PathToSchemaFilesMap = {}

  walkDirectory( root, parsed => {
    if ( parsed.base.endsWith( '.schema.json' ) ) {
      const relativePath = './' + path.posix.relative( relativeTo, parsed.dir )

      if ( !Array.isArray( pathToVarMap[ relativePath ] ) ) {
        pathToVarMap[ relativePath ] = []
      }

      pathToVarMap[ relativePath ].push( parsed.base )
    }
  } )

  return pathToVarMap
}

export const flattenSchemaFilesMap = ( map: PathToSchemaFilesMap, root = './src' ): string[] => {
  const result: string[] = []

  Object.keys( map ).forEach( pathName => {
    const fileNames = map[ pathName ]

    fileNames.forEach( name => {
      const fullPath = path.join( root, pathName, name )

      result.push( fullPath )
    })
  })

  return result
}

export const mapToFileResults = ( map: PathToSchemaFilesMap, root = './src' ) => {
  const result: FileResult[] = []

  Object.keys( map ).forEach( pathName => {
    const fileNames = map[ pathName ]

    fileNames.forEach( name => {
      const filename = path.join( root, pathName, name )
      const contents = fs.readFileSync( filename, 'utf8' )

      result.push({ filename, contents })
    } )
  } )

  return result
}

export const createIdToSchemaMap = ( map: PathToSchemaFilesMap, root = './src' ) => {
  const result: IdToSchemaMap = {}

  Object.keys( map ).forEach( pathName => {
    const fileNames = map[ pathName ]

    fileNames.forEach( name => {
      const filename = path.join( root, pathName, name )
      const contents = fs.readFileSync( filename, 'utf8' )
      const schema = JSON.parse( contents )

      result[ schema.$id ] = schema
    } )
  } )

  return result
}
