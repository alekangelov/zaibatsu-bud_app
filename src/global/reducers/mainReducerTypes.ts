import characters from "../../data/characters.json";

export enum MainReducerActionTypes {
  ADD_COMBO = "@ZAI/ADD_COMBO",
  REMOVE_COMBO = "@ZAI/REMOVE_COMBO",
  EDIT_COMBO = "@ZAI/EDIT_COMBO",
}

export type Character = typeof characters[0];

export interface Combo {
  id: string;
  name: string;
  inputs: string;
  damage: number;
  tags: string[];
  character: Character["id"];
}

export interface IState {
  characters: typeof characters;
  combos: Combo[];
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
    };
