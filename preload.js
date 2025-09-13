// preload.js (CommonJS)
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  savePDF: (fileName, arrayBuffer) => ipcRenderer.invoke("save-pdf", { fileName, arrayBuffer })
});
