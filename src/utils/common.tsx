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
  ascend,
  curry,
} from "ramda";

function anything<T>(a: T): T {
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

const ascComparator = (a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0);

const descComparator = (a: any, b: any) => ascComparator(b, a);

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
