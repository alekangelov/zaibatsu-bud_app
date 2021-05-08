import { Combo } from "../../global/reducers/mainReducerTypes";

export default class ComboModel implements Combo {
  name = "";
  inputs = "";
  damage = 0;
  tags: string[] = [];
  character = 0;
  id = "";
  constructor({ name, id, inputs, damage, tags, character }: any) {
    this.id = id;
    this.name = name;
    this.inputs = inputs;
    this.damage = damage;
    this.tags = tags;
    this.character = character;
  }
}
