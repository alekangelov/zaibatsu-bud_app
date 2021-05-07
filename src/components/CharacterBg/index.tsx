import * as React from "react";
import { Character } from "../../global/reducers/mainReducerTypes";

const CharacterBg: React.FC<{ character: Character | undefined }> = ({
  character,
}) => {
  if (!character) return null;
  return (
    <div className="character-bg">
      <div className="character-bg__overlay"></div>
      <img src={character?.image} alt={character?.name} />
    </div>
  );
};

export default CharacterBg;
