import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  getProducts: () => ipcRenderer.invoke('get-products')
});
