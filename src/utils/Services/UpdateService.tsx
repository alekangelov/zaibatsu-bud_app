import * as React from "react";
import { updateService } from "../comms";

export default function UpdateService() {
  React.useEffect(() => {
    const initiatedService = updateService();
    return initiatedService;
  }, []);
  return null;
}
