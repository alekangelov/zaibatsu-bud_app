import { BrowserWindow, dialog, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";

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
        console.log({ updates });
        event.sender.send("updateResponse", true);
      } catch (e) {
        console.error(e);
      }
    };
    getUpdates();
  });
  ipcMain.on("doUpdate", (event) => {
    autoUpdater.quitAndInstall();
  });
};

export default updates;
