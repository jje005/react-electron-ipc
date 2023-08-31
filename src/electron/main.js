const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow; // mainWindow를 전역으로 선언
let Interval;

function createWindow() {
  mainWindow = new BrowserWindow({
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
}

app.whenReady().then(() => {
  createWindow(); // createWindow 함수 호출
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('startGraph', () => {
  let count = 0;
  console.log("데이터 요청");
  Interval = setInterval(() => {
    const newSin = Math.sin(count*0.1) * 128;
    const newStep = (count % 64 < 32) ? (-127 + (8*count % 256)) : (128 - (8*count % 256));
    const newRandom = Math.random(count) * 255 - 127;
    
    // 그래프 데이터 전송
    mainWindow.webContents.send('setGraph', {
      count,
      newSin,
      newStep,
      newRandom,      
    });

    count++;
  }, 10);
});

ipcMain.on('stopGraph', () => {
  clearInterval(Interval);
  console.log("데이터 중지 요청");

});