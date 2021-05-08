import { BrowserWindow, ipcMain, screen } from "electron";

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
  const mainDisplay = screen.getPrimaryDisplay();

  const DIMENSIONS = {
    W: options.width,
    H: height,
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
};

function common(mainWindow: BrowserWindow) {
  ipcMain.on("minimize", () => {
    mainWindow.minimize();
  });
  ipcMain.on("maximize", () => {
    if (mainWindow.isMaximized()) {
      return mainWindow.restore();
    }
    return mainWindow.maximize();
  });
  ipcMain.on("close", () => {
    mainWindow.close();
  });
  ipcMain.on("open-combo", (event, arg) => {
    console.log(arg);
  });
}

export default common;
