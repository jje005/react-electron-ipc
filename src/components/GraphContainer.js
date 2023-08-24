import React, { useState, useEffect, memo } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ReferenceLine,
} from 'recharts';

function GraphContainer({ graphSettings }) {
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [isIntervalRunning, setIsIntervalRunning] = useState(true); 


  useEffect(() => {
    let intervalId;

    if (isIntervalRunning) { // interval이 실행 중인 경우에만 실행
      intervalId = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isIntervalRunning]);

  useEffect(() => {
    if (graphSettings.isSinChecked || graphSettings.isStepChecked || graphSettings.isRandomChecked) {
      const newSin = Math.sin(count*0.1) * 128;
      const newStep = (count % 512 < 256) ? (-127 + (count % 256)) : (128 - (count % 256));
        
      const newRandom = Math.random() * 255 - 127;
  
      const newData = {
        name: count,
        sin: graphSettings.isSinChecked ? newSin : null,
        step: graphSettings.isStepChecked ? newStep : null,
        random: graphSettings.isRandomChecked ? newRandom : null,
      };
  
      setData(prevData => [...prevData, newData]);
    }
  }, [count, graphSettings.isSinChecked, graphSettings.isStepChecked, graphSettings.isRandomChecked]);

  const graphComponents = [];
  const ReferenceLines = [];

  if (graphSettings.isSinChecked) {
    graphComponents.push(<Line type="monotone" dataKey="sin" stroke="#8884d8" key="sin" />);
  }

  if (graphSettings.isStepChecked) {
    graphComponents.push(<Line type="step" dataKey="step" stroke="#82ca9d" key="step" />);
  }

  if (graphSettings.isRandomChecked) {
    graphComponents.push(<Line type="monotone" dataKey="random" stroke="#ffc658" key="random" />);
  }

  
  if (count % 100 === 0 && count !== 0) {
    const uniqueKey = { count };
    console.log("빨간선 생성");
    ReferenceLines.push(<ReferenceLine key={uniqueKey} x={count} stroke="red" label={count + "ms"} />)
  }

  if (data.length > 100) {
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
      <h1>그래프 도식</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <LineChart width={720} height={400} data={data}>
          <XAxis dataKey="name" domain={[0, data.length - 1]} tickFormatter={(value) => `${value}ms`} />
          <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          {ReferenceLines}
          {graphComponents}
        </LineChart>
        <div>
        {/* 잠시 멈추는 버튼 */}
        <button onClick={handlePauseButtonClick}>일시 정지</button>
        {/* 다시 시작하는 버튼 */}
        <button onClick={handleResumeButtonClick}>다시 시작</button>
      </div>
      </div>
    </div>   
  );
}

export default memo(GraphContainer);