import { app, BrowserWindow, screen } from "electron";
import * as path from "path";
import * as url from "url";
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import * as events from "./events";

try {
  const remote = require("@electron/remote/main");
  console.log(remote);
  remote.initialize();
} catch (e) {
  console.error(e);
}

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
    allowRunningInsecureContent: true,
    nodeIntegration: true,
    contextIsolation: false,
  },
};

function createWindow() {
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

  events.common(mainWindow);
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
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.whenReady().then(() => {
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  });
}
