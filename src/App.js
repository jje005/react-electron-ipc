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
      setSinData((prevData) => [...prevData, data]);
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
        <button size="large" onClick={() => changeView('sin')}>Sin 그래프</button>
        {currentView === 'main' ? (
          <h2>메인 화면</h2>
        ) : (
          <ViewSin sinData={sinData} /> 
        )}
      </header>
    </div>
  );
}

export default App;
// import React, { useState } from 'react';
// import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom"; // BrowserRouter를 Router로 수정
// import logo from './logo.svg';
// import './App.css';
// import { SEND_MAIN_PING } from './constants';
// import ViewSin from './viewSin.js'; // 새로 추가된 부분


// const electron = window.require("electron")

// function App() {
//   const [currentView, setCurrentView] = useState('main');

//   const sendMain = () => {
//     electron.ipcRenderer.send(SEND_MAIN_PING, 'send');
//   }

//   // sin생성 버튼 클릭 시 ViewSin 화면으로 전환
//   const changeView = () => {
//     setCurrentView('sin');
//   }

//   return (
//     <div className="App">
//       <Router> {/* Router 컴포넌트 추가 */}
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>그래프를 그려보자</p>
//           <button size="large" onClick={sendMain}>Send Ping</button>
//           <button size="large" onClick={changeView}>sin생성</button> {/* 버튼 클릭 시 화면 전환 */}
//           {currentView === 'main' ? (
//             <h2>메인 화면</h2>
//           ) : (
//             <ViewSin />
//           )}
//            <button size="large" onClick={changeView}>sin생성</button> {/* 버튼 클릭 시 화면 전환 */}

          
//         </header>
//       </Router>
//     </div>
//   );
// }

// export default App;