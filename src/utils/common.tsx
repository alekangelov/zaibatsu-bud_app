import React from "react";
import { omit, createPipe, dropLast } from "remeda";

function anything<T>(a: T): T {
  return a;
}
export const omitCharactersFromObject = createPipe(
  anything,
  omit(["characters"] as any)
);

export const formEventToJson = (event: React.FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  const object = { ...formData };
  return object;
};

export const removeLast = dropLast(1);
