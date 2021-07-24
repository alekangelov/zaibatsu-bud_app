import * as React from "react";
import { editVersion } from "../../global/actions/aboutActions";
import useAction from "../../global/helpers/useAction";
import { versionService } from "../comms";

export default function VersionService() {
  const action = useAction(editVersion);
  React.useEffect(() => {
    const initiatedService = versionService((event: any, version: string) => {
      action({ version });
    });
    return initiatedService;
  }, [action]);
  return null;
}
