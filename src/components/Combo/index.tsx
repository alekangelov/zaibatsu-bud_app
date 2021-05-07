import * as React from "react";
import { useParams } from "react-router";
import useAppSelector from "../../global/helpers/useAppSelector";
import CharacterBg from "../CharacterBg";
import { Formik, Form } from "formik";
import { TextInput, TagInput } from "../FormComponents";
import IconButton from "../IconButton";
import { faPlus, faRedo } from "@fortawesome/free-solid-svg-icons";
import { Combo } from "../../global/reducers/mainReducer";
import * as yup from "yup";
import { nanoid } from "nanoid";
import ComboPreview from "../ComboSuite/ComboPreview";

const initialValues: Combo = {
  id: "",
  name: "",
  character: 0,
  damage: 0,
  inputs: "",
  tags: [],
};

const NewEditCombo: React.FC<any> = () => {
  const { character: selectedCharacter, combo: selectedCombo } = useParams<{
    character: string;
    combo: string;
  }>();
  const { character } = useAppSelector((state) => {
    const character = state.characters.find(
      (e) => e.id === parseInt(selectedCharacter)
    );
    const combo = state.combos.find((e) => (e.id = selectedCombo));
    return { character, combo };
  });
  return (
    <div className="character">
      <CharacterBg character={character} />
      <div className="container">
        <div className="character-header">
          <h1 className="impact">NEW COMBO: {character?.name}</h1>
        </div>
        <div className="m-t-5">
          <Formik
            initialValues={initialValues}
            validationSchema={yup.object().shape({
              name: yup.string().required("The combo has to have a name!"),
              damage: yup
                .number()
                .typeError(
                  "Damage dealt is usually measured in hit POINTS (aka numbers)."
                )
                .min(1, "A combo does at least 0 damage.")
                .required("I mean, this is the whole point"),
              tags: yup
                .array()
                .of(yup.string())
                .min(1, "At least one tag, please."),
            })}
            onSubmit={(values) => {
              const finalCombo: Combo = {
                ...values,
                ...{ id: nanoid(), character: character?.id || 0 },
              };
              console.log(finalCombo);
            }}
          >
            {(formik) => (
              <Form>
                <div className="row">
                  <TextInput
                    parentClassName="col-md-4"
                    name="name"
                    label="Name"
                  />
                  <TextInput
                    parentClassName="col-md-4"
                    name="damage"
                    label="Damage"
                  />
                  <TagInput
                    parentClassName="col-md-4"
                    name="tags"
                    label="Tags (hit enter after each tag)"
                  />
                  <TextInput
                    parentClassName="col-md-12"
                    name="inputs"
                    label="Combo string"
                  />
                  <div className="col-md-12">
                    <ComboPreview combo={formik.values.inputs as string} />
                  </div>
                </div>
                <div className="row m-t-5">
                  <div className="col-md-2 d-flex">
                    <IconButton type="submit" className="m-r-4" icon={faPlus}>
                      Submit
                    </IconButton>
                    <IconButton
                      type="reset"
                      onClick={(e) => {
                        e.preventDefault();
                        formik.resetForm();
                      }}
                      icon={faRedo}
                    >
                      Reset
                    </IconButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewEditCombo;
