const { ipcMain } = require('electron');
const { SEND_MAIN_PING, SET_SIN_VALUE, STOP_SIN_DATA, CYCLE_SIN_DATA } = require('./constants');

function initMainModel(mainWindow) {
  let intervalId = null; // interval ID를 저장할 변수
  let count = 0;

  ipcMain.on(SEND_MAIN_PING, () => {
    console.log('Main.js received a ping!!!');
  });

  ipcMain.on(SET_SIN_VALUE, () => {
    console.log('Sin값 요청');
    intervalId = setInterval(() => {
      const data = {
        name: ` ${(count)} ms`,
        uv: Math.sin(count * 0.01) * 128,
      };
      mainWindow.webContents.send(CYCLE_SIN_DATA, data);
      console.log(data.uv);

      count++;
    }, 10);
  });

  ipcMain.on(STOP_SIN_DATA, () => {
    console.log('Sin 데이터 생성 종료');
    clearInterval(intervalId);
    mainWindow.webContents.send(STOP_SIN_DATA, 'stop');
  });
}

module.exports = { initMainModel };