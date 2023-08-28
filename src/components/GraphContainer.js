import React, { useState, useEffect, memo} from 'react';
import playIcon from '../icon/play.png'
import pauseIcon from '../icon/pause.png'
import '../icon/graphContainer.css';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ReferenceLine,
  Brush,
  Label,
} from 'recharts';

function GraphContainer({ graphSettings }) {
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [isIntervalRunning, setIsIntervalRunning] = useState(true); 
  const [ReferenceLines, setReferenceLines] = useState(new Map());

  useEffect(() => {
    let intervalId;

    if (isIntervalRunning) {
      intervalId = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isIntervalRunning]);

  useEffect(() => {
    if (graphSettings.isSinChecked && graphSettings.isStepChecked && graphSettings.isRandomChecked) {
      const newSin = Math.sin(count*0.1) * 128;
      const newStep = (count % 512 < 256) ? (-127 + (count % 256)) : (128 - (count % 256));
      const newRandom = Math.random(count) * 255 - 127;
  
      const newData = {
        name: count,
        sin: graphSettings.isSinChecked ? newSin : null,
        step: graphSettings.isStepChecked ? newStep : null,
        random: graphSettings.isRandomChecked ? newRandom : null,
      };
      setData(prevData => [...prevData, newData]);
    }
  }, [count, graphSettings.isSinChecked, graphSettings.isStepChecked, graphSettings.isRandomChecked]);

  const sinGraph = [];
  const stepGraph = [];
  const randomGraph = [];

  if (graphSettings.isSinChecked) {
    sinGraph.push(<Line type="monotone" dataKey="sin" stroke="#8884d8" key="sin" />);
  }

  if (graphSettings.isStepChecked) {
    stepGraph.push(<Line type="step" dataKey="step" stroke="#82ca9d" key="step" />);
  }

  if (graphSettings.isRandomChecked) {
    randomGraph.push(<Line type="monotone" dataKey="random" stroke="#ffc658" key="random" />);
  }

  useEffect(() => {
    if (count % 200 === 0 && count !== 0) {
      const uniqueKey = `ReferenceLines${count}`;
      console.log("빨간선 생성");

      const newReferenceLine = (
        <ReferenceLine key={uniqueKey} x={count} stroke="red" label={`${count}ms`} />
      );
      
      setReferenceLines(prevLines => new Map(prevLines).set(uniqueKey, newReferenceLine));
    }
  }, [count]);
    
    
  if (data.length > 128) {
      data.shift();
  }
  const handlePauseButtonClick = () => {
    setIsIntervalRunning(false);
  };

  const handleResumeButtonClick = () => {
    setIsIntervalRunning(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <header className="header">
            <h1>그래프</h1>
            <div className="icon"> 
        <img className="icon-play"
            src={playIcon}
            alt="Play"
            onClick={handleResumeButtonClick}
        />  
        <img className="icon-pause"
            src={pauseIcon}
            alt="puase"
            onClick={handlePauseButtonClick}
        />  
      </div>
        </header>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

        <LineChart width={720} height={400} data={data}>
          <XAxis dataKey="name" domain={[0, data.length - 1]} tickFormatter={(value) => `${value}ms`} />
          <Label value="[ms]"  position="bottom" />
          <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
          <CartesianGrid stroke="#ccc" dot="5, 5"/>
          <Tooltip />
          <Brush dataKey="name" height={15} stroke="black" />
          <Legend />
          {ReferenceLines}
          {sinGraph}
          {stepGraph}
          {randomGraph}
        </LineChart>

      </div>
    </div>   
  );
}

export default memo(GraphContainer);
