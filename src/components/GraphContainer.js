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
  const [brushStartIndex, setBrushStartIndex] = useState(0);
  const [brushEndIndex, setBrushEndIndex] = useState(0);

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
    if (isIntervalRunning && (graphSettings.isSinChecked || graphSettings.isStepChecked || graphSettings.isRandomChecked)) {
      const newSin = Math.sin(count*0.1) * 128;
      const newStep = (count % 64 < 32) ? (-127 + (8*count % 256)) : (128 - (8*count % 256));
      // const newStep = (count % 512 < 256) ? (-127 + (count % 256)) : (128 - (count % 256));
      const newRandom = Math.random(count) * 255 - 127;
  
      const newData = {
        name: count,
        sin: graphSettings.isSinChecked ? newSin : null,
        step: graphSettings.isStepChecked ? newStep : null,
        random: graphSettings.isRandomChecked ? newRandom : null,
      };
      setData(prevData => [...prevData, newData]);
      setBrushStartIndex(Math.max(data.length-50, 0));
      setBrushEndIndex(data.length);
    }
  }, [count, graphSettings.isSinChecked, graphSettings.isStepChecked, graphSettings.isRandomChecked, isIntervalRunning]);

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

  //1000ms주기로 빨간선 생성하는 코드
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
        <LineChart width={720} height={400} data={data}>
          
        <XAxis className="Graph" dataKey="name" tickFormatter={(value) => `${value}ms`} />
          <Label value="[ms]"  position="bottom" />
          <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
          <CartesianGrid stroke="#ccc" dot="5, 5"/>
          <Tooltip />
          <Brush dataKey="name" startIndex={brushStartIndex} endIndex={brushEndIndex}  height={15} stroke="black" />
          {/* startIndex={Math.max(0, data.length - 50)} endIndex={data.length} */}
          <Legend />
          {ReferenceLines}
          {graphComponents}
        </LineChart>
        </div> 
  );
}

export default memo(GraphContainer);


// import React, { useState, useEffect, memo} from 'react';
// import playIcon from '../icon/play.png'
// import pauseIcon from '../icon/pause.png'
// import '../icon/graphContainer.css';
// import {
//   LineChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Line,
//   ReferenceLine,
//   Brush,
//   Label,
// } from 'recharts';

// function GraphContainer({ graphSettings }) {
//   const [count, setCount] = useState(1);
//   const [data, setData] = useState([]);
//   const [isIntervalRunning, setIsIntervalRunning] = useState(true); 
//   const [ReferenceLines, setReferenceLines] = useState(new Map());
//   const [BrushSize, setBrushSize] = useState();

//   useEffect(() => {
//     let intervalId;

//     if (isIntervalRunning) { // interval이 실행 중인 경우에만 실행
//       intervalId = setInterval(() => {
//         setCount(prevCount => prevCount + 1);
//       }, 10);
//     }

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [isIntervalRunning]);

//   //interval이 진행중이고 Navigation에서 체크박스에 체크가 된 그래프는 데이터가 생성이된다
//   useEffect(() => {
//     if (isIntervalRunning && (graphSettings.isSinChecked || graphSettings.isStepChecked || graphSettings.isRandomChecked)) {
//       const newSin = Math.sin(count*0.1) * 128;
//       const newStep = (count % 64 < 32) ? (-127 + (8*count % 256)) : (128 - (8*count % 256));
//       // const newStep = (count % 512 < 256) ? (-127 + (count % 256)) : (128 - (count % 256));
//       const newRandom = Math.random(count) * 255 - 127;
  
//       const newData = {
//         name: count,
//         sin: graphSettings.isSinChecked ? newSin : null,
//         step: graphSettings.isStepChecked ? newStep : null,
//         random: graphSettings.isRandomChecked ? newRandom : null,
//       };
//       setData(prevData => [...prevData, newData]);
//     }
//   }, [count, graphSettings.isSinChecked, graphSettings.isStepChecked, graphSettings.isRandomChecked, isIntervalRunning]);

//   const graphComponents = [];

//   if (graphSettings.isSinChecked) {
//     graphComponents.push(<Line type="monotone" dataKey="sin" stroke="#8884d8" key="sin" />);
//   }

//   if (graphSettings.isStepChecked) {
//     graphComponents.push(<Line type="step" dataKey="step" stroke="#82ca9d" key="step" />);
//   }

//   if (graphSettings.isRandomChecked) {
//     graphComponents.push(<Line type="monotone" dataKey="random" stroke="#ffc658" key="random" />);
//   }

 
//   //1000ms주기로 빨간선 생성하는 코드
//   useEffect(() => {
//     if (count % 200 === 0 && count !== 0) {
//       const uniqueKey = `ReferenceLines${count}`;
//       console.log("빨간선 생성");

//       const newReferenceLine = (
//         <ReferenceLine key={uniqueKey} x={count} stroke="red" label={`${count}ms`} />
//       );
      
//       setReferenceLines(prevLines => new Map(prevLines).set(uniqueKey, newReferenceLine));
//     }
//   }, [count]);
    

//   //data의 크기 128 초과시 삭제(128이하로 유지)
//   // if (data.length > 128) {
//   //     data.shift();
//   // }
//   const handlePauseButtonClick = () => {
//     setIsIntervalRunning(false);
//   };

//   const handleResumeButtonClick = () => {
//     setIsIntervalRunning(true);
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <header className="header">
//             <h1>그래프</h1>
//             <div className="icon"> 
//         <img className="icon-play"
//             src={playIcon}
//             alt="Play"
//             onClick={handleResumeButtonClick}
//         />  
//         <img className="icon-pause"
//             src={pauseIcon}
//             alt="puase"
//             onClick={handlePauseButtonClick}
//         />  
//       </div>
//         </header>
//         <LineChart width={720} height={400} data={data}>
          
//         <XAxis className="Graph" dataKey="name" domain={[Math.max(0, data.length - 50), data.length]} tickFormatter={(value) => `${value}ms`} />
//           <Label value="[ms]"  position="bottom" />
//           <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
//           <CartesianGrid stroke="#ccc" dot="5, 5"/>
//           <Tooltip />
//           <Brush startIndex={data.length-50} endIndex={data.length} dataKey="name" height={15} stroke="black" />
//           <Legend />
//           {ReferenceLines}
//           {graphComponents}
//         </LineChart>
//         </div> 
//   );
// }

// export default memo(GraphContainer);