import React, { useEffect, useState } from 'react';
import { Line } from 'recharts';

function StepGraph() {
  const [data, setData] = useState([]);
  const [stepValue, setStepValue] = useState(0); // 시작 값
  const [isStepChecked, setIsStepChecked] = useState(false);


  useEffect(() => {
    if(isStepChecked){
        const intervalId = setInterval(drawStepData, 500);

        return () => {
          clearInterval(intervalId);
        };
    }
  }, [isStepChecked]);

  const drawStepData = () => {
    const newStepData = {
      x: new Date().getTime(),
      y: stepValue,
    };

    // stepValue가 128 또는 -127이면 부호를 바꿔서 증가 또는 감소
    if (stepValue === 128 || stepValue === -127) {
      setStepValue(-stepValue);
    } else {
      setStepValue(stepValue + (stepValue > 0 ? 1 : -1));
    }

    setData(prevData => [...prevData, newStepData]);
  };

  if (!isStepChecked) {
    return null; // 체크되지 않았을 경우 그래프를 렌더링하지 않음
  }


  return (
    <Line
      type="step"
      dataKey="y"
      data={data}
      stroke="#82ca9d"
    />
  );
}

export default StepGraph;