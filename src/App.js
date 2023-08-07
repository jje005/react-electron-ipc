import React, { useState, useEffect } from 'react';
import { SEND_MAIN_PING, SET_SIN_VALUE } from './constants';
import ViewSin from './viewSin';

const electron = window.require("electron")

function App() {
  const [currentView, setCurrentView] = useState('main');
  const [sinData, setSinData] = useState([]); // sinData 상태 추가

  const sendMain = () => {
    electron.ipcRenderer.send(SEND_MAIN_PING, 'send');
  }

  const changeView = (viewName) => {
    electron.ipcRenderer.send(SET_SIN_VALUE, 'sin');
    setCurrentView(viewName);
  }

  useEffect(() => {
    electron.ipcRenderer.on('periodic-data', (event, data) => {
      console.log(data.uv2);

      //console.log(data.uv);
      setSinData(data);
      console.log(data);
    });

    return () => {
      electron.ipcRenderer.removeAllListeners('periodic-data');
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>그래프를 그려보자</p>
        <button size="large" onClick={sendMain}>Send Ping</button>
        <button size="large" onClick={() => changeView('ViewSin')}>Sin 그래프</button>
        {currentView === 'main' ? (
          <h2>메인 화면</h2>
        ) : (
          <LineChart sinData={sinData} /> 
        )}
      </header>
    </div>
  );
}

export default App;