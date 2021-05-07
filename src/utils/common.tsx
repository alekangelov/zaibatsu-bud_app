import React from "react";
import { omit, pipe, dropLast, filter, addIndex, map } from "ramda";

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

export const truthyFilter = filter(truthy);

export const mapIndexed = addIndex(map);
