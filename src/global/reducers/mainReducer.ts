import { createReducer } from "typesafe-actions";
import { ActionTypes, IState } from "./mainReducerTypes";
import characters from "../../data/characters.json";
import { addCombo, editCombo, removeCombo } from "../actions/mainActions";
import {
  pipeJsonStringParse,
  removeFromArrayWhereId,
  replaceInArray,
} from "../../utils/common";
import { toast } from "react-toastify";
import { clone } from "ramda";
export const initialState: IState = {
  characters,
  combos: [],
};

export default createReducer<IState, ActionTypes>(initialState)
  .handleAction(addCombo, (state, action) => {
    toast("Congrats! Combo was added!");

    return {
      ...state,
      combos: [...state.combos, action.payload],
    };
  })
  .handleAction(removeCombo, (state, action) => {
    toast("Shucks, combo was removed!");
    return {
      ...state,
      combos: removeFromArrayWhereId(action.payload.id, state.combos),
    };
  })
  .handleAction(editCombo, (state, action) => {
    toast("Sheesh, combo was edited!");
    return { ...state, combos: replaceInArray(action.payload, state.combos) };
  });
