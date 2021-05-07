import { createAction } from "typesafe-actions";
import { Combo, MainReducerActionTypes } from "../reducers/mainReducerTypes";

export const addCombo = createAction(MainReducerActionTypes.ADD_COMBO)<Combo>();
