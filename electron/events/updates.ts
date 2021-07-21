import { BrowserWindow, dialog, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";

const updates = (mainWindow: BrowserWindow, __dirname: string) => {
  ipcMain.on("checkUpdates", (event) => {
    // const window = BrowserWindow.fromId(event.frameId)
    autoUpdater.setFeedURL({
      provider: "github",
      owner: "alekangelov",
      vPrefixedTagName: true,
      host: "github.com",
      protocol: "https",
      token: "",
    });

    autoUpdater.on("update-downloaded", () => {
      if (process.env.NODE_ENV === "production") {
        event.sender.send("updateResponse", true);
      }
    });
  });
  ipcMain.on("doUpdate", (event) => {
    console.log("update this shit");
  });
};

export default updates;
