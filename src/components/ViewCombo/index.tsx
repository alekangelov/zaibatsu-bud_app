import * as React from "react";
import { useHistory, useParams } from "react-router";
import useAppSelector from "../../global/helpers/useAppSelector";
import { propOrFalse } from "../../utils/common";
import ComboPreview from "../ComboSuite/ComboPreview";
import useHotkeys from "@reecelucas/react-use-hotkeys";

const ViewCombo: React.FC = () => {
  const { combo: comboId } = useParams<{ combo: string }>();
  console.log({ comboId });
  const { push } = useHistory();
  const { currentCombo, nextCombo, previousCombo } = useAppSelector((state) => {
    const currentCombo = state.combos.find((e) => e.id === comboId);
    if (!currentCombo) {
      return {
        currentCombo: undefined,
        nextCombo: undefined,
        previousCombo: undefined,
      };
    }
    const combosForCharacter = state.combos.filter(
      (e) => e.character === currentCombo?.character
    );
    const currentComboIndex = combosForCharacter.findIndex(
      (e) => e.id === currentCombo?.id
    );
    const nextCombo = propOrFalse(
      `${currentComboIndex + 1}`,
      combosForCharacter
    );
    const previousCombo = propOrFalse(
      `${currentComboIndex - 1}`,
      combosForCharacter
    );
    return { currentCombo, nextCombo, previousCombo };
  });
  useHotkeys("ArrowDown", () => {
    if (nextCombo) {
      console.log(currentCombo?.id, nextCombo.id);
      push(`/combo-view/${nextCombo.id}`);
    }
  });
  useHotkeys("ArrowUp", () => {
    if (previousCombo) {
      console.log(currentCombo?.id, previousCombo.id);

      push(`/combo-view/${previousCombo.id}`);
    }
  });
  React.useEffect(() => {
    document.body.classList.add("exclusive");
    return () => {
      document.body.classList.remove("exclusive");
    };
  }, []);
  if (!currentCombo) return null;
  return (
    <ComboPreview
      combo={currentCombo.inputs}
      num={1}
      name={currentCombo.name}
      comboView
    />
  );
};

export default ViewCombo;
