import {
  faTimes,
  faWindowMaximize,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { remote } from "electron";

const getWindow = () => remote.getCurrentWindow();

export default function TopBar() {
  const currentWindow = React.useRef(getWindow());
  const onMinimize = () => {
    return currentWindow.current.minimize();
  };
  const onMaximize = () => {
    if (currentWindow.current.isMaximized())
      return currentWindow.current.restore();
    return currentWindow.current.maximize();
  };
  const onClose = () => {
    return currentWindow.current.close();
  };
  return (
    <div className="topbar">
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
