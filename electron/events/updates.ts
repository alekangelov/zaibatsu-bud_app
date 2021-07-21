import { BrowserWindow, dialog, ipcMain, app } from "electron";
import { autoUpdater } from "electron-updater";
import * as dayjs from "dayjs";

const updates = (mainWindow: BrowserWindow, __dirname: string) => {
  ipcMain.on("checkUpdates", (event) => {
    // const window = BrowserWindow.fromId(event.frameId)
    autoUpdater.setFeedURL({
      provider: "github",
      owner: "alekangelov",
      repo: "zaibatsu-bud_app",
      vPrefixedTagName: true,
      host: "github.com",
      protocol: "http",
      token: process.env.GH_TOKEN,
      releaseType: "draft",
    });
    const getUpdates = async () => {
      try {
        const updates = await autoUpdater.checkForUpdates();
        const downloadpromise = await updates.downloadPromise;
        event.sender.send("updateResponse", true);
      } catch (e) {
        console.error(e);
      }
    };
    getUpdates();
  });
  ipcMain.on("doUpdate", (event) => {
    try {
      autoUpdater.quitAndInstall();
      setTimeout(() => {
        app.relaunch();
        app.exit(0);
      }, 6000);
    } catch (e) {
      dialog.showErrorBox("Error", "Failed to install updates");
    }
  });
};

export default updates;
