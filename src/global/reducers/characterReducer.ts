import { createReducer } from "typesafe-actions";
import characters from "../../data/characters";

console.log(characters);

export default createReducer(characters);
