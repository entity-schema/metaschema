"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleFromFirstProperty = (schema) => {
    const keys = Object.keys(schema);
    if (keys.length < 1)
        throw Error('Expected at least one property on the schema');
    const title = schema.title || keys[0];
    return Object.assign({}, schema, { title });
};
//# sourceMappingURL=title-from-first-property.js.map