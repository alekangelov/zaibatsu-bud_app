import { createAction } from "typesafe-actions";
import { AboutReducerActionTypes } from "../reducers/aboutReducerTypes";

export const editVersion = createAction(AboutReducerActionTypes.VERSION)<{
  version: string;
}>();
