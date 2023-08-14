import React, { Component } from 'react';
import {STOP_SIN_DATA} from '../constants.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import styles from './module.css';

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
      const {chartData, referenceLines } = this.state;
      const { sinData } = this.props;
      let dataCount = this.state.dataCount;

      const xValue = sinData.name;
      const yValue = sinData.uv;

      this.setState({
        chartData: [...chartData, { name: xValue, uv: yValue }],
        dataCount: dataCount++,
      });

      if (chartData.length > 10) {
        chartData.shift();
      }

      if (dataCount % 1000 === 0 && dataCount !== 0) {
        this.setState({
          referenceLines: [
            ...referenceLines,
            <ReferenceLine key={dataCount} x={dataCount} stroke="red" />,
          ],
        });
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
    electron.ipcRenderer.send(STOP_SIN_DATA, 'stop');
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
      <div className={styles.container}>
        <h1>Sin 곡선 그래프</h1>
        <div className={styles.lineChartContainer}>
          <LineChart width={620} height={400} data={chartData} syncId="sync">
            <XAxis dataKey="name" />
            <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
            <CartesianGrid stroke="#ccc" />
            <Tooltip/>
            <Legend />
            {/* 1000ms 주기별 빨간 선을 동적으로 추가 */}
            {referenceLines}
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </div>
        </div>
    )
  }
}

export default LineChartComponent;