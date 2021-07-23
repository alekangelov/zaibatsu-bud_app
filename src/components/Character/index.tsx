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
import { SelectInput } from "../FormComponents";
import { FormikProvider, useFormik } from "formik";
import { ComboState } from "../../global/reducers/mainReducerTypes";

const CharacterOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const formik = useFormik({
    initialValues: {
      sort: "",
    },
    onSubmit: (values) => {},
  });
  const { character, combos } = useAppSelector((state) => {
    const character = state.characters.find((e) => e.id === parseInt(id));
    const combos = state.combos.filter((e) => e.character === parseInt(id));
    return { character, combos };
  });
  const { push } = useHistory();
  const sortFn = React.useCallback(
    (sortable: ComboState = []) => {
      if (formik.values.sort) {
        if (formik.values.sort === "date") return sortable.reverse();
        return sortable.sort((a, b) => {
          switch (formik.values.sort) {
            case "damage":
              return b.damage - a.damage;
            case "alphabetic":
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            default:
              return 0;
          }
        });
      }
      return sortable;
    },
    [formik.values.sort]
  );
  return (
    <FormikProvider value={formik}>
      <div className="character">
        <CharacterBg character={character} />
        <div className="container">
          <div className="character-header m-b-10">
            <h1 className="impact">{character?.name}</h1>
            <div className="row align-center">
              <SelectInput
                name="sort"
                placeholder="Sort By"
                items={[
                  { label: "Regular", value: "" },
                  { label: "Date", value: "date" },
                  { label: "Damage", value: "damage" },
                  { label: "Alphabetic", value: "alphabetic" },
                ]}
              />
              <IconButton
                className="m-l-2"
                onClick={() => {
                  push(`/combo/new/${character?.id}`);
                }}
                icon={faPlus}
              >
                New Combo
              </IconButton>
            </div>
          </div>
          {!Boolean(combos.length) && (
            <div>
              <h1>No combos for {character?.name}</h1>
            </div>
          )}
          {sortFn(combos).map((e, i) => {
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
    </FormikProvider>
  );
};

export default CharacterOverview;
