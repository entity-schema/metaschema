"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valid_values_1 = require("./util/valid-values");
const type_fixtures_1 = require("./util/type-fixtures");
const type = 'null';
exports.nullFixtures = {
    pass: [
        ...type_fixtures_1.getBasePassing(type, valid_values_1.validNulls, [], 'enum', 'const')
    ],
    fail: [
        ...type_fixtures_1.getBaseFailing(type, valid_values_1.validNulls, valid_values_1.validNumbers, 'enum', 'const'),
        {
            title: 'Has enum',
            type: 'null',
            enum: [null, null]
        },
        {
            title: 'Has const',
            type: 'null',
            const: null
        }
    ]
};
//# sourceMappingURL=null.js.map