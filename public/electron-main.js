const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev'); // Để kiểm tra môi trường dev/prod

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200, // Chiều rộng mặc định
    height: 800, // Chiều cao mặc định
    minWidth: 800, // Chiều rộng tối thiểu
    minHeight: 600, // Chiều cao tối thiểu
    webPreferences: {
      nodeIntegration: true, // Cho phép sử dụng Node.js trong renderer process (cẩn thận với bảo mật)
      contextIsolation: false, // Tắt contextIsolation để dễ dàng hơn khi bắt đầu, cân nhắc bật lại sau
      preload: path.join(__dirname, 'preload.js'), // File preload script (tùy chọn)
    },
  });

  // Tải ứng dụng React của bạn
  // Trong môi trường dev, tải từ URL của React dev server
  // Trong môi trường prod, tải từ file index.html đã được build
  const startURL = isDev
    ? 'http://localhost:5173' // URL của React dev server
    : `file://${path.join(__dirname, '../build/index.html')}`; // Đường dẫn đến build của React

  mainWindow.loadURL(startURL);

  // Mở DevTools khi ở chế độ phát triển
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Xử lý khi cửa sổ đóng
  mainWindow.on('closed', () => (mainWindow = null));
}

// Khi Electron sẵn sàng
app.on('ready', createWindow);

// Khi tất cả các cửa sổ đã đóng, thoát ứng dụng trừ trên macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Khi ứng dụng được kích hoạt (chủ yếu trên macOS)
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Bạn có thể cài đặt thêm 'electron-is-dev' nếu muốn:
// npm install electron-is-dev