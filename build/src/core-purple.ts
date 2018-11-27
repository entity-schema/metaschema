import { SimpleTypes } from "./core-shared";

export interface PurpleCore {
  $id?: string;
  $ref?: string;
  $schema?: string;
  additionalItems?: boolean | PurpleCore;
  additionalProperties?: boolean | PurpleCore;
  allOf?: Array<boolean | PurpleCore>;
  anyOf?: Array<boolean | PurpleCore>;
  const?: any;
  contains?: boolean | PurpleCore;
  default?: any;
  definitions?: { [ key: string ]: boolean | PurpleCore };
  dependencies?: { [ key: string ]: string[] | boolean | PurpleCore };
  description?: string;
  enum?: any[];
  examples?: any[];
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  format?: string;
  items?: Array<boolean | PurpleCore> | boolean | PurpleCore;
  maximum?: number;
  maxItems?: number;
  maxLength?: number;
  maxProperties?: number;
  minimum?: number;
  minItems?: number;
  minLength?: number;
  minProperties?: number;
  multipleOf?: number;
  not?: boolean | PurpleCore;
  oneOf?: Array<boolean | PurpleCore>;
  pattern?: string;
  patternProperties?: { [ key: string ]: boolean | PurpleCore };
  properties?: { [ key: string ]: boolean | PurpleCore };
  propertyNames?: boolean | PurpleCore;
  required?: string[];
  title?: string;
  type?: SimpleTypes[] | SimpleTypes;
  uniqueItems?: boolean;
}