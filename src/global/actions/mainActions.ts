import { nanoid } from "nanoid";
import { map } from "ramda";
import { createAction } from "typesafe-actions";
import { Combo, MainReducerActionTypes } from "../reducers/mainReducerTypes";

export const addCombo = createAction(
  MainReducerActionTypes.ADD_COMBO,
  (combo) => ({
    ...combo,
    id: combo.id ? combo.id : nanoid(),
  })
)<Combo>();

export const importCombos = createAction(
  MainReducerActionTypes.IMPORT_COMBOS,
  (combos: Array<Combo>) =>
    combos.map((singleCombo) => ({ ...singleCombo, id: nanoid() }))
)<Combo[]>();

export const editCombo = createAction(
  MainReducerActionTypes.EDIT_COMBO
)<Combo>();

export const removeCombo = createAction(
  MainReducerActionTypes.REMOVE_COMBO
)<Combo>();
