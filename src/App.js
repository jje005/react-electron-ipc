import React, { useState, useEffect, memo } from 'react';
import { SEND_MAIN_PING, SET_SIN_VALUE, CYCLE_SIN_DATA } from './constants';
import LineChartComponent from './components/Line';


const electron = window.require("electron")

function App() {
  const [currentView, setCurrentView] = useState('main');
  const [sinData = [], setSinData] = useState([]); // sinData 상태 추가



    return () => {
      electron.ipcRenderer.removeAllListeners(CYCLE_SIN_DATA);
    } ;

  return (
    <div className="App">
      <header className="App-header">
      {currentView  (
          <React.Fragment>
            <p>그래프를 그려보자</p>
            <button size="large" onClick={sendMain}>Send Ping</button>
          </React.Fragment>
        )
      }
      </header>
    </div>
  );
}

export default memo(App);