"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const string_keywords_1 = require("./fixtures/keywords/string-keywords");
const number_keywords_1 = require("./fixtures/keywords/number-keywords");
const object_keywords_1 = require("./fixtures/keywords/object-keywords");
const array_keywords_1 = require("./fixtures/keywords/array-keywords");
const string_1 = require("./fixtures/string");
const number_1 = require("./fixtures/number");
const object_1 = require("./fixtures/object");
const array_1 = require("./fixtures/array");
const boolean_1 = require("./fixtures/boolean");
const integer_1 = require("./fixtures/integer");
const null_1 = require("./fixtures/null");
const combining_1 = require("./fixtures/combining");
const validator_1 = require("../validator");
describe('meta-schema', () => {
    it('a schema is a boolean or an object', () => {
        assert(validator_1.validator.validate('coreMetaschema', {}));
        assert(validator_1.validator.validate('coreMetaschema', true));
        assert(validator_1.validator.validate('coreMetaschema', false));
        assert(!validator_1.validator.validate('coreMetaschema', []));
    });
    it('a SchemaObject is an object only', () => {
        assert(validator_1.validator.validate('schemaObjectMetaschema', {}));
        assert(!validator_1.validator.validate('schemaObjectMetaschema', true));
        assert(!validator_1.validator.validate('schemaObjectMetaschema', false));
        assert(!validator_1.validator.validate('schemaObjectMetaschema', []));
    });
    it('if SchemaObject the properties must be correct', () => {
        assert(validator_1.validator.validate('schemaObjectMetaschema', { title: 'hello' }));
        assert(!validator_1.validator.validate('schemaObjectMetaschema', { title: 42 }));
    });
    describe('should not have keywords', () => {
        const noKeywordsForType = (type, schemaRef, valid, invalid) => {
            describe(`no ${type} keywords`, () => {
                it('valid schema', () => {
                    assert(validator_1.validator.validate(schemaRef, valid));
                });
                invalid.forEach(schema => {
                    it(schema.title, () => {
                        assert(!validator_1.validator.validate(schemaRef, schema));
                        assert(validator_1.validator.errors);
                        assert.strictEqual(validator_1.validator.errors.length, 1);
                        assert.strictEqual(validator_1.validator.errors[0].keyword, 'false schema');
                    });
                });
            });
        };
        noKeywordsForType('stringMetaschema', 'noStringKeywordsMetaschema', { title: 'hello' }, string_keywords_1.stringKeywords);
        noKeywordsForType('numberMetaschema', 'noNumberKeywordsMetaschema', { title: 'hello' }, number_keywords_1.numberKeywords);
        noKeywordsForType('objectMetaschema', 'noObjectKeywordsMetaschema', { title: 'hello' }, object_keywords_1.objectKeywords);
        noKeywordsForType('arrayMetaschema', 'noArrayKeywordsMetaschema', { title: 'hello' }, array_keywords_1.arrayKeywords);
    });
    describe('typed schemas', () => {
        const nameToFixturesMap = {
            stringMetaschema: string_1.stringFixtures,
            numberMetaschema: number_1.numberFixtures,
            integerMetaschema: integer_1.integerFixtures,
            objectMetaschema: object_1.objectFixtures,
            arrayMetaschema: array_1.arrayFixtures,
            booleanMetaschema: boolean_1.booleanFixtures,
            nullMetaschema: null_1.nullFixtures
        };
        const testTypedSchema = (schemaRef) => {
            const fixtures = nameToFixturesMap[schemaRef];
            const { pass, fail } = fixtures;
            describe(schemaRef, () => {
                describe('expect to pass', () => {
                    pass.forEach(schema => {
                        it(schema.title, () => {
                            const passed = validator_1.validator.validate(schemaRef, schema);
                            if (!passed) {
                                console.log('Unexpected fail when should pass');
                                console.log(JSON.stringify(schema, null, 2));
                                console.log(validator_1.validator.errors);
                            }
                            assert(passed);
                        });
                    });
                });
                describe('expect to fail', () => {
                    fail.forEach(schema => {
                        it(schema.title, () => {
                            assert(!validator_1.validator.validate(schemaRef, schema));
                        });
                    });
                });
            });
        };
        testTypedSchema('stringMetaschema');
        testTypedSchema('numberMetaschema');
        testTypedSchema('integerMetaschema');
        testTypedSchema('objectMetaschema');
        testTypedSchema('arrayMetaschema');
        testTypedSchema('booleanMetaschema');
        testTypedSchema('nullMetaschema');
        describe('Typed (union schema)', () => {
            const names = Object.keys(nameToFixturesMap);
            names.forEach(name => {
                const fixtures = nameToFixturesMap[name];
                const { pass } = fixtures;
                it(`${name} is typed`, () => {
                    const schema = pass[0];
                    const passed = validator_1.validator.validate('typedMetaschema', schema);
                    if (!passed) {
                        console.log('Unexpected fail when should pass');
                        console.log(JSON.stringify(schema, null, 2));
                        console.log(validator_1.validator.errors);
                    }
                    assert(passed);
                });
            });
        });
        describe('Any', () => {
            const names = Object.keys(nameToFixturesMap);
            it('no type is any', () => {
                const passed = validator_1.validator.validate('anyMetaschema', { title: 'Hello' });
                if (!passed) {
                    console.log('Unexpected fail when should pass');
                    console.log(validator_1.validator.errors);
                }
                assert(passed);
            });
            names.forEach(name => {
                const fixtures = nameToFixturesMap[name];
                const { pass } = fixtures;
                it(`${name} is not any`, () => {
                    const schema = pass[0];
                    const passed = validator_1.validator.validate('anyMetaschema', schema);
                    if (passed) {
                        console.log('Unexpected pass when should fail');
                        console.log(JSON.stringify(schema, null, 2));
                        console.log(validator_1.validator.errors);
                    }
                    assert(!passed);
                });
            });
        });
    });
    describe('combining schema', () => {
        const nameToFixturesMap = {
            allOfMetaschema: combining_1.allOfFixtures,
            anyOfMetaschema: combining_1.anyOfFixtures,
            oneOfMetaschema: combining_1.oneOfFixtures,
            notMetaschema: combining_1.notFixtures
        };
        const names = Object.keys(nameToFixturesMap);
        names.forEach(schemaRef => {
            const { pass, fail } = nameToFixturesMap[schemaRef];
            pass.forEach(schema => {
                it(`${schema.title}`, () => {
                    const passed = validator_1.validator.validate(schemaRef, schema);
                    if (!passed) {
                        console.log('Unexpected fail when should pass');
                        console.log(validator_1.validator.errors);
                    }
                    assert(passed);
                });
                it(`${schema.title} is combining`, () => {
                    const passed = validator_1.validator.validate('combiningMetaschema', schema);
                    if (!passed) {
                        console.log('Unexpected fail when should pass');
                        console.log(validator_1.validator.errors);
                    }
                    assert(passed);
                });
            });
            fail.forEach(schema => {
                it(`${schema.title}`, () => {
                    const passed = validator_1.validator.validate(schemaRef, schema);
                    if (passed) {
                        console.log('Unexpected pass when should fail');
                        console.log(validator_1.validator.errors);
                    }
                    assert(!passed);
                });
                it(`${schema.title} is not combining`, () => {
                    const passed = validator_1.validator.validate('combiningMetaschema', schema);
                    if (passed) {
                        console.log('Unexpected pass when should fail');
                        console.log(validator_1.validator.errors);
                    }
                    assert(!passed);
                });
            });
        });
    });
});
//# sourceMappingURL=index.js.map