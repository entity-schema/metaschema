"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_from_first_property_1 = require("../util/title-from-first-property");
exports.objectKeywords = ([
    { properties: {} },
    { additionalProperties: false },
    { required: ['name'] },
    { propertyNames: {} },
    { minProperties: 1 },
    { maxProperties: 2 },
    { dependencies: { 'foo': ['bar'] } },
    { patternProperties: { '$S_': {} } }
]).map(title_from_first_property_1.titleFromFirstProperty);
//# sourceMappingURL=object-keywords.js.map