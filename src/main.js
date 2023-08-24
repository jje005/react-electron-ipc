const { app, BrowserWindow } = require('electron');
const path = require('path');
const { initMainModel } = require('./makeSin');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      devTools: true, 
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL('http://localhost:3000');
  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();
  initMainModel(mainWindow);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});