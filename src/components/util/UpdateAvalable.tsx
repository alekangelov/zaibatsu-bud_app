import { faCheck, faStop } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { sendUpdate } from "../../utils/comms";
import IconButton from "../IconButton";

const UpdateAvalable = () => {
  return (
    <div className="row align-center space-between p-r-2">
      Update Avalable
      <div className="row align-center">
        <IconButton
          icon={faCheck}
          className="m-r-1"
          onClick={(e) => {
            e.preventDefault();
            sendUpdate();
          }}
        />
        {/* <IconButton
          icon={faStop}
          className="m-r-1"
          onClick={(e) => {
            e.preventDefault();
            sendUpdate();
          }}
        /> */}
      </div>
    </div>
  );
};

export default UpdateAvalable;
