"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_keywords_1 = require("./keywords/number-keywords");
const type_fixtures_1 = require("./util/type-fixtures");
const valid_values_1 = require("./util/valid-values");
const type = 'integer';
exports.integerFixtures = {
    pass: [
        ...type_fixtures_1.getBasePassing(type, valid_values_1.validIntegers, number_keywords_1.numberKeywords)
    ],
    fail: [
        ...type_fixtures_1.getBaseFailing(type, valid_values_1.validIntegers, valid_values_1.validNumbers),
        {
            title: 'Use either minimum or exlusiveMinimum',
            type,
            minimum: 1,
            exclusiveMinimum: 1
        },
        {
            title: 'Use either maximum or exlusiveMaximum',
            type,
            maximum: 2,
            exclusiveMaximum: 2
        }
    ]
};
//# sourceMappingURL=integer.js.map