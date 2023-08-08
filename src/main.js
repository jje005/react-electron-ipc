const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { SEND_MAIN_PING, SET_SIN_VALUE } = require('./constants');
const { clearInterval } = require('timers');

let mainWindow;
var count = 0;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });
  mainWindow.loadURL('http://localhost:3000');}

ipcMain.on(SEND_MAIN_PING, (event, arg) => {
  console.log("Main.js received a ping!!!");
});

// function setSinValue(){
//   setInterval(() => {
//     const data = {
//       name: `Page ${count}`,
//       uv: Math.floor(Math.sin(count * Math.PI) * 128)

//     };
    
//     mainWindow.webContents.send('periodic-data', data);

//     count++;
//   }
// ), 1000};

let intervalId = null; // interval ID 저장 변수 추가

ipcMain.on(SET_SIN_VALUE, (event, arg) => {
  console.log(Math.PI);
  console.log("sin값 보내란다");
  setInterval(() => {
    const data = {
      name: `Page ${count}`,
      uv: Math.floor(Math.sin(count) * 128)
    }
    
    mainWindow.webContents.send('periodic-data', data);
    console.log(data.uv);

    count+=0.5;
  }, 500)
})


ipcMain.on('stop_sin', () => {
  clearInterval(intervalId);
  intervalId = null;
  mainWindow.webContents.send('complete_sin', 'stop');
});

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});