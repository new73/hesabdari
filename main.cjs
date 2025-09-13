// main.cjs
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

// ساخت پنجره اصلی
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // مطمئن شو این فایل وجود داره
      contextIsolation: true,  // امنیت
      nodeIntegration: false,
    },
  });

  // بارگذاری پروژه React
  win.loadURL("http://localhost:5173"); // یا مسیر پروژه Vite/React شما

  // باز کردن DevTools اختیاری
  // win.webContents.openDevTools();
}

// وقتی Electron آماده شد، پنجره بساز
app.whenReady().then(() => {
  createWindow();

  // handler برای Save Dialog
  ipcMain.handle("show-save-dialog", async (event, options) => {
    const result = await dialog.showSaveDialog(options);
    return result;
  });

  // handler برای ذخیره فایل PDF
  ipcMain.handle("save-pdf-file", async (event, { filePath, data }) => {
    try {
      fs.writeFileSync(filePath, Buffer.from(data));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });
});

// بستن برنامه وقتی همه پنجره‌ها بسته شدند
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// فعال کردن برنامه وقتی روی macOS کلیک روی آیکون شد
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
