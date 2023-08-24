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
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [referenceLines, setReferenceLines] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (graphSettings.isSinChecked || graphSettings.isStepChecked || graphSettings.isRandomChecked) {
      const newSin = Math.sin(count) * 128;
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

  if (graphSettings.isSinChecked) {
    graphComponents.push(<Line type="monotone" dataKey="sin" stroke="#8884d8" key="sin" />);
  }

  if (graphSettings.isStepChecked) {
    graphComponents.push(<Line type="step" dataKey="step" stroke="#82ca9d" key="step" />);
  }

  if (graphSettings.isRandomChecked) {
    graphComponents.push(<Line type="monotone" dataKey="random" stroke="#ffc658" key="random" />);
  }

  if (data.name % 1000 && data.name !== 0) {
    const uniqueKey = `referenceLine-${data}`;
    console.log("빨간선 생성");
    setReferenceLines(preReferenceLines => [
        ...preReferenceLines, <ReferenceLine key={uniqueKey} x={data.name} stroke="red" label= {data.name+"ms"} />
    ]);


  }

  if (data.length > 131) {
      data.shift();
  }

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
          {referenceLines}
          {graphComponents}
        </LineChart>
      </div>
    </div>
  );
}

export default memo(GraphContainer);