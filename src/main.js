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

let intervalId = null; // interval ID 저장 변수 추가

ipcMain.on(SET_SIN_VALUE, (event, arg) => {
  console.log("sin값 보내란다");
  intervalId = setInterval(() => {
    const data = {
      name: ` ${(Math.floor(count*10))+1} ms`,
      uv: Math.floor(Math.sin(count) * 128)
    }    
    mainWindow.webContents.send('periodic-data', data);
    console.log(data.uv);
  
    count+=0.1;
  }, 100)  
})

ipcMain.on('stop_sin', () => {
  console.log("멈추라고 명령옴");
  clearInterval(intervalId);
  mainWindow.webContents.send('complete_sin', 'stop');
});

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});