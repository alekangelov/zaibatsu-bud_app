import * as React from "react";
import {
  faChevronLeft,
  faFileExport,
  faFileImport,
  faHome,
  faInfoCircle,
  faTimes,
  faWindowMaximize,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ipcRenderer } from "electron";
import Menu from "./Menu";
import { useHistory, useLocation } from "react-router";
import { useComboView } from "../../utils/hooks/isComboView";

const onMinimize = () => {
  return ipcRenderer.invoke("minimize");
};
const onMaximize = () => {
  return ipcRenderer.invoke("maximize");
};
const onClose = () => {
  return ipcRenderer.invoke("close");
};

export default function TopBar() {
  const location = useLocation();
  const { push, goBack } = useHistory();
  const comboView = useComboView();
  if (comboView) {
    return (
      <div className="topbar transparent">
        <div className="topbar-icons">
          <button className="topbar-icons__single" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} color="white" />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="topbar">
      <Menu
        menu={[
          {
            disabled: location.pathname === "/",
            title: <FontAwesomeIcon icon={faChevronLeft} color="white" />,
            onClick: (event) => {
              event.preventDefault();
              goBack();
            },
          },
          {
            disabled: location.pathname === "/",
            title: <FontAwesomeIcon icon={faHome} color="white" />,
            onClick: (event) => {
              event.preventDefault();
              push("/");
            },
          },
          {
            title: <FontAwesomeIcon icon={faFileImport} color="white" />,
            onClick: (event) => {
              event.preventDefault();
              push("/import");
            },
          },
          {
            title: <FontAwesomeIcon icon={faFileExport} color="white" />,
            onClick: (event) => {
              event.preventDefault();
              push("/export");
            },
          },
          {
            title: <FontAwesomeIcon icon={faInfoCircle} color="white" />,
            onClick: (event) => {
              event.preventDefault();
              push("/about");
            },
          },
        ]}
      />
      <div className="topbar-brand">
        <h3>Zaibatsu Bud</h3>
      </div>
      <div className="topbar-icons">
        <button className="topbar-icons__single" onClick={onMinimize}>
          <FontAwesomeIcon icon={faWindowMinimize} color="white" />
        </button>
        <button className="topbar-icons__single" onClick={onMaximize}>
          <FontAwesomeIcon icon={faWindowMaximize} color="white" />
        </button>
        <button className="topbar-icons__single" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} color="white" />
        </button>
      </div>
    </div>
  );
}
