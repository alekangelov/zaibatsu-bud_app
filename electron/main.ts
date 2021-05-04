import { app, BrowserWindow, Menu, screen, remote } from "electron";
import * as path from "path";
import * as url from "url";
import log from "electron-log";

// import menuTemplate from './menu';

let mainWindow: BrowserWindow | null;

const DIMENSIONS = {
  W: 1280,
  H: 720,
};
const DEFAULTS = {
  frame: true,
  transparent: true,
};

function createWindow() {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });
  let mainWindow: BrowserWindow;
  if (externalDisplay) {
    console.log("jakoto 1");
    mainWindow = new BrowserWindow({
      width: DIMENSIONS.W,
      height: DIMENSIONS.H,
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
      ...DEFAULTS,
    });
  } else {
    console.log("jakoto 2");
    mainWindow = new BrowserWindow({
      width: DIMENSIONS.W,
      height: DIMENSIONS.H,
      x: 50,
      y: 50,
      ...DEFAULTS,
    });
  }

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
