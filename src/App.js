import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SEND_MAIN_PING, SET_SIN_VALUE } from './constants';
import LineChartComponent from './components/Line.js';

function App() {
  const { ipcRenderer } = window.require("electron");
  const [sinValue, setSinValue] = useState(null);

  //ipc통신 확인용 ping 보냄
  const sendMain = () => {
    ipcRenderer.send(SEND_MAIN_PING, 'send');
  }

  //sin값을 받기 위한 메세지 요청
  const getSin = () => {
    ipcRenderer.send(SET_SIN_VALUE, 'sin');
  }

  //sin값 전달 완료 로그 
  ipcRenderer.on('get_sin', (event, data) => {
    //sin값 데이터 수신 후 처리 로직 작성
    setSinValue(data);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>그래프를 그려보자</p>
        <button size = "large" onClick={sendMain}>Send Ping</button>
        <button size = "large"onClick={getSin}>Sin그래프</button>
        <button size = "large" onClick={sendMain}>Send Ping</button>

        {/* LineSin 컴포넌트를 사용하여 Sin 그래프를 렌더링 */}
          <p>sinV값 : {sinValue}</p>
      
      </header>
    </div>
  );
}

export default App;