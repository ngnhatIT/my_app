import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import isDev from "electron-is-dev";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const preloadPath = path.join(__dirname, "preload.js");
console.log("🧩 Using preload path:", preloadPath);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true, // ✅
      nodeIntegration: false, // ✅
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startURL = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

// 👉 THÊM: Mở cửa sổ toàn màn hình nhúng Google Sheet
function openGoogleSheetFullscreen(url) {
  const sheetWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  sheetWindow.webContents.openDevTools();
  sheetWindow.loadURL(url);
}

ipcMain.handle("get-network-info", () => {
  const interfaces = os.networkInterfaces();
  let ip = "unknown", mac = "unknown";

  for (const name of Object.keys(interfaces)) {
    const nets = interfaces[name];
    if (!nets) continue;

    for (const net of nets) {
      if (net.family === "IPv4" && !net.internal) {
        ip = net.address;
        mac = net.mac;
        break;
      }
    }
    if (ip !== "unknown") break;
  }

  console.log("📡 [main.ts] IP/MAC:", ip, mac);
  return { ip, mac };
});

// 👉 Lắng nghe từ React (Renderer)
ipcMain.on("open-google-sheet-fullscreen", (_event, url) => {
  openGoogleSheetFullscreen(url);
});

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
