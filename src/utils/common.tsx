import React from "react";
import {
  omit,
  pipe,
  dropLast,
  filter,
  addIndex,
  map,
  sort,
  split,
  join,
  curry,
  reject,
  propEq,
  eqProps,
  propOr,
} from "ramda";
import { nanoid } from "nanoid";

export function anything<T>(a: T): T {
  return a;
}

export const omitCharactersFromObject = omit(["characters"]);

export const formEventToJson = (event: React.FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  const object = { ...formData };
  return object;
};

export const removeLast = dropLast(1);

type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T; // from lodash

export function truthy<T>(value: T): value is Truthy<T> {
  return !!value;
}

export const isUppercase = (string: string) =>
  new RegExp(`[A-Z\s]+`).test(string);

export const ifUpperCaseAddSuffix = (string: string) =>
  isUppercase(string) ? `${string.toLowerCase()}uc` : string;

export const ascComparator = (a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0);

export const descComparator = (a: any, b: any) => ascComparator(b, a);

const sortAsc = pipe(split("+"), sort(ascComparator), join("+"));

export const ifPlusSort = (string: string) => {
  if (string.includes("+")) {
    return sortAsc(string);
  }
  return string;
};

export const suffixAndSort = pipe(ifUpperCaseAddSuffix, ifPlusSort);

export const truthyFilter = filter(truthy);

export const mapIndexed = addIndex(map);

export const replaceAll = curry(
  (find: string, replace: string, string: string) =>
    String.prototype.replaceAll.call(string, find, replace as any)
);

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const makeID = () => nanoid(10);

export const removeFromArrayWhere = <T extends Array<any>>(
  prop: string,
  id: string,
  array: T
): T => reject(propEq(prop, id), array) as T;

export const replaceInArrayWhere = <T extends Array<any>>(
  prop: string,
  object: any,
  array: T
): T => map((e) => (eqProps(prop, e, object) ? object : e), array) as T;

export const pipeJsonStringParse = (obj: object) =>
  JSON.parse(JSON.stringify(obj));

export const callbackify = <
  A extends () => any,
  T extends (x: ReturnType<A>) => any
>(
  arg: A,
  cb: T
) => {
  const x = arg();
  return cb(x);
};

type Unarray<T> = T extends Array<infer U> ? U : T;

export const propOrFalse: <U extends string, V extends any>(
  key: U,
  object: V
) => Unarray<V> | false = propOr(false);
