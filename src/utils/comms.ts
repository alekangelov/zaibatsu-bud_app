import { ipcRenderer } from "electron";
import { toast } from "react-toastify";
import UpdateAvalable from "../components/util/UpdateAvalable";
import { confirm } from "react-alert-async";

export const openModalAt = (location: string) => {
  ipcRenderer.invoke("open-combo", location);
};

export const saveCombo = (data: string, title: string = "Combo") => {
  ipcRenderer.invoke("save-combo", data, title);
};

const toastListener = (event: any, data: any) => toast(data);

const updateListener = (event: any, data: boolean) =>
  data &&
  confirm(
    "In order to keep everything neat, tidy and up to date. We encourage you to hit that update button!",
    {
      title: "⚙ Update avalable",
      className: "Jakoto",
    }
  );

export const notificationService = () => {
  ipcRenderer.on("notification", toastListener);
  return () => {
    ipcRenderer.off("notification", toastListener);
  };
};

export const fileOpen = (cb: (reply: any) => any) => {
  ipcRenderer.on("get-opened-files", cb);
  return () => {
    ipcRenderer.off("get-opened-files", cb);
  };
};

export const updateService = () => {
  ipcRenderer.send("checkUpdates");
  ipcRenderer.on("updateResponse", updateListener);
  return () => {
    ipcRenderer.off("updateResponse", updateListener);
  };
};

export const sendUpdate = () => ipcRenderer.send("doUpdate");
