const { app, BrowserWindow } = require('electron');
const path = require('path');
const { initMainModel } = require('./mainModel');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
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
// const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');
// const { SEND_MAIN_PING, SET_SIN_VALUE,STOP_SIN_DATA, CYCLE_SIN_DATA } = require('./constants');
// const { clearInterval } = require('timers');

// let mainWindow;
// var count = 0;


// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       enableRemoteModule: true,
//       contextIsolation: false
//     }
//   });
//   mainWindow.loadURL('http://localhost:3000');}

// ipcMain.on(SEND_MAIN_PING, (event, arg) => {
//   console.log("Main.js received a ping!!!");
// });

// let intervalId = null; // interval ID 저장 변수 추가

// ipcMain.on(SET_SIN_VALUE, (event, arg) => {
//   console.log("sin값 요청");
//   intervalId = setInterval(() => {
//     const data = {
//       name: ` ${(count)} ms`,
//       uv: Math.sin(count*0.01) * 128
//     }    
//     mainWindow.webContents.send(CYCLE_SIN_DATA, data);
//     console.log(data.uv);
  
//     count++;
//   }, 10)  
// })

// ipcMain.on(STOP_SIN_DATA, () => {
//   console.log("sin 데이터 생성 종료");
//   clearInterval(intervalId);
//   mainWindow.webContents.send(STOP_SIN_DATA , 'stop');
// });

// app.whenReady().then(() => {
//   createWindow();
// });

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit();
// });