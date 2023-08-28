import React, { useState, memo } from 'react';
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