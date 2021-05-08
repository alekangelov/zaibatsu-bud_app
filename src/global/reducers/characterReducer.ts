import { createReducer } from "typesafe-actions";
import characters from "../../data/characters.json";

export default createReducer(characters);
