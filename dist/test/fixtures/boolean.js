"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valid_values_1 = require("./util/valid-values");
const type_fixtures_1 = require("./util/type-fixtures");
const type = 'boolean';
exports.booleanFixtures = {
    pass: [
        ...type_fixtures_1.getBasePassing(type, valid_values_1.validBooleans, [], 'enum')
    ],
    fail: [
        ...type_fixtures_1.getBaseFailing(type, valid_values_1.validBooleans, valid_values_1.validNumbers, 'enum'),
        {
            title: 'Has enum',
            type: 'boolean',
            enum: [true, false]
        }
    ]
};
//# sourceMappingURL=boolean.js.map