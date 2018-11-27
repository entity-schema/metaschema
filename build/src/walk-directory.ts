import * as fs from 'fs'
import * as path from 'path'

export const walkDirectory = ( root: string, callback: ( parsed: path.ParsedPath ) => void ) => {
  const files = fs.readdirSync( root )

  files.forEach( name => {
    const fullPath = path.posix.join( root, name )
    const parsed = path.posix.parse( fullPath )

    callback( parsed )

    const stat = fs.statSync( fullPath )

    if( stat.isDirectory() ){
      const directoryPath = './' + path.posix.join( root, name )

      walkDirectory( directoryPath, callback )
    }
  })
}
