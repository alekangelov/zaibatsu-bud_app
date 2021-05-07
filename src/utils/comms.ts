import { ipcRenderer } from "electron";

export const openModalAt = (location: string) => {
  ipcRenderer.send("open-combo", location);
};
