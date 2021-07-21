import * as React from "react";
import { envService } from "../comms";

export default function EnvService() {
  React.useEffect(() => {
    const initiatedService = envService();
    return initiatedService;
  }, []);
  return null;
}
