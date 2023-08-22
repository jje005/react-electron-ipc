// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { SET_SIN_VALUE, STOP_SIN_DATA } from '../constants.js';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

// const electron = window.require('electron');

// function LineChartComponent({ sinData, setCurrentView }) {
//   const [intervalId, setIntervalId] = useState(null);
//   const [dataCount, setDataCount] = useState(0);
//   const [chartData, setChartData] = useState([]);
//   const [referenceLines, setReferenceLines] = useState([]);

//   const drawSinGraph = useCallback(() => {
//     const id = setInterval(() => {
//       setChartData(chartData => {
//         const updatedChartData = [...chartData];
//         const yValue = sinData.uv;

//         if (chartData.length >= 2) {
//           updatedChartData.shift();
//         }

//         setDataCount(count => count + 1);
//         updatedChartData.push({ xvalue: `${dataCount}ms`, uv: yValue });
//         return updatedChartData;
//       });

//       if (dataCount % 1000 === 0 && dataCount !== 0) {
//         setReferenceLines(referenceLines => ([
//           ...referenceLines,
//           <ReferenceLine key={dataCount} x={dataCount} stroke="red" />,
//         ]));
//       }
//     }, 10);

//     setIntervalId(id);
//   }, [dataCount, sinData.uv]);

//   useEffect(() => {
//     clearInterval(intervalId);
//     drawSinGraph();
//   }, [drawSinGraph]);

//   const formattedChartData = useMemo(() => {
//     let minX = Infinity;
//     let maxX = 0;

//     chartData.forEach(({ xvalue }) => {
//       const x = parseInt(xvalue, 100);
//       minX = Math.min(minX, x);
//       maxX = Math.max(maxX, x);
//     });

//     return { minX, maxX, chartData };
//   }, [chartData]);

//   return (
//     <div>
//       <h1>Sin 곡선 그래프</h1>
//       <LineChart width={620} height={400} data={formattedChartData.chartData} syncId="sync">
//         <XAxis dataKey="xvalue" domain={[formattedChartData.minX, formattedChartData.maxX]} />
//         <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
//         <CartesianGrid stroke="#ccc" />
//         <Tooltip />
//         <Legend />
//         {/* 1000ms 주기별 빨간 선을 동적으로 추가 */}
//         {referenceLines}
//         <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>

//       <button
//         id="startButton"
//         onClick={drawSinGraph}
//         disabled={intervalId}
//       >
//         시작
//       </button>
//       <button
//         id="stopButton"
//         onClick={() => {
//           electron.ipcRenderer.send(STOP_SIN_DATA, 'stop');
//           clearInterval(intervalId);
//           setIntervalId(null);
//         }}
//         disabled={!intervalId}
//       >
//         멈춰
//       </button>
//       <button
//         id="homeButton"
        
//           onClick={() =>{
//             electron.ipcRenderer.send(STOP_SIN_DATA, 'stop');
//             clearInterval(intervalId);
//             setIntervalId(null);
//             (window.location.href = './index.html');
//           } }
// >
//         첫 페이지로
//       </button>
//     </div>
//   );
// }

// export default React.memo(LineChartComponent);


import React, { Component, memo } from 'react';
import { SET_SIN_VALUE, STOP_SIN_DATA } from '../constants.js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
const electron = window.require('electron');

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
      dataCount: 0,
      chartData: [],
      referenceLines: [],
    };
  }

  drawSinGraph = () => {
    const intervalId = setInterval(() => {
      const { chartData, referenceLines } = this.state;
      const { sinData } = this.props;
      

      const dataCount = sinData.xcount;
      const yValue = sinData.uv;

      this.setState({
        chartData: [...chartData, { xvalue: `${dataCount}ms`, uv: yValue }],
      });

      if (chartData.length >= 3) {
        chartData.shift();
      }

      if (dataCount%1000 === 0) {
        this.setState({
          referenceLines: ([
            ...referenceLines,
            <ReferenceLine key={dataCount} x={dataCount} stroke="red" />,
          ]),
        });
      }
    }, 30);

    this.setState({
      intervalId: intervalId,
    });
  };
  
  handleStartClick = () => {
    if (!this.state.intervalId) {
      this.drawSinGraph();
    }
  };
  
  handleStopClick = () => {
    electron.ipcRenderer.send(STOP_SIN_DATA, 'stop');
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: null,
    });
  }
  
  render() {
    const { chartData, referenceLines } = this.state;
    let minX = Infinity;
    let maxX = 0;
    chartData.forEach(({ xvalue }) => {
      const x = parseInt(xvalue, 10);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    });

    return (
      <div>
        <h1>Sin 곡선 그래프</h1>
        <LineChart width={620} height={400} data={chartData} syncId="sync">
          <XAxis dataKey="xvalue" domain={[minX, maxX]} />
          <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          {/* 1000ms 주기별 빨간 선을 동적으로 추가 */}
          {referenceLines}
          <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{r:8}}/>
        </LineChart>

        <button
          id="startButton"
          onClick={this.handleStartClick}
          disabled={this.state.intervalId}
        >
          시작
        </button>
        <button
          id="stopButton"
          onClick={this.handleStopClick}
          disabled={!this.state.intervalId}
        >
          멈춰
        </button>
        <button
          id="homeButton"
          onClick={() => (window.location.href = './index.html')}
        >
          첫페이지로
        </button>
      </div>
    );
  }
}

export default memo(LineChartComponent);