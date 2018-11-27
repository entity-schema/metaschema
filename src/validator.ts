import * as Ajv from 'ajv'
import * as metaschema from './metaschema'

export const validator = new Ajv()

validator.addMetaSchema( metaschema.coreMetaschema )

Object.keys( metaschema ).forEach( schemaRefName => {
  validator.addSchema( metaschema[ schemaRefName ], schemaRefName )
})
