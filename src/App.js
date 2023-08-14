import React, { useState } from 'react';
import { SEND_MAIN_PING, SET_SIN_VALUE } from './constants';
import LineChartComponent from './LineChartComponent';

const electron = window.require('electron');

function App() {
  const [currentView, setCurrentView] = useState('main');

  const sendMainPing = () => {
    electron.ipcRenderer.send(SEND_MAIN_PING);
  };

  const changeView = (viewName) => {
    electron.ipcRenderer.send(SET_SIN_VALUE);
    setCurrentView(viewName);
  };

  return (
    <div className="App">
      <header className="App-header">
        {currentView === 'main' ? (
          <React.Fragment>
            <p>그래프를 그려보자</p>
            <button size="large" onClick={sendMainPing}>
              Send Ping
            </button>
            <button size="large" onClick={() => changeView('lineChart')}>
              Sin 그래프
            </button>
          </React.Fragment>
        ) : (
          <LineChartComponent />
        )}
      </header>
    </div>
  );
}

export default App;
// import React, { useState, useEffect } from 'react';
// import { SEND_MAIN_PING, SET_SIN_VALUE, CYCLE_SIN_DATA } from './constants';
// import LineChartComponent from './components/Line';


// const electron = window.require("electron")

// function App() {
//   const [currentView, setCurrentView] = useState('main');
//   const [sinData = [], setSinData] = useState([]); // sinData 상태 추가

//   const sendMain = () => {
//     electron.ipcRenderer.send(SEND_MAIN_PING, 'send');
//   }

//   const changeView = (viewName) => {
//     electron.ipcRenderer.send(SET_SIN_VALUE, 'sin');
//     setCurrentView(viewName);
//   }

//   useEffect(() => {
//     electron.ipcRenderer.on(CYCLE_SIN_DATA, (event, data) => {
//       setSinData(data);
//       console.log(data);
//     });

//     return () => {
//       electron.ipcRenderer.removeAllListeners(CYCLE_SIN_DATA);
//     } ;
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//       {currentView === 'main' ? (
//           <React.Fragment>
//             <p>그래프를 그려보자</p>
//             <button size="large" onClick={sendMain}>Send Ping</button>
//             <button size="large" onClick={() => changeView('LineChartComponent')}>Sin 그래프</button>
//           </React.Fragment>
//         ) : (
//           <LineChartComponent sinData={sinData} />
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;