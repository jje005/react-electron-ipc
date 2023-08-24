// import React, { useState, useEffect, memo } from 'react';
// import GraphContainer from './components/GraphContainer';
// import Navigation from './components/Navigation';



// const electron = window.require("electron")

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header" 그래프 뷰어>
//       </header>
//       <div className="App-container">
//         <div className="App-navigation">
//           <Navigation />
//         </div>
//         <div className="App-main">
//           <GraphContainer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default memo(App);



import React, { useState, useEffect, memo } from 'react';
import GraphContainer from './components/GraphContainer';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [graphSettings, setGraphSettings] = useState({
    isSinChecked: true,
    isStepChecked: true,
    isRandomChecked: true,
  });

  const updateGraphSettings = (type, value) => {
    setGraphSettings(prevSettings => ({
      ...prevSettings,
      [type]: value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-container">
        <div className="App-navigation">
          <Navigation
            isSinChecked={graphSettings.isSinChecked}
            isStepChecked={graphSettings.isStepChecked}
            isRandomChecked={graphSettings.isRandomChecked}
            updateGraphSettings={updateGraphSettings}
          />
        </div>
        <div className="App-main">
          <GraphContainer
            graphSettings={graphSettings}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(App);