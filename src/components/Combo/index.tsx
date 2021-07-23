import * as React from "react";
import { useHistory, useParams } from "react-router";
import useAppSelector from "../../global/helpers/useAppSelector";
import CharacterBg from "../CharacterBg";
import { Formik, Form } from "formik";
import { TextInput, TagInput } from "../FormComponents";
import IconButton from "../IconButton";
import { faPlus, faRedo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Combo } from "../../global/reducers/mainReducerTypes";
import * as yup from "yup";
import ComboPreview from "../ComboSuite/ComboPreview";
import ComboTable from "../ComboSuite/ComboTable";
import useAction from "../../global/helpers/useAction";
import {
  addCombo,
  editCombo,
  removeCombo,
} from "../../global/actions/mainActions";
import { truthy } from "../../utils/common";

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
  const { character, combo } = useAppSelector((state) => {
    const character = state.characters.find(
      (e) => e.id === parseInt(selectedCharacter)
    );
    const combo = state.combos.find((e, i) => {
      return e.id === selectedCombo;
    });
    return { character, combo };
  });
  const addComboAction = useAction(addCombo);
  const removeComboAction = useAction(removeCombo);
  const editComboAction = useAction(editCombo);
  const { push } = useHistory();
  const handleSubmit = React.useCallback((values) => {
    const finalCombo = {
      ...values,
      character: character?.id || 0,
    };
    if (combo) {
      editComboAction(finalCombo);
    } else {
      addComboAction(finalCombo);
    }
    push(`/character/${character?.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="character">
      <CharacterBg character={character} />
      <div className="container">
        <div className="character-header">
          <h1 className="impact">NEW COMBO: {character?.name}</h1>
        </div>
        <div className="m-t-5">
          <Formik
            initialValues={combo || initialValues}
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
              inputs: yup
                .string()
                .required("That's the main point of this whole shabang."),
            })}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
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
                    <ComboTable
                      onClick={(e) => {
                        formik.setFieldValue(
                          "inputs",
                          `${formik.values.inputs} ${e}`
                        );
                      }}
                    />
                    <div className="col-md-12">
                      <h2>Preview</h2>
                      <ComboPreview
                        combo={formik.values.inputs}
                        name={formik.values.name}
                        tags={formik.values.tags}
                        num={1}
                        damage={formik.values.damage}
                      />
                    </div>
                  </div>
                  <div className="row m-t-5">
                    <div className="col-md-2 d-flex">
                      <IconButton type="submit" className="m-r-4" icon={faPlus}>
                        Submit
                      </IconButton>
                      <IconButton
                        className="m-r-4"
                        type="reset"
                        onClick={(e) => {
                          e.preventDefault();
                          formik.resetForm();
                        }}
                        icon={faRedo}
                      >
                        Reset
                      </IconButton>
                      {truthy(combo) && (
                        <IconButton
                          type="reset"
                          onClick={(e) => {
                            e.preventDefault();
                            removeComboAction(combo);
                            push(`/character/${character?.id}`);
                          }}
                          icon={faTrash}
                        >
                          Delete
                        </IconButton>
                      )}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewEditCombo;
