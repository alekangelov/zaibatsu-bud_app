import * as React from "react";
import { pipe, trim, split, join } from "ramda";
import { truthy, truthyFilter } from "../../utils/common";
import getPublic from "../../utils/getPublic";
import comboVars from "./inputs";

const STRING_URL = "/static/stringBuilder/";

interface ParserProps {
  combo: string;
  pure?: boolean;
}

type ComboParser = (props: ParserProps) => Element[];

const comboParser = pipe(
  trim,
  split(","),
  join(" , "),
  split(" "),
  truthyFilter
);

const ComboParser: ComboParser = ({ combo, pure = false }) => {
  if (!combo) {
    return null;
  }
  return combo
    .trim()
    .split(",")
    .join(" , ")
    .split(" ")
    .filter(truthy)
    .map((e, i) => {
      const parse = (() => {
        if (comboVars.all.includes(e)) {
          return {
            type: "svg",
            content: e + ".svg",
          };
        } else if (e === ",") {
          return {
            type: "next",
            content: "Next.svg",
          };
        } else if (e.includes("/")) {
          return {
            type: "svg",
            content: e.replace("/", "") + ".svg",
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
    })
    .filter(truthy);
};
