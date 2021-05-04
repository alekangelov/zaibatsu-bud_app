import { ipcMain, remote } from "electron";

function common() {
  ipcMain.handle("close-app", () => {
    console.log(remote);
    const window = remote.getCurrentWindow();
    if (window.closable) {
      window.close();
    }
  });
}

export default common;
