import * as React from "react";
import { useComboParser } from "./CompoParser";

const ComboPreview: React.FC<{ combo: string }> = ({ combo }) => {
  const parsedCombo = useComboParser(combo, true);
  console.log(parsedCombo, combo);
  return (
    parsedCombo && (
      <>
        {parsedCombo.map((e) => (
          <span>
            {e.type} : {e.content}
          </span>
        ))}
      </>
    )
  );
};

export default ComboPreview;
