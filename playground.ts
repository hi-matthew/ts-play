import { GetServerSidePropsContext } from 'next';
import { encode } from 'querystring';

const isObject = (obj: unknown) =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const camelCase = (str: string) =>
  str.replace(/[_][a-z]/g, match => match[1].toUpperCase());

type CamelCase<
  T,
  D extends string = '_'
> = T extends `${infer S}${D}${infer S2}`
  ? `${S}${Capitalize<CamelCase<S2, D>>}`
  : T;

export type CamelCaseProperties<T extends object> = {
  [K in keyof T as CamelCase<K>]: T[K];
};

// Works but use camelcaseKeys by sindresorhus instead since camelCaseKeys Fn on line 33 breaks typesafety
export type CamelCasePropertiesDeep<T> = T extends Array<infer V>
  ? Array<CamelCasePropertiesDeep<V>>
  : {
      [K in keyof T as CamelCase<K>]: T[K] extends AnyObject
        ? CamelCasePropertiesDeep<T[K]>
        : T[K];
    };

export type AnyObject = { [k: string]: unknown };

// Works functionally but breaks typesafety -- use camelcaseKeys by sindresorhus instead
export const camelCaseKeys = (obj: AnyObject): AnyObject => {
  if (!isObject(obj)) {
    return {};
  }

  const keys = Object.keys(obj);

  const finalObj = keys.reduce((acc, key) => {
    const value = obj[key];
    const camelCasedKey = camelCase(key);

    if (isObject(value)) {
      return { ...acc, [camelCasedKey]: camelCaseKeys };
    }

    if (Array.isArray(value)) {
      return {
        ...acc,
        [camelCasedKey]: value.map(val => camelCaseKeys(val)),
      };
    }

    return { ...acc, [camelCasedKey]: value };
  }, {});

  return finalObj;
};

export const getQueryParam = (ctx: GetServerSidePropsContext, key: string) =>
  new URLSearchParams(encode(ctx.query)).get(key) ?? '';
