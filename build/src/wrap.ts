export const wrap = ( str: string, length = 80, prefix = '  ' ) => {
  let result = ''

  const words = str.split( ' ' )

  let currentLine = prefix

  words.forEach( word => {
    if ( currentLine.length + word.length > length ) {
      result += currentLine + '\n'
      currentLine = prefix + word + ' '
    } else {
      currentLine += word + ' '
    }
  } )

  result += currentLine

  return result
}
