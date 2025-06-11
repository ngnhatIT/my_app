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
  const hideLoginButton = () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => {
      if (btn.textContent?.toLowerCase().includes("đăng nhập") || btn.textContent?.toLowerCase().includes("sign in")) {
        btn.style.display = "none";
      }
    });
  };

  // Thử nhiều lần vì Google Sheet có thể tải động
  let attempts = 0;
  const interval = setInterval(() => {
    hideLoginButton();
    attempts++;
    if (attempts > 20) clearInterval(interval); // tối đa 20 lần (10s)
  }, 500);
});
