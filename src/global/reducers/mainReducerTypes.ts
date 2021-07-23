import characters from "../../data/characters";
import { Tags } from "../../data/tags";

export enum MainReducerActionTypes {
  ADD_COMBO = "@ZAI/ADD_COMBO",
  REMOVE_COMBO = "@ZAI/REMOVE_COMBO",
  EDIT_COMBO = "@ZAI/EDIT_COMBO",
  IMPORT_COMBOS = "@ZAI/IMPORT_COMBOS",
}

export type Character = typeof characters[0];

export interface Combo {
  name: string;
  inputs: string;
  damage: number;
  tags: Tags;
  character: Character["id"];
  id: string;
}

export type ComboArray = Combo[];

export interface ComboState extends ComboArray {}

export interface IState {
  combos: ComboState;
  characters: typeof characters;
}

export type ActionTypes =
  | {
      type: MainReducerActionTypes.ADD_COMBO;
      payload: Combo;
    }
  | {
      type: MainReducerActionTypes.REMOVE_COMBO;
      payload: Combo;
    }
  | {
      type: MainReducerActionTypes.EDIT_COMBO;
      payload: Combo;
    }
  | {
      type: MainReducerActionTypes.IMPORT_COMBOS;
      payload: Combo[];
    };
