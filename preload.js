// preload.js
const { contextBridge, ipcRenderer } = require("electron");

// ایمن کردن ipcRenderer برای Renderer process
contextBridge.exposeInMainWorld("ipcRenderer", {
  // invoke برای فراخوانی handler های main
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),

  // send و on هم اگر لازم باشه برای رویدادهای غیر async
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});
