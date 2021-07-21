import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik, useFormikContext } from "formik";
import * as React from "react";
import useAppSelector from "../../global/helpers/useAppSelector";
import { filterLowercaseTags } from "../../utils/common";
import { saveCombo } from "../../utils/comms";
import ComboPreview from "../ComboSuite/ComboPreview";
import { TextInput, SelectInput } from "../FormComponents";
import IconButton from "../IconButton";
import dayjs from "dayjs";

const ExportInner = () => {
  const {
    values: { tag, character, name },
  } = useFormikContext<{
    tag: string;
    character: Number;
    name: string;
  }>();
  const { characterSelectItems, filteredCombos } = useAppSelector((state) => ({
    characterSelectItems: [
      { label: "All", value: -1 },
      ...state.characters.map((e) => ({
        label: e.name,
        value: e.id,
      })),
    ],
    filteredCombos: state.combos.filter((e) => {
      const condition = !tag
        ? true
        : filterLowercaseTags(tag)(e.tags) &&
          e.name.toLowerCase().includes(name.toLowerCase()) &&
          character === -1
        ? true
        : e.character === character;
      return condition;
    }),
  }));
  return (
    <div className="export m-t-5">
      <div className="export-filter m-b-5">
        <div className="row">
          <div className="col-md-4">
            <TextInput name="name" label="Name" />
          </div>
          <div className="col-md-4">
            <SelectInput
              name="character"
              label="Character"
              items={characterSelectItems}
            />
          </div>
          <div className="col-md-4">
            <TextInput name="tag" label="Tag" />
          </div>
        </div>
      </div>
      <div className="export-combos">
        {filteredCombos.map((e, i) => (
          <div className="m-b-5" key={e.id}>
            <ComboPreview combo={e.inputs} num={i + 1} name={e.name} />
          </div>
        ))}
      </div>
      <div className="m-t-5 m-b-10">
        <IconButton
          icon={faFileExport}
          onClick={() =>
            saveCombo(
              JSON.stringify(filteredCombos),
              `Zaibatsu-Combos_${dayjs(new Date()).format(
                "YYYY-MM-DDTHH:mm:ssZ[Z]"
              )}.zaic`
            )
          }
        >
          Export Combos
        </IconButton>
      </div>
    </div>
  );
};

const Export: React.FC = () => {
  return (
    <div className="container">
      <h1 className="m-t-5 impact">Export combos</h1>
      <Formik
        onSubmit={(values) => {
          console.log(values);
        }}
        initialValues={{ tag: "", character: 0, name: "" }}
      >
        <Form>
          <ExportInner />
        </Form>
      </Formik>
    </div>
  );
};

export default Export;
