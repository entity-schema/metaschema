"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const metaschema = require("./metaschema");
exports.validator = new Ajv();
exports.validator.addMetaSchema(metaschema.coreMetaschema);
Object.keys(metaschema).forEach(schemaRefName => {
    exports.validator.addSchema(metaschema[schemaRefName], schemaRefName);
});
//# sourceMappingURL=validator.js.map