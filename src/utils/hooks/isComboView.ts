import * as React from "react";
import { useHistory } from "react-router";

export const useComboView = () => {
  const { location } = useHistory();
  return location.pathname.includes("combo-view");
};
