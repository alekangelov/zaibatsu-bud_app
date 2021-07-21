import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { importCombos } from "../../global/actions/mainActions";
import useAction from "../../global/helpers/useAction";
import { Combo } from "../../global/reducers/mainReducerTypes";
import { parseJsonFromFile, validateCombos } from "../../utils/common";
import ComboPreview from "../ComboSuite/ComboPreview";
import IconButton from "../IconButton";

const Import: React.FC = () => {
  const [forImport, setForImport] = React.useState<Combo[]>([]);
  const onDrop = React.useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length) {
      try {
        const combos = (await parseJsonFromFile(acceptedFiles[0])) as Combo[];
        if (validateCombos(combos)) {
          throw new Error("wrong");
        }
        setForImport(combos);
      } catch (e) {
        toast(
          e.message === "wrong"
            ? "Combos aren't valid!"
            : "Doesn't look like a combo file!"
        );
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".zaic",
    maxFiles: 1,
  });
  const { push } = useHistory();
  const importCombosAction = useAction(importCombos);
  return (
    <div className="container">
      <header>
        <h1 className="impact m-t-5 m-b-5">Import Combos</h1>
      </header>
      <div>
        <div
          className={clsx(
            "form-control form-control__dropzone m-b-5",
            isDragActive && "dragging"
          )}
          {...getRootProps()}
        >
          <input type="file" name="input" id="dropzone" {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </div>
      <div>
        {forImport.map((e, i) => (
          <div key={e.id} className="m-b-5">
            <ComboPreview
              num={i + 1}
              combo={e.inputs}
              name={e.name}
              tags={e.tags}
              damage={e.damage}
            />
          </div>
        ))}
      </div>
      <div className="m-b-5">
        <IconButton
          onClick={() => {
            importCombosAction(forImport);
            push("/");
          }}
          icon={faFileImport}
        >
          Import Combos
        </IconButton>
      </div>
    </div>
  );
};

export default Import;
