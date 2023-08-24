// import React, { Component, memo } from 'react';
// import { SET_SIN_VALUE, STOP_SIN_DATA } from '../constants.js';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ReferenceLine,
// } from 'recharts';
// const electron = window.require('electron');

// class LineChartComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       intervalId: null,
//       dataCount: 0,
//       chartData: [],
//       referenceLines: [],
//     };
//   }

//   drawSinGraph = () => {
//     const intervalId = setInterval(this.updateChartData, 10);

//     this.setState({
//       intervalId: intervalId,
//     });
//   };

//   updateChartData = () => {
//     const { chartData, referenceLines } = this.state;
//     const { sinData } = this.props;

//     const dataCount = sinData.xcount;
//     console.log(`Console Log (${dataCount})`);

//     const yValue = sinData.uv;
//     const newMinX = Math.max(0, dataCount - 50);
//     const newMaxX = dataCount +10;

//     const newChartData = [...chartData, { xvalue: dataCount, uv: yValue }];
//     if (newChartData.length > 131) {
//       newChartData.shift();
//     }

//     let newReferenceLines = [...referenceLines];
//     if (dataCount % 200 === 0 && dataCount !== 0) {
//       const uniqueKey = `referenceLine-${dataCount}`;
//       newReferenceLines =
//       [...newReferenceLines, <ReferenceLine key={uniqueKey} x={dataCount} stroke="red" label= {dataCount+"ms"} />];
//       console.log("빨간선 생성");
//     }

//     this.setState({
//       chartData: newChartData,
//       referenceLines: newReferenceLines,
//       minX: newMinX,
//       maxX: newMaxX,
//     });
//   };

//   handleStartClick = () => {
//     electron.ipcRenderer.send(SET_SIN_VALUE, 'sin');

//     if (!this.state.intervalId) {
//       this.drawSinGraph();
//     }
//   };

//   handleStopClick = () => {
//     electron.ipcRenderer.send(STOP_SIN_DATA, 'stop');
//     clearInterval(this.state.intervalId);
//     this.setState({
//       intervalId: null,
//     });
//   };

//   render() {
//     const { chartData, referenceLines, intervalId, minX, maxX } = this.state;
//     const isIntervalRunning = intervalId !== null;

//     return (
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//         <h1>Sin 곡선 그래프</h1>
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <LineChart width={620} height={400} data={chartData}>
//               <XAxis dataKey="xvalue" domain={[minX, maxX]} tickFormatter={(value) => `${value}ms`} />
//               <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
//               <CartesianGrid stroke="#ccc" />
//               <Tooltip />
//               <Legend />
//               {referenceLines}
//               <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{r: 3}} />
//             </LineChart>
//           <div style={{ marginTop: '20px' }}>
//               <button id="startButton" onClick={this.handleStartClick} disabled={isIntervalRunning}>
//                 시작
//               </button>
//               <button id="stopButton" onClick={this.handleStopClick} disabled={!isIntervalRunning}>
//                 멈춰
//               </button>
//               <button id="homeButton" onClick={() => (window.location.href = './index.html')}>
//                 첫페이지로
//               </button>
//             </div>
//           </div>
//       </div>
//     );
//   }
// }

// export default memo(LineChartComponent);