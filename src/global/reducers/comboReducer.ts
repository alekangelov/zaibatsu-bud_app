import { createReducer } from "typesafe-actions";
import { ActionTypes, ComboState, ComboArray } from "./mainReducerTypes";
import { addCombo, editCombo, removeCombo } from "../actions/mainActions";
import { removeFromArrayWhere, replaceInArrayWhere } from "../../utils/common";
import { toast } from "react-toastify";

export const comboState: ComboState = [];

export default createReducer<ComboState, ActionTypes>(comboState)
  .handleAction(addCombo, (state, action) => {
    toast("Congrats! Combo was added!");
    return [...state, action.payload];
  })
  .handleAction(removeCombo, (state, action) => {
    toast("Shucks, combo was removed!");
    return removeFromArrayWhere("id", action.payload.id, state);
  })
  .handleAction(editCombo, (state, action) => {
    toast("Sheesh, combo was edited!");
    return replaceInArrayWhere("id", action.payload, state);
  });
