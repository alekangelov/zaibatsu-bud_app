import { ipcRenderer } from "electron";
import { toast } from "react-toastify";

export const openModalAt = (location: string) => {
  ipcRenderer.send("open-combo", location);
};

export const saveCombo = (data: string, title: string = "Combo") => {
  ipcRenderer.send("save-combo", data, title);
};

const toastListener = (event: any, data: any) => toast(data);

export const notificationService = () => {
  ipcRenderer.on("notification", toastListener);
  () => ipcRenderer.off("notification", toastListener);
};
