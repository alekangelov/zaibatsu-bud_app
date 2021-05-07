import { createReducer } from "typesafe-actions";
import { ActionTypes, IState } from "./mainReducerTypes";
import characters from "../../data/characters.json";
import { addCombo } from "../actions/mainActions";

export const initialState: IState = {
  characters,
  combos: [],
};

export default createReducer<IState, ActionTypes>(initialState).handleAction(
  addCombo,
  (state, action) => {
    return {
      ...state,
      combos: [...state.combos, action.payload],
    };
  }
);
