const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    },
    on: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
  },
});

// DOM Manipulation để ẩn nút "Đăng nhập"
window.addEventListener("DOMContentLoaded", () => {
  console.log("🔍 Looking for docs-titlebar-buttons...");

  const hideTitlebarButtons = () => {
    const target = document.querySelector(".docs-titlebar-buttons");
    if (target) {
      console.log("✅ Hiding .docs-titlebar-buttons");
      target.style.display = "none";
    }
  };

  // Gọi nhiều lần vì Google Sheet render động
  let attempts = 0;
  const interval = setInterval(() => {
    hideTitlebarButtons();
    attempts++;
    if (attempts > 20) clearInterval(interval);
  }, 500);
});
