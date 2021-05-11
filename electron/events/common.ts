import { BrowserWindow, ipcMain, screen } from "electron";
import * as url from "url";
import * as path from "path";
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
  console.log(buildURL(atPath));
  mainWindow.loadURL(buildURL(atPath));
  return mainWindow;
};

function common(mainWindow: BrowserWindow, __dirname: string) {
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
  ipcMain.on("close", (event: any) => {
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
      height: 150,
      x: percentage(primaryDisplay.bounds.width, 10) / 2,
      y: 200,
      onTop: true,
    };
    const window = makeNewWindow(arg, DIMENSIONS, __dirname, true);
  });
}

export default common;
