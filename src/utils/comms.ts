import { ipcRenderer } from "electron";
import { toast } from "react-toastify";

export const openModalAt = (location: string) => {
  ipcRenderer.invoke("open-combo", location);
};

export const saveCombo = (data: string, title: string = "Combo") => {
  ipcRenderer.invoke("save-combo", data, title);
};

const toastListener = (event: any, data: any) => toast(data);

export const notificationService = () => {
  ipcRenderer.on("notification", toastListener);
  () => ipcRenderer.off("notification", toastListener);
};

export const fileOpen = (cb: (reply: any) => any) => {
  ipcRenderer.on("get-opened-files", cb);
  () => ipcRenderer.off("notification", cb);
};
