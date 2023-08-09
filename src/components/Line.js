import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const electron = window.require("electron")

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

  componentDidMount() {
    this.drawSinGraph();
  }

  componentWillUnmount() {
    this.handleStopClick(); // 컴포넌트가 언마운트될 때 중지하도록 수정
  }

  drawSinGraph = () => {
    const intervalId = setInterval(() => {
      const { dataCount, chartData, referenceLines } = this.state;
      const { sinData } = this.props;

      const xValue = sinData.name;
      const yValue = sinData.uv;

      this.setState({
        chartData: [...chartData, { name: xValue, uv: yValue }],
        dataCount: dataCount + 1,
      });

      if (chartData.length > 40) {
        chartData.shift();
      }

      if (dataCount % 100 === 0 && dataCount != 0) { // 주기별로 참조선 배열 업데이트
        this.setState({
          referenceLines: [
            ...referenceLines,
            <ReferenceLine key={dataCount} x={dataCount} stroke="red" />,
          ],
        });
      }
    }, 50);

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
    electron.ipcRenderer.send('stop_sin', 'stop');
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({
        intervalId: null,
      });
    }
  };

  render() {
    const { chartData, referenceLines } = this.state;

    return (
      <div>
        <h1>Sin 곡선 그래프</h1>
        <LineChart width={620} height={400} data={chartData} syncId="sync">
          <XAxis dataKey="name" />
          <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          {/* 1000ms 주기별 빨간 선을 동적으로 추가 */}
          {referenceLines}
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
// import React, { Component } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine} from 'recharts';

// const electron = window.require("electron")

// class LineChartComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       intervalId: null,
//       dataCount: 0,
//       chartData: [],
//     };
//   }

//   componentDidMount() {
//     this.drawSinGraph();
//   }

//   componentWillUnmount() {
//     this.handleStopClick(); // 컴포넌트가 언마운트될 때 중지하도록 수정
//   }

//   drawSinGraph = () => {
//     const intervalId = setInterval(() => {
//       const { dataCount, chartData } = this.state;
//       const { sinData } = this.props;

//       const xValue = sinData.name;
//       const yValue = sinData.uv;
//       var RedCount = 0;
      


//       this.setState({
//         chartData: [...chartData, { name: xValue, uv: yValue }],
//         dataCount: dataCount + 1,
//       });

//       if (chartData.length > 40) {
//         chartData.shift();
//       }

//       if (chartData.length >= 20) { // 좌표 영역을 업데이트한다
//         this.setState({
//           startIndex: this.state.startIndex + 20,
//           endIndex: this.state.endIndex + 20,
//         });
//       }

//       if(dataCount % 100 === 0) {
//         RedCount++;
//         <ReferenceLine x={RedCount*100} label={`${chartData.length}ms`} stroke="red" />
//       }; 
//     }, 50);

//     this.setState({
//       intervalId: intervalId,
//       referenceLines: [],
//     });
//   };

//   handleStartClick = () => {
//     if (!this.state.intervalId) {
//       this.drawSinGraph();
//     }
//   };

//   handleStopClick = () => {
//     electron.ipcRenderer.send('stop_sin','stop');
//     if (this.state.intervalId) {
//       clearInterval(this.state.intervalId);
//       this.setState({
//         intervalId: null,
//       });
//     }
//   };

//   render() {  
//     const { chartData } = this.state;

//     return (
//       <div>
//         <h1>Sin 곡선 그래프</h1>
//         <LineChart width={620} height={400} data={chartData} syncId="sync">
//           <XAxis dataKey="name" />
//           <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
//           <CartesianGrid stroke="#ccc" />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//         </LineChart>

//         <button id="startButton" onClick={this.handleStartClick} disabled={this.state.intervalId}>
//           시작
//         </button>
//         <button id="stopButton" onClick={this.handleStopClick} disabled={!this.state.intervalId}>
//           멈춰
//         </button>
//                 <button id="homeButton" onClick={() => (window.location.href = './index.html')}>
//           첫페이지로
//         </button>
//       </div>
//     );
//   }
// }

// export default LineChartComponent;