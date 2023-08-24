import React, { useEffect, useState } from 'react';
import { Line } from 'recharts';

function SinGraph({ isVisible }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let intervalId;

    if (isVisible) {
      intervalId = setInterval(drawSinData, 500);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isVisible]);

  const drawSinData = () => {
    const newSinData = {
      x: new Date().getTime(),
      y: Math.sin(new Date().getTime()) * 128,
    };
    setData(data => [...data, newSinData]);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Line
      type="monotone"
      dataKey="y"
      data={data}
      stroke="#8884d8"
    />
  );
}

export default SinGraph;