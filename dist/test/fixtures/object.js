"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valid_values_1 = require("./util/valid-values");
const type_fixtures_1 = require("./util/type-fixtures");
const object_keywords_1 = require("./keywords/object-keywords");
const type = 'object';
exports.objectFixtures = {
    pass: [
        ...type_fixtures_1.getBasePassing(type, valid_values_1.validObjects, object_keywords_1.objectKeywords)
    ],
    fail: [
        ...type_fixtures_1.getBaseFailing(type, valid_values_1.validObjects, valid_values_1.validNumbers),
        {
            title: "If required, at least one entry",
            required: []
        }
    ]
};
//# sourceMappingURL=object.js.map