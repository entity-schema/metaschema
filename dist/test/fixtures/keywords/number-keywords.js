"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_from_first_property_1 = require("../util/title-from-first-property");
exports.numberKeywords = ([
    { multipleOf: 2 },
    { minimum: 1 },
    { maximum: 2 },
    { exclusiveMinimum: 1 },
    { exclusiveMaximum: 2 }
]).map(title_from_first_property_1.titleFromFirstProperty);
//# sourceMappingURL=number-keywords.js.map