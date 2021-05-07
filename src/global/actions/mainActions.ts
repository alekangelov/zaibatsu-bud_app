import { createAction } from "typesafe-actions";
import { Combo, MainReducerActionTypes } from "../reducers/mainReducerTypes";

export const addCombo = createAction(MainReducerActionTypes.ADD_COMBO)<Combo>();
export const editCombo = createAction(
  MainReducerActionTypes.EDIT_COMBO
)<Combo>();
export const removeCombo = createAction(
  MainReducerActionTypes.REMOVE_COMBO
)<Combo>();
