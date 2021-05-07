import {
  faEdit,
  faExternalLinkAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { useHistory, useParams } from "react-router";
import useAppSelector from "../../global/helpers/useAppSelector";
import CharacterBg from "../CharacterBg";
import ComboPreview from "../ComboSuite/ComboPreview";
import IconButton from "../IconButton";
import { openModalAt } from "../../utils/comms";

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
        <div className="character-header m-b-10">
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
        {!Boolean(combos.length) && (
          <div>
            <h1>No combos for {character?.name}</h1>
          </div>
        )}
        {combos.map((e, i) => {
          return (
            <div key={e.id} className="m-b-5 combo-overview">
              <div className="combo-overview_overlay">
                <IconButton
                  className="m-r-3"
                  icon={faExternalLinkAlt}
                  onClick={() => {
                    openModalAt(`/combo-view/${e.id}`);
                  }}
                >
                  Open Overlay
                </IconButton>
                <IconButton
                  onClick={() => {
                    push(`/combo/new/${character?.id}/${e.id}`);
                  }}
                  icon={faEdit}
                >
                  Edit
                </IconButton>
              </div>
              <ComboPreview {...e} combo={e.inputs} num={i + 1} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterOverview;
