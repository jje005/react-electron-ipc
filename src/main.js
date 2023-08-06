const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { SEND_MAIN_PING } = require('./constants');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadURL("http://localhost:3000");
}

ipcMain.on(SEND_MAIN_PING, (event, arg) => {
  console.log("Main.js received a ping!!!");
});

ipcMain.on('get_sin_value', (event, arg) => {
  // sin값을 구하는 데이터 요청
  const sinValue = Math.sin(80);
  mainWindow.webContents.send('message-from-main', sinValue);
});

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});