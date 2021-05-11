import clsx from "clsx";
import * as React from "react";
import { useComboView } from "../utils/hooks/isComboView";

export const RouterRoot: React.FC = ({ children }) => {
  const comboView = useComboView();
  return (
    <div className={clsx("router-root", comboView && "combo-view-exclusive")}>
      {children}
    </div>
  );
};
