"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_keywords_1 = require("../keywords/string-keywords");
const number_keywords_1 = require("../keywords/number-keywords");
const object_keywords_1 = require("../keywords/object-keywords");
const array_keywords_1 = require("../keywords/array-keywords");
exports.failBecauseHasKeywords = (type, failType, keywordSchemas) => keywordSchemas.map(schema => {
    const title = `Has ${failType} keyword ${schema.title}`;
    return Object.assign({}, schema, { title, type });
});
exports.passWithKeywords = (type, keywordSchemas) => keywordSchemas.map(schema => {
    const title = `Has ${type} keyword ${schema.title}`;
    return Object.assign({}, schema, { title, type });
});
exports.titledSchemaMap = {
    string: string_keywords_1.stringKeywords,
    number: number_keywords_1.numberKeywords,
    integer: number_keywords_1.numberKeywords,
    object: object_keywords_1.objectKeywords,
    array: array_keywords_1.arrayKeywords
};
exports.keywordTypes = Object.keys(exports.titledSchemaMap);
exports.titledSchemaMapToFailBecause = (type) => {
    const result = [];
    exports.keywordTypes.forEach(name => {
        if (name === type)
            return;
        if (type === 'integer' && name === 'number')
            return;
        if (type === 'number' && name === 'integer')
            return;
        result.push(...exports.failBecauseHasKeywords(type, name, exports.titledSchemaMap[name]));
    });
    return result;
};
exports.getBasePassing = (type, validValues, keyWords, ...exclude) => {
    const schemas = [
        {
            title: `Type is "${type}"`,
            type
        }
    ];
    if (!exclude.includes('const')) {
        schemas.push({
            title: `Const is ${type}`,
            type,
            const: validValues[0]
        });
    }
    if (!exclude.includes('enum')) {
        schemas.push({
            title: `Enum is ${type} array`,
            type,
            enum: validValues
        });
    }
    schemas.push(...exports.passWithKeywords(type, keyWords));
    return schemas;
};
exports.getBaseFailing = (type, validValues, invalidValues, ...exclude) => {
    const schemas = [
        {
            title: 'Missing type'
        },
        {
            title: `Type is not "${type}"`,
            type: exports.keywordTypes.filter(t => t !== type)[0]
        }
    ];
    if (!exclude.includes('const')) {
        schemas.push({
            title: `Const is not ${type}`,
            type,
            const: invalidValues[0]
        });
    }
    if (!exclude.includes('enum')) {
        schemas.push({
            title: `Enum is not ${type} array`,
            type,
            enum: invalidValues
        }, {
            title: 'Should have used const instead of enum',
            type,
            enum: [validValues[0]]
        });
    }
    schemas.push(...exports.titledSchemaMapToFailBecause(type));
    return schemas;
};
//# sourceMappingURL=type-fixtures.js.map