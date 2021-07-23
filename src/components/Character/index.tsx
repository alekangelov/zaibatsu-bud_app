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
import { SelectInput, TagInput, TextInput } from "../FormComponents";
import { FormikProvider, useFormik } from "formik";
import { sortAndFilter, SortFitlerProps } from "../../utils/common";

const CharacterOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const formik = useFormik({
    initialValues: {
      sort: "",
      name: "",
      tags: [],
    } as SortFitlerProps,
    onSubmit: (values) => {},
  });
  const { character, combos } = useAppSelector((state) => {
    const character = state.characters.find((e) => e.id === parseInt(id));
    const combos = state.combos.filter((e) => e.character === parseInt(id));
    return { character, combos };
  });
  const { push } = useHistory();
  return (
    <FormikProvider value={formik}>
      <div className="character">
        <CharacterBg character={character} />
        <div className="container">
          <div className="row align-center space-between m-b-10 p-t-10">
            <div className="col-md-6">
              <h1 className="impact">{character?.name}</h1>
            </div>
            <div className="col-md-0">
              <div className="row align-center space-between">
                <div className="col-md-0">
                  <IconButton
                    onClick={() => {
                      push(`/combo/new/${character?.id}`);
                    }}
                    icon={faPlus}
                  >
                    New Combo
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row align-center">
                <div className="col-md-4">
                  <TextInput name="name" placeholder="Name" />
                </div>
                <div className="col-md-4">
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
                </div>
                <div className="col-md-4">
                  <TagInput
                    style={{ minWidth: "256px" }}
                    name="tags"
                    placeholder="Filter tags"
                  />
                </div>
              </div>
            </div>
          </div>
          {!Boolean(combos.length) && (
            <div>
              <h1>No combos for {character?.name}</h1>
            </div>
          )}
          {sortAndFilter(combos)(formik.values).map((e, i) => {
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
