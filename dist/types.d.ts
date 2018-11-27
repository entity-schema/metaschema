import { JSONSchema6, JSONSchema6TypeName } from './types/json-schema';
export interface NotStringMetaschema extends JSONSchema6 {
    minLength?: never;
    maxLength?: never;
    pattern?: never;
    format?: never;
}
export interface NoNumberKeywordsMetaschema extends JSONSchema6 {
    multipleOf?: never;
    minimum?: never;
    maximum?: never;
    exclusiveMinimum?: never;
    exclusiveMaximum?: never;
}
export interface NoObjectKeywordsMetaschema extends JSONSchema6 {
    properties?: never;
    additionalProperties?: never;
    required?: never;
    propertyNames?: never;
    minProperties?: never;
    maxProperties?: never;
    dependencies?: never;
    patternProperties?: never;
}
export interface NoArrayKeywordsMetaschema extends JSONSchema6 {
    items?: never;
    contains?: never;
    additionalItems?: never;
    minItems?: never;
    maxItems?: never;
    uniqueItems?: never;
}
export interface StringTypeMetaschema extends JSONSchema6 {
    type: 'string';
    enum?: string[];
    const?: string;
}
export declare type StringMetaschema = (StringTypeMetaschema & NoNumberKeywordsMetaschema & NoObjectKeywordsMetaschema & NoArrayKeywordsMetaschema);
export interface NumericTypeMetaschema extends JSONSchema6 {
    type: 'number' | 'integer';
    enum?: number[];
    const?: number;
}
export interface NumericTypeInclusiveMinimumMetaschema extends NumericTypeMetaschema {
    minimum?: number;
    exclusiveMinimum?: never;
}
export interface NumericTypeExclusiveMinimumMetaschema extends NumericTypeMetaschema {
    minimum?: never;
    exclusiveMinimum?: number;
}
export interface NumericTypeInclusiveMaximumMetaschema extends NumericTypeMetaschema {
    maximum?: number;
    exclusiveMaximum?: never;
}
export interface NumericTypeExclusiveMaximumMetaschema extends NumericTypeMetaschema {
    maximum?: never;
    exclusiveMaximum?: number;
}
export declare type NumericTypeMinimumMetaschema = (NumericTypeInclusiveMinimumMetaschema | NumericTypeExclusiveMinimumMetaschema);
export declare type NumericTypeMaximumMetaschema = (NumericTypeInclusiveMaximumMetaschema | NumericTypeExclusiveMaximumMetaschema);
export declare type NumericTypeRangedMetaschema = (NumericTypeMinimumMetaschema & NumericTypeMaximumMetaschema);
export interface NumberTypeMetaschema extends NumericTypeMetaschema {
    type: 'number';
}
export declare type NumberMetaschema = (NumberTypeMetaschema & NumericTypeRangedMetaschema & NotStringMetaschema & NoObjectKeywordsMetaschema & NoArrayKeywordsMetaschema);
export interface IntegerTypeMetaschema extends NumericTypeMetaschema {
    type: 'integer';
}
export declare type IntegerMetaschema = (IntegerTypeMetaschema & NumericTypeRangedMetaschema & NotStringMetaschema & NoObjectKeywordsMetaschema & NoArrayKeywordsMetaschema);
export interface ObjectTypeMetaschema extends JSONSchema6 {
    type: 'object';
    enum?: object[];
    const?: object;
}
export declare type ObjectMetaschema = (ObjectTypeMetaschema & NotStringMetaschema & NoNumberKeywordsMetaschema & NoArrayKeywordsMetaschema);
export interface ArrayTypeMetaschema extends JSONSchema6 {
    type: 'array';
    enum?: any[][];
    const?: any[];
}
export interface ArrayAnyMetaschema extends ArrayTypeMetaschema {
    items: never;
    additionalItems: never;
}
export interface ArrayOfMetaschema extends ArrayTypeMetaschema {
    items: JSONSchema6;
    additionalItems: never;
}
export interface ArrayTupleMetaschema extends ArrayTypeMetaschema {
    items: JSONSchema6[];
    additionalItems: boolean | JSONSchema6;
}
export declare type ArrayMetaschema = (NotStringMetaschema & NoNumberKeywordsMetaschema & NoObjectKeywordsMetaschema & (ArrayAnyMetaschema | ArrayOfMetaschema | ArrayTupleMetaschema));
export interface BooleanTypeMetaschema extends JSONSchema6 {
    type: 'boolean';
    enum?: boolean[];
    const?: boolean;
}
export declare type BooleanMetaschema = (BooleanTypeMetaschema & NotStringMetaschema & NoNumberKeywordsMetaschema & NoObjectKeywordsMetaschema & NoArrayKeywordsMetaschema);
export interface NullTypeMetaschema extends JSONSchema6 {
    type: 'null';
    enum?: never;
    const?: never;
}
export declare type NullMetaschema = (BooleanTypeMetaschema & NotStringMetaschema & NoNumberKeywordsMetaschema & NoObjectKeywordsMetaschema & NoArrayKeywordsMetaschema);
export declare type TypedMetaschema = (StringMetaschema | NumberMetaschema | IntegerMetaschema | ObjectMetaschema | ArrayMetaschema | NullMetaschema);
export interface UnionMetaschema extends JSONSchema6 {
    type: JSONSchema6TypeName[];
}
export interface AnyMetaschema extends JSONSchema6 {
    type?: never;
}
export interface DefinitionsMetaschema extends JSONSchema6 {
    definitions: {
        [k: string]: JSONSchema6;
    };
}
export interface AllOfMetaschema extends JSONSchema6 {
    allOf: JSONSchema6[];
}
export interface AnyOfMetaschema extends JSONSchema6 {
    anyOf: JSONSchema6[];
}
export interface OneOfMetaschema extends JSONSchema6 {
    oneOf: JSONSchema6[];
}
export interface NotMetaschema extends JSONSchema6 {
    not: JSONSchema6;
}
export declare type CombiningMetaschema = (AllOfMetaschema | AnyOfMetaschema | OneOfMetaschema | NotMetaschema);
export interface RefMetaschema extends JSONSchema6 {
    $ref: string;
}
export interface IdMetaschema extends JSONSchema6 {
    $id: string;
}
export interface TitleMetaschema extends JSONSchema6 {
    title: string;
}
export declare type Metaschema = JSONSchema6 | boolean;
export interface MetaschemaMap {
    [name: string]: JSONSchema6;
}
