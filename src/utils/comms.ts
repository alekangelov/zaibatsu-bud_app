import { ipcRenderer } from "electron";
import { toast } from "react-toastify";
import { confirm } from "react-alert-async";

export const sendUpdate = () => ipcRenderer.send("doUpdate");

export const openModalAt = (location: string) => {
  ipcRenderer.invoke("open-combo", location);
};

export const saveCombo = (data: string, title: string = "Combo") => {
  ipcRenderer.invoke("save-combo", data, title);
};

const toastListener = (event: any, data: any) => toast(data);

const downloadListener = (event: any, data: number) => console.log(data);

const updateListener = (event: any, data: boolean) =>
  data &&
  confirm(
    "In order to keep everything neat, tidy and up to date. We encourage you to hit that update button!",
    {
      title: "⚙ Update avalable",
      className: "Jakoto",
    }
  ).then((e) => sendUpdate());

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
  ipcRenderer.on("downloadProgress", downloadListener);
  return () => {
    ipcRenderer.off("updateResponse", updateListener);
    ipcRenderer.off("downloadProgress", downloadListener);
  };
};

const envListener = (event: any, env: string) =>
  console.log(`IPC Main Env: ${env}`);

export const envService = () => {
  ipcRenderer.send("getNodeEnv");
  ipcRenderer.on("NODE_ENV", envListener);
  return () => {
    ipcRenderer.off("NODE_ENV", envListener);
  };
};
