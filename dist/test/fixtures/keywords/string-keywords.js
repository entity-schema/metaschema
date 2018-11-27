"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_from_first_property_1 = require("../util/title-from-first-property");
exports.stringKeywords = ([
    { minLength: 0 },
    { maxLength: 1 },
    { pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$' },
    { format: 'uri' }
]).map(title_from_first_property_1.titleFromFirstProperty);
//# sourceMappingURL=string-keywords.js.map