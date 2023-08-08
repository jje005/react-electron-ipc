import React, { Component } from 'react';
import { render } from "react-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Brush } from 'recharts';

const electron = window.require("electron")

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
      dataCount: 0,
      chartData: [],
    };
  }

  componentDidMount() {
    this.drawSinGraph();
  }

  componentWillUnmount() {
    this.handleStopClick(); // 컴포넌트가 언마운트될 때 중지하도록 수정
  }

  drawSinGraph = () => {
    const intervalId = setInterval(() => {
      const { dataCount, chartData } = this.state;
      const { sinData } = this.props;

      const xValue = sinData.name;
      const yValue = sinData.uv;

      this.setState({
        chartData: [...chartData, { name: xValue, uv: yValue }],
        dataCount: dataCount + 1,
      });

      if (chartData.length > 800) {
        chartData.shift();
      }
    }, 10);

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
    electron.ipcRenderer.send('stop_sin','stop');
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({
        intervalId: null,
      });
    }
  };

  render() {  
    const { chartData } = this.state;
    var RedCount = 0;
    if(chartData.name % 100 === 0) {
      RedCount++;
      <ReferenceLine x={RedCount*100} label={`${chartData.length}ms`} stroke="red" />
    }; 

    return (
      <div>
        <h1>Sin 곡선 그래프</h1>
        <LineChart width={620} height={400} data={chartData} syncId="sync">
          <XAxis dataKey="name" />
          <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64,128]} />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>

        <button id="startButton" onClick={this.handleStartClick} disabled={this.state.intervalId}>
          시작
        </button>
        <button id="stopButton" onClick={this.handleStopClick} disabled={!this.state.intervalId}>
          멈춰
        </button>
                <button id="homeButton" onClick={() => (window.location.href = './index.html')}>
          첫페이지로
        </button>
      </div>
    );
  }
}

export default LineChartComponent;
// import React, { PureComponent } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const electron = window.require("electron")

// const stop_sin = () => {
//   electron.ipcRenderer.send('stop_sin', 'stop');
// }
// export default class LineChartComponent extends PureComponent {

//   render() {
    
//     const sinData = this.props.sinData;

//     intervalId = setInterval(() => {
//       const xValue = sinData.name;
//       const yValue = sinData.uv;

//     })
//     return (
//       <LineChart 
//         width={500}
//         height={400}
//         data={sinData}          
//         margin={{
//             top: 25,
//             right: 40,
//             left: 20,
//             bottom: 10,
//         }}>
//         <XAxis dataKey="name" />
//         <YAxis />
//         <CartesianGrid stroke="#ccc" />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//       </LineChart>,
//         <button size="large" onClick={stop_sin}>stop</button>
//         );
//   }
// }