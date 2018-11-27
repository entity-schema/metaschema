"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valid_values_1 = require("./util/valid-values");
const type_fixtures_1 = require("./util/type-fixtures");
const array_keywords_1 = require("./keywords/array-keywords");
const type = 'array';
exports.arrayFixtures = {
    pass: [
        ...type_fixtures_1.getBasePassing(type, valid_values_1.validArrays, array_keywords_1.arrayKeywords)
    ],
    fail: [
        ...type_fixtures_1.getBaseFailing(type, valid_values_1.validArrays, valid_values_1.validNumbers)
    ]
};
//# sourceMappingURL=array.js.map