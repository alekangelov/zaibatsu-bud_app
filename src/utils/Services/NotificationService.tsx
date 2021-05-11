import * as React from "react";
import { notificationService } from "../comms";

export default function NotificationService() {
  React.useEffect(() => {
    const initiatedService = notificationService();
    return initiatedService;
  }, []);
  return null;
}
