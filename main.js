import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import sql from 'mssql';

const dbConfig = {
  user: 'sa',
  password: 'your_password',
  server: 'localhost',
  database: 'YourDB',
  options: { encrypt: false, trustServerCertificate: true }
};

ipcMain.handle('get-products', async () => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM Products');
    return result.recordset;
  } catch (err) {
    console.error(err);
    return [];
  }
});

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL('http://localhost:5173');
};

app.whenReady().then(createWindow);
