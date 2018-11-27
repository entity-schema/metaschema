import { TitleMetaschema } from '../../../types';
import { JSONSchema6TypeName } from '../../../types/json-schema';
export interface SchemaFixtures {
    pass: TitleMetaschema[];
    fail: TitleMetaschema[];
}
export declare const failBecauseHasKeywords: (type: string, failType: string, keywordSchemas: TitleMetaschema[]) => (TitleMetaschema & {
    title: string;
    type: string;
})[];
export declare const passWithKeywords: (type: string, keywordSchemas: TitleMetaschema[]) => (TitleMetaschema & {
    title: string;
    type: string;
})[];
export interface TitledSchemaMap {
    [name: string]: TitleMetaschema[];
}
export interface SchemaFixtureMap {
    [name: string]: SchemaFixtures;
}
export declare const titledSchemaMap: TitledSchemaMap;
export declare const keywordTypes: JSONSchema6TypeName[];
export declare const titledSchemaMapToFailBecause: (type: JSONSchema6TypeName) => TitleMetaschema[];
export declare const getBasePassing: (type: JSONSchema6TypeName, validValues: any[], keyWords: TitleMetaschema[], ...exclude: string[]) => TitleMetaschema[];
export declare const getBaseFailing: (type: JSONSchema6TypeName, validValues: any[], invalidValues: any[], ...exclude: string[]) => TitleMetaschema[];
