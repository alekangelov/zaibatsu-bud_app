import { createReducer } from "typesafe-actions";
import characters from "../../data/characters.json";

export interface Combo {
  id: string;
  name: string;
  inputs: string[];
  damage: number;
  tags: string[];
  character: typeof characters[0]["id"];
}

export interface IState {
  characters: typeof characters;
  combos: Combo[];
}

export const initialState: IState = {
  characters,
  combos: [],
};

export type Character = typeof characters[0];

export default createReducer(initialState);
