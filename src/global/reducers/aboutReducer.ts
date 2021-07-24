import { createReducer } from "typesafe-actions";
import { editVersion } from "../actions/aboutActions";
import { AboutActionTypes } from "./aboutReducerTypes";

export const aboutState = {
  version: "",
};

export type AboutState = typeof aboutState;

export default createReducer<AboutState, AboutActionTypes>(
  aboutState
).handleAction(editVersion, (state, action) => {
  return { ...state, ...action.payload };
});
