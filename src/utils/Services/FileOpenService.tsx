import * as React from "react";
import { useHistory } from "react-router";
import { fileOpen } from "../comms";

export default function FileOpenService() {
  const { push } = useHistory();
  const cb = (reply: any) => {
    console.log(reply);
  };
  React.useEffect(() => {
    const initiatedService = fileOpen(cb);
    return initiatedService;
  }, []);
  return null;
}
