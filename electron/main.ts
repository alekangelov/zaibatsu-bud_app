import { app, BrowserWindow, Menu, screen, remote, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import log from "electron-log";
import * as events from "./events";
const Store = require("electron-store");

const store = new Store();

// import menuTemplate from './menu';

let mainWindow: BrowserWindow | null;

const DIMENSIONS = {
  W: 1280,
  H: 720,
};
const DEFAULTS = {
  width: DIMENSIONS.W,
  height: DIMENSIONS.H,
  frame: process.platform === "linux",
  transparent: false,
  x: 50,
  y: 50,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
  },
};

function createWindow() {
  const displays = screen.getAllDisplays();
  const options = Object.assign({ ...DEFAULTS }, store.get("winBounds"));
  let mainWindow: BrowserWindow;
  mainWindow = new BrowserWindow({
    ...options,
  });

  // const menu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(menu);

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true,
      })
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.on("close", () => {
    store.set("winBounds", mainWindow.getBounds());
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

events.common();
