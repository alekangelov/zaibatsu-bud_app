import { BrowserWindow, ipcMain, screen, IpcMainEvent } from "electron";
import * as url from "url";
import * as path from "path";

function percentage(num: number, per: number) {
  return (num / 100) * per;
}

type NWOpen = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const makeNewWindow = (atPath = "", options: NWOpen) => {
  const DEFAULTS = {
    width: options.width,
    height: options.height,
    frame: false,
    transparent: false,
    x: options.x,
    y: options.y,
    webPreferences: {
      allowRunningInsecureContent: true,
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

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL + `/#${atPath}` ||
      url.format({
        pathname: path.join(__dirname, "../index.html/#", atPath),
        protocol: "file:",
        slashes: true,
      })
  );
};

function common(mainWindow: BrowserWindow) {
  ipcMain.on("minimize", (event) => {
    const window = BrowserWindow.fromId(event.frameId);
    window.minimize();
  });
  ipcMain.on("maximize", (event) => {
    const window = BrowserWindow.fromId(event.frameId);
    if (window.isMaximized()) {
      return window.restore();
    }
    return window.maximize();
  });
  ipcMain.on("close", (event) => {
    const window = BrowserWindow.fromId(event.frameId);
    window.close();
    // mainWindow.close();
  });
  ipcMain.on("open-combo", (event, arg: string) => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const displays = screen.getAllDisplays().filter((display, index) => {
      console.log({ display, index });
      return true;
    });
    const DIMENSIONS: NWOpen = {
      width: percentage(primaryDisplay.bounds.width, 90),
      height: 300,
      x: percentage(primaryDisplay.bounds.width, 10) / 2,
      y: 200,
    };
    makeNewWindow(arg, DIMENSIONS);
  });
}

export default common;
