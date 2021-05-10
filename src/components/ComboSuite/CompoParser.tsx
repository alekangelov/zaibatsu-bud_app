import * as React from "react";
import { pipe, trim, split } from "ramda";
import {
  suffixAndSort,
  mapIndexed,
  truthyFilter,
  replaceAll,
} from "../../utils/common";
import getPublic from "../../utils/getPublic";
import comboVars from "./inputs";

const STRING_URL = "/static/stringBuilder/";

const comboTransform = (pure: boolean = false) => (e: string, i: number) => {
  const parse = (() => {
    if (e.includes("+")) {
      const newContent = suffixAndSort(e);
      if (comboVars.all.includes(newContent)) {
        return {
          type: "svg",
          content: newContent + ".svg",
        };
      }
    }
    if (e.toLowerCase().includes("rage") || e.toLowerCase().includes("drive")) {
      return {
        type: `tooltip ${e.toLowerCase().includes("drive") ? "drive" : ""} ${
          e.toLowerCase().includes("rage") ? "rage" : ""
        }`.trim(),
        content: e.toUpperCase(),
      };
    }
    if (comboVars.all.includes(e)) {
      return {
        type: "svg",
        content: suffixAndSort(e) + ".svg",
      };
    }
    if (e === ",") {
      return {
        type: "next",
        content: "next.svg",
      };
    }
    if (e.includes("/")) {
      return {
        type: "svg",
        content: suffixAndSort(e.replace("/", "")) + ".svg",
      };
    }
    if (typeof e !== "undefined" && Boolean(e)) {
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
          alt={parse.content}
          key={i + "comboPreview"}
          className={className || ""}
          src={getPublic(`${STRING_URL}${parse.content}`)}
        />
      );
    case "next":
      return (
        <img
          alt={parse.content}
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
    replaceAll(",", " , "),
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
