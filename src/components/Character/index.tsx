import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { useHistory, useParams } from "react-router";
import useAppSelector from "../../global/helpers/useAppSelector";
import CharacterBg from "../CharacterBg";
import IconButton from "../IconButton";

const CharacterOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { character, combos } = useAppSelector((state) => {
    const character = state.characters.find((e) => e.id === parseInt(id));
    const combos = state.combos.filter((e) => e.character === parseInt(id));
    return { character, combos };
  });
  const { push } = useHistory();
  return (
    <div className="character">
      <CharacterBg character={character} />
      <div className="container">
        <div className="character-header">
          <h1 className="impact">{character?.name}</h1>
          <IconButton
            onClick={() => {
              push(`/combo/new/${character?.id}`);
            }}
            icon={faPlus}
          >
            New Combo
          </IconButton>
        </div>
        <div className="container m-t-5">{combos.map((e) => null)}</div>
      </div>
    </div>
  );
};

export default CharacterOverview;
