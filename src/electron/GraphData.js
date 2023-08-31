const { app, BrowserWindow } = require('electron');
const path = require('path');

// class GraphData {
//   function getGraph(){
    
//   }

//   function getSin() {
    
//   }
// }

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
}

app.whenReady().then(() => {
  const mainWindow = createWindow();
  BrowserWindow.exports = { mainWindow };
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});