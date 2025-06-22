// 📁 preload.js
const { contextBridge, ipcRenderer } = require("electron");

// ✅ IPC gọi main process để lấy IP/MAC
async function getIPMac() {
  try {
    return await ipcRenderer.invoke("get-network-info");
  } catch (e) {
    console.error("❌ IPC failed to get network info", e);
    return { ip: "unknown", mac: "unknown" };
  }
}

// ✅ Lấy thông tin thiết bị từ Browser
function getInfoDevice() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const osName = userAgent.includes("Win")
    ? "Windows"
    : userAgent.includes("Mac")
    ? "Mac OS X"
    : userAgent.includes("Linux")
    ? "Linux"
    : "Unknown";

  return {
    deviceId: userAgent,
    deviceName: platform,
    os: osName,
    deviceType: "desktop",
  };
}

// ✅ Tổng hợp thông tin thiết bị
async function getDeviceInfo() {
  const { ip, mac } = await getIPMac();
  const meta = getInfoDevice();

  return {
    ip,
    mac,
    ...meta,
  };
}

// ✅ Expose cho React sử dụng
contextBridge.exposeInMainWorld("deviceInfo", {
  get: async () => await getDeviceInfo(),
});

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) =>
      ipcRenderer.on(channel, (_event, ...args) => func(...args)),
  },
});

// Ẩn nút đăng nhập trong Google Sheet
window.addEventListener("DOMContentLoaded", () => {
  const hideTitlebarButtons = () => {
    const target = document.querySelector(".docs-titlebar-buttons");
    if (target) target.style.display = "none";
  };

  let attempts = 0;
  const interval = setInterval(() => {
    hideTitlebarButtons();
    if (++attempts > 20) clearInterval(interval);
  }, 500);
});

window.__PRELOAD_WORKS__ = true;
