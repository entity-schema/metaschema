"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valid_values_1 = require("./util/valid-values");
const string_keywords_1 = require("./keywords/string-keywords");
const type_fixtures_1 = require("./util/type-fixtures");
const type = 'string';
exports.stringFixtures = {
    pass: [
        ...type_fixtures_1.getBasePassing(type, valid_values_1.validStrings, string_keywords_1.stringKeywords)
    ],
    fail: [
        ...type_fixtures_1.getBaseFailing(type, valid_values_1.validStrings, valid_values_1.validNumbers)
    ]
};
//# sourceMappingURL=string.js.map