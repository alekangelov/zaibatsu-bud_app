import * as React from "react";
import { capitalCase } from "change-case";
import inputs from "./inputs";
import { keys } from "ramda";
import IconButton from "../IconButton";
import {
  faChevronDown,
  faChevronUp,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import getPublic from "../../utils/getPublic";
import { suffixAndSort } from "../../utils/common";

interface TableProps {
  onClick: (input: string) => any;
  initialOpen?: boolean;
}

const inputKeys = keys(inputs);
const isNotFilter = (e: string) =>
  e !== "," && e !== "*" && e !== "nextuc" && e !== "N";

const ComboTable: React.FC<TableProps> = ({ onClick, initialOpen = false }) => {
  const [table, setTable] = React.useState<keyof typeof inputs>(inputKeys[0]);
  const setTableHeader = React.useRef(
    (toWhat: keyof typeof inputs) => () => setTable(toWhat)
  );
  const [open, setOpen] = React.useState<boolean>(initialOpen);
  const toggle = React.useRef(() => setOpen((state) => !state));
  const sendOnClick = React.useCallback(
    (sendWhat: string) => () => onClick(sendWhat),
    [onClick]
  );
  return (
    <div className="combo-table-wrapper col-md-12">
      <div className="combo-header-title">
        <div className="row space-between align-center">
          <div className="col-md-9">
            <p>Combo Table Input</p>
          </div>
          <div className="col">
            <IconButton
              type={"button"}
              icon={open ? faChevronUp : faChevronDown}
              onClick={toggle.current}
            >
              {!open ? "Open" : "Close"}
            </IconButton>
          </div>
        </div>
      </div>
      <div className={clsx("combo-table", open && "open")}>
        <div className={"combo-table-header"}>
          {inputKeys.map((e, i) => (
            <div
              onClick={setTableHeader.current(e)}
              className={clsx(
                "combo-table-header__single",
                table === e && "active"
              )}
              key={`${e}${i}__combosingle`}
            >
              {capitalCase(e)}
            </div>
          ))}
        </div>
        <div className="combo-table-grid">
          {inputs[table].map(
            (e, i) =>
              isNotFilter(e) && (
                <div
                  className={"combo-table-grid__single"}
                  key={`${e}${i}__combosingle`}
                  onClick={sendOnClick(e)}
                >
                  <img
                    src={getPublic(
                      `/images/stringBuilder/${suffixAndSort(e)}.svg`
                    )}
                  />
                </div>
              )
          )}
          <div onClick={sendOnClick(",")} className="combo-table-grid__single">
            <img src={getPublic(`/images/stringBuilder/next.svg`)} />
          </div>
          <div onClick={sendOnClick("N")} className="combo-table-grid__single">
            <img src={getPublic(`/images/stringBuilder/nuc.svg`)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboTable;
