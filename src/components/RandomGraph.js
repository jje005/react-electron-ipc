import React, { useEffect, useState } from 'react';
import { Line } from 'recharts';

function RandomGraph() {
  const [data, setData] = useState([]);
  const [isRandomChecked, setIsRandomChecked] = useState(false);


  useEffect(() => {
    if(isRandomChecked){
        const intervalId = setInterval(drawRandomData, 500);

        return () => {
          clearInterval(intervalId);
        };
    }

  }, [isRandomChecked]);

  const drawRandomData = () => {
    const newRandomData = {
      x: new Date().getTime(),
      y: Math.random()*(128-(-127)+1+(-127)),
    };

    setData(prevData => [...prevData, newRandomData]);
  };

  if (!isRandomChecked) {
    return null; // 체크되지 않았을 경우 그래프를 렌더링하지 않음
  }

  return (
    <Line
      type="step"
      dataKey="y"
      data={data}
      stroke="#ffc658"
    />
  );
}

export default RandomGraph;