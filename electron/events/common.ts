import { BrowserWindow, dialog, ipcMain, screen, app } from "electron";
import * as fs from "fs";
import { buildURL } from "../main";

function percentage(num: number, per: number) {
  return (num / 100) * per;
}

type NWOpen = {
  x: number;
  y: number;
  width: number;
  height: number;
  onTop: boolean;
};

const makeNewWindow = (
  atPath = "",
  options: NWOpen,
  __dirname: string,
  transparent: boolean
) => {
  const DEFAULTS: Electron.BrowserWindowConstructorOptions = {
    width: options.width,
    height: options.height,
    frame: false,
    transparent,
    x: options.x,
    y: options.y,
    alwaysOnTop: options.onTop,
    webPreferences: {
      // allowRunningInsecureContent: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  };
  let mainWindow: BrowserWindow;
  mainWindow = new BrowserWindow({
    ...DEFAULTS,
  });

  // const menu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(menu);
  mainWindow.loadURL(buildURL(atPath));
  return mainWindow;
};

function common(mainWindow: BrowserWindow, __dirname: string) {
  ipcMain.handle("minimize", (event) => {
    const window = BrowserWindow.fromId(event.frameId);
    window.minimize();
  });
  ipcMain.handle("maximize", (event) => {
    const window = BrowserWindow.fromId(event.frameId);
    if (window.isMaximized()) {
      return window.restore();
    }
    return window.maximize();
  });
  ipcMain.handle("close", (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window.close();
    // mainWindow.close();
  });
  ipcMain.handle("save-combo", (event, data, title = "Combo.zaic") => {
    const options: Electron.SaveDialogOptions = {
      title: "Save Combo",
      buttonLabel: "Save",
      defaultPath: title,
      filters: [{ name: "Tekken Combo", extensions: ["zaic"] }],
    };
    dialog.showSaveDialog(null, options).then(({ filePath }) => {
      fs.writeFileSync(filePath, data, "utf-8");
    });
    event.sender.send("notification", "Combo Exported!");
  });
  ipcMain.handle("open-combo", (event, arg: string) => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const DIMENSIONS: NWOpen = {
      width: percentage(primaryDisplay.bounds.width, 90),
      height: 150,
      x: percentage(primaryDisplay.bounds.width, 10) / 2,
      y: 200,
      onTop: true,
    };
    const window = makeNewWindow(arg, DIMENSIONS, __dirname, true);
  });
  ipcMain.on("getNodeEnv", (event) => {
    console.log("nodeenv: " + process.env.NODE_ENV || "production");
    event.sender.send("NODE_ENV", process.env.NODE_ENV || "production");
  });
  ipcMain.on("getVersion", (event) => {
    console.log("version: " + process.env.npm_package_version);
    event.sender.send("VERSION", app.getVersion());
  });
}

export default common;
