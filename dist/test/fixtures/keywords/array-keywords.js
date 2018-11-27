"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_from_first_property_1 = require("../util/title-from-first-property");
exports.arrayKeywords = ([
    { items: {} },
    { contains: {} },
    { additionalItems: true, items: [{}] },
    { minItems: 1 },
    { maxItems: 2 },
    { uniqueItems: true }
]).map(title_from_first_property_1.titleFromFirstProperty);
//# sourceMappingURL=array-keywords.js.map