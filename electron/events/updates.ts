import { BrowserWindow, dialog, ipcMain, app } from "electron";
import { autoUpdater, ProgressInfo } from "electron-updater";
import * as path from "path";

autoUpdater.logger = require("electron-log");

(autoUpdater.logger as any).transports.file.level = "info";

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

const updates = (mainWindow: BrowserWindow, __dirname: string) => {
  ipcMain.on("checkUpdates", (event) => {
    const window = BrowserWindow.fromId(event.frameId);
    const getUpdates = async () => {
      try {
        const updates = await autoUpdater.checkForUpdates();
      } catch (e) {
        console.log("UPDATE ERROR");
        console.error(e);
      }
    };
    if (process.env.NODE_ENV !== "development") {
      getUpdates();
    } else {
      autoUpdater.updateConfigPath = path.resolve(
        __dirname,
        "../../dev-app-update.yml"
      );
      getUpdates().catch((e) => {
        console.error(e);
      });
    }
  });
  ipcMain.on("doUpdate", (event) => {
    try {
      if (process.env.NODE_ENV !== "development") {
        setImmediate(() => autoUpdater.quitAndInstall());
      }
    } catch (e) {
      dialog.showErrorBox("Error", "Failed to install updates");
    }
  });
  autoUpdater.on("error", (info) => {
    console.error(info);
  });

  autoUpdater.on("update-downloaded", (info) => {
    mainWindow.webContents.send("updateResponse", true);
  });
  autoUpdater.on("download-progress", (progressObj: ProgressInfo) => {
    mainWindow.webContents.send("downloadProgress", progressObj.percent);
  });
};

export default updates;
