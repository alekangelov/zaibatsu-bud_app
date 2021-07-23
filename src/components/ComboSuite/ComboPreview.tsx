import clsx from "clsx";
import * as React from "react";
import { Tags } from "../../data/tags";
import getPublic from "../../utils/getPublic";
import { useComboParser } from "./CompoParser";

interface ComboPreviewProps {
  combo: string;
  name: string;
  damage?: number | string;
  num?: number | string;
  tags?: Tags;
  comboView?: boolean;
}

const ComboPreview: React.FC<ComboPreviewProps> = React.memo(
  ({ combo, name, damage, num, tags = [], comboView = false }) => {
    const parsedCombo = useComboParser(combo, true);
    return (
      parsedCombo && (
        <div className={clsx("combo-preview", comboView && "exclusive")}>
          <span className="combo-preview_num">{num}</span>
          <div className="combo-preview_header">
            <div className="row align-center">
              <div className="col-md-7">
                <h2>{name}</h2>
              </div>
              <div className="col-md-5">
                <p>{damage} damage</p>
              </div>
            </div>
          </div>
          <div className="combo-preview_inner">
            {parsedCombo.map((e, i) => (
              <span
                key={`${e.content}-${i}`}
                className={clsx("combo-preview_single", e.type)}
              >
                {e.type.includes("tooltip") ? (
                  e.content
                ) : (
                  <img
                    src={getPublic(`/images/stringBuilder/${e.content}`)}
                    alt={e.content}
                  />
                )}
              </span>
            ))}
          </div>
          {Boolean(tags.length) && (
            <div className="combo-preview_tags">
              <div className="tags-inner">
                {tags.map((e, i) => (
                  <span key={i + "tags"} className="tags-single">
                    {e.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    );
  }
);

export default ComboPreview;
