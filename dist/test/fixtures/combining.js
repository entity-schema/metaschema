"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allOfFixtures = {
    pass: [
        {
            title: 'Has allOf',
            allOf: [{ type: 'string' }]
        }
    ],
    fail: [
        {
            title: 'Missing allOf'
        }
    ]
};
exports.anyOfFixtures = {
    pass: [
        {
            title: 'Has anyOf',
            anyOf: [{ type: 'string' }]
        }
    ],
    fail: [
        {
            title: 'Missing anyOf'
        }
    ]
};
exports.oneOfFixtures = {
    pass: [
        {
            title: 'Has oneOf',
            oneOf: [{ type: 'string' }]
        }
    ],
    fail: [
        {
            title: 'Missing oneOf'
        }
    ]
};
exports.notFixtures = {
    pass: [
        {
            title: 'Has not',
            not: { type: 'string' }
        }
    ],
    fail: [
        {
            title: 'Missing not'
        }
    ]
};
//# sourceMappingURL=combining.js.map