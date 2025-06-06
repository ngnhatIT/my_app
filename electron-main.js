import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url'; // <--- Thêm import này
import isDev from 'electron-is-dev';

// Trong môi trường ES Modules, bạn cần tính toán __dirname và __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // <--- Thêm hai dòng này

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // Đảm bảo đường dẫn preload.js vẫn đúng với __dirname mới
      // Nếu bạn không dùng preload, có thể comment/xóa dòng này
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startURL = isDev
    ? 'http://localhost:5173'
    // Đảm bảo đường dẫn build/index.html vẫn đúng với __dirname mới
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});