import * as React from "react";
import { pipe, trim, split, join } from "ramda";
import {
  ifUpperCaseAddSuffix,
  mapIndexed,
  truthy,
  truthyFilter,
} from "../../utils/common";
import getPublic from "../../utils/getPublic";
import comboVars from "./inputs";

const STRING_URL = "/static/stringBuilder/";

const comboTransform = (pure: boolean = false) => (e: string, i: number) => {
  const parse = (() => {
    if (comboVars.all.includes(e)) {
      return {
        type: "svg",
        content: ifUpperCaseAddSuffix(e) + ".svg",
      };
    } else if (e === ",") {
      return {
        type: "next",
        content: "next.svg",
      };
    } else if (e.includes("/")) {
      return {
        type: "svg",
        content: ifUpperCaseAddSuffix(e.replace("/", "")) + ".svg",
      };
    } else if (typeof e !== "undefined" && Boolean(e)) {
      return {
        type: "tooltip",
        content: e,
      };
    }
  })();
  if (!parse) return null;
  if (pure) return parse;
  const isAttack = comboVars.attacks.includes(
    parse.content.replace(".svg", "")
  );
  const isMovement = comboVars.movement.includes(
    parse.content.replace(".svg", "")
  );
  const className = (isAttack && "attack") || (isMovement && "movement");
  switch (parse.type) {
    case "svg":
      return (
        <img
          key={i + "comboPreview"}
          className={className || ""}
          src={getPublic(`${STRING_URL}${parse.content}`)}
        />
      );
    case "next":
      return (
        <img
          key={i + e + "comboPreview"}
          className="next"
          src={getPublic(`${STRING_URL}${parse.content}`)}
        />
      );
    case "tooltip":
      return (
        <span key={i + e + "comboPreview"} className="tooltip">
          {parse.content}
        </span>
      );
    default:
      return (
        <span key={i + e + "comboPreview"} className="tooltip">
          unknown
        </span>
      );
  }
};

interface ParserProps {
  combo: string;
  pure?: boolean;
}

type pureCombo = {
  type: "svg" | "next" | "tooltip";
  content: string;
};

type PureOrElement<T extends boolean> = T extends boolean
  ? pureCombo[]
  : Element[];

const comboParser = <A extends string, T extends boolean>(combo: A, pure: T) =>
  (pipe(
    trim,
    split(","),
    join(" , "),
    split(" "),
    truthyFilter,
    mapIndexed(comboTransform(pure) as any)
  )(combo) as unknown) as PureOrElement<T>;

const useComboParser = (
  combo: ParserProps["combo"],
  pure?: ParserProps["pure"]
) => {
  const comboParsed = React.useMemo(() => comboParser(combo, pure || false), [
    combo,
    pure,
  ]);
  return comboParsed;
};

export { useComboParser };
